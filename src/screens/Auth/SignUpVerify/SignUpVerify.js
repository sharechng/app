import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Platform,
} from "react-native";
import { COLOR } from "../../../Utils/Colors";
import CountDown from "react-native-countdown-component";
import AuthHeader from "../../../components/CustomHeader/AuthHeader";
import axios from "axios";
import { ResendOtpUrl, SignUpVerifyUrl } from "../../../restAPI/ApiConfig";
import { showMessage } from "react-native-flash-message";
import Progressdialog from "../../../../Progressdialog";
import AppButton from "../../../components/CustomButton/CustomButton";
const { height, width } = Dimensions.get("window");
import OTPInputView from '@twotalltotems/react-native-otp-input'

const SignUpVerify = (props) => {
  const [loader, setLoader] = useState(false);
  const [isGetEmail, setIsGetEMail] = useState(props?.route?.params?.Email);
  const [isGetMobile, setIsGetMobile] = useState(props?.route?.params?.Mobile);
  const [sendotp, setSendOtp] = useState(true);
  const [count, setCount] = useState(true);
  const [otpCode, setOtpCode] = useState("");

  // ************* SignUp Verify Api Integration *************
  const SignUpVerifyApi = (code) => {
    setLoader(true);
    axios({
      method: "put",
      url: SignUpVerifyUrl,
      data: {
        email: isGetEmail || isGetMobile,
        otp: code,
      },
    })
      .then((response) => {
        setLoader(false);
        if (response.data.responseCode === 200) {
          console.log("===== Verify Signup Otp =====", response);
          props.navigation.navigate("Login");
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
        } else {
          // alert("somthing wrong");
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
        }
      })
      .catch((err) => {
        setLoader(false);
        console.log("==== Verify Signup Catch error=====", err);
        if (err.response.data.responseCode === 400 || 404) {
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
        } else {
          alert("Something went wrong.");
        }
      });
  };

  // ************* Resend Otp Api Integration *************
  const ResendOtpApi = () => {
    setLoader(true);
    axios({
      method: "post",
      url: ResendOtpUrl,
      data: {
        email: isGetEmail || isGetMobile,
      },
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        if (response.data.responseCode === 200) {
          console.log("===== Resend Otp =====", response);
          showMessage({
            message: "OTP send successfully",
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
          setLoader(false);
        } else {
          alert("somthing wrong");
          setLoader(false);
        }
      })
      .catch((err) => {
        console.log("====err====", err);
        setLoader(false);
      });
  };
  const validate=()=>{
    if(otpCode==undefined||otpCode==null||otpCode.length<4){
     showMessage({
        message: "Please enter OTP",
        type: "danger",
        icon: "danger",
     })
    }else{
      SignUpVerifyApi(otpCode)
    }
  }

  function renderHeader() {
    return (
      <View style={styles.headerView}>
        <AuthHeader
          backIcon={false}
          onBackPress={() => props.navigation.goBack()}
          AuthLogo={true}
        />
      </View>
    );
  }

  function renderMiddle() {
    return (
      <View style={styles.middleView}>
        <Text style={styles.verifyTxt}>Verify OTP</Text>
        {/* <Text style={styles.alwaysTxt}>
          Always Make Sure That You Are Visiting
    </Text> */}
        <Text numberOfLines={2} style={styles.urlTxt}>
          We have send an OTP on {isGetEmail || isGetMobile}
        </Text>
      </View>
    );
  }

  function renderCoderInput() {
    return (
      <View style={styles.codeInputView}>
        {/* <CodeInput
          secureTextEntry
          space={10}
          codeInputStyle={{
            backgroundColor: COLOR.TXT_INPT_COLOR,
            color: COLOR.TXT_COLOR,
            fontSize: Platform.OS === "ios" ? height / 20 : height / 28,
            height: Platform.OS === "ios" ? height * 0.08 : height * 0.08,
            borderRadius: height * 0.013,
            width: width * 0.15,
            alignItems: "center",
            fontWeight: "bold",
          }}
          // ref="codeInputRef2"
          keyboardType="numeric"
          codeLength={4}
          borderType="border-circle"
          autoFocus={false}
          onFulfill={(code) => {
            setOtpCode(code)
          }}
        /> */}

          <OTPInputView
            style={{
              width: '70%', height: width * 0.16,
              alignSelf: "center",
              marginTop: 26,
              // backgroundColor:"red"
            }}
            pinCount={4}
            // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
            onCodeChanged = {code => { setOtpCode(code) }}
            autoFocusOnLoad={false}
            codeInputFieldStyle={{
              backgroundColor: COLOR.TXT_INPT_COLOR,
              color: COLOR.TXT_COLOR,
              fontSize: Platform.OS === "ios" ? height / 20 : height / 28,
              height: Platform.OS === "ios" ? height * 0.08 : height * 0.08,
              borderRadius: height * 0.013,
              width: width * 0.15,
              alignItems: "center",
              fontWeight: "bold",
            }}
            secureTextEntry={true}
          />

        {count ? (
          <CountDown
            until={300}
            size={12}
            onFinish={() => {
              setCount(false),
               setSendOtp(false);
            }}


            style={{marginTop:'15%'}}
            digitStyle={{ backgroundColor: COLOR.BACKGROUND_THEME }}
            digitTxtStyle={{ color: COLOR.GREY, fontSize: height / 50 }}
            separatorStyle={{ color: COLOR.GREY, fontSize: height / 50 }}
            timeToShow={["M", "S"]}
            timeLabels={{ m: "", s: "" }}
            showSeparator
          />
        ) : (
          <Text style={{ alignSelf: "center" }}>00 : 00</Text>
        )}
      </View>
    );
  }

  {
    !count ? (
      <TouchableOpacity
        disabled={sendotp}
        onPress={() => {
          setSendOtp(true), setCount(true), ResendOtpApi();
        }}
      >
        <Text style={styles.otpText}>Send OTP again</Text>
      </TouchableOpacity>
    ) : null;
  }
  function renderResend() {
    return (
      <>
          <View style={[styles.resendView,{opacity:count ? 0 : 1}]}>
            <Text style={styles.recieveCodeTxt}>Didn't recieve the code?</Text>
            <TouchableOpacity
              disabled={sendotp}
              onPress={() => {
                setSendOtp(true), setCount(true), ResendOtpApi();
              }}
            >
              <Text style={styles.otpText}>Send OTP again</Text>
            </TouchableOpacity>
          </View>
      </>
    );
  }

  return (
    <SafeAreaView>
      <View style={styles.MainContainer}>
        {renderHeader()}
        {renderMiddle()}
        {renderCoderInput()}
        {renderResend()}
        <View style={styles.BacktoLoginBtnContainer}>
            <AppButton
              title="Submit"
              type="large"
              ButtonPress={() => validate(otpCode)}
              textStyle={{
                fontSize: height / 40,
                fontFamily: "Montserrat-Bold",
              }}
              
            />
          </View>
      </View>
      {loader && <Progressdialog/>}
      {/* SignUpVerifyApi(code) */}
    </SafeAreaView>
  );
};

export default SignUpVerify;

const styles = StyleSheet.create({
  MainContainer: {
    height: height * 1.14,
    width: width * 1,
    backgroundColor: COLOR.BACKGROUND_THEME,
  },
  codeInputView: {
    height: height * 0.2,
    width: width * 1,
  },
  headerView: {
    marginTop: height * 0.02,
    flexDirection: "row",
    height: height * 0.08,
    width: width * 0.7,
    alignItems: "center",
    justifyContent: "space-between",
  },
  backIconView: {
    marginLeft: width * 0.02,
    height: height * 0.065,
    width: width * 0.12,
    borderWidth: height * 0.001,
    borderColor: COLOR.RIGHT_BORDER_WIDTH,
    borderRadius: height * 0.01,
    alignItems: "center",
    justifyContent: "center",
  },
  backImg: {
    height: height * 0.02,
    width: width * 0.04,
  },
  logoImg: {
    height: height * 0.06,
    width: width * 0.4,
    alignSelf: "center",
  },
  middleView: {
    height: height * 0.14, // 0.24
    width: width * 1,
    justifyContent: "center",
    alignItems: "center",
  },
  verifyTxt: {
    fontSize: height / 30,
    color: COLOR.TXT_COLOR,
    fontFamily: "Montserrat-Medium",
  },
  alwaysTxt: {
    fontSize: height / 50,
    marginTop: height * 0.01,
    color: COLOR.TXT_COLOR,
    fontFamily: "Montserrat-Medium",
  },
  urlTxt: {
    fontSize: height / 45,
    marginTop: height * 0.008,
    color: COLOR.TXT_COLOR,
    fontFamily: "Montserrat-Medium",
    width: width * 0.8,
    textAlign: "center",
  },
  resendView: {
    height: height * 0.1,
    width: width * 1,
    justifyContent: "center",
    alignItems: "center",
  },
  recieveCodeTxt: {
    fontSize: height / 48,
    marginTop: height * 0.01,
    color: COLOR.WHITE,
    fontFamily: "Montserrat-Medium",
  },
  otpText: {
    fontSize: height / 48,
    marginTop: height * 0.01,
    color: COLOR.BUTTON_PINK,
    fontFamily: "Montserrat-Medium",
  }
  // otpText: {
  //   fontSize: height / 48,
  //   marginTop: height * 0.01,
  //   color: COLOR.BUTTON_PINK,
  //   fontFamily: "Montserrat-Medium",
  // },
});
