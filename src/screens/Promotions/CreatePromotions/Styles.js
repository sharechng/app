import { StyleSheet, Dimensions } from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";
const { height, width } = Dimensions.get("window");

import { COLOR } from "../../../Utils/Colors";

const Styles = StyleSheet.create({
  MainContainer: {
    height: height * 1.3,
    width: width * 1,
    alignItems: "center",
    // backgroundColor: COLOR.BACKGROUND_THEME,
    backgroundColor: COLOR.BLACK,
  },
  HeadingContainer: {
    width: width * 0.94,
    marginVertical: height * 0.02,
  },
  HeadingTxt: {
    fontSize: height / 45,
    fontFamily: "Montserrat-SemiBold",
    color: COLOR.WHITE,
  },
  ProfileDetailsContainer: {
    height: height * 0.075,
    width: width * 0.94,
    flexDirection: "row",
    alignItems: "center",
  },
  ProfilePicsContainer: {
    height: height * 0.075,
    width: width * 0.14,
    justifyContent: "center",
  },
  ProfileNameTxt: {
    fontSize: height / 50,
    fontFamily: "Montserrat-Medium",
    color: COLOR.WHITE,
  },
  ErrorContainer: {
    // height: height * 0.02,
    width: width * 0.9,
    justifyContent: "center",
    marginBottom: -verticalScale(5),
  },
  InputFieldContainer: {
    height: height * 0.08,
    width: width * 0.94,
    backgroundColor: COLOR.TXT_INPT_COLOR,
    color: COLOR.WHITE,
    borderRadius: 10,
    justifyContent: "center",
    marginTop: 10,
  },
  TxtInptStyling: {
    height: height * 0.08,
    width: width * 0.9,
    backgroundColor: COLOR.TXT_INPT_COLOR,
    color: COLOR.GREY,
    borderRadius: 10,
    padding: moderateScale(8), // Newly Added
    fontFamily: "Montserrat-Regular",
  },
  AddInterestBtn: {
    height: height * 0.065,
    width: width * 0.94,
    alignItems: "center",
    flexDirection: "row",
  },
  AddBtnTxt: {
    fontSize: height / 48,
    fontFamily: "Montserrat-Medium",
    color: COLOR.WHITE,
    marginLeft: height * 0.01,
  },
  PostAreaContainer: {
    height: height * 0.3,
    width: width * 0.9,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
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
  BtnContainer: {
    // height: height * 0.15,
    marginTop:'10%',
    marginBottom:'20%',
    width: width * 0.9,
    justifyContent: "flex-end",
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
  DurationAndAmountContainer: {
    height: 25,
    width: width * 0.45,
    borderColor: COLOR.BUTTON_PINK,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2,
    marginLeft: height * 0.03,
  },
});
export default Styles;
