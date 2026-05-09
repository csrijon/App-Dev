import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import Header from "../components/Header";

const EmptyOrderScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Header name={"Srijon chowdhury"} />
            <ScrollView Vertical contentContainerStyle={styles.mainContainer} >

                <View style={styles.imageContainer}>
                    <Image
                        source={require("../images/james-coleman-5HR1gItc7Gs-unsplash.jpg")}
                        style={styles.image}
                    />
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

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Explore the Gallery</Text>

                    <Ionicons name="arrow-forward" size={20} color="#fff" />
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

    imageContainer: {
        width: "100%",
        height: 400,
        borderTopLeftRadius: 50,
        borderBottomRightRadius: 50,
        overflow: "hidden",
    },

    image: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },

    badge: {
        backgroundColor: "#f4dce4",
        paddingHorizontal: 18,
        paddingVertical: 8,
        borderRadius: 999,
        marginTop: 28,
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
        fontSize: 20,
        color: "#646040",
        marginTop: 20,
        lineHeight: 34,
        paddingHorizontal: 10,
    },

    button: {
        marginTop: 40,
        backgroundColor: "#7D6157",
        width: "100%",
        paddingVertical: 18,
        borderRadius: 999,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
    },

    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
});