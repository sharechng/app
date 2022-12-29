import { StyleSheet, Dimensions } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
const { height, width } = Dimensions.get("window");

import { COLOR } from "../../Utils/Colors";

const Styles = StyleSheet.create({
  MainContainer: {
    height: height * 1,
    width: width * 1,
    alignItems: "center",
    backgroundColor: COLOR.BLACK,
  },
  ListContainer: {
    flex: 1,
    width: width * 1,
    alignItems: "center",
    // height: height * 0.94,
    // width: width * 0.9,
  },
  NoDataTxtContainer: {
    height: height * 0.85,
    width: width * 1,
    justifyContent: "center",
    alignItems: "center",
  },
  NoDataTxt: {
    color: COLOR.WHITE,
    fontFamily: "Montserrat-SemiBold",
    fontSize: height / 45,
  },
});
export default Styles;
