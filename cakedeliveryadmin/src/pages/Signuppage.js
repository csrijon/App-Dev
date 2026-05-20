import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    StatusBar,
    TouchableOpacity
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"
import Button from "../components/Button";

const Signuppage = () => {
    return (
        <SafeAreaView style={dessertStyles.milkCanvas}>
            <StatusBar
                backgroundColor="#F4EEDF"
                barStyle="dark-content"
            />

            <Text style={dessertStyles.brandLogoText}>
                Glaze & Grain
            </Text>

            <View style={dessertStyles.authWrapper}>
                <Text style={dessertStyles.pageHeading}>
                    Create Account
                </Text>

                <Text style={dessertStyles.pageSubText}>
                    Begin your journey into artisanal
                    pâtisserie.
                </Text>

                <View style={dessertStyles.fieldWrapper}>
                    <Text style={dessertStyles.fieldLabel}>
                        Full Name
                    </Text>

                    <TextInput
                        placeholder="Enter your full name"
                        placeholderTextColor="#B8AF8F"
                        style={dessertStyles.inputShell}
                    />
                </View>

                <View style={dessertStyles.fieldWrapper}>
                    <Text style={dessertStyles.fieldLabel}>
                        Email Address
                    </Text>

                    <TextInput
                        placeholder="hello@patisserie.com"
                        placeholderTextColor="#B8AF8F"
                        style={dessertStyles.inputShell}
                    />
                </View>

                <View style={dessertStyles.fieldWrapper}>
                    <Text style={dessertStyles.fieldLabel}>
                        Password
                    </Text>

                    <View style={dessertStyles.passwordShell}>
                        <TextInput
                            placeholder="Minimum 8 characters"
                            placeholderTextColor="#B8AF8F"
                            secureTextEntry
                            style={dessertStyles.passwordInput}
                        />

                        <Text style={dessertStyles.eyeIcon}>
                            👁
                        </Text>
                    </View>
                </View>

                <View style={dessertStyles.policyRow}>
                    <View style={dessertStyles.checkBox} />

                    <Text style={dessertStyles.policyText}>
                        I agree to the{" "}
                        <Text style={dessertStyles.boldPolicy}>
                            Terms of Service
                        </Text>{" "}
                        and{"\n"}
                        <Text style={dessertStyles.boldPolicy}>
                            Privacy Policy
                        </Text>
                    </Text>
                </View>

                <Button title="Create Account" />

                <View style={dessertStyles.bottomAuthRow}>
                    <Text style={dessertStyles.bottomText}>
                        Already have an account?
                    </Text>
                    <TouchableOpacity>
                        <Text style={dessertStyles.loginText}>
                            {" "}
                            Log In
                        </Text>
                    </TouchableOpacity>

                </View>
            </View>
        </SafeAreaView>
    )
}

export default Signuppage

const dessertStyles = StyleSheet.create({
    milkCanvas: {
        flex: 1,
        backgroundColor: "#F4EEDF",
        paddingHorizontal: 24,
    },

    brandLogoText: {
        textAlign: "center",
        marginTop: 25,
        color: "#7A5A4D",
        fontSize: 16,
        fontWeight: "700",
    },

    authWrapper: {
        marginTop: 15,
    },

    pageHeading: {
        color: "#7B5A4E",
        fontSize: 40,
        fontWeight: "700",
        textAlign: "center"
    },

    pageSubText: {
        color: "#8A7466",
        fontSize: 18,
        marginTop: 10,
        lineHeight: 30,
        textAlign: "center"
    },

    fieldWrapper: {
        marginTop: 15,
    },

    fieldLabel: {
        color: "#6F574C",
        fontSize: 16,
        marginBottom: 12,
        fontWeight: "500",
    },

    inputShell: {
        width: "100%",
        height: 58,
        backgroundColor: "#E7DDB4",
        borderRadius: 32,
        paddingHorizontal: 22,
        fontSize: 16,
        color: "#6E564B",
    },

    passwordShell: {
        width: "100%",
        height: 58,
        backgroundColor: "#E7DDB4",
        borderRadius: 32,
        paddingHorizontal: 22,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    passwordInput: {
        flex: 1,
        fontSize: 16,
        color: "#6E564B",
    },

    eyeIcon: {
        fontSize: 18,
        color: "#7B5A4E",
    },

    policyRow: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginTop: 28,
    },

    checkBox: {
        width: 18,
        height: 18,
        borderWidth: 1.5,
        borderColor: "#C5B99B",
        borderRadius: 5,
        marginTop: 3,
    },

    policyText: {
        marginLeft: 12,
        color: "#7F6B5F",
        fontSize: 15,
        lineHeight: 28,
    },

    boldPolicy: {
        color: "#6D5248",
        fontWeight: "700",
    },

    // signupButton: {
    //     width: "100%",
    //     height: 62,
    //     backgroundColor: "#8A675B",
    //     borderRadius: 36,
    //     justifyContent: "center",
    //     alignItems: "center",
    //     marginTop: 48,

    //     shadowColor: "#000",
    //     shadowOffset: {
    //         width: 0,
    //         height: 10,
    //     },

    //     shadowOpacity: 0.12,
    //     shadowRadius: 10,
    //     elevation: 8,
    // },

    // signupButtonText: {
    //     color: "#fff",
    //     fontSize: 20,
    //     fontWeight: "700",
    // },

    bottomAuthRow: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 15,
    },

    bottomText: {
        color: "#7F6B5F",
        fontSize: 16,
    },

    loginText: {
        color: "#6B5046",
        fontSize: 16,
        fontWeight: "700",
    },
});