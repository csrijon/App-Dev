import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import Resetheader from "../components/Resetheader";

const PasswordChanged = ({navigation}) => {
  return (
    <SafeAreaView style={styles.safeCanvas}>
      <Resetheader />

      <View style={styles.screenDeck}>
        
        {/* 🔹 Image Section */}
        <View style={styles.heroWrap}>
          <Image
            source={{ uri: "https://i.imgur.com/8Km9tLL.jpg" }}
            style={styles.heroCard}
          />

          {/* Floating Check */}
          <View style={styles.badgeOrb}>
            <Feather name="check" size={18} color="#fff" />
          </View>
        </View>

        {/* 🔹 Title */}
        <Text style={styles.titlePulse}>Password Changed!</Text>

        <Text style={styles.descFlow}>
          Your password has been successfully reset. You can now use your new
          password to log in to your account.
        </Text>

        {/* 🔹 Button */}
        <TouchableOpacity onPress={()=>navigation.navigate("Login")} style={styles.ctaShell}>
          <Text style={styles.ctaLabel}>Back to Login →</Text>
        </TouchableOpacity>

        {/* 🔹 Support Box */}
        <View style={styles.supportCapsule}>
          <AntDesign name="infocirlceo" size={16} color="#6b5b3e" />
          <Text style={styles.supportText}>
            Need help? Contact our baking support.
          </Text>
        </View>

      </View>
    </SafeAreaView>
  );
};

export default PasswordChanged;

const styles = StyleSheet.create({
  safeCanvas: {
    flex: 1,
    backgroundColor: "#e9dfc9",
  },

  screenDeck: {
    paddingHorizontal: 20,
    alignItems: "center",
  },

  heroWrap: {
    marginTop: 20,
    alignItems: "center",
  },

  heroCard: {
    width: 220,
    height: 220,
    borderRadius: 40,
  },

  badgeOrb: {
    position: "absolute",
    bottom: 10,
    right: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#7b5a4b",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#e9dfc9",
  },

  titlePulse: {
    marginTop: 25,
    fontSize: 24,
    fontWeight: "700",
    color: "#3b2f23",
  },

  descFlow: {
    textAlign: "center",
    color: "#6b5b3e",
    marginTop: 10,
    lineHeight: 22,
    paddingHorizontal: 10,
  },

  ctaShell: {
    marginTop: 25,
    backgroundColor: "#7b5a4b",
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 30,
    elevation: 5,
  },

  ctaLabel: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  supportCapsule: {
    marginTop: 25,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#efe6cf",
    padding: 14,
    borderRadius: 20,
    gap: 8,
  },

  supportText: {
    color: "#6b5b3e",
    fontSize: 13,
  },
});