import React, { useState } from "react";
import { 
    View, 
    StyleSheet, 
    StatusBar, 
    Text, 
    TouchableOpacity, 
    FlatList,
    Alert
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Components
import Adminheader from "../components/Adminheader";
import Search from "../components/Search";
import Catalogcard from "../components/Catalogcard";
import Plusbutton from "../components/Plusbutton";

// --- DUMMY DATA ---
const bardata = [
    { id: 1, title: "All" },
    { id: 2, title: "Birthday" },
    { id: 3, title: "Wedding" },
    { id: 4, title: "Pastries" }
];

const initialCatalogData = [
    {
        id: 1,
        title: "Provençal Bloom",
        price: "$78.00",
        tag: "LAVENDER HONEY",
        categoryId: 3, // Wedding
        active: true,
        image: require("../images/catalog.png"),
    },
    {
        id: 2,
        title: "Velvet Cocoa",
        price: "$64.00",
        tag: "DARK CHOCOLATE",
        categoryId: 2, // Birthday
        active: false,
        image: require("../images/catalog.png"),
    },
    {
        id: 3,
        title: "Berry Chantilly",
        price: "$82.00",
        tag: "FRESH BERRIES",
        categoryId: 4, // Pastries
        active: true,
        image: require("../images/catalog.png"),
    },
    {
        id: 4,
        title: "Golden Pistachio",
        price: "$95.00",
        tag: "PISTACHIO CREAM",
        categoryId: 3, // Wedding
        active: true,
        image: require("../images/catalog.png"),
    },
    {
        id: 5,
        title: "Caramel Bliss",
        price: "$70.00",
        tag: "SALTED CARAMEL",
        categoryId: 2, // Birthday
        active: false,
        image: require("../images/catalog.png"),
    },
];

const Catalogpage = ({ navigation }) => {
    // Default to '1' so "All" is highlighted on initial load
    const [active, setActive] = useState(1);
    const [catalogData, setCatalogData] = useState(initialCatalogData);
    const [searchQuery, setSearchQuery] = useState("");

    // Category filter
    const categoryFiltered = active === 1
        ? catalogData
        : catalogData.filter(item => item.categoryId === active);

    // Search filter (by title or tag)
    const filteredData = searchQuery.trim() === ""
        ? categoryFiltered
        : categoryFiltered.filter(item =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.tag.toLowerCase().includes(searchQuery.toLowerCase())
        );

    // Delete product
    const handleDelete = (id, title) => {
        Alert.alert(
            "Delete Product",
            `"${title}" ডিলিট করতে চান?`,
            [
                { text: "না", style: "cancel" },
                {
                    text: "হ্যাঁ, ডিলিট করো",
                    style: "destructive",
                    onPress: () => {
                        setCatalogData(prev => prev.filter(item => item.id !== id));
                    },
                },
            ]
        );
    };

    // Toggle availability
    const handleToggleAvailability = (id) => {
        setCatalogData(prev =>
            prev.map(item =>
                item.id === id ? { ...item, active: !item.active } : item
            )
        );
    };

    // Edit product
    const handleEdit = (item) => {
        navigation.navigate("Addnewpage", { product: item, isEdit: true });
    };

    // Extracted the top section into a ListHeaderComponent for better performance
    const renderHeader = () => (
        <View style={Catalogstyle.headerContainer}>
            <Text style={Catalogstyle.catalogtext}>Catalog Management</Text>
            <Text style={Catalogstyle.subtitle}>Manage your beautiful creations</Text>
            
            <View style={Catalogstyle.searchWrapper}>
                <Search
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    placeholder="Search products..."
                />
            </View>

            <View style={Catalogstyle.barbuttonsection}>
                {bardata.map((item) => {
                    const isActive = active === item.id;
                    return (
                        <TouchableOpacity 
                            activeOpacity={0.7}
                            onPress={() => setActive(item.id)} 
                            style={[
                                Catalogstyle.barbutton, 
                                isActive ? Catalogstyle.activeBarButton : Catalogstyle.inactiveBarButton
                            ]} 
                            key={item.id} 
                        >
                            <Text style={[
                                Catalogstyle.barButtonText,
                                { color: isActive ? "#ffffff" : "#75584e" }
                            ]}>
                                {item.title}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>

            <View style={Catalogstyle.countRow}>
                <Text style={Catalogstyle.countText}>
                    {filteredData.length} {filteredData.length === 1 ? "product" : "products"} found
                </Text>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={Catalogstyle.Catalogpagecontainer}>
            <StatusBar backgroundColor="#fff9e6" barStyle="dark-content" />
            <Adminheader />
            
            <FlatList
                data={filteredData}
                ListHeaderComponent={renderHeader}
                renderItem={({ item }) => (
                    <Catalogcard 
                        tag={item.tag} 
                        price={item.price} 
                        title={item.title} 
                        image={item.image} 
                        isActive={item.active}
                        onEdit={() => handleEdit(item)}
                        onDelete={() => handleDelete(item.id, item.title)}
                        onToggleAvailability={() => handleToggleAvailability(item.id)}
                    />
                )}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={Catalogstyle.listContent}
                ListEmptyComponent={
                    <Text style={Catalogstyle.emptyText}>No creations found in this category.</Text>
                }
            />

            <Plusbutton onPress={() => navigation.navigate("Addnewpage")} />
        </SafeAreaView>
    );
};

export default Catalogpage;

const Catalogstyle = StyleSheet.create({
    Catalogpagecontainer: {
        backgroundColor: "#fff9e6",
        flex: 1,
        position: "relative"
    },
    listContent: {
        paddingHorizontal: 26,
        paddingTop: 10,
        paddingBottom: 100,
    },
    headerContainer: {
        marginBottom: 20,
    },
    catalogtext: {
        color: "#75584e",
        fontWeight: "800",
        fontSize: 24,
        letterSpacing: 0.5,
    },
    subtitle: {
        color: "#a48a80",
        fontSize: 14,
        marginBottom: 20,
        marginTop: 4,
    },
    searchWrapper: {
        marginBottom: 24,
    },
    barbuttonsection: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
    },
    barbutton: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
    },
    activeBarButton: {
        backgroundColor: "#6c5a61",
        elevation: 3,
        shadowColor: "#6c5a61",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    inactiveBarButton: {
        backgroundColor: "#f4dce4",
    },
    barButtonText: {
        fontWeight: "600",
        fontSize: 14,
        letterSpacing: 0.3,
    },
    countRow: {
        marginTop: 16,
    },
    countText: {
        color: "#9c8c7c",
        fontSize: 13,
        fontWeight: "600",
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 40,
        color: '#a48a80',
        fontStyle: 'italic'
    }
});