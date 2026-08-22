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
  useWindowDimensions,
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
  const { width } = useWindowDimensions();

  const [cartItems, setCartItems] = useState(initialCart);
  const [loading, setLoading] = useState(false);

  /*
   * Responsive font scale
   *
   * 320px  → smaller phone
   * 375px  → normal phone
   * 430px  → large phone
   * 768px+ → tablet
   */
  const fontScale = Math.min(Math.max(width / 375, 0.90), 1.15);

  const responsiveFont = (size) =>
    Math.round(size * fontScale);

  const subtotal = useMemo(
    () =>
      cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      ),
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
    setCartItems((prev) =>
      prev.filter((item) => item.id !== id)
    );
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

      await new Promise((resolve) =>
        setTimeout(resolve, 2000)
      );

      Alert.alert(
        "Order placed",
        `Grand total: $${summary.total.toFixed(2)}`
      );

      navigation.navigate("Ordesuccess");
    } catch (error) {
      Alert.alert(
        "Error",
        "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.Checkout_section}>

      <Detailsheader />

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: 24,
        }}
        showsVerticalScrollIndicator={false}
      >

        <View style={styles.headerTextBlock}>

          <Text
            style={[
              styles.eyebrow,
              { fontSize: responsiveFont(11) },
            ]}
          >
            YOUR CURATION
          </Text>

          <Text
            style={[
              styles.pageTitle,
              { fontSize: responsiveFont(28) },
            ]}
          >
            Your Basket
          </Text>

          {cartItems.length > 0 && (
            <Text
              style={[
                styles.itemCount,
                { fontSize: responsiveFont(13) },
              ]}
            >
              {cartItems.length}{" "}
              {cartItems.length === 1
                ? "item"
                : "items"}
            </Text>
          )}

        </View>

        {cartItems.length === 0 ? (

          <View style={styles.emptyState}>
            <Text
              style={[
                styles.emptyText,
                { fontSize: responsiveFont(15) },
              ]}
            >
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
                onIncrease={() =>
                  increaseQty(item.id)
                }
                onDecrease={() =>
                  decreaseQty(item.id)
                }
                onRemove={() =>
                  removeItem(item.id)
                }
              />
            )}
          />

        )}

        <TouchableOpacity
          style={styles.dateButton}
          activeOpacity={0.8}
          onPress={() =>
            navigation.navigate("Categorys", {
              screen: "Delivery",
            })
          }
        >
          <Text
            style={[
              styles.dateButtonText,
              { fontSize: responsiveFont(15) },
            ]}
          >
            Select Delivery Date
          </Text>
        </TouchableOpacity>

        <OrderSummaryCard
          subtotal={subtotal}
          deliveryFee={0}
          taxRate={0.08}
          eta="45-60 mins"
          address="42 Artisan Grove, West Hollywood, CA"
          onChangeAddress={handleChangeAddress}
          onCheckout={handleCheckout}
          disabled={
            cartItems.length === 0 ||
            loading
          }
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
    backgroundColor: "#fff9e6",
  },

  headerTextBlock: {
    marginTop: 16,
    marginBottom: 8,
  },

  eyebrow: {
    fontSize: 11,
    fontWeight: "600",
    color: "#A6A6A6",
    letterSpacing: 1.5,
  },

  pageTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1A1A1A",
    marginTop: 4,
  },

  itemCount: {
    fontSize: 13,
    fontWeight: "500",
    color: "#A6A6A6",
    marginTop: 4,
  },

  emptyState: {
    paddingVertical: 60,
    alignItems: "center",
  },

  emptyText: {
    fontSize: 15,
    color: "#A6A6A6",
  },

  dateButton: {
    backgroundColor: "#1A1A1A",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  dateButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#FFFFFF",
    letterSpacing: 0.3,
  },
});