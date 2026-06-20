import React, { useState } from 'react';

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
    RefreshControl
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

// 🔹 helper to convert "$500.00" -> 500
const parsePrice = (price) => parseFloat(price.replace(/[^0-9.]/g, "")) || 0;

const CategoryListing = ({ navigation }) => {

    const [isOpen, setIsOpen] = useState(false);
    const [selectid, setselectid] = useState(null);
    const [searchText, setSearchText] = useState("");
    const [refreshing, setRefreshing] = useState(false);
    const [sortOrder, setSortOrder] = useState("default"); // "default" | "low" | "high"

    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 1500);
    };

    const filteredItems = menuItems.filter(item =>
        item.title.toLowerCase().includes(searchText.toLowerCase())
    );

    const sortedItems = [...filteredItems];

    if (sortOrder === "low") {
        sortedItems.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    }

    if (sortOrder === "high") {
        sortedItems.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    }

    // animation value
    const translateX = useSharedValue(-width);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX.value }],
        };
    });

    // const openRefine = () => {
    //     setIsOpen(true);
    //     translateX.value = withTiming(0, { duration: 400 });
    // };

    const closeRefine = () => {
        translateX.value = withTiming(-width, { duration: 400 });
        setTimeout(() => {
            setIsOpen(false);
        }, 400);
    };

    return (
        <SafeAreaView style={styles.Categorycontainer} >

            <StatusBar
                backgroundColor="#f8f1df"
                barStyle={'dark-content'}
            />

            <Header
                name="Wedding Cakes"
                title="Category Listing"
            />

            <ScrollView
                vertical
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 40 }}
                style={styles.CategoryListing}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >

                {/* filter section start */}
                <View style={styles.FilterSection} >

                    <Text style={styles.FilterText} >
                        Curated Collections
                    </Text>

                    {/* <TouchableOpacity
                        // onPress={openRefine}
                        style={styles.FilterButtons}
                    >
                        <Ionicons name="filter" color="#000" size={20} />
                        <Text>Refine</Text>
                    </TouchableOpacity> */}

                </View>
                {/* filter section end */}

                {/* search section start */}
                <View style={styles.searchContainer}>

                    <Ionicons name="search" size={18} color="#777" />

                    <TextInput
                        placeholder="Search Cakes..."
                        placeholderTextColor="#999"
                        value={searchText}
                        onChangeText={setSearchText}
                        style={styles.searchInput}
                    />

                    {searchText.length > 0 && (
                        <TouchableOpacity
                            onPress={() => setSearchText("")}
                            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                        >
                            <Ionicons name="close-circle" size={18} color="#bbb" />
                        </TouchableOpacity>
                    )}

                </View>
                {/* search section end */}

                {/* quick sort chips start */}
                <View style={styles.sortRow}>
                    <TouchableOpacity
                        onPress={() => setSortOrder("default")}
                        style={[styles.sortChip, sortOrder === "default" && styles.sortChipActive]}
                    >
                        <Text style={[styles.sortChipText, sortOrder === "default" && styles.sortChipTextActive]}>
                            Default
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => setSortOrder("low")}
                        style={[styles.sortChip, sortOrder === "low" && styles.sortChipActive]}
                    >
                        <Ionicons
                            name="arrow-up"
                            size={12}
                            color={sortOrder === "low" ? "#fff" : "#75584e"}
                            style={{ marginRight: 4 }}
                        />
                        <Text style={[styles.sortChipText, sortOrder === "low" && styles.sortChipTextActive]}>
                            Price: Low to High
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => setSortOrder("high")}
                        style={[styles.sortChip, sortOrder === "high" && styles.sortChipActive]}
                    >
                        <Ionicons
                            name="arrow-down"
                            size={12}
                            color={sortOrder === "high" ? "#fff" : "#75584e"}
                            style={{ marginRight: 4 }}
                        />
                        <Text style={[styles.sortChipText, sortOrder === "high" && styles.sortChipTextActive]}>
                            Price: High to Low
                        </Text>
                    </TouchableOpacity>
                </View>
                {/* quick sort chips end */}

                {/* categories — single FlatList, no nested ScrollView */}
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
                            onPress={() => {
                                setselectid(item.id);
                            }}
                        />
                    )}
                />

                {/* result count */}
                {sortedItems.length > 0 && (
                    <Text style={styles.countText}>
                        {sortedItems.length} {sortedItems.length === 1 ? "cake" : "cakes"} found
                    </Text>
                )}

                <View style={styles.MenuCardsContainer}>

                    {
                        sortedItems.length === 0 ?

                            <View style={styles.emptyContainer}>
                                <Ionicons name="search-outline" size={60} color="#999" />
                                <Text style={styles.emptyText}>No Cakes Found</Text>
                            </View>

                            :

                            <FlatList
                                contentContainerStyle={{ gap: 20, paddingBottom: 40 }}
                                data={sortedItems}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={({ item }) => (
                                    <MenuCard
                                        onPress={() =>
                                            navigation.navigate("Delivery", {
                                                title: item.title,
                                                description: item.description,
                                                image: item.image
                                            })
                                        }
                                        rating={item.rating}
                                        image={item.image}
                                        bakingTime={item.bakingTime}
                                        title={item.title}
                                        description={item.description}
                                        price={item.price}
                                    />
                                )}
                            />

                    }

                </View>

            </ScrollView>

            {/* overlay */}
            {
                isOpen && (
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={closeRefine}
                        style={styles.overlay}
                    />
                )
            }

            {/* animated refine panel */}
            {
                isOpen && (
                    <Animated.View
                        style={[
                            styles.refinePanel,
                            animatedStyle,
                        ]}
                    >
                        <RefineScreen
                            sortOrder={sortOrder}
                            setSortOrder={setSortOrder}
                            onClose={closeRefine}
                        />
                    </Animated.View>
                )
            }

        </SafeAreaView>
    );
};

export default CategoryListing;

const styles = StyleSheet.create({
    Categorycontainer: {
        flex: 1,
        backgroundColor: "#fcf5e3",
    },

    CategoryListing: {
        flex: 1,
        paddingHorizontal: 24,
        paddingBottom: 20,
        paddingTop: 20,
    },

    FilterSection: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    FilterText: {
        fontSize: 17,
        fontWeight: "bold",
        color: "#363317",
    },

    // FilterButtons: {
    //     flexDirection: "row",
    //     alignItems: "center",
    //     gap: 5,
    // },

    CategoryCardsContainer: {
        marginTop: 16,
        flexGrow: 0,
    },

    MenuCardsContainer: {
        marginTop: 10,
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
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

    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 20,
        paddingHorizontal: 15,
        marginVertical: 15,
        height: 50,
        gap: 8,
    },

    searchInput: {
        flex: 1,
        marginLeft: 2,
        color: "#333",
    },

    sortRow: {
        flexDirection: "row",
        gap: 8,
        marginBottom: 8,
        flexWrap: "wrap",
    },

    sortChip: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#e9e2d8",
    },

    sortChipActive: {
        backgroundColor: "#75584e",
        borderColor: "#75584e",
    },

    sortChipText: {
        fontSize: 12,
        color: "#75584e",
        fontWeight: "600",
    },

    sortChipTextActive: {
        color: "#fff",
    },

    countText: {
        fontSize: 14,
        color: "#75584e",
        fontWeight: "600",
        marginBottom: 10,
        marginTop: 4,
    },

    emptyContainer: {
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 50
    },

    emptyText: {
        marginTop: 10,
        color: "#999",
        fontSize: 16
    },
});