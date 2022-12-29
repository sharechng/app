import { StyleSheet, Dimensions } from "react-native";
import { verticalScale } from "react-native-size-matters";
const { height, width } = Dimensions.get("window");

import { COLOR } from "../../Utils/Colors";

const Styles = StyleSheet.create({
  MainContainer: {
    height: height * 1.1,
    alignItems: "center",
    // backgroundColor: COLOR.BACKGROUND_THEME,
    backgroundColor: COLOR.BLACK,
  },
  ProfileImgNameContainer: {
    height: height * 0.1,
    width: width * 0.9,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  ImgContainer: {
    height: height * 0.1,
    width: width * 0.15,
    justifyContent: "center",
  },
  NameContainer: {
    // height: height * 0.1,
    width: width * 0.75,
  },
  NameTxt: {
    fontFamily: "Montserrat-SemiBold",
    color: COLOR.WHITE,
    fontSize: height / 50,
    marginTop: verticalScale(12),
  },
  WriteContainer: {
    height: height * 0.06,
    width: width * 0.9,
  },
  PostAreaContainer: {
    height: height * 0.25,
    width: width * 0.9,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  BackImgContainer: {
    height: height * 0.25,
    width: width * 0.9,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#373636",
  },
  InputContainer: {
    width: width * 0.9,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  BalanceTypeView: {
    // height: height * 0.075,
    // width: width * 0.2,
    backgroundColor: COLOR.TXT_INPT_COLOR,
    justifyContent: "center",
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    alignItems: "center",
  },
  BalanceTxt: {
    fontSize: height / 65,
    fontFamily: "Montserrat-Regular",
    color: "#9E9E9E",
  },
  DurationDropContainer: {
    height: height * 0.1,
    width: width * 0.9,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  TxtInptContainers: {
    height: height * 0.075,
    width: width * 0.9,
    padding: 8,
    color: "#9E9E9E",
    fontSize: height / 65,
    fontFamily: "Montserrat-Regular",
    backgroundColor: COLOR.TXT_INPT_COLOR,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    borderRadius: 8,
  },
  BtnContainer: {
    height: height * 0.13, // 0.15
    width: width * 0.9,
    justifyContent: "flex-end",
  },
  AddPhotoVideoContaier: {
    fontSize: height / 60,
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  ImgUploadView: {
    height: height * 0.3,
    width: width * 0.9,
    borderWidth: 0.5,
    borderColor: COLOR.WHITE,
    borderStyle: "dashed",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  ErrorContainer: {
    height: height * 0.025,
    width: width * 0.9,
    justifyContent: "center",
    marginBottom: -verticalScale(10),
  },
});

export default Styles;
