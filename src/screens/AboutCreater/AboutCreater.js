import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
  RefreshControl,
  SafeAreaView,
  Clipboard,
  Platform,
} from "react-native";
import { ImagePath } from "../../constants/ImagePath";
import { COLOR } from "../../Utils/Colors";
import ProfileHeader from "../../components/CustomHeader/ProfileHeader";
import { verticalScale } from "react-native-size-matters";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  BlockUnBlockUrl,
  CreatorCollectionApiUrl,
  CreatorPostApiUrl,
  FollowUnFollowUserUrl,
  GetOtherUserProfile,
  GetUserProfileUrl,
} from "../../restAPI/ApiConfig";
import { showMessage } from "react-native-flash-message";
import CustomLoader from "../../components/CustomLoader/CustomLoader";
const { height, width } = Dimensions.get("window");
import moment from "moment";
import Progressdialog from "../../../Progressdialog";
import { Logout_ } from "../../../Logout";

const AboutCreator = (props, navigation) => {
  const [loader, setLoader] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const[profileloader,setprofilloader]=React.useState(false)
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(500).then(() => {
      CreatorProfileApi(),
        CreatorCollectionApi(),
        CreatorPostApi(),
        GetProfileApi(), 
        setRefreshing(false);
    });
  }, []);

  const [CreatorId, setCreatorId] = useState(
    props?.route?.params?.CreatorId?._id || props?.route?.params?.nftId
  );
  const CreatoDeratails = props?.route?.params?.CreatorId;
  const [CreatorProfileDetails, setCreatorProfileDetails] = useState({});
  const [selectedString, setSelectedString] = useState("Collection");
  const [isFetchingCreatorCollection, setIsFetchingCreatorCollectio] =
    useState(false);
  const [isFetchingCreatorPost, setIsFetchingCreatorPost] = useState(false);
  const [CreatorCollectionList, setCreatorCollectionList] = useState([]);
  const [CreatorPostList, setCreatorPostList] = useState([]);
  const [followUnFollow, setFollowUnFollow] = useState({});

  const [userProfileDetails, setUserProfileDetails] = useState({});
  const [isFollowing, setisFollowing] = useState("");
  const [isBlock, setIsBlock] = useState("");
  const [blockedUserList, setBlockedUserList] = useState("");
  const [followUserList, setFollowUserList] = useState("");
  const [ParticularCreatorId, setParticularCreatorId] = useState("");

  const [copiedText, setCopiedText] = useState("");
  const [usertoken,setusertoken] = useState("");
  const copyToClipboard = () => {
    // Alert.alert(userProfileDetails?.bnbAccount?.address);
    Clipboard.setString(copiedText || userProfileDetails?.bnbAccount?.address);
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
  };

  useEffect(() => {
    GetProfileApi();
    CreatorCollectionApi();
    CreatorPostApi();
    CreatorProfileApi();
  }, [props.route]);

  // ****** Follow-UnFollow ******
  useEffect(() => {
    if (CreatorProfileDetails && userProfileDetails) {
      const filterFun = CreatorProfileDetails?.followers?.filter((data) => {
        return data === userProfileDetails?._id;
      });
      if (filterFun && filterFun[0]) {
        setisFollowing(true);
      } else {
        setisFollowing(false);
      }
    }
  }, [CreatorProfileDetails, userProfileDetails]);

  // ********* Creator List Api Call *********
  const CreatorProfileApi = async () => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");
    setLoader(true);
    axios({
      method: "get",
      url: GetOtherUserProfile + `${CreatorId}`,
      headers: {
        token: value,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          setCreatorProfileDetails(response?.data?.result);
          setParticularCreatorId(response?.data?.result?._id);
          setprofilloader(true)
          setLoader(false);
        } else {
          alert("Something went wrong.");
          setLoader(false);
        }
      })
      .catch((err) => {
        console.log(err.response.data);
        if(err?.response?.data?.responseCode===440){
          Logout_(props)

        }
        setLoader(false);
      });
  };

  // ********* Creator Collection List Api Call *********
  const CreatorCollectionApi = async () => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");
    console.log(value)

    // setLoader(true);
    axios({
      method: "get",
      url: CreatorCollectionApiUrl,
      params: {
        userId: CreatorId,
      },
      headers: {
        token: value,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          setCreatorCollectionList(response?.data?.result?.docs);
          // setLoader(false);
        } else {
          alert("Something went wrong.");
          // setLoader(false);
        }
      })
      .catch((err) => {
        setLoader(false);
      });
  };
  function CreatorCollectionApiRefresh() {
    setIsFetchingCreatorCollectio(false);
    CreatorCollectionApi();
  }

  // ********* Creator Post List Api Call *********
  const CreatorPostApi = async () => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");

    // setLoader(true);
    axios({
      method: "get",
      url: CreatorPostApiUrl,
      params: {
        userId: CreatorId,
      },
      headers: {
        token: value,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          setCreatorPostList(response?.data?.result?.docs);
          // setLoader(false);
        } else {
          alert("Something went wrong.");
          // setLoader(false);
        }
      })
      .catch((err) => {
        setLoader(false);
      });
  };
  function CreatorPostApiRefresh() {
    setIsFetchingCreatorPost(false);
    CreatorPostApi();
  }

  // ********* Follow Api Call *********
  const FollowUserApi = async () => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");

    setLoader(true);
    axios({
      method: "get",
      url: FollowUnFollowUserUrl + `${CreatorId}`,
      headers: {
        token: value,
      },
    })
      .then(async (response) => {
        if (response?.data?.responseCode === 200) {
          CreatorProfileApi();
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
          // setFollowUserList(response?.data?.result?.following);
          setFollowUserList(response?.data?.result?.followers);
          GetProfileApi();
          setLoader(false);
        } else {
          alert("Something went wrong.");
          setLoader(false);
        }
      })
      .catch((err) => {
        setLoader(false);
      });
  };

  // ********* Block Api Call *********
  const BlockApi = async () => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");

    const formData = new FormData();
    formData.append("_id", {
      _id: CreatorId,
    });

    setLoader(true);
    axios({
      method: "post",
      url: BlockUnBlockUrl,
      data: formData?._parts[0][1],
      headers: {
        token: value,
      },
    })
      .then(async (response) => {
        if (response?.data?.responseCode === 200) {
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
          props.navigation.replace('Home');
          CreatorProfileApi();
          setBlockedUserList(response?.data?.result?.blockedUser);
          setLoader(false);
        } else {
          alert("Something went wrong.");
          setLoader(false);
        }
      })
      // .catch((err) => console.log("===== Creator TagPost Api err ======", err));
      .catch((err) => {
        if (err.response.data.responseCode === 404) {
          alert("Data not found");
          setLoader(false);
        } else {
          alert("Something went wrong.");
          setLoader(false);
        }
      });
    setLoader(false);
  };

  // ********* Get Profile Api *********
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
          setusertoken(response?.data?.result._id);

          setUserProfileDetails(response?.data?.result);
          setLoader(false);
        } else {
          alert("Something went wrong.");
          setLoader(false);
        }
      })
      .catch((err) => {
        setLoader(false);
      });
    setLoader(false);
  };

  // ~~~~~~~~~~~~~~~~~~~~~~ FlatList Reneder Items ~~~~~~~~~~~~~~~~~~~~~
  const CreatorCollectionRenderItem = (item) => {
    return (
      <View style={styles.flatlistContainer}>
        <View style={styles.hederBar}>
          <Text style={styles.titleTxt}>{item.item.title}</Text>
        </View>
        {item?.item?.image ? (
          <Image
            source={{ uri: item?.item?.image }}
            style={{ height: 120, width: 151, borderRadius: 5 }}
          />
        ) : (
          <Image source={ImagePath.NFT} style={styles.itemImg} />
        )}

        <View style={{ height: 10 }} />
        <View style={styles.auctionView}>
          <Text style={styles.auctionTxt}>Price : </Text>
          <Text style={styles.timeTxt}>{item?.item?.amount} SHARE</Text>
        </View>
        <View style={styles.auctionView}>
          <Text style={styles.auctionTxt}>Duration : </Text>
          <Text style={styles.timeTxt}>{item?.item?.duration} Days</Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            width: width * 0.45,
          }}
        >
          <TouchableOpacity
            style={[styles.viewBtn, { width: width * 0.35 }]}
            onPress={() =>
              props.navigation.navigate("ViewSubscription", {
                _id: item?.item?._id,
              })
            }
          >
            <Text style={styles.viewTxt}>View Collections</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const CreatorPostRenderItem = (item) => {
    return (
      <View style={[styles.flatlistContainer, { height: height * 0.32 }]}>
        {/* ********* Profile Details Container ********* */}
        <View style={styles.hederBar}>
          {item?.item?.userId?.profilePic ? (
            <Image
              source={{ uri: item?.item?.userId?.profilePic }}
              style={{
                height: 25,
                width: 25,
                borderRadius: 25 / 2,
                marginLeft: height * 0.006,
              }}
            />
          ) : (
            <Image
              source={ImagePath.PROFILE_PIC}
              style={{ height: 30, width: 30, borderRadius: 30 / 2 }}
            />
          )}
          <View style={{ width: width * 0.35 }}>
            <Text
              numberOfLines={1}
              style={[styles.titleTxt, { marginLeft: height * 0.01 }]}
            >
              {item?.item?.postTitle}
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.TypeAndTimeView}>
                {moment(item?.item?.createdAt).local().fromNow()}
              </Text>
              <Text style={styles.TypeAndTimeView}>{item?.item?.postType}</Text>
            </View>
          </View>
        </View>

        {/* ********* Details Container ********* */}
        <View style={[styles.auctionView, { marginVertical: 4 }]}>
          <Text numberOfLines={1} style={styles.timeTxt}>
            {item?.item?.details}
          </Text>
        </View>

        {/* ********* Post Image Container ********* */}
        {item?.item?.mediaUrl ? (
          <Image
            source={{ uri: item?.item?.mediaUrl }}
            style={{ height: 120, width: 151, borderRadius: 5 }}
          />
        ) : (
          <Image source={ImagePath.NFT} style={styles.itemImg} />
        )}

        {/* ********* Button Container ********* */}
        <TouchableOpacity
          style={[styles.viewBtn, { width: width * 0.35 }]}
          // onPress={() => props.navigation.navigate("OwnAndBuyPost", { item: item })}
          onPress={() =>{
            // console.log(item?.item,)
            props.navigation.navigate("CollectionDetails", {
              _id: item?.item?._id,
            })
          }
          }
        >
          <Text style={styles.viewTxt}>View Post</Text>
        </TouchableOpacity>
      </View>
    );
  };

  // ************ Cover Profile ***********
  function renderCover() {
    return (
      <View>
        <View style={styles.coverView}>
          <Text style={[styles.aboutTxt, { marginBottom: height * 0.03 }]}>
            About the Creator
          </Text>
          {CreatorProfileDetails?.coverPic ? (
            <Image
              source={{ uri: CreatorProfileDetails?.coverPic }}
              style={styles.coverImg}
              resizeMode="cover"
            />
          ) : (
            <Image
              source={ImagePath.BACKGROUND}
              resizeMode="cover"
              style={styles.coverImg}
            />
          )}

          {CreatorProfileDetails?.profilePic ? (
            <Image
              source={{ uri: CreatorProfileDetails?.profilePic }}
              style={{
                height: 125,
                width: 125,
                borderRadius: 125 / 2,
                position: "absolute",
                bottom: height * 0.02,
              }}
            // resizeMode="contain"
            />
          ) : (
            <Image
              source={ImagePath.PROFILE_PIC}
              resizeMode="contain"
              style={styles.creatorImg}
            />
          )}
          <View style={{ backgroundColor: "red" }}>
            <Image
              source={ImagePath.ONLINE}
              resizeMode="contain"
              style={[styles.onlineImg]}
            />
          </View>
        </View>
      </View>
    );
  }

  // ************ Profile Description ***********
  function rednderDescription() {
    return (
      <View style={styles.descriptionView}>
        <Text style={styles.nameTxt}>
          {CreatorProfileDetails?.userName || CreatorProfileDetails?.name}
        </Text>
        <View style={styles.mountView}>
          <Text numberOfLines={1} style={styles.codeTxt}>
            {CreatorProfileDetails?.bnbAccount?.address}
          </Text>
          <TouchableOpacity
            onPress={() => {
              copyToClipboard(),
                setCopiedText(userProfileDetails?.bnbAccount?.address);
            }}
          >
            <Image source={ImagePath.COPY_ICON} resizeMode="contain" />
          </TouchableOpacity>
        </View>
       {profileloader&&CreatorProfileDetails?._id!=usertoken&& <View style={styles.btnView}>
          <TouchableOpacity
            style={styles.donateView}
            onPress={() => FollowUserApi()}
          >
            <Text style={styles.donateTxt}>
              {isFollowing ? "Unfollow" : "Follow"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.subscribeView}
            onPress={() => BlockApi()}
          >
            <Text style={styles.donateTxt}>
              {userProfileDetails?.blockedUser?.includes(CreatorProfileDetails?._id) ? "UnBlock" : "Block"}
              {/* Block */}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.chatView}
            onPress={() =>{

              console.log(CreatorProfileDetails)
              if(CreatorProfileDetails._id!=undefined){

                props.navigation.navigate("Chat", {
                  receiverId: CreatorProfileDetails?._id,
                  completeDetails: CreatorProfileDetails,
                })
              }else{
                showMessage({
                  message: "please wait profile is loading",
                  type: "danger",
                  icon: "danger",
                })
              }

            
            }
            }
          >
            <Text style={styles.donateTxt}>Chat</Text>
          </TouchableOpacity>
        </View>}

        {/* ************ Tab Container ************ */}
        <View style={styles.DetailsAndItemActivityContainer}>
          <TouchableOpacity
            onPress={() => {
              setSelectedString("Collection"), CreatorCollectionApi();
            }}
          >
            <View
              style={[
                styles.DetailsTabContainer,
                {
                  borderBottomWidth: selectedString === "Collection" ? 5 : 0,

                  borderBottomColor:
                    selectedString === "Collection" ? COLOR.BUTTON_PINK : null,
                },
              ]}
            >
              <Text
                style={[
                  styles.TabTxt,
                  {
                    color:
                      selectedString === "Collection"
                        ? COLOR.BUTTON_PINK
                        : COLOR.WHITE,
                  },
                ]}
              >
                Collection
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setSelectedString("Post"), CreatorPostApi();
            }}
          >
            <View
              style={[
                styles.DetailsTabContainer,
                {
                  borderBottomWidth: selectedString === "Post" ? 5 : 0,

                  borderBottomColor:
                    selectedString === "Post" ? COLOR.BUTTON_PINK : null,
                },
              ]}
            >
              <Text
                style={[
                  styles.TabTxt,
                  {
                    color:
                      selectedString === "Post"
                        ? COLOR.BUTTON_PINK
                        : COLOR.WHITE,
                  },
                ]}
              >
                Post
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* ************ My Bundles Container ************ */}
        {selectedString === "Collection" ? (
          <View style={[styles.MyBundleListContainer]}>
            {CreatorCollectionList.length > 0 ? (
              <FlatList
                data={CreatorCollectionList}
                renderItem={CreatorCollectionRenderItem}
                numColumns={2}
                refreshing={isFetchingCreatorCollection}
                onRefresh={CreatorCollectionApiRefresh}
                nestedScrollEnabled
              />
            ) : (
              <View style={styles.NoDataTxtContainer}>
                <Text style={styles.NoDataTxt}>No Data Found...</Text>
              </View>
            )}
          </View>
        ) : (
          <View style={[styles.MyBundleListContainer]}>
            {CreatorPostList.length > 0 ? (
              <FlatList
                data={CreatorPostList}
                renderItem={CreatorPostRenderItem}
                numColumns={2}
                refreshing={isFetchingCreatorPost}
                onRefresh={CreatorPostApiRefresh}
                nestedScrollEnabled
              />
            ) : (
              <View style={styles.NoDataTxtContainer}>
                <Text style={styles.NoDataTxt}>No Data Found...</Text>
              </View>
            )}
          </View>
        )}
      </View>
    );
  }

  return (
    <SafeAreaView>
      {/* ************ Header Container ************ */}
      {
        loader&&<Progressdialog/>
      }
      <ProfileHeader
        Title={false}
        BackIcon={true}
        onBackPress={() => props.navigation.goBack()}
        BackIconStyling={{ marginLeft: verticalScale(10) }}
        PostIcon={false}
        Menu={false}
      />
      <ScrollView style={{marginBottom:'5%'}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.MainContainer}>
          {renderCover()}
          {rednderDescription()}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AboutCreator;

const styles = StyleSheet.create({
  MainContainer: {
    height: height * 1.23,
    // height: height * 1.3,
    width: width * 1,
    backgroundColor: COLOR.TXT_INPT_COLOR,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    marginTop: height * 0.016,
  },
  bundleTxt: {
    color: COLOR.WHITE,
    fontSize: height / 48,
    marginLeft: width * 0.03,
    fontFamily: "Montserrat-Bold",
  },
  detailView: {
    alignItems: "center",
    height: height * 0.23,
    width: width * 0.94,
    justifyContent: "center",
  },
  viewTxt: {
    fontSize: height / 68,
    fontFamily: "Montserrat-SemiBold",
    color: COLOR.WHITE,
  },
  donateView: {
    justifyContent: "center",
    alignItems: "center",
    borderColor: COLOR.BUTTON_PINK,
    borderWidth: height * 0.001,
    borderRadius: height * 0.01,
    backgroundColor: COLOR.TXT_COLOR,
    height: height * 0.06,
    width: width * 0.3,
  },
  subscribeView: {
    justifyContent: "center",
    alignItems: "center",
    borderColor: COLOR.BUTTON_PINK,
    borderWidth: height * 0.001,
    borderRadius: height * 0.01,
    backgroundColor: COLOR.BUTTON_PINK,
    height: height * 0.06,
    width: width * 0.3,
  },
  chatView: {
    justifyContent: "center",
    alignItems: "center",
    borderColor: COLOR.BUTTON_PINK,
    borderWidth: height * 0.001,
    borderRadius: height * 0.01,
    backgroundColor: COLOR.BACKGROUND_THEME,
    height: height * 0.06,
    width: width * 0.3,
  },
  donateTxt: {
    color: COLOR.WHITE,
    fontSize: height / 54,
    fontFamily: "Montserrat-SemiBold",
  },
  elipseImg: {
    height: height * 0.02,
    width: width * 0.04,
  },
  btnView: {
    height: height * 0.1,
    width: width * 1,
    alignItems: "center",
    flexDirection: "row",
    //backgroundColor: "red",
    justifyContent: "space-between",
    paddingHorizontal: width * 0.02,
  },
  mountView: {
    flexDirection: "row",
    height: height * 0.07,
    width: width * 0.35,
    alignItems: "center",
    justifyContent: "space-between",
  },
  detailTxt: {
    fontSize: height / 70,
    color: COLOR.WHITE,
    lineHeight: height * 0.026,
    fontFamily: "Montserrat-Regular",
  },
  coverImg: {
    height: height * 0.35,
    width: width * 1,
  },
  creatorImg: {
    height: height * 0.15,
    position: "absolute",
    bottom: height * 0.02,
    width: width * 0.3,
  },
  aboutTxt: {
    fontSize: height / 48,
    fontFamily: "Montserrat-Bold",
    color: COLOR.WHITE,
    alignSelf: "center",
  },
  onlineImg: {
    position: "absolute",
    // bottom: height * 0.11,
    // top: -58,
    top: -8,
    left: 26, // 40
  },
  nameTxt: {
    fontSize: height / 40,
    fontFamily: "Montserrat-Bold",
    color: COLOR.WHITE,
  },
  viewBtn: {
    backgroundColor: COLOR.BUTTON_PINK,
    borderRadius: height * 0.005,
    height: height * 0.035,
    width: width * 0.19,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    marginTop: height * 0.025,
  },
  auctionView: {
    marginTop: height * 0.005,
    height: height * 0.02,
    width: width * 0.42,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  codeTxt: {
    fontSize: height / 54,
    fontFamily: "Montserrat-Bold",
    color: COLOR.WHITE,
  },
  auctionTxt: {
    fontSize: height / 78,
    color: COLOR.WHITE,
    fontFamily: "Montserrat-Regular",
  },
  timeTxt: {
    fontSize: height / 65,
    color: COLOR.WHITE,
    fontFamily: "Montserrat-Medium",
  },

  coverView: {
    height: height * 0.5, // 6 June
    // height: height * 0.47,
    width: width * 1,
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  descriptionView: {
    height: height * 0.38, //0.3
    width: width * 1,
    alignItems: "center",
  },
  itemImg: {
    borderRadius: height * 0.01,
    height: height * 0.15,
    width: width * 0.42,
    marginTop: height * 0.01,
  },
  bidView: {
    marginTop: height * 0.01,
    height: height * 0.02,
    width: width * 0.42,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  bidTxt: {
    fontSize: height / 78,
    color: COLOR.WHITE,
    fontFamily: "Montserrat-Regular",
  },
  bidnumTxt: {
    fontSize: height / 78,
    color: COLOR.WHITE,
    fontFamily: "Montserrat-Bold",
  },
  elipseView: {
    height: height * 0.02,
    width: width * 0.04,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titleTxt: {
    fontSize: height / 60,
    color: COLOR.WHITE,
    fontFamily: "Montserrat-SemiBold",
    marginLeft: height * 0.007,
  },

  elipseTwoImg: {
    height: height * 0.02,
    width: width * 0.04,
  },

  listContainer: {
    height: height * 1,
    width: width * 1,
    backgroundColor: COLOR.TXT_INPT_COLOR,
  },
  flatlistContainer: {
    // backgroundColor: COLOR.BACK_BORDER,
    backgroundColor: "rgba(26, 26, 26, 1)", // New 25 June
    height: height * 0.35, // 0.39 New style
    width: width * 0.45,
    margin: height * 0.01,
    alignItems: "center",
    borderRadius: height * 0.01,
    borderRadius: 8,
  },
  likeImg: {
    height: height * 0.022,
    width: width * 0.043,
  },

  hederBar: {
    height: height * 0.045, // 0.03
    width: width * 0.44, // 0.39
    flexDirection: "row",
    alignItems: "center",
    marginTop: 1,
    // justifyContent: "space-between",
  },

  // **** Tab Styling Starts ****
  DetailsAndItemActivityContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: height * 0.06, // 0.07
    width: width * 1,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#1A1A1A",
  },
  DetailsTabContainer: {
    height: height * 0.06, // 0.07
    width: width * 0.5, // 0.33
    alignItems: "center",
    justifyContent: "center",
  },
  TabTxt: {
    fontFamily: "Montserrat-SemiBold",
    color: COLOR.WHITE,
    fontSize: height / 55,
  },
  MyBundleListContainer: {
    // height: Platform.OS === "android" ? height * 0.468 : height * 0.5, //0.476
    width: width * 1,
    // alignItems: "center",
    marginBottom: height * 0.01,
  },
  HeadingTxtContainer: {
    height: height * 0.05,
    width: width * 1,
    justifyContent: "center",
  },
  HeadingView: {
    fontSize: height / 45,
    fontFamily: "Montserrat-SemiBold",
    color: COLOR.WHITE,
    marginHorizontal: 16,
  },
  NoDataTxtContainer: {
    height: height * 0.35,
    width: width,
    justifyContent: "center",
    alignItems: "center",
  },
  NoDataTxt: {
    color: COLOR.WHITE,
    fontFamily: "Montserrat-SemiBold",
    fontSize: height / 45,
  },
  // **** Tab Styling Ends ****
  TypeAndTimeView: {
    marginLeft: height * 0.01,
    fontSize: height / 85,
    color: COLOR.WHITE,
    fontFamily: "Montserrat-Medium",
  },
});
