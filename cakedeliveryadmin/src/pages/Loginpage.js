import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    StatusBar,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Image
} from "react-native";
import Button from "../components/Button"
import Ionicons from "react-native-vector-icons/Ionicons";

import { SafeAreaView } from "react-native-safe-area-context";

const Loginpage = ({navigation}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    return (
        <SafeAreaView style={pastryStyles.velvetCanvas}>
            <StatusBar
                backgroundColor="#F5EEDF"
                barStyle="dark-content"
            />

            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    {/* Illustration header */}
                    <View style={pastryStyles.illustrationWrap}>
                        <View style={pastryStyles.bgBlob} />
                        <View style={pastryStyles.croissantIconBox}>
                            <Text style={{ fontSize: 22 }}>🥐</Text>
                        </View>
                        <View style={pastryStyles.mainPastry}>
                            <Text style={{ fontSize: 46 }}>🥧</Text>
                        </View>
                        <View style={pastryStyles.smileyIconBox}>
                            <Text style={{ fontSize: 20 }}>🙂</Text>
                        </View>
                    </View>

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

                        {/* Social buttons */}
                        <View style={pastryStyles.socialRow}>
                            <TouchableOpacity style={pastryStyles.socialButton}>
                                <Ionicons name="logo-google" size={18} color="#7B5A4E" />
                                <Text style={pastryStyles.socialButtonText}>Google</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={pastryStyles.socialButton}>
                                <Ionicons name="logo-apple" size={20} color="#7B5A4E" />
                                <Text style={pastryStyles.socialButtonText}>Apple</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={pastryStyles.dividerRow}>
                            <View style={pastryStyles.dividerLine} />
                            <Text style={pastryStyles.dividerText}>or continue with email</Text>
                            <View style={pastryStyles.dividerLine} />
                        </View>

                        <View style={pastryStyles.frostingBlock}>
                            <Text style={pastryStyles.caramelLabel}>
                                EMAIL ADDRESS
                            </Text>

                            <View style={pastryStyles.inputWithIcon}>
                                <Ionicons name="mail-outline" size={18} color="#A28E73" style={pastryStyles.inputIcon} />
                                <TextInput
                                    placeholder="hello@confectioner.com"
                                    placeholderTextColor="#BDAF92"
                                    style={pastryStyles.butterInputShellWithIcon}
                                    value={email}
                                    onChangeText={setEmail}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    returnKeyType="next"
                                />
                            </View>
                        </View>

                        <View style={pastryStyles.truffleHeader}>
                            <Text style={pastryStyles.caramelLabel}>
                                PASSWORD
                            </Text>

                            <Text style={pastryStyles.vanillaAssistText}>
                                Forgot Password?
                            </Text>
                        </View>

                        <View style={pastryStyles.inputWithIcon}>
                            <Ionicons name="lock-closed-outline" size={18} color="#A28E73" style={pastryStyles.inputIcon} />
                            <TextInput
                                placeholder="••••••••"
                                placeholderTextColor="#A28E73"
                                secureTextEntry={!showPassword}
                                style={pastryStyles.butterInputShellWithIcon}
                                value={password}
                                onChangeText={setPassword}
                                returnKeyType="done"
                            />
                            <TouchableOpacity
                                onPress={() => setShowPassword(!showPassword)}
                                style={pastryStyles.eyeIconButton}
                            >
                                <Ionicons
                                    name={showPassword ? "eye-outline" : "eye-off-outline"}
                                    size={18}
                                    color="#A28E73"
                                />
                            </TouchableOpacity>
                        </View>

                        <View style={{ marginTop: 24 }}>
                            <Button onPress={()=>navigation.navigate("Onbordingpageone")} title="Sign in →" />
                        </View>

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
                </ScrollView>
            </KeyboardAvoidingView>

        </SafeAreaView>
    )
}

export default Loginpage

const pastryStyles = StyleSheet.create({
    velvetCanvas: {
        flex: 1,
        backgroundColor: "#F5EEDF",
    },

    illustrationWrap: {
        height: 150,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 4,
    },

    bgBlob: {
        position: "absolute",
        bottom: -20,
        width: 260,
        height: 110,
        borderRadius: 130,
        backgroundColor: "#EDE2C2",
    },

    mainPastry: {
        width: 110,
        height: 80,
        borderRadius: 55,
        backgroundColor: "#F4DEB0",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        borderColor: "#E3C98D",
    },

    croissantIconBox: {
        position: "absolute",
        left: 28,
        top: 18,
        width: 48,
        height: 48,
        borderRadius: 16,
        backgroundColor: "#FBF6E8",
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
    },

    smileyIconBox: {
        position: "absolute",
        right: 32,
        top: 8,
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: "#FBF6E8",
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
    },

    bakerySignature: {
        textAlign: "center",
        fontSize: 14,
        color: "#8B675A",
        fontWeight: "700",
        letterSpacing: 2,
        marginBottom: 14,
    },
    creamPanel: {
        width: "100%",
        backgroundColor: "#FAF6EE",
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        paddingHorizontal: 28,
        paddingTop: 28,
        paddingBottom: 30,
        flex: 1,
    },
    artisanHeading: {
        fontSize: 34,
        color: "#7B5A4E",
        fontWeight: "700",
        textAlign: "center",
    },
    cocoaSubtitle: {
        fontSize: 15,
        color: "#8E7A6B",
        marginTop: 8,
        lineHeight: 24,
        textAlign: "center",
    },

    socialRow: {
        flexDirection: "row",
        gap: 14,
        marginTop: 24,
    },

    socialButton: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        height: 52,
        borderRadius: 26,
        backgroundColor: "#EFE7D2",
        borderWidth: 1,
        borderColor: "#E3D8B9",
    },

    socialButtonText: {
        fontSize: 15,
        color: "#7B5A4E",
        fontWeight: "600",
    },

    dividerRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 24,
        gap: 10,
    },

    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: "#E3D8B9",
    },

    dividerText: {
        fontSize: 12,
        color: "#A4937D",
    },

    frostingBlock: {
        marginTop: 22,
    },

    caramelLabel: {
        fontSize: 13,
        color: "#8A7466",
        marginBottom: 6,
        fontWeight: "700",
        letterSpacing: 0.5,
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

    inputWithIcon: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        height: 56,
        backgroundColor: "#EFE7D2",
        borderRadius: 18,
        paddingHorizontal: 18,
    },

    inputIcon: {
        marginRight: 10,
    },

    butterInputShellWithIcon: {
        flex: 1,
        fontSize: 15,
        color: "#6D574D",
        height: "100%",
    },

    eyeIconButton: {
        padding: 4,
    },

    truffleHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 22,
        marginBottom: 8,
    },

    vanillaAssistText: {
        color: "#7E6559",
        fontSize: 13,
        fontWeight: "700",
    },

    sugarFooterRibbon: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 30,
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