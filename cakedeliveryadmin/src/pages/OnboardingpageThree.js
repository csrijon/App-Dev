import React, { useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  StatusBar,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BakeryHeader from '../components/BakeryHeader';
import Floatingfixedbutton from '../components/Floatingfixedbutton';
import { OnbordingContext } from '../context/Context';

const { width } = Dimensions.get('window');

export default function OnboardingpageThree({ navigation }) {
  const { formdata, setformdata } = useContext(OnbordingContext);

  // All available categories
  const categories = [
    'Cakes',
    'Birthday Cakes',
    'Wedding Cakes',
    'Anniversary Cakes',
    'Pastries',
    'Bread',
    'Cookies',
    'Muffins',
    'Croissants',
    'Donuts',
    'Brownies',
    'Chocolates',
    'Beverages',
    'Sandwiches',
    'Pizza',
    'Gift Combos',
  ];

  // Get selected categories from context
  const selectedCategories =
    formdata?.bakedetails?.productnames || [];

  // Handle category selection
  const toggleCategory = (category) => {
    setformdata((prev) => {
      const currentCategories =
        prev.bakedetails?.productnames || [];

      let updatedCategories;

      if (currentCategories.includes(category)) {
        // Remove category
        updatedCategories = currentCategories.filter(
          (item) => item !== category
        );
      } else {
        // Add category
        updatedCategories = [
          ...currentCategories,
          category,
        ];
      }

      return {
        ...prev,
        bakedetails: {
          ...prev.bakedetails,
          productnames: updatedCategories,
        },
      };
    });
  };

  // Handle next button
  const handleNext = () => {
    if (selectedCategories.length === 0) {
      Alert.alert(
        'Select Category',
        'Please select at least one category before continuing.'
      );
      return;
    }

    navigation.navigate('OnboardingpageFour');
  };

  // Handle back button
  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        backgroundColor="#fff8e6"
        barStyle="dark-content"
      />

      <BakeryHeader onPress={handleBack} />

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressTextRow}>
            <Text style={styles.progressTextLeft}>
              STEP 3 OF 5
            </Text>

            <Text style={styles.progressTextRight}>
              63%
            </Text>
          </View>

          <View style={styles.progressBarTrack}>
            <View
              style={[
                styles.progressBarFill,
                { width: '63%' },
              ]}
            />
          </View>
        </View>

        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.title}>
            What do you{'\n'}bake?
          </Text>

          <Text style={styles.subtitle}>
            Select the categories you'll offer in{'\n'}
            your shop.
          </Text>
        </View>

        {/* Category Selection */}
        <View style={styles.gridContainer}>
          {categories.map((item) => {
            const isSelected =
              selectedCategories.includes(item);

            return (
              <TouchableOpacity
                key={item}
                style={[
                  styles.pill,
                  isSelected
                    ? styles.pillSelected
                    : styles.pillUnselected,
                ]}
                onPress={() => toggleCategory(item)}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.pillText,
                    isSelected
                      ? styles.pillTextSelected
                      : styles.pillTextUnselected,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Image Card */}
        <View style={styles.imageCardContainer}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1000&auto=format&fit=crop',
            }}
            style={styles.bottomImage}
            resizeMode="cover"
          />

          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              AUTHENTIC QUALITY
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Buttons */}
      <Floatingfixedbutton
        onPressBack={handleBack}
        onPress={handleNext}
        title="Back"
        titletwo="Next"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAF5EE',
  },

  container: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 120,
    alignItems: 'center',
  },

  // Progress Bar
  progressContainer: {
    width: '100%',
    marginBottom: 40,
  },

  progressTextRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },

  progressTextLeft: {
    fontSize: 12,
    fontWeight: '700',
    color: '#5C443A',
    letterSpacing: 1,
  },

  progressTextRight: {
    fontSize: 12,
    fontWeight: '700',
    color: '#5C443A',
  },

  progressBarTrack: {
    height: 4,
    backgroundColor: '#EBE2D4',
    borderRadius: 2,
    width: '100%',
  },

  progressBarFill: {
    height: '100%',
    backgroundColor: '#5C443A',
    borderRadius: 2,
  },

  // Header
  headerContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },

  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#4A342B',
    textAlign: 'center',
    marginBottom: 12,
  },

  subtitle: {
    fontSize: 15,
    color: '#8A7A71',
    textAlign: 'center',
    lineHeight: 22,
  },

  // Category Grid
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 40,
    width: '100%',
  },

  pill: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 25,
    marginHorizontal: 6,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#E8DCCB',
  },

  pillUnselected: {
    backgroundColor: '#F9F5EC',
  },

  pillSelected: {
    backgroundColor: '#5C443A',
    borderColor: '#5C443A',
  },

  pillText: {
    fontSize: 14,
    fontWeight: '500',
  },

  pillTextUnselected: {
    color: '#6F5C53',
  },

  pillTextSelected: {
    color: '#FFFFFF',
  },

  // Image Card
  imageCardContainer: {
    width: width - 48,
    height: 200,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#D1B49E',
  },

  bottomImage: {
    width: '100%',
    height: '100%',
  },

  badge: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    backgroundColor: '#FFFFFF',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
  },

  badgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#8A7A71',
    letterSpacing: 0.5,
  },
});