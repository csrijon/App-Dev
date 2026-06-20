import React, { useState, useMemo } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import Resetheader from "../components/Resetheader";

const Setpasswordpage = ({ navigation }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState(false);
  const [focusedField, setFocusedField] = useState(null); // "password" | "confirm" | null

  // 🔹 Validation rules
  const hasMinLength = password.length >= 8;
  const hasSymbol = /[!@#$%^&*(),.?":{}|<>_\-+=]/.test(password);
  const hasNumber = /\d/.test(password);
  const passwordsMatch = password.length > 0 && password === confirmPassword;

  const isFormValid = hasMinLength && hasSymbol && hasNumber && passwordsMatch;

  const errorMessage = useMemo(() => {
    if (!touched) return "";
    if (!password || !confirmPassword) return "Please fill in both fields.";
    if (!hasMinLength) return "Password must be at least 8 characters.";
    if (!hasSymbol) return "Password must include at least 1 symbol.";
    if (!hasNumber) return "Password must include at least 1 number.";
    if (!passwordsMatch) return "Passwords do not match.";
    return "";
  }, [touched, password, confirmPassword, hasMinLength, hasSymbol, hasNumber, passwordsMatch]);

  const handleUpdatePassword = () => {
    setTouched(true);

    if (!isFormValid) return;

    setLoading(true);

    // Simulate API call — replace with real backend request
    setTimeout(() => {
      setLoading(false);
      navigation.navigate("PasswordChanged");
    }, 1200);
  };

  return (
    <SafeAreaView style={styles.safeZone}>
      <Resetheader />

      <ScrollView contentContainerStyle={styles.scrollShell} keyboardShouldPersistTaps="handled">
        <View style={styles.screenAura}>

          {/* 🔹 Hero Badge */}
          <View style={styles.heroShell}>
            <View style={styles.heroRing}>
              <View style={styles.heroBadge}>
                <Image
                  source={require("../images/Background.png")}
                  style={styles.heroVisual}
                />
              </View>
            </View>
          </View>

          {/* 🔹 Title */}
          <Text style={styles.mainGlyph}>Set New Password</Text>

          <Text style={styles.subGlyph}>
            Your new password must be different from previously used passwords.
          </Text>

          {/* 🔹 Form Card */}
          <View style={styles.formCard}>

            {/* New Password */}
            <Text style={styles.labelTone}>NEW PASSWORD</Text>
            <View
              style={[
                styles.inputCapsule,
                focusedField === "password" && styles.inputCapsuleFocused,
              ]}
            >
              <View style={styles.iconWell}>
                <AntDesign name="lock" size={16} color="#8a7350" />
              </View>
              <TextInput
                placeholder="••••••••"
                placeholderTextColor="#b8a888"
                style={styles.secretField}
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField(null)}
                autoCapitalize="none"
              />
              <TouchableOpacity
                onPress={() => setShowPassword((prev) => !prev)}
                style={styles.eyeTouch}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Feather name={showPassword ? "eye-off" : "eye"} size={18} color="#8a7350" />
              </TouchableOpacity>
            </View>

            {/* Confirm Password */}
            <Text style={styles.labelTone}>CONFIRM NEW PASSWORD</Text>
            <View
              style={[
                styles.inputCapsule,
                focusedField === "confirm" && styles.inputCapsuleFocused,
              ]}
            >
              <View style={styles.iconWell}>
                <AntDesign name="lock" size={16} color="#8a7350" />
              </View>
              <TextInput
                placeholder="••••••••"
                placeholderTextColor="#b8a888"
                style={styles.secretField}
                secureTextEntry={!showConfirmPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                onFocus={() => setFocusedField("confirm")}
                onBlur={() => setFocusedField(null)}
                autoCapitalize="none"
              />
              <TouchableOpacity
                onPress={() => setShowConfirmPassword((prev) => !prev)}
                style={styles.eyeTouch}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Feather name={showConfirmPassword ? "eye-off" : "eye"} size={18} color="#8a7350" />
              </TouchableOpacity>
            </View>

            {/* Error Message */}
            {errorMessage ? (
              <View style={styles.errorRow}>
                <Feather name="alert-circle" size={13} color="#b94a3f" />
                <Text style={styles.errorText}>{errorMessage}</Text>
              </View>
            ) : null}

            {/* Rules */}
            <View style={styles.ruleRow}>
              <View style={[styles.ruleChip, hasMinLength && styles.ruleChipActive]}>
                <Feather
                  name={hasMinLength ? "check-circle" : "circle"}
                  size={11}
                  color={hasMinLength ? "#3f7d4f" : "#9a8a66"}
                  style={{ marginRight: 4 }}
                />
                <Text style={[styles.ruleText, hasMinLength && styles.ruleTextActive]}>
                  8+ CHARACTERS
                </Text>
              </View>

              <View style={[styles.ruleChip, hasSymbol && styles.ruleChipActive]}>
                <Feather
                  name={hasSymbol ? "check-circle" : "circle"}
                  size={11}
                  color={hasSymbol ? "#3f7d4f" : "#9a8a66"}
                  style={{ marginRight: 4 }}
                />
                <Text style={[styles.ruleText, hasSymbol && styles.ruleTextActive]}>
                  1 SYMBOL
                </Text>
              </View>

              <View style={[styles.ruleChip, hasNumber && styles.ruleChipActive]}>
                <Feather
                  name={hasNumber ? "check-circle" : "circle"}
                  size={11}
                  color={hasNumber ? "#3f7d4f" : "#9a8a66"}
                  style={{ marginRight: 4 }}
                />
                <Text style={[styles.ruleText, hasNumber && styles.ruleTextActive]}>
                  1 NUMBER
                </Text>
              </View>
            </View>

            {/* Button */}
            <TouchableOpacity
              onPress={handleUpdatePassword}
              style={[styles.ctaPulse, !isFormValid && touched && styles.ctaPulseDisabled]}
              disabled={loading}
              activeOpacity={0.85}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <View style={styles.ctaContent}>
                  <Text style={styles.ctaText}>Update Password</Text>
                  <Feather name="arrow-right" size={18} color="#fff" />
                </View>
              )}
            </TouchableOpacity>

          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Setpasswordpage;

const styles = StyleSheet.create({
  safeZone: {
    flex: 1,
    backgroundColor: "#efe8d4",
  },

  scrollShell: {
    flexGrow: 1,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },

  screenAura: {
    flex: 1,
    paddingTop: 10,
  },

  /* Hero badge */
  heroShell: {
    alignItems: "center",
    marginTop: 16,
  },

  heroRing: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#e1d6b3",
    alignItems: "center",
    justifyContent: "center",

    shadowColor: "#7b5a4b",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 6,
  },

  heroBadge: {
    width: 128,
    height: 128,
    borderRadius: 64,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "#fff",
  },

  heroVisual: {
    width: "100%",
    height: "100%",
  },

  /* Title */
  mainGlyph: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: "800",
    color: "#2f2a1f",
    marginTop: 22,
    letterSpacing: 0.2,
  },

  subGlyph: {
    textAlign: "center",
    color: "#7d6c4d",
    marginTop: 8,
    lineHeight: 20,
    paddingHorizontal: 18,
    fontSize: 13.5,
  },

  /* Form card */
  formCard: {
    backgroundColor: "#fbf7ea",
    borderRadius: 28,
    padding: 20,
    marginTop: 28,

    shadowColor: "#3a2e1f",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 4,
  },

  labelTone: {
    marginTop: 18,
    marginBottom: 8,
    fontSize: 11.5,
    color: "#8a7350",
    fontWeight: "700",
    letterSpacing: 0.6,
  },

  inputCapsule: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#efe7d3",
    borderRadius: 18,
    paddingHorizontal: 6,
    height: 54,
    borderWidth: 1.5,
    borderColor: "transparent",
  },

  inputCapsuleFocused: {
    borderColor: "#a98a5f",
    backgroundColor: "#f5efdc",
  },

  iconWell: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "#e3d8b8",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 6,
  },

  secretField: {
    flex: 1,
    marginHorizontal: 10,
    color: "#2f2a1f",
    fontSize: 15,
    letterSpacing: 1,
  },

  eyeTouch: {
    paddingHorizontal: 8,
  },

  errorRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    gap: 6,
  },

  errorText: {
    color: "#b94a3f",
    fontSize: 12,
    fontWeight: "500",
  },

  ruleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    flexWrap: "wrap",
    gap: 8,
  },

  ruleChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#efe7d3",
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e2d6b3",
  },

  ruleChipActive: {
    backgroundColor: "#e5f3e7",
    borderColor: "#bfe0c4",
  },

  ruleText: {
    fontSize: 10,
    color: "#8a7350",
    fontWeight: "700",
    letterSpacing: 0.3,
  },

  ruleTextActive: {
    color: "#3f7d4f",
  },

  ctaPulse: {
    backgroundColor: "#7b5a4b",
    marginTop: 28,
    paddingVertical: 17,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 56,

    shadowColor: "#7b5a4b",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 5,
  },

  ctaPulseDisabled: {
    backgroundColor: "#c4b59a",
    shadowOpacity: 0,
  },

  ctaContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  ctaText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
});