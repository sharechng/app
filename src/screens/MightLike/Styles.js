import { StyleSheet, Dimensions } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
const { height, width } = Dimensions.get("window");

import { COLOR } from "../../Utils/Colors";

const Styles = StyleSheet.create({
  MainContainer: {
    // height: height * 0.283, // Old Styling
    height: height * 0.32, // New Styling 10 May 2022
    width: width * 1,
    // alignItems: "center",
    backgroundColor: COLOR.BACKGROUND_THEME,
    borderRadius: 5,
  },
  ChecKView: {
    height: height * 0.32,
    justifyContent: "center",
  },
  CheckTxtContainer: {
    fontSize: height / 40,
    fontFamily: "Montserrat-SemiBold",
    color: COLOR.WHITE,
  },
  CardListContainer: {
    height: height * 0.28,
    width: width * 0.46,
    borderWidth: 0.5,
    borderColor: COLOR.WHITE,
    borderRadius: 5,
    // marginHorizontal: 8,
  },
  ImgContainer: {
    height: height * 0.183,
    width: width * 0.46,
    justifyContent: "center",
    alignItems: "center",
  },
  ProfileNameContainer: {
    height: height * 0.035,
    width: width * 0.46,
    justifyContent: "center",
    alignItems: "center",
  },
  ProfileNameTxt: {
    fontSize: height / 55,
    color: COLOR.WHITE,
    fontFamily: "Montserrat-Medium",
  },
  DescriptionTxt: {
    fontSize: height / 65,
    color: COLOR.WHITE,
    fontFamily: "Montserrat-Regular",
  },
  BtnContainer: {
    height: height * 0.065,
    width: width * 0.46,
    justifyContent: "space-around",
    flexDirection: "row",
    alignItems: "center",
  },
  MightLikeTxtContainer: {
    height: height * 0.04,
    width: width * 0.94,
    // justifyContent: "space-between",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  MightLikeTxt: {
    fontSize: height / 55,
    fontFamily: "Montserrat-Medium",
    color: COLOR.WHITE,
    marginLeft: height * 0.01,
  },
});

export default Styles;
