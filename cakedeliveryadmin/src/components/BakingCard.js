import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import Feather from "react-native-vector-icons/Feather";

const BakingCard = () => {
  return (
    <View style={styles.card}>

      {/* text section */}
      <View style={styles.leftSection}>

        <Text style={styles.heading}>
          Baking Today?
        </Text>

        <Text style={styles.description}>
          You have 4 custom cake orders due for the
          weekend wedding rush.
        </Text>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>
            Review Schedule
          </Text>
        </TouchableOpacity>

      </View>

      {/* icon */}
      <View style={styles.iconContainer}>
        <Feather
          name="coffee"
          size={70}
          color="#B99F95"
        />
      </View>

    </View>
  );
};

export default BakingCard;

const styles = StyleSheet.create({
  card: {
    width: "100%",
    backgroundColor: "#7C5D52",
    borderRadius: 40,
    padding: 22,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    overflow: "hidden",
    alignSelf: "center",
    marginTop: 30,
  },

  leftSection: {
    flex: 1,
  },

  heading: {
    fontSize: 29,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  description: {
    marginTop: 10,
    fontSize: 17,
    lineHeight: 26,
    color: "#F3DDD2",
    width: 220,
    fontWeight: "500",
  },

  button: {
    marginTop: 18,
    backgroundColor: "#A88A80",
    alignSelf: "flex-start",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 30,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },

  iconContainer: {
    position: "absolute",
    right: -5,
    bottom: -5,
    opacity: 0.45,
  },
});