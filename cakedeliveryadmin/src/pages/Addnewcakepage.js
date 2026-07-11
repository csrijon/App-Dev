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
    Alert,
    Modal,
    FlatList,
} from "react-native";
import BakeryHeader from "../components/BakeryHeader"; // Make sure path is correct
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { launchImageLibrary } from "react-native-image-picker";

const MAX_DESCRIPTION_LENGTH = 220;

const FLAVOR_OPTIONS = [
    "Valrhona Chocolate",
    "Madagascar Vanilla",
    "Lemon Zest",
    "Red Velvet",
    "Salted Caramel",
    "Pistachio Cream",
];

const CATEGORY_OPTIONS = ["Birthday", "Wedding", "Pastries", "Anniversary"];

const Addnewcakepage = ({ navigation }) => {

    // Basic Info
    const [cakeName, setCakeName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [discount, setDiscount] = useState("");
    const [weight, setWeight] = useState("");
    const [imageUri, setImageUri] = useState(null);

    // New: Inventory & Specs
    const [stockQuantity, setStockQuantity] = useState("");
    const [prepTime, setPrepTime] = useState("");
    const [availableSizes, setAvailableSizes] = useState("");
    const [isEggless, setIsEggless] = useState(true);

    // Categorization
    const [flavorProfile, setFlavorProfile] = useState(FLAVOR_OPTIONS[0]);
    const [category, setCategory] = useState(CATEGORY_OPTIONS[1]);
    const [pickerTarget, setPickerTarget] = useState(null);

    // Toggles & Visibility
    const [isAvailable, setIsAvailable] = useState(true);
    const [isBestseller, setIsBestseller] = useState(false);
    const [isFeatured, setIsFeatured] = useState(false);
    const [allowCustomMessage, setAllowCustomMessage] = useState(true);

    // Coupon offer
    const [couponCode, setCouponCode] = useState("");
    const [couponDiscount, setCouponDiscount] = useState("");
    const [offerEnabled, setOfferEnabled] = useState(true);
    const [offers, setOffers] = useState([]);

    // Live Preview
    const [previewVisible, setPreviewVisible] = useState(false);

    const selectImage = async () => {
        const result = await launchImageLibrary({
            mediaType: "photo",
        });

        if (!result.didCancel && result.assets?.length > 0) {
            setImageUri(result.assets[0]);
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

    // Coupon handling
    const handleSaveCoupon = () => {
        if (!couponCode.trim()) {
            Alert.alert("Error", "Enter a coupon code");
            return;
        }
        const discountValue = parseFloat(couponDiscount);
        if (isNaN(discountValue) || discountValue <= 0 || discountValue > 100) {
            Alert.alert("Error", "Enter a valid discount between 1 and 100");
            return;
        }

        setOffers((prev) => [
            ...prev,
            {
                id: Date.now(),
                code: couponCode.trim().toUpperCase(),
                discount: discountValue,
                active: true,
            },
        ]);
        setCouponCode("");
        setCouponDiscount("");
    };

    const toggleOfferActive = (id) => {
        setOffers((prev) =>
            prev.map((o) => (o.id === id ? { ...o, active: !o.active } : o))
        );
    };

    const removeOffer = (id) => {
        setOffers((prev) => prev.filter((o) => o.id !== id));
    };

    // Submit
    const addCake = async () => {
        if (!validateForm()) return;

        // const cakeData = {
        //     cakeName, description, price, discount, weight,
        //     stockQuantity, prepTime, availableSizes, isEggless,
        //     imageUri, isAvailable, isBestseller, isFeatured, allowCustomMessage,
        //     flavorProfile, category, offers,
        // };

        const formdata = new FormData()

        formdata.append("Cakename", cakeName)
        formdata.append("detalis", description)
        formdata.append("price", price)
        formdata.append("discount", discount)
        formdata.append("weight", weight)
        formdata.append("stockQuantity", stockQuantity)
        formdata.append("preprationtime", prepTime)
        formdata.append("availablesizes", availableSizes)
        formdata.append("iseggless", isEggless)
        formdata.append("isAvailable", isAvailable)
        formdata.append("isBestseller", isBestseller)
        formdata.append("isFeatured", isFeatured)
        formdata.append("allowCustomMessage", allowCustomMessage)
        formdata.append("flavorProfile", flavorProfile)
        formdata.append("category", category)
        formdata.append("offers", JSON.stringify(offers))
        formdata.append("image", {
            uri: imageUri.uri,
            type: imageUri.type,
            name: imageUri.fileName,
        });

        const response = await fetch("http://10.140.23.125:3000/api/add/itemdata", {
            method: "POST",
            body: formdata,
        }
        )
        const resdata = await response.json()
        console.log(resdata)

        // console.log(cakeData, imageUri);
        Alert.alert("Success", "Cake Added Successfully");
        navigation.navigate("CatalogUpdatedScreen");
    };

    const handleSaveDraft = () => {
        if (!cakeName.trim()) {
            Alert.alert("Error", "Give the draft a cake name first");
            return;
        }
        Alert.alert("Saved", "Draft saved. You can finish it later.");
    };

    const openPicker = (target) => setPickerTarget(target);
    const closePicker = () => setPickerTarget(null);
    const pickerOptions = pickerTarget === "flavor" ? FLAVOR_OPTIONS : CATEGORY_OPTIONS;
    const pickerCurrentValue = pickerTarget === "flavor" ? flavorProfile : category;
    const handlePickOption = (option) => {
        if (pickerTarget === "flavor") setFlavorProfile(option);
        if (pickerTarget === "category") setCategory(option);
        closePicker();
    };

    return (
        <SafeAreaView style={styles.Addnewcakecontainer}>
            <StatusBar backgroundColor="#F6F0DF" barStyle="dark-content" />
            <BakeryHeader onPress={() => navigation.goBack()} />

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}>
                <View style={styles.screenContainer}>

                    {/* Heading */}
                    <View style={styles.headingRow}>
                        <View style={styles.headingAccentBar} />
                        <Text style={styles.smallHeading}>CATALOG MANAGEMENT</Text>
                    </View>
                    <Text style={styles.mainHeading}>Add New Cake</Text>

                    {/* Gallery Section */}
                    <View style={styles.sectionTitleRow}>
                        <Text style={styles.sectionTitle}>Gallery Display</Text>
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
                            <Image source={{ uri: imageUri.uri }} style={styles.uploadedHeroImage} />
                        ) : (
                            <>
                                <View style={styles.iconCircle}>
                                    <MaterialIcons name="add-a-photo" color="#75584e" size={26} />
                                </View>
                                <Text style={styles.uploadTitle}>Upload Hero Image</Text>
                                <Text style={styles.uploadDescription}>
                                    Drop your high-resolution confectionery photography here. Minimum 1200px wide recommended.
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

                    {/* Cake Name & Description */}
                    <Text style={styles.formSectionLabel}>Item</Text>
                    <TextInput
                        value={cakeName}
                        onChangeText={setCakeName}
                        placeholder="e.g. Midnight Truffle Rose"
                        placeholderTextColor="#B4AA8D"
                        style={styles.cakeNameInputField}
                    />

                    <View style={styles.sectionTitleRow}>
                        <Text style={styles.formSectionLabel}>Description</Text>
                        <Text style={styles.charCounter}>{description.length}/{MAX_DESCRIPTION_LENGTH}</Text>
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
                        <Text style={styles.economicsCardHeading}>Economics & Weight</Text>

                        <View style={styles.priceDiscountRow}>
                            <View style={styles.priceInputWrapper}>
                                <Text style={styles.inputFieldLabel}>Price ($)</Text>
                                <TextInput value={price} onChangeText={setPrice} placeholder="0.00" placeholderTextColor="#A89B7E" keyboardType="numeric" style={styles.priceTextInput} />
                            </View>
                            <View style={styles.discountInputWrapper}>
                                <Text style={styles.inputFieldLabel}>Discount (%)</Text>
                                <TextInput value={discount} onChangeText={setDiscount} placeholder="0" placeholderTextColor="#A89B7E" keyboardType="numeric" style={styles.discountTextInput} />
                            </View>
                        </View>

                        {discountedPrice && (
                            <View style={styles.finalPriceBanner}>
                                <Text style={styles.finalPriceLabel}>Customer pays</Text>
                                <Text style={styles.finalPriceValue}>${discountedPrice}</Text>
                            </View>
                        )}

                        <View style={styles.weightInputContainer}>
                            <Text style={styles.inputFieldLabel}>Weight (kg)</Text>
                            <TextInput value={weight} onChangeText={setWeight} placeholder="1.0" placeholderTextColor="#A89B7E" keyboardType="numeric" style={styles.weightTextInput} />
                        </View>
                    </View>

                    {/* NEW: Inventory & Logistics Card */}
                    <View style={styles.inventoryCardContainer}>
                        <Text style={styles.categoryHeadingText}>Inventory & Logistics</Text>

                        <View style={styles.priceDiscountRow}>
                            <View style={styles.priceInputWrapper}>
                                <Text style={styles.inputFieldLabel}>Stock Qty</Text>
                                <TextInput value={stockQuantity} onChangeText={setStockQuantity} placeholder="10" placeholderTextColor="#A89B7E" keyboardType="numeric" style={styles.priceTextInput} />
                            </View>
                            <View style={styles.discountInputWrapper}>
                                <Text style={styles.inputFieldLabel}>Prep Time (hrs)</Text>
                                <TextInput value={prepTime} onChangeText={setPrepTime} placeholder="24" placeholderTextColor="#A89B7E" keyboardType="numeric" style={styles.discountTextInput} />
                            </View>
                        </View>

                        <View style={styles.weightInputContainer}>
                            <Text style={styles.inputFieldLabel}>Available Sizes (e.g., 6", 8", 10")</Text>
                            <TextInput value={availableSizes} onChangeText={setAvailableSizes} placeholder="Enter sizes separated by comma" placeholderTextColor="#A89B7E" style={styles.weightTextInput} />
                        </View>
                    </View>

                </View>

                <View style={styles.screenWrapper}>

                    {/* Categorization & Dietary Card */}
                    <View style={styles.categoryCardContainer}>
                        <Text style={styles.categoryHeadingText}>Categorization & Dietary</Text>

                        {/* Egg/Eggless Toggle */}
                        <Text style={styles.dropdownLabelText}>Dietary Preference</Text>
                        <View style={styles.dietaryToggleContainer}>
                            <TouchableOpacity style={[styles.dietaryBtn, isEggless && styles.dietaryBtnActive]} onPress={() => setIsEggless(true)}>
                                <Text style={[styles.dietaryBtnText, isEggless && styles.dietaryBtnTextActive]}>Eggless</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.dietaryBtn, !isEggless && styles.dietaryBtnActive]} onPress={() => setIsEggless(false)}>
                                <Text style={[styles.dietaryBtnText, !isEggless && styles.dietaryBtnTextActive]}>Contains Egg</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Flavor Profile */}
                        <View style={styles.dropdownSection}>
                            <Text style={styles.dropdownLabelText}>Flavor Profile</Text>
                            <TouchableOpacity style={styles.dropdownBox} onPress={() => openPicker("flavor")} activeOpacity={0.8}>
                                <Text style={styles.dropdownValueText}>{flavorProfile}</Text>
                                <Ionicons name="chevron-down" size={20} color="#6D5A4B" />
                            </TouchableOpacity>
                        </View>

                        {/* Category */}
                        <View style={styles.dropdownSection}>
                            <Text style={styles.dropdownLabelText}>Category</Text>
                            <TouchableOpacity style={styles.dropdownBox} onPress={() => openPicker("category")} activeOpacity={0.8}>
                                <Text style={styles.dropdownValueText}>{category}</Text>
                                <Ionicons name="chevron-down" size={20} color="#6D5A4B" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* NEW: Storefront Options & Visibility Card */}
                    <View style={styles.optionsCardContainer}>
                        <Text style={styles.categoryHeadingText}>Storefront Options</Text>

                        {/* Option Rows */}
                        <View style={styles.toggleRow}>
                            <View>
                                <Text style={styles.toggleRowTitle}>Public Catalog</Text>
                                <Text style={styles.toggleRowDesc}>Show product in store immediately.</Text>
                            </View>
                            <TouchableOpacity onPress={() => setIsAvailable(!isAvailable)}>
                                <MaterialIcons name={isAvailable ? "toggle-on" : "toggle-off"} color={isAvailable ? "#7B5A4E" : "#C9BCA0"} size={48} />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.toggleRow}>
                            <View>
                                <Text style={styles.toggleRowTitle}>Bestseller Badge</Text>
                                <Text style={styles.toggleRowDesc}>Highlight as a top-selling item.</Text>
                            </View>
                            <TouchableOpacity onPress={() => setIsBestseller(!isBestseller)}>
                                <MaterialIcons name={isBestseller ? "toggle-on" : "toggle-off"} color={isBestseller ? "#7B5A4E" : "#C9BCA0"} size={48} />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.toggleRow}>
                            <View>
                                <Text style={styles.toggleRowTitle}>Featured Product</Text>
                                <Text style={styles.toggleRowDesc}>Display on the homepage carousel.</Text>
                            </View>
                            <TouchableOpacity onPress={() => setIsFeatured(!isFeatured)}>
                                <MaterialIcons name={isFeatured ? "toggle-on" : "toggle-off"} color={isFeatured ? "#7B5A4E" : "#C9BCA0"} size={48} />
                            </TouchableOpacity>
                        </View>

                        <View style={[styles.toggleRow, { borderBottomWidth: 0, paddingBottom: 0 }]}>
                            <View>
                                <Text style={styles.toggleRowTitle}>Allow Custom Message</Text>
                                <Text style={styles.toggleRowDesc}>Let customers add icing text.</Text>
                            </View>
                            <TouchableOpacity onPress={() => setAllowCustomMessage(!allowCustomMessage)}>
                                <MaterialIcons name={allowCustomMessage ? "toggle-on" : "toggle-off"} color={allowCustomMessage ? "#7B5A4E" : "#C9BCA0"} size={48} />
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>

                {/* Coupon Offer Card */}
                <View style={styles.couponOfferCard}>
                    <View style={styles.couponTopSection}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.couponOfferHeading}>Coupon Offer</Text>
                            <Text style={styles.couponOfferDescription}>Add a promotional discount for this cake listing.</Text>
                        </View>
                        <TouchableOpacity onPress={() => setOfferEnabled(!offerEnabled)}>
                            <MaterialIcons name={offerEnabled ? "toggle-on" : "toggle-off"} color={offerEnabled ? "#75584e" : "#C9BCA0"} size={52} />
                        </TouchableOpacity>
                    </View>

                    {offerEnabled && (
                        <>
                            <View style={styles.couponInputRow}>
                                <View style={styles.couponCodeWrapper}>
                                    <Text style={styles.couponLabel}>Coupon Code</Text>
                                    <TextInput value={couponCode} onChangeText={(text) => setCouponCode(text.toUpperCase())} placeholder="e.g. SWEET20" placeholderTextColor="#B4AA8D" autoCapitalize="characters" style={styles.couponTextInput} />
                                </View>
                                <View style={styles.discountWrapper}>
                                    <Text style={styles.couponLabel}>OFF (%)</Text>
                                    <TextInput value={couponDiscount} onChangeText={setCouponDiscount} placeholder="20" placeholderTextColor="#B4AA8D" keyboardType="numeric" style={styles.discountTextInputField} />
                                </View>
                            </View>
                            <TouchableOpacity style={styles.saveCouponButton} activeOpacity={0.8} onPress={handleSaveCoupon}>
                                <Ionicons name="add-circle-outline" size={18} color="#FFFFFF" />
                                <Text style={styles.saveCouponButtonText}>Save Coupon</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </View>

                {/* Active Offers */}
                <View style={styles.offerScreenContainer}>
                    <View style={styles.offerTopSection}>
                        <View>
                            <Text style={styles.offerHeadingText}>Active Offers</Text>
                            <Text style={styles.offerDescriptionText}>Manage your current{"\n"}storefront promotions.</Text>
                        </View>
                        <View style={styles.activeOfferCountCard}>
                            <View style={styles.activeOfferRow}>
                                <Ionicons name="checkmark-circle-outline" size={14} color="#7A5C50" />
                                <Text style={styles.activeOfferCount}>{offers.filter((o) => o.active).length}</Text>
                            </View>
                            <Text style={styles.activeOfferText}>ACTIVE</Text>
                        </View>
                    </View>

                    {offers.length === 0 ? (
                        <View style={styles.noOffersBox}>
                            <Text style={styles.noOffersText}>No coupons yet. Save one above to see it here.</Text>
                        </View>
                    ) : (
                        offers.map((offer) => (
                            <View key={offer.id} style={styles.couponCardContainer}>
                                <View style={styles.leftAccentBar} />
                                <View style={styles.couponMainContent}>
                                    <View style={styles.couponIconCircle}>
                                        <MaterialIcons name="confirmation-number" size={28} color="#6F5146" />
                                    </View>
                                    <View style={styles.couponInfoSection}>
                                        <View style={styles.couponTitleRow}>
                                            <Text style={styles.couponCodeText}>{offer.code}</Text>
                                        </View>
                                        <Text style={styles.discountValueText}>{offer.discount}% Discount</Text>
                                    </View>
                                    <View style={styles.couponActionSection}>
                                        <TouchableOpacity onPress={() => toggleOfferActive(offer.id)}>
                                            <MaterialIcons name={offer.active ? "toggle-on" : "toggle-off"} size={46} color={offer.active ? "#7A5C50" : "#C9BCA0"} />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.editButton} onPress={() => removeOffer(offer.id)}>
                                            <Ionicons name="trash-outline" size={16} color="#FFFFFF" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        ))
                    )}
                </View>

            </ScrollView>

            {/* Bottom Action Bar */}
            <View style={styles.bottomButtonContainer}>
                <TouchableOpacity style={styles.previewBtnSmall} activeOpacity={0.8} onPress={() => setPreviewVisible(true)}>
                    <Ionicons name="eye-outline" size={22} color="#75584e" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.draftButton} activeOpacity={0.8} onPress={handleSaveDraft}>
                    <Text style={styles.draftButtonText}>Save Draft</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={addCake} activeOpacity={0.85} style={[styles.catalogButton, !isFormReady && styles.catalogButtonDisabled]}>
                    <Ionicons name="checkmark-circle-outline" size={20} color="#FFFFFF" style={styles.checkIcon} />
                    <Text style={styles.catalogButtonText}>Add to Catalog</Text>
                </TouchableOpacity>
            </View>

            {/* Category / Flavor Picker Modal */}
            <Modal visible={pickerTarget !== null} transparent animationType="fade" onRequestClose={closePicker}>
                <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={closePicker}>
                    <View style={styles.modalSheet} onStartShouldSetResponder={() => true}>
                        <Text style={styles.modalTitle}>
                            {pickerTarget === "flavor" ? "Choose Flavor Profile" : "Choose Category"}
                        </Text>
                        <FlatList
                            data={pickerOptions}
                            keyExtractor={(item) => item}
                            renderItem={({ item }) => {
                                const isSelected = item === pickerCurrentValue;
                                return (
                                    <TouchableOpacity style={styles.modalOption} activeOpacity={0.7} onPress={() => handlePickOption(item)}>
                                        <Text style={[styles.modalOptionText, isSelected && styles.modalOptionTextSelected]}>{item}</Text>
                                        {isSelected && <Ionicons name="checkmark" size={18} color="#75584e" />}
                                    </TouchableOpacity>
                                );
                            }}
                        />
                    </View>
                </TouchableOpacity>
            </Modal>

            {/* Live Preview Modal */}
            <Modal visible={previewVisible} transparent animationType="slide" onRequestClose={() => setPreviewVisible(false)}>
                <View style={styles.previewModalOverlay}>
                    <View style={styles.previewModalCard}>
                        <View style={styles.previewModalHeader}>
                            <Text style={styles.previewModalTitle}>Live Preview</Text>
                            <TouchableOpacity onPress={() => setPreviewVisible(false)}>
                                <Ionicons name="close-circle" size={28} color="#8C6A4F" />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.previewCardBody}>
                            {imageUri ? (
                                <Image source={{ uri: imageUri }} style={styles.previewImg} />
                            ) : (
                                <View style={styles.previewImgPlaceholder}>
                                    <MaterialIcons name="image" size={40} color="#D2B89B" />
                                </View>
                            )}

                            <View style={styles.previewTagsRow}>
                                {isEggless && <Text style={[styles.previewTag, { backgroundColor: '#E2F0E5', color: '#3F7A53' }]}>Eggless</Text>}
                                {isBestseller && <Text style={[styles.previewTag, { backgroundColor: '#F2D8E3', color: '#7A5C50' }]}>Bestseller</Text>}
                                {isFeatured && <Text style={[styles.previewTag, { backgroundColor: '#ECE4BE', color: '#6D5348' }]}>Featured</Text>}
                            </View>

                            <Text style={styles.previewItemName}>{cakeName || "Product Name"}</Text>
                            <Text style={styles.previewItemDesc} numberOfLines={2}>{description || "Product description will appear here..."}</Text>

                            <View style={styles.previewPriceRow}>
                                <Text style={styles.previewPrice}>${discountedPrice || price || "0.00"}</Text>
                                {discount > 0 && <Text style={styles.previewOldPrice}>${price}</Text>}
                            </View>

                            <View style={styles.previewDetailsGrid}>
                                <Text style={styles.previewDetailText}>Stock: {stockQuantity || "N/A"}</Text>
                                <Text style={styles.previewDetailText}>Prep: {prepTime ? `${prepTime} hrs` : "N/A"}</Text>
                                <Text style={styles.previewDetailText}>Weight: {weight ? `${weight} kg` : "N/A"}</Text>
                                <Text style={styles.previewDetailText}>Sizes: {availableSizes || "N/A"}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>

        </SafeAreaView>
    );
};

export default Addnewcakepage;

const cardShadow = {
    shadowColor: "#3D2E22",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 14,
    elevation: 2,
};

const styles = StyleSheet.create({
    Addnewcakecontainer:
    {
        flex: 1,
        backgroundColor: "#F6F0DF"
    },
    screenContainer:
    {
        paddingTop: 24
    },
    headingRow: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
    headingAccentBar: { width: 18, height: 3, borderRadius: 2, backgroundColor: "#A6624E", marginRight: 8 },
    smallHeading: { fontSize: 13, fontWeight: "700", letterSpacing: 2, color: "#8C6A4F" },
    mainHeading: { fontSize: 34, fontWeight: "800", color: "#2E241D", marginBottom: 28, letterSpacing: -0.5 },
    sectionTitleRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 14 },
    sectionTitle: { fontSize: 16, fontWeight: "600", color: "#363317" },
    imageReadyPill: { flexDirection: "row", alignItems: "center", backgroundColor: "#E2F0E5", paddingHorizontal: 10, paddingVertical: 5, borderRadius: 16 },
    imageReadyPillText: { fontSize: 12, fontWeight: "600", color: "#3F7A53", marginLeft: 4 },
    uploadBox: { width: "100%", height: 270, borderWidth: 2, borderStyle: "dashed", borderColor: "#D2B89B", borderRadius: 30, justifyContent: "center", alignItems: "center", paddingHorizontal: 28, backgroundColor: "#F3EACF", overflow: "hidden", position: "relative" },
    uploadedHeroImage: { width: "100%", height: "100%", borderRadius: 28 },
    changePhotoOverlay: { position: "absolute", bottom: 14, right: 14, flexDirection: "row", alignItems: "center", backgroundColor: "rgba(45,33,24,0.72)", paddingHorizontal: 12, paddingVertical: 8, borderRadius: 18 },
    changePhotoOverlayText: { color: "#FFFFFF", fontSize: 13, fontWeight: "600", marginLeft: 6 },
    iconCircle: { width: 70, height: 70, borderRadius: 35, backgroundColor: "#f6cfc2", justifyContent: "center", alignItems: "center", marginBottom: 18 },
    uploadTitle: { fontSize: 18, fontWeight: "700", color: "#363317", marginBottom: 10 },
    uploadDescription: { textAlign: "center", fontSize: 14, lineHeight: 22, color: "#7A7158" },
    mainScreenContainer: { paddingTop: 28 },
    formSectionLabel: { fontSize: 17, fontWeight: "600", color: "#4A4030", marginBottom: 10 },
    charCounter: { fontSize: 12, color: "#9A8E70", marginBottom: 10 },
    cakeNameInputField: { width: "100%", height: 56, backgroundColor: "#FFFFFF", borderRadius: 18, paddingHorizontal: 20, fontSize: 17, color: "#3D3127", marginBottom: 22, borderWidth: 1, borderColor: "#E9DFC0", ...cardShadow },
    cakeDescriptionInput: { width: "100%", height: 120, backgroundColor: "#FFFFFF", borderRadius: 22, paddingHorizontal: 20, paddingTop: 16, fontSize: 16, color: "#3D3127", lineHeight: 24, marginBottom: 28, borderWidth: 1, borderColor: "#E9DFC0", ...cardShadow },

    // Cards common
    economicsInfoCard: { width: "100%", backgroundColor: "#FAF4D6", borderRadius: 28, padding: 24, marginBottom: 22, ...cardShadow },
    inventoryCardContainer: { width: "100%", backgroundColor: "#E6EFEE", borderRadius: 28, padding: 24, ...cardShadow }, // Slight minty hue to differentiate or use #ECE4BE
    categoryCardContainer: { width: "100%", backgroundColor: "#ECE4BE", borderRadius: 28, padding: 22, marginBottom: 22, ...cardShadow },
    optionsCardContainer: { width: "100%", backgroundColor: "#F2DED2", borderRadius: 28, padding: 22, ...cardShadow },

    economicsCardHeading: { fontSize: 20, fontWeight: "700", color: "#674F45", marginBottom: 22 },
    categoryHeadingText: { fontSize: 19, fontWeight: "700", color: "#6D5348", marginBottom: 22 },

    priceDiscountRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 18 },
    priceInputWrapper: { width: "47%" },
    discountInputWrapper: { width: "47%" },
    inputFieldLabel: { fontSize: 14, fontWeight: "600", color: "#7A6C58", marginBottom: 8 },
    priceTextInput: { width: "100%", height: 52, backgroundColor: "#FFFFFF", borderRadius: 14, paddingHorizontal: 16, fontSize: 16, color: "#363317", borderWidth: 1, borderColor: "#E9DFC0" },
    discountTextInput: { width: "100%", height: 52, backgroundColor: "#FFFFFF", borderRadius: 14, paddingHorizontal: 16, fontSize: 16, color: "#3D3127", borderWidth: 1, borderColor: "#E9DFC0" },
    finalPriceBanner: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "#EFE6BE", borderRadius: 14, paddingHorizontal: 16, paddingVertical: 12, marginBottom: 18 },
    finalPriceLabel: { fontSize: 13, fontWeight: "600", color: "#7A6C58" },
    finalPriceValue: { fontSize: 18, fontWeight: "800", color: "#3F6B45" },
    weightInputContainer: { width: "100%" },
    weightTextInput: { width: "100%", height: 52, backgroundColor: "#FFFFFF", borderRadius: 14, paddingHorizontal: 16, fontSize: 16, color: "#3D3127", borderWidth: 1, borderColor: "#E9DFC0" },
    screenWrapper: { paddingTop: 26 },

    // Dietary Toggle
    dietaryToggleContainer: { flexDirection: "row", backgroundColor: "#FFF", borderRadius: 14, pading: 4, marginBottom: 20, borderWidth: 1, borderColor: "#DED5AA" },
    dietaryBtn: { flex: 1, paddingVertical: 12, alignItems: "center", borderRadius: 12 },
    dietaryBtnActive: { backgroundColor: "#7A5C50" },
    dietaryBtnText: { fontSize: 15, fontWeight: "600", color: "#7A6C58" },
    dietaryBtnTextActive: { color: "#FFF" },

    // Dropdowns
    dropdownSection: { marginBottom: 20 },
    dropdownLabelText: { fontSize: 14, fontWeight: "600", color: "#7A6C58", marginBottom: 8 },
    dropdownBox: { width: "100%", height: 52, backgroundColor: "#FFFFFF", borderRadius: 14, paddingHorizontal: 16, flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderWidth: 1, borderColor: "#DED5AA" },
    dropdownValueText: { fontSize: 16, fontWeight: "500", color: "#4E3D32" },

    // Toggles Row
    toggleRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: "rgba(201, 188, 160, 0.4)" },
    toggleRowTitle: { fontSize: 16, fontWeight: "700", color: "#6D5348", marginBottom: 4 },
    toggleRowDesc: { fontSize: 13, color: "#8A7969", width: 200 },

    // Coupon
    couponOfferCard: { width: "100%", backgroundColor: "#F2DED2", borderRadius: 28, padding: 22, marginTop: 26, ...cardShadow },
    couponTopSection: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 },
    couponOfferHeading: { fontSize: 19, fontWeight: "700", color: "#6D5348", marginBottom: 6 },
    couponOfferDescription: { fontSize: 14, lineHeight: 20, color: "#8A7969", width: 220 },
    couponInputRow: { flexDirection: "row", justifyContent: "space-between" },
    couponCodeWrapper: { width: "68%" },
    discountWrapper: { width: "26%" },
    couponLabel: { fontSize: 13, fontWeight: "600", color: "#7A6C58", marginBottom: 8 },
    couponTextInput: { width: "100%", height: 52, backgroundColor: "#FFFFFF", borderRadius: 14, paddingHorizontal: 16, fontSize: 15, color: "#4E3D32", borderWidth: 1, borderColor: "#EAD9CD" },
    discountTextInputField: { width: "100%", height: 52, backgroundColor: "#FFFFFF", borderRadius: 14, textAlign: "center", fontSize: 15, color: "#4E3D32", borderWidth: 1, borderColor: "#EAD9CD" },
    saveCouponButton: { flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: "#75584e", borderRadius: 14, paddingVertical: 12, marginTop: 16, gap: 8 },
    saveCouponButtonText: { color: "#FFFFFF", fontWeight: "700", fontSize: 14 },

    // Offers
    offerScreenContainer: { marginTop: 26 },
    offerTopSection: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 },
    offerHeadingText: { fontSize: 26, fontWeight: "800", color: "#2E241D", marginBottom: 6, letterSpacing: -0.3 },
    offerDescriptionText: { fontSize: 15, lineHeight: 22, color: "#6B5B4C" },
    activeOfferCountCard: { width: 100, height: 100, backgroundColor: "#F2D8E3", borderRadius: 26, justifyContent: "center", alignItems: "center", paddingVertical: 10 },
    activeOfferRow: { flexDirection: "row", alignItems: "center", justifyContent: "center", marginBottom: 4 },
    activeOfferCount: { fontSize: 24, fontWeight: "800", color: "#7A5C50", marginLeft: 6, lineHeight: 28 },
    activeOfferText: { fontSize: 16, fontWeight: "700", color: "#7A5C50", letterSpacing: 1 },
    noOffersBox: { borderWidth: 1.5, borderStyle: "dashed", borderColor: "#DED5AA", borderRadius: 22, paddingVertical: 26, alignItems: "center", justifyContent: "center" },
    noOffersText: { fontSize: 13, color: "#9A8E70", textAlign: "center" },
    couponCardContainer: { width: "100%", backgroundColor: "#FFFFFF", borderRadius: 26, overflow: "hidden", marginBottom: 18, shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 10, elevation: 4 },
    leftAccentBar: { width: 6, height: "100%", backgroundColor: "#7A5C50", position: "absolute", left: 0, top: 0 },
    couponMainContent: { flexDirection: "row", alignItems: "center", padding: 18 },
    couponIconCircle: { width: 54, height: 54, borderRadius: 27, backgroundColor: "#F2D0C4", justifyContent: "center", alignItems: "center", marginRight: 16 },
    couponInfoSection: { flex: 1 },
    couponTitleRow: { flexDirection: "row", alignItems: "center", marginBottom: 4 },
    couponCodeText: { fontSize: 22, fontWeight: "800", color: "#2F241D", marginRight: 10 },
    discountValueText: { fontSize: 15, color: "#5E5248", marginBottom: 4 },
    couponActionSection: { alignItems: "center", justifyContent: "space-between", height: 88 },
    editButton: { height: 34, width: 34, borderRadius: 17, backgroundColor: "#7A5C50", justifyContent: "center", alignItems: "center" },

    // Bottom action bar
    bottomButtonContainer: { flexDirection: "row", gap: 10, paddingHorizontal: 20, paddingTop: 14, paddingBottom: 18, backgroundColor: "#FFFDF6", borderTopWidth: 1, borderTopColor: "#EDE3C8" },
    previewBtnSmall: { width: 52, height: 52, borderRadius: 16, borderWidth: 1.5, borderColor: "#75584e", alignItems: "center", justifyContent: "center" },
    draftButton: { flex: 1, height: 52, borderRadius: 16, borderWidth: 1.5, borderColor: "#75584e", alignItems: "center", justifyContent: "center" },
    draftButtonText: { color: "#75584e", fontWeight: "700", fontSize: 15 },
    catalogButton: { flex: 1.4, height: 52, borderRadius: 16, backgroundColor: "#75584e", flexDirection: "row", alignItems: "center", justifyContent: "center", elevation: 2 },
    catalogButtonDisabled: { backgroundColor: "#C9BCA0" },
    checkIcon: { marginRight: 8 },
    catalogButtonText: { color: "#FFFFFF", fontWeight: "700", fontSize: 15 },

    // Picker modal
    modalOverlay: { flex: 1, backgroundColor: "rgba(45,33,24,0.4)", justifyContent: "flex-end" },
    modalSheet: { backgroundColor: "#FFFDF6", borderTopLeftRadius: 28, borderTopRightRadius: 28, paddingHorizontal: 22, paddingTop: 20, paddingBottom: 30, maxHeight: "60%" },
    modalTitle: { fontSize: 17, fontWeight: "700", color: "#363317", marginBottom: 14 },
    modalOption: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: "#F0E9D2" },
    modalOptionText: { fontSize: 15, color: "#4E3D32" },
    modalOptionTextSelected: { fontWeight: "700", color: "#75584e" },

    // Preview Modal specific styles
    previewModalOverlay: { flex: 1, backgroundColor: "rgba(46,36,29,0.7)", justifyContent: "center", alignItems: "center", padding: 20 },
    previewModalCard: { width: "100%", backgroundColor: "#FFF", borderRadius: 32, padding: 20, shadowColor: "#000", shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.15, shadowRadius: 20, elevation: 10 },
    previewModalHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
    previewModalTitle: { fontSize: 20, fontWeight: "800", color: "#3D3127" },
    previewCardBody: { alignItems: "flex-start" },
    previewImg: { width: "100%", height: 200, borderRadius: 24, marginBottom: 16 },
    previewImgPlaceholder: { width: "100%", height: 200, borderRadius: 24, backgroundColor: "#F3EACF", justifyContent: "center", alignItems: "center", marginBottom: 16 },
    previewTagsRow: { flexDirection: "row", gap: 8, marginBottom: 12 },
    previewTag: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, fontSize: 12, fontWeight: "700", overflow: "hidden" },
    previewItemName: { fontSize: 24, fontWeight: "700", color: "#2E241D", marginBottom: 8 },
    previewItemDesc: { fontSize: 14, color: "#7A6C58", marginBottom: 16, lineHeight: 20 },
    previewPriceRow: { flexDirection: "row", alignItems: "flex-end", marginBottom: 16 },
    previewPrice: { fontSize: 26, fontWeight: "800", color: "#3F6B45", marginRight: 10 },
    previewOldPrice: { fontSize: 16, color: "#A89B7E", textDecorationLine: "line-through", marginBottom: 4 },
    previewDetailsGrid: { width: "100%", flexDirection: "row", flexWrap: "wrap", backgroundColor: "#F6F0DF", padding: 14, borderRadius: 16, gap: 10 },
    previewDetailText: { width: "45%", fontSize: 13, fontWeight: "600", color: "#6D5348" }
});