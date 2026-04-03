import { View, Image, Text, StyleSheet } from "react-native"

const Cakecard = () => {
    return (
        <View style={styles.Cakecard} >
            <Image style={styles.Cakeimage} source={require("../images/cakeimage.jpeg")} />
            <View style={styles.cakedetails} >
                <Text style={styles.caketexttrend} >Trending</Text>
                <Text style={styles.caketextname} >Chocolate Cake</Text>
                <Text style={styles.caketextprice} >$20.00</Text>
            </View>
        </View>
    )
}
export default Cakecard;

const styles = StyleSheet.create({
    Cakecard: {
        backgroundColor: "#0009",
        margin: 20,
        flexDirection: "row",
        width: 270,
        height: 350,
        position: "relative",
        overflow: "hidden",
        borderTopLeftRadius: 48,
        borderBottomRightRadius: 48
    },
    Cakeimage: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
    },
    cakedetails: {
        position: "absolute",
        bottom: 20,
        gap: 5,
        left: 20,
    },
    caketexttrend:{
        paddingHorizontal: 5,
        paddingVertical: 5,
        backgroundColor: "#f8bbd0",
        color: "#623648",
        textAlign: "center",
        borderRadius:5,
    },
    caketextname:{
        fontSize: 18,
        fontWeight: "bold",
        color: "#fff"
    },
    caketextprice:{
        fontSize: 18,
        fontWeight: "bold",
        color: "#fff"
    }
})