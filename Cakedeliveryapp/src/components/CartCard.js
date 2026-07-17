import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

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
  const lineTotal = (parseFloat(price) * quantity).toFixed(2);

  return (
    <View style={styles.card}>
      {/* Close Button */}
      <TouchableOpacity style={styles.closeBtn} onPress={onRemove} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
        <Ionicons name="close" size={20} color="#B7A58A" />
      </TouchableOpacity>

      {/* Left Image */}
      <Image source={image} style={styles.image} />

      {/* Right Content */}
      <View style={styles.content}>
        <Text numberOfLines={1} style={styles.title}>
          {name}
        </Text>

        <Text style={styles.info}>Size: {size}</Text>

        <Text style={styles.info}>Flavor: {Flavor}</Text>

        {!!note && (
          <View style={styles.noteRow}>
            <Ionicons name="create-outline" size={14} color="#B5A188" />
            <Text style={styles.noteText}> "{note}"</Text>
          </View>
        )}

        <View style={styles.bottomRow}>
          <Text style={styles.price}>${lineTotal}</Text>

          <View style={styles.quantityBox}>
            <TouchableOpacity
              onPress={() => quantity > 1 && onDecrease?.()}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons
                name="remove"
                size={18}
                color={quantity > 1 ? "#7A563B" : "#D8C9B4"}
              />
            </TouchableOpacity>

            <Text style={styles.qtyText}>
              {String(quantity).padStart(2, "0")}
            </Text>

            <TouchableOpacity
              onPress={() => onIncrease?.()}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons name="add" size={18} color="#7A563B" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CartCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#FBF3E3",
    marginTop: 18,
    borderRadius: 28,
    padding: 18,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 10,

    elevation: 3,
  },

  closeBtn: {
    position: "absolute",
    top: 18,
    right: 18,
    zIndex: 10,
  },

  image: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 4,
    borderColor: "#fff",
  },

  content: {
    flex: 1,
    marginLeft: 18,
    justifyContent: "space-between",
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#5A3D2C",
    paddingRight: 24,
  },

  info: {
    marginTop: 4,
    fontSize: 15,
    color: "#8A7A67",
  },

  noteRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },

  noteText: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#B5A188",
  },

  bottomRow: {
    marginTop: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  price: {
    fontSize: 28,
    fontWeight: "700",
    color: "#5A3D2C",
  },

  quantityBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 30,
    gap: 16,

    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,

    elevation: 2,
  },

  qtyText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#5A3D2C",
  },
});