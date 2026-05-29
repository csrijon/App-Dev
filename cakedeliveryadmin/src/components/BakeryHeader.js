import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const BakeryHeader = ({onPress}) => {
    return (
        <View style={styles.headerContainer}>

            <TouchableOpacity onPress={onPress} style={styles.closeButton}>
                <MaterialIcons  name="arrow-back-ios" color="#75584e" size={26} />
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