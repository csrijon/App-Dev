import { SafeAreaView } from "react-native-safe-area-context"
import { StatusBar, View, Image, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native"
import Octicons from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';
import Button from "../components/Button";
import Socialmediabutton from "../components/Socialmediabutton"
import { useState, useEffect } from "react";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Loginscreen = ({ navigation }) => {

    const [loginemail, setloginemail] = useState("")
    const [loginpassword, setloginpassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [focusedField, setFocusedField] = useState(null) // "mobile" | "password" | null
    const [touched, setTouched] = useState(false)
    const [loading, setLoading] = useState(false)

    const isMobileValid = /^[6-9]\d{9}$/.test(loginemail)
    const isPasswordValid = loginpassword.length >= 6

    const errorMessage = (() => {
        if (!touched) return ""
        if (!loginemail || !loginpassword) return "Please fill in all fields."
        if (!isMobileValid) return "Please enter a valid 10-digit mobile number."
        if (!isPasswordValid) return "Password must be at least 6 characters."
        return ""
    })()

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: "282609993383-90d25avkr9g7sd220unv2v5g7cur1u12.apps.googleusercontent.com"
        })
    }, [])

    const onclickgooglelogin = async () => {
        try {
            const userinfo = await GoogleSignin.signIn()
            console.log(userinfo, "user:")

            const idToken = userinfo.data.idToken
            console.log(idToken)
            let response = await fetch("http://10.0.2.2:5000/googleAuth", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ idToken: idToken })
            })
            let resdata = await response.json()
            console.log(resdata)
        } catch (error) {
            console.log(error)
        }
    }

const onclickloginbutton = async () => {
    setTouched(true);

    if (!loginemail || !loginpassword || !isMobileValid || !isPasswordValid) {
        return;
    }

    try {
        setLoading(true);

        const response = await fetch("http://192.168.1.5:3000/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                mobile: loginemail,
                password: loginpassword,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message);
        }

        console.log(data);

        navigation.replace("Tabs");

    } catch (error) {
        console.log(error.message);
    } finally {
        setLoading(false);
    }
};

    return (
        <SafeAreaView style={styles.loginsafearea} >
            <StatusBar backgroundColor="#FFF9E6" barStyle={"dark-content"} />
            <View style={styles.loginconatiner} >
                <View style={styles.loginbox} >
                    <View style={styles.img}>
                        <View style={styles.imgRing}>
                            <Image
                                style={styles.logoImage}
                                source={require("../images/Background.png")}
                            />
                        </View>
                    </View>

                    {/* {top text start} */}
                    <View style={styles.welcomecake} >
                        <Text style={styles.welcomeboldtext} >Cake Haven</Text>
                        <Text style={styles.welcomenormaltext} >Welcome back to the bakery</Text>
                    </View>
                    {/* {top text end} */}

                    {/* {mailinput start} */}
                    <View style={styles.mailinput} >
                        <Text style={styles.mailinputtext} >MOBILE NUMBER</Text>
                        <View style={[
                            styles.mailtextinput,
                            focusedField === "mobile" && styles.inputFocused,
                        ]} >
                            <View style={styles.iconWell}>
                                <FontAwesome name="mobile-phone" color="#8a7350" size={20} />
                            </View>
                            <TextInput
                                keyboardType="numeric"
                                value={loginemail}
                                onChangeText={(text) => setloginemail(text.replace(/[^0-9]/g, ""))}
                                onFocus={() => setFocusedField("mobile")}
                                onBlur={() => setFocusedField(null)}
                                placeholder="7029046473"
                                placeholderTextColor="#b8a888"
                                maxLength={10}
                                style={styles.inputField}
                            />
                        </View>
                    </View>
                    {/* {mail input end} */}

                    <View style={styles.passwordsection} >
                        <View style={styles.passwordforget} >
                            <Text style={styles.mailinputtext}>PASSWORD</Text>
                            <TouchableOpacity onPress={() => navigation.navigate("Reset")} >
                                <Text style={styles.signupText} >FORGOT?</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[
                            styles.passwordinput,
                            focusedField === "password" && styles.inputFocused,
                        ]} >
                            <View style={styles.iconWell}>
                                <Octicons name="lock" color="#8a7350" size={20} />
                            </View>
                            <TextInput
                                onChangeText={(text) => setloginpassword(text)}
                                value={loginpassword}
                                onFocus={() => setFocusedField("password")}
                                onBlur={() => setFocusedField(null)}
                                secureTextEntry={!showPassword}
                                placeholder="Enter your password"
                                placeholderTextColor="#b8a888"
                                style={styles.inputField}
                            />
                            <TouchableOpacity
                                onPress={() => setShowPassword((prev) => !prev)}
                                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                            >
                                <Feather name={showPassword ? "eye-off" : "eye"} size={19} color="#8a7350" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Error Message */}
                    {errorMessage ? (
                        <View style={styles.errorRow}>
                            <Feather name="alert-circle" size={13} color="#b94a3f" />
                            <Text style={styles.errorText}>{errorMessage}</Text>
                        </View>
                    ) : null}

                    {/* {button start} */}
                    <View style={styles.loginbutton} >
                        {loading ? (
                            <View style={styles.loadingBtn}>
                                <ActivityIndicator color="#fff" />
                            </View>
                        ) : (
                            <Button onPress={onclickloginbutton} title="Login to Haven" />
                        )}
                    </View>
                    {/* {Button end} */}

                    <View style={styles.dividerRow}>
                        <View style={styles.dividerLine} />
                        <Text style={styles.orcontinue}>OR CONTINUE WITH</Text>
                        <View style={styles.dividerLine} />
                    </View>

                    {/* {social media button start} */}
                    <Socialmediabutton onPress={onclickgooglelogin} />
                    {/* {social media button end} */}

                    {/* {last element start} */}
                    <View style={styles.lastelement} >
                        <Text style={styles.normalSmallText}>New to the gallery?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                            <Text style={styles.signupText} >Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                    {/* {last element end} */}
                </View>
            </View>
        </SafeAreaView>
    )
}
export default Loginscreen

const styles = StyleSheet.create({
    loginsafearea: {
        flex: 1,
        backgroundColor: "#FFF9E6",
        paddingHorizontal: 20,
        paddingVertical: 20,
    },

    loginconatiner: {
        flex: 1,
        justifyContent: "center",
    },

    loginbox: {
        justifyContent: "flex-start",
        paddingHorizontal: 28,
        paddingVertical: 28,
        gap: 18,
        borderRadius: 36,
        backgroundColor: "#FFFFFF",

        shadowColor: "#7b5a4b",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.1,
        shadowRadius: 18,
        elevation: 6,
    },

    img: {
        alignItems: "center"
    },

    imgRing: {
        width: 96,
        height: 96,
        borderRadius: 28,
        backgroundColor: "#f4ecd8",
        alignItems: "center",
        justifyContent: "center",
    },

    logoImage: {
        width: 70,
        height: 70,
        borderRadius: 18,
    },

    welcomecake: {
        alignItems: "center",
        gap: 6
    },

    welcomeboldtext: {
        letterSpacing: -0.3,
        color: "#75584E",
        fontSize: 24,
        fontWeight: "800"
    },

    welcomenormaltext: {
        fontSize: 14.5,
        color: "#8a7350"
    },

    mailinput: {
        marginTop: 8,
        gap: 8
    },

    mailinputtext: {
        paddingLeft: 6,
        fontSize: 11.5,
        fontWeight: "700",
        color: "#8a7350",
        letterSpacing: 0.5,
    },

    mailtextinput: {
        flexDirection: "row",
        alignItems: "center",

        backgroundColor: "#FFFDF8",

        borderWidth: 1.5,
        borderColor: "#E9E2D8",

        paddingHorizontal: 8,
        height: 58,

        borderRadius: 18,
        gap: 6,
    },

    inputFocused: {
        borderColor: "#a98a5f",
        backgroundColor: "#fdfaf2",
    },

    iconWell: {
        width: 38,
        height: 38,
        borderRadius: 12,
        backgroundColor: "#f0e9d4",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 4,
    },

    inputField: {
        flex: 1,
        fontSize: 15,
        color: "#2f2a1f",
        marginHorizontal: 8,
    },

    passwordsection: {
        gap: 8
    },

    passwordforget: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 6
    },

    passwordinput: {
        flexDirection: "row",
        alignItems: "center",

        backgroundColor: "#FFFDF8",

        borderWidth: 1.5,
        borderColor: "#E9E2D8",

        paddingHorizontal: 8,
        height: 58,

        borderRadius: 18,
        gap: 6,
    },

    errorRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: -6,
        marginLeft: 6,
        gap: 6,
    },

    errorText: {
        color: "#b94a3f",
        fontSize: 12,
        fontWeight: "500",
    },

    loginbutton: {
        marginTop: 6
    },

    loadingBtn: {
        backgroundColor: "#7b5a4b",
        paddingVertical: 17,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        minHeight: 54,
    },

    dividerRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        marginTop: 6,
    },

    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: "#E9E2D8",
    },

    orcontinue: {
        textAlign: "center",
        color: "#a99c7c",
        fontSize: 11.5,
        fontWeight: "700",
        letterSpacing: 0.5,
    },

    lastelement: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 5,
        marginTop: 4
    },

    normalSmallText: {
        color: "#6b5b3e",
        fontSize: 14,
    },

    signupText: {
        color: "#75584E",
        fontWeight: "bold"
    }
})