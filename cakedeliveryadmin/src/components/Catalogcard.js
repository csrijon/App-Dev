import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const Catalogcard = ({title,tag,price,image}) => {
  return (
    <View style={styles.card}>
      
      {/* Cake Image */}
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={image}
        />

        {/* Tag */}
        <View style={styles.tag}>
          <Text style={styles.tagText}>{tag}</Text>
        </View>
      </View>

      {/* Product Info */}
      <View style={styles.infoSection}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.price}>{price}</Text>
      </View>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        
        {/* Active Toggle */}
        <View style={styles.activeContainer}>
          <Ionicons name="toggle" size={38} color="#7a5b52" />
          <Text style={styles.activeText}>Active</Text>
        </View>

        {/* Icons */}
        <View style={styles.iconContainer}>
          <TouchableOpacity>
            <MaterialIcons
              name="edit"
              size={22}
              color="#7a5b52"
            />
          </TouchableOpacity>

          <TouchableOpacity>
            <MaterialIcons
              name="delete-outline"
              size={22}
              color="#d9534f"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Catalogcard;

const styles = StyleSheet.create({
  card: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 40,
    padding: 16,
    // alignSelf: "center",
    marginTop: 20,
    height:"auto"
  },

  imageContainer: {
    position: "relative",
  },

  image: {
    width: "100%",
    height: 220,
    borderRadius: 35,
    resizeMode: "cover",
  },

  tag: {
    position: "absolute",
    top: 14,
    right: 14,
    backgroundColor: "#f5c9d6",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 2,
  },

  tagText: {
    color: "#7a4b58",
    fontSize: 12,
    fontWeight: "500",
    letterSpacing: 0.5,
  },

  infoSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
    paddingHorizontal: 4,
  },

  title: {
    fontSize: 18,
    lineHeight:28,
    fontWeight: "700",
    color: "#363317",
    // width: "70%",
  },

  price: {
    fontSize: 24,
    fontWeight: "700",
    color: "#8c5f4f",
  },

  bottomSection: {
    marginTop: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 4,
  },

  activeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  activeText: {
    marginLeft: 6,
    fontSize: 20,
    color: "#7a5b52",
    fontWeight: "500",
  },

  iconContainer: {
    marginTop:20,
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
  },
});