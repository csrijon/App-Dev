import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import Button from "../components/Button.jsx";

const WelcomeScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#F6F0E7" barStyle="dark-content" />

      <View style={styles.mainContainer}>
        <Text style={styles.topLabel}>
          ARTISANAL PATISSERIE
        </Text>

        <Text style={styles.mainTitle}>
          Bakers Haven
        </Text>

        <View style={styles.titleDivider} />

        <View style={styles.outerCircle}>
          <View style={styles.innerCircle}>
            <Image
              source={require("../images/cakeimage.jpeg")}
              style={styles.cakeImage}
            />
          </View>

          <View style={styles.sinceBadge}>
            <Text style={styles.starIcon}>★</Text>

            <Text style={styles.sinceText}>
              SINCE 2026
            </Text>
          </View>
        </View>

        <Text style={styles.descriptionText}>
          Where every bite is a piece{"\n"}
          of artisanal heaven.
        </Text>

        <View style={styles.buttonContainer}>
          <Button
            title="Get Started"
            onPress={() => navigation.navigate("Signup")}
          />
        </View>

        <View style={styles.footerContainer}>
          <View style={styles.footerLine} />

          <Text style={styles.footerText}>
            CREATED BY SRIJON
          </Text>

          <View style={styles.footerLine} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F6F0E7",
  },

  mainContainer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 25,
    paddingTop: 40,
  },

  topLabel: {
    fontSize: 10,
    letterSpacing: 4,
    color: "#B7ADA3",
    fontWeight: "600",
    marginTop: 10,
  },

  mainTitle: {
    fontSize: 42,
    fontWeight: "700",
    color: "#7B6259",
    marginTop: 10,
  },

  titleDivider: {
    width: 70,
    height: 2,
    backgroundColor: "#DDD2C7",
    marginTop: 8,
    marginBottom: 30,
  },

  outerCircle: {
    width: 280,
    height: 280,
    borderRadius: 140,
    borderWidth: 1,
    borderColor: "#E4DCD1",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },

  innerCircle: {
    width: 245,
    height: 245,
    borderRadius: 122.5,
    overflow: "hidden",
  },

  cakeImage: {
    width: "100%",
    height: "100%",
  },

  sinceBadge: {
    position: "absolute",
    right: 5,
    bottom: 40,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 30,
    elevation: 6,
  },

  starIcon: {
    color: "#B48A69",
    marginRight: 6,
    fontSize: 12,
  },

  sinceText: {
    fontSize: 10,
    color: "#8A7F75",
    fontWeight: "700",
    letterSpacing: 1,
  },

  descriptionText: {
    marginTop: 35,
    textAlign: "center",
    color: "#AAA095",
    fontSize: 22,
    lineHeight: 34,
    fontStyle: "italic",
  },

  buttonContainer: {
    width: "100%",
    marginTop: 50,
  },

  footerContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 60,
  },

  footerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#DDD3C8",
  },

  footerText: {
    marginHorizontal: 12,
    fontSize: 10,
    color: "#B6ABA0",
    letterSpacing: 2,
    fontWeight: "600",
  },
});