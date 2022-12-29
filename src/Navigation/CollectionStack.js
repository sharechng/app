import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Collections from "../screens/Collections/Collections";
import Notifications from "../screens/Notifications/Notifications";

const CollectionsStack = createNativeStackNavigator();

function CollectionsStackScreen() {
  return (
    <CollectionsStack.Navigator
      screenOptions={{
        gestureEnabled: false,
      }}
    >
      <CollectionsStack.Screen
        name="Collections"
        component={Collections}
        options={{ headerShown: false }}
      />
      <CollectionsStack.Screen
        name="Notifications"
        component={Notifications}
        options={{ headerShown: false }}
      />
    </CollectionsStack.Navigator>
  );
}
export { CollectionsStackScreen };
