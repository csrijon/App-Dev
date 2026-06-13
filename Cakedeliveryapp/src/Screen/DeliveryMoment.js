import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Image } from "react-native";
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
    const [deliverysoltid, setdeliverysoltid] = useState(null)
    const [selecteddate, setselecteddate] = useState("")
    const [datetime, setdatetime] = useState("")
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#fff9e6" barStyle="dark-content" />
            <Detailsheader />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }} style={styles.scrollcontainer} >
                {/* Header */}
                <Text style={styles.step}>ORDER STEP 02</Text>
                <Text style={styles.title}>Choose Your Delivery Moment</Text>

                <View style={styles.maincalender} >
                    <Calendar onDayPress={(day) => {
                        setselecteddate(day.dateString)
                        setdatetime(new Date(day.dateString).toDateString())
                    }} style={{
                        padding: 20,
                        borderRadius: 48,
                        arrowColor: "#fff"
                    }}
                        theme={{
                            backgroundColor: '#fff',
                            calendarBackground: '#fff',
                            todayTextColor: "red",
                            arrowColor: "#000",
                            selectedDayTextColor: "black"
                        }}
                        markedDates={{
                            [selecteddate]: { selected: true, selectedColor: "#f6cfc2", color: "black" }
                        }}

                    />
                </View>

                {/* Time Options */}

                {
                    deliverySlots.map((item) => (
                        <TouchableOpacity
                            onPress={() => setdeliverysoltid(item.id)}
                            key={item.id}
                            style={[styles.option, {
                                borderColor: deliverysoltid === item.id ? "#f6cfc2" : "#75584e"
                            }]}
                        >
                            <View style={[styles.iconStyle, { backgroundColor: deliverysoltid === item.id ? "#f3c6d3" : "#6b4f4f" }]}>
                                <Text style={item.textStyle}>
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

                            <View>
                                <Text style={styles.priceLabel}>
                                    {item.label}
                                </Text>

                                <Text style={item.price === "FREE" ? styles.free : styles.price}>
                                    {item.price}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    ))
                }
                {/* Cake Card */}
                <View style={styles.cakeCard}>
                    <Image
                        source={{ uri: route?.params?.image }}
                        style={styles.cakeImg}
                    />

                    <Text style={styles.badge}>CHEF'S RECOMMENDATION</Text>

                    <Text style={styles.cakeTitle}>{route.params.title}</Text>

                    <Text style={styles.cakeDesc}>
                        {route.params.description}
                    </Text>
                </View>

                {/* Button */}
                <TouchableOpacity onPress={() => navigation.navigate("Cakedetails")} style={styles.nextBtn}>
                    <Text style={styles.nextText}>Next: Summary →</Text>
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
        // padding: 20,
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

    dateCard: {
        backgroundColor: "#e8dec2",
        borderRadius: 25,
        padding: 25,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },

    dateLabel: {
        color: "#8b7d6b",
        fontSize: 12,
    },

    date: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#5c4033",
    },

    calendarIcon: {
        backgroundColor: "#f6cfc2",
        padding: 12,
        borderRadius: 20,
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

    iconStyle: {
        // backgroundColor: "#f3d9dc",
        backgroundColor: "#6b4f4f",
        padding: 10,
        borderRadius: 9999,
        marginRight: 12,
    },


    iconCirclePink: {
        backgroundColor: "#f3c6d3",
        padding: 10,
        borderRadius: 20,
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
        textAlign:"left",
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