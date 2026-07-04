import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert
} from 'react-native';
const { width } = Dimensions.get('window')
import { SafeAreaView } from 'react-native-safe-area-context';
import BakeryHeader from "../components/BakeryHeader"
import Floatingfixedbutton from "../components/Floatingfixedbutton"

// --- ADDED IMPORT FOR GALLERY PICKER ---
import { launchImageLibrary } from 'react-native-image-picker';

const OnboardingpageFour = ({navigation})=>{
    const [fssaiNumber, setFssaiNumber] = useState('');
    
    // --- ADDED STATES FOR FILES ---
    const [fssaiDocName, setFssaiDocName] = useState('fssal_cert.pdf');
    const [gstImageUri, setGstImageUri] = useState(null);

    // const handleNext = () => {
    //     if (fssaiNumber.trim().length !== 14) {
    //         Alert.alert("Validation Error", "Please enter a valid 14-digit FSSAI License Number.");
    //         return;
    //     }
    //     navigation.navigate("OnboardingpageFive", { 
    //         fssaiNumber, 
    //         fssaiDocName, 
    //         gstImageUri 
    //     });
    // };

    const handleBack = () => {
        navigation.goBack();
    };

    const handleViewDocument = () => {
        Alert.alert("View Document", `Opening ${fssaiDocName}...`);
    };

    // --- ADDED GALLERY PICKER FUNCTIONALITY FOR FSSAI ---
    const handleReplaceDocument = () => {
        const options = {
            mediaType: 'photo',
            quality: 0.8,
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled gallery picker');
            } else if (response.errorCode) {
                Alert.alert('Error', response.errorMessage);
            } else if (response.assets && response.assets.length > 0) {
                // Update the UI with the selected file's name
                const selectedFileName = response.assets[0].fileName || 'Updated_Certificate.jpg';
                setFssaiDocName(selectedFileName);
            }
        });
    };

    // --- ADDED GALLERY PICKER FUNCTIONALITY FOR GST ---
    const handleUploadGST = () => {
        const options = {
            mediaType: 'photo',
            quality: 0.8,
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled gallery picker');
            } else if (response.errorCode) {
                Alert.alert('Error', response.errorMessage);
            } else if (response.assets && response.assets.length > 0) {
                // Save the image URI to show it in the UI
                setGstImageUri(response.assets[0].uri);
            }
        });
    };

    return(
 <SafeAreaView style={styles.safeArea}>
    <BakeryHeader/>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* --- Step Indicator --- */}
        <View style={styles.stepContainer}>
          <Text style={styles.stepText}>S t e p  4  o f  6</Text>
          <View style={styles.stepBarsRow}>
            <View style={[styles.stepBar, styles.stepBarActive]} />
            <View style={[styles.stepBar, styles.stepBarActive]} />
            <View style={[styles.stepBar, styles.stepBarActive]} />
            <View style={[styles.stepBar, styles.stepBarActive]} />
            <View style={[styles.stepBar, styles.stepBarInactive]} />
            <View style={[styles.stepBar, styles.stepBarInactive]} />
          </View>
        </View>

        {/* --- Header --- */}
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Verify Your Business</Text>
          <Text style={styles.subtitle}>
            We need a few details to ensure your{'\n'}artisanal bakery meets our quality{'\n'}standards.
          </Text>
        </View>

        {/* --- FSSAI Input --- */}
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>FSSAI LICENSE NUMBER</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter 14-digit number"
            placeholderTextColor="#B0A39A"
            keyboardType="number-pad"
            maxLength={14}
            value={fssaiNumber}
            onChangeText={setFssaiNumber}
          />
        </View>

        {/* --- Uploaded Document Card --- */}
        <View style={styles.uploadedCard}>
          <View style={styles.uploadedIconContainer}>
            <Text style={styles.documentIcon}>📄</Text>
          </View>
          <View style={styles.uploadedTextContainer}>
            <Text style={styles.uploadedTitle}>FSSAI{'\n'}CERTIFICATE</Text>
            {/* Dynamic File Name */}
            <Text style={styles.uploadedSubtitle} numberOfLines={1}>✅ {fssaiDocName}</Text>
          </View>
          <View style={styles.uploadedActions}>
            <TouchableOpacity onPress={handleViewDocument}>
              <Text style={styles.actionTextDark}>View</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginLeft: 16 }} onPress={handleReplaceDocument}>
              <Text style={styles.actionTextRed}>Replace</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* --- GST Upload Area --- */}
        <TouchableOpacity style={styles.uploadArea} activeOpacity={0.7} onPress={handleUploadGST}>
          {gstImageUri ? (
            // Show the picked image if it exists
            <Image 
                source={{ uri: gstImageUri }} 
                style={styles.uploadedImagePreview} 
                resizeMode="cover"
            />
          ) : (
            // Show the default upload UI if no image is picked
            <>
                <View style={styles.uploadIconCircle}>
                  <Text style={styles.uploadIcon}>⬆️</Text>
                </View>
                <Text style={styles.uploadAreaTitle}>GST NUMBER (OPTIONAL)</Text>
                <Text style={styles.uploadAreaSubtitle}>PDF, JPG, PNG • Max 5MB</Text>
            </>
          )}
        </TouchableOpacity>

        {/* --- Divider --- */}
        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <View style={styles.dividerBadge}>
            <Text style={styles.dividerStar}>⭐</Text>
          </View>
          <View style={styles.dividerLine} />
        </View>

        {/* --- Bottom Illustration / Image --- */}
        <View style={styles.bottomSection}>
          <View style={styles.circleOuter}>
            <View style={styles.circleInner}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1555507036-ab1e4006aaeb?q=80&w=1000&auto=format&fit=crop' }}
                style={styles.croissantImage}
              />
            </View>
          </View>
          
          <View style={styles.secureBadge}>
            <Text style={styles.secureBadgeIcon}>🛡️</Text>
            <Text style={styles.secureBadgeText}>SECURE VERIFICATION</Text>
          </View>
        </View>

      </ScrollView>

      <Floatingfixedbutton 
        onPressBack={handleBack} 
        onPress={()=>navigation.navigate("OnboardingpageFive")} 
        title={"Back"} 
        titletwo={"Send"} 
      />
    </SafeAreaView>
    )
}

export default OnboardingpageFour

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAF5EE', 
  },
  container: {
    paddingHorizontal: 18,
    paddingTop: 30,
    paddingBottom: 100, 
    alignItems: 'center',
  },
  stepContainer: {
    alignItems: 'center',
    marginBottom: 30,
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
  headerContainer: {
    alignItems: 'center',
    marginBottom: 40,
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
  inputSection: {
    width: '100%',
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#8B7365',
    marginBottom: 10,
    letterSpacing: 0.5,
  },
  textInput: {
    width: '100%',
    height: 56,
    backgroundColor: '#F3EDE2',
    borderRadius: 28,
    paddingHorizontal: 20,
    fontSize: 15,
    color: '#5C443A',
    borderWidth: 1,
    borderColor: '#EAE1D3',
  },
  uploadedCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  uploadedIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F7E9E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  documentIcon: {
    fontSize: 20,
  },
  uploadedTextContainer: {
    flex: 1,
    paddingRight: 10, // Prevents long file names from touching buttons
  },
  uploadedTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#5C443A',
    lineHeight: 16,
    marginBottom: 4,
  },
  uploadedSubtitle: {
    fontSize: 12,
    color: '#71A16C', 
    fontWeight: '600',
  },
  uploadedActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionTextDark: {
    fontSize: 13,
    fontWeight: '700',
    color: '#5C443A',
  },
  actionTextRed: {
    fontSize: 13,
    fontWeight: '700',
    color: '#B64B4B',
  },
  uploadArea: {
    width: '100%',
    height: 140,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: '#D4C9BD',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(243, 237, 226, 0.4)',
    marginBottom: 40,
    overflow: 'hidden', // Added so the image respects the border radius
  },
  uploadIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  uploadIcon: {
    fontSize: 16,
  },
  uploadAreaTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#5C443A',
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  uploadAreaSubtitle: {
    fontSize: 11,
    color: '#9E9087',
  },
  // --- ADDED STYLE FOR GST IMAGE PREVIEW ---
  uploadedImagePreview: {
    width: '100%',
    height: '100%',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    marginBottom: 40,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E3D7CC',
  },
  dividerBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#EAE1D3',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 12,
  },
  dividerStar: {
    fontSize: 10,
  },
  bottomSection: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    height: 220,
    width: 220,
  },
  circleOuter: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#EAE1D3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleInner: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 1,
    borderColor: '#EAE1D3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  croissantImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  secureBadge: {
    position: 'absolute',
    top: 10,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  secureBadgeIcon: {
    fontSize: 12,
    marginRight: 6,
  },
  secureBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#8B7365',
    letterSpacing: 0.5,
  },
});