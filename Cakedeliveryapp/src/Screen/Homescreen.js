import { View, Text, StatusBar, StyleSheet, ScrollView, TextInput, TouchableOpacity, FlatList, RefreshControl, } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header"
import Search from "../components/Search";
import Cakecard from "../components/Cakecard";
import Ionicons from "react-native-vector-icons/Ionicons";
import FoodCard from "../components/FoodCard";
import { useWindowDimensions } from "react-native";
import { useState, useMemo } from "react";
const bakeryData = [
  {
    id: 1,
    image: "https://picsum.photos/seed/chocolate-cake/400/400",
    category: "Cake",
    trend: "Trending",
    name: "Chocolate Cake",
    price: "$20.00",
  },
  {
    id: 2,
    image: "https://picsum.photos/seed/glazed-donut/400/400",
    category: "Donut",
    trend: "Popular",
    name: "Glazed Donut",
    price: "$3.50",
  },
  {
    id: 3,
    image: "https://picsum.photos/seed/butter-croissant/400/400",
    category: "Croissant",
    trend: "Fresh",
    name: "Butter Croissant",
    price: "$4.50",
  },
  {
    id: 4,
    image: "https://picsum.photos/seed/chocolate-cookie/400/400",
    category: "Cookie",
    trend: "Trending",
    name: "Chocolate Chip Cookie",
    price: "$2.50",
  },
  {
    id: 5,
    image: "https://picsum.photos/seed/vanilla-cupcake/400/400",
    category: "Cupcake",
    trend: "New",
    name: "Vanilla Cupcake",
    price: "$4.00",
  },
  {
    id: 6,
    image: "https://picsum.photos/seed/garlic-bread/400/400",
    category: "Bread",
    trend: "Hot",
    name: "Garlic Bread",
    price: "$4.50",
  },
  {
    id: 7,
    image: "https://picsum.photos/seed/fudge-brownie/400/400",
    category: "Brownie",
    trend: "Best Seller",
    name: "Fudge Brownie",
    price: "$5.00",
  },
  {
    id: 8,
    image: "https://picsum.photos/seed/red-velvet/400/400",
    category: "Cake",
    trend: "Best Seller",
    name: "Red Velvet Cake",
    price: "$25.00",
  },
  {
    id: 9,
    image: "https://picsum.photos/seed/blueberry-muffin/400/400",
    category: "Muffin",
    trend: "Fresh",
    name: "Blueberry Muffin",
    price: "$4.00",
  },
  {
    id: 10,
    image: "https://picsum.photos/seed/cinnamon-roll/400/400",
    category: "Pastry",
    trend: "Hot",
    name: "Cinnamon Roll",
    price: "$5.50",
  },
  {
    id: 11,
    image: "https://picsum.photos/seed/newyork-cheesecake/400/400",
    category: "Cheesecake",
    trend: "Premium",
    name: "New York Cheesecake",
    price: "$28.00",
  },
  {
    id: 12,
    image: "https://picsum.photos/seed/chocolate-donut/400/400",
    category: "Donut",
    trend: "Trending",
    name: "Chocolate Donut",
    price: "$4.00",
  },
  {
    id: 13,
    image: "https://picsum.photos/seed/black-forest/400/400",
    category: "Cake",
    trend: "Popular",
    name: "Black Forest Cake",
    price: "$22.00",
  },
  {
    id: 14,
    image: "https://picsum.photos/seed/french-macarons/400/400",
    category: "Macaron",
    trend: "Luxury",
    name: "French Macarons",
    price: "$12.00",
  },
  {
    id: 15,
    image: "https://picsum.photos/seed/french-baguette/400/400",
    category: "Bread",
    trend: "Fresh",
    name: "French Baguette",
    price: "$3.50",
  },
  {
    id: 16,
    image: "https://picsum.photos/seed/chocolate-cupcake/400/400",
    category: "Cupcake",
    trend: "Popular",
    name: "Chocolate Cupcake",
    price: "$4.50",
  },
  {
    id: 17,
    image: "https://picsum.photos/seed/oatmeal-cookie/400/400",
    category: "Cookie",
    trend: "Healthy",
    name: "Oatmeal Raisin Cookie",
    price: "$3.00",
  },
  {
    id: 18,
    image: "https://picsum.photos/seed/butterscotch-cake/400/400",
    category: "Cake",
    trend: "Special",
    name: "Butterscotch Cake",
    price: "$24.00",
  },
  {
    id: 19,
    image: "https://picsum.photos/seed/caramel-blondie/400/400",
    category: "Brownie",
    trend: "Special",
    name: "Caramel Blondie",
    price: "$5.50",
  },
  {
    id: 20,
    image: "https://picsum.photos/seed/chocolate-croissant/400/400",
    category: "Croissant",
    trend: "Best Seller",
    name: "Chocolate Croissant",
    price: "$5.50",
  },
  {
    id: 21,
    image: "https://picsum.photos/seed/apple-pie/400/400",
    category: "Pie",
    trend: "Classic",
    name: "Apple Pie",
    price: "$16.00",
  },
  {
    id: 22,
    image: "https://picsum.photos/seed/strawberry-cake/400/400",
    category: "Cake",
    trend: "New",
    name: "Strawberry Cake",
    price: "$21.00",
  },
  {
    id: 23,
    image: "https://picsum.photos/seed/chocolate-muffin/400/400",
    category: "Muffin",
    trend: "Popular",
    name: "Chocolate Muffin",
    price: "$4.25",
  },
  {
    id: 24,
    image: "https://picsum.photos/seed/vanilla-cake/400/400",
    category: "Cake",
    trend: "Trending",
    name: "Vanilla Cream Cake",
    price: "$19.00",
  },
];



const foodData = [
    {
        id: 1,
        image: require("../images/cakeimage.jpeg"),
        title: "The Flour Atelier",
        rating: "4.9",
        subtitle: "French Patisserie · 0.8 miles",
        tags: ["GLUTEN-FREE", "ORGANIC"],
    },
    {
        id: 2,
        image: require("../images/deva-williamson-tW0Ix_Ajg6Y-unsplash.jpg"),
        title: "Sweet Cravings",
        rating: "4.7",
        subtitle: "Desserts · 1.2 miles",
        tags: ["FRESH", "BESTSELLER"],
    },
    {
        id: 3,
        image: require("../images/jacob-thomas-6jHpcBPw7i8-unsplash.jpg"),
        title: "Cake Paradise",
        rating: "4.8",
        subtitle: "Bakery · 2.1 miles",
        tags: ["VEGAN", "ORGANIC"],
    },
    {
        id: 4,
        image: require("../images/james-coleman-5HR1gItc7Gs-unsplash.jpg"),
        title: "Brownie Point",
        rating: "4.6",
        subtitle: "Chocolate House · 1.5 miles",
        tags: ["HOT", "TRENDING"],
    },
    {
        id: 5,
        image: require("../images/katie-rosario-QNyRp21hb5I-unsplash.jpg"),
        title: "Sugar Bliss",
        rating: "4.5",
        subtitle: "Cupcakes · 0.9 miles",
        tags: ["NEW", "FRESH"],
    },
    {
        id: 6,
        image: require("../images/deva-williamson-tW0Ix_Ajg6Y-unsplash.jpg"),
        title: "Velvet Oven",
        rating: "4.9",
        subtitle: "Premium Cakes · 3.0 miles",
        tags: ["PREMIUM", "ORGANIC"],
    },
];

// ── Naya additions er jonno data (existing data upore touch kora hoyni) ──
const promoData = [
    {
        id: "p1",
        title: "20% off your first order",
        subtitle: "Use code SWEET20 at checkout",
        color: "#E8DCCB",
    },
    {
        id: "p2",
        title: "Free delivery this weekend",
        subtitle: "On all orders above $15",
        color: "#E7C8C8",
    },
    {
        id: "p3",
        title: "New: Vegan pastries",
        subtitle: "Freshly launched, try today",
        color: "#D9E2CE",
    },
];

const categoryChips = [
    { id: "c1", label: "Cakes", icon: "restaurant-outline" },
    { id: "c2", label: "Cupcakes", icon: "cafe-outline" },
    { id: "c3", label: "Pastries", icon: "gift-outline" },
    { id: "c4", label: "Bread", icon: "pizza-outline" },
    { id: "c5", label: "Cookies", icon: "nutrition-outline" },
    { id: "c6", label: "Donuts", icon: "fast-food-outline" },
    { id: "c7", label: "Croissants", icon: "fast-food-outline" },
    { id: "c8", label: "Rolls & Buns", icon: "fast-food-outline" },
    { id: "c9", label: "Muffins", icon: "fast-food-outline" },
    { id: "c10", label: "Pies & Tarts", icon: "fast-food-outline" },
    { id: "c11", label: "Savory Bakery", icon: "fast-food-outline" },
    { id: "c12", label: "Desserts", icon: "fast-food-outline" },
    { id: "c13", label: "Chocolates & Confectionery", icon: "fast-food-outline" }
];

const reorderData = [
    {
        id: "r1",
        image: require("../images/cakeimage.jpeg"),
        name: "Chocolate Cake",
        lastOrdered: "Ordered 3 days ago",
    },
    {
        id: "r2",
        image: require("../images/deva-williamson-tW0Ix_Ajg6Y-unsplash.jpg"),
        name: "Red Velvet Cake",
        lastOrdered: "Ordered last week",
    },
];

const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
};

const Homescreen = ({ navigation }) => {

    const { width, height } = useWindowDimensions()
    const [searchText, setSearchText] = useState("");
    const [refreshing, setRefreshing] = useState(false);
    // Category chip select korle sudhu highlight er jonno, existing filter logic touch kora hoyni
    const [selectedCategory, setSelectedCategory] = useState(null);
    const onRefresh = () => {
        setRefreshing(true);

        setTimeout(() => {
            setRefreshing(false);
        }, 1500);
    };

    const filteredFoodData = useMemo(() => {
        return foodData.filter(item =>
            item.title
                .toLowerCase()
                .includes(searchText.toLowerCase())
        );
    }, [searchText]);
    return (
        <SafeAreaView style={styles.Homecontainer}>
            <StatusBar backgroundColor="#f8f1df" barStyle="dark-content" />

            <Header notification={2} onPress={() => navigation.navigate("NotificationsScreen")} />

            <ScrollView
                contentContainerStyle={{ paddingBottom: 40 }}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                <View style={styles.subhomecontainer}>

                    {/* Greeting */}
                    <Text style={styles.greetingText}>
                        {getGreeting()}, Srijon👋
                    </Text>

                    {/* Search Bar */}
                    <View style={styles.searchBox}>
                        <Ionicons
                            name="search-outline"
                            size={22}
                            color="#75584e"
                        />

                        <TextInput
                            placeholder="Search bakery..."
                            placeholderTextColor="#999"
                            value={searchText}
                            onChangeText={setSearchText}
                            style={styles.searchInput}
                        />
                    </View>

                    {/* Promo Banner */}
                    <FlatList
                        horizontal
                        data={promoData}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={{ gap: 12, paddingBottom: 4 }}
                        style={{ marginBottom: 18 }}
                        renderItem={({ item }) => (
                            <View
                                style={[
                                    styles.promoCard,
                                    { backgroundColor: item.color },
                                ]}
                            >
                                <Text style={styles.promoTitle}>{item.title}</Text>
                                <Text style={styles.promoSubtitle}>{item.subtitle}</Text>
                            </View>
                        )}
                    />

                    {/* Quick Category Chips */}
                    <FlatList
                        horizontal
                        data={categoryChips}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={{ gap: 10, paddingBottom: 4 }}
                        style={{ marginBottom: 18 }}
                        renderItem={({ item }) => {
                            const active = selectedCategory === item.id;
                            return (
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    onPress={() =>
                                        setSelectedCategory(active ? null : item.id)
                                    }
                                    style={[
                                        styles.categoryChip,
                                        active && styles.categoryChipActive,
                                    ]}
                                >
                                    <Ionicons
                                        name={item.icon}
                                        size={16}
                                        color={active ? "#fff" : "#6D4C41"}
                                    />
                                    <Text
                                        style={[
                                            styles.categoryChipText,
                                            active && styles.categoryChipTextActive,
                                        ]}
                                    >
                                        {item.label}
                                    </Text>
                                </TouchableOpacity>
                            );
                        }}
                    />

                    {/* Featured Bakes */}
                    <View style={styles.featuredBakesContainer}>
                        <Text style={styles.featuredBakesText}>
                            Featured Bakes
                        </Text>

                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate("Categorys")
                            }
                        >
                            <Text style={styles.featuredBakesText}>
                                View ALL
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <FlatList
                        horizontal
                        data={bakeryData}
                        showsHorizontalScrollIndicator={false}
                        initialNumToRender={8}
                        keyExtractor={(item) =>
                            item.id.toString()
                        }
                        renderItem={({ item }) => (
                            <Cakecard
                                image={item.image}
                                trend={item.trend}
                                name={item.name}
                                price={item.price}
                            />
                        )}
                    />

                    {/* Order Again */}
                    <Text style={styles.exploreCollectionsText}>
                        Order Again
                    </Text>

                    <FlatList
                        horizontal
                        data={reorderData}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={{ gap: 12, paddingBottom: 4 }}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                activeOpacity={0.85}
                                style={styles.reorderCard}
                            >
                                <View style={styles.reorderTextWrap}>
                                    <Text style={styles.reorderName}>{item.name}</Text>
                                    <Text style={styles.reorderMeta}>
                                        {item.lastOrdered}
                                    </Text>
                                </View>
                                <View style={styles.reorderBtn}>
                                    <Ionicons
                                        name="repeat-outline"
                                        size={16}
                                        color="#fff"
                                    />
                                </View>
                            </TouchableOpacity>
                        )}
                    />

                    {/* Explore Collections */}
                    <Text style={styles.exploreCollectionsText}>
                        Explore Collections
                    </Text>

                    <View style={styles.container}>

                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={styles.bigCard}
                        >
                            <Ionicons
                                name="restaurant-outline"
                                size={28}
                                color="#6D4C41"
                            />

                            <Text style={styles.bigTitle}>
                                Wedding masterpieces
                            </Text>

                            <Text style={styles.subText}>
                                12 ARTISTS
                            </Text>
                        </TouchableOpacity>

                        <View style={styles.rightContainer}>

                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={[
                                    styles.smallCard,
                                    { height: height * 0.08 }
                                ]}
                            >
                                <View style={styles.iconCircle}>
                                    <Ionicons
                                        name="gift-outline"
                                        size={22}
                                        color="#6D4C41"
                                    />
                                </View>

                                <Text style={styles.smallText}>
                                    Birthday
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={[
                                    styles.smallCard,
                                    styles.pinkCard,
                                    { height: height * 0.08 }
                                ]}
                            >
                                <View style={styles.iconCircle}>
                                    <Ionicons
                                        name="cafe-outline"
                                        size={20}
                                        color="#6D4C41"
                                    />
                                </View>

                                <Text style={styles.smallText}>
                                    Cupcakes
                                </Text>
                            </TouchableOpacity>

                        </View>
                    </View>

                    {/* Nearby Artists */}
                    <Text style={styles.exploreCollectionsText}>
                        Nearby Artists
                    </Text>

                    <View style={styles.foodCardContainer}>
                        {filteredFoodData.length === 0 ? (
                            <View style={styles.emptyContainer}>
                                <Ionicons
                                    name="search-outline"
                                    size={50}
                                    color="#999"
                                />

                                <Text style={styles.emptyText}>
                                    No bakery found
                                </Text>
                            </View>
                        ) : (
                            <FlatList
                                scrollEnabled={false}
                                data={filteredFoodData}
                                keyExtractor={(item) =>
                                    item.id.toString()
                                }
                                renderItem={({ item }) => (
                                    <FoodCard
                                        image={item.image}
                                        title={item.title}
                                        rating={item.rating}
                                        subtitle={item.subtitle}
                                        tags={item.tags[0]}
                                        tag={item.tags[1]}
                                    />
                                )}
                            />
                        )}
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
export default Homescreen;

const styles = StyleSheet.create({
    Homecontainer: {
        flex: 1,
        backgroundColor: "#f8f1df",
        borderStyle: "solid",
        borderBottomColor: "#e5e7eb",
        borderBottomWidth: 1,
    },
    subhomecontainer: {
        paddingHorizontal: 18
    },
    featuredBakesContainer: {
        flexDirection: "row",
        // paddingHorizontal: 20,
        justifyContent: "space-between",
        alignItems: "center",
    },
    featuredBakesText: {
        fontSize: 18,
        fontWeight: "700",
        color: "#75584e",
    },
    exploreCollectionsText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#75584e",
        // paddingHorizontal: 20,
        marginVertical: 10,
        letterSpacing: 0.4,
    },
    container: {
        flexDirection: "row",
        // marginHorizontal: 20,
        marginTop: 20,
        gap: 15,
    },
    bigCard: {
        flex: 1,
        backgroundColor: "#E8DCCB",
        borderRadius: 48,
        padding: 20,
        gap: 19,
        justifyContent: "space-between",
    },
    bigTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#5D4037",
    },
    subText: {
        fontSize: 10,
        color: "#8D6E63",
        marginTop: 5,
    },
    rightContainer: {
        flex: 1,
        justifyContent: "space-between",
        gap: 10,
    },
    smallCard: {
        backgroundColor: "#EDE0D4",
        borderRadius: 35,
        paddingHorizontal: 15,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },

    pinkCard: {
        backgroundColor: "#E7C8C8",
    },
    iconCircle: {
        borderRadius: 20,
        padding: 5,
        backgroundColor: "#F3EFEF",
        justifyContent: "center",
        alignItems: "center",
    },
    smallText: {
        fontSize: 15,
        fontWeight: "600",
        color: "#5D4037",
    },
    foodCardContainer: {
        justifyContent: "center",
        // alignItems: "center",
        width: "100%",
        // paddingLeft: 0,
        // paddingHorizontal: 20,
        overflow: "hidden"
    },
    searchBox: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#ffffff",
        borderRadius: 18,
        paddingHorizontal: 15,
        marginBottom: 18,
        marginTop: 10,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.08,
        shadowRadius: 4,

        elevation: 3,
    },

    searchInput: {
        flex: 1,
        height: 50,
        marginLeft: 10,
        color: "#333",
        fontSize: 15,
    },

    emptyContainer: {
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 40,
    },

    emptyText: {
        marginTop: 10,
        fontSize: 16,
        color: "#999",
        fontWeight: "600",
    },

    /* ── Naya additions er style ── */
    greetingText: {
        fontSize: 16,
        fontWeight: "700",
        color: "#5D4037",
        marginTop: 12,
        marginBottom: 2,
    },

    promoCard: {
        width: 260,
        borderRadius: 24,
        padding: 18,
        justifyContent: "center",
        gap: 6,
    },

    promoTitle: {
        fontSize: 15,
        fontWeight: "700",
        color: "#5D4037",
    },

    promoSubtitle: {
        fontSize: 12,
        color: "#7A5F52",
    },

    categoryChip: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        backgroundColor: "#EDE0D4",
        borderRadius: 20,
        paddingHorizontal: 14,
        paddingVertical: 9,
    },

    categoryChipActive: {
        backgroundColor: "#6D4C41",
    },

    categoryChipText: {
        fontSize: 13,
        fontWeight: "600",
        color: "#6D4C41",
    },

    categoryChipTextActive: {
        color: "#fff",
    },

    reorderCard: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: 220,
        backgroundColor: "#ffffff",
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 14,
        gap: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
        elevation: 2,
    },

    reorderTextWrap: {
        flex: 1,
        gap: 2,
    },

    reorderName: {
        fontSize: 14,
        fontWeight: "700",
        color: "#5D4037",
    },

    reorderMeta: {
        fontSize: 11,
        color: "#9B8070",
    },

    reorderBtn: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: "#6D4C41",
        alignItems: "center",
        justifyContent: "center",
    },
})