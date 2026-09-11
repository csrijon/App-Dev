import React, { useState, useEffect } from "react";
import { SafeAreaView, StatusBar, ScrollView, View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import Adminheader from "../components/Adminheader";
import { ADMIN_API_CONFIG } from '../config/api';
import Ionicons from 'react-native-vector-icons/Ionicons';

const DeliveryTrackingpage = ({ navigation, route }) => {
    const orderId = route?.params?.orderId || "";
    const [tracking, setTracking] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTracking = async () => {
            if (!orderId) return;
            try {
                setLoading(true);
                const res = await fetch(`${ADMIN_API_CONFIG.baseURL}/api/orders/${orderId}/tracking`);
                const json = await res.json();
                if (json.success) setTracking(json.data);
            } catch (e) {
                console.log("Admin tracking fetch error:", e);
            } finally {
                setLoading(false);
            }
        };
        fetchTracking();
    }, [orderId]);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#fff9e6" barStyle="dark-content" />
            <Adminheader />
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <Text style={styles.title}>Delivery Tracking</Text>
                <Text style={styles.subtitle}>Order ID: {orderId || "N/A"}</Text>

                {loading ? (
                    <ActivityIndicator size="large" color="#75584e" style={{ marginTop: 40 }} />
                ) : tracking ? (
                    <View style={styles.card}>
                        <Text style={styles.statusText}>Status: {tracking.status || "Pending"}</Text>
                        <Text style={styles.infoText}>Courier: {tracking.courier || "Assigned"}</Text>
                        <Text style={styles.infoText}>ETA: {tracking.eta || "Soon"}</Text>
                        <Text style={styles.infoText}>Location: {tracking.location || "Warehouse"}</Text>
                    </View>
                ) : (
                    <View style={styles.card}>
                        <Text style={styles.infoText}>No tracking data available.</Text>
                    </View>
                )}

                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back-outline" size={20} color="#fff" />
                    <Text style={styles.backText}>Back</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

export default DeliveryTrackingpage;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff9e6" },
    scrollContent: { paddingHorizontal: 24, paddingTop: 20, paddingBottom: 50 },
    title: { fontSize: 26, fontWeight: "800", color: "#75584e", marginBottom: 8 },
    subtitle: { fontSize: 14, color: "#9A8E70", marginBottom: 24 },
    card: { backgroundColor: "#fff", borderRadius: 24, padding: 24, borderWidth: 1, borderColor: "#EFE6CC", shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 10, shadowOffset: { width: 0, height: 4 }, elevation: 2 },
    statusText: { fontSize: 18, fontWeight: "700", color: "#3D2B1F", marginBottom: 12 },
    infoText: { fontSize: 14, color: "#6B5C42", marginBottom: 6 },
    backBtn: { flexDirection: "row", alignItems: "center", backgroundColor: "#75584e", borderRadius: 14, paddingVertical: 12, paddingHorizontal: 20, marginTop: 28, alignSelf: "flex-start", gap: 8 },
    backText: { color: "#fff", fontWeight: "700", fontSize: 14 },
});
