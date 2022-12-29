// import { StyleSheet, Dimensions } from "react-native";
// import { moderateScale, scale, verticalScale } from "react-native-size-matters";
// const { height, width } = Dimensions.get("window");

// import { COLOR } from "../../Utils/Colors";

// const Styles = StyleSheet.create({
//   MainContainer: {
//     // flex: 1,
//     height: height * 1.12,
//     alignItems: "center",
//     backgroundColor: COLOR.BACKGROUND_THEME,
//   },
//   headerView: {
//     marginTop: height * 0.02,
//     flexDirection: "row",
//     height: height * 0.08,
//     width: width * 1,
//     alignItems: "center",
//     justifyContent: "space-between",
//   },
//   ImageContainer: {
//     height: height * 0.42,
//     width: width * 1,
//     justifyContent: "center",
//     // marginTop: verticalScale(48),
//   },
//   ProfileView: {
//     height: height * 0.1,
//     width: width * 1,
//     marginTop: verticalScale(26),
//     alignItems: "center",
//   },
//   PicNameContainer: {
//     height: height * 0.08,
//     width: width * 0.94,
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   ProfilePicContainer: {
//     height: height * 0.08,
//     width: width * 0.16,
//   },
//   ProfileNameContainer: {
//     height: height * 0.08,
//     width: width * 0.65, // 0.78
//     // backgroundColor: "red",
//   },
//   ProfileNameTxt: {
//     color: COLOR.WHITE,
//     fontSize: height / 47,
//     fontFamily: "Montserrat-SemiBold",
//     marginTop: verticalScale(3),
//   },
//   LikesCountContainer: {
//     height: height * 0.07,
//     width: width * 0.13,
//     // backgroundColor: "red",
//     flexDirection: "row",
//     justifyContent: "space-around",
//   },
//   LikesAmountTxt: {
//     color: COLOR.WHITE,
//     fontSize: height / 75,
//     fontFamily: "Montserrat-Regular",
//     marginTop: verticalScale(3),
//   },
//   DurationPrice: {
//     height: height * 0.02,
//     width: width * 1,
//     flexDirection: "row",
//     marginTop: -verticalScale(10),
//   },
//   DurationContainer: {
//     height: height * 0.02,
//     width: width * 0.4, // 0.35
//     flexDirection: "row",
//     alignItems: "center",
//     marginHorizontal: 12,
//   },
//   DurationTxt: {
//     color: "#979797",
//     fontSize: height / 75,
//     fontFamily: "Montserrat-Regular",
//   },
//   DaysTxt: {
//     color: COLOR.WHITE,
//     fontSize: height / 75,
//     fontFamily: "Montserrat-SemiBold",
//   },
//   DescriptionContainer: {
//     // height: height * 0.25, // 0.25
//     width: width * 1,
//     alignItems: "center",
//   },
//   DetailsTxtView: {
//     height: height * 0.045,
//     width: width * 1,
//     justifyContent: "flex-end",
//   },
//   DetailsTxt: {
//     color: COLOR.WHITE,
//     fontSize: height / 45,
//     fontFamily: "Montserrat-Medium",
//     marginLeft: verticalScale(15),
//   },
//   DescriptionTxtView: {
//     // height: height * 0.3, // 0.3
//     width: width * 1,
//     marginTop: verticalScale(8),
//   },
//   DesciptionTxt: {
//     color: COLOR.WHITE,
//     fontSize: height / 73,
//     fontFamily: "Montserrat-Regular",
//     marginLeft: verticalScale(15),
//   },
//   BtnContainer: {
//     height: height * 0.2, // 0.13
//     width: width * 0.9,
//     // justifyContent: "flex-end",
//     alignItems: "center",
//     flexDirection: "row",
//     justifyContent: "space-around",
//   },
//   // Remark
//   RemarkModalContainer: {
//     justifyContent: "center",
//     width: Platform.OS == "ios" ? width * 0.75 : width * 0.75,
//     height: Platform.OS == "ios" ? height * 0.32 : height * 0.32,
//     backgroundColor: "#272626",
//     borderRadius: 6,
//     alignSelf: "center",
//   },
//   RemarkTxt: {
//     color: COLOR.WHITE,
//     fontSize: height / 40,
//     textAlign: "center",
//     fontFamily: "Montserrat-SemiBold",
//   },
//   RemarkInputModalContainer: {
//     alignSelf: "center",
//     marginVertical: 10,
//     borderWidth: 0.5,
//     borderColor: "lightgrey",
//     height: 60,
//     width: 200,
//     borderRadius: 5,
//     shadowOpacity: 0.3,
//     elevation: 0.7,
//     marginHorizontal: 10,
//     color: COLOR.WHITE,
//   },
//   SubmitBtnCotainer: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     alignItems: "center",
//     borderTopColor: "#969696",
//     borderTopWidth: 0.7,
//     height: 50, // 80
//     marginHorizontal: 5,
//   },
//   SubmitBtnTxt: {
//     fontSize: height / 35,
//     fontWeight: "bold",
//     // color: COLOR.BUTTON_PINK,
//     color: COLOR.WHITE,
//     overflow: "hidden",
//     width: 100,
//     textAlign: "center",
//   },

//   // ********** Confirmation Modal Styling Starts **********
//   mainContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0,0,0,0.4)",
//   },
//   ModalSubContainer: {
//     height: height * 0.2,
//     width: width * 0.88,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   HeadingContainer: {
//     height: height * 0.28,
//     width: width * 0.88,
//     backgroundColor: COLOR.TXT_INPT_COLOR,
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 15,
//   },
//   HeadingTxtContainer: {
//     color: COLOR.WHITE,
//     fontSize: scale(16),
//     fontFamily: "Montserrat-SemiBold",
//   },
//   ButtonMainContainer: {
//     height: height * 0.09,
//     width: width * 0.88,
//     justifyContent: "center",
//     alignItems: "center",
//     flexDirection: "row",
//   },
//   btnContainer: {
//     height: height * 0.1,
//     alignItems: "center",
//     justifyContent: "center",
//     width: width * 0.45,
//   },
//   // ********** Confirmation Modal Styling Ends **********
// });

// export default Styles;
import { StyleSheet, Dimensions, Platform } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
const { height, width } = Dimensions.get("window");

import { COLOR } from "../../Utils/Colors";

const Styles = StyleSheet.create({
  MainContainer: {
    // flex: 1,
    height: height * 0.87,
    alignItems: "center",
    backgroundColor: COLOR.BLACK,
  },
  headerView: {
    marginTop: height * 0.02,
    flexDirection: "row",
    height: height * 0.08,
    width: width * 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  ImageContainer: {
    height: height * 0.42,
    width: width * 1,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: verticalScale(48),
  },
  ProfileView: {
    height: height * 0.1,
    width: width * 1,
    marginTop: verticalScale(26),
    alignItems: "center",
  },
  PicNameContainer: {
    height: height * 0.08,
    width: width * 0.94,
    flexDirection: "row",
    alignItems: "center",
  },
  ProfilePicContainer: {
    height: height * 0.08,
    width: width * 0.16,
  },
  ProfileNameContainer: {
    height: height * 0.08,
    width: width * 0.65, // 0.78
    justifyContent: "center",
  },
  ProfileNameTxt: {
    color: COLOR.WHITE,
    fontSize: height / 47,
    fontFamily: "Montserrat-SemiBold",
    marginTop: -height * 0.02,
  },
  LikesCountContainer: {
    height: height * 0.07,
    width: width * 0.13,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  LikesAmountTxt: {
    color: COLOR.WHITE,
    fontSize: height / 75,
    fontFamily: "Montserrat-Regular",
    marginTop: verticalScale(3),
  },
  DurationPrice: {
    height: height * 0.02,
    width: width * 1,
    flexDirection: "row",
  },
  DurationContainer: {
    height: height * 0.02,
    width: width * 0.4, // 0.35
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 12,
  },
  DurationTxt: {
    color: "#979797",
    fontSize: height / 75,
    fontFamily: "Montserrat-Regular",
  },
  DaysTxt: {
    color: COLOR.WHITE,
    fontSize: height / 75,
    fontFamily: "Montserrat-SemiBold",
  },
  DescriptionContainer: {
    // height: height * 0.25, // 0.25
    width: width * 1,
    alignItems: "center",
  },
  DetailsTxtView: {
    height: height * 0.045,
    width: width * 1,
    justifyContent: "flex-end",
  },
  DetailsTxt: {
    color: COLOR.WHITE,
    fontSize: height / 45,
    fontFamily: "Montserrat-SemiBold",
    marginLeft: verticalScale(15),
  },
  DescriptionTxtView: {
    // height: height * 0.3, // 0.3
    width: width * 1,
    marginTop: verticalScale(8),
  },
  DesciptionTxt: {
    color: COLOR.WHITE,
    fontSize: height / 73,
    fontFamily: "Montserrat-Regular",
    marginLeft: verticalScale(15),
  },
  BtnContainer: {
    height: height * 0.2, // 0.13
    width: width * 0.9,
    // justifyContent: "flex-end",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  // Remark
  RemarkModalContainer: {
    justifyContent: "center",
    width: Platform.OS == "ios" ? width * 0.75 : width * 0.75,
    height: Platform.OS == "ios" ? height * 0.32 : height * 0.32,
    backgroundColor: "#272626",
    borderRadius: 6,
    alignSelf: "center",
  },
  RemarkTxt: {
    color: COLOR.WHITE,
    fontSize: height / 40,
    textAlign: "center",
    fontFamily: "Montserrat-SemiBold",
  },
  UpdateNameContainer: {
    alignSelf: "center",
    // marginVertical: 10,
    marginTop: height * 0.02,
    flexDirection: "row",
    height: height * 0.08,
    width: width * 0.9,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  UpdateNameTxtView: {
    height: height * 0.1,
    width: width * 0.25,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "green",
  },
  UpdateTxtInput: {
    height: height * 0.1,
    width: width * 0.6,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  UpdateNameTxt: {
    color: COLOR.WHITE,
    fontSize: height / 47,
    textAlign: "center",
    fontFamily: "Montserrat-SemiBold",
  },
  RemarkInputModalContainer: {
    alignSelf: "center",
    marginVertical: 10,
    borderWidth: 0.5,
    borderColor: "lightgrey",
    height: 45,
    width: 200,
    borderRadius: 5,
    shadowOpacity: 0.3,
    elevation: 0.7,
    marginHorizontal: 10,
    color: COLOR.WHITE,
  },
  SubmitBtnCotainer: {
    alignItems: "center",
    // borderTopColor: "#969696",
    // borderTopWidth: 0.7,
    height: 80, // 80
    marginHorizontal: 5,
  },
  SubmitBtnTxt: {
    fontSize: height / 54,
    fontFamily: "Montserrat-SemiBold",
    color: COLOR.WHITE,
  },

  // ********** Confirmation Modal Styling Starts **********
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  ModalSubContainer: {
    height: height * 0.2,
    width: width * 0.88,
    justifyContent: "center",
    alignItems: "center",
  },
  HeadingContainer: {
    height: height * 0.28,
    width: width * 0.88,
    backgroundColor: COLOR.TXT_INPT_COLOR,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  HeadingTxtContainer: {
    color: COLOR.WHITE,
    fontSize: height / 50,
    fontFamily: "Montserrat-SemiBold",
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
  datainputd1: {
    height: height / 15,
    width: width * 0.548,
    borderRadius: 5,
    alignItems: "center",
    // justifyContent: "space-around",
    justifyContent: "space-between",
    flexDirection: "row",
    borderWidth: 0.5,
    borderColor: COLOR.WHITE,
  },
  dateTxt: {
    color: COLOR.GREY,
    fontFamily: "Montserrat-Regular",
    fontSize: height / 55,
    marginLeft: height * 0.01,
  },
  // ********** Confirmation Modal Styling Ends **********
  LogoutmainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: height * 1,
    width: width * 1,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  LogoutModalMainContainer: {
    // justifyContent: "center",
    // alignItems: "center",
    // // height: height * 0.5,
    // height: height * 0.3,
    // width: width * 0.9,
    // // backgroundColor: "#272626",
    // borderRadius: 6,
    // alignSelf: "center",
    // backgroundColor: "rgba(0, 0, 0, 0.67)",
  },
  LogoutModalSubContainer: {
    // height: height * 0.8,
    // width: width * 0.9,
    // justifyContent: "center",
    // alignItems: "center",
  },
  LogoutHeadingContainer: {
    height: height * 0.5,
    width: width * 0.95,
    // backgroundColor: "#272626",
    backgroundColor: COLOR.ACTIVITY_CARD,
    borderRadius: 6,
    alignSelf: "center",
  },
  LogoutHeadingTxtContainer: {
    color: COLOR.WHITE,
    fontSize: height / 55,
    fontFamily: "Montserrat-SemiBold",
    // marginTop: height * 0.03,
  },
  LogoutButtonMainContainer: {
    height: height * 0.09,
    width: width * 0.88,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  LogoutbtnContainer: {
    height: height * 0.1,
    alignItems: "center",
    justifyContent: "center",
    width: width * 0.45,
  },
  LogoutbuttonPressableView: {
    height: height * 0.055,
    width: width * 0.31,
    borderColor: "#000",
    borderRadius: height * 0.05,
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: COLOR.BUTTON_PINK,
  },
  LogoutConfirmTxt: {
    color: "#fff",
    textAlign: "center",
    fontSize: height / 50,
    fontFamily: "Montserrat-Medium",
  },
  BidConfirmBtn: {
    width: 150,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLOR.BUTTON_PINK,
    marginTop: height * 0.035,
    borderRadius: 8,
  },
  AmountAndInputContainer: {
    alignSelf: "center",
    // marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    height: height * 0.09,
    width: width * 0.9,
    justifyContent: "space-evenly",
  },
  AmountTxtContainer: {
    height: height * 0.1,
    width: width * 0.25,
    alignItems: "center",
    justifyContent: "center",
  },
  AmountTxt: {
    color: COLOR.WHITE,
    fontSize: height / 50,
    textAlign: "center",
    fontFamily: "Montserrat-SemiBold",
  },
  InputContainer: {
    height: height * 0.1,
    width: width * 0.6,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  DateContainer: {
    alignSelf: "center",
    // marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    height: height * 0.09,
    width: width * 0.9,
    justifyContent: "space-evenly",
    // backgroundColor: "orange",
  },
  DateTxt: {
    color: COLOR.WHITE,
    fontSize: height / 47,
    fontFamily: "Montserrat-SemiBold",
  },
  DateTxtContainer: {
    height: height * 0.1,
    width: width * 0.2,
    justifyContent: "center",
  },

  // ----- Cancel Bid -----
  // ********** Logout Modal Styling **********
  CancelmainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  CancelModalMainContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: height * 1,
    backgroundColor: "rgba(0, 0, 0, 0.67)",
  },
  CancelModalSubContainer: {
    height: height * 0.2,
    width: width * 0.95,
    justifyContent: "center",
    alignItems: "center",
  },
  CancelHeadingContainer: {
    height: height * 0.28,
    width: width * 0.95,
    backgroundColor: COLOR.TXT_INPT_COLOR,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  CancelHeadingTxtContainer: {
    color: COLOR.WHITE,
    fontSize: height / 50,
    fontFamily: "Montserrat-SemiBold",
    // marginTop: height * 0.03,
  },
  CancelButtonMainContainer: {
    height: height * 0.09,
    width: width * 0.88,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  CancelbtnContainer: {
    height: height * 0.1,
    alignItems: "center",
    justifyContent: "center",
    width: width * 0.45,
  },
  CancelbuttonPressableView: {
    height: height * 0.055,
    width: width * 0.31,
    borderColor: "#000",
    borderRadius: height * 0.05,
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: COLOR.BUTTON_PINK,
  },
  CancelConfirmTxt: {
    color: "#fff",
    textAlign: "center",
    fontSize: height / 45,
    fontFamily: "Montserrat-Medium",
  },
});

export default Styles;
