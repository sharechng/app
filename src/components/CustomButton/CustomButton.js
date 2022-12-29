import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { verticalScale } from "react-native-size-matters";
import { COLOR } from "../../Utils/Colors";

const { height, width } = Dimensions.get("window");

const AppButton = (props) => {
  const { title, type, btnMainView, ButtonPress, disabled } = props;

  const getBtnStyle = () => {
    let _style = { backgroundColor: COLOR.BUTTON_PINK };
    if (type == "large") {
      _style = {
        backgroundColor: COLOR.BUTTON_PINK,
        height: verticalScale(50),
        width: width * 0.9,
        // height: height * 0.08,
        // width: verticalScale(310),
        borderRadius: 5,
        justifyContent: "center",
        alignSelf: "center",
      };
    } else if (type == "medium") {
      _style = {
        backgroundColor: COLOR.BACKGROUND_THEME,
        borderRadius: 5,
        height: verticalScale(50),
        width: verticalScale(180),
        justifyContent: "center",
        alignSelf: "center",
        borderWidth: 1,
        borderColor: COLOR.BUTTON_PINK,
      };
    } else if (type == "small") {
      _style = {
        backgroundColor: COLOR.BUTTON_PINK,
        borderRadius: 5,
        height: verticalScale(34),
        width: verticalScale(91),
        justifyContent: "center",
        alignSelf: "center",
      };
    }
    return _style;
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      navigation={props}
      onPress={ButtonPress}
      disabled={disabled}
      style={[styles.btnMainView, getBtnStyle(), btnMainView, props.btnStyling]}
      {...props}
    >
      <Text style={[styles.btnTitle, props.textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  btnMainView: {
    justifyContent: "center",
    alignItems: "center",
  },
  btnTitle: {
    fontSize: height / 40,
    // fontFamily: Bold,
    color: "#FFFFFF",
  },
});
