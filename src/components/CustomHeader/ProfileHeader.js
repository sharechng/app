import React from "react";
import {
  Dimensions,
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { verticalScale } from "react-native-size-matters";
const { height, width } = Dimensions.get("window");

import { ImagePath } from "../../constants/ImagePath";
import { COLOR } from "../../Utils/Colors";

const ProfileHeader = (props) => {
  const {
    Title,
    HeaderTitle,
    PostIcon,
    Menu,
    PostClick,
    OpenBottomSheet,
    BackIcon,
    onBackPress,
    ShareIcon,
    ShareClick,
    SearchClick,
    SearchIcon,
    RightTxt,
    HeaderRightTitle,
    DeleteIcon,
    NotificationDelete,
  } = props;

  return (
    <View style={styles.MainContainer}>
      <View
        style={{
          flexDirection: "row",
          height: height * 0.08,
          // width: width * 0.7,
          alignItems: "center",
        }}
      >
        {BackIcon ? (
          <View style={[styles.IconbackView, props.BackView]}>
            <TouchableOpacity
              onPress={onBackPress}
              style={[styles.ImgTouchContainer, props.BackIconStyling]}
            >
              <Image source={ImagePath.BACK_ICON} />
            </TouchableOpacity>
          </View>
        ) : null}

        {Title ? (
          <View style={[styles.containers, props.titleStyling]}>
            <Text
              style={[styles.HeaderTxt, props.HeaderTxtStyling]}
              onPress={props.profileUpdate}
            >
              {HeaderTitle}
            </Text>
          </View>
        ) : null}
      </View>

      {PostIcon ? (
        <TouchableOpacity
          onPress={PostClick}
          activeOpacity={0.7}
          style={styles.PostingContainer}
        >
          <Image
            style={{
              height: 25,
              width: 25,
              alignSelf: "center",
              resizeMode: "contain",
            }}
            source={ImagePath.UPLOAD_TYPES}
          />
        </TouchableOpacity>
      ) : null}

      {Menu ? (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={OpenBottomSheet}
          style={styles.PostingContainer}
        >
          <Image
            source={ImagePath.RIGHT_MENU}
            style={{
              // marginTop: height * 0.01,
              width: 25,
              height: 25,
              justifyContent: "center",
              alignItems: "center",
              tintColor: COLOR.WHITE,
            }}
          />
        </TouchableOpacity>
      ) : null}

      {ShareIcon ? (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={ShareClick}
          style={styles.PostingContainer}
        >
          <Image
            source={ImagePath.HEADER_SHARE}
            style={{
              width: 21,
              height: 18,
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        </TouchableOpacity>
      ) : null}

      {DeleteIcon ? (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={NotificationDelete}
          style={styles.PostingContainer}
        >
          <Image
            source={ImagePath.HEADER_DELETE}
            style={{
              width: 20,
              height: 20,
              justifyContent: "center",
              alignItems: "center",
              tintColor: COLOR.WHITE,
            }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      ) : null}

      {SearchIcon ? (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={SearchClick}
          style={styles.PostingContainer}
        >
          <Image
            source={ImagePath.SEARCH_ICON}
            style={{
              width: 21,
              height: 18,
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        </TouchableOpacity>
      ) : null}

      {RightTxt ? (
        <View style={[styles.containers, props.titleStyling]}>
          <TouchableOpacity onPress={props.RightClick}>
            <Text style={[styles.HeaderTxt, props.HeaderRightTxtStyling]}>
              {HeaderRightTitle}
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({
  MainContainer: {
    // height: height * 0.1, // 0.08
    width: width * 1,
    alignItems: "center",
    flexDirection: "row",
    // justifyContent: "space-between",// New Style 21 May
    borderBottomWidth: 1.5,
    borderBottomColor: COLOR.HEADER_BORDER_COLOR,
    paddingVertical:5
  },
  containers: {
    // height: height * 0.08,
    // width: width * 0.55, //0.7
    justifyContent: "center",
    // backgroundColor: "red"
  },
  PostingContainer: {
    height: height * 0.08,
    width: width * 0.15,
    alignItems: "center",
    justifyContent: "center",
  },
  HeaderTxt: {
    fontSize: height / 40,
    fontFamily: "Montserrat-SemiBold",
    color: COLOR.WHITE,
    marginHorizontal: verticalScale(16),
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
  BackIconImg: {
    height: height * 0.024,
    width: width * 0.035,
    alignSelf: "center",
    resizeMode: "contain",
    tintColor: COLOR.WHITE,
  },

  SearchContainer: {
    height: height * 0.075,
    width: width * 0.52,
    justifyContent: "space-between",
    backgroundColor: COLOR.TXT_INPT_COLOR,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#1E1E1E",
    borderRadius: 8,
    marginTop: verticalScale(5),
  },
});
