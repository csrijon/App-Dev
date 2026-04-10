import { View, Text, StyleSheet, StatusBar, ScrollView, Image,TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"
import Detailsheader from "../components/Detailsheader";


const CakeDetails = () => {
    return (
        <SafeAreaView style={styles.CakeDetails} >
            <StatusBar backgroundColor="#fff9e6" barStyle="dark-content" />
            <Detailsheader />
            <ScrollView style={styles.scrollViewcakedetails} >
                <View>
                    <View style={styles.cakemaindetails} >
                        <Image source={require("../images/cakeimage.jpeg")} style={styles.cakeImage} />
                        <View style={styles.cakeinfo} >
                            <Text>Starting From</Text>
                            <Text>$850</Text>
                        </View>
                    </View>
                </View>
                <View>
                    <View style={styles.detailsContainer}>

                        {/* Rating */}
                        <View style={styles.ratingRow}>
                            <Text style={styles.rating}>⭐ 4.9</Text>
                            <Text style={styles.review}>(128 Reviews)</Text>
                        </View>

                        {/* Title */}
                        <Text style={styles.title}>The Celestial Peony</Text>

                        {/* Description */}
                        <Text style={styles.description}>
                            A masterpiece of confectionary art, this three-tier wedding cake features layers of Tahitian vanilla bean sponge infused with a delicate rosewater syrup. Hand-sculpted sugar peonies cascade down a smooth Swiss meringue buttercream canvas, accented by 24k gold leaf details.
                        </Text>

                        {/* Chef Card */}
                        <View style={styles.chefCard}>
                            <Image
                                source={require("../images/cakeimage.jpeg")}
                                style={styles.chefImage}
                            />
                            <View style={{ flex: 1 }}>
                                <Text style={styles.chefLabel}>Crafted by</Text>
                                <Text style={styles.chefName}>Master Baker Elena Rossi</Text>
                            </View>
                            <Text style={styles.portfolio}>View Portfolio</Text>
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

                        {/* Buttons */}
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.primaryBtn}>
                                <Text style={styles.primaryText}>Add to Cart</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.secondaryBtn}>
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
                        <Text style={styles.icon}>🕒</Text>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.processHeading}>48–Hour Curing</Text>
                            <Text style={styles.processText}>
                                Each layer is cured to perfection for optimal texture and moisture retention.
                            </Text>
                        </View>
                    </View>

                    {/* Item 2 */}
                    <View style={styles.processItem}>
                        <Text style={styles.icon}>🌿</Text>
                        <View style={{ flex: 1 }}>
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
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.15,
        shadowRadius: 20,
        elevation: 10,
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

    ratingRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
    },
    rating: {
        fontWeight: "bold",
        marginRight: 6,
    },

    review: {
        color: "#777",
    },

    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#5c4033",
        marginBottom: 10,
    },

    description: {
        color: "#6e5a4f",
        lineHeight: 20,
        marginBottom: 20,
    },

    chefCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f3e8d9",
        padding: 12,
        borderRadius: 20,
        marginBottom: 20,
    },

    chefImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },

    chefLabel: {
        fontSize: 12,
        color: "#777",
    },

    chefName: {
        fontWeight: "bold",
    },

    portfolio: {
        color: "#5c4033",
        fontWeight: "500",
    },

    sectionTitle: {
        fontSize: 12,
        letterSpacing: 1,
        color: "#777",
        marginBottom: 10,
    },

    tagsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
        marginBottom: 25,
    },

    tag: {
        backgroundColor: "#e7b6c7",
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 8,
    },

    tagText: {
        fontSize: 12,
        color: "#5c4033",
    },

    buttonContainer: {
        gap: 12,
    },

    primaryBtn: {
        backgroundColor: "#6b4f4f",
        padding: 16,
        borderRadius: 25,
        alignItems: "center",
    },

    primaryText: {
        color: "#fff",
        fontWeight: "bold",
    },

    secondaryBtn: {
        backgroundColor: "#e6c7b8",
        padding: 16,
        borderRadius: 25,
        alignItems: "center",
    },

    secondaryText: {
        color: "#5c4033",
        fontWeight: "bold",
    },
    processCard: {
    backgroundColor: "#e8dec2",
    padding: 20,
    borderRadius: 30,
    marginTop: 60,
},

processTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#5c4033",
    marginBottom: 15,
},

processItem: {
    flexDirection: "row",
    marginBottom: 15,
},

icon: {
    fontSize: 18,
    marginRight: 10,
},

processHeading: {
    fontWeight: "bold",
    color: "#5c4033",
    marginBottom: 4,
},

processText: {
    color: "#6e5a4f",
    fontSize: 13,
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