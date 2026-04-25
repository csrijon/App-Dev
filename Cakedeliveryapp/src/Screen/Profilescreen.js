import { SafeAreaView } from "react-native-safe-area-context"
import { View, StyleSheet, StatusBar, TouchableOpacity, Text, Image, TextInput, ScrollView } from "react-native"
import Ionicons from "react-native-vector-icons/Ionicons";
import Simpleheader from "../components/Simpleheader"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Profilescreen = ({navigation}) => {
    return (
        <SafeAreaView style={styles.Profilecontainer} >
            <StatusBar backgroundColor="#fff9e6" barStyle="dark-content" />
            <Simpleheader />
            <ScrollView contentContainerStyle={{ paddingBottom: 40 }} style={styles.profilesection} >
                {/* {edit text section} */}
                <View style={styles.profileedittext} >
                    <TouchableOpacity>
                        <Text style={styles.edittext} >
                            Edit Profile
                        </Text>
                    </TouchableOpacity>
                    <Text style={styles.editnormaltext} >
                        Keep your sweet details up to date
                    </Text>
                </View>
                {/* {edit text section end} */}
                <View style={styles.cardShell}>

                    {/* Avatar Block */}
                    <View style={styles.avatarBlock}>
                        <Image
                            source={{ uri: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df" }}
                            style={styles.avatarFrame}
                        />

                        <View style={styles.floatingAction}>
                            <Ionicons name="camera-outline" size={16} color="#fff" />
                        </View>
                    </View>

                    {/* Content Block */}
                    <View style={styles.contentStack}>
                        <Text style={styles.headingText}>Your Pâtisserie Identity</Text>
                        <Text style={styles.bodyText}>
                            This information will be displayed on your invoices and used for
                            personalized recommendations.
                        </Text>
                    </View>

                </View>

                {/* {start of profile inputsection} */}
                <View style={styles.profileinputwrappr} >
                    <View style={styles.inputsection} >
                        <Text style={styles.textinput} >Full Name</Text>
                        <TextInput style={styles.inputtext} placeholder="Enter Your Name" />
                    </View>
                    <View style={styles.inputsection} >
                        <Text style={styles.textinput} >Email Address</Text>
                        <TextInput keyboardType="default" style={styles.inputtext} placeholder="Enter Your Email" />
                    </View>
                    <View style={styles.inputsection} >
                        <Text style={styles.textinput} >Phone Number</Text>
                        <TextInput maxLength={10} keyboardType="number-pad" style={styles.inputtext} placeholder="Enter Mobile Number" />
                    </View>
                </View>

                {/* {password edit section start} */}
                <View style={styles.rootCanvas}>

                    {/* Card */}
                    <View style={styles.softCardShell}>

                        {/* Header */}
                        <View style={styles.headerFlexRow}>
                            <Text style={styles.headerIcon}>🔒</Text>
                            <Text style={styles.headerLabel}>Security</Text>
                        </View>

                        {/* Current Password */}
                        <Text style={styles.inputTag}>Current Password</Text>
                        <TextInput
                            style={styles.inputBubble}
                            secureTextEntry
                            //   editable={false}
                            //   value="••••••••"
                            placeholder="••••••••"
                        />

                        {/* New Password */}
                        <Text style={styles.inputTag}>New Password</Text>
                        <TextInput
                            style={styles.inputBubble}
                            placeholder="Enter new password"
                            placeholderTextColor="#7a7a7a"
                            secureTextEntry
                        //   editable={false}
                        />
                    </View>

                    {/* Save Button */}
                    <TouchableOpacity onPress={()=>navigation.navigate("Adressscreen")} style={styles.primaryPill}>
                        <Text style={styles.primaryText}>Save Changes</Text>
                    </TouchableOpacity>

                    {/* Discard */}
                    <TouchableOpacity>
                        <Text style={styles.discardText}>Discard Edits</Text>
                    </TouchableOpacity>
                    
                </View>
                {/* {end of password wrapper section} */}

            </ScrollView>
        </SafeAreaView>
    )
}

export default Profilescreen

const styles = StyleSheet.create({
    Profilecontainer: {
        flex: 1,
    },
    profilesection: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 20
    },
    profileedittext: {
        alignItems: "center",
        gap: 15,
        marginBottom: 40
    },
    edittext: {
        fontSize: 20,
        fontWeight: 800,
        color: "#75584e"
    },
    editnormaltext: {
        fontWeight: 500,
        color: "#646040",
        fontSize: 16
    },
    cardShell: {
        backgroundColor: "#E9DFC3",
        borderRadius: 32,
        paddingVertical: 24,
        paddingHorizontal: 20,
        alignItems: "center",
        maxWidth: 360,
        width: "100%",
        alignSelf: "center",
    },

    /* Avatar section */
    avatarBlock: {
        position: "relative",
        marginBottom: 18,
    },

    avatarFrame: {
        width: 110,
        height: 110,
        borderTopLeftRadius: 48,
        borderBottomRightRadius: 48,
        borderWidth: 3,
        borderColor: "#FFFFFF",
    },

    /* Floating camera button */
    floatingAction: {
        position: "absolute",
        right: -6,
        bottom: -6,

        width: 32,
        height: 32,
        borderRadius: 999, // full circle (pro trick)

        backgroundColor: "#7B5E57",
        justifyContent: "center",
        alignItems: "center",

        elevation: 5,
    },

    /* Text layout */
    contentStack: {
        alignItems: "baseline",
        rowGap: 6, // uncommon but supported in latest RN
    },

    headingText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#6A4E42",
        letterSpacing: 0.2,
    },

    bodyText: {
        fontSize: 13,
        lineHeight: 28,
        color: "#6A4E42",
        textAlign: "left",
        opacity: 0.85,
        // paddingHorizontal: 10,
    },
    profileinputwrappr: {
        maxWidth: 360,
        width: "100%",
        paddingHorizontal: 20,
        marginTop: 30,
        paddingVertical: 20,
        gap: 20
    },
    inputsection: {
        gap: 10
    },
    inputtext: {
        backgroundColor: "#eae3bb",
        paddingHorizontal: 24,
        paddingVertical: 20,
        borderRadius: 999,
        color: "black"
    },
    textinput: {
        fontWeight: 700,
        color: "#646040",
        fontSize: 18
    },
    passwordwrapper: {
        width: "100%",
        maxWidth: 360
    },
    rootCanvas: {
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: "center",
    },

    softCardShell: {
        // backgroundColor: "#E3D9BD",
        borderRadius: 32,
        paddingVertical: 24,
        paddingHorizontal: 20,
    },

    headerFlexRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
    },

    headerIcon: {
        fontSize: 18,
        marginRight: 8,
    },

    headerLabel: {
        fontSize: 16,
        fontWeight: "600",
        color: "#5C4A3F",
    },

    inputTag: {
        marginTop: 12,
        marginBottom: 6,
        fontSize: 14,
        fontWeight: "500",
        color: "#5C4A3F",
    },

    inputBubble: {
        backgroundColor: "#F1F1F1",
        borderRadius: 26,
        paddingVertical: 14,
        paddingHorizontal: 16,
        fontSize: 14,
    },

    primaryPill: {
        marginTop: 30,
        // backgroundColor: "#D9B3A5",
        paddingVertical: 16,
        borderRadius: 32,
        alignItems: "center",
    },

    primaryText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#4B3B33",
    },

    discardText: {
        marginTop: 18,
        textAlign: "center",
        color: "#6E5B52",
        fontSize: 14,
    }, rootCanvas: {
        flex: 1,
        // backgroundColor: "#EEE6D7",
        paddingHorizontal: 20,
        justifyContent: "center",
    },

    softCardShell: {
        backgroundColor: "#FAF4D6",
        borderRadius: 32,
        paddingVertical: 24,
        paddingHorizontal: 20,
    },

    headerFlexRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
    },

    headerIcon: {
        fontSize: 18,
        marginRight: 8,
    },

    headerLabel: {
        fontSize: 16,
        fontWeight: "600",
        color: "#5C4A3F",
    },

    inputTag: {
        marginTop: 12,
        marginBottom: 6,
        fontSize: 14,
        fontWeight: "500",
        color: "#5C4A3F",
    },

    inputBubble: {
        backgroundColor: "#F1F1F1",
        borderRadius: 26,
        paddingVertical: 14,
        paddingHorizontal: 16,
        fontSize: 14,
    },

    primaryPill: {
        marginTop: 30,
        backgroundColor: "#D9B3A5",
        paddingVertical: 16,
        borderRadius: 32,
        alignItems: "center",
    },

    primaryText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#4B3B33",
    },

    discardText: {
        marginTop: 18,
        textAlign: "center",
        color: "#6E5B52",
        fontSize: 14,
    },

})