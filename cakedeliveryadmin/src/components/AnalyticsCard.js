import React from "react";
import {
    View,
    Text,
    StyleSheet,
} from "react-native";

const chartData = [
    { day: "Mon", height: 110 },
    { day: "Tue", height: 165 },
    { day: "Wed", height: 135 },
    { day: "Thu", height: 220, active: true },
    { day: "Fri", height: 120 },
    { day: "Sat", height: 180 },
    { day: "Sun", height: 150 },
];

const AnalyticsCard = () => {
    return (
        <View style={styles.card}>

            {/* top section */}
            <View style={styles.header}>

                <View>
                    <Text style={styles.title}>
                        Sales Analytics
                    </Text>

                    <Text style={styles.subtitle}>
                        Weekly performance overview
                    </Text>
                </View>

                <View style={styles.badge}>
                    <Text style={styles.badgeText}>
                        Mon - Sun
                    </Text>
                </View>

            </View>

            {/* chart */}
            <View style={styles.chartContainer}>
                {chartData.map((item, index) => {
                    return (
                        <View
                            key={index}
                            style={styles.barWrapper}
                        >
                            <View
                                style={[
                                    styles.bar,
                                    {
                                        height: item.height,
                                        backgroundColor: item.active
                                            ? "#7A5A4F"
                                            : "#F3E8E5",
                                    },
                                ]}
                            />

                            <Text style={styles.dayText}>
                                {item.day}
                            </Text>
                        </View>
                    );
                })}
            </View>

        </View>
    );
};

export default AnalyticsCard

const styles = StyleSheet.create({
    card: {
        width: "100%",
        backgroundColor: "#FFFFFF",
        borderRadius: 35,
        paddingVertical:22,
        paddingHorizontal:10,
        alignSelf: "center",
        marginTop: 30,
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
    },

    title: {
        fontSize: 24,
        fontWeight: "700",
        color: "#6A4F44",
    },

    subtitle: {
        marginTop: 4,
        fontSize: 15,
        color: "#8A756C",
    },

    badge: {
        // flex:1,
        backgroundColor: "#F5F1EF",
        paddingHorizontal: 5,
        paddingVertical: 8,
        borderRadius: 20,
    },

    badgeText: {
        color: "#7A5A4F",
        fontWeight: "600",
    },

    chartContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
        marginTop: 35,
    },

    barWrapper: {
        alignItems: "center",
    },

    bar: {
        width: 20,
        borderRadius: 20,
    },

    dayText: {
        marginTop: 10,
        fontSize: 14,
        color: "#7A6A5F",
        fontWeight: "600",
    },
});