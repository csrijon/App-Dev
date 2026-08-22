import React, { useState, useRef } from 'react';

import {
    View,
    Text,
    StatusBar,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    FlatList,
    Dimensions,
    TextInput,
    RefreshControl,
    Modal,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { SafeAreaView } from 'react-native-safe-area-context';

import Header from '../components/Header';
import CategoryCard from '../components/CategoryCard';
import MenuCard from '../components/MenuCard';
import RefineScreen from './RefineScreen';

import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
} from 'react-native-reanimated';

const { width } = Dimensions.get("window");

// const categories = [
//     { id: 1, title: "Burger" },
//     { id: 2, title: "Pizza" },
//     { id: 3, title: "Chicken" },
//     { id: 4, title: "Drinks" },
//     { id: 5, title: "Dessert" },
//     { id: 6, title: "Biryani" },
//     { id: 7, title: "Pasta" },
//     { id: 8, title: "Ice Cream" },
// ];

const menuItems = [
    {
        id: "1",
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600",
        rating: "4.9",
        title: "Cake",
        description: "Freshly baked layered cake with a soft and moist texture.",
    },
    {
        id: "2",
        image: "https://images.unsplash.com/photo-1464306076886-da185f6a9d05?w=600",
        rating: "4.8",
        title: "Pastry",
        description: "Light and flaky pastry filled with delicious cream.",
    },
    {
        id: "3",
        image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600",
        rating: "4.8",
        title: "Donut",
        description: "Soft and fluffy donut with a sweet glazed topping.",
    },
    {
        id: "4",
        image: "https://images.unsplash.com/photo-1623334044303-241021148842?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y3JvaXNzYW50fGVufDB8fDB8fHww",
        rating: "4.7",
        title: "Croissant",
        description: "Golden buttery croissant with crispy flaky layers.",
    },
    {
        id: "5",
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600",
        rating: "4.8",
        title: "Bread",
        description: "Fresh artisan bread baked daily with premium flour.",
    },
    {
        id: "6",
        image: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=600",
        rating: "4.7",
        title: "Muffin",
        description: "Soft and fluffy muffin perfect for breakfast or snacks.",
    },
    {
        id: "7",
        image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600",
        rating: "4.9",
        title: "Cookie",
        description: "Crunchy cookies baked with rich butter and chocolate chips.",
    },
    {
        id: "8",
        image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600",
        rating: "4.8",
        title: "Brownie",
        description: "Rich chocolate brownie with a soft fudgy center.",
    },
    {
        id: "9",
        image: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGFydHxlbnwwfHwwfHx8MA%3D%3D",
        rating: "4.7",
        title: "Tart",
        description: "Crispy tart shell filled with seasonal fruit and cream.",
    },
    {
        id: "10",
        image: "https://images.unsplash.com/photo-1612203985729-70726954388c?w=600",
        rating: "4.8",
        title: "Bagel",
        description: "Freshly baked bagel with a chewy texture and crisp crust.",
    },
    {
        id: "11",
        image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600",
        rating: "4.9",
        title: "Éclair",
        description: "Classic éclair filled with smooth vanilla cream.",
    },
    {
        id: "12",
        image: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=600",
        rating: "4.8",
        title: "Pretzel",
        description: "Traditional baked pretzel with a soft center and crisp crust.",
    },
];


const SORT_OPTIONS = [
    { key: "default", label: "Default", icon: "apps-outline" },
    { key: "low", label: "Price: Low to High", icon: "arrow-up-outline" },
    { key: "high", label: "Price: High to Low", icon: "arrow-down-outline" },
    { key: "rating", label: "Top Rated", icon: "star-outline" },
];

const parsePrice = (price) => parseFloat(price.replace(/[^0-9.]/g, "")) || 0;

const CategoryListing = ({ navigation }) => {

    const [isOpen, setIsOpen] = useState(false);
    const [selectid, setselectid] = useState(null);
    const [searchText, setSearchText] = useState("");
    const [refreshing, setRefreshing] = useState(false);
    const [sortOrder, setSortOrder] = useState("default");
    const [showSortDropdown, setShowSortDropdown] = useState(false);

    // ── Cart state: tracks WHICH menu-item ids have been added ──
    // This was the missing piece — without this, isAdded was never passed to MenuCard,
    // so it stayed undefined/false forever and the + button never changed.
    const [addedIds, setAddedIds] = useState(new Set());

    const handleAddToCart = (id) => {
        setAddedIds((prev) => {
            const next = new Set(prev); // copy — never mutate state directly
            next.add(id);
            return next;
        });
    };

    const handleGoToCart = () => {
        navigation.navigate("CategoryProducts");
    };

    const activeSortLabel = SORT_OPTIONS.find(o => o.key === sortOrder)?.label || "Sort";

    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => setRefreshing(false), 1500);
    };

    const filteredItems = menuItems.filter(item =>
        item.title.toLowerCase().includes(searchText.toLowerCase())
    );

    const sortedItems = [...filteredItems];

    if (sortOrder === "low") {
        sortedItems.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    } else if (sortOrder === "high") {
        sortedItems.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    } else if (sortOrder === "rating") {
        sortedItems.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
    }

    const translateX = useSharedValue(-width);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }],
    }));

    const closeRefine = () => {
        translateX.value = withTiming(-width, { duration: 400 });
        setTimeout(() => setIsOpen(false), 400);
    };

    return (
        <SafeAreaView style={styles.Categorycontainer}>

            <StatusBar backgroundColor="#FAF6EE" barStyle="dark-content" />

            <Header name="Wedding Cakes" title="Category Listing" />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 40 }}
                style={styles.CategoryListing}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >

                {/* ── Section heading ── */}
                <View style={styles.FilterSection}>
                    <Text style={styles.FilterText}>Curated Collections</Text>
                </View>

                {/* ── Search + Sort Row ── */}
                <View style={styles.searchSortRow}>

                    {/* Search bar */}
                    <View style={styles.searchContainer}>
                        <Ionicons name="search-outline" size={18} color="#9B7A65" />
                        <TextInput
                            placeholder="Search cakes..."
                            placeholderTextColor="#C4B8A4"
                            value={searchText}
                            onChangeText={setSearchText}
                            style={styles.searchInput}
                        />
                        {searchText.length > 0 && (
                            <TouchableOpacity
                                onPress={() => setSearchText("")}
                                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                            >
                                <Ionicons name="close-circle" size={18} color="#C4B8A4" />
                            </TouchableOpacity>
                        )}
                    </View>

                    {/* Sort dropdown trigger */}
                    <TouchableOpacity
                        style={[styles.sortTrigger, showSortDropdown && styles.sortTriggerActive]}
                        onPress={() => setShowSortDropdown(!showSortDropdown)}
                        activeOpacity={0.8}
                    >
                        <Ionicons
                            name="funnel-outline"
                            size={16}
                            color={showSortDropdown || sortOrder !== "default" ? "#fff" : "#7B5E57"}
                        />
                        <Ionicons
                            name={showSortDropdown ? "chevron-up-outline" : "chevron-down-outline"}
                            size={14}
                            color={showSortDropdown || sortOrder !== "default" ? "#fff" : "#7B5E57"}
                        />
                    </TouchableOpacity>

                </View>

                {/* ── Sort Dropdown Panel ── */}
                {showSortDropdown && (
                    <View style={styles.dropdownPanel}>
                        <Text style={styles.dropdownHeader}>Sort by</Text>
                        {SORT_OPTIONS.map((option, index) => (
                            <TouchableOpacity
                                key={option.key}
                                style={[
                                    styles.dropdownItem,
                                    index < SORT_OPTIONS.length - 1 && styles.dropdownItemBorder,
                                    sortOrder === option.key && styles.dropdownItemActive,
                                ]}
                                onPress={() => {
                                    setSortOrder(option.key);
                                    setShowSortDropdown(false);
                                }}
                                activeOpacity={0.7}
                            >
                                <View style={styles.dropdownItemLeft}>
                                    <View style={[
                                        styles.dropdownIconWrap,
                                        sortOrder === option.key && styles.dropdownIconWrapActive,
                                    ]}>
                                        <Ionicons
                                            name={option.icon}
                                            size={15}
                                            color={sortOrder === option.key ? "#7B5E57" : "#9B7A65"}
                                        />
                                    </View>
                                    <Text style={[
                                        styles.dropdownItemText,
                                        sortOrder === option.key && styles.dropdownItemTextActive,
                                    ]}>
                                        {option.label}
                                    </Text>
                                </View>
                                {sortOrder === option.key && (
                                    <Ionicons name="checkmark-outline" size={16} color="#7B5E57" />
                                )}
                            </TouchableOpacity>
                        ))}
                    </View>
                )}

                {/* Active sort badge */}
                {sortOrder !== "default" && (
                    <View style={styles.activeSortBadge}>
                        <Ionicons name="funnel" size={12} color="#7B5230" />
                        <Text style={styles.activeSortText}>{activeSortLabel}</Text>
                        <TouchableOpacity
                            onPress={() => setSortOrder("default")}
                            hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
                        >
                            <Ionicons name="close-circle" size={14} color="#9B6E55" />
                        </TouchableOpacity>
                    </View>
                )}

                {/* ── Category chips ── */}
                {/* <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.CategoryCardsContainer}
                    contentContainerStyle={{ flexDirection: "row", gap: 10 }}
                    data={categories}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <CategoryCard
                            setselectid={setselectid}
                            selectid={selectid}
                            id={item.id}
                            title={item.title}
                        />
                    )}
                /> */}

                {/* Result count */}
                {sortedItems.length > 0 && (
                    <Text style={styles.countText}>
                        {sortedItems.length} {sortedItems.length === 1 ? "Item" : "Items"} found
                    </Text>
                )}

                {/* ── Menu cards ── */}
                <View style={styles.MenuCardsContainer}>
                    {sortedItems.length === 0 ? (
                        <View style={styles.emptyContainer}>
                            <Ionicons name="search-outline" size={60} color="#C4B8A4" />
                            <Text style={styles.emptyText}>No cakes found</Text>
                            <Text style={styles.emptySubText}>Try a different search or category</Text>
                        </View>
                    ) : (
                        <FlatList
                            scrollEnabled={false}
                            contentContainerStyle={{ gap: 20, paddingBottom: 40 }}
                            data={sortedItems}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <MenuCard
                                    onPress={() =>
                                        navigation.navigate("CategoryProducts", {
                                            title: item.title,
                                            description: item.description,
                                            image: item.image,
                                        })
                                    }
                                    rating={item.rating}
                                    image={item.image}
                                    bakingTime={item.bakingTime}
                                    title={item.title}
                                    description={item.description}
                                    price={item.price}
                                    // ── The three props that actually make + → Go to Cart work ──
                                    isAdded={addedIds.has(item.id)}
                                    // onAddToCart={() => handleAddToCart(item.id)}
                                    // onGoToCart={handleGoToCart}
                                />
                            )}
                        />
                    )}
                </View>

            </ScrollView>

            {/* Tap outside dropdown to close */}
            {showSortDropdown && (
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => setShowSortDropdown(false)}
                    style={styles.dropdownOverlay}
                />
            )}

            {/* Refine panel overlay */}
            {isOpen && (
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={closeRefine}
                    style={styles.overlay}
                />
            )}

            {isOpen && (
                <Animated.View style={[styles.refinePanel, animatedStyle]}>
                    <RefineScreen
                        sortOrder={sortOrder}
                        setSortOrder={setSortOrder}
                        onClose={closeRefine}
                    />
                </Animated.View>
            )}

        </SafeAreaView>
    );
};

export default CategoryListing;
const styles = StyleSheet.create({
    Categorycontainer: {
        flex: 1,
        backgroundColor: "#FAF6EE",
    },

    CategoryListing: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
    },

    /* ── Section Heading ── */
    FilterSection: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 14,
    },

    FilterText: {
        fontSize: 19,
        fontWeight: "700",
        color: "#5C3D2E",
        lineHeight: 24,
    },

    /* ── Search + Sort Row ── */
    searchSortRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        marginBottom: 12,
    },

    searchContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 16,
        paddingHorizontal: 14,
        height: 48,
        gap: 8,
        borderWidth: 0.5,
        borderColor: "#E0D5BE",
    },

    searchInput: {
        flex: 1,
        fontSize: 14,
        fontWeight: "500",
        color: "#3D2B1F",
        paddingVertical: 0,
        lineHeight: 19,
    },

    /* ── Sort Trigger ── */
    sortTrigger: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        backgroundColor: "#fff",
        borderRadius: 16,
        paddingHorizontal: 12,
        height: 48,
        borderWidth: 0.5,
        borderColor: "#E0D5BE",
    },

    sortTriggerActive: {
        backgroundColor: "#7B5E57",
        borderColor: "#7B5E57",
    },

    /* ── Dropdown Panel ── */
    dropdownPanel: {
        backgroundColor: "#fff",
        borderRadius: 18,
        borderWidth: 0.5,
        borderColor: "#E0D5BE",
        marginBottom: 12,
        overflow: "hidden",
        zIndex: 100,
        elevation: 10,
        shadowColor: "#5C3D2E",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.08,
        shadowRadius: 10,
    },

    dropdownHeader: {
        fontSize: 11,
        fontWeight: "700",
        color: "#A0907A",
        letterSpacing: 0.7,
        lineHeight: 15,
        textTransform: "uppercase",
        paddingHorizontal: 16,
        paddingTop: 14,
        paddingBottom: 8,
    },

    dropdownItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingVertical: 13,
    },

    dropdownItemBorder: {
        borderBottomWidth: 0.5,
        borderBottomColor: "#F0E8D8",
    },

    dropdownItemActive: {
        backgroundColor: "#FDF7E8",
    },

    dropdownItemLeft: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },

    dropdownIconWrap: {
        width: 30,
        height: 30,
        borderRadius: 10,
        backgroundColor: "#F5EDD8",
        alignItems: "center",
        justifyContent: "center",
    },

    dropdownIconWrapActive: {
        backgroundColor: "#EDD9C4",
    },

    dropdownItemText: {
        fontSize: 14,
        fontWeight: "500",
        color: "#5C3D2E",
        lineHeight: 19,
    },

    dropdownItemTextActive: {
        fontSize: 14,
        fontWeight: "700",
        color: "#7B5E57",
        lineHeight: 19,
    },

    /* ── Active Sort Badge ── */
    activeSortBadge: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        backgroundColor: "#EDD9C4",
        alignSelf: "flex-start",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
        marginBottom: 10,
    },

    activeSortText: {
        fontSize: 12,
        fontWeight: "600",
        color: "#7B5230",
        lineHeight: 16,
    },

    /* ── Categories ── */
    CategoryCardsContainer: {
        marginTop: 4,
        marginBottom: 4,
        flexGrow: 0,
    },

    /* ── Product Count ── */
    countText: {
        fontSize: 13,
        fontWeight: "600",
        color: "#9B7A65",
        lineHeight: 18,
        marginTop: 12,
        marginBottom: 8,
    },

    /* ── Menu Cards ── */
    MenuCardsContainer: {
        marginTop: 4,
    },

    /* ── Empty State ── */
    emptyContainer: {
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 60,
        gap: 8,
    },

    emptyText: {
        color: "#9B7A65",
        fontSize: 16,
        fontWeight: "700",
        lineHeight: 21,
    },

    emptySubText: {
        color: "#C4B8A4",
        fontSize: 13,
        fontWeight: "400",
        lineHeight: 18,
        textAlign: "center",
    },

    /* ── Overlays ── */
    dropdownOverlay: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 50,
    },

    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.3)",
    },

    refinePanel: {
        position: "absolute",
        left: 0,
        top: 0,
        width: width * 0.82,
        height: "100%",
        backgroundColor: "#fff",
        elevation: 20,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 10,
    },
});