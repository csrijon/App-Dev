import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const FoodCard = () => {
  return (
    <View style={styles.card}>

      {/* Left Image */}
      <Image
        source={require("../images/cakeimage.jpeg")}
        style={styles.image}
      />
      {/* Right Content */}
      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>The Flour Atelier</Text>
          <View style={styles.ratingBox}>
            <Ionicons name="star" size={12} color="#000" />
            <Text style={styles.ratingText}>4.9</Text>
          </View>
        </View>

        <Text style={styles.subtitle}>French Patisserie · 0.8 miles</Text>

        {/* Tags */}
        <View style={styles.tagRow}>
          <Text style={styles.tag}>GLUTEN-FREE</Text>
          <Text style={styles.tag}>ORGANIC</Text>
        </View>
      </View>

    </View>
  );
};

export default FoodCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    marginHorizontal: 20,
    alignItems: "center",
    width: "90%",
    alignSelf: "center",
    marginTop: 20,
  },
  image: {
    width:100,
    height: 100,
    borderTopLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  content: {
    marginLeft: 25,
    flex: 1,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "space-between",
    gap: 40,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  ratingBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E6D8B5",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  ratingText: {
    marginLeft: 3,
    fontSize: 12,
    fontWeight: "600",
  },
  subtitle: {
    color: "#555",
    marginTop: 4,
    fontSize: 13,
  },
  tagRow: {
    flexDirection: "row",
    marginTop: 8,
  },
  tag: {
    backgroundColor: "#F5EFCD",
    color: "#646040",
    fontWeight:"bold",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 9999,
    fontSize: 11,
    marginRight: 8,
  },
});