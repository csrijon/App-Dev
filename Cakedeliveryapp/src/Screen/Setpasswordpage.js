import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import Resetheader from "../components/Resetheader";

const Setpasswordpage = ({navigation}) => {
  return (
    <SafeAreaView style={styles.safeZone}>
      <Resetheader />

      <ScrollView contentContainerStyle={styles.scrollShell}>
        <View style={styles.screenAura}>
          
          {/* 🔹 Image */}
          <View style={styles.heroShell}>
            <Image
              source={{ uri: "https://i.imgur.com/8Km9tLL.jpg" }}
              style={styles.heroVisual}
            />
          </View>

          {/* 🔹 Title */}
          <Text style={styles.mainGlyph}>Set New Password</Text>

          <Text style={styles.subGlyph}>
            Your new password must be different from previously used passwords.
          </Text>

          {/* 🔹 New Password */}
          <Text style={styles.labelTone}>NEW PASSWORD</Text>
          <View style={styles.inputCapsule}>
            <AntDesign name="lock" size={18} color="#6b5b3e" />
            <TextInput
              placeholder="••••••••"
              placeholderTextColor="#6b5b3e"
              style={styles.secretField}
            />
            <Feather name="eye" size={18} color="#6b5b3e" />
          </View>

          {/* 🔹 Confirm Password */}
          <Text style={styles.labelTone}>CONFIRM NEW PASSWORD</Text>
          <View style={styles.inputCapsule}>
            <AntDesign name="lock" size={18} color="#6b5b3e" />
            <TextInput
              placeholder="••••••••"
              placeholderTextColor="#6b5b3e"
              style={styles.secretField}
            />
            <Feather name="eye" size={18} color="#6b5b3e" />
          </View>

          {/* 🔹 Rules */}
          <View style={styles.ruleRow}>
            <View style={styles.ruleChip}>
              <Text style={styles.ruleText}>8+ CHARACTERS</Text>
            </View>

            <View style={styles.ruleChip}>
              <Text style={styles.ruleText}>1 SYMBOL</Text>
            </View>

            <View style={styles.ruleChip}>
              <Text style={styles.ruleText}>1 NUMBER</Text>
            </View>
          </View>

          {/* 🔹 Button */}
          <TouchableOpacity onPress={()=>navigation.navigate("PasswordChanged")} style={styles.ctaPulse}>
            <Text style={styles.ctaText}>Update Password →</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Setpasswordpage;

const styles = StyleSheet.create({
  safeZone: {
    flex: 1,
    backgroundColor: "#e7ddc8",
  },

  scrollShell: {
    flexGrow: 1,
    paddingBottom: 30,
    paddingHorizontal:20
  },

  screenAura: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },

  heroShell: {
    alignItems: "center",
    marginTop: 20,
  },

  heroVisual: {
    width: 192,
    height: 192,
    borderRadius: 30,
  },

  mainGlyph: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "700",
    color: "#2f2a1f",
    marginTop: 20,
  },

  subGlyph: {
    textAlign: "center",
    color: "#6b5b3e",
    marginTop: 10,
    lineHeight: 20,
    paddingHorizontal: 10,
  },

  labelTone: {
    marginTop: 25,
    marginBottom: 8,
    fontSize: 12,
    color: "#6b5b3e",
    fontWeight: "600",
  },

  inputCapsule: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#d6cda8",
    borderRadius: 30,
    paddingHorizontal: 15,
    height: 50,
  },

  secretField: {
    flex: 1,
    marginHorizontal: 10,
    color: "#2f2a1f",
  },

  ruleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },

  ruleChip: {
    backgroundColor: "#efe7d3",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 15,
  },

  ruleText: {
    fontSize: 10,
    color: "#6b5b3e",
  },

  ctaPulse: {
    backgroundColor: "#7b5a4b",
    marginTop: 30,
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
  },

  ctaText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});