import React,{useState} from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet, ScrollView
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Fontisto from 'react-native-vector-icons/Fontisto';
import Detailsheader from "../components/Detailsheader";

const AddressUI = () => {
      
  const [toggles,settoggle] =useState(false)

  return (
    <SafeAreaView style={styles.AddressCardAura} >
      <Detailsheader />
      <ScrollView vertical contentContainerStyle={[styles.Scrolladdress, { paddingBottom: 40 }]} >
        <View style={styles.rootCanvasV2}>

          {/* Top Info Card */}
          <View style={styles.magicCardAura}>
            <Text style={styles.magicTitle}>Deliver the Magic</Text>
            <Text style={styles.magicSubtitle}>
              Ensure your artisanal treats arrive perfectly. Update your delivery
              coordinates below for seamless cake delivery.
            </Text>
          </View>

          {/* Form Fields */}
          <View style={styles.formStackZone}>

            <Text style={styles.fieldLabel}>STREET ADDRESS</Text>
            <TextInput
              style={styles.inputCloud}
              placeholder="123 Patisserie Lane"
              placeholderTextColor="#9A948A"

            />

            <Text style={styles.fieldLabel}>APARTMENT / SUITE (OPTIONAL)</Text>
            <TextInput
              style={styles.inputCloud}
              placeholder="Suite 4B"
              placeholderTextColor="#9A948A"

            />

            <Text style={styles.fieldLabel}>CITY</Text>
            <TextInput
              style={styles.inputCloud}
              placeholder="Confection City"
              placeholderTextColor="#9A948A"

            />

            <Text style={styles.fieldLabel}>STATE</Text>
            <View style={styles.dropdownShell}>
              <Text style={styles.dropdownText}>Select State</Text>
              <Text style={styles.dropdownIcon}>⌄</Text>
            </View>

            <Text style={styles.fieldLabel}>ZIP CODE</Text>
            <TextInput
              style={styles.inputCloud}
              placeholder="90210"
              placeholderTextColor="#9A948A"
            // editable={false}
            />
          </View>

          {/* Default Address Toggle Section */}
          <View style={styles.toggleCardShell}>

            <View style={styles.toggleRowFlex}>
              <View style={styles.iconBubble}>
                <Text>🏠</Text>
              </View>

              <View style={styles.toggleTextWrap}>
                <Text style={styles.toggleTitle}>Set as Default</Text>
                <Text style={styles.toggleSubtitle}>
                  Use this as my primary delivery address
                </Text>
              </View>
            </View>

            {/* Static Switch */}
            <TouchableOpacity onPress={()=>settoggle(!toggles)} style={styles.switchTrack}>
              <Fontisto name={toggles?"toggle-off":"toggle-on"} color="#75584e" size={24} />
            </TouchableOpacity>
          </View>

          {/* Save Button */}
          <TouchableOpacity style={styles.primaryButtonAura} >
            <Text style={styles.primaryButtonText}>Save Address</Text>
          </TouchableOpacity>

          {/* Discard */}
          <TouchableOpacity>
            <Text style={styles.discardLabel}>Discard Changes</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddressUI;

const styles = StyleSheet.create({
  AddressCardAura: {
    flex: 1,
    backgroundColor: "#fbf5e2",
  },
  Scrolladdress: {
    paddingHorizontal: 20,
  },
  rootCanvasV2: {
    paddingHorizontal: 20,
    paddingTop: 40,
  },

  magicCardAura: {
    backgroundColor: "#FAF4D6",
    borderRadius: 28,
    padding: 18,
    marginBottom: 20,
  },

  magicTitle: {
    fontWeight: "700",
    fontSize: 24,
    color: "#75584e",
    marginBottom: 6,
  },

  magicSubtitle: {
    fontSize: 16,
    color: "#646040",
    lineHeight: 18,
  },

  formStackZone: {
    marginTop: 10,
  },

  fieldLabel: {
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: 1.2,
    color: "#646040b3",
    marginTop: 14,
    marginBottom: 6,
  },

  inputCloud: {
    backgroundColor: "#F1F1F1",
    borderRadius: 26,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 14,
  },

  dropdownShell: {
    backgroundColor: "#F1F1F1",
    borderRadius: 26,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  dropdownText: {
    color: "#7A7A7A",
    fontSize: 14,
  },

  dropdownIcon: {
    fontSize: 16,
    color: "#7A7A7A",
  },

  toggleCardShell: {
    backgroundColor: "#E6DDBF",
    borderRadius: 26,
    paddingHorizontal:14,
    paddingVertical:14,
    marginTop: 22,
    width:"100%",
    flexDirection: "row",
    // justifyContent: "space-arround",
    alignItems: "center",
  },

  toggleRowFlex: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconBubble: {
    // width: 24,
    // height: 24,
    borderRadius: 17,
    // backgroundColor: "#E8B8A8",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  toggleTextWrap: {},

  toggleTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#5B4A3F",
  },

  toggleSubtitle: {
    fontSize: 11,
    color: "#7A6A5F",
  },

  switchTrack: {
    justifyContent: "center",
    paddingHorizontal: 3,
    alignItems:"flex-end",
    
  },

  switchKnob: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#FFF",
    alignSelf: "flex-end",
  },

  primaryButtonAura: {
    marginTop: 26,
    backgroundColor: "#6D5448",
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
  },

  primaryButtonText: {
    color: "#FFF",
    fontSize: 15,
    fontWeight: "600",
  },

  discardLabel: {
    textAlign: "center",
    marginTop: 14,
    color: "#6E5B52",
    fontSize: 13,
  },
});