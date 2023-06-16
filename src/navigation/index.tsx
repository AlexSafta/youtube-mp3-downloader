import { TransitionPresets, createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { NavigationParams } from "./NavigationParams";
import { NavigationContainer } from "@react-navigation/native";
import RouteNames from "./RouteNames";
import InitialScreen from "../screens/InitialScreen";
import DownloadingScreen from "../screens/DownloadingScreen";

const Stack = createStackNavigator<NavigationParams>();


const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
      initialRouteName={RouteNames.InitialScreen}
        screenOptions={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}>
        <Stack.Screen name={RouteNames.InitialScreen} component={InitialScreen} />
        <Stack.Screen name={RouteNames.DownloadingScreen} component={DownloadingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation;