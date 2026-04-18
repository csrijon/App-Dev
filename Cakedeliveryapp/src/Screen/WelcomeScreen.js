import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../components/Button.jsx";
import { useNavigation } from "@react-navigation/native";

const WelcomeScreen = () => {
  const navigation = useNavigation()
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#efe3d3" barStyle="dark-content" />

      <View style={styles.container}>
        {/* Logo Box */}
        <View style={styles.logoBox}>
          <Text style={styles.logoIcon}>🎂</Text>
          <View style={styles.estBox}>
            <Text style={styles.estText}>EST. 2024</Text>
          </View>
        </View>

        {/* Title */}
        <Text style={styles.title}>Cake Haven</Text>
        <Text style={styles.subtitle}>
          Where every bite is a piece of artisanal heaven.
        </Text>

        {/* Cake Image */}
        <Image
          source={require("../images/cakeimage.jpeg")}
          style={styles.cakeImage}
        />

        {/* Button */}
        <Button onPress={() => navigation.navigate("Signup")} title="Get Started" />

        {/* Footer */}
        <Text style={styles.footer}>Created By Srijon</Text>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#efe3d3",
  },

  container: {
    flex: 1,
    backgroundColor: "#efe3d3",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },

  logoBox: {
    width: 140,
    height: 140,
    backgroundColor: "#f5f0ea",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    transform: [{ rotate: "-10deg" }],
    elevation: 5, // shadow for Android
  },

  logoIcon: {
    fontSize: 40,
  },

  estBox: {
    position: "absolute",
    bottom: -10,
    backgroundColor: "#e7a9b4",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    transform: [{ rotate: "15deg" }],
  },

  estText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#5a3e36",
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 20,
    color: "#5a3e36",
  },

  subtitle: {
    fontSize: 14,
    textAlign: "center",
    marginVertical: 10,
    color: "#7a6a5f",
    paddingHorizontal: 30,
  },

  cakeImage: {
    width: 220,
    height: 160,
    borderRadius: 20,
    marginVertical: 40,
  },

  footer: {
    position: "absolute",
    bottom: 20,
    fontSize: 10,
    color: "#8c7b70",
    letterSpacing: 2,
  },
});