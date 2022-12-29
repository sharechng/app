import { StyleSheet, Dimensions } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
const { height, width } = Dimensions.get("window");

import { COLOR } from "../../Utils/Colors";

const Styles = StyleSheet.create({
  MainContainer: {
    // height: height * 1.78,
    height: height * 1,
    width: width * 1,
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
  BlankContainer: {
    height: height * 0.02,
    width: width * 1,
  },
  ListContainer: {
    // height: height * 0.84,
    // height: height * 0.1,
    width: width * 1,
    alignItems: "center",
    // backgroundColor: "green",
  },
  ListContainerTwo: {
    height: height * 0.083,
    width: width * 0.91,
    alignItems: "center",
    backgroundColor: COLOR.TXT_INPT_COLOR,
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 5,
    marginVertical: verticalScale(4),
  },
  TransactionImgContainer: {
    height: height * 0.08,
    width: width * 0.17,
    justifyContent: "center",
    alignItems: "center",
  },
  TransactionTypeContainer: {
    height: height * 0.08,
    width: width * 0.38,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  TransactionAmountContainer: {
    height: height * 0.08,
    width: width * 0.36,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  TransactionTypeTxt: {
    color: COLOR.WHITE,
    fontFamily: "Montserrat-SemiBold",
    fontSize: height / 50,
  },
  TransactionAddUSDTxt: {
    color: COLOR.WHITE,
    fontFamily: "Montserrat-Medium",
    fontSize: height / 65,
  },
});
export default Styles;
