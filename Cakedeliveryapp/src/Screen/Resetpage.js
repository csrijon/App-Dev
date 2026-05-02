import { SafeAreaView } from "react-native-safe-area-context"
import { View, TouchableOpacity, Text, StyleSheet, Image, TextInput } from "react-native"
import AntDesign from 'react-native-vector-icons/AntDesign';
import Resetheader from "../components/Resetheader"
import { useState } from "react";


const Resetpage = ({navigation}) => {
    const [getmail,setmail] = useState(null)

    const onclicksendlinkbutton =()=>{
        console.log(getmail)
        navigation.replace("Link")
        setmail("")
    }
    return (
        <SafeAreaView style={styles.Resetpagecontainer} >
         
            <Resetheader onPress={() => navigation.goBack()} />

            <View style={styles.imagecontainer} >
                <View style={styles.imagebox} >
                    <Image style={styles.image} source={require("../images/cakeimage.jpeg")} />

                </View  >
            </View>

            <View style={styles.textpart} >
                <Text style={styles.headingtext} >
                    Forgot your password?
                </Text>
                <Text style={styles.subheading} >
                    Don't worry, it happens. Enter your email below and we'll send you a link to reset it.
                </Text>
            </View>
            <View style={styles.wrapper}>

                {/* Label */}
                <Text style={styles.labelText}>Email Address</Text>

                {/* Input */}
                <TextInput
                    placeholder="hello@example.com"
                    placeholderTextColor="#B7AA88"
                    style={styles.inputField}
                    onChangeText={(text)=>{
                        // console.log(text)
                        setmail(text)
                    }  }
                    require
                    value={getmail}
                />
{/* onPress={()=>navigation.navigate("Link")} */}
                {/* Button */}
                <TouchableOpacity onPress={onclicksendlinkbutton}  style={styles.primaryBtn}>
                    <Text style={styles.btnText}>Send Reset Link →</Text>
                </TouchableOpacity>

                {/* Bottom Text */}
                <View style={styles.bottomRow}>
                    <Text style={styles.normalText}>Remember your password? </Text>
                    <TouchableOpacity onPress={()=>navigation.navigate("Login")} >
                        <Text style={styles.loginText}>Log in</Text>
                    </TouchableOpacity>

                </View>

            </View>
        </SafeAreaView>
    )
}
export default Resetpage

const styles = StyleSheet.create({
    Resetpagecontainer: {
        flex: 1,
        backgroundColor: "#fff9e6",
        paddingHorizontal:20
    },
 
    imagecontainer: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 40,
    },
    imagebox: {
        width: 160,
        height: 160,
        borderRadius: 40,
        backgroundColor: "#f6cfc266",
        justifyContent: "center",
        alignItems: "center",
        shadowRadius: 10,
        transform: [{ rotate: "-2deg" }]
    },
    image: {
        width: 110,
        height: 110,
        borderRadius: 25,
        resizeMode: "cover",
    },
    textpart: {
        width: "100%",
        gap: 15,
        marginTop: 30
    },
    headingtext: {
        fontSize: 40,
        color: "#363317",
        letterSpacing: 0.1,
        fontWeight: 800,
        textAlign: "center"
    },
    subheading: {
        color: "#646040",
        textAlign: "center",
    },
    wrapper: {
        flex: 1,
        // backgroundColor: "#E8DFC9",
        paddingHorizontal: 10,

        marginTop: 40
    },

    labelText: {
        fontSize: 14,
        color: "#646040",
        fontWeight: 600,
        marginBottom: 15,
        marginLeft: 5,
    },

    inputField: {
        backgroundColor: "#DCD2A9",
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderRadius: 40,
        fontSize: 14,
        color: "#333",
    },

    primaryBtn: {
        marginTop: 30,
        backgroundColor: "#7B5A4E",
        paddingVertical: 20,
        borderRadius: 40,
        alignItems: "center",

        // shadow
        elevation: 6,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
    },

    btnText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },

    bottomRow: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 40,
        gap: 10,
        alignItems:"center"
    },

    normalText: {
        color: "#6E6A5E",
        fontSize: 14,
        fontWeight:500
    },

    loginText: {
        color: "#75584e",
        fontSize: 16,
        fontWeight: "bold",
    },
})