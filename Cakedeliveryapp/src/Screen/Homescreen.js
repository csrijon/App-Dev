import { View, Text, StatusBar, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header"
import Search from "../components/Search";
import Cakecard from "../components/Cakecard";
import Ionicons from "react-native-vector-icons/Ionicons";
import FoodCard from "../components/FoodCard";
import { useWindowDimensions } from "react-native";

const Homescreen = ({navigation}) => {
    const {width,height} =useWindowDimensions()
    return (
        <SafeAreaView style={styles.Homecontainer} >
            <StatusBar backgroundColor="#FFF9E6" barStyle="dark-content" />

            {/* Header Fixed */}
            <Header name="Srijon Chowdhury" />

            {/* Scrollable Content */}
            <ScrollView contentContainerStyle={{paddingBottom:40}} showsVerticalScrollIndicator={false}>

                <View style={styles.searchContainer} >
                    <Search />
                </View>

                <View style={styles.featuredBakesContainer} >
                    <Text style={styles.featuredBakesText} >Featured Bakes</Text>
                    <TouchableOpacity onPress={()=>navigation.navigate("Category")} >
                        <Text style={styles.featuredBakesText} >View ALL</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}  >
                    <Cakecard />
                    <Cakecard />
                    <Cakecard />
                    <Cakecard />
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
                        <View style={[styles.smallCard,{height:height*0.08}]}>
                            <View style={styles.iconCircle} >
                                <Ionicons name="gift-outline" size={22} color="#6D4C41" />
                            </View>
                            <Text style={styles.smallText}>Birthday </Text>
                        </View>

                        <View style={[styles.smallCard, styles.pinkCard,{height:height*0.08}]}>
                            <View style={styles.iconCircle}>
                                <Ionicons name="cafe-outline" size={20} color="#6D4C41" />
                            </View>
                            <Text style={styles.smallText}>Cupcakes</Text>
                        </View>
                    </View>
                </View>

                <Text style={styles.exploreCollectionsText} >Nearby Artists</Text>
                <View style={styles.foodCardContainer} >
                    <FoodCard />
                    <FoodCard />
                    <FoodCard />
                    <FoodCard />
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
    searchContainer: {
        paddingHorizontal: 20,
        marginVertical: 20,
    },
    featuredBakesContainer: {
        flexDirection: "row",
        paddingHorizontal: 20,
        justifyContent: "space-between",
        alignItems: "center",
    },
    featuredBakesText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#75584e",
        curser: "pointer"
    },
    exploreCollectionsText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#75584e",
        paddingHorizontal: 20,
        marginVertical: 10,
        letterSpacing: 0.4,
    },
    container: {
        flexDirection: "row",
        marginHorizontal: 20,
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
        padding:5,
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
        width:"100%",
        // paddingLeft: 0,
        paddingHorizontal:20,
        overflow:"hidden"
    }
})