import { TouchableOpacity, StyleSheet } from "react-native"
import AntDesign from 'react-native-vector-icons/AntDesign';

const Plusbutton = ({onPress}) => {
    return (
        <TouchableOpacity onPress={onPress} style={Plusbuttonstyle.fixedbutton} >
            <AntDesign name="plus" color="#fff" size={24} />
        </TouchableOpacity>
    )
}

export default Plusbutton

const Plusbuttonstyle = StyleSheet.create({
    fixedbutton: {
        position: "absolute",
        bottom: 30,
        right: 30,
        width: 60,
        height: 60,
        backgroundColor: "#7a5b52",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 999,
        elevation: 5,
    }
})
