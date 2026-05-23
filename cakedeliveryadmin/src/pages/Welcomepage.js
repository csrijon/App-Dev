import React from "react";
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    StatusBar,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

const Welcomepage = ({navigation}) => {
    return (
        <SafeAreaView style={styles.mainContainer}>
            <StatusBar
                backgroundColor="#EFE8D8"
                barStyle="dark-content"
            />

            <ImageBackground
                source={{
                    uri: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=1200&auto=format&fit=crop",
                }}
                style={styles.topImageSection}
                imageStyle={styles.topImageStyle}
            >
                <View style={styles.smallBadge}>
                    <Text style={styles.badgeSmallText}>ARTISANAL</Text>
                    <Text style={styles.badgeSmallText}>EST. 2024</Text>
                </View>
            </ImageBackground>

            <View style={styles.lowerSection}>
                <View style={styles.diagonalBackground} />

                <Text style={styles.firstTitle}>Glaze</Text>

                <View style={styles.centerLineWrapper}>
                    <View style={styles.horizontalLine} />

                    <Text style={styles.middleSymbol}>
                        &
                    </Text>

                    <View style={styles.horizontalLine} />
                </View>

                <Text style={styles.secondTitle}>Grain</Text>

                <Text style={styles.descriptionText}>
                    THE CONFECTIONER'S{"\n"}GALLERY
                </Text>

                <TouchableOpacity onPress={()=>navigation.navigate("Signup")} style={styles.actionButton}>
                    <Text style={styles.actionButtonText}>
                        GET STARTED
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default Welcomepage;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: "#EFE8D8",
    },

    topImageSection: {
        height: "67%",
        width: "100%",
    },

    topImageStyle: {
        borderBottomRightRadius: 40,
        overflow: "hidden"
    },

    smallBadge: {
        width: 62,
        height: 62,
        borderRadius: 50,
        backgroundColor: "#C58EA8",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 35,
        marginLeft: 28,
    },

    badgeSmallText: {
        color: "#fff",
        fontSize: 7,
        fontWeight: "700",
        lineHeight: 12,
    },

    lowerSection: {
        flex: 1,
        backgroundColor: "#EFE8D8",
        marginTop: -200,
        paddingHorizontal: 30,
        position: "relative",
        alignItems: "center",
    },

    diagonalBackground: {
        position: "absolute",
        top: -60,
        left: -20,
        width: "130%",
        height: 140,
        backgroundColor: "#EFE8D8",
        transform: [{ rotate: "-9deg" }],
    },

    firstTitle: {
        alignSelf: "flex-start",
        fontSize: 64,
        color: "#7B5B4E",
        fontWeight: "200",
        marginTop: 48,
        zIndex: 10,
    },

    centerLineWrapper: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: -10,
        zIndex: 10,
    },

    horizontalLine: {
        width: 105,
        height: 1,
        backgroundColor: "#D8CCBF",
    },

    middleSymbol: {
        fontSize: 34,
        color: "#B08D7C",
        marginHorizontal: 15,
        fontWeight: "300",
    },

    secondTitle: {
        alignSelf: "flex-end",
        fontSize: 58,
        color: "#7B5B4E",
        fontWeight: "200",
        marginTop: -12,
        zIndex: 10,
    },

    descriptionText: {
        textAlign: "center",
        marginTop: 26,
        color: "#9E8675",
        fontSize: 15,
        letterSpacing: 5,
        lineHeight: 28,
    },

    actionButton: {
        width: "100%",
        height: 58,
        borderRadius: 40,
        backgroundColor: "#8C6B5F",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 42,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },

        shadowOpacity: 0.12,
        shadowRadius: 12,
        elevation: 7,
    },

    actionButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
        letterSpacing: 3,
    },
});