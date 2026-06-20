import { SafeAreaView } from "react-native-safe-area-context"
import { useState } from "react";
import { View, StyleSheet, ScrollView, Text, StatusBar, Image, TextInput, TouchableOpacity, ActivityIndicator } from "react-native"
import Ionicons from 'react-native-vector-icons/Ionicons';
import Button from "../components/Button";
import Socialmediabutton from "../components/Socialmediabutton"
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

const Signupscreen = ({ navigation }) => {

    const [checkbox, setcheckbox] = useState(false)
    const [fullname, setfullname] = useState("")
    const [fullemail, setfullemail] = useState("")
    const [password, setpassword] = useState("")
    const [confirmpassword, setconfirmpassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [focusedField, setFocusedField] = useState(null)
    const [touched, setTouched] = useState(false)
    const [loading, setLoading] = useState(false)

    const isNameValid = fullname.trim().length >= 3
    const isMobileValid = /^[6-9]\d{9}$/.test(fullemail)
    const hasMinLength = password.length >= 8
    const hasNumber = /\d/.test(password)
    const isPasswordValid = hasMinLength && hasNumber
    const passwordsMatch = password.length > 0 && password === confirmpassword

    const errorMessage = (() => {
        if (!touched) return ""
        if (!fullname || !fullemail || !password || !confirmpassword) return "Please fill in all fields."
        if (!isNameValid) return "Full name must be at least 3 characters."
        if (!isMobileValid) return "Please enter a valid 10-digit mobile number."
        if (!hasMinLength) return "Password must be at least 8 characters."
        if (!hasNumber) return "Password must include at least 1 number."
        if (!passwordsMatch) return "Passwords do not match."
        if (!checkbox) return "Please agree to the Terms of Service and Privacy Policy."
        return ""
    })()

    const isFormValid = isNameValid && isMobileValid && isPasswordValid && passwordsMatch && checkbox

    const onclickcreateaccount = () => {
        setTouched(true)

        if (!isFormValid) {
            console.log("some statement is false")
            return
        }

        setLoading(true)

        // Simulate API call — replace with real backend signup
        setTimeout(() => {
            console.log("all statement is true")
            setLoading(false)
            navigation.navigate("Login")
        }, 1200)
    }

    return (
        <SafeAreaView style={styles.signupsafearea}>
            <StatusBar backgroundColor="#FFF9E6" barStyle="dark-content" />
            <ScrollView contentContainerStyle={{ paddingBottom: 40 }} vertical showsVerticalScrollIndicator={false} style={styles.scrollview} keyboardShouldPersistTaps="handled" >
                <View style={styles.signupview} >
                    {/*signup top start*/}
                    <View style={styles.signuptop} >
                        <Image source={require("../images/secendbackgroud.png")} />
                        <Text style={styles.cakehaventext} >Cake Haven</Text>
                    </View>
                    {/*signup top end*/}
                    {/*signup form start*/}
                    <View style={styles.signupform} >

                        <View style={styles.welcomeBanner}>
                            <View style={styles.welcomeIconContainer}>
                                <Text style={styles.welcomeIcon}>🍰</Text>
                            </View>

                            <View style={styles.welcomeContent}>
                                <Text style={styles.welcomeTitle}>
                                    Welcome to Cake Haven
                                </Text>

                                <Text style={styles.welcomeDescription}>
                                    Create your account and enjoy exclusive desserts, special offers and delightful experiences.
                                </Text>
                            </View>
                        </View>


                        <View style={styles.signupformtop} >
                            <Text style={styles.signupformtopText} >Create Account</Text>
                            <Text style={styles.signupformtopDescription} >Join our community of dessert lovers today.</Text>
                        </View>

                        {/* {Full name input start} */}
                        <View style={styles.signupforminput} >
                            <Text style={styles.labelText}>FULL NAME</Text>
                            <View style={[styles.inputcontainer, focusedField === "name" && styles.inputFocused]} >
                                <Ionicons style={styles.iconcolor} name="person" color="#A67C52" size={22} />
                                <TextInput
                                    onChangeText={setfullname}
                                    value={fullname}
                                    onFocus={() => setFocusedField("name")}
                                    onBlur={() => setFocusedField(null)}
                                    keyboardType="default"
                                    placeholderTextColor="#b8a888"
                                    style={styles.textinput}
                                    placeholder="Enter Your Full Name"
                                />
                            </View>
                        </View>
                        {/* {Full name input end} */}

                        {/* {Mobile input start} */}
                        <View style={styles.signupforminput} >
                            <Text style={styles.labelText}>MOBILE NUMBER</Text>
                            <View style={[styles.inputcontainer, focusedField === "mobile" && styles.inputFocused]} >
                                <FontAwesome style={styles.iconcolor} name="mobile-phone" color="#A67C52" size={22} />
                                <TextInput
                                    onChangeText={(text) => setfullemail(text.replace(/[^0-9]/g, ""))}
                                    value={fullemail}
                                    onFocus={() => setFocusedField("mobile")}
                                    onBlur={() => setFocusedField(null)}
                                    maxLength={10}
                                    keyboardType="numeric"
                                    placeholderTextColor="#b8a888"
                                    style={styles.textinput}
                                    placeholder="Enter Your Mobile Number"
                                />
                            </View>
                        </View>
                        {/* {Mobile input end} */}

                        {/* {Password input start} */}
                        <View style={styles.signupforminput} >
                            <Text style={styles.labelText}>PASSWORD</Text>
                            <View style={[styles.inputcontainer, focusedField === "password" && styles.inputFocused]} >
                                <Ionicons style={styles.iconcolor} name="lock-closed-outline" color="#A67C52" size={22} />
                                <TextInput
                                    value={password}
                                    onChangeText={setpassword}
                                    onFocus={() => setFocusedField("password")}
                                    onBlur={() => setFocusedField(null)}
                                    keyboardType="default"
                                    placeholderTextColor="#b8a888"
                                    style={styles.textinput}
                                    placeholder="Enter Your Password"
                                    secureTextEntry={!showPassword}
                                    autoCapitalize="none"
                                />
                                <TouchableOpacity
                                    onPress={() => setShowPassword((prev) => !prev)}
                                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                                >
                                    <Feather name={showPassword ? "eye-off" : "eye"} size={19} color="#A67C52" />
                                </TouchableOpacity>
                            </View>
                        </View>
                        {/* {Password input end} */}

                        {/* {Confirm Password input start} */}
                        <View style={styles.signupforminput} >
                            <Text style={styles.labelText}>CONFIRM PASSWORD</Text>
                            <View style={[styles.inputcontainer, focusedField === "confirm" && styles.inputFocused]} >
                                <Ionicons name="checkmark-circle-outline" color="#A67C52" size={22} />
                                <TextInput
                                    value={confirmpassword}
                                    onChangeText={setconfirmpassword}
                                    onFocus={() => setFocusedField("confirm")}
                                    onBlur={() => setFocusedField(null)}
                                    keyboardType="default"
                                    placeholderTextColor="#b8a888"
                                    style={styles.textinput}
                                    placeholder="Confirm Your Password"
                                    secureTextEntry={!showConfirmPassword}
                                    autoCapitalize="none"
                                />
                                <TouchableOpacity
                                    onPress={() => setShowConfirmPassword((prev) => !prev)}
                                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                                >
                                    <Feather name={showConfirmPassword ? "eye-off" : "eye"} size={19} color="#A67C52" />
                                </TouchableOpacity>
                            </View>
                        </View>
                        {/* {Confirm Password input end} */}

                        {/* terms and condition start */}
                        <View style={styles.termsandcondition} >
                            <TouchableOpacity onPress={() => setcheckbox(!checkbox)} >
                                <Fontisto name={checkbox ? "checkbox-active" : "checkbox-passive"} color="#A67C52" size={22} />
                            </TouchableOpacity>
                            <Text style={styles.termsandconditionText} >I agree to the Terms of Service and
                                {"\n"} Privacy Policy.</Text>
                        </View>
                        {/* terms and condition end */}

                        {/* Error Message */}
                        {errorMessage ? (
                            <View style={styles.errorRow}>
                                <Feather name="alert-circle" size={13} color="#b94a3f" />
                                <Text style={styles.errorText}>{errorMessage}</Text>
                            </View>
                        ) : null}

                        {/* {Button start} */}
                        <View style={styles.signupbutton} >
                            {loading ? (
                                <View style={styles.loadingBtn}>
                                    <ActivityIndicator color="#fff" />
                                </View>
                            ) : (
                                <Button onPress={onclickcreateaccount} title="Create Account" />
                            )}
                        </View>
                        {/* {Button end} */}

                        <View style={styles.dividerRow}>
                            <View style={styles.dividerLine} />
                            <Text style={styles.quickaccesstext} >QUICK ACCESS</Text>
                            <View style={styles.dividerLine} />
                        </View>

                        {/* {social media button start} */}
                        <View style={styles.socialmediabuttons} >
                            <Socialmediabutton />
                        </View>
                        {/* {social media button end} */}

                        {/* {last element start} */}
                        <View style={styles.lastelement} >
                            <Text style={styles.lastelementText} >Already have an account?</Text>
                            <TouchableOpacity onPress={() => navigation.navigate("Login")} >
                                <Text style={styles.loginelementText} >Log in here</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                    {/*signup form end*/}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
export default Signupscreen

const styles = StyleSheet.create({
    signupsafearea: {
        flex: 1,
        backgroundColor: "#FFF9E6",
        paddingHorizontal: 20,
    },
    scrollview: {
        flex: 1,
        height: "100%",
        backgroundColor: "#ffffff",
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40
    },
    signupview: {
        flex: 1,
        paddingHorizontal: 30,
        paddingVertical: 30,
    },
    signuptop: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        marginBottom: 15
    },
    cakehaventext: {
        fontSize: 24,
        fontWeight: "700",
        color: "#4B3425",
    },
    signupform: {
        flex: 1,
        flexDirection: "column",
        marginTop: 30,
    },
    signupformtop: {
        gap: 10,
        marginBottom: 30,
    },
    signupformtopText: {
        fontSize: 32,
        fontWeight: "800",
        color: "#2C1810",
    },
    signupformtopDescription: {
        fontSize: 15,
        color: "#8B7D6B",
        lineHeight: 22,
    },
    signupforminput: {
        gap: 8,
        marginBottom: 18,
    },
    labelText: {
        fontSize: 11.5,
        fontWeight: "700",
        color: "#8a7350",
        letterSpacing: 0.5,
        paddingLeft: 4,
    },
    inputcontainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFDF8",

        borderWidth: 1.5,
        borderColor: "#E9E2D8",

        paddingHorizontal: 18,
        paddingVertical: 14,

        borderRadius: 18,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 8,

        elevation: 2,
        gap: 10,
    },
    inputFocused: {
        borderColor: "#A67C52",
        backgroundColor: "#fdfaf2",
    },
    iconcolor: {
        color: "#A67C52",
    },
    termsandcondition: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        marginTop: 5,
        marginBottom: 10,
    },
    termsandconditionText: {
        lineHeight: 22,
        color: "#7A6A58",
        flex: 1
    },
    errorRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 14,
        marginLeft: 4,
        gap: 6,
    },
    errorText: {
        color: "#b94a3f",
        fontSize: 12,
        fontWeight: "500",
        flex: 1,
    },
    signupbutton: {
        marginVertical: 10,
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
        marginBottom: 20,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: "#E9E2D8",
    },
    quickaccesstext: {
        textAlign: "center",
        color: "#B6A18B",
        letterSpacing: 3,
        fontWeight: "600",
        fontSize: 12,
    },
    socialmediabuttons: {
        marginBottom: 20,
    },
    lastelement: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
    },
    lastelementText: {
        fontSize: 15,
        color: "#777",
    },
    loginelementText: {
        color: "#8B5E3C",
        fontWeight: "700",
        fontSize: 15,
    },
    textinput: {
        flex: 1,
        color: "#2C1810",
        fontSize: 15,
        marginLeft: 4,
    },
    welcomeBanner: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFF3E6",
        borderRadius: 24,
        padding: 18,
        marginBottom: 25,
        borderWidth: 1,
        borderColor: "#F4D7BF",
    },

    welcomeIconContainer: {
        width: 55,
        height: 55,
        borderRadius: 27.5,
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 15,
    },

    welcomeIcon: {
        fontSize: 26,
    },

    welcomeContent: {
        flex: 1,
    },

    welcomeTitle: {
        fontSize: 17,
        fontWeight: "700",
        color: "#5A3E2B",
        marginBottom: 4,
    },

    welcomeDescription: {
        fontSize: 13,
        lineHeight: 20,
        color: "#8B7D6B",
    },

})