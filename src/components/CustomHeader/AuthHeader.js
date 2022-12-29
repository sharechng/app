import {
  StyleSheet,
  Text,
  Image,
  Dimensions,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useContext } from "react";
const { height, width } = Dimensions.get("window");

import { ImagePath } from "../../constants/ImagePath";
import { COLOR } from "../../Utils/Colors";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { AuthContext } from "../../context/AuthContext";

const AuthHeader = (props) => {
  const { backIcon, onBackPress, AuthLogo, AUTHLOGO, Title, HeaderTitle } =
    props;

  const auth = useContext(AuthContext);

  return (
    <View style={[Styles.mainHeaderContainer, props.AuthLineStyling]}>
      <View style={Styles.BackImgContainer}>
        {backIcon ? (
          <TouchableOpacity
            onPress={onBackPress}
            style={[Styles.ImgTouchContainer]}
          >
            <Image style={Styles.BackIconImg} source={ImagePath.BACK_ICON} />
          </TouchableOpacity>
        ) : null}
      </View>

      <View style={[Styles.TimerAndTitleContainer, props.ImgNewStyle]}>
        {AuthLogo ? (
          <View>
            <Image
               source={require("../../assets/images/AppLogo/AppLogo.png")}
              style={{
                 height: height / 20, 
                 width: 210,
                 resizeMode:'contain'
                
                }}
              resizeMode="contain"
            />
          </View>
        ) : null}

        {Title ? (
          <View style={[Styles.containers, props.titleStyling]}>
            <Text
              style={[
                props.headerTitle,
                {
                  fontSize: height / 42,
                  fontFamily: "Montserrat-Medium",
                  color: COLOR.WHITE,
                },
              ]}
            >
              {HeaderTitle}
            </Text>
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default AuthHeader;

const Styles = StyleSheet.create({
  mainHeaderContainer: {
    // height: height * 0.075,
    height: height * 0.08,
    width: width * 1,
    flexDirection: "row",
  },
  BackImgContainer: {
    height: height * 0.08,
    width: width * 0.2, //0.26
    justifyContent: "center",
    alignItems: "center",
  },
  ImgTouchContainer: {
    // height: height * 0.08,
    // width: width * 0.16,
    height: 42, // 0.08
    width: 42,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 11,
    borderWidth: 1,
    borderColor: COLOR.BACK_BORDER,
  },
  TimerAndTitleContainer: {
    height: height * 0.08,
    // width: width * 0.76,
    justifyContent: "center",
    alignItems: "center",
  },
  AuthImgLogo: {
    height: verticalScale(42),
    width: verticalScale(160),
    marginLeft: moderateScale(25),
  },
  BackIconImg: {
    height: height * 0.024,
    width: width * 0.035,
    alignSelf: "center",
    resizeMode: "contain",
    tintColor: COLOR.WHITE,
  },
  containers: {
    width: width * 0.55,
    // width: width * 0.75,
    alignItems: "center",
  },
});
