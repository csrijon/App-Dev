import {SafeAreaView} from "react-native-safe-area-context"
import { StatusBar } from "react-native"
import Simpleheader from "../components/Simpleheader"

const Customorderpage=()=>{
    return(
   <SafeAreaView>
    <StatusBar backgroundColor="#FFF9E6" barStyle="dark-content" />
   <Simpleheader/>
   </SafeAreaView>
    )
}

export default Customorderpage