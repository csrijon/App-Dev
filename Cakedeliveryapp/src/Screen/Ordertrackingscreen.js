import React from "react";
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    ScrollView,
    TouchableOpacity,
    Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";

const steps = [
    { key: "baking", label: "BAKING", icon: "flame-outline" },
    { key: "quality", label: "QUALITY", icon: "checkmark-circle-outline" },
    { key: "shipping", label: "SHIPPING", icon: "bicycle-outline" },
    { key: "arrived", label: "ARRIVED", icon: "home-outline" },
];

// Ekhon porjonto koto dur pouchese - "shipping" porjonto active dhore rakha hoyeche
const currentStepIndex = 2;

const OrderTrackingScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#F8F1DF" barStyle="dark-content" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backBtn}
                >
                    <Ionicons name="arrow-back-outline" size={20} color="#5D4037" />
                </TouchableOpacity>
                <View style={{ width: 36 }} />
            </View>

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Title */}
                <Text style={styles.title}>Out for Delivery</Text>
                <Text style={styles.subtitle}>
                    Your lavender honey cake is en route.
                </Text>

                {/* Progress Steps */}
                <View style={styles.stepsRow}>
                    {steps.map((step, index) => {
                        const isDone = index < currentStepIndex;
                        const isActive = index === currentStepIndex;
                        const isCompletedOrActive = isDone || isActive;

                        return (
                            <React.Fragment key={step.key}>
                                <View style={styles.stepItem}>
                                    <View
                                        style={[
                                            styles.stepCircle,
                                            isCompletedOrActive && styles.stepCircleActive,
                                        ]}
                                    >
                                        <Ionicons
                                            name={isDone ? "checkmark" : step.icon}
                                            size={16}
                                            color={isCompletedOrActive ? "#fff" : "#B8AF8F"}
                                        />
                                    </View>
                                    <Text
                                        style={[
                                            styles.stepLabel,
                                            isCompletedOrActive && styles.stepLabelActive,
                                        ]}
                                    >
                                        {step.label}
                                    </Text>
                                </View>

                                {index < steps.length - 1 && (
                                    <View
                                        style={[
                                            styles.stepConnector,
                                            index < currentStepIndex && styles.stepConnectorActive,
                                        ]}
                                    />
                                )}
                            </React.Fragment>
                        );
                    })}
                </View>

                {/* Courier Card */}
                <View style={styles.courierCard}>
                    <Image
                        source={{
                            uri: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200",
                        }}
                        style={styles.courierAvatar}
                    />
                    <View style={styles.courierInfo}>
                        <Text style={styles.courierName}>Bastien Rousseau</Text>
                        <View style={styles.courierMetaRow}>
                            <Ionicons name="star" size={12} color="#E0A939" />
                            <Text style={styles.courierMetaText}>4.9</Text>
                            <Text style={styles.courierMetaDot}>·</Text>
                            <Text style={styles.courierMetaText}>1,240 deliveries</Text>
                        </View>
                    </View>
                    <View style={styles.courierActions}>
                        <TouchableOpacity style={styles.courierIconBtn}>
                            <Ionicons name="call-outline" size={16} color="#5D4037" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.courierIconBtn}>
                            <Ionicons name="chatbubble-outline" size={16} color="#5D4037" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Order Number */}
                <View style={styles.orderNoRow}>
                    <View>
                        <Text style={styles.orderNoLabel}>ORDER NO.</Text>
                        <Text style={styles.orderNoValue}>#GQ-95231-FR</Text>
                    </View>
                    <TouchableOpacity style={styles.detailsBtn}>
                        <Text style={styles.detailsBtnText}>DETAILS</Text>
                        <Ionicons name="open-outline" size={13} color="#8A7466" />
                    </TouchableOpacity>
                </View>

                {/* Order Item */}
                <View style={styles.itemCard}>
                    <Image
                        source={{
                            uri: "https://images.unsplash.com/photo-1519869325930-281384150729?w=200",
                        }}
                        style={styles.itemImage}
                    />
                    <View style={styles.itemInfo}>
                        <Text style={styles.itemTitle}>1x Lavender Honey Cake</Text>
                        <Text style={styles.itemSubtitle}>
                            Gluten-free base, seasonal honey
                        </Text>
                    </View>
                    <Text style={styles.itemPrice}>€42.00</Text>
                </View>

                {/* Delivery Address */}
                <View style={styles.addressBlock}>
                    <Text style={styles.addressLabel}>DELIVER TO</Text>
                    <Text style={styles.addressValue}>
                        Apartment 4B, 24 Rue de Rivoli{"\n"}75001 Paris, France
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default OrderTrackingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8F1DF",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 18,
        paddingTop: 6,
        paddingBottom: 4,
    },
    backBtn: {
        width: 36,
        height: 36,
        borderRadius: 12,
        backgroundColor: "#EFE7D2",
        alignItems: "center",
        justifyContent: "center",
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    title: {
        fontSize: 22,
        fontWeight: "700",
        color: "#4A362B",
        marginTop: 6,
    },
    subtitle: {
        fontSize: 13,
        color: "#8A7466",
        marginTop: 4,
        marginBottom: 22,
    },

    /* Steps */
    stepsRow: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 24,
    },
    stepItem: {
        alignItems: "center",
        gap: 6,
        width: 56,
    },
    stepCircle: {
        width: 34,
        height: 34,
        borderRadius: 17,
        backgroundColor: "#EFE7D2",
        alignItems: "center",
        justifyContent: "center",
    },
    stepCircleActive: {
        backgroundColor: "#7B5A4E",
    },
    stepLabel: {
        fontSize: 8.5,
        fontWeight: "700",
        color: "#B8AF8F",
        letterSpacing: 0.3,
    },
    stepLabelActive: {
        color: "#7B5A4E",
    },
    stepConnector: {
        flex: 1,
        height: 2,
        backgroundColor: "#EFE7D2",
        marginTop: 17,
        marginHorizontal: -4,
    },
    stepConnectorActive: {
        backgroundColor: "#7B5A4E",
    },

    /* Courier Card */
    courierCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderRadius: 24,
        padding: 14,
        gap: 12,
        marginBottom: 18,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    courierAvatar: {
        width: 52,
        height: 52,
        borderRadius: 18,
    },
    courierInfo: {
        flex: 1,
        gap: 4,
    },
    courierName: {
        fontSize: 15,
        fontWeight: "700",
        color: "#4A362B",
    },
    courierMetaRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    courierMetaText: {
        fontSize: 12,
        color: "#8A7466",
    },
    courierMetaDot: {
        fontSize: 12,
        color: "#C4B8A4",
        marginHorizontal: 2,
    },
    courierActions: {
        flexDirection: "row",
        gap: 8,
    },
    courierIconBtn: {
        width: 36,
        height: 36,
        borderRadius: 12,
        backgroundColor: "#F5EDD8",
        alignItems: "center",
        justifyContent: "center",
    },

    /* Order Number */
    orderNoRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 14,
    },
    orderNoLabel: {
        fontSize: 10.5,
        fontWeight: "700",
        color: "#A0907A",
        letterSpacing: 0.5,
        marginBottom: 2,
    },
    orderNoValue: {
        fontSize: 14,
        fontWeight: "700",
        color: "#4A362B",
    },
    detailsBtn: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    detailsBtnText: {
        fontSize: 11,
        fontWeight: "700",
        color: "#8A7466",
        letterSpacing: 0.5,
    },

    /* Item Card */
    itemCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        padding: 12,
        gap: 12,
        marginBottom: 18,
        borderWidth: 0.5,
        borderColor: "#EDE4CC",
    },
    itemImage: {
        width: 52,
        height: 52,
        borderRadius: 14,
    },
    itemInfo: {
        flex: 1,
        gap: 3,
    },
    itemTitle: {
        fontSize: 14,
        fontWeight: "700",
        color: "#4A362B",
    },
    itemSubtitle: {
        fontSize: 11.5,
        color: "#9B8070",
    },
    itemPrice: {
        fontSize: 14,
        fontWeight: "700",
        color: "#4A362B",
    },

    /* Delivery Address */
    addressBlock: {
        paddingHorizontal: 4,
    },
    addressLabel: {
        fontSize: 10.5,
        fontWeight: "700",
        color: "#A0907A",
        letterSpacing: 0.5,
        marginBottom: 6,
    },
    addressValue: {
        fontSize: 13.5,
        color: "#5D4037",
        lineHeight: 20,
    },
});