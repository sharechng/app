import React, {useState, useContext, useEffect} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  Dimensions,
  TouchableOpacity,
  Platform,
  Modal,
  StyleSheet,
} from 'react-native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import CustomInput from '../../../components/CustomInput/CustomInput';

import {ImagePath} from '../../../constants/ImagePath';
import {COLOR} from '../../../Utils/Colors';
import Styles from './Styles';
import AppButton from '../../../components/CustomButton/CustomButton';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../../../context/AuthContext';
import {LoginUrl, ServerUrl, SocialLoginUrl} from '../../../restAPI/ApiConfig';
import Progressdialog from '../../../../Progressdialog';
const {height, width} = Dimensions.get('window');
import messaging from "@react-native-firebase/messaging";

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk-next';
import {
  onCheckcapitalandSmall,
  isNumeric,
  notonCheckspecialCharacters,
} from '../../../Utils/Validatefun';

import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {showMessage} from 'react-native-flash-message';
import {getFcmToken, requestUserPermission} from '../../../Utils/NotificationsServices';
import {normalize} from '../../../../ResponsiveFontSize';
// const { RNTwitterSignIn } = NativeModules;
// const Constants = {
//   TWITTER_API_KEY: "6QrATuQlxlutY1vGKrrCIAwyD",
//   TWITTER_SECRET_KEY: "dCrmloBGOPw5NlxZ5GSMjDsJ0oASyCvlrZiyTxvx5gGNgxoOYB",
// };

const Login = props => {
  const [loader, setLoader] = useState(false);
  const [iAgree, setIAgree] = useState(false);
  const [isvisiblePassword, setvisiblePassword] = useState(false);
  const [googleInfo, setGoogleInfo] = useState('');
  const [UserName, setUserName] = useState('');
  const [Token, setToken] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [addreferidmodal, setaddreferidmodal] = useState(false)
  const [ReferralID, setReferralID] = useState('')

  const auth = useContext(AuthContext);

  // ************ Email Validation ************
  const [Mobile, setMobile] = useState('');
  const [errorMobile, setErrorMobile] = useState(null);
  const _mobilevalidate = phone => {
    var phoneRegex = /^[7-9]([0-9]){9}$/;
    if (phone === '') {
      setErrorMobile('*Please enter phone number.');
    } else if (!phoneRegex.test(phone)) {
      setErrorMobile('*Please enter phone number');
    } else {
      setErrorMobile(null);
    }
  };

  // ************ Password Validation ************
  const [Password, setPassword] = useState('');
  const [errorPassword, setErrorPassword] = useState(null);
  const _passwordvalidate = pass => {
    var passwordRegex =
      /^(?=.*[0-9])(?=.*[!@#$%^&*?<>;,+])[a-zA-Z0-9!@#$%^&*?<>;,+]{8,16}$/;
    if (pass === '') {
      setErrorPassword('*Please enter password.');
    } else if (
      notonCheckspecialCharacters(pass) == true ||
      onCheckcapitalandSmall(pass) == false ||
      isNumeric(pass) == false ||
      pass.length < 8 == true ||
      !passwordRegex.test(pass)
    ) {
      setErrorPassword(
        '*Please enter password.',
        // "*Contains uppercase & lowaercase,one special characters,one number, password must be 8-20 characters."
      );
      return false;
    } else {
      setErrorPassword(null);
    }
  };

  const validate = () => {
    let flag = true;
    console.log('Mobile', Mobile);
    if (Mobile == null || Mobile === '') {
      setErrorMobile('*Please enter phone number.');
      flag = false;
    }

    if (Password == null || Password === '') {
      setErrorPassword('*Please enter password.');
      flag = false;
    }
    return flag;
  };

  const onSubmit = () => {
    if (validate()) {
      LoginApi();
    } else {
    }
  };

  useEffect(() => {
    const nav=props.navigation.addListener('focus',()=>{

      requestUserPermission()
      getFcmToken()
      try {
        GetCredential()
      } catch (error) {
      }
    });
    return nav;
  }, [props.navigation]);

  const GetCredential = async () => {
    const LocalEmail = await AsyncStorage.getItem('Mobile');
    setMobile(LocalEmail);
    const LocalPassword = await AsyncStorage.getItem('Password1');
    setPassword(LocalPassword);
  };

  // ************ Login Api Integration ************
  const LoginApi = async () => {
    const fcmToken = await messaging().getToken();


    const DATA = {
      email: Mobile,
      password: Password,
      deviceType: Platform.OS === 'android' ? 'android' : 'ios',
      deviceToken: fcmToken,
    };
    console.log('----- Phone with Phone Data -----', DATA);

    setLoader(true);
    axios({
      method: 'post',
      url: LoginUrl,
      data: DATA,
      headers: {'content-type': 'application/json'},
    })
      .then(async response => {
        if (response.data.responseCode === 200) {
          console.log('====== Login Api Response ======', response);
          AsyncStorage.setItem('token', response?.data?.result?.token);
          if (iAgree) {
            AsyncStorage.setItem('Mobile', Mobile);
            AsyncStorage.setItem('Password1', Password);
          } else {
            AsyncStorage.removeItem('Mobile');
            AsyncStorage.removeItem('Password1');
          }
          showMessage({
            message: response?.data?.responseMessage,
            type: 'success',
            icon: 'success',
            textStyle: {
              fontFamily: 'Montserrat-Medium',
              fontSize: height / 55,
            },
            style: {
              width: Platform.OS === 'android' ? width * 0.92 : null,
              borderRadius: Platform.OS === 'android' ? 5 : null,
              margin: Platform.OS === 'android' ? 15 : null,
              alignItems: Platform.OS === 'android' ? 'center' : null,
            },
          });
          
          AsyncStorage.setItem('logintype', 'phone');

          props.navigation.replace('Home');
          setLoader(false);
        } else {
          showMessage({
            message: response?.data?.responseMessage,
            type: 'warning',
            icon: 'warning',
            textStyle: {
              fontFamily: 'Montserrat-Medium',
              fontSize: height / 55,
            },
            style: {
              width: Platform.OS === 'android' ? width * 0.92 : null,
              borderRadius: Platform.OS === 'android' ? 5 : null,
              margin: Platform.OS === 'android' ? 15 : null,
              alignItems: Platform.OS === 'android' ? 'center' : null,
            },
          });
          setLoader(false);
        }
      })
      .catch(err => {
        if (err.response.data.responseCode === 401 || 402 || 404) {
          if (err.response.data.responseMessage == 'User not found.') {
            setErrorPassword('*User not found.');
            // setErrorEmail("*User not found.");
          }
          showMessage({
            message: err.response.data.responseMessage,
            type: 'danger',
            icon: 'danger',
            textStyle: {
              fontFamily: 'Montserrat-Medium',
              fontSize: height / 55,
            },
            style: {
              width: Platform.OS === 'android' ? width * 0.92 : null,
              borderRadius: Platform.OS === 'android' ? 5 : null,
              margin: Platform.OS === 'android' ? 15 : null,
              alignItems: Platform.OS === 'android' ? 'center' : null,
            },
          });
          setLoader(false);
        } else {
          setLoader(false);
        }
      });
  };

  // ************ Google Configure Fun Call ************
  useEffect(() => {
    GoogleSignin.configure({
      // webClientId: '735827050295-pf0h46rbgr7cviakmfqfshl4ailv4a0i.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      webClientId:
        '323394814656-tbsf9cbi0iadbfav3rgvce5e4nfvjsdm.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      iosClientId:
        '323394814656-amp0fsodhu7o9tqu52bmsolghbqhq7gh.apps.googleusercontent.com',
    });
  }, [props.route]);

  // ***********?????? Facebook Login Functions ??????***********
  const getUser = token => {
    fetch(
      'https://graph.facebook.com/v2.5/me?fields=email,name,picture.type(large),friends&access_token=' +
        token,
    )
      .then(response => response.json())
      .then(json => {
        FacebookLoginApi(json);
      })
      .catch(() => {
        showMessage({
          message: 'ERROR GETTING DATA FROM FACEBOOK',
          type: 'danger',
          icon: 'danger',
          duration: 300,
          textStyle: {
            fontFamily: 'Montserrat-Medium',
            fontSize: height / 55,
          },
          style: {
            width: Platform.OS === 'android' ? width * 0.92 : null,
            borderRadius: Platform.OS === 'android' ? 5 : null,
            margin: Platform.OS === 'android' ? 15 : null,
            alignItems: Platform.OS === 'android' ? 'center' : null,
          },
        });
      });
  };

  const FBLogin = () => {
    if (Platform.OS === 'android') {
      LoginManager.setLoginBehavior('web_only');
    }

    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      async result => {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          console.log(
            'Login success with permissions: ' +
              result.grantedPermissions.toString(),
          );
          const data = await AccessToken.getCurrentAccessToken();
          getUser(data.accessToken);

          console.log('===== FB Access Token =====', data.accessToken);
        }
      },
      function (error) {
        console.log('Login fail with error: ' + error);
      },
    );
  };

  // const _onLoginFinished = (error, result) => {
  //   if (error) {
  //     alert(error);
  //     console.log("Login has error: " + result.error);
  //   } else if (result.isCancelled) {
  //     alert("Login is cancelled.");
  //   } else {
  //     AccessToken.getCurrentAccessToken().then((data) => {
  //       console.log(data.accessToken.toString());
  //       const processRequest = new GraphRequest(
  //         "/me?fields=name,picture.type(large)",
  //         null,
  //         getResponseInfo
  //       );
  //       // Start the graph request.
  //       new GraphRequestManager().addRequest(processRequest).start();
  //     });
  //   }
  // };

  // const getResponseInfo = (error, result) => {
  //   if (error) {
  //     //Alert for the Error
  //     alert("Error fetching data: " + error.toString());
  //   } else {
  //     //response alert
  //     console.log("======>", result);
  //     setUserName("Welcome " + result.name);
  //     // alert('hi vandana');
  //     FacebookLoginApi(result);
  //     setToken("User Token: " + result.id);
  //     setProfilePic(result.picture.fbdata.url);
  //     console.log(
  //       "===== Saved FB Details =======",
  //       UserName,
  //       Token,
  //       profilePic
  //     );
  //   }
  // };

  // ***********?????? Google Login Functions ??????***********
  const GoogleLogin = async () => {
    try {
      setLoader(true);

      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setGoogleInfo(userInfo);
      GoogleLoginApi(userInfo);
    } catch (error) {
      setLoader(false);

      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        showMessage({
          message: 'User cancelled login.',
          type: 'danger',
          icon: 'danger',
        });
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        showMessage({
          message: 'Signing in...',
          type: 'danger',
          icon: 'danger',
        });
        // operation in progress already

        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        showMessage({
          message: 'Play services not available.',
          type: 'danger',
          icon: 'danger',
        });
        // play services not available or outdated
      } else {
        showMessage({
          message: JSON.stringify(error),
          type: 'danger',
          icon: 'danger',
        });
        // some other error happened
      }
    }
  };

  // *********** Social- Google Api Integrations ***********
  const GoogleLoginApi = async userInfo => {
    const fcmToken = await messaging().getToken();


    setLoader(true);
    axios({
      method: 'post',
      url: SocialLoginUrl,
      data: {
        socialId: userInfo?.user?.id,
        socialType: 'GOOGLE',
        deviceType: Platform.OS === 'android' ? 'android' : 'ios',
        deviceToken: fcmToken,
        email: userInfo?.user?.email,
        mobileNumber: userInfo?.user?.mobile,
        name: userInfo?.user?.name,
      },
    })
      .then(async response => {
        await AsyncStorage.setItem('token', response?.data?.result?.token);
        if (response.data.responseCode === 200) {
          if(!response.data?.result?.userInfo?.firstTime){
            setaddreferidmodal(true)
          }else{

            showMessage({
              message: response?.data?.responseMessage,
              type: 'success',
              icon: 'success',
              textStyle: {
                fontFamily: 'Montserrat-Medium',
                fontSize: height / 55,
              },
              style: {
                width: Platform.OS === 'android' ? width * 0.92 : null,
                borderRadius: Platform.OS === 'android' ? 5 : null,
                margin: Platform.OS === 'android' ? 15 : null,
                alignItems: Platform.OS === 'android' ? 'center' : null,
              },
            });
            AsyncStorage.setItem('logintype', 'google');
  
            // props.navigation.navigate("Home");
            props.navigation.replace('Home');
          }
          setLoader(false);
        } else {
          // alert("Something went wrong.");
          showMessage({
            message: 'Something went wrong.',
            type: 'success',
            icon: 'success',
            textStyle: {
              fontFamily: 'Montserrat-Medium',
              fontSize: height / 55,
            },
            style: {
              width: Platform.OS === 'android' ? width * 0.92 : null,
              borderRadius: Platform.OS === 'android' ? 5 : null,
              margin: Platform.OS === 'android' ? 15 : null,
              alignItems: Platform.OS === 'android' ? 'center' : null,
            },
          });
          setLoader(false);
        }
      })
      .catch(err => {
        const message = err.response?.data?.responseMessage
          ? err.response?.data?.responseMessage
          : 'Something went wrong.';
        showMessage({
          message: message,
          type: 'danger',
          icon: 'danger',
        });
        setLoader(false);
      });
  };

  // *********** Social- Facebook Api Integrations ***********
  const FacebookLoginApi = async fbdata => {
    const fcmToken = await messaging().getToken();


    setLoader(true);
    axios({
      method: 'post',
      url: SocialLoginUrl,
      data: {
        socialId: fbdata?.id,
        socialType: 'FACEBOOK',
        deviceType: Platform.OS === 'android' ? 'android' : 'ios',
        deviceToken: fcmToken,
        name: fbdata?.name,
        email: fbdata?.email,
        mobileNumber: fbdata?.mobile,
      },
    })
      .then(async response => {
        if (response.data.responseCode === 200) {
          await AsyncStorage.setItem('token', response?.data?.result?.token);
          if(!!response.data?.result?.userInfo?.firstTime){
            setaddreferidmodal(true)
          }else{

            showMessage({
              message: response?.data?.responseMessage,
              type: 'success',
              icon: 'success',
              textStyle: {
                fontFamily: 'Montserrat-Medium',
                fontSize: height / 55,
              },
              style: {
                width: Platform.OS === 'android' ? width * 0.92 : null,
                borderRadius: Platform.OS === 'android' ? 5 : null,
                margin: Platform.OS === 'android' ? 15 : null,
                alignItems: Platform.OS === 'android' ? 'center' : null,
              },
            });
            AsyncStorage.setItem('logintype', 'facebook');
  
            props.navigation.navigate('Home');
          }
          setLoader(false);
        } else {
          // alert("Something went wrong.");
          showMessage({
            message: 'Something went wrong.',
            type: 'danger',
            icon: 'danger',
            textStyle: {
              fontFamily: 'Montserrat-Medium',
              fontSize: height / 55,
            },
            style: {
              width: Platform.OS === 'android' ? width * 0.92 : null,
              borderRadius: Platform.OS === 'android' ? 5 : null,
              margin: Platform.OS === 'android' ? 15 : null,
              alignItems: Platform.OS === 'android' ? 'center' : null,
            },
          });
          setLoader(false);
        }
      })
      .catch(err => {
        setLoader(false);
        console.log('err', err.response);
        showMessage({
          message: err.response?.data?.responseMessage
            ? err.response?.data?.responseMessage
            : 'Something went wrong.',
          type: 'danger',
          icon: 'danger',
        });
      });
  };

  // *********** Social- Twitter Login Integrations ***********
  const twitterSignIn = () => {
    RNTwitterSignIn.init(
      Constants.TWITTER_API_KEY,
      Constants.TWITTER_SECRET_KEY,
    );
    RNTwitterSignIn.logIn()
      .then(loginData => {
        console.log('===== Twitter Details =====', loginData);
        TwitterLoginApi(loginData);
      })
      .catch(error => {
        console.log('=====  Twitter Details Error =====', error);
      });
  };

  const TwitterLoginApi = async twitterData => {
    const fcmToken = await AsyncStorage.getItem('fcmToken');

    setLoader(true);
    axios({
      method: 'post',
      url: SocialLoginUrl,
      data: {
        socialId: twitterData?.userID,
        socialType: 'TWITTER',
        deviceType: Platform.OS === 'android' ? 'android' : 'ios',
        deviceToken: fcmToken,
        userName: twitterData?.name,
        email: twitterData?.email,
        mobileNumber: twitterData?.mobile,
      },
    })
      .then(async response => {
        if (response.data.responseCode === 200) {
          console.log('====== Twitter Login Response ======', response);
          await AsyncStorage.setItem('token', response?.data?.result?.token);
          showMessage({
            message: response?.data?.responseMessage,
            type: 'success',
            icon: 'success',
            textStyle: {
              fontFamily: 'Montserrat-Medium',
              fontSize: height / 55,
            },
            style: {
              width: Platform.OS === 'android' ? width * 0.92 : null,
              borderRadius: Platform.OS === 'android' ? 5 : null,
              margin: Platform.OS === 'android' ? 15 : null,
              alignItems: Platform.OS === 'android' ? 'center' : null,
            },
          });
          AsyncStorage.setItem('logintype', 'twitter');

          props.navigation.navigate('Home');
          setLoader(false);
        } else {
          // alert("Something went wrong.");
          showMessage({
            message: 'Something went wrong.',
            type: 'danger',
            icon: 'danger',
            textStyle: {
              fontFamily: 'Montserrat-Medium',
              fontSize: height / 55,
            },
            style: {
              width: Platform.OS === 'android' ? width * 0.92 : null,
              borderRadius: Platform.OS === 'android' ? 5 : null,
              margin: Platform.OS === 'android' ? 15 : null,
              alignItems: Platform.OS === 'android' ? 'center' : null,
            },
          });
          setLoader(false);
        }
      })
      .catch(err => console.log('==== Twitter Login Catch err', err));
  };

  // *********** Social- Apple Login Integrations ***********
  const AppleLogin = async () => {
    // const fcmToken = await AsyncStorage.getItem("fcmToken");

    try {
      setLoader(true);
      const resp = await loginWithApple();
      console.log('apple resp =>', resp);
      if (resp?.['user']) {
        const {user} = resp;
        console.log('==== apple user ====', user);
      } else setLoader(false);
    } catch (error) {
      setLoader(false);
    }
  };
  const onChangeCountryCode = code => {
    setCountryCode(code);
  };

  const AddReferralID = async()=> {
    const fcmToken = await AsyncStorage.getItem('fcmToken');
    const value = await AsyncStorage.getItem("token" || "socaltoken");
console.log(`${ServerUrl}user/refferralAfterSocialLogin?refereeCode=${ReferralID}`)
    setLoader(true);
    axios({
      method: 'get',
      url: `${ServerUrl}user/refferralAfterSocialLogin?refereeCode=${ReferralID}`,
      headers: {
        token: value,
      },
    })
      .then(async response => {
        if (response.data.responseCode === 200) {

          showMessage({
            message: response?.data?.responseMessage,
            type: 'success',
            icon: 'success',
            textStyle: {
              fontFamily: 'Montserrat-Medium',
              fontSize: height / 55,
            },
            style: {
              width: Platform.OS === 'android' ? width * 0.92 : null,
              borderRadius: Platform.OS === 'android' ? 5 : null,
              margin: Platform.OS === 'android' ? 15 : null,
              alignItems: Platform.OS === 'android' ? 'center' : null,
            },
          });
          setaddreferidmodal(false)

          props.navigation.replace('Home');
          setLoader(false);
        } else {
          // alert("Something went wrong.");
          showMessage({
            message: 'Something went wrong.',
            type: 'danger',
            icon: 'danger',
            textStyle: {
              fontFamily: 'Montserrat-Medium',
              fontSize: height / 55,
            },
            style: {
              width: Platform.OS === 'android' ? width * 0.92 : null,
              borderRadius: Platform.OS === 'android' ? 5 : null,
              margin: Platform.OS === 'android' ? 15 : null,
              alignItems: Platform.OS === 'android' ? 'center' : null,
            },
          });
          setLoader(false);
        }
      })
      .catch(err => {
        console.log(err.response)
        setLoader(false);
        showMessage({
          message:err?.response?.data?.responseMessage?err.response.data.responseMessage:'Please try again later',
          duration:3000,
          type:'warning'
        })
      });
  };

  return (
    <SafeAreaView>
      <KeyboardAwareScrollView>
        <View style={[Styles.MainContainer]}>
          <View style={[Styles.SubContainer]}>
            {/* ************ Logo Container ************ */}
            <View style={Styles.LogoContainer}>
              <Image
                source={require('../../../assets/images/AppLogo/AppLogo.png')}
                style={{height: 80, width: 200}}
                resizeMode="contain"
              />
            </View>

            {/* ************ Welcome Txt Container ************ */}
            <View style={Styles.WlcmTxtContainer}>
              <Text style={Styles.WlcmTxt}>Welcome back</Text>
              <Text
                style={[
                  Styles.WlcmTxt,
                  {
                    fontSize: height / 45,
                  },
                ]}>
                you’ve been missed!
              </Text>
            </View>

            {/* *********** Login With Email Container *********** */}
            <View style={Styles.LoginEmailTxtContainer}>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('Login')}>
                <Text style={Styles.LoginEmailTxt}>Login with email</Text>
              </TouchableOpacity>
            </View>

            {/* ************ TxtInput Container ************ */}
            <View style={Styles.InputContainer}>
              <View style={Styles.InputFieldContainer}>
                <CustomInput
                  LeftIcon={false}
                  leftImg={ImagePath.MOBILE_ICON}
                  placeholder="Enter your phone number"
                  value={Mobile}
                  placeholderTextColor={COLOR.GREY}
                  keyboardType="number-pad"
                  minLength={7}
                  maxLength={10}
                  styles={Styles.EmailTxtInpt}
                  onChangeText={txt => {
                    setMobile(txt), _mobilevalidate(txt);
                  }}
                  iscountryCode={true}
                  countryCode_code={countryCode}
                  onChangeCountryCode={onChangeCountryCode}
                  style={{
                    width: width * 0.6,
                    color: '#fff',
                    marginLeft:5
                  }}
                />
              </View>
              {errorMobile != null ? (
                <View style={Styles.ErrorContainer}>
                  <Text style={{color: 'red', fontSize: height / 65}}>
                    {errorMobile}
                  </Text>
                </View>
              ) : null}

              <View
                style={[
                  Styles.InputFieldContainer,
                  {marginTop: verticalScale(20)},
                ]}>
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
                  ImgStyling={{height: 15, width: 15, tintColor: COLOR.GREY}}
                  placeholder="Enter your password"
                  value={Password}
                  placeholderTextColor={COLOR.GREY}
                  secureTextEntry={isvisiblePassword == false ? true : false}
                  maxLength={16}
                  styles={Styles.PasswordTxtInpt}
                  onChangeText={txt => {
                    setPassword(txt), _passwordvalidate(txt);
                  }}
                />
              </View>
              {errorPassword != null ? (
                <View style={Styles.ErrorContainer}>
                  <Text style={{color: 'red', fontSize: height / 65}}>
                    {errorPassword}
                  </Text>
                </View>
              ) : null}
            </View>

            {/* ************ Remember & Forgot Container ************ */}
            <View style={Styles.ForgotContainer}>
              <View style={Styles.CheckAndRemember}>
                <TouchableOpacity onPress={() => setIAgree(!iAgree)}>
                  <Image
                    source={
                      !iAgree ? ImagePath.NOT_CHECKED : ImagePath.CHECKED_ICON
                    }
                    resizeMode="contain"
                  />
                </TouchableOpacity>

                <Text
                  style={{
                    color: COLOR.WHITE,
                    fontSize: height / 55,
                    fontFamily: 'Montserrat-Regular',
                    marginLeft: moderateScale(5),
                  }}>
                  Remember me
                </Text>
              </View>

              <View style={Styles.CheckAndRememberTwo}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => props.navigation.navigate('forgetmobile')}>
                  <Text
                    style={{
                      color: '#EC167F',
                      fontSize: height / 55,
                      textDecorationLine: 'underline',
                      fontFamily: 'Montserrat-Regular',
                    }}>
                    Forgot Password?
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* ************ Button Container ************ */}
            <View style={Styles.BtnContainer}>
              <AppButton
                title="Login"
                type="large"
                textStyle={{fontFamily: 'Montserrat-Bold'}}
                ButtonPress={() => onSubmit()}
              />
            </View>

            {/* ************ SignIn Container ************ */}
            <View style={Styles.SignInTxtContainer}>
              <Text style={Styles.SignInTxt}>Or sign in with</Text>
            </View>

            {/* ************ Social Button Container ************ */}
            <View style={Styles.SocialContainer}>
              <View style={Styles.SocialSubContainer}>
                {/* ************ Facebook Login Button ************ */}
                <TouchableOpacity
                  style={Styles.LogoViewTwo}
                  activeOpacity={0.7}
                  onPress={() => FBLogin()}>
                  <Image
                    source={ImagePath.FACEBOOK_LOGO}
                    style={{height: 45, width: 45}}
                    resizeMode="contain"
                  />
                </TouchableOpacity>

                {/* ************ Google Login Button ************ */}
                <TouchableOpacity
                  style={Styles.LogoView}
                  activeOpacity={0.7}
                  onPress={() => GoogleLogin()}>
                  <Image
                    source={ImagePath.GOOGLE_LOGO}
                    style={{height: 45, width: 45}}
                    resizeMode="contain"
                  />
                </TouchableOpacity>

                {/* ************ Apple Login Button ************ */}
                {/* <TouchableOpacity
                  // style={{ marginLeft: -verticalScale(30) }}
                  activeOpacity={0.7}
                  onPress={AppleLogin}
                >
                  <Image
                    source={ImagePath.APPLE_LOGO}
                    style={{
                      height: 50,
                      width: 50
                    }}
                    resizeMode="contain"
                  />
                </TouchableOpacity> */}

                {/* ************ Twitter Login Button ************ */}
                {/* <TouchableOpacity
                  style={Styles.LogoViewTwo}
                  activeOpacity={0.7}
                  onPress={twitterSignIn}
                >
                  <Image
                    source={ImagePath.TWITTER_LOGO}
                    style={{ height: 45, width: 45 }}
                    resizeMode="contain"
                  />
                </TouchableOpacity> */}
              </View>
            </View>

            {/* ************ Sign Up Container ************ */}
            <View style={Styles.RegisterContainer}>
              {/* <Text style={Styles.RegisterTxt}>You haven't any account?</Text> */}
              <Text style={Styles.RegisterTxt}>You haven't any account ?</Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => props.navigation.navigate('SignUp')}>
                <Text style={Styles.RegisterTxtTwo}> Sign Up</Text>
                {/* <Text style={Styles.RegisterTxtTwo}> Register</Text> */}
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {loader && <Progressdialog />}
        {
          <Modal transparent={true}
          // onRequestClose
          visible={addreferidmodal}
          >
             <View
              style={[
                StyleSheet.absoluteFill,
                {
                  backgroundColor: 'rgba(0,0,0,0.5)',
                },
              ]}
            />
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <View style={[styles.InputFieldContainer]}>
                <Text
                  style={{
                    width: width,
                    color: '#fff',
                    fontSize: 16,
                    fontFamily: 'Montserrat-Bold',
                    marginLeft:'10%'
                  }}>
                  Enter Referral ID
                </Text>
                <CustomInput
                  LeftIcon={false}
                  ImgStyling={{height: 20, width: 20, tintColor: COLOR.GREY}}
                  placeholder="Referral ID"
                  placeholderTextColor={COLOR.GREY}
                  styles={[styles.EmailStyling]}
                  onChangeText={txt => {
                    setReferralID(txt);
                  }}
                  maxLength={20}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    width: width,
                    marginTop: 50,
                  }}>
                 <AppButton
                    title="Submit"
                    type="large"
                    btnStyling={{width: width * 0.8}}
                    textStyle={{
                      fontFamily: 'Montserrat-Medium',
                      fontSize: normalize(14),
                    }}
                    ButtonPress={() =>{
                      AddReferralID()
                    }}
                  />
                  
                </View>
              </View>
            </View>
           
          </Modal>
        }
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  EmailStyling: {
    alignSelf: 'center',
    height: height * 0.08,
    width: width * 0.9,
    backgroundColor: COLOR.TXT_INPT_COLOR,
    color: COLOR.GREY,
    borderRadius: scale(10),
    padding: moderateScale(8),
    fontFamily: 'Montserrat-Regular',
    fontSize: height / 55,
    marginTop: 10,
  },
  InputFieldContainer: {
    backgroundColor: '#474646',
    padding: 25,
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden',
  },
});

export default Login;
