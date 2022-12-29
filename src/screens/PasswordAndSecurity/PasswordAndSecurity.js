import React, { useState, useEffect } from "react";
import { Text, View, SafeAreaView, Dimensions, ScrollView, Platform } from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";
import { ImagePath } from "../../constants/ImagePath";
import CustomInput from "../../components/CustomInput/CustomInput";
import { COLOR } from "../../Utils/Colors";
import AuthHeader from "../../components/CustomHeader/AuthHeader";
import AppButton from "../../components/CustomButton/CustomButton";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomLoader from "../../components/CustomLoader/CustomLoader";
import { GetUserProfileUrl, ResetUrl } from "../../restAPI/ApiConfig";
import styles from "./Styles";
import { showMessage } from "react-native-flash-message";
import {
  onCheckcapitalandSmall,
  isNumeric,
  notonCheckspecialCharacters,
} from "../../Utils/Validatefun";
import Progressdialog from "../../../Progressdialog";

const { height, width } = Dimensions.get("window");

const PasswordAndSecurity = (props) => {
  const [loader, setLoader] = useState(true);
  const [isvisibleOldPassword, setvisibleOldPassword] = useState(false);
  const [isvisibleNewPassword, setvisibleNewPassword] = useState(false);
  const [isvisibleConfirmPassword, setvisibleConfirmPassword] = useState(false);
  const [userProfileDetails, setUserProfileDetails] = useState("");
  const [SocialType, setSocialType] = useState("");

  // ************ Password Validation ************
  const [CurrentPassword, setCurrentPassword] = useState("");
  const [errorCurrentPassword, setErrorCurrentPassword] = useState(null);
  const _currentpasswordvalidate = (curpass) => {
    var passwordRegex =
      /^(?=.*[0-9])(?=.*[!@#$%^&*?;,+<>])[a-zA-Z0-9!@#$%^&*?;,+<>]{8,20}$/;
    if (curpass === "") {
      setErrorCurrentPassword("*Please enter current password.");
    } else if (
      notonCheckspecialCharacters(curpass) == true ||
      onCheckcapitalandSmall(curpass) == false ||
      isNumeric(curpass) == false ||
      curpass.length < 8 == true ||
      !passwordRegex.test(curpass)
    ) {
      setErrorCurrentPassword(
        "*Contains uppercase & lowaercase,one special characters,one number, password must be 8-20 characters."
      );
      return false;
    } else {
      setErrorCurrentPassword(null);
    }
  };

  // ************ New Password Validation ************
  const [NewPassword, setNewPassword] = useState("");
  const [errorNewPassword, setErrorNewPassword] = useState(null);
  const _newpasswordvalidate = (newpass) => {
    var newpasswordRegex =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
    if (newpass === "") {
      setErrorNewPassword("*Please enter new password.");
    } else if (
      notonCheckspecialCharacters(newpass) == true ||
      onCheckcapitalandSmall(newpass) == false ||
      isNumeric(newpass) == false ||
      newpass.length < 8 == true ||
      !newpasswordRegex.test(newpass)
    ) {
      setErrorNewPassword(
        "*Contains uppercase & lowaercase,one special characters,one number, password must be 8-20 characters."
      );
      return false;
    } else {
      setErrorNewPassword(null);
    }
  };

  // ************ Confirm Password Validation ************
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [checkConfirmPassword, setCheckConfirmPassword] = useState(true);
  const [errorConfirmPassword, setErrorConfirmPassword] = useState(null);
  const _confirmpasswordvalidate = (newpass) => {
    if (NewPassword != newpass) {
      setErrorConfirmPassword("*Password Don't Match");
      setCheckConfirmPassword(false);
    } else {
      setCheckConfirmPassword(true);
      setErrorConfirmPassword(null);
    }
  };

  const validate = () => {
    let flag = true;
    if (CurrentPassword === "") {
      setErrorCurrentPassword("*Please enter current password.");
      flag = false;
    }
    if (NewPassword === "") {
      setErrorNewPassword("*Please enter new password.");
      flag = false;
    }
    if (ConfirmPassword === "") {
      setErrorConfirmPassword("*Please enter password");
      flag = false;
    }
    if(NewPassword==CurrentPassword){
      setErrorNewPassword("*New Password can't be same as current password");
      flag = false;
    } 
    if(ConfirmPassword!=NewPassword){
     setErrorConfirmPassword("*Confirm Password must be same as current password");
      flag = false;
    }
    console.log(NewPassword, CurrentPassword, ConfirmPassword);
    if( CurrentPassword==ConfirmPassword){
      setErrorConfirmPassword("*Confirm Password must be same as new password");
      flag = false;

    }


    return flag;
  };

  const onSubmit = () => {
    if (validate()) {
      ResetPasswordApi();
    } else {
    }
  };

  useEffect(() => {
    GetProfileApi();
  }, [props.route]);

  // ************ Get Profile Api ************
  const GetProfileApi = async () => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");

    setLoader(true);
    axios({
      method: "get",
      url: GetUserProfileUrl,
      headers: {
        token: value,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          console.log("==== Get User Profile Response ====", response);
          setSocialType(response?.data?.result);
          setUserProfileDetails(response?.data?.result?.email);
          setLoader(false);
        } else {
          alert("Something went wrong.");
          setLoader(false);
        }
      })
      .catch((err) => {
        console.log("===== Get Profile Catch Error ======", err);
        setLoader(false);
      });
    setLoader(false);
  };

  // ************ Block List Api ************
  const ResetPasswordApi = async () => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");

    const formData = new FormData();
    formData.append("reset", {
      email: userProfileDetails,
      password: NewPassword,
      confirmPassword: ConfirmPassword,
    });

    setLoader(true);
    axios({
      method: "post",
      url: ResetUrl,
      data: formData._parts[0][1],
      headers: {
        token: value,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          console.log("===== Reset Password Response =====", response);
          showMessage({
            message: response?.data?.responseMessage,
            type: "success",
            icon: "success",
            textStyle: {
              fontFamily: "Montserrat-Medium",
              fontSize: height / 55,
            },
            style: {
              width: Platform.OS === "android" ? width * 0.92 : null,
              borderRadius: Platform.OS === "android" ? 5 : null,
              margin: Platform.OS === "android" ? 15 : null,
              alignItems: Platform.OS === "android" ? "center" : null,
            },
          });
          props.navigation.goBack()
          setLoader(false);
        } else {
          alert("Something went wrong.");
          setLoader(false);
        }
      })
      .catch((err) => {
        console.log("===== Reset Catch Error ======", err);
        setLoader(false);
      });
    setLoader(false);
  };

  return (
    <>
    {
      loader && <Progressdialog />
    }
      {SocialType?.isSocial === false ? (
        <SafeAreaView>
          <ScrollView style={styles.Maincontainer}>
            <View style={styles.headerView}>
              <AuthHeader
                backIcon={true}
                onBackPress={() => props.navigation.goBack()}
                Title={true}
                HeaderTitle="Password & Security"
                titleStyling={{
                  width: width * 0.7,
                }}
              />
            </View>
            <View style={styles.passwordfullview}>
              <View style={styles.passwrdview}>
                <Text style={styles.passwrdTxt}>Password & Security</Text>
              </View>
              <View style={styles.pleaseview}>
                <Text style={styles.shareTxt}>
                  Please never share with anyone for safe use
                </Text>
              </View>
            </View>
            {/* ****************Password Full COntainer ************* */}
            <View style={styles.Passwordfullcontainer}>
              {/* **************** Current Password Container ************* */}
              <View
                style={[
                  styles.InputFieldContainer,
                  { marginTop: verticalScale(20) },
                ]}
              >
                <CustomInput
                  LeftIcon={true}
                  leftImg={ImagePath.LOCK_ICON}
                  RightIcon={true}
                  rightImg={
                    isvisibleOldPassword == false
                      ? ImagePath.HIDE_EYE
                      : ImagePath.SHOW_PASSWORD
                  }
                  RightIconPress={() => setvisibleOldPassword(!isvisibleOldPassword)}
                  ImgStyling={{ height: 15, width: 15, tintColor: COLOR.GREY }}
                  placeholder="Current Password"
                  placeholderTextColor={COLOR.GREY}
                  secureTextEntry={isvisibleOldPassword == false ? true : false}
                  maxLength={20}
                  styles={styles.CurrentPasswordStyling}
                  onChangeText={(txt) => {
                    setCurrentPassword(txt), _currentpasswordvalidate(txt);
                  }}
                />
              </View>
              {errorCurrentPassword != null ? (
                <View style={styles.ErrorContainer}>
                  <Text style={{ color: "red", fontSize: height / 65 }}>
                    {errorCurrentPassword}
                  </Text>
                </View>
              ) : null}

              {/* **************** New Password Container ************* */}
              <View
                style={[
                  styles.InputFieldContainer,
                  { marginTop: verticalScale(20) },
                ]}
              >
                <CustomInput
                  LeftIcon={true}
                  leftImg={ImagePath.LOCK_ICON}
                  RightIcon={true}
                  rightImg={
                    isvisibleNewPassword == false
                      ? ImagePath.HIDE_EYE
                      : ImagePath.SHOW_PASSWORD
                  }
                  RightIconPress={() => setvisibleNewPassword(!isvisibleNewPassword)}
                  ImgStyling={{ height: 15, width: 15, tintColor: COLOR.GREY }}
                  placeholder="New Password"
                  placeholderTextColor={COLOR.GREY}
                  secureTextEntry={isvisibleNewPassword == false ? true : false}
                  maxLength={20}
                  styles={styles.CurrentPasswordStyling}
                  onChangeText={(txt) => {
                    setNewPassword(txt), _newpasswordvalidate(txt);
                  }}
                />
              </View>
              {errorNewPassword != null ? (
                <View style={styles.ErrorContainer}>
                  <Text style={{ color: "red", fontSize: height / 65 }}>
                    {errorNewPassword}
                  </Text>
                </View>
              ) : null}

              {/* **************** Confirm Password Container ************* */}
              <View
                style={[
                  styles.InputFieldContainer,
                  { marginTop: verticalScale(20) },
                ]}
              >
                <CustomInput
                  LeftIcon={true}
                  leftImg={ImagePath.LOCK_ICON}
                  RightIcon={true}
                  rightImg={
                    isvisibleConfirmPassword == false
                      ? ImagePath.HIDE_EYE
                      : ImagePath.SHOW_PASSWORD
                  }
                  RightIconPress={() => setvisibleConfirmPassword(!isvisibleConfirmPassword)}
                  ImgStyling={{ height: 15, width: 15, tintColor: COLOR.GREY }}
                  placeholder="Confirm Password"
                  placeholderTextColor={COLOR.GREY}
                  secureTextEntry={isvisibleConfirmPassword == false ? true : false}
                  maxLength={20}
                  styles={styles.CurrentPasswordStyling}
                  onChangeText={(txt) => {
                    setConfirmPassword(txt), _confirmpasswordvalidate(txt);
                  }}
                />
              </View>
              {errorConfirmPassword != null ? (
                <View style={styles.ErrorContainer}>
                  <Text style={{ color: "red", fontSize: height / 65 }}>
                    {errorConfirmPassword}
                  </Text>
                </View>
              ) : null}

              {/* **************** Button Container ************* */}
              <View style={styles.SaveBtnContainer}>
                {loader ? (
                  <CustomLoader />
                ) : (
                  <AppButton
                    title="Save"
                    type="large"
                    textStyle={{
                      fontFamily: "Montserrat-SemiBold",
                      // fontSize: scale(16),
                    }}
                    ButtonPress={() => onSubmit()}
                  />
                )}
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      ) : (
        <SafeAreaView>
          <View style={styles.headerView}>
            <AuthHeader
              backIcon={true}
              onBackPress={() => props.navigation.goBack()}
              Title={true}
              HeaderTitle="Password & Security"
              titleStyling={{
                width: width * 0.65,
                marginLeft: -moderateScale(5),
              }}
            />
          </View>
          <View
            style={[
              styles.Maincontainer,
              { justifyContent: "center", height: height * 0.85 },
            ]}
          >
            <View style={[styles.passwordfullview]}>
              <View style={[styles.passwrdview]}>
                <Text
                  style={[
                    styles.passwrdTxt,
                    {
                      fontSize: height / 40,
                      textAlign: "center",
                      color: COLOR.WHITE,
                    },
                  ]}
                >
                  Password will not be changed while you use social login...{" "}
                </Text>
              </View>
            </View>
          </View>
        </SafeAreaView>
      )}
    </>
  );
};

export default PasswordAndSecurity;
