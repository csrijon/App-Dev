import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    S
} from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const BakeryHeader = () => {
    return (
        <View style={styles.headerContainer}>

            <TouchableOpacity style={styles.closeButton}>
                <Text style={styles.closeIcon}>✕</Text>
            </TouchableOpacity>

            <Text style={styles.headerTitle}>
                The Artisanal Pâtisserie
            </Text>

            <TouchableOpacity style={styles.cakeButton}>
                <MaterialIcons name="bakery-dining" color="#75584e" size={26} />
            </TouchableOpacity>

        </View>
    );
};

export default BakeryHeader;

const styles = StyleSheet.create({

    headerContainer: {
        width: "100%",
        height: 72,
        backgroundColor: "#fff8e6",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 18,
    },

    closeButton: {
        width: 34,
        height: 34,
        borderRadius: 17,
        backgroundColor: "#EFE4D3",
        justifyContent: "center",
        alignItems: "center",
    },

    closeIcon: {
        fontSize: 16,
        color: "#75584e",
        fontWeight: "600",
    },

    headerTitle: {
        flex: 1,
        fontSize: 16,
        fontWeight: "700",
        color: "#75584e",
        marginLeft: 14,
    },

    cakeButton: {
        justifyContent: "center",
        alignItems: "center",
    },

    cakeIcon: {
        fontSize: 20,
    },
});