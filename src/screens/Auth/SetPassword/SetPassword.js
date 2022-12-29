import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  Alert,
  Platform,
} from "react-native";
import { ImagePath } from "../../../constants/ImagePath";
import { COLOR } from "../../../Utils/Colors";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import CustomInput from "../../../components/CustomInput/CustomInput";
import AppButton from "../../../components/CustomButton/CustomButton";
import AuthHeader from "../../../components/CustomHeader/AuthHeader";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ResetUrl } from "../../../restAPI/ApiConfig";
import axios from "axios";
import {
  onCheckcapitalandSmall,
  isNumeric,
  notonCheckspecialCharacters,
} from "../../../Utils/Validatefun";
import { showMessage } from "react-native-flash-message";
import Progressdialog from "../../../../Progressdialog";

const { height, width } = Dimensions.get("window");

const SetPassword = (props) => {
 
  const [isGetEmail, setIsGetEMail] = useState(props.route.params.isGetEmail);
  const [loader, setLoader] = useState(false);
  const [isvisiblePassword, setvisiblePassword] = useState(false);
  const [isvisiblePasswordTwo, setvisiblePasswordTwo] = useState(false);

  const [Password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState(true);
  const [errorPassword, setErrorPassword] = useState(null);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [checkConfirmPassword, setCheckConfirmPassword] = useState(true);
  const [errorConfirmPassword, setErrorConfirmPassword] = useState(null);

  const _passwordvalidate = (pass) => {
    var passwordRegex =
      /^(?=.*[0-9])(?=.*[!@#$%^&*?;,+<>])[a-zA-Z0-9!@#$%^&*?;,+<>]{8,20}$/;
    if (pass === "") {
      setErrorPassword("*Please enter password.");
    } else if (notonCheckspecialCharacters(pass) == true) {
      setErrorPassword("*must have one special characters");
      return false;
    } else if (onCheckcapitalandSmall(pass) == false) {
      setErrorPassword("*Contain both uppercase and lowercase letters.");
      return false;
    } else if (isNumeric(pass) == false) {
      setErrorPassword("*Contain a number");
      return false;
    } else if (pass.length < 8 == true) {
      setErrorPassword("*Password must be 8-20 characters");
      return false;
    } else if (!passwordRegex.test(pass)) {
      setErrorPassword("*must have one special character.");
    } else {
      setErrorPassword(null);
    }
  };
  const _confirmpassword = (pass) => {
    if (Password != pass) {
      setErrorConfirmPassword("*Password Don't Match");
      setCheckConfirmPassword(false);
    } else {
      setCheckConfirmPassword(true);
      setErrorConfirmPassword(null);
    }
  };

  const validate = () => {
    let flag = true;

    if (Password === "") {
      setErrorPassword("*Please enter password.");
      flag = false;
    }
    if (confirmPassword === "") {
      setErrorConfirmPassword("*Please enter password");
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

  // ************ Reset Password Api Integration ************
  const ResetPasswordApi = () => {
    const DATA = new FormData();
    DATA.append({
      email: isGetEmail,
      password: Password,
      confirmPassword: confirmPassword,
    });

    setLoader(true);
    axios({
      method: "post",
      url: ResetUrl,
      data: DATA._parts[0][0],
      headers: { "content-type": "application/json" },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          showMessage({
            message: response.data.responseMessage,
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
          props.navigation.navigate("Login");
          setLoader(false);
        } else {
          alert("Something went wrong.");
          setLoader(false);
        }
      })
      .catch((err) => {
        if (err.response.data.responseCode === 404) {
          showMessage({
            message: err.response.data.responseMessage,
            type: "danger",
            icon: "danger",
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
          setLoader(false);
        } else {
          alert("Something went wrong.");
          setLoader(false);
        }
        setLoader(false);
      });
  };

  return (
    <SafeAreaView>
      {
        loader ? <Progressdialog /> : null
      }
      <KeyboardAwareScrollView>
        <View style={[Styles.MainContainer]}>
          <View style={[Styles.mainHeaderContainer]}>
            <AuthHeader
              backIcon={true}
              onBackPress={() => props.navigation.goBack()}
              AuthLogo={true}
            />
          </View>
          <View style={[Styles.SubContainer]}>
            <View style={Styles.Setnewview}>
              <Text style={Styles.setnewPswTxt}>Set a new password</Text>
              <Text style={Styles.safeuseTxt}>
                Please never share with anyone for safe use.
              </Text>
            </View>

            <View style={Styles.PasswordfullContainer}>
              {/* ****************** Password Full Container ************* */}
              <View
                style={[
                  Styles.PasswordContainer,
                  { marginTop: verticalScale(20) },
                ]}
              >
                {/* ****************** Password Container **************** */}
                <CustomInput
                  LeftIcon={true}
                  leftImg={ImagePath.LOCK_ICON}
                  RightIcon={true}
                  rightImg={
                    isvisiblePassword == false
                      ? ImagePath.HIDE_EYE
                      : ImagePath.SHOW_PASSWORD
                  }
                  RightIconPress={() => setvisiblePassword(!isvisiblePassword)}
                  ImgStyling={{ height: 15, width: 15, tintColor: COLOR.WHITE }}
                  placeholder="Enter your new password"
                  placeholderTextColor={COLOR.GREY}
                  secureTextEntry={isvisiblePassword == false ? true : false}
                  onChangeText={(txt) => {
                    setPassword(txt), _passwordvalidate(txt);
                  }}
                  styles={{
                    height: height * 0.08,
                    width: width * 0.7,
                    backgroundColor: COLOR.TXT_INPT_COLOR,
                    color: COLOR.GREY,
                    borderRadius: scale(10),
                    padding: moderateScale(8), // Newly Added
                    fontFamily: "Montserrat-Regular",
                  }}
                  maxLength={20}
                />
              </View>
              {errorPassword != null ? (
                <View style={Styles.ErrorContainer}>
                  <Text style={{ color: "red", fontSize: height / 65 }}>
                    {errorPassword}
                  </Text>
                </View>
              ) : null}
              <View
                style={[
                  Styles.PasswordContainer,
                  { marginTop: verticalScale(20) },
                ]}
              >
                {/* ****************** Confirm Password Container **************** */}
                <CustomInput
                  LeftIcon={true}
                  leftImg={ImagePath.LOCK_ICON}
                  RightIcon={true}
                  rightImg={
                    isvisiblePasswordTwo == false
                      ? ImagePath.HIDE_EYE
                      : ImagePath.SHOW_PASSWORD
                  }
                  RightIconPress={() =>
                    setvisiblePasswordTwo(!isvisiblePasswordTwo)
                  }
                  ImgStyling={{ height: 15, width: 15, tintColor: COLOR.WHITE }}
                  secureTextEntry={isvisiblePasswordTwo == false ? true : false}
                  placeholder="Confirm new password"
                  placeholderTextColor={COLOR.GREY}
                  onChangeText={(txt) => {
                    setConfirmPassword(txt), _confirmpassword(txt);
                  }}
                  styles={{
                    height: height * 0.08,
                    width: width * 0.7,
                    backgroundColor: COLOR.TXT_INPT_COLOR,
                    color: COLOR.GREY,
                    borderRadius: scale(10),
                    padding: moderateScale(8), // Newly Added
                    fontFamily: "Montserrat-Regular",
                  }}
                  maxLength={20}
                />
              </View>
              {errorConfirmPassword != null ? (
                <View style={Styles.ErrorContainer}>
                  <Text style={{ color: "red", fontSize: height / 65 }}>
                    {errorConfirmPassword}
                  </Text>
                </View>
              ) : null}
            </View>
            {/* ************ Submit and Reset Button Container ************ */}
            <View
              style={[
                Styles.SubmitBtnContainer,
                {
                  height: height * 0.12,
                  justifyContent: "flex-end",
                },
              ]}
            >
              <AppButton
                ButtonPress={() => onSubmit()}
                title="Submit & Reset"
                type="large"
                textStyle={{
                  color: COLOR.WHITE,
                  fontSize: height / 40,
                  fontFamily: "Montserrat-Bold",
                }}
              />
            </View>
            {/* ************* Back to Login Container ********** */}
            <View style={Styles.BacktoLoginBtnContainer}>
              <AppButton
                title="Back To Login"
                type="medium"
                ButtonPress={() => props.navigation.navigate("Login")}
                textStyle={{
                  color: COLOR.BUTTON_PINK,
                  fontSize: height / 46,
                  fontFamily: "Montserrat-SemiBold",
                }}
              />
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default SetPassword;

const Styles = StyleSheet.create({
  MainContainer: {
    height: height * 1.14,
    width: width * 1,
    alignItems: "center",
    backgroundColor: COLOR.BACKGROUND_THEME,
  },
  mainHeaderContainer: {
    height: height * 0.075,
    width: width * 1,
    marginTop: height * 0.02,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  SubContainer: {
    height: height * 1.14,
    width: width * 0.9,
    alignSelf: "center",
    // backgroundColor: "green"
  },
  Setnewview: {
    height: height * 0.2,
    width: width * 0.9,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "cyan",
  },

  setnewPswTxt: {
    fontSize: height / 25,
    color: COLOR.TXT_COLOR,
    fontFamily: "Montserrat-Medium",
  },

  safeuseTxt: {
    fontSize: height / 45,
    marginTop: height * 0.01,
    color: COLOR.TXT_COLOR,
    fontFamily: "Montserrat-Medium",
    textAlign: "center",
  },
  PasswordfullContainer: {
    height: height * 0.25,
    width: width * 0.9,
    alignItems: "center",
  },
  PasswordContainer: {
    backgroundColor: COLOR.TXT_INPT_COLOR,
    color: COLOR.WHITE,
    borderRadius: scale(10),
    justifyContent: "center",
  },
  SubmitBtnContainer: {
    height: height * 0.1,
    width: width * 0.9,
  },
  BacktoLoginBtnContainer: {
    height: height * 0.2,
    width: width * 0.9,
    justifyContent: "flex-end",
    alignItems: "center",
    color: COLOR.TXT_INPT_COLOR,
  },
  ErrorContainer: {
    // height: height * 0.02,
    width: width * 0.9,
    justifyContent: "center",
    marginBottom: -verticalScale(10),
  },
});
