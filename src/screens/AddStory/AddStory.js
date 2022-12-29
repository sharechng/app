import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  SafeAreaView,
} from "react-native";
import React from "react";
import { ImagePath } from "../../constants/ImagePath";
import { COLOR } from "../../Utils/Colors";
import AppButton from "../../components/CustomButton/CustomButton";
import AuthHeader from "../../components/CustomHeader/AuthHeader";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
const { height, width } = Dimensions.get("window");

const AddStory = (props) => {
  function renderProfile() {
    return (
      <View style={styles.profileView}>
        <Text style={styles.createTxt}>Create Story</Text>
        <View style={styles.nameView}>
          <Image
            source={ImagePath.PROFILE_PIC}
            resizeMode="contain"
            style={styles.imgBack}
          />
          <View style={styles.insideView}>
            <Text style={styles.nameTxt}>Tohoku Zunko</Text>
            <TouchableOpacity style={styles.publicView}>
              <Text style={styles.publicTxt}>Public</Text>
              <Image source={ImagePath.DROP_DOWN} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  function renderWrite() {
    return (
      <View style={styles.wrieView}>
        <Text style={styles.writTxt}>Write here...</Text>
        <ImageBackground
          source={ImagePath.UPLOAD_IMG_OR_VIDEO}
          style={styles.imageBackGroundText}
          resizeMode="contain"
        >
          <Text
            style={{
              fontSize: height / 60,
              color: COLOR.WHITE,
              fontFamily: "Montserrat-Medium",
            }}
          >
            Add photo/videos
          </Text>
          <Text
            style={{
              fontSize: height / 70,
              color: COLOR.WHITE,
              fontFamily: "Montserrat-Medium",
            }}
          >
            or drag and drop
          </Text>
        </ImageBackground>
      </View>
    );
  }

  function renderBtn() {
    return (
      <View style={styles.BtnContainer}>
        <AppButton
          title="Post"
          type="large"
          textStyle={{ fontFamily: "Montserrat-Bold" }}
        />
      </View>
    );
  }

  return (
    <SafeAreaView>
      <View style={styles.MainContainer}>
        {/* ************ Header Container ************ */}
        <View style={styles.headerView}>
          <AuthHeader
            backIcon={true}
            onBackPress={() => props.navigation.goBack()}
            AuthLogo={false}
          />
        </View>

        {renderProfile()}
        {renderWrite()}
        {renderBtn()}
      </View>
    </SafeAreaView>
  );
};

export default AddStory;

const styles = StyleSheet.create({
  MainContainer: {
    height: height * 1.14,
    width: width * 1,
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

  writTxt: {
    color: COLOR.WHITE,
    fontSize: height / 57,
    fontFamily: "Montserrat-Medium",
  },

  imageBackGroundText: {
    justifyContent: "center",
    alignItems: "center",
    height: height * 0.15,
    width: width * 0.9,
    // backgroundColor: "red",
  },

  wrieView: {
    height: height * 0.19,
    paddingLeft: width * 0.04,
    width: width * 1,
    justifyContent: "space-between",
  },

  nameTxt: {
    fontSize: height / 52,
    color: COLOR.WHITE,
    fontFamily: "Montserrat-SemiBold",
  },
  publicTxt: {
    color: COLOR.WHITE,
    fontSize: height / 75,
    fontFamily: "Montserrat-Medium",
  },

  publicView: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: width * 0.01,
    alignItems: "center",
    marginTop: height * 0.01,
    backgroundColor: COLOR.TXT_COLOR,
    height: height * 0.02,
    width: width * 0.14,
    borderRadius: height * 0.005,
  },

  insideView: {
    height: height * 0.07,
    justifyContent: "center",
    width: width * 0.5,
    marginLeft: moderateScale(12),
  },

  nameView: {
    marginLeft: width * 0.04,
    flexDirection: "row",
    height: height * 0.1,
    width: width * 0.45,
    justifyContent: "space-between",
  },

  BtnContainer: {
    height: height * 0.2,
    width: width * 0.9,
    justifyContent: "flex-end",
    alignSelf: "center",
    //backgroundColor: "red"
  },

  imgBack: {
    height: height * 0.076,
    width: width * 0.15,
  },

  profileView: {
    height: height * 0.16,
    width: width * 1,
    justifyContent: "space-between",
    marginTop: verticalScale(30),
  },

  createTxt: {
    fontSize: height / 48,
    color: COLOR.WHITE,
    marginLeft: width * 0.04,
    fontFamily: "Montserrat-SemiBold",
  },
});
