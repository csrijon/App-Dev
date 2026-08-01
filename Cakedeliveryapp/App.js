
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
import NotificationsScreen from "./src/components/NotificationsScreen"
import CategoryProducts from "./src/Screen/CategoryProducts.js"
import RefineScreen from "./src/Screen/RefineScreen"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import CartTabicon from "./src/components/CartTabicon.js"
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View, TouchableOpacity } from "react-native"





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
      <Stack.Screen name="Trackingscreen" component={Ordertrackingscreen} />
      <Stack.Screen name="NotificationsScreen" component={NotificationsScreen} />
    </Stack.Navigator>
  )
}


const Checkoutstack = () => {
  return (
    <Stack.Navigator initialRouteName="Cart" screenOptions={{ headerShown: false }} >
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
      <Stack.Screen name="CategoryProducts" component={CategoryProducts} />
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
        animation: "fade",
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#FFF9E6",
          height: 80,
          paddingTop: 10,
          paddingBottom: 10,
          paddingLeft: 10,
          paddingRight:10
        },
        tabBarItemStyle: {
          overflow: "hidden",
          borderRadius: 999
        },
        tabBarActiveTintColor: "#75584E",
        tabBarInactiveTintColor: "#646040",
        tabBarActiveBackgroundColor: "#F6CFC2",
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Homestack}
        options={{
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
            />
          ),

          tabBarIcon: ({ color, size }) => (
            <View
              style={{
                width: 62,
                height: 52,
                marginTop: 20,
                borderRadius: 999,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons
                name="home-outline"
                size={size}
                color={color}
              />
            </View>
          )
        }}
      />

      <Tab.Screen
        name="Categorys"
        component={Orderstack}
        options={{

          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
            />
          ),

          tabBarIcon: ({ color, size }) => (
            <View style={{
              width: 62,
              height: 52,
              marginTop: 20,
              borderRadius: 999,
              justifyContent: "center",
              alignItems: "center",
            }} >
              <MaterialIcons name="category" color={color} size={size} />
            </View>

          )
        }}
      />

      <Tab.Screen
        name="Orderagain"
        component={EmptyOrderScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <View style={{
              width: 62,
              height: 52,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20
            }}  >
              <Ionicons name="bag" color={color} size={size} />
            </View>
          )
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Checkoutstack}
        options={{
          tabBarButton:(props)=>(
           <TouchableOpacity
           {...props}/>
          ),
          tabBarIcon: ({ color, size }) => (
            <View style={{
              width:62,
              height:52,
              marginTop:20,
              alignItems:"center",
              justifyContent:"center"
            }} >
              <CartTabicon count={2} color={color} size={size} />
            </View>

          ),
        }}
      />

      <Tab.Screen
        name="Blog"
        component={Profilestack}
        options={{
          tabBarButton:(props)=>(
             <TouchableOpacity
             {...props}/>
          ),
          tabBarIcon: ({ color, size }) => (
            <View style={{
              width:62,
              height:52,
              marginTop:20,
              alignItems:"center",
              justifyContent:"center"
            }} >
              <Ionicons name="person" color={color} size={size}  />
            </View>
          )
        }}
      />

    </Tab.Navigator>
  )
}
export default App