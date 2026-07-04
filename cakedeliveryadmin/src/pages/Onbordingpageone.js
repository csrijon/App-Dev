import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    StatusBar,
    Alert,
    Image,
    ActionSheetIOS,
    Platform,
    PermissionsAndroid,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
// npm install react-native-image-picker
// iOS: run `pod install` in the ios folder, and add NSCameraUsageDescription /
//      NSPhotoLibraryUsageDescription keys to Info.plist
// Android: add CAMERA permission to AndroidManifest.xml (storage permission is
//      requested at runtime below for API < 33)
import BakeryHeader from '../components/BakeryHeader';
import Floatingfixedbutton from "../components/Floatingfixedbutton"


// --- Color Palette ---
const COLORS = {
    background: '#fff8e6',
    textDark: '#4A3320',
    textLight: '#8C7A6B',
    inputBg: '#F4EFE6',
    inputBorder: '#DDCFC1',
    white: '#FFFFFF',
    accent: '#4A3320',
    error: '#C0392B',
};

// --- Validation Helpers ---
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isValidPhone = (phone) => /^\d{10}$/.test(phone.replace(/\D/g, ''));

// --- Custom Component: Floating Label Input ---
const FloatingLabelInput = ({
    label,
    value,
    onChangeText,
    keyboardType = 'default',
    error,
    onBlur,
    maxLength,
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const isFocusedOrFilled = isFocused || value !== '';

    return (
        <View style={styles.inputContainer}>
            <View
                style={[
                    styles.inputInner,
                    isFocused && styles.inputInnerFocused,
                    error && styles.inputInnerError,
                ]}
            >
                <Text
                    style={[
                        styles.floatingLabel,
                        isFocusedOrFilled ? styles.floatingLabelActive : styles.floatingLabelInactive,
                        error && styles.floatingLabelError,
                    ]}
                >
                    {label}
                </Text>
                <TextInput
                    style={[styles.textInput, isFocusedOrFilled && styles.textInputActive]}
                    value={value}
                    onChangeText={onChangeText}
                    keyboardType={keyboardType}
                    selectionColor={COLORS.textDark}
                    maxLength={maxLength}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => {
                        setIsFocused(false);
                        onBlur && onBlur();
                    }}
                />
            </View>
            {error ? (
                <View style={styles.errorRow}>
                    <Icon name="alert-circle-outline" size={13} color={COLORS.error} />
                    <Text style={styles.errorText}>{error}</Text>
                </View>
            ) : null}
        </View>
    );
};

// --- Custom Component: Business Type Card ---
const BusinessTypeCard = ({ title, iconName, isSelected, onPress }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPress}
            style={[styles.cardContainer, isSelected && styles.cardSelected]}
        >
            {isSelected && (
                <View style={styles.checkBadge}>
                    <Icon name="check-circle" size={16} color={COLORS.accent} />
                </View>
            )}
            <View style={[styles.iconCircle, isSelected && styles.iconCircleSelected]}>
                <Icon
                    name={iconName}
                    size={24}
                    color={isSelected ? COLORS.white : COLORS.textDark}
                />
            </View>
            <Text style={[styles.cardTitle, isSelected && styles.cardTitleSelected]}>
                {title}
            </Text>
        </TouchableOpacity>
    );
};

// --- Main Screen Component ---
const Onbordingpageone = ({ navigation }) => {
    const [form, setForm] = useState({
        bakeryName: '',
        ownerName: '',
        email: '',
        phone: '',
    });

    const [errors, setErrors] = useState({
        bakeryName: '',
        ownerName: '',
        email: '',
        phone: '',
    });

    const [selectedBusiness, setSelectedBusiness] = useState('Home Bakery');
    const [logoUri, setLogoUri] = useState(null);

    const updateField = (field, text) => {
        setForm((prev) => ({ ...prev, [field]: text }));
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: '' }));
        }
    };

    const validateField = (field) => {
        let message = '';
        const value = form[field];

        switch (field) {
            case 'bakeryName':
                if (!value.trim()) message = 'Bakery name is required';
                break;
            case 'ownerName':
                if (!value.trim()) message = 'Owner name is required';
                break;
            case 'email':
                if (!value.trim()) message = 'Email is required';
                else if (!isValidEmail(value)) message = 'Enter a valid email address';
                break;
            case 'phone':
                if (!value.trim()) message = 'Phone number is required';
                else if (!isValidPhone(value)) message = 'Enter a valid 10-digit phone number';
                break;
            default:
                break;
        }

        setErrors((prev) => ({ ...prev, [field]: message }));
        return message === '';
    };

    const validateAll = () => {
        const fields = ['bakeryName', 'ownerName', 'email', 'phone'];
        const results = fields.map((field) => validateField(field));
        return results.every(Boolean);
    };

    // --- Image Upload Logic ---
    const requestAndroidCameraPermission = async () => {
        if (Platform.OS !== 'android') return true;
        const result = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
                title: 'Camera Permission',
                message: 'We need access to your camera to take a photo for your logo.',
                buttonPositive: 'Allow',
                buttonNegative: 'Deny',
            }
        );
        return result === PermissionsAndroid.RESULTS.GRANTED;
    };

    const requestAndroidStoragePermission = async () => {
        if (Platform.OS !== 'android') return true;
        // API 33+ (Android 13+) uses scoped media access and doesn't need this
        // runtime permission for the image picker; only request on older APIs.
        if (Platform.Version >= 33) return true;
        const result = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            {
                title: 'Storage Permission',
                message: 'We need access to your photos to upload a logo.',
                buttonPositive: 'Allow',
                buttonNegative: 'Deny',
            }
        );
        return result === PermissionsAndroid.RESULTS.GRANTED;
    };

    const pickFromLibrary = async () => {
        const granted = await requestAndroidStoragePermission();
        if (!granted) {
            Alert.alert('Permission required', 'Please allow access to your photo library to upload a logo.');
            return;
        }
        launchImageLibrary(
            { mediaType: 'photo', quality: 0.8, includeBase64: false },
            (response) => {
                if (response.didCancel || response.errorCode) return;
                if (response.assets?.length) {
                    setLogoUri(response.assets[0].uri);
                }
            }
        );
    };

    const pickFromCamera = async () => {
        const granted = await requestAndroidCameraPermission();
        if (!granted) {
            Alert.alert('Permission required', 'Please allow camera access to take a photo.');
            return;
        }
        launchCamera(
            { mediaType: 'photo', quality: 0.8, saveToPhotos: true, includeBase64: false },
            (response) => {
                if (response.didCancel || response.errorCode) return;
                if (response.assets?.length) {
                    setLogoUri(response.assets[0].uri);
                }
            }
        );
    };

    const handleUploadLogo = () => {
        if (Platform.OS === 'ios') {
            ActionSheetIOS.showActionSheetWithOptions(
                {
                    options: ['Cancel', 'Take Photo', 'Choose from Library', logoUri ? 'Remove Logo' : null].filter(Boolean),
                    cancelButtonIndex: 0,
                    destructiveButtonIndex: logoUri ? 3 : undefined,
                },
                (buttonIndex) => {
                    if (buttonIndex === 1) pickFromCamera();
                    else if (buttonIndex === 2) pickFromLibrary();
                    else if (buttonIndex === 3) setLogoUri(null);
                }
            );
        } else {
            const options = ['Take Photo', 'Choose from Library'];
            if (logoUri) options.push('Remove Logo');
            options.push('Cancel');

            Alert.alert('Upload Logo', 'Choose an option', [
                { text: 'Take Photo', onPress: pickFromCamera },
                { text: 'Choose from Library', onPress: pickFromLibrary },
                ...(logoUri ? [{ text: 'Remove Logo', onPress: () => setLogoUri(null), style: 'destructive' }] : []),
                { text: 'Cancel', style: 'cancel' },
            ]);
        }
    };

    const handleNext = () => {
        const valid = validateAll();
        if (!valid) {
            Alert.alert('Missing information', 'Please fill in all required fields correctly before continuing.');
            return;
        }
        navigation.navigate('OnboardingPageTwo', {
            ...form,
            businessType: selectedBusiness,
            logoUri,
        });
    };

    const handleBack = () => {
        if (navigation.canGoBack && navigation.canGoBack()) {
            navigation.goBack();
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle={'dark-content'} backgroundColor={'#fff8e6'} />
            <BakeryHeader />
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                {/* Upload Logo Section */}
                <View style={styles.uploadSection}>
                    <TouchableOpacity
                        style={styles.uploadCircle}
                        activeOpacity={0.7}
                        onPress={handleUploadLogo}
                    >
                        {logoUri ? (
                            <Image source={{ uri: logoUri }} style={styles.uploadedImage} />
                        ) : (
                            <>
                                <Icon name="camera-iris" size={28} color={COLORS.textDark} />
                                <Text style={styles.uploadText}>UPLOAD LOGO</Text>
                            </>
                        )}
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.addBtn} activeOpacity={0.8} onPress={handleUploadLogo}>
                        <Icon name={logoUri ? 'pencil' : 'plus'} size={20} color={COLORS.white} />
                    </TouchableOpacity>
                </View>

                {/* Form Inputs Section */}
                <View style={styles.formSection}>
                    <FloatingLabelInput
                        label="BAKERY NAME"
                        value={form.bakeryName}
                        onChangeText={(text) => updateField('bakeryName', text)}
                        onBlur={() => validateField('bakeryName')}
                        error={errors.bakeryName}
                    />
                    <FloatingLabelInput
                        label="OWNER NAME"
                        value={form.ownerName}
                        onChangeText={(text) => updateField('ownerName', text)}
                        onBlur={() => validateField('ownerName')}
                        error={errors.ownerName}
                    />
                    <FloatingLabelInput
                        label="BUSINESS EMAIL"
                        value={form.email}
                        onChangeText={(text) => updateField('email', text)}
                        onBlur={() => validateField('email')}
                        error={errors.email}
                        keyboardType="email-address"
                    />
                    <FloatingLabelInput
                        label="PHONE NUMBER"
                        value={form.phone}
                        onChangeText={(text) => updateField('phone', text.replace(/[^0-9]/g, ''))}
                        onBlur={() => validateField('phone')}
                        error={errors.phone}
                        keyboardType="phone-pad"
                        maxLength={10}
                    />
                </View>

                {/* Business Type Section */}
                <View style={styles.businessSection}>
                    <Text style={styles.sectionTitle}>Business Type</Text>

                    <View style={styles.grid}>
                        <View style={styles.row}>
                            <BusinessTypeCard
                                title="BAKERY"
                                iconName="bread-slice"
                                isSelected={selectedBusiness === 'Bakery'}
                                onPress={() => setSelectedBusiness('Bakery')}
                            />
                            <BusinessTypeCard
                                title="HOME BAKERY"
                                iconName="home-outline"
                                isSelected={selectedBusiness === 'Home Bakery'}
                                onPress={() => setSelectedBusiness('Home Bakery')}
                            />
                        </View>
                        <View style={styles.row}>
                            <BusinessTypeCard
                                title="BAKERY & CAFÉ"
                                iconName="coffee-outline"
                                isSelected={selectedBusiness === 'Bakery & Café'}
                                onPress={() => setSelectedBusiness('Bakery & Café')}
                            />
                            <BusinessTypeCard
                                title="PASTRY SHOP"
                                iconName="cupcake"
                                isSelected={selectedBusiness === 'Pastry Shop'}
                                onPress={() => setSelectedBusiness('Pastry Shop')}
                            />
                        </View>
                    </View>
                </View>

            </ScrollView>
            <Floatingfixedbutton onPress={handleNext} onPressBack={handleBack} titletwo={"Next"} title={"Back"} />
        </SafeAreaView>
    );
};

export default Onbordingpageone;

// --- Styles ---
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    scrollContent: {
        paddingHorizontal: 18,
        paddingTop: 10,
        paddingBottom: 60,
    },
    uploadSection: {
        alignItems: 'center',
        marginBottom: 40,
        marginTop: 20,
    },
    uploadCircle: {
        width: 110,
        height: 110,
        borderRadius: 55,
        borderWidth: 1.5,
        borderColor: '#C8BCAD',
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        overflow: 'hidden',
    },
    uploadedImage: {
        width: '100%',
        height: '100%',
        borderRadius: 55,
    },
    uploadText: {
        fontSize: 10,
        fontWeight: '700',
        color: COLORS.textDark,
        marginTop: 8,
        letterSpacing: 0.5,
    },
    addBtn: {
        position: 'absolute',
        bottom: 0,
        right: '32%',
        backgroundColor: COLORS.textDark,
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: COLORS.background,
    },
    formSection: {
        marginBottom: 40,
    },
    inputContainer: {
        marginBottom: 16,
    },
    inputInner: {
        backgroundColor: COLORS.inputBg,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        borderBottomWidth: 1.5,
        borderBottomColor: COLORS.inputBorder,
        height: 65,
        justifyContent: 'center',
        paddingHorizontal: 16,
    },
    inputInnerFocused: {
        borderBottomColor: COLORS.textDark,
        borderBottomWidth: 2,
    },
    inputInnerError: {
        borderBottomColor: COLORS.error,
        borderBottomWidth: 2,
    },
    floatingLabel: {
        color: COLORS.textLight,
        position: 'absolute',
        left: 16,
    },
    floatingLabelInactive: {
        fontSize: 14,
        fontWeight: '500',
        top: 22,
    },
    floatingLabelActive: {
        fontSize: 10,
        fontWeight: '600',
        top: 10,
    },
    floatingLabelError: {
        color: COLORS.error,
    },
    textInput: {
        fontSize: 16,
        color: COLORS.textDark,
        fontWeight: '500',
        padding: 0,
        margin: 0,
        opacity: 0,
    },
    textInputActive: {
        opacity: 1,
        marginTop: 18,
    },
    errorRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
        marginLeft: 4,
        gap: 4,
    },
    errorText: {
        color: COLORS.error,
        fontSize: 11,
        fontWeight: '500',
    },
    businessSection: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 16,
        color: COLORS.textLight,
        fontWeight: '500',
        marginBottom: 16,
    },
    grid: {
        gap: 16,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 16,
    },
    cardContainer: {
        flex: 1,
        backgroundColor: COLORS.inputBg,
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 120,
    },
    cardSelected: {
        backgroundColor: COLORS.white,
        borderWidth: 1.5,
        borderColor: COLORS.textDark,
    },
    checkBadge: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: COLORS.white,
        borderRadius: 10,
    },
    iconCircle: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#EAE1D3',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    iconCircleSelected: {
        backgroundColor: COLORS.textDark,
    },
    cardTitle: {
        fontSize: 11,
        fontWeight: '700',
        color: COLORS.textDark,
        letterSpacing: 0.5,
    },
    cardTitleSelected: {
        color: COLORS.textDark,
    },
});