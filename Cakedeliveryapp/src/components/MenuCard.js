import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';


const MenuCard = () => {
    return (
        // <View style={styles.mainContainer}>
        <View style={styles.cakecardContainer}>
            <Image
                source={{
                    uri: "https://legateaucakes.com/cdn/shop/files/28d729eb-0915-4e9a-87be-c015e085d598.png?v=1772039786",
                }}
                style={styles.image}
            />

            <View style={styles.cakeRating}>
                <View style={styles.rating}>
                    <FontAwesome name="star" color="#75584e" size={14} />
                    <Text style={styles.ratingText} >4.5</Text>
                </View>
                <Text style={styles.bakingTime} >Baking:48h</Text>
            </View>

            <View style={styles.cardDetails}>
                <Text style={styles.title}>Midnight Forest</Text>
                <Text style={styles.description}>
                    A mysterious and enchanting forest that comes alive under the cover of darkness.
                </Text>
            </View>

            <View style={styles.cardPrice}>
                <Text style={styles.price}>$500.00</Text>
                <TouchableOpacity style={styles.icon} >
                    <AntDesign name="plus" color="#000" size={20} />
                </TouchableOpacity>
            </View>
        </View>
        // </View>
    )
}
export default MenuCard;

const styles = StyleSheet.create({

    cakecardContainer: {
        width: 370,
        height: 550,
        backgroundColor: "#fff",
        borderRadius: 48,
        padding: 24,
    },
    image: {
        width: "100%",
        height: 300,
        borderTopLeftRadius: 48,
        borderBottomRightRadius: 48,
    },
    cakeRating: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
    },
    rating: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
    },
    ratingText: {
        fontSize: 14,
        fontWeight: "700",
        color: "#75584e"
    },
    bakingTime: {
        fontSize: 12,
        fontWeight: "500",
        color: "#75584e"
    },
    cardDetails: {
        marginTop: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: "700",
        marginBottom: 5,
    },
    description: {
        fontSize: 14,
        marginTop: 5,
        marginBottom: 24,
        color: "#646040",
    },
    cardPrice: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10,
    },
    price: {
        fontSize: 20,
        fontWeight: "800",
        color: "#75584e",
    },
    icon: {
        width: 48,
        height: 48,
        backgroundColor: "#f6cfc2",
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
    },
});