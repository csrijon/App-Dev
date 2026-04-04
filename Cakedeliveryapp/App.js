import WelcomeScreen from "./src/Screen/WelcomeScreen"
import Loginscreen from "./src/Screen/Loginscreen"
import Signupscreen from "./src/Screen/Signupscreen"
import Homescreen from "./src/Screen/Homescreen"
import CategoryListing from "./src/Screen/CategoryListing"
import { SafeAreaProvider } from "react-native-safe-area-context"

const App=()=>{
  return(
      <SafeAreaProvider>
        <CategoryListing/>
      </SafeAreaProvider>
  )
}
export default App