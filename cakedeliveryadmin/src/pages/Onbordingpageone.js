import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BakeryHeader from '../components/BakeryHeader';
import Floatingfixedbutton from "../components/Floatingfixedbutton"


// --- Color Palette ---
const COLORS = {
    background: '#fff8e6', // Updated to match your StatusBar
    textDark: '#4A3320',
    textLight: '#8C7A6B',
    inputBg: '#F4EFE6',
    inputBorder: '#DDCFC1',
    white: '#FFFFFF',
    accent: '#4A3320',
};

// --- Custom Component: Floating Label Input ---
const FloatingLabelInput = ({ label, value, onChangeText, keyboardType = 'default' }) => {
    const isFocusedOrFilled = value !== '';

    return (
        <View style={styles.inputContainer}>
            <View style={styles.inputInner}>
                <Text
                    style={[
                        styles.floatingLabel,
                        isFocusedOrFilled ? styles.floatingLabelActive : styles.floatingLabelInactive,
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
                />
            </View>
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
const Onbordingpageone = ({navigation}) => {
    const [form, setForm] = useState({
        bakeryName: '',
        ownerName: '',
        email: '',
        phone: '',
    });

    const [selectedBusiness, setSelectedBusiness] = useState('Home Bakery');

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle={'dark-content'} backgroundColor={'#fff8e6'} />
            <BakeryHeader />
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* Upload Logo Section */}
                <View style={styles.uploadSection}>
                    <TouchableOpacity style={styles.uploadCircle} activeOpacity={0.7}>
                        <Icon name="camera-iris" size={28} color={COLORS.textDark} />
                        <Text style={styles.uploadText}>UPLOAD LOGO</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.addBtn} activeOpacity={0.8}>
                        <Icon name="plus" size={20} color={COLORS.white} />
                    </TouchableOpacity>
                </View>

                {/* Form Inputs Section */}
                <View style={styles.formSection}>
                    <FloatingLabelInput
                        label="BAKERY NAME"
                        value={form.bakeryName}
                        onChangeText={(text) => setForm({ ...form, bakeryName: text })}
                    />
                    <FloatingLabelInput
                        label="OWNER NAME"
                        value={form.ownerName}
                        onChangeText={(text) => setForm({ ...form, ownerName: text })}
                    />
                    <FloatingLabelInput
                        label="BUSINESS EMAIL"
                        value={form.email}
                        onChangeText={(text) => setForm({ ...form, email: text })}
                        keyboardType="email-address"
                    />
                    <FloatingLabelInput
                        label="PHONE NUMBER"
                        value={form.phone}
                        onChangeText={(text) => setForm({ ...form, phone: text })}
                        keyboardType="phone-pad"
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
            <Floatingfixedbutton onPress={()=>navigation.navigate("OnboardingPageTwo")} titletwo={"Next"} title={"Back"} />
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
        paddingTop: 10, // Adjusted top padding since the header is now a separate component
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
        backgroundColor: COLORS.inputBg,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        borderBottomWidth: 1.5,
        borderBottomColor: COLORS.inputBorder,
        marginBottom: 16,
        height: 65,
        justifyContent: 'center',
    },
    inputInner: {
        flex: 1,
        paddingHorizontal: 16,
        justifyContent: 'center',
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