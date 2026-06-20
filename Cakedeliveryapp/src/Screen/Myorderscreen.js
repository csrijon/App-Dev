import Simpleheader from "../components/Simpleheader"
import { SafeAreaView } from "react-native-safe-area-context"
import { StatusBar, ScrollView, View, Text, TouchableOpacity, StyleSheet, useWindowDimensions, Image } from "react-native"
import { useState } from "react"

const ORDERS = [
  {
    id: "CH-92831",
    status: "PENDING",
    title: "Midnight Truffle Gâteau",
    price: "$48.00",
    date: "Oct 24, 2023 • 2:30 PM",
    action: "TRACK ORDER",
    isActive: true,
  },
  {
    id: "CH-92810",
    status: "ACCEPTED",
    title: "Wild Berry Chantilly",
    price: "$35.50",
    date: "Oct 23, 2023 • 11:15 AM",
    action: "VIEW DETAILS",
    isActive: true,
  },
  {
    id: "CH-92755",
    status: "DELIVERED",
    title: "Citron Meringue Bloom",
    price: "$29.00",
    date: "Oct 20, 2023 • 4:45 PM",
    action: "REORDER",
    isActive: false,
  },
]

const PILL_STYLES = {
  PENDING: { backgroundColor: "#F4B6C2" },
  ACCEPTED: { backgroundColor: "#FAD4C0" },
  DELIVERED: { backgroundColor: "#D3D3D3" },
}

const Myorderscreen = () => {
  const { width } = useWindowDimensions()
  const [activeTab, setActiveTab] = useState("active") // "active" | "past"

  const filteredOrders = ORDERS.filter((order) =>
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

          <View style={styles.togglebuttonsection}>
            <TouchableOpacity
              onPress={() => setActiveTab("active")}
              style={[
                styles.togglebutton,
                { backgroundColor: activeTab === "active" ? "#75584e" : "#faf4d6" },
              ]}
            >
              <Text style={{ color: activeTab === "active" ? "#fff" : "#363317", fontWeight: "600" }}>
                Active
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setActiveTab("past")}
              style={[
                styles.togglebutton,
                { backgroundColor: activeTab === "past" ? "#75584e" : "#faf4d6" },
              ]}
            >
              <Text style={{ color: activeTab === "past" ? "#fff" : "#363317", fontWeight: "600" }}>
                Past
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View>
          {filteredOrders.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No {activeTab} orders found</Text>
            </View>
          ) : (
            filteredOrders.map((order) => (
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

                  <TouchableOpacity style={styles.actionTrigger}>
                    <Text style={styles.triggerText}>{order.action}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
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