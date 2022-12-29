import { StyleSheet, Dimensions } from "react-native";
import { COLOR } from "../../Utils/Colors";
const { height, width } = Dimensions.get("window");

const Styles = StyleSheet.create({
  MainContainer: {
    // flex: 1,
    height: height * 1,
    width: width * 1,
    alignItems: "center",
    backgroundColor: COLOR.BACKGROUND_THEME,
  },
  LogoContainer: {
    height: height * 0.55,
    width: width * 1,
    justifyContent: "center",
    alignItems: "center",
  },
  TitleContainer: {
    height: height * 0.14,
    width: width * 0.9,
    justifyContent: "center",
  },
  TitleTxt: {
    color: COLOR.WHITE,
    fontSize: height / 35,
    fontFamily: "Montserrat-Bold",
    marginVertical: 1,
  },
  SubHeaderContainer: {
    height: height * 0.062,
    width: width * 0.9,
    justifyContent: "center",
  },
  PointsContainer: {
    height: height * 0.1,
    width: width * 0.9,
    justifyContent: "center",
  },
  PointAndTxtContaier: {
    height: height * 0.03,
    width: width * 0.9,
    alignItems: "center",
    flexDirection: "row",
  },
  CirclePointsContainer: {
    height: 8,
    width: 8,
    borderRadius: 8 / 2,
    backgroundColor: COLOR.BUTTON_PINK,
    marginTop: 1,
  },
  CirclePointsTxt: {
    fontSize: height / 52,
    fontFamily: "Montserrat-SemiBold",
    color: COLOR.WHITE,
    marginLeft: height * 0.01,
  },
  BtnContainer: {
    height: height * 0.13, // 0.16
    width: width * 0.9,
    justifyContent: "flex-end",
  },
});
export default Styles;
