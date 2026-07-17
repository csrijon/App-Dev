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

const categories = [
    { id: 1, title: "Burger" },
    { id: 2, title: "Pizza" },
    { id: 3, title: "Chicken" },
    { id: 4, title: "Drinks" },
    { id: 5, title: "Dessert" },
    { id: 6, title: "Biryani" },
    { id: 7, title: "Pasta" },
    { id: 8, title: "Ice Cream" },
];

const menuItems = [
    {
        id: 1,
        image: "https://legateaucakes.com/cdn/shop/files/28d729eb-0915-4e9a-87be-c015e085d598.png?v=1772039786",
        rating: "4.5",
        bakingTime: "48h",
        title: "Midnight Forest",
        description: "A mysterious and enchanting forest that comes alive under the cover of darkness.",
        price: "$500.00",
    },
    {
        id: 2,
        image: "https://imgcdn.floweraura.com/black-forest-cake-9817490ca-A.jpg",
        rating: "4.7",
        bakingTime: "24h",
        title: "Black Forest",
        description: "Rich chocolate sponge layered with fresh cream and cherries.",
        price: "$420.00",
    },
    {
        id: 3,
        image: "https://www.fnp.com/images/pr/l/v20221205202838/choco-truffle-cake-half-kg_1.jpg",
        rating: "4.8",
        bakingTime: "12h",
        title: "Choco Truffle",
        description: "Smooth chocolate truffle cake topped with rich ganache.",
        price: "$650.00",
    },
    {
        id: 4,
        image: "https://www.cakexpo.com/cdn/shop/products/redvelvetcake.jpg",
        rating: "4.6",
        bakingTime: "36h",
        title: "Red Velvet",
        description: "Classic red velvet cake with creamy cheese frosting.",
        price: "$550.00",
    },
    {
        id: 5,
        image: "https://www.fnp.com/images/pr/l/v20221205202854/fresh-fruit-cake-half-kg_1.jpg",
        rating: "4.4",
        bakingTime: "18h",
        title: "Fresh Fruit Cake",
        description: "Soft vanilla sponge loaded with seasonal fresh fruits.",
        price: "$480.00",
    },
    {
        id: 6,
        image: "https://www.fnp.com/images/pr/l/v20221205202843/blueberry-cake-half-kg_1.jpg",
        rating: "4.9",
        bakingTime: "20h",
        title: "Blueberry Bliss",
        description: "Creamy blueberry cake with juicy berry filling.",
        price: "$720.00",
    },
];

const SORT_OPTIONS = [
    { key: "default", label: "Default", icon: "apps-outline" },
    { key: "low",     label: "Price: Low to High", icon: "arrow-up-outline" },
    { key: "high",    label: "Price: High to Low", icon: "arrow-down-outline" },
    { key: "rating",  label: "Top Rated", icon: "star-outline" },
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
        navigation.navigate("Cart");
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
                <FlatList
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
                />

                {/* Result count */}
                {sortedItems.length > 0 && (
                    <Text style={styles.countText}>
                        {sortedItems.length} {sortedItems.length === 1 ? "cake" : "cakes"} found
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
                                        navigation.navigate("Cakedetails", {
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
                                    onAddToCart={() => handleAddToCart(item.id)}
                                    onGoToCart={handleGoToCart}
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

    /* ── Section heading ── */
    FilterSection: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 14,
    },
    FilterText: {
        fontSize: 18,
        fontWeight: "700",
        color: "#5C3D2E",
    },

    /* ── Search + Sort row ── */
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
        color: "#3D2B1F",
        paddingVertical: 0,
    },

    /* ── Sort trigger button ── */
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
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 10,
    },
    dropdownHeader: {
        fontSize: 11,
        fontWeight: "600",
        color: "#A0907A",
        letterSpacing: 0.8,
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
        color: "#5C3D2E",
    },
    dropdownItemTextActive: {
        fontWeight: "600",
        color: "#7B5E57",
    },

    /* ── Active sort badge ── */
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
    },

    /* ── Categories ── */
    CategoryCardsContainer: {
        marginTop: 4,
        marginBottom: 4,
        flexGrow: 0,
    },

    /* ── Count ── */
    countText: {
        fontSize: 13,
        color: "#9B7A65",
        fontWeight: "600",
        marginTop: 12,
        marginBottom: 8,
    },

    /* ── Menu cards ── */
    MenuCardsContainer: {
        marginTop: 4,
    },

    /* ── Empty state ── */
    emptyContainer: {
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 60,
        gap: 8,
    },
    emptyText: {
        color: "#9B7A65",
        fontSize: 16,
        fontWeight: "600",
    },
    emptySubText: {
        color: "#C4B8A4",
        fontSize: 13,
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