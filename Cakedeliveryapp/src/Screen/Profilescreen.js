import { SafeAreaView } from "react-native-safe-area-context";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Image,
    RefreshControl,
    ActivityIndicator,
    Alert,
    StyleSheet,
    StatusBar,
    Animated,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useState, useRef } from "react";

const Profilescreen = ({ navigation }) => {
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [focusedField, setFocusedField] = useState(null);

    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => setRefreshing(false), 1500);
    };

    const handleSave = () => {
        if (!fullName.trim() || !email.trim() || !phone.trim()) {
            Alert.alert("Required", "Please fill in all fields before saving.");
            return;
        }
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            Alert.alert("Saved", "Your profile has been updated.");
            navigation.navigate("Adressscreen");
        }, 1200);
    };

    const handleDiscard = () => {
        setFullName("");
        setEmail("");
        setPhone("");
        setCurrentPassword("");
        setNewPassword("");
        setFocusedField(null);
    };

    const getBorderColor = (fieldName) =>
        focusedField === fieldName ? "#9B7A65" : "#E6D9BA";

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#FAF6EE" barStyle="dark-content" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backBtn}
                >
                    <Ionicons name="arrow-back-outline" size={22} color="#7B5E57" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Edit Profile</Text>
                <View style={{ width: 36 }} />
            </View>

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                style={styles.scroll}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                {/* Page heading */}
                <View style={styles.pageHeading}>
                    <Text style={styles.pageTitle}>Your Pâtisserie Identity</Text>
                    <Text style={styles.pageSubtitle}>Keep your sweet details up to date</Text>
                </View>

                {/* Hero / Avatar Card */}
                <View style={styles.heroCard}>
                    <View style={styles.avatarWrap}>
                        <Image
                            source={{ uri: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=300" }}
                            style={styles.avatarImg}
                        />
                        <TouchableOpacity
                            style={styles.camBtn}
                            onPress={() =>
                                Alert.alert("Profile Photo", "Upload image feature coming soon.")
                            }
                        >
                            <Ionicons name="camera-outline" size={14} color="#fff" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.heroTextWrap}>
                        <Text style={styles.heroName}>Artisan Baker</Text>
                        <Text style={styles.heroSub}>
                            Shown on your invoices and{"\n"}personalized recommendations
                        </Text>
                    </View>
                </View>

                {/* Personal Info Section */}
                <Text style={styles.sectionLabel}>Personal info</Text>
                <View style={styles.fieldsCard}>

                    {/* Full Name */}
                    <View style={[styles.fieldRow, { borderBottomWidth: 0.5, borderBottomColor: "#F0E8D8" }]}>
                        <View style={styles.fieldIconWrap}>
                            <Ionicons name="person-outline" size={17} color="#9B6E55" />
                        </View>
                        <View style={styles.fieldContent}>
                            <Text style={styles.fieldLabel}>Full name</Text>
                            <TextInput
                                style={styles.fieldInput}
                                placeholder="Enter your name"
                                placeholderTextColor="#C4B8A4"
                                value={fullName}
                                onChangeText={setFullName}
                                onFocus={() => setFocusedField("name")}
                                onBlur={() => setFocusedField(null)}
                            />
                        </View>
                    </View>

                    {/* Email */}
                    <View style={[styles.fieldRow, { borderBottomWidth: 0.5, borderBottomColor: "#F0E8D8" }]}>
                        <View style={styles.fieldIconWrap}>
                            <Ionicons name="mail-outline" size={17} color="#9B6E55" />
                        </View>
                        <View style={styles.fieldContent}>
                            <Text style={styles.fieldLabel}>Email address</Text>
                            <TextInput
                                style={styles.fieldInput}
                                placeholder="Enter your email"
                                placeholderTextColor="#C4B8A4"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                value={email}
                                onChangeText={setEmail}
                                onFocus={() => setFocusedField("email")}
                                onBlur={() => setFocusedField(null)}
                            />
                        </View>
                    </View>

                    {/* Phone */}
                    <View style={styles.fieldRow}>
                        <View style={styles.fieldIconWrap}>
                            <Ionicons name="call-outline" size={17} color="#9B6E55" />
                        </View>
                        <View style={styles.fieldContent}>
                            <Text style={styles.fieldLabel}>Phone number</Text>
                            <TextInput
                                style={styles.fieldInput}
                                placeholder="Enter mobile number"
                                placeholderTextColor="#C4B8A4"
                                keyboardType="phone-pad"
                                maxLength={10}
                                value={phone}
                                onChangeText={setPhone}
                                onFocus={() => setFocusedField("phone")}
                                onBlur={() => setFocusedField(null)}
                            />
                        </View>
                    </View>
                </View>

                {/* Security Section */}
                <Text style={styles.sectionLabel}>Security</Text>
                <View style={styles.securityCard}>

                    <View style={styles.secHeader}>
                        <View style={styles.secBadge}>
                            <Ionicons name="lock-closed-outline" size={16} color="#7B5230" />
                        </View>
                        <Text style={styles.secTitle}>Change password</Text>
                    </View>

                    {/* Current Password */}
                    <Text style={styles.pwLabel}>Current password</Text>
                    <View style={[styles.pwInputWrap, { borderColor: getBorderColor("currentPw") }]}>
                        <Ionicons name="key-outline" size={16} color="#9B7A65" style={{ marginRight: 8 }} />
                        <TextInput
                            style={styles.pwInput}
                            placeholder="••••••••"
                            placeholderTextColor="#C4B0A0"
                            secureTextEntry={!showCurrentPassword}
                            value={currentPassword}
                            onChangeText={setCurrentPassword}
                            onFocus={() => setFocusedField("currentPw")}
                            onBlur={() => setFocusedField(null)}
                        />
                        <TouchableOpacity onPress={() => setShowCurrentPassword(!showCurrentPassword)}>
                            <Ionicons
                                name={showCurrentPassword ? "eye-off-outline" : "eye-outline"}
                                size={18}
                                color="#9B7A65"
                            />
                        </TouchableOpacity>
                    </View>

                    {/* New Password */}
                    <Text style={[styles.pwLabel, { marginTop: 14 }]}>New password</Text>
                    <View style={[styles.pwInputWrap, { borderColor: getBorderColor("newPw") }]}>
                        <Ionicons name="lock-closed-outline" size={16} color="#9B7A65" style={{ marginRight: 8 }} />
                        <TextInput
                            style={styles.pwInput}
                            placeholder="Enter new password"
                            placeholderTextColor="#C4B0A0"
                            secureTextEntry={!showNewPassword}
                            value={newPassword}
                            onChangeText={setNewPassword}
                            onFocus={() => setFocusedField("newPw")}
                            onBlur={() => setFocusedField(null)}
                        />
                        <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)}>
                            <Ionicons
                                name={showNewPassword ? "eye-off-outline" : "eye-outline"}
                                size={18}
                                color="#9B7A65"
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Action Buttons */}
                <TouchableOpacity style={styles.saveBtn} onPress={handleSave} activeOpacity={0.85}>
                    {loading ? (
                        <ActivityIndicator color="#fff" size="small" />
                    ) : (
                        <>
                            <Ionicons name="checkmark-outline" size={18} color="#fff" style={{ marginRight: 6 }} />
                            <Text style={styles.saveBtnText}>Save changes</Text>
                        </>
                    )}
                </TouchableOpacity>

                <TouchableOpacity onPress={handleDiscard} style={styles.discardBtn} activeOpacity={0.7}>
                    <Text style={styles.discardText}>Discard edits</Text>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    );
};

export default Profilescreen;

const styles = StyleSheet.create({
    /* ── Root ── */
    container: {
        flex: 1,
        backgroundColor: "#FAF6EE",
    },

    /* ── Header ── */
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: "#FAF6EE",
        borderBottomWidth: 0.5,
        borderBottomColor: "#E8DFC8",
    },
    backBtn: {
        width: 36,
        height: 36,
        borderRadius: 12,
        backgroundColor: "#F0E8D8",
        alignItems: "center",
        justifyContent: "center",
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#5C4535",
    },

    /* ── Scroll ── */
    scroll: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingTop: 24,
        paddingBottom: 48,
        gap: 16,
    },

    /* ── Page heading ── */
    pageHeading: {
        alignItems: "center",
        marginBottom: 4,
    },
    pageTitle: {
        fontSize: 20,
        fontWeight: "700",
        color: "#5C3D2E",
        marginBottom: 4,
    },
    pageSubtitle: {
        fontSize: 13,
        color: "#9B8070",
    },

    /* ── Hero Card ── */
    heroCard: {
        backgroundColor: "#E9DFC3",
        borderRadius: 28,
        paddingVertical: 24,
        paddingHorizontal: 20,
        alignItems: "center",
        gap: 14,
        borderWidth: 0.5,
        borderColor: "#D4C8A4",
    },
    avatarWrap: {
        position: "relative",
        width: 96,
        height: 96,
    },
    avatarImg: {
        width: 96,
        height: 96,
        borderRadius: 28,
        borderWidth: 3,
        borderColor: "#fff",
    },
    camBtn: {
        position: "absolute",
        bottom: -6,
        right: -6,
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: "#7B5E57",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        borderColor: "#FAF6EE",
        elevation: 3,
    },
    heroTextWrap: {
        alignItems: "center",
        gap: 4,
    },
    heroName: {
        fontSize: 15,
        fontWeight: "600",
        color: "#5C3D2E",
    },
    heroSub: {
        fontSize: 12,
        color: "#8B7055",
        lineHeight: 18,
        textAlign: "center",
    },

    /* ── Section label ── */
    sectionLabel: {
        fontSize: 11,
        fontWeight: "600",
        color: "#8B7055",
        letterSpacing: 0.8,
        textTransform: "uppercase",
        marginBottom: -8,
        paddingLeft: 4,
    },

    /* ── Fields Card ── */
    fieldsCard: {
        backgroundColor: "#fff",
        borderRadius: 20,
        borderWidth: 0.5,
        borderColor: "#E0D5BE",
        overflow: "hidden",
    },
    fieldRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
    },
    fieldIconWrap: {
        width: 36,
        height: 36,
        borderRadius: 12,
        backgroundColor: "#F5EDD8",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
    },
    fieldContent: {
        flex: 1,
        gap: 2,
    },
    fieldLabel: {
        fontSize: 11,
        color: "#A0907A",
    },
    fieldInput: {
        fontSize: 14,
        color: "#3D2B1F",
        paddingVertical: 0,
    },

    /* ── Security Card ── */
    securityCard: {
        backgroundColor: "#FDF7E8",
        borderRadius: 20,
        borderWidth: 0.5,
        borderColor: "#E6D9BA",
        padding: 18,
        gap: 8,
    },
    secHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        marginBottom: 6,
    },
    secBadge: {
        width: 32,
        height: 32,
        borderRadius: 10,
        backgroundColor: "#EDD9C4",
        alignItems: "center",
        justifyContent: "center",
    },
    secTitle: {
        fontSize: 14,
        fontWeight: "600",
        color: "#5C3D2E",
    },
    pwLabel: {
        fontSize: 12,
        color: "#8B7055",
        marginBottom: 4,
    },
    pwInputWrap: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FAEBD8",
        borderRadius: 14,
        paddingHorizontal: 14,
        paddingVertical: 12,
        borderWidth: 1,
    },
    pwInput: {
        flex: 1,
        fontSize: 14,
        color: "#3D2B1F",
        paddingVertical: 0,
    },

    /* ── Action Buttons ── */
    saveBtn: {
        backgroundColor: "#7B5E57",
        borderRadius: 18,
        paddingVertical: 16,
        marginTop: 8,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    saveBtnText: {
        fontSize: 15,
        fontWeight: "600",
        color: "#fff",
    },
    discardBtn: {
        alignItems: "center",
        paddingVertical: 8,
    },
    discardText: {
        fontSize: 13,
        color: "#9B7A65",
        textDecorationLine: "underline",
    },
});