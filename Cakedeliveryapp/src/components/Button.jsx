import { TouchableOpacity, Text, StyleSheet } from "react-native"


const Button = ({title,onPress}) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <Text style={styles.buttonText}>{title}</Text>
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
        elevation: 3,
    },

    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        textAlign:"center"
    },
})