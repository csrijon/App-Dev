import { SafeAreaView } from "react-native-safe-area-context"
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native"
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import BakeryHeader from "../components/BakeryHeader"

const Onboradingcompletepage = ({navigation}) => {

    return (
        <SafeAreaView style={styles.Onboradingcompletepage}>
            <BakeryHeader />

            <View style={styles.topsectioncomplete}>
                <View style={styles.imageWrapper}>
                    <Image style={styles.Image} source={require("../images/unnamed.png")} />
                    <View style={styles.verifysection}>
                        <MaterialIcons name="verified" color="#5b4138" size={20} />
                        <Text style={styles.verifyText}>ACTIVE NOW</Text>
                    </View>
                </View>

                <Text style={styles.title}>You're All Set!</Text>
                <Text style={styles.subtitle}>
                    Your account has been created successfully.{"\n"}Time to explore fresh bakes near you.
                </Text>
            </View>

            <View style={styles.bottomsection}>
                <TouchableOpacity
                    style={styles.homeButton}
                    activeOpacity={0.85}
                    onPress={() => navigation.navigate("TabScreens")}
                >
                    <Text style={styles.homeButtonText}>Go to Home</Text>
                    <MaterialIcons name="arrow-forward" color="#ffffff" size={20} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default Onboradingcompletepage

const styles = StyleSheet.create({
    Onboradingcompletepage: {
        flex: 1,
        backgroundColor: "#f7ebe4"
    },
    topsectioncomplete: {
        flex: 1,
        alignItems: "center",
        marginTop: 40,
        paddingHorizontal: 30
    },
    imageWrapper: {
        alignItems: "center",
        marginBottom: 60
    },
    Image: {
        width: 216,
        height: 216,
        borderRadius: 999,
        resizeMode: "cover",
        borderWidth: 4,
        borderColor: "#ffffff",
        shadowColor: "#5b4138",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 6
    },
    verifysection: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        backgroundColor: "#ffffff",
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 999,
        position: "absolute",
        bottom: -14,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 4
    },
    verifyText: {
        color: "#5b4138",
        fontWeight: "700",
        fontSize: 12,
        letterSpacing: 0.5
    },
    title: {
        fontSize: 24,
        fontWeight: "800",
        color: "#3d2b23",
        marginBottom: 10,
        textAlign: "center"
    },
    subtitle: {
        fontSize: 14,
        color: "#8a7267",
        textAlign: "center",
        lineHeight: 20
    },
    bottomsection: {
        paddingHorizontal: 30,
        paddingBottom: 30
    },
    homeButton: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
        backgroundColor: "#5b4138",
        paddingVertical: 16,
        borderRadius: 999,
        shadowColor: "#5b4138",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5
    },
    homeButtonText: {
        color: "#ffffff",
        fontSize: 16,
        fontWeight: "700"
    }
})