
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
import Myorderscreen from "./src/Screen/Myorderscreen"
import Profilescreen from "./src/Screen/Profilescreen"
import AddressUI from "./src/Screen/AddressUI"
import Resetpage from "./src/Screen/Resetpage"
import EmptyOrderScreen from "./src/Screen/EmptyOrderScreen"
import ResetLinkpage from "./src/Screen/ResetLinkpage"
import Setpasswordpage from "./src/Screen/Setpasswordpage"
import PasswordChanged from "./src/Screen/PasswordChanged"
import Ordertrackingscreen from "./src/Screen/Ordertrackingscreen.js"
import Checkoutscreen from "./src/Screen/Checkoutscreen.js"
import RefineScreen from "./src/Screen/RefineScreen"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';




const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()
console.log(Stack)
const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stackscreen />
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

const Stackscreen = () => {
  return (
    <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}  >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Signup" component={Signupscreen} />
      <Stack.Screen name="Login" component={Loginscreen} />
      <Stack.Screen name="Reset" component={Resetpage} />
      <Stack.Screen name="Link" component={ResetLinkpage} />
      <Stack.Screen name="Setnewpass" component={Setpasswordpage} />
      <Stack.Screen name="PasswordChanged" component={PasswordChanged} />
      <Stack.Screen name="Tabs" component={TabScreen} />
      <Stack.Screen name="Trackingscreen" component={Ordertrackingscreen}/>
    </Stack.Navigator>
  )
}


const Checkoutstack=()=>{
  return(
     <Stack.Navigator initialRouteName="Cart" screenOptions={{headerShown:false}} >
      <Stack.Screen name="Cart" component={Checkoutscreen} />
        <Stack.Screen name="Ordesuccess" component={OrderSuccessScreen} />
     </Stack.Navigator>
  )
}


const Homestack = () => {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }} >
      <Stack.Screen name="Home" component={Homescreen} />
    </Stack.Navigator>
  )
}

const Orderstack = () => {
  return (
    <Stack.Navigator initialRouteName="Category" screenOptions={{ headerShown: false }} >
      <Stack.Screen name="Category" component={CategoryListing} />
      <Stack.Screen name="Cakedetails" component={CakeDetails} />
      <Stack.Screen name="Ordersummary" component={Ordersummarypage} />
      <Stack.Screen name="Customorder" component={Customorderpage} />
      <Stack.Screen name="Delivery" component={DeliveryMoment} />
    </Stack.Navigator>
  )
}

const Profilestack = () => {
  return (
    <Stack.Navigator initialRouteName="Profilescreen" screenOptions={{ headerShown: false }} >
      <Stack.Screen name="Profilescreen" component={Profilescreen} />
      <Stack.Screen name="Adressscreen" component={AddressUI} />
    </Stack.Navigator>
  )
}
const TabScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#FFF9E6",
          height: 70,
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          overflow: "hidden",
          paddingHorizontal: 10,
          paddingTop: 10,
          paddingBottom: 10,
        },
        tabBarItemStyle: {
          borderRadius: 9999,
          paddingHorizontal: 20,
          marginTop: 5,
          overflow: "hidden"
        },
        tabBarActiveTintColor: "#75584E",
        tabBarInactiveTintColor: "#646040",
        // tabBarActiveBackgroundColor: "#F6CFC2",
        tabBarHideOnKeyboard: true,

      }}
    >
      <Tab.Screen
        name="Home"
        component={Homestack}
        options={{

          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} style={{
              marginTop: 4
            }} />
          )
        }}
      />

      <Tab.Screen
        name="Categorys"
        component={Orderstack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="category" color={color} size={size} style={{
              marginTop: 4
            }} />
          )
        }}
      />

      <Tab.Screen
        name="Orderagain"
        component={EmptyOrderScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bag" color={color} size={size} style={{
              marginTop: 4
            }} />
          )
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Checkoutstack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="cart"
              color={color}
              size={size}
              style={{
                marginTop:4
              }}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Blog"
        component={Profilestack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} style={{
              marginTop: 4
            }} />
          )
        }}
      />

    </Tab.Navigator>
  )
}
export default App