import { SafeAreaView } from "react-native-safe-area-context"
import { StyleSheet, ScrollView, StatusBar, ImageBackground, TouchableOpacity, View, Text, Switch } from "react-native"
import Securityheader from "../components/Securityheader"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';


const Securitypage = () => {
    return (
        <SafeAreaView style={styles.securitypage} >
            <StatusBar backgroundColor="#fff9e6cc" barStyle={"dark-content"} />
            <Securityheader title={"Privacy & Security"} />
            <ScrollView vertical contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 20 }} >
                <ImageBackground
                    source={{
                        uri: "https://images.unsplash.com/photo-1578985545062-69928b1d9587",
                    }}
                    style={styles.heroCard}
                    imageStyle={styles.heroImage}
                >
                    <View style={styles.darkLayer} />

                    <View style={styles.contentArea}>
                        <View style={styles.securityTag}>
                            <Text style={styles.securityTagText}>
                                SECURITY HUB
                            </Text>
                        </View>

                        <Text style={styles.heroHeading}>
                            Your data is the secret ingredient.
                        </Text>
                    </View>
                </ImageBackground>
                <View style={styles.textsection} >
                    <Text style={styles.textbody} >
                        At The Artisanal Pâtisserie, we protect your personal information with the same precision we use to temper our dark chocolate. Your trust is our most cherished recipe.
                    </Text>
                </View>

                <View style={styles.securityPageWrapper}>
                    <View style={styles.securitySectionHeader}>
                        <MaterialCommunityIcons
                            name="shield-lock-outline"
                            size={18}
                            color="#9A694F"
                        />

                        <Text style={styles.securitySectionTitle}>
                            Security Settings
                        </Text>
                    </View>

                    <View style={styles.securityCardContainer}>

                        {/* Two Factor */}
                        <View style={styles.securityOptionContainer}>
                            <View style={styles.securityOptionTextWrapper}>
                                <Text style={styles.securityOptionHeading}>
                                    Two-Factor Authentication
                                </Text>

                                <Text style={styles.securityOptionSubHeading}>
                                    Secure your account with a code
                                </Text>
                            </View>

                            <Switch
                                value={false}
                                trackColor={{
                                    false: "#E8E1B8",
                                    true: "#E8E1B8",
                                }}
                                thumbColor="#6E6641"
                            />
                        </View>

                        {/* Change Password */}
                        <View style={styles.securityOptionContainer}>
                            <View style={styles.securityOptionTextWrapper}>
                                <Text style={styles.securityOptionHeading}>
                                    Change Password
                                </Text>

                                <Text style={styles.securityOptionSubHeading}>
                                    Last updated 3 months ago
                                </Text>
                            </View>

                            <MaterialCommunityIcons
                                name="chevron-right"
                                size={26}
                                color="#C5B98B"
                            />
                        </View>

                        {/* Recent Activity */}
                        <View style={styles.securityRecentActivityWrapper}>
                            <View style={styles.securityRecentActivityHeader}>
                                <Text style={styles.securityRecentActivityTitle}>
                                    Recent Login Activity
                                </Text>

                                <Text style={styles.securityViewAllText}>
                                    View All
                                </Text>
                            </View>

                            <View style={styles.securityDeviceInfoContainer}>
                                <View style={styles.securityDeviceIconCircle}>
                                    <Ionicons
                                        name="phone-portrait-outline"
                                        size={20}
                                        color="#68566A"
                                    />
                                </View>

                                <View style={styles.securityDeviceTextContainer}>
                                    <Text style={styles.securityDeviceLocationText}>
                                        iPhone 15 Pro • Paris, FR
                                    </Text>

                                    <Text style={styles.securityDeviceStatusText}>
                                        Active Now
                                    </Text>
                                </View>
                            </View>
                        </View>

                    </View>
                </View>

                <View style={styles.dataPrivacyScreenWrapper}>

                    {/* Header */}
                    <View style={styles.dataPrivacyHeaderRow}>
                        <MaterialCommunityIcons
                            name="database-outline"
                            size={22}
                            color="#8A6A56"
                        />

                        <Text style={styles.dataPrivacyHeaderText}>
                            Data Privacy
                        </Text>
                    </View>

                    {/* Download Data Card */}
                    <View style={styles.downloadDataCardContainer}>
                        <Text style={styles.downloadDataTitle}>
                            Download My Data
                        </Text>

                        <Text style={styles.downloadDataDescription}>
                            Get a copy of your order history, preferences, and gallery favorites.
                        </Text>

                        <TouchableOpacity style={styles.requestDownloadButton}>
                            <Text style={styles.requestDownloadButtonText}>
                                Request Download
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Personalization Card */}
                    <View style={styles.personalizationCardContainer}>
                        <View>
                            <Text style={styles.personalizationTitle}>
                                Personalization & Ads
                            </Text>

                            <Text style={styles.personalizationDescription}>
                                Allow us to suggest treats you'll love
                            </Text>
                        </View>

                        <Switch
                            value={true}
                            trackColor={{
                                false: "#D6D6D6",
                                true: "#D6D6D6",
                            }}
                            thumbColor="#FFFFFF"
                        />
                    </View>

                </View>

                <View style={styles.permissionPageShell}>

                    {/* Header */}
                    <View style={styles.permissionHeaderRow}>
                        <MaterialCommunityIcons
                            name="tune-variant"
                            size={22}
                            color="#8A6A56"
                        />

                        <Text style={styles.permissionHeaderTitle}>
                            Permissions
                        </Text>
                    </View>

                    {/* Permission Card */}
                    <View style={styles.permissionCardWrapper}>

                        {/* Location Access */}
                        <TouchableOpacity
                            style={styles.permissionItemRow}
                            activeOpacity={0.8}
                        >
                            <View style={styles.permissionLeftSection}>
                                <Ionicons
                                    name="location-outline"
                                    size={24}
                                    color="#8C744F"
                                />

                                <Text style={styles.permissionItemTitle}>
                                    Location Access
                                </Text>
                            </View>

                            <Text style={styles.permissionStatusText}>
                                While Using
                            </Text>
                        </TouchableOpacity>

                        {/* Notification Settings */}
                        {/* <TouchableOpacity
                            style={styles.permissionItemRow}
                            activeOpacity={0.8}
                        >
                            <View style={styles.permissionLeftSection}>
                                <Ionicons
                                    name="notifications-outline"
                                    size={24}
                                    color="#8C744F"
                                />

                                <Text style={styles.permissionItemTitle}>
                                    Notification Settings
                                </Text>
                            </View>

                            <MaterialCommunityIcons
                                name="chevron-right"
                                size={26}
                                color="#C3B58A"
                            />
                        </TouchableOpacity> */}

                    </View>

                    {/* Delete Account */}
                    <TouchableOpacity
                        style={styles.deleteAccountAction}
                        activeOpacity={0.8}
                    >
                        <MaterialCommunityIcons
                            name="trash-can-outline"
                            size={22}
                            color="#C93A35"
                        />

                        <Text style={styles.deleteAccountLabel}>
                            Delete Account
                        </Text>
                    </TouchableOpacity>

                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

export default Securitypage

const styles = StyleSheet.create({
    securitypage: {
        width: "100%",
        flex: 1,
        backgroundColor: "#fff9e6cc"
    },
    heroCard: {
        width: "100%",
        height: 190,
        justifyContent: "flex-end",
        borderRadius: 36,
        overflow: "hidden",
        marginTop: 20,
    },
    heroImage: {
        borderRadius: 36,
    },

    darkLayer: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.22)",
    },

    contentArea: {
        paddingHorizontal: 20,
        paddingBottom: 22,
    },

    securityTag: {
        alignSelf: "flex-start",
        backgroundColor: "#F2BDD0",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 4,
        marginBottom: 12,
    },

    securityTagText: {
        color: "#6D4F5D",
        fontSize: 11,
        fontWeight: "700",
        letterSpacing: 0.5,
    },

    heroHeading: {
        color: "#FFFFFF",
        fontSize: 18,
        fontWeight: "700",
        lineHeight: 26,
        maxWidth: "85%",
    },
    textsection: {
        marginTop: 16
    },
    textbody: {
        color: "#646040",
    },
    securityPageWrapper: {
        backgroundColor: "#F9F4E6",
        paddingTop: 30,
    },

    securitySectionHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 28,
    },

    securitySectionTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#5C4A3A",
        marginLeft: 10,
    },

    securityCardContainer: {
        backgroundColor: "#FCFAF4",
        borderRadius: 34,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: "#F1E7C8",
    },

    securityOptionContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 26,
        paddingVertical: 28,
    },

    securityOptionTextWrapper: {
        flex: 1,
    },

    securityOptionHeading: {
        fontSize: 17,
        fontWeight: "700",
        color: "#171717",
        marginBottom: 3,
    },

    securityOptionSubHeading: {
        fontSize: 15,
        fontWeight: "500",
        color: "#676767",
    },

    securityArrowWrapper: {
        justifyContent: "center",
        alignItems: "center",
    },

    securityRecentActivityWrapper: {
        paddingHorizontal: 26,
        paddingTop: 22,
        paddingBottom: 26,
    },

    securityRecentActivityHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 22,
    },

    securityRecentActivityTitle: {
        fontSize: 17,
        fontWeight: "700",
        color: "#171717",
    },

    securityViewAllText: {
        fontSize: 16,
        fontWeight: "700",
        color: "#5C4A3A",
    },

    securityDeviceInfoContainer: {
        flexDirection: "row",
        alignItems: "center",
    },

    securityDeviceIconCircle: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: "#F5DDE2",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 14,
    },

    securityDeviceTextContainer: {
        justifyContent: "center",
    },

    securityDeviceLocationText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#232323",
        marginBottom: 2,
    },

    securityDeviceStatusText: {
        fontSize: 15,
        color: "#5F5F5F",
    },

    securityToggleTrack: {
        width: 50,
        height: 28,
        borderRadius: 20,
        backgroundColor: "#E8E1B8",
        justifyContent: "center",
        paddingHorizontal: 3,
    },

    securityToggleThumb: {
        width: 22,
        height: 22,
        borderRadius: 11,
        backgroundColor: "#6E6641",
    },
    dataPrivacyScreenWrapper: {
        backgroundColor: "#F8F4E7",
        paddingTop: 24,
    },

    dataPrivacyHeaderRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },

    dataPrivacyHeaderText: {
        fontSize: 20,
        fontWeight: "700",
        color: "#6B5446",
        marginLeft: 10,
    },

    downloadDataCardContainer: {
        backgroundColor: "#F4EED2",
        borderRadius: 28,
        paddingHorizontal: 24,
        paddingVertical: 24,
        marginBottom: 18,
    },

    downloadDataTitle: {
        fontSize: 20,
        fontWeight: "700",
        color: "#1F1F1F",
        marginBottom: 12,
    },

    downloadDataDescription: {
        fontSize: 16,
        lineHeight: 24,
        color: "#5D5D5D",
        marginBottom: 22,
    },

    requestDownloadButton: {
        alignSelf: "flex-start",
        backgroundColor: "#8B6A5B",
        borderRadius: 30,
        paddingHorizontal: 24,
        paddingVertical: 12,
    },

    requestDownloadButtonText: {
        color: "#FFFFFF",
        fontSize: 15,
        fontWeight: "700",
    },

    personalizationCardContainer: {
        backgroundColor: "#F4EED2",
        borderRadius: 28,
        paddingHorizontal: 24,
        paddingVertical: 24,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    personalizationTitle: {
        fontSize: 20,
        fontWeight: "700",
        color: "#1F1F1F",
        marginBottom: 6,
    },

    personalizationDescription: {
        fontSize: 16,
        color: "#5D5D5D",
    },
    permissionPageShell: {
        backgroundColor: "#F8F4E7",
        paddingTop: 28,
    },

    permissionHeaderRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 28,
    },

    permissionHeaderTitle: {
        fontSize: 20,
        fontWeight: "700",
        color: "#6B5446",
        marginLeft: 10,
    },

    permissionCardWrapper: {
        backgroundColor: "#F7F2E2",
        borderRadius: 34,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "#F0E7C9",
    },

    permissionItemRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 28,
        paddingVertical: 26,
    },

    permissionLeftSection: {
        flexDirection: "row",
        alignItems: "center",
    },

    permissionItemTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#242424",
        marginLeft: 18,
    },

    permissionStatusText: {
        fontSize: 16,
        fontStyle: "italic",
        color: "#8A744F",
    },

    deleteAccountAction: {
        marginTop: 20,
        marginBottom: 24,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },

    deleteAccountLabel: {
        fontSize: 18,
        fontWeight: "700",
        color: "#C93A35",
        marginLeft: 10,
    },
})