import { StyleSheet, Dimensions } from "react-native";
import { moderateScale } from "react-native-size-matters";
const { height, width } = Dimensions.get("window");

import { COLOR } from "../../Utils/Colors";

const Styles = StyleSheet.create({
  MainContainer: {
    height: height * 1,
    width: width * 1,
    alignItems: "center",
    backgroundColor: COLOR.BLACK,
  },
  TxtInptContainer: {
    height: height * 0.6,
    width: width * 1,
    alignItems: "center",
    justifyContent: "center",
  },
  BlankContainer: {
    height: height * 0.02,
    width: width * 1,
  },
  TxtInptView: {
    height: height * 0.14,
    width: width * 0.92,
    // justifyContent: "center",
    marginVertical: height * 0.01,
  },
  TxtInptStyling: {
    height: height * 0.075,
    width: width * 0.92,
    backgroundColor: COLOR.TXT_INPT_COLOR,
    padding: 10,
    color: COLOR.WHITE,
    borderRadius: 4,
    fontFamily: "Montserrat-Regular",
    fontSize: height / 55,
  },
  BtnContainer: {
    height: height * 0.15,
    width: width * 0.92,
    alignItems: "center",
    justifyContent: "center",
  },
  COnfirmationTxtContainer: {
    height: height * 0.04,
    width: width * 0.92,
    justifyContent: "flex-end",
  },
  Confirmationtxt: {
    fontFamily: "Montserrat-Regular",
    color: "rgba(158, 158, 158, 1)",
    fontSize: height / 50,
  },
  BottomSubContainer: {
    height: height * 0.1,
    width: width * 1,
    justifyContent: "center",
    flexDirection: "row",
  },
  copyIconContainer: {
    height: height * 0.085,
    width: width * 0.1,
    justifyContent: "center",
    alignItems: "center",
  },
  TxtInptCopyContainer: {
    flexDirection: "row",
    height: height * 0.085,
    width: width * 0.9,
    backgroundColor: "rgba(33, 33, 33, 1)",
    borderRadius: 6,
    justifyContent: "space-between",
  },
  InputAddressStyling: {
    color: COLOR.WHITE,
    fontSize: height / 55,
    width: width * 0.8,
    alignSelf: "center",
    fontFamily: "Montserrat-Regular",
    padding: 8,
  },
});
export default Styles;
