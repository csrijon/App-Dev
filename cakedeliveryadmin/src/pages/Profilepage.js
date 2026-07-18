import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    ScrollView,
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Platform
} from "react-native";
import Adminheader from "../components/Adminheader";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Geolocation from "@react-native-community/geolocation";
import { launchImageLibrary } from "react-native-image-picker";

const Profilepage = ({ navigation }) => {
    Geolocation.getCurrentPosition(info=>console.log(info))
    // State for toggling edit mode
    const [isEditable, setIsEditable] = useState(false);

    // State for the profile image so it updates when picked
    const [profilePic, setProfilePic] = useState("https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400");

    const pickImage = async () => {
        try {
            const result = await launchImageLibrary({
                mediaType: "photo",
                includeBase64: false, // Set to true if your backend requires base64
                quality: 0.8,
            });

            if (!result.didCancel && result.assets && result.assets.length > 0) {
                setProfilePic(result.assets[0].uri);
            }
        } catch (error) {
            console.error("Error picking image:", error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Adminheader />

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* --- Profile Header Section --- */}
                <View style={styles.profileHeader}>
                    <View style={styles.profileBox}>
                        <Image
                            source={{ uri: profilePic }}
                            style={styles.profileImage}
                        />
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={pickImage}
                            style={styles.editButton}
                        >
                            <Ionicons name="camera" size={16} color="#FFFFFF" />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.userName}>Eloise Beaumont</Text>

                    <View style={styles.goldBadge}>
                        <Ionicons name="star" size={12} color="#6B4F3B" />
                        <Text style={styles.badgeText}>GOLD MEMBER</Text>
                    </View>
                </View>

                {/* --- Personal Details Section --- */}
                <View style={styles.sectionContainer}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Personal Details</Text>
                        <TouchableOpacity onPress={() => setIsEditable(!isEditable)}>
                            <Text style={[styles.editActionText, isEditable && styles.saveActionText]}>
                                {isEditable ? "Save Changes" : "Edit"}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.card}>
                        {/* Name Field */}
                        <Text style={styles.inputLabel}>Full Name</Text>
                        <View style={[styles.inputField, isEditable && styles.inputFieldActive]}>
                            <Ionicons name="person-outline" size={18} color="#8B8467" />
                            <TextInput
                                style={styles.textInput}
                                defaultValue="Eloise Beaumont"
                                placeholder="Enter Name"
                                placeholderTextColor="#A8A085"
                                editable={isEditable}
                            />
                        </View>

                        {/* Email Field */}
                        <Text style={styles.inputLabel}>Email Address</Text>
                        <View style={[styles.inputField, isEditable && styles.inputFieldActive]}>
                            <Ionicons name="mail-outline" size={18} color="#8B8467" />
                            <TextInput
                                style={styles.textInput}
                                defaultValue="eloise.beaumont@luxury.com"
                                placeholder="Enter Email"
                                placeholderTextColor="#A8A085"
                                keyboardType="email-address"
                                editable={isEditable}
                            />
                        </View>

                        {/* Phone Field */}
                        <Text style={styles.inputLabel}>Phone Number</Text>
                        <View style={[styles.inputField, isEditable && styles.inputFieldActive]}>
                            <Ionicons name="call-outline" size={18} color="#8B8467" />
                            <TextInput
                                style={styles.textInput}
                                defaultValue="+33 6 12 34 56 78"
                                placeholder="Enter Phone Number"
                                placeholderTextColor="#A8A085"
                                keyboardType="phone-pad"
                                editable={isEditable}
                            />
                        </View>

                        {/* Address Field */}
                        <Text style={styles.inputLabel}>Default Delivery Address</Text>
                        <View style={[styles.inputField, isEditable && styles.inputFieldActive, { minHeight: 70, alignItems: 'flex-start', paddingTop: 12 }]}>
                            <Ionicons name="location-outline" size={18} color="#8B8467" />
                            <TextInput
                                style={[styles.textInput, { marginTop: -4 }]}
                                defaultValue="12 Rue de la Paix, 75002 Paris, France"
                                placeholder="Enter Address"
                                placeholderTextColor="#A8A085"
                                multiline
                                editable={isEditable}
                            />
                        </View>
                    </View>
                </View>
                {/* --- Account Settings Section --- */}
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Account Settings</Text>

                    <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate("Notificationpage")} style={styles.settingsPanel}>
                        <View style={styles.settingsRow}>
                            <View style={[styles.iconNest, { backgroundColor: "#F7E2E8" }]}>
                                <Ionicons name="notifications-outline" size={20} color="#8D5C72" />
                            </View>
                            <View style={styles.settingsTextContainer}>
                                <Text style={styles.settingsPrimaryText}>Notifications</Text>
                                <Text style={styles.settingsSecondaryText}>Order updates and offers</Text>
                            </View>
                        </View>
                        <Ionicons name="chevron-forward" size={18} color="#A89572" />
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate("Paymentadmin")} style={styles.settingsPanel}>
                        <View style={styles.settingsRow}>
                            <View style={[styles.iconNest, { backgroundColor: "#F4CAD7" }]}>
                                <Ionicons name="card-outline" size={20} color="#9A496A" />
                            </View>
                            <View style={styles.settingsTextContainer}>
                                <Text style={styles.settingsPrimaryText}>Payment Methods</Text>
                                <Text style={styles.settingsSecondaryText}>UPI Id Ending in **** 4242</Text>
                            </View>
                        </View>
                        <Ionicons name="chevron-forward" size={18} color="#A89572" />
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate("Securityscreen")} style={styles.settingsPanel}>
                        <View style={styles.settingsRow}>
                            <View style={[styles.iconNest, { backgroundColor: "#F7ECE7" }]}>
                                <Ionicons name="shield-outline" size={20} color="#8B6B57" />
                            </View>
                            <View style={styles.settingsTextContainer}>
                                <Text style={styles.settingsPrimaryText}>Privacy & Security</Text>
                                <Text style={styles.settingsSecondaryText}>Manage your data</Text>
                            </View>
                        </View>
                        <Ionicons name="chevron-forward" size={18} color="#A89572" />
                    </TouchableOpacity>
                </View>

                {/* --- Account Actions Section --- */}
                <View style={[styles.sectionContainer, { marginTop: 10 }]}>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => navigation.reset({ routes: [{ name: "Welcome" }] })}
                        style={styles.logoutButton}
                    >
                        <Ionicons name="log-out-outline" size={20} color="#D84C3E" />
                        <Text style={styles.logoutText}>Logout securely</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

export default Profilepage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FCF9F2", 
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 60,
    },
    profileHeader: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
        marginBottom: 30,
    },
    profileBox: {
        position: "relative",
        marginBottom: 16,
    },
    profileImage: {
        width: 130, 
        height: 130,
        borderRadius: 65,
        borderWidth: 4,
        borderColor: "#FFFFFF",
    },
    editButton: {
        position: "absolute",
        right: 4,
        bottom: 4,
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: "#8B6A5B",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 3,
        borderColor: "#FFFFFF",
        elevation: 4, // Android shadow
        shadowColor: "#000", // iOS shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    userName: {
        fontSize: 26,
        fontWeight: "800",
        color: "#363317",
        marginBottom: 8,
        letterSpacing: 0.3,
    },
    goldBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F3CFC3",
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 20,
    },
    badgeText: {
        marginLeft: 6,
        fontSize: 12,
        fontWeight: "800",
        color: "#6B4F3B",
        letterSpacing: 0.8,
    },

    /* Reusable Section Styles */
    sectionContainer: {
        marginBottom: 30,
    },
    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#403A28",
        marginBottom: 16,
    },
    editActionText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#8B6A5B",
    },
    saveActionText: {
        color: "#4A8F79", // A soft green to indicate saving
    },

    /* Personal Details Card */
    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 24,
        padding: 20,
        elevation: 3,
        shadowColor: "#8B8467",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    inputLabel: {
        fontSize: 13,
        fontWeight: "700",
        color: "#5F583E",
        marginBottom: 8,
        marginLeft: 4,
    },
    inputField: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "transparent",
        borderRadius: 16,
        paddingHorizontal: 14,
        marginBottom: 20,
        minHeight: 52,
        borderWidth: 1,
        borderColor: "transparent", // Invisible until active
    },
    inputFieldActive: {
        backgroundColor: "#FCFAEF", // Subtle highlight when editing
        borderColor: "#EFE7C8",
    },
    textInput: {
        flex: 1,
        marginLeft: 12,
        color: "#2F2A1F",
        fontSize: 15,
        paddingVertical: Platform.OS === 'ios' ? 14 : 10,
    },

    /* Settings Panels */
    settingsPanel: {
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        paddingHorizontal: 18,
        paddingVertical: 16,
        marginBottom: 14,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        elevation: 2,
        shadowColor: "#8B8467",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
    },
    settingsRow: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    iconNest: {
        width: 46,
        height: 46,
        borderRadius: 23,
        justifyContent: "center",
        alignItems: "center",
    },
    settingsTextContainer: {
        marginLeft: 16,
    },
    settingsPrimaryText: {
        fontSize: 15,
        fontWeight: "700",
        color: "#2D241B",
    },
    settingsSecondaryText: {
        fontSize: 13,
        color: "#9B8A67",
        marginTop: 4,
    },

    /* Logout Button */
    logoutButton: {
        height: 56,
        borderWidth: 1.5,
        borderColor: "#FAD4D0",
        borderRadius: 28,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFF8F7", // Very soft red tint
    },
    logoutText: {
        marginLeft: 10,
        color: "#D84C3E",
        fontSize: 15,
        fontWeight: "700",
    },
});