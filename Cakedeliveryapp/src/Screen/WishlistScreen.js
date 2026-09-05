import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, Image, StyleSheet, StatusBar, Alert } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { products } from "../services/customerApi";

const WishlistScreen = ({ navigation }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadWishlist = async () => {
    setLoading(true);
    try {
      const raw = await AsyncStorage.getItem("wishlist");
      const wishlistIds = raw ? JSON.parse(raw) : [];
      if (wishlistIds.length === 0) {
        setItems([]);
        setLoading(false);
        return;
      }
      const all = await products.list({});
      const wishlistItems = (all.products || all).filter((p) => wishlistIds.includes(p.id || p.productId));
      setItems(wishlistItems);
    } catch (e) {
      console.log("Wishlist load error", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWishlist();
  }, []);

  const removeItem = async (id) => {
    const raw = await AsyncStorage.getItem("wishlist");
    const list = raw ? JSON.parse(raw) : [];
    const updated = list.filter((i) => i !== id);
    await AsyncStorage.setItem("wishlist", JSON.stringify(updated));
    setItems((prev) => prev.filter((i) => (i.id || i.productId) !== id));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#fff9e6" barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Wishlist</Text>
        <Text style={styles.subtitle}>Your favorite cakes saved for later.</Text>
        {items.length === 0 ? (
          <View style={styles.empty}>
            <Ionicons name="heart-outline" size={64} color="#E6D9BA" />
            <Text style={styles.emptyText}>No favorites yet</Text>
            <Text style={styles.emptySub}>Save cakes you love to find them here.</Text>
          </View>
        ) : (
          items.map((item) => (
            <View key={item.id || item.productId} style={styles.card}>
              <Image source={{ uri: item.imageUrl || item.image }} style={styles.image} />
              <View style={styles.info}>
                <Text style={styles.name}>{item.productName || item.name || item.title}</Text>
                <Text style={styles.price}>${item.price}</Text>
              </View>
              <TouchableOpacity onPress={() => removeItem(item.id || item.productId)} style={styles.removeBtn}>
                <Ionicons name="trash-outline" size={20} color="#C0392B" />
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default WishlistScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff9e6" },
  scroll: { padding: 20 },
  title: { fontSize: 26, fontWeight: "800", color: "#5C3D2E", marginBottom: 4 },
  subtitle: { fontSize: 13, color: "#9B8070", marginBottom: 16 },
  empty: { alignItems: "center", paddingVertical: 60, gap: 12 },
  emptyText: { fontSize: 16, fontWeight: "700", color: "#8B7D6B" },
  emptySub: { fontSize: 13, color: "#A0907A" },
  card: { flexDirection: "row", backgroundColor: "#fff", borderRadius: 20, padding: 14, marginBottom: 14, alignItems: "center", shadowColor: "#000", shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 3 },
  image: { width: 80, height: 80, borderRadius: 16 },
  info: { flex: 1, marginLeft: 14 },
  name: { fontSize: 16, fontWeight: "700", color: "#5C3D2E" },
  price: { fontSize: 14, fontWeight: "600", color: "#7B5E57", marginTop: 4 },
  removeBtn: { padding: 8 },
});
