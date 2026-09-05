import React, { useEffect, useRef, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    ScrollView,
    TouchableOpacity,
    Image,
    Animated,
    useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import { orders } from "../services/customerApi";

const steps = [
    { key: "baking", label: "BAKING", icon: "flame-outline" },
    { key: "quality", label: "QUALITY", icon: "checkmark-circle-outline" },
    { key: "shipping", label: "SHIPPING", icon: "bicycle-outline" },
    { key: "arrived", label: "ARRIVED", icon: "home-outline" },
];

const OrderTrackingScreen = ({ navigation, route }) => {
    const pulseAnim = useRef(new Animated.Value(1)).current;
    const { width } = useWindowDimensions();
    const orderId = route?.params?.orderId;

    const [tracking, setTracking] = useState(null);
    const [loading, setLoading] = useState(true);

    const scale = width / 390;
    const ms = (size, factor = 0.5) => {
        const scaledSize = size + (scale * size - size) * factor;
        return Math.round(
            Math.min(Math.max(scaledSize, size * 0.88), size * 1.08)
        );
    };

    const fetchTracking = async () => {
        if (!orderId) return;
        try {
            setLoading(true);
            const res = await orders.tracking(orderId);
            if (res && res.data) setTracking(res.data);
        } catch (e) {
            console.log("Tracking fetch error:", e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTracking();
    }, [orderId]);

    useEffect(() => {
        const loop = Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1.5,
                    duration: 900,
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 900,
                    useNativeDriver: true,
                }),
            ])
        );
        loop.start();
        return () => loop.stop();
    }, [pulseAnim]);

    const statusToStep = (status) => {
        if (!status) return 2;
        const s = String(status).toLowerCase();
        if (s.includes("baking")) return 0;
        if (s.includes("quality")) return 1;
        if (s.includes("shipping") || s.includes("out") || s.includes("delivery")) return 2;
        if (s.includes("arrived") || s.includes("delivered")) return 3;
        return 2;
    };

    const currentStepIndex = statusToStep(tracking?.status);

    const styles = getStyles(ms, width);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#FDF8EC" barStyle="dark-content" />

            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backBtn}
                    activeOpacity={0.7}
                >
                    <Ionicons name="arrow-back-outline" size={22} color="#5D4037" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Track Order</Text>
                <View style={{ width: 44 }} />
            </View>

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>
                        {tracking ? "Out for Delivery" : "Order Tracking"}
                    </Text>
                    <Text style={styles.subtitle}>
                        {tracking ? "Your order is en route." : "Fetching tracking info..."}
                    </Text>
                </View>

                <View style={styles.etaCard}>
                    <View style={styles.etaTopRow}>
                        <View style={styles.liveBadge}>
                            <View style={styles.liveDot} />
                            <Text style={styles.liveBadgeText}>LIVE</Text>
                        </View>
                        <Ionicons name="bicycle" size={ms(22)} color="#F2E4CE" />
                    </View>
                    <Text style={styles.etaLabel}>ARRIVING IN</Text>
                    <Text style={styles.etaValue}>15–20 min</Text>
                    <View style={styles.etaProgressTrack}>
                        <View style={styles.etaProgressFill} />
                    </View>
                </View>

                <View style={styles.stepsRow}>
                    <View style={styles.trackLine} />
                    <View
                        style={[
                            styles.trackLineActive,
                            {
                                width: `${(currentStepIndex / (steps.length - 1)) * 100}%`,
                            },
                        ]}
                    />
                    {steps.map((step, index) => {
                        const isDone = index < currentStepIndex;
                        const isActive = index === currentStepIndex;
                        const isCompletedOrActive = isDone || isActive;
                        return (
                            <View style={styles.stepItem} key={step.key}>
                                <View style={styles.stepCircleWrapper}>
                                    {isActive && (
                                        <Animated.View
                                            style={[
                                                styles.pulseRing,
                                                { transform: [{ scale: pulseAnim }] },
                                            ]}
                                        />
                                    )}
                                    <View
                                        style={[
                                            styles.stepCircle,
                                            isCompletedOrActive && styles.stepCircleActive,
                                            isActive && styles.stepCircleCurrent,
                                        ]}
                                    >
                                        <Ionicons
                                            name={isDone ? "checkmark" : step.icon}
                                            size={ms(18)}
                                            color={isCompletedOrActive ? "#fff" : "#C4B598"}
                                        />
                                    </View>
                                </View>
                                <Text
                                    numberOfLines={1}
                                    style={[
                                        styles.stepLabel,
                                        isCompletedOrActive && styles.stepLabelActive,
                                    ]}
                                >
                                    {step.label}
                                </Text>
                            </View>
                        );
                    })}
                </View>

                <View style={styles.itemCard}>
                    <Image
                        source={{ uri: "https://images.unsplash.com/photo-1519869325930-281384150729?w=200" }}
                        style={styles.itemImage}
                    />
                    <View style={styles.itemInfo}>
                        <Text style={styles.itemTitle} numberOfLines={1}>
                            Order #{orderId || "N/A"}
                        </Text>
                        <Text style={styles.itemSubtitle} numberOfLines={1}>
                            {tracking ? `Status: ${tracking.status || "pending"}` : "Loading..."}
                        </Text>
                    </View>
                    <Text style={styles.itemPrice}>
                        {tracking ? "Updated" : "—"}
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default OrderTrackingScreen;

const getStyles = (ms, width) =>
    StyleSheet.create({
        container: { flex: 1, backgroundColor: "#FDF8EC" },
        header: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 20,
            paddingTop: 10,
            paddingBottom: 4,
        },
        headerTitle: {
            fontSize: ms(15),
            fontWeight: "700",
            color: "#5D4037",
            letterSpacing: 0.3,
        },
        backBtn: {
            width: 44,
            height: 44,
            borderRadius: 22,
            alignItems: "center",
            justifyContent: "center",
            shadowOpacity: 0.05,
        },
        scrollContent: {
            paddingHorizontal: ms(20),
            paddingBottom: 50,
        },
        titleContainer: { marginTop: 8, marginBottom: 20 },
        title: {
            fontSize: ms(28),
            fontWeight: "800",
            color: "#3D2B1F",
            letterSpacing: -0.5,
        },
        subtitle: {
            fontSize: ms(14),
            color: "#8A7466",
            marginTop: 6,
            fontWeight: "500",
        },
        etaCard: {
            backgroundColor: "#4A342A",
            borderRadius: ms(28),
            padding: ms(22),
            marginBottom: 28,
            overflow: "hidden",
            shadowColor: "#3D2B1F",
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.25,
            shadowRadius: 16,
            elevation: 6,
        },
        etaTopRow: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 18,
        },
        liveBadge: {
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "rgba(255,255,255,0.12)",
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 20,
            gap: 6,
        },
        liveDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: "#8BC97A" },
        liveBadgeText: {
            fontSize: ms(10),
            fontWeight: "800",
            color: "#F2E4CE",
            letterSpacing: 0.8,
        },
        etaLabel: {
            fontSize: ms(11),
            fontWeight: "800",
            color: "rgba(242,228,206,0.6)",
            letterSpacing: 1,
            marginBottom: 4,
        },
        etaValue: {
            fontSize: ms(34),
            fontWeight: "800",
            color: "#FFFFFF",
            letterSpacing: -0.5,
            marginBottom: 18,
        },
        etaProgressTrack: {
            height: 6,
            borderRadius: 3,
            backgroundColor: "rgba(255,255,255,0.12)",
            overflow: "hidden",
        },
        etaProgressFill: { width: "65%", height: "100%", borderRadius: 3, backgroundColor: "#E8B75D" },
        stepsRow: {
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "space-between",
            marginBottom: 32,
            position: "relative",
        },
        trackLine: {
            position: "absolute",
            top: ms(20),
            left: 30,
            right: 30,
            height: 3,
            backgroundColor: "#EAE0C8",
            borderRadius: 2,
        },
        trackLineActive: {
            position: "absolute",
            top: ms(20),
            left: 30,
            height: 3,
            backgroundColor: "#7B5A4E",
            borderRadius: 2,
        },
        stepItem: { alignItems: "center", gap: 8, width: 60 },
        stepCircleWrapper: { alignItems: "center", justifyContent: "center" },
        pulseRing: {
            position: "absolute",
            width: ms(40),
            height: ms(40),
            borderRadius: ms(20),
            backgroundColor: "rgba(123,90,78,0.35)",
        },
        stepCircle: {
            width: ms(40),
            height: ms(40),
            borderRadius: ms(20),
            backgroundColor: "#FFFFFF",
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 1.5,
            borderColor: "#EAE0C8",
        },
        stepCircleActive: { backgroundColor: "#7B5A4E", borderColor: "#7B5A4E" },
        stepCircleCurrent: {
            shadowColor: "#7B5A4E",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 6,
            elevation: 4,
        },
        stepLabel: {
            fontSize: ms(9),
            fontWeight: "800",
            color: "#B8AF8F",
            letterSpacing: 0.5,
        },
        stepLabelActive: { color: "#3D2B1F" },
        courierCard: {
            backgroundColor: "#FFFFFF",
            borderRadius: ms(24),
            padding: ms(16),
            marginBottom: 24,
            borderWidth: 1,
            borderColor: "#F4EBE1",
            overflow: "hidden",
            shadowColor: "#3D2B1F",
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.04,
            shadowRadius: 12,
            elevation: 3,
        },
        courierAccentBar: {
            position: "absolute",
            top: 0,
            left: 0,
            width: 5,
            height: "100%",
            backgroundColor: "#E8B75D",
        },
        courierTopRow: {
            flexDirection: "row",
            alignItems: "center",
            gap: ms(14),
            minWidth: 0,
        },
        avatarWrapper: { position: "relative" },
        courierAvatar: {
            width: ms(56),
            height: ms(56),
            borderRadius: ms(28),
            borderWidth: 2,
            borderColor: "#FDF8EC",
        },
        onlineDot: {
            position: "absolute",
            top: 0,
            left: 0,
            width: 12,
            height: 12,
            borderRadius: 6,
            backgroundColor: "#8BC97A",
            borderWidth: 2,
            borderColor: "#FFFFFF",
        },
        ratingBadge: {
            position: "absolute",
            bottom: -4,
            right: -6,
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#E8B75D",
            paddingHorizontal: 6,
            paddingVertical: 2,
            borderRadius: 10,
            gap: 2,
            borderWidth: 2,
            borderColor: "#FFFFFF",
        },
        ratingBadgeText: { fontSize: ms(10), fontWeight: "800", color: "#fff" },
        courierInfo: { flex: 1, minWidth: 0, gap: 4 },
        courierNameRow: { flexDirection: "row", alignItems: "center", gap: 5 },
        courierName: {
            fontSize: ms(16),
            fontWeight: "700",
            color: "#3D2B1F",
            letterSpacing: -0.2,
            flexShrink: 1,
        },
        courierMetaRow: {
            flexDirection: "row",
            alignItems: "center",
            gap: 4,
            flexWrap: "wrap",
        },
        courierMetaText: {
            fontSize: ms(12.5),
            color: "#8A7466",
            fontWeight: "500",
            flexShrink: 1,
        },
        courierMetaDot: {
            fontSize: ms(13),
            color: "#D0C4AF",
            marginHorizontal: 2,
        },
        courierDivider: {
            height: 1,
            backgroundColor: "#F4EBE1",
            marginVertical: ms(14),
        },
        courierActions: { flexDirection: "row", alignItems: "center" },
        courierActionBtn: {
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            paddingVertical: ms(10),
        },
        courierActionText: {
            fontSize: ms(13),
            fontWeight: "700",
            color: "#7B5A4E",
        },
        courierActionDivider: {
            width: 1,
            height: "70%",
            backgroundColor: "#F0E4D4",
        },
        orderNoRow: {
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: 16,
            paddingHorizontal: 4,
        },
        orderNoLabel: {
            fontSize: ms(11),
            fontWeight: "800",
            color: "#A0907A",
            letterSpacing: 0.8,
            marginBottom: 4,
        },
        orderNoValue: {
            fontSize: ms(16),
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
            fontSize: ms(11),
            fontWeight: "700",
            color: "#8A7466",
            letterSpacing: 0.5,
        },
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
        itemImage: { width: 60, height: 60, borderRadius: 16 },
        itemInfo: { flex: 1, gap: 4, minWidth: 0 },
        itemTitle: {
            fontSize: ms(15),
            fontWeight: "700",
            color: "#3D2B1F",
            letterSpacing: -0.2,
        },
        itemSubtitle: {
            fontSize: ms(12.5),
            color: "#9B8070",
            lineHeight: ms(18),
        },
        itemPrice: {
            fontSize: ms(16),
            fontWeight: "800",
            color: "#3D2B1F",
        },
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
        addressInfo: { flex: 1, justifyContent: "center" },
        addressLabel: {
            fontSize: ms(11),
            fontWeight: "800",
            color: "#A0907A",
            letterSpacing: 0.8,
            marginBottom: 6,
        },
        addressValue: {
            fontSize: ms(14),
            color: "#5D4037",
            lineHeight: ms(22),
            fontWeight: "500",
        },
    });
