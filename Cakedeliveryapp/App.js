import WelcomeScreen from "./src/Screen/WelcomeScreen"
import SIgnupScreen from "./src/Screen/SIgnupScreen"
import { SafeAreaProvider } from "react-native-safe-area-context"

const App=()=>{
  return(
      <SafeAreaProvider>
        <SIgnupScreen/>
      </SafeAreaProvider>
  )
}
export default App