import React, { useState, useEffect } from "react";
import { SafeAreaView, StatusBar, ScrollView, View, Text, TouchableOpacity, StyleSheet, RefreshControl, Alert } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ADMIN_API_CONFIG } from '../config/api';

const CustomOrdersAdminPage = () => {
    const [orders, setOrders] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const fetchOrders = async () => {
        try {
            const res = await fetch(`${ADMIN_API_CONFIG.baseURL}/api/custom-orders/admin`);
            const json = await res.json();
            if (json.success && Array.isArray(json.data)) {
                setOrders(json.data);
            } else {
                setOrders([]);
            }
        } catch (e) {
            console.log("Custom orders fetch error:", e);
            setOrders([]);
        }
    };

    useEffect(() => { fetchOrders(); }, []);

    const handleRefresh = async () => {
        setRefreshing(true);
        await fetchOrders();
        setRefreshing(false);
    };

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            const res = await fetch(`${ADMIN_API_CONFIG.baseURL}/api/custom-orders/${id}/status`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });
            const data = await res.json();
            if (res.ok || data.success) {
                setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));
            } else {
                Alert.alert("Error", data.message || "Failed to update status.");
            }
        } catch (e) {
            console.log("Status update error:", e);
            Alert.alert("Error", "Could not update status.");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#fff9e6" barStyle="dark-content" />
            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} colors={["#75584e"]} tintColor="#75584e" />} contentContainerStyle={{ padding: 20 }}>
                <Text style={styles.title}>Custom Order Requests</Text>
                <Text style={styles.subtitle}>Manage customer custom cake orders</Text>
                {orders.length === 0 ? (
                    <Text style={styles.emptyText}>No custom orders found.</Text>
                ) : orders.map((o) => (
                    <View key={o.id} style={styles.card}>
                        <Text style={styles.cardTitle}>Custom Order #{o.id}</Text>
                        <Text style={styles.cardText}>Cake Type: {o.cakeType || "—"}</Text>
                        <Text style={styles.cardText}>Flavor: {o.flavor || "—"}</Text>
                        <Text style={styles.cardText}>Size: {o.size || "—"}</Text>
                        <Text style={styles.cardText}>Message: {o.message || "—"}</Text>
                        <Text style={styles.cardText}>Status: <Text style={{ fontWeight: "700", color: o.status === "pending" ? "#B5651D" : o.status === "delivered" ? "#4F772D" : "#75584e" }}>{o.status}</Text></Text>
                        <View style={styles.buttonRow}>
                            <TouchableOpacity onPress={() => handleStatusUpdate(o.id, "accepted")} style={[styles.statusBtn, { backgroundColor: "#3E5C76" }]}>
                                <Text style={styles.statusBtnText}>Accept</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleStatusUpdate(o.id, "delivered")} style={[styles.statusBtn, { backgroundColor: "#4F772D" }]}>
                                <Text style={styles.statusBtnText}>Delivered</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleStatusUpdate(o.id, "cancelled")} style={[styles.statusBtn, { backgroundColor: "#A4161A" }]}>
                                <Text style={styles.statusBtnText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

export default CustomOrdersAdminPage;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff9e6" },
    title: { fontSize: 28, fontWeight: "800", color: "#75584e", marginBottom: 4 },
    subtitle: { fontSize: 14, color: "#646040", marginBottom: 12 },
    emptyText: { color: "#9C8C7C", fontSize: 14, marginTop: 20 },
    card: { backgroundColor: "#fff", borderRadius: 18, padding: 16, marginBottom: 14, borderWidth: 1, borderColor: "#EAE3D6" },
    cardTitle: { fontSize: 16, fontWeight: "700", color: "#5C443A", marginBottom: 8 },
    cardText: { fontSize: 14, color: "#5C443A", marginBottom: 4 },
    buttonRow: { flexDirection: "row", gap: 8, marginTop: 12 },
    statusBtn: { paddingVertical: 8, paddingHorizontal: 14, borderRadius: 16 },
    statusBtnText: { color: "#fff", fontWeight: "700", fontSize: 12 },
});
