import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { COLOR } from "../../Utils/Colors";
import { ImagePath } from "../../constants/ImagePath";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProfileHeader from "../../components/CustomHeader/ProfileHeader";
import { verticalScale, scale, moderateScale } from "react-native-size-matters";
import {
  BoughtPostList,
  LikeDislikeSubscriptionUrl,
  ViewBoughtPostList,
} from "../../restAPI/ApiConfig";
import CustomLoader from "../../components/CustomLoader/CustomLoader";
import AppButton from "../../components/CustomButton/CustomButton";
const { height, width } = Dimensions.get("window");

const SubscriptionList = (props) => {
  console.log("==== Params =====", props.route.params);
  const [subscriptionId, setSubscriptionId] = useState(
    props.route.params.subscriptionId
  );
  const [loader, setLoader] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [BoughtPostData, setBoughtPostData] = useState([]);
  const [LikeDislike, setLikeDislike] = useState([]);

  useEffect(() => {
    CollectionSubsriptionListApi();
  }, [props.route]);

  // ************ Bought Subscription List Api ************
  const CollectionSubsriptionListApi = async () => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");
    console.log("====== my token======>>>>", value);

    setLoader(true);
    axios({
      method: "get",
      url: ViewBoughtPostList,
      params: {
        subscriptionId: subscriptionId,
      },
      headers: {
        token: value,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          console.log(
            "====== Bought Collection Response Data ======",
            response.data.result
          );
          setBoughtPostData(response?.data?.result);
          setLoader(false);
        } else {
          alert("Something went wrong.");
          setLoader(false);
        }
      })
      .catch((err) =>
        console.log("===== Bought Collection Catch Error ======", err)
      );
  };

  // ***** Like *****
  const [Like, setLike] = useState(true);
  const _toggleLike = () => {
    setLike(false);
    SubsriptionLikeDislikeApi();
  };
  const _toggleUnLike = () => {
    setLike(true);
    SubsriptionLikeDislikeApi();
  };

  // ************ Like-DisLike Subscription Api ************
  const SubsriptionLikeDislikeApi = async () => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");
    console.log("====== my token======>>>>", value);

    setLoader(true);
    axios({
      method: "get",
      // url: `https://node.bitfuxi.co.uk/api/v1/user/likeDislikeSubscription/${subscriptionId}`,
      url: LikeDislikeSubscriptionUrl + `${subscriptionId}`,
      headers: {
        token: value,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          console.log(
            "====== LikeDislike Subscription Response ======",
            response.data.result
          );
          alert(response.data.responseMessage);
          //   setLikeDislike(response?.data?.result);
          setLoader(false);
        } else {
          alert("Something went wrong.");
          setLoader(false);
        }
      })
      .catch((err) =>
        console.log("===== LikeDislike Subscription Catch Error ======", err)
      );
  };

  return (
    <SafeAreaView>
      {/* ************ Header Container ************ */}
      <ProfileHeader
        Title={true}
        HeaderTitle="Subscriptions"
        BackIcon={true}
        onBackPress={() => props.navigation.goBack()}
        BackIconStyling={{ marginLeft: verticalScale(10) }}
        PostIcon={false}
        Menu={false}
        ShareIcon={false}
      />
      <ScrollView>
        <View style={Styles.MainContainer}>
          {/* ************ Image Container ************ */}
          <View style={Styles.ImageContainer}>
            {BoughtPostData?.collectionId?.image ? (
              <Image
                source={{ uri: BoughtPostData?.collectionId?.image }}
                style={{ height: height * 0.42, width: width }}
              />
            ) : (
              <Image
                source={ImagePath.COLLECTION_VIEW_IMG}
                style={{ height: height * 0.42, width: width }}
              />
            )}
          </View>

          {/* ************ Profile Container ************ */}
          <View style={Styles.ProfileView}>
            <View style={Styles.PicNameContainer}>
              <View style={Styles.ProfilePicContainer}>
                <Image
                  source={ImagePath.COLLECTION_PROFILE}
                  resizeMode="contain"
                  style={{ height: 45, width: 45 }}
                />
              </View>

              <View style={Styles.ProfileNameContainer}>
                <Text style={Styles.ProfileNameTxt}>
                  {/* {BoughtPostData?.userId?.userName} */}
                  {BoughtPostData?.collectionId?.name}
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
                  {BoughtPostData?.collectionId?.likesCount}
                </Text>
              </View>
            </View>

            <View style={Styles.DurationPrice}>
              <View
                style={[
                  Styles.DurationContainer,
                  { marginLeft: verticalScale(70) },
                ]}
              >
                <Text style={Styles.DurationTxt}>Duration: </Text>
                <Text style={Styles.DaysTxt}>
                  {" "}
                  {BoughtPostData?.duration} Days
                </Text>
              </View>
              <View style={[Styles.DurationContainer, { width: width * 0.42 }]}>
                <Text style={Styles.DurationTxt}>Bundles Price: </Text>
                <Text style={Styles.DaysTxt}>
                  {" "}
                  {BoughtPostData?.amount} SHARE
                </Text>
              </View>
            </View>

            {/* ************ Description Container ************ */}
            <View style={Styles.DescriptionContainer}>
              <View style={Styles.DetailsTxtView}>
                <Text style={Styles.DetailsTxt}>
                  {BoughtPostData?.collectionId?.title}
                </Text>
              </View>
              <View style={Styles.DescriptionTxtView}>
                <Text style={Styles.DesciptionTxt}>
                  {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Tortor donec in dictumst luctus ipsum tempor. Id duis quisque
                  dolor vestibulum elit hendrerit ut lobortis. In tempus sapien
                  volutpat enim ac. Et sit quisque accumsan amet eget in
                  in.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Tortor donec in dictumst luctus ipsum tempor. Id duis quisque
                  dolor vestibulum elit hendrerit ut lobortis. In tempus sapien
                  volutpat enim ac. Et sit quisque accumsan amet eget in in. */}
                  {BoughtPostData?.collectionId?.description}
                </Text>
              </View>
            </View>

            {/* ************ Button Container ************ */}
            <View style={Styles.BtnContainer}>
              {BoughtPostData?.subscriptionStatus ? (
                <AppButton
                  title={BoughtPostData?.subscriptionStatus}
                  disabled
                  type="large"
                  textStyle={{ fontFamily: "Montserrat-Bold" }}
                  ButtonPress={() => {}}
                  btnStyling={{}}
                />
              ) : (
                <AppButton
                  title={BoughtPostData?.subscriptionStatus}
                  type="large"
                  textStyle={{ fontFamily: "Montserrat-Bold" }}
                  ButtonPress={() => {}}
                  btnStyling={{}}
                />
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SubscriptionList;

const Styles = StyleSheet.create({
  MainContainer: {
    height: height * 1.2,
    alignItems: "center",
    backgroundColor: COLOR.BACKGROUND_THEME,
  },
  MyBundleListContainer: {
    height: height * 0.476, //0.63
    width: width * 1,
    // backgroundColor: "red",
    alignItems: "center",
  },
  flatlistcontainer: {
    height: height * 0.29,
    width: width * 0.44,
    backgroundColor: COLOR.PROFILE_CARD,
    margin: 6,
    borderRadius: 10, // margin : 5
  },
  profileimageview: {
    height: height * 0.19, // 0.15
    width: width * 0.4,
    alignSelf: "center",
    borderRadius: 5,
  },
  Nftimg: {
    height: height * 0.18,
    width: width * 0.4,
    marginTop: height * 0.01,
    borderRadius: 5,
  },
  flatlistmidcontainer: {
    height: height * 0.04,
    width: width * 0.4,
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: verticalScale(5),
  },
  profilenameview: {
    height: height * 0.04,
    width: width * 0.4, // 0.27
    // justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  usernameTxt: {
    // fontSize: scale(10),
    fontSize: height / 60,
    color: "#FFFF",
    fontFamily: "Montserrat-Bold",
    marginLeft: moderateScale(5),
    // alignSelf: "flex-start",
  },
  flatlistmiddleview: {
    height: height * 0.05,
    width: width * 0.4,
    alignSelf: "center",
    justifyContent: "space-evenly",
  },
  collectioview: {
    height: height * 0.024,
    width: width * 0.4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ethTxt: {
    color: "#FFFF",
    // fontSize: scale(10),
    fontSize: height / 60,
    fontFamily: "Montserrat-Regular",
  },
  // =======
  headerView: {
    marginTop: height * 0.02,
    flexDirection: "row",
    height: height * 0.08,
    width: width * 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  ImageContainer: {
    height: height * 0.42,
    width: width * 1,
    justifyContent: "center",
    // marginTop: verticalScale(48),
    backgroundColor: "green",
  },
  ProfileView: {
    height: height * 0.1,
    width: width * 1,
    marginTop: verticalScale(26),
    alignItems: "center",
  },
  PicNameContainer: {
    height: height * 0.08,
    width: width * 0.94,
    flexDirection: "row",
    alignItems: "center",
  },
  ProfilePicContainer: {
    height: height * 0.08,
    width: width * 0.16,
  },
  ProfileNameContainer: {
    height: height * 0.08,
    width: width * 0.65, // 0.78
    // backgroundColor: "red",
  },
  ProfileNameTxt: {
    color: COLOR.WHITE,
    fontSize: height / 47,
    fontFamily: "Montserrat-SemiBold",
    marginTop: verticalScale(3),
  },
  LikesCountContainer: {
    height: height * 0.07,
    width: width * 0.13,
    // backgroundColor: "red",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  LikesAmountTxt: {
    color: COLOR.WHITE,
    fontSize: height / 75,
    fontFamily: "Montserrat-Regular",
    marginTop: verticalScale(3),
  },
  DurationPrice: {
    height: height * 0.02,
    width: width * 1,
    flexDirection: "row",
    marginTop: -verticalScale(10),
  },
  DurationContainer: {
    height: height * 0.02,
    width: width * 0.35,
    flexDirection: "row",
  },
  DurationTxt: {
    color: "#979797",
    fontSize: height / 75,
    fontFamily: "Montserrat-Regular",
  },
  DaysTxt: {
    color: COLOR.WHITE,
    fontSize: height / 75,
    fontFamily: "Montserrat-SemiBold",
  },
  DescriptionContainer: {
    // height: height * 0.25, // 0.25
    width: width * 1,
    alignItems: "center",
  },
  DetailsTxtView: {
    height: height * 0.045,
    width: width * 1,
    justifyContent: "flex-end",
  },
  DetailsTxt: {
    color: COLOR.WHITE,
    fontSize: height / 45,
    fontFamily: "Montserrat-Medium",
    marginLeft: verticalScale(15),
  },
  DescriptionTxtView: {
    // height: height * 0.3, // 0.3
    width: width * 1,
    marginTop: verticalScale(8),
  },
  DesciptionTxt: {
    color: COLOR.WHITE,
    fontSize: height / 73,
    fontFamily: "Montserrat-Regular",
    marginLeft: verticalScale(15),
  },
  BtnContainer: {
    height: height * 0.2, // 0.13
    width: width * 0.9,
    justifyContent: "flex-end",
  },
});
