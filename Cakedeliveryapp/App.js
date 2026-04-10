import WelcomeScreen from "./src/Screen/WelcomeScreen"
import Loginscreen from "./src/Screen/Loginscreen"
import Signupscreen from "./src/Screen/Signupscreen"
import Homescreen from "./src/Screen/Homescreen"
import CategoryListing from "./src/Screen/CategoryListing"
import CakeDetails from "./src/Screen/CakeDetails"
import DeliveryMoment from "./src/Screen/DeliveryMoment"
import { SafeAreaProvider } from "react-native-safe-area-context"
import Customorderpage from "./src/Screen/Customorderpage"
import Ordersummarypage from "./src/Screen/Ordersummarypage"
import OrderSuccessScreen from "./src/Screen/OrderSuccessScreen"

const App=()=>{
  return(
      <SafeAreaProvider>
        <OrderSuccessScreen/>
        {/* <CakeDetails/> */}
      </SafeAreaProvider>
  )
}
export default App