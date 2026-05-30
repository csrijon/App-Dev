import { SafeAreaView } from "react-native-safe-area-context"
import Securityheader from "../components/Securityheader"
import { StyleSheet, View, ScrollView, Text, TouchableOpacity } from "react-native"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const categories = [
    {
        id: 1,
        title: "All"
    },
    {
        id: 2,
        title: "Orders"
    },
    {
        id: 3,
        title: "Inventory"
    },
    {
        id: 4,
        title: "Accounts"
    },
    {
        id: 5,
        title: "Customers"
    },
];

const Notificationpage = () => {
    return (
        <SafeAreaView style={styles.notificationpagecontainer} >
            <Securityheader title={"Baker Notifications"} />
            <View style={{ marginTop: 10 }} >
                <ScrollView showsHorizontalScrollIndicator={false} horizontal contentContainerStyle={{
                    flexGrow: 0
                }} >
                    <View style={styles.tabbarsection} >
                        {
                            categories.map((item) => (
                                <TouchableOpacity activeOpacity={0.9} key={item.id} style={styles.tab}>
                                    <Text style={styles.tabText}>
                                        {item.title}
                                    </Text>
                                </TouchableOpacity>
                            ))
                        }
                    </View>
                </ScrollView>

                <View style={styles.notificationCard}>
                    <View style={styles.iconContainer}>
                        <Text style={styles.icon}><MaterialCommunityIcons name="clipboard-text-outline" color="#000" size={24} /></Text>
                    </View>

                    <View style={styles.content}>
                        <View style={styles.headerRow}>
                            <Text style={styles.title}>
                                New Order #8821
                            </Text>

                            <Text style={styles.time}>
                                Just now
                            </Text>
                        </View>

                        <Text style={styles.description}>
                            Classic Almond Croissants (x6)
                        </Text>

                        <Text style={styles.description}>
                            ready for prep.
                        </Text>
                    </View>
                </View>

            </View>
        </SafeAreaView>
    )
}

export default Notificationpage

const styles = StyleSheet.create({
    notificationpagecontainer: {
        backgroundColor: "#fff9e6cc",
        flex: 1
    },
    tabbarsection: {
        flexDirection: "row",
        paddingHorizontal: 20,
        paddingVertical: 10,
        alignItems: "center"
    },
    tab: {
        backgroundColor: "#75584e",
        paddingHorizontal: 28,
        paddingVertical: 12,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12, // Add this
    },

    tabText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "500",
    },
    notificationCard: {
        flexDirection: "row",
        backgroundColor: "#f5f2f0",
        borderRadius: 14,
        padding: 14,
        marginHorizontal: 16,
        marginTop: 16,
    },

    iconContainer: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: "#f0d0c6",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },

    icon: {
        fontSize: 18,
    },

    content: {
        flex: 1,
    },

    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 4,
    },

    title: {
        fontSize: 16,
        fontWeight: "700",
        color: "#2d2926",
    },

    time: {
        fontSize: 14,
        color: "#7c746d",
    },

    description: {
        fontSize: 15,
        color: "#6b645e",
        lineHeight: 22,
    },
})