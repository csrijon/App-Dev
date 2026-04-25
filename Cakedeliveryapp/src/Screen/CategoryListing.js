import { View, Text, StatusBar, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import CategoryCard from '../components/CategoryCard';
import MenuCard from '../components/MenuCard';



const CategoryListing = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.Categorycontainer} >
            <StatusBar backgroundColor="#FFF9E6" barStyle={'dark-content'} />
            <Header name="Wedding Cakes" title="Category Listing" />
            <ScrollView vertical showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }} style={styles.CategoryListing} >
                {/* {filter section start } */}
                <View style={styles.FilterSection} >

                    <Text style={styles.FilterText} >Curated Collections</Text>
                    <TouchableOpacity style={styles.FilterButtons} >
                        <Ionicons name="filter" color="#000" size={20} />
                        <Text>Refine</Text>
                    </TouchableOpacity>
                </View>
                {/* {filter section end } */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.CategoryCardsContainer} >
                    <CategoryCard title="All Designs" />
                    <CategoryCard title="All Designs" />
                    <CategoryCard title="All Designs" />
                    <CategoryCard title="All Designs" />
                    <CategoryCard title="All Designs" />
                </ScrollView>
                <View style={styles.MenuCardsContainer} >
                    <MenuCard onPress={() => navigation.navigate("MyOrder")} />
                    <MenuCard onPress={() => navigation.navigate("MyOrder")} />
                    <MenuCard onPress={() => navigation.navigate("MyOrder")} />
                    <MenuCard onPress={() => navigation.navigate("MyOrder")} />
                    <MenuCard onPress={() => navigation.navigate("MyOrder")} />
                    <MenuCard onPress={() => navigation.navigate("MyOrder")} />
                </View>
            </ScrollView>
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
    FilterButtons: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
    },
    CategoryCardsContainer: {
        marginTop: 20,
        flexDirection: "row",
    },
    MenuCardsContainer: {
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center",
        // paddingHorizontal:20,
        gap: 20,
    }
})