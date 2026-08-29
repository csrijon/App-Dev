import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"
import { View, StyleSheet, ScrollView, FlatList,TouchableOpacity } from "react-native"
import Resetheader from "../components/Resetheader"
import Search from "../components/Search"
import CategoryProductscard from "../components/CategoryProductscard"
import ProductShowcaseCard from "../components/ProductShowcaseCard"
import { useState } from "react"

const bakeryCategories = [
    {
        id: "1",
        title: "Cakes",
        image:
            "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400",
    },
    {
        id: "2",
        title: "Cupcakes",
        image:
            "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=400",
    },
    {
        id: "3",
        title: "Donuts",
        image:
            "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400",
    },
    {
        id: "4",
        title: "Cookies",
        image:
            "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400",
    },
    {
        id: "5",
        title: "Brownies",
        image:
            "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400",
    },
    {
        id: "6",
        title: "Croissants",
        image:
            "https://images.unsplash.com/photo-1555507036-ab794f4afe5a?w=400",
    },
    {
        id: "7",
        title: "Muffins",
        image:
            "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=400",
    },
    {
        id: "8",
        title: "Pastries",
        image:
            "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400",
    },
    {
        id: "9",
        title: "Cheesecakes",
        image:
            "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400",
    },
    {
        id: "10",
        title: "Macarons",
        image:
            "https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=400",
    },
    {
        id: "11",
        title: "Bread",
        image:
            "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400",
    },
    {
        id: "12",
        title: "Bagels",
        image:
            "https://images.unsplash.com/photo-1612203985729-70726954388c?w=400",
    },
    {
        id: "13",
        title: "Pretzels",
        image:
            "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400",
    },
    {
        id: "14",
        title: "Pies",
        image:
            "https://images.unsplash.com/photo-1519915028121-7d3463d5b1c9?w=400",
    },
    {
        id: "15",
        title: "Tarts",
        image:
            "https://images.unsplash.com/photo-1464306076886-da185f6a9d05?w=400",
    },
    {
        id: "16",
        title: "Eclairs",
        image:
            "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400",
    },
    {
        id: "17",
        title: "Swiss Rolls",
        image:
            "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=400",
    },
    {
        id: "18",
        title: "Scones",
        image:
            "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?w=400",
    },
];

const products = [
    {
        id: "1",
        title: "Velvet Cocoa",
        description: "Rich mahogany sponge with organic whipped mascarpone.",
        price: 48.0,
        rating: 4.9,
        badge: "SIGNATURE",
        image:
            "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600",
        isFavorite: false,
        category: "Cakes",
    },
    {
        id: "2",
        title: "Classic Brownie",
        description: "Fudgy chocolate brownie topped with cocoa dust.",
        price: 24.5,
        rating: 4.8,
        badge: "BESTSELLER",
        category: "Brownies",
        image:
            "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600",
        isFavorite: true,
    },
    {
        id: "3",
        title: "Strawberry Dream",
        description: "Soft vanilla sponge layered with fresh strawberries.",
        price: 55.0,
        rating: 4.7,
        badge: "NEW",
        category: "Cakes",
        image:
            "https://images.unsplash.com/photo-1464306076886-da185f6a9d05?w=600",
        isFavorite: false,
    },
    {
        id: "4",
        title: "Blueberry Cheesecake",
        description: "Creamy cheesecake finished with blueberry compote.",
        price: 62.0,
        rating: 5.0,
        badge: "CHEF'S PICK",
        category: "Cheesecakes",
        image:
            "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600",
        isFavorite: false,
    },
    {
        id: "5",
        title: "Chocolate Donut",
        description: "Fresh donut dipped in silky Belgian chocolate.",
        price: 12.0,
        rating: 4.6,
        badge: "POPULAR",
        category: "Donuts",
        image:
            "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600",
        isFavorite: true,
    },
    {
        id: "6",
        title: "Caramel Cupcake",
        description: "Moist cupcake with caramel buttercream frosting.",
        price: 16.0,
        rating: 4.8,
        badge: "LIMITED",
        category: "Cupcakes",
        image:
            "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=600",
        isFavorite: false,
    },
    {
        id: "7",
        title: "Oat Cookie",
        description: "Crunchy oat cookie with dark chocolate chunks.",
        price: 8.5,
        rating: 4.5,
        badge: "POPULAR",
        category: "Cookies",
        image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600",
        isFavorite: false,
    },
    {
        id: "8",
        title: "Butter Croissant",
        description: "Flaky croissant with golden buttery layers.",
        price: 6.0,
        rating: 4.7,
        badge: "FRESH",
        category: "Croissants",
        image: "https://images.unsplash.com/photo-1555507036-ab794f4afe5a?w=400",
        isFavorite: false,
    },
    {
        id: "9",
        title: "Blueberry Muffin",
        description: "Soft muffin packed with fresh blueberries.",
        price: 7.5,
        rating: 4.6,
        badge: "NEW",
        category: "Muffins",
        image: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=400",
        isFavorite: false,
    },
    {
        id: "10",
        title: "Fruit Tart",
        description: "Crisp tart shell with fresh seasonal fruits.",
        price: 9.0,
        rating: 4.5,
        badge: "SEASONAL",
        category: "Tarts",
        image: "https://images.unsplash.com/photo-1464306076886-da185f6a9d05?w=400",
        isFavorite: false,
    },
    {
        id: "11",
        title: "Apple Pie",
        description: "Classic apple pie with buttery crust.",
        price: 14.0,
        rating: 4.8,
        badge: "CLASSIC",
        category: "Pies",
        image: "https://images.unsplash.com/photo-1519915028121-7d3463d5b1c9?w=400",
        isFavorite: false,
    },
    {
        id: "12",
        title: "Chocolate Eclair",
        description: "Choux pastry filled with rich chocolate cream.",
        price: 10.5,
        rating: 4.7,
        badge: "POPULAR",
        category: "Eclairs",
        image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400",
        isFavorite: false,
    },
    {
        id: "13",
        title: "Swiss Roll",
        description: "Light sponge rolled with whipped cream.",
        price: 11.0,
        rating: 4.6,
        badge: "NEW",
        category: "Swiss Rolls",
        image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=400",
        isFavorite: false,
    },
    {
        id: "14",
        title: "Butter Scone",
        description: "Traditional scone with clotted cream.",
        price: 6.5,
        rating: 4.4,
        badge: "CLASSIC",
        category: "Scones",
        image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?w=400",
        isFavorite: false,
    },
    {
        id: "15",
        title: "Pretzel Twist",
        description: "Soft pretzel with sea salt topping.",
        price: 5.0,
        rating: 4.3,
        badge: "SNACK",
        category: "Pretzels",
        image: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400",
        isFavorite: false,
    },
    {
        id: "16",
        title: "Sesame Bagel",
        description: "Chewy bagel with toasted sesame seeds.",
        price: 7.0,
        rating: 4.5,
        badge: "BREAKFAST",
        category: "Bagels",
        image: "https://images.unsplash.com/photo-1612203985729-70726954388c?w=400",
        isFavorite: false,
    },
    {
        id: "17",
        title: "Sourdough Bread",
        description: "Artisan sourdough with crisp crust.",
        price: 9.0,
        rating: 4.7,
        badge: "BAKED FRESH",
        category: "Bread",
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400",
        isFavorite: false,
    },
    {
        id: "18",
        title: "Cherry Danish",
        description: "Flaky pastry with sweet cherry filling.",
        price: 8.5,
        rating: 4.6,
        badge: "PASTRY",
        category: "Pastries",
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400",
        isFavorite: false,
    },
    {
        id: "19",
        title: "Macaron Box",
        description: "Assorted colorful French macarons.",
        price: 18.0,
        rating: 4.9,
        badge: "LUXURY",
        category: "Macarons",
        image: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=400",
        isFavorite: false,
    },
];


const CategoryProducts = ({navigation}) => {

    const inset = useSafeAreaInsets()
    const [selectedCategory, setSelectedCategory] = useState('Cakes')
    const [searchText, setSearchText] = useState('')

    return (
        <SafeAreaView style={styles.CategoryProducts_section} >
            <Resetheader title={"Bakery Items"} />
            <View style={styles.CategoryProductscontainer} >
                <Search value={searchText} onChangeText={setSearchText} />
                <FlatList
                    data={bakeryCategories}
                    horizontal
                    style={{ marginTop: 10, }}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => setSelectedCategory(item.title)} activeOpacity={0.7}>
                            <CategoryProductscard title={item.title} img={item.image} isSelected={selectedCategory === item.title} />
                        </TouchableOpacity>
                    )}
                    keyExtractor={item => item.id}
                    initialNumToRender={8}
                />

                {/* <ScrollView>
                    <ProductShowcaseCard />

                </ScrollView> */}

                <FlatList
                    data={products.filter(p => {
                        const matchesCategory = p.category === selectedCategory
                        const matchesSearch = !searchText || p.title.toLowerCase().includes(searchText.toLowerCase()) || p.description.toLowerCase().includes(searchText.toLowerCase())
                        return matchesCategory && matchesSearch
                    })}
                    numColumns={2}

                    columnWrapperStyle={{
                        justifyContent: "space-between",
                        paddingBottom: 20
                    }}
                    contentContainerStyle={{
                        paddingBottom: inset.bottom
                    }}
                    renderItem={({ item }) => (<ProductShowcaseCard title={item.title} des={item.description} price={item.price} rating={item.rating} badge={item.badge} image={item.image} onPress={()=>navigation.navigate("Cakedetails")} />)}
                    keyExtractor={item => item.id}
                />
            </View>
        </SafeAreaView>
    )
}
export default CategoryProducts

const styles = StyleSheet.create({
    CategoryProducts_section: {
        flex: 1,
        backgroundColor: "#FAF6EE"
    },
    CategoryProductscontainer: {
        flex: 1,
        paddingHorizontal: 18,
        paddingVertical: 18,
    }
})