import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
  Linking,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import Resetheader from "../components/Resetheader";

const PasswordChanged = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.85)).current;
  const badgeScale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 450,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 6,
          tension: 60,
          useNativeDriver: true,
        }),
      ]),
      Animated.spring(badgeScale, {
        toValue: 1,
        friction: 5,
        tension: 80,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleContactSupport = async () => {
    const email = "support@bakery.com";
    const subject = "Need help with my account";
    const url = `mailto:${email}?subject=${encodeURIComponent(subject)}`;

    try {
      const canOpen = await Linking.canOpenURL(url);
      if (canOpen) {
        await Linking.openURL(url);
      } else {
        Alert.alert("No email app found", `You can reach us at ${email}`);
      }
    } catch (error) {
      Alert.alert("Something went wrong", "Please try again later.");
    }
  };

  return (
    <SafeAreaView style={styles.safeCanvas}>
      <Resetheader />

      <Animated.View
        style={[
          styles.screenDeck,
          { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
        ]}
      >

        {/* 🔹 Image Section */}
        <View style={styles.heroWrap}>
          <View style={styles.heroRing}>
            <Image
              source={{ uri: "https://i.imgur.com/8Km9tLL.jpg" }}
              style={styles.heroCard}
            />
          </View>

          {/* Floating Check */}
          <Animated.View
            style={[
              styles.badgeOrb,
              { transform: [{ scale: badgeScale }] },
            ]}
          >
            <Feather name="check" size={20} color="#fff" />
          </Animated.View>
        </View>

        {/* 🔹 Title */}
        <Text style={styles.titlePulse}>Password Changed!</Text>

        <Text style={styles.descFlow}>
          Your password has been successfully reset. You can now use your new
          password to log in to your account.
        </Text>

        {/* 🔹 Button */}
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          style={styles.ctaShell}
          activeOpacity={0.85}
        >
          <Text style={styles.ctaLabel}>Back to Login</Text>
          <Feather name="arrow-right" size={18} color="#fff" />
        </TouchableOpacity>

        {/* 🔹 Support Box */}
        <TouchableOpacity
          style={styles.supportCapsule}
          onPress={handleContactSupport}
          activeOpacity={0.7}
        >
          <View style={styles.supportIconWell}>
            <AntDesign name="infocirlceo" size={15} color="#6b5b3e" />
          </View>
          <Text style={styles.supportText}>
            Need help? Contact our baking support.
          </Text>
          <Feather name="chevron-right" size={16} color="#a99c7c" />
        </TouchableOpacity>

      </Animated.View>
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
    marginTop: 30,
    alignItems: "center",
  },

  heroRing: {
    width: 236,
    height: 236,
    borderRadius: 48,
    backgroundColor: "#f4ecd8",
    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#7b5a4b",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 7,
  },

  heroCard: {
    width: 212,
    height: 212,
    borderRadius: 36,
  },

  badgeOrb: {
    position: "absolute",
    bottom: 6,
    right: 14,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#7b5a4b",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
    borderColor: "#e9dfc9",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },

  titlePulse: {
    marginTop: 28,
    fontSize: 25,
    fontWeight: "800",
    color: "#3b2f23",
    letterSpacing: 0.2,
  },

  descFlow: {
    textAlign: "center",
    color: "#6b5b3e",
    marginTop: 10,
    lineHeight: 22,
    paddingHorizontal: 14,
    fontSize: 14.5,
  },

  ctaShell: {
    marginTop: 28,
    backgroundColor: "#7b5a4b",
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    width: "100%",

    shadowColor: "#7b5a4b",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },

  ctaLabel: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.3,
  },

  supportCapsule: {
    marginTop: 22,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#efe6cf",
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: 20,
    gap: 10,
    width: "100%",
    borderWidth: 1,
    borderColor: "#e2d6b3",
  },

  supportIconWell: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: "#e3d8b8",
    alignItems: "center",
    justifyContent: "center",
  },

  supportText: {
    color: "#6b5b3e",
    fontSize: 13,
    flex: 1,
  },
});