import { SafeAreaView } from "react-native-safe-area-context"
import { View, ScrollView, Text, TouchableOpacity, FlatList } from "react-native"
import Detailsheader from "../components/Detailsheader.js"
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from "react-native-vector-icons/Ionicons";
import CartCard from "../components/CartCard.js";



const cartdetails = [
    {
        id: "1",
        name: "Lavender Honey Cake",
        size: "8 inch",
        Flavor: "Vanilla Bean",
        price: "$9000",
        image: "../images/cakeimage.jpeg",
        Icon: <Ionicons name="close" color="#000" size={24} />
    },
    {
        id: "2",
        name: "Lavender Mango Cake",
        size: "8 inch",
        Flavor: "Vanilla Bean",
        price: "$8",
        image: "../images/cakeimage.jpeg",
        Icon: <Ionicons name="close" color="#000" size={24} />
    },
    {
        id: "3",
        name: "Lavender Mango Cake",
        size: "8 inch",
        Flavor: "Vanilla Bean",
        price: "$8000",
        image: "../images/cakeimage.jpeg",
        Icon: <Ionicons name="close" color="#000" size={24} />
    }
]


const Checkoutscreen = () => {
    return (
        <SafeAreaView>
            <Detailsheader />
            <ScrollView vertical showsVerticalScrollIndicator={false} >
                <View>
                    <Text>YOUR CURATION</Text>
                    <Text>Your Basket</Text>
                </View>
                <FlatList
                    data={cartdetails}
                    renderItem={({ item }) => <CartCard Icon={item.Icon} name={item.name} size={item.size} Flavor={item.Flavor} price={item.price} image={item.image} />}
                    keyExtractor={item => item.id}
                />


            </ScrollView>
        </SafeAreaView>
    )
}

export default Checkoutscreen