import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Securityheader from "../components/Securityheader";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Passwordchangespage = () => {
  // State for form values
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // State for tracking which input is focused
  const [focusedInput, setFocusedInput] = useState(null);

  // State for password visibility
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleUpdate = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert("Missing Fields", "Please fill in all password fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "Your new passwords do not match.");
      return;
    }
    if (newPassword.length < 8) {
      Alert.alert("Weak Password", "Please ensure your new password is at least 8 characters.");
      return;
    }

    Alert.alert("Success", "Your password has been beautifully updated!");
    // Clear fields after success
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#FCF9F2" barStyle={"dark-content"} />
      <Securityheader title={"Reset Password"} />

      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoid}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Banner Image */}
          <View style={styles.imageContainer}>
             <Image
                source={require("../images/catalog.png")}
                style={styles.bannerImage}
            />
          </View>

          <Text style={styles.headingText}>Update Credentials</Text>
          <Text style={styles.descriptionText}>
            Ensure your account stays secure with a unique, artisanal-grade password.
          </Text>

          {/* --- Current Password --- */}
          <Text style={styles.inputLabel}>Current Password</Text>
          <View style={[styles.inputWrapper, focusedInput === 'current' && styles.inputWrapperActive]}>
            <MaterialCommunityIcons name="lock-outline" size={20} color={focusedInput === 'current' ? "#8B6A5B" : "#A8A085"} />
            <TextInput
              placeholder="Enter your current password"
              placeholderTextColor="#A8A085"
              style={styles.textField}
              secureTextEntry={!showCurrent}
              value={currentPassword}
              onChangeText={setCurrentPassword}
              onFocus={() => setFocusedInput('current')}
              onBlur={() => setFocusedInput(null)}
            />
            <TouchableOpacity onPress={() => setShowCurrent(!showCurrent)} style={styles.eyeIcon}>
               <MaterialCommunityIcons name={showCurrent ? "eye-outline" : "eye-off-outline"} size={20} color="#8E8873" />
            </TouchableOpacity>
          </View>

          {/* --- New Password --- */}
          <Text style={styles.inputLabel}>New Password</Text>
          <View style={[styles.inputWrapper, focusedInput === 'new' && styles.inputWrapperActive]}>
            <MaterialCommunityIcons name="shield-lock-outline" size={20} color={focusedInput === 'new' ? "#8B6A5B" : "#A8A085"} />
            <TextInput
              placeholder="Craft a new password"
              placeholderTextColor="#A8A085"
              style={styles.textField}
              secureTextEntry={!showNew}
              value={newPassword}
              onChangeText={setNewPassword}
              onFocus={() => setFocusedInput('new')}
              onBlur={() => setFocusedInput(null)}
            />
            <TouchableOpacity onPress={() => setShowNew(!showNew)} style={styles.eyeIcon}>
               <MaterialCommunityIcons name={showNew ? "eye-outline" : "eye-off-outline"} size={20} color="#8E8873" />
            </TouchableOpacity>
          </View>

          {/* Password Rules Indicators */}
          <View style={styles.rulesRow}>
            <View style={[styles.ruleBadge, { backgroundColor: newPassword.length >= 8 ? "#E8F0E5" : "#F7E2E8" }]}>
              <Text style={[styles.ruleBadgeText, { color: newPassword.length >= 8 ? "#587C56" : "#9A496A" }]}>
                8+ CHARACTERS
              </Text>
            </View>

            <View style={styles.ruleBadgeYellow}>
              <Text style={styles.ruleBadgeTextYellow}>1 SYMBOL</Text>
            </View>

            {newPassword.length >= 8 && (
                <View style={styles.strengthBadge}>
                    <Text style={styles.strengthText}>HIGH STRENGTH</Text>
                </View>
            )}
          </View>

          {/* --- Confirm Password --- */}
          <Text style={styles.inputLabel}>Confirm New Password</Text>
          <View style={[styles.inputWrapper, focusedInput === 'confirm' && styles.inputWrapperActive]}>
            <MaterialCommunityIcons name="shield-check-outline" size={20} color={focusedInput === 'confirm' ? "#8B6A5B" : "#A8A085"} />
            <TextInput
              placeholder="Repeat new password"
              placeholderTextColor="#A8A085"
              style={styles.textField}
              secureTextEntry={!showConfirm}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              onFocus={() => setFocusedInput('confirm')}
              onBlur={() => setFocusedInput(null)}
            />
            <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)} style={styles.eyeIcon}>
               <MaterialCommunityIcons name={showConfirm ? "eye-outline" : "eye-off-outline"} size={20} color="#8E8873" />
            </TouchableOpacity>
          </View>

          {/* --- Action Buttons --- */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleUpdate}
            style={styles.updateButton}
          >
            <Text style={styles.updateButtonText}>Update Password</Text>
            <MaterialCommunityIcons name="arrow-right" size={20} color="#FFFFFF" style={{ marginLeft: 8 }} />
          </TouchableOpacity>

          <View style={styles.footerContainer}>
             <Text style={styles.footerText}>Forgot your current password?</Text>
             <TouchableOpacity activeOpacity={0.7}>
                <Text style={styles.resetLink}> Reset via Email</Text>
             </TouchableOpacity>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Passwordchangespage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCF9F2", // Premium cream background
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 40,
  },
  
  /* Banner Image */
  imageContainer: {
    elevation: 4, // Android shadow
    shadowColor: "#8B8467", // iOS shadow
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    marginBottom: 24,
  },
  bannerImage: {
    width: "100%",
    height: 190,
    borderRadius: 24,
    resizeMode: "cover",
  },

  /* Typography */
  headingText: {
    fontSize: 28,
    fontWeight: "800",
    color: "#363317",
    letterSpacing: 0.3,
  },
  descriptionText: {
    fontSize: 14,
    color: "#8E8873",
    lineHeight: 22,
    marginTop: 8,
    marginBottom: 24,
  },

  /* Input Fields */
  inputLabel: {
    color: "#403A28",
    fontSize: 13,
    fontWeight: "800",
    marginBottom: 10,
    marginTop: 10,
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FCFAEF",
    borderRadius: 18,
    paddingHorizontal: 18,
    height: 56,
    borderWidth: 1.5,
    borderColor: "#EFE7C8",
    marginBottom: 12,
  },
  inputWrapperActive: {
    backgroundColor: "#FFFFFF",
    borderColor: "#8B6A5B", // Rich brown highlight
    elevation: 1,
    shadowColor: "#8B6A5B",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  textField: {
    flex: 1,
    marginLeft: 12,
    color: "#2F2A1F",
    fontSize: 15,
    height: "100%",
  },
  eyeIcon: {
    padding: 4,
  },

  /* Badges */
  rulesRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 4,
    marginBottom: 16,
    gap: 8,
  },
  ruleBadge: {
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  ruleBadgeText: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  ruleBadgeYellow: {
    backgroundColor: "#FDF3D5",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  ruleBadgeTextYellow: {
    fontSize: 10,
    fontWeight: "800",
    color: "#B58A24",
    letterSpacing: 0.5,
  },
  strengthBadge: {
    backgroundColor: "#E8F0E5", // Soft mint green
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  strengthText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#587C56",
    letterSpacing: 0.5,
  },

  /* Actions */
  updateButton: {
    marginTop: 34,
    height: 58,
    backgroundColor: "#8B6A5B",
    borderRadius: 29,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#8B6A5B",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
  },
  updateButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },
  footerText: {
    color: "#8E8873",
    fontSize: 14,
  },
  resetLink: {
    color: "#8B6A5B",
    fontWeight: "700",
    fontSize: 14,
  },
});