import Simpleheader from "../components/Simpleheader"
import { SafeAreaView } from "react-native-safe-area-context"
import { StatusBar, ScrollView, View, Text, TouchableOpacity, StyleSheet, useWindowDimensions, Image } from "react-native"
import { useState } from "react"


const Myorderscreen = () => {
  const { width } = useWindowDimensions()
  const [selectbg, setbg] = useState(null)
  console.log(width)
  return (
    <SafeAreaView style={styles.myordercontainer} >
      <StatusBar backgroundColor="#fff9e6" barStyle="dark-content" />
      <Simpleheader />
      <ScrollView vertical showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollmyordercontainer}  >
        <View style={styles.ordertextsection} >
          <Text style={[styles.myordertext, { fontSize: width * 0.08 }]} >My Orders</Text>
          <View style={styles.togglebuttonsection} >
            <TouchableOpacity style={[styles.togglebutton, styles.togglebuttongray]} >
              <Text>Active</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setbg(!selectbg)} style={[styles.togglebutton, { backgroundColor: selectbg ? "#75584e" : "#faf4d6" }]} >
              <Text>Past</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View>

          {/* Card 1 */}
          <View style={styles.shellWrapper}>

            <Image
              source={require("../images/cakeimage.jpeg")}
              style={styles.visualThumb}
            />

            <View style={styles.metaCluster}>

              <View style={[styles.statePill, styles.pillPending]}>
                <Text style={styles.pillText}>PENDING</Text>
              </View>

              <View style={styles.headerRow}>
                <Text style={styles.productHeading}>
                  Midnight Truffle Gâteau
                </Text>
                <Text style={styles.priceTag}>$48.00</Text>
              </View>

              <Text style={styles.orderRef}>Order #CH-92831</Text>
              <Text style={styles.timeStamp}>Oct 24, 2023 • 2:30 PM</Text>

              <TouchableOpacity style={styles.actionTrigger}>
                <Text style={styles.triggerText}>TRACK ORDER</Text>
              </TouchableOpacity>

            </View>
          </View>

          {/* Card 2 */}
          <View style={styles.shellWrapper}>

            <Image
              source={require("../images/cakeimage.jpeg")}
              style={styles.visualThumb}
            />

            <View style={styles.metaCluster}>

              <View style={[styles.statePill, styles.pillAccepted]}>
                <Text style={styles.pillText}>ACCEPTED</Text>
              </View>

              <View style={styles.headerRow}>
                <Text style={styles.productHeading}>
                  Wild Berry Chantilly
                </Text>
                <Text style={styles.priceTag}>$35.50</Text>
              </View>

              <Text style={styles.orderRef}>Order #CH-92810</Text>
              <Text style={styles.timeStamp}>Oct 23, 2023 • 11:15 AM</Text>

              <TouchableOpacity style={styles.actionTrigger}>
                <Text style={styles.triggerText}>VIEW DETAILS</Text>
              </TouchableOpacity>

            </View>
          </View>

          {/* Card 3 */}
          <View style={styles.shellWrapper}>

            <Image
              source={require("../images/cakeimage.jpeg")}
              style={styles.visualThumb}
            />

            <View style={styles.metaCluster}>

              <View style={[styles.statePill, styles.pillDelivered]}>
                <Text style={styles.pillText}>DELIVERED</Text>
              </View>

              <View style={styles.headerRow}>
                <Text style={styles.productHeading}>
                  Citron Meringue Bloom
                </Text>
                <Text style={styles.priceTag}>$29.00</Text>
              </View>

              <Text style={styles.orderRef}>Order #CH-92755</Text>
              <Text style={styles.timeStamp}>Oct 20, 2023 • 4:45 PM</Text>

              <TouchableOpacity style={styles.actionTrigger}>
                <Text style={styles.triggerText}>REORDER</Text>
              </TouchableOpacity>

            </View>
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
    backgroundColor: "#fff9e6"
  },
  scrollmyordercontainer: {
    padding: 20,
  },
  myordertext: {
    fontWeight: 700,
    color: "#363317",
    marginBottom: 20,
  },
  ordertextsection: {
    flex: 1
  },
  togglebuttonsection: {
    flexDirection: "row",
    gap: 25,
    alignSelf: "flex-start",
    marginBottom:15,
  },
  togglebutton: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 22
  },
  togglebuttongray: {
    backgroundColor: "#75584e",
  },
  shellWrapper: {
    flexDirection: "row",
    backgroundColor: "#F6EFD9",
    borderRadius: 25,
    padding: 15,
    marginBottom: 20,
    alignItems: "center",
  },

  visualThumb: {
    width: 80,
    height: 80,
    borderRadius: 15,
  },

  metaCluster: {
    marginLeft: 15,
  },

  statePill: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
    marginBottom: 6,
  },

  pillPending: {
    backgroundColor: "#F4B6C2",
  },

  pillAccepted: {
    backgroundColor: "#FAD4C0",
  },

  pillDelivered: {
    backgroundColor: "#D3D3D3",
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
    fontSize: 16,
    fontWeight: "600",
    color: "#3A2E2A",
    flex: 1,
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

})