import WelcomeScreen from "./src/Screen/WelcomeScreen"
import { SafeAreaProvider } from "react-native-safe-area-context"

const App=()=>{
  return(
      <SafeAreaProvider>
        <WelcomeScreen/>
      </SafeAreaProvider>
  )
}
export default WelcomeScreen