import { StyleSheet, Dimensions } from "react-native";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";

import { COLOR } from "../../../Utils/Colors";

const { height, width } = Dimensions.get("window");

const Styles = StyleSheet.create({
  MainContainer: {
    height: height * 0.99,
    width: width * 1,
    // flex: 1,
    alignItems: "center",
    backgroundColor: COLOR.BACKGROUND_THEME,
  },
  SubContainer: {
    height: height * 1.14,
    width: width * 0.9,
  },
  LogoContainer: {
    height: height * 0.18, // 0.25
    width: width * 0.9,
    justifyContent: "center",
    alignItems: "center",
  },
  WlcmTxtContainer: {
    height: height * 0.12, // 0.15
    width: width * 0.9,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  WlcmTxt: {
    color: COLOR.TXT_COLOR,
    fontSize: height / 30,
    fontFamily: "Montserrat-Medium",
  },
  LoginEmailTxtContainer: {
    height: height * 0.04, // 0.025
    width: width * 0.9,
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  LoginEmailTxt: {
    color: COLOR.BUTTON_PINK,
    fontSize: height / 55,
    fontFamily: "Montserrat-Medium",
    textDecorationLine: "underline",
    textDecorationColor: COLOR.BUTTON_PINK,
  },
  InputContainer: {
    height: height * 0.2,
    width: width * 0.9,
    justifyContent: "center",
  },
  EmailTxtInpt: {
    height: height * 0.08,
    width: width * 0.8,
    backgroundColor: COLOR.TXT_INPT_COLOR,
    color: COLOR.GREY,
    borderRadius: scale(10),
    padding: moderateScale(8),
    fontFamily: "Montserrat-Regular",
    fontSize: height / 55,
  },
  PasswordTxtInpt: {
    height: height * 0.08,
    width: width * 0.7,
    backgroundColor: COLOR.TXT_INPT_COLOR,
    color: COLOR.GREY,
    borderRadius: scale(10),
    padding: moderateScale(8),
    fontFamily: "Montserrat-Regular",
    fontSize: height / 55,
  },
  InputFieldContainer: {
    backgroundColor: COLOR.TXT_INPT_COLOR,
    color: COLOR.WHITE,
    borderRadius: scale(10),
    justifyContent: "center",
  },
  ForgotContainer: {
    height: height * 0.06, // 0.03
    width: width * 0.9,
    flexDirection: "row",
    marginTop: verticalScale(10),
    justifyContent: "space-between",
    alignItems: "center", // New styling 8 April 2022
  },
  CheckAndRemember: {
    height: height * 0.03,
    // width: width * 0.4,// New styling 8 April 2022
    flexDirection: "row",
    // justifyContent: "space-between",
  },
  CheckAndRememberTwo: {
    height: height * 0.03,
    // width: width * 0.38,// New styling 8 April 2022
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  BtnContainer: {
    height: height * 0.13, // 0.16
    width: width * 0.9,
    justifyContent: "flex-end",
  },
  SignInTxtContainer: {
    height: height * 0.1, // 0.12
    width: width * 0.9,
    justifyContent: "center",
    alignItems: "center",
  },
  SignInTxt: {
    fontSize: height / 56,
    color: COLOR.WHITE,
    fontFamily: "Montserrat-SemiBold",
  },
  SocialContainer: {
    height: height * 0.07,
    width: width * 0.9,
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
  },
  SocialSubContainer: {
    height: height * 0.07,
    width: width * 0.7,
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
  },
  // LogoView: {
  //   width: 80,
  // },
  RegisterContainer: {
    height: height * 0.12,
    width: width * 0.9,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  RegisterTxt: {
    fontSize: height / 56,
    color: COLOR.GREY,
    fontFamily: "Montserrat-Regular",
    marginTop: -verticalScale(19),
  },
  RegisterTxtTwo: {
    fontSize: height / 56,
    color: COLOR.BUTTON_PINK,
    fontFamily: "Montserrat-SemiBold",
    marginTop: -verticalScale(18),
  },
  ErrorContainer: {
    // height: height * 0.02,
    width: width * 0.9,
    justifyContent: "center",
    marginBottom: -verticalScale(10),
  },
});

export default Styles;
