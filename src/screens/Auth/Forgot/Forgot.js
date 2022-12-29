import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Dimensions,
  Platform,
} from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import CustomInput from "../../../components/CustomInput/CustomInput";
import { ImagePath } from "../../../constants/ImagePath";
import { COLOR } from "../../../Utils/Colors";
import AppButton from "../../../components/CustomButton/CustomButton";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";
import { ForgetUrl } from "../../../restAPI/ApiConfig";
import { showMessage } from "react-native-flash-message";
import Progressdialog from "../../../../Progressdialog";

const { height, width } = Dimensions.get("window");

const Forgot = (props) => {
  const [loader, setLoader] = useState(false);
  const auth = useContext(AuthContext);

  // ************ Email Validation ************
  const [Email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState(null);
  const _emailvalidate = (mail) => {
    var emailRegex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    var PhoneRegex = /^([0-9]){10,32}$/;
    if (mail === "") {
      setErrorEmail("*Please enter email.");
    } else if (!(emailRegex.test(mail) | PhoneRegex.test(mail))) {
      setErrorEmail("*Please enter valid email.");
    } else {
      setErrorEmail(null);
    }
  };

  const validate = () => {
    let flag = true;
    if (Email === "") {
      setErrorEmail("*Please enter email.");
      flag = false;
    }
    return flag;
  };

  const onSubmit = () => {
    // setLoader(true);
    if (validate()) {
      ForgotApi();
    } else {
    }
  };

  // ************ Login Api Integration ************
  const ForgotApi = () => {
    setLoader(true);
    axios({
      method: "post",
      url: ForgetUrl,
      data: {
        email: Email,
      },
      headers: { "content-type": "application/json" },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          console.log("====== Forgot Api Response ======", response);
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
          props.navigation.navigate("VerifyOtp", { Email: Email });
          setLoader(false);
        } else {
          alert("Something went wrong.");
          setLoader(false);
        }
      })
      .catch((err) => {
        console.log("==== Forgot Catch error=====", err);
        if (err.response.data.responseCode === 402 || 404) {
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
      {/* <KeyboardAwareScrollView enableOnAndroid={true}> */}
      <View style={[Styles.MainContainer]}>
        <View style={[Styles.SubContainer]}>
          {/* ************ Logo Container ************ */}
          <View style={Styles.LogoContainer}>
            <Image
              source={require("../../../assets/images/AppLogo/AppLogo.png")}

              style={{ height: 80, width: 200 }}
              resizeMode="contain"
            />
          </View>

          {/* ************ Forgot Password Txt Container ************ */}
          <View style={Styles.ForgotTxtContainer}>
            <Text style={Styles.ForgotTxt}>Forgot Password?</Text>
            <Text
              style={[
                Styles.ForgotTxt,
                {
                  fontSize: height / 50,
                },
              ]}
            >
              Enter your email to recieve OTP
            </Text>
          </View>

          {/* ******************Enter Email TxtInput **************** */}
          <View style={Styles.InputFieldContainer}>
            <CustomInput
              LeftIcon={true}
              leftImg={ImagePath.EMAIL_ICON}
              placeholder="Enter your email"
              keyboardType="email-address" // Newly Added
              placeholderTextColor={COLOR.GREY}
              styles={Styles.ForgetEmailView}
              onChangeText={(txt) => {
                setEmail(txt), _emailvalidate(txt);
              }}
            />
          </View>
          {errorEmail != null ? (
            <View style={Styles.ErrorContainer}>
              <Text style={{ color: "red", fontSize: height / 65 }}>
                {errorEmail}
              </Text>
            </View>
          ) : null}

          {/* ************ Send Button Container ************ */}
          <View style={Styles.SndBtnContainer}>
            <AppButton
              title="Send"
              type="large"
              ButtonPress={() => onSubmit()}
              textStyle={{
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
                fontSize: height / 50,
                fontFamily: "Montserrat-SemiBold",
              }}
            />
          </View>
        </View>
      </View>
      {/* </KeyboardAwareScrollView> */}
      {loader && <Progressdialog/>}
    </SafeAreaView>
  );
};

export default Forgot;

const Styles = StyleSheet.create({
  MainContainer: {
    height: height * 1.14,
    width: width * 1,
    alignItems: "center",
    backgroundColor: COLOR.BACKGROUND_THEME,
  },
  SubContainer: {
    height: height * 1.14,
    width: width * 0.9,
  },
  LogoContainer: {
    height: height * 0.25,
    width: width * 0.9,
    justifyContent: "center",
    alignItems: "center",
  },
  ForgotTxtContainer: {
    height: height * 0.15,
    width: width * 0.9,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  ForgotTxt: {
    color: COLOR.TXT_COLOR,
    fontSize: height / 30,
    fontFamily: "Montserrat-Medium",
  },
  InputFieldContainer: {
    backgroundColor: COLOR.TXT_INPT_COLOR,
    color: COLOR.WHITE,
    borderRadius: scale(10),
    justifyContent: "center",
  },
  SndBtnContainer: {
    height: height * 0.135,
    width: width * 0.9,
    justifyContent: "flex-end",
  },
  BacktoLoginBtnContainer: {
    height: height * 0.2,
    width: width * 0.9,
    justifyContent: "center",
    alignItems: "center",
    color: COLOR.TXT_INPT_COLOR,
  },
  ErrorContainer: {
    // height: height * 0.02,
    width: width * 0.9,
    justifyContent: "center",
    marginBottom: -verticalScale(10),
  },
  ForgetEmailView: {
    height: height * 0.08,
    width: width * 0.8,
    backgroundColor: COLOR.TXT_INPT_COLOR,
    color: COLOR.GREY,
    borderRadius: scale(10),
    padding: moderateScale(8), // Newly Added
    fontFamily: "Montserrat-Regular",
  },
});
