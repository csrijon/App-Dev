import { SafeAreaView } from "react-native-safe-area-context"
import { ScrollView, View, Image, StyleSheet, TouchableOpacity, Text, TextInput, ActivityIndicator } from "react-native"
import Resetheader from "../components/Resetheader"
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import Button from "../components/Button";
import { useState, useRef, useEffect } from "react";

const RESEND_WAIT_SECONDS = 30

const ResetLinkpage = ({ navigation }) => {
    const [otp, setOtp] = useState(["", "", "", ""])
    const [loading, setLoading] = useState(false)
    const [touched, setTouched] = useState(false)
    const [resendTimer, setResendTimer] = useState(RESEND_WAIT_SECONDS)
    const [resending, setResending] = useState(false)

    const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)]

    const otpCode = otp.join("")
    const isOtpComplete = otp.every((digit) => digit.length === 1)

    const errorMessage = touched && !isOtpComplete ? "Please enter the complete 4-digit code." : ""

    // 🔹 Countdown for resend
    useEffect(() => {
        if (resendTimer <= 0) return
        const interval = setInterval(() => {
            setResendTimer((prev) => prev - 1)
        }, 1000)
        return () => clearInterval(interval)
    }, [resendTimer])

    const handleDigitChange = (text, index) => {
        // Only allow numeric input
        const cleanText = text.replace(/[^0-9]/g, "")

        const newOtp = [...otp]
        newOtp[index] = cleanText
        setOtp(newOtp)

        // Auto-focus next field
        if (cleanText && index < 3) {
            inputRefs[index + 1].current?.focus()
        }
    }

    const handleKeyPress = (e, index) => {
        // Move to previous field on backspace if current is empty
        if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs[index - 1].current?.focus()
        }
    }

    const handleVerify = () => {
        setTouched(true)

        if (!isOtpComplete) return

        setLoading(true)

        // Simulate API call — replace with real backend verification
        setTimeout(() => {
            console.log("Verifying OTP:", otpCode)
            setLoading(false)
            navigation.navigate("Setnewpass")
        }, 1200)
    }

    const handleResend = () => {
        if (resendTimer > 0) return

        setResending(true)
        setOtp(["", "", "", ""])
        setTouched(false)
        inputRefs[0].current?.focus()

        // Simulate resend API call
        setTimeout(() => {
            setResending(false)
            setResendTimer(RESEND_WAIT_SECONDS)
        }, 800)
    }

    return (
        <SafeAreaView style={styles.resetlinkcontainner} >
            <Resetheader />
            <ScrollView vertical contentContainerStyle={styles.scrollresetlinkpage} keyboardShouldPersistTaps="handled" >
                <View style={styles.outerShell}>
                    <View style={styles.softCard}>

                        <View style={styles.visualBox}>
                            <Image
                                source={require("../images/cakeimage.jpeg")}
                                style={styles.envelopeArt}
                            />
                        </View>

                        <View style={styles.floatingBtn}>
                            <AntDesign name="mail" size={18} color="#5c4033" />
                        </View>

                    </View>
                </View>

                {/* {reset link text section start} */}
                <View style={styles.canvasRoot}>
                    <View style={styles.textCluster}>

                        <Text style={styles.primaryHeadline}>
                            Verify Your Email
                        </Text>

                        <Text style={styles.secondaryNarration}>
                            We've sent a 4-digit verification code to your email. Please enter it below to reset your password.
                        </Text>

                    </View>
                </View>
                {/* {reset link text section end} */}

                {/* {otp section start} */}
                <View style={styles.stageWrap}>
                    <View style={styles.orbRow}>

                        {otp.map((digit, index) => (
                            <TextInput
                                key={index}
                                ref={inputRefs[index]}
                                style={[
                                    styles.digitOrb,
                                    digit && styles.digitOrbFilled,
                                    errorMessage && styles.digitOrbError,
                                ]}
                                maxLength={1}
                                keyboardType="numeric"
                                value={digit}
                                onChangeText={(text) => handleDigitChange(text, index)}
                                onKeyPress={(e) => handleKeyPress(e, index)}
                                selectTextOnFocus
                            />
                        ))}

                    </View>

                    {errorMessage ? (
                        <View style={styles.errorRow}>
                            <Feather name="alert-circle" size={13} color="#b94a3f" />
                            <Text style={styles.errorText}>{errorMessage}</Text>
                        </View>
                    ) : null}
                </View>
                {/* {otp section end} */}

                <TouchableOpacity
                    onPress={handleVerify}
                    style={[styles.verifyBtn, !isOtpComplete && touched && styles.verifyBtnDisabled]}
                    disabled={loading}
                    activeOpacity={0.85}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.verifyBtnText}>VERIFY OTP</Text>
                    )}
                </TouchableOpacity>

                <View style={styles.echoZone}>

                    <Text style={styles.softPrompt}>
                        Didn't receive the code?
                    </Text>

                    <TouchableOpacity onPress={handleResend} disabled={resendTimer > 0 || resending}>
                        {resending ? (
                            <ActivityIndicator size="small" color="#7a5c3e" />
                        ) : (
                            <Text style={[styles.actionPulse, resendTimer > 0 && styles.actionPulseDisabled]}>
                                {resendTimer > 0 ? `Resend code in ${resendTimer}s` : "Resend code"}
                            </Text>
                        )}
                    </TouchableOpacity>

                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

export default ResetLinkpage

const styles = StyleSheet.create({
    resetlinkcontainner: {
        flex: 1,
        backgroundColor: "#fff9e6",
    },
    scrollresetlinkpage: {
        paddingHorizontal: 30,
        paddingBottom: 30,
    },
    outerShell: {
        marginTop: 30,
        justifyContent: "center",
        alignItems: "center",
    },

    softCard: {
        width: 260,
        height: 260,
        backgroundColor: "#f4f1ea",
        borderRadius: 40,
        justifyContent: "center",
        alignItems: "center",

        elevation: 8,
        shadowColor: "#7b5a4b",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.18,
        shadowRadius: 14,
    },

    visualBox: {
        width: 200,
        height: 200,
        borderRadius: 30,
        overflow: "hidden",
        backgroundColor: "#ddd",
    },

    envelopeArt: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },

    floatingBtn: {
        position: "absolute",
        bottom: 20,
        right: 20,
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: "#f4f1ea",
        justifyContent: "center",
        alignItems: "center",
        elevation: 6,
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 6,
    },
    canvasRoot: {
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
        marginTop: 30
    },

    textCluster: {
        alignItems: "center",
        maxWidth: 320,
    },

    primaryHeadline: {
        fontSize: 26,
        fontWeight: "700",
        color: "#2f2a1f",
        marginBottom: 14,
        letterSpacing: 0.3,
    },

    secondaryNarration: {
        fontSize: 15,
        color: "#5a523f",
        textAlign: "center",
        lineHeight: 22,
        paddingHorizontal: 10,
    },
    stageWrap: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 30,
        marginBottom: 20
    },

    orbRow: {
        flexDirection: "row",
        gap: 18,
    },

    digitOrb: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: "#b9aa86",
        textAlign: "center",
        fontSize: 22,
        fontWeight: "700",
        color: "#333",
        backgroundColor: "#f3efe6",
    },

    digitOrbFilled: {
        borderColor: "#7b5a4b",
        backgroundColor: "#fff",
    },

    digitOrbError: {
        borderColor: "#d98b80",
    },

    errorRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 16,
        gap: 6,
    },

    errorText: {
        color: "#b94a3f",
        fontSize: 12,
        fontWeight: "500",
    },

    verifyBtn: {
        backgroundColor: "#7B5A4E",
        paddingVertical: 18,
        borderRadius: 22,
        alignItems: "center",
        justifyContent: "center",
        minHeight: 58,
        marginTop: 10,

        elevation: 6,
        shadowColor: "#7B5A4E",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
    },

    verifyBtnDisabled: {
        backgroundColor: "#a8957e",
        shadowOpacity: 0,
        elevation: 0,
    },

    verifyBtnText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
        letterSpacing: 0.5,
    },

    echoZone: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        marginBottom: 10,
    },

    softPrompt: {
        fontSize: 14,
        color: "#5a523f",
        marginBottom: 8,
    },

    actionPulse: {
        fontSize: 15,
        fontWeight: "600",
        color: "#7a5c3e",
    },

    actionPulseDisabled: {
        color: "#a99c7c",
    },
});