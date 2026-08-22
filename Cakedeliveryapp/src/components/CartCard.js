import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

// Base guideline width (standard design reference — e.g. iPhone 11/Figma frame)
const GUIDELINE_WIDTH = 390;

const CartCard = ({
  name,
  size,
  Flavor,
  price,
  image,
  note,
  quantity = 1,
  onIncrease,
  onDecrease,
  onRemove,
}) => {
  const { width } = useWindowDimensions();
  const scale = width / GUIDELINE_WIDTH;

  // Moderate scale: shrinks/grows values but not too aggressively on extreme screen sizes
  const ms = (size, factor = 0.5) => size + (scale * size - size) * factor;

  const lineTotal = (parseFloat(price) * quantity).toFixed(2);
  const styles = getStyles(ms, width);

  return (
    <View style={styles.card}>
      {/* Left Image */}
      <Image source={image} style={styles.image} />

      {/* Right Content */}
      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
            {name}
          </Text>

          <TouchableOpacity
            onPress={onRemove}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="close" size={ms(16)} color="#B5A188" />
          </TouchableOpacity>
        </View>

        <View style={styles.tagRow}>
          {!!size && (
            <View style={styles.tag}>
              <Text style={styles.tagText}>{size}</Text>
            </View>
          )}
          {!!Flavor && (
            <View style={styles.tag}>
              <Text style={styles.tagText} numberOfLines={1}>
                {Flavor}
              </Text>
            </View>
          )}
        </View>

        {!!note && (
          <Text style={styles.noteText} numberOfLines={1}>
            "{note}"
          </Text>
        )}

        <View style={styles.bottomRow}>
          <Text style={styles.price} numberOfLines={1} adjustsFontSizeToFit>
            ${lineTotal}
          </Text>

          <View style={styles.quantityBox}>
            <TouchableOpacity
              onPress={() => quantity > 1 && onDecrease?.()}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              style={styles.qtyBtn}
            >
              <Ionicons
                name="remove"
                size={ms(14)}
                color={quantity > 1 ? "#5A3D2C" : "#D8C9B4"}
              />
            </TouchableOpacity>

            <Text style={styles.qtyText}>
              {String(quantity).padStart(2, "0")}
            </Text>

            <TouchableOpacity
              onPress={() => onIncrease?.()}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              style={styles.qtyBtn}
            >
              <Ionicons name="add" size={ms(14)} color="#5A3D2C" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CartCard;

const getStyles = (ms, width) =>
  StyleSheet.create({
    card: {
      flexDirection: "row",
      backgroundColor: "#FBF3E3",
      marginTop: ms(14),
      borderRadius: ms(14),
      borderWidth: 1,
      borderColor: "#EDE0C4",
      padding: ms(14),
      width: "100%",
    },

    image: {
      width: ms(76),
      height: ms(76),
      borderRadius: ms(10),
      backgroundColor: "#F1E4CC",
    },

    content: {
      flex: 1,
      marginLeft: ms(14),
      minWidth: 0, // prevents text overflow on small screens
    },

    titleRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },

    title: {
      flex: 1,
      fontSize: ms(15),
      fontWeight: "600",
      color: "#5A3D2C",
      paddingRight: ms(10),
    },

    tagRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: ms(6),
      marginTop: ms(6),
    },

    tag: {
      borderWidth: 1,
      borderColor: "#E2D2AF",
      paddingHorizontal: ms(8),
      paddingVertical: ms(3),
      borderRadius: ms(6),
      maxWidth: width * 0.32,
    },

    tagText: {
      fontSize: ms(10),
      fontWeight: "500",
      color: "#8A7A67",
    },

    noteText: {
      fontSize: ms(11),
      fontStyle: "italic",
      color: "#B5A188",
      marginTop: ms(6),
    },

    bottomRow: {
      marginTop: ms(10),
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },

    price: {
      fontSize: ms(16),
      fontWeight: "700",
      color: "#5A3D2C",
    },

    quantityBox: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      borderColor: "#E2D2AF",
      borderRadius: ms(8),
      paddingHorizontal: ms(6),
      paddingVertical: ms(3),
      gap: ms(8),
    },

    qtyBtn: {
      width: ms(20),
      height: ms(20),
      alignItems: "center",
      justifyContent: "center",
    },

    qtyText: {
      fontSize: ms(12),
      fontWeight: "600",
      color: "#5A3D2C",
      minWidth: ms(16),
      textAlign: "center",
    },
  });