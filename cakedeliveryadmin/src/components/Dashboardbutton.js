import React from "react";

import {
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";

const Dashboardbutton = ({title,name,buttonstyle,Textstyle}) => {
  return (
    <TouchableOpacity  style={[pastryButtonStyles.outerShell,buttonstyle]}>
      <Text style={[pastryButtonStyles.buttonLabel,Textstyle]}>
        {title}{"\n"}{name}
      </Text>
    </TouchableOpacity>
  );
};

export default Dashboardbutton;

const pastryButtonStyles = StyleSheet.create({
  outerShell: {
    flex:1,
    height: 72,
    backgroundColor: "#F4F2F0",
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E6DDD3",
  },

  buttonLabel: {
    textAlign: "center",
    color: "#7A5B4D",
    fontSize: 17,
    fontWeight: "600",
    lineHeight: 28,
  },
});