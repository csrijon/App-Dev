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
      {/* Close Button */}
      <TouchableOpacity
        style={styles.closeBtn}
        onPress={onRemove}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Ionicons name="close" size={ms(16)} color="#B7A58A" />
      </TouchableOpacity>

      {/* Left Image */}
      <Image source={image} style={styles.image} />

      {/* Right Content */}
      <View style={styles.content}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
          {name}
        </Text>

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
          <View style={styles.noteRow}>
            <Ionicons name="create-outline" size={ms(13)} color="#B5A188" />
            <Text style={styles.noteText} numberOfLines={1}>
              {" "}"{note}"
            </Text>
          </View>
        )}

        <View style={styles.divider} />

        <View style={styles.bottomRow}>
          <View style={styles.priceWrap}>
            <Text style={styles.priceLabel}>Total</Text>
            <Text style={styles.price} numberOfLines={1} adjustsFontSizeToFit>
              ${lineTotal}
            </Text>
          </View>

          <View style={styles.quantityBox}>
            <TouchableOpacity
              onPress={() => quantity > 1 && onDecrease?.()}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              style={styles.qtyBtn}
            >
              <Ionicons
                name="remove"
                size={ms(16)}
                color={quantity > 1 ? "#7A563B" : "#D8C9B4"}
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
              <Ionicons name="add" size={ms(16)} color="#7A563B" />
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
      marginTop: ms(18),
      borderRadius: ms(28),
      padding: ms(16),
      width: "100%",

      shadowColor: "#5A3D2C",
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 6 },
      shadowRadius: 14,
      elevation: 3,
    },

    closeBtn: {
      position: "absolute",
      top: ms(14),
      right: ms(14),
      zIndex: 10,
      backgroundColor: "#fff",
      borderRadius: 20,
      padding: ms(5),

      shadowColor: "#000",
      shadowOpacity: 0.08,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 3,
      elevation: 2,
    },

    image: {
      width: ms(84),
      height: ms(84),
      borderRadius: ms(42),
      borderWidth: ms(4),
      borderColor: "#fff",

      shadowColor: "#5A3D2C",
      shadowOpacity: 0.18,
      shadowOffset: { width: 0, height: 4 },
      shadowRadius: 8,
      elevation: 4,
    },

    content: {
      flex: 1,
      marginLeft: ms(14),
      justifyContent: "space-between",
      minWidth: 0, // prevents text overflow on small screens
    },

    title: {
      fontSize: ms(18),
      fontWeight: "700",
      color: "#5A3D2C",
      paddingRight: ms(24),
    },

    tagRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: ms(6),
      marginTop: ms(7),
    },

    tag: {
      backgroundColor: "#F1E4CC",
      paddingHorizontal: ms(10),
      paddingVertical: ms(4),
      borderRadius: 20,
      maxWidth: width * 0.32,
    },

    tagText: {
      fontSize: ms(11),
      fontWeight: "600",
      color: "#8A7A67",
    },

    noteRow: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: ms(8),
    },

    noteText: {
      fontSize: ms(12),
      fontStyle: "italic",
      color: "#B5A188",
      flexShrink: 1,
    },

    divider: {
      height: 1,
      backgroundColor: "#EFDFC4",
      marginTop: ms(12),
    },

    bottomRow: {
      marginTop: ms(10),
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: ms(8),
    },

    priceWrap: {
      flexShrink: 1,
      minWidth: 0,
    },

    priceLabel: {
      fontSize: ms(10),
      fontWeight: "700",
      color: "#C2AF95",
      textTransform: "uppercase",
      letterSpacing: 0.8,
      marginBottom: 2,
    },

    price: {
      fontSize: ms(22),
      fontWeight: "700",
      color: "#5A3D2C",
    },

    quantityBox: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#fff",
      paddingHorizontal: ms(8),
      paddingVertical: ms(6),
      borderRadius: 30,
      gap: ms(10),

      shadowColor: "#000",
      shadowOpacity: 0.06,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
      elevation: 2,
    },

    qtyBtn: {
      width: ms(24),
      height: ms(24),
      borderRadius: ms(12),
      alignItems: "center",
      justifyContent: "center",
    },

    qtyText: {
      fontSize: ms(14),
      fontWeight: "700",
      color: "#5A3D2C",
      minWidth: ms(18),
      textAlign: "center",
    },
  });