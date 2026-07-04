import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Modal,
  FlatList,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BakeryHeader from "../components/BakeryHeader"
import Floatingfixedbutton from "../components/Floatingfixedbutton"

// --- Color Palette matching the design ---
const COLORS = {
  background: '#fff8e6',
  textDark: '#4A3320',
  textLight: '#8C7A6B',
  inputBg: '#FAF5EB',
  inputBorder: '#E6DACB',
  white: '#FFFFFF',
  lockedBg: '#F2ECE1',
  error: '#C0392B',
  overlay: 'rgba(0,0,0,0.4)',
};

// --- Indian States List ---
const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Andaman and Nicobar Islands', 'Chandigarh',
  'Dadra and Nagar Haveli and Daman and Diu', 'Delhi', 'Jammu and Kashmir',
  'Ladakh', 'Lakshadweep', 'Puducherry',
];

// --- Validation helpers ---
const isValidPin = (pin) => /^\d{6}$/.test(pin);

// --- Custom Standard Input (Address, Landmark, City, PIN) ---
const CustomTextInput = ({ placeholder, multiline, style, error, ...props }) => {
  return (
    <View style={style}>
      <TextInput
        style={[
          styles.inputBase,
          multiline && styles.inputMultiline,
          error && styles.inputError,
        ]}
        placeholder={placeholder}
        placeholderTextColor={COLORS.textLight}
        multiline={multiline}
        textAlignVertical={multiline ? 'top' : 'center'}
        selectionColor={COLORS.textDark}
        {...props}
      />
      {error ? (
        <View style={styles.errorRow}>
          <Icon name="alert-circle-outline" size={13} color={COLORS.error} />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}
    </View>
  );
};

// --- Custom Select/Locked Box (State, Country) ---
const LabelBox = ({ label, value, icon, isLocked, onPress, error }) => {
  return (
    <View>
      <TouchableOpacity
        activeOpacity={isLocked ? 1 : 0.7}
        onPress={!isLocked ? onPress : null}
        style={[
          styles.labelBoxContainer,
          isLocked && styles.labelBoxLocked,
          error && styles.inputError,
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
      {error ? (
        <View style={styles.errorRow}>
          <Icon name="alert-circle-outline" size={13} color={COLORS.error} />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}
    </View>
  );
};

// --- State Picker Modal ---
const StatePickerModal = ({ visible, onClose, onSelect, selectedState }) => {
  const [search, setSearch] = useState('');

  const filteredStates = INDIAN_STATES.filter((state) =>
    state.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Select State</Text>
            <TouchableOpacity onPress={onClose} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <Icon name="close" size={22} color={COLORS.textDark} />
            </TouchableOpacity>
          </View>

          <View style={styles.searchBox}>
            <Icon name="magnify" size={18} color={COLORS.textLight} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search state"
              placeholderTextColor={COLORS.textLight}
              value={search}
              onChangeText={setSearch}
              autoFocus
            />
          </View>

          <FlatList
            data={filteredStates}
            keyExtractor={(item) => item}
            style={{ maxHeight: 360 }}
            keyboardShouldPersistTaps="handled"
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.stateRow}
                onPress={() => {
                  onSelect(item);
                  setSearch('');
                  onClose();
                }}
              >
                <Text style={styles.stateRowText}>{item}</Text>
                {selectedState === item && (
                  <Icon name="check" size={18} color={COLORS.textDark} />
                )}
              </TouchableOpacity>
            )}
            ListEmptyComponent={
              <Text style={styles.noResultsText}>No matching states</Text>
            }
          />
        </View>
      </View>
    </Modal>
  );
};

// --- Main Screen Component ---
const OnboardingPageTwo = ({ navigation }) => {
  const [form, setForm] = useState({
    address: '',
    landmark: '',
    city: '',
    pin: '',
    state: '',
  });

  const [errors, setErrors] = useState({
    address: '',
    city: '',
    pin: '',
    state: '',
  });

  const [statePickerVisible, setStatePickerVisible] = useState(false);

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
      case 'address':
        if (!value.trim()) message = 'Shop address is required';
        break;
      case 'city':
        if (!value.trim()) message = 'City is required';
        break;
      case 'pin':
        if (!value.trim()) message = 'PIN code is required';
        else if (!isValidPin(value)) message = 'Enter a valid 6-digit PIN code';
        break;
      case 'state':
        if (!value.trim()) message = 'Please select a state';
        break;
      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [field]: message }));
    return message === '';
  };

  const validateAll = () => {
    const fields = ['address', 'city', 'pin', 'state'];
    const results = fields.map((field) => validateField(field));
    return results.every(Boolean);
  };

  const handleSelectState = (state) => {
    setForm((prev) => ({ ...prev, state }));
    if (errors.state) {
      setErrors((prev) => ({ ...prev, state: '' }));
    }
  };

  const handleNext = () => {
    const valid = validateAll();
    if (!valid) {
      Alert.alert('Missing information', 'Please fill in all required fields correctly before continuing.');
      return;
    }
    navigation.navigate('OnboardingpageThree', {
      ...form,
      country: 'India',
    });
  };

  const handleBack = () => {
    if (navigation.canGoBack && navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <BakeryHeader onPress={handleBack} />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
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
            onChangeText={(text) => updateField('address', text)}
            onBlur={() => validateField('address')}
            error={errors.address}
          />

          <CustomTextInput
            placeholder="Landmark"
            value={form.landmark}
            onChangeText={(text) => updateField('landmark', text)}
          />

          {/* Row for City and PIN */}
          <View style={styles.row}>
            <CustomTextInput
              style={styles.flexInput}
              placeholder="City"
              value={form.city}
              onChangeText={(text) => updateField('city', text)}
              onBlur={() => validateField('city')}
              error={errors.city}
            />
            <CustomTextInput
              style={styles.flexInput}
              placeholder="PIN Code"
              keyboardType="number-pad"
              value={form.pin}
              onChangeText={(text) => updateField('pin', text.replace(/[^0-9]/g, ''))}
              onBlur={() => validateField('pin')}
              error={errors.pin}
              maxLength={6}
            />
          </View>

          {/* Dropdown Style Box */}
          <LabelBox
            label="STATE"
            value={form.state || 'Select State'}
            icon="chevron-down"
            onPress={() => setStatePickerVisible(true)}
            error={errors.state}
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

      <StatePickerModal
        visible={statePickerVisible}
        onClose={() => setStatePickerVisible(false)}
        onSelect={handleSelectState}
        selectedState={form.state}
      />

      <Floatingfixedbutton onPress={handleNext} onPressBack={handleBack} title={"Back"} titletwo={"Next"} />
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
    gap: 16,
  },
  inputBase: {
    backgroundColor: COLORS.inputBg,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 16,
    fontSize: 15,
    color: COLORS.textDark,
  },
  inputError: {
    borderColor: COLORS.error,
    borderWidth: 1.5,
  },
  inputMultiline: {
    minHeight: 120,
    paddingTop: 20,
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
  errorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    marginLeft: 6,
    gap: 4,
  },
  errorText: {
    color: COLORS.error,
    fontSize: 11,
    fontWeight: '500',
  },
  // --- State Picker Modal Styles ---
  modalOverlay: {
    flex: 1,
    backgroundColor: COLORS.overlay,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
    maxHeight: '75%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: COLORS.textDark,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.inputBg,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    borderRadius: 14,
    paddingHorizontal: 14,
    marginBottom: 12,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 14,
    color: COLORS.textDark,
  },
  stateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F0E9DE',
  },
  stateRowText: {
    fontSize: 15,
    color: COLORS.textDark,
  },
  noResultsText: {
    textAlign: 'center',
    color: COLORS.textLight,
    paddingVertical: 20,
    fontSize: 14,
  },
});