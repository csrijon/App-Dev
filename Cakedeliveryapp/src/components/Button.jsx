import { TouchableOpacity, Text, StyleSheet } from "react-native"


const Button = () => {
    return (
        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Get Started </Text>
        </TouchableOpacity>
    )
}
export default Button

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#6b4a3f",
        paddingVertical: 20,
        paddingHorizontal: 60,
        borderRadius: 30,
        marginTop: 20,
        elevation: 3,
    },

    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
})