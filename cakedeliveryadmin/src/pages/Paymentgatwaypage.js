import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Securityheader from "../components/Securityheader";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Button from "../components/Button";

const Paymentgatwaypage = () => {
  const [upiId, setUpiId] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSave = () => {
    // Basic validation to ensure it looks like a UPI ID
    if (upiId.trim() === "" || !upiId.includes("@")) {
      Alert.alert(
        "Invalid Entry",
        "Please enter a valid UPI ID (e.g., yourname@bank)."
      );
      return;
    }

    Alert.alert(
      "Success",
      "Your UPI ID has been saved successfully!"
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Securityheader title={"Payment"} />

      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoid}
      >
        <ScrollView 
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
        >
          <View style={styles.headerWrapper}>
            <Text style={styles.screenTitle}>
              Payment Methods
            </Text>

            <View style={styles.statusBadge}>
              <MaterialCommunityIcons
                name="star-four-points"
                size={14}
                color="#8B6A5B"
              />
              <Text style={styles.statusText}>
                Active
              </Text>
            </View>
          </View>

          <View style={styles.cardContainer}>
            <View style={styles.cardHeaderRow}>
              <View style={styles.iconNest}>
                <MaterialCommunityIcons
                  name="card-account-details-outline"
                  size={24}
                  color="#8D5C72"
                />
              </View>

              <Text style={styles.cardHeading}>
                UPI Management
              </Text>
            </View>

            <Text style={styles.labelText}>
              YOUR VIRTUAL PAYMENT ADDRESS
            </Text>

            <TextInput
              placeholder="e.g. baker@okhdfc"
              placeholderTextColor="#A8A085"
              value={upiId}
              onChangeText={setUpiId}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              autoCapitalize="none"
              autoCorrect={false}
              style={[
                  styles.textInput,
                  isFocused && styles.textInputActive
              ]}
            />

            <Text style={styles.descriptionText}>
              This VPA will be used to generate your dynamic QR codes and accept
              direct bank transfers securely from customers.
            </Text>

            <View style={styles.dividerLine} />

            <View style={styles.buttonWrapper}>
                <Button
                    title="Save Changes"
                    onPress={handleSave}
                />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Paymentgatwaypage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCF9F2", // Match the modern cream aesthetic
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 22,
    paddingTop: 16,
    paddingBottom: 40,
  },
  headerWrapper: {
    marginBottom: 20,
  },
  screenTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#363317", // Deeper, more luxurious dark text
    marginBottom: 12,
    letterSpacing: 0.3,
  },
  statusBadge: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3CFC3", // Soft warm tone matching profile gold badge
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  statusText: {
    marginLeft: 6,
    color: "#8B6A5B", // Rich brown
    fontWeight: "700",
    fontSize: 13,
    letterSpacing: 0.5,
  },

  /* Card Styles */
  cardContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    paddingHorizontal: 24,
    paddingVertical: 30,
    elevation: 3, // Shadow for Android
    shadowColor: "#8B8467", // Soft shadow for iOS
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  cardHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 26,
  },
  iconNest: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#F7E2E8", // Soft rose pink matching previous icons
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  cardHeading: {
    fontSize: 20,
    fontWeight: "700",
    color: "#403A28",
  },
  labelText: {
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.2,
    color: "#9B8A67",
    marginBottom: 12,
  },

  /* Input Styles */
  textInput: {
    backgroundColor: "#FCFAEF", // Very light tint
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: Platform.OS === 'ios' ? 16 : 14,
    fontSize: 16,
    color: "#2F2A1F",
    borderWidth: 1.5,
    borderColor: "#EFE7C8", // Subtle border
    marginBottom: 16,
  },
  textInputActive: {
    backgroundColor: "#FFFFFF",
    borderColor: "#8B6A5B", // Highlights in rich brown when tapped
    elevation: 1,
    shadowColor: "#8B6A5B",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 22,
    color: "#8E8873",
    marginBottom: 28,
  },
  dividerLine: {
    height: 1,
    backgroundColor: "#F0ECE1", // Softer divider
    marginBottom: 28,
  },
  buttonWrapper: {
    marginTop: 4,
  }
});