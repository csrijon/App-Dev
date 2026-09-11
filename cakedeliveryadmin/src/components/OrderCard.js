import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Modal,
    ScrollView
} from "react-native";

const OrderCard = ({ orderNumber, customerName, deliveryTime, price, tag, status, buttonText, image, buttonColor, onAccept, onStatusUpdate, onCancel, onPress }) => {

    const [isAccepted, setIsAccepted] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);

    // Normalize status to lowercase for reliable logic
    const s = (status || "").toString().toLowerCase();
    const isPending = s === "pending" || s === "new order" || s === "new";
    const isAcceptedStatus = s === "accepted" || s === "confirmed";
    const isPreparing = s === "preparing" || s === "baking";
    const isReady = s === "ready";
    const isOutForDelivery = s === "out for delivery" || s === "delivering" || s === "delivery";
    const isDelivered = s === "delivered" || s === "done";
    const isCancelled = s === "cancelled" || s === "canceled" || s === "cancelled";
    const isRefundRequested = s === "refund requested" || s === "refund" || tag?.toUpperCase() === "REFUND";
    const isRefunded = s === "refunded";

    const openModal = (title, content) => {
        setModalTitle(title);
        setModalContent(content);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setModalTitle("");
        setModalContent(null);
    };

    const handleAcceptPress = () => {
        if (isAccepted) return;
        openModal("Accept Order", (
            <View style={{ gap: 16 }}>
                <Text style={{ fontSize: 16, color: "#2C211A", fontWeight: "600" }}>Accept order {orderNumber} from {customerName}?</Text>
                <Text style={{ fontSize: 13, color: "#8D7A6A" }}>Status will change to Accepted.</Text>
                <TouchableOpacity onPress={() => { setIsAccepted(true); onAccept ? onAccept() : null; closeModal(); }} style={{ backgroundColor: "#4F772D", paddingVertical: 12, borderRadius: 12, alignItems: "center" }}>
                    <Text style={{ color: "#fff", fontWeight: "700", fontSize: 14 }}>Yes, Accept</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={closeModal} style={{ paddingVertical: 10, alignItems: "center" }}>
                    <Text style={{ color: "#8B7365", fontWeight: "600" }}>Cancel</Text>
                </TouchableOpacity>
            </View>
        ));
    };

    const handleTrackPress = async () => {
        // Try to fetch real tracking data from backend
        let trackingStatus = "Preparing → Out for Delivery";
        try {
            const res = await fetch(`https://api.homebakers.com/api/orders/${orderNumber}/tracking`);
            const json = await res.json();
            if (json.success && json.data) {
                trackingStatus = json.data.status || trackingStatus;
            }
        } catch (e) {
            // Fallback to local state
        }
        openModal("Track Order", (
            <View style={{ gap: 12 }}>
                <Text style={{ fontSize: 16, fontWeight: "700", color: "#2C211A" }}>Order Tracker</Text>
                <Text style={{ fontSize: 13, color: "#8D7A6A" }}>Order: {orderNumber}</Text>
                <Text style={{ fontSize: 13, color: "#8D7A6A" }}>Customer: {customerName}</Text>
                <Text style={{ fontSize: 15, fontWeight: "600", color: "#4F772D", marginTop: 8 }}>Status: {trackingStatus}</Text>
                <Text style={{ fontSize: 13, color: "#8D7A6A" }}>Estimated: {deliveryTime}</Text>
                <TouchableOpacity onPress={closeModal} style={{ backgroundColor: "#7B5A4E", paddingVertical: 10, borderRadius: 20, alignItems: "center", marginTop: 10 }}>
                    <Text style={{ color: "#fff", fontWeight: "700" }}>Close Tracker</Text>
                </TouchableOpacity>
            </View>
        ));
    };

    const handleUpdateStatus = () => {
        const nextStates = {
            "preparing": "Ready",
            "ready": "Out for Delivery",
            "out for delivery": "Delivered"
        };
        const next = nextStates[s] || s;
        openModal("Update Status", (
            <View style={{ gap: 16 }}>
                <Text style={{ fontSize: 16, color: "#2C211A", fontWeight: "600" }}>Move order to next step?</Text>
                <Text style={{ fontSize: 13, color: "#8D7A6A" }}>Current: {status || s}</Text>
                <Text style={{ fontSize: 13, color: "#4F772D", fontWeight: "700" }}>Next: {next}</Text>
                <TouchableOpacity onPress={() => { closeModal(); if (onStatusUpdate) onStatusUpdate(next); }} style={{ backgroundColor: "#4F772D", paddingVertical: 12, borderRadius: 12, alignItems: "center", marginTop: 8 }}>
                    <Text style={{ color: "#fff", fontWeight: "700", fontSize: 14 }}>Confirm Update</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={closeModal} style={{ paddingVertical: 10, alignItems: "center" }}>
                    <Text style={{ color: "#8B7365", fontWeight: "600" }}>Cancel</Text>
                </TouchableOpacity>
            </View>
        ));
    };

    const handleAssignDelivery = () => {
        openModal("Assign Delivery", (
            <View style={{ gap: 14 }}>
                <Text style={{ fontSize: 16, fontWeight: "700", color: "#2C211A" }}>Assign for delivery</Text>
                <Text style={{ fontSize: 13, color: "#8D7A6A" }}>Order: {orderNumber}</Text>
                <Text style={{ fontSize: 13, color: "#4F772D", fontWeight: "600", marginTop: 6 }}>Ready → Out for Delivery</Text>
                <TouchableOpacity onPress={() => { closeModal(); if (onStatusUpdate) onStatusUpdate("Out for Delivery"); }} style={{ backgroundColor: "#3E5C76", paddingVertical: 12, borderRadius: 12, alignItems: "center", marginTop: 8 }}>
                    <Text style={{ color: "#fff", fontWeight: "700", fontSize: 14 }}>Confirm Assignment</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={closeModal} style={{ paddingVertical: 10, alignItems: "center" }}>
                    <Text style={{ color: "#8B7365", fontWeight: "600" }}>Cancel</Text>
                </TouchableOpacity>
            </View>
        ));
    };

    const handleViewDetails = () => {
        openModal("View Details", (
            <ScrollView style={{ maxHeight: 300 }}>
                <Text style={{ fontSize: 18, fontWeight: "800", color: "#2C211A" }}>{orderNumber}</Text>
                <Text style={{ fontSize: 14, color: "#8D7A6A", marginTop: 4 }}>Customer: {customerName}</Text>
                <Text style={{ fontSize: 14, color: "#8D7A6A" }}>Delivery: {deliveryTime}</Text>
                <Text style={{ fontSize: 14, color: "#8D7A6A" }}>Price: {price}</Text>
                <Text style={{ fontSize: 14, color: "#8D7A6A" }}>Tag: {tag}</Text>
                <Text style={{ fontSize: 14, color: "#4F772D", fontWeight: "700", marginTop: 8 }}>Status: {status || s}</Text>
                <TouchableOpacity onPress={closeModal} style={{ backgroundColor: "#4F772D", paddingVertical: 10, borderRadius: 20, alignItems: "center", marginTop: 16 }}>
                    <Text style={{ color: "#fff", fontWeight: "700" }}>Done</Text>
                </TouchableOpacity>
            </ScrollView>
        ));
    };

    const handleReviewRefund = () => {
        openModal("Review Refund", (
            <View style={{ gap: 14 }}>
                <Text style={{ fontSize: 16, fontWeight: "700", color: "#2C211A" }}>Refund Request</Text>
                <Text style={{ fontSize: 13, color: "#8D7A6A" }}>Order: {orderNumber}</Text>
                <Text style={{ fontSize: 13, color: "#8D7A6A" }}>Amount: {price}</Text>
                <Text style={{ fontSize: 14, color: "#B5651D", fontWeight: "600" }}>Reason: Quality issue / Wrong item</Text>
                <TouchableOpacity onPress={() => { openModal("Refund Approved", (<Text style={{ fontSize: 15, color: "#4F772D", fontWeight: "700" }}>Refund approved for {price}. Customer notified.</Text>)); }} style={{ backgroundColor: "#B5651D", paddingVertical: 12, borderRadius: 12, alignItems: "center" }}>
                    <Text style={{ color: "#fff", fontWeight: "700", fontSize: 14 }}>Approve Refund</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { openModal("Refund Rejected", (<Text style={{ fontSize: 15, color: "#A4161A", fontWeight: "700" }}>Refund rejected. Customer notified.</Text>)); }} style={{ backgroundColor: "#A4161A", paddingVertical: 12, borderRadius: 12, alignItems: "center" }}>
                    <Text style={{ color: "#fff", fontWeight: "700", fontSize: 14 }}>Reject Refund</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={closeModal} style={{ paddingVertical: 10, alignItems: "center" }}>
                    <Text style={{ color: "#8B7365", fontWeight: "600" }}>Cancel</Text>
                </TouchableOpacity>
            </View>
        ));
    };

    const handleMenuPress = () => {
        const menuItems = [];

        // Common actions
        menuItems.push({ label: "View Details", action: () => { closeModal(); handleViewDetails(); } });

        if (isPending) {
            menuItems.push({ label: "Cancel Order", action: () => { closeModal(); onCancel && onCancel(); }, destructive: true });
        }
        if (isAcceptedStatus || isPreparing || isReady || isOutForDelivery) {
            menuItems.push({ label: "Track Order", action: () => { closeModal(); handleTrackPress(); } });
        }
        if (isPreparing || isReady) {
            menuItems.push({ label: "Update Status", action: () => { closeModal(); handleUpdateStatus(); } });
        }
        if (isReady) {
            menuItems.push({ label: "Assign Delivery", action: () => { closeModal(); handleAssignDelivery(); } });
        }
        if (isRefundRequested) {
            menuItems.push({ label: "Approve Refund", action: () => { closeModal(); handleReviewRefund(); } });
            menuItems.push({ label: "Reject Refund", action: () => { openModal("Refund Rejected", (<Text style={{ fontSize: 15, color: "#A4161A", fontWeight: "700" }}>Refund rejected. Customer notified.</Text>)); } });
        }
        if (isPending || isAcceptedStatus || isPreparing || isReady || isOutForDelivery || isDelivered || isCancelled) {
            // Cancel available for active orders
            if (!isCancelled && !isRefunded) {
                menuItems.push({ label: "Cancel Order", action: () => { closeModal(); onCancel && onCancel(); }, destructive: true });
            }
        }

        openModal("Order Actions", (
            <View style={{ gap: 4 }}>
                <Text style={{ fontSize: 16, fontWeight: "700", color: "#2C211A", marginBottom: 8 }}>Select an action</Text>
                {menuItems.map((item, idx) => (
                    <TouchableOpacity
                        key={idx}
                        onPress={item.action}
                        style={{ paddingVertical: 10, borderBottomWidth: idx < menuItems.length - 1 ? 1 : 0, borderBottomColor: "#EAE3D6" }}
                    >
                        <Text style={{ fontSize: 15, color: item.destructive ? "#A4161A" : "#2C211A", fontWeight: item.destructive ? "700" : "600" }}>
                            {item.label}
                        </Text>
                    </TouchableOpacity>
                ))}
                <TouchableOpacity onPress={closeModal} style={{ paddingVertical: 12, alignItems: "center", marginTop: 4 }}>
                    <Text style={{ color: "#8B7365", fontWeight: "700" }}>Close</Text>
                </TouchableOpacity>
            </View>
        ));
    };

    return (
        <TouchableOpacity activeOpacity={0.95} onPress={onPress} style={designStyles.screen}>
            <View style={designStyles.orderCardBox}>
                {/* Cake Image */}
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
                    {/* Header: Order ID + Status + Price */}
                    <View style={designStyles.headerRow}>
                        <View style={designStyles.leftInfo}>
                            <View style={designStyles.orderNumberRow}>
                                <Text style={designStyles.orderNumberText}>
                                    {orderNumber}
                                </Text>
                                {isAcceptedStatus && (
                                    <View style={designStyles.acceptedBadge}>
                                        <Text style={designStyles.acceptedBadgeText}>ACCEPTED</Text>
                                    </View>
                                )}
                                {isCancelled && (
                                    <View style={[designStyles.acceptedBadge, { backgroundColor: "#FCE8E8", borderColor: "#F5C2C2" }]}>
                                        <Text style={[designStyles.acceptedBadgeText, { color: "#A4161A" }]}>CANCELLED</Text>
                                    </View>
                                )}
                                {isRefundRequested && (
                                    <View style={[designStyles.acceptedBadge, { backgroundColor: "#FFF8E6", borderColor: "#FFE4A6" }]}>
                                        <Text style={[designStyles.acceptedBadgeText, { color: "#B5651D" }]}>REFUND REQUESTED</Text>
                                    </View>
                                )}
                                {isRefunded && (
                                    <View style={[designStyles.acceptedBadge, { backgroundColor: "#EFF6F0", borderColor: "#D0E6D5" }]}>
                                        <Text style={[designStyles.acceptedBadgeText, { color: "#3F7A53" }]}>REFUNDED</Text>
                                    </View>
                                )}
                            </View>
                            <Text style={designStyles.customerName}>
                                {customerName}
                            </Text>
                        </View>
                        <Text style={designStyles.priceTagText}>{price}</Text>
                    </View>

                    {/* Delivery */}
                    <View style={designStyles.timeInfoRow}>
                        <View style={designStyles.timeDot} />
                        <Text style={designStyles.deliveryTimeText}>
                            {deliveryTime}
                        </Text>
                    </View>

                    {/* Status label */}
                    <View style={{ marginBottom: 16 }}>
                        <Text style={{ fontSize: 11, fontWeight: "700", color: "#A89884", letterSpacing: 0.8, textTransform: "uppercase" }}>
                            Status: {status || s}
                        </Text>
                    </View>

                    {/* Conditional Action Buttons */}
                    <View style={designStyles.secondaryActionsRow}>
                        {/* PENDING: Accept Order primary + More */}
                        {isPending && (
                            <>
                                <TouchableOpacity
                                    onPress={handleAcceptPress}
                                    activeOpacity={0.85}
                                    style={[designStyles.actionPill, { backgroundColor: buttonColor || "#7B5A4E", flex: 2.2 }]}
                                >
                                    <Text style={designStyles.actionPillText}>Accept Order</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={handleMenuPress}
                                    style={[designStyles.actionPill, { backgroundColor: "#EFEAE6", flex: 0.8, flexDirection: "row", gap: 4 }]}
                                >
                                    <Text style={{ color: "#7B5A4E", fontWeight: "700", fontSize: 11 }}>•••</Text>
                                </TouchableOpacity>
                            </>
                        )}

                        {/* ACCEPTED: View Details + Track Order + More */}
                        {isAcceptedStatus && (
                            <>
                                <TouchableOpacity onPress={handleViewDetails} style={[designStyles.actionPill, { backgroundColor: "#3E5C76", flex: 1.2 }]}>
                                    <Text style={designStyles.actionPillText}>View Details</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handleTrackPress} style={[designStyles.actionPill, { backgroundColor: "#4F772D", flex: 1.2 }]}>
                                    <Text style={designStyles.actionPillText}>Track Order</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handleMenuPress} style={[designStyles.actionPill, { backgroundColor: "#EFEAE6", flex: 0.6 }]}>
                                    <Text style={{ color: "#7B5A4E", fontWeight: "700", fontSize: 11 }}>•••</Text>
                                </TouchableOpacity>
                            </>
                        )}

                        {/* PREPARING: View Details + Update Status + More */}
                        {isPreparing && (
                            <>
                                <TouchableOpacity onPress={handleViewDetails} style={[designStyles.actionPill, { backgroundColor: "#3E5C76", flex: 1.1 }]}>
                                    <Text style={designStyles.actionPillText}>View Details</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handleUpdateStatus} style={[designStyles.actionPill, { backgroundColor: "#8B7365", flex: 1.3 }]}>
                                    <Text style={designStyles.actionPillText}>Update Status</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handleMenuPress} style={[designStyles.actionPill, { backgroundColor: "#EFEAE6", flex: 0.6 }]}>
                                    <Text style={{ color: "#7B5A4E", fontWeight: "700", fontSize: 11 }}>•••</Text>
                                </TouchableOpacity>
                            </>
                        )}

                        {/* READY: View Details + Assign Delivery + More */}
                        {isReady && (
                            <>
                                <TouchableOpacity onPress={handleViewDetails} style={[designStyles.actionPill, { backgroundColor: "#3E5C76", flex: 1.1 }]}>
                                    <Text style={designStyles.actionPillText}>View Details</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handleAssignDelivery} style={[designStyles.actionPill, { backgroundColor: "#4F772D", flex: 1.3 }]}>
                                    <Text style={designStyles.actionPillText}>Assign Delivery</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handleMenuPress} style={[designStyles.actionPill, { backgroundColor: "#EFEAE6", flex: 0.6 }]}>
                                    <Text style={{ color: "#7B5A4E", fontWeight: "700", fontSize: 11 }}>•••</Text>
                                </TouchableOpacity>
                            </>
                        )}

                        {/* OUT FOR DELIVERY: View Details + Track Order + More */}
                        {isOutForDelivery && (
                            <>
                                <TouchableOpacity onPress={handleViewDetails} style={[designStyles.actionPill, { backgroundColor: "#3E5C76", flex: 1.2 }]}>
                                    <Text style={designStyles.actionPillText}>View Details</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handleTrackPress} style={[designStyles.actionPill, { backgroundColor: "#4F772D", flex: 1.2 }]}>
                                    <Text style={designStyles.actionPillText}>Track Order</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handleMenuPress} style={[designStyles.actionPill, { backgroundColor: "#EFEAE6", flex: 0.6 }]}>
                                    <Text style={{ color: "#7B5A4E", fontWeight: "700", fontSize: 11 }}>•••</Text>
                                </TouchableOpacity>
                            </>
                        )}

                        {/* DELIVERED: View Details + More */}
                        {isDelivered && (
                            <>
                                <TouchableOpacity onPress={handleViewDetails} style={[designStyles.actionPill, { backgroundColor: "#3E5C76", flex: 1.6 }]}>
                                    <Text style={designStyles.actionPillText}>View Details</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handleMenuPress} style={[designStyles.actionPill, { backgroundColor: "#EFEAE6", flex: 0.8 }]}>
                                    <Text style={{ color: "#7B5A4E", fontWeight: "700", fontSize: 12 }}>•••</Text>
                                </TouchableOpacity>
                            </>
                        )}

                        {/* CANCELLED: View Details + More */}
                        {isCancelled && (
                            <>
                                <TouchableOpacity onPress={handleViewDetails} style={[designStyles.actionPill, { backgroundColor: "#3E5C76", flex: 1.6 }]}>
                                    <Text style={designStyles.actionPillText}>View Details</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handleMenuPress} style={[designStyles.actionPill, { backgroundColor: "#EFEAE6", flex: 0.8 }]}>
                                    <Text style={{ color: "#7B5A4E", fontWeight: "700", fontSize: 12 }}>•••</Text>
                                </TouchableOpacity>
                            </>
                        )}

                        {/* REFUND REQUESTED: View Details + Approve Refund + Reject Refund + More */}
                        {isRefundRequested && (
                            <>
                                <TouchableOpacity onPress={handleViewDetails} style={[designStyles.actionPill, { backgroundColor: "#3E5C76", flex: 0.9 }]}>
                                    <Text style={designStyles.actionPillText}>View Details</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handleReviewRefund} style={[designStyles.actionPill, { backgroundColor: "#B5651D", flex: 1.1 }]}>
                                    <Text style={designStyles.actionPillText}>Approve Refund</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { openModal("Refund Rejected", (<Text style={{ fontSize: 15, color: "#A4161A", fontWeight: "700" }}>Refund rejected. Customer notified.</Text>)); }} style={[designStyles.actionPill, { backgroundColor: "#A4161A", flex: 1.1 }]}>
                                    <Text style={designStyles.actionPillText}>Reject Refund</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handleMenuPress} style={[designStyles.actionPill, { backgroundColor: "#EFEAE6", flex: 0.6 }]}>
                                    <Text style={{ color: "#7B5A4E", fontWeight: "700", fontSize: 11 }}>•••</Text>
                                </TouchableOpacity>
                            </>
                        )}

                        {/* REFUNDED: View Details + More */}
                        {isRefunded && (
                            <>
                                <TouchableOpacity onPress={handleViewDetails} style={[designStyles.actionPill, { backgroundColor: "#3E5C76", flex: 1.6 }]}>
                                    <Text style={designStyles.actionPillText}>View Details</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handleMenuPress} style={[designStyles.actionPill, { backgroundColor: "#EFEAE6", flex: 0.8 }]}>
                                    <Text style={{ color: "#7B5A4E", fontWeight: "700", fontSize: 12 }}>•••</Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </View>

                    {/* Primary CTA (only for Pending when it needs special emphasis) */}
                    {isPending && (
                        <View style={{ marginTop: 10 }}>
                            <TouchableOpacity
                                onPress={handleAcceptPress}
                                activeOpacity={0.85}
                                disabled={isAccepted}
                                style={[
                                    designStyles.acceptButtonStyle,
                                    { backgroundColor: buttonColor || "#7B5A4E" },
                                ]}
                            >
                                <Text style={designStyles.acceptButtonText}>
                                    {buttonText || "Accept Order"}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </View>

            {/* Modal — no Alert used */}
            <Modal visible={modalVisible} transparent={true} animationType="fade" onRequestClose={closeModal}>
                <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.45)", justifyContent: "center", alignItems: "center", paddingHorizontal: 24 }}>
                    <View style={{ backgroundColor: "#FFFFFF", borderRadius: 24, padding: 22, width: "100%", maxWidth: 380, shadowColor: "#000", shadowOpacity: 0.15, shadowRadius: 10, shadowOffset: { width: 0, height: 4 }, elevation: 6 }}>
                        <Text style={{ fontSize: 18, fontWeight: "800", color: "#2C211A", marginBottom: 14 }}>{modalTitle}</Text>
                        <View style={{ minHeight: 40 }}>
                            {modalContent}
                        </View>
                    </View>
                </View>
            </Modal>
        </TouchableOpacity>
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
        backgroundColor: "#FDFCFA",
        borderRadius: 28,
        padding: 0,
        borderWidth: 1,
        borderColor: "#EFEAE6",
        shadowColor: "#C5B8A8",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.10,
        shadowRadius: 18,
        elevation: 3,
        overflow: "hidden",
    },
    topImageContainer: {
        position: "relative",
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
        overflow: "hidden",
    },
    topImage: {
        width: "100%",
        height: 210,
        resizeMode: "cover",
    },
    customBadge: {
        position: "absolute",
        top: 14,
        left: 14,
        backgroundColor: "#FCEFF3",
        paddingHorizontal: 14,
        paddingVertical: 7,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#F8DDE2",
    },
    customBadgeText: {
        color: "#A24D6B",
        fontSize: 11,
        fontWeight: "800",
        letterSpacing: 0.8,
        textTransform: "uppercase",
    },
    detailsWrapper: {
        paddingHorizontal: 22,
        paddingTop: 22,
        paddingBottom: 22,
    },
    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 10,
    },
    leftInfo: {
        flex: 1,
    },
    priceTagText: {
        fontSize: 20,
        fontWeight: "800",
        color: "#2C211A",
        letterSpacing: -0.3,
    },
    orderNumberRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
        gap: 8,
    },
    orderNumberText: {
        color: "#A89884",
        fontSize: 11,
        fontWeight: "700",
        letterSpacing: 1.2,
        textTransform: "uppercase",
    },
    acceptedBadge: {
        backgroundColor: "#E8F3EB",
        paddingHorizontal: 9,
        paddingVertical: 4,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#D3E6D7",
    },
    acceptedBadgeText: {
        color: "#2E7D3F",
        fontSize: 9,
        fontWeight: "800",
        letterSpacing: 0.5,
        textTransform: "uppercase",
    },
    customerName: {
        fontSize: 26,
        fontWeight: "800",
        color: "#2C211A",
        marginBottom: 10,
        letterSpacing: -0.4,
        lineHeight: 32,
    },
    timeInfoRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
        gap: 7,
    },
    timeDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: "#C0A48A",
    },
    deliveryTimeText: {
        color: "#8A7A6A",
        fontSize: 14,
        fontWeight: "500",
        letterSpacing: 0.15,
    },
    secondaryActionsRow: {
        flexDirection: "row",
        gap: 8,
        marginBottom: 18,
    },
    actionPill: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 4,
        elevation: 2,
    },
    actionPillText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "800",
        letterSpacing: 0.2,
    },
    bottomRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10,
    },
    acceptButtonStyle: {
        flex: 1,
        height: 54,
        borderRadius: 28,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#75584e",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.18,
        shadowRadius: 6,
        elevation: 3,
    },
    acceptButtonText: {
        color: "#FFFFFF",
        fontSize: 15,
        fontWeight: "800",
        letterSpacing: 0.3,
    },
    menuButtonCircle: {
        width: 52,
        height: 52,
        borderRadius: 26,
        borderWidth: 1.5,
        borderColor: "#EAE3D6",
        backgroundColor: "#FDFCFA",
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#C5B8A8",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.10,
        shadowRadius: 6,
        elevation: 2,
    },
    menuDotsText: {
        fontSize: 20,
        color: "#7B5A4E",
        fontWeight: "800",
        letterSpacing: 2,
    },
});
