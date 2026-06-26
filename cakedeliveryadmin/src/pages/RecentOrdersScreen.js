import React, { useState, useMemo } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Securityheader from "../components/Securityheader";

const orders = [
    {
        id: "#GZ-7721",
        name: "Eleanor Shellstrop",
        status: "Delivered",
        amount: "$124.50",
        image: require("../images/catalog.png"),
        details: "2x Vanilla Bean Cake, 1x Croisant Box",
        date: "Oct 24, 2023 · 14:30 PM",
    },
    {
        id: "#GZ-7698",
        name: "Chidi Anagonye",
        status: "Cancelled",
        amount: "$48.00",
        image: require("../images/catalog.png"),
        details: "1x Specialty Cupcake Dozen",
        date: "Oct 22, 2023 · 09:15 AM",
    },
    {
        id: "#GZ-7650",
        name: "Tahani Al-Jamil",
        status: "Delivered",
        amount: "$32.20",
        image: require("../images/catalog.png"),
        details: "4x Pain au Chocolat, 2x Almond Croissants",
        date: "Oct 20, 2023 · 11:45 AM",
    },
    {
        id: "#GZ-7651",
        name: "Tahani Al-Jamil",
        status: "Delivered",
        amount: "$32.20",
        image: require("../images/catalog.png"),
        details: "4x Pain au Chocolat, 2x Almond Croissants",
        date: "Oct 20, 2023 · 11:45 AM",
    },
];

// Parse "Oct 24, 2023 · 14:30 PM" -> JS Date
const parseOrderDate = (dateString) => {
    const datePart = dateString.split("·")[0].trim(); // "Oct 24, 2023"
    return new Date(datePart);
};

// Filter logic based on selected filter
const getFilteredOrders = (data, filter) => {
    if (filter === "All Time") return data;

    const now = new Date();

    return data.filter((item) => {
        const itemDate = parseOrderDate(item.date);
        const diffInDays = (now - itemDate) / (1000 * 60 * 60 * 24);

        switch (filter) {
            case "Last 7 Days":
                return diffInDays <= 7;
            case "Last Month":
                return diffInDays <= 30;
            case "Last 6 Months":
                return diffInDays <= 180;
            case "This Year":
                return itemDate.getFullYear() === now.getFullYear();
            default:
                return true;
        }
    });
};

const FILTERS = ["All Time", "Last 7 Days", "Last Month", "Last 6 Months", "This Year"];

const RecentOrdersScreen = () => {
    const [selectedFilter, setSelectedFilter] = useState("All Time");

    const filteredOrders = useMemo(
        () => getFilteredOrders(orders, selectedFilter),
        [selectedFilter]
    );

    return (
        <SafeAreaView style={styles.totalordersection}>
            <Securityheader title={"Order History"} />
            <View style={styles.mainWrapper}>
                {/* Filter Buttons */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.filterRow}
                >
                    {FILTERS.map((filter) => (
                        <TouchableOpacity
                            key={filter}
                            onPress={() => setSelectedFilter(filter)}
                            style={[
                                styles.filterButton,
                                selectedFilter === filter && styles.activeFilter,
                            ]}>
                            <Text
                                style={[
                                    styles.filterText,
                                    selectedFilter === filter && styles.activeFilterText,
                                ]}>
                                {filter}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                <Text style={styles.heading}>RECENT RECORDS</Text>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 170 }}>
                    {filteredOrders.length === 0 ? (
                        <Text style={styles.emptyText}>No orders found for this period.</Text>
                    ) : (
                        filteredOrders.map((item, index) => (
                            <View key={`${item.id}-${index}`} style={styles.orderCard}>
                                <View style={styles.topSection}>
                                    <View>
                                        <Text style={styles.orderId}>{item.id}</Text>
                                        <Text style={styles.customerName}>{item.name}</Text>
                                    </View>

                                    <View
                                        style={[
                                            styles.statusBox,
                                            item.status === "Cancelled"
                                                ? styles.cancelledBg
                                                : styles.deliveredBg,
                                        ]}>
                                        <Text
                                            style={[
                                                styles.statusText,
                                                item.status === "Cancelled"
                                                    ? styles.cancelledText
                                                    : styles.deliveredText,
                                            ]}>
                                            ⊗ {item.status}
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.middleSection}>
                                    <Image
                                        source={item.image}
                                        style={styles.foodImage}
                                    />

                                    <View style={styles.infoArea}>
                                        <Text style={styles.productText}>{item.details}</Text>
                                        <Text style={styles.dateText}>{item.date}</Text>
                                    </View>
                                </View>

                                <View style={styles.bottomSection}>
                                    <Text style={styles.priceText}>{item.amount}</Text>

                                    <TouchableOpacity style={styles.detailsButton}>
                                        <Text style={styles.detailsText}>View Details</Text>
                                        <Text style={styles.arrow}>›</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))
                    )}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default RecentOrdersScreen;

const styles = StyleSheet.create({
    totalordersection: {
        flex: 1,
        backgroundColor: "#F7F0DD",
    },
    mainWrapper: {
        paddingHorizontal: 18,
        paddingTop: 20,
    },

    filterRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        paddingRight: 20,
        paddingBottom: 5,
    },

    activeFilter: {
        backgroundColor: "#75584e",
        paddingHorizontal: 18,
        paddingVertical: 10,
        borderRadius: 20,
        marginRight: 10,
    },

    activeFilterText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 13,
    },

    filterButton: {
        backgroundColor: "#E9D8D8",
        paddingHorizontal: 18,
        paddingVertical: 10,
        borderRadius: 20,
        marginRight: 10,
    },

    filterText: {
        color: "#755F69",
        fontWeight: "600",
        fontSize: 13,
    },

    heading: {
        color: "#9D9582",
        letterSpacing: 1.5,
        fontSize: 13,
        fontWeight: "700",
        marginBottom: 18,
    },

    orderCard: {
        backgroundColor: "#F9F8F5",
        borderRadius: 28,
        padding: 16,
        marginBottom: 18,
    },

    topSection: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 15,
    },

    orderId: {
        color: "#8E6B5B",
        fontSize: 14,
        fontWeight: "700",
    },

    customerName: {
        color: "#2E2E2E",
        fontWeight: "700",
        marginTop: 4,
    },

    statusBox: {
        paddingHorizontal: 12,
        paddingVertical: 7,
    },

    deliveredBg: {
        backgroundColor: "#F8E7EE",
    },

    cancelledBg: {
        backgroundColor: "#EAE1BB",
    },

    deliveredText: {
        color: "#7C576A",
        fontWeight: "700",
        fontSize: 12,
    },

    cancelledText: {
        color: "#756D49",
        fontWeight: "700",
        fontSize: 12,
    },

    statusText: {
        fontSize: 12,
    },

    middleSection: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
    },

    foodImage: {
        width: 58,
        height: 58,
        borderRadius: 29,
    },

    infoArea: {
        flex: 1,
        marginLeft: 12,
    },

    productText: {
        color: "#8A7E76",
        fontSize: 15,
        lineHeight: 20,
    },

    dateText: {
        color: "#B3A89E",
        marginTop: 3,
        fontSize: 14,
    },

    bottomSection: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    priceText: {
        color: "#7A5B4D",
        fontWeight: "700",
        fontSize: 18,
    },

    detailsButton: {
        flexDirection: "row",
        alignItems: "center",
    },

    detailsText: {
        color: "#74594C",
        fontWeight: "700",
        marginRight: 6,
    },

    arrow: {
        fontSize: 20,
        color: "#74594C",
        fontWeight: "700",
    },

    emptyText: {
        textAlign: "center",
        marginTop: 40,
        color: "#a48a80",
        fontStyle: "italic",
    },
});