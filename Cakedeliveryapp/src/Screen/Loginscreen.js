import { SafeAreaView } from "react-native-safe-area-context"
import { StatusBar, View, Image, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native"
import Zocial from 'react-native-vector-icons/Zocial';
import Octicons from 'react-native-vector-icons/Octicons';
import Button from "../components/Button";
import Socialmediabutton from "../components/Socialmediabutton"
import { useState, useEffect } from "react";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Config from "react-native-config";
import FontAwesome from 'react-native-vector-icons/FontAwesome';



const Loginscreen = ({ navigation }) => {

    const [loginemail, setloginemail] = useState("")
    const [loginpassword, setloginpassword] = useState("")

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


    const onclickloginbutton = () => {
        if (loginemail && loginpassword) {
            console.log("all statement is visible")
            navigation.replace("Tabs")
        } else {
            console.log("Nothing is Visible")
        }
    }

    return (
        <SafeAreaView style={styles.loginsafearea} >
            <StatusBar backgroundColor="#FFF9E6" barStyle={"dark-content"} />
            <View style={styles.loginconatiner} >
                <View style={styles.loginbox} >
                    <View style={styles.img}>
                        <Image
                            style={{ width: 80, height: 80 }}
                            source={require("../images/Background.png")}
                        />
                    </View>
                    {/* {top text start} */}
                    <View style={styles.welcomecake} >
                        <Text style={styles.welcomeboldtext} >Cake Haven</Text>
                        <Text style={styles.welcomenormaltext} >Welcome back to the bakery</Text>
                    </View>
                    {/* {top text end} */}
                    {/* {mailinput start} */}
                    <View style={styles.mailinput} >
                        <Text style={styles.mailinputtext} >Mobile Number</Text>
                        <View style={styles.mailtextinput} >
                            <FontAwesome name="mobile-phone" color="#000" size={24} />
                            <TextInput keyboardType="numeric" value={loginemail} onChangeText={(text) => {
                                setloginemail(text)
                            }} require placeholder="7029046473" maxLength={10} />
                        </View>
                    </View>
                    {/* {mail input end} */}
                    <View style={styles.passwordsection} >
                        <View style={styles.passwordforget} >
                            <Text>PASSWORD</Text>
                            <TouchableOpacity onPress={() => navigation.navigate("Reset")} >
                                <Text style={styles.signupText} >FORGOT?</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.passwordinput} >
                            <Octicons name="lock" color="#000" size={24} />
                            <TextInput onChangeText={(text) => {
                                setloginpassword(text)
                                console.log(text)
                            }} value={loginpassword} secureTextEntry require placeholder="Enter The password" />
                        </View>
                    </View>
                    {/* {button start} */}
                    <View style={styles.loginbutton} >
                        <Button onPress={onclickloginbutton} title="Login to Haven" />
                    </View>
                    {/* {Button end} */}
                    <Text style={styles.orcontinue} >OR CONTINUE WITH</Text>
                    {/* {social media button start} */}
                    <Socialmediabutton onPress={onclickgooglelogin} />
                    {/* {social media button end} */}
                    {/* {last element start} */}
                    <View style={styles.lastelement} >
                        <Text>New to the gallery?</Text>
                        <TouchableOpacity>
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
    },

    loginbox: {
        flex: 1,
        justifyContent: "flex-start",
        paddingHorizontal: 30,
        paddingVertical: 10,
        gap: 20,
        borderRadius: 48,
        backgroundColor: "#FFFFFF",
        elevation: 5,
    },

    img: {
        alignItems: "center"
    },

    welcomecake: {
        alignItems: "center",
        gap: 10
    },

    welcomeboldtext: {
        letterSpacing: -0.4,
        color: "#75584E",
        fontSize: 19,
        fontWeight: "700"   // ✅ fixed
    },

    welcomenormaltext: {
        fontSize: 20,
        color: "#646040"
    },

    mailinput: {
        marginTop: 20,
        gap: 10
    },

    mailinputtext: {
        paddingLeft: 10
    },
    mailtextinput: {
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
        gap: 12,
    },

    passwordsection: {
        gap: 10
    },

    passwordforget: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 10
    },

    passwordinput: {
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

        gap: 12,
    },

    loginbutton: {
        marginTop: 10
    },

    orcontinue: {
        textAlign: "center",
        marginTop: 10,
        color: "#646040"
    },

    lastelement: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 5,
        marginTop: 10
    },

    signupText: {
        color: "#75584E",
        fontWeight: "bold"
    }
})