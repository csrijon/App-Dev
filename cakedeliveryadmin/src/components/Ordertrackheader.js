import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const Ordertrackheader = () => {
    return (
        <View style={styles.ordertrackerheader} >
            <View style={styles.ordertrackerrightheader} >
                <MaterialIcons name="bakery-dining" color="#75584e" size={26} />
                <Text style={styles.headertext} >The Artisanal Pâtisserie</Text>
            </View>
            <TouchableOpacity>
                <MaterialIcons name="notifications-none" color="#75584e" size={24} />
            </TouchableOpacity>
        </View>
    )
}

export default Ordertrackheader

const styles = StyleSheet.create({
    ordertrackerheader: {
        width: "100%",
        backgroundColor: "#fff9e6cc",
        justifyContent: "space-between",
        flexDirection: "row",
        padding: 20
    },
    ordertrackerrightheader: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    },
    headertext: {
        color: "#75584e",
        fontWeight: "700",
        letterSpacing: 0.4
    }
})