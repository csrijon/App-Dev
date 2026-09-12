import React, { useMemo, useState, useEffect } from "react";
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
import { cart, orders } from "../services/customerApi";
import { API_CONFIG } from '../config/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from "@react-navigation/native";

const Checkoutscreen = ({ navigation, route }) => {
  const selectedDeliveryDate = route?.params?.selectedDate || "";
  const { width } = useWindowDimensions();

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const res = await cart.get();
        const items = (res.success && res.data) ? res.data : [];
        const mapped = items.map((item) => ({
          id: item.productId || item.product?.id || item.id,
          cartId: item.id || item.productId,
          name: item.product ? item.product.productName || item.product.name || "Cake" : (item.title || "Cake"),
          size: "8 inch",
          Flavor: item.product ? (item.product.flavorProfile || "Vanilla Bean") : "Vanilla Bean",
          price: item.product ? (parseFloat(item.product.price) || item.price || 0) : (item.price || 0),
          quantity: item.quantity || 1,
          note: item.note || "",
          image: item.product && item.product.imageUrl ? { uri: item.product.imageUrl.startsWith('/') ? (API_CONFIG.baseURL) + item.product.imageUrl : item.product.imageUrl } : require("../images/cakeimage.jpeg"),
        }));
        setCartItems(mapped);
      } catch (e) {
        console.log("Cart load error:", e);
      }
    };
    loadCart();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const loadCart = async () => {
        try {
          const res = await cart.get();
          const items = (res.success && res.data) ? res.data : [];
          const mapped = items.map((item) => ({
            id: item.productId || item.product?.id || item.id,
            cartId: item.id || item.productId,
            name: item.product ? (item.product.productName || item.product.name || "Cake") : (item.title || "Cake"),
            size: "8 inch",
            Flavor: item.product ? (item.product.flavorProfile || "Vanilla Bean") : "Vanilla Bean",
            price: item.product ? (parseFloat(item.product.price) || item.price || 0) : (item.price || 0),
            quantity: item.quantity || 1,
            note: item.note || "",
            image: item.product && item.product.imageUrl ? { uri: item.product.imageUrl.startsWith('/') ? (API_CONFIG.baseURL) + item.product.imageUrl : item.product.imageUrl } : require("../images/cakeimage.jpeg"),
          }));
          setCartItems(mapped);
        } catch (e) {
          console.log("Cart refresh error:", e);
        }
      };
      loadCart();
    }, [])
  );

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

  const syncToStorage = async (items) => {
    // Persist updated quantities to backend for each item if needed; for now keep local mapping only
    try {
      for (const item of items) {
        await cart.updateQuantity(item.id, item.quantity);
      }
    } catch (e) {
      console.log("Sync error:", e);
    }
  };

  const increaseQty = (cartId) => {
    setCartItems((prev) => {
      const updated = prev.map((item) =>
        item.cartId === cartId ? { ...item, quantity: item.quantity + 1 } : item
      );
      const item = updated.find(i => i.cartId === cartId);
      if (item) cart.updateQuantity(item.cartId, item.quantity).catch(() => {});
      return updated;
    });
  };

  const decreaseQty = (cartId) => {
    setCartItems((prev) => {
      const updated = prev.map((item) =>
        item.cartId === cartId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      );
      const item = updated.find(i => i.cartId === cartId);
      if (item) cart.updateQuantity(item.cartId, item.quantity).catch(() => {});
      return updated;
    });
  };

  const removeItem = (cartId) => {
    setCartItems((prev) => {
      const updated = prev.filter((item) => item.cartId !== cartId);
      cart.removeItem(cartId).catch(() => {});
      return updated;
    });
  };

  const handleChangeAddress = () => {
    navigation.navigate("ProfileTab", { screen: "Profilescreen" });
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

      // Fetch user profile for name/phone/address
      let userName = "Customer";
      let userPhone = "";
      let userAddress = "";
      try {
        const token = await AsyncStorage.getItem('auth_token');
        if (token) {
          const profileRes = await fetch(`${API_CONFIG.baseURL}/api/user/profile`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const profileData = await profileRes.json().catch(() => ({}));
          if (profileData.success && profileData.data) {
            userName = profileData.data.name || profileData.data.fullName || "Customer";
            userPhone = profileData.data.phone || profileData.data.mobile || profileData.data.phoneNumber || "";
          }
        }
      } catch (e) {
        // ignore profile fetch errors
      }

      // Fetch saved address
      try {
        const token = await AsyncStorage.getItem('auth_token');
        if (token) {
          const addrRes = await fetch(`${API_CONFIG.baseURL}/api/address`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const addrData = await addrRes.json().catch(() => ({}));
          if (addrData.success && Array.isArray(addrData.data) && addrData.data.length > 0) {
            const addr = addrData.data[0];
            userAddress = addr.address || addr.street || addr.fullAddress || "";
          }
        }
      } catch (e) {
        // ignore
      }

      const idempotencyKey = `checkout-${Date.now()}-${Math.floor(Math.random() * 100000)}`;

      const orderData = await orders.create({
        items: cartItems.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price,
          note: item.note || "",
        })),
        totalAmount: summary.total,
        customerName: userName,
        customerPhone: userPhone,
        customerAddress: userAddress,
        paymentMethod: "cash",
        paymentStatus: "pending",
        orderStatus: "pending",
        idempotencyKey,
      });

      await cart.get(); // refresh cart state from server after clear
      // Server clears cart on order creation; no setLocalCart needed

      Alert.alert(
        "Order placed",
        `Grand total: $${summary.total.toFixed(2)}\nOrder ID: ${orderData.id || "#" + Date.now()}`
      );

      navigation.navigate("Ordesuccess", { orderId: orderData.id || Date.now(), selectedDate: selectedDeliveryDate });
    } catch (error) {
      console.log("Checkout error:", error);
      Alert.alert(
        "Error",
        error?.message || "Something went wrong."
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
            keyExtractor={(item) => String(item.cartId || item.id)}
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
                  increaseQty(item.cartId)
                }
                onDecrease={() =>
                  decreaseQty(item.cartId)
                }
                onRemove={() =>
                  removeItem(item.cartId)
                }
              />
            )}
          />

        )}

        <TouchableOpacity
          style={styles.dateButton}
          activeOpacity={0.8}
          onPress={() =>
            navigation.navigate("Calenderpage")
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