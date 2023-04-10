import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LinkingConfiguration from './LinkingConfiguration';
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import Tree from "../screens/Tree";

const Stack = createNativeStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer linking={LinkingConfiguration}>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: "Home" }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ title: "Profile" }}
        />
        <Stack.Screen
          name="Tree"
          component={Tree}
          options={{ title: "Tree" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
