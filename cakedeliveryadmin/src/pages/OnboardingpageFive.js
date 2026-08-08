import React, { useState, useContext } from 'react';

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Switch,
  Image,
  Alert,
  Modal,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import BakeryHeader from '../components/BakeryHeader';
import Floatingfixedbutton from '../components/Floatingfixedbutton';

import { OnbordingContext } from '../context/Context.js';


// ------------------------------------------
// Constants
// ------------------------------------------

const DAY_OPTIONS = [
  'None (Open Daily)',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

const HOURS = Array.from(
  { length: 12 },
  (_, i) => i + 1
);

const MINUTES = Array.from(
  { length: 60 },
  (_, i) => i
);

const PERIODS = ['AM', 'PM'];

const ITEM_HEIGHT = 44;


// ------------------------------------------
// Parse Time
// ------------------------------------------

const parseTime = (timeStr) => {

  const match = timeStr?.match(
    /(\d{1,2}):(\d{2})\s*(AM|PM)/i
  );

  if (!match) {
    return {
      hour: 8,
      minute: 0,
      period: 'AM',
    };
  }

  return {
    hour: parseInt(match[1], 10),
    minute: parseInt(match[2], 10),
    period: match[3].toUpperCase(),
  };
};


// ------------------------------------------
// Format Time
// ------------------------------------------

const formatTime = (
  hour,
  minute,
  period
) => {
  return `${String(hour).padStart(2, '0')}:${String(
    minute
  ).padStart(2, '0')} ${period}`;
};


// ------------------------------------------
// Component
// ------------------------------------------

const OnboardingpageFive = ({
  navigation,
}) => {

  const {
    formdata,
    setformdata,
  } = useContext(OnbordingContext);


  // ------------------------------------------
  // Availability
  // ------------------------------------------

  const availabilitydetails =
    formdata?.availability || {
      openingtime: '',
      closingtime: '',
      weeklyoffday: '',
      acceptorder: false,
      deliveryavailable: false,
      deliveryradius: '',
      deliverycharge: '',
      freedeliveryabove: '',
      minimumordervalue: '',
    };


  // ------------------------------------------
  // Get values from context
  // ------------------------------------------

  const openingTime =
    availabilitydetails.openingtime;

  const closingTime =
    availabilitydetails.closingtime;

  const weeklyOff =
    availabilitydetails.weeklyoffday;

  const acceptOrders247 =
    availabilitydetails.acceptorder;

  const deliveryAvailable =
    availabilitydetails.deliveryavailable;

  const deliveryRadius =
    availabilitydetails.deliveryradius;

  const deliveryCharge =
    availabilitydetails.deliverycharge;

  const freeDeliveryAbove =
    availabilitydetails.freedeliveryabove;

  const minOrderValue =
    availabilitydetails.minimumordervalue;


  // ------------------------------------------
  // Common updater
  // ------------------------------------------

  const updateAvailability = (
    key,
    value
  ) => {

    setformdata((prev) => ({
      ...prev,

      availability: {
        ...prev.availability,

        [key]: value,
      },
    }));
  };


  // ------------------------------------------
  // Error State
  // ------------------------------------------

  const [errors, setErrors] =
    useState({});


  // ------------------------------------------
  // Time Picker State
  // ------------------------------------------

  const [
    timePickerVisible,
    setTimePickerVisible,
  ] = useState(false);

  const [
    activeTimeField,
    setActiveTimeField,
  ] = useState(null);

  const [
    pickerHour,
    setPickerHour,
  ] = useState(8);

  const [
    pickerMinute,
    setPickerMinute,
  ] = useState(0);

  const [
    pickerPeriod,
    setPickerPeriod,
  ] = useState('AM');


  // ------------------------------------------
  // Number Validation
  // ------------------------------------------

  const isValidNumber = (value) => {

    return (
      value?.trim().length > 0 &&
      !isNaN(Number(value)) &&
      Number(value) >= 0
    );
  };


  // ------------------------------------------
  // Clear Error
  // ------------------------------------------

  const clearError = (key) => {

    if (!errors[key]) {
      return;
    }

    setErrors((prev) => {

      const next = {
        ...prev,
      };

      delete next[key];

      return next;
    });
  };


  // ------------------------------------------
  // Next
  // ------------------------------------------

  const handleNext = () => {

    const newErrors = {};


    // Delivery radius

    if (
      !isValidNumber(deliveryRadius) ||
      Number(deliveryRadius) <= 0
    ) {

      newErrors.deliveryRadius =
        'Enter a valid delivery radius (in km).';
    }


    // Delivery fields

    if (deliveryAvailable) {

      if (
        !isValidNumber(deliveryCharge)
      ) {

        newErrors.deliveryCharge =
          'Enter a valid delivery charge.';
      }


      if (
        !isValidNumber(
          freeDeliveryAbove
        )
      ) {

        newErrors.freeDeliveryAbove =
          'Enter a valid free-delivery threshold.';
      }
    }


    // Minimum order

    if (
      !isValidNumber(minOrderValue)
    ) {

      newErrors.minOrderValue =
        'Enter a valid minimum order value.';
    }


    setErrors(newErrors);


    if (
      Object.keys(newErrors).length > 0
    ) {
      return;
    }


    // Navigate

    navigation.navigate(
      'Onboradingcompletepage',
      {
        acceptOrders247,
        deliveryAvailable,

        openingTime,
        closingTime,

        weeklyOff,

        deliveryRadius,

        deliveryCharge:
          deliveryAvailable
            ? deliveryCharge
            : '0.00',

        freeDeliveryAbove:
          deliveryAvailable
            ? freeDeliveryAbove
            : null,

        minOrderValue,
      }
    );
  };


  // ------------------------------------------
  // Back
  // ------------------------------------------

  const handleBack = () => {
    navigation.goBack();
  };


  // ------------------------------------------
  // Open Time Picker
  // ------------------------------------------

  const openTimePicker = (
    field
  ) => {

    const currentTime =
      field === 'opening'
        ? openingTime
        : closingTime;


    const parsed =
      parseTime(currentTime);


    setPickerHour(
      parsed.hour
    );

    setPickerMinute(
      parsed.minute
    );

    setPickerPeriod(
      parsed.period
    );


    setActiveTimeField(field);

    setTimePickerVisible(true);
  };


  // ------------------------------------------
  // Confirm Time Picker
  // ------------------------------------------

  const confirmTimePicker = () => {

    const result =
      formatTime(
        pickerHour,
        pickerMinute,
        pickerPeriod
      );


    if (
      activeTimeField === 'opening'
    ) {

      updateAvailability(
        'openingtime',
        result
      );
    }


    if (
      activeTimeField === 'closing'
    ) {

      updateAvailability(
        'closingtime',
        result
      );
    }


    setTimePickerVisible(false);
  };


  // ------------------------------------------
  // Weekly Off Picker
  // ------------------------------------------

  const handleDayPicker = () => {

    const buttons =
      DAY_OPTIONS.map((day) => ({

        text: day,

        onPress: () => {

          updateAvailability(
            'weeklyoffday',
            day
          );
        },
      }));


    buttons.push({
      text: 'Cancel',
      style: 'cancel',
    });


    Alert.alert(
      'Weekly Off Day',
      'Select the day your bakery stays closed',
      buttons,
      {
        cancelable: true,
      }
    );
  };


  // ------------------------------------------
  // UI
  // ------------------------------------------

  return (

    <SafeAreaView
      style={styles.safeArea}
    >

      <BakeryHeader />


      <ScrollView
        contentContainerStyle={
          styles.container
        }
        showsVerticalScrollIndicator={
          false
        }
      >


        {/* Step */}

        <View
          style={styles.stepContainer}
        >

          <Text
            style={styles.stepText}
          >
            S t e p  5  o f  6
          </Text>


          <View
            style={styles.stepBarsRow}
          >

            {[1, 2, 3, 4, 5].map(
              (item) => (

                <View
                  key={item}
                  style={[
                    styles.stepBar,
                    styles.stepBarActive,
                  ]}
                />
              )
            )}


            <View
              style={[
                styles.stepBar,
                styles.stepBarInactive,
              ]}
            />

          </View>

        </View>


        {/* Header */}

        <View
          style={styles.headerContainer}
        >

          <View
            style={
              styles.headerIconWrapper
            }
          >

            <View
              style={
                styles.headerIconInner
              }
            >

              <Text
                style={styles.iconText}
              >
                🕒
              </Text>

            </View>

          </View>


          <Text
            style={styles.title}
          >
            Availability & Delivery
          </Text>


          <Text
            style={styles.subtitle}
          >
            Configure when you're available
            to bake{'\n'}
            and how far you'll travel to
            deliver your{'\n'}
            creations.
          </Text>

        </View>


        {/* ================================= */}
        {/* Business Hours */}
        {/* ================================= */}

        <View style={styles.card}>

          <View
            style={styles.cardHeader}
          >

            <View
              style={
                styles.cardHeaderIconCircle
              }
            >

              <Text
                style={
                  styles.cardHeaderIcon
                }
              >
                🕒
              </Text>

            </View>


            <Text
              style={styles.cardTitle}
            >
              Business Hours
            </Text>

          </View>


          {/* Opening + Closing */}

          <View
            style={styles.rowGroup}
          >


            {/* Opening */}

            <View
              style={[
                styles.inputGroup,
                styles.halfInput,
              ]}
            >

              <Text
                style={styles.inputLabel}
              >
                OPENING TIME
              </Text>


              <TouchableOpacity
                style={styles.inputWrapper}
                activeOpacity={0.7}
                onPress={() =>
                  openTimePicker(
                    'opening'
                  )
                }
              >

                <Text
                  style={styles.inputText}
                >
                  {openingTime}
                </Text>


                <Text
                  style={
                    styles.inputRightIcon
                  }
                >
                  🕒
                </Text>

              </TouchableOpacity>

            </View>


            {/* Closing */}

            <View
              style={[
                styles.inputGroup,
                styles.halfInput,
              ]}
            >

              <Text
                style={styles.inputLabel}
              >
                CLOSING TIME
              </Text>


              <TouchableOpacity
                style={styles.inputWrapper}
                activeOpacity={0.7}
                onPress={() =>
                  openTimePicker(
                    'closing'
                  )
                }
              >

                <Text
                  style={styles.inputText}
                >
                  {closingTime}
                </Text>


                <Text
                  style={
                    styles.inputRightIcon
                  }
                >
                  🕒
                </Text>

              </TouchableOpacity>

            </View>

          </View>


          {/* Weekly Off */}

          <View
            style={styles.inputGroup}
          >

            <Text
              style={styles.inputLabel}
            >
              WEEKLY OFF DAY
            </Text>


            <TouchableOpacity
              style={styles.inputWrapper}
              activeOpacity={0.7}
              onPress={
                handleDayPicker
              }
            >

              <Text
                style={styles.inputText}
              >
                {weeklyOff}
              </Text>


              <Text
                style={
                  styles.inputRightIcon
                }
              >
                ⌄
              </Text>

            </TouchableOpacity>

          </View>


          {/* Accept Orders */}

          <View
            style={styles.toggleCard}
          >

            <View
              style={
                styles.toggleTextContainer
              }
            >

              <Text
                style={styles.toggleTitle}
              >
                Accept Orders 24/7
              </Text>


              <Text
                style={
                  styles.toggleSubtitle
                }
              >
                Orders can be placed even when
                you are closed.
              </Text>

            </View>


            <Switch

              trackColor={{
                false: '#EAE1D3',
                true: '#8B7365',
              }}

              thumbColor="#FFFFFF"

              ios_backgroundColor="#EAE1D3"


              onValueChange={(value) =>
                updateAvailability(
                  'acceptorder',
                  value
                )
              }


              value={
                acceptOrders247
              }


              style={{
                transform: [
                  {
                    scaleX: 0.9,
                  },
                  {
                    scaleY: 0.9,
                  },
                ],
              }}

            />

          </View>

        </View>


        {/* ================================= */}
        {/* Delivery Settings */}
        {/* ================================= */}

        <View style={styles.card}>

          <View
            style={styles.cardHeader}
          >

            <View
              style={
                styles.cardHeaderIconCircle
              }
            >

              <Text
                style={
                  styles.cardHeaderIcon
                }
              >
                🚚
              </Text>

            </View>


            <Text
              style={styles.cardTitle}
            >
              Delivery Settings
            </Text>

          </View>


          {/* Delivery Available */}

          <TouchableOpacity

            style={[
              styles.toggleCard,
              {
                marginBottom: 20,
              },
            ]}

            activeOpacity={0.8}

            onPress={() =>
              updateAvailability(
                'deliveryavailable',
                !deliveryAvailable
              )
            }

          >

            <View
              style={
                styles.toggleTextContainer
              }
            >

              <Text
                style={styles.toggleTitle}
              >
                Delivery Available
              </Text>


              <Text
                style={
                  styles.toggleSubtitle
                }
              >
                Enable local delivery for your
                customers.
              </Text>

            </View>


            <View
              style={[
                styles.checkbox,

                deliveryAvailable &&
                  styles.checkboxActive,
              ]}
            >

              {deliveryAvailable && (

                <Text
                  style={styles.checkmark}
                >
                  ✓
                </Text>

              )}

            </View>

          </TouchableOpacity>


          {/* Delivery Radius */}

          <View
            style={styles.inputGroup}
          >

            <Text
              style={styles.inputLabel}
            >
              DELIVERY RADIUS (KM)
            </Text>


            <View
              style={[
                styles.inputWrapper,

                errors.deliveryRadius &&
                  styles.inputWrapperError,
              ]}
            >

              <Text
                style={
                  styles.inputLeftIcon
                }
              >
                📍
              </Text>


              <TextInput

                style={
                  styles.inputWithLeftIcon
                }

                keyboardType="numeric"

                value={
                  deliveryRadius
                }

                onChangeText={(text) => {

                  updateAvailability(
                    'deliveryradius',
                    text
                  );

                  clearError(
                    'deliveryRadius'
                  );

                }}

                placeholder="e.g. 5"

                placeholderTextColor="#B0A39A"

              />

            </View>


            {errors.deliveryRadius && (

              <Text
                style={styles.errorText}
              >
                {
                  errors.deliveryRadius
                }
              </Text>

            )}

          </View>


          {/* Delivery dependent fields */}

          {deliveryAvailable && (

            <>

              {/* Delivery Charge */}

              <View
                style={styles.inputGroup}
              >

                <Text
                  style={styles.inputLabel}
                >
                  DELIVERY CHARGE
                </Text>


                <View
                  style={[
                    styles.inputWrapper,

                    errors.deliveryCharge &&
                      styles.inputWrapperError,
                  ]}
                >

                  <Text
                    style={
                      styles.inputLeftIcon
                    }
                  >
                    💵
                  </Text>


                  <TextInput

                    style={
                      styles.inputWithLeftIcon
                    }

                    keyboardType="numeric"

                    value={
                      deliveryCharge
                    }

                    onChangeText={(text) => {

                      updateAvailability(
                        'deliverycharge',
                        text
                      );

                      clearError(
                        'deliveryCharge'
                      );

                    }}

                    placeholder="0.00"

                    placeholderTextColor="#B0A39A"

                  />

                </View>


                {errors.deliveryCharge && (

                  <Text
                    style={styles.errorText}
                  >
                    {
                      errors.deliveryCharge
                    }
                  </Text>

                )}

              </View>


              {/* Free Delivery Above */}

              <View
                style={styles.inputGroup}
              >

                <Text
                  style={styles.inputLabel}
                >
                  FREE DELIVERY ABOVE
                </Text>


                <View
                  style={[
                    styles.inputWrapper,

                    errors.freeDeliveryAbove &&
                      styles.inputWrapperError,
                  ]}
                >

                  <Text
                    style={
                      styles.inputLeftIcon
                    }
                  >
                    🛍️
                  </Text>


                  <TextInput

                    style={
                      styles.inputWithLeftIcon
                    }

                    keyboardType="numeric"

                    value={
                      freeDeliveryAbove
                    }

                    onChangeText={(text) => {

                      updateAvailability(
                        'freedeliveryabove',
                        text
                      );

                      clearError(
                        'freeDeliveryAbove'
                      );

                    }}

                    placeholder="50.00"

                    placeholderTextColor="#B0A39A"

                  />

                </View>


                {errors.freeDeliveryAbove && (

                  <Text
                    style={styles.errorText}
                  >
                    {
                      errors.freeDeliveryAbove
                    }
                  </Text>

                )}

              </View>

            </>

          )}


          {/* Minimum Order Value */}

          <View
            style={styles.inputGroup}
          >

            <Text
              style={styles.inputLabel}
            >
              MINIMUM ORDER VALUE
            </Text>


            <View
              style={[
                styles.inputWrapper,

                errors.minOrderValue &&
                  styles.inputWrapperError,
              ]}
            >

              <Text
                style={
                  styles.inputLeftIcon
                }
              >
                🛒
              </Text>


              <TextInput

                style={
                  styles.inputWithLeftIcon
                }

                keyboardType="numeric"

                value={
                  minOrderValue
                }

                onChangeText={(text) => {

                  updateAvailability(
                    'minimumordervalue',
                    text
                  );

                  clearError(
                    'minOrderValue'
                  );

                }}

                placeholder="15.00"

                placeholderTextColor="#B0A39A"

              />

            </View>


            {errors.minOrderValue && (

              <Text
                style={styles.errorText}
              >
                {
                  errors.minOrderValue
                }
              </Text>

            )}

          </View>

        </View>


        {/* ================================= */}
        {/* Bottom Image */}
        {/* ================================= */}

        <View
          style={
            styles.imageCardContainer
          }
        >

          <Image

            source={{
              uri:
                'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1000&auto=format&fit=crop',
            }}

            style={styles.bottomImage}

            resizeMode="cover"

          />


          <View
            style={styles.imageOverlay}
          />


          <View style={styles.badge}>

            <Text
              style={styles.badgeIcon}
            >
              🏅
            </Text>


            <Text
              style={styles.badgeText}
            >
              PREMIUM CRAFT
            </Text>

          </View>

        </View>

      </ScrollView>


      {/* ================================= */}
      {/* Bottom Buttons */}
      {/* ================================= */}

      <Floatingfixedbutton

        onPressBack={
          handleBack
        }

        onPress={
          handleNext
        }

        title="Back"

        titletwo="Send"

      />


      {/* ================================= */}
      {/* Time Picker Modal */}
      {/* ================================= */}

      <Modal

        visible={
          timePickerVisible
        }

        transparent

        animationType="slide"

        onRequestClose={() =>
          setTimePickerVisible(
            false
          )
        }

      >

        <View
          style={
            styles.pickerOverlay
          }
        >

          <View
            style={
              styles.pickerSheet
            }
          >

            <Text
              style={
                styles.pickerTitle
              }
            >

              {activeTimeField ===
              'opening'
                ? 'Select Opening Time'
                : 'Select Closing Time'}

            </Text>


            <View
              style={styles.pickerRow}
            >


              {/* Hours */}

              <ScrollView

                style={
                  styles.pickerColumn
                }

                showsVerticalScrollIndicator={
                  false
                }

                contentContainerStyle={{
                  paddingVertical:
                    ITEM_HEIGHT,
                }}

              >

                {HOURS.map(
                  (hour) => (

                    <TouchableOpacity

                      key={hour}

                      style={[
                        styles.pickerItem,

                        hour ===
                          pickerHour &&
                          styles.pickerItemActive,
                      ]}

                      onPress={() =>
                        setPickerHour(
                          hour
                        )
                      }

                    >

                      <Text
                        style={[
                          styles.pickerItemText,

                          hour ===
                            pickerHour &&
                            styles.pickerItemTextActive,
                        ]}
                      >
                        {hour}
                      </Text>

                    </TouchableOpacity>

                  )
                )}

              </ScrollView>


              <Text
                style={
                  styles.pickerColon
                }
              >
                :
              </Text>


              {/* Minutes */}

              <ScrollView

                style={
                  styles.pickerColumn
                }

                showsVerticalScrollIndicator={
                  false
                }

                contentContainerStyle={{
                  paddingVertical:
                    ITEM_HEIGHT,
                }}

              >

                {MINUTES.map(
                  (minute) => (

                    <TouchableOpacity

                      key={minute}

                      style={[
                        styles.pickerItem,

                        minute ===
                          pickerMinute &&
                          styles.pickerItemActive,
                      ]}

                      onPress={() =>
                        setPickerMinute(
                          minute
                        )
                      }

                    >

                      <Text
                        style={[
                          styles.pickerItemText,

                          minute ===
                            pickerMinute &&
                            styles.pickerItemTextActive,
                        ]}
                      >

                        {String(
                          minute
                        ).padStart(
                          2,
                          '0'
                        )}

                      </Text>

                    </TouchableOpacity>

                  )
                )}

              </ScrollView>


              {/* AM / PM */}

              <ScrollView

                style={
                  styles.pickerColumn
                }

                showsVerticalScrollIndicator={
                  false
                }

                contentContainerStyle={{
                  paddingVertical:
                    ITEM_HEIGHT,
                }}

              >

                {PERIODS.map(
                  (period) => (

                    <TouchableOpacity

                      key={period}

                      style={[
                        styles.pickerItem,

                        period ===
                          pickerPeriod &&
                          styles.pickerItemActive,
                      ]}

                      onPress={() =>
                        setPickerPeriod(
                          period
                        )
                      }

                    >

                      <Text
                        style={[
                          styles.pickerItemText,

                          period ===
                            pickerPeriod &&
                            styles.pickerItemTextActive,
                        ]}
                      >
                        {period}
                      </Text>

                    </TouchableOpacity>

                  )
                )}

              </ScrollView>

            </View>


            {/* Modal Buttons */}

            <View
              style={
                styles.pickerButtonRow
              }
            >

              <TouchableOpacity

                style={
                  styles.pickerCancelBtn
                }

                onPress={() =>
                  setTimePickerVisible(
                    false
                  )
                }

              >

                <Text
                  style={
                    styles.pickerCancelText
                  }
                >
                  Cancel
                </Text>

              </TouchableOpacity>


              <TouchableOpacity

                style={
                  styles.pickerConfirmBtn
                }

                onPress={
                  confirmTimePicker
                }

              >

                <Text
                  style={
                    styles.pickerConfirmText
                  }
                >
                  Done
                </Text>

              </TouchableOpacity>

            </View>

          </View>

        </View>

      </Modal>

    </SafeAreaView>
  );
};


// ------------------------------------------
// Export
// ------------------------------------------

export default OnboardingpageFive;


// ==========================================
// Styles
// ==========================================

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


  // Step

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


  // Header

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

    shadowOffset: {
      width: 0,
      height: 4,
    },

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


  // Card

  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 20,
    marginBottom: 20,

    shadowColor: '#000',

    shadowOffset: {
      width: 0,
      height: 4,
    },

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


  rowGroup: {
    flexDirection: 'row',
    gap: 12,
  },


  halfInput: {
    flex: 1,
  },


  // Inputs

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


  // Toggle

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


  // Checkbox

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


  // Image

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

    shadowOffset: {
      width: 0,
      height: 2,
    },

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


  // Time Picker

  pickerOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },


  pickerSheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },


  pickerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#5C443A',
    textAlign: 'center',
    marginBottom: 16,
  },


  pickerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: ITEM_HEIGHT * 3,
  },


  pickerColumn: {
    width: 70,
  },


  pickerColon: {
    fontSize: 20,
    fontWeight: '700',
    color: '#5C443A',
    marginHorizontal: 4,
  },


  pickerItem: {
    height: ITEM_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },


  pickerItemActive: {
    backgroundColor: '#F3EDE2',
    borderRadius: 12,
  },


  pickerItemText: {
    fontSize: 16,
    color: '#B0A39A',
  },


  pickerItemTextActive: {
    fontSize: 18,
    fontWeight: '800',
    color: '#8B7365',
  },


  pickerButtonRow: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 12,
  },


  pickerCancelBtn: {
    flex: 1,
    height: 48,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#EAE1D3',
    justifyContent: 'center',
    alignItems: 'center',
  },


  pickerCancelText: {
    color: '#8B7365',
    fontWeight: '700',
  },


  pickerConfirmBtn: {
    flex: 1,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#8B7365',
    justifyContent: 'center',
    alignItems: 'center',
  },


  pickerConfirmText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },

});