import { View,StyleSheet } from "react-native"
import { Badge } from "react-native-paper"
import Ionicons from 'react-native-vector-icons/Ionicons';

const CartTabicon = ({color,size,count}) => {
    return (
        <View  style={styles.CartTabicon} >
            <Ionicons
                name="cart"
                color={color}
                size={size}
                style={{
                }}
            />
           {
            count>0 &&  <Badge style={styles.badge} >{count}</Badge>
           }
        </View>
    )
}

export default CartTabicon

const styles = StyleSheet.create({
 
    CartTabicon:{
        position:"relative",
    },
    badge:{
        position:"absolute",
        right:-15,
        top:-5,
        backgroundColor:"#75584e",
        color:"#fff7f6",
        fontWeight:700,
       justifyContent:"center",
       alignItems:"center"
    }

})