import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  ActivityIndicator
} from "react-native";

import { ImagePath } from "../../constants/ImagePath";
import { COLOR } from "../../Utils/Colors";
import CustomHeader from "../../components/CustomHeader/CustomHeader";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  CreatorsList,
  FollowUnFollowUserUrl,
  GetUserProfileUrl,
} from "../../restAPI/ApiConfig";
import { showMessage } from "react-native-flash-message";
import CustomLoader from "../../components/CustomLoader/CustomLoader";
const { height, width } = Dimensions.get("window");

const Creators = (props) => {
  const [loader, setLoader] = useState(false);
  // const [showActivityIndicatorFollow, setshowActivityIndicatorFollow] = useState([])
  const [CreatorListing, setCreatorListing] = useState([]);
  const [follower, setFollower] = useState([]);
  const [FollowUnFollow, setFollowUnFollow] = useState({});
  const [isFetching, setIsFetching] = useState(false);
  const [userProfileDetails, setUserProfileDetails] = useState({});
  const [isFollowing, setisFollowing] = useState("");

  useEffect(() => {
    // CreatorListApi();
    GetProfileApi();
  }, [props.route]);

  // ******************* Creator List Api Call *******************
  const CreatorListApi = async (identifier) => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");

    setLoader(true);
    axios({
      method: "get",
      url: CreatorsList,
      params: {
        limit: 500,
      },
      headers: {
        token: value,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          console.log(
            "====== Creator List Api Response ======",
            response?.data?.result?.docs
          );
          setCreatorListing(response?.data?.result?.docs);
          response?.data?.result?.docs.filter((item, index)=>{
            if(item.followers.includes(identifier)){
              follower[index] = true;
            }
            else{
              follower[index] = false;
            }
          })
          setLoader(false);
        } else {
          alert("Something went wrong.");
          setLoader(false);
        }
      })
      .catch((err) => console.log("===== Creator List Api err ======", err));
  };

  // ******************* Follow Creator Api Call *******************
  const FollowUserApi = async (id, index) => {
    follower[index] = !follower[index]
    const value = await AsyncStorage.getItem("token" || "socaltoken");

    setLoader(true);
    axios({
      method: "get",
      url: FollowUnFollowUserUrl + `${id}`,
      headers: {
        token: value,
      },
    })
      .then(async (response) => {
    
        if (response?.data?.responseCode === 200) {
          console.log("====== Follow UnFollow Response ======", response);
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
          setFollowUnFollow(response?.data?.result);
          setLoader(false);
          // CreatorListApi();
        } else {
          alert("Something went wrong.");
          // CreatorListApi();
          setLoader(false);
        }
      })
      .catch((err) => {
    
        console.log("===== Follow UnFollow err ======", err);
        setLoader(false);
      });
  };

  function _handleRefreshCreatorList() {
    setIsFetching(false);
    GetProfileApi();
  }

  // *********** Get Profile Api ***********
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
          console.log("====== Get User Profile Response ======", response);
          setUserProfileDetails(response?.data?.result);
          CreatorListApi(response?.data?.result._id)
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

  // ***** Follow-UnFollow *****
  // useEffect(() => {
  //   if (CreatorListing && userProfileDetails) {
  //     let mydata = CreatorListing.filter((item, index) => {
  //       if (item.followers.includes(userProfileDetails._id)) {
  //         follower[index] = true;
  //       } else {
  //         follower[index] = false;
  //       }
  //     });
  //   }
  // }, [CreatorListing, userProfileDetails]);

  const renderItem = (item, index) => {
    return (
      <View style={styles.flatlistContainer}>
        <View style={styles.hederBar}>
          <Text numberOfLines={1} style={styles.titleTxt}>
            {item?.item?.userName || item?.item?.name}
          </Text>
        </View>
        {item?.item?.profilePic ? (
          <Image
            source={{ uri: item?.item?.profilePic }}
            style={{
              height: 100,
              width: 100,
              borderRadius: 100 / 2,
              marginTop: height * 0.02,
            }}
            // style={styles.itemImg}
            
          />
        ) : (
          <Image
            source={ImagePath.PROFILE_PIC}
            style={{
              height: 100,
              width: 100,
              borderRadius: 100 / 2,
              marginTop: height * 0.02,
            }}
            resizeMode="contain"
          />
        )}

        <View style={styles.bidView}>
          <Text style={styles.bidTxt}>Earning : </Text>
          <Text style={styles.bidnumTxt}>{item?.item?.massBalance}</Text>
        </View>
        <View style={styles.auctionView}>
          <Text style={styles.auctionTxt}>Subscriber Count : </Text>
          <Text style={styles.timeTxt}>
            {item?.item?.subscriberCount ? item?.item?.subscriberCount : "0"}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            width: width * 0.42,
          }}
        >
          <TouchableOpacity
            style={[styles.viewBtn,{backgroundColor: follower[item.index] ? '#636363' : COLOR.BUTTON_PINK,}]}
            onPress={() => {FollowUserApi(item?.item?._id, item.index) }}
          >
            <Text style={styles.viewTxt}>
              {follower[item.index] ? "Unfollow" : "Follow"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.viewBtn,{backgroundColor: COLOR.BUTTON_PINK,}]}
            onPress={() =>
              props.navigation.navigate("AboutCreator", {
                CreatorId: item?.item,
              })
            }
          >
            <Text style={styles.viewTxt}>View</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView>
      <View style={styles.MainContainer}>
        {/* *********** Header Container *********** */}
        <CustomHeader
          MenuIcon={false}
          pageTitle={true}
          title="Creators"
          onBackPress={() => props.navigation.goBack()}
          searchIcon={true} // Chats
          onSearchPress={() => props.navigation.navigate("ChatList")}
          comments={true} // Notification
          onCommentsPress={() => props.navigation.navigate("Notifications")}
          notificationIcon={false}
          WalletIcon={false} // Upload
          WalletIcons={true} // Wallet
          onWalletClick={() => props.navigation.navigate("Wallet")}
        />

        <View style={styles.ListContainer}>
          {CreatorListing.length > 0 ? (
            <FlatList
              data={CreatorListing}
              renderItem={renderItem}
              numColumns={2}
              refreshing={isFetching}
              onRefresh={_handleRefreshCreatorList}
            />
          ) : (
            <CustomLoader
              loaderStyling={{ height: height * 0.9, width: width * 1 }}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Creators;

const styles = StyleSheet.create({
  MainContainer: {
    height: height * 1.25,
    width: width * 1,
    // backgroundColor: COLOR.BACKGROUND_THEME,
    backgroundColor: COLOR.BLACK,
  },

  bidView: {
    marginTop: height * 0.03,
    // height: height * 0.02,
    width: width * 0.42,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bidTxt: {
    fontSize: height / 80,
    color: COLOR.WHITE,
  },
  likeView: {
    height: height * 0.02,
    width: width * 0.1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  viewTxt: {
    fontSize: height / 62,
    fontFamily: "Montserrat-SemiBold",
    color: COLOR.WHITE,
  },
  timeTxt: {
    fontSize: height / 80,
    color: COLOR.WHITE,
    fontFamily: "Montserrat-Regular",
  },
  viewBtn: {
    borderRadius: height * 0.0075,
    height: height * 0.035,
    width: width * 0.16, // 0.22
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    marginTop: height * 0.015,
  },
  auctionView: {
    marginTop: height * 0.005,
    // height: height * 0.02,
    width: width * 0.42,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bidnumTxt: {
    fontSize: height / 80,
    color: COLOR.WHITE,
    fontFamily: "Montserrat-Regular",
  },
  auctionTxt: {
    fontSize: height / 80,
    color: COLOR.WHITE,
    fontFamily: "Montserrat-Regular",
  },
  flatlistContainer: {
    // backgroundColor: COLOR.TXT_INPT_COLOR,
    backgroundColor: "rgba(26, 26, 26, 1)", // New 25 June
    // paddingVertical:10,
    // height: height * 0.33, // 0.35
    width: width * 0.45,
    margin: height * 0.01,
    alignItems: "center",
    borderRadius: height * 0.01,
    paddingBottom:10
  },
  likeImg: {
    height: height * 0.022,
    width: width * 0.043,
  },
  likeTxt: {
    fontSize: height / 70,
    color: COLOR.TXT_COLOR,
    fontFamily: "Montserrat-Regular",
  },
  hederBar: {
    width: width * 0.41,
    marginTop: height * 0.01,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  elipseView: {
    height: height * 0.02,
    width: width * 0.1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  elipseTwoImg: {
    height: height * 0.02,
    width: width * 0.04,
  },
  elipseImg: {
    height: height * 0.02,
    width: width * 0.04,
  },
  optionImg: {
    height: height * 0.015,
    width: width * 0.04,
  },
  itemImg: {
    borderRadius: height * 0.01,
    height: height * 0.15,
    width: width * 0.42,
    marginTop: height * 0.01,
  },
  titleView: {
    marginTop: height * 0.006,
    height: height * 0.03,
    width: width * 0.42,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleTxt: {
    fontSize: height / 65,
    color: COLOR.WHITE,
    fontFamily: "Montserrat-Medium",
  },
  ListContainer: {
    height: Platform.OS === "android" ? height * 0.915 : height * 0.825,
    width: width * 1,
    alignItems: "center",
  },
});
