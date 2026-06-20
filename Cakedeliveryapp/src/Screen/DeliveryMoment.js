import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Image, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Detailsheader from "../components/Detailsheader";
import { useState } from "react";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Calendar } from "react-native-calendars"
import Button from "../components/Button"

const deliverySlots = [
    {
        id: 1,
        icon: "☀️",
        title: "Morning",
        time: "09:00 AM - 12:00 PM",
        label: "Standard",
        price: "FREE",
    },
    {
        id: 2,
        icon: "☀️",
        title: "Afternoon",
        time: "12:00 PM - 04:00 PM",
        label: "Peak Time",
        price: "+$5.00",
    },
    {
        id: 3,
        icon: "🌙",
        title: "Evening",
        time: "04:00 PM - 08:00 PM",
        label: "Late Slot",
        price: "+$2.00",
    },
];

const DeliveryMoment = ({ navigation, route }) => {
    const [deliverysoltid, setdeliverysoltid] = useState(1)
    const [selecteddate, setselecteddate] = useState(
        new Date().toISOString().split("T")[0]
    )
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const selectedSlot = deliverySlots.find(
        item => item.id === deliverysoltid
    )

    const getDeliveryCharge = () => {
        if (!selectedSlot) return 0;

        switch (selectedSlot.price) {
            case "FREE":
                return 0;
            case "+$5.00":
                return 5;
            case "+$2.00":
                return 2;
            default:
                return 0;
        }
    };

    // 🔹 Handles date selection from calendar — this was completely missing before
    const onDayPress = (day) => {
        setselecteddate(day.dateString)
        if (error) setError("")
    }

    // 🔹 Clear error as soon as user picks a slot
    const onSlotSelect = (id) => {
        setdeliverysoltid(id)
        if (error) setError("")
    }

    const handleNext = () => {

        if (!selecteddate) {
            setError("Please Select Date")
            return
        }

        if (!deliverysoltid) {
            setError("Please Select Delivery Slot")
            return
        }

        setError("")
        setLoading(true)

        const orderData = {
            title: route?.params?.title,
            image: route?.params?.image,
            description: route?.params?.description,
            deliveryDate: selecteddate,
            deliverySlot: selectedSlot,
            deliveryCharge: getDeliveryCharge()
        }

        setTimeout(() => {
            setLoading(false)

            navigation.navigate("Cakedetails", {
                orderData
            })
        }, 1000)
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#fff9e6" barStyle="dark-content" />
            <Detailsheader />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }} style={styles.scrollcontainer} >
                {/* Header */}
                <Text style={styles.step}>ORDER STEP 02</Text>
                <Text style={styles.title}>Choose Your Delivery Moment</Text>

                <View style={styles.maincalender} >
                    <Calendar
                        minDate={new Date().toISOString().split("T")[0]}
                        onDayPress={onDayPress}
                        theme={{
                            backgroundColor: '#fff',
                            calendarBackground: '#fff',
                            todayTextColor: "red",
                            arrowColor: "#000",
                            selectedDayTextColor: "black",
                            borderRadius:9999
                        }}
                        markedDates={{
                            [selecteddate]: { selected: true, selectedColor: "#f6cfc2", color: "black" }
                        }}
                    />

                    <View style={styles.summaryCard}>

                        <Text style={styles.summaryLabel}>
                            Selected Date:
                        </Text>

                        <Text style={styles.summaryValue}>
                            {selecteddate}
                        </Text>

                        <Text style={[styles.summaryLabel, { marginTop: 10 }]}>
                            Delivery Slot:
                        </Text>

                        <Text style={styles.summaryValue}>
                            {selectedSlot?.title || "Not selected"}
                        </Text>

                    </View>

                </View>

                {/* Error message */}
                {
                    error ? (
                        <View style={styles.errorRow}>
                            <Text style={styles.errorText}>
                                {error}
                            </Text>
                        </View>
                    ) : null
                }

                {/* Time Options */}
                {
                    deliverySlots.map((item) => (
                        <TouchableOpacity
                            onPress={() => onSlotSelect(item.id)}
                            key={item.id}
                            style={[
                                styles.option,
                                {
                                    borderColor:
                                        deliverysoltid === item.id
                                            ? "#f6cfc2"
                                            : "#75584e"
                                }
                            ]}
                        >
                            <View
                                style={[
                                    styles.iconStyle,
                                    {
                                        backgroundColor:
                                            deliverysoltid === item.id
                                                ? "#f3c6d3"
                                                : "#6b4f4f"
                                    }
                                ]}
                            >
                                <Text>
                                    {item.icon}
                                </Text>
                            </View>

                            <View style={{ flex: 1 }}>
                                <Text style={styles.optionTitle}>
                                    {item.title}
                                </Text>

                                <Text style={styles.time}>
                                    {item.time}
                                </Text>
                            </View>

                            <View style={{ alignItems: "flex-end" }}>
                                <Text style={styles.priceLabel}>
                                    {item.label}
                                </Text>

                                <Text
                                    style={
                                        item.price === "FREE"
                                            ? styles.free
                                            : styles.price
                                    }
                                >
                                    {item.price}
                                </Text>
                            </View>

                            {deliverysoltid === item.id && (
                                <View style={styles.checkBadge}>
                                    <AntDesign name="check" size={12} color="#fff" />
                                </View>
                            )}
                        </TouchableOpacity>
                    ))
                }

                {/* Cake Card */}
                <View style={styles.cakeCard}>
                    <Image
                        source={require("../images/cakeimage.jpeg")}
                        style={styles.cakeImg}
                    />

                    <Text style={styles.badge}>CHEF'S RECOMMENDATION</Text>

                    <Text style={styles.cakeTitle}>{route?.params?.title || "Untitled Cake"}</Text>

                    <Text style={styles.cakeDesc}>
                        {route?.params?.description}
                    </Text>
                </View>

                {/* Button */}
                <TouchableOpacity
                    onPress={handleNext}
                    disabled={loading}
                    activeOpacity={0.85}
                    style={[
                        styles.nextBtn,
                        { opacity: loading ? 0.7 : 1 }
                    ]}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.nextText}>
                            Next: Summary →
                        </Text>
                    )}
                </TouchableOpacity>

                <Text style={styles.footer}>
                    All times are local. Price adjustments include tax.
                </Text>

            </ScrollView>
        </SafeAreaView>
    )
}

export default DeliveryMoment;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5ecd9",
    },
    scrollcontainer: {
        padding: 20
    },
    step: {
        fontSize: 12,
        color: "#8b7d6b",
        marginBottom: 5,
    },

    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#5c4033",
        marginBottom: 20,
    },

    option: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 25,
        borderTopLeftRadius: 48,
        borderBottomRightRadius: 48,
        marginBottom: 12,
        borderWidth: 2,
    },

    maincalender: {
        marginBottom: 30
    },

    summaryCard: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 20,
        marginTop: 12,
    },

    summaryLabel: {
        fontSize: 12,
        color: "#8b7d6b",
    },

    summaryValue: {
        fontSize: 15,
        fontWeight: "600",
        color: "#5c4033",
        marginTop: 2,
    },

    errorRow: {
        backgroundColor: "#fdeceb",
        borderRadius: 14,
        paddingVertical: 10,
        paddingHorizontal: 14,
        marginBottom: 16,
    },

    errorText: {
        color: "#b94a3f",
        textAlign: "center",
        fontWeight: "600",
    },

    iconStyle: {
        backgroundColor: "#6b4f4f",
        padding: 10,
        borderRadius: 9999,
        marginRight: 12,
    },

    optionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#5c4033",
    },

    time: {
        fontSize: 12,
        color: "#8b7d6b",
    },

    priceLabel: {
        fontSize: 10,
        color: "#8b7d6b",
    },

    free: {
        fontWeight: "bold",
        color: "#5c4033",
    },

    price: {
        fontWeight: "bold",
        color: "#5c4033",
    },

    checkBadge: {
        position: "absolute",
        top: -6,
        right: -6,
        width: 22,
        height: 22,
        borderRadius: 11,
        backgroundColor: "#75584e",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        borderColor: "#fff",
    },

    cakeCard: {
        backgroundColor: "#e8dec2",
        borderRadius: 25,
        padding: 20,
        marginTop: 20,
        alignItems: "center",
    },

    cakeImg: {
        width: 200,
        height: 200,
        borderRadius: 20,
        marginBottom: 10,
        transform: [{ rotate: "5deg" }],
    },

    badge: {
        marginTop: 15,
        backgroundColor: "#e7b6c7",
        textAlign: "left",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 10,
        fontSize: 10,
        marginBottom: 8,
    },

    cakeTitle: {
        fontWeight: "bold",
        fontSize: 20,
        color: "#5c4033",
        marginBottom: 5,
    },

    cakeDesc: {
        fontSize: 14,
        color: "#6e5a4f",
        textAlign: "center",
    },

    nextBtn: {
        backgroundColor: "#75584e",
        padding: 18,
        borderRadius: 30,
        marginTop: 25,
        alignItems: "center",
        justifyContent: "center",
        minHeight: 58,
    },

    nextText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
    },

    footer: {
        textAlign: "center",
        fontSize: 12,
        color: "#646040",
        marginTop: 16,
    },
});