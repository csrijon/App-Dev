import { SafeAreaView } from "react-native-safe-area-context"
import { StyleSheet, View, Image,Text } from "react-native"
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import BakeryHeader from "../components/BakeryHeader"

const Onboradingcompletepage = () => {
    return (
        <SafeAreaView style={styles.Onboradingcompletepage} >
            <BakeryHeader/>
            <View style={styles.topsectioncomplete} >
                <Image style={styles.Image} source={require("../images/unnamed.png")} />
                <View style={styles.verifysection} >
                    <MaterialIcons name="verified" color="#5b4138" size={24} />
                    <Text>ACTIVE NOW</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Onboradingcompletepage

const styles = StyleSheet.create({
Onboradingcompletepage:{
    flex:1,
    backgroundColor:"#f7ebe4"
},
topsectioncomplete:{
    flex:1,
    alignItems:"center",
    marginTop:40
},
Image:{
    width:216,
    height:216,
    borderRadius:999,
    objectFit:"cover",
    resizeMode:"cover"
},
verifysection:{
    flexDirection:"row",
    alignItems:"center",
    gap:10,
    backgroundColor:"#ffffff",
    paddingHorizontal:15,
    paddingVertical:10,
    borderRadius:999,
    position:"absolute",
    top:200,

}
})