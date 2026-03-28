import { SafeAreaView } from "react-native-safe-area-context"
import { StatusBar, View, Image, Text, TextInput, StyleSheet } from "react-native"
import Zocial from 'react-native-vector-icons/Zocial';
import Octicons from 'react-native-vector-icons/Octicons';
import Button from "../components/Button";
import Socialmediabutton from "../components/Socialmediabutton"



const SignupScreen = () => {
    return (
        <SafeAreaView style={styles.loginsafearea} >
            <StatusBar backgroundColor="#0ecd57" />
            <View style={styles.loginconatiner} >
                <View style={styles.loginbox} >
                    <View style={styles.img}>
                        <Image
                            style={{ width: 80, height: 80 }}
                            source={require("../images/Background.png")}
                        />
                    </View>
                    <View style={styles.welcomecake} >
                        <Text style={styles.welcomeboldtext} >Cake Haven</Text>
                        <Text style={styles.welcomenormaltext} >Welcome back to the bakery</Text>
                    </View>
                    <View>
                        <Text>EMAIL ADDRESS</Text>
                        <View>
                            <Zocial name="email" color="#000" size={24} />
                            <TextInput placeholder="csrijon92@gmail.com" />
                        </View>
                    </View>
                    <View>
                        <View>
                            <Text>PASSWORD</Text>
                            <Text>FORGOT?</Text>
                        </View>
                        <View>
                            <Octicons name="lock" color="#000" size={24} />
                        </View>
                    </View>
                    {/* {button start} */}
                    <View>
                        <Button />
                    </View>
                    {/* {Button end} */}
                    <Text>OR CONTINUE WITH</Text>
                    {/* {social media button start} */}
                    <Socialmediabutton />
                    {/* {social media button end} */}
                    {/* {last element start} */}
                    <View>
                        <Text>New to the gallery?</Text>
                        <Text>Sign Up</Text>
                    </View>
                    {/* {last element end} */}
                </View>
            </View>
        </SafeAreaView>
    )
}
export default SignupScreen

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
        paddingHorizontal: 20,
        paddingVertical: 30,
        gap: 20,
        borderRadius: 48,
        backgroundColor: "#FFFFFF"
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
    }
})