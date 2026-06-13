import { View, Text, StatusBar, StyleSheet, ScrollView, TouchableOpacity, FlatList } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header"
import Search from "../components/Search";
import Cakecard from "../components/Cakecard";
import Ionicons from "react-native-vector-icons/Ionicons";
import FoodCard from "../components/FoodCard";
import { useWindowDimensions } from "react-native";



const cakeData = [
    {
        id: 1,
        image: require("../images/cakeimage.jpeg"),
        trend: "Trending",
        name: "Chocolate Cake",
        price: "$20.00",
    },
    {
        id: 2,
        image: require("../images/deva-williamson-tW0Ix_Ajg6Y-unsplash.jpg"),
        trend: "Best Seller",
        name: "Red Velvet Cake",
        price: "$25.00",
    },
    {
        id: 3,
        image: require("../images/jacob-thomas-6jHpcBPw7i8-unsplash.jpg"),
        trend: "Popular",
        name: "Black Forest Cake",
        price: "$18.00",
    },
    {
        id: 4,
        image: require("../images/james-coleman-5HR1gItc7Gs-unsplash.jpg"),
        trend: "New",
        name: "Strawberry Cake",
        price: "$22.00",
    },
    {
        id: 5,
        image: require("../images/katie-rosario-QNyRp21hb5I-unsplash.jpg"),
        trend: "Trending",
        name: "Vanilla Cream Cake",
        price: "$19.00",
    },
    {
        id: 6,
        image: require("../images/cakeimage.jpeg"),
        trend: "Special",
        name: "Butterscotch Cake",
        price: "$24.00",
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

const Homescreen = ({ navigation }) => {
   
    const { width, height } = useWindowDimensions()
    return (
        <SafeAreaView style={styles.Homecontainer} >
            <StatusBar backgroundColor="#f8f1df" barStyle="dark-content" />

            {/* Header Fixed */}
            <Header  />

            {/* Scrollable Content */}
            <ScrollView contentContainerStyle={{ paddingBottom: 40, }} showsVerticalScrollIndicator={false}>
          <View style={styles.subhomecontainer} >
                {/* <View style={styles.searchContainer} > */}
                    <Search />
                {/* </View> */}

                <View style={styles.featuredBakesContainer} >
                    <Text style={styles.featuredBakesText} >Featured Bakes</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("Categorys")} >
                        <Text style={styles.featuredBakesText} >View ALL</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}  >

                    <FlatList
                        contentContainerStyle={{ flexDirection: "row" }}
                        data={cakeData}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) =>
                            <Cakecard image={item.image} trend={item.trend} name={item.name} price={item.price} />
                        }
                    />

                </ScrollView>
                <Text style={styles.exploreCollectionsText} >
                    Explore Collections
                </Text>

                <View style={styles.container}>
                    <View style={styles.bigCard}>
                        <Ionicons name="restaurant-outline" size={28} color="#6D4C41" />
                        <Text style={styles.bigTitle}>Wedding masterpieces</Text>
                        <Text style={styles.subText}>12 ARTISTS</Text>
                    </View>

                    <View style={styles.rightContainer}>
                        <View style={[styles.smallCard, { height: height * 0.08 }]}>
                            <View style={styles.iconCircle} >
                                <Ionicons name="gift-outline" size={22} color="#6D4C41" />
                            </View>
                            <Text style={styles.smallText}>Birthday </Text>
                        </View>

                        <View style={[styles.smallCard, styles.pinkCard, { height: height * 0.08 }]}>
                            <View style={styles.iconCircle}>
                                <Ionicons name="cafe-outline" size={20} color="#6D4C41" />
                            </View>
                            <Text style={styles.smallText}>Cupcakes</Text>
                        </View>
                    </View>
                </View>

                <Text style={styles.exploreCollectionsText} >Nearby Artists</Text>
                <View style={styles.foodCardContainer} >
                    <FlatList
                        data={foodData}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) =>
                            <FoodCard image={item.image}
                                title={item.title}
                                rating={item.rating}
                                subtitle={item.subtitle}
                                tags={item.tags[0]}
                                tag={item.tags[1]} />
                        }
                    />
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
    subhomecontainer:{
     paddingHorizontal:18
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
    }
})