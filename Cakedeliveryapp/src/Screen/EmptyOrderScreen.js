import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    RefreshControl,
    ActivityIndicator,
    StatusBar
} from "react-native";
import { useState } from "react";

import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import Header from "../components/Header";

const EmptyOrderScreen = ({ navigation }) => {
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(false);
    const onRefresh = () => {
        setRefreshing(true);

        setTimeout(() => {
            setRefreshing(false);
        }, 1500);
    };
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={"#f8f1df"} barStyle={"dark-content"} />
            <Header name={"Srijon chowdhury"} />
            <ScrollView
                contentContainerStyle={styles.mainContainer}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                <View style={styles.imageContainer}>

                    <Image
                        source={require("../images/james-coleman-5HR1gItc7Gs-unsplash.jpg")}
                        style={styles.image}
                    />

                    <TouchableOpacity
                        style={styles.favoriteBtn}
                    >
                        <Ionicons
                            name="heart-outline"
                            size={24}
                            color="#fff"
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.shareBtn}
                    >
                        <Ionicons
                            name="share-social-outline"
                            size={22}
                            color="#fff"
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.badge}>
                    <Text style={styles.badgeText}>NEW BEGINNINGS</Text>
                </View>

                <Text style={styles.title}>
                    Your Sweet Journey{"\n"}Begins
                </Text>

                <Text style={styles.description}>
                    You haven't placed any orders yet. Once you order your favorite
                    cakes, they'll appear here for quick reordering.
                </Text>

                <View style={styles.statsRow}>

                    <View style={styles.statCard}>
                        <Text style={styles.statNumber}>50+</Text>
                        <Text style={styles.statLabel}>Cakes</Text>
                    </View>

                    <View style={styles.statCard}>
                        <Text style={styles.statNumber}>4.9★</Text>
                        <Text style={styles.statLabel}>Rating</Text>
                    </View>

                    <View style={styles.statCard}>
                        <Text style={styles.statNumber}>24h</Text>
                        <Text style={styles.statLabel}>Delivery</Text>
                    </View>

                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {

                        setLoading(true);

                        setTimeout(() => {

                            setLoading(false);

                            navigation.navigate("Home");

                        }, 1000);

                    }}
                >

                    {
                        loading ?

                            <ActivityIndicator
                                color="#fff"
                            />

                            :

                            <>
                                <Text style={styles.buttonText}>
                                    Explore the Gallery
                                </Text>

                                <Ionicons
                                    name="arrow-forward"
                                    size={20}
                                    color="#fff"
                                />
                            </>

                    }

                </TouchableOpacity>

            </ScrollView>

        </SafeAreaView>
    );
};

export default EmptyOrderScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fdf7e3",
    },

    mainContainer: {
        alignItems: "center",
        paddingHorizontal: 20,
        paddingTop: 25,
        paddingBottom: 40
    },
    statsRow: {
        flexDirection: "row",
        marginTop: 30,
        gap: 15,
    },

    statCard: {
        backgroundColor: "#fff",
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 20,
        alignItems: "center",

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
    },

    statNumber: {
        fontSize: 18,
        fontWeight: "800",
        color: "#75584e",
    },

    statLabel: {
        fontSize: 12,
        color: "#8B7D6B",
        marginTop: 4,
    },
    imageContainer: {
        width: "100%",
        height: 320,
        borderRadius: 35,
        overflow: "hidden",

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.1,
        shadowRadius: 15,
        elevation: 8,
    },

    image: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },

    badge: {
        position: "absolute",
        top: 285,
        backgroundColor: "#FFF5D9",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 50,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 4,
    },

    badgeText: {
        color: "#5e4d54",
        fontSize: 16,
        fontWeight: "500",
    },

    title: {
        fontSize: 32,
        fontWeight: "800",
        color: "#75584e",
        textAlign: "center",
        marginTop: 22,
        lineHeight: 42,
    },
    description: {
        textAlign: "center",
        fontSize: 17,
        color: "#7A6A58",
        marginTop: 18,
        lineHeight: 30,
        maxWidth: 320,
    },
    button: {
        marginTop: 40,
        backgroundColor: "#75584e",
        width: "100%",
        paddingVertical: 18,
        borderRadius: 30,

        shadowColor: "#75584e",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.25,
        shadowRadius: 12,
        elevation: 8,

        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },

    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    favoriteBtn: {
        position: "absolute",
        top: 15,
        right: 15,
        backgroundColor: "rgba(0,0,0,0.4)",
        padding: 10,
        borderRadius: 30
    },
    shareBtn:{
    position:"absolute",
    top:15,
    left:15,
    backgroundColor:"rgba(0,0,0,0.4)",
    padding:10,
    borderRadius:30
},
});