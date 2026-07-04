import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Alert
} from "react-native";

const OrderCard = ({ orderNumber, customerName, deliveryTime, price, tag, buttonText, image, buttonColor, onAccept, onCancel }) => {

    const [isAccepted, setIsAccepted] = useState(false);

    const handleAcceptPress = () => {
        if (isAccepted) return; // already accepted, do nothing

        Alert.alert(
            "Accept Order",
            `Accept order ${orderNumber} from ${customerName}?`,
            [
                { text: "No", style: "cancel" },
                {
                    text: "Yes, Accept",
                    onPress: () => {
                        setIsAccepted(true);
                        onAccept ? onAccept() : Alert.alert("Success", "Order accepted successfully!");
                    },
                },
            ]
        );
    };

    const handleMenuPress = () => {
        Alert.alert(
            "Your Orders",
            orderNumber,
            [
                {
                    text: "Cancel Order",
                    style: "destructive",
                    onPress: () => {
                        Alert.alert(
                            "Do You Want to Cancel Order",
                            "This Order is Canceled",
                            [
                                { text: "NO", style: "cancel" },
                                {
                                    text: "Yes, Cancel ",
                                    style: "destructive",
                                    onPress: () => {
                                        setIsAccepted(false);
                                        onCancel && onCancel();
                                    },
                                },
                            ]
                        );
                    },
                },
                { text: "Close", style: "cancel" },
            ]
        );
    };

    return (
        <View style={designStyles.screen}>
            <View style={designStyles.orderCardBox}>

                {/* Flower Image */}
                <View style={designStyles.topImageContainer}>
                    <Image
                        source={image}
                        style={designStyles.topImage}
                    />

                    <View style={designStyles.customBadge}>
                        <Text style={designStyles.customBadgeText}>
                            {tag}
                        </Text>
                    </View>
                </View>

                {/* Details */}
                <View style={designStyles.detailsWrapper}>

                    <View style={designStyles.orderNumberRow}>
                        <Text style={designStyles.orderNumberText}>
                            {orderNumber}
                        </Text>

                        {isAccepted && (
                            <View style={designStyles.acceptedBadge}>
                                <Text style={designStyles.acceptedBadgeText}>
                                    ACCEPTED
                                </Text>
                            </View>
                        )}
                    </View>

                    <Text style={designStyles.customerName}>
                        {customerName}
                    </Text>

                    <View style={designStyles.timeInfoRow}>
                        <Text style={designStyles.timeIcon}>
                            ◷
                        </Text>

                        <Text style={designStyles.deliveryTimeText}>
                            {deliveryTime}
                        </Text>
                    </View>

                    {/* Bottom Section */}
                    <View style={designStyles.actionArea}>

                        <TouchableOpacity
                            onPress={handleAcceptPress}
                            activeOpacity={isAccepted ? 1 : 0.8}
                            disabled={isAccepted}
                            style={[
                                designStyles.acceptButtonStyle,
                                { backgroundColor: isAccepted ? "#3F7A53" : buttonColor },
                            ]}
                        >
                            <Text style={designStyles.acceptButtonText}>
                                {isAccepted ? "Accepted ✓" : buttonText}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={designStyles.menuButtonCircle}
                            onPress={handleMenuPress}
                        >
                            <Text style={designStyles.menuDotsText}>
                                •••
                            </Text>
                        </TouchableOpacity>

                    </View>
                </View>

                {/* Price */}
                <Text style={designStyles.priceTagText}>
                    {price}
                </Text>
            </View>
        </View>
    );
};

export default OrderCard;

const designStyles = StyleSheet.create({

    screen: {
        flex: 1,
        justifyContent: "center",
    },

    orderCardBox: {
        width: "100%",
        backgroundColor: "#FFFFFF",
        borderRadius: 30,
        padding: 16,
    },

    topImageContainer: {
        position: "relative",
        borderRadius: 22,
        overflow: "hidden",
    },

    topImage: {
        width: "100%",
        height: 200,
        borderRadius: 22,
        objectFit: "cover"
    },

    customBadge: {
        position: "absolute",
        top: 12,
        left: 12,
        backgroundColor: "#F6BCD0",
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 30,
    },

    customBadgeText: {
        color: "#81485A",
        fontSize: 11,
        fontWeight: "700",
        letterSpacing: 0.5,
    },

    detailsWrapper: {
        marginTop: 18,
    },

    orderNumberRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 5,
    },

    orderNumberText: {
        color: "#9B7E67",
        fontSize: 10,
        fontWeight: "700",
        letterSpacing: 1,
    },

    acceptedBadge: {
        backgroundColor: "#E2F0E5",
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 10,
        marginLeft: 8,
    },

    acceptedBadgeText: {
        color: "#3F7A53",
        fontSize: 9,
        fontWeight: "800",
        letterSpacing: 0.5,
    },

    customerName: {
        fontSize: 30,
        fontWeight: "700",
        color: "#2C211A",
        marginBottom: 8,
    },

    timeInfoRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 22,
    },

    timeIcon: {
        fontSize: 13,
        marginRight: 6,
        color: "#8D7A6A",
    },

    deliveryTimeText: {
        color: "#8D7A6A",
        fontSize: 14,
    },

    actionArea: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    acceptButtonStyle: {
        flex: 1,
        height: 54,
        backgroundColor: "#7B5A4E",
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 14,
    },

    acceptButtonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "700",
    },

    menuButtonCircle: {
        width: 54,
        height: 54,
        borderRadius: 27,
        borderWidth: 1,
        borderColor: "#E7DFD8",
        justifyContent: "center",
        alignItems: "center",
    },

    menuDotsText: {
        fontSize: 18,
        color: "#7B5A4E",
        fontWeight: "700",
    },

    priceTagText: {
        position: "absolute",
        right: 20,
        top: 230,
        fontSize: 18,
        fontWeight: "700",
        color: "#7B5A4E",
    },
});