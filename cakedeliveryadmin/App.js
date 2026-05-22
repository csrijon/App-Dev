
import Welcomepage from "./src/pages/Welcomepage"
import Loginpage from "./src/pages/Loginpage"
import Signuppage from "./src/pages/Signuppage"
import Dashboardpage from "./src/pages/Dashboardpage"
import Catalogpage from "./src/pages/Catalogpage"
import Ordermanagementpage from "./src/pages/Ordermanagementpage"
import CustomerDirectorypage from "./src/pages/CustomerDirectorypage"
import Addnewcakepage from "./src/pages/Addnewcakepage"
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Addnewcakepage/>
    </SafeAreaProvider>
  );
}


export default App;
