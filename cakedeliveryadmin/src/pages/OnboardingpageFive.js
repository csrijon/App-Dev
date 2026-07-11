import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Switch,
    Image,
    Dimensions,
    Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
import BakeryHeader from "../components/BakeryHeader"
import Floatingfixedbutton from "../components/Floatingfixedbutton"

const DAY_OPTIONS = ['None (Open Daily)', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const TIME_OPTIONS = ['06:00 AM', '07:00 AM', '08:00 AM', '09:00 AM', '10:00 AM', '12:00 PM', '02:00 PM', '04:00 PM', '06:00 PM', '08:00 PM', '10:00 PM'];

const OnboardingpageFive = ({navigation}) => {

    // --- TOGGLE STATES ---
    const [acceptOrders247, setAcceptOrders247] = useState(false);
    const [deliveryAvailable, setDeliveryAvailable] = useState(true);

    // --- BUSINESS HOURS STATES ---
    const [openingTime, setOpeningTime] = useState('08:00 AM');
    const [closingTime, setClosingTime] = useState('06:00 PM');
    const [weeklyOff, setWeeklyOff] = useState('None (Open Daily)');

    // --- DELIVERY STATES ---
    const [deliveryRadius, setDeliveryRadius] = useState('5');
    const [deliveryCharge, setDeliveryCharge] = useState('0.00');
    const [freeDeliveryAbove, setFreeDeliveryAbove] = useState('50.00');
    const [minOrderValue, setMinOrderValue] = useState('15.00');

    // --- ERROR STATES ---
    const [errors, setErrors] = useState({});

    const isValidNumber = (val) => val.trim().length > 0 && !isNaN(Number(val)) && Number(val) >= 0;

    const handleNext = () => {
        const newErrors = {};

        if (!isValidNumber(deliveryRadius) || Number(deliveryRadius) <= 0) {
            newErrors.deliveryRadius = 'Enter a valid delivery radius (in km).';
        }
        if (deliveryAvailable) {
            if (!isValidNumber(deliveryCharge)) {
                newErrors.deliveryCharge = 'Enter a valid delivery charge.';
            }
            if (!isValidNumber(freeDeliveryAbove)) {
                newErrors.freeDeliveryAbove = 'Enter a valid free-delivery threshold.';
            }
        }
        if (!isValidNumber(minOrderValue)) {
            newErrors.minOrderValue = 'Enter a valid minimum order value.';
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            return;
        }

        navigation.navigate("Onboradingcompletepage", {
            acceptOrders247,
            deliveryAvailable,
            openingTime,
            closingTime,
            weeklyOff,
            deliveryRadius,
            deliveryCharge: deliveryAvailable ? deliveryCharge : '0.00',
            freeDeliveryAbove: deliveryAvailable ? freeDeliveryAbove : null,
            minOrderValue
        });
    };

    const clearError = (key) => {
        if (errors[key]) {
            setErrors(prev => {
                const next = { ...prev };
                delete next[key];
                return next;
            });
        }
    };

    const handleBack = () => {
        navigation.goBack();
    };

    // --- FUNCTIONAL TIME PICKER (preset options) ---
    const handleTimePicker = (type) => {
        const isOpening = type === 'Opening Time';
        const buttons = TIME_OPTIONS.map(t => ({
            text: t,
            onPress: () => isOpening ? setOpeningTime(t) : setClosingTime(t)
        }));
        buttons.push({ text: 'Cancel', style: 'cancel' });

        Alert.alert(`Select ${type}`, 'Choose a time slot', buttons, { cancelable: true });
    };

    // --- FUNCTIONAL DAY PICKER ---
    const handleDayPicker = () => {
        const buttons = DAY_OPTIONS.map(day => ({
            text: day,
            onPress: () => setWeeklyOff(day)
        }));
        buttons.push({ text: 'Cancel', style: 'cancel' });

        Alert.alert('Weekly Off Day', 'Select the day your bakery stays closed', buttons, { cancelable: true });
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <BakeryHeader/>
            <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>

                {/* --- Step Indicator (matches page 4) --- */}
                <View style={styles.stepContainer}>
                    <Text style={styles.stepText}>S t e p  5  o f  6</Text>
                    <View style={styles.stepBarsRow}>
                        <View style={[styles.stepBar, styles.stepBarActive]} />
                        <View style={[styles.stepBar, styles.stepBarActive]} />
                        <View style={[styles.stepBar, styles.stepBarActive]} />
                        <View style={[styles.stepBar, styles.stepBarActive]} />
                        <View style={[styles.stepBar, styles.stepBarActive]} />
                        <View style={[styles.stepBar, styles.stepBarInactive]} />
                    </View>
                </View>

                {/* --- Header Section --- */}
                <View style={styles.headerContainer}>
                    <View style={styles.headerIconWrapper}>
                        <View style={styles.headerIconInner}>
                            <Text style={styles.iconText}>🕒</Text>
                        </View>
                    </View>
                    <Text style={styles.title}>Availability & Delivery</Text>
                    <Text style={styles.subtitle}>
                        Configure when you're available to bake{'\n'}and how far you'll travel to deliver your{'\n'}creations.
                    </Text>
                </View>

                {/* --- Business Hours Card --- */}
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <View style={styles.cardHeaderIconCircle}>
                            <Text style={styles.cardHeaderIcon}>🕒</Text>
                        </View>
                        <Text style={styles.cardTitle}>Business Hours</Text>
                    </View>

                    <View style={styles.rowGroup}>
                        <View style={[styles.inputGroup, styles.halfInput]}>
                            <Text style={styles.inputLabel}>OPENING TIME</Text>
                            <TouchableOpacity style={styles.inputWrapper} activeOpacity={0.7} onPress={() => handleTimePicker('Opening Time')}>
                                <Text style={styles.inputText}>{openingTime}</Text>
                                <Text style={styles.inputRightIcon}>🕒</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={[styles.inputGroup, styles.halfInput]}>
                            <Text style={styles.inputLabel}>CLOSING TIME</Text>
                            <TouchableOpacity style={styles.inputWrapper} activeOpacity={0.7} onPress={() => handleTimePicker('Closing Time')}>
                                <Text style={styles.inputText}>{closingTime}</Text>
                                <Text style={styles.inputRightIcon}>🕒</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>WEEKLY OFF DAY</Text>
                        <TouchableOpacity style={styles.inputWrapper} activeOpacity={0.7} onPress={handleDayPicker}>
                            <Text style={styles.inputText}>{weeklyOff}</Text>
                            <Text style={styles.inputRightIcon}>⌄</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.toggleCard}>
                        <View style={styles.toggleTextContainer}>
                            <Text style={styles.toggleTitle}>Accept Orders 24/7</Text>
                            <Text style={styles.toggleSubtitle}>Orders can be placed even when you are closed.</Text>
                        </View>
                        <Switch
                            trackColor={{ false: '#EAE1D3', true: '#8B7365' }}
                            thumbColor={'#FFFFFF'}
                            ios_backgroundColor="#EAE1D3"
                            onValueChange={setAcceptOrders247}
                            value={acceptOrders247}
                            style={{ transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }] }}
                        />
                    </View>
                </View>

                {/* --- Delivery Settings Card --- */}
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <View style={styles.cardHeaderIconCircle}>
                            <Text style={styles.cardHeaderIcon}>🚚</Text>
                        </View>
                        <Text style={styles.cardTitle}>Delivery Settings</Text>
                    </View>

                    <TouchableOpacity
                        style={[styles.toggleCard, { marginBottom: 20 }]}
                        activeOpacity={0.8}
                        onPress={() => setDeliveryAvailable(!deliveryAvailable)}
                    >
                        <View style={styles.toggleTextContainer}>
                            <Text style={styles.toggleTitle}>Delivery Available</Text>
                            <Text style={styles.toggleSubtitle}>Enable local delivery for your customers.</Text>
                        </View>
                        <View style={[styles.checkbox, deliveryAvailable && styles.checkboxActive]}>
                            {deliveryAvailable && <Text style={styles.checkmark}>✓</Text>}
                        </View>
                    </TouchableOpacity>

                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>DELIVERY RADIUS (KM)</Text>
                        <View style={[styles.inputWrapper, errors.deliveryRadius && styles.inputWrapperError]}>
                            <Text style={styles.inputLeftIcon}>📍</Text>
                            <TextInput
                                style={styles.inputWithLeftIcon}
                                keyboardType="numeric"
                                value={deliveryRadius}
                                onChangeText={(t) => { setDeliveryRadius(t); clearError('deliveryRadius'); }}
                                placeholder="e.g. 5"
                                placeholderTextColor="#B0A39A"
                            />
                        </View>
                        {errors.deliveryRadius && <Text style={styles.errorText}>{errors.deliveryRadius}</Text>}
                    </View>

                    {deliveryAvailable && (
                        <>
                            <View style={styles.inputGroup}>
                                <Text style={styles.inputLabel}>DELIVERY CHARGE</Text>
                                <View style={[styles.inputWrapper, errors.deliveryCharge && styles.inputWrapperError]}>
                                    <Text style={styles.inputLeftIcon}>💵</Text>
                                    <TextInput
                                        style={styles.inputWithLeftIcon}
                                        keyboardType="numeric"
                                        value={deliveryCharge}
                                        onChangeText={(t) => { setDeliveryCharge(t); clearError('deliveryCharge'); }}
                                        placeholder="0.00"
                                        placeholderTextColor="#B0A39A"
                                    />
                                </View>
                                {errors.deliveryCharge && <Text style={styles.errorText}>{errors.deliveryCharge}</Text>}
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={styles.inputLabel}>FREE DELIVERY ABOVE</Text>
                                <View style={[styles.inputWrapper, errors.freeDeliveryAbove && styles.inputWrapperError]}>
                                    <Text style={styles.inputLeftIcon}>🛍️</Text>
                                    <TextInput
                                        style={styles.inputWithLeftIcon}
                                        keyboardType="numeric"
                                        value={freeDeliveryAbove}
                                        onChangeText={(t) => { setFreeDeliveryAbove(t); clearError('freeDeliveryAbove'); }}
                                        placeholder="50.00"
                                        placeholderTextColor="#B0A39A"
                                    />
                                </View>
                                {errors.freeDeliveryAbove && <Text style={styles.errorText}>{errors.freeDeliveryAbove}</Text>}
                            </View>
                        </>
                    )}

                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>MINIMUM ORDER VALUE</Text>
                        <View style={[styles.inputWrapper, errors.minOrderValue && styles.inputWrapperError]}>
                            <Text style={styles.inputLeftIcon}>🛒</Text>
                            <TextInput
                                style={styles.inputWithLeftIcon}
                                keyboardType="numeric"
                                value={minOrderValue}
                                onChangeText={(t) => { setMinOrderValue(t); clearError('minOrderValue'); }}
                                placeholder="15.00"
                                placeholderTextColor="#B0A39A"
                            />
                        </View>
                        {errors.minOrderValue && <Text style={styles.errorText}>{errors.minOrderValue}</Text>}
                    </View>
                </View>

                {/* --- Bottom Image Card --- */}
                <View style={styles.imageCardContainer}>
                    <Image
                        source={{ uri: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1000&auto=format&fit=crop' }}
                        style={styles.bottomImage}
                        resizeMode="cover"
                    />
                    <View style={styles.imageOverlay} />
                    <View style={styles.badge}>
                        <Text style={styles.badgeIcon}>🏅</Text>
                        <Text style={styles.badgeText}>PREMIUM CRAFT</Text>
                    </View>
                </View>

            </ScrollView>

            <Floatingfixedbutton
                onPressBack={handleBack}
                onPress={handleNext}
                title={"Back"}
                titletwo={"Send"}
            />
        </SafeAreaView>
    )
}

export default OnboardingpageFive

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAF5EE',
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 100,
    alignItems: 'center',
  },

  // Step Indicator
  stepContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  stepText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#A08D82',
    letterSpacing: 2,
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  stepBarsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  stepBar: {
    height: 3,
    width: 24,
    borderRadius: 2,
  },
  stepBarActive: {
    backgroundColor: '#8B7365',
  },
  stepBarInactive: {
    backgroundColor: '#DCD1C8',
  },

  // Header Styles
  headerContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  headerIconWrapper: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#EAE1D3',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  headerIconInner: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F3EDE2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 20,
  },
  title: {
    fontSize: 22,
    color: '#8B7365',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 14,
    color: '#8B7365',
    textAlign: 'center',
    lineHeight: 22,
    opacity: 0.8,
  },

  // Card Styles
  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardHeaderIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3EDE2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  cardHeaderIcon: {
    fontSize: 15,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#5C443A',
    letterSpacing: 0.2,
  },

  // Row layout for side-by-side inputs
  rowGroup: {
    flexDirection: 'row',
    gap: 12,
  },
  halfInput: {
    flex: 1,
  },

  // Input Styles
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#8B7365',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3EDE2',
    height: 50,
    borderRadius: 14,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#EAE1D3',
  },
  inputWrapperError: {
    borderColor: '#B64B4B',
    backgroundColor: '#FBF1F1',
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#5C443A',
  },
  inputText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#5C443A',
  },
  inputWithLeftIcon: {
    flex: 1,
    fontSize: 14,
    color: '#5C443A',
    marginLeft: 8,
  },
  inputRightIcon: {
    fontSize: 14,
    color: '#9E9087',
  },
  inputLeftIcon: {
    fontSize: 14,
    color: '#9E9087',
  },
  errorText: {
    fontSize: 11,
    color: '#B64B4B',
    fontWeight: '600',
    marginTop: 6,
    marginLeft: 4,
  },

  // Toggle/Action Card Styles
  toggleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F3EDE2',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EAE1D3',
    marginTop: 4,
  },
  toggleTextContainer: {
    flex: 1,
    paddingRight: 10,
  },
  toggleTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#5C443A',
    marginBottom: 4,
  },
  toggleSubtitle: {
    fontSize: 11,
    color: '#8B7365',
    lineHeight: 14,
  },

  // Custom Checkbox
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#DCD1C8',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxActive: {
    backgroundColor: '#8B7365',
    borderColor: '#8B7365',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },

  // Bottom Image Styles
  imageCardContainer: {
    width: '100%',
    height: 160,
    borderRadius: 24,
    overflow: 'hidden',
    position: 'relative',
    marginTop: 4,
  },
  bottomImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: 'rgba(0,0,0,0.15)',
  },
  badge: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  badgeIcon: {
    fontSize: 12,
    marginRight: 6,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#5C443A',
    letterSpacing: 0.5,
  },
});