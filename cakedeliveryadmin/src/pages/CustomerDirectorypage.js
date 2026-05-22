import Adminheader from "../components/Adminheader"
import { SafeAreaView } from "react-native-safe-area-context"
import { StatusBar, ScrollView, View, StyleSheet, Text, TouchableOpacity, Image } from "react-native"
import Search from "../components/Search"

const dashboardCardData = [
    {
        id: 1,
        title: "TOTAL PATRONS",
        count: "1,284",
    },

    {
        id: 2,
        title: "ACTIVE NOW",
        count: "412",
    },
];

const filterCategoryData = [
    {
        id: 1,
        title: "All",
    },

    {
        id: 2,
        title: "Gold Tier",
    },

    {
        id: 3,
        title: "Recent Activity",
    },
    {
        id: 4,
        title: "VIP Members",
    },
    {
        id: 5,
        title: "Top Customers",
    },
];

const customerCardData = [
    {
        id: 1,
        customerName: "Eloise Beaumont",
        totalOrders: "24 Total Orders",
        membership: "GOLD TIER",
        status: "Active",
        image: require("../images/catalog.png"),
    },

    {
        id: 2,
        customerName: "Julian Lefebvre",
        totalOrders: "12 Total Orders",
        membership: "SILVER TIER",
        status: "Inactive",
        image: require("../images/catalog.png"),
    },

    {
        id: 3,
        customerName: "Clara Hollister",
        totalOrders: "31 Total Orders",
        membership: "GOLD TIER",
        status: "Active",
        image: require("../images/catalog.png"),
    },

    {
        id: 4,
        customerName: "Marcus Vance",
        totalOrders: "5 Total Orders",
        membership: "BRONZE TIER",
        status: "Active",
        image: require("../images/catalog.png"),
    },
];


const CustomerDirectorypage = () => {
    return (
        <SafeAreaView style={CustomerDirectorystyle.CustomerDirectorycontainer} >
            <StatusBar backgroundColor="#fff9e6" barStyle="dark-content" />
            <Adminheader />
            <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 16 }} >
                <Text style={CustomerDirectorystyle.headingText}>
                    Customer{" "}

                    <Text style={CustomerDirectorystyle.highlightText}>
                        Directory
                    </Text>
                </Text>
                <View style={CustomerDirectorystyle.customercountcardcontainer} >
                    {
                        dashboardCardData.map((item) => (
                            <View key={item.id} style={CustomerDirectorystyle.customercountcard} >
                                <Text style={CustomerDirectorystyle.analyticsTitle} >{item.title}</Text>
                                <Text style={CustomerDirectorystyle.analyticsCount} >{item.count}</Text>
                            </View>
                        ))
                    }
                </View>
                <Search placeholder="Find a customer..." />

                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={CustomerDirectorystyle.filterbuttons} >
                    {
                        filterCategoryData.map((item) => (
                            <TouchableOpacity key={item.id} style={CustomerDirectorystyle.filterButton}>

                                <Text style={CustomerDirectorystyle.filterButtonText}>
                                    {item.title}
                                </Text>

                            </TouchableOpacity>
                        ))
                    }
                </ScrollView>

                <View style={CustomerDirectorystyle.bestcustomersection} >
                    {
                        customerCardData.map((item) => (
                            <View key={item.id} style={CustomerDirectorystyle.profileCardContainer}>

                                <View style={CustomerDirectorystyle.profileLeftArea}>

                                    <View style={CustomerDirectorystyle.profileImageBox}>
                                        <Image
                                            source={item.image}
                                            style={CustomerDirectorystyle.profileImageStyle}
                                        />

                                        <View style={CustomerDirectorystyle.activeIndicatorDot} />
                                    </View>

                                    <View>

                                        <Text style={CustomerDirectorystyle.profileUserName}>
                                            {item.customerName}
                                        </Text>

                                        <Text style={CustomerDirectorystyle.profileOrderInfo}>
                                            {item.totalOrders}
                                        </Text>

                                    </View>

                                </View>

                                <View style={CustomerDirectorystyle.profileRightArea}>

                                    <View style={CustomerDirectorystyle.membershipBadgeBox}>
                                        <Text style={CustomerDirectorystyle.membershipBadgeText}>
                                           {item.membership}
                                        </Text>
                                    </View>

                                    <Text style={CustomerDirectorystyle.profileStatusText}>
                                        {item.status}
                                    </Text>

                                </View>

                            </View>
                        ))
                    }
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

export default CustomerDirectorypage

const CustomerDirectorystyle = StyleSheet.create({

    CustomerDirectorycontainer: {
        flex: 1,
        backgroundColor: "#fff9e6"
    },
    customercountcardcontainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 30
    },
    customercountcard: {
        width: 150,
        height: 90,
        backgroundColor: "#f6cfc280",
        borderRadius: 24,
        paddingHorizontal: 20,
        paddingVertical: 14,
        justifyContent: "center",
    },
    analyticsTitle: {
        fontSize: 12,
        fontWeight: "700",
        color: "#75584e",
        letterSpacing: 1,
        marginBottom: 4,
        lineHeight: 16
    },
    analyticsCount: {
        fontSize: 22,
        fontWeight: "900",
        color: "#5f453b",
    },
    headingText: {
        fontSize: 36,
        fontWeight: "800",
        color: "#2F241D",
        marginBottom: 24
    },
    highlightText: {
        color: "#8B6B61",
        fontStyle: "italic",
    },
    filterButton: {
        paddingHorizontal: 22,
        paddingVertical: 12,
        backgroundColor: "#EEE7C7",
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
    },
    filterButtonText: {
        fontSize: 16,
        fontWeight: "700",
        color: "#8A7742",
    },
    filterbuttons: {
        flexDirection: "row",
        marginTop: 15,
        gap: 10,
        marginBottom: 15
    },
    bestcustomersection: {
        marginTop: 5,
        gap:15
    },
    profileCardContainer: {
        width: "100%",
        backgroundColor: "#F6F3EE",
        borderRadius: 26,
        padding: 18,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#DDD4CC",
    },

    profileLeftArea: {
        flexDirection: "row",
        alignItems: "center",
    },

    profileImageBox: {
        position: "relative",
        marginRight: 14,
    },

    profileImageStyle: {
        width: 58,
        height: 58,
        borderRadius: 29,
    },

    activeIndicatorDot: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: "#34C759",
        position: "absolute",
        right: 0,
        bottom: 2,
        borderWidth: 2,
        borderColor: "#FFFFFF",
    },

    profileUserName: {
        fontSize: 18,
        fontWeight: "700",
        color: "#2E221B",
        lineHeight: 24,
    },

    profileOrderInfo: {
        fontSize: 14,
        color: "#7D7269",
        marginTop: 2,
    },

    profileRightArea: {
        alignItems: "flex-end",
    },

    membershipBadgeBox: {
        backgroundColor: "#F5BCD0",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        marginBottom: 8,
    },

    membershipBadgeText: {
        fontSize: 11,
        fontWeight: "700",
        color: "#7B4E5D",
    },

    profileStatusText: {
        fontSize: 16,
        fontWeight: "700",
        color: "#4A352C",
    },

})