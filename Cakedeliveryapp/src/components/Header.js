import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, PermissionsAndroid, Alert } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Geolocation from '@react-native-community/geolocation';
import { useEffect, useState } from "react";

const Header = () => {

    const [city, setcity] = useState("")
    const [suburb, setsuburb] = useState("")

    useEffect(() => {

        const getLocation = async () => {

            try {

                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: "Location Permission",
                        message: "App needs access to your location",
                        buttonPositive: "OK",
                    }
                );

                if (granted === PermissionsAndroid.RESULTS.GRANTED) {

                    Geolocation.getCurrentPosition(

                        async (position) => {

                            const { latitude, longitude } = position.coords;

                            console.log(latitude, longitude);

                            let response = await fetch(
                                `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
                            );

                            let data = await response.json();

                            console.log(data);

                            setcity(data.address.city || "");
                            setsuburb(data.address.suburb || "");

                        },

                        (error) => {
                            console.log(error);
                        },

                        {
                            enableHighAccuracy: true,
                            timeout: 15000,
                            maximumAge: 10000,
                        }

                    );

                } else {

                    Alert.alert("Location permission denied");

                }

            } catch (error) {

                console.log(error);

            }

        };

        getLocation();

    }, []);
    return (
        <View style={styles.container}>

            {/* Left Section */}
            <View style={styles.leftContainer}>

                <View style={styles.locationIconContainer}>
                    <Ionicons name="location-sharp" size={22} color="#8B5E57" />
                </View>

                <TouchableOpacity>
                    <Text style={styles.deliveryText}>DELIVERY TO</Text>

                    <View style={styles.locationRow}>
                        <Text style={styles.locationText}>{suburb} {city}</Text>

                        <Ionicons
                            name="chevron-down"
                            size={16}
                            color="#6B5B53"
                            style={{ marginTop: 2 }}
                        />
                    </View>
                </TouchableOpacity>

            </View>

            {/* Right Section */}
            <View style={styles.rightContainer}>

                <TouchableOpacity style={styles.bellContainer}>
                    <Ionicons
                        name="notifications-outline"
                        size={22}
                        color="#6B5B53"
                    />
                </TouchableOpacity>

                <TouchableOpacity>
                    <Image
                        source={{
                            uri: "https://i.pravatar.cc/150?img=12",
                        }}
                        style={styles.profileImage}
                    />
                </TouchableOpacity>

            </View>

        </View>
    );
};

export default Header;

const styles = StyleSheet.create({
    container: {
        width: "100%",
        backgroundColor: "#f8f1df",
        paddingHorizontal: 18,
        paddingVertical: 14,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    leftContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },

    locationIconContainer: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: "#F6D9D1",
        justifyContent: "center",
        alignItems: "center",
    },

    deliveryText: {
        fontSize: 11,
        fontWeight: "700",
        color: "#646040",
        letterSpacing: 1,
    },

    locationRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 2,
    },

    locationText: {
        fontSize: 14,
        fontWeight: "700",
        color: "#363317",
        marginRight: 4,
    },

    rightContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },

    bellContainer: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: "#EEE5C8",
        justifyContent: "center",
        alignItems: "center",
    },

    profileImage: {
        width: 46,
        height: 46,
        borderRadius: 23,
        borderWidth: 2,
        borderColor: "#8B5E57",
    },
});