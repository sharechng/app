import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Alert,
  Platform,
} from "react-native";

import Styles from "./Styles";
import { ImagePath } from "../../constants/ImagePath";
import { COLOR } from "../../Utils/Colors";
import { moderateScale, verticalScale } from "react-native-size-matters";
import ProfileHeader from "../../components/CustomHeader/ProfileHeader";
import AppButton from "../../components/CustomButton/CustomButton";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  FollowUnFollowUserUrl,
  GetFollowerListUrl,
  GetFollowingListUrl,
  GetUserProfileUrl,
  RemoveFollowerUrl,
} from "../../restAPI/ApiConfig";
import { showMessage } from "react-native-flash-message";
import CustomLoader from "../../components/CustomLoader/CustomLoader";
import Progressdialog from "../../../Progressdialog";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons"

const { height, width } = Dimensions.get("window");

const FolloerFollowing = (props) => {
  // console.log(
  //   "===== Following and Followers Screen Params =====",
  //   props?.route?.params?.isFollowing
  // );
  const FollowingTab = props?.route?.params?.isFollowing;
  const [loader, setLoader] = useState(false);
  const [loaderFollower, setLoaderFollower] = useState(false);
  const [loaderUnFollow, setLoaderUnFollow] = useState(false);

  const [followerList, setFollowerList] = useState([]);
  const [followerId, setFollowerId] = useState();
  const [followerCount, setFollowerCount] = useState();

  const [followingList, setFollowingList] = useState([]);
  const [followingId, setFollowingId] = useState([]);
  const [followingCount, setFollowingCount] = useState();

  const [selectedString, setSelectedString] = useState("Followers");
  const [userProfileDetails, setUserProfileDetails] = useState({});
  const [isFetchingFollower, setIsFetchingFollower] = useState(false);
  const [isFetchingFollowing, setIsFetchingFollowing] = useState(false);
  const [isFetchingUserProfile, setIsFetchingUserProfile] = useState(false);
  const [followingids, setFollowingids] = useState([]);

  useEffect(() => {
    FollowingListApi();
    GetProfileApi();
    FollowrListApi();
  }, [props.route]);

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

  // ************ Get Profile Api ************
  const FollowrListApi = async () => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");

    setLoader(true);
    setIsFetchingUserProfile(true);
    axios({
      method: "get",
      url: GetFollowerListUrl,
      headers: {
        token: value,
      },
    })
      .then(async (response) => {
        setIsFetchingUserProfile(false);
        if (response.data.responseCode === 200) {
          setFollowerList(response?.data?.result?.followers);
          setFollowerCount(response?.data?.result?.count);
          setLoader(false);
        } else {
          alert("Something went wrong.");
          setLoader(false);
        }
      })
      .catch((err) => {
        setIsFetchingUserProfile(false);
        console.log("===== Get Follower List Catch Error ======", err);
        setLoader(false);
      });
  };

  // ************ Following List Api ************
  const FollowingListApi = async () => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");

    setLoader(true);
    setIsFetchingUserProfile(true);
    axios({
      method: "get",
      url: GetFollowingListUrl,
      headers: {
        token: value,
      },
    })
      .then(async (response) => {
        setIsFetchingUserProfile(false);
        if (response.data.responseCode === 200) {
          setFollowingList(response?.data?.result?.following);
          setFollowingCount(response?.data?.result?.count);
          const temp = []
          response.data.result.following.map((item) => {
            temp.push(item._id);

          })
          setFollowingids(temp);
          setLoader(false);
        } else {
          alert("Something went wrong.");
          setLoader(false);
        }
      })
      .catch((err) => {
        setIsFetchingUserProfile(false);
        console.log("===== Get Following List Catch Error ======", err)
      }
      );
  };

  // ************ Follow-UnFollow Api ************
  const FollowUnFollowApi = async (id) => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");
    console.log("---- Follow UnFollow Id ----", followerId);

    setIsFetchingUserProfile(true);
    axios({
      method: "get",
      url: FollowUnFollowUserUrl + `${id}`,
      headers: {
        token: value,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          FollowingListApi();
          FollowrListApi();
          // FollowrListApi();
          if (followingids.includes(id)) {
            setFollowingids(followingids.filter(item => item !== id));
          }
          console.log("====== Get Followeing List Response ======", response);
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
          // FollowrListApi();
          setIsFetchingUserProfile(false);
        } else {
          alert("Something went wrong.");
          setIsFetchingUserProfile(false);
        }
      })
      .catch((err) => {
        console.log("===== Get Following List Catch Error ======", err);
        setIsFetchingUserProfile(false);
      });
  };

  // ************ Follow-UnFollow Api ************
  const RemoveFollowerApi = async (id) => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");
    console.log(id, value);

    setIsFetchingUserProfile(true);
    axios({
      method: "get",
      url: RemoveFollowerUrl + `${id}`,
      headers: {
        token: value,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          FollowingListApi();
          FollowrListApi();
          console.log("====== Get Followeing List Response ======", response);
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
          setIsFetchingUserProfile(false);
        } else {
          alert("Something went wrong.");
          setIsFetchingUserProfile(false);
        }
      })
      .catch((err) => {
        console.log("===== Get Following List Catch Error ======", err);
        setIsFetchingUserProfile(false);
      });
  };

  // ************ Remove from Following Api ************
  const RemoveFollowingApi = async (id) => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");
    console.log(id, value);

    setIsFetchingUserProfile(true);
    axios({
      method: "get",
      url: FollowUnFollowUserUrl + `${id}`,
      headers: {
        token: value,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          FollowingListApi();
          FollowrListApi();
          console.log("====== Remove from Following List ======", response);
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

          setIsFetchingUserProfile(false);
        } else {
          alert("Something went wrong.");
          setIsFetchingUserProfile(false);
        }
      })
      .catch((err) => {
        console.log("===== Remove from Following List Catch Error ======", err);
        setIsFetchingUserProfile(false);
      });
  };

  // ***** Follower FlatList Render *****
  const FollowerListRenderItem = ({ item, index }) => {
    return (
      <View style={Styles.ListContainers}>
        <View style={Styles.ProfileImgContainers}>
          {item?.profilePic ? (
            <Image
              source={{ uri: item?.profilePic }}
              style={{ height: 40, width: 40, borderRadius: 40 / 2 }}
            />
          ) : (
            <Image
              source={ImagePath.PROFILE_PIC}
              style={{ height: 40, width: 40 }}
            />
          )}
        </View>

        <View style={Styles.ProfileNameContainers}>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate("AboutCreator", { nftId: item?._id })
            }
          >
            <Text style={Styles.ProfileNameTxt}>
              {item?.userName || item?.name}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={Styles.FollowBtnContainers}>
          <TouchableOpacity onPress={() => FollowUnFollowApi(item?._id)}>
            <Text style={Styles.FollowBtnTxt}>{followingids.includes(item._id) ? "Unfollow" : "Follow"}</Text>
          </TouchableOpacity>
        </View>

        <View style={Styles.RemoveBtnContainers}>
          <AppButton
            title={"Remove"}
            type="small"
            ButtonPress={() => RemoveFollowerApi(item?._id)}
            textStyle={{
              color: "#888888",
              fontSize: height / 55,
              fontFamily: "Montserrat-SemiBold",
            }}
            btnStyling={{
              backgroundColor: "#101010",
              borderWidth: 1,
              borderColor: COLOR.WHITE,
            }}
          />
        </View>
      </View>
    );
  };

  // ************** FlatList Refreshing Functions **************
  function _handleRefresh() {
    setIsFetchingFollower(false);
    FollowrListApi();
  }
  function _handleRefreshFollowing() {
    FollowingListApi();
    setIsFetchingFollowing(false);
  }

  // ***** Following FlatList Render *****
  const FollowingListRenderItem = ({ item }) => {
    return (
      <View style={Styles.ListContainers}>
        <View style={Styles.ProfileImgContainers}>
          {item?.profilePic ? (
            <Image
              source={{ uri: item?.profilePic }}
              style={{ height: 40, width: 40, borderRadius: 40 / 2 }}
            />
          ) : (
            <Image
              source={ImagePath.PROFILE_PIC}
              style={{ height: 40, width: 40 }}
            />
          )}
        </View>

        <View style={[Styles.ProfileNameContainers, { width: width * 0.5 }]}>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate("AboutCreator", { nftId: item?._id })
            }
          >
            <Text style={Styles.ProfileNameTxt}>
              {item?.userName || item?.name}
            </Text>
          </TouchableOpacity>
          <Text style={Styles.ProfileNickNameTxt}>
            @{item?.userName || item?.name}
          </Text>
        </View>

        <View style={Styles.RemoveBtnContainers}>
          <AppButton
            title={"Remove"}
            type="small"
            ButtonPress={() => RemoveFollowingApi(item?._id)}
            textStyle={{
              color: "#888888",
              fontSize: height / 68,
              fontFamily: "Montserrat-SemiBold",
            }}
            btnStyling={{
              backgroundColor: "#101010",
              borderWidth: 1,
              borderColor: COLOR.WHITE,
            }}
          />
        </View>
        <View style={{marginHorizontal:15}}>
          <TouchableOpacity>
            <SimpleLineIcons name={'options-vertical'} size={12} color={'white'} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView>
      {
        isFetchingUserProfile && <Progressdialog />
      }
      <ProfileHeader
        BackIcon={true}
        Title={true}
        HeaderTitle={userProfileDetails?.userName || userProfileDetails?.name}
        // titleStyling={{ width: width * 0.75, alignItems: "center" }}
        titleStyling={{ width: width * 0.7 }}
        HeaderTxtStyling={{ marginLeft: height * 0.04 }}
        onBackPress={() => props.navigation.goBack()}
        BackIconStyling={{ marginLeft: verticalScale(10) }}
        PostIcon={false}
        Menu={false}
        ShareIcon={false}
      />
      <View style={Styles.MainContainer}>
        {/* ************ Follower and Following Tabs Container ************ */}
        <View style={Styles.DetailsAndItemActivityContainer}>
          <TouchableOpacity
            onPress={() => {
              setSelectedString("Followers"), FollowrListApi();
            }}
          >
            <View
              style={[
                Styles.DetailsTabContainer,
                {
                  borderBottomWidth: selectedString === "Followers" ? 3 : 0,
                  borderBottomColor:
                    selectedString === "Followers" ? COLOR.BUTTON_PINK : null,
                },
              ]}
            >
              <Text
                style={{
                  color:
                    selectedString === "Followers"
                      ? COLOR.BUTTON_PINK
                      : COLOR.WHITE,
                  fontSize: height / 65,
                  fontFamily: "Montserrat-Bold",
                }}
              >
                {followerCount} follower
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setSelectedString("Following"), FollowingListApi();
            }}
          >
            <View
              style={[
                Styles.DetailsTabContainer,
                {
                  borderBottomWidth: selectedString === "Following" ? 3 : 0,

                  borderBottomColor:
                    selectedString === "Following" ? COLOR.BUTTON_PINK : null,
                },
              ]}
            >
              <Text
                style={{
                  color:
                    selectedString === "Following"
                      ? COLOR.BUTTON_PINK
                      : COLOR.WHITE,
                  fontSize: height / 65,
                  fontFamily: "Montserrat-Bold",
                }}
              >
                {followingCount} following
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* ************* Tab Details Container ************ */}
        {selectedString === "Followers" ? (
          <View style={Styles.StoryBoardContainer}>
            {!loaderFollower ? (
              followerList.length > 0 ? (
                <FlatList
                  style={{ marginBottom: verticalScale(15) }}
                  data={followerList}
                  renderItem={FollowerListRenderItem}
                  keyExtractor={(item) => item.id}
                  refreshing={isFetchingFollower}
                  onRefresh={_handleRefresh}
                />
              ) : (
                <View style={Styles.NoDataTxtContainer}>
                  <Text style={Styles.NoDataTxt}>No Data Found...</Text>
                </View>
              )
            ) : (
              <CustomLoader />
            )}
          </View>
        ) : (
          <View style={[Styles.StoryBoardContainer]}>
            {!loader ? (
              followingList.length > 0 ? (
                <FlatList
                  style={{ marginBottom: verticalScale(15) }}
                  data={followingList}
                  renderItem={FollowingListRenderItem}
                  keyExtractor={(item) => item.id}
                  refreshing={isFetchingFollowing}
                  onRefresh={_handleRefreshFollowing}
                />
              ) : (
                <View style={Styles.NoDataTxtContainer}>
                  <Text style={Styles.NoDataTxt}>No Data Found...</Text>
                </View>
              )
            ) : (
              <CustomLoader />
            )}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default FolloerFollowing;
