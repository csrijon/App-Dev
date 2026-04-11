import { View, Image, Text, StyleSheet, useWindowDimensions } from "react-native"



const Oderplacecakecard = () => {
    const { width } = useWindowDimensions()
    return (
        <View style={[styles.orderplacecard, { width: width * 0.4, padding: width * 0.04 }]} >
            <Image style={{
                width: "100%",
                height: width * 0.3,
                borderRadius: 33
            }} source={require("../images/cakeimage.jpeg")} />
            <Text
                style={[
                    styles.placecardtext,
                    { fontSize: width * 0.04 }
                ]}
            >
                Berry Swirl
            </Text>
        </View>
    )
}

export default Oderplacecakecard

const styles = StyleSheet.create({
    orderplacecard: {
        backgroundColor: "#FFFFFF",
        gap: 15,
        borderRadius: 22,
        marginRight:20
    },
    placecardtext: {
        color: "#75584E"
    }
})