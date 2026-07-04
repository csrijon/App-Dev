import React from "react";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
  ScrollView
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Adminheader from "../components/Adminheader"

const CatalogUpdatedScreen = ({ navigation }) => {

  const insets = useSafeAreaInsets()

  const handelcatalog = () => {
    navigation.navigate("Catalog")
  }

  const handelgodashboard = ()=>{
    navigation.navigate("Dashboard")
  }

  console.log("Insets:", insets);

  return (
    <SafeAreaView style={[styles.CatalogUpdatedScreen, { paddingTop: insets.top, paddingBottom: insets.bottom }]} >
      <Adminheader />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{
        paddingBottom: 50 + insets.bottom
      }} >
        <View style={styles.container}>
          <StatusBar
            backgroundColor="#F8F2DE"
            barStyle="dark-content"
          />

          {/* Cake Image */}

          <Image
            source={require("../images/unnamed.png")}
            style={styles.cakeImage}
          />

          {/* Floating Check */}

          <View style={styles.checkCircle}>
            <MaterialIcons
              name="check"
              size={24}
              color="#6F564C"
            />
          </View>

          {/* Badge */}

          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              Update Successful
            </Text>
          </View>

          {/* Heading */}

          <Text style={styles.heading}>
            Catalog
          </Text>

          <Text style={styles.subHeading}>
            Updated!
          </Text>

          {/* Description */}

          <Text style={styles.description}>
            Your latest artisan creations have been
            polished and published. Your boutique
            catalog is now live and ready to delight
            your customers.
          </Text>

          {/* Buttons */}

          <TouchableOpacity onPress={handelcatalog} style={styles.primaryBtn}>
            <Text style={styles.primaryText}>
              View Catalog
            </Text>

            <MaterialIcons
              name="grid-view"
              size={16}
              color="#fff"
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={handelgodashboard} style={styles.secondaryBtn}>
            <Text style={styles.secondaryText}>
              Go to Dashboard
            </Text>

            <MaterialIcons
              name="grid-view"
              size={16}
              color="#75654E"
            />
          </TouchableOpacity>

          {/* Footer Stats */}

          <View style={styles.bottomRow}>
            <View style={styles.infoChip}>
              <MaterialIcons
                name="schedule"
                size={12}
                color="#75654E"
              />
              <Text style={styles.infoText}>
                Updated Just now
              </Text>
            </View>

            <View style={styles.infoChip}>
              <MaterialIcons
                name="inventory-2"
                size={12}
                color="#75654E"
              />
              <Text style={styles.infoText}>
                12 New Items
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CatalogUpdatedScreen;

const styles = StyleSheet.create({
  CatalogUpdatedScreen: {
    flex: 1,
    backgroundColor: "#F8F2DE",
  },
  container: {
    paddingHorizontal: 14,
    alignItems: "center",
  },

  cakeImage: {
    width: "100%",
    height: 270,
    borderRadius: 0,
    marginTop: 5,
  },

  checkCircle: {
    position: "absolute",
    top: 250,
    right: 18,
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "#EBC8BD",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },

  badge: {
    marginTop: 34,
    backgroundColor: "#F1C8D5",
    paddingHorizontal: 12,
    paddingVertical: 5,
  },

  badgeText: {
    fontSize: 10,
    color: "#9A7082",
    fontWeight: "700",
  },

  heading: {
    marginTop: 12,
    fontSize: 28,
    fontWeight: "800",
    color: "#30261F",
  },

  subHeading: {
    fontSize: 24,
    fontStyle: "italic",
    color: "#6E564C",
    marginTop: -2,
  },

  description: {
    textAlign: "center",
    color: "#7D6B59",
    fontSize: 15,
    lineHeight: 24,
    marginTop: 18,
    paddingHorizontal: 18,
  },

  primaryBtn: {
    marginTop: 32,
    width: "100%",
    height: 56,
    borderRadius: 30,
    backgroundColor: "#75584E",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },

  primaryText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  secondaryBtn: {
    marginTop: 12,
    width: "100%",
    height: 56,
    borderRadius: 30,
    backgroundColor: "#E5DDAF",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },

  secondaryText: {
    color: "#75654E",
    fontSize: 16,
    fontWeight: "700",
  },

  bottomRow: {
    flexDirection: "row",
    marginTop: 28,
    gap: 10,
  },

  infoChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0E8C7",
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },

  infoText: {
    marginLeft: 5,
    color: "#75654E",
    fontSize: 11,
    fontWeight: "600",
  },
});