import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from "@react-navigation/native";

const Securityheader = ({title}) => {
    const navigation = useNavigation()
    return (
        <View style={styles.Securityheadercontainer} >
            <View style={styles.Securityheadercard} >
                <TouchableOpacity onPress={()=>navigation.goBack()} >
                    <MaterialIcons name="arrow-back-ios" color="#75584e" size={26} />
                </TouchableOpacity>
                <Text style={styles.securityheadertext} >{title}</Text>
            </View>
        </View>
    )
}
export default Securityheader


const styles = StyleSheet.create({

    Securityheadercontainer: {
        justifyContent: "flex-start",
        paddingHorizontal: 24,
        paddingVertical: 16,
        backgroundColor: "#fff9e6cc",
        height: 72,
        justifyContent: "center"
    },
    Securityheadercard: {
        flexDirection: "row",
        gap: 15,
        alignItems: "center"
    },
    securityheadertext:{
        color:"#75584e",
        fontWeight:"700"
    }

})