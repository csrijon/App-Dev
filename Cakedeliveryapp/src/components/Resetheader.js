import AntDesign from 'react-native-vector-icons/AntDesign';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';

const Resetheader = ({ onPress }) => {
    return (
        <View style={styles.Resetpagetop}>
            <TouchableOpacity onPress={onPress}>
                <AntDesign name="arrowleft" color="#000" size={24} />
            </TouchableOpacity>
            <Text style={styles.topresettext}>Reset Password</Text>
        </View>
    )
}

export default Resetheader

const styles = StyleSheet.create({
    Resetpagetop: {
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
        justifyContent: "flex-start",
        width: "100%",
        backgroundColor:"#fffbea",
        paddingHorizontal:20,
        paddingVertical:20
    },
    topresettext: {
        fontSize: 18,
        color: "#75584e",
        fontWeight: "700",
        letterSpacing: 0.4
    },
})