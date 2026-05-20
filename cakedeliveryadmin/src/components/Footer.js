import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const Footer = () => {
  return (
    <View style={styles.footer}>

      {/* top line */}
      <View style={styles.line} />

      {/* copyright */}
      <Text style={styles.copyText}>
        © 2024 The Pâtisserie Admin. All rights
        reserved.
      </Text>

      {/* links */}
      <View style={styles.linkContainer}>

        <TouchableOpacity>
          <Text style={styles.linkText}>
            Privacy
          </Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.linkText}>
            Support
          </Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.linkText}>
            Settings
          </Text>
        </TouchableOpacity>

      </View>

    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  footer: {
    marginTop: 40,
    paddingBottom: 30,
    alignItems: "center",
  },

  line: {
    width: "90%",
    height: 1,
    backgroundColor: "#DDD4C2",
    marginBottom: 24,
  },

  copyText: {
    fontSize: 15,
    color: "#7A624F",
    fontWeight: "500",
  },

  linkContainer: {
    flexDirection: "row",
    gap: 35,
    marginTop: 22,
  },

  linkText: {
    fontSize: 17,
    color: "#7A624F",
    fontWeight: "500",
  },
});