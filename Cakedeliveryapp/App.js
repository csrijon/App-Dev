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
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View } from "react-native/types_generated/index"


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
      <Stack.Screen name="Tabs" component={TabScreen} />
    </Stack.Navigator>
  )
}

const Orderstack = () => {
  return (
    <Stack.Navigator initialRouteName="Category" screenOptions={{headerShown:false}} >
      <Stack.Screen name="Category" component={CategoryListing} />
          <Stack.Screen name="Delivery" component={DeliveryMoment} />
       <Stack.Screen name="Cakedetails" component={CakeDetails}/>
      <Stack.Screen name="Ordersummary" component={Ordersummarypage}/>
      <Stack.Screen name="Customorder" component={Customorderpage}/>
      <Stack.Screen name="Ordesuccess" component={OrderSuccessScreen}/>
      <Stack.Screen name="Myorder" component={Myorderscreen}/>
    </Stack.Navigator>
  )
}
const TabScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#FFF9E6",
          height: 70,
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          overflow: "hidden",
        },
        tabBarItemStyle: {
          paddingTop: 10,
          borderRadius: 20,
          paddingBottom: 10

        },
        tabBarActiveTintColor: "#75584E",
        tabBarInactiveTintColor: "#646040",
        tabBarActiveBackgroundColor: "#F6CFC2",
      }}
    >
      <Tab.Screen
        name="Home"
        component={Homescreen}
        options={{

          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          )
        }}
      />

      <Tab.Screen
        name="Myorder"
        component={Orderstack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cloud-done-sharp" color={color} size={size} />
          )
        }}
      />

      <Tab.Screen
        name="Calender"
        component={Customorderpage}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" color={color} size={size} />
          )
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Customorderpage}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          )
        }}
      />

    </Tab.Navigator>
  )
}
export default App