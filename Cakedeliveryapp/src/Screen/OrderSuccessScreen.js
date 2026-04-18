import { SafeAreaView } from "react-native-safe-area-context"
import Simpleheader from "../components/Simpleheader"
import { StatusBar, View, StyleSheet, ScrollView, Text, ImageBackground } from "react-native"
import LottieView from "lottie-react-native"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from "../components/Button";
import Oderplacecakecard from "../components/Oderplacecakecard"



const OrderSuccessScreen = ({navigation}) => {
    return (
        <SafeAreaView style={styles.ordersuccesscontainer} >
            <StatusBar backgroundColor="#fff9e6" barStyle="dark-content" />
            <Simpleheader />
            <ScrollView vartical showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }} style={styles.ordersuccessscroll} >
                <View style={styles.successanimation} >
                    <LottieView autoPlay
                        loop={false}
                        style={{ width: 200, height: 200 }} source={require("../images/successful.json")} />
                </View>
                {/* {start order details} */}
                <View style={styles.odersuccessdetalis} >
                    <Text style={styles.maintitle} >Your Order is Placed!</Text>
                    <Text style={styles.secendmaintitle} >Thank you for choosing Cake Haven.Your sweet treats are on the way!</Text>
                    <View style={styles.ordernumber} >
                        <Text style={styles.ordernumbertext} >ORDER NUMBER:#8294</Text>
                    </View>
                </View>
                {/* {end order details} */}

                {/* {start delivery date and time } */}
                <View style={styles.deliverydatetime} >
                    <View style={styles.deliveryicon} >
                        <MaterialCommunityIcons name="truck-delivery" color="#75584e" size={26} />
                    </View>
                    <Text style={styles.expecteddelivery} >Expected Delivery</Text>
                    <Text style={styles.datedelivery} >Tommorrow, Oct 24</Text>
                    <Text style={styles.timedelivery} >10:00 AM - 12:00 PM</Text>
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

                {/* buttons  */}
                <View style={styles.Buttons} >
                    <Button onPress={()=>navigation.navigate("Myorder")}  title="Track Order" />
                    <Button onPress={()=>navigation.navigate("Home")} title="Go Home" />
                </View>
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
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: "red",
        borderRadius: 20,
        backgroundColor: "#f0e9c5"
    },
    ordernumbertext: {
        color: "#646040",
        fontWeight: "bold",
        fontSize: 14
    },
    deliverydatetime: {
        marginTop: 30,
        padding: 25,
        backgroundColor: "#faf4d6",
        gap: 5,
        borderRadius: 30,
    },
    deliveryicon: {
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
    cocoaStage: {
        marginTop: 20,
    },

    heroFrame: {
        height: 180,
        justifyContent: "flex-end",
        padding: 15,
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
    Buttons: {
        marginTop: 25,
        gap: 15,
        marginBottom:25
    },
})