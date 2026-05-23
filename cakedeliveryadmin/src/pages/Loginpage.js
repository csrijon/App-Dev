import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    StatusBar,
    TouchableOpacity
} from "react-native";
import Button from "../components/Button"

import { SafeAreaView } from "react-native-safe-area-context";

const Loginpage = ({navigation}) => {
    return (
        <SafeAreaView style={pastryStyles.velvetCanvas}>
            <StatusBar
                backgroundColor="#F5EEDF"
                barStyle="dark-content"
            />

            <Text style={pastryStyles.bakerySignature}>
                GLAZE & GRAIN
            </Text>

            <View style={pastryStyles.creamPanel}>
                <Text style={pastryStyles.artisanHeading}>
                    Welcome Back
                </Text>

                <Text style={pastryStyles.cocoaSubtitle}>
                    Sign in to continue your artisanal
                    {"\n"}
                    journey.
                </Text>

                <View style={pastryStyles.frostingBlock}>
                    <Text style={pastryStyles.caramelLabel}>
                        Email Address
                    </Text>

                    <TextInput
                        placeholder="hello@confectioner.com"
                        placeholderTextColor="#BDAF92"
                        style={pastryStyles.butterInputShell}
                    />
                </View>

                <View style={pastryStyles.truffleHeader}>
                    <Text style={pastryStyles.caramelLabel}>
                        Password
                    </Text>

                    <Text style={pastryStyles.vanillaAssistText}>
                        Forgot Password?
                    </Text>
                </View>

                <TextInput
                    placeholder="••••••••"
                    placeholderTextColor="#A28E73"
                    secureTextEntry
                    style={pastryStyles.butterInputShell}
                />
                <Button onPress={()=>navigation.navigate("TabScreens")} title="Sign in →" />

                <View style={pastryStyles.sugarFooterRibbon}>
                    <Text style={pastryStyles.cinnamonHint}>
                        Don’t have an account?
                    </Text>
                    <TouchableOpacity onPress={()=>navigation.navigate("Signup")} >
                        <Text style={pastryStyles.pralineLinkText}>
                            {" "}
                            Create account
                        </Text>
                    </TouchableOpacity>

                </View>
            </View>

        </SafeAreaView>
    )
}

export default Loginpage

const pastryStyles = StyleSheet.create({
    velvetCanvas: {
        flex: 1,
        backgroundColor: "#F5EEDF",
        paddingHorizontal: 22,
        gap: 30
    },

    bakerySignature: {
        textAlign: "center",
        marginTop: 25,
        fontSize: 22,
        color: "#8B675A",
        fontWeight: "700",
        letterSpacing: 1,
    },
    creamPanel: {
        width: "100%",
        backgroundColor: "#FAF6EE",
        borderRadius: 40,
        paddingHorizontal: 28,
        paddingVertical: 20,
    },
    artisanHeading: {
        fontSize: 42,
        color: "#7B5A4E",
        fontWeight: "700",
    },
    cocoaSubtitle: {
        fontSize: 16,
        color: "#8E7A6B",
        marginTop: 8,
        lineHeight: 28,
    },

    frostingBlock: {
        marginTop: 20,
    },

    caramelLabel: {
        fontSize: 16,
        color: "#8A7466",
        marginBottom: 5,
        fontWeight: "500",
    },

    butterInputShell: {
        width: "100%",
        height: 58,
        backgroundColor: "#E8DFB7",
        borderRadius: 30,
        paddingHorizontal: 24,
        fontSize: 16,
        color: "#6D574D",
    },

    truffleHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 14,
        marginBottom: 12,
    },

    vanillaAssistText: {
        color: "#7E6559",
        fontSize: 16,
        fontWeight: "700",
    },

    sugarFooterRibbon: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 50,
    },

    cinnamonHint: {
        color: "#8C7A6B",
        fontSize: 15,
    },

    pralineLinkText: {
        color: "#7B5A4E",
        fontSize: 15,
        fontWeight: "700",
    },

});