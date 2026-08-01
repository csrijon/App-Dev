import { View,StyleSheet } from "react-native"
import { Badge } from "react-native-paper"
import Ionicons from 'react-native-vector-icons/Ionicons';

const CartTabicon = () => {
    return (
        <View  style={styles.CartTabicon} >
            <Ionicons
                name="cart"
                color={"#75584E"}
                size={26}
                style={{
                }}
            />
            <Badge style={styles.badge} >23 </Badge>
        </View>
    )
}

export default CartTabicon

const styles = StyleSheet.create({
 
    CartTabicon:{
        position:"relative",
        paddingTop:1,
        // flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
    badge:{
        position:"absolute",
        right:-15,
        top:-5
    }

})