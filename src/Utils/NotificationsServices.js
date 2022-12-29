import { firebase } from "@react-native-firebase/messaging";
import messaging from "@react-native-firebase/messaging";
import AsyncStorage from "@react-native-async-storage/async-storage";
import notifee from '@notifee/react-native';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    getFcmToken(); // Call Here For FCM Token
  }
}

 export const getFcmToken = async () => {
  let fcmToken = await AsyncStorage.getItem("fcmToken");
  if (!fcmToken) {
    try {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        await AsyncStorage.setItem("fcmToken", fcmToken);
      }
    } catch (error) {
      alert(error.message);
    }
  }
};

export const NotificationListener = async () => {
  messaging().onNotificationOpenedApp((remoteMessage) => {
    
  });

  // ************ Foreground Message Received ************
  messaging().onMessage(async (remoteMessage) => {
    console.log("==== Msg Received in Foreground ====", remoteMessage);
    const { title, body } = remoteMessage.notification;
    onDisplayNotification(body,title);
  });

 


  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then((remoteMessage) => {
      if (remoteMessage) {
        console.log(
          "Notification caused app to open from quit state:",
          remoteMessage.notification
        );
      }
    });
};

export async function onDisplayNotification(body,title) {
  const token=await AsyncStorage.getItem("token");
  if(token){

  
  // Request permissions (required for iOS)
  await notifee.requestPermission()

  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    sound: 'default',

  });

  // Display a notification
  await notifee.displayNotification({
    title: title,
    body: body,
    android: {
      channelId,
      // pressAction is needed if you want the notification to open the app when pressed
      pressAction: {
        id: 'default',
      },
    },
  });
}
}
