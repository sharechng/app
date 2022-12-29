import React, { useRef, useState, useEffect, useContext, useMemo } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
  ImageBackground,
  ScrollView,
  SafeAreaView,
  Modal,
  Share,
  Alert,
  Switch,
  Platform,
  TextInput,
  RefreshControl,
  ActivityIndicator,
  BackHandler,
} from "react-native";
import convertToProxyURL from 'react-native-video-cache';
import FastImage from 'react-native-fast-image'

import Styles from "./Styles";
import CustomHeader from "../../components/CustomHeader/CustomHeader";
import CustomInput from "../../components/CustomInput/CustomInput";
import { COLOR } from "../../Utils/Colors";
import { moderateScale, verticalScale } from "react-native-size-matters";
import { ImagePath } from "../../constants/ImagePath";
import ImagePicker from "react-native-image-crop-picker";
import { AuthContext } from "../../context/AuthContext";
// import Modal from ""


const { height, width } = Dimensions.get("window");
import {
  AddRemoveFromWishList,
  AddStoryUrl,
  CollectionsListUrl,
  CollectionSubscriptionUrl,
  CommentsOnPostUrl,
  ExclusivePublicPostListUrl,
  GetFollowingListUrl,
  GetUserProfileUrl,
  NFTCollectionListUrl,
  PostShareUrl,
  ReportApiUrl,
  SendEmojiApiUrl,
  TrendingCreatorApiUrl,
  StoryListWithFollowingApiUrl,
} from "../../restAPI/ApiConfig";
import CustomLoader from "../../components/CustomLoader/CustomLoader";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import MightLike from "../MightLike/MightLike";
import RBSheet from "react-native-raw-bottom-sheet";
import EmojiSelector, { Categories } from "react-native-emoji-selector";
import { showMessage } from "react-native-flash-message";
import Video from "react-native-video";
import AppButton from "../../components/CustomButton/CustomButton";
import RNFS from "react-native-fs";
import { normalize } from "../../../ResponsiveFontSize";
import { useIsFocused } from '@react-navigation/native';
import { Logout_ } from "../../../Logout";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Home = (props) => {
  const isFocused = useIsFocused();
  const auth = useContext(AuthContext);
  const [hometype, sethometype] = useState(0);
  const refRBSheet = useRef();
  const [UserID, setUserID] = useState('')
  const [loaderPost, setLoaderPost] = useState(true);
  const [loaderWish, setLoaderWish] = useState(false);
  const [loaderEmoji, setLoaderEmoji] = useState(false);
  const [loaderPostComment, setLoaderPostComment] = useState(false);
  const [userIdentifier, setuserIdentifier] = useState([])
  const [subscribersloader, setsubscribersloader] = useState(false)

  const [loadersArray, setloadersArray] = useState([]);

  const [comments, setComments] = useState("");
  const [reactions, setreacttion] = useState([]);
  const [showprogressloader, setshowprogressloader] = useState(false);
  const [allreactions, setreacttionall] = useState({})
  const [commentmodalopen, setcommentmodalopen] = useState(false);
  const [postid, setpostid] = useState("");
  const refRBSheet2 = useRef();

  const backAction = () => {

    if (props.navigation.isFocused()) {
      Alert.alert("", "Are you sure you want the close the app?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "YES", onPress: () => BackHandler.exitApp() },
      ]);
    } else {
      props.navigation.goBack();
    }

    return true;
  };
  // console.log("is foccus",isFocused)
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", backAction);
    };
  }, []);
  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      setshowprogressloader(false)
      setTimeout(() => {
        AsyncStorage.setItem("activetab", "home")
        setshowprogressloader(false)
      }, 1000);
      try {
        if (auth.filterimage) {
          const image = auth.filterimage
          auth.filterimage = null
          AddNewStoryApi(image, "camera")
        }
      } catch (error) {

      }
    });
    return unsubscribe

  }, [props.navigation])

  const [refreshing, setRefreshing] = React.useState(false);
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(500).then(() => {
      GetProfileApi(), setRefreshing(false);
    });
  }, []);

  const onViewRef = React.useRef((viewableItems) => {
    setCurrentIndex(viewableItems.changed[0].index)
    // Use viewable items in state or as intended
  })
  const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 })
  const [exclusivePostListing, setExclusivePostListing] = useState([]);
  const [storyListing, setStoryListing] = useState([]);
  const [userProfileDetails, setUserProfileDetails] = useState({});
  const [CollectionDetails, setCollectionDetails] = useState([]);
  const [FollowingList, setFollowingList] = useState([]);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);
  const [modalVisible5, setModalVisible5] = useState(false);
  const [modalVisibleEmoji, setModalVisibleEmoji] = useState(false);
  const [modalVisibleBlur, setModalVisibleBlur] = useState(false);
  const [particularId, setParticularId] = useState("");
  const [update, setUpdate] = useState(0);
  const [collectionList, setCollectionList] = useState([]);
  const [getRemark, setGetRemark] = useState("");
  const [errorAlert, setErrorAlert] = useState(null);
  const [nftId, setNftId] = useState("");
  const [showReportProgress, setshowReportProgress] = useState(false);

  const [TrendingCreatorList, setTrendingCreatorList] = useState([]);
  const [viewCollectionId, setViewCollectionId] = useState([]);
  const [PostShare, setPostShare] = useState("");

  const [imageUrlPath, setImageUrlPath] = useState("");
  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  // Photos
  const [isEnabled1, setIsEnabled1] = useState(false);
  const toggleSwitch1 = () => setIsEnabled1((previousState) => !previousState);
  // Videos
  const [isEnabled2, setIsEnabled2] = useState(false);
  const toggleSwitch2 = () => setIsEnabled2((previousState) => !previousState);

  const [imageUrlData, setImageUrlData] = useState("");
  const [ParticularIdTwo, setParticularIdTwo] = useState("");
  const [limit, setLimit] = useState(500);
  const [uploadingmessage, setuploadingmessage] = useState(null);
  const [collectiontype, setcollectiontype] = useState("Threads");

  // ******************** Share Message Functionality ********************
  const ShareMessage = async (PostShare) => {
    try {
      const result = await Share.share({
        message: PostShare, // Dynamic Message
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          PostShare; // Dynamic Message
          ("Social App");
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

  // ************ Story List Api ************ AddStoryUrl
  const StoryListApi = async (id) => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");
    axios({
      method: "get",
      url: StoryListWithFollowingApiUrl,
      params: {
        userId: id,
      },
      headers: {
        token: value,
      },
    })
      .then(async (response) => {
        if (response?.data?.responseCode === 200 && response.data.result != "Data not found.") {
          setuserIdentifier(id ? String(id) : "0")
        } else {
          setuserIdentifier("")

        }
      })
      .catch((err) => {

        if (err.response.data.responseCode === 440) {
          Logout_(props)

        }
      });
  };
  const presslike_dislike = (id) => {
    const allreactions_ = { ...allreactions }


    if (allreactions_[id] == undefined || allreactions_[id] == null || !allreactions_[id]) {
      const datacopy = [...exclusivePostListing]
      const updatedata = datacopy.map((item, index_) => {
        if (item._id == particularId.item) {


          item.reactOnPostCount = item.reactOnPostCount + 1
        }

        return item
      });

      setExclusivePostListing(updatedata)
    } else {
      // const datacopy = [...exclusivePostListing]
      // const updatedata = datacopy.map((item, index_) => {
      //   if (item._id == particularId.item) {


      //     item.reactOnPostCount = item.reactOnPostCount - 1
      //   }

      //   return item
      // });
      // setExclusivePostListing(updatedata)

    }

    allreactions_[id] = "💌"
    setreacttionall(allreactions_)
    //love symbol send in senpost




    SendPostEmoji(id, "💌");
  }

  const PostCollection = () => {
    props.navigation.navigate("CreateCollection");
  };
  const data = {
    Threads: "Photos",
    Photos: "Videos",
    Videos: "Threads",
  };
  const getactivecollectiontype = async () => {
    const tab = await AsyncStorage.getItem("activecollectiontype")
    if (tab) {
      setTimeout(() => {
        setcollectiontype(tab)
      }, 1000);
    }
  }

  const getactivetab = async () => {
    const active = await AsyncStorage.getItem("activetab")
    const tab = await AsyncStorage.getItem("activecollectiontype")


    if (active == null || active == undefined || active == "home") {

      sethometype(new Date().getTime());
    }

  }
  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener("tabPress", async (e) => {
      setshowprogressloader(true);
      getactivetab()


    });
    return () => unsubscribe();
  }, [props.navigation]);

  useEffect(() => {
    TopTrendingCreatorListApi();

    const unsubscribe = props.navigation.addListener("focus", () => {
      setshowprogressloader(true);
      getactivecollectiontype()
      setTimeout(() => {

        setshowprogressloader(false);
      }, 3000);
      ViewCollectionIdApi();
      CollectionListApi();
      TopTrendingCreatorListApi();
    });
    GetProfileApi();
    return unsubscribe;
  }, [props]);

  const filterdata = useMemo(() => {
    setTimeout(() => {
      AsyncStorage.setItem("activecollectiontype", collectiontype)

    }, 300);
    let data_ = []
    if (collectiontype == "Threads") {

      data_ = exclusivePostListing.filter((item) => item.mediaType == "TEXT")


    } else if (collectiontype == "Photos") {
      // console.log(collectiontype," d")
      try {
        data_ = exclusivePostListing.filter((item) => item.mediaType != "TEXT" && !item?.mediaUrl?.includes(".mp4"))


      } catch (error) {
        setTimeout(() => {

          setshowprogressloader(false);
        }, 3000);
      }

      // return exclusivePostListing.filter((item)=>!item?.mediaUrl?.includes(".mp4"))

    } else {
      data_ = exclusivePostListing.filter((item) => item?.mediaUrl?.includes(".mp4"))

    }
    setTimeout(() => {

      setshowprogressloader(false);
    }, 3000);
    return data_

  }, [collectiontype, exclusivePostListing, reactions, UserID])

  useEffect(() => {
    if (hometype > 0) {
      if (collectiontype == "Threads") {
        setIsEnabled(false);
        setIsEnabled1(true);
        setIsEnabled2(false);
      } else if (collectiontype == "Photos") {
        setIsEnabled(false);
        setIsEnabled1(false);
        setIsEnabled2(true);
      } else {
        setIsEnabled(true);
        setIsEnabled1(false);
        setIsEnabled2(false);
      }
      // console.log(collectiontype )   //...App getting crashed here ...

      setcollectiontype(data[collectiontype]);
    }
  }, [hometype]);


  const onCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
      mediaType: "any",
    }).then((image) => {
      setImageUrlPath(image.path);
      setImageUrlData(image.data);
      props.navigation.navigate('ImageFilter', { Path: image.data, Type: 'Story', PrevScreen: 'Home' });
      refRBSheet.current.close();
    });
  };

  // ************* On Gallary Picker *************
  const onGallary = () => {
    setTimeout(() => {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
        quality: "low",
        includeBase64: true,
        mediaType: "any",
      }).then((image) => {
        if (
          image.mime == "image/jpeg" ||
          image.mime == "image/png" ||
          image.mime == "image/jpg"
        ) {
          //when user uploads picture (.jpg, .png etc)
          setImageUrlPath(image.data);
          setImageUrlData(image.data);
          props.navigation.navigate('ImageFilter', { Path: image.data, Type: 'Story', PrevScreen: 'Home' })
        } else {
          // when user uploads video (.mp4)
          RNFS.readFile(image.path, "base64")
            .then((res) => {
              setImageUrlPath(image.path);
              setImageUrlData(res);
              AddNewStoryApi(res, "Gallary");
            })
            .catch((err) => {

            });
        }
        // setImageUrlPath(image.path);
        // setImageUrlData(image.data);

        refRBSheet.current.close();
      });
    }, 2000);
  };

  const CallToOpen = async (item) => {
    refRBSheet2?.current?.close();
    setTimeout(() => {
      
      setModalVisible1(true);
    }, 500);
    await setParticularIdTwo(item);
  };

  // ********** Function To Set UserName, FirstName, LastName in Modal PopUp ************
  const userDetails = async (item, index) => {
    setModalVisibleBlur(true);
    await setCollectionDetails(item);
  };

  const EmojiCallingFun = async (item, index, modal) => {

    const data = {
      item: item,
      index: index,
    };
    setParticularId(data);
    setModalVisibleEmoji(modal);
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRef = useRef(null);
  const onBuffer = (e) => { };
  const onError = (e) => { };

  useEffect(() => {
    if (!!videoRef.current) {
      videoRef.current.seek(0);
    }
  }, [currentIndex]);

  const onPress_ = (item, index) => {
    const data = [...exclusivePostListing];
    data[index].isWatchList = !data[index].isWatchList;
    setExclusivePostListing(data);

    AddRemoveToWishListApi(item?._id, index);

  };
  const FeedsRenderItem = ({ item, index }) => {
    setNftId(item?._id);
    return (
      <View

      >

        {(item?.mediaUrl?.includes(".png")) || item?.mediaUrl?.includes(".jpg") || (item?.mediaUrl?.includes(".png")) || item?.mediaUrl?.includes(".jpg") ? (
          <View style={[Styles.FeedBoardContainer]}>
            {/* ************ Profile Image, Name, More Icon ************ */}
            <View style={Styles.ProfileNameMoreContainer}>
              <TouchableOpacity
                style={Styles.ProfileImgView}
                onPress={() =>
                  props.navigation.navigate("AboutCreator", {
                    nftId: item?.userId?._id,
                  })
                }
              >
                <ImageBackground
                  source={ImagePath.PROFILE_BORDER}
                  style={{
                    height: 46,
                    width: 46,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {item?.userId?.profilePic ? (
                    <FastImage
                      source={{ uri: item?.userId?.profilePic }}
                      style={{ height: 42, width: 42, borderRadius: 42 / 2 }}
                    />
                  ) : (
                    <Image
                      source={ImagePath.PROFILE_PIC}
                      style={{ height: 42, width: 42 }}
                    />
                  )}
                </ImageBackground>
              </TouchableOpacity>

              <View style={Styles.ProfilenameView}>
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate("AboutCreator", {
                      nftId: item?.userId?._id,
                    })
                  }
                >
                  <Text style={Styles.ProfileNameTxt}>
                    {item?.userId?.userName || item?.userId?.name}
                  </Text>
                </TouchableOpacity>
                <Text
                  style={[
                    Styles.ProfileNameTxtDetails,
                    { color: COLOR.POST_TXT },
                  ]}
                >
                  {moment(item?.createdAt).local().fromNow()} {item?.postType}
                </Text>
              </View>
              {item?.userId._id != UserID ?
                <TouchableOpacity
                  // onPress={() => setModalVisible(true)}
                  // onPress={() => ReportingPostFun(item?._id)}
                  onPress={() => CallToOpen(item?._id)}
                  style={[Styles.ProfileImgView, { alignItems: "flex-end" }]}
                >
                  <Image
                    source={ImagePath.VERTICAL_MORE}
                    style={{ height: 13, width: 13 }}
                    resizeMode="contain"
                  />
                </TouchableOpacity> : null}
            </View>

            {/* ************ Description Data ************ */}
            {
              <TouchableOpacity style={[Styles.DescriptionContainer]}
                onPress={() =>
                  props.navigation.navigate("CollectionDetails", {
                    _id: item?._id,
                  })
                }
              >

                {collectiontype != "Videos" && <Text
                  // numberOfLines={1} 
                  style={[Styles.DescriptionTxt, {
                    fontSize: normalize(14),
                    fontWeight: 'bold'

                  }]}>{item?.postTitle}</Text>}
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate("CollectionDetails", {
                      _id: item?._id,
                    })
                  }
                >

                  {collectiontype == "Threads" && <Text
                    // numberOfLines={2}
                    style={[Styles.DescriptionTxt, {
                      fontSize: normalize(13),
                      marginTop: 10
                    }]}
                  >{item?.details}</Text>}
                </TouchableOpacity>
              </TouchableOpacity>}

            {/* ************ Upload Image/Video Data ************ */}
            {collectiontype == "Photos" && <View style={Styles.imgContainer}>
              {!item?.isSubscribed && collectiontype == "Photos" &&
                item?.postType === "PRIVATE" &&
                userProfileDetails?.userType === "User" ? (
                <View>
                  {item?.mediaUrl ? (
                    <>
                      {item?.mediaUrl && (
                        <FastImage
                          source={{ uri: item?.mediaUrl }}
                          style={{ height: verticalScale(218), width: width }}
                          blurRadius={10}
                        />
                      )}

                      <View style={Styles.BtnSubscribeMain}>
                        <TouchableOpacity
                          style={Styles.BtnTxtTouch}
                          onPress={() => userDetails(item)}
                        >
                          <Text style={Styles.BtnTxt}>
                            Subscribe Collection
                          </Text>
                          <Text style={Styles.BtnTxt}>
                            Price = {item?.amount ? item?.amount : "0.00"} SHARE
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </>
                  ) : (
                    <Image
                      source={ImagePath.AUCTIONS_SIX}
                      style={{ height: verticalScale(218), width: width }}
                      blurRadius={10}
                    />
                  )}
                </View>
              ) : (
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate("CollectionDetails", {
                      _id: item?._id,
                    })
                  }
                >
                  {item?.mediaUrl && collectiontype == "Photos" ? (
                    <FastImage
                      source={{ uri: item?.mediaUrl }}
                      style={{ height: verticalScale(218), width: width }}
                      resizeMode="contain"
                    />
                  ) : (
                    null
                  )}
                </TouchableOpacity>
              )}
            </View>}

            {/* ******* Emoji, Like, Comment, Share and Price Container ******* */}
            <View style={Styles.LikeCommentShareContainer}>
              <View
                style={[
                  Styles.LikesView,
                  {
                    // backgroundColor:'red'
                  },
                ]}
              >
                {/* ******** Emoji Container ******** */}
                <TouchableOpacity
                  onPress={() => EmojiCallingFun(item?._id, index, true)}
                  style={
                    {
                      // backgroundColor:'red'
                    }
                  }
                >

                  <View
                    style={{
                      justifyContent: "center",
                      height: 30,
                      alignItems: "center",
                    }}
                  >
                    {allreactions[item?._id] ? (
                      <Text style={{ fontSize: height / 35 }}>
                        {allreactions[item?._id] ? allreactions[item?._id] : "😃"}
                        {/* {  reacted[index].emoji} */}
                      </Text>
                    ) : (
                      <Image
                        source={ImagePath.HOME_EMOJI}
                        style={{ height: 20, width: 20 }}
                        resizeMode="contain"
                      />
                    )}
                  </View>

                </TouchableOpacity>

                {/* ******** Comment Container ******** */}
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate("Comments", {
                      nftId: nftId,
                      nftId: item?._id,
                    })
                  }
                >
                  <Image
                    source={ImagePath.HOME_COMMENTS}
                    style={{ height: 22, width: 22 }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>

                {/* ******** Share Post Container ******** */}
                <TouchableOpacity onPress={() => SharePostApi(item?._id)}>
                  <Image
                    source={ImagePath.HEADER_SHARE}
                    style={{ height: 20, width: 20, tintColor: "white" }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>

                {/* ******** Wish List Container ******** */}
                <TouchableOpacity
                  onPress={() => {
                    onPress_(item, index);
                  }}
                >
                  {!loadersArray[index] ? (
                    item?.isWatchList === true ? (
                      <Image
                        source={ImagePath.ADDED_TO_WISHLIST}
                        style={{ height: 20, width: 20 }}
                        resizeMode="contain"
                      />
                    ) : (
                      <Image
                        source={ImagePath.ATTACH_ICON}
                        style={{ height: 20, width: 20 }}
                        resizeMode="contain"
                      />
                    )
                  ) : (
                    <ActivityIndicator size="small" color="white" /> // New Added 22 June 2022
                  )}
                </TouchableOpacity>
              </View>

              <View style={Styles.CommentsView}>
                <Text style={Styles.txtComentsShare}>
                  {/* {item?.donationAmount ? item?.donationAmount : "0.00"} SHARE */}
                  {item?.amount ? item?.amount : "0.00"} SHARE
                </Text>
              </View>
            </View>

            {/* ************ Likes Count Container ************ */}
            <View
              style={[
                Styles.CommentsViewTwo,
                {
                  flexDirection: "row",
                  justifyContent: "flex-start",
                },
              ]}
            >
              {/* <Text>{emoji} </Text> */}
              <Image
                source={require("../../assets/Love.png")}
                style={{ height: 15, width: 15 }}
              />
              <Text
                style={[
                  Styles.txtComentsShare,
                  {
                    fontSize: normalize(12), // 15
                    fontFamily: "Montserrat-SemiBold",
                  },
                ]}
              >
                {/* {item?.reactOnPost?.length} reaction */}{" "}
                {item?.reactOnPostCount} likes
              </Text>
            </View>

            {/* ************ View All Comments Container ************ */}
            <TouchableOpacity
              activeOpacity={0.7}
              style={[Styles.CommentsViewThree]}
              onPress={() => {
                props.navigation.navigate("Comments", {
                  nftId: nftId,
                  nftId: item?._id,
                });
              }}
            >
              <Text style={Styles.ViewAllCommentsTxt}>
                View all {item?.comment?.length} comments
              </Text>
            </TouchableOpacity>

            {/* ******* Profile Icon, Comments and Post Button Container ******* */}
            <View style={Styles.CommentSendContainer}>
              <View
                style={[
                  Styles.ProfileImgView,
                  { height: height * 0.06, width: width * 0.09 },
                ]}
              >
                {userProfileDetails?.profilePic ? (
                  <FastImage
                    source={{ uri: userProfileDetails?.profilePic }}
                    style={{ height: 26, width: 26, borderRadius: 13 }}
                  />
                ) : (
                  <Image
                    source={ImagePath.PROFILE_PIC}
                    style={{ height: 26, width: 26, borderRadius: 13 }}
                    resizeMode="contain"
                  />
                )}
              </View>
              <TouchableOpacity
                style={[
                  Styles.ProfilenameView,
                  ,
                  { height: height * 0.06, width: width * 0.73 },
                ]}
                onPress={() => {
                  setpostid(item?._id);
                  setcommentmodalopen(true);
                }}
              >
                <Text style={{
                  fontFamily: "Montserrat-SemiBold",
                  color: "white",
                  padding: moderateScale(8),
                  fontSize: height / 65,
                  color: COLOR.GREY,
                }}>Write a comment...</Text>
              </TouchableOpacity>
              <View
                style={[
                  Styles.ProfileImgView,
                  {
                    alignItems: "center",
                    marginLeft: moderateScale(4),
                    flexDirection: "row",
                    justifyContent: "space-between",
                    height: height * 0.06,
                  },
                ]}
              >

              </View>
            </View>

            {/* ************ Border Line Container ************ */}
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: COLOR.TXT_INPT_COLOR,
              }}
            />
          </View>
        ) : (
          <>
            {item?.mediaUrl?.includes(".mp4") && (
              <View style={[Styles.FeedBoardContainer, { height: undefined, }]}>
                {/* ************ Profile Image, Name, More Icon ************ */}
                <View style={Styles.ProfileNameMoreContainer}>
                  <TouchableOpacity
                    style={Styles.ProfileImgView}
                    onPress={() =>
                      props.navigation.navigate("AboutCreator", {
                        nftId: item?.userId?._id,
                      })
                    }
                  >
                    <ImageBackground
                      source={ImagePath.PROFILE_BORDER}
                      style={{
                        height: 46,
                        width: 46,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {item?.userId?.profilePic ? (
                        <FastImage
                          source={{ uri: item?.userId?.profilePic }}
                          style={{
                            height: 42,
                            width: 42,
                            borderRadius: 42 / 2,
                          }}
                        />
                      ) : (
                        <Image
                          source={ImagePath.PROFILE_PIC}
                          style={{ height: 42, width: 42 }}
                        />
                      )}
                    </ImageBackground>
                  </TouchableOpacity>

                  <View style={Styles.ProfilenameView}>
                    <TouchableOpacity
                      onPress={() =>
                        props.navigation.navigate("AboutCreator", {
                          nftId: item?.userId?._id,
                        })
                      }
                    >
                      <Text style={Styles.ProfileNameTxt}>
                        {item?.userId?.userName || item?.userId?.name}
                      </Text>
                    </TouchableOpacity>
                    <Text
                      style={[
                        Styles.ProfileNameTxtDetails,
                        { color: COLOR.POST_TXT },
                      ]}
                    >
                      {moment(item?.createdAt).local().fromNow()}{" "}
                      {item?.postType}
                    </Text>
                  </View>
                  {item?.userId._id != UserID &&
                    <TouchableOpacity
                      // onPress={() => setModalVisible(true)}
                      // onPress={() => ReportingPostFun(item?._id)}
                      onPress={() => CallToOpen(item?._id)}
                      style={[Styles.ProfileImgView, { alignItems: "flex-end" }]}
                    >
                      <Image
                        source={ImagePath.VERTICAL_MORE}
                        style={{ height: 13, width: 13 }}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>}
                </View>

                {/* ************ Description Data ************ */}


                {/* ************ Upload Image/Video Data ************ */}
                {(collectiontype != 'Threads' && collectiontype != 'Photos') ?
                  <View style={[Styles.imgContainer, { height: height * 0.67 }]}>

                    <TouchableOpacity
                      onPress={() =>
                        props.navigation.navigate("CollectionDetails", {
                          _id: item?._id,
                        })
                      }
                    >

                      <Video
                        source={{ uri: convertToProxyURL(item?.mediaUrl) }}
                        ref={videoRef}
                        onBuffer={onBuffer}
                        onError={onError}
                        style={{
                          height: height * 0.67,
                          width: width * 1,
                        }}
                        keyExtractor={(item) => item.id}
                        index={0}
                        repeat
                        // paused={false}
                        resizeMode="cover"
                        posterResizeMode="contain"
                        paused={!isFocused || currentIndex !== index}
                        controls={false}
                        disableSeekbar
                        disableBack

                      />


                    </TouchableOpacity>

                    <View
                      style={{
                        alignItems: "flex-end",
                        // top: 430,
                        // right: 16,
                        position: "absolute",
                        right: 10,
                        bottom: 0

                      }}
                    >
                      <TouchableOpacity
                        style={{
                          height: 45, // 35
                          width: 30,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        onPress={() => {
                          presslike_dislike(item?._id)
                          // console.log(item?.likesUsers?.includes(userProfileDetails?._id) )
                          // LikeReelsApi(item?._id)
                        }}
                      >
                        <Image
                          source={
                            !allreactions[item?._id] ? ImagePath.REEL_LIKE : ImagePath.HEART_LIKE
                          }
                          style={{
                            height: 30,
                            width: 30,
                            resizeMode:'contain'
                          }}
                        />
                      </TouchableOpacity>
                      <Text style={{
                        marginRight: verticalScale(10),
                        color: COLOR.WHITE,
                        fontFamily: "Montserrat-Medium",
                        fontSize: height / 68,
                      }}>{item?.reactOnPostCount}</Text>

                      <TouchableOpacity
                        style={{
                          height: 45, // 35
                          width: 30,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        onPress={() => {
                          props.navigation.navigate("Comments", {
                            nftId: nftId,
                            nftId: item?._id,
                          });
                        }}
                      >
                        <Image source={ImagePath.REEL_COMMENT} />
                      </TouchableOpacity>
                      <Text style={{
                        marginRight: verticalScale(10),
                        color: COLOR.WHITE,
                        fontFamily: "Montserrat-Medium",
                        fontSize: height / 68,
                      }}>{item?.comment?.length}</Text>

                      <TouchableOpacity
                        style={{
                          height: 45, // 35
                          width: 30,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        onPress={() => {
                          setParticularId(item)
                          refRBSheet2.current.open(item)
                        }}
                      >
                        <Image
                          source={ImagePath.VERTICAL_MORE}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                    </View>
                    <View
                    style={{
                      position: "absolute",
                      bottom: 10, 
                      left: 10,
                      right: 70,
                    }}
                    >
                     <Text
                  numberOfLines={1} 
                  style={[Styles.DescriptionTxt, {
                    fontSize: normalize(14),
                    fontWeight: 'bold'

                  }]}>{item?.postTitle}</Text>
                  <Text
                    numberOfLines={2}
                    style={[Styles.DescriptionTxt, {
                      fontSize: normalize(13),
                      marginTop: 10
                    }]}
                  >{item?.details}</Text>
                      </View>
                  </View> : null}

                {/* ******* Emoji, Comment, Share and Price Container ******* */}
                {/* <View style={Styles.LikeCommentShareContainer}>
                  <View style={Styles.LikesView}>
                    <TouchableOpacity
                      onPress={() => EmojiCallingFun(item?._id, index, true)}
                      style={
                        {
                        }
                      }
                    >
                      {item?.reactOnPost ? (
                        <View
                          style={{
                            justifyContent: "center",
                            height: 30,
                            alignItems: "center",
                          }}
                        >
                          {allreactions[item?._id] ? (
                            <Text style={{ fontSize: height / 35 }}>
                              {allreactions[item?._id] ? allreactions[item?._id] : "😃"}
                            </Text>
                          ) : (
                            <Image
                              source={ImagePath.HOME_EMOJI}
                              style={{ height: 20, width: 20 }}
                              resizeMode="contain"
                            />
                          )}
                        </View>
                      ) : (
                        <Image
                          source={ImagePath.HOME_EMOJI}
                          style={{ height: 20, width: 20 }}
                          resizeMode="contain"
                        />
                      )}
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() =>
                        props.navigation.navigate("Comments", {
                          nftId: nftId,
                          nftId: item?._id,
                        })
                      }
                    >
                      <Image
                        source={ImagePath.HOME_COMMENTS}
                        style={{ height: 22, width: 22 }}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => SharePostApi(item?._id)}>
                      <Image
                        source={ImagePath.HEADER_SHARE}
                        style={{ height: 20, width: 20, tintColor: "white" }}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => onPress_(item, index)}>
                      {!loaderWish ? (
                        item?.isWatchList === true ? (
                          <Image
                            source={ImagePath.ADDED_TO_WISHLIST}
                            style={{ height: 20, width: 20 }}
                            resizeMode="contain"
                          />
                        ) : (
                          <Image
                            source={ImagePath.ATTACH_ICON}
                            style={{ height: 20, width: 20 }}
                            resizeMode="contain"
                          />
                        )
                      ) : (
                        loadersArray[index] && (
                          <ActivityIndicator size="small" color="white" />
                        )
                      )}
                    </TouchableOpacity>
                  </View>

                  <View style={Styles.CommentsView}>
                    <Text style={Styles.txtComentsShare}>
                      {item?.amount ? item?.amount : "0.00"} SHARE
                    </Text>
                  </View>
                </View> */}


                {/* ************ Border Line Container ************ */}
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: COLOR.TXT_INPT_COLOR,
                  }}
                />
              </View>
            )}
          </>
        )}

        {/* ************ Border Line Container ************ */}
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: COLOR.TXT_INPT_COLOR,
          }}
        />

      </View>
    );
  };

  // ***** Used to Push the Data in New Array for UserId *****
  const getData2 = (element) => {
    let newArray = [];
    exclusivePostListing.map((item, index) => {
      if (item.userId === element) {
        newArray.push(item?.userId);
      } else {
        newArray.push(item?.userId);
      }
    });
  };

  // ************ Following User List Api ************ AddStoryUrl
  const FollowingUserListApi = async (identifier) => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");

    axios({
      method: "get",
      url: GetFollowingListUrl,
      headers: {
        token: value,
      },
    })
      .then(async (response) => {
        if (response?.data?.responseCode === 200) {

          const uniqueArr = response?.data?.result?.following.filter((item) => {

            return (item?._id != identifier && item?.isStory)
          })
          setFollowingList(uniqueArr);

          StoryListApi(identifier);

        } else {

        }
      })
      .catch((err) => {

        if (err.response.data.responseCode === 440) {
          Logout_(props)

        }
      });
  };

  // ************ Exclusive Public Post List Api ************
  const ExclusivePublicPostApi = async (useridentifier) => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");

    // setLoaderPost(true);
    axios({
      method: "get",
      url: ExclusivePublicPostListUrl,
      params: {
        limit: limit,
      },
      headers: {
        token: value,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          setExclusivePostListing(response?.data?.result?.docs);
          const allreactions = {}
          if (useridentifier) {
            let data = [];
            let isreacted = false;
            let data2 = {};

            for (
              let index = 0;
              index < response?.data?.result?.docs.length;
              index++
            ) {
              const element = response?.data?.result?.docs[index];
              // emojiref?.current.value
              let emoji = null;


              if (element.reactOnPost) {
                isreacted = element.reactOnPost?.filter((item) => {

                  // emojiref?.current[index]=item.emoji
                  if (item?.userId == useridentifier) {
                    allreactions[element._id] = item.emoji
                    emoji = item?.emoji;
                    data2[index] = true;
                  } else {
                    data2[index] = false;
                  }
                });
              }
              data.push(emoji);

              // emojiref?.current.push(emoji)
            }

            setreacttionall(allreactions)
            setreacttion(data);
          }

          getData2(response?.data?.result);
          setLoaderPost(false);
        } else {
          alert("Something went wrong.");
          setLoaderPost(false);
        }
      })
      .catch((err) => {

        setLoaderPost(false);
      });
  };

  // ************ Report Api Call ************
  const ReportApi = async (particularReportId) => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");

    setshowReportProgress(true);
    axios({
      method: "post",
      url: ReportApiUrl,
      data: {
        // postId: nftId,
        postId: particularReportId || ParticularIdTwo,
        message: getRemark,
      },
      headers: {
        token: value,
      },
    })
      .then(async (response) => {

        if (response.data.responseCode === 200) {
          setGetRemark("");
          ExclusivePublicPostApi(UserID);
          setModalVisible1(false);
          // setModalVisibleRemark(false);
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
          }),
            setshowReportProgress(false);
          getRemark(null);
        } else {
          alert("Something went wrong.");
          setshowReportProgress(false);
        }
      })
      .catch((err) => {

        setshowReportProgress(false);
      });
  };

  // ************ Add To Wish List Api Call ************
  const AddRemoveToWishListApi = async (id, index) => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");

    const formData = new FormData();
    formData.append({
      postId: id,
    });
    axios({
      method: "post",
      url: AddRemoveFromWishList,
      data: formData?._parts[0][0],
      headers: {
        token: value,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          ExclusivePublicPostApi(UserID);

          setLoaderWish(false);
        } else {
          setLoaderWish(false);
        }
      })
      .catch((err) => {
        setLoaderWish(false);
      });
  };

  // ************ Send Emoji Api Call ************
  const SendPostEmoji = async (id, Emojis) => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");

    setLoaderEmoji(true);
    axios({
      method: "get",
      url: SendEmojiApiUrl + `/${id}`,
      params: { emoji: Emojis },
      headers: {
        token: value,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {

          ExclusivePublicPostApi(UserID);
          // showMessage({
          //   message: response?.data?.responseMessage,
          //   type: "success",
          //   icon: "success",
          //   textStyle: {
          //     fontFamily: "Montserrat-Medium",
          //     fontSize: height / 55,
          //   },
          //   style: {
          //     width: Platform.OS === "android" ? width * 0.92 : null,
          //     borderRadius: Platform.OS === "android" ? 5 : null,
          //     margin: Platform.OS === "android" ? 15 : null,
          //     alignItems: Platform.OS === "android" ? "center" : null,
          //   },
          // });
          setLoaderEmoji(false);
        } else {
          alert("Something went wrong.");
          setLoaderEmoji(false);
        }
      })
      .catch((err) => {

        setLoaderEmoji(false);
      });
  };

  const Blank = (id) => {
    setComments("");
  };

  // ************ Comments on Post Api Call ************
  const CommentOnPostApi = async (id) => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");

    const formData = new FormData();
    formData.append("postId", {
      postId: id,
      message: comments,
    });

    setLoaderPostComment(true);
    axios({
      method: "post",
      url: CommentsOnPostUrl,
      data: formData?._parts[0][1],
      headers: {
        token: value,
      },
    })
      .then((response) => {
        if (response.data.responseCode === 200) {
          ExclusivePublicPostApi(UserID);
          setComments("");
          setLoaderPostComment(false);
        } else {
          alert("Something went wrong.");
          setLoaderPostComment(false);
          setComments("");
        }
      })
      .catch((err) => {
        setLoaderPostComment(false);
      });
  };

  // ************ Get Profile Api ************
  const GetProfileApi = async () => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");


    axios({
      method: "get",
      url: GetUserProfileUrl,
      headers: {
        token: value,
      },
    })
      .then(async (response) => {
        if (response.status === 200) {
          setUserProfileDetails(response?.data?.result);
          FollowingUserListApi(response?.data?.result._id)
          ExclusivePublicPostApi(response?.data?.result._id);
          setUserID(response?.data?.result._id)

        } else {
          alert("Something went wrong.");

        }
      })
      .catch((err) => {

      });

  };

  // ************ Trending Creator Api ************
  const TopTrendingCreatorListApi = async () => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");

    axios({
      method: "get",
      url: TrendingCreatorApiUrl,
      headers: {
        token: value,
      },
      params: {
        limit: 8,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          setTrendingCreatorList(response?.data?.result?.docs);

        } else {
          alert("Something went wrong.");

        }
      })
      .catch((err) => {


      });
  };

  // ************ Subscription Collection Api ************
  const CollectionSubscriptionApi = async (id) => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");
    const DATA = new FormData();
    setsubscribersloader(true);
    DATA.append({
      // collectionId: CollectionDetails?._id, // Old
      collectionId: id,
    });


    axios({
      method: "post", // get
      url: CollectionSubscriptionUrl,
      data: DATA?._parts[0][0],
      headers: {
        token: value,
      },
    })
      .then(async (response) => {
        setsubscribersloader(false);
        if (response.data.responseCode === 200) {
          setModalVisibleBlur(false)
          ExclusivePublicPostApi(UserID);
          // alert(response?.data?.responseMessage);
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
          // props.navigation.goBack();

        } else {
          alert("Something went wrong.");

        }
      })
      .catch((err) => {

        setsubscribersloader(false);
        const message = err?.response?.data?.responseMessage ? err?.response?.data?.responseMessage : "Something went wrong."
        alert(message);

      });
  };

  // ************ View Collection Api ************
  const ViewCollectionIdApi = async () => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");


    axios({
      method: "get",
      url: NFTCollectionListUrl + `${CollectionDetails?._id}`,
      headers: {
        token: value,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          setViewCollectionId(response?.data?.result);

        } else {
          alert("Something went wrong.");

        }
      })
      .catch((err) => {

      }
      );
  };

  // ************ Add Story Api ************
  const AddNewStoryApi = async (imageData, type, subtype) => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");
    showMessage({
      message: "Story uploading...",
      type: "success",
      icon: "success",
    });
    const data = {};
    if (type == "camera") {
      data["storyType"] = "PUBLIC";
      data["details"] = "CAMERA";
      data["story"] = [`data:image/jpeg;base64,${imageData}`];
    } else {
      data["storyType"] = "PUBLIC";
      data["details"] = "CAMERA";
      data["story"] = [`data:video/mp4;base64,${imageData}`];
    }

    setuploadingmessage("Story Uploading...");
    axios({
      method: "post",
      url: AddStoryUrl,
      data: data,
      headers: {
        token: value,
      },
    })
      .then(async (response) => {
        if (response?.data?.responseCode === 200) {
          // FollowingUserListApi(userProfileDetails._id);
          setUpdate(update + 1);

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
          setuploadingmessage("Story Uploaded");
          setTimeout(() => {
            setuploadingmessage(null);
          }, 2000);


        } else {
          Alert.alert("Something went wrong.");

        }
      })
      .catch((err) => {
        setuploadingmessage("Story is not Uploaded ");
        setTimeout(() => {
          setuploadingmessage(null);
        }, 2000);

        if (err.response.data.responseCode === 440) {
          Logout_(props)

        }


      });
  };

  // ************ Post Share Api ************
  const SharePostApi = async (id) => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");


    setuploadingmessage("Post Sharing...");
    axios({
      method: "get",
      url: PostShareUrl,
      params: {
        postId: id,
      },
      headers: {
        token: value,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          setPostShare(response?.data?.result);
          ShareMessage(response?.data?.result);
          setuploadingmessage("Post Shared");
          setTimeout(() => {
            setuploadingmessage(null);
          }, 2000);

        } else {
          alert("Something went wrong.");

        }
      })
      .catch((err) => {
      });
  };

  const storyItem = (item) => {
    return (
      <>
        <TouchableOpacity
          // key={index}
          onPress={() =>
            props.navigation.navigate("Status", {
              name: item.item?._id,
              StoryListing: storyListing,
              userName: item.item?.userName || item.item?.name,
              profilePic: item.item?.profilePic, User: 'Following'
            })
          }
        >
          <View style={Styles.ListMainContainer}>
            <View style={Styles.StoryImgContainer}>
              {item.item?.profilePic ? (
                imageUrlPath ? (
                  <Image
                    // source={{ uri: data?.story[0] }}
                    source={imageUrlPath}
                    style={{
                      resizeMode: "cover",
                      height: "92%",
                      width: "92%",
                      borderRadius: 100,
                    }}
                  />
                ) : (
                  <FastImage
                    // source={{ uri: data?.story[0] }}
                    source={{
                      uri: item.item?.profilePic,
                    }}
                    style={{
                      resizeMode: "cover",
                      height: "92%",
                      width: "92%",
                      borderRadius: 100,
                    }}
                  />
                )
              ) : (
                <Image
                  source={ImagePath.PROFILE_PIC}
                  style={{
                    resizeMode: "cover",
                    height: "92%",
                    width: "92%",
                    borderRadius: 100,
                  }}
                />
              )}
            </View>

            <Text
              style={{
                textAlign: "center",
                fontSize: height / 70,
                opacity: item.item?.index ? 1 : 0.5,
                color: COLOR.WHITE,
              }}
            >
              {(item.item?.userName?.length > 12 ? item.item?.userName.slice(0, 12) + '...' : item.item?.userName) || (item.item?.name?.length > 12 ? item.item?.name.slice(0, 12) + '...' : item.item?.name)}
            </Text>
          </View>
        </TouchableOpacity>
      </>
    );
  };

  const TrendingCreatorRenderItem = (item) => {
    return (
      <View
        style={{
          height: height * 0.11, // 0.55 30 June
          width: width * 0.53,
          backgroundColor: "#1A1A1A",
          alignItems: "center",
        }}
      >
        <View style={Styles.CreatorListingContainer}>
          <View style={Styles.CreatorNameTxtview}>
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate("AboutCreator", {
                  nftId: item?.item?._id,
                })
              }
              style={[Styles.CreatorPicsView]}
            >
              {item?.item?.profilePic ? (
                <FastImage
                  source={{ uri: item?.item?.profilePic }}
                  style={{ height: 47, width: 47, borderRadius: 47 / 2 }}
                />
              ) : (
                <Image
                  source={ImagePath.COLLECTION_PROFILE}
                  // source={ImagePath.PROFILE_PIC}
                  style={{ height: 44, width: 44 }}
                />
              )}
            </TouchableOpacity>
            <View
              style={{
                height: height * 0.09,
                width: width * 0.35, // 0.34 6 June
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate("AboutCreator", {
                    nftId: item?.item?._id,
                  })
                }
              >
                <Text numberOfLines={1} style={Styles.CreatorNameTxt}>
                  {item?.item?.userName || item?.item?.name}
                </Text>
              </TouchableOpacity>
              <Text numberOfLines={1} style={Styles.creatorBalanceTxt}>
                {Number(item?.item?.bnbBalace).toFixed(2)} SHARE
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  // ************ Collection List Api ************
  const CollectionListApi = async (id) => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");


    axios({
      method: "get",
      url: CollectionsListUrl,
      params: {
        limit: 50,
      },
      headers: {
        token: value,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          // setCollectionList(response?.data?.result?.docs);
          setCollectionList(response?.data?.result?.docs[0]?._id);

        } else {
          alert("Something went wrong.");

        }
      })
      .catch((err) => {

        if (err.response.data.responseCode === 440) {
          Logout_(props)

        }
      }
      );
  };

  const reportConfirm = () => {
    setModalVƒisible1(true);
  };

  return (
    <SafeAreaView>
      <Modal
        transparent={true}
        visible={commentmodalopen}
        style={{
          justifyContent: 'flex-end',
          margin: 0,
        }}
        avoidKeyboard
      >
        <KeyboardAwareScrollView
          enableOnAndroid={false}
          contentContainerStyle={{
            flex: 1,
            justifyContent: 'flex-end',
            // height:height,
          }}
          // extraScrollHeight={Platform.OS === 'ios' ? 0 : 0}
          // keyboardShouldPersistTaps="handled"
          // extraHeight={Platform.OS === 'ios' ? 0 : 0}
          enableAutoAutomaticScroll={(Platform.OS === 'ios')}
        // scrollEnabled={false}
        >
          <View
            style={{
              marginTop: 'auto',
              backgroundColor: "#1A1A1A",
              padding: 16,

            }}
          >




            <View style={Styles.CommentSendContainer}>
              <View
                style={[
                  Styles.ProfileImgView,
                  { height: height * 0.06, width: width * 0.09 },
                ]}
              >
                {userProfileDetails?.profilePic ? (
                  <FastImage
                    source={{ uri: userProfileDetails?.profilePic }}
                    style={{ height: 26, width: 26, borderRadius: 13 }}
                  />
                ) : (
                  <Image
                    source={ImagePath.PROFILE_PIC}
                    style={{ height: 26, width: 26, borderRadius: 13 }}
                    resizeMode="contain"
                  />
                )}
              </View>
              <View
                style={[
                  Styles.ProfilenameView,
                  ,
                  { height: height * 0.06, width: width * 0.73 },
                ]}
              >
                <CustomInput
                  placeholder="Write a comment..."
                  placeholderTextColor={"white"}
                  onChangeText={(txt) => setComments(txt)}
                  styles={{
                    height: verticalScale(43),
                    width: width * 0.6,
                    borderRadius: 5,
                    padding: moderateScale(8),
                    fontSize: height / 65,
                    color: COLOR.GREY,
                  }}
                  onSubmitEditing={() => {
                    setcommentmodalopen(false)
                    if (comments) {
                      CommentOnPostApi(postid)
                      Blank("");
                      setComments("")
                    }
                  }}
                  autoFocus={true}
                  value={comments}
                />
              </View>
              <View
                style={[
                  Styles.ProfileImgView,
                  {
                    alignItems: "center",
                    marginLeft: moderateScale(4),
                    flexDirection: "row",
                    justifyContent: "space-between",
                    height: height * 0.06,
                  },
                ]}
              >
                {comments ? (
                  <TouchableOpacity
                    style={Styles.PostButtonTxtContainer}
                    onPress={() => {
                      setComments("")
                      CommentOnPostApi(postid), Blank("");
                      setcommentmodalopen(false)
                    }}
                  >
                    <Text style={Styles.PostButtonTxt}>Post</Text>
                  </TouchableOpacity>
                ) : null}
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>

      </Modal>
      <View style={[Styles.MainContainer]}>
        {/* ************ Header Container ************ */}

        <CustomHeader
          MenuIcon={true}
          OpenDrawer={() => setModalVisible3(true)}
          HeaderLogo={true}
          searchIcon={true} // Chats
          onSearchPress={() => props.navigation.navigate("ChatList")}
          comments={true} //Bell Icon
          onCommentsPress={() => props.navigation.navigate("Notifications")}
          notificationIcon={false}
          onNotificationPress={() => props.navigation.navigate("Notifications")}
          WalletIcon={true}
          onWalletPress={() => setModalVisible5(true)}
          WalletIcons={true}
          onWalletClick={() => props.navigation.navigate("Wallet")}
        />


        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {/* ************ Story Container ************ */}
          {collectiontype != 'Videos' && <View style={[Styles.StoryBoardContainer]}>
            <View style={{ width: width * 1, flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() => {
                  userIdentifier.length == 0 ? refRBSheet.current.open() : props.navigation.navigate(
                    'Status', {
                    name: userProfileDetails?._id,
                    userName: userProfileDetails?.userName || userProfileDetails?.name,
                    profilePic: userProfileDetails?.profilePic, User: 'Self'
                  }
                  )
                }}
                style={{
                  width: width * 0.25,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {userIdentifier?.length == 0 ?
                  <View>
                    <ImageBackground
                      source={{
                        uri: userProfileDetails?.profilePic
                          ? userProfileDetails?.profilePic
                          : "data:image/png;base64,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",
                      }}
                      imageStyle={{ borderRadius: 65 / 2 }}
                      style={{
                        height: 65,
                        width: 65,
                        justifyContent: "flex-end",
                        alignItems: "flex-end",
                      }}
                    >
                      <Image
                        source={ImagePath.ADD_STORY_ICON}
                        style={{ height: 20, width: 20 }}
                      />
                    </ImageBackground>
                  </View> :
                  <View style={[Styles.StoryImgContainer, { borderWidth: 2 }]} >
                    <ImageBackground
                      source={{
                        uri: userProfileDetails?.profilePic
                          ? userProfileDetails?.profilePic
                          : "data:image/png;base64,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",
                      }}
                      imageStyle={{ borderRadius: 65 / 2 }}
                      style={{
                        height: 65,
                        width: 65,
                        justifyContent: "flex-end",
                        alignItems: "flex-end",
                      }}
                    >
                    </ImageBackground>
                  </View>
                }
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: height / 65,
                    color: COLOR.WHITE,
                    marginTop: verticalScale(2),
                  }}
                >
                  {/* {userProfileDetails?.userName || userProfileDetails?.name} */}
                  {userIdentifier?.length == 0 ? 'Add Story' : 'Your Story'}
                </Text>
              </TouchableOpacity>
              { }
              <FlatList
                data={FollowingList}
                // data={myStories}
                renderItem={storyItem}
                horizontal

                extraData={FollowingList}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          </View>}

          {/* ************ Creator Container ************ */}
          {collectiontype != 'Videos' && <View>
            <View style={Styles.CreatorSeeAllContainer}>
              <View style={Styles.TrendCreatorContainer}>
                <Text style={Styles.TrendCreatorTxt}>{"Trending Creator"}</Text>
              </View>
              <View
                style={[
                  Styles.TrendCreatorContainer,
                  {
                    width: width * 0.3,
                    alignItems: "flex-end",
                  },
                ]}
              >
                <TouchableOpacity
                  onPress={() => props.navigation.navigate("Creators")}
                >
                  <Text style={Styles.SeeAllTxt}>{"See All"}</Text>
                </TouchableOpacity>
              </View>
            </View>

            <FlatList
              showsHorizontalScrollIndicator={false}
              data={TrendingCreatorList}
              horizontal
              renderItem={TrendingCreatorRenderItem}
            />
          </View>}

          {/* ************ Underline Container ************ */}
          {collectiontype != 'Videos' && <View
            style={{
              marginTop: verticalScale(10),
              borderBottomWidth: 1,
              borderBottomColor: COLOR.TXT_INPT_COLOR,
            }}
          />}
          {
            <View>
              {uploadingmessage && (
                <View style={Styles.CreatorSeeAllContainer}>
                  <View style={Styles.TrendCreatorContainer}>
                    <Text style={Styles.TrendCreatorTxt}>
                      {uploadingmessage}
                    </Text>
                  </View>
                  <View
                    style={[
                      Styles.TrendCreatorContainer,
                      {
                        width: width * 0.3,
                        alignItems: "flex-end",
                      },
                    ]}
                  >
                    <ActivityIndicator size={"small"} />
                  </View>
                </View>
              )}
            </View>
          }

          {/* ***************** Feeds Container ***************** */}
          {!loaderPost ? (
            <View style={{ flex: 1, marginBottom: height * 0.06 }}>
              {isEnabled || isEnabled1 || isEnabled2 ? (

                <FlatList
                  data={filterdata}
                  renderItem={FeedsRenderItem}
                  pagingEnabled={collectiontype == 'Videos' ? true : false}
                  nestedScrollEnabled
                  style={{
                    flexGrow: 0
                  }}
                  viewabilityConfig={viewConfigRef.current}
                  onViewableItemsChanged={onViewRef.current}
                  removeClippedSubviews={false}
                />


              ) : (
                <View style={Styles.ErrorTxtContainer}>
                  <Text style={Styles.ErrorTxt}>No Data Found...</Text>
                </View>
              )}
            </View>
          ) : (
            <CustomLoader
              loaderStyling={{ height: height * 0.1, width: width * 1 }}
            />
          )}

          {/* ************ Might Like Container ************ */}
          <View>
            <MightLike {...props} />
          </View>
        </ScrollView>
      </View>

      {/* *************** Upload Types Modal *************** */}
      <View style={{}}>
        <View>
          <Modal
            animationType="none"
            transparent={true}
            visible={modalVisible3}
          >
            <TouchableOpacity
              onPress={() => setModalVisible3(false)}
              style={{
                height: height * 1,
                width: width * 1,
                backgroundColor: "rgba(0,0,0,0.55)",
              }}
            >
              <View
                style={[Styles.inputCardModalTwo, { alignSelf: "flex-start" }]}
              >
                <View>
                  <View style={Styles.ShareTxtContainer}>
                    <View style={Styles.ModalOneTxtView}>
                      <View style={Styles.ImgsView}>
                        <Image
                          style={{
                            height: 24,
                            width: 24,
                            marginLeft: verticalScale(4),
                          }}
                          source={ImagePath.GALLARY_POST}
                          resizeMode="contain"
                        />
                      </View>
                      <View style={{ justifyContent: "center" }}>
                        <Text
                          style={[
                            Styles.ModalOneTxt,
                            { marginLeft: moderateScale(1) },
                          ]}
                        >
                          {"Threads"}
                        </Text>
                      </View>
                    </View>
                    <Switch
                      onValueChange={toggleSwitch}
                      value={isEnabled}
                      trackColor={{
                        false: COLOR.GREY,
                        true: COLOR.BUTTON_PINK,
                      }}
                      thumbColor={isEnabled ? "#FFFF" : "#FFFF"}
                    />
                  </View>
                </View>

                <View>
                  <View style={Styles.ReportTxtContainer}>
                    <View style={Styles.ModalOneTxtView}>
                      <View style={Styles.ImgsView}>
                        <Image
                          style={{ height: 17, width: 24 }}
                          source={ImagePath.COLLECTION}
                          resizeMode="contain"
                        />
                      </View>
                      <View style={{ justifyContent: "center" }}>
                        <Text
                          style={[
                            Styles.ModalOneTxt,
                            { marginLeft: moderateScale(1) },
                          ]}
                        >
                          {"Photos"}
                        </Text>
                      </View>
                    </View>

                    <Switch
                      onValueChange={toggleSwitch1}
                      value={isEnabled1}
                      trackColor={{
                        false: COLOR.GREY,
                        true: COLOR.BUTTON_PINK,
                      }}
                      thumbColor={isEnabled1 ? "#FFFF" : "#FFFF"}
                    />
                  </View>
                </View>

                <View>
                  <View style={{ flexDirection: "row", height: 47 }}>
                    <View style={Styles.ModalOneTxtView}>
                      <View style={Styles.ImgsView}>
                        <Image
                          style={{ height: 24, width: 24 }}
                          source={ImagePath.POST_NEW_STORY}
                          resizeMode="contain"
                        />
                      </View>
                      <View style={{ justifyContent: "center" }}>
                        <Text
                          style={[
                            Styles.ModalOneTxt,
                            { marginLeft: moderateScale(1) },
                          ]}
                        >
                          {"Videos"}
                        </Text>
                      </View>
                    </View>
                    <Switch
                      onValueChange={toggleSwitch2}
                      value={isEnabled2}
                      trackColor={{
                        false: COLOR.GREY,
                        true: COLOR.BUTTON_PINK,
                      }}
                      thumbColor={isEnabled2 ? "#FFFF" : "#FFFF"}
                    />
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </Modal>
        </View>
      </View>

      {/* *************** Options to Post, Collections and Story Modal *************** */}
      <View style={{}}>
        <Modal animationType="none" transparent={true} visible={modalVisible5}>
          <TouchableOpacity
            onPress={() => setModalVisible5(false)}
            style={{
              height: height * 1,
              width: width * 1,
              backgroundColor: "rgba(0,0,0,0.4)",
            }}
          >
            <View
              style={[
                Styles.inputCardModal,
                {
                  width: width * 0.4,
                  marginVertical: Platform.OS == "ios" ? 70 : 60,
                  marginHorizontal: 0,
                },
              ]}
            >
              <TouchableOpacity
                onPress={() => {
                  // setModalVisible5(false), onSelectImage();
                  setModalVisible5(false),
                    props.navigation.navigate("CreatePost");
                }}
              >
                <View style={Styles.PostContainers}>
                  <View style={Styles.PostTxtView}>
                    <Text style={Styles.PostTxts}>{"Post"}</Text>
                  </View>
                  <View style={Styles.ImgsView}>
                    <Image
                      style={{ height: 24, width: 24 }}
                      source={ImagePath.GALLARY_POST}
                      resizeMode="contain"
                    />
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setModalVisible5(false), PostCollection();
                }}
              >
                <View style={Styles.PostContainers}>
                  <View style={Styles.PostTxtView}>
                    <Text style={Styles.PostTxts}>{"Collection"}</Text>
                  </View>
                  <View style={Styles.ImgsView}>
                    <Image
                      style={{ height: 18, width: 18 }}
                      source={ImagePath.COLLECTION}
                      resizeMode="contain"
                    />
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setModalVisible5(false), refRBSheet.current.open();
                }}
              >
                <View style={Styles.PostContainers}>
                  <View style={Styles.PostTxtView}>
                    <Text style={Styles.PostTxts}>{"Story"}</Text>
                  </View>
                  <View style={Styles.ImgsView}>
                    <Image
                      style={{ height: 24, width: 24 }}
                      source={ImagePath.POST_NEW_STORY}
                      resizeMode="contain"
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
      {/* *************** Emoji Modal *************** */}
      <View style={{}}>
        <ScrollView>
          <Modal
            animationType="none"
            transparent={true}
            visible={modalVisibleEmoji}
          >
            <TouchableOpacity
              onPress={() => setModalVisibleEmoji(false)}
              style={{
                height: height * 1,
                width: width * 1,
                backgroundColor: "rgba(0,0,0,0.4)",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  height: height * 0.5, // 0.23
                  width: width * 0.88,
                  backgroundColor: COLOR.TXT_INPT_COLOR,
                  alignItems: "center",
                  borderRadius: 8,
                }}
              >
                <View
                  style={{
                    height: height * 0.43,
                    width: width * 0.84,
                    backgroundColor: COLOR.TXT_INPT_COLOR,
                    alignItems: "center",
                  }}
                >
                  <EmojiSelector
                    // category={Categories.emotion}
                    showSearchBar={false}
                    showTabs={false}

                    showSectionTitles={true}
                    onEmojiSelected={(emoji) => {

                      setModalVisibleEmoji(false);
                      const allreactions_ = { ...allreactions }


                      if (allreactions_[particularId.item] == undefined || allreactions_[particularId.item] == null || !allreactions_[particularId.item]) {
                        const datacopy = [...exclusivePostListing]
                        const updatedata = datacopy.map((item, index_) => {
                          if (item._id == particularId.item) {


                            item.reactOnPostCount = item.reactOnPostCount + 1
                          }

                          return item
                        });

                        setExclusivePostListing(updatedata)
                      }

                      allreactions_[particularId.item] = emoji
                      setreacttionall(allreactions_)
                      SendPostEmoji(particularId.item, emoji);
                    }}

                    columns={8}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </Modal>
        </ScrollView>
      </View>
      {/* *************** Blur Collection Subscribe Modal *************** */}
      <View style={{}}>
        <View>
          <Modal
            animationType="none"
            transparent={true}
            visible={modalVisibleBlur}
          >
            <TouchableOpacity
              onPress={() => setModalVisibleBlur(false)}
              style={Styles.BlurModalClose}
            >
              <View style={Styles.BlurModalContainer}>
                {/* ********** Image Container ********** */}
                <View style={Styles.BlurModalImgContainer}>
                  <FastImage
                    // source={{ uri: CollectionDetails?.userId?.coverPic }}
                    source={{ uri: CollectionDetails?.mediaUrl }}
                    style={{
                      height: height * 0.34,
                      width: width * 0.84,
                      marginTop: 8,
                    }}
                  />
                </View>

                {/* ********** Title Container ********** */}
                <View style={Styles.BlurModalTitleContainer}>
                  <Text
                    style={[
                      Styles.TitleTxt,
                      {
                        fontSize: height / 45,
                        fontFamily: "Montserrat-SemiBold",
                      },
                    ]}
                  >
                    {CollectionDetails?.userId?.name}
                  </Text>
                </View>

                {/* ********** Details Container ********** */}
                <View
                  style={{ width: width * 0.9, justifyContent: "space-around" }}
                >
                  <Text
                    style={[Styles.TitleTxt, { marginLeft: height * 0.015 }]}
                  >
                    Collection Amount : {CollectionDetails?.amount} SHARE
                  </Text>

                  <Text
                    style={[Styles.TitleTxt, { marginLeft: height * 0.015 }]}
                  >
                    Duration : {viewCollectionId?.duration} Days
                  </Text>

                  <Text
                    numberOfLines={1}
                    style={[Styles.TitleTxt, { marginLeft: height * 0.015 }]}
                  >
                    Details : {viewCollectionId?.description}
                  </Text>
                </View>

                {/* ********** Button Container ********** */}
                {!subscribersloader && <View style={Styles.BtnContainer}>
                  <View style={Styles.BtnSubscribeMainTwo}>
                    <TouchableOpacity
                      style={[
                        Styles.BtnTxtTouchTwo,
                        {
                          width: width * 0.3,
                          backgroundColor: COLOR.TXT_COLOR,
                        },
                      ]}
                      onPress={() => setModalVisibleBlur(false)}
                    >
                      <Text style={Styles.BtnTxt}>Cancel</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={Styles.BtnSubscribeMainTwo}>
                    <TouchableOpacity
                      onPress={() =>
                        CollectionSubscriptionApi(
                          CollectionDetails?.collectionId
                        )
                      }
                      style={Styles.BtnTxtTouchTwo}
                    >
                      <Text style={Styles.BtnTxt}>Subscribe Now</Text>
                    </TouchableOpacity>
                  </View>
                </View>}
                {
                  subscribersloader && <ActivityIndicator
                    size={"large"}
                    color={COLOR.TXT_COLOR}
                  />
                }
              </View>
            </TouchableOpacity>
          </Modal>
        </View>
      </View>
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
                Choose your images / videos here
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
      {/* *************** New Report Confirm Modal *************** */}
      <>
        <Modal visible={modalVisible1} transparent={true}>
          <View
            style={{
              height: height * 1,
              width: width * 1,
              backgroundColor: "rgba(0,0,0,0.4)",
            }}
          >
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setModalVisible1(false)}
              style={{ height: height * 0.31 }}
            />
            <View style={Styles.ReportPostModalOne}>
              <View style={Styles.ReportPostModalMainContainer}>
                <View style={{ height: height * 0.04 }}>
                  <Text style={Styles.ReportPostModalAlertTxt}>{"Report"}</Text>
                </View>
                <View style={{ alignSelf: "center", marginVertical: 1 }}>
                  <Text style={Styles.ReportPostModalConfirm}>
                    Report this comment
                  </Text>
                </View>

                <View style={{ alignSelf: "center" }}>
                  <TextInput
                    style={[
                      Styles.RemarkPostInputModalContainer,
                      { color: COLOR.WHITE, },

                    ]}
                    numberOfLines={5}
                    textAlignVertical={"top"}
                    // multiline={true}
                    placeholder="Report this comment…"
                    placeholderTextColor={COLOR.TXT_COLOR}
                    onChangeText={(tet) => {
                      if (tet == "") {
                        setErrorAlert("Please enter report reason")
                      } else {
                        setErrorAlert(null)
                      }

                      setGetRemark(tet)
                    }}
                  // value={GetRemark}
                  />
                  {
                    errorAlert && <Text style={{
                      color: "red", fontSize: normalize(12),
                      marginLeft: "4%"
                    }}>{errorAlert}</Text>
                  }
                </View>

                <View style={Styles.ReportPostModalContainerTwo}>
                  <AppButton
                    title="Cancel"
                    type="small"
                    disabled={showReportProgress}
                    textStyle={{
                      fontFamily: "Montserrat-SemiBold",
                      fontSize: height / 55,
                    }}
                    btnStyling={{ backgroundColor: "rgba(98, 98, 98, 1)" }}
                    ButtonPress={() => {
                      setErrorAlert(null)
                      setModalVisible1(false), setGetRemark("");
                    }}
                  />

                  {showReportProgress ? (
                    <View style={{ width: 85 }}>
                      <ActivityIndicator color={COLOR.BUTTON_PINK} />
                    </View>
                  ) : (
                    <AppButton
                      title="Report"
                      type="small"
                      textStyle={{
                        fontFamily: "Montserrat-SemiBold",
                        fontSize: height / 55,
                      }}
                      ButtonPress={() => {
                        if (getRemark && getRemark.trim("").length > 0 && getRemark.length > 0) {

                          ReportApi();
                        } else {
                          setErrorAlert("Please enter report reason")
                        }
                        // ReportApi(ParticularId);
                      }}
                    />
                  )}
                </View>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => {
                setModalVisible1(false), setGetRemark("");
              }}
              style={{ height: height * 0.31 }}
            />
          </View>
        </Modal>
        <Modal
          visible={showprogressloader}
          animationType="fade"
          transparent={true}
        >
          <View style={{
            flex: 1, justifyContent: "center", alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)'
          }} >
            <ActivityIndicator color="#EC167F"
              size={50}

            />
          </View>

        </Modal>

      </>
      <RBSheet
        ref={refRBSheet2}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={220}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(0,0,0,0.6)",
          },
          draggableIcon: {
            backgroundColor: COLOR.TXT_COLOR,
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
        <View style={{
            padding: 20,
            backgroundColor: COLOR.BOTTOM_SHEET_BG_CLR,
            paddingTop: 20,
        }}>
          {particularId?.userId?._id != UserID&&<View style={{
               height: 45,
               // width: width * 0.92,
               justifyContent: "center",
          }}>
            {particularId?.userId?._id != UserID&&<TouchableOpacity
              onPress={() => CallToOpen(particularId?._id)}
              style={{ width: 80 }}
            >
              <Text style={{
                   color: COLOR.WHITE,
                   fontSize: height / 45,
                   fontFamily: "Montserrat-Medium",
              }}>Report</Text>
            </TouchableOpacity>}
          </View>}

          <View style={{
               height: 45,
               // width: width * 0.92,
               justifyContent: "center",
          }}>
            <TouchableOpacity
              onPress={() => SharePostApi(particularId?._id)}
              style={{ width: 80 }}
            >
              <Text style={{
                   color: COLOR.WHITE,
                   fontSize: height / 45,
                   fontFamily: "Montserrat-Medium",
              }}>Share</Text>
            </TouchableOpacity>
          </View>

          {/* <View style={styles.BtnMainContainer}>
     <TouchableOpacity

       style={{ width: 80 }}
     >
       <Text style={styles.BtnTxt}>Save</Text>
     </TouchableOpacity>
   </View> */}
        </View>
      </RBSheet>

    </SafeAreaView>
  );
};

export default Home;
