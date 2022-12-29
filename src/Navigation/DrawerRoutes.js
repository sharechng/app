// import * as React from "react";
// import {
//   View,
//   StyleSheet,
//   Dimensions,
//   Text,
//   Image,
//   TouchableOpacity,
// } from "react-native";
// import { NavigationContainer } from "@react-navigation/native";
// import {
//   createDrawerNavigator,
//   DrawerContentScrollView,
//   DrawerItemList,
//   DrawerItem,
// } from "@react-navigation/drawer";

// import Home from "../screens/Home/Home";
// import EditProfile from "../screens/EditProfile/EditProfile";
// import Blocking from "../screens/Blocking/Blocking";
// import Notifications from "../screens/Notifications/Notifications";
// import PasswordAndSecurity from "../screens/PasswordAndSecurity/PasswordAndSecurity";
// import ActivityLog from "../screens/ActivityLog/ActivityLog";
// import Creators from "../screens/Creators/Creators";
// import Explore from "../screens/Home/Home";
// import { COLOR } from "../Utils/Colors";
// import { ImagePath } from "../constants/ImagePath";
// import { scale, verticalScale } from "react-native-size-matters";
// const { height, width } = Dimensions.get("window");

// const Drawer = createDrawerNavigator();

// function CustomDrawerContent(props) {
//   return (
//     <DrawerContentScrollView {...props}>
//       <View style={styles.menuContainer}>
//         <View
//           style={[
//             styles.menuItemsCard,
//             {
//               backgroundColor: COLOR.BACKGROUND_THEME,
//               width: width * 0.8,
//               height: height * 1,
//             },
//           ]}
//         >
//           {/* ************ Profile Container ************ */}
//           <View style={styles.ProfileContainer}>
//             <View style={styles.ProfileImgContainer}>
//               <Image source={ImagePath.DRAWER_PROFILE_PICS} />
//             </View>
//             <View style={[styles.ProfileImgContainer, { width: width * 0.55 }]}>
//               <Text style={styles.ProfileNameTxt}>Umair Siddqui</Text>
//               <Text style={styles.ProfileEmailTxt}>
//                 de-umair@mobiloitte.com
//               </Text>
//             </View>
//           </View>

//           {/* ************ Drawer Icon Container ************ */}
//           <TouchableOpacity
//             onPress={() => props.navigation.navigate("Creators")}
//             style={styles.BtnTouchContainer}
//           >
//             <Image
//               source={ImagePath.CREATORS_DICON}
//               style={{ height: 23, width: 20 }}
//             />
//             <Text style={styles.BtnTxtTouch}>Creators</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             onPress={() => props.navigation.navigate("EditProfile")}
//             style={styles.BtnTouchContainer}
//           >
//             <Image
//               source={ImagePath.EDIT_PROFILE_DICON}
//               style={{ height: 23, width: 20 }}
//             />
//             <Text style={styles.BtnTxtTouch}>Edit Profile</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             onPress={() => props.navigation.navigate("Blocking")}
//             style={styles.BtnTouchContainer}
//           >
//             <Image
//               source={ImagePath.BLOCKING_DICON}
//               style={{ height: 23, width: 20 }}
//             />
//             <Text style={styles.BtnTxtTouch}>Blocking</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             onPress={() => props.navigation.navigate("NotificationsSettings")}
//             style={styles.BtnTouchContainer}
//           >
//             <Image
//               source={ImagePath.NOTIFICATIONS_DICON}
//               style={{ height: 23, width: 20 }}
//             />
//             <Text style={styles.BtnTxtTouch}>Notifications</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             onPress={() => props.navigation.navigate("PasswordAndSecurity")}
//             style={styles.BtnTouchContainer}
//           >
//             <Image
//               source={ImagePath.PASSWORD_SECURITY_DICON}
//               style={{ height: 23, width: 22 }}
//             />
//             <Text style={styles.BtnTxtTouch}>Password & Security</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             onPress={() => props.navigation.navigate("ActivityLog")}
//             style={styles.BtnTouchContainer}
//           >
//             <Image
//               source={ImagePath.ACTIVITY_LOG_DICON}
//               style={{ height: 23, width: 22 }}
//             />
//             <Text style={styles.BtnTxtTouch}>Activity Log</Text>
//           </TouchableOpacity>

//           <TouchableOpacity onPress={() => {}} style={styles.BtnTouchContainer}>
//             <Image
//               source={ImagePath.LOGOUT_DICON}
//               style={{ height: 23, width: 20 }}
//             />
//             <Text style={styles.BtnTxtTouch}>Logout</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </DrawerContentScrollView>
//   );
// }

// export default function DrawerRoutes(props) {
//   return (
//     <Drawer.Navigator
//       drawerContent={(props) => <CustomDrawerContent {...props} />}
//       screenOptions={{
//         headerShown: false,
//         drawerStyle: {
//           // backgroundColor: "white"
//         },
//       }}
//     >
//       <Drawer.Screen name="Explore" component={Explore} />
//       <Drawer.Screen name="Creators" component={Creators} />
//     </Drawer.Navigator>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   menuContainer: {
//     flex: 1,
//     flexDirection: "row",
//     justifyContent: "space-evenly",
//   },
//   menuItemsCard: {
//     // flexDirection: "column",
//     // justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 10,
//   },
//   circleContainer: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     padding: 10,
//   },

//   ProfileContainer: {
//     height: height * 0.12,
//     width: width * 0.8,
//     justifyContent: "center",
//     alignItems: "center",
//     flexDirection: "row",
//   },
//   ProfileImgContainer: {
//     height: height * 0.12,
//     width: width * 0.15,
//     justifyContent: "center",
//   },
//   BtnTouchContainer: {
//     height: height * 0.09,
//     width: width * 0.7,
//     alignItems: "center",
//     flexDirection: "row",
//     // marginTop: verticalScale(20),
//   },
//   BtnTxtTouch: {
//     color: COLOR.WHITE,
//     fontSize: scale(18),
//     fontFamily: "Montserrat-Medium",
//     marginLeft: verticalScale(25),
//   },
//   ProfileNameTxt: {
//     color: COLOR.WHITE,
//     fontSize: scale(18),
//     fontFamily: "Montserrat-SemiBold",
//   },
//   ProfileEmailTxt: {
//     color: "#D1D3D4",
//     fontSize: scale(11),
//     fontFamily: "Montserrat-Medium",
//   },
// });
import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Modal,
} from "react-native";
import { createDrawerNavigator, DrawerItem } from "@react-navigation/drawer";

import { COLOR } from "../Utils/Colors";
import { ImagePath } from "../constants/ImagePath";
import { scale, verticalScale } from "react-native-size-matters";
import AppButton from "../components/CustomButton/CustomButton";
const { height, width } = Dimensions.get("window");

const Drawer = createDrawerNavigator();

const DrawerRoutes = (props) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView>
      <View style={{ flexDirection: "row", width: "100%" }}>
        <View style={styles.mainView}>
          <View>
            <View style={{ flexDirection: "row", width: "100%" }}>
              <View style={{ width: "95%" }}>
                {/* ************ Profile Container ************ */}
                <View style={styles.ProfileContainer}>
                  <View style={styles.ProfileImgContainer}>
                    <Image source={ImagePath.DRAWER_PROFILE_PICS} />
                  </View>
                  <View
                    style={[
                      styles.ProfileImgContainer,
                      { width: width * 0.55 },
                    ]}
                  >
                    <Text style={styles.ProfileNameTxt}>Umair Siddqui</Text>
                    <Text style={styles.ProfileEmailTxt}>
                      de-umair@mobiloitte.com
                    </Text>
                  </View>
                </View>
                {/* *************** Drawer Tab Containers *************** */}
                <View style={{}}>
                  {/* *************** Drawer- Home Container *************** */}
                  <DrawerItem
                    label={() => (
                      <View style={styles.drawerMainView}>
                        <View style={styles.imgContainer}>
                          <Image source={ImagePath.CREATORS_DICON} />
                        </View>
                        <View style={styles.txtContainer}>
                          <Text style={styles.BtnTxtTouch}>Creators</Text>
                        </View>
                      </View>
                    )}
                    onPress={() => props.navigation.navigate("Creators")}
                  />

                  {/* *************** Drawer- My Cart Container *************** */}
                  <DrawerItem
                    label={() => (
                      <View style={styles.drawerMainView}>
                        <View style={styles.imgContainer}>
                          <Image
                            source={ImagePath.EDIT_PROFILE_DICON}
                            style={{ height: 23, width: 20 }}
                          />
                        </View>
                        <View style={styles.txtContainer}>
                          <Text style={styles.BtnTxtTouch}>Edit Profile</Text>
                        </View>
                      </View>
                    )}
                    onPress={() => props.navigation.navigate("EditProfile")}
                  />

                  {/* *************** Drawer- Orders Container *************** */}
                  <DrawerItem
                    label={() => (
                      <View style={styles.drawerMainView}>
                        <View style={styles.imgContainer}>
                          <Image
                            source={ImagePath.BLOCKING_DICON}
                            style={{ height: 23, width: 20 }}
                          />
                        </View>
                        <View style={styles.txtContainer}>
                          <Text style={styles.BtnTxtTouch}>Blocking</Text>
                        </View>
                      </View>
                    )}
                    onPress={() => props.navigation.navigate("Blocking")}
                  />

                  {/* *************** Drawer- Make Payment Container *************** */}
                  <DrawerItem
                    label={() => (
                      <View style={styles.drawerMainView}>
                        <View style={styles.imgContainer}>
                          <Image
                            source={ImagePath.NOTIFICATIONS_DICON}
                            style={{ height: 23, width: 20 }}
                          />
                        </View>
                        <View style={styles.txtContainer}>
                          <Text style={styles.BtnTxtTouch}>Notifications</Text>
                        </View>
                      </View>
                    )}
                    onPress={() =>
                      props.navigation.navigate("NotificationsSettings")
                    }
                  />

                  {/* *************** Drawer- Rewards Container *************** */}
                  <DrawerItem
                    label={() => (
                      <View style={styles.drawerMainView}>
                        <View style={styles.imgContainer}>
                          <Image
                            source={ImagePath.PASSWORD_SECURITY_DICON}
                            style={{ height: 21, width: 21 }}
                          />
                        </View>
                        <View style={styles.txtContainer}>
                          <Text style={styles.BtnTxtTouch}>
                            Password & Security
                          </Text>
                        </View>
                      </View>
                    )}
                    onPress={() =>
                      props.navigation.navigate("PasswordAndSecurity")
                    }
                  />

                  {/* *************** Drawer- Notifications Container *************** */}
                  <DrawerItem
                    label={() => (
                      <View style={styles.drawerMainView}>
                        <View style={styles.imgContainer}>
                          <Image
                            source={ImagePath.ACTIVITY_LOG_DICON}
                            style={{ height: 23, width: 22 }}
                          />
                        </View>
                        <View style={styles.txtContainer}>
                          <Text style={styles.BtnTxtTouch}>Activity Log</Text>
                        </View>
                      </View>
                    )}
                    onPress={() => props.navigation.navigate("ActivityLog")}
                  />

                  {/* *************** Drawer- Invite Friends Container *************** */}
                  <DrawerItem
                    label={() => (
                      <View style={styles.drawerMainView}>
                        <View style={styles.imgContainer}>
                          <Image
                            source={ImagePath.LOGOUT_DICON}
                            style={{ height: 23, width: 22 }}
                          />
                        </View>
                        <View style={styles.txtContainer}>
                          <Text style={styles.BtnTxtTouch}>Logout</Text>
                        </View>
                      </View>
                    )}
                    onPress={() => setModalVisible(true)}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => props.navigation.goBack()}
          // onPress={() => props.navigation.navigate("Home")}
          style={styles.drawerCloseContainer}
        ></TouchableOpacity>
      </View>

      {/* ************ Logout Confirmation Modal ************ */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.mainContainer}>
          <View style={styles.ModalSubContainer}>
            <View style={styles.HeadingContainer}>
              <View style={{ height: height * 0.07, justifyContent: "center" }}>
                <Text
                  style={[
                    styles.HeadingTxtContainer,
                    { fontFamily: "Montserrat-Bold", fontSize: scale(18) },
                  ]}
                >
                  Logout
                </Text>
              </View>
              <View style={{ height: height * 0.08, justifyContent: "center" }}>
                <Text
                  style={[
                    styles.HeadingTxtContainer,
                    { fontFamily: "Montserrat-Regular" },
                  ]}
                >
                  Are you sure, you want to Logout ?
                </Text>
              </View>

              <View style={styles.ButtonMainContainer}>
                <View style={styles.btnContainer}>
                  <AppButton
                    title="Yes"
                    type="small"
                    textStyle={{
                      fontFamily: "Montserrat-SemiBold",
                      fontSize: scale(14),
                    }}
                    ButtonPress={() => setModalVisible(!modalVisible)}
                  />
                </View>
                <View style={styles.btnContainer}>
                  <AppButton
                    title="No"
                    type="small"
                    textStyle={{
                      fontFamily: "Montserrat-SemiBold",
                      fontSize: scale(14),
                    }}
                    ButtonPress={() => props.navigation.goBack()}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};
export default DrawerRoutes;

const styles = StyleSheet.create({
  ProfileContainer: {
    height: height * 0.12,
    width: width * 0.8,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  ProfileImgContainer: {
    height: height * 0.12,
    width: width * 0.15,
    justifyContent: "center",
  },
  BtnTouchContainer: {
    height: height * 0.09,
    width: width * 0.7,
    alignItems: "center",
    flexDirection: "row",
    // marginTop: verticalScale(20),
  },
  BtnTxtTouch: {
    color: COLOR.WHITE,
    fontSize: scale(16),
    fontFamily: "Montserrat-Medium",
    // marginLeft: verticalScale(25),
  },
  ProfileNameTxt: {
    color: COLOR.WHITE,
    fontSize: scale(18),
    fontFamily: "Montserrat-SemiBold",
  },
  ProfileEmailTxt: {
    color: "#D1D3D4",
    fontSize: scale(11),
    fontFamily: "Montserrat-Medium",
  },
  lebeltext: {
    color: "#FFFFFF",
    width: width * 0.5,
    // fontFamily: "OpenSans-SemiBold",
    fontSize: scale(18),
  },
  Image: {
    height: height * 0.03,
    width: width * 0.55,
  },
  drawerMainView: {
    height: height * 0.05,
    width: width * 0.77,
    flexDirection: "row",
    justifyContent: "center",
    // backgroundColor: "red",
    margin: -verticalScale(7),
  },
  imgContainer: {
    height: height * 0.05,
    width: width * 0.15,
    justifyContent: "center",
  },
  txtContainer: {
    height: height * 0.05,
    width: width * 0.55,
    justifyContent: "center",
  },
  mainView: {
    // backgroundColor: "#02C3C5",
    height: height * 1,
    width: width * 0.8,
    backgroundColor: COLOR.BACKGROUND_THEME,
  },
  drawerLogoView: {
    height: height * 0.15,
    width: width * 0.8,
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "red",
  },
  drawerCloseContainer: {
    width: "25%",
    backgroundColor: COLOR.RIGHT_BORDER_WIDTH,
  },
  name: {
    fontSize: height / 35,
    color: "white",
    fontWeight: "800",
  },
  number: {
    fontSize: height / 44,
    color: "white",
    fontWeight: "400",
    marginTop: verticalScale(3),
  },

  // ********** Modal Styling **********
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  ModalMainContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: height * 1,
    backgroundColor: "rgba(0, 0, 0, 0.67)",
  },
  ModalSubContainer: {
    height: height * 0.2,
    width: width * 0.88,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: '#02C3C5'
  },
  HeadingContainer: {
    height: height * 0.28,
    width: width * 0.88,
    // backgroundColor: "#E3E3E3",
    backgroundColor: COLOR.TXT_INPT_COLOR,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  HeadingTxtContainer: {
    color: COLOR.WHITE,
    fontSize: scale(16),
    fontFamily: "Montserrat-SemiBold",
    // marginTop: height * 0.03,
  },
  ButtonMainContainer: {
    height: height * 0.09,
    width: width * 0.88,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  btnContainer: {
    height: height * 0.1,
    alignItems: "center",
    justifyContent: "center",
    width: width * 0.45,
  },
  buttonPressableView: {
    height: height * 0.055,
    width: width * 0.31,
    borderColor: "#000",
    borderRadius: height * 0.05,
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: COLOR.BUTTON_PINK,
  },
  ConfirmTxt: {
    color: "#fff",
    textAlign: "center",
    fontSize: scale(18),
    fontFamily: "Montserrat-Medium",
  },

  // container: {
  //   flex: 1,
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  // menuContainer: {
  //   flex: 1,
  //   flexDirection: "row",
  //   justifyContent: "space-evenly",
  // },
  // menuItemsCard: {
  //   // flexDirection: "column",
  //   // justifyContent: "center",
  //   alignItems: "center",
  //   borderRadius: 10,
  // },
  // circleContainer: {
  //   width: 50,
  //   height: 50,
  //   borderRadius: 25,
  //   padding: 10,
  // },
});
