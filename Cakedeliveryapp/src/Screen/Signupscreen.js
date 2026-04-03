import { SafeAreaView } from "react-native-safe-area-context"
import { View, StyleSheet, ScrollView, Text, StatusBar, Image, TextInput } from "react-native"
import Ionicons from 'react-native-vector-icons/Ionicons';
import Button from "../components/Button";
import Socialmediabutton from "../components/Socialmediabutton"



const Signupscreen = () => {
    return (
        <SafeAreaView style={styles.signupsafearea}>
            <StatusBar backgroundColor="#FFF9E6" barStyle="dark-content" />
            <ScrollView vartical style={styles.scrollview} >
                <View style={styles.signupview} >
                    {/*signup top start*/}
                    <View style={styles.signuptop} >
                        <Image source={require("../images/secendbackgroud.png")} />
                        <Text style={styles.cakehaventext} >Cake Haven</Text>
                    </View>
                    {/*signup top end*/}
                    {/*signup form start*/}
                    <View style={styles.signupform} >
                        <View>
                            <Text>Create Account</Text>
                            <Text>Join our community of dessert lovers today.</Text>
                        </View>
                        {/* {Full name input start} */}
                        <View>
                            <Text>FULL NAME</Text>
                            <View>
                                <Ionicons name="person" color="#000" size={24} />
                                <TextInput placeholder="Enter Your Full Name" />
                            </View>
                        </View>
                        {/* {Full name input end} */}
                        {/* {Email input start} */}
                        <View>
                            <Text>EMAIL ADDRESS</Text>
                            <View>
                                <Ionicons name="mail" color="#000" size={24} />
                                <TextInput placeholder="Enter Your Email Address" />
                            </View>
                        </View>
                        {/* {Email input end} */}
                        {/* {Password input start} */}
                        <View>
                            <Text>PASSWORD</Text>
                            <View>
                                <Ionicons name="lock-closed-outline" color="#0c0000" size={24} />
                                <TextInput placeholder="Enter Your Password" secureTextEntry />
                            </View>
                        </View>
                        {/* {Password input end} */}
                        {/* {Confirm Password input start} */}
                        <View>
                            <Text>CONFIRM PASSWORD</Text>
                            <View>
                                <Ionicons name="checkmark-circle-outline" color="#0c0000" size={24} />
                                <TextInput placeholder="Confirm Your Password" secureTextEntry />
                            </View>
                        </View>
                        {/* {Confirm Password input end} */}
                        {/* terms and condition start */}
                        <View>
                            <TextInput type="checkbox" />
                            <Text>I agree to the Terms of Service and
                                Privacy Policy.</Text>
                        </View>
                        {/* terms and condition end */}
                        {/* {Button start} */}
                        <View>
                            <Button title="Create Account" />
                        </View>
                        {/* {Button end} */}
                        <Text>QUICK ACCESS</Text>

                        {/* {social media button start} */}
                        <View>
                            <Socialmediabutton />
                        </View>
                        {/* {social media button end} */}
                        {/* {last element start} */}
                        <View>
                            <Text>Already have an account?</Text>
                            <Text>Log in here</Text>
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
        paddingHorizontal: 20,
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
    signupform:{
            flex: 1,
            flexDirection: "column",
            marginTop: 30,
    }

})