import { SafeAreaView } from "react-native-safe-area-context"
import { StatusBar, View, Image, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native"
import Zocial from 'react-native-vector-icons/Zocial';
import Octicons from 'react-native-vector-icons/Octicons';
import Button from "../components/Button";
import Socialmediabutton from "../components/Socialmediabutton"

const Loginscreen = () => {
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
                        <Text style={styles.mailinputtext} >EMAIL ADDRESS</Text>
                        <View style={styles.mailtextinput} >
                            <Zocial name="email" color="#000" size={24} />
                            <TextInput require placeholder="csrijon92@gmail.com" />
                        </View>
                    </View>
                    {/* {mail input end} */}
                    <View style={styles.passwordsection} >
                        <View style={styles.passwordforget} >
                            <Text>PASSWORD</Text>
                            <Text>FORGOT?</Text>
                        </View>
                        <View style={styles.passwordinput} >
                            <Octicons name="lock" color="#000" size={24} />
                            <TextInput require placeholder="Enter The password" />
                        </View>
                    </View>
                    {/* {button start} */}
                    <View style={styles.loginbutton} >
                        <Button title="Login to Haven" />
                    </View>
                    {/* {Button end} */}
                    <Text style={styles.orcontinue} >OR CONTINUE WITH</Text>
                    {/* {social media button start} */}
                    <Socialmediabutton />
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
        paddingVertical: 40,
    },
    loginconatiner: {
        flex: 1,
    },
    loginbox: {
        flex: 1,
        justifyContent: "flex-start",
        paddingHorizontal: 30,
        paddingVertical: 30,
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
        fontWeight: 700
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
        backgroundColor: "#faf4d6",
        paddingLeft: 30,
        paddingRight: 24,
        paddingVertical: 16,
        borderRadius: 32,
        gap: 15
    },
    passwordsection: {
        flex: 1,
    },
    passwordforget: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 10
    },
    passwordinput: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#faf4d6",
        paddingLeft: 30,
        paddingRight: 24,
        paddingVertical: 16,
        borderRadius: 32,
        gap: 15,
        marginTop: 20
    },
    loginbutton: {
        marginTop: 10
    },
    orcontinue: {
        textAlign: "center",
        marginTop: 20,
        color: "#646040"
    },
    lastelement: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 5,
        marginTop: 20
    },
    signupText: {
        color: "#75584E",
        fontWeight: "bold"
    }
})