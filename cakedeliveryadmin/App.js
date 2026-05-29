import 'react-native-gesture-handler';
import Welcomepage from "./src/pages/Welcomepage"
import Loginpage from "./src/pages/Loginpage"
import Signuppage from "./src/pages/Signuppage"
import Dashboardpage from "./src/pages/Dashboardpage"
import Catalogpage from "./src/pages/Catalogpage"
import Ordermanagementpage from "./src/pages/Ordermanagementpage"
import CustomerDirectorypage from "./src/pages/CustomerDirectorypage"
// import Addnewcakepage from "./src/pages/Addnewcakepage"
import Ordertrackingpage from "./src/pages/Ordertrackingpage"
import Addnewcakepage from "./src/pages/Addnewcakepage"
import Profilepage from "./src/pages/Profilepage"
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider, useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

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

const Catalogstack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Catalog'>
      <Stack.Screen name='Catalog' component={Catalogpage} />
      <Stack.Screen name='Addnewpage' component={Addnewcakepage} />
    </Stack.Navigator>
  )
}

const TabScreens = () => {
  return (
    <Tab.Navigator screenOptions={{
      headerShown: false, tabBarStyle: {
        backgroundColor: "#faf4d6f2",
        paddingVertical: 12,
        paddingHorizontal: 15,
        height: 70,
        borderTopLeftRadius: 44,
        borderTopRightRadius: 44
      },
      tabBarActiveTintColor: "#f6cfc2",
      tabBarHideOnKeyboard: true
    }}>

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
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="receipt" color={color} size={size} />
          )
        }}
      />

      <Tab.Screen name='Catalog' component={Catalogstack}
        options={
          {
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="menu-book" color={color} size={size} />
            )
          }
        }
      />

      <Tab.Screen name='Profile' component={Profilepage}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person-outline" color={color} size={size} />
          )
        }}
      />

    </Tab.Navigator>
  )
}

export default App;
