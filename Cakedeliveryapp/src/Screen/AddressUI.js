import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    StatusBar,
    Alert,
    ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import Detailsheader from "../components/Detailsheader";

const STATES = [
    "Andhra Pradesh", "Assam", "Bihar", "Delhi", "Gujarat",
    "Karnataka", "Kerala", "Maharashtra", "Punjab", "Rajasthan",
    "Tamil Nadu", "Telangana", "Uttar Pradesh", "West Bengal",
];

const AddressUI = ({ navigation }) => {
    const [street, setStreet] = useState("");
    const [apartment, setApartment] = useState("");
    const [city, setCity] = useState("");
    const [selectedState, setSelectedState] = useState("");
    const [zip, setZip] = useState("");
    const [isDefault, setIsDefault] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [focusedField, setFocusedField] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        if (!street.trim() || !city.trim() || !selectedState || !zip.trim()) {
            Alert.alert("Required", "Please fill in all required fields.");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(
                "http://10.140.23.125:3000/api/address/save",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        street,
                        apartment,
                        city,
                        state: selectedState,
                        zip,
                        isDefault,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to save address");
            }

            Alert.alert("Success", data.message);

            navigation.navigate("Profilescreen");

        } catch (error) {
            Alert.alert("Error", error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDiscard = () => {
        setStreet("");
        setApartment("");
        setCity("");
        setSelectedState("");
        setZip("");
        setIsDefault(false);
        setShowDropdown(false);
        setFocusedField(null);
    };

    const getBorder = (field) =>
        focusedField === field ? "#9B7A65" : "#E6D9BA";

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#FAF6EE" barStyle="dark-content" />
            <Detailsheader />

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                {/* Hero Card */}
                <View style={styles.heroCard}>
                    <View style={styles.heroBadge}>
                        <Ionicons name="location-outline" size={16} color="#7B5230" />
                        <Text style={styles.heroBadgeText}>Delivery address</Text>
                    </View>
                    <Text style={styles.heroTitle}>Deliver the Magic</Text>
                    <Text style={styles.heroSub}>
                        Ensure your artisanal treats arrive perfectly. Update your
                        delivery coordinates below for seamless cake delivery.
                    </Text>
                </View>

                {/* Form Section */}
                <Text style={styles.sectionLabel}>Address details</Text>
                <View style={styles.fieldsCard}>

                    {/* Street */}
                    <View style={[styles.fieldRow, { borderBottomWidth: 0.5, borderBottomColor: "#F0E8D8" }]}>
                        <View style={styles.fieldIconWrap}>
                            <Ionicons name="map-outline" size={17} color="#9B6E55" />
                        </View>
                        <View style={styles.fieldContent}>
                            <Text style={styles.fieldLabel}>Street address</Text>
                            <TextInput
                                style={styles.fieldInput}
                                placeholder="123 Patisserie Lane"
                                placeholderTextColor="#C4B8A4"
                                value={street}
                                onChangeText={setStreet}
                                onFocus={() => setFocusedField("street")}
                                onBlur={() => setFocusedField(null)}
                            />
                        </View>
                    </View>

                    {/* Apartment */}
                    <View style={[styles.fieldRow, { borderBottomWidth: 0.5, borderBottomColor: "#F0E8D8" }]}>
                        <View style={styles.fieldIconWrap}>
                            <Ionicons name="business-outline" size={17} color="#9B6E55" />
                        </View>
                        <View style={styles.fieldContent}>
                            <Text style={styles.fieldLabel}>Apartment / Suite <Text style={styles.optional}>(optional)</Text></Text>
                            <TextInput
                                style={styles.fieldInput}
                                placeholder="Suite 4B"
                                placeholderTextColor="#C4B8A4"
                                value={apartment}
                                onChangeText={setApartment}
                                onFocus={() => setFocusedField("apt")}
                                onBlur={() => setFocusedField(null)}
                            />
                        </View>
                    </View>

                    {/* City */}
                    <View style={[styles.fieldRow, { borderBottomWidth: 0.5, borderBottomColor: "#F0E8D8" }]}>
                        <View style={styles.fieldIconWrap}>
                            <Ionicons name="storefront-outline" size={17} color="#9B6E55" />
                        </View>
                        <View style={styles.fieldContent}>
                            <Text style={styles.fieldLabel}>City</Text>
                            <TextInput
                                style={styles.fieldInput}
                                placeholder="Confection City"
                                placeholderTextColor="#C4B8A4"
                                value={city}
                                onChangeText={setCity}
                                onFocus={() => setFocusedField("city")}
                                onBlur={() => setFocusedField(null)}
                            />
                        </View>
                    </View>

                    {/* State Dropdown */}
                    <View style={[styles.fieldRow, { borderBottomWidth: 0.5, borderBottomColor: "#F0E8D8" }]}>
                        <View style={styles.fieldIconWrap}>
                            <Ionicons name="flag-outline" size={17} color="#9B6E55" />
                        </View>
                        <View style={styles.fieldContent}>
                            <Text style={styles.fieldLabel}>State</Text>
                            <TouchableOpacity
                                onPress={() => setShowDropdown(!showDropdown)}
                                style={styles.dropdownTrigger}
                                activeOpacity={0.7}
                            >
                                <Text style={[styles.fieldInput, !selectedState && { color: "#C4B8A4" }]}>
                                    {selectedState || "Select state"}
                                </Text>
                                <Ionicons
                                    name={showDropdown ? "chevron-up-outline" : "chevron-down-outline"}
                                    size={16}
                                    color="#9B7A65"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* ZIP */}
                    <View style={styles.fieldRow}>
                        <View style={styles.fieldIconWrap}>
                            <Ionicons name="pin-outline" size={17} color="#9B6E55" />
                        </View>
                        <View style={styles.fieldContent}>
                            <Text style={styles.fieldLabel}>ZIP / PIN code</Text>
                            <TextInput
                                style={styles.fieldInput}
                                placeholder="700001"
                                placeholderTextColor="#C4B8A4"
                                keyboardType="numeric"
                                maxLength={6}
                                value={zip}
                                onChangeText={setZip}
                                onFocus={() => setFocusedField("zip")}
                                onBlur={() => setFocusedField(null)}
                            />
                        </View>
                    </View>
                </View>

                {/* Dropdown list */}
                {showDropdown && (
                    <View style={styles.dropdownList}>
                        <ScrollView nestedScrollEnabled style={{ maxHeight: 220 }}>
                            {STATES.map((s) => (
                                <TouchableOpacity
                                    key={s}
                                    style={[
                                        styles.dropdownItem,
                                        selectedState === s && styles.dropdownItemActive,
                                    ]}
                                    onPress={() => {
                                        setSelectedState(s);
                                        setShowDropdown(false);
                                    }}
                                >
                                    <Text
                                        style={[
                                            styles.dropdownItemText,
                                            selectedState === s && styles.dropdownItemTextActive,
                                        ]}
                                    >
                                        {s}
                                    </Text>
                                    {selectedState === s && (
                                        <Ionicons name="checkmark-outline" size={16} color="#7B5E57" />
                                    )}
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                )}

                {/* Default Toggle Card */}
                <View style={styles.toggleCard}>
                    <View style={styles.toggleLeft}>
                        <View style={styles.toggleIconWrap}>
                            <Ionicons name="home-outline" size={18} color="#7B5230" />
                        </View>
                        <View>
                            <Text style={styles.toggleTitle}>Set as default</Text>
                            <Text style={styles.toggleSub}>Use as my primary delivery address</Text>
                        </View>
                    </View>
                    <TouchableOpacity
                        onPress={() => setIsDefault(!isDefault)}
                        activeOpacity={0.8}
                        style={[styles.toggleTrack, isDefault && styles.toggleTrackOn]}
                    >
                        <View style={[styles.toggleKnob, isDefault && styles.toggleKnobOn]} />
                    </TouchableOpacity>
                </View>

                {/* Save Button */}
                <TouchableOpacity
                    style={styles.saveBtn}
                    onPress={handleSave}
                    activeOpacity={0.85}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" size="small" />
                    ) : (
                        <>
                            <Ionicons name="checkmark-outline" size={18} color="#fff" style={{ marginRight: 6 }} />
                            <Text style={styles.saveBtnText}>Save address</Text>
                        </>
                    )}
                </TouchableOpacity>

                {/* Discard */}
                <TouchableOpacity onPress={handleDiscard} style={styles.discardBtn} activeOpacity={0.7}>
                    <Text style={styles.discardText}>Discard changes</Text>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    );
};

export default AddressUI;

const styles = StyleSheet.create({
    /* ── Root ── */
    container: {
        flex: 1,
        backgroundColor: "#FAF6EE",
    },

    /* ── Scroll ── */
    scrollContent: {
        paddingHorizontal: 20,
        paddingTop: 24,
        paddingBottom: 48,
        gap: 16,
    },

    /* ── Hero Card ── */
    heroCard: {
        backgroundColor: "#E9DFC3",
        borderRadius: 28,
        padding: 22,
        borderWidth: 0.5,
        borderColor: "#D4C8A4",
        gap: 8,
    },
    heroBadge: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        backgroundColor: "#EDD9C4",
        alignSelf: "flex-start",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
        marginBottom: 4,
    },
    heroBadgeText: {
        fontSize: 11,
        fontWeight: "600",
        color: "#7B5230",
        letterSpacing: 0.4,
    },
    heroTitle: {
        fontSize: 22,
        fontWeight: "700",
        color: "#5C3D2E",
    },
    heroSub: {
        fontSize: 13,
        color: "#8B7055",
        lineHeight: 20,
    },

    /* ── Section label ── */
    sectionLabel: {
        fontSize: 11,
        fontWeight: "600",
        color: "#8B7055",
        letterSpacing: 0.8,
        textTransform: "uppercase",
        paddingLeft: 4,
        marginBottom: -4,
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
    optional: {
        fontSize: 10,
        color: "#C4B8A4",
        fontWeight: "400",
    },
    fieldInput: {
        fontSize: 14,
        color: "#3D2B1F",
        paddingVertical: 0,
    },
    dropdownTrigger: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    /* ── Dropdown List ── */
    dropdownList: {
        backgroundColor: "#fff",
        borderRadius: 16,
        borderWidth: 0.5,
        borderColor: "#E0D5BE",
        overflow: "hidden",
        marginTop: -8,
    },
    dropdownItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingVertical: 13,
        borderBottomWidth: 0.5,
        borderBottomColor: "#F0E8D8",
    },
    dropdownItemActive: {
        backgroundColor: "#FDF7E8",
    },
    dropdownItemText: {
        fontSize: 14,
        color: "#5C3D2E",
    },
    dropdownItemTextActive: {
        fontWeight: "600",
        color: "#7B5E57",
    },

    /* ── Toggle Card ── */
    toggleCard: {
        backgroundColor: "#fff",
        borderRadius: 20,
        borderWidth: 0.5,
        borderColor: "#E0D5BE",
        paddingHorizontal: 16,
        paddingVertical: 14,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    toggleLeft: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        flex: 1,
    },
    toggleIconWrap: {
        width: 42,
        height: 42,
        borderRadius: 14,
        backgroundColor: "#F5EDD8",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
    },
    toggleTitle: {
        fontSize: 14,
        fontWeight: "600",
        color: "#5C3D2E",
        marginBottom: 2,
    },
    toggleSub: {
        fontSize: 11,
        color: "#9B8070",
    },
    toggleTrack: {
        width: 46,
        height: 26,
        borderRadius: 13,
        backgroundColor: "#E0D5BE",
        justifyContent: "center",
        paddingHorizontal: 3,
        flexShrink: 0,
    },
    toggleTrackOn: {
        backgroundColor: "#7B5E57",
    },
    toggleKnob: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: "#fff",
        alignSelf: "flex-start",
    },
    toggleKnobOn: {
        alignSelf: "flex-end",
    },

    /* ── Save Button ── */
    saveBtn: {
        backgroundColor: "#7B5E57",
        borderRadius: 18,
        paddingVertical: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 4,
    },
    saveBtnText: {
        fontSize: 15,
        fontWeight: "600",
        color: "#fff",
    },

    /* ── Discard ── */
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