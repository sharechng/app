import React, { useRef, useState, useEffect } from "react";
import {
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput,
  ScrollView,
  Platform,
} from "react-native";

import Styles from "./Styles";
import ProfileHeader from "../../components/CustomHeader/ProfileHeader";
import { ImagePath } from "../../constants/ImagePath";
import { COLOR } from "../../Utils/Colors";
import { Dropdown } from "react-native-element-dropdown";
import AppButton from "../../components/CustomButton/CustomButton";
import axios, { Axios } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomLoader from "../../components/CustomLoader/CustomLoader";
import {
  CreateCollectionsUrl,
  GetUserProfileUrl,
  AdminFeeListUrl
} from "../../restAPI/ApiConfig";
import { verticalScale } from "react-native-size-matters";
import ImagePicker from "react-native-image-crop-picker";
import RBSheet from "react-native-raw-bottom-sheet";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { showMessage } from "react-native-flash-message";
import { normalize } from "../../../ResponsiveFontSize";
import DropDown from "../../components/CustomDropDown/DropDown";
import { Logout_ } from "../../../Logout";

const { height, width } = Dimensions.get("window");

const DATA = [
  {
    value: "Public",
  },
  {
    value: "Private",
  },
];

const CreateCollection = (props) => {
  const refRBSheet = useRef();

  const [loader, setLoader] = useState(false);
  const [userProfileDetails, setUserProfileDetails] = useState({});
  const [descriptions, setDescriptions] = useState("");
  // const [amount, setAmount] = useState("");
  // const [royalityFees, setRoyalityFees] = useState("");
  const [profileType, setProfileType] = useState("Public");
  const [imageUrlPath, setImageUrlPath] = useState("");
  const [imageUrlData, setImageUrlData] = useState("");
  const [adminFees, setadminFees] = useState([])
  // const [Title, setTitle] = useState("");
  // const [Name, setName] = useState("");

  // ************ Name Validations ************
  const [Name, setName] = useState("");
  const [errorName, setErrorName] = useState(null);
  const _validateName = (name) => {
    var nameRegex = /^[a-z A-Z0-9@_]{3,60}$/i;
    if (name == "" || name == undefined || name == null) {
      setErrorName("*Please enter name.");
    } else if (!nameRegex.test(name)) {
      setErrorName("*Please enter valid name.");
    } else {
      setErrorName(null);
    }
  };

  // ************ Collection Amount Validations ************
  const [amount, setAmount] = useState("");
  const [errorAmount, setErrorAmount] = useState(null);
  const _validateAmount = (money) => {
    var moneyRegex = /^[0-9.]{1,15}$/i;
    if (money == "" || money == undefined || money == null) {
      setErrorAmount("*Please enter amount.");
    } else if (!moneyRegex.test(money)) {
      setErrorAmount("*Please enter valid amount.");
    } else {
      setErrorAmount(null);
    }
  };

  // ************ Title Validations ************
  const [Title, setTitle] = useState("");
  const [errorTitle, setErrorTitle] = useState(null);
  const _validateTitle = (head) => {
    var headRegex = /^[a-z A-Z0-9@_]{3,60}$/i;
    if (head === "") {
      setErrorTitle("*Please enter title.");
    } else if (!headRegex.test(head)) {
      setErrorTitle("*Please enter valid title.");
    } else {
      setErrorTitle(null);
    }
  };

  // ************ Collection Duration Validations ************
  const [royalityFees, setRoyalityFees] = useState("");
  const [errorRoyalityFees, setErrorRoyalityFees] = useState(null);
  const _validateRoyalityFees = (time) => {
    var timeRegex = /^[0-9.]{1,10}$/i;
    if (time == "" || time == undefined || time == null) {
      setErrorRoyalityFees("*Please enter duration.");
    } else if (!timeRegex.test(time)) {
      setErrorRoyalityFees("*Please enter valid duration.");
    } else {
      setErrorRoyalityFees(null);
    }
  };

  useEffect(() => {
    GetProfileApi();
    getAdminFeeDetails()
  }, [props.route]);

  // ************* On Camera Picker *************
  const onCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
      mediaType: "any",
    }).then((image) => {
      setImageUrlPath(image.path);
      setImageUrlData(image.data);
      props.navigation.navigate('ImageFilter', {Path: image.data, Type: 'Collection', PrevScreen:'CreateCollection'});
      refRBSheet.current.close();
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
      setImageUrlPath(image.path);
      setImageUrlData(image.data);
      props.navigation.navigate('ImageFilter', {Path: image.data, Type: 'Collection', PrevScreen:'CreateCollection'});
      refRBSheet.current.close();
    });
  };

  // ***** Render Post Type: Public/Private ***** //
  const RenderLabel = (item, selected) => {
    return (
      <View style={{padding:5, backgroundColor:'white'}}>
        <Text style={{fontFamily:'Montserrat-Regular', color:'black', }}>{item.value}</Text>
      </View>
    )
  }

  // ************ User Profile Api ************
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
        if (response.status === 200) {
          console.log("====== Get User Profile Response ======", response);
          setUserProfileDetails(response?.data?.result);
          setLoader(false);
        } else {
          // alert("Something went wrong.");
          setLoader(false);
        }
      })
      .catch((err) => {
        console.log("===== Get Profile Catch Error ======", err);
        setLoader(false);
        if(err.response.data.responseCode===440){
          Logout_(props)

        }
      });
    setLoader(false);
  };

  //************* Admin Fees  *****************/
  const getAdminFeeDetails = async() => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");
    axios({
      method:'get',
      url:AdminFeeListUrl,
      headers: {
        token: value,
      },
    }).then(function(response){
      if(response.data.responseCode==200){
        const newArr = response.data.result.filter((item)=>{
          return item.type=='COLLECTION'
        })
        console.log(newArr, 'admin fees');
        setadminFees(newArr)
      }
    }).catch(function(err){
      console.log(err,'admin err');
      setLoader(false);
        if(err.response.data.responseCode===440){
          Logout_(props)

        }
    })
  }

  // ************ Create Collection Api ************
  const CreateCollectionsApi = async (imagePath, imageData) => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");

    const DATA = {
      // name: Name,
      title: Title,
      amount: amount,
      image: props?.route?.params?.FilteredPost ? props?.route?.params?.FilteredPost : `data:image/jpeg;base64,${imageUrlData}`,
      description: descriptions,
      duration: royalityFees,
    };

    setLoader(true);
    axios({
      method: "post",
      url: CreateCollectionsUrl,
      data: DATA,
      headers: { token: value },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
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
          console.log("==== Create Collections Response ====", response);
          props.navigation.replace("Collections");
          setLoader(false);
        } else {
          // alert("Something went wrong.");
          setLoader(false);
        }
      })
      .catch((err) => {
        console.log("==== Create Collections Catch Err ====", err);
        setLoader(false);
        if(err.response.data.responseCode===440){
          Logout_(props)

        }
        if (err.response.data.responseCode === 401 || 402 || 404 || 409) {
          showMessage({
            message: err?.response?.data?.responseMessage,
            type: "warning",
            icon: "warning",
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
          // alert("Something went wrong");
          setLoader(false);
        }
        setLoader(false);
      });
  };

  const validate = () => {
    let flag = true;
    // if (Name === "") {
    //   setErrorName("*Please enter name.");
    //   flag = false;
    // }
    if (Title === "") {
      setErrorTitle("*Please enter title.");
      flag = false;
    }
    if (amount === "") {
      setErrorAmount("*Please enter amount.");
      flag = false;
    }
    if (royalityFees === "") {
      setErrorRoyalityFees("*Please enter duration.");
      flag = false;
    }
    if (imageUrlData === "") {
      showMessage({
        message: "Please select photo to create collection.",
        type: "warning",
        icon: "warning",
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
      flag = false;
    }
    if (profileType === "") {
      showMessage({
        message: "Please select post type",
        type: "warning",
        icon: "warning",
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
      flag = false;
    }
    return flag;
  };

  const onSubmit = () => {
    if (validate()) {
      CreateCollectionsApi();
    } else {
      // alert("Mendatory Fiels Required!!!!!")
    }
  };

  return (
    <SafeAreaView>
      {/* ************ Header Container ************ */}
      <ProfileHeader
        BackIcon={true}
        onBackPress={() => props.navigation.goBack()}
        Title={true}
        HeaderTitle="Create Collections"
        // titleStyling={{ width: width * 0.75, alignItems: "center" }}
        // titleStyling={{ width: width * 0.7 }}
        HeaderTxtStyling={{ fontSize:normalize(16), marginLeft:25 }}
        BackView={{ width: width * 0.16, alignItems: "flex-end" }}
        PostIcon={false}
        Menu={false}
      />
      <KeyboardAwareScrollView>
        <View style={Styles.MainContainer}>
          {/* ************ Profile Container ************ */}
          <View style={[Styles.ProfileImgNameContainer, {marginBottom:5}]}>
            <View style={Styles.ImgContainer}>
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate("AboutCreator", {
                    nftId: userProfileDetails?._id,
                  })
                }
              >
                {userProfileDetails?.profilePic ? (
                  <Image
                    source={{ uri: userProfileDetails?.profilePic }}
                    style={{
                      height: 45,
                      width: 45,
                      borderRadius: 45 / 2,
                      marginTop: height * 0.015,
                    }}
                  />
                ) : (
                  <Image
                    source={ImagePath.PROFILE_PIC}
                    style={{
                      height: 45,
                      width: 45,
                      borderRadius: 45 / 2,
                      marginTop: height * 0.015,
                    }}
                  />
                )}
              </TouchableOpacity>
            </View>

            {/* ************ Drop Down Container ************ */}
            <View style={Styles.NameContainer}>
              <Text style={[Styles.NameTxt, {fontSize:normalize(15)}]}>
                {userProfileDetails?.userName || userProfileDetails?.name}
              </Text>
              {/* <Dropdown
                data={DATA}
                value={profileType}
                valueField={'value'}
                labelField={'value'}
                onChange={(text)=>{
                  setProfileType(text)
                }}
                selectedTextStyle={{color:'white', fontSize:normalize(12), fontFamily:'Montserrat-Regular'}}
                style={{backgroundColor:'#1A1A1A', borderRadius:8, paddingLeft:5, width:width*0.25, marginTop:8}}
                containerStyle={{width:width*0.25 }}
                renderItem={RenderLabel}
              /> */}
            </View>
          </View>

          {/* ************ Write Here Container ************ */}
          <View style={Styles.WriteContainer}>
            <TextInput
              placeholder="Write here..."
              placeholderTextColor={"#BFBFBF"}
              maxLength={200}
              style={{
                height: height * 0.05,
                width: width * 0.9,
                padding: 8,
                color: "#BFBFBF",
                fontSize: height / 70,
                fontFamily: "Montserrat-Regular",
              }}
              onChangeText={(txt) => setDescriptions(txt)}
            />
          </View>

          {/* ************ Post Container ************ */}
          <View style={Styles.PostAreaContainer}>
            <View style={[Styles.BackImgContainer,{borderWidth:1}]}>
              <TouchableOpacity
                style={{ alignItems: "center" }}
                onPress={() => refRBSheet.current.open()}
              >
                {props?.route?.params?.FilteredPost ?
                  <Image
                  source={{ uri: props?.route?.params?.FilteredPost }}
                  style={{ height: height * 0.24, width: width * 0.88, resizeMode:'contain' }}
                  />   :   
                imageUrlPath ? (
                  <Image
                    source={{ uri: imageUrlPath }}
                    style={{ height: height * 0.24, width: width * 0.88, resizeMode:'contain' }}
                  />
                ) : (
                  <>
                    <Image
                      source={ImagePath.PLUS_UPLOAD}
                      style={{ height: 20, width: 20 }}
                    />
                    <Text style={Styles.AddPhotoVideoContaier}>
                      Add photos
                    </Text>
                  </>
                )}
              </TouchableOpacity>
            </View>
          </View>

          {/* ************ Name Container ************
          <View style={Styles.DurationDropContainer}>
            <TextInput
              placeholder="Name"
              placeholderTextColor={"#9E9E9E"}
              keyboardType="default"
              style={Styles.TxtInptContainers}
              maxLength={60}
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
          ) : null} */}

          {/* ************ Title Container ************ */}
          <View style={[Styles.InputContainer,{marginTop:20}]}>
            <TextInput
              placeholder="Title"
              placeholderTextColor={"#9E9E9E"}
              keyboardType="default"
              style={[Styles.TxtInptContainers,{fontSize:normalize(12)}]}
              maxLength={60}
              onChangeText={(txt) => {
                setTitle(txt), _validateTitle(txt);
              }}
            />
          </View>
          {errorTitle != null ? (
            <View style={Styles.ErrorContainer}>
              <Text style={{ color: "red", fontSize:normalize(12) }}>
                {errorTitle}
              </Text>
            </View>
          ) : null}

          {/* ************ Input Balance Container ************ */}
          <View
            style={{
              height: 35,
              width: width * 0.89,
              justifyContent: "flex-end",
            }}
          >
            <Text
              style={{
                color: COLOR.WHITE,
                fontSize:normalize(14),
                fontFamily: "Montserrat-Medium",
              }}
            >
              Subscription fee
              {/* Your balance : {Number(userProfileDetails?.bnbBalace).toFixed(4)} */}
            </Text>
          </View>
          <View style={[Styles.InputContainer, {backgroundColor:COLOR.TXT_INPT_COLOR, borderRadius:8, paddingRight:8}]}>
            <TextInput
              placeholder="0.00"
              placeholderTextColor={"#9E9E9E"}
              keyboardType="decimal-pad"
              style={{
                height: height * 0.075,
                width: width * 0.7,
                padding: 8,
                color: "#9E9E9E",
                fontSize: normalize(12),
                fontFamily: "Montserrat-Regular",
                // backgroundColor: "#1A1A1A",
              }}
              onChangeText={(txt) => {
                setAmount(txt), _validateAmount(txt);
              }}
            />
            <View style={Styles.BalanceTypeView}>
              <Text style={[Styles.BalanceTxt, {fontSize:normalize(12)}]}>SHARE</Text>
            </View>
          </View>
          {errorAmount != null ? (
            <View style={Styles.ErrorContainer}>
              <Text style={{ color: "red", fontSize:normalize(12) }}>
                {errorAmount}
              </Text>
            </View>
          ) : null}

          {/* ************ Duration Container ************ */}
          <View style={Styles.DurationDropContainer}>
            <TextInput
              placeholder="Subscription duration (in days)"
              placeholderTextColor={"#9E9E9E"}
              keyboardType="decimal-pad"
              style={[Styles.TxtInptContainers,{fontSize:normalize(12)}]}
              maxLength={5}
              onChangeText={(txt) => {
                setRoyalityFees(txt), _validateRoyalityFees(txt);
              }}
            />
          </View>
          {errorRoyalityFees != null ? (
            <View style={Styles.ErrorContainer}>
              <Text style={{ color: "red", fontSize:normalize(12) }}>
                {errorRoyalityFees}
              </Text>
            </View>
          ) : null}


          {/* ************ Button Container ************ */}
          <View style={Styles.BtnContainer}>
            {/* <View style={{alignSelf:'flex-start'}}>
              <Text style={{color:'white', fontSize:normalize(14)}}>Collection Fee {adminFees[0]?.amount ? adminFees[0]?.amount + ' SHARE' : ''}</Text>
            </View> */}
            {loader ? (
              <CustomLoader
              // loadingDesign={{ marginTop: height * 0.07 }}
              />
            ) : (
              <AppButton
                title="Create Collection"
                type="large"
                textStyle={{
                  fontFamily: "Montserrat-SemiBold",
                  fontSize:normalize(16)
                }}
                ButtonPress={() => onSubmit()}
              />
            )}
          </View>
        </View>
      </KeyboardAwareScrollView>

      {/* *************** Bottom Sheet *************** */}
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
              <Text style={Styles.panelTitle}>Upload Photos</Text>
              <Text style={Styles.panelSubtitle}>
                Choose your images header
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
    </SafeAreaView>
  );
};

export default CreateCollection;
