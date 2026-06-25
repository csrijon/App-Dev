import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { 
    StyleSheet, 
    ScrollView, 
    Alert, 
    StatusBar, 
    ImageBackground, 
    TouchableOpacity, 
    View, 
    Text, 
    Switch,
    Platform
} from "react-native";
import Securityheader from "../components/Securityheader";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Securitypage = ({ navigation }) => {
    const [permission, setPermission] = useState(true);
    const [twoFactor, setTwoFactor] = useState(false);

    const delacc = () => {
        Alert.alert(
            "Delete Account", 
            "Are you sure you want to permanently delete your Artisanal Pâtisserie account? This action cannot be undone.", 
            [
                { text: "Cancel", style: "cancel" },
                { text: "Delete", onPress: () => console.log("Account Deleted"), style: "destructive" }
            ]
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#FCF9F2" barStyle="dark-content" />
            <Securityheader title={"Privacy & Security"} />
            
            <ScrollView 
                showsVerticalScrollIndicator={false} 
                contentContainerStyle={styles.scrollContent}
            >
                {/* --- HERO SECTION --- */}
                <ImageBackground
                    source={{ uri: "https://images.unsplash.com/photo-1578985545062-69928b1d9587" }}
                    style={styles.heroCard}
                    imageStyle={styles.heroImage}
                >
                    <View style={styles.darkLayer} />
                    <View style={styles.contentArea}>
                        <View style={styles.securityTag}>
                            <Text style={styles.securityTagText}>SECURITY HUB</Text>
                        </View>
                        <Text style={styles.heroHeading}>
                            Your data is the secret ingredient.
                        </Text>
                    </View>
                </ImageBackground>

                <Text style={styles.introText}>
                    At The Artisanal Pâtisserie, we protect your personal information with the same precision we use to temper our dark chocolate. Your trust is our most cherished recipe.
                </Text>

                {/* --- SECURITY SETTINGS --- */}
                <View style={styles.sectionWrapper}>
                    <Text style={styles.sectionTitle}>Security Settings</Text>

                    <View style={styles.card}>
                        {/* Two Factor */}
                        <View style={styles.listItem}>
                            <View style={styles.itemTextWrapper}>
                                <Text style={styles.itemTitle}>Two-Factor Authentication</Text>
                                <Text style={styles.itemSubtitle}>Secure your account with a code</Text>
                            </View>
                            <Switch
                                value={twoFactor}
                                onValueChange={(val) => setTwoFactor(val)}
                                trackColor={{ false: "#EFE8E2", true: "#8B6A5B" }}
                                thumbColor={Platform.OS === 'ios' ? "#FFFFFF" : (twoFactor ? "#FFFFFF" : "#F4F4F4")}
                            />
                        </View>

                        <View style={styles.divider} />

                        {/* Change Password */}
                        <TouchableOpacity 
                            activeOpacity={0.7} 
                            onPress={() => navigation.navigate("Passwordchangespage")} 
                            style={styles.listItem}
                        >
                            <View style={styles.itemTextWrapper}>
                                <Text style={styles.itemTitle}>Change Password</Text>
                                <Text style={styles.itemSubtitle}>Last updated 3 months ago</Text>
                            </View>
                            <MaterialCommunityIcons name="chevron-right" size={24} color="#A8A085" />
                        </TouchableOpacity>

                        <View style={styles.divider} />

                        {/* Recent Activity */}
                        <View style={[styles.listItem, { borderBottomWidth: 0, paddingBottom: 20 }]}>
                            <View style={styles.activityHeader}>
                                <Text style={styles.itemTitle}>Recent Login Activity</Text>
                                <TouchableOpacity>
                                    <Text style={styles.viewAllText}>View All</Text>
                                </TouchableOpacity>
                            </View>
                            
                            <View style={styles.deviceInfoContainer}>
                                <View style={[styles.iconNest, { backgroundColor: "#F7E2E8" }]}>
                                    <Ionicons name="phone-portrait-outline" size={20} color="#8D5C72" />
                                </View>
                                <View style={styles.deviceTextContainer}>
                                    <Text style={styles.deviceTitleText}>iPhone 15 Pro • Paris, FR</Text>
                                    <Text style={styles.deviceStatusText}>Active Now</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                {/* --- DATA PRIVACY --- */}
                <View style={styles.sectionWrapper}>
                    <Text style={styles.sectionTitle}>Data Privacy</Text>

                    <View style={styles.card}>
                        {/* Download Data */}
                        <View style={styles.listItemColumn}>
                            <Text style={styles.itemTitle}>Download My Data</Text>
                            <Text style={styles.itemSubtitle}>
                                Get a copy of your order history, preferences, and gallery favorites.
                            </Text>
                            <TouchableOpacity activeOpacity={0.8} style={styles.primaryButton}>
                                <MaterialCommunityIcons name="download-outline" size={18} color="#FFFFFF" />
                                <Text style={styles.primaryButtonText}>Request Download</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.divider} />

                        {/* Personalization */}
                        <View style={styles.listItem}>
                            <View style={[styles.itemTextWrapper, { paddingRight: 15 }]}>
                                <Text style={styles.itemTitle}>Personalization & Ads</Text>
                                <Text style={styles.itemSubtitle}>Allow us to suggest treats you'll love</Text>
                            </View>
                            <Switch
                                value={permission}
                                onValueChange={(val) => setPermission(val)}
                                trackColor={{ false: "#EFE8E2", true: "#8B6A5B" }}
                                thumbColor={Platform.OS === 'ios' ? "#FFFFFF" : (permission ? "#FFFFFF" : "#F4F4F4")}
                            />
                        </View>
                    </View>
                </View>

                {/* --- PERMISSIONS --- */}
                <View style={styles.sectionWrapper}>
                    <Text style={styles.sectionTitle}>Permissions</Text>

                    <View style={styles.card}>
                        <TouchableOpacity style={styles.listItem} activeOpacity={0.7}>
                            <View style={styles.rowCentered}>
                                <View style={[styles.iconNest, { backgroundColor: "#FDF3D5", width: 38, height: 38, borderRadius: 19, marginRight: 12 }]}>
                                    <Ionicons name="location-outline" size={18} color="#B58A24" />
                                </View>
                                <Text style={styles.itemTitle}>Location Access</Text>
                            </View>
                            <View style={styles.rowCentered}>
                                <Text style={styles.statusText}>While Using</Text>
                                <MaterialCommunityIcons name="chevron-right" size={20} color="#A8A085" />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* --- DANGER ZONE --- */}
                <View style={[styles.sectionWrapper, { marginTop: 10, marginBottom: 20 }]}>
                    <TouchableOpacity 
                        onPress={delacc}
                        style={styles.deleteCard}
                        activeOpacity={0.8}
                    >
                        <MaterialCommunityIcons name="trash-can-outline" size={22} color="#D84C3E" />
                        <Text style={styles.deleteAccountLabel}>Delete Account</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

export default Securitypage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FCF9F2", // Cohesive cream background
    },
    scrollContent: {
        paddingHorizontal: 22,
        paddingBottom: 40,
    },
    
    /* Hero Section */
    heroCard: {
        width: "100%",
        height: 180,
        justifyContent: "flex-end",
        borderRadius: 24,
        overflow: "hidden",
        marginTop: 10,
        elevation: 4,
        shadowColor: "#8B8467",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
    },
    heroImage: {
        borderRadius: 24,
    },
    darkLayer: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.35)", // Slightly darker for better text contrast
    },
    contentArea: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    securityTag: {
        alignSelf: "flex-start",
        backgroundColor: "#F3CFC3", // Match gold/premium badge colors
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        marginBottom: 10,
    },
    securityTagText: {
        color: "#8B6A5B",
        fontSize: 10,
        fontWeight: "800",
        letterSpacing: 1,
    },
    heroHeading: {
        color: "#FFFFFF",
        fontSize: 22,
        fontWeight: "700",
        lineHeight: 28,
        maxWidth: "90%",
    },
    introText: {
        color: "#8E8873",
        fontSize: 14,
        lineHeight: 22,
        marginTop: 20,
        marginBottom: 30,
        paddingHorizontal: 4,
    },

    /* Sections & Cards */
    sectionWrapper: {
        marginBottom: 26,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "800",
        color: "#9B8A67", // Subtle subheading color
        marginBottom: 12,
        marginLeft: 8,
        textTransform: "uppercase",
        letterSpacing: 1,
    },
    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 24,
        elevation: 2, // Android Shadow
        shadowColor: "#8B8467", // iOS Shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
    },
    divider: {
        height: 1,
        backgroundColor: "#F4EFE6",
        marginHorizontal: 20,
    },

    /* List Items */
    listItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    listItemColumn: {
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    itemTextWrapper: {
        flex: 1,
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#403A28",
        marginBottom: 4,
    },
    itemSubtitle: {
        fontSize: 13,
        color: "#8E8873",
        lineHeight: 18,
    },
    rowCentered: {
        flexDirection: "row",
        alignItems: "center",
    },

    /* Activity Section Specifics */
    activityHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: '100%',
        marginBottom: 16,
    },
    viewAllText: {
        fontSize: 14,
        fontWeight: "700",
        color: "#8B6A5B",
    },
    deviceInfoContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FCFAEF", // Subtle background for the device
        padding: 12,
        borderRadius: 16,
        width: '100%',
    },
    iconNest: {
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 14,
    },
    deviceTextContainer: {
        flex: 1,
        justifyContent: "center",
    },
    deviceTitleText: {
        fontSize: 15,
        fontWeight: "700",
        color: "#403A28",
        marginBottom: 2,
    },
    deviceStatusText: {
        fontSize: 13,
        color: "#4A8F79", // A soft positive green
        fontWeight: "600",
    },

    /* Download Button */
    primaryButton: {
        alignSelf: "flex-start",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#8B6A5B",
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 12,
        marginTop: 14,
    },
    primaryButtonText: {
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "700",
        marginLeft: 8,
    },

    /* Permissions Specifics */
    statusText: {
        fontSize: 14,
        color: "#9B8A67",
        marginRight: 6,
    },

    /* Danger Zone */
    deleteCard: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFF8F7", // Soft red tint
        borderWidth: 1.5,
        borderColor: "#FAD4D0",
        borderRadius: 24,
        paddingVertical: 18,
    },
    deleteAccountLabel: {
        fontSize: 16,
        fontWeight: "700",
        color: "#D84C3E",
        marginLeft: 10,
    },
});