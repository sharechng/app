import { StyleSheet, Dimensions, Platform } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
const { height, width } = Dimensions.get("window");

import { COLOR } from "../../Utils/Colors";

const styles = StyleSheet.create({
  HeaderContainer: {
    height: height * 0.1, // 0.08
    width: width * 1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    borderBottomWidth: 1.5,
    borderBottomColor: COLOR.HEADER_BORDER_COLOR,
  },
  MainContainer: {
    flex: 1,
    backgroundColor: "pink",
  },
  backgroundVideo: {
    height: height,
    width: width,
  },
  ReelsTxtContainer: {
    justifyContent: "center",
    height: height * 0.1, // 0.08
    width: width * 0.47,
    justifyContent: "center",
  },
  CameraImgContainer: {
    justifyContent: "center",
    height: height * 0.1, // 0.08
    width: width * 0.47,
    alignItems: "flex-end",
  },
  ProfileNameTxt: {
    marginHorizontal: 8,
    color: COLOR.WHITE,
    fontFamily: "Montserrat-SemiBold",
    fontSize: height / 59,
  },
  FollowButtonContainer: {
    height: 30,
    width: 85,
    borderWidth: 1,
    borderColor: COLOR.WHITE,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  FollowTxt: {
    color: COLOR.WHITE,
    fontFamily: "Montserrat-SemiBold",
    fontSize: height / 59,
  },
  BottomViewContainer: {
    flex: 1,
    justifyContent: "flex-end",
    bottom: 10,
    position: "absolute",
    margin: 16,
  },
  ImgViewContainer: {
    height: 45, // 35
    width: 30,
    justifyContent: "center",
    alignItems: "center",
  },

  // ************ Short Modal Styling ************
  inputCardModal: {
    width: width * 0.4,
    borderRadius: 3,
    backgroundColor: COLOR.BOTTOM_SHEET_BG_CLR,
    shadowOpacity: 0.8,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "grey",
    marginVertical: Platform.OS == "ios" ? 300 : 350,
    marginHorizontal: 20,
    elevation: 2,
    alignSelf: "flex-end",
  },
  inputCardModalTwo: {
    width: width * 0.4,
    borderRadius: 3,
    backgroundColor: COLOR.BOTTOM_SHEET_BG_CLR,
    shadowOpacity: 0.8,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "grey",
    marginVertical: Platform.OS == "ios" ? 70 : 60,
    elevation: 2,
    alignSelf: "flex-end",
  },
  ShareTxtContainer: {
    width: width * 0.4,
    // marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#272626",
    flexDirection: "row",
    // marginVertical: 10,
    paddingBottom: 1,
    // backgroundColor: "red",
    height: 44,
    justifyContent: "space-around",
    alignItems: "center",
  },
  ShareImgContainer: {
    marginHorizontal: 15,
    height: 15,
    width: 15,
    justifyContent: "center",
    top: 3,
  },
  ReportTxtContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#272626",
    flexDirection: "row",
    paddingBottom: 5,
    height: 44,
  },
  ReportImgContainer: {
    marginHorizontal: 15,
    height: 20,
    width: 15,
    justifyContent: "center",
  },
  BlockImgContainer: {
    marginHorizontal: 15,
    height: 20,
    width: 20,
    alignSelf: "center",
  },
  ModalOneTxtView: {
    width: width * 0.28, // 0.28
    height: height * 0.06,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  ModalOneTxt: {
    fontSize: height / 59,
    color: COLOR.WHITE,
    fontFamily: "Montserrat-Regular",
    marginLeft: moderateScale(10),
  },
  ModalOneImgView: {
    width: width * 0.12,
    // backgroundColor: "red",
    height: height * 0.05,
    justifyContent: "center",
    alignItems: "center",
  },

  // ********** Report Modal Styling *********
  ReportModalOne: {
    flex: 1,
    justifyContent: "center",
    // backgroundColor: "rgba(35, 54, 18, 0.8)",
    // backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  ReportModalMainContainer: {
    justifyContent: "center",
    width: Platform.OS == "ios" ? width - 90 : width - 105,
    height: Platform.OS == "ios" ? height / 4 : height / 4.5,
    backgroundColor: COLOR.TXT_INPT_COLOR,
    borderRadius: 6,
    // top: (200),
    alignSelf: "center",
    // justifyContent: 'space-between'
  },
  ReportModalAlertTxt: {
    color: COLOR.WHITE,
    fontSize: 18,
    textAlign: "center",
    fontFamily: "Montserrat-SemiBold",
  },
  ReportModalConfirm: {
    // color: "#525252",
    color: COLOR.WHITE,
    fontSize: 16,
    textAlign: "center",
    lineHeight: 25,
    fontFamily: "Montserrat-Regular",
  },
  ReportModalContainerTwo: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopColor: "#969696",
    borderTopWidth: 0.7,
    height: 50,
    marginHorizontal: 5,
  },
  ReportModalCancelTxt: {
    fontSize: 15,
    fontFamily: "Montserrat-SemiBold",
    // color: "#548726",
    color: COLOR.WHITE,
    borderRadius: 0,
    overflow: "hidden",
    textAlign: "center",
  },
  ReportModalReportTxt: {
    fontSize: 15,
    fontFamily: "Montserrat-SemiBold",
    // color: "#548726",
    color: COLOR.WHITE,
    overflow: "hidden",
    width: 100,
    textAlign: "center",
  },
  ShareReportBlockTxt: {
    fontSize: 15,
    textAlign: "center",
    color: COLOR.WHITE,
    fontFamily: "Montserrat-Medium",
  },
  // -=-=-=-= Bottom sheet -=-=-=-=-=
  header: {
    backgroundColor: "white",
    shadowColor: "#333333",
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00000040",
    marginBottom: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: COLOR.BOTTOM_SHEET_BG_CLR,
    paddingTop: 20,
  },
  panelTitle: {
    fontSize: height / 30,
    height: 35,
    color: COLOR.TXT_COLOR,
    fontFamily: "Montserrat-SemiBold",
  },
  panelSubtitle: {
    fontSize: height / 50,
    color: COLOR.TXT_COLOR,
    height: 30,
    marginBottom: 10,
    fontFamily: "Montserrat-Medium",
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: COLOR.BUTTON_PINK,
    alignItems: "center",
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: height / 45,
    fontWeight: "bold",
    color: COLOR.WHITE,
  },
  MainContainerSheet: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  DataTxt: {
    marginRight: verticalScale(10),
    color: COLOR.WHITE,
    fontFamily: "Montserrat-Medium",
    fontSize: height / 68,
  },
  // -=-=-=-=
  BtnMainContainer: {
    height: 45,
    // width: width * 0.92,
    justifyContent: "center",
  },
  BtnTxt: {
    color: COLOR.WHITE,
    fontSize: height / 45,
    fontFamily: "Montserrat-Medium",
  },
});

export default styles;
// // import React, { useState, useRef, useEffect } from "react";
// // import {
// //   Dimensions,
// //   StyleSheet,
// //   Text,
// //   View,
// //   Image,
// //   TouchableOpacity,
// //   SafeAreaView,
// //   Modal,
// //   Alert,
// //   Share,
// // } from "react-native";
// // const { height, width } = Dimensions.get("window");

// // import Video from "react-native-video";
// // import { COLOR } from "../../Utils/Colors";
// // import { ImagePath } from "../../constants/ImagePath";
// // import { moderateScale, scale, verticalScale } from "react-native-size-matters";
// // import { SwiperFlatList } from "react-native-swiper-flatlist";
// // import { Data } from "../../Utils/Data";
// // import ImagePicker from "react-native-image-crop-picker";
// // import { androidCameraPermission } from "../../Utils/Permissions";

// // const VideoReels = (props) => {
// //   const [modalVisible, setModalVisible] = useState(false);
// //   const [modalVisible2, setModalVisible2] = useState(false);

// //   const [currentIndex, setCurrentIndex] = useState(0);
// //   const videoRef = useRef(null);
// //   const [imageUrlPath, setImageUrlPath] = useState();
// //   console.log("===== Image Url State =====", imageUrlPath);

// //   const [iAgree, setIAgree] = useState(true);
// //   const toggleIAgree = () => {
// //     setIAgree(false);
// //   };

// //   const _toggleIAgree = () => {
// //     setIAgree(true);
// //   };

// //   // ************* On Select Image Picker *************
// //   const onSelectImage = async () => {
// //     const permissionStatus = await androidCameraPermission();
// //     if (permissionStatus || Platform.OS == "ios") {
// //       Alert.alert("Upload Post", "Choose an options", [
// //         { text: "Camera", onPress: onCamera },
// //         { text: "Gallary", onPress: onGallary },
// //         { text: "Cancel", onPress: () => {} },
// //       ]);
// //     }
// //   };

// //   // ************* On Camera Picker *************
// //   const onCamera = () => {
// //     ImagePicker.openCamera({
// //       width: 300,
// //       height: 400,
// //       cropping: true,
// //     }).then((image) => {
// //       console.log("===== Open Camera =====", image);
// //       setImageUrlPath(image.path);
// //       props.navigation.navigate("CreatePost", {
// //         imageUrlPath: imageUrlPath,
// //       });
// //     });
// //   };

// //   // ************* On Gallary Picker *************
// //   const onGallary = () => {
// //     ImagePicker.openPicker({
// //       width: 300,
// //       height: 400,
// //       cropping: true,
// //     }).then((image) => {
// //       console.log("selected image", image);
// //       setImageUrlPath(image.path);
// //       props.navigation.navigate("CreatePost", { imageUrlPath: imageUrlPath });
// //     });
// //   };

// //   // ******************** Share Message Functionality ********************
// //   const ShareMessage = async () => {
// //     try {
// //       const result = await Share.share({
// //         // message: myReferralCode?.referralCode, // Dynamic Message
// //         message: "Social App", // Static Message
// //       });
// //       if (result.action === Share.sharedAction) {
// //         if (result.activityType) {
// //           // myReferralCode?.referralCode; // Dynamic Message
// //           ("Social App");
// //         } else {
// //           // shared
// //         }
// //       } else if (result.action === Share.dismissedAction) {
// //         // dismissed
// //       }
// //     } catch (error) {
// //       alert(error.message);
// //       Alert.alert("Social link is required to share");
// //     }
// //   };

// //   const onBuffer = (e) => {
// //     console.log("=== Buffering =====", e);
// //   };
// //   const onError = (e) => {
// //     console.log("=== Error Message =====", e);
// //   };

// //   useEffect(() => {
// //     console.log("====== Video ref =====", videoRef);
// //     if (!!videoRef.current) {
// //       videoRef.current.seek(0);
// //     }
// //   }, [currentIndex]);

// //   const renderItem = ({ item, index }) => {
// //     console.log("===== logger two =====", item);
// //     return (
// //       <View style={{ height: height * 0.9, bottom: 10 }}>
// //         <Video
// //           source={{ uri: item?.url }}
// //           poster={item.thumb}
// //           posterResizeMode="cover"
// //           ref={videoRef}
// //           onBuffer={onBuffer()}
// //           onError={onError()}
// //           style={styles.backgroundVideo}
// //           resizeMode="cover"
// //           repeat
// //           paused={currentIndex !== index}
// //         />
// //         <View
// //           style={{
// //             alignItems: "flex-end",
// //             top: 390,
// //             right: 16,
// //             position: "absolute",
// //           }}
// //         >
// //           <TouchableOpacity
// //             style={styles.ImgViewContainer}
// //             onPress={() => (iAgree ? toggleIAgree() : _toggleIAgree())}
// //           >
// //             <Image
// //               // source={ImagePath.REEL_LIKE}
// //               source={iAgree ? ImagePath.REEL_LIKE : ImagePath.HEART_LIKE}
// //               style={{}}
// //             />
// //           </TouchableOpacity>
// //           <Text
// //             style={{
// //               marginLeft: verticalScale(4),
// //               color: COLOR.WHITE,
// //               fontFamily: "Montserrat-Medium",
// //               fontSize: scale(10),
// //             }}
// //           >
// //             886k
// //           </Text>

// //           <TouchableOpacity
// //             style={styles.ImgViewContainer}
// //             onPress={() => props.navigation.navigate("Comments")}
// //           >
// //             <Image source={ImagePath.REEL_COMMENT} />
// //           </TouchableOpacity>
// //           <Text
// //             style={{
// //               marginLeft: verticalScale(4),
// //               color: COLOR.WHITE,
// //               fontFamily: "Montserrat-Medium",
// //               fontSize: scale(10),
// //             }}
// //           >
// //             1,879
// //           </Text>

// //           <TouchableOpacity
// //             style={styles.ImgViewContainer}
// //             onPress={() => ShareMessage()}
// //           >
// //             <Image
// //               source={ImagePath.REEL_SEND}
// //               style={{ height: 18, width: 18 }}
// //             />
// //           </TouchableOpacity>

// //           <TouchableOpacity
// //             style={styles.ImgViewContainer}
// //             onPress={() => setModalVisible(true)}
// //           >
// //             <Image source={ImagePath.VERTICAL_MORE} resizeMode="contain" />
// //           </TouchableOpacity>
// //         </View>

// //         {/* ************ Bottom View Container ************ */}
// //         <View style={styles.BottomViewContainer}>
// //           {/* ************ Profile Container ************ */}
// //           <View style={{ flexDirection: "row", alignItems: "center" }}>
// //             <Image
// //               source={ImagePath.PROFILE_PIC}
// //               style={{ height: 50, width: 50 }}
// //             />
// //             <Text style={styles.ProfileNameTxt}>Ashish Ojha</Text>
// //             <TouchableOpacity
// //               style={styles.FollowButtonContainer}
// //               onPress={() => {}}
// //             >
// //               <Text style={styles.FollowTxt}>Follow</Text>
// //             </TouchableOpacity>
// //           </View>

// //           {/* ************ Description Text Container ************ */}
// //           <View style={{ flexDirection: "row" }}>
// //             <Text
// //               numberOfLines={1}
// //               style={{
// //                 flex: 1,
// //                 color: COLOR.WHITE,
// //                 fontFamily: "Montserrat-Regular",
// //               }}
// //             >
// //               Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
// //               eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
// //               enim ad minim veniam
// //             </Text>
// //             <TouchableOpacity>
// //               <Text
// //                 style={{ color: "#1e90ff", fontFamily: "Montserrat-Regular" }}
// //               >
// //                 More
// //               </Text>
// //             </TouchableOpacity>
// //           </View>
// //         </View>
// //       </View>
// //     );
// //   };

// //   const onChangeIndex = ({ index }) => {
// //     setCurrentIndex(index);
// //   };

// //   return (
// //     <>
// //       <View
// //         style={{
// //           flex: 1,
// //           height: height * 0.9,
// //           // width: width * 1,
// //         }}
// //       >
// //         <View style={{ height: height * 0.89 }}>
// //           <SwiperFlatList
// //             style={{}}
// //             vertical={true}
// //             data={Data}
// //             renderItem={renderItem}
// //             keyExtractor={(item, index) => index.toString()}
// //             onChangeIndex={onChangeIndex}
// //           />
// //         </View>

// //         {/* ************ Reels and Camera Container ************ */}

// //         <View style={{ top: 20, left: 16, position: "absolute" }}>
// //           <Text
// //             style={{
// //               fontSize: scale(15),
// //               fontFamily: "Montserrat-SemiBold",
// //               color: COLOR.WHITE,
// //             }}
// //           >
// //             Reels
// //           </Text>
// //         </View>
// //         <View style={{ top: 15, right: 16, position: "absolute" }}>
// //           <TouchableOpacity onPress={() => onSelectImage()}>
// //             <Image
// //               source={ImagePath.CAMERA_ICON}
// //               style={{ height: 36, width: 36, tintColor: COLOR.WHITE }}
// //             />
// //           </TouchableOpacity>
// //         </View>
// //       </View>

// //       {/* *************** Options to Report and Block Modal *************** */}
// //       <View style={{}}>
// //         {/* <TouchableOpacity> */}
// //         <Modal animationType="none" transparent={true} visible={modalVisible}>
// //           <TouchableOpacity
// //             onPress={() => setModalVisible(false)}
// //             style={{
// //               height: height * 1,
// //               width: width * 1,
// //               backgroundColor: "rgba(0,0,0,0.4)",
// //             }}
// //           >
// //             <View style={[styles.inputCardModal]}>
// //               <TouchableOpacity
// //                 onPress={() => {
// //                   setModalVisible2(true), setModalVisible(false);
// //                 }}
// //               >
// //                 <View style={styles.ReportTxtContainer}>
// //                   <View style={styles.ModalOneTxtView}>
// //                     <Text style={styles.ModalOneTxt}>{"Report"}</Text>
// //                   </View>
// //                   <View style={styles.ModalOneImgView}>
// //                     <Image
// //                       style={[
// //                         styles.ShareImgContainer,
// //                         {
// //                           height: 18,
// //                           width: 20,
// //                         },
// //                       ]}
// //                       source={ImagePath.REPORT} // Share
// //                       resizeMode="contain"
// //                     />
// //                   </View>
// //                 </View>
// //               </TouchableOpacity>
// //             </View>
// //           </TouchableOpacity>
// //         </Modal>
// //         {/* </TouchableOpacity> */}
// //       </View>

// //       {/* *************** Report Modal *************** */}
// //       <View>
// //         <Modal visible={modalVisible2} transparent={true}>
// //           <TouchableOpacity
// //             onPress={() => setModalVisible2(false)}
// //             style={{
// //               height: height * 1,
// //               width: width * 1,
// //               backgroundColor: "rgba(0,0,0,0.4)",
// //             }}
// //           >
// //             <View style={styles.ReportModalOne}>
// //               <View style={styles.ReportModalMainContainer}>
// //                 <View style={{ marginTop: 20 }}>
// //                   <Text style={styles.ReportModalAlertTxt}>{"Alert"}</Text>
// //                 </View>
// //                 <View style={{ alignSelf: "center", marginVertical: 10 }}>
// //                   <Text style={styles.ReportModalConfirm}>
// //                     {"Are you sure you want to report?"}
// //                   </Text>
// //                 </View>

// //                 <View style={styles.ReportModalContainerTwo}>
// //                   <View style={{ justifyContent: "center", width: 100 }}>
// //                     <TouchableOpacity onPress={() => setModalVisible2(false)}>
// //                       <Text style={styles.ReportModalCancelTxt}>
// //                         {"Cancel"}
// //                       </Text>
// //                     </TouchableOpacity>
// //                   </View>

// //                   <View
// //                     style={{
// //                       borderRightColor: "#969696",
// //                       borderRightWidth: 0.5,
// //                       height: 40,
// //                     }}
// //                   ></View>
// //                   <TouchableOpacity
// //                     style={{ width: 100 }}
// //                     // onPress={() =>
// //                     //   this.setState({
// //                     //     modalVisible1: false,
// //                     //     modalVisible6: true,
// //                     //   })
// //                     // }
// //                     onPress={() => {
// //                       setModalVisible2(false),
// //                         Alert.alert("You have report profile successfully");
// //                     }}
// //                   >
// //                     <Text style={styles.ReportModalReportTxt}>{"Report"}</Text>
// //                   </TouchableOpacity>
// //                 </View>
// //               </View>
// //             </View>
// //           </TouchableOpacity>
// //         </Modal>
// //       </View>
// //     </>
// //   );
// // };

// // export default VideoReels;

// // const styles = StyleSheet.create({
// //   HeaderContainer: {
// //     height: height * 0.1, // 0.08
// //     width: width * 1,
// //     alignItems: "center",
// //     flexDirection: "row",
// //     justifyContent: "center",
// //     borderBottomWidth: 1.5,
// //     borderBottomColor: COLOR.HEADER_BORDER_COLOR,
// //   },
// //   MainContainer: {
// //     flex: 1,
// //     backgroundColor: "pink",
// //     // height: height * 1,
// //     // width: width * 1,
// //     // alignItems: "center",
// //     // backgroundColor: COLOR.BACKGROUND_THEME,
// //   },
// //   backgroundVideo: {
// //     height: height,
// //     width: width,
// //     // position: "absolute",
// //     // top: 0,
// //     // left: 0,
// //     // bottom: 0,
// //     // right: 0,
// //   },
// //   ReelsTxtContainer: {
// //     justifyContent: "center",
// //     height: height * 0.1, // 0.08
// //     width: width * 0.47,
// //     justifyContent: "center",
// //   },
// //   CameraImgContainer: {
// //     justifyContent: "center",
// //     height: height * 0.1, // 0.08
// //     width: width * 0.47,
// //     alignItems: "flex-end",
// //   },
// //   ProfileNameTxt: {
// //     marginHorizontal: 8,
// //     color: COLOR.WHITE,
// //     fontFamily: "Montserrat-SemiBold",
// //     fontSize: scale(14),
// //   },
// //   FollowButtonContainer: {
// //     height: 30,
// //     width: 85,
// //     borderWidth: 1,
// //     borderColor: COLOR.WHITE,
// //     justifyContent: "center",
// //     alignItems: "center",
// //     borderRadius: 5,
// //   },
// //   FollowTxt: {
// //     color: COLOR.WHITE,
// //     fontFamily: "Montserrat-SemiBold",
// //     fontSize: scale(14),
// //   },
// //   BottomViewContainer: {
// //     flex: 1,
// //     justifyContent: "flex-end",
// //     bottom: 20,
// //     position: "absolute",
// //     margin: 16,
// //   },
// //   ImgViewContainer: {
// //     height: 45, // 35
// //     width: 30,
// //     // backgroundColor: "red",
// //     justifyContent: "center",
// //     alignItems: "center",
// //   },

// //   // ************ Short Modal Styling ************
// //   inputCardModal: {
// //     width: width * 0.4,
// //     borderRadius: 3,
// //     backgroundColor: COLOR.BOTTOM_SHEET_BG_CLR,
// //     shadowOpacity: 0.8,
// //     shadowOffset: { width: 1, height: 1 },
// //     shadowColor: "grey",
// //     marginVertical: Platform.OS == "ios" ? 300 : 350,
// //     marginHorizontal: 20,
// //     elevation: 2,
// //     alignSelf: "flex-end",
// //   },
// //   inputCardModalTwo: {
// //     width: width * 0.4,
// //     borderRadius: 3,
// //     backgroundColor: COLOR.BOTTOM_SHEET_BG_CLR,
// //     shadowOpacity: 0.8,
// //     shadowOffset: { width: 1, height: 1 },
// //     shadowColor: "grey",
// //     marginVertical: Platform.OS == "ios" ? 70 : 60,
// //     // marginHorizontal: 20,
// //     elevation: 2,
// //     alignSelf: "flex-end",
// //   },
// //   ShareTxtContainer: {
// //     width: width * 0.4,
// //     // marginVertical: 10,
// //     borderBottomWidth: 1,
// //     borderBottomColor: "#272626",
// //     flexDirection: "row",
// //     // marginVertical: 10,
// //     paddingBottom: 1,
// //     // backgroundColor: "red",
// //     height: 44,
// //     justifyContent: "space-around",
// //     alignItems: "center",
// //   },
// //   ShareImgContainer: {
// //     marginHorizontal: 15,
// //     height: 15,
// //     width: 15,
// //     justifyContent: "center",
// //     top: 3,
// //   },
// //   ReportTxtContainer: {
// //     borderBottomWidth: 1,
// //     borderBottomColor: "#272626",
// //     flexDirection: "row",
// //     paddingBottom: 5,
// //     height: 44,
// //   },
// //   ReportImgContainer: {
// //     marginHorizontal: 15,
// //     height: 20,
// //     width: 15,
// //     justifyContent: "center",
// //   },
// //   BlockImgContainer: {
// //     marginHorizontal: 15,
// //     height: 20,
// //     width: 20,
// //     alignSelf: "center",
// //   },
// //   ModalOneTxtView: {
// //     width: width * 0.28, // 0.28
// //     height: height * 0.06,
// //     justifyContent: "center",
// //     flexDirection: "row",
// //     alignItems: "center",
// //   },
// //   ModalOneTxt: {
// //     fontSize: scale(14),
// //     color: COLOR.WHITE,
// //     fontFamily: "Montserrat-Regular",
// //     marginLeft: moderateScale(10),
// //   },
// //   ModalOneImgView: {
// //     width: width * 0.12,
// //     // backgroundColor: "red",
// //     height: height * 0.05,
// //     justifyContent: "center",
// //     alignItems: "center",
// //   },

// //   // ********** Report Modal Styling *********
// //   ReportModalOne: {
// //     flex: 1,
// //     justifyContent: "center",
// //     // backgroundColor: "rgba(35, 54, 18, 0.8)",
// //     // backgroundColor: "rgba(0, 0, 0, 0.6)",
// //   },
// //   ReportModalMainContainer: {
// //     justifyContent: "center",
// //     width: Platform.OS == "ios" ? width - 90 : width - 105,
// //     height: Platform.OS == "ios" ? height / 4 : height / 4.5,
// //     backgroundColor: COLOR.TXT_INPT_COLOR,
// //     borderRadius: 6,
// //     // top: (200),
// //     alignSelf: "center",
// //     // justifyContent: 'space-between'
// //   },
// //   ReportModalAlertTxt: {
// //     color: COLOR.WHITE,
// //     fontSize: 18,
// //     textAlign: "center",
// //     fontFamily: "Montserrat-SemiBold",
// //   },
// //   ReportModalConfirm: {
// //     // color: "#525252",
// //     color: COLOR.WHITE,
// //     fontSize: 16,
// //     textAlign: "center",
// //     lineHeight: 25,
// //     fontFamily: "Montserrat-Regular",
// //   },
// //   ReportModalContainerTwo: {
// //     flexDirection: "row",
// //     justifyContent: "space-around",
// //     alignItems: "center",
// //     borderTopColor: "#969696",
// //     borderTopWidth: 0.7,
// //     height: 50,
// //     marginHorizontal: 5,
// //   },
// //   ReportModalCancelTxt: {
// //     fontSize: 15,
// //     fontFamily: "Montserrat-SemiBold",
// //     // color: "#548726",
// //     color: COLOR.WHITE,
// //     borderRadius: 0,
// //     overflow: "hidden",
// //     textAlign: "center",
// //   },
// //   ReportModalReportTxt: {
// //     fontSize: 15,
// //     fontFamily: "Montserrat-SemiBold",
// //     // color: "#548726",
// //     color: COLOR.WHITE,
// //     overflow: "hidden",
// //     width: 100,
// //     textAlign: "center",
// //   },
// //   ShareReportBlockTxt: {
// //     fontSize: 15,
// //     textAlign: "center",
// //     color: COLOR.WHITE,
// //     fontFamily: "Montserrat-Medium",
// //   },
// // });

// import React, { useState, useRef, useEffect } from "react";
// import {
//   Dimensions,
//   Text,
//   View,
//   Image,
//   TouchableOpacity,
//   SafeAreaView,
//   Modal,
//   Alert,
//   Share,
// } from "react-native";
// const { height, width } = Dimensions.get("window");
// import styles from "./Styles";

// import Video from "react-native-video";
// import { COLOR } from "../../Utils/Colors";
// import { ImagePath } from "../../constants/ImagePath";
// import { SwiperFlatList } from "react-native-swiper-flatlist";
// import RBSheet from "react-native-raw-bottom-sheet";
// import {
//   AddNewReelsUrl,
//   FollowUnFollowUserUrl,
//   LikeUnLikeReelsUrl,
//   ReelsListUrl,
//   ReportOnReelsUrl,
//   ReelsShareUrl,
//   UploadFileUrl,
// } from "../../restAPI/ApiConfig";
// import axios from "axios";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { androidCameraPermission } from "../../Utils/Permissions";
// // import ImagePicker from "react-native-image-crop-picker";
// import { launchCamera, launchImageLibrary } from "react-native-image-picker";

// const options = {
//   title: "Select Image",
//   type: "library",
//   options: {
//     maxHeight: 200,
//     maxWidth: 200,
//     selectionLimit: 1,
//     mediaType: "photo",
//     // includeBase64: false,
//   },
// };

// const VideoReels = (props) => {
//   const refRBSheet = useRef();
//   const refRBSheet2 = useRef();
//   const [loader, setLoader] = useState(false);
//   const [reelsUrl, setReelsUrl] = useState([]);
//   const [ImgFileBase, setImgFileBase] = useState("");
//   // console.log("==== ImgFileBasesfjdksjfdskfgdskdgsfh ====", ImgFileBase);

//   const [modalVisible, setModalVisible] = useState(false);
//   const [modalVisible2, setModalVisible2] = useState(false);

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const videoRef = useRef(null);
//   const [imageUrlPath, setImageUrlPath] = useState();
//   const [reelsListing, setReelsListing] = useState([]);
//   const [reels, setReels] = useState([]);
//   const [newPushReels, setNewPushReels] = useState([]);
//   const [videoPath, setVideoPath] = useState("");
//   const [reelsId, setReelsId] = useState();
//   const [ParticularReelsId, setParticularReelsId] = useState("");

//   const [uploadFile, setUploadFile] = useState("");
//   const [data, setData] = useState("");
//   const [imageResponse, setImageResponse] = useState("");
//   const [uploadImage, setUploadImage] = useState("");

//   const [iAgree, setIAgree] = useState(true);
//   const toggleIAgree = (item_id) => {
//     console.log("-=-=-==-=-index toggle IAgree=-=-=-=->", item_id);
//     setIAgree(false);
//     LikeReelsApi(item_id);
//   };
//   const _toggleIAgree = (item_id) => {
//     console.log("-=-=-==-=-index _toggle IAgree 222=-=-=-=->", item_id);
//     setIAgree(true);
//     LikeReelsApi(item_id);
//   };

//   const onSelectImage = async () => {
//     const permissionStatus = await androidCameraPermission();
//     if (permissionStatus || Platform.OS == "ios") {
//       Alert.alert("Profile Pictures", "Choose an options", [
//         { text: "Camera", onPress: onCamera },
//         { text: "Gallary", onPress: onGallary },
//         { text: "Cancel", onPress: () => {} },
//       ]);
//     }
//   };

//   // ************* On Camera Picker *************
//   const onCamera = async () => {
//     // ImagePicker.openCamera({
//     //   height: 150,
//     //   width: 150,
//     //   cropping: true,
//     // }).then((video) => {
//     //   console.log("=== Record Video ===", video);
//     //   setVideoPath(video);
//     //   UploadVideoToBase64(video);
//     //   // UploadReels(video?.path);
//     //   refRBSheet.current.close();
//     // });
//   };

//   // ************* On Gallary Picker *************

//   const onGallary = async () => {
//     // ImagePicker.openPicker({
//     //   height: 150,
//     //   width: 150,
//     // }).then((video) => {
//     //   console.log("===Video from Gallary", video);
//     //   // setVideoPath(video);
//     //   // UploadVideoToBase64(video.path);
//     //   // UploadReels(video?.path);
//     //   // refRBSheet.current.close();
//     // });

//     // }
//     const images = await launchImageLibrary(options);
//     // console.log("----- Hlo image -----", images.assets[0]); // ios
//     console.log("----- Hlo image -----", images);

//     // const formData = new FormData();
//     // formData.append("uploaded_file", {
//     //   uri: images.assets[0].uri,
//     //   type: images.assets[0].type,
//     //   name: images.assets[0].fileName,
//     // });

//     // let res = await fetch(UploadFileUrl, {
//     //   method: "post",
//     //   body: formData,
//     //   headers: {
//     //     "Content-Type": "multipart/form-data; ",
//     //   },
//     // });
//     // let responseJson = await res.json();
//     // console.log("----ashish ----", responseJson);
//   };

//   // ************* Share Message Functionality *************
//   const ShareMessage = async () => {
//     reelsUrl?.map(async (data) => {
//       console.log("==== share link 22 ====", data);
//       try {
//         const result = await Share.share({
//           message: data,
//         });
//         if (result.action === Share.sharedAction) {
//           if (result.activityType) {
//             data;
//           } else {
//           }
//         } else if (result.action === Share.dismissedAction) {
//         }
//       } catch (error) {
//         alert(error.message);
//         Alert.alert("Social link is required to share");
//       }
//     });
//   };

//   const onBuffer = (e) => {};
//   const onError = (e) => {};

//   useEffect(() => {
//     if (!!videoRef.current) {
//       videoRef.current.seek(0);
//     }
//   }, [currentIndex]);

//   const renderItem = ({ item, index }) => {
//     return (
//       <View style={{ flex: 1, height: height * 0.9 }}>
//         {reelsListing.map((item) => {
//           return (
//             <View>
//               <Video
//                 source={{ uri: item?.reelsurl[0] }}
//                 poster={item.thumb}
//                 posterResizeMode="cover"
//                 ref={videoRef}
//                 onBuffer={onBuffer()}
//                 onError={onError()}
//                 style={styles.backgroundVideo}
//                 resizeMode="cover"
//                 repeat
//                 paused={currentIndex !== index}
//               />
//             </View>
//           );
//         })}

//         <View
//           style={{
//             alignItems: "flex-end",
//             top: 430,
//             right: 16,
//             position: "absolute",
//           }}
//         >
//           <TouchableOpacity
//             style={styles.ImgViewContainer}
//             onPress={() => LikeReelsApi(item)}
//             // onPress={() => (iAgree ? toggleIAgree(item) : _toggleIAgree(item))}
//           >
//             <Image
//               source={iAgree ? ImagePath.REEL_LIKE : ImagePath.HEART_LIKE}
//               style={{}}
//             />
//           </TouchableOpacity>
//           <Text style={styles.DataTxt}>{item?.likes}</Text>

//           <TouchableOpacity
//             style={styles.ImgViewContainer}
//             onPress={() =>
//               props.navigation.navigate("Comments", { id: item?._id })
//             }
//           >
//             <Image source={ImagePath.REEL_COMMENT} />
//           </TouchableOpacity>
//           <Text style={styles.DataTxt}>{item?.totalComment}</Text>

//           <TouchableOpacity
//             style={styles.ImgViewContainer}
//             // onPress={() => setModalVisible(true)}
//             onPress={() => {
//               refRBSheet2.current.open(item), sendDataToModal(item);
//             }}
//           >
//             <Image source={ImagePath.VERTICAL_MORE} resizeMode="contain" />
//           </TouchableOpacity>
//         </View>

//         {/* ************ Bottom View Container ************ */}
//         <View style={styles.BottomViewContainer}>
//           {/* ************ Profile Container ************ */}
//           <View style={{ flexDirection: "row", alignItems: "center" }}>
//             {item?.userId?.profilePic ? (
//               <Image
//                 source={{ uri: item?.userId?.profilePic }}
//                 style={{ height: 50, width: 50, borderRadius: 50 / 2 }}
//               />
//             ) : (
//               <Image
//                 source={ImagePath.PROFILE_PIC}
//                 style={{ height: 50, width: 50, borderRadius: 50 / 2 }}
//               />
//             )}
//             <Text numberOfLines={1} style={styles.ProfileNameTxt}>
//               {item?.userId?.userName}
//             </Text>
//             <TouchableOpacity
//               style={styles.FollowButtonContainer}
//               onPress={() => FollowApi(item?.userId?._id, index)}
//             >
//               <Text style={styles.FollowTxt}>Follow</Text>
//             </TouchableOpacity>
//           </View>

//           {/* ************ Description Text Container ************ */}
//           <View style={{ flexDirection: "row" }}>
//             <Text
//               numberOfLines={1}
//               style={{
//                 flex: 1,
//                 color: COLOR.WHITE,
//                 fontFamily: "Montserrat-Regular",
//                 bottom: -5,
//               }}
//             >
//               {item?.details}
//             </Text>
//             {/* <TouchableOpacity>
//               <Text
//                 style={{ color: "#1e90ff", fontFamily: "Montserrat-Regular" }}
//               >
//                 More
//               </Text>
//             </TouchableOpacity> */}
//           </View>
//         </View>
//       </View>
//     );
//   };

//   const onChangeIndex = ({ index }) => {
//     setCurrentIndex(index);
//   };

//   // ****************************** Api's *****************************
//   useEffect(() => {
//     ReelsListApi();
//   }, [props.route]);

//   // ********** Upload File for base64 URL Api **********
//   // const UploadVideoToBase64 = async (videoPath) => {
//   // const imageData = new FormData();
//   // imageData.append("uploaded_file", {
//   //   uri: "videoPath",
//   //   name: "image.png",
//   //   fileName: "image",
//   //   type: "image/png",
//   // });
//   // console.log("form data", imageData);
//   // setLoader(true);
//   // axios({
//   //   method: "post",
//   //   url: UploadFileUrl,
//   //   body: imageData,
//   //   headers: {
//   //     "Content-Type": "multipart/form-data; ",
//   //   },
//   // })
//   //   .then(async (response) => {
//   //     if (response.data.responseCode === 200) {
//   //       console.log("====== Upload File Response ======", response);
//   //       alert(response?.data?.responseMessage);
//   //       setLoader(false);
//   //     } else {
//   //       alert("Something went wrong.");
//   //       setLoader(false);
//   //     }
//   //   })
//   //   .catch((err) => console.log("===== Upload File Catch Error ======", err));
//   // };

//   // ********** Upload Reels Api **********
//   // const UploadReels = async (video) => {
//   //   const value = await AsyncStorage.getItem("token" || "socaltoken");
//   //   console.log(video);

//   //   setLoader(true);
//   //   axios({
//   //     method: "post",
//   //     url: AddNewReelsUrl,
//   //     data: {
//   //       details: "Ashish",
//   //       reelsurl: [
//   //         "file:///storage/emulated/0/Android/data/com.socialapp/files/Pictures/0ba3e743-8c0f-4eb0-b516-6aebe48cad05.jpg",
//   //       ],
//   //       hashTagName: ["#first#reels#cartoon"],
//   //     },
//   //     headers: { token: value },
//   //   })
//   //     .then(async (response) => {
//   //       if (response.data.responseCode === 200) {
//   //         console.log("====== Reels Upload Response ======", response);
//   //         alert(response?.data?.responseMessage);
//   //         setLoader(false);
//   //       } else {
//   //         alert("Something went wrong.");
//   //         setLoader(false);
//   //       }
//   //     })
//   //     .catch((err) =>
//   //       console.log(
//   //         "===== Reels Upload Catch Error ======",
//   //         err?.response?.data?.responseMessage,
//   //         err
//   //       )
//   //     );
//   // };

//   // ********** Reels List Api **********
//   const ReelsListApi = async () => {
//     const value = await AsyncStorage.getItem("token" || "socaltoken");
//     console.log(value);

//     setLoader(true);
//     axios({
//       method: "get",
//       url: ReelsListUrl,
//       headers: {
//         token: value,
//       },
//     })
//       .then(async (response) => {
//         if (response.data.responseCode === 200) {
//           console.log("====== Reels Listing Response ======", response);
//           setReelsListing(response?.data?.result?.docs);
//           setReelsId(response?.data?.result?.docs);
//           setLoader(false);
//         } else {
//           alert("Something went wrong.");
//           setLoader(false);
//         }
//       })
//       .catch((err) =>
//         console.log("===== Reels Listing Catch Error ======", err)
//       );
//   };

//   // ********** Like Reels Api **********
//   const LikeReelsApi = async (item) => {
//     const value = await AsyncStorage.getItem("token" || "socaltoken");
//     console.log("----- Like Dislike Reels Api ------", item?._id);

//     setLoader(true);
//     axios({
//       method: "get",
//       url: LikeUnLikeReelsUrl + `${item?._id}`,
//       headers: {
//         token: value,
//       },
//     })
//       .then(async (response) => {
//         if (response.data.responseCode === 200) {
//           console.log("====== Like Reels Response ======", response);
//           setReelsListing(response?.data?.result);
//           setLoader(false);
//         } else {
//           alert("Something went wrong.");
//           setLoader(false);
//         }
//       })
//       .catch((err) =>
//         console.log("===== Reels Listing Catch Error ======", err)
//       );
//   };

//   // ********** Follow Reels Api **********
//   const FollowApi = async (userId) => {
//     const value = await AsyncStorage.getItem("token" || "socaltoken");
//     console.log("----- Follow Reels Api ------", userId);

//     setLoader(true);
//     axios({
//       method: "get",
//       url: FollowUnFollowUserUrl + `${userId}`,
//       headers: {
//         token: value,
//       },
//     })
//       .then(async (response) => {
//         if (response.data.responseCode === 200) {
//           console.log("====== Follow Response ======", response);
//           alert(response?.data?.responseMessage);
//           setLoader(false);
//         } else {
//           alert("Something went wrong.");
//           setLoader(false);
//         }
//       })
//       .catch((err) => console.log("===== Follow Catch Error ======", err));
//   };
//   // ********** Report Reels Api **********
//   const ReportApi = async () => {
//     const value = await AsyncStorage.getItem("token" || "socaltoken");
//     console.log("----- ParticularReelsId ------22222", ParticularReelsId?._id);

//     setLoader(true);
//     axios({
//       method: "post",
//       url: ReportOnReelsUrl,
//       data: {
//         reelsId: ParticularReelsId?._id,
//         message: "dgdkhjdkhjdkdh",
//       },
//       headers: {
//         token: value,
//       },
//     })
//       .then(async (response) => {
//         if (response.data.responseCode === 200) {
//           console.log("====== Report Response ======", response);
//           alert(response?.data?.responseMessage);
//           setLoader(false);
//         } else {
//           alert("Something went wrong.");
//           setLoader(false);
//         }
//       })
//       .catch((err) =>
//         console.log("===== FolReportlow Catch Error ======", err)
//       );
//   };

//   const sendDataToModal = async (item) => {
//     console.log("item===== function =====", item);
//     await setParticularReelsId(item);
//     const SavedReels = await AsyncStorage.setItem("Reels", item?.reelsurl[0]);
//   };

//   // ********** Share Reels Api **********
//   const ShareReelsApi = async () => {
//     const value = await AsyncStorage.getItem("token" || "socaltoken");

//     setLoader(true);
//     axios({
//       method: "get",
//       url: ReelsShareUrl + `${ParticularReelsId?._id}`,
//       headers: {
//         token: value,
//       },
//     })
//       .then(async (response) => {
//         if (response.data.responseCode === 200) {
//           console.log("====== Share Url Response ======", response);
//           setReelsUrl(response?.data?.result?.reelsurl);
//           ShareMessage();
//           setLoader(false);
//         } else {
//           alert("Something went wrong.");
//           setLoader(false);
//         }
//       })
//       .catch((err) => console.log("===== Share Url Catch Error ======", err));
//   };

//   const SavedData = () => {
//     props.navigation.navigate("SavedReels");
//   };

//   return (
//     <SafeAreaView>
//       <View style={{ flex: 1, height: height * 0.9 }}>
//         <View
//           style={{
//             height: height * 0.91,
//             justifyContent: "center",
//           }}
//         >
//           {/* <Image
//             source={{ uri: videoPath?.path }}
//             style={{ height: 200, width: 200 }}
//           /> */}
//           {/* <SwiperFlatList
//             index={reelsListing?.length - 1}
//             style={{}}
//             vertical={true}
//             data={reelsListing}
//             renderItem={renderItem}
//             keyExtractor={(item, index) => index.toString()}
//             onChangeIndex={onChangeIndex}
//           /> */}
//         </View>

//         {/* ************ Reels and Camera Container ************ */}
//         <View style={{ top: 20, left: 16, position: "absolute" }}>
//           <Text
//             style={{
//               fontSize: height / 45,
//               fontFamily: "Montserrat-SemiBold",
//               color: COLOR.WHITE,
//             }}
//           >
//             Reels
//           </Text>
//         </View>

//         <View style={{ top: 15, right: 16, position: "absolute" }}>
//           <TouchableOpacity
//             // onPress={() => refRBSheet.current.open()}
//             // onPress={() => onSelectImage()}
//             onPress={() => onGallary()}
//           >
//             <Image
//               source={ImagePath.CAMERA_ICON}
//               style={{ height: 36, width: 36, tintColor: COLOR.WHITE }}
//             />
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* *************** Report and Block Modal *************** */}
//       {/* <View style={{}}>
//         {/* <TouchableOpacity> *
//         <Modal animationType="none" transparent={true} visible={modalVisible}>
//           <TouchableOpacity
//             onPress={() => setModalVisible(false)}
//             style={{
//               height: height * 1,
//               width: width * 1,
//               backgroundColor: "rgba(0,0,0,0.4)",
//             }}
//           >
//             <View style={[styles.inputCardModal]}>
//               <TouchableOpacity
//                 onPress={() => {
//                   setModalVisible2(true), setModalVisible(false);
//                 }}
//               >
//                 <View style={styles.ReportTxtContainer}>
//                   <View style={styles.ModalOneTxtView}>
//                     <Text style={styles.ModalOneTxt}>{"Report"}</Text>
//                   </View>
//                   <View style={styles.ModalOneImgView}>
//                     <Image
//                       style={[
//                         styles.ShareImgContainer,
//                         {
//                           height: 18,
//                           width: 20,
//                         },
//                       ]}
//                       source={ImagePath.REPORT} // Share
//                       resizeMode="contain"
//                     />
//                   </View>
//                 </View>
//               </TouchableOpacity>
//             </View>
//           </TouchableOpacity>
//         </Modal>
//         {/* </TouchableOpacity> *
//       </View> */}

//       {/* *************** Report Modal *************** */}
//       <View>
//         <Modal visible={modalVisible2} transparent={true}>
//           <TouchableOpacity
//             onPress={() => setModalVisible2(false)}
//             style={{
//               height: height * 1,
//               width: width * 1,
//               backgroundColor: "rgba(0,0,0,0.4)",
//             }}
//           >
//             <View style={styles.ReportModalOne}>
//               <View style={styles.ReportModalMainContainer}>
//                 <View style={{ marginTop: 20 }}>
//                   <Text style={styles.ReportModalAlertTxt}>{"Alert"}</Text>
//                 </View>
//                 <View style={{ alignSelf: "center", marginVertical: 10 }}>
//                   <Text style={styles.ReportModalConfirm}>
//                     {"Are you sure you want to report?"}
//                   </Text>
//                 </View>

//                 <View style={styles.ReportModalContainerTwo}>
//                   <View style={{ justifyContent: "center", width: 100 }}>
//                     <TouchableOpacity onPress={() => setModalVisible2(false)}>
//                       <Text style={styles.ReportModalCancelTxt}>
//                         {"Cancel"}
//                       </Text>
//                     </TouchableOpacity>
//                   </View>

//                   <View
//                     style={{
//                       borderRightColor: "#969696",
//                       borderRightWidth: 0.5,
//                       height: 40,
//                     }}
//                   ></View>
//                   <TouchableOpacity
//                     style={{ width: 100 }}
//                     // onPress={() =>
//                     //   this.setState({
//                     //     modalVisible1: false,
//                     //     modalVisible6: true,
//                     //   })
//                     // }
//                     onPress={() => {
//                       setModalVisible2(false),
//                         Alert.alert("You have report profile successfully");
//                     }}
//                   >
//                     <Text style={styles.ReportModalReportTxt}>{"Report"}</Text>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             </View>
//           </TouchableOpacity>
//         </Modal>
//       </View>

//       {/* *************** Bottom Sheet *************** */}
//       <View style={styles.MainContainerSheet}>
//         <RBSheet
//           ref={refRBSheet}
//           closeOnDragDown={true}
//           closeOnPressMask={true}
//           height={350}
//           customStyles={{
//             wrapper: {
//               backgroundColor: "rgba(0,0,0,0.6)",
//             },
//             draggableIcon: {
//               backgroundColor: COLOR.TXT_COLOR,
//             },
//             container: {
//               backgroundColor: COLOR.BOTTOM_SHEET_BG_CLR,
//               borderTopLeftRadius: 25,
//               borderTopRightRadius: 25,
//               borderTopWidth: 0.5,
//               borderColor: COLOR.TXT_INPT_COLOR,
//             },
//           }}
//         >
//           <View style={styles.panel}>
//             <View style={{ alignItems: "center" }}>
//               <Text style={styles.panelTitle}>Upload Reels</Text>
//               <Text style={styles.panelSubtitle}>Choose your videos here</Text>
//             </View>

//             <TouchableOpacity
//               style={styles.panelButton}
//               onPress={() => onCamera()}
//             >
//               <Text style={styles.panelButtonTitle}>Take Video</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.panelButton}
//               // onPress={() => onGallary()}
//               onPress={onGallary}
//             >
//               <Text style={styles.panelButtonTitle}>Choose from Gallary</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.panelButton}
//               onPress={() => refRBSheet.current.close()}
//             >
//               <Text style={styles.panelButtonTitle}>Cancel</Text>
//             </TouchableOpacity>
//           </View>
//         </RBSheet>
//       </View>

//       {/* *************** Select Bottom Sheet *************** */}
//       <View style={styles.MainContainerSheet}>
//         <RBSheet
//           ref={refRBSheet2}
//           closeOnDragDown={true}
//           closeOnPressMask={true}
//           height={220}
//           customStyles={{
//             wrapper: {
//               backgroundColor: "rgba(0,0,0,0.6)",
//             },
//             draggableIcon: {
//               backgroundColor: COLOR.TXT_COLOR,
//             },
//             container: {
//               backgroundColor: COLOR.BOTTOM_SHEET_BG_CLR,
//               borderTopLeftRadius: 25,
//               borderTopRightRadius: 25,
//               borderTopWidth: 0.5,
//               borderColor: COLOR.TXT_INPT_COLOR,
//             },
//           }}
//         >
//           <View style={styles.panel}>
//             <View style={styles.BtnMainContainer}>
//               <TouchableOpacity
//                 onPress={() => ReportApi()}
//                 style={{ width: 80 }}
//               >
//                 <Text style={styles.BtnTxt}>Report</Text>
//               </TouchableOpacity>
//             </View>

//             <View style={styles.BtnMainContainer}>
//               <TouchableOpacity
//                 onPress={() => ShareReelsApi()}
//                 style={{ width: 80 }}
//               >
//                 <Text style={styles.BtnTxt}>Share</Text>
//               </TouchableOpacity>
//             </View>

//             <View style={styles.BtnMainContainer}>
//               <TouchableOpacity
//                 onPress={() => SavedData()}
//                 style={{ width: 80 }}
//               >
//                 <Text style={styles.BtnTxt}>Save</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </RBSheet>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default VideoReels;
