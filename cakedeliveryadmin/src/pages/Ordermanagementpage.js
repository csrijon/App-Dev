import { SafeAreaView } from "react-native-safe-area-context"
import { StatusBar, ScrollView, View, StyleSheet, Text, FlatList, TouchableOpacity, Alert, TextInput, RefreshControl } from "react-native"
import Adminheader from "../components/Adminheader"
import OrderCard from "../components/OrderCard"
import Ionicons from "react-native-vector-icons/Ionicons"
import { useState, useEffect } from "react"

import { ADMIN_API_CONFIG } from '../config/api';

const orderStatusData = [
    { id: 1, title: "All", icon: "apps-outline" },
    { id: 2, title: "Pending", icon: "time-outline" },
    { id: 3, title: "Accepted", icon: "checkmark-done-outline" },
    { id: 4, title: "Preparing", icon: "flame-outline" },
    { id: 5, title: "Out for Delivery", icon: "bicycle-outline" },
    { id: 6, title: "Delivered", icon: "checkmark-circle-outline" },
    { id: 7, title: "Cancelled", icon: "close-circle-outline" },
    { id: 8, title: "Refund Requests", icon: "cash-outline" },
];


const Ordermanagementpage = () => {

    const [activecolorid, setactivecolorid] = useState(1)
    const [searchText, setSearchText] = useState('')
    const [refreshing, setRefreshing] = useState(false)
    const [ordersData, setOrdersData] = useState([])

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await fetch(`${ADMIN_API_CONFIG.baseURL}/api/orders`);
            const json = await res.json();
            if (json.success && Array.isArray(json.data)) {
                setOrdersData(json.data.map((o) => ({
                    id: o.id || o.orderId || Math.random(),
                    orderNumber: o.orderNumber || "ORDER #BK-" + (o.id || 0),
                    customerName: o.customerName || o.customer?.name || "Guest",
                    deliveryTime: o.deliveryTime || o.estimatedDelivery || "Scheduled",
                    price: "$" + (o.totalAmount || o.price || 0).toFixed(2),
                    tag: o.tag || "CUSTOM",
                    status: o.orderStatus || o.status || "Pending",
                    buttonText: o.status === "Pending" ? "Accept Order" : (o.status === "Accepted" ? "Start Delivery" : (o.status === "Preparing" ? "Track Order" : (o.status === "Cancelled" ? "View Details" : "View Details"))),
                    buttonColor: o.status === "Pending" ? "#7B5A4E" : (o.status === "Accepted" ? "#3E5C76" : (o.status === "Preparing" ? "#4F772D" : (o.status === "Cancelled" ? "#A4161A" : "#4F772D"))),
                    image: require("../images/catalog.png"),
                })));
            }
        } catch (e) {
            console.log("Fetch orders error:", e);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleRefresh = async () => {
        setRefreshing(true);
        await fetchOrders();
        setRefreshing(false);
    }

    const activeStatus = orderStatusData.find((item) => item.id === activecolorid)?.title

    const searchFiltered = ordersData.filter((order) =>
        order.customerName.toLowerCase().includes(searchText.toLowerCase()) ||
        order.orderNumber.toLowerCase().includes(searchText.toLowerCase())
    )

    const filteredOrders =
        activeStatus === "All"
            ? searchFiltered
            : searchFiltered.filter((order) => order.status === activeStatus)

    // Real backend: accept order (update status to accepted)
    const handleAcceptOrder = async (orderId) => {
        try {
            const res = await fetch(`${ADMIN_API_CONFIG.baseURL}/api/orders/${orderId}/status`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ orderStatus: "accepted" }),
            });
            const data = await res.json();
            if (res.ok || data.success) {
                setOrdersData((prev) =>
                    prev.map((o) =>
                        o.id === orderId ? { ...o, status: "Accepted", tag: "PRIORITY", buttonText: "Start Delivery", buttonColor: "#3E5C76" } : o
                    )
                );
            }
        } catch (e) {
            console.log("Accept error:", e);
        }
    };

    // Real backend: update order status
    const handleStatusUpdate = async (orderId, newStatus) => {
        try {
            const res = await fetch(`${ADMIN_API_CONFIG.baseURL}/api/orders/${orderId}/status`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ orderStatus: newStatus.toLowerCase() }),
            });
            const data = await res.json();
            if (res.ok || data.success) {
                setOrdersData((prev) =>
                    prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
                );
            }
        } catch (e) {
            console.log("Status update error:", e);
        }
    };

    // Admin cancels an order
    const handleCancelOrder = async (orderId) => {
        try {
            const res = await fetch(`${ADMIN_API_CONFIG.baseURL}/api/orders/${orderId}/cancel`, { method: "PATCH" });
            const data = await res.json();
            if (res.ok || data.success) {
                setOrdersData((prevOrders) =>
                    prevOrders.map((order) =>
                        order.id === orderId
                            ? {
                                ...order,
                                status: "Cancelled",
                                tag: "CANCELLED",
                                deliveryTime: "Cancelled by Baker",
                                buttonText: "View Details",
                                buttonColor: "#A4161A",
                            }
                            : order
                    )
                );
                Alert.alert("Order Cancelled", "The order status has been updated to Cancelled. Customer will be notified.");
            } else {
                Alert.alert("Error", "Failed to cancel order.");
            }
        } catch (e) {
            console.log("Cancel error:", e);
            Alert.alert("Error", "Could not cancel. Check connection.");
        }
    };

    return (
        <SafeAreaView style={Ordermanagementstyle.Ordermanagementcontainer} >
            <StatusBar backgroundColor="#fff9e6cc" barStyle="dark-content" />
            <Adminheader />
            <ScrollView Vertical showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 20 }} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} colors={["#75584e"]} tintColor="#75584e" />} >
                <View style={Ordermanagementstyle.Topsectiontext} >
                    <View style={Ordermanagementstyle.titleRow}>
                        <Text style={Ordermanagementstyle.Boldtext} >Order Management</Text>
                        <View style={Ordermanagementstyle.countPill}>
                            <Text style={Ordermanagementstyle.countPillText}>{ordersData.length} active</Text>
                        </View>
                    </View>
                    <Text style={Ordermanagementstyle.Normalordertext} >Track, manage, and fulfill your artisanal bakery orders in real-time</Text>
                </View>

                <View style={Ordermanagementstyle.searchRow}>
                    <View style={Ordermanagementstyle.searchBox}>
                        <Ionicons name="search-outline" size={18} color="#8B7365" style={{ marginRight: 8 }} />
                        <TextInput
                            placeholder="Search orders..."
                            placeholderTextColor="#B5A89B"
                            value={searchText}
                            onChangeText={setSearchText}
                            style={Ordermanagementstyle.searchInput}
                        />
                    </View>
                </View>

                <View style={Ordermanagementstyle.statsRow}>
                    {[
                        { label: 'Pending', count: ordersData.filter(o => o.status === 'Pending').length, color: '#B5651D' },
                        { label: 'Accepted', count: ordersData.filter(o => o.status === 'Accepted').length, color: '#3E5C76' },
                        { label: 'Delivered', count: ordersData.filter(o => o.status === 'Delivered').length, color: '#4F772D' },
                    ].map((s) => (
                        <View key={s.label} style={[Ordermanagementstyle.statCard, { borderLeftColor: s.color }]}>
                            <Text style={Ordermanagementstyle.statCount}>{s.count}</Text>
                            <Text style={Ordermanagementstyle.statLabel}>{s.label}</Text>
                        </View>
                    ))}
                </View>

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

                {filteredOrders.length === 0 ? (
                    <View style={Ordermanagementstyle.emptyState}>
                        <Ionicons name="file-tray-outline" size={36} color="#B5A89B" />
                        <Text style={Ordermanagementstyle.emptyStateText}>There is no Order in this Catagory</Text>
                    </View>
                ) : (
                    <FlatList
                        contentContainerStyle={{ gap: 15, marginTop: 18 }}
                        data={filteredOrders}
                        renderItem={({ item }) => (
                            <OrderCard
                                orderNumber={item.orderNumber}
                                customerName={item.customerName}
                                deliveryTime={item.deliveryTime}
                                price={item.price}
                                tag={item.tag}
                                status={item.status}
                                buttonText={item.buttonText}
                                image={item.image}
                                buttonColor={item.buttonColor}
                                onAccept={() => handleAcceptOrder(item.id)}
                                onStatusUpdate={(newStatus) => handleStatusUpdate(item.id, newStatus)}
                                onCancel={() => handleCancelOrder(item.id)}
                                onPress={() => Alert.alert("Order Details", `Order: ${item.orderNumber}\nCustomer: ${item.customerName}\nDelivery: ${item.deliveryTime}\nPrice: ${item.price}\nStatus: ${item.status}\nTag: ${item.tag}`)}
                            />
                        )}
                        keyExtractor={(item) => item.id.toString()}
                        scrollEnabled={false}
                    />
                )}

            </ScrollView>
          {/* <Plusbutton/> */}
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
    searchRow: {
        marginBottom: 16,
    },
    searchBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 28,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderWidth: 1,
        borderColor: '#EAE3D6',
        shadowColor: '#4A3320',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 2,
    },
    searchInput: {
        flex: 1,
        fontSize: 14,
        color: '#5C443A',
        fontWeight: '500',
    },
    statsRow: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 20,
    },
    statCard: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        paddingVertical: 14,
        paddingHorizontal: 12,
        borderLeftWidth: 4,
        shadowColor: '#4A3320',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 2,
    },
    statCount: {
        fontSize: 18,
        fontWeight: '800',
        color: '#5C443A',
    },
    statLabel: {
        fontSize: 11,
        fontWeight: '600',
        color: '#8B7365',
        marginTop: 2,
    },
    emptyState: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 60,
        gap: 10,
    },
    emptyStateText: {
        color: "#9C8C7C",
        fontSize: 14,
        fontWeight: "600",
    },
})