import { StyleSheet, Dimensions } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
const { height, width } = Dimensions.get("window");

import { COLOR } from "../../Utils/Colors";

const Styles = StyleSheet.create({
  MainContainer: {
    height: height * 1, // 1.99
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
  PicturesUploadContainer: {
    marginTop: verticalScale(12),
    height: height * 0.24,
    // backgroundColor: "pink",
    width: width * 0.9,
    alignItems: "center",
    // justifyContent: "center"
  },
  InputContainer: {
    height: height * 1,
    width: width * 0.9,
    backgroundColor: "black",
    paddingBottom: height * 0.1,

  },
  InputFieldContainer: {
    backgroundColor: COLOR.TXT_INPT_COLOR,
    color: COLOR.WHITE,
    borderRadius: scale(10),
    justifyContent: "center",
  },
  dateContainer: {
    height: height * 0.08,
    backgroundColor: COLOR.TXT_INPT_COLOR,
    color: COLOR.WHITE,
    borderRadius: scale(10),
    justifyContent: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: width * 0.04,
  },
  dateTxt: {
    color: COLOR.GREY,
    fontFamily: "Montserrat-Regular",
    fontSize: height / 55,
  },
  SocialLinkContainer: {
    height: height * 0.05,
    width: width * 1,
    justifyContent: "center",
  },
  SocialLinkTxt: {
    // fontSize: scale(18),
    fontSize: height / 50,
    fontFamily: "Montserrat-SemiBold",
    color: COLOR.WHITE,
  },
  btnView: {
    height: height * 0.09,
    width: width * 0.65,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginTop: verticalScale(7),
  },
  maleView: {
    marginLeft: width * 0.03,
    height: height * 0.04,
    width: width * 0.2,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },

  femaleView: {
    marginLeft: width * 0.02,
    height: height * 0.04,
    width: width * 0.24,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  maleBtnImg: {
    height: height * 0.024,
    width: width * 0.055,
  },
  maleTxt: {
    color: COLOR.WHITE,
    fontWeight: "400",
    fontSize: height / 45,
    fontFamily: "MontSerrat-Regular",
  },
  ErrorContainer: {
    height: height * 0.025,
    width: width * 0.9,
    justifyContent: "center",
    marginBottom: -verticalScale(10),
  },
  BtnContainer: {
    height: height * 0.13, // 0.16
    width: width * 0.9,
    justifyContent: "flex-start",
  },
  TxtFieldStyling: {
    height: height * 0.08,
    width: width * 0.8,
    backgroundColor: COLOR.TXT_INPT_COLOR,
    color: COLOR.GREY,
    borderRadius: scale(10),
    padding: moderateScale(8),
    fontFamily: "Montserrat-Regular",
    fontSize: height / 55,
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
    color: COLOR.WHITE,
    fontFamily: "Montserrat-SemiBold",
  },
  MainContainerSheet: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },

  // ------- Country Code Styling -------
  ListSearchContainer: {
    width: width * 0.9,
    height: height * 0.5,
    // backgroundColor: "rgb(235,235,235)",
    backgroundColor: "rgba(26, 26, 26, 1)",
    borderRadius: 10,
    borderWidth: 1,
    // borderColor: "rgb(255,255,255)",
    borderColor: COLOR.TXT_INPT_COLOR,
  },
  TxtInptSearchContainer: {
    height: height * 0.09,
    alignItems: "center",
    justifyContent: "center",
  },
  TxtInptSearch: {
    padding: 15,
    // backgroundColor: "rgb(255,255,255)",
    backgroundColor: COLOR.TXT_INPT_COLOR,
    borderRadius: 5,
    fontSize: height / 50,
    fontFamily: "Montserrat-Bold",
    width: width * 0.85,
    color: COLOR.WHITE,
  },
  TouchCountrySelect: {
    flexDirection: "row",
    marginHorizontal: width * 0.05,
    marginVertical: 5,
  },
  NameDialCodeContainer: {
    left: width * 0.02,
    flexDirection: "row",
    justifyContent: "space-between",
    width: width * 0.75,
    alignItems: "center",
  },
  // ------- Country Code Styling -------
});

export default Styles;
