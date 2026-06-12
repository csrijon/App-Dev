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
        icon: <MaterialCommunityIcons name="chart-line-variant" color="#000" size={24} />
    },

    {
        id: 2,
        title: "ACTIVE ORDERS",
        value: "$12",
        subtitle: "Next delivery in 45m",
        bgColor: "#f4dce4",
        icon: <Ionicons name="time-outline" color="#000" size={24} />
    },

    {
        id: 3,
        title: "PENDING REVIEWS",
        value: "$4",
        subtitle: "4.9 avg rating",
        bgColor: "#f8bbd0",
        icon: <Ionicons name="star-outline" color="#000" size={24} />
    },
];


const Dashboardpage = ({ navigation }) => {
    return (
        <SafeAreaView style={Dashboardstyle.Dashboardcontainer} >
            <StatusBar backgroundColor="#fff9e6cc" barStyle="dark-content" />
            <Adminheader />
            <ScrollView Vertical contentContainerStyle={{ paddingHorizontal: 24, marginTop: 20, paddingBottom: 40 }} >
                <View style={Dashboardstyle.headingtext} >
                    <Text style={[Dashboardstyle.headingtitle, Dashboardstyle.blod]} >Srijon,Chef</Text>
                    <Text style={Dashboardstyle.headingparagraph} >Your artisanal gallery is bustling today.Here is the morning's oversight for your confectionary empire</Text>
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
                                    <Text style={Dashboardstyle.heading}>
                                        {item.title}
                                    </Text>

                                    <Text style={Dashboardstyle.amount}>
                                        {item.value}
                                    </Text>
                                </View>

                                <View style={Dashboardstyle.bottomSection}>
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
        gap: 10
    },
    headingtitle: {
        fontSize: 18,
        color: "black",
    },
    blod: {
        fontWeight: "700",
    },
    headingparagraph: {
        color: "#646040",
        fontSize: 16,
        letterSpacing: 0.5
    },
    buttonsection: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 20,
        marginTop: 20,
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
        marginTop: 25,
        gap: 20
    },

    card: {
        width: "100%",
        height: 180,
        backgroundColor: "#faf4d6",
        borderRadius: 35,
        paddingHorizontal: 26,
        paddingVertical: 26,
        justifyContent: "space-between",
        borderRadius: 42
    },
    topSection: {
        gap: 10,
    },
    heading: {
        fontSize: 15,
        fontWeight: "700",
        color: "#646040",
        letterSpacing: 1,
    },
    amount: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#5D4B42",
    },
    bottomSection: {
        flexDirection: "row",
        alignItems: "center",
    },
    subtitle: {
        fontSize: 15,
        color: "#6B5A50",
        fontWeight: "600",
    },

})