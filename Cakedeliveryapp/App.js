import WelcomeScreen from "./src/Screen/WelcomeScreen"
import Loginscreen from "./src/Screen/Loginscreen"
import Signupscreen from "./src/Screen/Signupscreen"
import Homescreen from "./src/Screen/Homescreen"
import CategoryListing from "./src/Screen/CategoryListing"
import CakeDetails from "./src/Screen/CakeDetails"
import { SafeAreaProvider } from "react-native-safe-area-context"

const App=()=>{
  return(
      <SafeAreaProvider>
        <CakeDetails/>
      </SafeAreaProvider>
  )
}
export default App