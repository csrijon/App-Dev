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

const currentStepIndex = 2;

const OrderTrackingScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#FDF8EC" barStyle="dark-content" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backBtn}
                    activeOpacity={0.7}
                >
                    <Ionicons name="arrow-back-outline" size={22} color="#5D4037" />
                </TouchableOpacity>
                <View style={{ width: 44 }} />
            </View>

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Title */}
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Out for Delivery</Text>
                    <Text style={styles.subtitle}>
                        Your lavender honey cake is en route.
                    </Text>
                </View>

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
                                            isActive && styles.stepCircleCurrent,
                                        ]}
                                    >
                                        <Ionicons
                                            name={isDone ? "checkmark" : step.icon}
                                            size={18}
                                            color={isCompletedOrActive ? "#fff" : "#C4B598"}
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
                                    <View style={styles.stepConnectorWrapper}>
                                        <View
                                            style={[
                                                styles.stepConnector,
                                                index < currentStepIndex && styles.stepConnectorActive,
                                            ]}
                                        />
                                    </View>
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
                            <Ionicons name="star" size={13} color="#F2A60C" />
                            <Text style={styles.courierMetaText}>4.9</Text>
                            <Text style={styles.courierMetaDot}>·</Text>
                            <Text style={styles.courierMetaText}>1,240 deliveries</Text>
                        </View>
                    </View>
                    <View style={styles.courierActions}>
                        <TouchableOpacity style={styles.courierIconBtn} activeOpacity={0.7}>
                            <Ionicons name="call" size={18} color="#7B5A4E" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.courierIconBtn} activeOpacity={0.7}>
                            <Ionicons name="chatbubble" size={18} color="#7B5A4E" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Order Number */}
                <View style={styles.orderNoRow}>
                    <View>
                        <Text style={styles.orderNoLabel}>ORDER NO.</Text>
                        <Text style={styles.orderNoValue}>#GQ-95231-FR</Text>
                    </View>
                    <TouchableOpacity style={styles.detailsBtn} activeOpacity={0.6}>
                        <Text style={styles.detailsBtnText}>DETAILS</Text>
                        <Ionicons name="chevron-forward-outline" size={14} color="#8A7466" />
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

                {/* Delivery Address Card */}
                <View style={styles.addressCard}>
                    <View style={styles.addressIconWrapper}>
                        <Ionicons name="location" size={20} color="#7B5A4E" />
                    </View>
                    <View style={styles.addressInfo}>
                        <Text style={styles.addressLabel}>DELIVER TO</Text>
                        <Text style={styles.addressValue}>
                            Apartment 4B, 24 Rue de Rivoli{"\n"}75001 Paris, France
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default OrderTrackingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FDF8EC", // Slightly cleaner cream background
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 4,
    },
    backBtn: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 50,
    },
    titleContainer: {
        marginTop: 12,
        marginBottom: 28,
    },
    title: {
        fontSize: 28,
        fontWeight: "800",
        color: "#3D2B1F",
        letterSpacing: -0.5,
    },
    subtitle: {
        fontSize: 14,
        color: "#8A7466",
        marginTop: 6,
        fontWeight: "500",
    },

    /* Steps */
    stepsRow: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 32,
    },
    stepItem: {
        alignItems: "center",
        gap: 8,
        width: 60,
    },
    stepCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1.5,
        borderColor: "#EAE0C8",
    },
    stepCircleActive: {
        backgroundColor: "#7B5A4E",
        borderColor: "#7B5A4E",
    },
    stepCircleCurrent: {
        shadowColor: "#7B5A4E",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 4,
    },
    stepLabel: {
        fontSize: 9,
        fontWeight: "800",
        color: "#B8AF8F",
        letterSpacing: 0.5,
    },
    stepLabelActive: {
        color: "#3D2B1F",
    },
    stepConnectorWrapper: {
        flex: 1,
        marginTop: 20,
        marginHorizontal: -8,
        zIndex: -1,
    },
    stepConnector: {
        height: 3,
        backgroundColor: "#EAE0C8",
        borderRadius: 2,
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
        padding: 16,
        gap: 14,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: "#F4EBE1",
        shadowColor: "#3D2B1F",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.04,
        shadowRadius: 12,
        elevation: 3,
    },
    courierAvatar: {
        width: 56,
        height: 56,
        borderRadius: 28,
        borderWidth: 2,
        borderColor: "#FDF8EC",
    },
    courierInfo: {
        flex: 1,
        gap: 4,
    },
    courierName: {
        fontSize: 16,
        fontWeight: "700",
        color: "#3D2B1F",
        letterSpacing: -0.2,
    },
    courierMetaRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    courierMetaText: {
        fontSize: 13,
        color: "#8A7466",
        fontWeight: "500",
    },
    courierMetaDot: {
        fontSize: 13,
        color: "#D0C4AF",
        marginHorizontal: 2,
    },
    courierActions: {
        flexDirection: "row",
        gap: 10,
    },
    courierIconBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#F8F1DF",
        alignItems: "center",
        justifyContent: "center",
    },

    /* Order Number */
    orderNoRow: {
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-between",
        marginBottom: 16,
        paddingHorizontal: 4,
    },
    orderNoLabel: {
        fontSize: 11,
        fontWeight: "800",
        color: "#A0907A",
        letterSpacing: 0.8,
        marginBottom: 4,
    },
    orderNoValue: {
        fontSize: 16,
        fontWeight: "800",
        color: "#3D2B1F",
        letterSpacing: -0.2,
    },
    detailsBtn: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 12,
        gap: 4,
        borderWidth: 1,
        borderColor: "#EAE0C8",
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
        gap: 14,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: "#F4EBE1",
        shadowColor: "#3D2B1F",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.03,
        shadowRadius: 8,
        elevation: 2,
    },
    itemImage: {
        width: 60,
        height: 60,
        borderRadius: 16,
    },
    itemInfo: {
        flex: 1,
        gap: 4,
    },
    itemTitle: {
        fontSize: 15,
        fontWeight: "700",
        color: "#3D2B1F",
        letterSpacing: -0.2,
    },
    itemSubtitle: {
        fontSize: 12.5,
        color: "#9B8070",
        lineHeight: 18,
    },
    itemPrice: {
        fontSize: 16,
        fontWeight: "800",
        color: "#3D2B1F",
    },

    /* Delivery Address Card */
    addressCard: {
        flexDirection: "row",
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        padding: 18,
        gap: 16,
        borderWidth: 1,
        borderColor: "#F4EBE1",
        shadowColor: "#3D2B1F",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.03,
        shadowRadius: 8,
        elevation: 2,
    },
    addressIconWrapper: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: "#F8F1DF",
        alignItems: "center",
        justifyContent: "center",
    },
    addressInfo: {
        flex: 1,
        justifyContent: "center",
    },
    addressLabel: {
        fontSize: 11,
        fontWeight: "800",
        color: "#A0907A",
        letterSpacing: 0.8,
        marginBottom: 6,
    },
    addressValue: {
        fontSize: 14,
        color: "#5D4037",
        lineHeight: 22,
        fontWeight: "500",
    },
});