import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { COLOR } from "../../../Utils/Colors";
import CountDown from "react-native-countdown-component";
import AuthHeader from "../../../components/CustomHeader/AuthHeader";
import axios from "axios";
import { ResendOtpUrl, SignUpVerifyUrl } from "../../../restAPI/ApiConfig";
import { showMessage } from "react-native-flash-message";
import AppButton from "../../../components/CustomButton/CustomButton";
import Progressdialog from "../../../../Progressdialog";
import OTPInputView from '@twotalltotems/react-native-otp-input'

const { height, width } = Dimensions.get("window");

const VerifyOtp = (props) => {
  const [isGetEmail, setIsGetEMail] = useState(props?.route?.params?.Email);
  const [loader, setLoader] = useState(false);
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
        email: isGetEmail,
        otp: code,
      },
    })
      .then((response) => {
        setLoader(false);
        if (response.data.responseCode === 200) {
          console.log("===== Verify Otp Response =====", response);
          props.navigation.navigate("SetPassword", { isGetEmail: isGetEmail });
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
          alert("Something went wrong");
        }
      })
      .catch((err) => {
        setLoader(false);
        console.log("==== Forgot Catch error=====", err);
        if (err.response.data.responseCode === 400) {
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
  const validate=(code)=>{
    console.log(code)
    if(code==null||code==""){
      showMessage({
        message:"Please enter valid OTP",
        type:"danger"
      })
    }else{
      SignUpVerifyApi(code)
    }
  }

  // ************* Resend Otp Api Integration *************
  const ResendOtpApi = () => {
    setLoader(true);
    axios({
      method: "post",
      url: ResendOtpUrl,
      data: {
        email: isGetEmail,
      },
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 200) {
          console.log("===== Resend Otp Response =====", response);
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

  function renderHeader() {
    return (
      <View style={styles.headerView}>
        <AuthHeader
          backIcon={true}
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
        </Text>
        <Text style={styles.urlTxt}>The Current URL</Text> */}
        <Text numberOfLines={2} style={styles.urlTxt}>
          We have sent an OTP on {isGetEmail}
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
          //containerStyle={{ backgroundColor: "red" }}
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
            onCodeChanged = {code => {setOtpCode(code)}}
            autoFocusOnLoad={false}
            codeInputFieldStyle={[{
              // borderColor: otperror ? "red" : "#2D3837",
              backgroundColor: COLOR.TXT_INPT_COLOR,
              color: 'white',
              fontSize: Platform.OS === "ios" ? height / 20 : height / 28,
              height: Platform.OS === "ios" ? height * 0.08 : height * 0.08,
              borderRadius: height * 0.013,
              width: width * 0.15,
              alignItems: "center",
              borderWidth:0
            }]}
            secureTextEntry={true}
          />
        {count ? (
          <CountDown
            until={180}
            size={12}
            onFinish={() => {
              setCount(false), setSendOtp(false);
            }}
            digitStyle={{ backgroundColor: COLOR.BACKGROUND_THEME }}
            digitTxtStyle={{ color: COLOR.GREY, fontSize: height / 50 }}
            separatorStyle={{ color: COLOR.GREY, fontSize: height / 50 }}
            timeToShow={["M", "S"]}
            timeLabels={{ m: "", s: "" }}
            showSeparator
            style={{
              marginTop: height * 0.03,
            }}
          />
        ) : (
          null
        )}
      </View>
    );
  }

  function renderResend() {
    return (
      <>
        {!count ? (
          <View style={styles.resendView}>
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
        ) : null}
      </>
    );
  }

  return (
    <SafeAreaView>
      {
        loader&&<Progressdialog/>
      }
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
    </SafeAreaView>
  );
};

export default VerifyOtp;

const styles = StyleSheet.create({
  BacktoLoginBtnContainer: {
    height: height * 0.135,
    width: width * 0.9,
    justifyContent: "flex-end",
    alignSelf: "center",
  },
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
  },
});
