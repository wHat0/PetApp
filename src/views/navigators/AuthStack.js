import { StyleSheet, Text, View } from "react-native"
import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import SignUpScreen from "../screens/Auth/SignUpScreen"
import SignInScreen from "../screens/Auth/SignInScreen"
import DrawerNavigator from "./DrawerNavigator"
import DetailsScreen from "../screens/DetailsScreen"
import WelcomeScreen from "../screens/Auth/WelcomeScreen"
export function HomeStack() {
  const Stack = createNativeStackNavigator()

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={DrawerNavigator} />
      <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
    </Stack.Navigator>
  )
}

export default function AuthStack() {
  const AuthStack = createNativeStackNavigator()

  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Welcome" component={WelcomeScreen} />

      <AuthStack.Screen name="SignIn" component={SignInScreen} />
      <AuthStack.Screen name="SignUpScreen" component={SignUpScreen} />
    </AuthStack.Navigator>
  )
}
