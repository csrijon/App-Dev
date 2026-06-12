import React, { useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { ScrollView, View, Text, Image, StyleSheet, TouchableOpacity, TextInput } from "react-native"
import Adminheader from "../components/Adminheader"
import Ionicons from 'react-native-vector-icons/Ionicons';
import {launchImageLibrary} from "react-native-image-picker"


const Profilepage = ({ navigation }) => {

   const pickimage = async ()=>{
      const images = await launchImageLibrary({
        mediatype:"photo",
        includeBase64:true
      })
   }

    const [editabletext, seteditabletext] = useState(false)

    return (
        <SafeAreaView style={styles.Profilecontainer} >
            <Adminheader />
            <ScrollView contentContainerStyle={{ paddingHorizontal: 18, paddingBottom: 40 }} >
                <View style={styles.profilecard}>

                    {/* Profile Image */}
                    <View style={styles.profileBox}>
                        <Image
                            source={{
                                uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400",
                            }}
                            style={styles.profileImage}
                        />

                        {/* Edit Button */}
                        <TouchableOpacity onPress={pickimage} style={styles.editButton}>
                            <Ionicons name="pencil" size={15} color="#FFFFFF" />
                        </TouchableOpacity>
                    </View>

                    {/* User Name */}
                    <Text style={styles.userName}>
                        Eloise Beaumont
                    </Text>

                    {/* Membership Badge */}
                    <View style={styles.goldBadge}>
                        <Ionicons name="star" size={12} color="#6B4F3B" />

                        <Text style={styles.badgeText}>
                            GOLD MEMBER
                        </Text>
                    </View>
                </View>

                <View style={styles.personalDetailsContainer}>
                    <View style={styles.personalDetailsHeader}>
                        <Text style={styles.personalDetailsHeading}>Personal Details</Text>
                        <TouchableOpacity onPress={() => seteditabletext(!editabletext)} >
                            <Text style={styles.personalDetailsEdit}>{editabletext ? "Save" : "Edit"}</Text>
                        </TouchableOpacity>

                    </View>

                    <View style={styles.personalDetailsCard}>
                        <Text style={styles.personalDetailsLabel}>Full Name</Text>

                        <View style={styles.personalDetailsField}>
                            <Ionicons name="person-outline" size={18} color="#6B6647" />
                            <TextInput
                                style={styles.personalDetailsInput}
                                defaultValue="Eloise Beaumont"
                                placeholder="Enter Name"
                                placeholderTextColor="#8B8467"
                                editable={editabletext ? true : false}
                            />
                        </View>

                        <Text style={styles.personalDetailsLabel}>Email Address</Text>

                        <View style={styles.personalDetailsField}>
                            <Ionicons name="mail-outline" size={18} color="#6B6647" />
                            <TextInput
                                style={styles.personalDetailsInput}
                                defaultValue="eloise.beaumont@luxury.com"
                                placeholder="Enter Email"
                                placeholderTextColor="#8B8467"
                                keyboardType="email-address"
                                editable={editabletext ? true : false}
                            />
                        </View>

                        <Text style={styles.personalDetailsLabel}>Phone Number</Text>

                        <View style={styles.personalDetailsField}>
                            <Ionicons name="call-outline" size={18} color="#6B6647" />
                            <TextInput
                                style={styles.personalDetailsInput}
                                defaultValue="+33 6 12 34 56 78"
                                placeholder="Enter Phone Number"
                                placeholderTextColor="#8B8467"
                                keyboardType="phone-pad"
                                editable={editabletext ? true : false}
                            />
                        </View>

                        <Text style={styles.personalDetailsLabel}>
                            Default Delivery Address
                        </Text>

                        <View style={styles.personalDetailsField}>
                            <Ionicons name="location-outline" size={18} color="#6B6647" />
                            <TextInput
                                style={styles.personalDetailsInput}
                                defaultValue="12 Rue de la Paix, 75002 Paris, France"
                                placeholder="Enter Address"
                                placeholderTextColor="#8B8467"
                                multiline
                                editable={editabletext ? true : false}
                            />
                        </View>
                    </View>
                </View>

                <View style={styles.oasisFrame}>
                    <Text style={styles.realmHeading}>Account Settings</Text>

                    <TouchableOpacity onPress={() => navigation.navigate("Notificationpage")} style={styles.frostPanel}>
                        <View style={styles.orbitZone}>
                            <View style={[styles.emblemNest, { backgroundColor: "#F7E2E8" }]}>
                                <Ionicons name="notifications-outline" size={20} color="#8D5C72" />
                            </View>

                            <View style={styles.scriptVault}>
                                <Text style={styles.primaryScript}>Notifications</Text>
                                <Text style={styles.secondaryScript}>
                                    Order updates and offers
                                </Text>
                            </View>
                        </View>

                        <Ionicons name="chevron-forward" size={18} color="#A89572" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate("Paymentadmin")} style={styles.frostPanel}>
                        <View style={styles.orbitZone}>
                            <View style={[styles.emblemNest, { backgroundColor: "#F4CAD7" }]}>
                                <Ionicons name="card-outline" size={20} color="#9A496A" />
                            </View>

                            <View style={styles.scriptVault}>
                                <Text style={styles.primaryScript}>Payment Methods</Text>
                                <Text style={styles.secondaryScript}>
                                    Visa ending in **** 4242
                                </Text>
                            </View>
                        </View>

                        <Ionicons name="chevron-forward" size={18} color="#A89572" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate("Securityscreen")} style={styles.frostPanel}>
                        <View style={styles.orbitZone}>
                            <View style={[styles.emblemNest, { backgroundColor: "#F7ECE7" }]}>
                                <Ionicons name="shield-outline" size={20} color="#8B6B57" />
                            </View>

                            <View style={styles.scriptVault}>
                                <Text style={styles.primaryScript}>Privacy & Security</Text>
                                <Text style={styles.secondaryScript}>
                                    Manage your data
                                </Text>
                            </View>
                        </View>

                        <Ionicons name="chevron-forward" size={18} color="#A89572" />
                    </TouchableOpacity>
                </View>

                <View style={styles.summitWrapper}>
                    <Text style={styles.crownTitle}>Account Actions</Text>


                    {/* Logout Button */}
                    <TouchableOpacity onPress={() => navigation.reset({
                        routes: [{ name: "Welcome" }]
                    })} style={styles.exitPortal}>
                        <Ionicons
                            name="log-out-outline"
                            size={18}
                            color="#D84C3E"
                        />
                        <Text style={styles.exitPortalText}>
                            Logout
                        </Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

export default Profilepage

const styles = StyleSheet.create({
    Profilecontainer: {
        flex: 1,
        backgroundColor: "#fff9e6cc",

    },
    profilecard: {
        justifyContent: "center",
        alignItems: "center",
    },

    profileBox: {
        position: "relative",
        marginBottom: 18,
    },

    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 4,
        borderColor: "#FFFFFF",
    },

    editButton: {
        position: "absolute",
        right: 0,
        bottom: 5,
        width: 34,
        height: 34,
        borderRadius: 17,
        backgroundColor: "#8B6A5B",
        justifyContent: "center",
        alignItems: "center",
    },

    userName: {
        fontSize: 28,
        fontWeight: "700",
        color: "#363317",
        marginBottom: 8,
    },

    goldBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F3CFC3",
        paddingHorizontal: 18,
        paddingVertical: 8,
        borderRadius: 30,
    },

    badgeText: {
        marginLeft: 6,
        fontSize: 14,
        fontWeight: "700",
        color: "#6B4F3B",
        letterSpacing: 0.5,
    },
    personalDetailsContainer: {
        paddingHorizontal: 18,
        paddingTop: 20,
    },

    personalDetailsHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 15,
    },

    personalDetailsHeading: {
        fontSize: 18,
        fontWeight: "700",
        color: "#403A28",
    },

    personalDetailsEdit: {
        fontSize: 14,
        color: "#7E775B",
    },

    personalDetailsCard: {
        backgroundColor: "#EFE7C8",
        borderRadius: 30,
        padding: 18,
    },

    personalDetailsLabel: {
        fontSize: 13,
        fontWeight: "600",
        color: "#5F583E",
        marginBottom: 8,
        marginLeft: 4,
    },

    personalDetailsField: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#DDD3A8",
        borderRadius: 24,
        paddingHorizontal: 14,
        marginBottom: 15,
        minHeight: 50,
    },

    personalDetailsInput: {
        flex: 1,
        marginLeft: 10,
        color: "#2F2A1F",
        fontSize: 14,
        paddingVertical: 12,
    },
    oasisFrame: {
        paddingHorizontal: 18,
        marginTop: 30
    },

    realmHeading: {
        fontSize: 18,
        fontWeight: "700",
        color: "#493F32",
        marginBottom: 14,
    },

    frostPanel: {
        backgroundColor: "#F7F7F7",
        borderRadius: 30,
        paddingHorizontal: 16,
        paddingVertical: 14,
        marginBottom: 12,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    orbitZone: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },

    emblemNest: {
        width: 42,
        height: 42,
        borderRadius: 21,
        justifyContent: "center",
        alignItems: "center",
    },

    scriptVault: {
        marginLeft: 12,
    },

    primaryScript: {
        fontSize: 15,
        fontWeight: "700",
        color: "#2D241B",
    },

    secondaryScript: {
        fontSize: 12,
        color: "#9B8A67",
        marginTop: 4,
    },
    summitWrapper: {
        paddingHorizontal: 18,
        marginTop: 25
    },

    crownTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#4A4030",
        marginBottom: 16,
    },

    exitPortal: {
        height: 52,
        borderWidth: 1,
        borderColor: "#E8C5BC",
        borderRadius: 26,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F7F2DF",
    },

    exitPortalText: {
        marginLeft: 8,
        color: "#D84C3E",
        fontSize: 15,
        fontWeight: "700",
    },
})