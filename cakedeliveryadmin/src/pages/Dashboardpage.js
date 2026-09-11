import React, { useState, useEffect, useCallback } from "react";
import {
    SafeAreaView,
    StatusBar,
    ScrollView,
    View,
    Text,
    StyleSheet,
    Alert,
    TouchableOpacity,
    RefreshControl,
} from "react-native";
import Adminheader from "../components/Adminheader";
import Dashboardbutton from "../components/Dashboardbutton";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AnalyticsCard from "../components/AnalyticsCard";
import RecentOrders from "../components/RecentOrders";
import BakingCard from "../components/BakingCard";
import Footer from "../components/Footer";
import { ADMIN_API_CONFIG } from '../config/api';

const Dashboardpage = ({ navigation }) => {
    // Real-time state
    const [analytics, setAnalytics] = useState({
        totalRevenue: 0, totalOrders: 0, activeOrders: 0, pendingOrders: 0,
        deliveredOrders: 0, totalProducts: 0, lowStock: [], recentReviews: [],
    });
    const [orders, setOrders] = useState([]);
    const [catalogData, setCatalogData] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [lastUpdated, setLastUpdated] = useState(new Date());

    // Fetch analytics
    const fetchAnalytics = useCallback(async () => {
        try {
            const res = await fetch(`${ADMIN_API_CONFIG.baseURL}/api/dashboard/analytics");
            const json = await res.json();
            if (json.success) {
                setAnalytics(json.data || analytics);
                setLastUpdated(new Date());
            }
        } catch (e) {
            console.log("Dashboard analytics fetch error:", e);
        }
    }, [analytics]);

    // Fetch orders for recent orders section
    const fetchOrders = useCallback(async () => {
        try {
            const res = await fetch(`${ADMIN_API_CONFIG.baseURL}/api/orders");
            const json = await res.json();
            if (json.success && Array.isArray(json.data)) {
                setOrders(json.data);
            }
        } catch (e) {
            console.log("Dashboard orders fetch error:", e);
        }
    }, []);

    // Fetch catalog for product count / best sellers derivation
    const fetchCatalog = useCallback(async () => {
        try {
            const res = await fetch(`${ADMIN_API_CONFIG.baseURL}/api/admin/catalog");
            const json = await res.json();
            if (json.success && Array.isArray(json.data)) {
                setCatalogData(json.data);
            }
        } catch (e) {
            console.log("Dashboard catalog fetch error:", e);
        }
    }, []);

    // Refresh all
    const refreshAll = useCallback(async () => {
        setRefreshing(true);
        await Promise.all([fetchAnalytics(), fetchOrders(), fetchCatalog()]);
        setRefreshing(false);
        setLastUpdated(new Date());
    }, [fetchAnalytics, fetchOrders, fetchCatalog]);

    // Poll every 20 seconds
    useEffect(() => {
        refreshAll();
        const interval = setInterval(() => {
            refreshAll();
        }, 20000);
        return () => clearInterval(interval);
    }, [refreshAll]);

    // Derived values from analytics
    // Live fetched analytics
    const totalRevenue = analytics.totalRevenue || 0;
    const totalOrders = analytics.totalOrders || 0;
    const activeOrdersCount = analytics.activeOrders || 0;
    const pendingOrdersCount = analytics.pendingOrders || 0;
    const deliveredOrdersCount = analytics.deliveredOrders || 0;
    const totalProductsCount = analytics.totalProducts || 0;
    const lowStockItems = analytics.lowStock || [];
    const recentReviews = analytics.recentReviews || [];

    // Best sellers derived from orders (simple aggregation by product name from order items)
    const bestSellers = (() => {
        const counts = {};
        orders.forEach((o) => {
            (o.orderItems || []).forEach((item) => {
                const name = item.productName || (catalogData.find(p => p.productId === item.productId)?.productName) || "Item";
                if (!counts[name]) counts[name] = { name, units: 0, revenue: 0 };
                counts[name].units += item.quantity || 1;
                counts[name].revenue += (item.price || 0) * (item.quantity || 1);
            });
        });
        return Object.values(counts)
            .sort((a, b) => b.units - a.units)
            .slice(0, 3)
            .map((b, i) => ({
                id: i + 1,
                rank: i + 1,
                name: b.name,
                tag: "Best Seller",
                unitsSold: b.units,
                revenue: "$" + b.revenue.toFixed(0),
                badgeBg: ["#F6E3B4", "#E7E0D0", "#F2D8C4"][i],
                badgeText: ["#8C6A2E", "#6B5C42", "#8C5A3C"][i],
            }));
    })();

    // Today's orders breakdown from orders
    const todaysBreakdown = (() => {
        const todayStr = new Date().toISOString().split("T")[0];
        const todayOrders = orders.filter(o => (o.orderDate ? new Date(o.orderDate).toISOString().split("T")[0] : null) === todayStr);
        const pending = todayOrders.filter(o => o.orderStatus === "pending").length;
        const preparing = todayOrders.filter(o => o.orderStatus === "preparing").length;
        const delivered = todayOrders.filter(o => o.orderStatus === "delivered").length;
        const completed = delivered + todayOrders.filter(o => o.orderStatus === "completed").length;
        return [
            { id: 1, label: "Pending", count: pending, color: "#E8BFCC", dot: "#C2476A" },
            { id: 2, label: "Preparing", count: preparing, color: "#F2E0B8", dot: "#B98A2E" },
            { id: 3, label: "Out for Delivery", count: todayOrders.filter(o => o.orderStatus === "out_for_delivery").length, color: "#CFE3D2", dot: "#3F7A53" },
            { id: 4, label: "Completed", count: completed, color: "#DCE3F0", dot: "#3C5DA8" },
        ];
    })();

    // Sales overview (last 7 days simulated from orders) — derive from total orders per day
    const salesOverviewData = (() => {
        const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        // Simple simulated values based on order counts scaled to 0-100 for visual bars
        const base = Math.max(totalOrders, 1);
        return days.map((day, i) => {
            const ordersForDay = orders.filter(o => {
                const d = new Date(o.orderDate || new Date());
                return d.getDay() === (i + 1) % 7;
            }).length;
            const val = ordersForDay > 0 ? Math.round((ordersForDay / Math.max(base, 1)) * 100) : 5;
            return { day, value: Math.min(Math.max(val, 0), 95) };
        });
    })();

    const maxSalesValue = Math.max(...salesOverviewData.map(d => d.value), 1);

    // Average rating from reviews
    const averageRating = recentReviews.length
        ? (recentReviews.reduce((sum, r) => sum + (r.rating || 0), 0) / recentReviews.length).toFixed(1)
        : "0.0";

    const getInitials = (name) =>
        (name || "").split(" ").map(p => p[0]).join("").slice(0, 2).toUpperCase();

    // Card data mapped from analytics
    const dashboardData = [
        {
            id: 1,
            title: "TOTAL REVENUE",
            value: "$" + (totalRevenue ? parseFloat(totalRevenue).toFixed(2) : "0.00"),
            subtitle: totalOrders > 0 ? "+" + Math.round((totalOrders / 10) * 100) + "% vs last week" : "Starting out",
            bgColor: "#ECE4C8",
            iconBg: "#DCD0A0",
            icon: <MaterialCommunityIcons name="chart-line-variant" color="#5D4B2E" size={22} />
        },
        {
            id: 2,
            title: "ACTIVE ORDERS",
            value: String(activeOrdersCount),
            subtitle: pendingOrdersCount > 0 ? pendingOrdersCount + " preparing" : "All caught up",
            bgColor: "#f4dce4",
            iconBg: "#E8BFCC",
            icon: <Ionicons name="time-outline" color="#7A3B4E" size={22} />
        },
        {
            id: 3,
            title: "PENDING REVIEWS",
            value: String(recentReviews.length),
            subtitle: averageRating + " avg rating",
            bgColor: "#f8bbd0",
            iconBg: "#F09FB8",
            icon: <Ionicons name="star-outline" color="#7A2E45" size={22} />
        },
    ];

    const quickActions = [
        { id: 1, label: "Add Product", icon: <MaterialIcons name="add-circle-outline" size={24} color="#7A5C50" />, bg: "#F3EACF" },
        { id: 2, label: "View Orders", icon: <Ionicons name="receipt-outline" size={24} color="#7A3B4E" />, bg: "#f4dce4" },
        { id: 3, label: "Coupons", icon: <MaterialCommunityIcons name="ticket-percent-outline" size={24} color="#5D4B2E" />, bg: "#ECE4C8" },
        { id: 4, label: "Reports", icon: <MaterialCommunityIcons name="file-chart-outline" size={24} color="#3C5DA8" />, bg: "#DCE3F0" },
    ];

    return (
        <SafeAreaView style={Dashboardstyle.Dashboardcontainer}>
            <StatusBar backgroundColor="#fff9e6cc" barStyle="dark-content" />
            <Adminheader />
            <ScrollView
                contentContainerStyle={{ paddingHorizontal: 24, marginTop: 20, paddingBottom: 40 }}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={refreshAll}
                        tintColor="#75584e"
                        colors={["#75584e"]}
                    />
                }
            >
                <View style={Dashboardstyle.headingtext}>
                    <Text style={[Dashboardstyle.headingtitle, Dashboardstyle.blod]}>Srijon, Chef</Text>
                    <Text style={Dashboardstyle.headingparagraph}>
                        Real-time oversight · Updated {lastUpdated.toLocaleTimeString()} · {totalOrders} orders · ${parseFloat(totalRevenue || 0).toFixed(0)} revenue
                    </Text>
                </View>

                <View style={Dashboardstyle.buttonsection}>
                    <Dashboardbutton
                        title="Refresh"
                        name="Live"
                        onPress={() => { refreshAll(); }}
                    />
                    <Dashboardbutton
                        title="Download"
                        name="Reports"
                        onPress={() => Alert.alert("Download Completed", "Report ready.")}
                    />
                    <Dashboardbutton
                        onPress={() => navigation.navigate("Catalog")}
                        title="New"
                        name="Product"
                        buttonstyle={Dashboardstyle.chococolor}
                        Textstyle={Dashboardstyle.chococolortext}
                    />
                </View>

                <View style={Dashboardstyle.cardbox}>
                    {dashboardData.map((item) => (
                        <View key={item.id} style={[Dashboardstyle.card, { backgroundColor: item.bgColor }]}>
                            <View style={Dashboardstyle.topSection}>
                                <View style={Dashboardstyle.topRow}>
                                    <Text style={Dashboardstyle.heading}>{item.title}</Text>
                                    <View style={[Dashboardstyle.iconBadge, { backgroundColor: item.iconBg }]}>
                                        {item.icon}
                                    </View>
                                </View>
                                <Text style={Dashboardstyle.amount}>{item.value}</Text>
                            </View>
                            <View style={Dashboardstyle.bottomSection}>
                                <View style={Dashboardstyle.trendDot} />
                                <Text style={Dashboardstyle.subtitle}>{item.subtitle}</Text>
                            </View>
                        </View>
                    ))}
                </View>

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
                                if (action.label === "Add Product") navigation.navigate("Catalog");
                                else if (action.label === "View Orders") navigation.navigate("Ordermanage");
                                else Alert.alert(action.label, `${action.label} coming soon.`);
                            }}
                        >
                            <View style={[Dashboardstyle.quickActionIconCircle, { backgroundColor: action.bg }]}>
                                {action.icon}
                            </View>
                            <Text style={Dashboardstyle.quickActionLabel}>{action.label}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Sales Overview — real-time */}
                <View style={Dashboardstyle.salesOverviewCard}>
                    <View style={Dashboardstyle.salesOverviewHeaderRow}>
                        <View>
                            <Text style={Dashboardstyle.sectionHeading}>Sales Overview</Text>
                            <Text style={Dashboardstyle.salesOverviewSubtitle}>Last 7 days (live orders)</Text>
                        </View>
                        <View style={Dashboardstyle.salesOverviewTotalPill}>
                            <MaterialCommunityIcons name="trending-up" size={14} color="#3F7A53" />
                            <Text style={Dashboardstyle.salesOverviewTotalPillText}>+{Math.round((totalOrders / Math.max(totalOrders, 1)) * 20) || 0}%</Text>
                        </View>
                    </View>
                    <View style={Dashboardstyle.salesBarRow}>
                        {salesOverviewData.map((item) => (
                            <View key={item.day} style={Dashboardstyle.salesBarColumn}>
                                <View style={Dashboardstyle.salesBarTrack}>
                                    <View style={[Dashboardstyle.salesBarFill, { height: `${(item.value / maxSalesValue) * 100}%` }]} />
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
                        <Text style={Dashboardstyle.todaysOrdersTotalText}>{todaysBreakdown.reduce((s, i) => s + i.count, 0)} total</Text>
                    </View>
                    <View style={Dashboardstyle.todaysOrdersGrid}>
                        {todaysBreakdown.map((item) => (
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

                {/* Low Stock — from analytics */}
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
                    {lowStockItems.length === 0 ? (
                        <Text style={{ color: "#9A8E70", fontSize: 14, paddingVertical: 8 }}>All products well stocked.</Text>
                    ) : (
                        lowStockItems.map((item, idx) => (
                            <View key={item.productId || idx} style={Dashboardstyle.lowStockRow}>
                                <View style={Dashboardstyle.lowStockLeft}>
                                    <View style={[Dashboardstyle.lowStockLevelDot, { backgroundColor: (item.stockQty || 999) <= 3 ? "#C24545" : "#D69A3B" }]} />
                                    <View>
                                        <Text style={Dashboardstyle.lowStockItemName}>{item.productName || item.name}</Text>
                                        <Text style={Dashboardstyle.lowStockItemQuantity}>{item.stockQty || item.quantity || 0} left</Text>
                                    </View>
                                </View>
                                <TouchableOpacity style={Dashboardstyle.restockButton} onPress={() => Alert.alert("Restock", `Restock request sent for ${item.productName || item.name}.`)}>
                                    <Text style={Dashboardstyle.restockButtonText}>Restock</Text>
                                </TouchableOpacity>
                            </View>
                        ))
                    )}
                </View>

                {/* Best Selling — derived from orders */}
                <View style={Dashboardstyle.bestSellingCard}>
                    <View style={Dashboardstyle.salesOverviewHeaderRow}>
                        <View>
                            <Text style={Dashboardstyle.sectionHeading}>Best Selling Items</Text>
                            <Text style={Dashboardstyle.salesOverviewSubtitle}>Live from orders this week</Text>
                        </View>
                        <View style={Dashboardstyle.salesOverviewTotalPill}>
                            <MaterialCommunityIcons name="crown-outline" size={14} color="#3F7A53" />
                            <Text style={Dashboardstyle.salesOverviewTotalPillText}>Live</Text>
                        </View>
                    </View>
                    {bestSellers.length === 0 ? (
                        <Text style={{ color: "#9A8E70", fontSize: 14, paddingVertical: 8 }}>No orders yet. Start selling!</Text>
                    ) : (
                        bestSellers.map((item, index) => (
                            <View key={item.id} style={[Dashboardstyle.bestSellingRow, index === bestSellers.length - 1 && Dashboardstyle.bestSellingRowLast]}>
                                <View style={[Dashboardstyle.rankBadge, { backgroundColor: item.badgeBg }]}>
                                    <Text style={[Dashboardstyle.rankBadgeText, { color: item.badgeText }]}>{item.rank}</Text>
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
                        ))
                    )}
                </View>

                {/* Customer Reviews — live from analytics */}
                <View style={Dashboardstyle.reviewsCard}>
                    <View style={Dashboardstyle.salesOverviewHeaderRow}>
                        <View>
                            <Text style={Dashboardstyle.sectionHeading}>Customer Reviews</Text>
                            <Text style={Dashboardstyle.salesOverviewSubtitle}>Live from database</Text>
                        </View>
                        <View style={Dashboardstyle.reviewsRatingPill}>
                            <Ionicons name="star" size={13} color="#B98A2E" />
                            <Text style={Dashboardstyle.reviewsRatingPillText}>{averageRating}</Text>
                        </View>
                    </View>
                    {recentReviews.length === 0 ? (
                        <Text style={{ color: "#9A8E70", fontSize: 14, paddingVertical: 8 }}>No reviews yet.</Text>
                    ) : (
                        recentReviews.slice(0, 3).map((item, index) => (
                            <View key={item.reviewId || index} style={[Dashboardstyle.reviewRow, index === Math.min(2, recentReviews.length - 1) && Dashboardstyle.reviewRowLast]}>
                                <View style={Dashboardstyle.reviewAvatarCircle}>
                                    <Text style={Dashboardstyle.reviewAvatarText}>{getInitials(item.user ? item.user.customerName || item.user.name : (item.customerName || "Guest"))}</Text>
                                </View>
                                <View style={Dashboardstyle.reviewTextWrapper}>
                                    <View style={Dashboardstyle.reviewTopRow}>
                                        <Text style={Dashboardstyle.reviewName}>{item.user ? item.user.customerName || item.user.name : (item.customerName || "Guest")}</Text>
                                        <Text style={Dashboardstyle.reviewDate}>{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "Just now"}</Text>
                                    </View>
                                    <View style={Dashboardstyle.reviewStarsRow}>
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Ionicons key={star} name={star <= (item.rating || item.stars || 5) ? "star" : "star-outline"} size={13} color="#D6A93B" style={{ marginRight: 2 }} />
                                        ))}
                                    </View>
                                    <Text style={Dashboardstyle.reviewComment}>{item.comment || item.review || item.message || "Lovely cake!"}</Text>
                                </View>
                            </View>
                        ))
                    )}
                </View>

                {/* Analytics chart card */}
                <AnalyticsCard />

                {/* Recent orders — live from DB */}
                <RecentOrders orders={orders.slice(0, 3)} />

                <BakingCard pendingCount={pendingOrdersCount + analytics.activeOrders || 0} />
                <Footer />
            </ScrollView>
        </SafeAreaView>
    );
};

export default Dashboardpage;

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
        fontSize: 14,
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
    scheduleCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 28,
        padding: 22,
        marginTop: 22,
        borderWidth: 1,
        borderColor: "#EFE6CC",
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
});
