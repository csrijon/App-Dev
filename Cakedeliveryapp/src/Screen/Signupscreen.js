import { SafeAreaView } from "react-native-safe-area-context"
import { View, StyleSheet, ScrollView, Text, StatusBar, Image, TextInput, TouchableOpacity } from "react-native"
import Ionicons from 'react-native-vector-icons/Ionicons';
import Button from "../components/Button";
import Socialmediabutton from "../components/Socialmediabutton"
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const Signupscreen = ({navigation}) => {
    return (
        <SafeAreaView style={styles.signupsafearea}>
            <StatusBar backgroundColor="#FFF9E6" barStyle="dark-content" />
            <ScrollView vartical showsVerticalScrollIndicator={false} style={styles.scrollview} >
                <View style={styles.signupview} >
                    {/*signup top start*/}
                    <View style={styles.signuptop} >
                        <Image source={require("../images/secendbackgroud.png")} />
                        <Text style={styles.cakehaventext} >Cake Haven</Text>
                    </View>
                    {/*signup top end*/}
                    {/*signup form start*/}
                    <View style={styles.signupform} >
                        <View style={styles.signupformtop} >
                            <Text style={styles.signupformtopText} >Create Account</Text>
                            <Text style={styles.signupformtopDescription} >Join our community of dessert lovers today.</Text>
                        </View>
                        {/* {Full name input start} */}
                        <View style={styles.signupforminput} >
                            <Text>FULL NAME</Text>
                            <View style={styles.inputcontainer} >
                                <Ionicons style={styles.iconcolor} name="person" color="#000" size={24} />
                                <TextInput placeholderTextColor="#646040" style={styles.textinput} placeholder="Enter Your Full Name" />
                            </View>
                        </View>
                        {/* {Full name input end} */}
                        {/* {Email input start} */}
                        <View style={styles.signupforminput} >
                            <Text>EMAIL ADDRESS</Text>
                            <View style={styles.inputcontainer} >
                                <Ionicons style={styles.iconcolor} name="mail" color="#000" size={24} />
                                <TextInput placeholderTextColor="#646040" style={styles.textinput} placeholder="Enter Your Email Address" />
                            </View>
                        </View>
                        {/* {Email input end} */}
                        {/* {Password input start} */}
                        <View style={styles.signupforminput} >
                            <Text>PASSWORD</Text>
                            <View style={styles.inputcontainer} >
                                <Ionicons style={styles.iconcolor} name="lock-closed-outline" color="#000" size={24} />
                                <TextInput placeholderTextColor="#646040" style={styles.textinput} placeholder="Enter Your Password" secureTextEntry />
                            </View>
                        </View>
                        {/* {Password input end} */}
                        {/* {Confirm Password input start} */}
                        <View style={styles.signupforminput} >
                            <Text>CONFIRM PASSWORD</Text>
                            <View style={styles.inputcontainer} >
                                <Ionicons style={styles.iconcolor} name="checkmark-circle-outline" color="#0c0000" size={24} />
                                <TextInput placeholderTextColor="#646040" style={styles.textinput} placeholder="Confirm Your Password" secureTextEntry />
                            </View>
                        </View>
                        {/* {Confirm Password input end} */}
                        {/* terms and condition start */}
                        <View style={styles.termsandcondition} >
                            <MaterialIcons name="check-box-outline-blank" color="#000" size={24} />
                            <Text style={styles.termsandconditionText} >I agree to the Terms of Service and
                                {"\n"} Privacy Policy.</Text>
                        </View>
                        {/* terms and condition end */}
                        {/* {Button start} */}
                        <View style={styles.signupbutton} >
                            <Button title="Create Account" />
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
                            <TouchableOpacity onPress={()=>navigation.navigate("Login")} >
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
        borderRadius: 48,
    },
    signupview: {
        flex: 1,
        paddingHorizontal: 30,
        paddingVertical: 30,
    },
    signuptop: {
        flexDirection: "row",
        alignItems: "center",
        gap: 15,
    },
    cakehaventext: {
        fontSize: 20,
        fontWeight: "bold",
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
        fontSize: 34,
        fontWeight: "bold",
    },
    signupformtopDescription: {
        fontSize: 18,
        color: "#646040",
        letterSpacing: 0.5,
    },
    signupforminput: {
        gap: 10,
        marginBottom: 20,
    },
    inputcontainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        backgroundColor: "#faf4d6",
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderRadius: 20,
    },
    iconcolor: {
        color: "#646040",
    },
    termsandcondition: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    termsandconditionText: {
        lineHeight: 20,
    },
    signupbutton: {
        marginVertical: 20,
    },
    quickaccesstext: {
        textAlign: "center",
        color: "#646040",
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
        fontSize: 16,
        lineHeight: 24,
    },
    loginelementText: {
        fontSize: 16,
        lineHeight: 24,
        color: "#6b4a3f",
        fontWeight: "bold",
        cursor: "pointer",
    },
    textinput: {
        color: "#000",
        flex: 1,
    }


})