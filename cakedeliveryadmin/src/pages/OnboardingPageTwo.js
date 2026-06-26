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
import BakeryHeader from "../components/BakeryHeader"
import Floatingfixedbutton from "../components/Floatingfixedbutton"

// --- Color Palette matching the design ---
const COLORS = {
  background: '#fff8e6', // Matching your app's base background
  textDark: '#4A3320',
  textLight: '#8C7A6B',
  inputBg: '#FAF5EB',    // Slightly offset from background for inputs
  inputBorder: '#E6DACB',
  white: '#FFFFFF',
  lockedBg: '#F2ECE1',   // Darker shade for the disabled/locked input
};

// --- Custom Standard Input (Address, Landmark, City, PIN) ---
const CustomTextInput = ({ placeholder, multiline, style, ...props }) => {
  return (
    <TextInput
      style={[
        styles.inputBase,
        multiline && styles.inputMultiline,
        style,
      ]}
      placeholder={placeholder}
      placeholderTextColor={COLORS.textLight}
      multiline={multiline}
      textAlignVertical={multiline ? 'top' : 'center'}
      selectionColor={COLORS.textDark}
      {...props}
    />
  );
};

// --- Custom Select/Locked Box (State, Country) ---
const LabelBox = ({ label, value, icon, isLocked, onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={isLocked ? 1 : 0.7}
      onPress={!isLocked ? onPress : null}
      style={[
        styles.labelBoxContainer,
        isLocked && styles.labelBoxLocked
      ]}
    >
      <View style={styles.labelBoxContent}>
        <Text style={styles.topLabel}>{label}</Text>
        <Text style={[styles.boxValue, isLocked && styles.boxValueLocked]}>
          {value}
        </Text>
      </View>
      {icon && (
        <Icon 
          name={icon} 
          size={20} 
          color={isLocked ? '#B5A89A' : COLORS.textDark} 
        />
      )}
    </TouchableOpacity>
  );
};

// --- Main Screen Component ---
const OnboardingPageTwo = ({navigation}) => {
  const [form, setForm] = useState({
    address: '',
    landmark: '',
    city: '',
    pin: '',
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <BakeryHeader onPress={()=>navigation.goBack()} />
      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
      >
        
        {/* Step Badge */}
        <View style={styles.badgeContainer}>
          <View style={styles.stepBadge}>
            <Text style={styles.stepText}>STEP 2 OF 6</Text>
          </View>
        </View>

        {/* Header Titles */}
        <View style={styles.header}>
          <Text style={styles.title}>Where is your bakery located?</Text>
          <Text style={styles.subtitle}>
            Let customers find the artisanal essence of your kitchen.
          </Text>
        </View>

        {/* Form Inputs Section */}
        <View style={styles.formSection}>
          
          <CustomTextInput
            placeholder="Shop Address"
            multiline={true}
            value={form.address}
            onChangeText={(text) => setForm({ ...form, address: text })}
          />

          <CustomTextInput
            placeholder="Landmark"
            value={form.landmark}
            onChangeText={(text) => setForm({ ...form, landmark: text })}
          />

          {/* Row for City and PIN */}
          <View style={styles.row}>
            <CustomTextInput
              style={styles.flexInput}
              placeholder="City"
              value={form.city}
              onChangeText={(text) => setForm({ ...form, city: text })}
            />
            <CustomTextInput
              style={styles.flexInput}
              placeholder="PIN Code"
              keyboardType="number-pad"
              value={form.pin}
              onChangeText={(text) => setForm({ ...form, pin: text })}
            />
          </View>

          {/* Dropdown Style Box */}
          <LabelBox
            label="STATE"
            value="Select State"
            icon="chevron-down"
            onPress={() => console.log('Open state picker')}
          />

          {/* Locked Box */}
          <LabelBox
            label="COUNTRY"
            value="India"
            icon="lock-outline"
            isLocked={true}
          />

        </View>

      </ScrollView>
      <Floatingfixedbutton title={"Back"} titletwo={"Next"}/>
    </SafeAreaView>
  );
};

export default OnboardingPageTwo;

// --- Styles ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingHorizontal: 18,
    paddingTop: 20,
    paddingBottom: 60,
  },
  badgeContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  stepBadge: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#EAE1D6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  stepText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textDark,
    letterSpacing: 0.8,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: '500',
    color: COLORS.textDark,
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 15,
    color: COLORS.textLight,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 10,
  },
  formSection: {
    gap: 16, // Space between all form elements
  },
  inputBase: {
    backgroundColor: COLORS.inputBg,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    borderRadius: 24, // Generous pill-like corners
    paddingHorizontal: 20,
    paddingVertical: 16,
    fontSize: 15,
    color: COLORS.textDark,
  },
  inputMultiline: {
    minHeight: 120,
    paddingTop: 20, // Adjust top padding for multiline
  },
  row: {
    flexDirection: 'row',
    gap: 16,
  },
  flexInput: {
    flex: 1,
  },
  labelBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.inputBg,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  labelBoxLocked: {
    backgroundColor: COLORS.lockedBg,
    borderColor: 'transparent',
  },
  labelBoxContent: {
    flex: 1,
  },
  topLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#A89B8E',
    marginBottom: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  boxValue: {
    fontSize: 16,
    color: COLORS.textDark,
    fontWeight: '400',
  },
  boxValueLocked: {
    color: '#8C7A6B',
  },
});