import React from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { ScrollView, View, Text, Image, StyleSheet, TouchableOpacity } from "react-native"
import Adminheader from "../components/Adminheader"
import Ionicons from 'react-native-vector-icons/Ionicons';


const Profilepage = () => {
    return (
        <SafeAreaView style={styles.Profilecontainer} >
            <Adminheader />
            <ScrollView>
                <View style={styles.profilecard}>

                    {/* Profile Image */}
                    <View style={styles.profileBox}>
                        <Image
                            source={{
                                uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400",
                            }}
                            style={styles.profileImage}
                        />

                        {/* Edit Button */}
                        <TouchableOpacity style={styles.editButton}>
                            <Ionicons name="pencil" size={15} color="#FFFFFF" />
                        </TouchableOpacity>
                    </View>

                    {/* User Name */}
                    <Text style={styles.userName}>
                        Eloise Beaumont
                    </Text>

                    {/* Membership Badge */}
                    <View style={styles.goldBadge}>
                        <Ionicons name="star" size={12} color="#6B4F3B" />

                        <Text style={styles.badgeText}>
                            GOLD MEMBER
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Profilepage

const styles = StyleSheet.create({
    Profilecontainer: {
        flex: 1,
        backgroundColor: "#fff9e6cc"
    },
    profilecard: {
        // flex: 1,
        // backgroundColor: "#F5F0E5",
        justifyContent: "center",
        alignItems: "center",
    },

    profileBox: {
        position: "relative",
        marginBottom: 18,
    },

    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 4,
        borderColor: "#FFFFFF",
    },

    editButton: {
        position: "absolute",
        right: 0,
        bottom: 5,
        width: 34,
        height: 34,
        borderRadius: 17,
        backgroundColor: "#8B6A5B",
        justifyContent: "center",
        alignItems: "center",
    },

    userName: {
        fontSize: 34,
        fontWeight: "700",
        color: "#1F1F1F",
        marginBottom: 14,
    },

    goldBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F3CFC3",
        paddingHorizontal: 18,
        paddingVertical: 8,
        borderRadius: 30,
    },

    badgeText: {
        marginLeft: 6,
        fontSize: 14,
        fontWeight: "700",
        color: "#6B4F3B",
        letterSpacing: 0.5,
    },
})