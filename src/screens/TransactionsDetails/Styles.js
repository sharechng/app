import { StyleSheet, Dimensions } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
const { height, width } = Dimensions.get("window");

import { COLOR } from "../../Utils/Colors";

const Styles = StyleSheet.create({
  MainContainer: {
    height: height * 1,
    width: width * 1,
    alignItems: "center",
    // backgroundColor: COLOR.BACKGROUND_THEME,
    backgroundColor: COLOR.BLACK,
  },
  AmountTxtContainer: {
    height: height * 0.08,
    width: width * 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  AmountTxt: {
    fontSize: height / 35,
    fontFamily: "Montserrat-Medium",
    color: COLOR.TXT_COLOR,
  },
  AmountInptContainer: {
    height: height * 0.08,
    width: width * 1,
    justifyContent: "center",
    alignItems: "center",
  },
  AmountInptTxt: {
    fontSize: height / 25,
    fontFamily: "Montserrat-SemiBold",
    color: COLOR.WHITE,
  },
  StatusTxtContainer: {
    height: height * 0.05,
    width: width * 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  StatusTxt: {
    fontSize: height / 45,
    fontFamily: "Montserrat-Medium",
    color: "green",
    marginLeft: 10,
  },
  DescriptionContainer: {
    height: height * 0.06,
    width: width * 0.88,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  DescriptionTxt: {
    fontSize: height / 70,
    fontFamily: "Montserrat-Regular",
    color: COLOR.TXT_COLOR,
    textAlign: "center",
  },
  DetailsContainer: {
    height: height * 0.3,
    width: width * 0.94,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green",
    borderRadius: 10,
    // backgroundColor: COLOR.PROFILE_CARD,
    backgroundColor: COLOR.HEADER_THEME,
  },
  KeyView: {
    flexDirection: "row",
    height: height * 0.05,
    width: width * 0.46,
    alignItems: "center",
  },
  DetailsSubContainer: {
    flexDirection: "row",
    height: height * 0.05,
    width: width * 0.9,
    justifyContent: "space-around",
  },
  KeyTxtView: {
    fontSize: height / 50,
    fontFamily: "Montserrat-Medium",
    color: COLOR.TXT_COLOR,
    // textAlign: "center",
    marginLeft: moderateScale(5),
  },
});

export default Styles;
