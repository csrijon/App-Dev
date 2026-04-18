import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Detailsheader from "../components/Detailsheader";
import { useState } from "react";


const DeliveryMoment = ({navigation}) => {

    const [selected, setselected] = useState(null)
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#f5ecd9" barStyle="dark-content" />
            <Detailsheader />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom:40}} style={styles.scrollcontainer} >
                {/* Header */}
                <Text style={styles.step}>ORDER STEP 02</Text>
                <Text style={styles.title}>Choose Your Delivery Moment</Text>

                {/* Date Card */}
                <View style={styles.dateCard}>
                    <View>
                        <Text style={styles.dateLabel}>Collection Date</Text>
                        <Text style={styles.date}>Friday, 12 June</Text>
                    </View>
                    <View style={styles.calendarIcon}>
                        <Text>📅</Text>
                    </View>
                </View>

                {/* Time Options */}
                <TouchableOpacity onPress={() => setselected(!selected)} style={[styles.option, { borderColor: selected ? "#6b4f4f" : "white" }]}>
                    <View style={styles.iconCircle}>
                        <Text>☀️</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.optionTitle}>Morning</Text>
                        <Text style={styles.time}>09:00 AM - 12:00 PM</Text>
                    </View>
                    <View>
                        <Text style={styles.priceLabel}>Standard</Text>
                        <Text style={styles.free}>FREE</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.option, styles.selected]}>
                    <View style={styles.iconCircleDark}>
                        <Text style={{ color: "#fff" }}>☀️</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.optionTitle}>Afternoon</Text>
                        <Text style={styles.time}>12:00 PM - 04:00 PM</Text>
                    </View>
                    <View>
                        <Text style={styles.priceLabel}>Peak Time</Text>
                        <Text style={styles.price}>+$5.00</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.option}>
                    <View style={styles.iconCirclePink}>
                        <Text>🌙</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.optionTitle}>Evening</Text>
                        <Text style={styles.time}>04:00 PM - 08:00 PM</Text>
                    </View>
                    <View>
                        <Text style={styles.priceLabel}>Late Slot</Text>
                        <Text style={styles.price}>+$2.00</Text>
                    </View>
                </TouchableOpacity>

                {/* Cake Card */}
                <View style={styles.cakeCard}>
                    <Image
                        source={require("../images/cakeimage.jpeg")}
                        style={styles.cakeImg}
                    />

                    <Text style={styles.badge}>CHEF'S RECOMMENDATION</Text>

                    <Text style={styles.cakeTitle}>The Midnight Velvet</Text>

                    <Text style={styles.cakeDesc}>
                        Your selected slot is perfect for the fresh frosting setting of our signature velvet collection.
                    </Text>
                </View>

                {/* Button */}
                <TouchableOpacity onPress={()=>navigation.navigate("Cakedetails")} style={styles.nextBtn}>
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
        backgroundColor: "#f3e8d9",
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
        borderWidth:2,
    },

    selected: {
        borderWidth: 2,
        borderColor: "#6b4f4f",
    },

    iconCircle: {
        backgroundColor: "#f3d9dc",
        padding: 10,
        borderRadius: 9999,
        marginRight: 12,
    },

    iconCircleDark: {
        backgroundColor: "#6b4f4f",
        padding: 10,
        borderRadius: 20,
        marginRight: 12,
    },

    iconCirclePink: {
        backgroundColor: "#f3c6d3",
        padding: 10,
        borderRadius: 20,
        marginRight: 12,
    },

    optionTitle: {
        fontSize:18,
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
        transform:[{rotate:"5deg"}]
    },

    badge: {
        marginTop:15,
        backgroundColor: "#e7b6c7",
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
        backgroundColor: "#6b4f4f",
        padding: 18,
        borderRadius: 30,
        marginTop: 25,
        alignItems: "center",
    },

    nextText: {
        fontSize:18,
        color: "#fff",
        fontWeight: "bold",
    },

    footer: {
        textAlign: "center",
        fontSize: 10,
        color: "#8b7d6b",
        marginTop: 10,
    },
});