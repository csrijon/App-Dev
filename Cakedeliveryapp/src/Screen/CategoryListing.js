import React, { useState } from 'react';

import {
    View,
    Text,
    StatusBar,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    FlatList,
    Dimensions,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { SafeAreaView } from 'react-native-safe-area-context';

import Header from '../components/Header';
import CategoryCard from '../components/CategoryCard';
import MenuCard from '../components/MenuCard';
import RefineScreen from './RefineScreen';

import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
} from 'react-native-reanimated';
import { Screen } from 'react-native-screens';

const { width } = Dimensions.get("window");

const categories = [
    {
        id: 1,
        title: "Burger",
    },
    {
        id: 2,
        title: "Pizza",
    },
    {
        id: 3,
        title: "Chicken",
    },
    {
        id: 4,
        title: "Drinks",
    },
    {
        id: 5,
        title: "Dessert",
    },
    {
        id: 6,
        title: "Biryani",
    },
    {
        id: 7,
        title: "Pasta",
    },
    {
        id: 8,
        title: "Ice Cream",
    },
];

const menuItems = [
    {
        id: 1,
        image:
            "https://legateaucakes.com/cdn/shop/files/28d729eb-0915-4e9a-87be-c015e085d598.png?v=1772039786",
        rating: "4.5",
        bakingTime: "48h",
        title: "Midnight Forest",
        description:
            "A mysterious and enchanting forest that comes alive under the cover of darkness.",
        price: "$500.00",
    },

    {
        id: 2,
        image:
            "https://imgcdn.floweraura.com/black-forest-cake-9817490ca-A.jpg",
        rating: "4.7",
        bakingTime: "24h",
        title: "Black Forest",
        description:
            "Rich chocolate sponge layered with fresh cream and cherries.",
        price: "$420.00",
    },

    {
        id: 3,
        image:
            "https://www.fnp.com/images/pr/l/v20221205202838/choco-truffle-cake-half-kg_1.jpg",
        rating: "4.8",
        bakingTime: "12h",
        title: "Choco Truffle",
        description:
            "Smooth chocolate truffle cake topped with rich ganache.",
        price: "$650.00",
    },

    {
        id: 4,
        image:
            "https://www.cakexpo.com/cdn/shop/products/redvelvetcake.jpg",
        rating: "4.6",
        bakingTime: "36h",
        title: "Red Velvet",
        description:
            "Classic red velvet cake with creamy cheese frosting.",
        price: "$550.00",
    },

    {
        id: 5,
        image:
            "https://www.fnp.com/images/pr/l/v20221205202854/fresh-fruit-cake-half-kg_1.jpg",
        rating: "4.4",
        bakingTime: "18h",
        title: "Fresh Fruit Cake",
        description:
            "Soft vanilla sponge loaded with seasonal fresh fruits.",
        price: "$480.00",
    },

    {
        id: 6,
        image:
            "https://www.fnp.com/images/pr/l/v20221205202843/blueberry-cake-half-kg_1.jpg",
        rating: "4.9",
        bakingTime: "20h",
        title: "Blueberry Bliss",
        description:
            "Creamy blueberry cake with juicy berry filling.",
        price: "$720.00",
    },
];

const CategoryListing = ({ navigation }) => {

    const [isOpen, setIsOpen] = useState(false);
    const [selectid,setselectid] = useState(null)

    // animation value
    const translateX = useSharedValue(-width);

    // animated style
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: translateX.value,
                },
            ],
        };
    });

    // open refine panel
    const openRefine = () => {

        setIsOpen(true);

        translateX.value = withTiming(0, {
            duration: 400,
        });
    };

    // close refine panel
    const closeRefine = () => {

        translateX.value = withTiming(-width, {
            duration: 400,
        });

        setTimeout(() => {
            setIsOpen(false);
        }, 400);
    };

    return (
        <SafeAreaView style={styles.Categorycontainer} >

            <StatusBar
                backgroundColor="#f8f1df"
                barStyle={'dark-content'}
            />

            <Header
                name="Wedding Cakes"
                title="Category Listing"
            />

            <ScrollView
                vertical
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 40 }}
                style={styles.CategoryListing}
            >

                {/* filter section start */}
                <View style={styles.FilterSection} >

                    <Text style={styles.FilterText} >
                        Curated Collections
                    </Text>

                    <TouchableOpacity
                        onPress={openRefine}
                        style={styles.FilterButtons}
                    >
                        <Ionicons
                            name="filter"
                            color="#000"
                            size={20}
                        />

                        <Text>Refine</Text>
                    </TouchableOpacity>

                </View>
                {/* filter section end */}

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.CategoryCardsContainer}
                >

                    <FlatList
                        contentContainerStyle={{
                            flexDirection: "row",
                            gap: 10
                        }}
                        data={categories}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <CategoryCard setselectid={setselectid} selectid={selectid} id={item.id} title={item.title} />
                        )}
                    />

                </ScrollView>

                <View style={styles.MenuCardsContainer} >

                    <FlatList
                        contentContainerStyle={{
                            gap: 20,
                            paddingBottom: 40,
                        }}
                        data={menuItems}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <MenuCard onPress={() => navigation.navigate("Delivery", {
                                    title: item.title,
                                    description: item.description,
                                    image: item.image
                            })} rating={item.rating} image={item.image} bakingTime={item.bakingTime} title={item.title} description={item.description} price={item.price} />
                        )}
                    />

                </View>

            </ScrollView>

            {/* overlay */}
            {
                isOpen && (
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={closeRefine}
                        style={styles.overlay}
                    />
                )
            }

            {/* animated refine panel */}
            {
                isOpen && (
                    <Animated.View
                        style={[
                            styles.refinePanel,
                            animatedStyle,
                        ]}
                    >
                        <RefineScreen />
                    </Animated.View>
                )
            }

        </SafeAreaView>
    );
};

export default CategoryListing;

const styles = StyleSheet.create({
    Categorycontainer: {
        flex: 1,
        backgroundColor: "#fcf5e3",
    },

    CategoryListing: {
        flex: 1,
        paddingHorizontal: 24,
        paddingBottom: 20,
        paddingTop: 20,
    },

    FilterSection: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    FilterText: {
        fontSize: 17,
        fontWeight: "bold",
        color: "#363317",
    },

    FilterButtons: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
    },

    CategoryCardsContainer: {
        marginTop: 20,
        flexDirection: "row",
    },

    MenuCardsContainer: {
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
    },

    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.3)",
    },

    refinePanel: {
        position: "absolute",
        left: 0,
        top: 0,
        width: width * 0.82,
        height: "100%",
        backgroundColor: "#fff",
        elevation: 20,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 10,
    },
});