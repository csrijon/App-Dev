import { SafeAreaView } from "react-native-safe-area-context"
import { StatusBar, ScrollView, View, Text, StyleSheet, Alert, TouchableOpacity } from "react-native"
import Adminheader from "../components/Adminheader"
import Dashboardbutton from "../components/Dashboardbutton"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AnalyticsCard from "../components/AnalyticsCard"
import RecentOrders from "../components/RecentOrders"
import BakingCard from "../components/BakingCard"
import Footer from "../components/Footer"

const dashboardData = [
    {
        id: 1,
        title: "TOTAL REVENUE",
        value: "$4,850.00",
        subtitle: "+12.5% vs last week",
        bgColor: "#ECE4C8",
        iconBg: "#DCD0A0",
        icon: <MaterialCommunityIcons name="chart-line-variant" color="#5D4B2E" size={22} />
    },

    {
        id: 2,
        title: "ACTIVE ORDERS",
        value: "$12",
        subtitle: "Next delivery in 45m",
        bgColor: "#f4dce4",
        iconBg: "#E8BFCC",
        icon: <Ionicons name="time-outline" color="#7A3B4E" size={22} />
    },

    {
        id: 3,
        title: "PENDING REVIEWS",
        value: "$4",
        subtitle: "4.9 avg rating",
        bgColor: "#f8bbd0",
        iconBg: "#F09FB8",
        icon: <Ionicons name="star-outline" color="#7A2E45" size={22} />
    },
];

// Sales Overview — last 7 days (relative bar heights, out of 100)
const salesOverviewData = [
    { day: "Mon", value: 40 },
    { day: "Tue", value: 55 },
    { day: "Wed", value: 35 },
    { day: "Thu", value: 70 },
    { day: "Fri", value: 60 },
    { day: "Sat", value: 90 },
    { day: "Sun", value: 78 },
];

// Today's Orders breakdown
const todaysOrdersBreakdown = [
    { id: 1, label: "Pending", count: 5, color: "#E8BFCC", dot: "#C2476A" },
    { id: 2, label: "Preparing", count: 4, color: "#F2E0B8", dot: "#B98A2E" },
    { id: 3, label: "Out for Delivery", count: 2, color: "#CFE3D2", dot: "#3F7A53" },
    { id: 4, label: "Completed", count: 11, color: "#DCE3F0", dot: "#3C5DA8" },
];

// Low Stock Alerts
const lowStockItems = [
    { id: 1, name: "Valrhona Chocolate", quantity: "2 kg left", level: "critical" },
    { id: 2, name: "Vanilla Bean Pods", quantity: "5 units left", level: "low" },
    { id: 3, name: "Almond Flour", quantity: "3 kg left", level: "low" },
];

// Quick Actions
const quickActions = [
    { id: 1, label: "Add Product", icon: <MaterialIcons name="add-circle-outline" size={24} color="#7A5C50" />, bg: "#F3EACF" },
    { id: 2, label: "View Orders", icon: <Ionicons name="receipt-outline" size={24} color="#7A3B4E" />, bg: "#f4dce4" },
    { id: 3, label: "Coupons", icon: <MaterialCommunityIcons name="ticket-percent-outline" size={24} color="#5D4B2E" />, bg: "#ECE4C8" },
    { id: 4, label: "Reports", icon: <MaterialCommunityIcons name="file-chart-outline" size={24} color="#3C5DA8" />, bg: "#DCE3F0" },
];


const Dashboardpage = ({ navigation }) => {

    const todaysOrdersTotal = todaysOrdersBreakdown.reduce((sum, item) => sum + item.count, 0);
    const maxSalesValue = Math.max(...salesOverviewData.map((d) => d.value));

    return (
        <SafeAreaView style={Dashboardstyle.Dashboardcontainer} >
            <StatusBar backgroundColor="#fff9e6cc" barStyle="dark-content" />
            <Adminheader />
            <ScrollView Vertical contentContainerStyle={{ paddingHorizontal: 24, marginTop: 20, paddingBottom: 40 }} >
                <View style={Dashboardstyle.headingtext} >
                    <Text style={[Dashboardstyle.headingtitle, Dashboardstyle.blod]} >Srijon, Chef</Text>
                    <Text style={Dashboardstyle.headingparagraph} >Your artisanal gallery is bustling today. Here is the morning's oversight for your confectionary empire.</Text>
                </View>
                <View style={Dashboardstyle.buttonsection} >
                    <Dashboardbutton
                        title="Download"
                        name="Reports"
                        onPress={() => {
                            Alert.alert(
                                "Download Completed",
                                "The report has been downloaded successfully."
                            );
                        }}
                    />
                    <Dashboardbutton onPress={() => navigation.navigate("Catalog")} title="New" name="Product" buttonstyle={Dashboardstyle.chococolor} Textstyle={Dashboardstyle.chococolortext} />
                </View>

                {/* {card section start} */}
                <View style={Dashboardstyle.cardbox}>
                    {
                        dashboardData.map((item) => (
                            <View key={item.id} style={[Dashboardstyle.card, { backgroundColor: item.bgColor }]}>

                                <View style={Dashboardstyle.topSection}>
                                    <View style={Dashboardstyle.topRow}>
                                        <Text style={Dashboardstyle.heading}>
                                            {item.title}
                                        </Text>
                                        <View style={[Dashboardstyle.iconBadge, { backgroundColor: item.iconBg }]}>
                                            {item.icon}
                                        </View>
                                    </View>

                                    <Text style={Dashboardstyle.amount}>
                                        {item.value}
                                    </Text>
                                </View>

                                <View style={Dashboardstyle.bottomSection}>
                                    <View style={Dashboardstyle.trendDot} />
                                    <Text style={Dashboardstyle.subtitle}>
                                        {item.subtitle}
                                    </Text>
                                </View>

                            </View>
                        ))
                    }
                </View>
                {/* {Card section end } */}

                {/* Quick Actions */}
                <View style={Dashboardstyle.sectionHeaderRow}>
                    <Text style={Dashboardstyle.sectionHeading}>Quick Actions</Text>
                </View>

                <View style={Dashboardstyle.quickActionsRow}>
                    {quickActions.map((action) => (
                        <TouchableOpacity
                            key={action.id}
                            style={Dashboardstyle.quickActionItem}
                            activeOpacity={0.8}
                            onPress={() => {
                                if (action.label === "Add Product") {
                                    navigation.navigate("Catalog");
                                } else {
                                    Alert.alert(action.label, `${action.label} tapped.`);
                                }
                            }}
                        >
                            <View style={[Dashboardstyle.quickActionIconCircle, { backgroundColor: action.bg }]}>
                                {action.icon}
                            </View>
                            <Text style={Dashboardstyle.quickActionLabel}>{action.label}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Sales Overview */}
                <View style={Dashboardstyle.salesOverviewCard}>
                    <View style={Dashboardstyle.salesOverviewHeaderRow}>
                        <View>
                            <Text style={Dashboardstyle.sectionHeading}>Sales Overview</Text>
                            <Text style={Dashboardstyle.salesOverviewSubtitle}>Last 7 days performance</Text>
                        </View>
                        <View style={Dashboardstyle.salesOverviewTotalPill}>
                            <MaterialCommunityIcons name="trending-up" size={14} color="#3F7A53" />
                            <Text style={Dashboardstyle.salesOverviewTotalPillText}>+18%</Text>
                        </View>
                    </View>

                    <View style={Dashboardstyle.salesBarRow}>
                        {salesOverviewData.map((item) => (
                            <View key={item.day} style={Dashboardstyle.salesBarColumn}>
                                <View style={Dashboardstyle.salesBarTrack}>
                                    <View
                                        style={[
                                            Dashboardstyle.salesBarFill,
                                            { height: `${(item.value / maxSalesValue) * 100}%` },
                                        ]}
                                    />
                                </View>
                                <Text style={Dashboardstyle.salesBarDayLabel}>{item.day}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Today's Orders */}
                <View style={Dashboardstyle.todaysOrdersCard}>
                    <View style={Dashboardstyle.salesOverviewHeaderRow}>
                        <Text style={Dashboardstyle.sectionHeading}>Today's Orders</Text>
                        <Text style={Dashboardstyle.todaysOrdersTotalText}>{todaysOrdersTotal} total</Text>
                    </View>

                    <View style={Dashboardstyle.todaysOrdersGrid}>
                        {todaysOrdersBreakdown.map((item) => (
                            <View key={item.id} style={[Dashboardstyle.todaysOrdersChip, { backgroundColor: item.color }]}>
                                <View style={Dashboardstyle.todaysOrdersChipTopRow}>
                                    <View style={[Dashboardstyle.todaysOrdersDot, { backgroundColor: item.dot }]} />
                                    <Text style={Dashboardstyle.todaysOrdersChipLabel}>{item.label}</Text>
                                </View>
                                <Text style={Dashboardstyle.todaysOrdersChipCount}>{item.count}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Low Stock Alerts */}
                <View style={Dashboardstyle.lowStockCard}>
                    <View style={Dashboardstyle.salesOverviewHeaderRow}>
                        <View style={Dashboardstyle.lowStockHeadingRow}>
                            <MaterialIcons name="warning-amber" size={18} color="#B23B3B" />
                            <Text style={[Dashboardstyle.sectionHeading, { marginLeft: 6 }]}>Low Stock Alerts</Text>
                        </View>
                        <View style={Dashboardstyle.lowStockCountPill}>
                            <Text style={Dashboardstyle.lowStockCountPillText}>{lowStockItems.length}</Text>
                        </View>
                    </View>

                    {lowStockItems.map((item) => (
                        <View key={item.id} style={Dashboardstyle.lowStockRow}>
                            <View style={Dashboardstyle.lowStockLeft}>
                                <View
                                    style={[
                                        Dashboardstyle.lowStockLevelDot,
                                        { backgroundColor: item.level === "critical" ? "#C24545" : "#D69A3B" },
                                    ]}
                                />
                                <View>
                                    <Text style={Dashboardstyle.lowStockItemName}>{item.name}</Text>
                                    <Text style={Dashboardstyle.lowStockItemQuantity}>{item.quantity}</Text>
                                </View>
                            </View>

                            <TouchableOpacity
                                style={Dashboardstyle.restockButton}
                                onPress={() => Alert.alert("Restock", `Restock request sent for ${item.name}.`)}
                            >
                                <Text style={Dashboardstyle.restockButtonText}>Restock</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>

                {/* <AnalyticsCard /> */}
                <RecentOrders />
                <BakingCard />
                <Footer />
            </ScrollView>
        </SafeAreaView>
    )
}

export default Dashboardpage

const Dashboardstyle = StyleSheet.create({
    Dashboardcontainer: {
        flex: 1,
        backgroundColor: "#fdf7e4",
    },
    headingtext: {
        gap: 8
    },
    headingtitle: {
        fontSize: 22,
        color: "#3D2E22",
        letterSpacing: 0.3,
    },
    blod: {
        fontWeight: "700",
    },
    headingparagraph: {
        color: "#7A6F52",
        fontSize: 15,
        letterSpacing: 0.3,
        lineHeight: 22,
    },
    buttonsection: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 16,
        marginTop: 22,
        width: "100%"
    },
    chococolor: {
        backgroundColor: "#684d43",
    },
    chococolortext: {
        color: "#ffffff"
    },
    cardbox: {
        alignItems: "center",
        marginTop: 28,
        gap: 18
    },

    card: {
        width: "100%",
        height: 175,
        borderRadius: 32,
        paddingHorizontal: 24,
        paddingVertical: 24,
        justifyContent: "space-between",
        shadowColor: "#5D4B2E",
        shadowOpacity: 0.08,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 2,
    },
    topSection: {
        gap: 14,
    },
    topRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    iconBadge: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    heading: {
        fontSize: 13,
        fontWeight: "700",
        color: "#6B5C42",
        letterSpacing: 1.2,
    },
    amount: {
        fontSize: 28,
        fontWeight: "800",
        color: "#3F2F26",
        letterSpacing: 0.3,
    },
    bottomSection: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    trendDot: {
        width: 7,
        height: 7,
        borderRadius: 4,
        backgroundColor: "#4CAF50",
    },
    subtitle: {
        fontSize: 14,
        color: "#6B5A50",
        fontWeight: "600",
    },

    /* ---------- Shared section heading ---------- */
    sectionHeaderRow: {
        marginTop: 32,
        marginBottom: 16,
    },
    sectionHeading: {
        fontSize: 19,
        fontWeight: "800",
        color: "#3D2E22",
        letterSpacing: 0.2,
    },

    /* ---------- Quick Actions ---------- */
    quickActionsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        flexWrap: "wrap",
        rowGap: 16,
    },
    quickActionItem: {
        width: "23%",
        alignItems: "center",
    },
    quickActionIconCircle: {
        width: 56,
        height: 56,
        borderRadius: 28,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 8,
        shadowColor: "#5D4B2E",
        shadowOpacity: 0.06,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
        elevation: 1,
    },
    quickActionLabel: {
        fontSize: 12,
        fontWeight: "600",
        color: "#5C4F3E",
        textAlign: "center",
    },

    /* ---------- Sales Overview ---------- */
    salesOverviewCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 28,
        padding: 22,
        marginTop: 32,
        borderWidth: 1,
        borderColor: "#EFE6CC",
        shadowColor: "#5D4B2E",
        shadowOpacity: 0.05,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 1,
    },
    salesOverviewHeaderRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 22,
    },
    salesOverviewSubtitle: {
        fontSize: 13,
        color: "#9A8E70",
        marginTop: 4,
    },
    salesOverviewTotalPill: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#E2F0E5",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 16,
    },
    salesOverviewTotalPillText: {
        fontSize: 12,
        fontWeight: "700",
        color: "#3F7A53",
        marginLeft: 4,
    },
    salesBarRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
        height: 110,
    },
    salesBarColumn: {
        alignItems: "center",
        flex: 1,
    },
    salesBarTrack: {
        width: 18,
        height: 90,
        backgroundColor: "#F3EACF",
        borderRadius: 9,
        justifyContent: "flex-end",
        overflow: "hidden",
    },
    salesBarFill: {
        width: "100%",
        backgroundColor: "#B98A53",
        borderRadius: 9,
    },
    salesBarDayLabel: {
        fontSize: 11,
        fontWeight: "600",
        color: "#9A8E70",
        marginTop: 8,
    },

    /* ---------- Today's Orders ---------- */
    todaysOrdersCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 28,
        padding: 22,
        marginTop: 22,
        borderWidth: 1,
        borderColor: "#EFE6CC",
        shadowColor: "#5D4B2E",
        shadowOpacity: 0.05,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 1,
    },
    todaysOrdersTotalText: {
        fontSize: 14,
        fontWeight: "700",
        color: "#9A8E70",
    },
    todaysOrdersGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        rowGap: 12,
    },
    todaysOrdersChip: {
        width: "48%",
        borderRadius: 18,
        paddingVertical: 14,
        paddingHorizontal: 16,
    },
    todaysOrdersChipTopRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
    },
    todaysOrdersDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 6,
    },
    todaysOrdersChipLabel: {
        fontSize: 12,
        fontWeight: "700",
        color: "#5C4F3E",
    },
    todaysOrdersChipCount: {
        fontSize: 22,
        fontWeight: "800",
        color: "#3D2E22",
    },

    /* ---------- Low Stock Alerts ---------- */
    lowStockCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 28,
        padding: 22,
        marginTop: 22,
        borderWidth: 1,
        borderColor: "#EFE6CC",
        shadowColor: "#5D4B2E",
        shadowOpacity: 0.05,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 1,
    },
    lowStockHeadingRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    lowStockCountPill: {
        backgroundColor: "#FBE3E3",
        width: 26,
        height: 26,
        borderRadius: 13,
        alignItems: "center",
        justifyContent: "center",
    },
    lowStockCountPillText: {
        fontSize: 13,
        fontWeight: "800",
        color: "#B23B3B",
    },
    lowStockRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 12,
        borderTopWidth: 1,
        borderTopColor: "#F3EDDB",
    },
    lowStockLeft: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    lowStockLevelDot: {
        width: 9,
        height: 9,
        borderRadius: 5,
        marginRight: 12,
    },
    lowStockItemName: {
        fontSize: 15,
        fontWeight: "700",
        color: "#3D2E22",
        marginBottom: 2,
    },
    lowStockItemQuantity: {
        fontSize: 13,
        color: "#9A8E70",
    },
    restockButton: {
        backgroundColor: "#FBEDE6",
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 14,
    },
    restockButtonText: {
        fontSize: 13,
        fontWeight: "700",
        color: "#A6624E",
    },

})