import React, { useState, useRef, useEffect } from "react";
import {
  Dimensions,
  SafeAreaView,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";

import Styles from "./Styles";
import { verticalScale } from "react-native-size-matters";
import ProfileHeader from "../../components/CustomHeader/ProfileHeader";
import { COLOR } from "../../Utils/Colors";
import AppButton from "../../components/CustomButton/CustomButton";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DepositBalanceUrl, GetBalanceUrl } from "../../restAPI/ApiConfig";
import CustomLoader from "../../components/CustomLoader/CustomLoader";
import Clipboard from "@react-native-community/clipboard";
import { ImagePath } from "../../constants/ImagePath";
import { showMessage } from "react-native-flash-message";
const { height, width } = Dimensions.get("window");

const DepositWallet = (props) => {
  const [loader, setLoader] = useState(false);
  const [UserBalance, setUserBalance] = useState({});
  const [address, setAddress] = useState("");

  useEffect(() => {
    GetBalanceApi();
  }, []);

  // ************ Get Balance Api Integration ************
  const GetBalanceApi = async () => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");
    console.log("==== value tokensss ====", value);

    axios({
      method: "get",
      url: GetBalanceUrl,
      headers: { token: value },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          console.log("==== Get Balance Response ====", response.data.result);
          setUserBalance(response?.data?.result);
        } else {
          alert("Something went wrong.");
        }
      })
      .catch((err) => console.log("==== Get Balance Catch err ====", err));
  };

  // ************ Deposit Balance Api Integration ************
  const DepositBalanceApi = async () => {
    const value = await AsyncStorage.getItem("token");

    const DATA = new FormData();
    DATA.append({
      walletAddress: address,
    });
    console.log("==== deposit formdata ====", DATA?._parts[0][0]);

    setLoader(true);
    axios({
      method: "post",
      url: DepositBalanceUrl,
      data: DATA?._parts[0][0],
      headers: { token: value },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          console.log("==== Deposit Balance Response ====", response);
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
          props.navigation.navigate("Wallet");
          setLoader(false);
        } else {
          alert("Something went wrong.");
          setLoader(false);
        }
      })
      .catch((err) => {
        console.log("==== Deposit Balance Catch error=====", err);
        if (err.response.data.responseCode === 401 || 402) {
          showMessage({
            message: err.response.data.responseMessage,
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
          alert("Something went wrong.");
          setLoader(false);
        }
        setLoader(false);
      });
  };

  const PasteAdd = async () => {
    console.log(address,'address');
    const text = await Clipboard.setString(address);
    setAddress(text);
    showMessage({
      message: "Copied!",
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
  };

  return (
    <SafeAreaView>
      {/* ************ Header Container ************ */}
      <ProfileHeader
        Title={true}
        HeaderTitle="Deposit Share"
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

      {/* ************ Main Container ************ */}
      <View style={Styles.MainContainer}>
        <View style={Styles.TxtInptContainer}>
          {/* ************ Heading Container ************ */}
          <View style={Styles.COnfirmationTxtContainer}>
            <Text style={Styles.Confirmationtxt}>
              Balance : {UserBalance?.bnbBalace} SHARE
            </Text>
          </View>

          {/* ************ Amount Field Container ************ */}
          <View style={Styles.TxtInptView}>
            <View style={Styles.TxtInptCopyContainer}>
              <TextInput
                style={[Styles.InputAddressStyling]}
                placeholder="Enter the Wallet Address"
                placeholderTextColor="rgba(158, 158, 158, 1)"
                multiline={true}
                searchIcon={false}
                returnType={"done"}
                value={address}
                onChangeText={(text) => setAddress(text)}
              />

              {!address ? (
                <View style={[Styles.copyIconContainer]}>
                  <TouchableOpacity onPress={() => PasteAdd()}>
                    <Image
                      source={ImagePath.COPY_ICON}
                      style={{
                        height: 18,
                        width: 18,
                        tintColor: COLOR.WHITE,
                        resizeMode: "contain",
                      }}
                    />
                  </TouchableOpacity>
                </View>
              ) : null}
            </View>
          </View>

          {/* ************ Button Container ************ */}
          <View style={Styles.BtnContainer}>
            {loader ? (
              <CustomLoader />
            ) : address ? (
              <AppButton
                title="Submit"
                type="large"
                textStyle={{
                  fontFamily: "Montserrat-SemiBold",
                }}
                ButtonPress={() => DepositBalanceApi()}
              />
            ) : (
              <AppButton
                title="Submit"
                type="large"
                disabled
                textStyle={{ fontFamily: "Montserrat-SemiBold" }}
                ButtonPress={() => DepositBalanceApi()}
              />
            )}
          </View>
        </View>
      </View>

      <View style={Styles.BlankContainer} />
    </SafeAreaView>
  );
};

export default DepositWallet;
