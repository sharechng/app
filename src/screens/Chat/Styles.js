import { StyleSheet, Dimensions } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
const { height, width } = Dimensions.get("window");

import { COLOR } from "../../Utils/Colors";

const Styles = StyleSheet.create({
  MainContainer: {
    height: height * 1,
    alignItems: "center",
    backgroundColor: COLOR.BACKGROUND_THEME,
  },
  ChatHeadingContainer: {
    height: height * 0.09,
    width: width * 1,
    flexDirection: "row",
    borderBottomColor:"#ccc",
    borderBottomWidth:1,
    // 

    // position: "absolute",
    // top: 0,
    // left: 0,


  },
  ProfileImgContainer: {
    height: height * 0.09,
    width: width * 0.15,
    justifyContent: "center",
  },
  ProfileeTxt: {
    fontSize: height / 55,
    fontFamily: "Montserrat-Bold",
    color: "#BBB6B6",
    marginTop: verticalScale(5),
  },
  ActiveNowTxt: {
    fontSize: height / 80,
    fontFamily: "Montserrat-Regular",
    color: "#BBB6B6",
  },
  Online: {
    height: 10,
    width: 10,
    borderRadius: 30,
    marginLeft: verticalScale(5),
  },
  borderLine: {
    borderBottomWidth: 1.5,
    borderBottomColor: "#242526",
    width: width * 1,
  },
  SenderContainer: {
    // height: height * 0.07, // 0.08
    // width: width * 0.9,
    flexDirection: "row",
  },
  SenderMsgImgContainer: {
    height: height * 0.07, // 0.08
    width: width * 0.12,
    marginVertical: 4,
    alignSelf:'flex-end'
  },
  SenderMsgTxtContainer: {
    // height: height * 0.07, // 0.08
    width: width * 0.78, // 0.78
    justifyContent: "center",
    borderTopRightRadius:8,
    borderTopLeftRadius:8,
    borderBottomRightRadius:8
  },
  RecieverMsgTxtContainer: {
    // height: height * 0.07, // 0.08
    width: width * 0.78,
    justifyContent: "center",
    backgroundColor: COLOR.TXT_INPT_COLOR,
    borderTopRightRadius:8,
    borderTopLeftRadius:8,
    borderBottomLeftRadius:8
  },
  DateContainer: {
    height: height * 0.05,
    width: width * 1,
    justifyContent: "center",
    alignItems: "center",
  },
  DateContainerTwo: {
    height: height * 0.025,
    width: width * 1,
    justifyContent: "center",
    alignItems: "center",
  },
  DateTxt: {
    fontSize: height / 65,
    fontFamily: "Montserrat-Regular",
    color: "#BBB6B6",
  },
  SenderMsgTxt: {
    fontFamily: "Montserrat-Regular",
    fontSize: height / 65,
    color: COLOR.WHITE,
    padding: 10,
    lineHeight:17
  },
  SenderMsgTxtTime: {
    fontFamily: "Montserrat-Regular",
    fontSize: height / 69,
    color: "#BBB6B6",
    alignSelf: "flex-start",
  },
  InputContainer: {
    height: height * 0.11,
    width: width * 1,
    marginTop: verticalScale(1),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  ProfileImgView: {
    height: height * 0.071,
    width: width * 0.15,
    justifyContent: "center",
  },
  ImgTouchContainer: {
    height: 42, // 0.08
    width: 42,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 11,
    borderWidth: 1,
    borderColor: COLOR.BACK_BORDER,
  },
  BackContainer: {
    height: height * 0.09,
    width: width * 0.16,
    justifyContent: "center",
  },
  LeftImgContainer: {
    height: height * 0.09,
    width: width * 0.11,
    justifyContent: "center",
  },
  // ------- Chat Styling ------
  ChatMainContainer: {
    // height: height * 0.24,
    width: width * 1,
    alignItems: "center",
  },
  MessageContainer: {
    // height: height * 0.09, // 0.1
    width: width * 0.9,
    marginTop: verticalScale(5),
  },
  SendBtnTouch: {
    height: 44,
    width: 48,
    backgroundColor: COLOR.TXT_INPT_COLOR,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
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
    // backgroundColor: "#FFFFFF",
    backgroundColor: COLOR.BOTTOM_SHEET_BG_CLR,
    paddingTop: 20,
  },
  panelTitle: {
    fontSize: height / 32,
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
    fontFamily: "Montserrat-SemiBold",
    color: COLOR.WHITE,
  },
  MainContainerSheet: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
});

export default Styles;
