import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { 
    StyleSheet, 
    View, 
    ScrollView, 
    Text, 
    TouchableOpacity, 
    FlatList 
} from "react-native";
import Securityheader from "../components/Securityheader";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// --- CATEGORY DATA ---
const categories = [
    { id: 1, title: "All" },
    { id: 2, title: "Orders" },
    { id: 3, title: "Inventory" },
    { id: 4, title: "Accounts" },
    { id: 5, title: "Customers" },
];

// --- DUMMY NOTIFICATIONS DATA ---
const notificationsData = [
    {
        id: "1",
        title: "New Order #8821",
        time: "Just now",
        description: "Classic Almond Croissants (x6) ready for prep.",
        categoryId: 2, // Orders
        icon: "clipboard-text-outline",
        iconBg: "#F4CAD7", // Soft pink
        iconColor: "#9A496A",
        unread: true,
    },
    {
        id: "2",
        title: "Low Inventory Alert",
        time: "2 hours ago",
        description: "Madagascar Vanilla Beans are running low (2 units left). Please restock soon.",
        categoryId: 3, // Inventory
        icon: "package-variant",
        iconBg: "#F7ECE7", // Soft peach
        iconColor: "#8B6B57",
        unread: true,
    },
    {
        id: "3",
        title: "Payment Received",
        time: "Yesterday",
        description: "Payment of $145.00 for Order #8810 was successful.",
        categoryId: 4, // Accounts
        icon: "credit-card-outline",
        iconBg: "#E8F0E5", // Soft mint/sage
        iconColor: "#587C56",
        unread: false,
    },
    {
        id: "4",
        title: "New Customer Review",
        time: "Yesterday",
        description: "5 stars: 'Absolutely the best macarons I have ever had!'",
        categoryId: 5, // Customers
        icon: "star-outline",
        iconBg: "#FDF3D5", // Soft yellow
        iconColor: "#B58A24",
        unread: false,
    },
];

const Notificationpage = () => {
    // State to track which tab is selected
    const [activeTab, setActiveTab] = useState(1);

    // Filter notifications based on active tab
    const filteredNotifications = activeTab === 1 
        ? notificationsData 
        : notificationsData.filter(item => item.categoryId === activeTab);

    // Render individual notification card
    const renderNotification = ({ item }) => (
        <TouchableOpacity activeOpacity={0.8} style={[styles.notificationCard, item.unread && styles.unreadCard]}>
            {/* Unread Indicator Dot */}
            {item.unread && <View style={styles.unreadDot} />}
            
            <View style={[styles.iconContainer, { backgroundColor: item.iconBg }]}>
                <MaterialCommunityIcons name={item.icon} color={item.iconColor} size={22} />
            </View>

            <View style={styles.content}>
                <View style={styles.headerRow}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={[styles.time, item.unread && styles.unreadTime]}>{item.time}</Text>
                </View>

                <Text style={styles.description} numberOfLines={2}>
                    {item.description}
                </Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <Securityheader title={"Baker Notifications"} />
            
            <View style={styles.mainContent}>
                {/* HORIZONTAL TAB BAR */}
                <View style={styles.tabContainer}>
                    <ScrollView 
                        horizontal 
                        showsHorizontalScrollIndicator={false} 
                        contentContainerStyle={styles.tabScrollContent}
                    >
                        {categories.map((item) => {
                            const isActive = activeTab === item.id;
                            return (
                                <TouchableOpacity 
                                    activeOpacity={0.7} 
                                    key={item.id} 
                                    onPress={() => setActiveTab(item.id)}
                                    style={[styles.tab, isActive ? styles.activeTab : styles.inactiveTab]}
                                >
                                    <Text style={[styles.tabText, isActive ? styles.activeTabText : styles.inactiveTabText]}>
                                        {item.title}
                                    </Text>
                                </TouchableOpacity>
                            )
                        })}
                    </ScrollView>
                </View>

                {/* NOTIFICATIONS LIST */}
                <FlatList
                    data={filteredNotifications}
                    keyExtractor={(item) => item.id}
                    renderItem={renderNotification}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.listContent}
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <MaterialCommunityIcons name="bell-sleep-outline" size={48} color="#D8C9C4" />
                            <Text style={styles.emptyText}>No notifications in this category yet.</Text>
                        </View>
                    }
                />
            </View>
        </SafeAreaView>
    );
};

export default Notificationpage;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FCF9F2", // Match your aesthetic soft cream from the profile page
        flex: 1,
    },
    mainContent: {
        flex: 1,
        marginTop: 10,
    },
    
    /* Tabs */
    tabContainer: {
        height: 60,
        justifyContent: "center",
    },
    tabScrollContent: {
        paddingHorizontal: 20,
        alignItems: "center",
    },
    tab: {
        paddingHorizontal: 22,
        paddingVertical: 10,
        borderRadius: 24,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
    },
    activeTab: {
        backgroundColor: "#8B6A5B", // Rich brown
        elevation: 3,
        shadowColor: "#8B6A5B",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    inactiveTab: {
        backgroundColor: "#F4E9E1", // Soft beige
    },
    tabText: {
        fontSize: 14,
        fontWeight: "600",
        letterSpacing: 0.3,
    },
    activeTabText: {
        color: "#FFFFFF",
    },
    inactiveTabText: {
        color: "#8B6A5B",
    },

    /* Notifications List */
    listContent: {
        paddingHorizontal: 16,
        paddingTop: 10,
        paddingBottom: 40,
    },
    notificationCard: {
        flexDirection: "row",
        backgroundColor: "#FFFFFF",
        borderRadius: 18,
        padding: 16,
        marginBottom: 14,
        position: "relative",
        elevation: 2, // Soft shadow for Android
        shadowColor: "#8B8467", // Soft shadow for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
    },
    unreadCard: {
        backgroundColor: "#FCFAEF", // Very subtle tint for unread
    },
    unreadDot: {
        position: "absolute",
        top: 16,
        right: 16,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#D84C3E", // Alert color
    },
    iconContainer: {
        width: 46,
        height: 46,
        borderRadius: 23,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 14,
    },
    content: {
        flex: 1,
        justifyContent: "center",
    },
    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 6,
        paddingRight: 12, // Space for the unread dot
    },
    title: {
        fontSize: 15,
        fontWeight: "700",
        color: "#363317",
    },
    time: {
        fontSize: 12,
        color: "#A8A085",
    },
    unreadTime: {
        fontWeight: "700",
        color: "#8B6A5B",
    },
    description: {
        fontSize: 14,
        color: "#6B645E",
        lineHeight: 20,
    },
    
    /* Empty State */
    emptyContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 60,
    },
    emptyText: {
        marginTop: 12,
        fontSize: 15,
        color: "#A8A085",
        fontWeight: "500",
    }
});