import { SafeAreaView } from "react-native-safe-area-context"
import { ScrollView, View, Image, StyleSheet, TouchableOpacity, Text, TextInput } from "react-native"
import Resetheader from "../components/Resetheader"
import AntDesign from "react-native-vector-icons/AntDesign";
import Button from "../components/Button";

const ResetLinkpage = ({navigation}) => {
    return (
        <SafeAreaView style={styles.resetlinkcontainner} >
            <Resetheader />
            <ScrollView vertical contentContainerStyle={styles.scrollresetlinkpage} >
                <View style={styles.outerShell}>
                    <View style={styles.softCard}>

                        <View style={styles.visualBox}>
                            <Image
                                source={{ uri: "https://i.imgur.com/8Km9tLL.jpg" }} // replace with your image
                                style={styles.envelopeArt}
                            />
                        </View>

                        <TouchableOpacity style={styles.floatingBtn}>
                            <AntDesign name="mail" size={18} color="#5c4033" />
                        </TouchableOpacity>

                    </View>
                </View>
                {/* {reset link text secctionnn start} */}
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

                        <TextInput style={styles.digitOrb} maxLength={1} keyboardType="numeric" />
                        <TextInput style={styles.digitOrb} maxLength={1} keyboardType="numeric" />
                        <TextInput style={styles.digitOrb} maxLength={1} keyboardType="numeric" />
                        <TextInput style={styles.digitOrb} maxLength={1} keyboardType="numeric" />

                    </View>
                </View>
                {/* {otp section end} */}
                <Button onPress={()=>navigation.navigate("Setnewpass")} title={"VERIFY OTP"} />

                <View style={styles.echoZone}>

                    <Text style={styles.softPrompt}>
                        Didn't receive the code?
                    </Text>

                    <TouchableOpacity>
                        <Text style={styles.actionPulse}>
                            Resend code
                        </Text>
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
    },
    scrollresetlinkpage: {
        paddingHorizontal: 30
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
        shadowRadius: 10,
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
        flex: 1,
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
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 30,
        marginBottom: 30
    },

    orbRow: {
        flexDirection: "row",
        gap: 18, // modern RN supports gap
    },

    digitOrb: {
        width: 60,
        height: 60,
        borderRadius: 30, // perfect circle
        borderWidth: 2,
        borderColor: "#b9aa86",
        textAlign: "center",
        fontSize: 22,
        color: "#333",
        backgroundColor: "#f3efe6",
    }, echoZone: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 15,
    },

    softPrompt: {
        fontSize: 14,
        color: "#5a523f",
        marginBottom: 6,
    },

    actionPulse: {
        fontSize: 15,
        fontWeight: "600",
        color: "#7a5c3e",
    },
});