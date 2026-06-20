import { SafeAreaView } from "react-native-safe-area-context"
import { View, TouchableOpacity, Text, StyleSheet, Image, TextInput, ActivityIndicator } from "react-native"
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Resetheader from "../components/Resetheader"
import { useState } from "react";

const Resetpage = ({ navigation }) => {
    const [getmail, setmail] = useState("")
    const [isFocused, setIsFocused] = useState(false)
    const [touched, setTouched] = useState(false)
    const [loading, setLoading] = useState(false)

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const isValidEmail = emailRegex.test(getmail.trim())

    const errorMessage = (() => {
        if (!touched) return ""
        if (!getmail.trim()) return "Please enter your email address."
        if (!isValidEmail) return "Please enter a valid email address."
        return ""
    })()

    const onclicksendlinkbutton = () => {
        setTouched(true)

        if (!getmail.trim() || !isValidEmail) return

        setLoading(true)

        // Simulate API call — replace with real backend request
        setTimeout(() => {
            console.log(getmail)
            setLoading(false)
            setmail("")
            setTouched(false)
            navigation.replace("Link")
        }, 1200)
    }

    return (
        <SafeAreaView style={styles.Resetpagecontainer} >

            <Resetheader />

            <View style={styles.imagecontainer} >
                <View style={styles.imagebox} >
                    <Image style={styles.image} source={require("../images/Background.png")} />
                </View>
            </View>

            <View style={styles.textpart} >
                <Text style={styles.headingtext} >
                    Forgot your password?
                </Text>
                <Text style={styles.subheading} >
                    Don't worry, it happens. Enter your email below and we'll send you a link to reset it.
                </Text>
            </View>

            <View style={styles.wrapper}>

                {/* Label */}
                <Text style={styles.labelText}>Email Address</Text>

                {/* Input */}
                <View
                    style={[
                        styles.inputCapsule,
                        isFocused && styles.inputCapsuleFocused,
                        errorMessage && styles.inputCapsuleError,
                    ]}
                >
                    <View style={styles.iconWell}>
                        <Feather name="mail" size={16} color="#8a7350" />
                    </View>
                    <TextInput
                        placeholder="hello@example.com"
                        placeholderTextColor="#B7AA88"
                        style={styles.inputField}
                        onChangeText={(text) => setmail(text)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        value={getmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                    {getmail.length > 0 && (
                        <TouchableOpacity
                            onPress={() => setmail("")}
                            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                        >
                            <Feather name="x-circle" size={16} color="#a99c7c" />
                        </TouchableOpacity>
                    )}
                </View>

                {/* Error Message */}
                {errorMessage ? (
                    <View style={styles.errorRow}>
                        <Feather name="alert-circle" size={13} color="#b94a3f" />
                        <Text style={styles.errorText}>{errorMessage}</Text>
                    </View>
                ) : null}

                {/* Button */}
                <TouchableOpacity
                    onPress={onclicksendlinkbutton}
                    style={[styles.primaryBtn, loading && styles.primaryBtnDisabled]}
                    disabled={loading}
                    activeOpacity={0.85}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <View style={styles.btnContent}>
                            <Text style={styles.btnText}>Send Reset Link</Text>
                            <Feather name="arrow-right" size={18} color="#fff" />
                        </View>
                    )}
                </TouchableOpacity>

                {/* Bottom Text */}
                <View style={styles.bottomRow}>
                    <Text style={styles.normalText}>Remember your password? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate("Login")} >
                        <Text style={styles.loginText}>Log in</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </SafeAreaView>
    )
}
export default Resetpage

const styles = StyleSheet.create({
    Resetpagecontainer: {
        flex: 1,
        backgroundColor: "#fff9e6",
        paddingHorizontal: 20
    },

    imagecontainer: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 40,
    },
    imagebox: {
        width: 160,
        height: 160,
        borderRadius: 40,
        backgroundColor: "#f6cfc266",
        justifyContent: "center",
        alignItems: "center",

        shadowColor: "#7b5a4b",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.18,
        shadowRadius: 14,
        elevation: 6,

        transform: [{ rotate: "-2deg" }]
    },
    image: {
        width: 110,
        height: 110,
        borderRadius: 25,
        resizeMode: "cover",
    },
    textpart: {
        width: "100%",
        gap: 15,
        marginTop: 30
    },
    headingtext: {
        fontSize: 36,
        color: "#363317",
        letterSpacing: 0.1,
        fontWeight: "800",
        textAlign: "center"
    },
    subheading: {
        color: "#646040",
        textAlign: "center",
        lineHeight: 20,
        paddingHorizontal: 6,
    },
    wrapper: {
        flex: 1,
        paddingHorizontal: 10,
        marginTop: 36
    },

    labelText: {
        fontSize: 13,
        color: "#8a7350",
        fontWeight: "700",
        marginBottom: 10,
        marginLeft: 5,
        letterSpacing: 0.4,
    },

    inputCapsule: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#DCD2A9",
        borderRadius: 22,
        paddingHorizontal: 6,
        height: 58,
        borderWidth: 1.5,
        borderColor: "transparent",
    },

    inputCapsuleFocused: {
        borderColor: "#a98a5f",
        backgroundColor: "#e7dfba",
    },

    inputCapsuleError: {
        borderColor: "#d98b80",
    },

    iconWell: {
        width: 40,
        height: 40,
        borderRadius: 13,
        backgroundColor: "#cdc093",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 6,
    },

    inputField: {
        flex: 1,
        marginHorizontal: 10,
        fontSize: 15,
        color: "#333",
    },

    errorRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
        marginLeft: 5,
        gap: 6,
    },

    errorText: {
        color: "#b94a3f",
        fontSize: 12,
        fontWeight: "500",
    },

    primaryBtn: {
        marginTop: 28,
        backgroundColor: "#7B5A4E",
        paddingVertical: 18,
        borderRadius: 22,
        alignItems: "center",
        justifyContent: "center",
        minHeight: 58,

        elevation: 6,
        shadowColor: "#7B5A4E",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
    },

    primaryBtnDisabled: {
        backgroundColor: "#a8957e",
        shadowOpacity: 0,
        elevation: 0,
    },

    btnContent: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },

    btnText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
        letterSpacing: 0.3,
    },

    bottomRow: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 36,
        gap: 6,
        alignItems: "center"
    },

    normalText: {
        color: "#6E6A5E",
        fontSize: 14,
        fontWeight: "500"
    },

    loginText: {
        color: "#75584e",
        fontSize: 16,
        fontWeight: "bold",
    },
})