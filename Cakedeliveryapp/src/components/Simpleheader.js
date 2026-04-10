import { View, Image, Text, StyleSheet } from "react-native"
import Ionicons from 'react-native-vector-icons/Ionicons';

const Simpleheader = () => {
    return (
        <View style={styles.simpleheader} >

            <Image style={styles.simpleheaderlogo} source={require("../images/secendbackgroud.png")} />

            <Text style={styles.simpleheadertext} >The Artisanal Patisserie</Text>

            <Ionicons name="search" color="#75584e" size={23} />
        </View>
    )
}
export default Simpleheader;


const styles = StyleSheet.create({
    simpleheader: {
        height: 70,
        paddingHorizontal: 20,
        paddingVertical: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#fff9e6"
    },
    simpleheaderlogo: {
        borderRadius: 9999
    },
    simpleheadertext: {
        fontSize: 16,
        fontWeight: "700",
        color: "#75584e"
    }
})