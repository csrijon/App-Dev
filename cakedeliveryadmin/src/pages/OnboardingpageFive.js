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

const OnboardingpageFive = ({navigation}) => {

    // --- EXISTING STATES ---
    const [acceptOrders247, setAcceptOrders247] = useState(false);
    const [deliveryAvailable, setDeliveryAvailable] = useState(true);

    // --- ADDED STATES FOR FORMS ---
    const [openingTime, setOpeningTime] = useState('08:00 AM');
    const [closingTime, setClosingTime] = useState('06:00 PM');
    const [weeklyOff, setWeeklyOff] = useState('None (Open Daily)');

    const [deliveryRadius, setDeliveryRadius] = useState('5');
    const [deliveryCharge, setDeliveryCharge] = useState('0.00');
    const [freeDeliveryAbove, setFreeDeliveryAbove] = useState('50.00');
    const [minOrderValue, setMinOrderValue] = useState('15.00');

    // --- ADDED FUNCTIONALITY HANDLERS ---
    // const handleNext = () => {
    //     // Optional validation
    //     if (!deliveryRadius) {
    //         Alert.alert("Required", "Please enter a delivery radius.");
    //         return;
    //     }

    //     // Navigate and pass all the configured data
    //     navigation.navigate("Onboradingcompletepage", {
    //         acceptOrders247,
    //         deliveryAvailable,
    //         openingTime,
    //         closingTime,
    //         weeklyOff,
    //         deliveryRadius,
    //         deliveryCharge,
    //         freeDeliveryAbove,
    //         minOrderValue
    //     });
    // };

    const handleBack = () => {
        navigation.goBack();
    };

    const handleTimePicker = (type) => {
        // In a real app, you would open a TimePicker component here (e.g., react-native-date-picker)
        Alert.alert(`${type} Picker`, `Simulating opening a time picker for ${type}.`);
    };

    const handleDayPicker = () => {
        // In a real app, you would open a Dropdown/Modal here
        Alert.alert("Select Day", "Simulating opening a dropdown to select your weekly off day.");
    };
    // ------------------------------------

    return (
        <SafeAreaView style={styles.safeArea}>
            <BakeryHeader/>
            <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>

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
                        <Text style={styles.cardHeaderIcon}>🕒</Text>
                        <Text style={styles.cardTitle}>Business Hours</Text>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>OPENING TIME</Text>
                        {/* Added TouchableOpacity to simulate Time Picker */}
                        <TouchableOpacity style={styles.inputWrapper} activeOpacity={0.8} onPress={() => handleTimePicker('Opening Time')}>
                            <TextInput style={styles.input} value={openingTime} editable={false} pointerEvents="none" />
                            <Text style={styles.inputRightIcon}>🕒</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>CLOSING TIME</Text>
                        {/* Added TouchableOpacity to simulate Time Picker */}
                        <TouchableOpacity style={styles.inputWrapper} activeOpacity={0.8} onPress={() => handleTimePicker('Closing Time')}>
                            <TextInput style={styles.input} value={closingTime} editable={false} pointerEvents="none" />
                            <Text style={styles.inputRightIcon}>🕒</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>WEEKLY OFF DAY</Text>
                        <TouchableOpacity style={styles.inputWrapper} activeOpacity={0.8} onPress={handleDayPicker}>
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
                            trackColor={{ false: '#EAE1D3', true: '#D4C9BD' }}
                            thumbColor={acceptOrders247 ? '#FFFFFF' : '#FFFFFF'}
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
                        <Text style={styles.cardHeaderIcon}>🚚</Text>
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

                    {/* Tied inputs to state variables */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>DELIVERY RADIUS (KM)</Text>
                        <View style={styles.inputWrapper}>
                            <Text style={styles.inputLeftIcon}>📍</Text>
                            <TextInput 
                                style={styles.inputWithLeftIcon} 
                                keyboardType="numeric" 
                                value={deliveryRadius} 
                                onChangeText={setDeliveryRadius} 
                            />
                        </View>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>DELIVERY CHARGE</Text>
                        <View style={styles.inputWrapper}>
                            <Text style={styles.inputLeftIcon}>💵</Text>
                            <TextInput 
                                style={styles.inputWithLeftIcon} 
                                keyboardType="numeric" 
                                value={deliveryCharge} 
                                onChangeText={setDeliveryCharge} 
                            />
                        </View>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>FREE DELIVERY ABOVE</Text>
                        <View style={styles.inputWrapper}>
                            <Text style={styles.inputLeftIcon}>🛍️</Text>
                            <TextInput 
                                style={styles.inputWithLeftIcon} 
                                keyboardType="numeric" 
                                value={freeDeliveryAbove} 
                                onChangeText={setFreeDeliveryAbove} 
                            />
                        </View>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>MINIMUM ORDER VALUE</Text>
                        <View style={styles.inputWrapper}>
                            <Text style={styles.inputLeftIcon}>🛒</Text>
                            <TextInput 
                                style={styles.inputWithLeftIcon} 
                                keyboardType="numeric" 
                                value={minOrderValue} 
                                onChangeText={setMinOrderValue} 
                            />
                        </View>
                    </View>
                </View>

                {/* --- Bottom Image Card --- */}
                <View style={styles.imageCardContainer}>
                    <Image
                        source={{ uri: 'https://www.arhomes.com/news/building-a-custom-luxury-home-with-ar-homes-discover-the-advantages-of-design-services-and-craftsmanship/' }}
                        style={styles.bottomImage}
                        resizeMode="cover"
                    />
                    <View style={styles.badge}>
                        <Text style={styles.badgeIcon}>🏅</Text>
                        <Text style={styles.badgeText}>PREMIUM CRAFT</Text>
                    </View>
                </View>

            </ScrollView>
            
            {/* Wired up functionality to the bottom buttons */}
            <Floatingfixedbutton 
                onPressBack={handleBack} 
                // onPressNext={handleNext} 
                onPress={()=>navigation.navigate("Onboradingcompletepage")}
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
    backgroundColor: '#FAF5EE', // Warm background
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 100, // Adjusted so the floating button doesn't cover the bottom image
    alignItems: 'center',
  },

  // Header Styles
  headerContainer: {
    alignItems: 'center',
    marginBottom: 30,
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
    fontSize: 18,
    fontWeight: '700',
    color: '#5C443A',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 13,
    color: '#8B7365',
    textAlign: 'center',
    lineHeight: 18,
  },

  // Card Styles
  card: {
    width: '100%',
    backgroundColor: '#F3EDE2',
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardHeaderIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#5C443A',
  },

  // Input Styles
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#8B7365',
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    height: 48,
    borderRadius: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#EAE1D3',
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#5C443A',
  },
  inputText: {
    flex: 1,
    fontSize: 14,
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

  // Toggle/Action Card Styles
  toggleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
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
    fontWeight: '600',
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
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#DCD1C8',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxActive: {
    backgroundColor: '#4A90E2', // Blue accent for checkmark
    borderColor: '#4A90E2',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },

  // Bottom Image Styles
  imageCardContainer: {
    width: width - 40,
    height: 160,
    borderRadius: 24,
    overflow: 'hidden',
    position: 'relative',
    marginTop: 10,
  },
  bottomImage: {
    width: '100%',
    height: '100%',
  },
  badge: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignItems: 'center',
  },
  badgeIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#5C443A',
    letterSpacing: 0.5,
  },
});