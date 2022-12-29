import {
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  SafeAreaView,
  Share,
  TouchableOpacity,
  FlatList,
  Modal,
  Alert,
  ActivityIndicator,
  Platform,
} from "react-native";
import React, { useState, useEffect, useRef,useMemo } from "react";

import Styles from "./Styles";
import { ImagePath } from "../../constants/ImagePath";
import { scale, verticalScale } from "react-native-size-matters";
import AppButton from "../../components/CustomButton/CustomButton";
import { COLOR } from "../../Utils/Colors";
import ProfileHeader from "../../components/CustomHeader/ProfileHeader";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  BuyPostUrl,
  GetUserProfileUrl,
  TransactionHistoryUrl,
  UserLikeDislikePostUrl,
  ViewPostByIdUrl,
} from "../../restAPI/ApiConfig";
import moment from "moment";
import { showMessage } from "react-native-flash-message";
const { height, width } = Dimensions.get("window");
import CustomLoader from "../../components/CustomLoader/CustomLoader";
import Video from "react-native-video";
import { Logout_ } from "../../../Logout";
import CountDown from "react-native-countdown-component";

const CollectionDetails = (props) => {
  const [tab, setTab] = useState(true);
  const [loader, setLoader] = useState(false);
  const [loaderTwo, setLoaderTwo] = useState(false);
  const [Id, setId] = useState(props?.route?.params?._id);
  const [PostId, setPostId] = useState("");
  const [PostDetails, setPostDetails] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [activity, setActivity] = useState([]);
  const [userProfileDetails, setUserProfileDetails] = useState({});
  const [ispostlessthen15, setispostlessthen15] = useState(false);
  const [timervalues, settimervalues] = useState(0)
  


  useEffect(() => {
    GetProfileApi();
    ViewPostApi();
    ActivityApi();
  }, [props.route]);

  useEffect(() => {

if(PostDetails?.createdAt){
    settimervalues(0)
    setispostlessthen15(false)
    const date = moment(PostDetails.createdAt);
    const now = moment();
    const diff = now.diff(date, "seconds");
    //minutes is >15

    if (diff > 900) {

      setispostlessthen15(true);
    } else {

        const time_ = (900 - diff) 
        settimervalues(time_)
        setispostlessthen15(false);
    }
    }

}, [PostDetails, props.navigation])
  const [iAgree, setIAgree] = useState(true);
  const toggleIAgree = () => {
    setIAgree(false);
    LikeAndDislikeApi();
  };

  const _toggleIAgree = () => {
    setIAgree(true);
    LikeAndDislikeApi();
  };

  // ******************** View Post Profile Api Call ********************
  const ViewPostApi = async () => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");

    setLoaderTwo(true);
    axios({
      method: "get",
      url: ViewPostByIdUrl + `${Id}`,
      headers: {
        token: value,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          console.log(
            "====== View Post Profile Response ======",
            response?.data?.result
          );
          const date = moment(response?.data?.result.createdAt);
          const now = moment();
          const diff = now.diff(date, "minutes");
          if (diff > 15) {
            setispostlessthen15(true);
          } else {
            setispostlessthen15(false);
          }
          setPostDetails(response?.data?.result);
          setPostId(response?.data?.result?._id);
          setLoaderTwo(false);
        } else {
          alert("Something went wrong.");
          setLoaderTwo(false);
        }
      })
      .catch((err) => {
        setLoaderTwo(false);
        if(err.response.data.responseCode===440){
          Logout_(props)

        }
        setLoaderTwo(false);
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
      .catch((err) => {
        if(err.response.data.responseCode===440){
          Logout_(props)

        }
      });
  };

  // ******************** Share Message Functionality ********************
  const ShareMessage = async () => {
    try {
      const result = await Share.share({
        // message: myReferralCode?.referralCode, // Dynamic Message
        message: "Social App", // Static Message
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // myReferralCode?.referralCode; // Dynamic Message
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

  const ItemActivityListRistenderItem = ({ item }) => {
    return (
      <View style={Styles.CardViewContainer}>
        {/* ********** Title Container ********** */}
        <View style={Styles.titleContainer}>
          <View style={Styles.TitleTxtView}>
            <Text style={[Styles.TxtStyling, { padding: 8 }]}>
              Title{"              "} :
            </Text>
          </View>
          <View style={Styles.ValueContainer}>
            {item?.transactionType === "BUY_POST" && (
              <Text numberOfLines={1} style={Styles.TxtStyling}>
                {"Post Purchased successfully"}
              </Text>
            )}

            {item?.transactionType === "SOLD_POST" && (
              <Text numberOfLines={1} style={Styles.TxtStyling}>
                {"Post sold successfully"}
              </Text>
            )}

            {item?.transactionType === "COLLECTION_SUBSCRIBE_RECEIVE" && (
              <Text numberOfLines={1} style={Styles.TxtStyling}>
                {"Collection subscribed successfully"}
              </Text>
            )}

            {item?.transactionType === "Sold Post" && (
              <Text numberOfLines={1} style={Styles.TxtStyling}>
                {"Post sold successfully"}
              </Text>
            )}

            {item?.transactionType === "Sold auction" && (
              <Text numberOfLines={1} style={Styles.TxtStyling}>
                {"Auction sold successfully"}
              </Text>
            )}

            {item?.transactionType === "Buy Post" && (
              <Text numberOfLines={1} style={Styles.TxtStyling}>
                {"Post purchased successfully"}
              </Text>
            )}

            {item?.transactionType === "BUY_AUCTION" && (
              <Text numberOfLines={1} style={Styles.TxtStyling}>
                {"Auction purchased successfully"}
              </Text>
            )}

            {item?.transactionType === "SOLD_AUCTION" && (
              <Text numberOfLines={1} style={Styles.TxtStyling}>
                {"Auction sold successfully"}
              </Text>
            )}

            {item?.transactionType === "COLLECTION_SHARE_AMOUNT" && (
              <Text numberOfLines={1} style={Styles.TxtStyling}>
                {"COLLECTION_SHARE_AMOUNT"}
              </Text>
            )}

            {item?.transactionType === "COLLECTION_RECEIVE_AMOUNT" && (
              <Text numberOfLines={1} style={Styles.TxtStyling}>
                {"Collection subscribed"}
              </Text>
            )}

            {item?.transactionType ===
              "COLLECTION_SUBSCRIBE_RECEIVE_COMMISSION" && (
              <Text numberOfLines={1} style={Styles.TxtStyling}>
                {"Collection subscribed commission received"}
              </Text>
            )}

            {item?.transactionType === "COLLECTION_SUBSCRIBE_SHARE" && (
              <Text numberOfLines={1} style={Styles.TxtStyling}>
                {"Collection subscribed "}
              </Text>
            )}

            {item?.transactionType === "DEPOSIT_FOR_ADMIN" && (
              <Text numberOfLines={1} style={Styles.TxtStyling}>
                {"Amount successfull deposit to admin"}
              </Text>
            )}

            {item?.transactionType === "DEPOSIT_FOR_USER" && (
              <Text numberOfLines={1} style={Styles.TxtStyling}>
                {"Amount deposit to admin"}
              </Text>
            )}

            {item?.transactionType === "WITHDRAW_FOR_ADMIN" && (
              <Text numberOfLines={1} style={Styles.TxtStyling}>
                {"Amount withdraw successfully"}
              </Text>
            )}

            {item?.transactionType === "WITHDRAW_FOR_USER" && (
              <Text numberOfLines={1} style={Styles.TxtStyling}>
                {"WITHDRAW_FOR_USER"}
              </Text>
            )}

            {item?.transactionType === "AMOUNT_RECEIVED" && (
              <Text numberOfLines={1} style={Styles.TxtStyling}>
                {"Amounty received successfully"}
              </Text>
            )}
          </View>
        </View>

        {/* ********** Date Container ********** */}
        <View style={Styles.titleContainer}>
          <View style={Styles.TitleTxtView}>
            <Text style={[Styles.TxtStyling, { padding: 8 }]}>
              Date{"             "} :
            </Text>
          </View>
          <View style={Styles.ValueContainer}>
            <Text style={Styles.TxtStyling}>
              {moment(item?.createdAt).format("YYYY-MM-DD")}
            </Text>
          </View>
        </View>

        {/* ********** Date Container ********** */}
        <View style={Styles.titleContainer}>
          <View style={Styles.TitleTxtView}>
            <Text style={[Styles.TxtStyling, { padding: 8 }]}>
              Amount{"       "} :
            </Text>
          </View>
          <View style={Styles.ValueContainer}>
            <Text style={Styles.TxtStyling}>{item?.amount} SHARE</Text>
          </View>
        </View>
      </View>
    );
  };

  // ******************** Buy Post Api Call ********************
  const PurchasePostApi = async () => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");

    setLoader(true);
    axios({
      method: "post",
      url: BuyPostUrl,
      data: {
        postId: Id,
        description: "Dummy",
      },
      headers: {
        token: value,
      },
    })
      .then(async (response) => {
        console.log("Buy Post Response", response.data);
        if (response.data.responseCode === 200) {
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
        console.log("Buy Post Error", err.response);
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
        setLoader(false);
      });
    setLoader(false);
    // .catch((err) => console.log("=====Buy Post err ======", err));
  };

  // ******************** Item Activity Api Call ********************
  const ActivityApi = async () => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");

    setLoader(true);
    axios({
      method: "get",
      url: TransactionHistoryUrl,
      headers: {
        token: value,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          setActivity(response?.data?.result?.docs);
          setLoader(false);
        } else {
          alert("Something went wrong.");
          setLoader(false);
        }
      })
      .catch((err) =>{
        if(err.response.data.responseCode===440){
          Logout_(props)

        }
      });
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
        if (response.data.responseCode === 200) {
          setUserProfileDetails(response?.data?.result);
          setLoader(false);
        } else {
          alert("Something went wrong.");
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

  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRef = useRef(null);
  const onBuffer = (e) => {
  };
  const onError = (e) => {
  };

  useEffect(() => {
    if (!!videoRef.current) {
      videoRef.current.seek(0);
    }
  }, [currentIndex]);

  const onChangeIndex = ({ index, prevIndex }) => {
    setCurrentIndex(index);
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
      <ScrollView>
        {!loaderTwo ? (
          <View style={Styles.MainContainer}>
            {/* ************ Image Container ************ */}
            <View style={Styles.ImageContainer}>
              {/* {PostDetails?.mediaUrl === PostDetails?.mediaUrl ? (
                <Image
                  source={{ uri: PostDetails?.mediaUrl }}
                  style={{ height: height * 0.413, width: width * 1 }} // New
                />
              ) : (
                <Image
                  source={ImagePath.COLLECTION_VIEW_IMG}
                  style={{ height: height * 0.413, width: width * 1 }} // New
                />
              )} */}

              {PostDetails&&PostDetails?.mediaType!="TEXT"&& PostDetails?.mediaUrl?.includes(".png" || ".jpg") && (
                <Image
                  source={{ uri: PostDetails?.mediaUrl }}
                  style={{ height: height * 0.413, width: width * 1 }} // New
                />
              )}
              {
                PostDetails&&PostDetails?.mediaType=="TEXT"&&<View
                style={{
                  height: height * 0.413, width: width * 1,
                  alignItems:'center',
                  justifyContent:'center',
                  padding:'4%'
                }}
                >
                   <Text
                style={{
                  color: "white",
                }}
                >{PostDetails?.postTitle} </Text>
                </View>
              }

              {PostDetails&&PostDetails?.mediaType!="TEXT"&&PostDetails?.mediaUrl?.includes(".mp4") && (
                <View
                // style={{ height: -verticalScale(218), width: width * 1 }}
                >
                  <Video
                    source={{ uri: PostDetails?.mediaUrl }}
                    ref={videoRef}
                    onBuffer={onBuffer}
                    onError={onError}
                    style={{
                      height: verticalScale(280),
                      width: width * 1,
                    }}
                    keyExtractor={(item) => item.id}
                    index={0}
                    repeat
                    paused={false}
                    resizeMode="cover"
                    posterResizeMode="contain"
                    controls={false}
                    // paused={currentIndex !== PostDetails?.__v}
                  />
                </View>
              )}
            </View>

            {/* ************ Profile Container ************ */}
            <View style={Styles.ProfileView}>
              <View style={Styles.PicNameContainer}>
                <View style={Styles.ProfilePicContainer}>
                  <TouchableOpacity
                    onPress={() =>
                      props.navigation.navigate("AboutCreator", {
                        nftId: PostDetails?.userId?._id,
                      })
                    }
                  >
                    {PostDetails?.userId?.profilePic ? (
                      <Image
                        source={{ uri: PostDetails?.userId?.profilePic }}
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
                  <Text numberOfLines={1} style={Styles.ProfileNameTxt}>
                    {PostDetails?.userId?.userName || PostDetails?.userId?.name}
                  </Text>
                  <Text style={Styles.ProfileDataTxtTwo}>
                    {moment(PostDetails?.createdAt).local().fromNow()}
                  </Text>
                </View>

                <View style={Styles.LikesCountContainer}>
                  <TouchableOpacity
                    onPress={() => (iAgree ? toggleIAgree() : _toggleIAgree())}
                  >
                    <Image
                      source={iAgree ? ImagePath.LIKE : ImagePath.HEART_LIKE}
                      style={{ height: 18, width: 18 }}
                    />
                  </TouchableOpacity>
                  <Text style={Styles.LikesAmountTxt}>
                    {PostDetails?.likesCount}
                  </Text>
                </View>
              </View>

              <View style={Styles.DurationPrice}>
                <View style={[Styles.DurationContainer]}>
                  <Text style={Styles.DurationTxt}>Price: </Text>
                  <Text style={Styles.DaysTxt}>
                    {" "}
                    {PostDetails?.amount} SHARE
                  </Text>
                </View>
              </View>

              <View style={[Styles.DetailsContainer]}>
                <Text
                  style={[
                    Styles.DaysTxt,
                    { fontFamily: "Montserrat-Bold", fontSize: height / 50 },
                  ]}
                >
                  Descriptions :
                </Text>
                <Text
                  numberOfLines={4}
                  style={[
                    Styles.DaysTxt,
                    {
                      fontFamily: "Montserrat-Medium",
                      marginVertical: 8,
                    },
                  ]}
                >
                  {PostDetails?.details}
                </Text>
              </View>

              {/* ************ Details and Item Activity Container ************ */}
              <View style={Styles.DetailsAndItemActivityContainer}>
                <TouchableOpacity onPress={() => setTab(true)}>
                  <View style={Styles.DetailsTabContainer}>
                    <Text
                      style={{
                        color: "rgba(255, 255, 255, 1)",
                        fontSize: height / 48,
                        fontFamily: "Montserrat-SemiBold",
                      }}
                    >
                      Details
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setTab(false)}>
                  <View style={Styles.ItemActivityTabContainer}>
                    <Text
                      style={{
                        color: "rgba(255, 255, 255, 1)",
                        fontSize: height / 48,
                        fontFamily: "Montserrat-SemiBold",
                      }}
                    >
                      Item Activity
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

              {/* ************* Tab Details Container ************ */}
              {tab ? (
                <>
                  <View
                    style={{
                      height: height * 0.03,
                      width: width * 1, // 0.5
                    }}
                  >
                    <View style={Styles.SelectedTabContainer}></View>
                  </View>

                  {/* ************ Details Tab Data Container ************ */}
                  <View style={{ height: height * 0.2 }}>
                    <View style={Styles.DetailsTabDataContainer}>
                      <View style={Styles.LeftDataTitle}>
                        <Text
                          style={[Styles.LeftDataTxt, { color: COLOR.WHITE }]}
                        >
                          Contract Address
                        </Text>
                      </View>

                      <View
                        style={[
                          Styles.LeftDataTitle,
                          { alignItems: "flex-end" },
                        ]}
                      >
                        <Text
                          numberOfLines={1}
                          style={[Styles.LeftDataTxt, { color: "#438CE1" }]}
                        >
                          {PostDetails?.userId?.bnbAccount?.address}
                        </Text>
                      </View>
                    </View>

                    <View style={Styles.DetailsTabDataContainer}>
                      <View style={Styles.LeftDataTitle}>
                        <Text
                          style={[Styles.LeftDataTxt, { color: COLOR.WHITE }]}
                        >
                          Token ID
                        </Text>
                      </View>

                      <View
                        style={[
                          Styles.LeftDataTitle,
                          { alignItems: "flex-end" },
                        ]}
                      >
                        <Text
                          style={[Styles.LeftDataTxt, { color: "#438CE1" }]}
                        >
                          23
                        </Text>
                      </View>
                    </View>

                    <View style={Styles.DetailsTabDataContainer}>
                      <View style={Styles.LeftDataTitle}>
                        <Text
                          style={[Styles.LeftDataTxt, { color: COLOR.WHITE }]}
                        >
                          Token Standard
                        </Text>
                      </View>

                      <View
                        style={[
                          Styles.LeftDataTitle,
                          { alignItems: "flex-end" },
                        ]}
                      >
                        <Text style={[Styles.LeftDataTxt]}>ERC-721</Text>
                      </View>
                    </View>

                    <View style={Styles.DetailsTabDataContainer}>
                      <View style={Styles.LeftDataTitle}>
                        <Text
                          style={[Styles.LeftDataTxt, { color: COLOR.WHITE }]}
                        >
                          Blockchain
                        </Text>
                      </View>

                      <View
                        style={[
                          Styles.LeftDataTitle,
                          { alignItems: "flex-end" },
                        ]}
                      >
                        <Text style={[Styles.LeftDataTxt]}>Binance</Text>
                      </View>
                    </View>
                  </View>

                  {/* ************ ************ */}
                </>
              ) : (
                <>
                  {/* ************ Item Activity Tab Data Container ************ */}
                  <View
                    style={{
                      height: height * 0.3,
                      width: width * 1,
                      justifyContent: "flex-start",
                      alignItems: "flex-end",
                    }}
                  >
                    <View style={Styles.SelectedTabContainer}></View>

                    {/* ************* Table Data List Container ************* */}

                    <View
                      style={{
                        height: height * 0.342, // 0.25
                        alignSelf: "center",
                      }}
                    >
                      {activity?.length > 0 ? (
                        <FlatList
                          data={activity}
                          renderItem={ItemActivityListRistenderItem}
                          keyExtractor={(item) => item.id}
                          nestedScrollEnabled
                        />
                      ) : (
                        <View style={Styles.NoDataTxtContainer}>
                          <Text style={Styles.NoDataTxt}>
                            No Activity Found...
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>
                </>
              )}

              {/* ************ Button Container ************ */}
             {!PostDetails?.isSold&& PostDetails.postType=="PRIVATE"&&ispostlessthen15&& <View style={Styles.BtnContainer}>
                {userProfileDetails._id === PostDetails?.userId?._id ? null : (
                  <AppButton
                    title="Buy Now"
                    type="large"
                    textStyle={{ fontFamily: "Montserrat-SemiBold" }}
                    // ButtonPress={() => PurchasePostApi()}
                    ButtonPress={() => {
                      
                      setModalVisible(true)

                    }}
                    btnStyling={{}}
                  />
                )}
              </View>}
               {!PostDetails?.isSold&& PostDetails.postType=="PRIVATE"&&!ispostlessthen15 &&timervalues>0&& <View
                    style={{
                        flexDirection: "row",
                        width: "40%",
                        alignSelf: 'center',
                        alignItems: 'center',
                        backgroundColor:'#E31A89',
                        padding:10,
                        justifyContent:'center',
                        borderRadius:5
                    }}
                >

                    <Text style={{
                        color: 'white',
                        fontSize: 14,
                        fontWeight:"600"

                    }}>Buy in</Text>
                    {timervalues > 0 && <CountDown
                        until={timervalues}
                        size={10}
                        onFinish={() => {
                          settimervalues(0)
                          setispostlessthen15(true)


                        }}
                        digitTxtStyle={{ color: "white", fontSize: height / 60,
                      
                        fontFamily: "Montserrat-SemiBold", 
                        backgroundColor:'#E31A89',
                      }}
                        separatorStyle={{ color:"white", fontSize: height / 60,                        backgroundColor:'#E31A89',
                      }}
                        timeToShow={["M", "S"]}
                        timeLabels={{ m: "", s: "" }}
                        showSeparator
                        digitStyle={{
                          backgroundColor:'#E31A89',

                        }}
                        style={{
                            // marginTop: height * 0.03,
                            marginLeft: 5,
                            backgroundColor:'#E31A89',

                        }}
                    />}

                </View>
                }
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
                  Buy Post
                </Text>
              </View>
              <View style={{ height: height * 0.08, justifyContent: "center" }}>
                <Text
                  style={[
                    Styles.HeadingTxtContainer,
                    { fontFamily: "Montserrat-Regular", textAlign: "center" },
                  ]}
                >
                  Are you sure, you want to Buy this Post ?
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
                      PurchasePostApi(), setModalVisible(!modalVisible);
                    }}
                  />
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

export default CollectionDetails;
