import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    StatusBar,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import Fontisto from "react-native-vector-icons/Fontisto";
import Svg, { Ellipse, Path, Circle, Rect, Line, G } from "react-native-svg";
import LinearGradient from "react-native-linear-gradient";

const DecoIllustration = () => (
    <Svg viewBox="0 0 390 150" width="100%" height={150}>
        <Ellipse cx="80" cy="150" rx="120" ry="80" fill="#E7DDB4" fillOpacity="0.6" />
        <Ellipse cx="320" cy="140" rx="100" ry="70" fill="#E7DDB4" fillOpacity="0.5" />
        <Ellipse cx="195" cy="135" rx="160" ry="60" fill="#DDD1A3" fillOpacity="0.4" />
        {/* Croissant */}
        <G transform="translate(130, 20)">
            <Ellipse cx="65" cy="60" rx="62" ry="38" fill="#E7DDB4" stroke="#C8B890" strokeWidth="1.5" />
            <Path d="M15 55 Q30 30 65 28 Q100 30 115 55" fill="#D4C48A" stroke="#C8B890" strokeWidth="1.2" />
            <Path d="M20 50 Q35 25 65 23 Q95 25 110 50" fill="#C8B67E" stroke="#B8A06A" strokeWidth="1" />
            <Ellipse cx="65" cy="52" rx="58" ry="32" fill="none" stroke="#C8B890" strokeWidth="1" strokeDasharray="4,3" fillOpacity="0.6" />
            <Ellipse cx="65" cy="58" rx="55" ry="28" fill="#EDE4CC" fillOpacity="0.5" />
            <Circle cx="40" cy="55" r="5" fill="#A0785C" fillOpacity="0.7" />
            <Circle cx="65" cy="50" r="5" fill="#A0785C" fillOpacity="0.7" />
            <Circle cx="88" cy="56" r="5" fill="#A0785C" fillOpacity="0.7" />
            <Circle cx="52" cy="63" r="4" fill="#8B6B52" fillOpacity="0.5" />
            <Circle cx="76" cy="60" r="4" fill="#8B6B52" fillOpacity="0.5" />
        </G>
        {/* Macaron */}
        <G transform="translate(262, 10)" fillOpacity="0.85">
            <Circle cx="22" cy="22" r="20" fill="#E7DDB4" stroke="#C8B890" strokeWidth="1.5" />
            <Path d="M8 22 Q14 10 22 10 Q30 10 36 22" fill="#D4C48A" />
            <Circle cx="16" cy="20" r="3" fill="#A0785C" fillOpacity="0.7" />
            <Circle cx="22" cy="16" r="3" fill="#A0785C" fillOpacity="0.7" />
            <Circle cx="29" cy="20" r="3" fill="#A0785C" fillOpacity="0.7" />
            <Path d="M16 28 Q22 32 28 28" stroke="#C8B890" strokeWidth="1.5" fill="none" />
        </G>
        {/* Cake slice */}
        <G transform="translate(22, 14)" fillOpacity="0.75">
            <Rect x="0" y="18" width="56" height="36" rx="6" fill="#E7DDB4" stroke="#C8B890" strokeWidth="1.5" />
            <Rect x="4" y="10" width="48" height="14" rx="4" fill="#D4C48A" stroke="#C8B890" strokeWidth="1" />
            <Line x1="0" y1="28" x2="56" y2="28" stroke="#C8B890" strokeWidth="1" strokeOpacity="0.5" />
            <Rect x="8" y="32" width="12" height="8" rx="2" fill="#C8B67E" fillOpacity="0.6" />
            <Rect x="24" y="32" width="12" height="8" rx="2" fill="#C8B67E" fillOpacity="0.6" />
            <Rect x="38" y="32" width="8" height="8" rx="2" fill="#C8B67E" fillOpacity="0.6" />
        </G>
    </Svg>
);

const SocialButton = ({ iconName, label, onPress }) => (
    <TouchableOpacity onPress={onPress} style={styles.socialBtn}>
        <Ionicons name={iconName} size={20} color="#6E564B" />
        <Text style={styles.socialBtnText}>{label}</Text>
    </TouchableOpacity>
);

const InputField = ({ label, placeholder, icon, secureEntry, toggleSecure, showToggle }) => (
    <View style={styles.fieldWrapper}>
        <Text style={styles.fieldLabel}>{label}</Text>
        <View style={styles.inputShell}>
            <Ionicons name={icon} size={18} color="#B8AF8F" />
            <TextInput
                placeholder={placeholder}
                placeholderTextColor="#B8AF8F"
                secureTextEntry={secureEntry}
                style={styles.inputText}
            />
            {showToggle && (
                <TouchableOpacity onPress={toggleSecure}>
                    <Ionicons name={secureEntry ? "eye-off" : "eye"} size={20} color="#7B5A4E" />
                </TouchableOpacity>
            )}
        </View>
    </View>
);

const Signuppage = ({ navigation }) => {
    const [eyeActive, setEyeActive] = useState(false);
    const [check, setCheck] = useState(false);

    return (
        <SafeAreaView style={styles.canvas}>
            <StatusBar backgroundColor="#F4EEDF" barStyle="dark-content" />
            <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
                <DecoIllustration />

                <Text style={styles.brandText}>GLAZE & GRAIN</Text>

                <View style={styles.content}>
                    <Text style={styles.heading}>Create Account</Text>
                    <Text style={styles.subText}>
                        Begin your journey into artisanal pâtisserie.
                    </Text>

                    {/* Social Buttons */}
                    <View style={styles.socialRow}>
                        <SocialButton iconName="logo-google" label="Google" />
                        <SocialButton iconName="logo-apple" label="Apple" />
                    </View>

                    {/* Divider */}
                    <View style={styles.divider}>
                        <View style={styles.dividerLine} />
                        <Text style={styles.dividerText}>or continue with email</Text>
                        <View style={styles.dividerLine} />
                    </View>

                    <InputField
                        label="FULL NAME"
                        placeholder="Enter your full name"
                        icon="person-outline"
                    />
                    <InputField
                        label="EMAIL ADDRESS"
                        placeholder="hello@patisserie.com"
                        icon="mail-outline"
                    />
                    <InputField
                        label="PASSWORD"
                        placeholder="Minimum 8 characters"
                        icon="lock-closed-outline"
                        secureEntry={eyeActive}
                        toggleSecure={() => setEyeActive(!eyeActive)}
                        showToggle
                    />

                    {/* Terms */}
                    <View style={styles.policyRow}>
                        <TouchableOpacity
                            onPress={() => setCheck(!check)}
                            style={[styles.checkBox, check && styles.checkBoxActive]}
                        >
                            {check && <Ionicons name="checkmark" size={14} color="#F9EDD7" />}
                        </TouchableOpacity>
                        <Text style={styles.policyText}>
                            I agree to the{" "}
                            <Text style={styles.boldPolicy}>Terms of Service</Text>
                            {" "}and{" "}
                            <Text style={styles.boldPolicy}>Privacy Policy</Text>
                        </Text>
                    </View>

                    {/* CTA Button */}
                    <LinearGradient
                        colors={["#8B6355", "#6D4C41"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.ctaGradient}
                    >
                        <TouchableOpacity style={styles.ctaInner}>
                            <Text style={styles.ctaText}>Create Account  ✦</Text>
                        </TouchableOpacity>
                    </LinearGradient>

                    {/* Login link */}
                    <View style={styles.bottomRow}>
                        <Text style={styles.bottomText}>Already have an account?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                            <Text style={styles.loginText}> Log In</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Signuppage;

const styles = StyleSheet.create({
    canvas: {
        flex: 1,
        backgroundColor: "#F4EEDF",
    },
    brandText: {
        textAlign: "center",
        color: "#7A5A4D",
        fontSize: 13,
        fontWeight: "700",
        letterSpacing: 2,
        marginTop: -8,
    },
    content: {
        paddingHorizontal: 26,
        marginTop: 10,
        paddingBottom: 30,
    },
    heading: {
        color: "#7B5A4E",
        fontSize: 34,
        fontWeight: "700",
        textAlign: "center",
        lineHeight: 42,
    },
    subText: {
        color: "#8A7466",
        fontSize: 15,
        marginTop: 8,
        lineHeight: 24,
        textAlign: "center",
    },
    socialRow: {
        flexDirection: "row",
        gap: 12,
        marginTop: 20,
    },
    socialBtn: {
        flex: 1,
        height: 50,
        backgroundColor: "#EDE4CC",
        borderRadius: 14,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
    },
    socialBtnText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#6E564B",
    },
    divider: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        marginVertical: 18,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: "#D4C9A8",
    },
    dividerText: {
        color: "#A89880",
        fontSize: 13,
    },
    fieldWrapper: {
        marginTop: 13,
    },
    fieldLabel: {
        color: "#6F574C",
        fontSize: 11,
        fontWeight: "700",
        letterSpacing: 0.8,
        marginBottom: 8,
    },
    inputShell: {
        width: "100%",
        height: 54,
        backgroundColor: "#EDE4CC",
        borderRadius: 14,
        paddingHorizontal: 18,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    inputText: {
        flex: 1,
        fontSize: 15,
        color: "#6E564B",
    },
    policyRow: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginTop: 18,
        gap: 10,
    },
    checkBox: {
        width: 22,
        height: 22,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: "#7B5A4E",
        marginTop: 2,
        alignItems: "center",
        justifyContent: "center",
    },
    checkBoxActive: {
        backgroundColor: "#7B5A4E",
        borderColor: "#7B5A4E",
    },
    policyText: {
        flex: 1,
        color: "#7F6B5F",
        fontSize: 14,
        lineHeight: 22,
    },
    boldPolicy: {
        color: "#6D5248",
        fontWeight: "700",
    },
    ctaGradient: {
        borderRadius: 16,
        marginTop: 20,
    },
    ctaInner: {
        height: 56,
        alignItems: "center",
        justifyContent: "center",
    },
    ctaText: {
        color: "#F9EDD7",
        fontSize: 16,
        fontWeight: "700",
        letterSpacing: 0.4,
    },
    bottomRow: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 16,
    },
    bottomText: {
        color: "#7F6B5F",
        fontSize: 15,
    },
    loginText: {
        color: "#6B5046",
        fontSize: 15,
        fontWeight: "700",
    },
});