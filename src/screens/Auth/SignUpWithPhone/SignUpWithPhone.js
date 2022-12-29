import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Modal,
  FlatList,
  TextInput,
  ActivityIndicator,
  Platform
} from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CustomInput from "../../../components/CustomInput/CustomInput";
import AppButton from "../../../components/CustomButton/CustomButton";
import moment from "moment";
import { ImagePath } from "../../../constants/ImagePath";
import { COLOR } from "../../../Utils/Colors";
import AuthHeader from "../../../components/CustomHeader/AuthHeader";
import { EmailCheckUrl, SignUpUrl } from "../../../restAPI/ApiConfig";
import axios from "axios";
import DatePicker from "react-native-date-picker";
import {
  onCheckcapitalandSmall,
  isNumeric,
  notonCheckspecialCharacters,
} from "../../../Utils/Validatefun";
import { showMessage } from "react-native-flash-message";
import CustomLoader from "../../../components/CustomLoader/CustomLoader";
import { countryCode } from "../../../Utils/countryCode";
const { height, width } = Dimensions.get("window");

const SignUpWithPhone = (props) => {
  const [loader, setLoader] = useState(false);
  const [isvisiblePassword, setvisiblePassword] = useState(false);
  const [date, setDate] = useState(new Date());
  const [newdate, setNewdate] = useState("");
  const [newDateError, setNewDateError] = useState(null);
  const [open, setOpen] = useState(false);
  const [NameAvailability, setNameAvailability] = useState("");
  const [showActIndicator, setShowActIndicator] = useState(false);
  const [ReferralID, setReferralID] = useState('')

  // ************ Mobile Validation ************
  const [Mobile, setMobile] = useState("");
  const [errorMobile, setErrorMobile] = useState(null);
  const _mobileValidate = (phone) => {
    var phoneNoRegex = /^[7-9]([0-9]){9}$/;
    if (phone === "") {
      setErrorMobile("*Please enter phone number");
    } else if (!phoneNoRegex.test(phone)) {
      setErrorMobile("*Please enter phone number");
    } else {
      setErrorMobile(null);
    }
  };

  // ************ Name Validation ************
  const [Name, setName] = useState("");
  const [errorName, setErrorName] = useState(null);
  const _validateName = (fname) => {
    // var fnameRegex = /^[a-z A-Z ]{3,32}$/i;
    SignUpEmailValidate();
    var fnameRegex = /^[a-zA-Z0-9@_]{0,30}$/i;
    if (fname === "") {
      setErrorName("*Please enter username.");
      return false;
    } else if (!fnameRegex.test(fname)) {
      setErrorName("*Please enter valid username.");
      return false;
    } else {
      setErrorName(null);
      return true;
    }
  };

  // ************ Password Validation ************
  const [Password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState(null);
  const _passwordvalidate = (pass) => {
    var passwordRegex =
      /^(?=.*[0-9])(?=.*[!@#$%^&*?;,+<>])[a-zA-Z0-9!@#$%^&*?;,+<>]{8,16}$/;
    if (pass === "") {
      setErrorPassword("*Please enter password.");
    } else if (
      notonCheckspecialCharacters(pass) == true ||
      onCheckcapitalandSmall(pass) == false ||
      isNumeric(pass) == false ||
      pass.length < 8 == true ||
      !passwordRegex.test(pass)
    ) {
      setErrorPassword(
        "*Password must contain an uppercase letter, a special character, a number & must be 8-20 characters."
        // "*Contains uppercase & lowaercase,one special characters,one number, password must be 8-20 characters."
      );
      return false;
    } else {
      setErrorPassword(null);
    }
  };

  const onDateChange = (value) => {
    if(value){
      setNewDateError(null);
      return true;
    }
    else{
      setNewDateError('*Please enter your birth date');
      return false;
    }
  }

  const validate = () => {
    let flag = true;

    if (Mobile === "") {
      setErrorMobile("*Please enter phone number.");
      flag = false;
    }
    if (Name === "") {
      setErrorName("*Please enter username.");
      flag = false;
    }
    if (Password === "") {
      setErrorPassword("*Please enter password.");
      flag = false;
    }
    if (male==='' && female===''){
      setGenderError('*Please select your gender.')
      flag=false;
    }
    return flag;
  };

  const onSubmit = () => {
    if (validate() && onDateChange(newdate)) {
      SignUpApi();
    } else {
      onDateChange(newdate);
    }
  };
  useEffect(()=>{
    const date_=new Date();
    date_.setFullYear(date_.getFullYear()-18);
    setDate(date_);
  },[])

  // useEffect(() => {
  //   myAge();
  //   if (Name) {
  //     SignUpEmailValidate();
  //   }
  // }, [Name]);

  // const StoreName = (value) => {
  //   setNameAvailability(value);
  // };

  // ************* SignUp Api Integration *************
  const SignUpEmailValidate = () => {
    setLoader(true);
    axios({
      method: "get",
      url: EmailCheckUrl,
      params: {
        search: Name,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          // StoreName(response.data.responseMessage);
          setNameAvailability(response.data.responseMessage);
          setLoader(false);
        } else {
          setLoader(false);
        }
      })
      .catch((err) => {
        if (err.response.data.responseCode === 404) {
          setNameAvailability(err.response.data.responseMessage);
        } else {
          setLoader(false);
        }
        setLoader(false);
      });
  };

  // ************* SignUp Api Integration *************
  const SignUpApi = () => {
    let MobileData = {
      userName: Name,
      countryCode: countryyCode,
      mobileNumber: Mobile,
      password: Password,
      dob: moment(date).format(),
      gender: male || female,
      refereeCode:ReferralID

    };

    setLoader(true);
    axios({
      method: "post",
      url: SignUpUrl,
      data: MobileData,
      headers: {
        "content-type": "application/json",
      },
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
          props.navigation.navigate("SignUpVerify", { Mobile: Mobile });
          setLoader(false);
        } else {
          setLoader(false);
        }
      })
      .catch((err) => {
        if (err?.response?.data?.responseCode === 401 || 404 || 409) {
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
          setLoader(false);
        }
        setLoader(false);
      });
  };

  const [Dob, setDob] = useState("");
  const [male, setMale] = useState("");
  const [female, setFemale] = useState("");
  const [GenderError, setGenderError] = useState(null)

  // **************** COUNTRY-CODE **************
  const [filterdata, setFilterdata] = useState(countryCode);
  const [countryyCode, setcountryCode] = useState("+91");
  const [contrymodal, setcontrymodal] = useState(false);
  const [countryimage, setContryimage] = useState(
    require("../../../assets/countryImages/in.png")
  );

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = countryCode.filter(function (item) {
        const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilterdata(newData);
    } else {
      setFilterdata(countryCode);
    }
  };

  // **************** COUNTRY-CODE **************

  function renderMiddle() {
    return (
      <View style={styles.middleView}>
        <Text style={styles.startedTxt}>Getting Started</Text>
        <Text style={styles.createTxt}>Create an account to continue and</Text>
        <Text style={styles.connectTxt}>connect with people</Text>
      </View>
    );
  }

  function SignUpCondition() {
    return (
      <View style={styles.LoginEmailTxtContainer}>
        <TouchableOpacity onPress={() => props.navigation.replace("SignUp")}>
          {/* <Text style={styles.LoginEmailTxt}>Signup with email</Text> */}
          <Text style={styles.LoginEmailTxt}>Sign up with email</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function renderInput() {
    return (
      <View style={styles.InputContainer}>
        {/* **************** Email Input Field ************** */}
        <View style={styles.InputFieldContainer}>
          <CustomInput
            LeftIcon={false}

            RightIcon={false}
            ImgStyling={{ height: 15, width: 15 }}
            placeholder={"Enter your phone number"}
            value={Mobile}
            placeholderTextColor={COLOR.GREY}
            keyboardType="number-pad"
            minLength={7}
            maxLength={10}
            iscountryCode={true}
            styles={styles.PhoneContainer}
            countryCode_code={countryCode}
            onChangeCountryCode={(code)=>{
              setcountryCode(code)
            }}

            onChangeText={(txt) => {
              setMobile(txt), _mobileValidate(txt);
            }}
          />
        </View>
        {errorMobile != null ? (
          <View style={styles.ErrorContainer}>
            <Text style={{ color: "red", fontSize: height / 65 }}>
              {errorMobile}
            </Text>
          </View>
        ) : null}

        {/* **************** UserName Input Field ************** */}
        <View
          style={[styles.InputFieldContainer, { marginTop: verticalScale(20) }]}
        >
          <CustomInput
            LeftIcon={true}
            leftImg={ImagePath.USER_ICON}
            placeholder="Your name"
            placeholderTextColor={COLOR.GREY}
            styles={styles.EmailStyling}
            onChangeText={(txt) => {
              setName(txt), _validateName(txt);
            }}
            maxLength={30}
          />
        </View>
        {errorName != null ? (
          <View style={styles.ErrorContainer}>
            <Text style={{ color: "red", fontSize: height / 65 }}>
              {errorName}
            </Text>
          </View>
        ) : NameAvailability === "Username already taken." ? (
          <View style={[styles.ErrorContainer, { marginTop: 2 }]}>
            <Text style={{ color: "red", fontSize: height / 65 }}>
              {NameAvailability}
            </Text>
          </View>
        ) : null}

        {/* **************** Password Input Field ************** */}
        <View
          style={[styles.InputFieldContainer, { marginTop: verticalScale(20) }]}
        >
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
            ImgStyling={{ height: 20, width: 20, tintColor: COLOR.GREY}}
            placeholder="Create password"
            placeholderTextColor={COLOR.GREY}
            secureTextEntry={isvisiblePassword == false ? true : false}
            styles={[styles.EmailStyling, { width: width * 0.68, paddingRight:20 }]}
            onChangeText={(txt) => {
              setPassword(txt), _passwordvalidate(txt);
            }}
            maxLength={20}
          />
        </View>
        {errorPassword != null ? (
          <View style={styles.ErrorContainer}>
            <Text style={{ color: "red", fontSize: height / 65 }}>
              {errorPassword}
            </Text>
          </View>
        ) : null}

        {/* **************** DOB Input Field ************** */}
        <View style={[styles.dateContainer, { marginTop: verticalScale(20) }]}>
          <Text style={styles.dateTxt}>
            {!newdate ? "Select date of birth" : moment(date).format("L")}
          </Text>
          <DatePicker
            modal
            open={open}
            date={date}
            onConfirm={(date) => {
              setOpen(false);
              setDate(date);
              setNewdate(date);
              onDateChange(date)
            }}
            theme="light"

            onCancel={() => setOpen(false)}
            mode="date"
            textColor={COLOR.BLACK}
            maximumDate={date}
            minimumDate={new Date(1970, 1, 1)}
          />
          <TouchableOpacity
            style={{ justifyContent: "center" }}
            onPress={() => setOpen(true)}
          >
            <Image
              source={ImagePath.CALENDER_IMG}
              style={{
                height: 25,
                width: 25,
                tintColor: COLOR.GREY,
                left: -35,
                position: "absolute",
              }}
            />
          </TouchableOpacity>
        </View>
        {newDateError!=null &&
        <View style={styles.ErrorContainer}>
          <Text style={{ color: "red", fontSize: height / 65, }}>
            {newDateError}
          </Text>
        </View>}
        <View style={[styles.InputFieldContainer, { marginTop: verticalScale(20) }]}>
          <CustomInput
            LeftIcon={false}
            ImgStyling={{ height: 20, width: 20, tintColor: COLOR.GREY,  }}
            placeholder="Referral ID"
            placeholderTextColor={COLOR.GREY}
            styles={[styles.EmailStyling, { width: width * 0.68, paddingRight:20 }]}
            onChangeText={(txt) => {
              setReferralID(txt)
            }}
            maxLength={20}
          />
        </View>
      </View>
    );
  }

  function radioBtn() {
    return (
      <View>
        <View style={[styles.btnView]}>
          <View style={styles.maleView}>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                setFemale(null), setMale("Male"), setGenderError(null)
              }}
              style={[styles.maleBtn, { flexDirection: "row" }]}
            >
              <Image
                source={male ? ImagePath.RADIOBTN : ImagePath.NEW_UNCHECK_ICON}
                style={styles.maleBtnImg}
                resizeMode="contain"
              />
              <Text style={[styles.maleTxt, { marginLeft: height * 0.01 }]}>
                Male
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.femaleView}>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                setMale(null), setFemale("Female"), setGenderError(null)
              }}
              style={[styles.maleBtn, { flexDirection: "row" }]}
            >
              <Image
                source={female ? ImagePath.RADIOBTN : ImagePath.NEW_UNCHECK_ICON}
                style={styles.maleBtnImg}
                resizeMode="contain"
              />
              <Text style={[styles.maleTxt, { marginLeft: height * 0.01 }]}>
                Female
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {GenderError != null ? 
        <View style={[styles.ErrorContainer, {marginLeft:25}]}>
          <Text style={{ color: "red", fontSize: height / 65 }}>
            {GenderError}
          </Text>
        </View> : null}
      </View>
    );
  }

  function renderSignUpBtn() {
    return (
      <View style={styles.BtnContainer}>
        {loader ? (
          <CustomLoader loadingDesign={{ marginTop: height * 0.07 }} />
        ) : (
          <AppButton
            title="Sign Up"
            type="large"
            textStyle={{ fontFamily: "Montserrat-Bold" }}
            ButtonPress={() => onSubmit()}
          />
        )}
      </View>
    );
  }

  function renderLogin() {
    return (
      <View style={styles.loginView}>
        <Text style={styles.registerTxt}>If you have already registered? </Text>
        <TouchableOpacity onPress={() => props.navigation.navigate("Login")}>
          <Text style={styles.loginTxt}>Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const myAge = (date) => {
    const age = moment().diff(moment(date), "years") >= 18;
    return age;
  };

  return (
    <SafeAreaView>
      <KeyboardAwareScrollView>
        <View style={styles.MainContainer}>
          <View style={styles.headerView}>
            <AuthHeader
              backIcon={true}
              onBackPress={() => props.navigation.goBack()}
              AuthLogo={true}
              ImgNewStyle={{marginLeft:width*0.03}}
            />
          </View>
          {renderMiddle()}
          {SignUpCondition()}
          {renderInput()}
          {radioBtn()}
          {renderSignUpBtn()}
          {renderLogin()}
        </View>
      </KeyboardAwareScrollView>

      {/* ************** Country Code Modal ************** */}
      <Modal animationType="fade" transparent={true} visible={contrymodal}>
        <TouchableOpacity
          onPress={() => setcontrymodal(!contrymodal)}
          style={{
            // backgroundColor: "rgba(0, 0, 0, 0.7)",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={styles.ListSearchContainer}>
            <View style={styles.TxtInptSearchContainer}>
              <TextInput
                // placeholderTextColor="rgb(0,0,0)"
                color="rgb(0,0,0))"
                placeholder={"Search country code"}
                placeholderTextColor={COLOR.WHITE}
                style={styles.TxtInptSearch}
                maxLength={10}
                onChangeText={(txt) => searchFilterFunction(txt)}
              />
            </View>
            <FlatList
              data={filterdata}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    style={styles.TouchCountrySelect}
                    onPress={async () => {
                      setcountryCode(item.dialCode);
                      setContryimage(item.icon);
                      setcontrymodal(!contrymodal);
                    }}
                  >
                    <Image
                      style={{
                        height: 35,
                        width: 35,
                        borderRadius: 35 / 2,
                      }}
                      source={item.icon}
                    />
                    <View style={styles.NameDialCodeContainer}>
                      <Text
                        style={{
                          color: COLOR.WHITE,
                          fontFamily: "Montserrat-Medium",
                        }}
                      >
                        {item.name}
                      </Text>
                      <Text
                        style={{
                          marginRight: height * 0.04,
                          color: COLOR.WHITE,
                          fontFamily: "Montserrat-Medium",
                        }}
                      >
                        {item.dialCode}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

export default SignUpWithPhone;

const styles = StyleSheet.create({
  headerView: {
    marginTop: height * 0.02,
    flexDirection: "row",
    height: height * 0.08,
    width: width * 0.7,
    alignItems: "center",
    justifyContent: "space-between",
  },
  MainContainer: {
    // height: height * 1.14,
    // width: width * 1,
    flex: 1,
    backgroundColor: COLOR.BACKGROUND_THEME,
  },
  backIconView: {
    marginLeft: width * 0.02,
    height: height * 0.06,
    width: width * 0.12,
    borderWidth: height * 0.001,
    borderColor: COLOR.RIGHT_BORDER_WIDTH,
    borderRadius: height * 0.01,
    alignItems: "center",
    justifyContent: "center",
  },
  dateTxt: {
    color: COLOR.GREY,
    fontFamily: "Montserrat-Regular",
    fontSize: height / 55,
  },
  maleView: {
    marginLeft: width * 0.03,
    height: height * 0.04,
    width: width * 0.2,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  femaleView: {
    marginLeft: width * 0.02,
    height: height * 0.04,
    width: width * 0.24,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  BtnContainer: {
    height: height * 0.14,
    width: width * 0.9,
    justifyContent: "flex-end",
    alignSelf: "center",
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
  maleTxt: {
    color: COLOR.WHITE,
    fontWeight: "400",
    fontSize: height / 45,
    fontFamily: "MontSerrat-Regular",
  },
  middleView: {
    height: height * 0.2, // 0.23
    width: width * 1,
    justifyContent: "center",
    alignItems: "center",
  },
  startedTxt: {
    fontSize: height / 28,
    color: COLOR.TXT_COLOR,
    fontFamily: "Montserrat-SemiBold",
  },
  createTxt: {
    fontSize: height / 45,
    marginTop: height * 0.01,
    color: COLOR.TXT_COLOR,
    fontFamily: "Montserrat-Regular",
  },
  maleBtnImg: {
    height: height * 0.024,
    width: width * 0.055,
  },
  connectTxt: {
    fontSize: height / 45,
    marginTop: height * 0.008,
    color: COLOR.TXT_COLOR,
    fontFamily: "Montserrat-Regular",
  },
  btnView: {
    marginLeft: width * 0.02,
    height: height * 0.04,
    width: width * 0.6,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginTop:10
  },
  InputContainer: {
    // height: height * 0.45,
    // height: height * 0.55, // 9 june
    width: width * 1,
    alignItems: "center",
  },
  loginView: {
    height: height * 0.1,
    width: width * 1,
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: height * 0.06,
    flexDirection: "row",
    justifyContent: "center",
  },
  InputFieldContainer: {
    backgroundColor: COLOR.TXT_INPT_COLOR,
    color: COLOR.WHITE,
    borderRadius: scale(10),
    justifyContent: "center",
  },
  loginTxt: {
    color: COLOR.BUTTON_PINK,
    fontFamily: "MontSerrat-Regular",
  },
  registerTxt: {
    color: COLOR.WHITE,
    fontFamily: "Montserrat-Regular",
  },
  dateContainer: {
    height: height * 0.08,
    width: width * 0.9,
    backgroundColor: COLOR.TXT_INPT_COLOR,
    color: COLOR.WHITE,
    borderRadius: scale(10),
    justifyContent: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: width * 0.04,
  },
  ErrorContainer: {
    // height: height * 0.02,
    width: width * 0.9,
    justifyContent: "center",
    marginBottom: -verticalScale(10),
  },
  EmailStyling: {
    height: height * 0.08,
    width: width * 0.8,
    backgroundColor: COLOR.TXT_INPT_COLOR,
    color: COLOR.GREY,
    borderRadius: scale(10),
    padding: moderateScale(8),
    fontFamily: "Montserrat-Regular",
    fontSize: height / 55,
  },
  PasswordStyling: {
    height: height * 0.08,
    backgroundColor: COLOR.TXT_INPT_COLOR,
    color: COLOR.GREY,
    borderRadius: scale(10),
    padding: moderateScale(8),
    fontFamily: "Montserrat-Regular",
    fontSize: height / 55,
  },
  LoginEmailTxtContainer: {
    height: height * 0.04, // 0.025
    width: width * 0.94,
    justifyContent: "flex-start",
    alignItems: "flex-end",
    marginTop: -height * 0.01,
  },
  LoginEmailTxt: {
    color: COLOR.BUTTON_PINK,
    fontSize: height / 55,
    fontFamily: "Montserrat-Medium",
    textDecorationLine: "underline",
    textDecorationColor: COLOR.BUTTON_PINK,
  },
  PhoneContainer: {
    height: height * 0.08,
    width: width * 0.6,
    backgroundColor: COLOR.TXT_INPT_COLOR,
    color: COLOR.GREY,
    borderRadius: scale(10),
    padding: moderateScale(8),
    fontFamily: "Montserrat-Regular",
    fontSize: height / 55,
  },

  // ------- Country Code Styling -------
  ListSearchContainer: {
    width: width * 0.9,
    height: height * 0.5,
    backgroundColor: "rgba(26, 26, 26, 1)",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLOR.TXT_INPT_COLOR,
  },
  TxtInptSearchContainer: {
    height: height * 0.09,
    alignItems: "center",
    justifyContent: "center",
  },
  TxtInptSearch: {
    padding: 15,
    borderRadius: 5,
    fontSize: height / 50,
    fontFamily: "Montserrat-Bold",
    width: width * 0.85,
    backgroundColor: COLOR.TXT_INPT_COLOR,
    color: COLOR.WHITE,
  },
  TouchCountrySelect: {
    flexDirection: "row",
    marginHorizontal: width * 0.05,
    marginVertical: 5,
  },
  NameDialCodeContainer: {
    left: width * 0.02,
    flexDirection: "row",
    justifyContent: "space-between",
    width: width * 0.75,
    alignItems: "center",
  },
  // ------- Country Code Styling -------
});
