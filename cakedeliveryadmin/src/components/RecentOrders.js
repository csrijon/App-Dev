import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const ordersData = [
  {
    id: 1,
    name: "Midnight Ganache",
    price: "$45.00",
    orderId: "#8842 • 10:30 AM",
    status: "PREPARING",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587",
  },

  {
    id: 2,
    name: "Spring Berry Rose",
    price: "$38.00",
    orderId: "#8841 • 09:45 AM",
    status: "READY",
    image:
      "https://images.unsplash.com/photo-1621303837174-89787a7d4729",
  },

  {
    id: 3,
    name: "Macaron Box (12)",
    price: "$32.00",
    orderId: "#8840 • 09:15 AM",
    status: "READY",
    image:
      "https://images.unsplash.com/photo-1558326567-98ae2405596b",
  },
];


const RecentOrders = () => {
  const navigation = useNavigation()
  return (
    <View style={styles.container}>

      <Text style={styles.heading}>
        Recent Orders
      </Text>

      {ordersData.map((item) => {
        return (
          <View
            key={item.id}
            style={styles.orderRow}
          >

            {/* left image */}
            <Image
              source={{ uri: item.image }}
              style={styles.image}
            />

            {/* center content */}
            <View style={styles.middleSection}>
              <Text style={styles.productName}>
                {item.name}
              </Text>

              <Text style={styles.orderInfo}>
                {item.orderId}
              </Text>
            </View>

            {/* right side */}
            <View style={styles.rightSection}>
              <Text style={styles.price}>
                {item.price}
              </Text>

              <View style={styles.statusBox}>
                <Text style={styles.statusText}>
                  {item.status}
                </Text>
              </View>
            </View>

          </View>
        );
      })}

      {/* button */}
      <TouchableOpacity onPress={()=>navigation.navigate("RecentOrdersScreen")} style={styles.button}>
        <Text style={styles.buttonText}>
          View All Orders
        </Text>
      </TouchableOpacity>

    </View>
  );
};

export default RecentOrders;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#ECE5C9",
    borderRadius: 35,
    padding: 22,
    alignSelf: "center",
    marginTop: 30,
  },

  heading: {
    fontSize: 28,
    fontWeight: "700",
    color: "#6B4E42",
    marginBottom: 20,
  },

  orderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 22,
  },

  image: {
    width: 58,
    height: 58,
    borderRadius: 18,
  },

  middleSection: {
    flex: 1,
    marginLeft: 14,
  },

  productName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#3F2A22",
  },

  orderInfo: {
    marginTop: 6,
    fontSize: 15,
    color: "#8A755F",
    fontWeight: "600",
  },

  rightSection: {
    alignItems: "flex-end",
  },

  price: {
    fontSize: 20,
    fontWeight: "700",
    color: "#7A5646",
  },

  statusBox: {
    marginTop: 8,
    backgroundColor: "#E9DFC8",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },

  statusText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#8A6758",
  },

  button: {
    marginTop: 10,
    borderWidth: 2,
    borderColor: "#D98D00",
    borderRadius: 35,
    paddingVertical: 16,
    alignItems: "center",
  },

  buttonText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#7A5646",
  },
});