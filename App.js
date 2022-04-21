import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Login from "./src/screen/Login";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Register from "./src/screen/Register";
import Home from "./src/screen/Home";
import Data from "./src/screen/Data";


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Data">
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: false,
            }}
          />


          

          <Stack.Screen
            name="Data"
            component={Data}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

// import { StatusBar } from "expo-status-bar";
// import React from "react";
// import { StyleSheet, Text, View } from "react-native";
// import Login from "./components/Login";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import Home from "./components/Home";
// import Contact from "./components/Contact";
// import Data from "./components/Data";
// const Stack = createNativeStackNavigator();
// import {Drawercomp, DrawerContent} from "./components/Drawercomp"

// export default function App() {
//   return (
//     <>
//       <NavigationContainer>
//         <Drawer.Navigator DrawerContent={(props)=> <Drawercomp {...props}  />}>
//           <Drawer.Screen
//             name="Login"
//             component={Login}
//             // options={{
//             //   headerShown: false,
//             // }}
//           />
//           <Drawer.Screen name="Contact" component={Contact} />
//           <Drawer.Screen name="Home" component={Home} />
//           <Drawer.Screen name="Data" component={Data} />

//         </Drawer.Navigator>
//       </NavigationContainer>
//     </>
//   );
// }
