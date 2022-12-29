import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  SafeAreaView,
  Modal,
  TouchableOpacity,
  Platform,
} from "react-native";

import Styles from "./Styles";
import { ImagePath } from "../../constants/ImagePath";
import { scale, verticalScale } from "react-native-size-matters";
import AppButton from "../../components/CustomButton/CustomButton";
import ProfileHeader from "../../components/CustomHeader/ProfileHeader";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Progressdialog from "../../../Progressdialog";
import {
  BuyPostUrl,
  CollectionSubscriptionUrl,
  GetUserProfileUrl,
  NFTCollectionListUrl,
  UserLikeDislikePostUrl,
} from "../../restAPI/ApiConfig";
import moment from "moment";
import { showMessage } from "react-native-flash-message";
import CustomLoader from "../../components/CustomLoader/CustomLoader";
import { COLOR } from "../../Utils/Colors";
const { height, width } = Dimensions.get("window");

const ViewSubscription = (props) => {
  const [loader, setLoader] = useState(false);
  const [SubscribeUnsubscribe, setSubscribeUnsubscribe] = useState('')
  const [loaderCollectionDetails, setLoaderCollectionDetails] = useState(false);
  const [Id, setId] = useState(props?.route?.params?._id);
  const [CollectionDetails, setCollectionDetails] = useState({});

  const [PostId, setPostId] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [subscribestatus, setSubscribestatus] = useState("");
  const [userProfileDetails, setUserProfileDetails] = useState({});

  useEffect(() => {
    GetProfileApi();
    // ViewCollectionApi();
  }, [props.route]);

  const [iAgree, setIAgree] = useState(true);
  const toggleIAgree = () => {
    setIAgree(false);
    LikeAndDislikeApi();
  };

  const _toggleIAgree = () => {
    setIAgree(true);
    LikeAndDislikeApi();
  };

  // ************ Get Profile Api ************
  const GetProfileApi = async () => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");
    console.log(value);

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
          console.log("====== Get User Profile Response ======", response.data.result);
          setUserProfileDetails(response?.data?.result);
          ViewCollectionApi(response?.data?.result?._id)
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

  // ******************** View Post Profile Api Call ********************
  const ViewCollectionApi = async (identifier) => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");
    console.log(Id, value);

    setLoaderCollectionDetails(true);
    axios({
      method: "get",
      url: NFTCollectionListUrl + `${Id}`,
      headers: {
        token: value,
      },
    })
      .then(async (response) => {
        if (response.status === 200) {
          console.log("====== View Collection Response ======", response.data.result.subscriptionUsers);
          setCollectionDetails(response?.data?.result);
          setPostId(response?.data?.result?._id);
          if(response?.data?.result.subscriptionUsers.includes(identifier)){
            setSubscribeUnsubscribe('Subscribed')
          }
          else{
            setSubscribeUnsubscribe('Subscribe')
          }
          setLoaderCollectionDetails(false);
        } else {
          alert("Something went wrong.");
          setLoaderCollectionDetails(false);
        }
      })
      .catch((err) => {
        console.log("===== View Collection Error ======", err);
        setLoaderCollectionDetails(false);
      });
  };

  // ******************** Like-Dislike Api Call ********************
  const LikeAndDislikeApi = async () => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");

    setLoader(true);
    axios({
      method: "get",
      url: UserLikeDislikePostUrl + `${Id}`,
      headers: {
        token: value,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          console.log("====== Like Dislike Response ======", response);
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
          // alert(response?.data?.responseMessage);
          ViewPostApi();
          setLoader(false);
        } else {
          alert("Something went wrong.");
          setLoader(false);
        }
      })
      .catch((err) => console.log("===== Like Dislike err ======", err));
  };

  // ************ Subscription Collection Api ************
  const CollectionSubscriptionApi = async (id) => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");
    console.log(value);

    const DATA = new FormData();
    DATA.append({
      collectionId: CollectionDetails?._id,
    });

    setLoader(true);
    axios({
      method: "post",
      url: CollectionSubscriptionUrl,
      data: DATA?._parts[0][0],
      headers: {
        token: value,
      },
    })
      .then(async (response) => {
        setLoader(true)
        if (response.data.responseCode === 200) {
          console.log("=== Collection Subscribe ===", response);
          setSubscribestatus(response?.data?.result?.subscriptionStatus);
          GetProfileApi()
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
      .catch((err) => {
        console.log("===== Collection Subscribe Catch err ======", err.response);
        showMessage({
          message: err?.response?.data?.responseMessage?err?.response?.data?.responseMessage:'Something went wrong',
          type: "danger",
          icon: "danger",
          duration:2000
        })
        setLoader(false);
      });
      setLoader(true)
  };

  return (
    <SafeAreaView>
      {/* ************ Header Container ************ */}
      <ProfileHeader
        Title={false}
        BackIcon={true}
        onBackPress={() => props.navigation.goBack()}
        BackIconStyling={{ marginLeft: verticalScale(10) }}
        PostIcon={false}
        Menu={false}
        ShareIcon={false}
        ShareClick={() => ShareMessage()}
      />
      {loader && <Progressdialog  />}
      <ScrollView>
        {!loaderCollectionDetails ? (
          <View style={Styles.MainContainer}>
            {/* ************ Image Container ************ */}
            <View style={Styles.ImageContainer}>
              {CollectionDetails?.image ? (
                <Image
                  source={{ uri: CollectionDetails?.image }}
                  style={{ height: height * 0.413, width: width * 1 }} // New
                />
              ) : (
                <Image
                  source={ImagePath.COLLECTION_VIEW_IMG}
                  style={{ height: height * 0.413, width: width * 1 }} // New
                />
              )}
            </View>

            {/* ************ Profile Container ************ */}
            <View style={Styles.ProfileView}>
              <View style={Styles.PicNameContainer}>
                <View style={Styles.ProfilePicContainer}>
                  <TouchableOpacity
                    onPress={() =>
                      props.navigation.navigate("AboutCreator", {
                        nftId: CollectionDetails?.userId?._id,
                      })
                    }
                  >
                    {CollectionDetails?.userId?.profilePic ? (
                      <Image
                        source={{ uri: CollectionDetails?.userId?.profilePic }}
                        style={{ height: 45, width: 45, borderRadius: 45 / 2 }}
                      />
                    ) : (
                      <Image
                        source={ImagePath.PROFILE_PIC}
                        resizeMode="contain"
                        style={{ height: 45, width: 45 }}
                      />
                    )}
                  </TouchableOpacity>
                </View>

                <View style={Styles.ProfileNameContainer}>
                  <Text style={Styles.ProfileNameTxt}>
                    {CollectionDetails?.userId?.userName ||
                      CollectionDetails?.userId?.name}
                  </Text>
                  <Text style={Styles.ProfileDataTxtTwo}>
                    {/* {CollectionDetails?.postType} */}
                    {moment(CollectionDetails?.createdAt).local().fromNow()}
                  </Text>
                </View>
              </View>

              <View style={Styles.DurationPrice}>
                <View style={[Styles.DurationContainer]}>
                  <Text style={Styles.DurationTxt}>Collection Price: </Text>
                  <Text style={Styles.DaysTxt}>
                    {" "}
                    {CollectionDetails?.amount} SHARE
                  </Text>
                </View>

                <View style={[Styles.DurationContainer]}>
                  <Text style={Styles.DurationTxt}>Duration: </Text>
                  <Text style={Styles.DaysTxt}>
                    {" "}
                    {moment(CollectionDetails?.updatedAt).local().fromNow()}
                  </Text>
                </View>
              </View>

              <View style={[Styles.DurationContainer]}>
                <Text style={Styles.ProfileNameTxt}>{"Descriptions :"}</Text>
              </View>

              <View style={[Styles.DescriptionContainer]}>
                <Text numberOfLines={5} style={Styles.DescriptionTxt}>
                  {CollectionDetails?.description}
                </Text>
              </View>

              {/* ************ Button Container ************ */}
              <View style={Styles.BtnContainer}>
                {userProfileDetails._id ===CollectionDetails?.userId?._id ? null : (
                  <AppButton
                    title = {SubscribeUnsubscribe}
                    disabled = {SubscribeUnsubscribe == 'Subscribe' ? false : true}
                    type="large"
                    textStyle={{ fontFamily: "Montserrat-SemiBold" }}
                    ButtonPress={() => setModalVisible(true)}
                    btnStyling={{ backgroundColor: SubscribeUnsubscribe == 'Subscribe' ? COLOR.BUTTON_PINK : 'grey' }}
                  />
                )}
              </View>
            </View>
          </View>
        ) : (
          <CustomLoader
            loaderStyling={{ height: height * 0.85, width: width * 1 }}
          />
        )}
      </ScrollView>

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
                    { fontFamily: "Montserrat-Bold", fontSize: scale(18) },
                  ]}
                >
                  Subscribe Post
                </Text>
              </View>
              <View style={{ height: height * 0.08, justifyContent: "center" }}>
                <Text
                  style={[
                    Styles.HeadingTxtContainer,
                    { fontFamily: "Montserrat-Regular", textAlign: "center" },
                  ]}
                >
                  Are you sure, you want to subscribe this Post ?
                </Text>
                <Text
                  style={[
                    Styles.HeadingTxtContainer,
                    {
                      fontFamily: "Montserrat-Medium",
                      textAlign: "center",
                      marginVertical: 5,
                    },
                  ]}
                >
                  Amount to be paid : {CollectionDetails?.amount} SHARE
                </Text>
              </View>

              <View style={Styles.ButtonMainContainer}>
                <View style={Styles.btnContainer}>
                  <AppButton
                    title="Yes"
                    type="small"
                    textStyle={{
                      fontFamily: "Montserrat-SemiBold",
                      fontSize: height / 60,
                    }}
                    ButtonPress={() => {
                      CollectionSubscriptionApi(),
                        setModalVisible(!modalVisible);
                    }}
                  />
                  {/* )} */}
                </View>
                <View style={Styles.btnContainer}>
                  <AppButton
                    title="No"
                    type="small"
                    textStyle={{
                      fontFamily: "Montserrat-SemiBold",
                      fontSize: height / 60,
                    }}
                    ButtonPress={() => setModalVisible(!modalVisible)}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ViewSubscription;
