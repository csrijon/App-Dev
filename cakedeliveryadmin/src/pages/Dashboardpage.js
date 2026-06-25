import { SafeAreaView } from "react-native-safe-area-context"
import { StatusBar, ScrollView, View, Text, StyleSheet, Alert } from "react-native"
import Adminheader from "../components/Adminheader"
import Dashboardbutton from "../components/Dashboardbutton"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AnalyticsCard from "../components/AnalyticsCard"
import RecentOrders from "../components/RecentOrders"
import BakingCard from "../components/BakingCard"
import Footer from "../components/Footer"

const dashboardData = [
    {
        id: 1,
        title: "TOTAL REVENUE",
        value: "$4,850.00",
        subtitle: "+12.5% vs last week",
        bgColor: "#ECE4C8",
        iconBg: "#DCD0A0",
        icon: <MaterialCommunityIcons name="chart-line-variant" color="#5D4B2E" size={22} />
    },

    {
        id: 2,
        title: "ACTIVE ORDERS",
        value: "$12",
        subtitle: "Next delivery in 45m",
        bgColor: "#f4dce4",
        iconBg: "#E8BFCC",
        icon: <Ionicons name="time-outline" color="#7A3B4E" size={22} />
    },

    {
        id: 3,
        title: "PENDING REVIEWS",
        value: "$4",
        subtitle: "4.9 avg rating",
        bgColor: "#f8bbd0",
        iconBg: "#F09FB8",
        icon: <Ionicons name="star-outline" color="#7A2E45" size={22} />
    },
];


const Dashboardpage = ({ navigation }) => {
    return (
        <SafeAreaView style={Dashboardstyle.Dashboardcontainer} >
            <StatusBar backgroundColor="#fff9e6cc" barStyle="dark-content" />
            <Adminheader />
            <ScrollView Vertical contentContainerStyle={{ paddingHorizontal: 24, marginTop: 20, paddingBottom: 40 }} >
                <View style={Dashboardstyle.headingtext} >
                    <Text style={[Dashboardstyle.headingtitle, Dashboardstyle.blod]} >Srijon, Chef</Text>
                    <Text style={Dashboardstyle.headingparagraph} >Your artisanal gallery is bustling today. Here is the morning's oversight for your confectionary empire.</Text>
                </View>
                <View style={Dashboardstyle.buttonsection} >
                    <Dashboardbutton
                        title="Download"
                        name="Reports"
                        onPress={() => {
                            Alert.alert(
                                "Download Completed",
                                "The report has been downloaded successfully."
                            );
                        }}
                    />
                    <Dashboardbutton onPress={() => navigation.navigate("Catalog")} title="New" name="Product" buttonstyle={Dashboardstyle.chococolor} Textstyle={Dashboardstyle.chococolortext} />
                </View>

                {/* {card section start} */}
                <View style={Dashboardstyle.cardbox}>
                    {
                        dashboardData.map((item) => (
                            <View key={item.id} style={[Dashboardstyle.card, { backgroundColor: item.bgColor }]}>

                                <View style={Dashboardstyle.topSection}>
                                    <View style={Dashboardstyle.topRow}>
                                        <Text style={Dashboardstyle.heading}>
                                            {item.title}
                                        </Text>
                                        <View style={[Dashboardstyle.iconBadge, { backgroundColor: item.iconBg }]}>
                                            {item.icon}
                                        </View>
                                    </View>

                                    <Text style={Dashboardstyle.amount}>
                                        {item.value}
                                    </Text>
                                </View>

                                <View style={Dashboardstyle.bottomSection}>
                                    <View style={Dashboardstyle.trendDot} />
                                    <Text style={Dashboardstyle.subtitle}>
                                        {item.subtitle}
                                    </Text>
                                </View>

                            </View>
                        ))
                    }
                </View>
                {/* {Card section end } */}
                <AnalyticsCard />
                <RecentOrders />
                <BakingCard />
                <Footer />
            </ScrollView>
        </SafeAreaView>
    )
}

export default Dashboardpage

const Dashboardstyle = StyleSheet.create({
    Dashboardcontainer: {
        flex: 1,
        backgroundColor: "#fdf7e4",
    },
    headingtext: {
        gap: 8
    },
    headingtitle: {
        fontSize: 22,
        color: "#3D2E22",
        letterSpacing: 0.3,
    },
    blod: {
        fontWeight: "700",
    },
    headingparagraph: {
        color: "#7A6F52",
        fontSize: 15,
        letterSpacing: 0.3,
        lineHeight: 22,
    },
    buttonsection: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 16,
        marginTop: 22,
        width: "100%"
    },
    chococolor: {
        backgroundColor: "#684d43",
    },
    chococolortext: {
        color: "#ffffff"
    },
    cardbox: {
        alignItems: "center",
        marginTop: 28,
        gap: 18
    },

    card: {
        width: "100%",
        height: 175,
        borderRadius: 32,
        paddingHorizontal: 24,
        paddingVertical: 24,
        justifyContent: "space-between",
        shadowColor: "#5D4B2E",
        shadowOpacity: 0.08,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 2,
    },
    topSection: {
        gap: 14,
    },
    topRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    iconBadge: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    heading: {
        fontSize: 13,
        fontWeight: "700",
        color: "#6B5C42",
        letterSpacing: 1.2,
    },
    amount: {
        fontSize: 28,
        fontWeight: "800",
        color: "#3F2F26",
        letterSpacing: 0.3,
    },
    bottomSection: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    trendDot: {
        width: 7,
        height: 7,
        borderRadius: 4,
        backgroundColor: "#4CAF50",
    },
    subtitle: {
        fontSize: 14,
        color: "#6B5A50",
        fontWeight: "600",
    },

})