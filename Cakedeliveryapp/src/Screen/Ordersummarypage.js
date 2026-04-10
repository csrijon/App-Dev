import Simpleheader from "../components/Simpleheader"
import { StatusBar, ScrollView, StyleSheet, View, Text, Image, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import Ionicons from "react-native-vector-icons/Ionicons";
import Button from "../components/Button";

const Ordersummarypage = () => {
    return (
        <SafeAreaView style={styles.Ordersummarypagecontainer} >
            <StatusBar backgroundColor="#fff9e6" barStyle="dark-content" />
            <Simpleheader />
            <ScrollView contentContainerStyle={{ paddingBottom: 40 }} vartical showsVerticalScrollIndicator={false} style={styles.summaryscrollcontainer} >
                {/* {section start} */}
                <View style={styles.saffronStage}>

                    {/* Header */}
                    <Text style={styles.microLabel}>Order Summary</Text>
                    <Text style={styles.heroLine}>Review your sweet selection</Text>

                    {/* Card */}
                    <View style={styles.creamPanel}>

                        {/* Cake Image */}
                        <Image
                            source={require("../images/cakeimage.jpeg")}
                            style={styles.heroCake}
                        />

                        {/* Content */}
                        <View style={styles.copyWrap}>

                            <View style={styles.rowHead}>
                                <Text style={styles.cakeTitle}>Velvet Chocolate Ganache</Text>

                                <View style={styles.badgeCapsule}>
                                    <Text style={styles.badgeText}>BEST SELLER</Text>
                                </View>
                            </View>

                            <Text style={styles.cakeDesc}>
                                Rich 70% dark chocolate layers with whipped truffle filling and smooth ganache finish.
                            </Text>

                            {/* Bottom Info */}
                            <View style={styles.metaRow}>

                                <View>
                                    <Text style={styles.metaLabel}>WEIGHT</Text>
                                    <Text style={styles.metaValue}>1.5 KG</Text>
                                </View>

                                <View>
                                    <Text style={styles.metaLabel}>FLAVOR</Text>
                                    <Text style={styles.metaValue}>Dark Chocolate</Text>
                                </View>

                            </View>

                        </View>
                    </View>

                </View>
                {/* {section end } */}
                <View style={styles.almondStage}>

                    {/* Personal Message */}
                    <View style={styles.butterBlock}>
                        <View style={styles.rowLine}>
                            <Ionicons name="list-outline" size={18} color="#6b4f4f" />
                            <Text style={styles.blockTitle}>Personal Message</Text>
                        </View>

                        <View style={styles.creamBubble}>
                            <Text style={styles.messageText}>
                                "Happy 30th Birthday Sarah! Here's to many more sweet adventures together. Love, Mark."
                            </Text>
                        </View>
                    </View>

                    {/* Delivery Slot */}
                    <View style={styles.butterBlock}>
                        <View style={styles.rowLine}>
                            <Ionicons name="time-outline" size={18} color="#6b4f4f" />
                            <Text style={styles.blockTitle}>Delivery Slot</Text>
                        </View>

                        <Text style={styles.boldLine}>Tuesday, Oct 24</Text>
                        <Text style={styles.subLine}>Between 2:00 PM - 4:00 PM</Text>
                    </View>

                    {/* Delivery Address */}
                    <View style={styles.butterBlock}>

                        <View style={styles.rowBetween}>
                            <View style={styles.rowLine}>
                                <Ionicons name="location-outline" size={18} color="#6b4f4f" />
                                <Text style={styles.blockTitle}>Delivery Address</Text>
                            </View>

                            <TouchableOpacity>
                                <Text style={styles.changeBtn}>CHANGE</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.addressRow}>
                            <Ionicons name="home-outline" size={18} color="#6b4f4f" />

                            <View style={{ marginLeft: 10 }}>
                                <Text style={styles.boldLine}>Home</Text>
                                <Text style={styles.subLine}>
                                    124 Baker Street, West Wing Apartments{"\n"}
                                    Suite 4B, London, NW1 6XE
                                </Text>
                            </View>
                        </View>

                    </View>

                </View>

                {/* {start billing card} */}

                <View style={styles.billingcard} >
                    <Text style={styles.billingdetalis} >Billing Details</Text>
                    <View style={styles.row} >
                        <Text style={styles.normaltext} >Velvet Chocolate(1.5kg)</Text>
                        <Text style={styles.normaltext} >$50</Text>
                    </View>

                    <View style={styles.row} >
                        <Text style={styles.normaltext} >Premium Packaging</Text>
                        <Text style={styles.normaltext} >Included</Text>
                    </View>

                    <View style={styles.row} >
                        <Text style={styles.normaltext} >Hand-delivered Shipping</Text>
                        <Text style={styles.normaltext} >$80</Text>
                    </View>

                    <View style={styles.row} >
                        <Text style={styles.normaltext} >VAT(20%)</Text>
                        <Text style={styles.normaltext} >$100</Text>
                    </View>

                    <View style={[styles.row, styles.totalammount]} >
                        <Text style={styles.totalammounttext} >Total Amount</Text>
                        <Text style={styles.totalammountrupy} >$700</Text>
                    </View>

                    <View>
                        <Button title="Proceed to Payment" />
                    </View>
                </View>

                {/* {end billing card} */}

            </ScrollView>
        </SafeAreaView>
    )
}

export default Ordersummarypage

const styles = StyleSheet.create({
    Ordersummarypagecontainer: {
        flex: 1,
        backgroundColor: "#fdf7e4"
    },
    summaryscrollcontainer: {
        padding: 20,
        flex: 1
    },
    saffronStage: {
        // padding: 20,
    },

    microLabel: {
        fontSize: 14,
        color: "#75584e",
        fontWeight: "800",
        letterSpacing: 1
    },

    heroLine: {
        fontSize: 14,
        color: "#8b7d6b",
        marginBottom: 20,
    },

    creamPanel: {
        backgroundColor: "#f8f4ee",
        borderRadius: 30,
        padding: 15,
        overflow: "hidden",
    },

    heroCake: {
        width: "100%",
        height: 200,
        borderRadius: 20,
        marginBottom: 15,
    },

    copyWrap: {
        paddingHorizontal: 5,
    },

    rowHead: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    cakeTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#5c4033",
        flex: 1,
    },

    badgeCapsule: {
        backgroundColor: "#e7b6c7",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 10,
    },

    badgeText: {
        fontSize: 10,
        fontWeight: "600",
        color: "#5c4033",
    },

    cakeDesc: {
        fontSize: 12,
        color: "#6e5a4f",
        marginVertical: 10,
        lineHeight: 18,
    },

    metaRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },

    metaLabel: {
        fontSize: 10,
        color: "#8b7d6b",
    },

    metaValue: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#5c4033",
    },
    almondStage: {
        marginTop: 20
    },

    butterBlock: {
        backgroundColor: "#f0e9c5",
        borderRadius: 25,
        padding: 16,
        marginBottom: 15,
    },

    rowLine: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
        gap: 8,
    },

    rowBetween: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },

    blockTitle: {
        fontSize: 14,
        fontWeight: "700",
        color: "#75584e",
    },

    creamBubble: {
        backgroundColor: "#f2f2f2",
        borderRadius: 20,
        padding: 15,
    },

    messageText: {
        fontSize: 13,
        color: "#6e5a4f",
        fontStyle: "italic",
    },

    boldLine: {
        fontSize: 15,
        fontWeight: "bold",
        color: "#5c4033",
    },

    subLine: {
        fontSize: 13,
        color: "#7a6a58",
        marginTop: 3,
    },

    changeBtn: {
        fontSize: 12,
        color: "#8b7d6b",
        fontWeight: "600",
        letterSpacing: 1,
    },

    addressRow: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginTop: 5,
    },
    billingcard: {
        padding: 20,
        backgroundColor: "red",
        borderRadius: 22,
        gap: 10,
        backgroundColor: "#f0e9c5"
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    billingdetalis: {
        marginBottom: 20,
        fontSize: 18,
        fontWeight: 700,
        color: "#75584e"
    },
    totalammount: {
        marginTop: 20,
        marginBottom: 10
    },
    totalammounttext: {
        fontSize: 18,
        fontWeight: 700
    },
    totalammountrupy: {
        fontSize: 24,
        fontWeight: 800,
        color: "#75584e"
    },
    normaltext: {
        fontSize: 14,
        color: "#646040"
    }
})