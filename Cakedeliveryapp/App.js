import WelcomeScreen from "./src/Screen/WelcomeScreen"
import Loginscreen from "./src/Screen/Loginscreen"
import Signupscreen from "./src/Screen/Signupscreen"
import { SafeAreaProvider } from "react-native-safe-area-context"

const App=()=>{
  return(
      <SafeAreaProvider>
        <Signupscreen/>
      </SafeAreaProvider>
  )
}
export default App