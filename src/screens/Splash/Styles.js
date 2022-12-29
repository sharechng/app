import { StyleSheet, Dimensions } from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";
const { height, width } = Dimensions.get("window");

import { COLOR } from "../../Utils/Colors";

const Styles = StyleSheet.create({
  MainContainer: {
    height: height * 1,
    width: width * 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLOR.BACKGROUND_THEME,
  },
  ImgStyling: { height: height / 1.4, width: width / 1.2 },
});
export default Styles;
