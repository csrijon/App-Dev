import Simpleheader from "../components/Simpleheader"
import EmptyOrderScreen from "./EmptyOrderScreen"
import { SafeAreaView } from "react-native-safe-area-context"
import { StatusBar, ScrollView, View, Text, TouchableOpacity, StyleSheet, useWindowDimensions, Image, ActivityIndicator } from "react-native"
import React, { useState, useEffect } from "react"
import { useFocusEffect } from "@react-navigation/native"
import { orders } from "../services/customerApi"

const PILL_STYLES = {
  PENDING: { backgroundColor: "#F4B6C2" },
  ACCEPTED: { backgroundColor: "#FAD4C0" },
  DELIVERED: { backgroundColor: "#D3D3D3" },
}

const Myorderscreen = ({navigation}) => {
  const { width } = useWindowDimensions()
  const [activeTab, setActiveTab] = useState("active")
  const [orderData, setOrderData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadOrders = async () => {
      try {
        setLoading(true)
        const res = await orders.list()
        const items = (res && res.success && Array.isArray(res.data)) ? res.data : []
        const mapped = items.map((o) => ({
          id: o.orderNumber || ("BK-" + o.orderId),
          status: (o.orderStatus || "PENDING").toUpperCase(),
          title: (o.customerName || "Customer Order"),
          price: "$" + (parseFloat(o.totalAmount || 0)).toFixed(2),
          date: o.orderDate ? new Date(o.orderDate).toLocaleString() : "",
          action: o.orderStatus === "delivered" ? "REORDER" : (o.orderStatus === "pending" ? "TRACK ORDER" : (o.orderStatus === "accepted" ? "VIEW DETAILS" : "TRACK ORDER")),
          isActive: !["delivered", "cancelled", "rejected"].includes(o.orderStatus || ""),
        }))
        setOrderData(mapped)
      } catch (e) {
        console.log("Load orders error:", e)
        setOrderData([])
      } finally {
        setLoading(false)
      }
    }
    loadOrders()
  }, [])

  useFocusEffect(
    React.useCallback(() => {
      const reload = async () => {
        try {
          setLoading(true)
          const res = await orders.list()
          const items = (res && res.success && Array.isArray(res.data)) ? res.data : []
          const mapped = items.map((o) => ({
            id: o.orderNumber || ("BK-" + o.orderId),
            status: (o.orderStatus || "PENDING").toUpperCase(),
            title: (o.customerName || "Customer Order"),
            price: "$" + (parseFloat(o.totalAmount || 0)).toFixed(2),
            date: o.orderDate ? new Date(o.orderDate).toLocaleString() : "",
            action: o.orderStatus === "delivered" ? "REORDER" : (o.orderStatus === "pending" ? "TRACK ORDER" : (o.orderStatus === "accepted" ? "VIEW DETAILS" : "TRACK ORDER")),
            isActive: !["delivered", "cancelled", "rejected"].includes(o.orderStatus || ""),
          }))
          setOrderData(mapped)
        } catch (e) {
          console.log("Refresh orders error:", e)
        } finally {
          setLoading(false)
        }
      }
      reload()
    }, [])
  )

  const filteredOrders = orderData.filter((order) =>
    activeTab === "active" ? order.isActive : !order.isActive
  )

  return (
    <SafeAreaView style={styles.myordercontainer}>
      <StatusBar backgroundColor="#fff9e6" barStyle="dark-content" />
      <Simpleheader />
      <ScrollView
        vertical
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollmyordercontainer}
      >
        <View style={styles.ordertextsection}>
          <Text style={[styles.myordertext, { fontSize: width * 0.08 }]}>My Orders</Text>

        <View>
          {loading ? (
            <View style={styles.emptyState}><ActivityIndicator size="large" color="#75584e" /></View>
          ) : orderData.length === 0 && !loading ? (
            <EmptyOrderScreen />
          ) : (
            orderData.map((order) => (
              <View style={styles.shellWrapper} key={order.id}>
                <Image source={require("../images/cakeimage.jpeg")} style={styles.visualThumb} />

                <View style={styles.metaCluster}>
                  <View style={[styles.statePill, PILL_STYLES[order.status]]}>
                    <Text style={styles.pillText}>{order.status}</Text>
                  </View>

                  <View style={styles.headerRow}>
                    <Text style={styles.productHeading} numberOfLines={1}>
                      {order.title}
                    </Text>
                    <Text style={styles.priceTag}>{order.price}</Text>
                  </View>

                  <Text style={styles.orderRef}>Order #{order.id}</Text>
                  <Text style={styles.timeStamp}>{order.date}</Text>

                  <TouchableOpacity onPress={()=>navigation.navigate("Trackingscreen", { orderId: order.id })} style={styles.actionTrigger}>
                    <Text style={styles.triggerText}>{order.action}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Myorderscreen

const styles = StyleSheet.create({
  myordercontainer: {
    flex: 1,
    backgroundColor: "#fff9e6",
  },
  scrollmyordercontainer: {
    padding: 20,
  },
  myordertext: {
    fontWeight: "700",
    color: "#363317",
    marginBottom: 20,
  },
  ordertextsection: {
    flex: 1,
  },
  togglebuttonsection: {
    flexDirection: "row",
    gap: 25,
    alignSelf: "flex-start",
    marginBottom: 15,
  },
  togglebutton: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 22,
  },
  shellWrapper: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 28,
    padding: 16,
    marginBottom: 20,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 5,
  },

  visualThumb: {
    width: 95,
    height: 95,
    borderRadius: 20,
  },

  metaCluster: {
    marginLeft: 15,
    flex: 1,
  },

  statePill: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
    marginBottom: 6,
  },

  pillText: {
    fontSize: 10,
    fontWeight: "600",
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  productHeading: {
    fontSize: 17,
    fontWeight: "800",
    color: "#2f241d",
    flex: 1,
    marginRight: 8,
  },

  priceTag: {
    fontSize: 14,
    fontWeight: "600",
    color: "#3A2E2A",
  },

  orderRef: {
    fontSize: 12,
    color: "#8B7D6B",
    marginTop: 3,
  },

  timeStamp: {
    fontSize: 12,
    color: "#8B7D6B",
    marginTop: 3,
  },

  actionTrigger: {
    alignSelf: "flex-end",
    marginTop: 8,
  },

  triggerText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#8B5E3C",
  },

  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },

  emptyText: {
    color: "#8B7D6B",
    fontSize: 14,
  },
})