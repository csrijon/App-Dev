import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

// Simple mock promo table — swap for a real API call when you have a backend
const PROMO_CODES = {
  SWEET10: 0.10,
  CAKE20: 0.20,
  WELCOME15: 0.15,
};

const OrderSummaryCard = ({
  eta = "45-60 mins",
  address = "42 Artisan Grove, West Hollywood, CA",
  subtotal = 0,
  deliveryFee = 0,
  taxRate = 0.08,
  onChangeAddress,
  onCheckout,
  disabled = false,
}) => {
  const [promo, setPromo] = useState("");
  const [appliedCode, setAppliedCode] = useState(null);
  const [discountRate, setDiscountRate] = useState(0);
  const [promoStatus, setPromoStatus] = useState(null); // "success" | "error" | null
  const [checking, setChecking] = useState(false);

  const discount = subtotal * discountRate;
  const taxableAmount = subtotal - discount;
  const taxes = taxableAmount * taxRate;
  const total = taxableAmount + deliveryFee + taxes;

  const handleApply = () => {
    const code = promo.trim().toUpperCase();
    if (!code) return;

    setChecking(true);
    // simulate a lookup so it feels real; replace with an actual API call
    setTimeout(() => {
      if (PROMO_CODES[code]) {
        setDiscountRate(PROMO_CODES[code]);
        setAppliedCode(code);
        setPromoStatus("success");
      } else {
        setDiscountRate(0);
        setAppliedCode(null);
        setPromoStatus("error");
      }
      setChecking(false);
    }, 400);
  };

  const handleRemovePromo = () => {
    setDiscountRate(0);
    setAppliedCode(null);
    setPromoStatus(null);
    setPromo("");
  };

  return (
    <View>
      {/* Delivery Details Card */}
      <View style={styles.card}>
        <View style={styles.row}>
          <View style={styles.iconCircle}>
            <Ionicons name="car-outline" size={22} color="#5A3D2C" />
          </View>
          <View style={{ marginLeft: 12 }}>
            <Text style={styles.deliveryLabel}>DELIVERY DETAILS</Text>
            <Text style={styles.eta}>Estimated: {eta}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <Text style={styles.shipToLabel}>SHIP TO</Text>
        <View style={[styles.row, { alignItems: "flex-start" }]}>
          <Text style={styles.address}>{address}</Text>
          <TouchableOpacity onPress={onChangeAddress}>
            <Text style={styles.changeText}>Change</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Promo Code */}
      {appliedCode ? (
        <View style={styles.promoAppliedRow}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="pricetag" size={16} color="#5A8A5A" />
            <Text style={styles.promoAppliedText}>
              {"  "}{appliedCode} applied (-{Math.round(discountRate * 100)}%)
            </Text>
          </View>
          <TouchableOpacity onPress={handleRemovePromo}>
            <Ionicons name="close-circle" size={20} color="#B5A188" />
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <View style={styles.promoRow}>
            <TextInput
              style={styles.promoInput}
              placeholder="Enter Promo Code"
              placeholderTextColor="#B5A188"
              value={promo}
              onChangeText={(t) => {
                setPromo(t);
                if (promoStatus) setPromoStatus(null);
              }}
              autoCapitalize="characters"
              editable={!checking}
            />
            <TouchableOpacity
              style={[styles.applyBtn, (!promo.trim() || checking) && styles.applyBtnDisabled]}
              onPress={handleApply}
              disabled={!promo.trim() || checking}
            >
              {checking ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.applyText}>APPLY</Text>
              )}
            </TouchableOpacity>
          </View>
          {promoStatus === "error" && (
            <Text style={styles.promoError}>That code isn't valid. Try again.</Text>
          )}
        </>
      )}

      {/* Price Breakdown */}
      <View style={styles.priceSection}>
        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>Subtotal</Text>
          <Text style={styles.priceValue}>${subtotal.toFixed(2)}</Text>
        </View>

        {discount > 0 && (
          <View style={styles.priceRow}>
            <Text style={[styles.priceLabel, { color: "#5A8A5A" }]}>Discount</Text>
            <Text style={[styles.priceValue, { color: "#5A8A5A" }]}>
              -${discount.toFixed(2)}
            </Text>
          </View>
        )}

        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>Delivery Fee</Text>
          <Text style={styles.priceValue}>
            {deliveryFee === 0 ? "FREE" : `$${deliveryFee.toFixed(2)}`}
          </Text>
        </View>

        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>Taxes ({Math.round(taxRate * 100)}%)</Text>
          <Text style={styles.priceValue}>${taxes.toFixed(2)}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.priceRow}>
          <Text style={styles.grandLabel}>Grand Total</Text>
          <Text style={styles.grandValue}>${total.toFixed(2)}</Text>
        </View>
      </View>

      {/* Checkout Button */}
      <TouchableOpacity
        style={[styles.checkoutBtn, disabled && styles.checkoutBtnDisabled]}
        onPress={() => onCheckout?.({ subtotal, discount, taxes, deliveryFee, total, promoCode: appliedCode })}
        disabled={disabled}
      >
        <Text style={styles.checkoutText}>Proceed to Checkout</Text>
        <Ionicons name="arrow-forward" size={18} color="#fff" style={{ marginLeft: 8 }} />
      </TouchableOpacity>
    </View>
  );
};

export default OrderSummaryCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FBF3E3",
    borderRadius: 24,
    padding: 18,
    marginTop: 18,

    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 2,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#EFE6D4",
    alignItems: "center",
    justifyContent: "center",
  },

  deliveryLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#5A3D2C",
    letterSpacing: 0.5,
  },

  eta: {
    fontSize: 14,
    color: "#8A7A67",
    marginTop: 2,
  },

  divider: {
    height: 1,
    backgroundColor: "#E8DFCB",
    marginVertical: 14,
  },

  shipToLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#B5A188",
    letterSpacing: 0.5,
    marginBottom: 4,
  },

  address: {
    flex: 1,
    fontSize: 15,
    color: "#5A3D2C",
    lineHeight: 20,
  },

  changeText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#C9A227",
  },

  promoRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EFE6D4",
    borderRadius: 30,
    marginTop: 18,
    paddingLeft: 20,
    paddingRight: 4,
    paddingVertical: 4,
  },

  promoInput: {
    flex: 1,
    fontSize: 15,
    color: "#5A3D2C",
  },

  applyBtn: {
    backgroundColor: "#5A3D2C",
    borderRadius: 24,
    paddingHorizontal: 22,
    paddingVertical: 12,
    minWidth: 78,
    alignItems: "center",
  },

  applyBtnDisabled: {
    backgroundColor: "#B5A188",
  },

  applyText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 0.5,
  },

  promoError: {
    color: "#B5544A",
    fontSize: 13,
    marginTop: 6,
    marginLeft: 20,
  },

  promoAppliedRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#EAF2E9",
    borderRadius: 30,
    marginTop: 18,
    paddingHorizontal: 20,
    paddingVertical: 14,
  },

  promoAppliedText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#4C7A4C",
  },

  priceSection: {
    marginTop: 22,
  },

  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  priceLabel: {
    fontSize: 15,
    color: "#5A3D2C",
  },

  priceValue: {
    fontSize: 15,
    fontWeight: "700",
    color: "#5A3D2C",
  },

  grandLabel: {
    fontSize: 18,
    fontWeight: "700",
    color: "#5A3D2C",
  },

  grandValue: {
    fontSize: 22,
    fontWeight: "700",
    color: "#5A3D2C",
  },

  checkoutBtn: {
    flexDirection: "row",
    backgroundColor: "#5A3D2C",
    borderRadius: 32,
    paddingVertical: 18,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
    marginBottom: 12,
  },

  checkoutBtnDisabled: {
    backgroundColor: "#D8C9B4",
  },

  checkoutText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
  },
});