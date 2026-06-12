import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert
} from "react-native";

import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const Catalogcard = ({ title, tag, price, image }) => {

  const [toggleswitch, settoggleswitch] = useState(false)
  const [editlogo, seteditlogo] = useState(false)

  return (
    <View style={[styles.card, { opacity: toggleswitch ? 0.6 : 1 }]}>

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
          <TouchableOpacity onPress={() => settoggleswitch(!toggleswitch)} >
            <Fontisto name={toggleswitch ? "toggle-off" : "toggle-on"} color={toggleswitch ? "#000" : "#7a5b52"} size={38} />
          </TouchableOpacity>
          <Text style={styles.activeText}>{toggleswitch ? "Inactive" : "Active"}</Text>
        </View>

        {/* Icons */}
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => seteditlogo(!editlogo)} >
            <MaterialIcons
              name={editlogo ? "check" : "edit"}
              size={22}
              color="#7a5b52"
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              Alert.alert(
                "Delete Product",
                "Are you sure you want to delete this product?",
                [
                  {
                    text: "Cancel",
                    style: "cancel",
                  },
                  {
                    text: "Delete",
                    onPress: () =>
                      Alert.alert(
                        "Success",
                        "Product deleted successfully!"
                      ),
                  },
                ]
              )
            }
          >
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
    marginTop: 20,
    height: "auto"
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
    lineHeight: 28,
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
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
  },
});