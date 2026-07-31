import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native"

const CategoryProductscard = ({ title, img }) => {
    return (
        <TouchableOpacity activeOpacity={0.5} style={styles.CategoryProductscard} >
            <View style={styles.imageWrapper} >
                <Image style={styles.image} source={{ uri: img }} />
            </View>

            <Text style={styles.producttext} >{title}</Text>
        </TouchableOpacity>
    )
}

export default CategoryProductscard

const styles = StyleSheet.create({
    CategoryProductscard: {
        width: 70,
        alignItems: "center",
        gap: 8,
        height:120
    },
    imageWrapper: {
        width: "90%",
        aspectRatio: 1,
        borderRadius: 41,
        padding: 5,
        borderWidth: 2,
        borderColor: "#5b4138",
        backgroundColor: "#eee8d5"
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 999,
        objectFit: "cover",
        alignSelf: "center",
    },
    producttext: {
        color: "#75584e",
        textTransform: "uppercase",
        fontSize: 10
    }
});