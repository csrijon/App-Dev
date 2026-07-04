import React, { useState, useMemo, useCallback } from "react";
import {
    View,
    StyleSheet,
    StatusBar,
    Text,
    TouchableOpacity,
    FlatList,
    Alert,
    RefreshControl,
    Platform,
    UIManager,
    LayoutAnimation,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Components
import Adminheader from "../components/Adminheader";
import Search from "../components/Search";
import Catalogcard from "../components/Catalogcard";
import Plusbutton from "../components/Plusbutton";

// Enable LayoutAnimation on Android
if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

// --- DUMMY DATA ---
const bardata = [
    { id: 1, title: "All" },
    { id: 2, title: "Birthday" },
    { id: 3, title: "Wedding" },
    { id: 4, title: "Pastries" },
];

const initialCatalogData = [
    {
        id: 1,
        title: "Provençal Bloom",
        price: "$78.00",
        tag: "LAVENDER HONEY",
        categoryId: 3, // Wedding
        active: true,
        image: require("../images/catalog.png"),
    },
    {
        id: 2,
        title: "Velvet Cocoa",
        price: "$64.00",
        tag: "DARK CHOCOLATE",
        categoryId: 2, // Birthday
        active: false,
        image: require("../images/catalog.png"),
    },
    {
        id: 3,
        title: "Berry Chantilly",
        price: "$82.00",
        tag: "FRESH BERRIES",
        categoryId: 4, // Pastries
        active: true,
        image: require("../images/catalog.png"),
    },
    {
        id: 4,
        title: "Golden Pistachio",
        price: "$95.00",
        tag: "PISTACHIO CREAM",
        categoryId: 3, // Wedding
        active: true,
        image: require("../images/catalog.png"),
    },
    {
        id: 5,
        title: "Caramel Bliss",
        price: "$70.00",
        tag: "SALTED CARAMEL",
        categoryId: 2, // Birthday
        active: false,
        image: require("../images/catalog.png"),
    },
];

const SORT_OPTIONS = [
    { id: "default", label: "Newest" },
    { id: "price_asc", label: "Price ↑" },
    { id: "price_desc", label: "Price ↓" },
    { id: "name_asc", label: "Name A–Z" },
];

const parsePrice = (price) => parseFloat(String(price).replace(/[^0-9.]/g, "")) || 0;

const Catalogpage = ({ navigation }) => {
    const [active, setActive] = useState(1); // category filter, 1 = "All"
    const [catalogData, setCatalogData] = useState(initialCatalogData);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("default");
    const [refreshing, setRefreshing] = useState(false);

    // Category counts (computed once per data/active change)
    const categoryCounts = useMemo(() => {
        const counts = { 1: catalogData.length };
        bardata.forEach((cat) => {
            if (cat.id !== 1) {
                counts[cat.id] = catalogData.filter((item) => item.categoryId === cat.id).length;
            }
        });
        return counts;
    }, [catalogData]);

    // Catalog stats
    const stats = useMemo(() => {
        const total = catalogData.length;
        const activeCount = catalogData.filter((item) => item.active).length;
        return { total, activeCount, inactiveCount: total - activeCount };
    }, [catalogData]);

    // Category filter
    const categoryFiltered =
        active === 1 ? catalogData : catalogData.filter((item) => item.categoryId === active);

    // Search filter (by title or tag)
    const searchFiltered =
        searchQuery.trim() === ""
            ? categoryFiltered
            : categoryFiltered.filter(
                  (item) =>
                      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      item.tag.toLowerCase().includes(searchQuery.toLowerCase())
              );

    // Sort
    const filteredData = useMemo(() => {
        const data = [...searchFiltered];
        switch (sortBy) {
            case "price_asc":
                return data.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
            case "price_desc":
                return data.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
            case "name_asc":
                return data.sort((a, b) => a.title.localeCompare(b.title));
            default:
                return data;
        }
    }, [searchFiltered, sortBy]);

    // Pull to refresh (simulated re-sync)
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => setRefreshing(false), 900);
    }, []);

    // Delete product (animated)
    const handleDelete = (id, title) => {
        Alert.alert("Delete Product", `"${title}" Do You Want to Delete?`, [
            { text: "No", style: "cancel" },
            {
                text: "Yes, Delete It",
                style: "destructive",
                onPress: () => {
                    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                    setCatalogData((prev) => prev.filter((item) => item.id !== id));
                },
            },
        ]);
    };

    // Toggle availability
    const handleToggleAvailability = (id) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setCatalogData((prev) =>
            prev.map((item) => (item.id === id ? { ...item, active: !item.active } : item))
        );
    };

    // Edit product
    const handleEdit = (item) => {
        navigation.navigate("Addnewpage", { product: item, isEdit: true });
    };

    const handleClearFilters = () => {
        setSearchQuery("");
        setActive(1);
    };

    const cycleSortLabel = SORT_OPTIONS.find((s) => s.id === sortBy)?.label ?? "Newest";

    // --- Header (stats, search, filters, sort) ---
    const renderHeader = () => (
        <View style={Catalogstyle.headerContainer}>
            <Text style={Catalogstyle.catalogtext}>Catalog Management</Text>
            <Text style={Catalogstyle.subtitle}>Manage your beautiful creations</Text>

            {/* Stats strip */}
            <View style={Catalogstyle.statsRow}>
                <View style={[Catalogstyle.statCard, Catalogstyle.statCardNeutral]}>
                    <Text style={Catalogstyle.statNumber}>{stats.total}</Text>
                    <Text style={Catalogstyle.statLabel}>Total</Text>
                </View>
                <View style={[Catalogstyle.statCard, Catalogstyle.statCardActive]}>
                    <Text style={[Catalogstyle.statNumber, { color: "#3f7a52" }]}>
                        {stats.activeCount}
                    </Text>
                    <Text style={[Catalogstyle.statLabel, { color: "#3f7a52" }]}>Active</Text>
                </View>
                <View style={[Catalogstyle.statCard, Catalogstyle.statCardInactive]}>
                    <Text style={[Catalogstyle.statNumber, { color: "#a15c4a" }]}>
                        {stats.inactiveCount}
                    </Text>
                    <Text style={[Catalogstyle.statLabel, { color: "#a15c4a" }]}>Out of stock</Text>
                </View>
            </View>

            <View style={Catalogstyle.searchWrapper}>
                <Search
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    placeholder="Search products..."
                />
            </View>

            <View style={Catalogstyle.barbuttonsection}>
                {bardata.map((item) => {
                    const isActive = active === item.id;
                    const count = categoryCounts[item.id] ?? 0;
                    return (
                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={() => setActive(item.id)}
                            style={[
                                Catalogstyle.barbutton,
                                isActive ? Catalogstyle.activeBarButton : Catalogstyle.inactiveBarButton,
                            ]}
                            key={item.id}
                        >
                            <Text
                                style={[
                                    Catalogstyle.barButtonText,
                                    { color: isActive ? "#ffffff" : "#75584e" },
                                ]}
                            >
                                {item.title}
                                <Text style={{ opacity: 0.7 }}> · {count}</Text>
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>

            <View style={Catalogstyle.countRow}>
                <Text style={Catalogstyle.countText}>
                    {filteredData.length} {filteredData.length === 1 ? "product" : "products"} found
                </Text>

                {/* Sort control */}
                <View style={Catalogstyle.sortRow}>
                    {SORT_OPTIONS.map((option) => {
                        const isActive = sortBy === option.id;
                        return (
                            <TouchableOpacity
                                key={option.id}
                                activeOpacity={0.7}
                                onPress={() => setSortBy(option.id)}
                                style={[
                                    Catalogstyle.sortChip,
                                    isActive && Catalogstyle.sortChipActive,
                                ]}
                            >
                                <Text
                                    style={[
                                        Catalogstyle.sortChipText,
                                        isActive && Catalogstyle.sortChipTextActive,
                                    ]}
                                >
                                    {option.label}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </View>
        </View>
    );

    // --- Empty state ---
    const renderEmpty = () => {
        const hasFilters = searchQuery.trim() !== "" || active !== 1;
        return (
            <View style={Catalogstyle.emptyContainer}>
                <View style={Catalogstyle.emptyIconCircle}>
                    <Text style={Catalogstyle.emptyIcon}>🍰</Text>
                </View>
                <Text style={Catalogstyle.emptyTitle}>
                    {hasFilters ? "No creations match this search" : "Your catalog is empty"}
                </Text>
                <Text style={Catalogstyle.emptyText}>
                    {hasFilters
                        ? "Try a different keyword or category."
                        : "Add your first product to start building your menu."}
                </Text>

                {hasFilters ? (
                    <TouchableOpacity
                        style={Catalogstyle.emptyButtonOutline}
                        activeOpacity={0.7}
                        onPress={handleClearFilters}
                    >
                        <Text style={Catalogstyle.emptyButtonOutlineText}>Clear filters</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        style={Catalogstyle.emptyButton}
                        activeOpacity={0.8}
                        onPress={() => navigation.navigate("Addnewpage")}
                    >
                        <Text style={Catalogstyle.emptyButtonText}>+ Add your first product</Text>
                    </TouchableOpacity>
                )}
            </View>
        );
    };

    return (
        <SafeAreaView style={Catalogstyle.Catalogpagecontainer}>
            <StatusBar backgroundColor="#fff9e6" barStyle="dark-content" />
            <Adminheader />

            <FlatList
                data={filteredData}
                ListHeaderComponent={renderHeader}
                renderItem={({ item }) => (
                    <Catalogcard
                        tag={item.tag}
                        price={item.price}
                        title={item.title}
                        image={item.image}
                        isActive={item.active}
                        onEdit={() => handleEdit(item)}
                        onDelete={() => handleDelete(item.id, item.title)}
                        onToggleAvailability={() => handleToggleAvailability(item.id)}
                    />
                )}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={Catalogstyle.listContent}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor="#75584e"
                        colors={["#75584e"]}
                    />
                }
                ListEmptyComponent={renderEmpty}
            />

            <Plusbutton onPress={() => navigation.navigate("Addnewpage")} />
        </SafeAreaView>
    );
};

export default Catalogpage;

const Catalogstyle = StyleSheet.create({
    Catalogpagecontainer: {
        backgroundColor: "#fff9e6",
        flex: 1,
        position: "relative",
    },
    listContent: {
        paddingHorizontal: 26,
        paddingTop: 10,
        paddingBottom: 100,
        flexGrow: 1,
    },
    headerContainer: {
        marginBottom: 20,
    },
    catalogtext: {
        color: "#75584e",
        fontWeight: "800",
        fontSize: 24,
        letterSpacing: 0.5,
    },
    subtitle: {
        color: "#a48a80",
        fontSize: 14,
        marginBottom: 18,
        marginTop: 4,
    },

    // Stats strip
    statsRow: {
        flexDirection: "row",
        gap: 10,
        marginBottom: 22,
    },
    statCard: {
        flex: 1,
        borderRadius: 16,
        paddingVertical: 14,
        alignItems: "center",
        justifyContent: "center",
    },
    statCardNeutral: {
        backgroundColor: "#f6ecd9",
    },
    statCardActive: {
        backgroundColor: "#e4f2e7",
    },
    statCardInactive: {
        backgroundColor: "#fbe8e2",
    },
    statNumber: {
        fontSize: 20,
        fontWeight: "800",
        color: "#75584e",
    },
    statLabel: {
        fontSize: 11,
        fontWeight: "600",
        color: "#9c8c7c",
        marginTop: 2,
        letterSpacing: 0.3,
    },

    searchWrapper: {
        marginBottom: 22,
    },
    barbuttonsection: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
    },
    barbutton: {
        paddingHorizontal: 18,
        paddingVertical: 10,
        borderRadius: 20,
    },
    activeBarButton: {
        backgroundColor: "#6c5a61",
        elevation: 3,
        shadowColor: "#6c5a61",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    inactiveBarButton: {
        backgroundColor: "#f4dce4",
    },
    barButtonText: {
        fontWeight: "600",
        fontSize: 13,
        letterSpacing: 0.2,
    },

    countRow: {
        marginTop: 18,
        marginBottom: 4,
    },
    countText: {
        color: "#9c8c7c",
        fontSize: 13,
        fontWeight: "600",
        marginBottom: 10,
    },

    // Sort chips
    sortRow: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
    },
    sortChip: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "#e7d9c9",
        backgroundColor: "transparent",
    },
    sortChipActive: {
        backgroundColor: "#75584e",
        borderColor: "#75584e",
    },
    sortChipText: {
        fontSize: 12,
        fontWeight: "600",
        color: "#9c8c7c",
    },
    sortChipTextActive: {
        color: "#ffffff",
    },

    // Empty state
    emptyContainer: {
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 60,
        paddingHorizontal: 30,
    },
    emptyIconCircle: {
        width: 72,
        height: 72,
        borderRadius: 36,
        backgroundColor: "#f6ecd9",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 16,
    },
    emptyIcon: {
        fontSize: 32,
    },
    emptyTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#75584e",
        marginBottom: 6,
        textAlign: "center",
    },
    emptyText: {
        fontSize: 13,
        color: "#a48a80",
        textAlign: "center",
        marginBottom: 20,
        lineHeight: 19,
    },
    emptyButton: {
        backgroundColor: "#75584e",
        paddingHorizontal: 22,
        paddingVertical: 12,
        borderRadius: 22,
        elevation: 2,
    },
    emptyButtonText: {
        color: "#ffffff",
        fontWeight: "700",
        fontSize: 13,
    },
    emptyButtonOutline: {
        borderWidth: 1.5,
        borderColor: "#75584e",
        paddingHorizontal: 22,
        paddingVertical: 11,
        borderRadius: 22,
    },
    emptyButtonOutlineText: {
        color: "#75584e",
        fontWeight: "700",
        fontSize: 13,
    },
});