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
} from "react-native";
import Button from "../components/Button";

const Paymentgatwaypage = () => {
  const [upiId, setUpiId] = useState("");

  const handleSave = () => {
    if (upiId.trim() === "") {
      Alert.alert(
        "Error",
        "Please enter a UPI ID"
      );
      return;
    }

    Alert.alert(
      "Success",
      "UPI ID saved successfully!"
    );
  };

  return (
    <SafeAreaView style={styles.paymentadmincotainer}>
      <Securityheader title={"Payment"} />

      <View style={styles.paymentMethodScreenWrapper}>
        <Text style={styles.paymentMethodScreenTitle}>
          Payment Methods
        </Text>

        <View style={styles.paymentMethodStatusBadge}>
          <MaterialCommunityIcons
            name="star-four-points"
            size={14}
            color="#7B5B4E"
          />

          <Text style={styles.paymentMethodStatusText}>
            Active
          </Text>
        </View>

        <View style={styles.paymentMethodCardContainer}>
          <View style={styles.paymentMethodUpiHeaderRow}>
            <View style={styles.paymentMethodIconWrapper}>
              <MaterialCommunityIcons
                name="card-account-details-outline"
                size={22}
                color="#8B6455"
              />
            </View>

            <Text style={styles.paymentMethodUpiHeading}>
              UPI Management
            </Text>
          </View>

          <Text style={styles.paymentMethodLabelText}>
            YOUR VIRTUAL PAYMENT ADDRESS
          </Text>

          <TextInput
            placeholder="Enter UPI ID"
            placeholderTextColor="#8E7A70"
            value={upiId}
            onChangeText={setUpiId}
            style={styles.paymentMethodUpiTextInput}
          />

          <Text style={styles.paymentMethodDescriptionText}>
            This VPA will be used to generate your dynamic QR codes and accept
            direct bank transfers from customers.
          </Text>

          <View style={styles.paymentMethodDividerLine} />

          <Button
            title="Save Changes"
            onPress={handleSave}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Paymentgatwaypage;

const styles = StyleSheet.create({
  paymentadmincotainer: {
    flex: 1,
    backgroundColor: "#F8F3E5",
  },

  paymentMethodScreenWrapper: {
    paddingHorizontal: 24,
    paddingTop: 12,
  },

  paymentMethodScreenTitle: {
    fontSize: 30,
    fontWeight: "800",
    color: "#75584e",
    marginBottom: 14,
  },

  paymentMethodStatusBadge: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EED8DE",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 30,
    marginBottom: 28,
  },

  paymentMethodStatusText: {
    marginLeft: 8,
    color: "#7B5B4E",
    fontWeight: "700",
  },

  paymentMethodCardContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 42,
    paddingHorizontal: 28,
    paddingVertical: 34,
  },

  paymentMethodUpiHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 28,
  },

  paymentMethodIconWrapper: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#F2CFC3",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  paymentMethodUpiHeading: {
    fontSize: 20,
    fontWeight: "700",
    color: "#75584e",
  },

  paymentMethodLabelText: {
    fontSize: 14,
    letterSpacing: 0.8,
    color: "#646040",
    marginBottom: 8,
  },

  paymentMethodDescriptionText: {
    fontSize: 14,
    lineHeight: 20,
    color: "#9A918C",
    marginTop: 16,
    marginBottom: 28,
  },

  paymentMethodDividerLine: {
    height: 1,
    backgroundColor: "#EFE8E2",
  },

  paymentMethodUpiTextInput: {
    backgroundColor: "#EAE2B3",
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 14,
    fontSize: 18,
    color: "#3B3029",
  },
});