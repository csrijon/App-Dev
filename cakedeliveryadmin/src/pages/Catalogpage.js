import { View, StyleSheet, StatusBar, ScrollView, Text, TouchableOpacity, FlatList } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import Adminheader from "../components/Adminheader"
import Search from "../components/Search"
import { useState } from "react"
import Catalogcard from "../components/Catalogcard"
import AntDesign from 'react-native-vector-icons/AntDesign';


let bardata = [
    {
        id: 1,
        title: "All"
    },
    {
        id: 2,
        title: "Birthday"
    },
    {
        id: 3,
        title: "Wedding"
    },
    {
        id: 4,
        title: "Pastries"
    }
]

const catalogData = [
    {
        id: 1,
        title: "Provençal Bloom",
        price: "$78.00",
        tag: "LAVENDER HONEY",
        active: true,
        image: require("../images/catalog.png"),
    },

    {
        id: 2,
        title: "Velvet Cocoa",
        price: "$64.00",
        tag: "DARK CHOCOLATE",
        active: false,
        image: require("../images/catalog.png"),
    },

    {
        id: 3,
        title: "Berry Chantilly",
        price: "$82.00",
        tag: "FRESH BERRIES",
        active: true,
        image: require("../images/catalog.png"),
    },

    {
        id: 4,
        title: "Golden Pistachio",
        price: "$95.00",
        tag: "PISTACHIO CREAM",
        active: true,
        image: require("../images/catalog.png"),
    },

    {
        id: 5,
        title: "Caramel Bliss",
        price: "$70.00",
        tag: "SALTED CARAMEL",
        active: false,
        image: require("../images/catalog.png"),
    },
];



const Catalogpage = () => {

    const [active, setactive] = useState(null)


    return (
        <SafeAreaView style={Catalogstyle.Catalogpagecontainer} >
            <StatusBar backgroundColor="#fff9e6cc" barStyle="dark-content" />
            <Adminheader />
            <ScrollView contentContainerStyle={{ paddingHorizontal: 26, paddingVertical: 24 }} >
                <Text style={Catalogstyle.catalogtext} >Catalog Management</Text>
                <Search />
                <View style={Catalogstyle.barbuttonsection} >
                    {
                        bardata.map((item) => (
                            <TouchableOpacity onPress={() => setactive(item.id)} style={[Catalogstyle.barbutton, { backgroundColor: active === item.id ? "#6c5a61" : "#f4dce4" }]} key={item.id} >
                                <Text style={[{ color: active === item.id ? "#ffffff" : "black" }]} >{item.title}</Text>
                            </TouchableOpacity>
                        ))
                    }
                </View>
                <View>
                    <FlatList
                        data={catalogData}
                        renderItem={({ item }) => <Catalogcard tag={item.tag} price={item.price} title={item.title} image={item.image} />}
                        keyExtractor={(item) => item.id}
                    />
                </View>
            </ScrollView>
            <TouchableOpacity style={Catalogstyle.fixedbutton} >
                    <AntDesign name="plus" color="#fff" size={24} />
                </TouchableOpacity>
        </SafeAreaView>
    )
}

export default Catalogpage


const Catalogstyle = StyleSheet.create({
    Catalogpagecontainer: {
        backgroundColor: "#fff9e6",
        flex: 1,
        position: "relative"
    },
    catalogtext: {
        color: "#75584e",
        fontWeight: "700",
        paddingVertical: 14,
        fontSize: 16
    },
    barbuttonsection: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
        marginTop: 24,
    },
    barbutton: {
        paddingHorizontal: 24,
        paddingVertical: 8,
        backgroundColor: "#f4dce4",
        borderRadius: 9999
    },
    fixedbutton: {
        position: "absolute",
        bottom: 20,
        right: 30,

        width: 60,
        height: 60,

        backgroundColor: "#7a5b52",

        justifyContent: "center",
        alignItems: "center",

        borderRadius: 999,

        elevation: 5, 
    }
})