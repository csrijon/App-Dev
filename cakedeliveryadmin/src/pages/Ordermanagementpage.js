import { SafeAreaView } from "react-native-safe-area-context"
import { StatusBar, ScrollView, View, StyleSheet, Text, FlatList, TouchableOpacity } from "react-native"
import Adminheader from "../components/Adminheader"
import OrderCard from "../components/OrderCard"
import Plusbutton from "../components/Plusbutton"
import Ionicons from "react-native-vector-icons/Ionicons"
import { useState } from "react"

const ordersData = [
    {
        id: 1,
        orderNumber: "ORDER #BK-8291",
        customerName: "Eleanor Rigby",
        deliveryTime: "Delivery by 2:30PM Today",
        price: "$145.00",
        tag: "CUSTOM",
        buttonText: "Accept Order",
        buttonColor: "#7B5A4E",
        image: require("../images/catalog.png"),
    },

    {
        id: 2,
        orderNumber: "ORDER #BK-1942",
        customerName: "Sophia Carter",
        deliveryTime: "Delivery by 4:00PM Today",
        price: "$210.00",
        tag: "PRIORITY",
        buttonText: "Start Delivery",
        buttonColor: "#3E5C76",
        image: require("../images/catalog.png"),
    },

    {
        id: 3,
        orderNumber: "ORDER #BK-5521",
        customerName: "Noah Williams",
        deliveryTime: "Delivery by 6:15PM Today",
        price: "$89.00",
        tag: "CUSTOM",
        buttonText: "Track Order",
        buttonColor: "#4F772D",
        image: require("../images/catalog.png"),
    },

    {
        id: 4,
        orderNumber: "ORDER #BK-7712",
        customerName: "Olivia Brown",
        deliveryTime: "Delivery by 1:00PM Tomorrow",
        price: "$175.00",
        tag: "NEW",
        buttonText: "View Details",
        buttonColor: "#9C6644",
        image: require("../images/catalog.png"),
    },
];

const orderStatusData = [
    {
        id: 1,
        title: "All",
        icon: "apps-outline",
    },

    {
        id: 2,
        title: "Pending",
        icon: "time-outline",
    },

    {
        id: 3,
        title: "Preparing",
        icon: "flame-outline",
    },

    {
        id: 4,
        title: "Out for Delivery",
        icon: "bicycle-outline",
    },

    {
        id: 5,
        title: "Completed",
        icon: "checkmark-circle-outline",
    },
];


const Ordermanagementpage = () => {

    const [activecolorid, setactivecolorid] = useState(1)

    return (
        <SafeAreaView style={Ordermanagementstyle.Ordermanagementcontainer} >
            <StatusBar backgroundColor="#fff9e6cc" barStyle="dark-content" />
            <Adminheader />
            <ScrollView Vertical showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 20 }} >
                <View style={Ordermanagementstyle.Topsectiontext} >
                    <View style={Ordermanagementstyle.titleRow}>
                        <Text style={Ordermanagementstyle.Boldtext} >Order Management</Text>
                        <View style={Ordermanagementstyle.countPill}>
                            <Text style={Ordermanagementstyle.countPillText}>{ordersData.length} active</Text>
                        </View>
                    </View>
                    <Text style={Ordermanagementstyle.Normalordertext} >Track, manage, and fulfill your artisanal bakery orders in real-time</Text>
                </View>
                {/* <View style={Ordermanagementstyle.Ordercards} > */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={Ordermanagementstyle.statusContainer} >
                    {
                        orderStatusData.map((item) => {
                            const isActive = activecolorid === item.id;
                            return (
                                <TouchableOpacity
                                    onPress={() => setactivecolorid(item.id)}
                                    key={item.id}
                                    style={[
                                        Ordermanagementstyle.statusButton,
                                        isActive && Ordermanagementstyle.statusButtonActive,
                                    ]}
                                >
                                    <Ionicons
                                        name={item.icon}
                                        size={15}
                                        color={isActive ? "#FFFFFF" : "#7B5A4E"}
                                        style={{ marginRight: 6 }}
                                    />
                                    <Text style={[Ordermanagementstyle.statusText, isActive && Ordermanagementstyle.statusTextActive]}>
                                        {item.title}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })
                    }
                </ScrollView>

                <FlatList
                    contentContainerStyle={{ gap: 15, marginTop: 18 }}
                    data={ordersData}
                    renderItem={({ item }) => <OrderCard orderNumber={item.orderNumber} customerName={item.customerName} deliveryTime={item.deliveryTime} price={item.price} tag={item.tag} buttonText={item.buttonText} image={item.image} buttonColor={item.buttonColor} />}
                    keyExtractor={(item) => item.id}
                    scrollEnabled={false}
                />

            </ScrollView>
          <Plusbutton/>
        </SafeAreaView>
    )
}

export default Ordermanagementpage

const Ordermanagementstyle = StyleSheet.create({
    Ordermanagementcontainer: {
        flex: 1,
        backgroundColor: "#fff9e6"
    },
    Topsectiontext: {
        gap: 6
    },
    titleRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    Boldtext: {
        color: "#75584e",
        fontWeight: "800",
        fontSize: 28,
        letterSpacing: 0.2,
    },
    countPill: {
        backgroundColor: "#EFE2D8",
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 20,
    },
    countPillText: {
        color: "#7B5A4E",
        fontSize: 12,
        fontWeight: "700",
    },
    Normalordertext: {
        color: "#646040",
        fontSize: 14,
        lineHeight: 20
    },
    Ordercards: {
        gap: 10
    },
    statusContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        marginTop: 16,
        paddingBottom: 4,
    },
    statusButton: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 30,
        backgroundColor: "#F4F1EC",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#EAE3D6",
    },
    statusButtonActive: {
        backgroundColor: "#75584e",
        borderColor: "#75584e",
        shadowColor: "#3E2E25",
        shadowOpacity: 0.18,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
        elevation: 2,
    },
    statusText: {
        fontSize: 13.5,
        fontWeight: "600",
        color: "#7B5A4E",
    },
    statusTextActive: {
        color: "#FFFFFF",
    },
})