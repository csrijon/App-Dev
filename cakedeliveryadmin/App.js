import 'react-native-gesture-handler';
import Welcomepage from "./src/pages/Welcomepage"
import Loginpage from "./src/pages/Loginpage"
import Signuppage from "./src/pages/Signuppage"
import Dashboardpage from "./src/pages/Dashboardpage"
import Catalogpage from "./src/pages/Catalogpage"
import Ordermanagementpage from "./src/pages/Ordermanagementpage"
import CustomerDirectorypage from "./src/pages/CustomerDirectorypage"
import Addnewcakepage from "./src/pages/Addnewcakepage"
import Ordertrackingpage from "./src/pages/Ordertrackingpage"
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider, useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <NavigationContainer>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Stackscreens />
    </NavigationContainer>

  );
}

const Stackscreens = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Welcome" >
      <Stack.Screen name="Welcome" component={Welcomepage} />
      <Stack.Screen name='Signup' component={Signuppage} />
      <Stack.Screen name='Login' component={Loginpage} />
      <Stack.Screen name='TabScreens' component={TabScreens} />
    </Stack.Navigator>
  )
}

const TabScreens = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>

      <Tab.Screen
        name="Dashboard"
        component={Dashboardpage}
        options={{
          tabBarIcon: ({ size, color }) => (
            <FontAwesome name="dashboard" color={color} size={size} />
          )
        }}
      />
      <Tab.Screen name="Ordermanage" component={Ordermanagementpage}
      options={{
        tabBarIcon:({color,size})=>(
          
        )
      }}
      />

    </Tab.Navigator>
  )
}

export default App;
