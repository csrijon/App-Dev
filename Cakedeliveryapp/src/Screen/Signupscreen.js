import { SafeAreaView } from "react-native-safe-area-context"
import { useState } from "react";
import { View, StyleSheet, ScrollView, Text, StatusBar, Image, TextInput, TouchableOpacity } from "react-native"
import Ionicons from 'react-native-vector-icons/Ionicons';
import Button from "../components/Button";
import Socialmediabutton from "../components/Socialmediabutton"
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


const Signupscreen = ({ navigation }) => {

    const [checkbox, setcheckbox] = useState(false)
    const [fullname, setfullname] = useState("")
    const [fullemail, setfullemail] = useState("")
    const [password, setpassword] = useState("")
    const [confirmpassword, setconfirmpassword] = useState("")

    const onclickcreateaccount = () => {
        if (checkbox && fullname && fullemail && password && confirmpassword) {
            console.log("all statement is true")
        } else {
            console.log("some statement is false")
        }
    }

    return (
        <SafeAreaView style={styles.signupsafearea}>
            <StatusBar backgroundColor="#FFF9E6" barStyle="dark-content" />
            <ScrollView contentContainerStyle={{ paddingBottom: 40 }} vertical showsVerticalScrollIndicator={false} style={styles.scrollview} >
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
                            <Text>FULL NAME</Text>
                            <View style={styles.inputcontainer} >
                                <Ionicons style={styles.iconcolor} name="person" color="#000" size={24} />
                                <TextInput onChangeText={(text) => {
                                    setfullname(text)
                                    console.log(text)
                                }} value={fullname} keyboardType="default" placeholderTextColor="#646040" style={styles.textinput} placeholder="Enter Your Full Name" />
                            </View>
                        </View>
                        {/* {Full name input end} */}
                        {/* {Email input start} */}
                        <View style={styles.signupforminput} >
                            <Text>Mobile Number</Text>
                            <View style={styles.inputcontainer} >

                                <FontAwesome style={styles.iconcolor} name="mobile-phone" color="#000" size={24} />
                                <TextInput onChangeText={(text) => {
                                    setfullemail(text)
                                    console.log(text)
                                }} value={fullemail} maxLength={10} keyboardType="numeric" placeholderTextColor="#646040" style={styles.textinput} placeholder="Enter Your Email Address" />
                            </View>
                        </View>
                        {/* {Email input end} */}
                        {/* {Password input start} */}
                        <View style={styles.signupforminput} >
                            <Text>PASSWORD</Text>
                            <View style={styles.inputcontainer} >
                                <Ionicons style={styles.iconcolor} name="lock-closed-outline" color="#000" size={24} />
                                <TextInput value={password} onChangeText={(text) => {
                                    setpassword(text)
                                    console.log(text)
                                }} keyboardType="default" placeholderTextColor="#646040" style={styles.textinput} placeholder="Enter Your Password" secureTextEntry />
                            </View>
                        </View>
                        {/* {Password input end} */}
                        {/* {Confirm Password input start} */}
                        <View style={styles.signupforminput} >
                            <Text>CONFIRM PASSWORD</Text>
                            <View style={styles.inputcontainer} >
                                <Ionicons style={styles.iconcolor} name="checkmark-circle-outline" color="#0c0000" size={24} />
                                <TextInput value={confirmpassword} onChangeText={(text) => {
                                    setconfirmpassword(text)
                                    console.log(text)
                                }} keyboardType="default" placeholderTextColor="#646040" style={styles.textinput} placeholder="Confirm Your Password" secureTextEntry />
                            </View>
                        </View>
                        {/* {Confirm Password input end} */}
                        {/* terms and condition start */}
                        <View style={styles.termsandcondition} >
                            <TouchableOpacity onPress={() => setcheckbox(!checkbox)} >
                                <Fontisto name={checkbox ? "checkbox-active" : "checkbox-passive"} color="#000" size={24} />
                            </TouchableOpacity>
                            <Text style={styles.termsandconditionText} >I agree to the Terms of Service and
                                {"\n"} Privacy Policy.</Text>
                        </View>
                        {/* terms and condition end */}
                        {/* {Button start} */}
                        <View style={styles.signupbutton} >
                            <Button onPress={onclickcreateaccount} title="Create Account" />
                        </View>
                        {/* {Button end} */}
                        <Text style={styles.quickaccesstext} >QUICK ACCESS</Text>

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
        // paddingVertical: 20,
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
    inputcontainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFDF8",

        borderWidth: 1,
        borderColor: "#E9E2D8",

        paddingHorizontal: 18,
        paddingVertical: 16,

        borderRadius: 18,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 8,

        elevation: 2,
    },
    iconcolor: {
        color: "#A67C52",
    },
    termsandcondition: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        marginTop: 5,
    },
    termsandconditionText: {
        lineHeight: 22,
        color: "#7A6A58",
        flex: 1
    },
    signupbutton: {
        marginVertical: 20,
    },
    quickaccesstext: {
        textAlign: "center",
        color: "#B6A18B",
        letterSpacing: 3,
        fontWeight: "600",
        marginBottom: 20,
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
        marginLeft: 10,
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