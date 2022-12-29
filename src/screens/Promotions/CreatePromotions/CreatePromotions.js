import React, { useRef, useState, useEffect } from "react";
import {
  Dimensions,
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";

import Styles from "./Styles";
import ProfileHeader from "../../../components/CustomHeader/ProfileHeader";
import { verticalScale } from "react-native-size-matters";
import { ImagePath } from "../../../constants/ImagePath";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  AdminDurationList,
  CreatePostPromotions,
  GetUserProfileUrl,
  ListOfInterestUrl,
} from "../../../restAPI/ApiConfig";
import CustomInput from "../../../components/CustomInput/CustomInput";
import { COLOR } from "../../../Utils/Colors";
import ImagePicker from "react-native-image-crop-picker";
import CustomLoader from "../../../components/CustomLoader/CustomLoader";
import AppButton from "../../../components/CustomButton/CustomButton";
import RBSheet from "react-native-raw-bottom-sheet";
import { showMessage } from "react-native-flash-message";
import CustomDropDown from "../../../components/CustomDropDown/CustomDropDown";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const { height, width } = Dimensions.get("window");
import DropDown from "../../../components/CustomDropDown/DropDown";

const CreatePromotions = (props) => {
  const [data, setData] = useState([]);
  const refRBSheet = useRef();

  const [loader, setLoader] = useState(false);
  const [userProfileDetails, setUserProfileDetails] = useState({});
  const [imageUrlPath, setImageUrlPath] = useState("");
  const [imageUrlData, setImageUrlData] = useState("");
  const [adminDuration, setAdminDuration] = useState([]);

  const [InterestListData, setInterestListData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const onSelect = (item) => {
    setSelectedItem(item);
  };

  const [title, setTitle] = useState("");
  const [errorTitle, setErrorTitle] = useState(null);
  const _validateTitle = (fname) => {
    var fnameRegex = /^[a-zA-Z]{3,32}$/i;
    if (fname == "" || fname == undefined || fname == null) {
      setErrorTitle("*Please enter title.");
    } else if (!fnameRegex.test(fname)) {
      setErrorTitle("*Please enter valid title.");
    } else {
      setErrorTitle(null);
    }
  };

  const [description, setDescription] = useState("");
  const [errorDescription, setErrorDescription] = useState(null);
  const _validateDescripton = (descp) => {
    var descpRegex = /^[a-zA-Z]{3,200}$/i;
    if (descp == "" || descp == undefined || descp == null) {
      setErrorDescription("*Please enter description.");
    } else if (!descpRegex.test(descp)) {
      setErrorDescription("*Please enter valid description.");
    } else {
      setErrorDescription(null);
    }
  };

  const [minAge, setMinAge] = useState("");
  const [errorMinAge, setErrorMinAge] = useState(null);
  const _validateMinAge = (min) => {
    var minRegex = /^[0-9]{0,3}$/i;
    if (min == "" || min == null) {
      setErrorMinAge("*Please enter age.");
    } else if (min < 12) {
      setErrorMinAge("*Age is greater than 12.");
    } else if (!minRegex.test(min)) {
      setErrorMinAge("*Please enter valid age.");
    } else {
      setErrorMinAge(null);
    }
  };

  const [maxAge, setMaxAge] = useState("");
  const [errorMaxAge, setErrorMaxAge] = useState(null);
  const _validateMaxAge = (max) => {
    var maxRegex = /^[0-9]{1,3}$/i;
    if (max == "" || max == null) {
      setErrorMaxAge("*Please enter age.");
    } else if (!maxRegex.test(max)) {
      setErrorMaxAge("*Please enter valid age.");
    } else {
      setErrorMaxAge(null);
    }
  };

  const [duration, setDuration] = useState("");

  // ************* On Camera Picker *************
  const onCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      includeBase64: true,
      mediaType: "any",
    }).then((image) => {
      console.log("===== Open Camera =====", image);
      setImageUrlPath(image.path);
      setImageUrlData(image.data);
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
      console.log("selected image", image);
      setImageUrlPath(image.path);
      setImageUrlData(image.data);
      refRBSheet.current.close();
    });
  };

  useEffect(() => {
    GetProfileApi();
    DurationList();
    ListInterestApi();
  }, []);

  // ************ Get Profile Api ************
  const GetProfileApi = async () => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");
    console.log("====== my token======>>>>", value);

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
          setUserProfileDetails(response?.data?.result);
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

  // ************ Durataion List ************
  const DurationList = async () => {
    console.log("hii")
    setLoader(true);
    axios({
      method: "get",
      url: AdminDurationList,
      params: {
        limit: 50,
        page: 1, 
      },
    })
      .then(async (response) => {
        console.log("====== Admin Duration List Response ======", response.data.result);
        if (response.data.responseCode === 200) {
          // setAdminDuration(response?.data?.result[0]);
          setAdminDuration(response?.data?.result?.docs);
          setLoader(false);
        } else {
          alert("Something went wrong.");
          setLoader(false);
        }
      })
      .catch((err) =>
        console.log("===== Admin Duration List Catch Error ======", err.response)
      );
  };

  // ************ Interest List Api ************
  const ListInterestApi = async () => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");

    setLoader(true);
    axios({
      method: "get",
      url: ListOfInterestUrl,
      params: {
        limit: 50,
        page: 1,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          console.log("==== Interest List Response ====", response);
          setInterestListData(response?.data?.result?.docs);
          setLoader(false);
        } else {
          alert("Something went wrong.");
          setLoader(false);
        }
      })
      .catch((err) => {
        console.log("==== Interest List Catch err ====", err);
        setLoader(false);
      });
    setLoader(false);
  };

  // ************ Create Interest ************
  const CreatePromotionsApi = async () => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");

    const DATA = {
      // postId: "string",
      postTitle: title,
      mediaUrl: `data:image/jpeg;base64,${imageUrlData}`,
      details: description,
      // dateTime: adminDuration?.duration,
      dateTime: selectedItemDuration?.duration,
      // amount: adminDuration?.amount,
      amount: selectedItemDuration?.amount,
      minAge: minAge,
      maxAge: maxAge,
      // tag: [interest],
      interest: [selectedItem?.name],
    };
    console.log("---- create promotions data ------", DATA);

    setLoader(true);
    axios({
      method: "post",
      url: CreatePostPromotions,
      data: DATA,
      headers: {
        token: value,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          console.log("====== Post Promotions Response ======", response);
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
          props.navigation.navigate("Home");
          setLoader(false);
        } else {
          alert("Something went wrong.");
          setLoader(false);
        }
      })
      .catch((err) => {
        console.log("===== Post Promotions Catch Error ======", err);
        if (err.response.data.responseCode === 401 || 402 || 404) {
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

  const Validate = () => {
    let flag = true;
    if (title === "") {
      setErrorTitle("*Please enter title.");
      flag = false;
    }
    if (description === "") {
      setErrorDescription("*Please enter description.");
      flag = false;
    }
    if (minAge === "") {
      setErrorMinAge("*Please enter age.");
      flag = false;
    }
    if (maxAge === "") {
      setErrorMaxAge("*Please enter age.");
      flag = false;
    }
    if (imageUrlPath === "") {
      showMessage({
        message: "Image is required for promotions",
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

  const SubmitApi = () => {
    if (Validate()) {
      CreatePromotionsApi();
    } else {
      alert("Something went wrong");
    }
  };

  const [selectedItemDuration, setSelectedItemDuration] = useState(null);
  const onSelectDuration = (item) => {
    setSelectedItemDuration(item);
  };

  return (
    <SafeAreaView>
      {/* ************ Header Container ************ */}
      <ProfileHeader
        BackIcon={true}
        Title={true}
        HeaderTitle="Create Promotions"
        // titleStyling={{ width: width * 0.75, alignItems: "center" }}
        titleStyling={{ width: width * 0.7 }}
        HeaderTxtStyling={{ marginLeft: height * 0.04 }}
        onBackPress={() => props.navigation.goBack()}
        BackIconStyling={{ marginLeft: verticalScale(10) }}
        PostIcon={false}
        Menu={false}
        ShareIcon={false}
      />
      <KeyboardAwareScrollView>
        <View style={Styles.MainContainer}>
          {/* ************ Heading Container ************ */}
          <View style={Styles.HeadingContainer}>
            <Text style={Styles.HeadingTxt}>Create Promotions</Text>
          </View>

          {/* ************ Profile Pic and userName Container ************ */}
          <View style={Styles.ProfileDetailsContainer}>
            <View style={Styles.ProfilePicsContainer}>
              {userProfileDetails?.profilePic ? (
                <Image
                  source={{ uri: userProfileDetails?.profilePic }}
                  style={{ height: 42, width: 42, borderRadius: 42 / 2 }}
                />
              ) : (
                <Image
                  source={ImagePath.PROFILE_PIC}
                  style={{ height: 40, width: 40 }}
                />
              )}
            </View>
            <Text style={Styles.ProfileNameTxt}>
              {userProfileDetails?.userName || userProfileDetails?.name}
            </Text>
          </View>

          {/* ************ Title Container ************ */}
          <View style={[Styles.InputFieldContainer]}>
            <CustomInput
              LeftIcon={false}
              placeholder="Title"
              keyboardType="default"
              placeholderTextColor={COLOR.GREY}
              styles={Styles.TxtInptStyling}
              onChangeText={(txt) => {
                setTitle(txt), _validateTitle(txt);
              }}
            />
          </View>
          {errorTitle != null ? (
            <View style={Styles.ErrorContainer}>
              <Text style={{ color: "red", fontSize: height / 65 }}>
                {errorTitle}
              </Text>
            </View>
          ) : null}

          {/* ************ Description Container ************ */}
          <View style={[Styles.InputFieldContainer]}>
            <CustomInput
              LeftIcon={false}
              placeholder="Description"
              keyboardType="default"
              placeholderTextColor={COLOR.GREY}
              styles={Styles.TxtInptStyling}
              onChangeText={(txt) => {
                setDescription(txt), _validateDescripton(txt);
              }}
            />
          </View>
          {errorDescription != null ? (
            <View style={Styles.ErrorContainer}>
              <Text style={{ color: "red", fontSize: height / 65 }}>
                {errorDescription}
              </Text>
            </View>
          ) : null}

          {/* ************ Add Interest Button Container ************ */}
          <View
            style={{
              width: width * 1,
              alignItems: "center",
              marginTop: height * 0.015,
            }}
          >
            <CustomDropDown
              value={selectedItem}
              data={InterestListData}
              onSelect={onSelect}
            />
          </View>
          {/* <View style={Styles.AddInterestBtn}>
            {interest !== "" ? (
              <TouchableOpacity
                style={{ flexDirection: "row" }}
                onPress={() => AddInterest()}
              >
                <Image
                  source={ImagePath.ADD_FILL_ICON}
                  style={{ height: 20, width: 20 }}
                />
                <Text style={Styles.AddBtnTxt}>Add Interest</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                disabled
                style={{ flexDirection: "row" }}
                onPress={() => AddInterest()}
              >
                <Image
                  source={ImagePath.ADD_FILL_ICON}
                  style={{ height: 20, width: 20 }}
                />
                <Text style={Styles.AddBtnTxt}>Add Interest</Text>
              </TouchableOpacity>
            )}
          </View> */}

          {/* ************ Minimum Age Container ************ */}
          <View style={[Styles.InputFieldContainer]}>
            <CustomInput
              LeftIcon={false}
              placeholder="Minimum Age"
              keyboardType="numeric"
              maxLength={2}
              placeholderTextColor={COLOR.GREY}
              styles={Styles.TxtInptStyling}
              onChangeText={(txt) => {
                setMinAge(txt), _validateMinAge(txt);
              }}
            />
          </View>
          {errorMinAge != null ? (
            <View style={Styles.ErrorContainer}>
              <Text style={{ color: "red", fontSize: height / 65 }}>
                {errorMinAge}
              </Text>
            </View>
          ) : null}

          {/* ************ Maximum age Container ************ */}
          <View style={[Styles.InputFieldContainer]}>
            <CustomInput
              LeftIcon={false}
              placeholder="Maximum Age"
              keyboardType="numeric"
              maxLength={2}
              placeholderTextColor={COLOR.GREY}
              styles={Styles.TxtInptStyling}
              onChangeText={(txt) => {
                setMaxAge(txt), _validateMaxAge(txt);
              }}
            />
          </View>
          {errorMaxAge != null ? (
            <View style={Styles.ErrorContainer}>
              <Text style={{ color: "red", fontSize: height / 65 }}>
                {errorMaxAge}
              </Text>
            </View>
          ) : null}

          {/* ************ Duration Container ************ */}
          <View
            style={{
              width: width * 1,
              alignItems: "center",
              marginTop: height * 0.015,
            }}
          >
            <DropDown
              value={selectedItemDuration}
              data={adminDuration}
              onSelectDuration={onSelectDuration}
            />

            {/* <Text style={[Styles.AddBtnTxt, { fontSize: height / 47 }]}>
              Duration :
            </Text>

            <View style={Styles.DurationAndAmountContainer}>
              <Text
                style={[
                  Styles.AddBtnTxt,
                  {
                    fontSize: height / 47,
                    color: COLOR.TXT_COLOR,
                    marginLeft: height * -0.005,
                  },
                ]}
              >
                {adminDuration?.duration} Days, {adminDuration?.amount} SHARE
              </Text>
            </View> */}
          </View>

          {/* ************ Add Photos/Videos Container ************ */}
          <TouchableOpacity
            style={Styles.PostAreaContainer}
            onPress={() => refRBSheet.current.open()}
          >
            {imageUrlPath ? (
              <View>
                <Image
                  source={{ uri: imageUrlPath }}
                  style={{ height: 220, width: 352 }}
                />
              </View>
            ) : (
              <View style={[Styles.ImgUploadView,{marginTop:10}]}>
                <TouchableOpacity
                  onPress={() => refRBSheet.current.open()}
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Image
                    source={ImagePath.PLUS_UPLOAD}
                    style={{
                      height: 22,
                      width: 22,
                      tintColor: COLOR.WHITE,
                    }}
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    color: "#9E9E9E",
                    fontFamily: "Montserrat-Medium",
                    fontSize: height / 55,
                  }}
                >
                  Add photos here
                </Text>
              </View>
            )}
          </TouchableOpacity>

          {/* ************ Submit Button Container ************ */}
          <View style={Styles.BtnContainer}>
            {!loader ? (
              <AppButton
                title="Submit"
                type="large"
                textStyle={{ fontFamily: "Montserrat-Bold" }}
                // ButtonPress={() => CreatePromotionsApi()}
                ButtonPress={() => SubmitApi()}
              />
            ) : (
              <CustomLoader loadingDesign={{ marginTop: height * 0.09 }} />
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
              <Text style={Styles.panelTitle}>Upload Story</Text>
              <Text style={Styles.panelSubtitle}>
                Choose you images / videos picture
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

export default CreatePromotions;
