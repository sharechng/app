import {
  Text,
  View,
  Image,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Modal,
  Alert,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from "react-native";
import React, { useState, useEffect } from "react";

import Styles from "./Styles";
import { ImagePath } from "../../constants/ImagePath";
import { verticalScale } from "react-native-size-matters";
import AppButton from "../../components/CustomButton/CustomButton";
import { COLOR } from "../../Utils/Colors";
import ProfileHeader from "../../components/CustomHeader/ProfileHeader";

import {
  BuyAuctionApiUrl,
  CreateBidonAuctionsUrl,
  ViewAuctionDetailsUrl,
  GetUserProfileUrl,
  acceptBidApiUrl,
  rejectBidApiUrl,
  cancelAuctionApiUrl,
  editBidApiUrl,
  LikeDislikeAuctionsUrl,
} from "../../restAPI/ApiConfig";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
const { height, width } = Dimensions.get("window");
import DatePicker from "react-native-date-picker";
import { showMessage } from "react-native-flash-message";
import CustomLoader from "../../components/CustomLoader/CustomLoader";
import { Logout_ } from "../../../Logout";

const AuctionsDetails = (props) => {
  const [loader, setLoader] = useState(false);
  const [loaderAuctionProfile, setLoaderAuctionProfile] = useState(false);

  const [AuctionId, setAuctionId] = useState(props.route.params._id);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [AuctionDetails, setAuctionDetails] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [userProfileDetails, setUserProfileDetails] = useState({});
  const [modalVisibleLogout, setModalVisibleLogout] = useState(false);
  const [modalVisibleCancel, setModalVisibleCancel] = useState(false);

  const [modalVisibleRemark, setModalVisibleRemark] = useState(false);
  const [getRemark, setGetRemark] = useState("");
  const [BidResponse, setBidResponse] = useState("");
  const [updateBidModal, setUpdateBidModal] = useState(false);
  const [Dob, setDob] = useState("");
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  // const [date, setDate] = useState(new Date(2000, 1, 1));
  const [newdate, setNewdate] = useState("");
  // const [open, setOpen] = useState(false);

  const myDate = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + "-" + mm + "-" + dd;
    // console.log("Alert", today);
    return today;
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

  useEffect(() => {
    AuctionProfileApi();
    GetProfileApi();
  }, [props.route]);

  // ******************** Auction List ********************
  const AuctionProfileApi = async () => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");
    console.log(value);

    setLoaderAuctionProfile(true);
    axios({
      method: "get",
      url: ViewAuctionDetailsUrl,
      params: {
        auctionId: AuctionId,
      },
      headers: {
        token: value,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          console.log("====== Auctions Profile Response ======", response);
          setAuctionDetails(response?.data?.result);
          setLoaderAuctionProfile(false);
        } else {
          alert("Something went wrong.");
          setLoaderAuctionProfile(false);
        }
      })
      .catch((err) => {
        console.log("===== Auctions Profile err ======", err);
        setLoaderAuctionProfile(false);
        if(err.response.data.responseCode===440){
          Logout_(props)

        }
      });
  };

  // ******************** Buy Bid on Auctions ********************
  const BuyBidApi = async () => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");
    console.log(AuctionDetails?._id, value);

    setLoader(true);
    axios({
      method: "post",
      url: BuyAuctionApiUrl,
      data: {
        auctionId: AuctionDetails?._id,
      },
      headers: {
        token: value,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          console.log("====== Buy Bid Response ======", response);
          setBidResponse(response?.data?.result?.isBuy);
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
          setLoader(false);
        } else {
          alert("Something went wrong.");
          setLoader(false);
        }
      })
      .catch((err) => {
        setLoader(false);

        console.log("==== Collection List Catch error=====", err);
        if(err.response.data.responseCode===440){
          Logout_(props)

        }
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

      });
    setLoader(false);
  };

  // ******************** Accept Bid APi *****************
  const acceptBidApi = async () => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");
    let url = acceptBidApiUrl + `${AuctionDetails.bidId[0]._id}`;
    console.log(" url of accept bid", AuctionDetails.bidId[0]._id, value);
    setLoader(true);
    axios({
      method: "post",
      url: acceptBidApiUrl + `${AuctionDetails.bidId[0]._id}`,

      headers: {
        token: value,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          console.log("====== Accept  Bid Response ======", response);
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
      // .catch((err) => console.log("===== Accept Bid err ======", err));
      .catch((err) => {
        console.log("==== Accept Bid Catch error=====", err);
        setLoader(false);
        if(err.response.data.responseCode===440){
          Logout_(props)

        }
        if (err.response.data.responseCode === 404) {
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
        
      });
    setLoader(false);
  };

  // ********************* reject Bid api **********************
  const rejectBidApi = async () => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");
    let url = rejectBidApiUrl + `${AuctionDetails.bidId[0]._id}`;
    console.log(" url of reject bid", url);
    setLoader(true);
    axios({
      method: "put",
      url: rejectBidApiUrl + `${AuctionDetails.bidId[0]._id}`,
      headers: {
        token: value,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          console.log("====== reject  Bid Response ======", response);
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
      // .catch((err) => console.log("===== reject Bid err ======", err));
      .catch((err) => {
        console.log("==== Reject Bid Catch error=====", err);
        setLoader(false);
        if(err.response.data.responseCode===440){
          Logout_(props)

        }
        if (err.response.data.responseCode === 404) {
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
    setLoader(false);
  };

  //*************delet bid api *******************
  const deleteBidApi = async () => {
    console.log("delete api", AuctionDetails._id);
    const value = await AsyncStorage.getItem("token" || "socaltoken");
    let url = cancelAuctionApiUrl + `${AuctionDetails._id}`;
    console.log(" url of delete bid", url);
    setLoader(true);
    axios({
      method: "delete",
      url: cancelAuctionApiUrl + `${AuctionDetails._id}`,
      headers: {
        token: value,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          // AuctionProfileApi();
          console.log("====== delete  Bid Response ======", response);
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
          setLoader(false);
        } else {
          alert("Something went wrong.");
          setLoader(false);
        }
      })
      // .catch((err) => console.log("===== delete Bid err ======", err));
      .catch((err) => {
        console.log("==== Delete Bid Catch error=====", err);
        setLoader(false);
        if(err.response.data.responseCode===440){
          Logout_(props)

        }
        if (err.response.data.responseCode === 404) {
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
    setLoader(false);
  };
  // ******************* update Bid api **********************
  const updateBidApi = async () => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");

    let url = editBidApiUrl;

    const DATA = new FormData();
    DATA.append({
      auctionId: AuctionDetails._id,
      title: AuctionDetails.title,
      mediaUrl: AuctionDetails.mediaUrl,
      details: AuctionDetails.details,
      amount: amount,
      // time: moment(date).format(),
      time: "2022-07-30T18:52:00+05:30",
    });

    setLoader(true);
    axios({
      method: "put",
      url: editBidApiUrl,
      headers: {
        token: value,
      },
      data: DATA?._parts[0][0],
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          console.log("====== reject  Bid Response ======", response);

          setLoader(false);
          showMessage({
            message:response.data.responseMessage,
            type:'success',
            icon:'success',
            duration:3000
          })
          setModalVisibleLogout(false);
        } else {
          showMessage({
            message:response.data.responseMessage,
            type:'warning',
            icon:'warning',
            duration:3000
          })
          setLoader(false);
        }
      })
      // .catch((err) => console.log("===== reject Bid err ======", err));
      .catch((err) => {
        console.log("==== Delete Bid Catch error=====", err);
        setLoader(false);
        if(err.response.data.responseCode===440){
          Logout_(props)

        }
        if (err.response.data.responseCode === 404) {
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
          setModalVisibleLogout(!modalVisibleLogout);
          setLoader(false);
        } else {
          showMessage({
            message:"Something went wrong!",
            type:'warning',
            icon:'warning',
            duration:3000
          })
          setLoader(false);
        }
        setLoader(false);
      });
    setLoader(false);
  };

  // ******************** Create Bid on Auctions ********************
  const CreateBidApi = async () => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");
    let createBid = {
      auctionId: AuctionDetails._id,
      name: name,
      amountBid: amount,
      date: moment(date).format(),
    };
    setLoader(true);
    axios({
      method: "post",
      url: CreateBidonAuctionsUrl,
      data: createBid,
      headers: {
        token: value,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          console.log("====== Create Bid Response ======", response);
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
          setUpdateBidModal(false);
          setLoader(false);
        } else {
          showMessage({
            message:"Something went wrong!",
            type:'warning',
            icon:'warning',
            duration:3000
          })          
          setLoader(false);
        }
      })
      .catch((err) => {
        setLoader(false);
        if(err.response.data.responseCode===440){
          Logout_(props)

        }
      });
    setLoader(false);
  };

  // ******************** Like-Dislike Bid on Auctions ********************
  const LikeDislikeBidApi = async () => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");

    setLoader(true);
    axios({
      method: "get",
      url: LikeDislikeAuctionsUrl + `${AuctionDetails?._id}`,
      headers: {
        token: value,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          AuctionProfileApi();
          console.log("==== LikeDislike Bid Response ====", response);
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
          AuctionProfileApi();
          setLoader(false);
        } else {
          showMessage({
            message:response?.data?.responseMessage,
            type:'warning',
            icon:'warning',
            duration:3000
          })
          setLoader(false);
        }
      })
      .catch((err) => {
        setLoader(false);
        if(err.response.data.responseCode===440){
          Logout_(props)

        }
        setLoader(false);
      });
    setLoader(false);
  };

  // ************ Get Profile Api ************
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
          showMessage({
            message:response?.data?.responseMessage,
            type:'warning',
            icon:'warning',
            duration:3000
          })
          setLoader(false);
        }
      })
      .catch((err) => {
        setLoader(false);
        if(err.response.data.responseCode===440){
          Logout_(props)

        }
        console.log("===== Get Profile Catch Error ======", err);
        setLoader(false);
      });
    setLoader(false);
  };

  return (
    <SafeAreaView>
      <ScrollView>
      {/* ************ Header Container ************ */}
        <ProfileHeader
          Title={true}
          HeaderTitle="Auction Details"
          titleStyling={{ width: width * 0.7 }}
          HeaderTxtStyling={{ marginLeft: height * 0.04 }}
          BackIcon={true}
          onBackPress={() => props.navigation.goBack()}
          BackIconStyling={{ marginLeft: verticalScale(10) }}
          PostIcon={false}
          Menu={false}
          ShareIcon={false}
          // ShareClick={() => ShareMessage()}
        />
        {!loaderAuctionProfile ? (
          <View style={Styles.MainContainer}>
            {/* ************ Image Container ************ */}
            <View style={Styles.ImageContainer}>
              {AuctionDetails?.mediaUrl ? (
                <Image
                  source={{ uri: AuctionDetails?.mediaUrl }}
                  style={{ height: height * 0.42, width: width * 0.9 }}
                />
              ) : (
                <Image
                  source={ImagePath.COLLECTION_VIEW_IMG}
                  style={{ height: height * 0.42, width: width * 0.9 }}
                />
              )}
            </View>

            {/* ************ Profile Container ************ */}
            <View style={Styles.ProfileView}>
              <View style={Styles.PicNameContainer}>
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate("AboutCreator", {
                      nftId: AuctionDetails?.userId?._id,
                    })
                  }
                  style={Styles.ProfilePicContainer}
                >
                  {AuctionDetails?.userId?.profilePic ? (
                    <Image
                      source={{ uri: AuctionDetails?.userId?.profilePic }}
                      style={{ height: 45, width: 45, borderRadius: 45 / 2 }}
                    />
                  ) : (
                    <Image
                      source={ImagePath.PROFILE_PIC}
                      style={{ height: 45, width: 45, borderRadius: 45 / 2 }}
                    />
                  )}
                </TouchableOpacity>

                <View style={Styles.ProfileNameContainer}>
                  <Text numberOfLines={1} style={Styles.ProfileNameTxt}>
                    {AuctionDetails?.title}
                  </Text>
                  {/* <Text style={Styles.DurationTxt}>
                  {moment(AuctionDetails?.updatedAt).local().fromNow()}
                </Text> */}
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
                    {AuctionDetails?.likesCount}
                  </Text>
                </View>
              </View>

              <View style={Styles.DurationPrice}>
                <View style={[Styles.DurationContainer, { width: width * 0.5 }]}>
                  <Text style={Styles.DurationTxt}>Auctions Ends : </Text>
                  <Text style={Styles.DaysTxt}>
                    {moment(AuctionDetails?.time).local().fromNow()}
                  </Text>
                </View>
                <View
                  style={[
                    Styles.DurationContainer,
                    {
                      width: width * 0.42,
                      justifyContent: "center",
                    },
                  ]}
                >
                  <Text
                    style={[Styles.DurationTxt, { marginLeft: height * 0.042 }]}
                  >
                    Price:{" "}
                  </Text>
                  <Text style={Styles.DaysTxt}>
                    {AuctionDetails?.amount} SHARE
                  </Text>
                </View>
              </View>

              {/* ************ Description Container ************ */}
              <View style={Styles.DescriptionContainer}>
                <View style={Styles.DetailsTxtView}>
                  <Text style={Styles.DetailsTxt}>Descriptions :</Text>
                </View>
                <View style={Styles.DescriptionTxtView}>
                  <Text style={Styles.DesciptionTxt}>
                    {AuctionDetails?.details}
                  </Text>
                </View>
              </View>

              {/* ************ Button Container ************ */}
              {AuctionDetails &&
              AuctionDetails?.userId?._id !== userProfileDetails?._id ? (
                <View style={Styles.BtnContainer}>
                  <>
                    {AuctionDetails &&
                    AuctionDetails?.userId?._id !== userProfileDetails?._id ? (
                      <AppButton
                        title="Buy"
                        type="large"
                        textStyle={{
                          fontFamily: "Montserrat-Bold",
                          fontSize: height / 65,
                        }}
                        ButtonPress={() => setModalVisible(true)}
                        btnStyling={{
                          width: width * 0.25,
                          height: height * 0.06,
                        }}
                      />
                    ) : null}
                    {AuctionDetails &&
                    AuctionDetails?.userId?._id !== userProfileDetails?._id ? (
                      <AppButton
                        title="Bid"
                        type="large"
                        textStyle={{
                          fontFamily: "Montserrat-Bold",
                          fontSize: height / 65,
                        }}
                        ButtonPress={() => setUpdateBidModal(true)}
                        btnStyling={{
                          width: width * 0.25,
                          height: height * 0.06,
                        }}
                      />
                    ) : null}
                  </>
                </View>
              ) : null}

              {AuctionDetails &&
              AuctionDetails?.userId?._id === userProfileDetails?._id ? (
                <View style={Styles.BtnContainer}>
                  <>
                    {AuctionDetails &&
                    AuctionDetails?.userId?._id === userProfileDetails?._id ? (
                      <AppButton
                        title="Update"
                        type="large"
                        textStyle={{
                          fontFamily: "Montserrat-Bold",
                          fontSize: height / 65,
                        }}
                        ButtonPress={() => setModalVisibleLogout(true)}
                        btnStyling={{
                          width: width * 0.2,
                          height: height * 0.06,
                        }}
                      />
                    ) : null}

                    {AuctionDetails &&
                    AuctionDetails?.userId?._id === userProfileDetails?._id &&
                    AuctionDetails?.isSold === false ? (
                      <AppButton
                        title="Cancel"
                        type="large"
                        textStyle={{
                          fontFamily: "Montserrat-Bold",
                          fontSize: height / 65,
                        }}
                        // ButtonPress={() => deleteBidApi()}
                        ButtonPress={() =>
                          setModalVisibleCancel(!modalVisibleCancel)
                        }
                        btnStyling={{
                          width: width * 0.2,
                          height: height * 0.06,
                        }}
                      />
                    ) : null}

                    {AuctionDetails &&
                    AuctionDetails?.bidId &&
                    AuctionDetails?.bidId.length > 0 &&
                    AuctionDetails?.bidId[0].bidStatus !== "REJECTED" ? (
                      <AppButton
                        title="Reject"
                        type="large"
                        textStyle={{
                          fontFamily: "Montserrat-Bold",
                          fontSize: height / 65,
                        }}
                        ButtonPress={() => rejectBidApi()}
                        btnStyling={{
                          width: width * 0.2,
                          height: height * 0.06,
                        }}
                      />
                    ) : null}

                    {AuctionDetails?.bidId &&
                    AuctionDetails?.bidId.length > 0 &&
                    AuctionDetails?.bidId[0].bidStatus !== "ACCEPTED" ? (
                      <AppButton
                        title="Accept"
                        type="large"
                        textStyle={{
                          fontFamily: "Montserrat-Bold",
                          fontSize: height / 65,
                        }}
                        ButtonPress={() => acceptBidApi()}
                        btnStyling={{
                          width: width * 0.2,
                          height: height * 0.06,
                        }}
                      />
                    ) : null}
                  </>
                </View>
              ) : null}
            </View>
          </View>
        ) : (
          <CustomLoader
            loaderStyling={{ height: height * 0.85, width: width * 1 }}
          />
        )}

        {/* ******************** Update Bid Modal  ******************** */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisibleLogout}
          onRequestClose={() => {
            setModalVisibleLogout(!modalVisibleLogout);
          }}
        >
          <View style={Styles.LogoutmainContainer}>
            <View style={Styles.LogoutModalSubContainer}>
              <View style={Styles.LogoutHeadingContainer}>
                <View
                  style={{
                    height: height * 0.09,
                    justifyContent: "center",
                  }}
                >
                  <Text style={Styles.RemarkTxt}>{"Enter Bid Amount"}</Text>
                </View>

                {/* ********** Name Container ********** */}
                <View style={Styles.UpdateNameContainer}>
                  <View style={Styles.UpdateNameTxtView}>
                    <Text style={Styles.UpdateNameTxt}>Name:</Text>
                  </View>
                  <View style={Styles.UpdateTxtInput}>
                    <TextInput
                      style={Styles.RemarkInputModalContainer}
                      multiline={true}
                      keyboardType="default"
                      onChangeText={(tet) => setName(tet)}
                      placeholderTextColor={COLOR.WHITE}
                      value={name}
                    />
                  </View>
                </View>

                {/* ********** Amount Container ********** */}
                <View style={Styles.AmountAndInputContainer}>
                  <View style={Styles.AmountTxtContainer}>
                    <Text style={Styles.AmountTxt}>Amount:</Text>
                  </View>
                  <View style={Styles.InputContainer}>
                    <TextInput
                      style={Styles.RemarkInputModalContainer}
                      keyboardType="number-pad"
                      onChangeText={(tet) => setAmount(tet)}
                      placeholderTextColor={COLOR.WHITE}
                      value={amount}
                    />
                  </View>
                </View>

                {/* ********** Date Container ********** */}
                <View style={Styles.DateContainer}>
                  <View style={Styles.DateTxtContainer}>
                    <Text style={Styles.DateTxt}>Date:</Text>
                  </View>
                  <View style={[Styles.datainputd1]}>
                    <Text style={Styles.dateTxt}>{moment(date).format("L")}</Text>
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
                      mode="date"
                      minimumDate={new Date()}
                      textColor={COLOR.BLACK}
                    />
                    <TouchableOpacity
                      style={{ justifyContent: "center" }}
                      onPress={() => setOpen(true)}
                    >
                      <Image
                        source={ImagePath.CALENDER_IMG}
                        style={{
                          height: 23,
                          width: 23,
                          tintColor: COLOR.GREY,
                          left: -15,
                          // position: "absolute",
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* ********** Button Container ********** */}
                <View style={Styles.SubmitBtnCotainer}>
                  <TouchableOpacity
                    style={Styles.BidConfirmBtn}
                    onPress={() => updateBidApi()}
                  >
                    <Text style={Styles.SubmitBtnTxt}>Submit</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>

        {/* ************* Place Bid Modal ******************* */}
        <Modal visible={modalVisibleRemark} transparent={true}>
          <TouchableOpacity
            onPress={() => setModalVisibleRemark(false)}
            style={{
              height: height * 1,
              width: width * 1,
              backgroundColor: "rgba(0,0,0,0.4)",
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
              }}
            >
              <View style={Styles.RemarkModalContainer}>
                <View style={{ marginTop: 20 }}>
                  <Text style={Styles.RemarkTxt}>{"Enter Bid Amount"}</Text>
                </View>
                <View
                  style={{
                    alignSelf: "center",
                    marginVertical: 10,
                  }}
                >
                  <TextInput
                    style={Styles.RemarkInputModalContainer}
                    multiline={true}
                    keyboardType="number-pad"
                    onChangeText={(tet) => {
                      setGetRemark(tet);
                    }}
                    placeholderTextColor={COLOR.WHITE}
                    value={getRemark}
                  />
                </View>

                <View style={Styles.SubmitBtnCotainer}>
                  {getRemark === "" ? (
                    <TouchableOpacity
                      style={{
                        width: 100,
                        height: 50,
                        justifyContent: "center",
                        backgroundColor: COLOR.BUTTON_PINK,
                        marginTop: height * 0.035,
                        borderRadius: 8,
                      }}
                      disabled
                      onPress={() => {
                        setModalVisibleRemark(false);
                      }}
                    >
                      <Text style={Styles.SubmitBtnTxt}>Bid</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={{
                        width: 100,
                        height: 50,
                        justifyContent: "center",
                        backgroundColor: COLOR.BUTTON_PINK,
                        marginTop: height * 0.035,
                        borderRadius: 8,
                      }}
                      onPress={() => {
                        setModalVisibleRemark(false);
                      }}
                    >
                      <Text style={Styles.SubmitBtnTxt}>Bid</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>

        {/* ***************** Bid Create Button Modal ************************* */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={updateBidModal}
          onRequestClose={() => {
            setUpdateBidModal(!updateBidModal);
          }}
        >
          <View style={Styles.LogoutmainContainer}>
            <TouchableOpacity
              onPress={() => setUpdateBidModal(!updateBidModal)}
              style={{
                height: height * 0.26,
                backgroundColor: "rgba(0,0,0,0.7)",
              }}
            />
            <View style={Styles.LogoutModalSubContainer}>
              <View style={Styles.LogoutHeadingContainer}>
                <View style={{ marginTop: 20 }}>
                  <Text style={Styles.RemarkTxt}>{"Enter Bid Amount"}</Text>
                </View>
                {/* ******** Name Container ******** */}
                <View
                  style={{
                    alignSelf: "center",
                    marginVertical: 10,
                    flexDirection: "row",
                    height: height * 0.08,
                    width: width * 0.9,
                    alignItems: "center",
                    justifyContent: "space-evenly",
                  }}
                >
                  <View
                    style={{
                      height: height * 0.08,
                      width: width * 0.25,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: COLOR.WHITE,
                        fontSize: height / 42,
                        textAlign: "center",
                        fontFamily: "Montserrat-SemiBold",
                      }}
                    >
                      Name
                    </Text>
                  </View>
                  <View
                    style={{
                      height: height * 0.08,
                      width: width * 0.65,
                      justifyContent: "center",
                      alignItems: "flex-end",
                    }}
                  >
                    <TextInput
                      style={Styles.RemarkInputModalContainer}
                      multiline={true}
                      keyboardType="default"
                      onChangeText={(tet) => {
                        setName(tet);
                      }}
                      placeholderTextColor={COLOR.WHITE}
                      value={name}
                    />
                  </View>
                </View>

                {/* ******** Amount Container ******** */}
                <View
                  style={{
                    alignSelf: "center",
                    // marginVertical: 10,
                    flexDirection: "row",
                    alignItems: "center",
                    height: height * 0.08,
                    width: width * 0.9,
                    justifyContent: "space-evenly",
                  }}
                >
                  <View
                    style={{
                      height: height * 0.08,
                      width: width * 0.25,
                      alignItems: "center",
                      justifyContent: "center",
                      //  backgroundColor: "green",
                    }}
                  >
                    <Text
                      style={{
                        color: COLOR.WHITE,
                        fontSize: height / 45,
                        textAlign: "center",
                        fontFamily: "Montserrat-SemiBold",
                      }}
                    >
                      Amount
                    </Text>
                  </View>
                  <View
                    style={{
                      height: height * 0.08,
                      width: width * 0.65,
                      justifyContent: "center",
                      alignItems: "flex-end",
                      // backgroundColor: "red",
                    }}
                  >
                    <TextInput
                      style={Styles.RemarkInputModalContainer}
                      multiline={true}
                      keyboardType="number-pad"
                      onChangeText={(tet) => {
                        setAmount(tet);
                      }}
                      placeholderTextColor={COLOR.WHITE}
                      value={amount}
                    />
                  </View>
                </View>

                {/* ******** Date Container ******** */}
                <View
                  style={{
                    alignSelf: "center",
                    // marginVertical: 10,
                    flexDirection: "row",
                    alignItems: "center",
                    height: height * 0.1,
                    width: width * 0.9,
                    justifyContent: "space-evenly",
                  }}
                >
                  <View
                    style={{
                      height: height * 0.1,
                      width: width * 0.2,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: COLOR.WHITE,
                        fontSize: height / 45,
                        textAlign: "center",
                        fontFamily: "Montserrat-SemiBold",
                      }}
                    >
                      Date
                    </Text>
                  </View>
                  <View style={Styles.datainputd1}>
                    <Text style={Styles.dateTxt}>
                      {!newdate ? "Select date" : moment(date).format("L")}
                    </Text>
                    <DatePicker
                      modal
                      open={open}
                      date={date}
                      onConfirm={(date) => {
                        setOpen(false);
                        setDate(date);
                        setNewdate(date);
                      }}
                      onCancel={() => setOpen(false)}
                      mode="date"
                      textColor={COLOR.BLACK}
                      // maximumDate={new Date()}
                      minimumDate={new Date()}
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
                </View>

                {/* ******** Button Container ******** */}
                <View style={Styles.SubmitBtnCotainer}>
                  <TouchableOpacity
                    style={{
                      width: 110,
                      height: 40,
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: COLOR.BUTTON_PINK,
                      marginTop: height * 0.02,
                      borderRadius: 8,
                    }}
                    onPress={() => CreateBidApi()}
                  >
                    <Text style={Styles.SubmitBtnTxt}>
                      {loader ? <ActivityIndicator size="small" /> : "Submit"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => setUpdateBidModal(!updateBidModal)}
              style={{
                height: height * 0.26,
                backgroundColor: "rgba(0,0,0,0.7)",
              }}
            />
          </View>
        </Modal>

        {/* ************ Buy Confirmation Modal ************ */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={Styles.mainContainer}>
            <View style={Styles.ModalSubContainer}>
              <View style={Styles.HeadingContainer}>
                <View style={{ height: height * 0.07, justifyContent: "center" }}>
                  <Text
                    style={[
                      Styles.HeadingTxtContainer,
                      {
                        fontFamily: "Montserrat-Bold",
                        // fontSize: scale(18)
                        fontSize: height / 50,
                      },
                    ]}
                  >
                    Buy Auctions
                  </Text>
                </View>
                <View style={{ height: height * 0.08, justifyContent: "center" }}>
                  <Text
                    style={[
                      Styles.HeadingTxtContainer,
                      {
                        fontFamily: "Montserrat-Regular",
                        textAlign: "center",
                        fontSize: height / 50,
                      },
                    ]}
                  >
                    Are you sure, you want to Buy this Auction ?
                  </Text>
                  <Text
                    style={[
                      Styles.HeadingTxtContainer,
                      {
                        fontFamily: "Montserrat-Medium",
                        textAlign: "center",
                        marginVertical: 8,
                        fontSize: height / 56,
                      },
                    ]}
                  >
                    Amount to be paid : {AuctionDetails?.amount} SHARE
                  </Text>
                </View>

                <View style={Styles.ButtonMainContainer}>
                  <View style={Styles.btnContainer}>
                    <AppButton
                      title="Yes"
                      type="small"
                      textStyle={{
                        fontFamily: "Montserrat-SemiBold",
                        // fontSize: scale(14),
                        fontSize: height / 58,
                      }}
                      ButtonPress={() => {
                        BuyBidApi(), setModalVisible(!modalVisible);
                      }}
                    />
                  </View>
                  <View style={Styles.btnContainer}>
                    <AppButton
                      title="No"
                      type="small"
                      textStyle={{
                        fontFamily: "Montserrat-SemiBold",
                        // fontSize: scale(14),
                        fontSize: height / 58,
                      }}
                      ButtonPress={() => setModalVisible(!modalVisible)}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </Modal>

        {/* ************ Cancel Bid Confirmation Modal ************ */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisibleCancel}
          onRequestClose={() => {
            setModalVisibleCancel(!modalVisibleCancel);
          }}
        >
          <View style={Styles.CancelmainContainer}>
            <View style={Styles.CancelModalSubContainer}>
              <View style={Styles.CancelHeadingContainer}>
                <View style={{ height: height * 0.07, justifyContent: "center" }}>
                  <Text
                    style={[
                      Styles.CancelHeadingTxtContainer,
                      { fontFamily: "Montserrat-Medium", fontSize: height / 35 },
                    ]}
                  >
                    Cancel Bid!
                  </Text>
                </View>
                <View style={{ height: height * 0.08, justifyContent: "center" }}>
                  <Text
                    style={[
                      Styles.CancelHeadingTxtContainer,
                      { fontFamily: "Montserrat-Regular" },
                    ]}
                  >
                    Are you sure, you want to cancel
                  </Text>
                  <Text
                    style={[
                      Styles.CancelHeadingTxtContainer,
                      { fontFamily: "Montserrat-Regular", textAlign: "center" },
                    ]}
                  >
                    this bid ?
                  </Text>
                </View>

                <View style={Styles.CancelButtonMainContainer}>
                  <View style={Styles.CancelbtnContainer}>
                    <AppButton
                      title="Yes"
                      type="small"
                      textStyle={{
                        fontFamily: "Montserrat-SemiBold",
                        fontSize: height / 52,
                      }}
                      ButtonPress={() => deleteBidApi()}
                    />
                  </View>
                  <View style={Styles.CancelbtnContainer}>
                    <AppButton
                      title="No"
                      type="small"
                      textStyle={{
                        fontFamily: "Montserrat-SemiBold",
                        fontSize: height / 52,
                      }}
                      ButtonPress={() =>
                        setModalVisibleCancel(!modalVisibleCancel)
                      }
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AuctionsDetails;
