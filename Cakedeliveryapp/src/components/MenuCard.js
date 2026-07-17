import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";

const screenWidth = Dimensions.get("window").width;

const MenuCard = ({
    onPress,        // tapping the card itself → navigate to details (unchanged behavior)
    rating,
    bakingTime,
    title,
    description,
    price,
    image,
    isAdded,        // true only for THIS card — must be passed from parent, e.g. addedIds.has(item.id)
    onAddToCart,     // called when + is tapped
    onGoToCart,      // called when "Go to Cart" pill is tapped
}) => {
    return (
        <TouchableOpacity activeOpacity={0.9} onPress={onPress} style={styles.cakecardContainer}>
            <Image source={{ uri: image }} style={styles.image} />

            <View style={styles.cakeRating}>
                <View style={styles.rating}>
                    <FontAwesome name="star" color="#75584e" size={14} />
                    <Text style={styles.ratingText}>{rating}</Text>
                </View>
                <Text style={styles.bakingTime}>Baking:{bakingTime}</Text>
            </View>

            <View style={styles.cardDetails}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description}>{description}</Text>
            </View>

            <View style={styles.cardPrice}>
                <Text style={styles.price}>{price}</Text>

                {isAdded ? (
                    <TouchableOpacity
                        onPress={(e) => {
                            e.stopPropagation?.();
                            onGoToCart?.();
                        }}
                        activeOpacity={0.85}
                        style={styles.goToCartBtn}
                    >
                        <Ionicons name="cart" size={16} color="#fff" />
                        <Text style={styles.goToCartText}>Go to Cart</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        onPress={(e) => {
                            e.stopPropagation?.();
                            onAddToCart?.();
                        }}
                        style={styles.icon}
                    >
                        <AntDesign name="plus" color="#000" size={20} />
                    </TouchableOpacity>
                )}
            </View>
        </TouchableOpacity>
    );
};

export default MenuCard;

const styles = StyleSheet.create({
    cakecardContainer: {
        width: screenWidth - 48,
        height: "auto",
        backgroundColor: "#fff",
        borderRadius: 48,
        padding: 24,
    },
    image: {
        width: "100%",
        height: 300,
        borderTopLeftRadius: 48,
        borderBottomRightRadius: 48,
    },
    cakeRating: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
    },
    rating: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
    },
    ratingText: {
        fontSize: 14,
        fontWeight: "700",
        color: "#75584e",
    },
    bakingTime: {
        fontSize: 12,
        fontWeight: "500",
        color: "#75584e",
    },
    cardDetails: {
        marginTop: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: "700",
        marginBottom: 5,
    },
    description: {
        fontSize: 14,
        marginTop: 5,
        marginBottom: 24,
        color: "#646040",
    },
    cardPrice: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10,
    },
    price: {
        fontSize: 20,
        fontWeight: "800",
        color: "#75584e",
    },
    icon: {
        width: 48,
        height: 48,
        backgroundColor: "#f6cfc2",
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
    },
    goToCartBtn: {
        flexDirection: "row",
        alignItems: "center",
        height: 48,
        paddingHorizontal: 18,
        borderRadius: 24,
        backgroundColor: "#6b4f4f",
        gap: 6,
    },
    goToCartText: {
        color: "#fff",
        fontSize: 13,
        fontWeight: "700",
    },
});