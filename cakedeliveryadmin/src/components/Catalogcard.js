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

const Catalogcard = ({ 
  title, 
  tag, 
  price, 
  image, 
  stock, 
  sales, 
  isFeatured, 
  rating, 
  lastUpdated 
}) => {

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

        {/* Featured Badge (Top Left) */}
        {isFeatured && (
          <View style={styles.featuredBadge}>
             <MaterialIcons name="star" size={16} color="#fff" />
             <Text style={styles.featuredText}>Featured</Text>
          </View>
        )}

        {/* Tag (Top Right) */}
        <View style={styles.tag}>
          <Text style={styles.tagText}>{tag}</Text>
        </View>
      </View>

      {/* Product Info (Title, Rating, Price) */}
      <View style={styles.infoSection}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          {/* Rating */}
          <View style={styles.ratingContainer}>
            <MaterialIcons name="star" size={18} color="#e6a822" />
            <Text style={styles.ratingText}>{rating}</Text>
          </View>
        </View>
        <Text style={styles.price}>{price}</Text>
      </View>

      {/* Stats Section: Stock & Sales */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <MaterialIcons name="inventory" size={16} color="#7a5b52" />
          <Text style={styles.statText}>Stock: {stock}</Text>
        </View>
        <View style={styles.statItem}>
          <MaterialIcons name="shopping-cart" size={16} color="#7a5b52" />
          <Text style={styles.statText}>Sales: {sales}</Text>
        </View>
      </View>

      {/* Last Updated */}
      <Text style={styles.lastUpdatedText}>Last updated: {lastUpdated}</Text>

      {/* Divider */}
      <View style={styles.divider} />

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
    height: "auto",
    elevation: 2, // Added slight shadow for better card separation
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
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

  featuredBadge: {
    position: "absolute",
    top: 14,
    left: 14,
    backgroundColor: "#8c5f4f",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  featuredText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
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
    alignItems: "flex-start",
    marginTop: 16,
    paddingHorizontal: 4,
  },

  titleContainer: {
    flex: 1,
  },

  title: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "700",
    color: "#363317",
    marginBottom: 4,
  },

  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  ratingText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#7a5b52",
  },

  price: {
    fontSize: 24,
    fontWeight: "700",
    color: "#8c5f4f",
  },

  statsContainer: {
    flexDirection: "row",
    paddingHorizontal: 4,
    marginTop: 12,
    gap: 16,
  },

  statItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f6f5",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 6,
  },

  statText: {
    fontSize: 13,
    color: "#7a5b52",
    fontWeight: "500",
  },

  lastUpdatedText: {
    fontSize: 11,
    color: "#a49692",
    fontStyle: "italic",
    paddingHorizontal: 4,
    marginTop: 10,
  },

  divider: {
    height: 1,
    backgroundColor: "#f0eaea",
    marginTop: 16,
    marginHorizontal: 4,
  },

  bottomSection: {
    marginTop: 16,
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
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
  },
});