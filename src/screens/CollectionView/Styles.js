import { StyleSheet, Dimensions } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
const { height, width } = Dimensions.get("window");

import { COLOR } from "../../Utils/Colors";

const Styles = StyleSheet.create({
  MainContainer: {
    // flex: 1,
    height: height * 1,
    alignItems: "center",
    backgroundColor: COLOR.BACKGROUND_THEME,
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
    marginTop: verticalScale(8),
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
    width: width * 0.78,
  },
  ProfileNameTxt: {
    color: COLOR.WHITE,
    fontSize: height / 47,
    fontFamily: "Montserrat-SemiBold",
    marginTop: verticalScale(3),
  },
  DurationPrice: {
    height: height * 0.02,
    width: width * 1,
    flexDirection: "row",
    marginTop: -verticalScale(10),
  },
  DurationContainer: {
    height: height * 0.02,
    width: width * 0.35,
    flexDirection: "row",
  },
  DurationTxt: {
    color: COLOR.WHITE,
    fontSize: height / 80,
    fontFamily: "Montserrat-Regular",
  },
  DaysTxt: {
    color: COLOR.WHITE,
    fontSize: height / 80,
    fontFamily: "Montserrat-Bold",
  },
  DescriptionContainer: {
    height: height * 0.3,
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
    fontFamily: "Montserrat-Medium",
    marginLeft: verticalScale(15),
  },
  DescriptionTxtView: {
    height: height * 0.3,
    width: width * 1,
    marginTop: verticalScale(8),
  },
  DesciptionTxt: {
    color: COLOR.WHITE,
    fontSize: height / 73,
    fontFamily: "Montserrat-Regular",
    marginLeft: verticalScale(15),
  },
});

export default Styles;
