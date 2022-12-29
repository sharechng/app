import React, { useState, useEffect } from "react";
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Share,
  Alert,
  Platform,
} from "react-native";

import Styles from "./Styles";
import { ImagePath } from "../../constants/ImagePath";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
// import QRCode from "react-native-qrcode-image";
import QRCode from 'react-native-qrcode-svg';
import ProfileHeader from "../../components/CustomHeader/ProfileHeader";
import { AdminFeeListUrl, GetBalanceUrl, GetUserProfileUrl } from "../../restAPI/ApiConfig";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showMessage } from "react-native-flash-message";
import { RNCamera } from "react-native-camera";
import { COLOR } from "../../Utils/Colors";
import Progressdialog from "../../../Progressdialog";
import Clipboard from "@react-native-community/clipboard";

const { height, width } = Dimensions.get("window");

const ReceiveWallet = (props) => {
  const [loader, setLoader] = useState(false);
  const [UserDetails, setUserDetails] = useState({});
  const [UserProfileDetails, setUserProfileDetails] = useState({});
  const [copiedText, setCopiedText] = useState("");
  const [min_deposit, setMin_deposit] = useState(0);
  const copyToClipboard = () => {
    // Alert.alert("Copied to clipboard");
    // Clipboard.setString(copiedText || UserProfileDetails?.bnbAccount?.address);
    // console.log(UserProfileDetails?.bnbAccount?.address, '>>copied');
    Clipboard.setString(UserProfileDetails?.bnbAccount?.address)
    showMessage({
      message: "Copied",
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
    console.log("-=-= checker -=-=-=", copiedText);
  };

  // ******************** Share Message Functionality ********************
  const ShareMessage = async () => {
    try {
      const result = await Share.share({
        message: UserProfileDetails?.bnbAccount?.address, // Static Message
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          UserProfileDetails?.bnbAccount?.address;
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
      Alert.alert("Social link is required to share");
    }
  };

  useEffect(() => {
    GetBalanceApi();
    GetProfileApi();
    FeeListApi()
  }, []);

  // ************ Get Balance Api Integration ************
  const GetBalanceApi = async () => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");
    // setLoader(true);

    axios({
      method: "get",
      url: GetBalanceUrl,
      headers: { token: value },
    })
      .then(async (response) => {
        // setLoader(true);

        if (response.data.responseCode === 200) {
          setUserDetails(response?.data?.result);
        } else {
          alert("Something went wrong.");
        }
      })
      .catch((err) => {
        // setLoader(true);

        console.log("==== Get Balance Catch err ====", err)
      });
  };
  const FeeListApi = async () => {
    setLoader(true);
    axios({
      method: 'get',
      url: AdminFeeListUrl,
    })
      .then(async response => {
        setLoader(false);
        if (response.data.responseCode === 200) {
          
          setMin_deposit(response?.data?.result.filter((item, index) => item.type === 'DEPOSIT_TOKEN')[0].amount);
        } else {
          alert('Something went wrong.');
        }
      })
      .catch(err => {
        console.log('==== Get FeeList Catch err ====', err);
        setLoader(false);
      });
  };
  // ************ Get Profile Api ************
  const GetProfileApi = async () => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");
    // console.log(value,'><><');
    setLoader(true);
    axios({
      method: "get",
      url: GetUserProfileUrl,
      headers: {
        token: value,
      },
    })
      .then(async (response) => {
        // console.log(response?.data?.responseCode,'fsdfsdf');
        setLoader(false);
        if (response?.data?.responseCode == 200) {
          console.log('>>>',response?.data?.result);
          setUserProfileDetails(response?.data?.result);
        } else {
          alert("Something went wrong.");
        }
      })
      .catch((err) => {
        console.log("===== Get Profile Catch Error ======", err);
        setLoader(false);
      });
  };

  return (
    <SafeAreaView>
      {
        loader && <Progressdialog />
      }
      <View style={Styles.MainContainer}>
        {/* ************ Header Container ************ */}
        <ProfileHeader
          Title={true}
          HeaderTitle="Deposit Share"
          // titleStyling={{ alignItems: "center", width: width * 0.7 }}
          titleStyling={{ width: width * 0.7 }}
          HeaderTxtStyling={{ marginLeft: height * 0.04 }}
          BackIcon={true}
          onBackPress={() => props.navigation.goBack()}
          BackIconStyling={{ marginLeft: verticalScale(10) }}
          PostIcon={false}
          Menu={false}
          ShareIcon={false}
          ShareClick={() => ShareMessage()}
        />

        {/* ************ QR Code Image Container ************ */}
        <View style={Styles.backImageContainer}>
          <View style={Styles.QRCodeContainer}>
            {/* <QRCode
              // value={UserDetails?.address}
              value={UserProfileDetails?.bnbAccount?.address}
              size={200}
              bgColor="#000000"
              fgColor="#ffffff"
            /> */}
            {UserProfileDetails?.bnbAccount?.address ? 
            <QRCode
              style={styles.HeadingImage}
              value={UserProfileDetails?.bnbAccount?.address}
              size={200}
              color={'#000'}
              // logoBackgroundColor='transparent'
              quietZone={10}
              backgroundColor="#fff"
            /> : null}
          </View>
        </View>

        {/* ************ Profile Container ************ */}
        <View style={{ alignItems: "flex-start", width: width * 0.9 }}>
          <Text
            style={{
              color: COLOR.WHITE,
              fontFamily: "Montserrat-SemiBold",
              fontSize: height / 50,
            }}
          >
            Destination Address{" "}
          </Text>
        </View>
        <View style={Styles.ProfileContainer}>
          <View style={Styles.ProfileSubContainer}>
            <View style={Styles.ProfileNameAddressContainer}>
              <Text numberOfLines={1} style={Styles.ProfileAddressContainer}>
                {UserProfileDetails?.bnbAccount?.address}
              </Text>
            </View>
            <View style={Styles.CopyIconContainer}>
              <TouchableOpacity
                onPress={() => {
                  copyToClipboard(),
                    setCopiedText(UserProfileDetails?.bnbAccount?.address);
                }}
              >
                <Image
                  source={ImagePath.COPY_ICON}
                  style={{ height: 16, width: 16 }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* ************ Confirm Network Container ************ */}
        <View style={Styles.NetworkContainer}>
          <Text style={Styles.NetworkTxt}>Confirm Network</Text>
          <Text style={Styles.NetworkTxt}>3 Networks</Text>
        </View>
        <View style={{
          flexDirection: "row",
          marginTop:5,
          width:width*0.9,



        }}>
          <Text style={Styles.NetworkTxt}>Min deposit amount:</Text>
          <Text style={Styles.NetworkTxt}>{min_deposit} </Text>
        </View>

        {/* ************ Disclaimer Container ************ */}
        <View style={{ alignItems: "flex-start", width: width * 0.9,marginTop:10 }}>
          <Text
            style={{
              color: COLOR.WHITE,
              fontSize: height / 48,
              fontFamily: "Montserrat-SemiBold",
            }}
          >
            Disclaimer
          </Text>
        </View>

        <View
          style={{
            width: width * 1,
            borderBottomWidth: 1,
            borderColor: "rgba(61, 61, 61, 1)",
            marginTop: height * 0.01,
          }}
        />

        <View style={{ width: width * 0.9, bgColor: "red" }}>
          <Text
            numberOfLines={9}
            style={{
              fontSize: height / 55,
              color: "rgba(131, 131, 131, 1)",
              fontFamily: "Montserrat-Regular",
              marginVertical: height * 0.02,
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque
            odio nibh malesuada nam orci at dictum suspendisse dignissim. Sed
            nunc, cum viverra egestas scelerisque nunc. Massa ornare convallis
            quis ut facilisis lacus. A ac pellentesque enim lacinia eu at eget
            feugiat facilisis. Nisi, at aliquam auctor nibh ut velit pharetra
            sit etiam. Egestas proin amet ipsum, gravida nunc, eleifend tellus.
            Sit viverra quis non eget libero, turpis enim nisi.
          </Text>
        </View>
      </View>

      <View style={Styles.BlankContainer} />
    </SafeAreaView>
  );
};

export default ReceiveWallet;

const styles = StyleSheet.create({});
