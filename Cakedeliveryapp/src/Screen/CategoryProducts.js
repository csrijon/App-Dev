import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"
import { View, StyleSheet, ScrollView, FlatList,TouchableOpacity } from "react-native"
import Resetheader from "../components/Resetheader"
import Search from "../components/Search"
import CategoryProductscard from "../components/CategoryProductscard"
import ProductShowcaseCard from "../components/ProductShowcaseCard"
import { useState, useEffect } from "react";
import { products } from "../services/customerApi";
import { API_CONFIG } from '../config/api';

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

const CategoryProducts = ({navigation}) => {

    const inset = useSafeAreaInsets()
    const [selectedCategory, setSelectedCategory] = useState('Cakes')
    const [searchText, setSearchText] = useState('')
    const [liveProducts, setLiveProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const load = async () => {
            try {
                const res = await products.list()
                const data = res?.success ? (res.data || res.products || res || []) : []
                setLiveProducts(Array.isArray(data) ? data : [])
            } catch (e) {
                console.log("Category products fetch error:", e)
                setLiveProducts([])
            } finally {
                setLoading(false)
            }
        }
        load()
    }, [])

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
                    data={liveProducts.filter(p => {
                        const matchesCategory = (p.category || p.productName || '').toLowerCase().includes(selectedCategory.toLowerCase()) || selectedCategory === 'Cakes'
                        const matchesSearch = !searchText || (p.productName || '').toLowerCase().includes(searchText.toLowerCase()) || (p.description || '').toLowerCase().includes(searchText.toLowerCase())
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
                    renderItem={({ item }) => (<ProductShowcaseCard id={item.productId || item.id} title={item.productName || item.title} des={item.description || item.des} price={item.price} rating={item.rating || 4.5} badge={item.category || item.badge} image={item.imageUrl ? (item.imageUrl.startsWith('/') ? API_CONFIG.baseURL + item.imageUrl : item.imageUrl) : item.image} onPress={()=>navigation.navigate("Cakedetails", { product: item })} />)}
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