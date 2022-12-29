import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Modal,
  Platform,
} from "react-native";

import Styles from "./Styles";
import ProfileHeader from "../../components/CustomHeader/ProfileHeader";
import AppButton from "../../components/CustomButton/CustomButton";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomLoader from "../../components/CustomLoader/CustomLoader";
import moment from "moment";
import {
  CreateAuctionApiUrl,
  LikeDislikeAuctionsUrl,
} from "../../restAPI/ApiConfig";
import DatePicker from "react-native-date-picker";
import { ImagePath } from "../../constants/ImagePath";
import { COLOR } from "../../Utils/Colors";
import { verticalScale } from "react-native-size-matters";
import { showMessage } from "react-native-flash-message";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const { height, width } = Dimensions.get("window");

const OwnAndBuyPost = (props) => {
  const [details, setDetails] = useState(props?.route?.params?.item); // 21 May Changes
  const [detailsTwo, setDetailsTwo] = useState(
    props?.route?.params?.item?.item
  );
  const [loader, setLoader] = useState(false);
  const [Amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [modalVisibleResale, setModalVisibleResale] = useState(false);

  const validate = () => {
    if (Amount <= 0) {
      showMessage({
        message: "*Amount must be greater then 0.",
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
      setModalVisibleResale(!modalVisibleResale);
    } else {
      ResalePostApi();
    }
  };

  // ***** Like *****
  const [Like, setLike] = useState(true);
  const _toggleLike = () => {
    setLike(false);
    LikeDislikeBidApi();
  };
  const _toggleUnLike = () => {
    setLike(true);
    LikeDislikeBidApi();
  };

  // ***** Resale Api *****
  const ResalePostApi = async (item, index) => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");

    const imageData = new FormData();
    imageData.append("files", {
      postId: details?._id || detailsTwo?._id,
      title: details?.postTitle || detailsTwo?.postTitle,
      mediaUrl: details?.mediaUrl || detailsTwo?.mediaUrl,
      details: details?.details || detailsTwo?.details,
      amount: Amount,
      time: moment(date).format(),
    });

    setLoader(true);
    axios({
      method: "post",
      url: CreateAuctionApiUrl,
      data: imageData?._parts[0][1],
      headers: {
        token: value,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          console.log("====== Resale Post Response ======", response);
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
          setModalVisibleResale(!modalVisibleResale);
          props.navigation.goBack();
          setLoader(false);
        } else {
          alert("Something went wrong.");
          setLoader(false);
        }
      })
      .catch((err) => {
        console.log("===== Resale Post Catch Error ======", err);
        setLoader(false);
      });
    setLoader(false);
  };

  // ******************** Like-Dislike Bid on Auctions ********************
  const LikeDislikeBidApi = async () => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");
    console.log(details?._id, value);

    setLoader(true);
    axios({
      method: "get",
      url: LikeDislikeAuctionsUrl + `${details?._id}`,
      headers: {
        token: value,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          console.log("====== LikeDislike Bid Response ======", response);
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
          setLoader(false);
        } else {
          alert("Something went wrong.");
          setLoader(false);
        }
      })
      // .catch((err) => {
      //   console.log("===== LikeDislike Bid err ======", err);
      //   setLoader(false);
      // });
      .catch((err) => {
        console.log("==== LikeDislike Bid Catch error=====", err);
        if (err.response.data.responseCode === 404) {
          showMessage({
            message: err?.response?.data?.responseMessage,
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
    setLoader(false);
  };

  return (
    <SafeAreaView>
      {/* ************ Header Container ************ */}

      <ProfileHeader
        Title={true}
        HeaderTitle={"Resale"}
        BackIcon={true}
        onBackPress={() => props.navigation.goBack()}
        // titleStyling={{ width: width * 0.7, alignItems: "center" }}
        titleStyling={{ width: width * 0.7 }}
        HeaderTxtStyling={{ marginLeft: height * 0.04 }}
        BackIconStyling={{ marginLeft: verticalScale(10) }}
        PostIcon={false}
        Menu={false}
        ShareIcon={false}
        ShareClick={() => {}}
      />
      <KeyboardAwareScrollView>
        <View style={Styles.MainContainer}>
          {/* ************ Image Container ************ */}
          <View style={Styles.ImageContainer}>
            {details?.mediaUrl === details?.mediaUrl ? (
              <Image
                source={{ uri: details?.mediaUrl }}
                style={{ height: height * 0.413, width: width * 1 }} // New
              />
            ) : (
              <Image
                source={{ uri: detailsTwo?.mediaUrl }}
                style={{ height: height * 0.413, width: width * 1 }} // New
              />
            )}
          </View>

          {/* ************ Profile Container ************ */}
          <View style={Styles.ProfileView}>
            <View style={Styles.PicNameContainer}>
              <View style={Styles.ProfilePicContainer}>
                {details?.buyerId[0]?.profilePic ? (
                  <Image
                    source={{ uri: details?.buyerId[0]?.profilePic }}
                    style={{ height: 45, width: 45, borderRadius: 45 / 2 }}
                  />
                ) : (
                  <Image
                    // source={{ uri: detailsTwo?.userId?.profilePic }}
                    source={ImagePath.PROFILE_PIC}
                    style={{ height: 45, width: 45, borderRadius: 45 / 2 }}
                  />
                )}
              </View>

              <View style={Styles.ProfileNameContainer}>
                <Text style={Styles.ProfileNameTxt}>{details?.postTitle?.split(' ').slice(0,3).join(' ') + '...'}</Text>
                <Text numberOfLines={2} style={Styles.ProfileDataTxtTwo}>
                  {details?.details?.split(' ').slice(0,10).join(' ') + '...' || detailsTwo?.details?.split(' ').slice(0,5).join(' ') + '...'}
                </Text>
              </View>

              <View style={Styles.LikesCountContainer}>
                <TouchableOpacity
                  onPress={() => (Like ? _toggleLike() : _toggleUnLike())}
                >
                  <Image
                    source={Like ? ImagePath.LIKE : ImagePath.HEART_LIKE}
                    style={{ height: 18, width: 18 }}
                  />
                </TouchableOpacity>
                <Text style={Styles.LikesAmountTxt}>
                  {details?.likesCount || detailsTwo?.likesCount}
                </Text>
              </View>
            </View>

            <View style={Styles.DurationPrice}>
              <View style={[Styles.DurationContainer]}>
                <Text style={Styles.DurationTxt}>Price: </Text>
                <Text style={Styles.DaysTxt}>
                  {" "}
                  {details?.amount || detailsTwo?.amount} SHARE
                </Text>
              </View>
            </View>

            {/* ************* Price Container ************* */}
            <View style={Styles.PriceContainer}>
              <Text style={Styles.PriceTxt}>Price :</Text>
              <TextInput
                placeholder="Enter amount"
                placeholderTextColor={COLOR.TXT_INPT_COLOR}
                keyboardType="decimal-pad"
                style={Styles.InptStyling}
                onChangeText={(txt) => setAmount(txt)}
              />
            </View>

            {/* ************* Duration Container ************* */}
            <View style={Styles.PriceContainer}>
              <Text style={Styles.PriceTxt}>Duration :</Text>
              <View style={Styles.datainputd}>
                <View style={Styles.datainputd1}>
                  <Text
                    style={{ color: "white", left: 5, position: "absolute" }}
                  >
                    {moment(date).format("L")}
                  </Text>
                  <DatePicker
                    modal
                    open={open}
                    date={date}
                    onConfirm={(date) => {
                      setOpen(false);
                      setDate(date);
                    }}
                    onCancel={() => {
                      setOpen(false);
                    }}
                    minimumDate={new Date()}
                    mode="date"
                    textColor={COLOR.BLACK}
                  />
                </View>
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
            </View>

            {/* ************ Button Container ************ */}
            <View style={Styles.BtnContainer}>
              {loader ? (
                <CustomLoader />
              ) : Amount && date ? (
                <AppButton
                  title="Resale"
                  type="large"
                  textStyle={{ fontFamily: "Montserrat-SemiBold" }}
                  // ButtonPress={() => ResalePostApi()}
                  ButtonPress={() => setModalVisibleResale(true)}
                  btnStyling={{}}
                />
              ) : (
                <AppButton
                  title="Resale"
                  type="large"
                  disabled
                  textStyle={{ fontFamily: "Montserrat-SemiBold" }}
                  ButtonPress={() => setModalVisibleResale(true)}
                  btnStyling={{}}
                />
              )}
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>

      {/* ************ Resale Confirmation Modal ************ */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleResale}
      >
        <TouchableOpacity
          onPress={() => setModalVisibleResale(false)}
          style={{
            height: height * 1,
            width: width * 1,
            backgroundColor: "rgba(0,0,0,0.4)",
          }}
        >
          <View style={Styles.LogoutmainContainer}>
            <View style={Styles.LogoutModalSubContainer}>
              <View style={Styles.LogoutHeadingContainer}>
                <View
                  style={{ height: height * 0.07, justifyContent: "center" }}
                >
                  <Text
                    style={[
                      Styles.LogoutHeadingTxtContainer,
                      {
                        fontFamily: "Montserrat-Medium",
                        fontSize: height / 30,
                      },
                    ]}
                  >
                    Resale
                  </Text>
                </View>
                <View
                  style={{ height: height * 0.08, justifyContent: "center" }}
                >
                  <Text
                    style={[
                      Styles.LogoutHeadingTxtContainer,
                      { fontFamily: "Montserrat-Regular" },
                    ]}
                  >
                    Are you sure, you want to Resale this
                  </Text>
                  <Text
                    style={[
                      Styles.LogoutHeadingTxtContainer,
                      { fontFamily: "Montserrat-Regular", textAlign: "center" },
                    ]}
                  >
                    post ?
                  </Text>
                </View>

                <View style={Styles.LogoutButtonMainContainer}>
                  <View style={Styles.LogoutbtnContainer}>
                    <AppButton
                      title="Yes"
                      type="small"
                      textStyle={{
                        fontFamily: "Montserrat-SemiBold",
                        fontSize: height / 57,
                      }}
                      // ButtonPress={() => ResalePostApi()}
                      ButtonPress={() => validate()}
                    />
                  </View>
                  <View style={Styles.LogoutbtnContainer}>
                    <AppButton
                      title="No"
                      type="small"
                      textStyle={{
                        fontFamily: "Montserrat-SemiBold",
                        fontSize: height / 57,
                      }}
                      ButtonPress={() =>
                        setModalVisibleResale(!modalVisibleResale)
                      }
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

export default OwnAndBuyPost;

const styles = StyleSheet.create({});
