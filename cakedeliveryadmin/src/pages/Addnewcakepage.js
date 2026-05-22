import { SafeAreaView } from "react-native-safe-area-context"
import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar, ScrollView, TextInput
} from "react-native";
import BakeryHeader from "../components/BakeryHeader"
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';


const Addnewcakepage = () => {
    return (
        <SafeAreaView style={styles.Addnewcakecontainer} >
            <StatusBar backgroundColor="#fff8e6" barStyle="dark-content" />
            <BakeryHeader />
            <ScrollView vertical showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 32, paddingBottom: 40 }} >
                <View style={styles.screenContainer}>

                    {/* Heading */}
                    <Text style={styles.smallHeading}>
                        CATALOG MANAGEMENT
                    </Text>

                    <Text style={styles.mainHeading}>
                        Add New Cake
                    </Text>

                    {/* Gallery Section */}
                    <Text style={styles.sectionTitle}>
                        Gallery Display
                    </Text>

                    {/* Upload Box */}
                    <TouchableOpacity style={styles.uploadBox}>

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

                    </TouchableOpacity>

                    {/* Bottom Card */}
                    <View style={styles.previewCard}>

                        <Text style={styles.plusIcon}>
                            +
                        </Text>

                    </View>

                </View>

                <View style={styles.mainScreenContainer}>

                    {/* Cake Name */}
                    <Text style={styles.formSectionLabel}>
                        Cake Name
                    </Text>

                    <TextInput
                        placeholder="e.g. Midnight Truffle Rose"
                        placeholderTextColor="#B4AA8D"
                        style={styles.cakeNameInputField}
                    />

                    {/* Description */}
                    <Text style={styles.formSectionLabel}>
                        Description
                    </Text>

                    <TextInput
                        multiline
                        textAlignVertical="top"
                        placeholder="Describe the textures, aromatics, and inspiration behind this creation..."
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
                                    style={styles.priceTextInput}
                                    placeholderTextColor="#B4AA8D"
                                />
                            </View>

                            <View style={styles.discountInputWrapper}>
                                <Text style={styles.inputFieldLabel}>
                                    Discount (%)
                                </Text>

                                <TextInput
                                    style={styles.discountTextInput}
                                    placeholderTextColor="#B4AA8D"
                                />
                            </View>

                        </View>

                        {/* Weight */}
                        <View style={styles.weightInputContainer}>

                            <Text style={styles.inputFieldLabel}>
                                Weight (kg)
                            </Text>

                            <TextInput
                                style={styles.weightTextInput}
                                placeholderTextColor="#B4AA8D"
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

                                <Text style={styles.dropdownArrowIcon}>
                                    ⌄⌄
                                </Text>

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

                                <Text style={styles.dropdownArrowIcon}>
                                    ⌄⌄
                                </Text>

                            </TouchableOpacity>

                        </View>

                    </View>

                    {/* Availability Card */}
                    <View style={styles.availabilityCardContainer}>

                        <View style={styles.availabilityTextWrapper}>

                            <Text style={styles.availabilityHeadingText}>
                                Availability Status
                            </Text>

                            <Text style={styles.availabilityDescriptionText}>
                                Show this cake in the public store
                                catalog immediately.
                            </Text>

                        </View>

                        <TouchableOpacity>

                            <Ionicons
                                name="toggle"
                                color="#7B5A4E"
                                size={52}
                            />

                        </TouchableOpacity>

                    </View>

                </View>

                <View style={styles.couponOfferCard}>

                    <View style={styles.couponTopSection}>

                        <View>

                            <Text style={styles.couponOfferHeading}>
                                Coupon Offer
                            </Text>

                            <Text style={styles.couponOfferDescription}>
                                Add a promotional discount
                                for this cake listing.
                            </Text>

                        </View>

                        <TouchableOpacity>

                            <Ionicons
                                name="toggle"
                                color="#7B5A4E"
                                size={52}
                            />

                        </TouchableOpacity>

                    </View>

                    <View style={styles.couponInputRow}>

                        <View style={styles.couponCodeWrapper}>

                            <Text style={styles.couponLabel}>
                                Coupon Code
                            </Text>

                            <TextInput
                                placeholder="e.g. SWEET20"
                                placeholderTextColor="#B4AA8D"
                                style={styles.couponTextInput}
                            />

                        </View>

                        <View style={styles.discountWrapper}>

                            <Text style={styles.couponLabel}>
                                OFF (%)
                            </Text>

                            <TextInput
                                placeholder="20"
                                placeholderTextColor="#B4AA8D"
                                style={styles.discountTextInputField}
                                keyboardType="numeric"
                            />

                        </View>

                    </View>

                    <TouchableOpacity style={styles.skipCouponButton}>

                        <Text style={styles.skipCouponButtonText}>
                            Continue Without Coupon
                        </Text>

                    </TouchableOpacity>

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
                                    4
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

                                    <View style={styles.flavorTagBadge}>
                                        <Text style={styles.flavorTagText}>
                                            FLAVOR{"\n"}TAG
                                        </Text>
                                    </View>

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

                                <TouchableOpacity>
                                    <Ionicons
                                        name="toggle"
                                        size={46}
                                        color="#7A5C50"
                                    />
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.editButton}>

                                    <Ionicons
                                        name="create-outline"
                                        size={18}
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
                <TouchableOpacity style={styles.catalogButton}>

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


const styles = StyleSheet.create({
    Addnewcakecontainer: {
        flex: 1,
        backgroundColor: "#F6F0DF",
    },
    screenContainer: {
        // paddingHorizontal: 20,
        paddingTop: 24,
    },

    smallHeading: {
        fontSize: 14,
        letterSpacing: 2,
        color: "#646040",
        marginBottom: 8,
    },

    mainHeading: {
        fontSize: 36,
        fontWeight: "800",
        color: "#322A1F",
        marginBottom: 32,
    },

    sectionTitle: {
        fontSize: 16,
        color: "#363317",
        marginBottom: 16,
    },

    uploadBox: {
        width: "100%",
        height: 270,
        borderWidth: 2,
        borderStyle: "dashed",
        borderColor: "#D2B89B",
        borderRadius: 34,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 28,
        backgroundColor: "#F3EACF",
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

    iconText: {
        fontSize: 30,
    },

    uploadTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#363317",
        marginBottom: 12,
    },

    uploadDescription: {
        textAlign: "center",
        fontSize: 14,
        lineHeight: 24,
        color: "#646040",
    },

    previewCard: {
        width: "100%",
        height: 230,
        backgroundColor: "#EAE0BA",
        borderRadius: 34,
        marginTop: 22,
        justifyContent: "center",
        alignItems: "center",
    },

    plusIcon: {
        fontSize: 42,
        color: "#6D614B",
        fontWeight: "300",
    },
    mainScreenContainer: {

        paddingTop: 20,
    },

    formSectionLabel: {
        fontSize: 18,
        color: "#646040",
        marginBottom: 10,
        marginTop: 12,
    },

    cakeNameInputField: {
        width: "100%",
        height: 58,
        backgroundColor: "#E8E0B8",
        borderRadius: 26,
        paddingHorizontal: 20,
        fontSize: 18,
        color: "#3D3127",
        marginBottom: 24,
    },

    cakeDescriptionInput: {
        width: "100%",
        height: 120,
        backgroundColor: "#E8E0B8",
        borderRadius: 30,
        paddingHorizontal: 20,
        paddingTop: 18,
        fontSize: 17,
        color: "#3D3127",
        lineHeight: 26,
        marginBottom: 34,
    },

    economicsInfoCard: {
        width: "100%",
        backgroundColor: "#faf4d6",
        borderRadius: 34,
        padding: 24,
    },

    economicsCardHeading: {
        fontSize: 24,
        fontWeight: "700",
        color: "#674F45",
        marginBottom: 28,
    },

    priceDiscountRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 28,
    },

    priceInputWrapper: {
        width: "47%",
    },

    discountInputWrapper: {
        width: "47%",
    },

    inputFieldLabel: {
        fontSize: 17,
        color: "#66584A",
        marginBottom: 10,
    },

    priceTextInput: {
        width: "100%",
        height: 54,
        backgroundColor: "#DFD7AE",
        borderRadius: 10,
        paddingHorizontal: 16,
        fontSize: 17,
        color: "#363317",
    },

    discountTextInput: {
        width: "100%",
        height: 54,
        backgroundColor: "#DFD7AE",
        borderRadius: 10,
        paddingHorizontal: 16,
        fontSize: 17,
        color: "#3D3127",
    },

    weightInputContainer: {
        width: "100%",
    },

    weightTextInput: {
        width: "100%",
        height: 54,
        backgroundColor: "#DFD7AE",
        borderRadius: 10,
        paddingHorizontal: 16,
        fontSize: 17,
        color: "#3D3127",
    },
    screenWrapper: {
        // paddingHorizontal: 16,
        paddingTop: 20,
    },

    categoryCardContainer: {
        width: "100%",
        backgroundColor: "#ECE4BE",
        borderRadius: 34,
        padding: 22,
        marginBottom: 30,
        marginTop: 10
    },

    categoryHeadingText: {
        fontSize: 22,
        fontWeight: "700",
        color: "#6D5348",
        marginBottom: 26,
    },

    dropdownSection: {
        marginBottom: 24,
    },

    dropdownLabelText: {
        fontSize: 16,
        color: "#6D5A4B",
        marginBottom: 10,
    },

    dropdownBox: {
        width: "100%",
        height: 54,
        backgroundColor: "#DED5AA",
        borderRadius: 10,
        paddingHorizontal: 14,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    dropdownValueText: {
        fontSize: 18,
        color: "#4E3D32",
    },

    dropdownArrowIcon: {
        fontSize: 18,
        color: "#6D5A4B",
        fontWeight: "700",
    },

    availabilityCardContainer: {
        width: "100%",
        backgroundColor: "#F2DED2",
        borderRadius: 34,
        padding: 22,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    availabilityTextWrapper: {
        width: "72%",
    },

    availabilityHeadingText: {
        fontSize: 20,
        fontWeight: "700",
        color: "#6D5348",
        marginBottom: 8,
    },

    availabilityDescriptionText: {
        fontSize: 15,
        lineHeight: 22,
        color: "#7E6A5D",
    },
    bottomButtonContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 16,
        marginTop: 24,
    },

    draftButton: {
        flex: 1,
        height: 56,
        backgroundColor: "#F2CDBF",
        borderRadius: 30,
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
        flex: 1.2,
        height: 56,
        backgroundColor: "#7A5C50",
        borderRadius: 30,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },

    checkIcon: {
        marginRight: 8,
    },

    catalogButtonText: {
        fontSize: 18,
        fontWeight: "700",
        color: "#FFFFFF",
    },
    couponOfferCard: {
        width: "100%",
        backgroundColor: "#F2DED2",
        borderRadius: 34,
        padding: 22,
        marginTop: 30,
    },

    couponTopSection: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 24,
    },

    couponOfferHeading: {
        fontSize: 22,
        fontWeight: "700",
        color: "#6D5348",
        marginBottom: 8,
    },

    couponOfferDescription: {
        fontSize: 15,
        lineHeight: 22,
        color: "#7E6A5D",
        width: 220,
    },

    couponInputRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 22,
    },

    couponCodeWrapper: {
        width: "68%",
    },

    discountWrapper: {
        width: "26%",
    },

    couponLabel: {
        fontSize: 15,
        color: "#6D5A4B",
        marginBottom: 10,
    },

    couponTextInput: {
        width: "100%",
        height: 54,
        backgroundColor: "#F8EEE8",
        borderRadius: 14,
        paddingHorizontal: 16,
        fontSize: 16,
        color: "#4E3D32",
    },

    discountTextInputField: {
        width: "100%",
        height: 54,
        backgroundColor: "#F8EEE8",
        borderRadius: 14,
        textAlign: "center",
        fontSize: 16,
        color: "#4E3D32",
    },

    skipCouponButton: {
        width: "100%",
        height: 54,
        backgroundColor: "#E8C7BB",
        borderRadius: 18,
        justifyContent: "center",
        alignItems: "center",
    },

    skipCouponButtonText: {
        fontSize: 16,
        fontWeight: "700",
        color: "#7A5C50",
    },
    offerScreenContainer: {
        flex: 1,
        backgroundColor: "#F6F0DF",
        // padding: 16,
        marginTop: 15
    },

    offerTopSection: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 24,
    },

    offerHeadingText: {
        fontSize: 28,
        fontWeight: "700",
        color: "#2E241D",
        marginBottom: 6,
    },

    offerDescriptionText: {
        fontSize: 16,
        lineHeight: 24,
        color: "#6B5B4C",
    },

  activeOfferCountCard: {
    width: 110,
    height: 110,
    backgroundColor: "#F2D8E3",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
},

activeOfferRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
},

 activeOfferCount: {
    fontSize: 26,
    fontWeight: "800",
    color: "#7A5C50",
    marginLeft: 6,
    lineHeight: 30,
},
activeOfferText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#7A5C50",
    letterSpacing: 1,
},

    couponCardContainer: {
        width: "100%",
        backgroundColor: "#FFFFFF",
        borderRadius: 30,
        overflow: "hidden",
        marginBottom: 22,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.08,
        shadowRadius: 10,
        elevation: 4,
    },

    leftAccentBar: {
        width: 8,
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
        width: 58,
        height: 58,
        borderRadius: 29,
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
        marginBottom: 6,
    },

    couponCodeText: {
        fontSize: 26,
        fontWeight: "800",
        color: "#2F241D",
        marginRight: 10,
    },

    flavorTagBadge: {
        backgroundColor: "#F2B6C7",
        borderRadius: 8,
        paddingHorizontal: 8,
        paddingVertical: 4,
    },

    flavorTagText: {
        fontSize: 10,
        fontWeight: "700",
        color: "#7A4D5B",
        textAlign: "center",
    },

    discountValueText: {
        fontSize: 16,
        color: "#5E5248",
        marginBottom: 4,
    },

    expiryDateText: {
        fontSize: 15,
        color: "#8A7A6A",
    },

    couponActionSection: {
        alignItems: "center",
        justifyContent: "space-between",
        height: 90,
    },

    editButton: {
       padding:10,
        borderRadius: 19,
        backgroundColor: "#7A5C50",
        justifyContent: "center",
        alignItems: "center",
    },
})