import 'react-native-gesture-handler';
import Welcomepage from "./src/pages/Welcomepage"
import Loginpage from "./src/pages/Loginpage"
import Signuppage from "./src/pages/Signuppage"
import Dashboardpage from "./src/pages/Dashboardpage"
import Catalogpage from "./src/pages/Catalogpage"
import Ordermanagementpage from "./src/pages/Ordermanagementpage"
import Securitypage from "./src/pages/Securitypage"
import CustomerDirectorypage from "./src/pages/CustomerDirectorypage"
import Ordertrackingpage from "./src/pages/Ordertrackingpage"
import Paymentgatwaypage from "./src/pages/Paymentgatwaypage"
import Notificationpage from "./src/pages/Notificationpage"
import Addnewcakepage from "./src/pages/Addnewcakepage"
import Onbordingpageone  from "./src/pages/Onbordingpageone"
import OnboardingPageTwo from "./src/pages/OnboardingPageTwo"
import Profilepage from "./src/pages/Profilepage"
import RecentOrdersScreen from "./src/pages/RecentOrdersScreen"
import CatalogUpdatedScreen from "./src/pages/CatalogUpdatedScreen"
import Passwordchangespage from "./src/pages/Passwordchangespage"
import OnboardingpageThree from "./src/pages/OnboardingpageThree"
import OnboardingpageFour from "./src/pages/OnboardingpageFour"
import OnboardingpageFive from "./src/pages/OnboardingpageFive"
import Onboradingcompletepage from "./src/pages/Onboradingcompletepage"
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
    <SafeAreaProvider  >
      <NavigationContainer>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <Stackscreens />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const Stackscreens = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Welcome" >
      <Stack.Screen name="Welcome" component={Welcomepage} />
      <Stack.Screen name='Signup' component={Signuppage} />
      <Stack.Screen name='Login' component={Loginpage} />
      <Stack.Screen name='Onbordingpageone' component={Onbordingpageone}/>
      <Stack.Screen name='OnboardingPageTwo' component={OnboardingPageTwo}/>
      <Stack.Screen name='OnboardingpageThree' component={OnboardingpageThree}/>
      <Stack.Screen name='OnboardingpageFour' component={OnboardingpageFour}/>
      <Stack.Screen name='OnboardingpageFive' component={OnboardingpageFive}/>
      <Stack.Screen name='Onboradingcompletepage' component={Onboradingcompletepage}/>
      <Stack.Screen name='TabScreens' component={TabScreens} />
      <Stack.Screen name='Securityscreen' component={Securitypage} />
      <Stack.Screen name='Paymentadmin' component={Paymentgatwaypage} />
      <Stack.Screen name='Notificationpage' component={Notificationpage} />
      <Stack.Screen name='RecentOrdersScreen' component={RecentOrdersScreen} />
      <Stack.Screen name='CatalogUpdatedScreen' component={CatalogUpdatedScreen} />
      <Stack.Screen name='Passwordchangespage' component={Passwordchangespage} />
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
  const insets = useSafeAreaInsets()
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,

        tabBarStyle: {
          backgroundColor: "#faf4d6f2",
          height: 70,

          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,

          borderTopLeftRadius: 35,
          borderTopRightRadius: 35,

          overflow: "hidden",
          marginBottom: 0
        },

        tabBarActiveTintColor: "#75584e",
        tabBarInactiveTintColor: "#8c8c8c",

        // tabBarActiveBackgroundColor: "#f6cfc2",

        tabBarItemStyle: {
          borderRadius: 999,
          overflow: "hidden",
          marginVertical: 5,
          height: 70 + insets.bottom,
          paddingBottom: insets.bottom,
        },

        tabBarLabelStyle: {
          fontSize: 11,
        },

        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={Dashboardpage}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome
              name="dashboard"
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Ordermanage"
        component={Ordermanagementpage}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="receipt"
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Catalog"
        component={Catalogstack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons
              name="menu-book"
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profilepage}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons
              name="person-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default App;
