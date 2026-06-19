import { SafeAreaView } from "react-native-safe-area-context"
import Simpleheader from "../components/Simpleheader"
import { StatusBar, View, StyleSheet, ScrollView, Text, ImageBackground, TouchableOpacity, Share, Alert, Linking } from "react-native"
import LottieView from "lottie-react-native"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Button from "../components/Button";
import Oderplacecakecard from "../components/Oderplacecakecard"
import { useState, useEffect } from "react"
import Clipboard from "@react-native-clipboard/clipboard";

const OrderSuccessScreen = ({ navigation }) => {

    const orderNumber = "8294";
    const deliveryDate = "Tomorrow, Oct 24";
    const deliveryTimeStart = "10:00 AM";
    const deliveryTimeEnd = "12:00 PM";

    const [copied, setCopied] = useState(false);
    const [animationFinished, setAnimationFinished] = useState(false);

    // Simple countdown demo (assuming delivery is ~18 hours away)
    const [timeLeft, setTimeLeft] = useState({ hours: 18, minutes: 32 });

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft((prev) => {
                let { hours, minutes } = prev;
                if (minutes === 0) {
                    if (hours === 0) {
                        clearInterval(interval);
                        return prev;
                    }
                    hours -= 1;
                    minutes = 59;
                } else {
                    minutes -= 1;
                }
                return { hours, minutes };
            });
        }, 60000); // updates every minute

        return () => clearInterval(interval);
    }, []);

    const handleCopyOrderNumber = () => {
        Clipboard.setString(`#${orderNumber}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleShareOrder = async () => {
        try {
            await Share.share({
                message: `I just ordered a Signature Truffle Torte from Cake Haven! 🎂\nOrder #${orderNumber}\nExpected Delivery: ${deliveryDate}, ${deliveryTimeStart} - ${deliveryTimeEnd}`,
            });
        } catch (error) {
            Alert.alert("Error", "Unable to share order details right now.");
        }
    };

    const handleContactSupport = () => {
        Alert.alert(
            "Contact Support",
            "How would you like to reach us?",
            [
                {
                    text: "Call Us",
                    onPress: () => Linking.openURL("tel:+1234567890")
                },
                {
                    text: "WhatsApp Chat",
                    onPress: () => Linking.openURL("https://wa.me/1234567890")
                },
                { text: "Cancel", style: "cancel" }
            ]
        );
    };

    return (
        <SafeAreaView style={styles.ordersuccesscontainer} >
            <StatusBar backgroundColor="#fff9e6" barStyle="dark-content" />
            <Simpleheader />
            <ScrollView vartical showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }} style={styles.ordersuccessscroll} >
                <View style={styles.successanimation} >
                    <LottieView
                        autoPlay
                        loop={false}
                        onAnimationFinish={() => setAnimationFinished(true)}
                        style={{ width: 200, height: 200 }}
                        source={require("../images/successful.json")}
                    />
                </View>
                {/* {start order details} */}
                <View style={styles.odersuccessdetalis} >
                    <Text style={styles.maintitle} >Your Order is Placed!</Text>
                    <Text style={styles.secendmaintitle} >Thank you for choosing Cake Haven.Your sweet treats are on the way!</Text>

                    <TouchableOpacity onPress={handleCopyOrderNumber} activeOpacity={0.7} style={styles.ordernumber} >
                        <Text style={styles.ordernumbertext} >
                            {copied ? "COPIED ✓" : `ORDER NUMBER: #${orderNumber}`}
                        </Text>
                        {!copied && (
                            <Ionicons name="copy-outline" size={14} color="#646040" style={{ marginLeft: 6 }} />
                        )}
                    </TouchableOpacity>
                </View>
                {/* {end order details} */}

                {/* {start delivery date and time } */}
                <View style={styles.deliverydatetime} >
                    <View style={styles.deliveryicon} >
                        <MaterialCommunityIcons name="truck-delivery" color="#75584e" size={26} />
                    </View>
                    <Text style={styles.expecteddelivery} >Expected Delivery</Text>
                    <Text style={styles.datedelivery} >{deliveryDate}</Text>
                    <Text style={styles.timedelivery} >{deliveryTimeStart} - {deliveryTimeEnd}</Text>

                    {/* Countdown */}
                    <View style={styles.countdownRow}>
                        <Ionicons name="time-outline" size={16} color="#8b7d6b" />
                        <Text style={styles.countdownText}>
                            Arriving in {timeLeft.hours}h {timeLeft.minutes}m
                        </Text>
                    </View>
                </View>
                {/* {end delivery date and time} */}

                <View style={styles.cocoaStage}>

                    <ImageBackground
                        source={require("../images/cakeimage.jpeg")}
                        style={styles.heroFrame}
                        imageStyle={styles.roundMask}
                    >

                        {/* Overlay Content */}
                        <View style={styles.overlayNest}>

                            {/* Badge */}
                            <View style={styles.badgeChip}>
                                <Text style={styles.badgeLabel}>ORDER HIGHLIGHT</Text>
                            </View>

                            {/* Title */}
                            <Text style={styles.heroText}>
                                Signature Truffle Torte
                            </Text>

                        </View>

                    </ImageBackground>

                </View>

                {/* Share & Support Row */}
                <View style={styles.quickActionsRow}>
                    <TouchableOpacity style={styles.quickActionBtn} onPress={handleShareOrder} activeOpacity={0.7}>
                        <Ionicons name="share-social-outline" size={20} color="#6b4f4f" />
                        <Text style={styles.quickActionText}>Share Order</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.quickActionBtn} onPress={handleContactSupport} activeOpacity={0.7}>
                        <Ionicons name="headset-outline" size={20} color="#6b4f4f" />
                        <Text style={styles.quickActionText}>Contact Support</Text>
                    </TouchableOpacity>
                </View>

                {/* buttons  */}
                <View style={styles.Buttons} >
                    <Button onPress={() => navigation.navigate("Myorder")} title="Track Order" />
                    <Button onPress={() => navigation.navigate("Home")} title="Go Home" />
                </View>

                <Text style={styles.recommendTitle}>You might also like</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}  >
                    <Oderplacecakecard />
                    <Oderplacecakecard />
                    <Oderplacecakecard />
                    <Oderplacecakecard />
                    <Oderplacecakecard />
                </ScrollView>
            </ScrollView>
        </SafeAreaView>
    )
}

export default OrderSuccessScreen

const styles = StyleSheet.create({
    ordersuccesscontainer: {
        flex: 1,
        backgroundColor: "#fef6e4"
    },
    ordersuccessscroll: {
        flex: 1,
        paddingHorizontal: 20
    },
    successanimation: {
        justifyContent: "center",
        alignItems: "center"
    },
    odersuccessdetalis: {
        justifyContent: "center",
        alignItems: "center"
    },
    maintitle: {
        fontSize: 32,
        fontWeight: 800,
        color: "#75584e",
        marginBottom: 10
    },
    secendmaintitle: {
        fontSize: 18,
        textAlign: "center",
        color: "#646040",
        fontWeight: 500,
        marginBottom: 10
    },
    ordernumber: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 12,
        backgroundColor: "#FFF5D9",
        borderRadius: 50,
        borderWidth: 1,
        borderColor: "#EED9A3"
    },
    ordernumbertext: {
        color: "#646040",
        fontWeight: "bold",
        fontSize: 14
    },
    deliverydatetime: {
        marginTop: 30,
        padding: 24,
        backgroundColor: "#ffffff",
        borderRadius: 30,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.06,
        shadowRadius: 10,
        elevation: 4,
    },
    deliveryicon: {
        width: 55,
        height: 55,
        borderRadius: 28,
        backgroundColor: "#FFF2EA",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 16,
    },
    expecteddelivery: {
        fontSize: 18,
        color: "#75584e",
        fontWeight: 700
    },
    datedelivery: {
        color: "#646040",
        fontSize: 14,
        fontWeight: 500
    },
    timedelivery: {
        marginTop: 16,
        fontWeight: 700,
        color: "#75584e",
        fontSize: 16
    },
    countdownRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        marginTop: 14,
        backgroundColor: "#f7f2e8",
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 20,
        alignSelf: "flex-start",
    },
    countdownText: {
        fontSize: 12,
        color: "#8b7d6b",
        fontWeight: "600",
    },
    cocoaStage: {
        marginTop: 20,
    },

    heroFrame: {
        height: 240,
        justifyContent: "flex-end",
        padding: 20,
    },
    roundMask: {
        borderRadius: 25,
    },

    overlayNest: {
        gap: 8,
    },

    badgeChip: {
        backgroundColor: "#e6a9bb",
        alignSelf: "flex-start",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 6,
    },

    badgeLabel: {
        fontSize: 10,
        fontWeight: "600",
        color: "#5c4033",
    },

    heroText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#fff",
    },
    quickActionsRow: {
        flexDirection: "row",
        gap: 12,
        marginTop: 20,
    },
    quickActionBtn: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        backgroundColor: "#fff",
        paddingVertical: 14,
        borderRadius: 20,

        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 3,
    },
    quickActionText: {
        fontSize: 13,
        fontWeight: "600",
        color: "#6b4f4f",
    },
    Buttons: {
        marginTop: 25,
        gap: 15,
        marginBottom: 25
    },
    recommendTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#75584e",
        marginBottom: 15,
    },
})