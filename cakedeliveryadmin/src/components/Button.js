import { Text, TouchableOpacity, StyleSheet } from "react-native"

const Button = ({title}) => {
    return (
        <TouchableOpacity
            style={styles.mochaActionCapsule}
        >
            <Text style={styles.espressoButtonText}>
               {title}
            </Text>
        </TouchableOpacity>
    )
}

export default Button

const styles = StyleSheet.create({

    mochaActionCapsule: {
        width: "100%",
        height: 60,
        backgroundColor: "#8A675B",
        borderRadius: 35,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 35,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },

        shadowOpacity: 0.12,
        shadowRadius: 10,
        elevation: 7,
    },

    espressoButtonText: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "700",
    },
})