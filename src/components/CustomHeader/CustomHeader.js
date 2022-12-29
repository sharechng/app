import React, { useEffect } from "react";
import {
  Button,
  Dimensions,
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { moderateScale, verticalScale, scale } from "react-native-size-matters";
const { height, width } = Dimensions.get("window");

import { ImagePath } from "../../constants/ImagePath";
import { COLOR } from "../../Utils/Colors";

function CustomHeader(props) {
  // console.log("props=====------->", props, cartItemsCount);
  const {
    searchIcon,
    MenuIcon,
    notificationIcon,
    cartItemsCount,
    onNotificationPress,
    onWalletPress,
    onSearchPress,
    WalletIcon,
    comments,
    onCommentsPress,
    WalletIcons,
    onWalletClick,
    HeaderLogo,
    Title,
    HeaderTitle,
    PostApiCalling,
    onBackPress,
    title,
    pageTitle,
  } = props;

  return (
    <View
      style={{
        height: height * 0.08,
        width: width * 1,
        // backgroundColor: COLOR.HEADER_THEME,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
      }}
    >
      <View
        style={{
          height: height * 0.08,
          width: MenuIcon?0:width * 0.16,
          alignItems: "center",
          justifyContent: "center",
          // marginLeft:-15
        }}
      >
        {/* ********** Back Image ********** */}
        {MenuIcon ? (
        null
        ) : (
          <View style={[Styles.IconbackView, props.BackView]}>
            <TouchableOpacity
              onPress={onBackPress}
              style={[Styles.ImgTouchContainer, props.BackIconStyling]}
            >
              <Image source={ImagePath.BACK_ICON} />
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View
        style={{
          height: height * 0.08,
          width: width * 0.4,
          justifyContent: "center",
        }}
      >
        {HeaderLogo ? (
          <View>
            <Image source={ImagePath.HEADER_LOGO} />
          </View>
        ) : null}

        {pageTitle ? (
          <View
            style={{
              height: height * 0.08,
              width: width * 0.4,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: height / 37,
                fontFamily: "Montserrat-Medium",
                color: COLOR.WHITE,
                marginLeft: height * 0.018,
              }}
            >
              {title}
            </Text>
          </View>
        ) : null}
      </View>

      <View
        style={{
          height: height * 0.08,
          width: width * 0.44,
          marginLeft: MenuIcon?20:0,
// 
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          alignSelf:'flex-end'
        }}
      >
        {comments ? (
          <TouchableOpacity onPress={onCommentsPress} activeOpacity={0.7}>
            <Image
              source={ImagePath.HEADER_ALARM}
              style={{
                height: verticalScale(20),
                width: verticalScale(20),
                justifyContent: "center",
                alignItems: "center",
                tintColor: COLOR.WHITE,
              }}
            />
          </TouchableOpacity>
        ) : null}

        {searchIcon ? (
          <TouchableOpacity onPress={onSearchPress} activeOpacity={0.7}>
            <Image
              source={ImagePath.HEADER_MESSENGER}
              style={{
                height: verticalScale(23),
                width: verticalScale(23),
                justifyContent: "center",
                alignItems: "center",
                tintColor: COLOR.WHITE,
              }}
            />
          </TouchableOpacity>
        ) : null}

        {notificationIcon ? (
          <TouchableOpacity onPress={onNotificationPress} activeOpacity={0.7}>
            <Image
              source={ImagePath.NOTIFIED_ICON}
              style={{
                height: verticalScale(20),
                width: verticalScale(20),
                justifyContent: "center",
                alignItems: "center",
                tintColor: COLOR.WHITE,
              }}
            />
          </TouchableOpacity>
        ) : null}

        {WalletIcon ? (
          <TouchableOpacity onPress={onWalletPress} activeOpacity={0.7}>
            <Image
              style={{
                height: 25,
                width: 25,
                alignSelf: "center",
                // tintColor: COLOR.WHITE,
                resizeMode: "contain",
              }}
              source={ImagePath.UPLOAD_TYPES}
            />
          </TouchableOpacity>
        ) : null}

        {WalletIcons ? (
          <TouchableOpacity onPress={onWalletClick} activeOpacity={0.7}>
            <Image
              style={{
                height: verticalScale(20),
                width: verticalScale(18),
                alignSelf: "center",
                // tintColor: COLOR.WHITE,
                resizeMode: "contain",
              }}
              source={ImagePath.NEW_WALLET_WHITE}
            />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
}

export default CustomHeader;

const Styles = StyleSheet.create({
  containers: {
    width: width * 0.55,
    // width: width * 0.75,
    alignItems: "center",
  },
  ImgTouchContainer: {
    height: 42, // 0.08
    width: 42,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 11,
    borderWidth: 1,
    borderColor: COLOR.BACK_BORDER,
    // backgroundColor: "green",
  },
});
