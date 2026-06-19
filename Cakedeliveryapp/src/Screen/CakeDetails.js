import { useState } from "react";
import { View, Text, StyleSheet, StatusBar, ScrollView, Image, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"
import Detailsheader from "../components/Detailsheader";
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

const CakeDetails = ({ navigation }) => {

    const [isFavorite, setIsFavorite] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [showFullDescription, setShowFullDescription] = useState(false);

    const description = "A masterpiece of confectionary art, this three-tier wedding cake features layers of Tahitian vanilla bean sponge infused with a delicate rosewater syrup. Hand-sculpted sugar peonies cascade down a smooth Swiss meringue buttercream canvas, accented by 24k gold leaf details.";

    const shortDescription = description.slice(0, 100) + "...";

    const pricePerCake = 850;
    const totalPrice = pricePerCake * quantity;

    const increaseQuantity = () => {
        setQuantity(prev => prev + 1);
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };

    const handleAddToCart = () => {
        Alert.alert(
            "Added to Cart 🎉",
            `${quantity} x The Celestial Peony added to your cart.\nTotal: $${totalPrice}`,
            [
                {
                    text: "OK",
                    onPress: () => navigation.navigate("Ordersummary")
                }
            ]
        );
    };

    const toggleFavorite = () => {
        setIsFavorite(prev => !prev);
    };

    return (
        <SafeAreaView style={styles.CakeDetails} >
            <StatusBar backgroundColor="#fff9e6" barStyle="dark-content" />
            <Detailsheader />
            <ScrollView contentContainerStyle={{paddingBottom:40}} style={styles.scrollViewcakedetails} >
                <View>
                    <View style={styles.cakemaindetails} >
                        <Image source={require("../images/cakeimage.jpeg")} style={styles.cakeImage} />

                        {/* Favorite Button */}
                        <TouchableOpacity
                            activeOpacity={0.7}
                            style={styles.favoriteBtn}
                            onPress={toggleFavorite}
                        >
                            <AntDesign
                                name={isFavorite ? "heart" : "hearto"}
                                size={22}
                                color={isFavorite ? "#e63946" : "#5c4033"}
                            />
                        </TouchableOpacity>

                        <View style={styles.cakeinfo} >
                            <Text style={styles.cakeinfoTitle}>Starting From</Text>
                            <Text style={styles.cakeinfoPrice}>${pricePerCake}</Text>
                        </View>
                    </View>
                </View>
                <View>
                    <View style={styles.detailsContainer}>

                        {/* Rating */}
                        <View style={styles.ratingRow}>
                            <View style={styles.ratingcircle} >
                                <Text style={styles.rating}>⭐ 4.9</Text>
                            </View>

                            <Text style={styles.review}>(128 Reviews)</Text>
                        </View>

                        {/* Title */}
                        <Text style={styles.title}>The Celestial Peony</Text>

                        {/* Description with Read More */}
                        <Text style={styles.description}>
                            {showFullDescription ? description : shortDescription}
                        </Text>
                        <TouchableOpacity
                            activeOpacity={0.6}
                            onPress={() => setShowFullDescription(prev => !prev)}
                        >
                            <Text style={styles.readMore}>
                                {showFullDescription ? "Read Less" : "Read More"}
                            </Text>
                        </TouchableOpacity>

                        {/* Chef Card */}
                        <View style={styles.chefCard}>
                            <Image
                                source={require("../images/cakeimage.jpeg")}
                                style={styles.chefImage}
                            />
                            <View style={{ flex: 1, gap: 5 }}>
                                <Text style={styles.chefLabel}>Crafted by</Text>
                                <Text style={styles.chefName}>Master Baker Elena Rossi</Text>
                            </View>
                            <TouchableOpacity activeOpacity={0.5} >
                                <Text style={styles.portfolio}>View Portfolio</Text>
                            </TouchableOpacity>

                        </View>

                        {/* Flavor Profile */}
                        <Text style={styles.sectionTitle}>FLAVOR PROFILE</Text>

                        <View style={styles.tagsContainer}>
                            {["Tahitian Vanilla", "Rosewater Infusion", "Champagne Cream", "Gold Leaf"].map((item, index) => (
                                <View key={index} style={styles.tag}>
                                    <Text style={styles.tagText}>{item}</Text>
                                </View>
                            ))}
                        </View>

                        {/* Quantity Selector */}
                        <Text style={styles.sectionTitle}>QUANTITY</Text>
                        <View style={styles.quantityRow}>
                            <TouchableOpacity
                                style={styles.quantityBtn}
                                onPress={decreaseQuantity}
                                activeOpacity={0.6}
                            >
                                <Feather name="minus" size={18} color="#5c4033" />
                            </TouchableOpacity>

                            <Text style={styles.quantityText}>{quantity}</Text>

                            <TouchableOpacity
                                style={styles.quantityBtn}
                                onPress={increaseQuantity}
                                activeOpacity={0.6}
                            >
                                <Feather name="plus" size={18} color="#5c4033" />
                            </TouchableOpacity>

                            <Text style={styles.totalPriceText}>Total: ${totalPrice}</Text>
                        </View>

                        {/* Buttons */}
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={handleAddToCart} style={styles.primaryBtn}>
                                <Text style={styles.primaryText}>Add to Cart</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => navigation.navigate("Customorder")} style={styles.secondaryBtn}>
                                <Text style={styles.secondaryText}>Custom Order</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
                {/* Artisan Process */}
                <View style={styles.processCard}>

                    <Text style={styles.processTitle}>The Artisan's Process</Text>

                    {/* Item 1 */}
                    <View style={styles.processItem}>
                        <Text style={styles.icon}><Feather name="clock" color="#75584e" size={24} /></Text>
                        <View style={{ flex: 1,gap:10 }}>
                            <Text style={styles.processHeading}>48–Hour Curing</Text>
                            <Text style={styles.processText}>
                                Each layer is cured to perfection for optimal texture and moisture retention.
                            </Text>
                        </View>
                    </View>

                    {/* Item 2 */}
                    <View style={styles.processItem}>
                        <Text style={styles.icon}>  <MaterialIcons name="eco" color="#75584e" size={24} /></Text>
                        <View style={{ flex: 1,gap:10 }}>
                            <Text style={styles.processHeading}>Organic Sourcing</Text>
                            <Text style={styles.processText}>
                                We only use grass-fed dairy and organic vanilla pods from local sustainable farms.
                            </Text>
                        </View>
                    </View>

                </View>

                {/* 100% Card */}
                <View style={styles.handcraftedCard}>
                    <Text style={styles.percent}>100%</Text>
                    <Text style={styles.handcraftedTitle}>HAND-CRAFTED DECORATION</Text>

                    <View style={styles.divider} />

                    <Text style={styles.handcraftedText}>
                        "Every petal is individually shaped by hand to ensure no two cakes are ever identical."
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
export default CakeDetails;

const styles = StyleSheet.create({
    CakeDetails: {
        flex: 1,
        backgroundColor: "#fcf5e3",
    },

    scrollViewcakedetails: {
        flex: 1,
        paddingHorizontal: 20,
    },

    cakemaindetails: {
        position: "relative",
        marginTop: 10,
    },

    cakeImage: {
        width: "100%",
        height: 500,
        resizeMode: "cover",
        borderTopLeftRadius: 50,
        borderBottomRightRadius: 50,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.15,
        shadowRadius: 20,
        elevation: 10,
    },

    favoriteBtn: {
        position: "absolute",
        top: 20,
        right: 20,
        backgroundColor: "#ffffff",
        padding: 10,
        borderRadius: 9999,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 6,
    },

    cakeinfo: {
        position: "absolute",
        bottom: 20,
        right: 20,

        backgroundColor: "#ffffff",
        paddingVertical: 12,
        paddingHorizontal: 18,

        borderRadius: 20,

        // shadow
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 6,
    },

    cakeinfoTitle: {
        fontSize: 12,
        color: "#777",
        marginBottom: 4,
    },

    cakeinfoPrice: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#000",
    },
    detailsContainer: {
        marginTop: 20,
    },
    ratingcircle: {
        paddingVertical: 4,
        paddingHorizontal: 12,
        backgroundColor: "#f8bbd0",
        borderRadius: 9999
    },
    ratingRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
        gap: 10
    },
    rating: {
        fontWeight: "bold",
        marginRight: 6,
        color: "#623648"
    },

    review: {
        color: "#777",
    },

    title: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#5c4033",
        marginBottom: 15,
    },

    description: {
        color: "#363317",
        lineHeight: 20,
        letterSpacing: 0.6
    },

    readMore: {
        color: "#75584e",
        fontWeight: "700",
        marginTop: 6,
        marginBottom: 20,
    },

    chefCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f3e8d9",
        padding: 16,
        borderRadius: 20,
        marginBottom: 20,
        borderRadius: 9999
    },

    chefImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },

    chefLabel: {
        fontSize: 12,
        color: "#646040",
        fontWeight: 500
    },

    chefName: {
        fontWeight: "700",
        color: "#75584e"
    },

    portfolio: {
        color: "#5c4033",
        fontWeight: "500",
    },

    sectionTitle: {
        fontSize: 15,
        fontWeight:"700",
        letterSpacing: 1,
        color: "#646040",
        marginBottom: 10,
    },

    tagsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
        marginBottom: 25,
    },

    tag: {
        backgroundColor: "#f8bbd0",
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 5,
    },

    tagText: {
        fontSize: 14,
        color: "#623648",
        fontWeight:600
    },

    quantityRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 15,
        marginBottom: 25,
    },

    quantityBtn: {
        backgroundColor: "#f3e8d9",
        padding: 10,
        borderRadius: 9999,
        alignItems: "center",
        justifyContent: "center",
    },

    quantityText: {
        fontSize: 18,
        fontWeight: "700",
        color: "#5c4033",
        minWidth: 25,
        textAlign: "center",
    },

    totalPriceText: {
        marginLeft: "auto",
        fontSize: 15,
        fontWeight: "700",
        color: "#6b4f4f",
    },

    buttonContainer: {
        gap: 12,
    },

    primaryBtn: {
        backgroundColor: "#6b4f4f",
        paddingVertical:20,
        paddingHorizontal:32,
        borderRadius: 25,
        alignItems: "center",
    },

    primaryText: {
        color: "#fff",
        fontWeight: "bold",
    },

    secondaryBtn: {
        backgroundColor: "#e6c7b8",
        paddingVertical:20,
        paddingHorizontal:32,
        borderRadius: 25,
        alignItems: "center",
    },

    secondaryText: {
        color: "#5c4033",
        fontWeight: "bold",
    },
    processCard: {
        backgroundColor: "#faf4d6",
        padding: 32,
        borderRadius: 30,
        marginTop: 60,
    },

    processTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#75584e",
        marginBottom: 15,
    },

    processItem: {
        gap:10,
        marginBottom: 15,
    },

    icon: {
        fontSize: 18,
        marginRight: 10,
    },

    processHeading: {
        fontWeight: "700",
        color: "#000",
        marginBottom: 4,
        fontSize:15
    },

    processText: {
        color: "#646040",
        fontSize: 14,
        lineHeight:20
    },

    handcraftedCard: {
        backgroundColor: "#6b4f4f",
        padding: 25,
        borderRadius: 30,
        marginTop: 20,
        alignItems: "center",
    },

    percent: {
        fontSize: 36,
        fontWeight: "bold",
        color: "#fff",
    },

    handcraftedTitle: {
        color: "#ddd",
        letterSpacing: 1,
        marginVertical: 8,
    },

    divider: {
        width: "80%",
        height: 1,
        backgroundColor: "#aaa",
        marginVertical: 10,
    },

    handcraftedText: {
        color: "#eee",
        textAlign: "center",
        fontSize: 13,
        lineHeight: 18,
    },
});