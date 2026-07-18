import React, { useMemo, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  ScrollView,
  Text,
  FlatList,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import Detailsheader from "../components/Detailsheader.js";
import CartCard from "../components/CartCard.js";
import OrderSummaryCard from "../components/Ordersummarycard.js";

const initialCart = [
  {
    id: "1",
    name: "Lavender Honey Cake",
    size: "8 inch",
    Flavor: "Vanilla Bean",
    price: 2000.0,
    quantity: 1,
    note: "Happy Birthday!",
    image: require("../images/cakeimage.jpeg"),
  },
  {
    id: "2",
    name: "Lavender Mango Cake",
    size: "8 inch",
    Flavor: "Vanilla Bean",
    price: 8.0,
    quantity: 1,
    note: "Congratulations!",
    image: require("../images/cakeimage.jpeg"),
  },
  {
    id: "3",
    name: "Lavender Mango Cake",
    size: "8 inch",
    Flavor: "Vanilla Bean",
    price: 14.0,
    quantity: 1,
    note: "Thank you!",
    image: require("../images/cakeimage.jpeg"),
  },
];

const Checkoutscreen = ({ navigation }) => {
  const [cartItems, setCartItems] = useState(initialCart);
  const [loading, setLoading] = useState(false);

  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems]
  );

  const increaseQty = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleChangeAddress = () => {
    navigation.navigate("Blog", {
      screen: "Adressscreen",
    });
  };

  const handleCheckout = async (summary) => {
    if (cartItems.length === 0) {
      Alert.alert(
        "Your basket is empty",
        "Add something delicious first."
      );
      return;
    }

    try {
      setLoading(true);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      Alert.alert(
        "Order placed",
        `Grand total: $${summary.total.toFixed(2)}`
      );

      navigation.navigate("Ordesuccess");
    } catch (error) {
      Alert.alert("Error", "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.Checkout_section}>
      <Detailsheader />

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 18,
          paddingBottom: 24,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerTextBlock}>
          <Text style={styles.eyebrow}>YOUR CURATION</Text>
          <Text style={styles.pageTitle}>Your Basket</Text>
        </View>

        {cartItems.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>
              Your basket is empty.
            </Text>
          </View>
        ) : (
          <FlatList
            data={cartItems}
            scrollEnabled={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <CartCard
                name={item.name}
                size={item.size}
                Flavor={item.Flavor}
                price={item.price}
                note={item.note}
                image={item.image}
                quantity={item.quantity}
                onIncrease={() => increaseQty(item.id)}
                onDecrease={() => decreaseQty(item.id)}
                onRemove={() => removeItem(item.id)}
              />
            )}
          />
        )}

        {/* <-- ADDED: Themed Select Delivery Date Button --> */}
        <TouchableOpacity 
          style={styles.dateButton}
          activeOpacity={0.8}
          onPress={() => navigation.navigate("SelectDateScreen")} // Update with your actual screen name
        >
          <Text style={styles.dateButtonText}>Select Delivery Date</Text>
        </TouchableOpacity>
        {/* <-- ADDED SECTION ENDS HERE --> */}

        <OrderSummaryCard
          subtotal={subtotal}
          deliveryFee={0}
          taxRate={0.08}
          eta="45-60 mins"
          address="42 Artisan Grove, West Hollywood, CA"
          onChangeAddress={handleChangeAddress}
          onCheckout={handleCheckout}
          disabled={cartItems.length === 0 || loading}
          loading={loading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Checkoutscreen;

const styles = StyleSheet.create({
  Checkout_section: {
    flex: 1,
    backgroundColor: "#FDF6E9",
  },

  headerTextBlock: {
    marginTop: 12,
    marginBottom: 4,
  },

  eyebrow: {
    fontSize: 12,
    fontWeight: "700",
    color: "#B5A188",
    letterSpacing: 1,
  },

  pageTitle: {
    fontSize: 26,
    fontWeight: "700",
    color: "#5A3D2C",
    marginTop: 4,
  },

  emptyState: {
    paddingVertical: 60,
    alignItems: "center",
  },

  emptyText: {
    fontSize: 16,
    color: "#8A7A67",
  },

  // <-- ADDED: Themed Styles for Delivery Date Button -->
  dateButton: {
    backgroundColor: "#5A3D2C", // Matches the dark brown text theme
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#5A3D2C",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    },
  
  dateButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FDF6E9", // Matches the background cream color for perfect contrast
    letterSpacing: 0.5,
  },
});