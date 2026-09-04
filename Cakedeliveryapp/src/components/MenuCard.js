import React from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const screenWidth = Dimensions.get("window").width;

const MenuCard = ({
    onPress,
    rating,
    title,
    description,
    image,
    price,
    bakingTime,
}) => {
    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={onPress}
            style={styles.cakecardContainer}
        >
            <Image
                source={{ uri: image }}
                style={styles.image}
            />

            <View style={styles.rating}>
                <FontAwesome
                    name="star"
                    color="#75584e"
                    size={14}
                />
                <Text style={styles.ratingText}>
                    {rating}
                </Text>
            </View>

            <View style={styles.cardDetails}>
                <Text style={styles.title}>
                    {title}
                </Text>

                <Text style={styles.description}>
                    {description}
                </Text>

                {price !== undefined && (
                    <Text style={styles.priceText}>${price}</Text>
                )}

                {bakingTime !== undefined && (
                    <Text style={styles.bakingText}>{bakingTime}</Text>
                )}
            </View>

            {/* Action buttons removed per request */}
            {/*
            <View style={styles.actionRow}>
                ...
            </View>
            */}
        </TouchableOpacity>
    );
};

export default MenuCard;

const styles = StyleSheet.create({
    cakecardContainer: {
        width: screenWidth - 48,
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

    rating: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        marginTop: 20,
    },

    ratingText: {
        fontSize: 14,
        fontWeight: "700",
        color: "#75584e",
    },

    cardDetails: {
        marginTop: 14,
    },

    title: {
        fontSize: 20,
        fontWeight: "700",
        marginBottom: 8,
        color: "#000",
    },

    description: {
        fontSize: 14,
        color: "#646040",
        lineHeight: 22,
    },

    priceText: {
        fontSize: 16,
        fontWeight: "700",
        color: "#5c4033",
        marginTop: 8,
    },

    bakingText: {
        fontSize: 12,
        color: "#8b7d6b",
        marginTop: 4,
    },

});
