import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native"
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";

const Adminheader = () => {

    const naviagtion = useNavigation()
    return (
        <View style={headerstyle.adminheadersection} >
            <Text style={headerstyle.headertitle} >
                The Patisserie
            </Text>
            <View style={headerstyle.headersubheading} >
                <TouchableOpacity onPress={()=>naviagtion.navigate("Notificationpage")} >
                    <Ionicons name="notifications" color="#7B5A4E" size={24} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => naviagtion.navigate("Profile")} >
                    <Image
                        source={{
                            uri: "https://plus.unsplash.com/premium_photo-1690407617542-2f210cf20d7e?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fHww"
                        }}
                        style={headerstyle.profileImage}
                    />
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default Adminheader

const headerstyle = StyleSheet.create({
    adminheadersection: {
        width: "100%",
        paddingHorizontal: 24,
        paddingVertical: 16,
        backgroundColor: "#fff9e6cc",
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
    },
    profileImage: {
        width: 45,
        height: 45,
        borderRadius: 50,
    },
    headersubheading: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    headertitle: {
        color: "#75584e",
        fontWeight: "700",
        fontSize: 16
    }
})