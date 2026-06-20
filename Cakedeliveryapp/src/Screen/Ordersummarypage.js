import { useState } from "react";
import Simpleheader from "../components/Simpleheader"
import { StatusBar, ScrollView, StyleSheet, View, Text, Image, TouchableOpacity, TextInput, Modal, Alert, ActivityIndicator } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import Ionicons from "react-native-vector-icons/Ionicons";
import Button from "../components/Button";

const Ordersummarypage = ({ navigation }) => {

    const [personalMessage, setPersonalMessage] = useState(
        "Happy 30th Birthday Sarah! Here's to many more sweet adventures together. Love, Mark."
    );
    const [isEditingMessage, setIsEditingMessage] = useState(false);

    const [addressModalVisible, setAddressModalVisible] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState({
        label: "Home",
        details: "124 Baker Street, West Wing Apartments\nSuite 4B, London, NW1 6XE"
    });

    const addressOptions = [
        {
            label: "Home",
            details: "124 Baker Street, West Wing Apartments\nSuite 4B, London, NW1 6XE"
        },
        {
            label: "Office",
            details: "45 Kings Road, Floor 3\nLondon, EC1A 1BB"
        },
        {
            label: "Mom's House",
            details: "12 Greenway Lane\nManchester, M1 4WD"
        }
    ];

    const [deliverySlot, setDeliverySlot] = useState({
        date: "Tuesday, Oct 24",
        time: "Between 2:00 PM - 4:00 PM"
    });

    const slotOptions = [
        { date: "Tuesday, Oct 24", time: "Between 2:00 PM - 4:00 PM" },
        { date: "Wednesday, Oct 25", time: "Between 10:00 AM - 12:00 PM" },
        { date: "Thursday, Oct 26", time: "Between 4:00 PM - 6:00 PM" },
    ];

    const handleChangeSlot = () => {
        Alert.alert(
            "Select Delivery Slot",
            "Choose a new delivery time",
            slotOptions.map((slot) => ({
                text: `${slot.date} (${slot.time})`,
                onPress: () => setDeliverySlot(slot)
            })).concat([{ text: "Cancel", style: "cancel" }])
        );
    };

    const [promoCode, setPromoCode] = useState("");
    const [appliedDiscount, setAppliedDiscount] = useState(0);
    const [promoError, setPromoError] = useState("");

    const cakePrice = 50;
    const shippingPrice = 80;
    const vatPercent = 0.20;

    const subtotal = cakePrice + shippingPrice;
    const vatAmount = subtotal * vatPercent;
    const totalBeforeDiscount = subtotal + vatAmount;
    const discountAmount = (totalBeforeDiscount * appliedDiscount) / 100;
    const finalTotal = (totalBeforeDiscount - discountAmount).toFixed(2);

    const handleApplyPromo = () => {
        if (promoCode.trim().toUpperCase() === "SWEET10") {
            setAppliedDiscount(10);
            setPromoError("");
            Alert.alert("Promo Applied 🎉", "You got 10% off on your order!");
        } else if (promoCode.trim() === "") {
            setPromoError("Please enter a promo code");
        } else {
            setAppliedDiscount(0);
            setPromoError("Invalid promo code");
        }
    };

    const [isProcessingPayment, setIsProcessingPayment] = useState(false);

    const handleProceedToPayment = () => {
        setIsProcessingPayment(true);
        setTimeout(() => {
            setIsProcessingPayment(false);
            navigation.navigate("Ordesuccess");
        }, 1500);
    };

    return (
        <SafeAreaView style={styles.Ordersummarypagecontainer} >
            <StatusBar backgroundColor="#fff9e6" barStyle="dark-content" />
            <Simpleheader />

            {/* FIX: removed invalid "vartical" prop */}
            <ScrollView
                contentContainerStyle={{ paddingBottom: 40 }}
                showsVerticalScrollIndicator={false}
                style={styles.summaryscrollcontainer}
            >
                {/* Cake Section */}
                <View style={styles.saffronStage}>
                    <Text style={styles.microLabel}>Order Summary</Text>
                    <Text style={styles.heroLine}>Review your sweet selection</Text>

                    <View style={styles.creamPanel}>
                        <Image
                            source={require("../images/cakeimage.jpeg")}
                            style={styles.heroCake}
                        />

                        <View style={styles.copyWrap}>
                            <View style={styles.rowHead}>
                                <Text style={styles.cakeTitle}>Velvet Chocolate Ganache</Text>
                                <View style={styles.badgeCapsule}>
                                    <Text style={styles.badgeText}>BEST SELLER</Text>
                                </View>
                            </View>

                            <Text style={styles.cakeDesc}>
                                Rich 70% dark chocolate layers with whipped truffle filling and smooth ganache finish.
                            </Text>

                            <View style={styles.metaRow}>
                                <View>
                                    <Text style={styles.metaLabel}>WEIGHT</Text>
                                    <Text style={styles.metaValue}>1.5 KG</Text>
                                </View>
                                <View>
                                    <Text style={styles.metaLabel}>FLAVOR</Text>
                                    <Text style={styles.metaValue}>Dark Chocolate</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Details Section */}
                <View style={styles.almondStage}>

                    {/* Personal Message */}
                    <View style={styles.butterBlock}>
                        <View style={styles.rowBetween}>
                            <View style={styles.rowLine}>
                                <Ionicons name="list-outline" size={18} color="#6b4f4f" />
                                <Text style={styles.blockTitle}>Personal Message</Text>
                            </View>
                            <TouchableOpacity onPress={() => setIsEditingMessage(prev => !prev)}>
                                <Text style={styles.changeBtn}>{isEditingMessage ? "DONE" : "EDIT"}</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.creamBubble}>
                            {isEditingMessage ? (
                                <TextInput
                                    style={styles.messageInput}
                                    value={personalMessage}
                                    onChangeText={setPersonalMessage}
                                    multiline
                                    autoFocus
                                    placeholder="Write your message..."
                                />
                            ) : (
                                <Text style={styles.messageText}>
                                    "{personalMessage}"
                                </Text>
                            )}
                        </View>
                    </View>

                    {/* Delivery Slot */}
                    <View style={styles.butterBlock}>
                        <View style={styles.rowBetween}>
                            <View style={styles.rowLine}>
                                <Ionicons name="time-outline" size={18} color="#6b4f4f" />
                                <Text style={styles.blockTitle}>Delivery Slot</Text>
                            </View>
                            <TouchableOpacity onPress={handleChangeSlot}>
                                <Text style={styles.changeBtn}>CHANGE</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.boldLine}>{deliverySlot.date}</Text>
                        <Text style={styles.subLine}>{deliverySlot.time}</Text>
                    </View>

                    {/* Delivery Address */}
                    <View style={styles.butterBlock}>
                        <View style={styles.rowBetween}>
                            <View style={styles.rowLine}>
                                <Ionicons name="location-outline" size={18} color="#6b4f4f" />
                                <Text style={styles.blockTitle}>Delivery Address</Text>
                            </View>
                            <TouchableOpacity onPress={() => setAddressModalVisible(true)}>
                                <Text style={styles.changeBtn}>CHANGE</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.addressRow}>
                            <Ionicons name="home-outline" size={18} color="#6b4f4f" />
                            <View style={{ marginLeft: 10 }}>
                                <Text style={styles.boldLine}>{selectedAddress.label}</Text>
                                <Text style={styles.subLine}>{selectedAddress.details}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Billing Card */}
                <View style={styles.billingcard}>
                    <Text style={styles.billingdetalis}>Billing Details</Text>

                    <View style={styles.billingRow}>
                        <Text style={styles.normaltext}>Velvet Chocolate (1.5kg)</Text>
                        <Text style={styles.normaltext}>${cakePrice}</Text>
                    </View>

                    <View style={styles.billingRow}>
                        <Text style={styles.normaltext}>Premium Packaging</Text>
                        <Text style={styles.normaltext}>Included</Text>
                    </View>

                    <View style={styles.billingRow}>
                        <Text style={styles.normaltext}>Hand-delivered Shipping</Text>
                        <Text style={styles.normaltext}>${shippingPrice}</Text>
                    </View>

                    <View style={styles.billingRow}>
                        <Text style={styles.normaltext}>VAT (20%)</Text>
                        <Text style={styles.normaltext}>${vatAmount.toFixed(2)}</Text>
                    </View>

                    {appliedDiscount > 0 && (
                        <View style={styles.billingRow}>
                            <Text style={[styles.normaltext, { color: "#2e7d32" }]}>
                                Discount ({appliedDiscount}%)
                            </Text>
                            <Text style={[styles.normaltext, { color: "#2e7d32" }]}>
                                -${discountAmount.toFixed(2)}
                            </Text>
                        </View>
                    )}

                    {/* Divider before total */}
                    <View style={styles.divider} />

                    {/* Promo Code */}
                    <View style={styles.promoRow}>
                        <TextInput
                            style={styles.promoInput}
                            
                            placeholder="Enter promo code"
                            value={promoCode}
                            onChangeText={(text) => {
                                setPromoCode(text);
                                setPromoError("");
                            }}
                            autoCapitalize="characters"
                        />
                        <TouchableOpacity style={styles.promoBtn} onPress={handleApplyPromo}>
                            <Text style={styles.promoBtnText}>APPLY</Text>
                        </TouchableOpacity>
                    </View>

                    {promoError !== "" && (
                        <Text style={styles.promoErrorText}>{promoError}</Text>
                    )}
                    {appliedDiscount > 0 && (
                        <Text style={styles.promoSuccessText}>Promo code "SWEET10" applied ✅</Text>
                    )}

                    {/* Total */}
                    <View style={styles.totalRow}>
                        <Text style={styles.totalammounttext}>Total Amount</Text>
                        <Text style={styles.totalammountrupy}>${finalTotal}</Text>
                    </View>

                    <View>
                        {isProcessingPayment ? (
                            <View style={styles.processingBtn}>
                                <ActivityIndicator color="#fff" />
                                <Text style={styles.processingText}>Processing...</Text>
                            </View>
                        ) : (
                            <Button onPress={handleProceedToPayment} title="Proceed to Payment" />
                        )}
                    </View>
                </View>

            </ScrollView>

            {/* Address Change Modal */}
            <Modal
                visible={addressModalVisible}
                animationType="slide"
                transparent
                onRequestClose={() => setAddressModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Select Delivery Address</Text>

                        {addressOptions.map((addr, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[
                                    styles.addressOption,
                                    selectedAddress.label === addr.label && styles.addressOptionSelected
                                ]}
                                onPress={() => {
                                    setSelectedAddress(addr);
                                    setAddressModalVisible(false);
                                }}
                            >
                                <Ionicons
                                    name={selectedAddress.label === addr.label ? "radio-button-on" : "radio-button-off"}
                                    size={20}
                                    color="#6b4f4f"
                                />
                                <View style={{ marginLeft: 10, flex: 1 }}>
                                    <Text style={styles.boldLine}>{addr.label}</Text>
                                    <Text style={styles.subLine}>{addr.details}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}

                        <TouchableOpacity
                            style={styles.modalCloseBtn}
                            onPress={() => setAddressModalVisible(false)}
                        >
                            <Text style={styles.modalCloseText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

export default Ordersummarypage;

const styles = StyleSheet.create({
    Ordersummarypagecontainer: {
        flex: 1,
        backgroundColor: "#fdf7e4"
    },
    summaryscrollcontainer: {
        padding: 20,
        flex: 1
    },
    saffronStage: {},
    microLabel: {
        fontSize: 15,
        color: "#75584e",
        fontWeight: "800",   // FIX: was number 800, must be string
        letterSpacing: 1,
        marginBottom: 4
    },
    heroLine: {
        fontSize: 18,
        fontWeight: "800",   // FIX: was number 800, must be string
        color: "#2f241d",
        lineHeight: 36,
        marginBottom: 25
    },
    creamPanel: {
        backgroundColor: "#ffffff",
        borderRadius: 30,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 5,
    },
    heroCake: {
        width: "100%",
        height: 250,
        borderRadius: 24,
    },
    copyWrap: {
        paddingHorizontal: 5,
    },
    rowHead: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 14,
    },
    cakeTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#75584e",
        flex: 1,
    },
    badgeCapsule: {
        backgroundColor: "#FFE8A3",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 50,
    },
    badgeText: {
        fontSize: 11,
        fontWeight: "700",
        color: "#7a5c50",
    },
    cakeDesc: {
        fontSize: 14,
        color: "#6e5a4f",
        marginVertical: 10,
        lineHeight: 25,
    },
    metaRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },
    metaLabel: {
        fontSize: 10,
        color: "#8b7d6b",
    },
    metaValue: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#5c4033",
    },
    almondStage: {
        marginTop: 20
    },
    butterBlock: {
        backgroundColor: "#fff",
        borderRadius: 28,
        padding: 18,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.06,
        shadowRadius: 10,
        elevation: 4,
    },
    rowLine: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    rowBetween: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    blockTitle: {
        fontSize: 14,
        fontWeight: "700",
        color: "#75584e",
    },
    creamBubble: {
        backgroundColor: "#f2f2f2",
        borderRadius: 20,
        padding: 15,
    },
    messageText: {
        fontSize: 13,
        color: "#6e5a4f",
        fontStyle: "italic",
    },
    messageInput: {
        fontSize: 13,
        color: "#6e5a4f",
        fontStyle: "italic",
        minHeight: 60,
        textAlignVertical: "top",
    },
    boldLine: {
        fontSize: 15,
        fontWeight: "bold",
        color: "#5c4033",
    },
    subLine: {
        fontSize: 13,
        color: "#7a6a58",
        marginTop: 3,
    },
    changeBtn: {
        fontSize: 12,
        color: "#8b7d6b",
        fontWeight: "600",
        letterSpacing: 1,
    },
    addressRow: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginTop: 5,
    },
    billingcard: {
        padding: 24,
        borderRadius: 30,
        backgroundColor: "#fff",
        marginTop: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 6,
    },
    billingdetalis: {
        marginBottom: 16,
        fontSize: 18,
        fontWeight: "700",   // FIX: was number 700, must be string
        color: "#75584e"
    },
    // FIX: renamed from "row" to "billingRow" with proper vertical spacing
    billingRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 8,
    },
    divider: {
        height: 1,
        backgroundColor: "#f0e8d8",
        marginVertical: 12,
    },
    promoRow: {
        flexDirection: "row",
        gap: 10,
        marginTop: 4,
        alignItems: "center",
    },
    promoInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#e0d6c5",
        borderRadius: 15,
        paddingHorizontal: 15,
        paddingVertical: 10,
        fontSize: 14,
        color: "#5c4033",
    },
    promoBtn: {
        backgroundColor: "#6b4f4f",
        paddingHorizontal: 18,
        paddingVertical: 12,
        borderRadius: 15,
    },
    promoBtnText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 12,
    },
    promoErrorText: {
        color: "#c0392b",
        fontSize: 12,
        marginTop: 8,
    },
    promoSuccessText: {
        color: "#2e7d32",
        fontSize: 12,
        marginTop: 8,
        fontWeight: "600",
    },
    // FIX: separated total row style from generic row
    totalRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 20,
        marginBottom: 16,
    },
    totalammounttext: {
        fontSize: 18,
        fontWeight: "700",   // FIX: was number 700
        color: "#2f241d",
    },
    totalammountrupy: {
        fontSize: 24,
        fontWeight: "800",   // FIX: was number 800
        color: "#75584e"
    },
    normaltext: {
        fontSize: 14,
        color: "#646040"
    },
    processingBtn: {
        backgroundColor: "#6b4f4f",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        paddingVertical: 16,
        borderRadius: 25,
    },
    processingText: {
        color: "#fff",
        fontWeight: "700",
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.4)",
        justifyContent: "flex-end",
    },
    modalContent: {
        backgroundColor: "#fff",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 24,
        paddingBottom: 40,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#5c4033",
        marginBottom: 20,
    },
    addressOption: {
        flexDirection: "row",
        alignItems: "center",
        padding: 14,
        borderRadius: 18,
        marginBottom: 10,
        backgroundColor: "#f7f2e8",
    },
    addressOptionSelected: {
        backgroundColor: "#f3e8d9",
        borderWidth: 1,
        borderColor: "#6b4f4f",
    },
    modalCloseBtn: {
        marginTop: 10,
        alignItems: "center",
        paddingVertical: 12,
    },
    modalCloseText: {
        color: "#8b7d6b",
        fontWeight: "600",
    },
});