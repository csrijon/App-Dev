import { SafeAreaView } from "react-native-safe-area-context"
import { StatusBar, Text, ScrollView, View, ImageBackground, StyleSheet, Image, TouchableOpacity } from "react-native"
import Ordertrackheader from "../components/Ordertrackheader"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Ordertrackingpage = () => {
    return (
        <SafeAreaView style={ordertrackingstyle.Ordertrackingpagecontainer} >
            <StatusBar backgroundColor="#fff9e6cc" barStyle="dark-content" />
            <Ordertrackheader />
            <ScrollView contentContainerStyle={{ paddingHorizontal: 20,paddingBottom:30 }} showsVerticalScrollIndicator={false} >
                <View style={ordertrackingstyle.deliveryScreen}>
                    <ImageBackground
                        source={require("../images/catalog.png")}
                        style={ordertrackingstyle.deliveryWrapper}
                        imageStyle={ordertrackingstyle.deliveryBackgroundImage}
                    >
                        {/* Header Badge */}
                        <View style={ordertrackingstyle.deliveryStatusBadge}>
                            <View style={ordertrackingstyle.deliveryStatusDot} />

                            <Text style={ordertrackingstyle.deliveryStatusText}>
                                Active Delivery: #ORD-9921
                            </Text>
                        </View>

                        {/* Bottom Card */}
                        <View style={ordertrackingstyle.deliveryInfoCard}>
                            <View style={ordertrackingstyle.deliveryTopSection}>
                                <View>
                                    <Text style={ordertrackingstyle.deliverySmallTitle}>
                                        Estimated Arrival
                                    </Text>

                                    <Text style={ordertrackingstyle.deliveryArrivalTime}>
                                        12:45 PM
                                    </Text>
                                </View>

                                <View style={ordertrackingstyle.deliveryTimeBadge}>
                                    <Text style={ordertrackingstyle.deliveryTimeBadgeText}>
                                        ON TIME
                                    </Text>
                                </View>
                            </View>

                            <View style={ordertrackingstyle.deliveryLocationSection}>
                                <Text style={ordertrackingstyle.deliverySmallTitle}>
                                    Current Location
                                </Text>

                                <Text style={ordertrackingstyle.deliveryLocationText}>
                                    Avenue des Champs-Élysées
                                </Text>
                            </View>
                        </View>
                    </ImageBackground>
                </View>

                <View style={ordertrackingstyle.bakeryDeliveryMainContainer}>

                    {/* Truck Icon */}
                    <View style={ordertrackingstyle.bakeryTruckIconWrapper}>
                        <MaterialCommunityIcons
                            name="truck-delivery"
                            size={30}
                            color="#7B5D4F"
                        />
                    </View>

                    {/* Heading */}
                    <Text style={ordertrackingstyle.bakeryDeliveryHeadingText}>
                        Out for Delivery
                    </Text>

                    {/* Description */}
                    <Text style={ordertrackingstyle.bakeryDeliveryDescriptionText}>
                        Your curated selection of hand-laminated croissants and
                        seasonal tarts is currently in transit.
                    </Text>

                    {/* Divider */}
                    <View style={ordertrackingstyle.bakeryDeliveryDividerLine} />

                    {/* Bottom Row */}
                    <View style={ordertrackingstyle.bakeryDeliveryBottomSection}>

                        {/* Clock Circle */}
                        <View style={ordertrackingstyle.bakeryClockBackgroundCircle}>
                            <MaterialCommunityIcons
                                name="clock-outline"
                                size={22}
                                color="#7B5D4F"
                            />
                        </View>

                        {/* Text Section */}
                        <View style={ordertrackingstyle.bakeryDeliveryTimeWrapper}>
                            <Text style={ordertrackingstyle.bakeryDeliveryStatusText}>
                                Baking Finished
                            </Text>

                            <Text style={ordertrackingstyle.bakeryDeliveryTimeText}>
                                11:30 AM
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={ordertrackingstyle.courierMainContainer}>

                    {/* Profile Image */}
                    <Image
                        source={{
                            uri: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
                        }}
                        style={ordertrackingstyle.courierProfileImage}
                    />

                    {/* Title */}
                    <Text style={ordertrackingstyle.courierAssignedText}>
                        ASSIGNED COURIER
                    </Text>

                    {/* Name */}
                    <Text style={ordertrackingstyle.courierNameText}>
                        Marc Beaulieu
                    </Text>

                    {/* Description */}
                    <Text style={ordertrackingstyle.courierDescriptionText}>
                        Expert Delivery Partner since 2021
                    </Text>

                    {/* Vehicle Badge */}
                    <View style={ordertrackingstyle.courierVehicleBadge}>
                        <MaterialCommunityIcons
                            name="scooter-electric"
                            size={18}
                            color="#6E553F"
                        />

                        <Text style={ordertrackingstyle.courierVehicleText}>
                            ELECTRIC VESPA
                        </Text>
                    </View>

                    {/* Rating Badge */}
                    <View style={ordertrackingstyle.courierRatingBadge}>
                        <MaterialCommunityIcons
                            name="star"
                            size={15}
                            color="#6F4552"
                        />

                        <Text style={ordertrackingstyle.courierRatingText}>
                            4.9 Rating
                        </Text>
                    </View>

                    {/* Contact Button */}
                    <TouchableOpacity style={ordertrackingstyle.courierContactButton}>
                        <MaterialCommunityIcons
                            name="phone-outline"
                            size={18}
                            color="#FFFFFF"
                        />

                        <Text style={ordertrackingstyle.courierContactButtonText}>
                            Contact Marc
                        </Text>
                    </TouchableOpacity>

                    {/* Message Button */}
                    <TouchableOpacity style={ordertrackingstyle.courierMessageButton}>
                        <MaterialCommunityIcons
                            name="message-outline"
                            size={18}
                            color="#2E2A22"
                        />

                        <Text style={ordertrackingstyle.courierMessageButtonText}>
                            Send Message
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={ordertrackingstyle.milestoneMainContainer}>

                    {/* Heading */}
                    <Text style={ordertrackingstyle.milestoneHeadingText}>
                        Delivery Milestones
                    </Text>

                    {/* Timeline Wrapper */}
                    <View style={ordertrackingstyle.milestoneTimelineWrapper}>

                        {/* Vertical Line */}
                        <View style={ordertrackingstyle.milestoneVerticalLine} />

                        {/* First Item */}
                        <View style={ordertrackingstyle.milestoneRowContainer}>

                            <View style={ordertrackingstyle.milestoneCompletedCircle}>
                                <MaterialCommunityIcons
                                    name="check"
                                    size={20}
                                    color="#FFFFFF"
                                />
                            </View>

                            <View style={ordertrackingstyle.milestoneContentWrapper}>
                                <Text style={ordertrackingstyle.milestoneTitleText}>
                                    Order Handcrafted
                                </Text>

                                <Text style={ordertrackingstyle.milestoneDescriptionText}>
                                    Our chefs completed your order at the main atelier.
                                </Text>

                                <Text style={ordertrackingstyle.milestoneTimeText}>
                                    09:15 AM
                                </Text>
                            </View>
                        </View>

                        {/* Second Item */}
                        <View style={ordertrackingstyle.milestoneRowContainer}>

                            <View style={ordertrackingstyle.milestoneCompletedCircle}>
                                <MaterialCommunityIcons
                                    name="check"
                                    size={20}
                                    color="#FFFFFF"
                                />
                            </View>

                            <View style={ordertrackingstyle.milestoneContentWrapper}>
                                <Text style={ordertrackingstyle.milestoneTitleText}>
                                    Order Picked Up
                                </Text>

                                <Text style={ordertrackingstyle.milestoneDescriptionText}>
                                    Marc has securely loaded your pastries for transit.
                                </Text>

                                <Text style={ordertrackingstyle.milestoneTimeText}>
                                    11:45 AM
                                </Text>
                            </View>
                        </View>

                        {/* Transit Item */}
                        <View style={ordertrackingstyle.milestoneTransitRow}>

                            <View style={ordertrackingstyle.milestoneTransitCircle}>
                                <MaterialCommunityIcons
                                    name="map-marker-outline"
                                    size={22}
                                    color="#7A5B4D"
                                />
                            </View>

                            <View style={ordertrackingstyle.milestoneTransitCard}>

                                <Text style={ordertrackingstyle.milestoneTransitTitle}>
                                    In Transit
                                </Text>

                                <Text style={ordertrackingstyle.milestoneTransitDescription}>
                                    The rider is currently 1.2km away from your destination.
                                </Text>

                                <View style={ordertrackingstyle.milestoneTrafficBadge}>
                                    <MaterialCommunityIcons
                                        name="traffic-light-outline"
                                        size={16}
                                        color="#6E5560"
                                    />

                                    <Text style={ordertrackingstyle.milestoneTrafficText}>
                                        Light traffic ahead
                                    </Text>
                                </View>
                            </View>
                        </View>

                        {/* Completed Item */}
                        <View style={ordertrackingstyle.milestoneRowContainer}>

                            <View style={ordertrackingstyle.milestonePendingCircle}>
                                <MaterialCommunityIcons
                                    name="flag-outline"
                                    size={18}
                                    color="#C0B79C"
                                />
                            </View>

                            <View style={ordertrackingstyle.milestoneContentWrapper}>
                                <Text style={ordertrackingstyle.milestonePendingTitle}>
                                    Delivery Complete
                                </Text>

                                <Text style={ordertrackingstyle.milestonePendingDescription}>
                                    Estimated delivery by 12:45 PM.
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>


            </ScrollView>
        </SafeAreaView>
    )
}

export default Ordertrackingpage

const ordertrackingstyle = StyleSheet.create({
    Ordertrackingpagecontainer: {
        flex: 1,
        backgroundColor: "#F4F0E7",
    },
    deliveryScreen: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20
    },

    deliveryWrapper: {
        width: 365,
        height: 265,
        borderRadius: 32,
        overflow: "hidden",
        paddingHorizontal: 18,
        paddingVertical: 16,
        justifyContent: "space-between",
    },

    deliveryBackgroundImage: {
        borderRadius: 32,
        opacity: 0.35,
    },

    deliveryStatusBadge: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "flex-start",
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 18,
        paddingVertical: 10,
        borderRadius: 100,
    },

    deliveryStatusDot: {
        width: 10,
        height: 10,
        borderRadius: 50,
        backgroundColor: "#86675E",
        marginRight: 10,
    },

    deliveryStatusText: {
        fontSize: 15,
        fontWeight: "600",
        color: "#7C655C",
    },

    deliveryInfoCard: {
        backgroundColor: "#F8F7F4",
        borderRadius: 28,
        paddingHorizontal: 22,
        paddingVertical: 20,
    },

    deliveryTopSection: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },

    deliverySmallTitle: {
        fontSize: 15,
        color: "#7B766F",
        marginBottom: 6,
    },

    deliveryArrivalTime: {
        fontSize: 24,
        fontWeight: "700",
        color: "#4C3C35",
    },

    deliveryTimeBadge: {
        backgroundColor: "#E7B7A7",
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 50,
    },

    deliveryTimeBadgeText: {
        fontSize: 13,
        fontWeight: "700",
        color: "#7B4E40",
    },

    deliveryLocationSection: {
        marginTop: 20,
    },

    deliveryLocationText: {
        fontSize: 18,
        fontWeight: "600",
        color: "#3F342D",
        marginTop: 4,
    },
    bakeryDeliveryMainContainer: {
        marginTop: 15,
        width: "100%",
        backgroundColor: "#EEE8CB",
        borderRadius: 34,
        paddingHorizontal: 26,
        paddingVertical: 28,
    },

    bakeryTruckIconWrapper: {
        marginBottom: 24,
    },

    bakeryDeliveryHeadingText: {
        fontSize: 30,
        fontWeight: "700",
        color: "#1D1D1D",
        marginBottom: 14,
    },

    bakeryDeliveryDescriptionText: {
        fontSize: 18,
        lineHeight: 31,
        color: "#715F53",
    },

    bakeryDeliveryDividerLine: {
        height: 1,
        backgroundColor: "#DED6BB",
        marginVertical: 28,
    },

    bakeryDeliveryBottomSection: {
        flexDirection: "row",
        alignItems: "center",
    },

    bakeryClockBackgroundCircle: {
        width: 56,
        height: 56,
        borderRadius: 100,
        backgroundColor: "#EDC8BE",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 16,
    },

    bakeryDeliveryTimeWrapper: {
        justifyContent: "center",
    },

    bakeryDeliveryStatusText: {
        fontSize: 17,
        color: "#7A665B",
        marginBottom: 4,
    },

    bakeryDeliveryTimeText: {
        fontSize: 24,
        fontWeight: "700",
        color: "#1F1F1F",
    },
    courierMainContainer: {
        width: "100%",
        backgroundColor: "#F4F2F2",
        borderRadius: 38,
        alignItems: "center",
        paddingHorizontal: 24,
        paddingVertical: 28,
        marginTop: 20
    },

    courierProfileImage: {
        width: 110,
        height: 110,
        borderRadius: 100,
        marginBottom: 26,
        borderWidth: 3,
        borderColor: "#D9C49A",
    },

    courierAssignedText: {
        fontSize: 16,
        fontWeight: "700",
        letterSpacing: 2,
        color: "#7A603F",
        marginBottom: 10,
    },

    courierNameText: {
        fontSize: 30,
        fontWeight: "700",
        color: "#6A4E3B",
        marginBottom: 6,
    },

    courierDescriptionText: {
        fontSize: 17,
        color: "#776A62",
        marginBottom: 20,
    },

    courierVehicleBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#E8DFC0",
        paddingHorizontal: 18,
        paddingVertical: 10,
        borderRadius: 100,
        marginBottom: 14,
    },

    courierVehicleText: {
        fontSize: 15,
        fontWeight: "700",
        color: "#6D563E",
        marginLeft: 8,
    },

    courierRatingBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F1D9E1",
        paddingHorizontal: 16,
        paddingVertical: 9,
        borderRadius: 100,
        marginBottom: 30,
    },

    courierRatingText: {
        fontSize: 15,
        fontWeight: "700",
        color: "#6F4552",
        marginLeft: 6,
    },

    courierContactButton: {
        width: "100%",
        height: 58,
        backgroundColor: "#7C5D50",
        borderRadius: 100,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 14,
    },

    courierContactButtonText: {
        fontSize: 18,
        fontWeight: "700",
        color: "#FFFFFF",
        marginLeft: 8,
    },

    courierMessageButton: {
        width: "100%",
        height: 58,
        backgroundColor: "#DED7AC",
        borderRadius: 100,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },

    courierMessageButtonText: {
        fontSize: 18,
        fontWeight: "700",
        color: "#2E2A22",
        marginLeft: 8,
    },
    milestoneMainContainer: {
        width: "100%",
        backgroundColor: "#EEE8C9",
        borderRadius: 36,
        paddingHorizontal: 26,
        paddingVertical: 28,
        marginTop:20
    },

    milestoneHeadingText: {
        fontSize: 24,
        fontWeight: "700",
        color: "#2A251F",
        marginBottom: 28,
    },

    milestoneTimelineWrapper: {
        position: "relative",
    },

    milestoneVerticalLine: {
        position: "absolute",
        left: 20,
        top: 10,
        bottom: 10,
        width: 2,
        backgroundColor: "#D9D0B0",
    },

    milestoneRowContainer: {
        flexDirection: "row",
        marginBottom: 34,
    },

    milestoneCompletedCircle: {
        width: 42,
        height: 42,
        borderRadius: 100,
        backgroundColor: "#7D5D4F",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10,
    },

    milestonePendingCircle: {
        width: 42,
        height: 42,
        borderRadius: 100,
        backgroundColor: "#E8DFC1",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10,
    },

    milestoneContentWrapper: {
        flex: 1,
        marginLeft: 18,
        paddingTop: 2,
    },

    milestoneTitleText: {
        fontSize: 18,
        fontWeight: "700",
        color: "#2C241E",
        marginBottom: 6,
    },

    milestoneDescriptionText: {
        fontSize: 16,
        lineHeight: 26,
        color: "#6C5E53",
        marginBottom: 8,
    },

    milestoneTimeText: {
        fontSize: 16,
        fontWeight: "700",
        color: "#7C5C4E",
    },

    milestoneTransitRow: {
        flexDirection: "row",
        marginBottom: 34,
    },

    milestoneTransitCircle: {
        width: 42,
        height: 42,
        borderRadius: 100,
        backgroundColor: "#EDC9BE",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10,
    },

    milestoneTransitCard: {
        flex: 1,
        backgroundColor: "#F4F2F3",
        borderRadius: 28,
        paddingHorizontal: 22,
        paddingVertical: 20,
        marginLeft: 18,
        borderLeftWidth: 4,
        borderLeftColor: "#7D5D4F",
    },

    milestoneTransitTitle: {
        fontSize: 20,
        fontWeight: "700",
        color: "#7A5A4D",
        marginBottom: 8,
    },

    milestoneTransitDescription: {
        fontSize: 16,
        lineHeight: 28,
        color: "#6C6059",
        marginBottom: 16,
    },

    milestoneTrafficBadge: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "flex-start",
        backgroundColor: "#EFE8EB",
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: 14,
    },

    milestoneTrafficText: {
        fontSize: 15,
        color: "#6E5560",
        marginLeft: 8,
    },

    milestonePendingTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#B1A88E",
        marginBottom: 6,
    },

    milestonePendingDescription: {
        fontSize: 16,
        lineHeight: 24,
        color: "#B8AF96",
    },
})

