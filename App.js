import React, { useState, useEffect } from "react";
import { Dimensions, Image, StyleSheet, View, StatusBar ,Text} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Routes from "./src/Navigation/Routes";
import AuthProvider from "./src/context/AuthContext";
import { ImagePath } from "./src/constants/ImagePath";
import { COLOR } from "./src/Utils/Colors";
import {
  requestUserPermission,
  NotificationListener,
} from "./src/Utils/NotificationsServices";
const { height, width } = Dimensions.get("screen");
import FlashMessage from "react-native-flash-message";

const App = (props) => {
  const [splasStatus, setSplasStatus] = React.useState(true);

  useEffect(() => {
    requestUserPermission();
    NotificationListener();
  }, []);

  useEffect(() => {
    if (Platform.OS === "android") {
      setTimeout(() => {
        setSplasStatus(false);
        console.log("running");
      }, 3000);
    } else {
      setTimeout(() => {
        setSplasStatus(false);
      }, 3000);
    }
  }, [props]);

  const [userAuth, setUserAuth] = useState("");
  useEffect(async () => {
    const userToken = await AsyncStorage.getItem("token");
    const logintype = await AsyncStorage.getItem("logintype");
    if(userToken&&logintype){
      setUserAuth(userToken);

    }

    console.log("usertoken ======", userAuth);
  }, [props]);

  // if (splasStatus === true && Platform.OS === "android") {
  //   return (
  //     <>
  //       <View style={styles.container}>
  //         <Image
  //           source={ImagePath.SHARE_CHING_LOGO}
  //           resizeMode="contain"
  //           style={{ height: height / 1.4, width: width / 1.2 }}
  //         />
  //       </View>
  //     </>
  //   );
  // }

  return (
    <>
      <StatusBar animated={true} backgroundColor="black" />
      {!splasStatus&&<View style={{ height: "100%", justifyContent: "center" }}>
        <AuthProvider>
          <View style={{ flex: 1, backgroundColor: COLOR.BLACK }}>
            <Routes authFlow={userAuth} />
            <FlashMessage position="top" />
          </View>
        </AuthProvider>
      </View>}
      {splasStatus === true&&<>
        <View style={styles.container}>
          <Image
            source={ImagePath.SHARE_CHING_LOGO}
            resizeMode="contain"
            style={{ height: height / 1.4, width: width / 1.2 }}
          />
        </View>
      </>}
    </>
  );
};
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLOR.BACKGROUND_THEME,
  },
});

// import { View, Text } from 'react-native'
// import React from 'react'

// const App = () => {
//   return (
//     <View>
//       <Text>App</Text>
//     </View>
//   )
// }

// export default App
