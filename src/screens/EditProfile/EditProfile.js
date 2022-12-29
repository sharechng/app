import React, { useRef, useState, useEffect } from "react";
import {
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Modal,
  TextInput,
  FlatList,
  ImageBackground,
} from "react-native";

import Styles from "./Styles";
import AuthHeader from "../../components/CustomHeader/AuthHeader";
import CustomInput from "../../components/CustomInput/CustomInput";
import { ImagePath } from "../../constants/ImagePath";
import { COLOR } from "../../Utils/Colors";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import moment from "moment";
import AppButton from "../../components/CustomButton/CustomButton";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomLoader from "../../components/CustomLoader/CustomLoader";
import { EditProfileUrl, GetUserProfileUrl } from "../../restAPI/ApiConfig";
import ImagePicker from "react-native-image-crop-picker";
import RBSheet from "react-native-raw-bottom-sheet";
import DatePicker from "react-native-date-picker";
import { countryCode } from "../../Utils/countryCode";
const { height, width } = Dimensions.get("window");
import { showMessage } from "react-native-flash-message";
import Progressdialog from "../../../Progressdialog";

const EditProfile = (props) => {
  const refRBSheet = useRef();
  const refRBSheetCover = useRef();
  const [loader, setLoader] = useState(false);
  const [imageUrlPath, setImageUrlPath] = useState(null);
  const [imageUrlData, setImageUrlData] = useState("");
  const [coverUrlPath, setCoverUrlPath] = useState("");
  const [coverUrlData, setCoverUrlData] = useState("");
  const [userProfileDetails, setUserProfileDetails] = useState({});
  // const [date, setDate] = useState(new Date());
  const [date, setDate] = useState(new Date(2000, 1, 1));
  const [newdate, setNewdate] = useState("");
  const [open, setOpen] = useState(false);
  const [viewProgressDia, setviewProgressDia] = useState(false);
  const [somethingEditted, setsomethingEditted] = useState(0)

  useEffect(() => {
    // setImageUrlPath(props.route?.params?.FilteredImage)
  }, [])

  // ************ Name Validations ************
  const [Name, setName] = useState("");
  const [errorName, setErrorName] = useState(null);
  const _validateName = (name) => {
    setsomethingEditted(1);
    var nameRegex = /^[a-z A-Z ]{4,32}$/i;
    if (name == "" || name == undefined || name == null) {
      setErrorName("*Please enter name.");
    } else if (!nameRegex.test(name)) {
      setErrorName("*Please enter valid name.");
    } else {
      setErrorName(null);
    }
  };

  // ************ User Name Validations ************
  const [UserName, setUserName] = useState("");
  const [errorUserName, setErrorUserName] = useState(null);
  const _validateUserName = (fname) => {
    setsomethingEditted(1)
    // var fnameRegex = /^[a-z A-Z ]{2,32}$/i;
    var fnameRegex = /^[a-zA-Z0-9@_]{3,32}$/i;
    if (fname == "" || fname == undefined || fname == null) {
      setErrorUserName("*Please enter user name.");
    } else if (!fnameRegex.test(fname)) {
      setErrorUserName("*Please enter valid user name.");
    } else {
      setErrorUserName(null);
    }
  };

  // ************ Email Validations ************
  const [Email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState(null);
  const _validateEmail = (mail) => {
    setsomethingEditted(1)
    var emailRegex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (mail === "") {
      setErrorEmail("*Please enter email.");
      return false;
    } else if (!emailRegex.test(mail)) {
      setErrorEmail("*Please enter valid email.");
      return false;
    } else {
      setErrorEmail(null);
      return true;
    }
  };

  // ************ Phone Validations ************
  const [Phone, setPhone] = useState("");
  const [errorPhone, setErrorPhone] = useState(null);
  const _validatePhone = (Phone) => {
    var PhoneRegex = /^([0-9]){10,14}$/;
    setsomethingEditted(1)
    if (Phone === "") {
      setErrorPhone("*Please enter Phone Number.");
      return false;
    } else if (!PhoneRegex.test(Phone)) {
      setErrorPhone("*Please enter valid Phone Number.");
      return false;
    } else {
      setErrorPhone(null);
      return true;
    }
  };

  // ************ Bio Validations ************
  const [Bio, setBio] = useState("");
  const [errorBio, setErrorBio] = useState(null);
  const _validateBio = (Bio) => {
    setsomethingEditted(1)
    var BioRegex = /^[a-z A-Z ]{2,50}$/i;
    if (Bio == "" || Bio == undefined || Bio == null) {
      setErrorBio("*Please enter your bio.");
    } else {
      setErrorBio(null);
    }
  };

  // ************ Website Validations ************
  const [Website, setWebsite] = useState("");
  const [errorWebsite, setErrorWebsite] = useState(null);
  const _validateWebsite = (Web) => {
    setsomethingEditted(1)
    var UrlRegex =
      /^(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;

    if (Web == "" || Web == undefined || Web == null) {
      setErrorWebsite("*Please enter your web url.");
    } else if (!UrlRegex.test(Web)) {
      setErrorWebsite("*Please enter valid url.");
    } else {
      setErrorWebsite(null);
    }
  };

  // ************ Location Validations ************
  const [Location, setLocation] = useState("");
  const [errorLocation, setErrorLocation] = useState(null);
  const _validateLocation = (Location) => {
    setsomethingEditted(1)
    if (Location == "" || Location == undefined || Location == null) {
      setErrorLocation("*Please enter your location.");
    } else {
      setErrorLocation(null);
    }
  };

  // ************ Facebook Links Validations ************
  const [FacebookLink, setFacebookLink] = useState("");
  const [errorFacebookLink, setErrorFacebookLink] = useState(null);
  const _validateFacebook = (fb) => {
    setsomethingEditted(1)
    var facebookUrlRegex =
      /^(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;
    if (fb == "" || fb == undefined || fb == null) {
      setErrorFacebookLink("*Please enter url.");
    }
    if (!facebookUrlRegex.test(fb)) {
      setErrorFacebookLink("*Please enter valid url.");
    } else {
      setErrorFacebookLink(null);
    }
  };

  // ************ Twitter Links Validations ************
  const [TwitterLink, setTwitterLink] = useState("");
  const [errorTwitterLink, setErrorTwitterLink] = useState(null);
  const _validateTwitter = (twitter) => {
    setsomethingEditted(1)
    var twitterUrlRegex =
      /^(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;
    if (twitter == "" || twitter == undefined || twitter == null) {
      setErrorTwitterLink("*Please enter url.");
    } else if (!twitterUrlRegex.test(twitter)) {
      setErrorTwitterLink("*Please enter valid url.");
    } else {
      setErrorTwitterLink(null);
    }
  };

  // ************ LinkedIn Links Validations ************
  const [LinkedInLink, setLinkedInLink] = useState("");
  const [errorLinkedInLink, setErrorLinkedInLink] = useState(null);
  const _validateLinkedIn = (linkedIn) => {
    setsomethingEditted(1);
    var linkedInUrlRegex =
      /^(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;
    if (linkedIn == "" || linkedIn == undefined || linkedIn == null) {
      setErrorLinkedInLink("*Please enter url.");
    } else if (!linkedInUrlRegex.test(linkedIn)) {
      setErrorLinkedInLink("*Please enter valid url.");
    } else {
      setErrorLinkedInLink(null);
    }
  };

  // ************ Instagram Links Validations ************
  const [InstagramLink, setInstagramLink] = useState("");
  const [errorInstagramLink, setErrorInstagramLink] = useState(null);
  const _validateInstagram = (insta) => {
    setsomethingEditted(1)
    var instaUrlRegex =
      /^(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;
    if (!instaUrlRegex.test(insta)) {
      setErrorInstagramLink("*Please enter valid url.");
    } else {
      setErrorInstagramLink(null);
    }
  };

  const [Dob, setDob] = useState("");
  const [male, setMale] = useState("Male");
  const [female, setFemale] = useState();

  const validate = () => {
    let flag = true;
    if (Name === "") {
      setErrorName("*Please enter name.");
      flag = false;
    }
    if (UserName === "") {
      setErrorUserName("*Please enter user name.");
      flag = false;
    }
    if (Phone === "") {
      setErrorPhone("*Please enter phone number.");
      flag = false;
    }
    // if (imageUrlData === "") {
    //   showMessage({
    //     message: "Please select profile pictures",
    //     type: "warning",
    //     icon: "warning",
    //     textStyle: {
    //       fontFamily: "Montserrat-Medium",
    //       fontSize: height / 55,
    //     },
    //     style: {
    //       width: Platform.OS === "android" ? width * 0.92 : null,
    //       borderRadius: Platform.OS === "android" ? 5 : null,
    //       margin: Platform.OS === "android" ? 15 : null,
    //       alignItems: Platform.OS === "android" ? "center" : null,
    //     },
    //   });
    // }
    return flag;
  };

  const onSubmit = () => {
    if (_validateEmail(Email) || _validatePhone(Phone)) {
      EditProfileApi();
    }
  };

  // useEffect(() => {
  //   if (userProfileDetails) {
  //     setName(userProfileDetails?.name);
  //     setUserName(userProfileDetails?.userName);
  //     setEmail(userProfileDetails?.email);
  //     setPhone(userProfileDetails?.mobileNumber);
  //     setBio(userProfileDetails?.bio);
  //     setWebsite(userProfileDetails?.website);
  //     setLocation(userProfileDetails?.location);
  //     setFacebookLink(userProfileDetails?.facebook);
  //     setTwitterLink(userProfileDetails?.twitter);
  //     setLinkedInLink(userProfileDetails?.linkedIn);
  //     setInstagramLink(userProfileDetails?.instagram);
  //   } else {
  //     setUserName("Please enter username.");
  //   }
  // }, [props.route, userProfileDetails]);

  useEffect(() => {
    GetProfileApi();
  }, [props.route]);

  // ************ Get Profile Api ************
  const GetProfileApi = async () => {
    setviewProgressDia(true)
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
        setviewProgressDia(false)
        if (response.data.responseCode === 200) {
          console.log("====== Get User Profile Response ======", response.data?.result);
          setUserProfileDetails(response?.data?.result);

          setName(response?.data?.result?.name);
          setUserName(response?.data?.result?.userName);
          setEmail(response?.data?.result?.email);
          setPhone(response?.data?.result?.mobileNumber);
          setBio(response?.data?.result?.bio);
          setWebsite(response?.data?.result?.website);
          setLocation(response?.data?.result?.location);
          setFacebookLink(response?.data?.result?.facebook);
          setTwitterLink(response?.data?.result?.twitter);
          setLinkedInLink(response?.data?.result?.linkedIn);
          setInstagramLink(response?.data?.result?.instagram);

          setLoader(false);
        } else {
          alert("Something went wrong.");
          setLoader(false);
        }
      })
      .catch((err) => {
        setviewProgressDia(false)
        console.log("===== Get Profile Catch Error ======", err);
        setLoader(false);
      });
    setLoader(false);
  };

  // ************* On Camera Picker *************
  const onCamera = () => {
    setsomethingEditted(1)
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
      mediaType: "any",
    }).then((image) => {
      setImageUrlPath(image.path);
      setImageUrlData(image.data);
      props.navigation.navigate('ImageFilter', { Path: image.data, Type: 'Profile', PrevScreen: 'EditProfile' });
      refRBSheet.current.close();
    });
  };

  const onCameraCover = () => {
    setsomethingEditted(1)
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
      mediaType: "any",
    }).then((image) => {
      setCoverUrlPath(image.path);
      setCoverUrlData(image.data);
      props.navigation.navigate('ImageFilter', { Path: image.data, Type: 'Cover', PrevScreen: 'EditProfile' });
      refRBSheetCover.current.close();
    });
  };

  // ************* On Gallary Picker *************
  const onGallary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      quality: "low",
      includeBase64: true,
      mediaType: "any",
    }).then((image) => {
      setsomethingEditted(1);
      console.log('Path', image.path);
      setImageUrlPath(image.path);
      setImageUrlData(image.data);
      props.navigation.navigate('ImageFilter', { Path: image.data, Type: 'Profile', PrevScreen: 'EditProfile' });
      refRBSheet.current.close();
    });
  };

  const onGallaryCover = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      quality: "low",
      includeBase64: true,
      mediaType: "any",
    }).then((image) => {
      setsomethingEditted(1)
      setCoverUrlPath(image.path);
      setCoverUrlData(image.data);
      props.navigation.navigate('ImageFilter', { Path: image.data, Type: 'Cover', PrevScreen: 'EditProfile' });
      refRBSheetCover.current.close();
    });
  };

  // ************ Edit Profile Api ************
  const EditProfileApi = async () => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");
    console.log(value);

    let DATA = {
      name: Name ? Name : userProfileDetails?.name ? userProfileDetails?.name : "",
      userName: UserName ? UserName : userProfileDetails?.userName ? userProfileDetails?.userName : "",
      email: Email ? Email : userProfileDetails?.email ? userProfileDetails?.email : "",
      countryCode: countryyCode,
      mobileNumber: Phone ? Phone : userProfileDetails?.mobileNumber ? userProfileDetails?.mobileNumber : "",
      gender: male || female ? male || female : userProfileDetails?.gender,
      profilePic: props.route?.params?.FilteredProfileImage != null ? props.route?.params?.FilteredProfileImage : imageUrlData ? `data:image/jpeg;base64,${imageUrlData}` : userProfileDetails?.profilePic ? userProfileDetails?.profilePic : "",
      coverPic: props.route?.params?.FilteredCoverImage != null ? props.route?.params?.FilteredCoverImage : coverUrlData ? `data:image/jpeg;base64,${coverUrlData}` : userProfileDetails?.coverPic ? userProfileDetails?.coverPic : "",
      bio: Bio ? Bio : userProfileDetails?.bio ? userProfileDetails?.bio : "",
      facebook: FacebookLink ? FacebookLink : userProfileDetails?.facebook ? userProfileDetails?.facebook : "",
      twitter: TwitterLink ? TwitterLink : userProfileDetails?.twitter ? userProfileDetails?.twitter : "",
      instagram: InstagramLink ? InstagramLink : userProfileDetails?.instagram ? userProfileDetails?.instagram : "",
      linkedIn: LinkedInLink ? LinkedInLink : userProfileDetails?.linkedIn ? userProfileDetails?.linkedIn : "",
      dob: moment(date).format() ? moment(date).format() : userProfileDetails?.dob ? userProfileDetails?.dob : "",
      location: Location ? Location : userProfileDetails?.location ? userProfileDetails?.location : "",
    };
    console.log("----- edit ------", DATA);

    setLoader(true);
    axios({
      method: "put",
      url: EditProfileUrl,
      data: DATA,
      headers: {
        token: value,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          console.log("==== Edit Profile Response ====", response);
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
          props.navigation.goBack();
          GetProfileApi();
          setLoader(false);
        } else {
          setLoader(false);
        }
      })
      .catch((err) => {
        console.log("===== Edit Profile Catch Error ======", err.response);
        if (err?.response?.data?.responseCode === 401 || 404 || 409) {
          showMessage({
            message: err?.response?.data?.responseMessage ? err?.response?.data?.responseMessage : 'Something went wrong',
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
        // setLoader(false);
      });
  };

  // ************ State and Search Functions of Country Code ************
  const [filterdata, setFilterdata] = useState(countryCode);
  const [countryyCode, setcountryCode] = useState("+91");
  const [contrymodal, setcontrymodal] = useState(false);
  const [countryimage, setContryimage] = useState(
    require("../../assets/countryImages/in.png")
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
  // ************ State and Search Functions of Country Code ************

  return (
    <SafeAreaView
      style={{
        backgroundColor: "black",

      }}
    >
      {viewProgressDia && <Progressdialog />}
      <AuthHeader
        backIcon={true}
        onBackPress={() => props.navigation.goBack()}
        Title={true}
        HeaderTitle="Edit Profile"
        AuthLineStyling={{
          height: height * 0.085,
          borderBottomWidth: 0.5,
          borderColor: COLOR.HEADER_BORDER_COLOR,
        }}
      />
      <KeyboardAwareScrollView>
        <View style={Styles.MainContainer}>
          <View style={Styles.InputContainer}>
            <ScrollView
              contentContainerStyle={{
                paddingBottom: '5%',
                
              }}
            >
              {/* ************ Profile Pictures Container ************ */}
              <View style={Styles.PicturesUploadContainer}>
                <ImageBackground source={{ uri: props.route?.params?.FilteredCoverImage ? props.route?.params?.FilteredCoverImage : coverUrlPath ? coverUrlPath : userProfileDetails?.coverPic ? userProfileDetails?.coverPic : "" }} style={{ justifyContent: "flex-end", alignItems: "flex-end", height: height * 0.18, width: width * 0.9, alignSelf: "center", backgroundColor: COLOR.TXT_INPT_COLOR }}>
                  <TouchableOpacity onPress={() => refRBSheetCover.current.open()}>
                    <Image
                      source={ImagePath.UPLOADER}
                      style={{
                        marginLeft: moderateScale(95),
                        marginTop: -verticalScale(10),
                      }}
                    />
                  </TouchableOpacity>
                </ImageBackground>
                <View
                  style={{
                    height: 115,
                    width: 115,
                    borderRadius: 100,
                    position: "absolute",
                    bottom: 20,
                    // backgroundColor: "red",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {imageUrlPath ? (
                    <Image
                      source={{ uri: props.route?.params?.FilteredProfileImage ? props.route?.params?.FilteredProfileImage : imageUrlPath }}
                      style={{ height: 115, width: 115, borderRadius: 80 }}
                    />
                  ) : userProfileDetails?.profilePic ? (
                    <Image
                      source={{ uri: userProfileDetails?.profilePic }}
                      style={{
                        height: 115,
                        width: 115,
                        borderRadius: 150 / 2,
                      }}
                    />
                  ) :
                    (<Image
                      source={ImagePath.PROFILE_PIC}
                      style={{ height: 115, width: 115, borderRadius: 150 / 2, }}
                    />)
                  }
                </View>
                <TouchableOpacity onPress={() => refRBSheet.current.open()}>
                  <Image
                    source={ImagePath.UPLOADER}
                    style={{
                      marginLeft: moderateScale(95),
                      marginTop: -verticalScale(20),
                    }}
                  />
                </TouchableOpacity>
              </View>

              {/* ************ Name Container ************ */}
              <View style={Styles.InputFieldContainer}>
                <CustomInput
                  LeftIcon={false}
                  RightIcon={true}
                  rightImg={ImagePath.EDIT_PENCIL}
                  ImgStyling={{ height: 15, width: 15 }}
                  placeholder={"Enter name"}
                  value={Name}
                  placeholderTextColor={COLOR.GREY}
                  keyboardType="default"
                  maxLength={60}
                  // secureTextEntry={isvisiblePassword == false ? true : false}
                  styles={Styles.TxtFieldStyling}
                  onChangeText={(txt) => {
                    setName(txt), _validateName(txt);
                  }}
                />
              </View>
              {errorName != null ? (
                <View style={Styles.ErrorContainer}>
                  <Text style={{ color: "red", fontSize: height / 65 }}>
                    {errorName}
                  </Text>
                </View>
              ) : null}

              {/* ************ User Name Container ************ */}
              <View
                style={[
                  Styles.InputFieldContainer,
                  { marginTop: verticalScale(10) },
                ]}
              >
                <CustomInput
                  LeftIcon={false}
                  RightIcon={false}
                  // rightImg={ImagePath.EDIT_PENCIL}
                  ImgStyling={{ height: 15, width: 15 }}
                  placeholder={"Enter user name"}
                  value={UserName}
                  placeholderTextColor={COLOR.GREY}
                  keyboardType="default"
                  maxLength={60}
                  styles={Styles.TxtFieldStyling}
                  onChangeText={(txt) => {
                    setUserName(txt), _validateUserName(txt);
                  }}
                  editable={false}
                />
              </View>
              {errorUserName != null ? (
                <View style={Styles.ErrorContainer}>
                  <Text style={{ color: "red", fontSize: height / 65 }}>
                    {errorUserName}
                  </Text>
                </View>
              ) : null}

              {/* ************ Email Container ************ */}
              <View
                style={[
                  Styles.InputFieldContainer,
                  { marginTop: verticalScale(10) },
                ]}
              >
                <CustomInput
                  LeftIcon={false}
                  RightIcon={false}
                  rightImg={ImagePath.EDIT_PENCIL}
                  ImgStyling={{ height: 15, width: 15 }}
                  placeholder={"Enter user email"}
                  // value={userProfileDetails?.email}
                  value={Email}
                  placeholderTextColor={COLOR.GREY}
                  keyboardType="email-address"
                  maxLength={260}
                  styles={Styles.TxtFieldStyling}
                  onChangeText={(txt) => {
                    setEmail(txt), _validateEmail(txt);
                  }}
                  editable={false}

                />
              </View>

              {/* ************ Phone Container ************ */}
              <View
                style={[
                  Styles.InputFieldContainer,
                  { marginTop: verticalScale(10) },
                ]}
              >
                <CustomInput
                  LeftIcon={false}
                  countryCode={true}
                  CountryTheme={{ width: width * 0.2 }}
                  CountryFlag={countryimage}
                  CountryCode={countryyCode}
                  showCountryCode={() => setcontrymodal(true)}
                  RightIcon={true}
                  rightImg={ImagePath.EDIT_PENCIL}
                  ImgStyling={{ height: 15, width: 15 }}
                  placeholder={"Enter phone number"}
                  value={Phone}
                  placeholderTextColor={COLOR.GREY}
                  keyboardType="number-pad"
                  maxLength={10}
                  styles={{
                    height: height * 0.08,
                    width: width * 0.6,
                    backgroundColor: COLOR.TXT_INPT_COLOR,
                    color: COLOR.GREY,
                    borderRadius: scale(10),
                    padding: moderateScale(8),
                    fontFamily: "Montserrat-Regular",
                    fontSize: height / 55,
                  }}
                  onChangeText={(txt) => {
                    setPhone(txt), _validatePhone(txt);
                  }}
                />
              </View>
              {errorPhone != null ? (
                <View style={Styles.ErrorContainer}>
                  <Text style={{ color: "red", fontSize: height / 65 }}>
                    {errorPhone}
                  </Text>
                </View>
              ) : null}

              {/* ************ DOB Container ************ */}
              <View
                style={[Styles.dateContainer, { marginTop: verticalScale(10) }]}
              >
                <Text style={Styles.dateTxt}>
                  {userProfileDetails?.dob === "" ? "Select date of birth" : moment(userProfileDetails?.dob).format("L")}
                </Text>
                <DatePicker
                  modal

                  open={open}
                  date={date}
                  onConfirm={(date) => {
                    setOpen(false), setDate(date), setNewdate(date);
                  }}
                  onCancel={() => {
                    setOpen(false);
                  }}
                  mode="date"
                  textColor={COLOR.BLACK}
                  maximumDate={new Date()}
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

              {/* ************ Bio Container ************ */}
              <View
                style={[
                  Styles.InputFieldContainer,
                  { marginTop: verticalScale(10) },
                ]}
              >
                <CustomInput
                  LeftIcon={false}
                  RightIcon={true}
                  rightImg={ImagePath.EDIT_PENCIL}
                  ImgStyling={{ height: 15, width: 15 }}
                  placeholder={"Bio"}
                  value={Bio}
                  placeholderTextColor={COLOR.GREY}
                  keyboardType="default"
                  maxLength={260}
                  styles={Styles.TxtFieldStyling}
                  onChangeText={(txt) => { setBio(txt), _validateBio(txt) }}
                />
              </View>
              {errorBio != null ? (
                <View style={Styles.ErrorContainer}>
                  <Text style={{ color: "red", fontSize: height / 65 }}>
                    {errorBio}
                  </Text>
                </View>
              ) : null}

              {/* ************ Website Container ************ */}
              {/* <View
                style={[
                  Styles.InputFieldContainer,
                  { marginTop: verticalScale(10) },
                ]}
              >
                <CustomInput
                  LeftIcon={false}
                  RightIcon={true}
                  rightImg={ImagePath.EDIT_PENCIL}
                  ImgStyling={{ height: 15, width: 15 }}
                  placeholder="Enter Website"
                  value={Website}
                  placeholderTextColor={COLOR.GREY}
                  keyboardType="default"
                  maxLength={60}
                  styles={Styles.TxtFieldStyling}
                  onChangeText={(txt) => {
                    setWebsite(txt), _validateWebsite(txt);
                  }}
                />
              </View> */}
              {errorWebsite != null ? (
                <View style={Styles.ErrorContainer}>
                  <Text style={{ color: "red", fontSize: height / 65 }}>
                    {errorWebsite}
                  </Text>
                </View>
              ) : null}

              {/* ************ Location Container ************ */}
              <View
                style={[
                  Styles.InputFieldContainer,
                  { marginTop: verticalScale(10) },
                ]}
              >
                <CustomInput
                  LeftIcon={false}
                  RightIcon={true}
                  rightImg={ImagePath.EDIT_PENCIL}
                  ImgStyling={{ height: 15, width: 15 }}
                  placeholder="Location"
                  value={Location}
                  placeholderTextColor={COLOR.GREY}
                  keyboardType="default"
                  maxLength={260}
                  styles={Styles.TxtFieldStyling}
                  onChangeText={(txt) => {
                    setLocation(txt), _validateLocation(txt);
                  }}
                />
              </View>
              {errorLocation != null ? (
                <View style={Styles.ErrorContainer}>
                  <Text style={{ color: "red", fontSize: height / 65 }}>
                    {errorLocation}
                  </Text>
                </View>
              ) : null}

              {/* ************ Gender Container ************ */}
              <View style={Styles.btnView}>
                <View style={Styles.maleView}>
                  <TouchableOpacity
                    disabled={true}
                    activeOpacity={0.6}
                    onPress={() => {
                      setFemale(null), setMale("Male");
                    }}
                    style={[Styles.maleBtn, { flexDirection: "row" }]}
                  >
                    <Image
                      source={
                        male ? ImagePath.RADIOBTN : ImagePath.NEW_UNCHECK_ICON
                      }
                      style={Styles.maleBtnImg}
                      resizeMode="contain"
                    />
                    <Text
                      style={[Styles.maleTxt, { marginLeft: height * 0.01 }]}
                    >
                      Male
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={Styles.femaleView}>
                  <TouchableOpacity
                    disabled={true}
                    activeOpacity={0.6}
                    onPress={() => {
                      setFemale("Female"), setMale(null);
                    }}
                    style={[Styles.maleBtn, { flexDirection: "row" }]}
                  >
                    <Image
                      source={
                        female ? ImagePath.RADIOBTN : ImagePath.NEW_UNCHECK_ICON
                      }
                      style={Styles.maleBtnImg}
                      resizeMode="contain"
                    />
                    <Text
                      style={[Styles.maleTxt, { marginLeft: height * 0.01 }]}
                    >
                      Female
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* ************ Social Links Container ************ */}
              <View style={Styles.SocialLinkContainer}>
                <Text style={Styles.SocialLinkTxt}>Social Links</Text>
              </View>

              <View
                style={[
                  Styles.InputFieldContainer,
                  { marginTop: verticalScale(10) },
                ]}
              >
                <CustomInput
                  LeftIcon={false}
                  RightIcon={true}
                  rightImg={ImagePath.EDIT_PENCIL}
                  ImgStyling={{ height: 15, width: 15 }}
                  placeholder="Facebook"
                  value={FacebookLink}
                  placeholderTextColor={COLOR.GREY}
                  keyboardType="default"
                  maxLength={260}
                  styles={Styles.TxtFieldStyling}
                  // onChangeText={(txt) => setFacebookLink(txt)}
                  onChangeText={(txt) => {
                    setFacebookLink(txt), _validateFacebook(txt);
                  }}
                />
              </View>
              {errorFacebookLink != null ? (
                <View style={Styles.ErrorContainer}>
                  <Text style={{ color: "red", fontSize: height / 65 }}>
                    {errorFacebookLink}
                  </Text>
                </View>
              ) : null}

              {/* ************ Twitter Container ************ */}
              <View
                style={[
                  Styles.InputFieldContainer,
                  { marginTop: verticalScale(10) },
                ]}
              >
                <CustomInput
                  LeftIcon={false}
                  RightIcon={true}
                  rightImg={ImagePath.EDIT_PENCIL}
                  ImgStyling={{ height: 15, width: 15 }}
                  placeholder="Twitter"
                  value={TwitterLink}
                  placeholderTextColor={COLOR.GREY}
                  keyboardType="default"
                  maxLength={260}
                  styles={Styles.TxtFieldStyling}
                  // onChangeText={(txt) => setTwitterLink(txt)}
                  onChangeText={(txt) => {
                    setTwitterLink(txt), _validateTwitter(txt);
                  }}
                />
              </View>
              {errorTwitterLink != null ? (
                <View style={Styles.ErrorContainer}>
                  <Text style={{ color: "red", fontSize: height / 65 }}>
                    {errorTwitterLink}
                  </Text>
                </View>
              ) : null}

              {/* ************ LinkedIn Container ************ */}
              <View
                style={[
                  Styles.InputFieldContainer,
                  { marginTop: verticalScale(10) },
                ]}
              >
                <CustomInput
                  LeftIcon={false}
                  RightIcon={true}
                  rightImg={ImagePath.EDIT_PENCIL}
                  ImgStyling={{ height: 15, width: 15 }}
                  placeholder={"LinkedIn"}
                  value={LinkedInLink}
                  placeholderTextColor={COLOR.GREY}
                  keyboardType="default"
                  maxLength={260}
                  styles={Styles.TxtFieldStyling}
                  // onChangeText={(txt) => setLinkedInLink(txt)}
                  onChangeText={(txt) => {
                    setLinkedInLink(txt), _validateLinkedIn(txt);
                  }}
                />
              </View>
              {errorLinkedInLink != null ? (
                <View style={Styles.ErrorContainer}>
                  <Text style={{ color: "red", fontSize: height / 65 }}>
                    {errorLinkedInLink}
                  </Text>
                </View>
              ) : null}

              {/* ************ Instagram Container ************ */}
              <View
                style={[
                  Styles.InputFieldContainer,
                  { marginTop: verticalScale(10) },
                ]}
              >
                <CustomInput
                  LeftIcon={false}
                  RightIcon={true}
                  rightImg={ImagePath.EDIT_PENCIL}
                  ImgStyling={{ height: 15, width: 15 }}
                  placeholder={"Instagram"}
                  value={InstagramLink}
                  placeholderTextColor={COLOR.GREY}
                  keyboardType="default"
                  maxLength={260}
                  styles={Styles.TxtFieldStyling}
                  // onChangeText={(txt) => setInstagramLink(txt)}
                  onChangeText={(txt) => {
                    setInstagramLink(txt), _validateInstagram(txt);
                  }}
                />
              </View>
              {errorInstagramLink != null ? (
                <View style={Styles.ErrorContainer}>
                  <Text style={{ color: "red", fontSize: height / 65 }}>
                    {errorInstagramLink}
                  </Text>
                </View>
              ) : null}

              {/* ************ Button Container ************ */}
              <View
                style={[Styles.BtnContainer, { marginTop: verticalScale(47) }]}
              >
                {loader ? (
                  <CustomLoader />
                ) : imageUrlData === "" ? (
                  <AppButton
                    title="Update"
                    disabled={somethingEditted == 0 ? true : false}
                    btnStyling={{ backgroundColor: somethingEditted == 0 ? 'grey' : COLOR.BUTTON_PINK }}
                    // disabled
                    type="large"
                    textStyle={{
                      fontFamily: "Montserrat-SemiBold",
                      fontSize: height / 42,
                    }}
                    ButtonPress={() => onSubmit()}
                  // ButtonPress={() => onSubmit()}
                  />
                ) : (
                  <AppButton
                    disabled={somethingEditted == 0 ? true : false}
                    btnStyling={{ backgroundColor: somethingEditted == 0 ? 'grey' : COLOR.BUTTON_PINK }}
                    title="Update"
                    type="large"
                    textStyle={{
                      fontFamily: "Montserrat-SemiBold",
                      fontSize: height / 42,
                    }}
                    ButtonPress={() => onSubmit()}
                  />
                )}
              </View>
            </ScrollView>
          </View>
        </View>
      </KeyboardAwareScrollView>

      {/* *************** Profile pic Bottom Sheet *************** */}
      <View style={Styles.MainContainerSheet}>
        <RBSheet
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={true}
          height={350}
          customStyles={{
            wrapper: {
              backgroundColor: "rgba(0,0,0,0.6)",
            },
            draggableIcon: {
              backgroundColor: "#000",
            },
            container: {
              backgroundColor: COLOR.BOTTOM_SHEET_BG_CLR,
              borderTopLeftRadius: 25,
              borderTopRightRadius: 25,
              borderTopWidth: 0.5,
              borderColor: COLOR.TXT_INPT_COLOR,
            },
          }}
        >
          <View style={Styles.panel}>
            <View style={{ alignItems: "center" }}>
              <Text style={Styles.panelTitle}>Upload Profile Picture</Text>
              <Text style={Styles.panelSubtitle}>
                Choose your profile picture
              </Text>
            </View>

            <TouchableOpacity
              style={Styles.panelButton}
              onPress={() => onCamera()}
            >
              <Text style={Styles.panelButtonTitle}>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={Styles.panelButton}
              onPress={() => onGallary()}
            >
              <Text style={Styles.panelButtonTitle}>Choose from Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={Styles.panelButton}
              onPress={() => refRBSheet.current.close()}
            >
              <Text style={Styles.panelButtonTitle}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </RBSheet>
      </View>

      {/* *************** Cover Bottom Sheet *************** */}
      <View style={Styles.MainContainerSheet}>
        <RBSheet
          ref={refRBSheetCover}
          closeOnDragDown={true}
          closeOnPressMask={true}
          height={350}
          customStyles={{
            wrapper: {
              backgroundColor: "rgba(0,0,0,0.6)",
            },
            draggableIcon: {
              backgroundColor: "#000",
            },
            container: {
              backgroundColor: COLOR.BOTTOM_SHEET_BG_CLR,
              borderTopLeftRadius: 25,
              borderTopRightRadius: 25,
              borderTopWidth: 0.5,
              borderColor: COLOR.TXT_INPT_COLOR,
            },
          }}
        >
          <View style={Styles.panel}>
            <View style={{ alignItems: "center" }}>
              <Text style={Styles.panelTitle}>Upload Cover Photo</Text>
              <Text style={Styles.panelSubtitle}>
                Choose your Cover Photo
              </Text>
            </View>

            <TouchableOpacity
              style={Styles.panelButton}
              onPress={() => onCameraCover()}
            >
              <Text style={Styles.panelButtonTitle}>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={Styles.panelButton}
              onPress={() => onGallaryCover()}
            >
              <Text style={Styles.panelButtonTitle}>Choose from Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={Styles.panelButton}
              onPress={() => refRBSheetCover.current.close()}
            >
              <Text style={Styles.panelButtonTitle}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </RBSheet>
      </View>

      {/* ************** Country Code Modal ************** */}
      <Modal animationType="fade" transparent={true} visible={contrymodal}>
        <TouchableOpacity
          onPress={() => setcontrymodal(!contrymodal)}
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={Styles.ListSearchContainer}>
            <View style={Styles.TxtInptSearchContainer}>
              <TextInput
                // placeholderTextColor="rgb(0,0,0)"
                placeholderTextColor={COLOR.WHITE}
                color="rgb(0,0,0))"
                placeholder={"Search country code"}
                style={Styles.TxtInptSearch}
                maxLength={10}
                onChangeText={(txt) => searchFilterFunction(txt)}
              />
            </View>
            <FlatList
              data={filterdata}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    style={Styles.TouchCountrySelect}
                    onPress={async () => {
                      await setcountryCode(item.dialCode);
                      await setContryimage(item.icon);
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
                    <View style={Styles.NameDialCodeContainer}>
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

export default EditProfile;
