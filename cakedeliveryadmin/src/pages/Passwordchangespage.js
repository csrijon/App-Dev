import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Alert
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Securityheader from "../components/Securityheader";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Passwordchangespage = () => {
  return (
    <SafeAreaView style={securityStyles.securityPageContainer}>
      <StatusBar backgroundColor="#F8F3E5" barStyle={"dark-content"} />
      <Securityheader title={"Reset Password"} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingBottom: 40,
        }}
      >
        <Image
          source={require("../images/catalog.png")}
          style={securityStyles.securityBannerImage}
        />

        <Text style={securityStyles.securityHeadingText}>
          Update Credentials
        </Text>

        <Text style={securityStyles.securityDescriptionText}>
          Ensure your account stays secure with a unique,
          artisanal-grade password.
        </Text>

        {/* Current Password */}

        <Text style={securityStyles.securityInputLabel}>
          Current Password
        </Text>

        <View style={securityStyles.securityInputWrapper}>
          <MaterialCommunityIcons
            name="lock-outline"
            size={20}
            color="#A89966"
          />

          <TextInput
            placeholder="Enter your current password"
            placeholderTextColor="#A89966"
            style={securityStyles.securityTextField}
          />
        </View>

        {/* New Password */}

        <Text style={securityStyles.securityInputLabel}>
          New Password
        </Text>

        <View style={securityStyles.securityInputWrapper}>
          <MaterialCommunityIcons
            name="lock-outline"
            size={20}
            color="#A89966"
          />

          <TextInput
            placeholder="Craft a new password"
            placeholderTextColor="#A89966"
            style={securityStyles.securityTextField}
          />
        </View>

        <View style={securityStyles.securityPasswordRulesRow}>
          <View style={securityStyles.securityRuleBadgePink}>
            <Text style={securityStyles.securityRuleBadgeText}>
              8+ CHARACTERS
            </Text>
          </View>

          <View style={securityStyles.securityRuleBadgeYellow}>
            <Text style={securityStyles.securityRuleBadgeText}>
              1 SYMBOL
            </Text>
          </View>
        </View>

        <View style={securityStyles.securityStrengthBadge}>
          <Text style={securityStyles.securityStrengthText}>
            HIGH STRENGTH
          </Text>
        </View>

        {/* Confirm Password */}

        <Text style={securityStyles.securityInputLabel}>
          Confirm New Password
        </Text>

        <View style={securityStyles.securityInputWrapper}>
          <MaterialCommunityIcons
            name="shield-check-outline"
            size={20}
            color="#A89966"
          />

          <TextInput
            placeholder="Repeat new password"
            placeholderTextColor="#A89966"
            style={securityStyles.securityTextField}
          />
        </View>

        {/* Button */}

        <TouchableOpacity
          onPress={() =>
            Alert.alert(
              "Success",
              "Password is updated successfully!"
            )
          }
          style={securityStyles.securityUpdateButton}
        >
          <Text
            style={securityStyles.securityUpdateButtonText}
          >
            Update Password →
          </Text>
        </TouchableOpacity>

        <Text style={securityStyles.securityFooterText}>
          Forgot your current password?
          <TouchableOpacity>
          <Text style={securityStyles.securityResetLink}>
            {" "}
            Reset via Email
          </Text>
          </TouchableOpacity>
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Passwordchangespage;

const securityStyles = StyleSheet.create({
  securityPageContainer: {
    flex: 1,
    backgroundColor: "#F8F3E5",
    paddingTop: 12,
  },

  securityBannerImage: {
    width: "100%",
    height: 220,
    borderRadius: 30,
    resizeMode: "cover",
  },

  securityHeadingText: {
    fontSize: 34,
    fontWeight: "700",
    color: "#75584e",
    marginTop: 28,
  },

  securityDescriptionText: {
    fontSize: 15,
    color: "#756C60",
    lineHeight: 22,
    marginTop: 8,
    marginBottom: 20,
  },

  securityInputLabel: {
    color: "#75584e",
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 8,
    marginTop: 16,
  },

  securityInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EAE2B3",
    borderRadius: 30,
    paddingHorizontal: 16,
    height: 54,
  },

  securityTextField: {
    flex: 1,
    marginLeft: 10,
    color: "#333",
    fontSize: 15,
  },

  securityPasswordRulesRow: {
    flexDirection: "row",
    marginTop: 12,
    gap: 8,
  },

  securityRuleBadgePink: {
    backgroundColor: "#F5D7DD",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },

  securityRuleBadgeYellow: {
    backgroundColor: "#F4E9B9",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },

  securityRuleBadgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#75584e",
  },

  securityStrengthBadge: {
    alignSelf: "flex-start",
    marginTop: 10,
    backgroundColor: "#F5D7DD",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },

  securityStrengthText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#C14A70",
  },

  securityUpdateButton: {
    marginTop: 30,
    height: 58,
    backgroundColor: "#7A5B52",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },

  securityUpdateButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },

  securityFooterText: {
    textAlign: "center",
    marginTop: 24,
    color: "#7D756D",
    fontSize: 13,
  },

  securityResetLink: {
    color: "#75584e",
    fontWeight: "700",
  },
});