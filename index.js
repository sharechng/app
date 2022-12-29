/**
 * @format
 */
import "react-native-gesture-handler";
import { AppRegistry } from "react-native";
import "./shim";
import { name as appName } from "./app.json";
import App from "./App";
import messaging from "@react-native-firebase/messaging";
import { onDisplayNotification } from "./src/Utils/NotificationsServices";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Register background handler
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  onDisplayNotification(remoteMessage.notification.body, remoteMessage.notification.title);
});

AppRegistry.registerComponent(appName, () => App);
