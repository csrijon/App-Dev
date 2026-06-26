import { SafeAreaView } from "react-native-safe-area-context"
import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    ScrollView,
    TextInput,
    Image,
    Alert
} from "react-native";
import BakeryHeader from "../components/BakeryHeader"
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { launchImageLibrary } from "react-native-image-picker";

const MAX_DESCRIPTION_LENGTH = 220;

const Addnewcakepage = ({ navigation }) => {

    const [cakeName, setCakeName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [discount, setDiscount] = useState("");
    const [weight, setWeight] = useState("");
    const [couponCode, setCouponCode] = useState("");
    const [couponDiscount, setCouponDiscount] = useState("");
    const [imageUri, setImageUri] = useState(null);
    const [activeoffer, setnotactiveoffer] = useState(false);
    const [offers, setOffers] = useState([]);
    const [isAvailable, setIsAvailable] = useState(true);

    const [isCouponActive, setIsCouponActive] = useState(true);

    const selectImage = async () => {
        const result = await launchImageLibrary({
            mediaType: "photo",
        });

        if (!result.didCancel && result.assets?.length > 0) {
            setImageUri(result.assets[0].uri);
        }
    };

    const validateForm = () => {

        if (!cakeName.trim()) {
            Alert.alert("Error", "Cake Name Required");
            return false;
        }

        if (!price.trim()) {
            Alert.alert("Error", "Price Required");
            return false;
        }

        if (!imageUri) {
            Alert.alert("Error", "Upload Cake Image");
            return false;
        }

        return true;
    };

    const isFormReady = cakeName.trim().length > 0 && price.trim().length > 0 && !!imageUri;

    const discountedPrice = (() => {
        const p = parseFloat(price);
        const d = parseFloat(discount);
        if (isNaN(p)) return null;
        if (isNaN(d) || d <= 0) return p.toFixed(2);
        return (p - (p * d) / 100).toFixed(2);
    })();

    const addCake = () => {

        if (!validateForm()) return;

        const cakeData = {
            cakeName,
            description,
            price,
            discount,
            weight,
            couponCode,
            couponDiscount,
            imageUri,
            isAvailable
        };

        console.log(cakeData);

        Alert.alert(
            "Success",
            "Cake Added Successfully"
        );

        navigation.navigate("CatalogUpdatedScreen");
    };

    return (
        <SafeAreaView style={styles.Addnewcakecontainer} >
            <StatusBar backgroundColor="#fff8e6" barStyle="dark-content" />
            <BakeryHeader onPress={() => navigation.goBack()} />
            <ScrollView vertical showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }} >
                <View style={styles.screenContainer}>

                    {/* Heading */}
                    <View style={styles.headingRow}>
                        <View style={styles.headingAccentBar} />
                        <Text style={styles.smallHeading}>
                            CATALOG MANAGEMENT
                        </Text>
                    </View>

                    <Text style={styles.mainHeading}>
                        Add New Cake
                    </Text>

                    {/* Gallery Section */}
                    <View style={styles.sectionTitleRow}>
                        <Text style={styles.sectionTitle}>
                            Gallery Display
                        </Text>
                        {imageUri && (
                            <View style={styles.imageReadyPill}>
                                <Ionicons name="checkmark-circle" size={14} color="#3F7A53" />
                                <Text style={styles.imageReadyPillText}>Photo added</Text>
                            </View>
                        )}
                    </View>

                    {/* Upload Box */}
                    <TouchableOpacity activeOpacity={0.85} onPress={selectImage} style={styles.uploadBox}>

                        {imageUri ? (
                            <Image
                                source={{ uri: imageUri }}
                                style={styles.uploadedHeroImage}
                            />
                        ) : (
                            <>
                                <View style={styles.iconCircle}>
                                    <MaterialIcons name="add-a-photo" color="#75584e" size={26} />
                                </View>

                                <Text style={styles.uploadTitle}>
                                    Upload Hero Image
                                </Text>

                                <Text style={styles.uploadDescription}>
                                    Drop your high-resolution confectionery
                                    photography here. Minimum 1200px wide
                                    recommended.
                                </Text>
                            </>
                        )}

                        {imageUri && (
                            <View style={styles.changePhotoOverlay}>
                                <MaterialIcons name="edit" color="#FFFFFF" size={16} />
                                <Text style={styles.changePhotoOverlayText}>Change Photo</Text>
                            </View>
                        )}

                    </TouchableOpacity>

                </View>

                <View style={styles.mainScreenContainer}>

                    {/* Cake Name */}
                    <Text style={styles.formSectionLabel}>
                        Cake Name
                    </Text>

                    <TextInput
                        value={cakeName}
                        onChangeText={setCakeName}
                        placeholder="e.g. Midnight Truffle Rose"
                        placeholderTextColor="#B4AA8D"
                        style={styles.cakeNameInputField}
                    />

                    {/* Description */}
                    <View style={styles.sectionTitleRow}>
                        <Text style={styles.formSectionLabel}>
                            Description
                        </Text>
                        <Text style={styles.charCounter}>
                            {description.length}/{MAX_DESCRIPTION_LENGTH}
                        </Text>
                    </View>
                    <TextInput
                        value={description}
                        onChangeText={(text) => setDescription(text.slice(0, MAX_DESCRIPTION_LENGTH))}
                        multiline
                        textAlignVertical="top"
                        placeholder="Describe the flavor, texture, and occasion this cake is perfect for..."
                        placeholderTextColor="#B4AA8D"
                        style={styles.cakeDescriptionInput}
                    />
                    {/* Economics Section */}
                    <View style={styles.economicsInfoCard}>

                        <Text style={styles.economicsCardHeading}>
                            Economics & Weight
                        </Text>

                        {/* Price & Discount */}
                        <View style={styles.priceDiscountRow}>

                            <View style={styles.priceInputWrapper}>
                                <Text style={styles.inputFieldLabel}>
                                    Price ($)
                                </Text>

                                <TextInput
                                    value={price}
                                    onChangeText={setPrice}
                                    placeholder="0.00"
                                    placeholderTextColor="#A89B7E"
                                    keyboardType="numeric"
                                    style={styles.priceTextInput}
                                />
                            </View>

                            <View style={styles.discountInputWrapper}>
                                <Text style={styles.inputFieldLabel}>
                                    Discount (%)
                                </Text>

                                <TextInput
                                    value={discount}
                                    onChangeText={setDiscount}
                                    placeholder="0"
                                    placeholderTextColor="#A89B7E"
                                    keyboardType="numeric"
                                    style={styles.discountTextInput}
                                />
                            </View>

                        </View>

                        {discountedPrice && (
                            <View style={styles.finalPriceBanner}>
                                <Text style={styles.finalPriceLabel}>Customer pays</Text>
                                <Text style={styles.finalPriceValue}>${discountedPrice}</Text>
                            </View>
                        )}

                        {/* Weight */}
                        <View style={styles.weightInputContainer}>

                            <Text style={styles.inputFieldLabel}>
                                Weight (kg)
                            </Text>

                            <TextInput
                                value={weight}
                                onChangeText={setWeight}
                                placeholder="1.0"
                                placeholderTextColor="#A89B7E"
                                keyboardType="numeric"
                                style={styles.weightTextInput}
                            />

                        </View>

                    </View>

                </View>


                <View style={styles.screenWrapper}>

                    {/* Categorization Card */}
                    <View style={styles.categoryCardContainer}>

                        <Text style={styles.categoryHeadingText}>
                            Categorization
                        </Text>

                        {/* Flavor Profile */}
                        <View style={styles.dropdownSection}>

                            <Text style={styles.dropdownLabelText}>
                                Flavor Profile
                            </Text>

                            <TouchableOpacity style={styles.dropdownBox}>

                                <Text style={styles.dropdownValueText}>
                                    Valrhona Chocolate
                                </Text>

                                <Ionicons name="chevron-down" size={20} color="#6D5A4B" />

                            </TouchableOpacity>

                        </View>

                        {/* Category */}
                        <View style={styles.dropdownSection}>

                            <Text style={styles.dropdownLabelText}>
                                Category
                            </Text>

                            <TouchableOpacity style={styles.dropdownBox}>

                                <Text style={styles.dropdownValueText}>
                                    Wedding
                                </Text>

                                <Ionicons name="chevron-down" size={20} color="#6D5A4B" />

                            </TouchableOpacity>

                        </View>

                    </View>

                    {/* Availability Card */}
                    <View style={styles.availabilityCardContainer}>

                        <View style={styles.availabilityIconCircle}>
                            <MaterialIcons
                                name={isAvailable ? "storefront" : "storefront"}
                                size={24}
                                color="#A6624E"
                            />
                        </View>

                        <View style={styles.availabilityTextWrapper}>

                            <Text style={styles.availabilityHeadingText}>
                                Availability Status
                            </Text>

                            <Text style={styles.availabilityDescriptionText}>
                                Show this cake in the public store
                                catalog immediately.
                            </Text>

                        </View>

                        <TouchableOpacity
                            onPress={() => setIsAvailable(!isAvailable)}
                        >
                            <MaterialIcons
                                name={isAvailable ? "toggle-on" : "toggle-off"}
                                color={isAvailable ? "#7B5A4E" : "#C9BCA0"}
                                size={52}
                            />
                        </TouchableOpacity>

                    </View>

                </View>

                <View style={styles.couponOfferCard}>

                    <View style={styles.couponTopSection}>

                        <View style={{ flex: 1 }}>

                            <Text style={styles.couponOfferHeading}>
                                Coupon Offer
                            </Text>

                            <Text style={styles.couponOfferDescription}>
                                Add a promotional discount
                                for this cake listing.
                            </Text>

                        </View>

                        <TouchableOpacity onPress={() => setnotactiveoffer(!activeoffer)} >

                            <MaterialIcons name={activeoffer ? "toggle-off" : "toggle-on"} color={activeoffer ? "#C9BCA0" : "#75584e"} size={52} />

                        </TouchableOpacity>

                    </View>

                    {!activeoffer && (
                        <View style={styles.couponInputRow}>

                            <View style={styles.couponCodeWrapper}>

                                <Text style={styles.couponLabel}>
                                    Coupon Code
                                </Text>

                                <TextInput
                                    value={couponCode}
                                    onChangeText={(text) => setCouponCode(text.toUpperCase())}
                                    placeholder="e.g. SWEET20"
                                    placeholderTextColor="#B4AA8D"
                                    autoCapitalize="characters"
                                    style={styles.couponTextInput}
                                />

                            </View>

                            <View style={styles.discountWrapper}>

                                <Text style={styles.couponLabel}>
                                    OFF (%)
                                </Text>

                                <TextInput
                                    value={couponDiscount}
                                    onChangeText={setCouponDiscount}
                                    placeholder="20"
                                    placeholderTextColor="#B4AA8D"
                                    keyboardType="numeric"
                                    style={styles.discountTextInputField}
                                />
                            </View>

                        </View>
                    )}

                </View>


                <View style={styles.offerScreenContainer}>

                    {/* Top Header */}
                    <View style={styles.offerTopSection}>

                        <View>

                            <Text style={styles.offerHeadingText}>
                                Active Offers
                            </Text>

                            <Text style={styles.offerDescriptionText}>
                                Manage your current{"\n"}
                                storefront promotions.
                            </Text>

                        </View>

                        <View style={styles.activeOfferCountCard}>

                            <View style={styles.activeOfferRow}>
                                <Ionicons
                                    name="checkmark-circle-outline"
                                    size={14}
                                    color="#7A5C50"
                                />

                                <Text style={styles.activeOfferCount}>
                                    {offers.length}
                                </Text>
                            </View>

                            <Text style={styles.activeOfferText}>
                                ACTIVE
                            </Text>

                        </View>

                    </View>

                    {/* Coupon Card */}
                    <View style={styles.couponCardContainer}>

                        <View style={styles.leftAccentBar} />

                        <View style={styles.couponMainContent}>

                            {/* Left Icon */}
                            <View style={styles.couponIconCircle}>

                                <MaterialIcons
                                    name="confirmation-number"
                                    size={28}
                                    color="#6F5146"
                                />

                            </View>

                            {/* Center Content */}
                            <View style={styles.couponInfoSection}>

                                <View style={styles.couponTitleRow}>

                                    <Text style={styles.couponCodeText}>
                                        SWEET10
                                    </Text>

                                </View>

                                <Text style={styles.discountValueText}>
                                    10% Discount
                                </Text>

                                <Text style={styles.expiryDateText}>
                                    Exp. 12 Oct
                                </Text>

                            </View>

                            {/* Right Actions */}
                            <View style={styles.couponActionSection}>

                                <TouchableOpacity
                                    onPress={() => setIsCouponActive(!isCouponActive)}
                                >
                                    <MaterialIcons
                                        name={isCouponActive ? "toggle-on" : "toggle-off"}
                                        size={46}
                                        color={isCouponActive ? "#7A5C50" : "#C9BCA0"}
                                    />
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.editButton}>

                                    <Ionicons
                                        name="create-outline"
                                        size={16}
                                        color="#FFFFFF"
                                    />

                                </TouchableOpacity>

                            </View>

                        </View>

                    </View>

                </View>


            </ScrollView>
            <View style={styles.bottomButtonContainer}>

                {/* Save Draft */}
                <TouchableOpacity style={styles.draftButton}>

                    <Text style={styles.draftButtonText}>
                        Save as Draft
                    </Text>

                </TouchableOpacity>

                {/* Add to Catalog */}
                <TouchableOpacity
                    onPress={addCake}
                    style={[styles.catalogButton, !isFormReady && styles.catalogButtonDisabled]}
                >

                    <Ionicons
                        name="checkmark-circle-outline"
                        size={20}
                        color="#FFFFFF"
                        style={styles.checkIcon}
                    />

                    <Text style={styles.catalogButtonText}>
                        Add to Catalog
                    </Text>

                </TouchableOpacity>

            </View>
        </SafeAreaView>
    )
}

export default Addnewcakepage


const cardShadow = {
    shadowColor: "#3D2E22",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 14,
    elevation: 2,
};

const styles = StyleSheet.create({
    Addnewcakecontainer: {
        flex: 1,
        backgroundColor: "#F6F0DF",
    },
    screenContainer: {
        paddingTop: 24,
    },

    headingRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
    },

    headingAccentBar: {
        width: 18,
        height: 3,
        borderRadius: 2,
        backgroundColor: "#A6624E",
        marginRight: 8,
    },

    smallHeading: {
        fontSize: 13,
        fontWeight: "700",
        letterSpacing: 2,
        color: "#8C6A4F",
    },

    mainHeading: {
        fontSize: 34,
        fontWeight: "800",
        color: "#2E241D",
        marginBottom: 28,
        letterSpacing: -0.5,
    },

    sectionTitleRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 14,
    },

    sectionTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#363317",
    },

    imageReadyPill: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#E2F0E5",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 16,
    },

    imageReadyPillText: {
        fontSize: 12,
        fontWeight: "600",
        color: "#3F7A53",
        marginLeft: 4,
    },

    uploadBox: {
        width: "100%",
        height: 270,
        borderWidth: 2,
        borderStyle: "dashed",
        borderColor: "#D2B89B",
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 28,
        backgroundColor: "#F3EACF",
        overflow: "hidden",
        position: "relative",
    },

    uploadedHeroImage: {
        width: "100%",
        height: "100%",
        borderRadius: 28,
    },

    changePhotoOverlay: {
        position: "absolute",
        bottom: 14,
        right: 14,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(45,33,24,0.72)",
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 18,
    },

    changePhotoOverlayText: {
        color: "#FFFFFF",
        fontSize: 13,
        fontWeight: "600",
        marginLeft: 6,
    },

    iconCircle: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: "#f6cfc2",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 18,
    },

    uploadTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#363317",
        marginBottom: 10,
    },

    uploadDescription: {
        textAlign: "center",
        fontSize: 14,
        lineHeight: 22,
        color: "#7A7158",
    },

    mainScreenContainer: {
        paddingTop: 28,
    },

    formSectionLabel: {
        fontSize: 17,
        fontWeight: "600",
        color: "#4A4030",
        marginBottom: 10,
    },

    charCounter: {
        fontSize: 12,
        color: "#9A8E70",
        marginBottom: 10,
    },

    cakeNameInputField: {
        width: "100%",
        height: 56,
        backgroundColor: "#FFFFFF",
        borderRadius: 18,
        paddingHorizontal: 20,
        fontSize: 17,
        color: "#3D3127",
        marginBottom: 22,
        borderWidth: 1,
        borderColor: "#E9DFC0",
        ...cardShadow,
    },

    cakeDescriptionInput: {
        width: "100%",
        height: 120,
        backgroundColor: "#FFFFFF",
        borderRadius: 22,
        paddingHorizontal: 20,
        paddingTop: 16,
        fontSize: 16,
        color: "#3D3127",
        lineHeight: 24,
        marginBottom: 28,
        borderWidth: 1,
        borderColor: "#E9DFC0",
        ...cardShadow,
    },

    economicsInfoCard: {
        width: "100%",
        backgroundColor: "#FAF4D6",
        borderRadius: 28,
        padding: 24,
        ...cardShadow,
    },

    economicsCardHeading: {
        fontSize: 20,
        fontWeight: "700",
        color: "#674F45",
        marginBottom: 22,
    },

    priceDiscountRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 18,
    },

    priceInputWrapper: {
        width: "47%",
    },

    discountInputWrapper: {
        width: "47%",
    },

    inputFieldLabel: {
        fontSize: 14,
        fontWeight: "600",
        color: "#7A6C58",
        marginBottom: 8,
    },

    priceTextInput: {
        width: "100%",
        height: 52,
        backgroundColor: "#FFFFFF",
        borderRadius: 14,
        paddingHorizontal: 16,
        fontSize: 16,
        color: "#363317",
        borderWidth: 1,
        borderColor: "#E9DFC0",
    },

    discountTextInput: {
        width: "100%",
        height: 52,
        backgroundColor: "#FFFFFF",
        borderRadius: 14,
        paddingHorizontal: 16,
        fontSize: 16,
        color: "#3D3127",
        borderWidth: 1,
        borderColor: "#E9DFC0",
    },

    finalPriceBanner: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#EFE6BE",
        borderRadius: 14,
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginBottom: 18,
    },

    finalPriceLabel: {
        fontSize: 13,
        fontWeight: "600",
        color: "#7A6C58",
    },

    finalPriceValue: {
        fontSize: 18,
        fontWeight: "800",
        color: "#3F6B45",
    },

    weightInputContainer: {
        width: "100%",
    },

    weightTextInput: {
        width: "100%",
        height: 52,
        backgroundColor: "#FFFFFF",
        borderRadius: 14,
        paddingHorizontal: 16,
        fontSize: 16,
        color: "#3D3127",
        borderWidth: 1,
        borderColor: "#E9DFC0",
    },

    screenWrapper: {
        paddingTop: 26,
    },

    categoryCardContainer: {
        width: "100%",
        backgroundColor: "#ECE4BE",
        borderRadius: 28,
        padding: 22,
        marginBottom: 22,
        ...cardShadow,
    },

    categoryHeadingText: {
        fontSize: 19,
        fontWeight: "700",
        color: "#6D5348",
        marginBottom: 22,
    },

    dropdownSection: {
        marginBottom: 20,
    },

    dropdownLabelText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#7A6C58",
        marginBottom: 8,
    },

    dropdownBox: {
        width: "100%",
        height: 52,
        backgroundColor: "#FFFFFF",
        borderRadius: 14,
        paddingHorizontal: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#DED5AA",
    },

    dropdownValueText: {
        fontSize: 16,
        fontWeight: "500",
        color: "#4E3D32",
    },

    availabilityCardContainer: {
        width: "100%",
        backgroundColor: "#F2DED2",
        borderRadius: 28,
        padding: 20,
        flexDirection: "row",
        alignItems: "center",
        ...cardShadow,
    },

    availabilityIconCircle: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: "#FBEDE6",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 14,
    },

    availabilityTextWrapper: {
        flex: 1,
        marginRight: 10,
    },

    availabilityHeadingText: {
        fontSize: 17,
        fontWeight: "700",
        color: "#6D5348",
        marginBottom: 6,
    },

    availabilityDescriptionText: {
        fontSize: 13,
        lineHeight: 19,
        color: "#8A7969",
    },

    bottomButtonContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 14,
        backgroundColor: "#F6F0DF",
        borderTopWidth: 1,
        borderTopColor: "#E9DFC0",
    },

    draftButton: {
        flex: 1,
        height: 56,
        backgroundColor: "#F2CDBF",
        borderRadius: 28,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },

    draftButtonText: {
        fontSize: 16,
        fontWeight: "700",
        color: "#7A5C50",
    },

    catalogButton: {
        flex: 1.3,
        height: 56,
        backgroundColor: "#7A5C50",
        borderRadius: 28,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#4A3024",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 3,
    },

    catalogButtonDisabled: {
        backgroundColor: "#C2B49C",
        shadowOpacity: 0,
        elevation: 0,
    },

    checkIcon: {
        marginRight: 8,
    },

    catalogButtonText: {
        fontSize: 17,
        fontWeight: "700",
        color: "#FFFFFF",
    },

    couponOfferCard: {
        width: "100%",
        backgroundColor: "#F2DED2",
        borderRadius: 28,
        padding: 22,
        marginTop: 26,
        ...cardShadow,
    },

    couponTopSection: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 20,
    },

    couponOfferHeading: {
        fontSize: 19,
        fontWeight: "700",
        color: "#6D5348",
        marginBottom: 6,
    },

    couponOfferDescription: {
        fontSize: 14,
        lineHeight: 20,
        color: "#8A7969",
        width: 220,
    },

    couponInputRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    couponCodeWrapper: {
        width: "68%",
    },

    discountWrapper: {
        width: "26%",
    },

    couponLabel: {
        fontSize: 13,
        fontWeight: "600",
        color: "#7A6C58",
        marginBottom: 8,
    },

    couponTextInput: {
        width: "100%",
        height: 52,
        backgroundColor: "#FFFFFF",
        borderRadius: 14,
        paddingHorizontal: 16,
        fontSize: 15,
        color: "#4E3D32",
        borderWidth: 1,
        borderColor: "#EAD9CD",
    },

    discountTextInputField: {
        width: "100%",
        height: 52,
        backgroundColor: "#FFFFFF",
        borderRadius: 14,
        textAlign: "center",
        fontSize: 15,
        color: "#4E3D32",
        borderWidth: 1,
        borderColor: "#EAD9CD",
    },

    offerScreenContainer: {
        marginTop: 26,
    },

    offerTopSection: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 20,
    },

    offerHeadingText: {
        fontSize: 26,
        fontWeight: "800",
        color: "#2E241D",
        marginBottom: 6,
        letterSpacing: -0.3,
    },

    offerDescriptionText: {
        fontSize: 15,
        lineHeight: 22,
        color: "#6B5B4C",
    },

    activeOfferCountCard: {
        width: 100,
        height: 100,
        backgroundColor: "#F2D8E3",
        borderRadius: 26,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10,
    },

    activeOfferRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 4,
    },

    activeOfferCount: {
        fontSize: 24,
        fontWeight: "800",
        color: "#7A5C50",
        marginLeft: 6,
        lineHeight: 28,
    },

    activeOfferText: {
        fontSize: 16,
        fontWeight: "700",
        color: "#7A5C50",
        letterSpacing: 1,
    },

    couponCardContainer: {
        width: "100%",
        backgroundColor: "#FFFFFF",
        borderRadius: 26,
        overflow: "hidden",
        marginBottom: 18,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 10,
        elevation: 4,
    },

    leftAccentBar: {
        width: 6,
        height: "100%",
        backgroundColor: "#7A5C50",
        position: "absolute",
        left: 0,
        top: 0,
    },

    couponMainContent: {
        flexDirection: "row",
        alignItems: "center",
        padding: 18,
    },

    couponIconCircle: {
        width: 54,
        height: 54,
        borderRadius: 27,
        backgroundColor: "#F2D0C4",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 16,
    },

    couponInfoSection: {
        flex: 1,
    },

    couponTitleRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 4,
    },

    couponCodeText: {
        fontSize: 22,
        fontWeight: "800",
        color: "#2F241D",
        marginRight: 10,
    },

    discountValueText: {
        fontSize: 15,
        color: "#5E5248",
        marginBottom: 4,
    },

    expiryDateText: {
        fontSize: 13,
        color: "#9A8A7A",
    },

    couponActionSection: {
        alignItems: "center",
        justifyContent: "space-between",
        height: 88,
    },

    editButton: {
        height: 34,
        width: 34,
        borderRadius: 17,
        backgroundColor: "#7A5C50",
        justifyContent: "center",
        alignItems: "center",
    },
})