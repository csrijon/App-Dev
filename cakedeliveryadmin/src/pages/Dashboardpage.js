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

// Today's Schedule
const todaysScheduleData = [
    {
        id: 1,
        time: "9:00 AM",
        title: "Wedding Cake Delivery",
        subtitle: "Rossi Family • Downtown",
        bg: "#DCE3F0",
        icon: <MaterialCommunityIcons name="truck-delivery-outline" size={18} color="#3C5DA8" />,
    },
    {
        id: 2,
        time: "11:30 AM",
        title: "Client Consultation",
        subtitle: "Custom birthday design",
        bg: "#f4dce4",
        icon: <Ionicons name="people-outline" size={18} color="#7A3B4E" />,
    },
    {
        id: 3,
        time: "2:00 PM",
        title: "Batch Baking",
        subtitle: "18 birthday orders queued",
        bg: "#ECE4C8",
        icon: <MaterialCommunityIcons name="chef-hat" size={18} color="#5D4B2E" />,
    },
    {
        id: 4,
        time: "5:00 PM",
        title: "Ingredient Restock",
        subtitle: "Valrhona chocolate arriving",
        bg: "#CFE3D2",
        icon: <MaterialIcons name="inventory" size={18} color="#3F7A53" />,
    },
];

// Best Selling Cakes — this week
const bestSellingCakes = [
    {
        id: 1,
        rank: 1,
        name: "Provençal Bloom",
        tag: "Wedding • Lavender Honey",
        unitsSold: 38,
        revenue: "$2,964",
        badgeBg: "#F6E3B4",
        badgeText: "#8C6A2E",
    },
    {
        id: 2,
        rank: 2,
        name: "Velvet Cocoa",
        tag: "Birthday • Dark Chocolate",
        unitsSold: 31,
        revenue: "$1,984",
        badgeBg: "#E7E0D0",
        badgeText: "#6B5C42",
    },
    {
        id: 3,
        rank: 3,
        name: "Golden Pistachio",
        tag: "Wedding • Pistachio Cream",
        unitsSold: 24,
        revenue: "$2,280",
        badgeBg: "#F2D8C4",
        badgeText: "#8C5A3C",
    },
];

// Customer Reviews
const customerReviews = [
    {
        id: 1,
        name: "Amara Whitfield",
        rating: 5,
        comment: "The lavender honey cake was the highlight of our wedding. Absolutely stunning.",
        date: "2 days ago",
    },
    {
        id: 2,
        name: "Devon Clarke",
        rating: 4,
        comment: "Velvet Cocoa was rich and beautifully finished. Delivery was a touch late.",
        date: "4 days ago",
    },
    {
        id: 3,
        name: "Priya Malhotra",
        rating: 5,
        comment: "Ordered the pistachio cake for an anniversary — guests are still talking about it.",
        date: "1 week ago",
    },
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
    const averageRating = (
        customerReviews.reduce((sum, r) => sum + r.rating, 0) / customerReviews.length
    ).toFixed(1);

    const getInitials = (name) =>
        name
            .split(" ")
            .map((part) => part[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();

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

                {/* Today's Schedule */}
                <View style={Dashboardstyle.scheduleCard}>
                    <View style={Dashboardstyle.salesOverviewHeaderRow}>
                        <View>
                            <Text style={Dashboardstyle.sectionHeading}>Today's Schedule</Text>
                            <Text style={Dashboardstyle.salesOverviewSubtitle}>{todaysScheduleData.length} events lined up</Text>
                        </View>
                        <View style={Dashboardstyle.scheduleCalendarPill}>
                            <Ionicons name="calendar-outline" size={14} color="#3C5DA8" />
                        </View>
                    </View>

                    {todaysScheduleData.map((item, index) => (
                        <View
                            key={item.id}
                            style={[
                                Dashboardstyle.scheduleRow,
                                index === todaysScheduleData.length - 1 && Dashboardstyle.scheduleRowLast,
                            ]}
                        >
                            <View style={[Dashboardstyle.scheduleIconCircle, { backgroundColor: item.bg }]}>
                                {item.icon}
                            </View>
                            <View style={Dashboardstyle.scheduleTextWrapper}>
                                <Text style={Dashboardstyle.scheduleItemTitle}>{item.title}</Text>
                                <Text style={Dashboardstyle.scheduleItemSubtitle}>{item.subtitle}</Text>
                            </View>
                            <Text style={Dashboardstyle.scheduleTimeText}>{item.time}</Text>
                        </View>
                    ))}
                </View>

                {/* Best Selling Cakes */}
                <View style={Dashboardstyle.bestSellingCard}>
                    <View style={Dashboardstyle.salesOverviewHeaderRow}>
                        <View>
                            <Text style={Dashboardstyle.sectionHeading}>Best Selling Cakes</Text>
                            <Text style={Dashboardstyle.salesOverviewSubtitle}>Ranked by units sold this week</Text>
                        </View>
                        <View style={Dashboardstyle.salesOverviewTotalPill}>
                            <MaterialCommunityIcons name="crown-outline" size={14} color="#3F7A53" />
                            <Text style={Dashboardstyle.salesOverviewTotalPillText}>Top 3</Text>
                        </View>
                    </View>

                    {bestSellingCakes.map((item, index) => (
                        <View
                            key={item.id}
                            style={[
                                Dashboardstyle.bestSellingRow,
                                index === bestSellingCakes.length - 1 && Dashboardstyle.bestSellingRowLast,
                            ]}
                        >
                            <View style={[Dashboardstyle.rankBadge, { backgroundColor: item.badgeBg }]}>
                                <Text style={[Dashboardstyle.rankBadgeText, { color: item.badgeText }]}>
                                    {item.rank}
                                </Text>
                            </View>
                            <View style={Dashboardstyle.bestSellingTextWrapper}>
                                <Text style={Dashboardstyle.bestSellingName}>{item.name}</Text>
                                <Text style={Dashboardstyle.bestSellingTag}>{item.tag}</Text>
                            </View>
                            <View style={Dashboardstyle.bestSellingStatsWrapper}>
                                <Text style={Dashboardstyle.bestSellingRevenue}>{item.revenue}</Text>
                                <Text style={Dashboardstyle.bestSellingUnits}>{item.unitsSold} sold</Text>
                            </View>
                        </View>
                    ))}
                </View>

                {/* Customer Reviews */}
                <View style={Dashboardstyle.reviewsCard}>
                    <View style={Dashboardstyle.salesOverviewHeaderRow}>
                        <View>
                            <Text style={Dashboardstyle.sectionHeading}>Customer Reviews</Text>
                            <Text style={Dashboardstyle.salesOverviewSubtitle}>What clients are saying</Text>
                        </View>
                        <View style={Dashboardstyle.reviewsRatingPill}>
                            <Ionicons name="star" size={13} color="#B98A2E" />
                            <Text style={Dashboardstyle.reviewsRatingPillText}>{averageRating}</Text>
                        </View>
                    </View>

                    {customerReviews.map((item, index) => (
                        <View
                            key={item.id}
                            style={[
                                Dashboardstyle.reviewRow,
                                index === customerReviews.length - 1 && Dashboardstyle.reviewRowLast,
                            ]}
                        >
                            <View style={Dashboardstyle.reviewAvatarCircle}>
                                <Text style={Dashboardstyle.reviewAvatarText}>{getInitials(item.name)}</Text>
                            </View>
                            <View style={Dashboardstyle.reviewTextWrapper}>
                                <View style={Dashboardstyle.reviewTopRow}>
                                    <Text style={Dashboardstyle.reviewName}>{item.name}</Text>
                                    <Text style={Dashboardstyle.reviewDate}>{item.date}</Text>
                                </View>
                                <View style={Dashboardstyle.reviewStarsRow}>
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Ionicons
                                            key={star}
                                            name={star <= item.rating ? "star" : "star-outline"}
                                            size={13}
                                            color="#D6A93B"
                                            style={{ marginRight: 2 }}
                                        />
                                    ))}
                                </View>
                                <Text style={Dashboardstyle.reviewComment}>{item.comment}</Text>
                            </View>
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

    /* ---------- Today's Schedule ---------- */
    scheduleCard: {
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
    scheduleCalendarPill: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: "#DCE3F0",
        alignItems: "center",
        justifyContent: "center",
    },
    scheduleRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        borderTopWidth: 1,
        borderTopColor: "#F3EDDB",
    },
    scheduleRowLast: {
        paddingBottom: 0,
    },
    scheduleIconCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 14,
    },
    scheduleTextWrapper: {
        flex: 1,
    },
    scheduleItemTitle: {
        fontSize: 14,
        fontWeight: "700",
        color: "#3D2E22",
        marginBottom: 2,
    },
    scheduleItemSubtitle: {
        fontSize: 12,
        color: "#9A8E70",
    },
    scheduleTimeText: {
        fontSize: 12,
        fontWeight: "700",
        color: "#6B5C42",
        marginLeft: 10,
    },

    /* ---------- Best Selling Cakes ---------- */
    bestSellingCard: {
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
    bestSellingRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        borderTopWidth: 1,
        borderTopColor: "#F3EDDB",
    },
    bestSellingRowLast: {
        paddingBottom: 0,
    },
    rankBadge: {
        width: 34,
        height: 34,
        borderRadius: 17,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 14,
    },
    rankBadgeText: {
        fontSize: 14,
        fontWeight: "800",
    },
    bestSellingTextWrapper: {
        flex: 1,
    },
    bestSellingName: {
        fontSize: 14,
        fontWeight: "700",
        color: "#3D2E22",
        marginBottom: 2,
    },
    bestSellingTag: {
        fontSize: 12,
        color: "#9A8E70",
    },
    bestSellingStatsWrapper: {
        alignItems: "flex-end",
        marginLeft: 10,
    },
    bestSellingRevenue: {
        fontSize: 14,
        fontWeight: "800",
        color: "#3F7A53",
        marginBottom: 2,
    },
    bestSellingUnits: {
        fontSize: 12,
        color: "#9A8E70",
    },

    /* ---------- Customer Reviews ---------- */
    reviewsCard: {
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
    reviewsRatingPill: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F6E9C8",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 16,
    },
    reviewsRatingPillText: {
        fontSize: 12,
        fontWeight: "800",
        color: "#8C6A2E",
        marginLeft: 4,
    },
    reviewRow: {
        flexDirection: "row",
        paddingVertical: 14,
        borderTopWidth: 1,
        borderTopColor: "#F3EDDB",
    },
    reviewRowLast: {
        paddingBottom: 0,
    },
    reviewAvatarCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#ECE4C8",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 14,
    },
    reviewAvatarText: {
        fontSize: 13,
        fontWeight: "800",
        color: "#5D4B2E",
    },
    reviewTextWrapper: {
        flex: 1,
    },
    reviewTopRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 4,
    },
    reviewName: {
        fontSize: 14,
        fontWeight: "700",
        color: "#3D2E22",
    },
    reviewDate: {
        fontSize: 11,
        color: "#B0A488",
    },
    reviewStarsRow: {
        flexDirection: "row",
        marginBottom: 6,
    },
    reviewComment: {
        fontSize: 13,
        lineHeight: 19,
        color: "#6B5A50",
    },

})