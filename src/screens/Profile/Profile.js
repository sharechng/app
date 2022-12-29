import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  FlatList,
  Modal,
  ActivityIndicator,
  ScrollView,
  Platform,
} from "react-native";
import Clipboard from "@react-native-community/clipboard";

import Styles from "./Styles";
import { ImagePath } from "../../constants/ImagePath";
import { COLOR } from "../../Utils/Colors";
import { moderateScale, verticalScale } from "react-native-size-matters";
import ProfileHeader from "../../components/CustomHeader/ProfileHeader";
import AppButton from "../../components/CustomButton/CustomButton";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Progressdialog from "../../../Progressdialog";
import {
  GetUserProfileUrl,
  OwnPostList,
  TransactionHistoryUrl,
  OwnCollectionsUrl,
  MyPostListUrl,
  MyOwnBidUrl,
  SubscriberListUrl,
  showUserOffline,
  likeDislikeCollection,
  UserLikeDislikePostUrl,
  ServerUrl
} from "../../restAPI/ApiConfig";
import moment from "moment";
import { showMessage } from "react-native-flash-message";
import CustomLoader from "../../components/CustomLoader/CustomLoader";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import {
  LoginManager,
} from "react-native-fbsdk-next";
import { normalize } from "../../../ResponsiveFontSize";
import { Logout_ } from "../../../Logout";
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import RenderMyPost from "./RenderMyPost";

const { height, width } = Dimensions.get("window");

const Profile = (props) => {
  const [loader, setLoader] = useState(false);
  // const [showActivityIndicator, setshowActivityIndicator] = useState([])
  const [copiedText, setCopiedText] = useState("");
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

  const [userProfileDetails, setUserProfileDetails] = useState({});
  const [selectedString, setSelectedString] = useState("Bought");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleLogout, setModalVisibleLogout] = useState(false);
  const [modalVisiblePost, setModalVisiblePost] = useState(false);
  const [OwnPostData, setOwnPostData] = useState([]);
  const [BoughtPostData, setBoughtPostData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isFetching2, setIsFetching2] = useState(false);
  const [isFetching3, setIsFetching3] = useState(false);
  const [isFetching4, setIsFetching4] = useState(false);
  const [CollectionList, setCollectionList] = useState([]);
  const [TransactionHistoryList, setTransactionHistoryList] = useState([]);
  const [myOwnBid, setMyOwnBid] = useState([]);
  const [subscriberCount, setSubscriberCount] = useState("");
  // const [first, setfirst] = useState(second)

  const [likeDislike, setlikeDislike] = useState([]);
  const [likeDislikePost, setlikeDislikePost] = useState([]);
  const [showLoaderOnMyPost, setshowLoaderOnMyPost] = useState(true);
  const [showLoaderOnSubscribtion, setshowLoaderOnSubscribtion] = useState(true);
  const [showLoaderOnMyCollection, setshowLoaderOnMyCollection] = useState(true);
  const [showLoaderOnMyTransaction, setshowLoaderOnMyTransaction] = useState(true)
  const [Referraldata, setReferraldata] = useState({})
  // *************** Logout Function to Clear Token After Logout ***************
  const logOut = async () => {
    // props.navigation.replace("Login");
    // setModalVisibleLogout(false)

    // await AsyncStorage.removeItem("token"),
    // AsyncStorage.removeItem("activetab")
    // props.navigation.replace("Login");
    const value = await AsyncStorage.getItem('token');
    axios({
      method: 'get',
      url: showUserOffline,
      headers: {
        token: value
      }
    }).then(function (res) {
      if (res.data.responseCode === 200) {
        setModalVisibleLogout(false)

        logout_()
      } else {
        showMessage({
          message: 'Unable to logout please try again later',
          type: "warning"
        })
      }
    }).catch(function (Err) {
      setModalVisibleLogout(false)
      AsyncStorage.removeItem("token"),
        AsyncStorage.removeItem("activetab")
      AsyncStorage.removeItem("logintype")
      props.navigation.replace("Login");
    })


  };
  const logout_ = async () => {
    const logintype = await AsyncStorage.getItem("logintype");
    setModalVisibleLogout(false)

    try {
      await AsyncStorage.removeItem("token"),
        AsyncStorage.removeItem("activetab")

      setModalVisibleLogout(false)
      try {
        if (logintype === "google") {

          const currentUser = await GoogleSignin.getCurrentUser();
          if (currentUser) {

            await GoogleSignin.signOut();
          }
        } else if (logintype === "facebook") {
          LoginManager.logOut()
        }


      } catch (error) {

      }
      props.navigation.replace("Login");

      // props.navigation.navigate("Login");
    } catch (e) {

    }
  }

  // ************ 1-Own Post Api ************
  const renderItemOwnPostList = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={[Styles.flatlistcontainer, { height: height * 0.285 }]}
        onPress={() => props.navigation.navigate("Resale", { _id: item?._id })}
      >
        <View style={Styles.profileimageview}>
          {item?.mediaUrl ? (
            <Image source={{ uri: item?.mediaUrl }} style={Styles.Nftimg} />
          ) : (
            <Image
              style={Styles.Nftimg}
              source={ImagePath.COLLECTIONS_PICTURES}
            />
          )}
        </View>

        <View style={Styles.flatlistmidcontainer}>
          <View style={Styles.profilenameview}>
            {item?.userId?.profilePic ? (
              <Image
                style={{
                  height: 25,
                  width: 25,
                  borderRadius: 25 / 2,
                }}
                source={{ uri: item?.userId?.profilePic }}
              />
            ) : (
              <Image
                style={{ height: 25, width: 25, resizeMode: "contain" }}
                source={ImagePath.PROFILE_PIC}
              />
            )}

            <Text style={Styles.usernameTxt}>
              {item?.userId?.userName || item?.userId?.userName}
            </Text>
            {/* <Text style={Styles.usernameTxt}>{item?.postTitle}</Text> */}
          </View>
          <TouchableOpacity onPress={() => likeDislikePostFunction(item._id, index)}>
            {
              likeDislikePost[index] ?
                //user liked
                <FontAwesome name="heart" color={COLOR.BUTTON_PINK} size={15} /> :
                //user not yet liked
                <FontAwesome name="heart-o" color={'white'} size={15} />
            }
          </TouchableOpacity>
        </View>

        <View style={Styles.flatlistmiddleview}>
          <View style={Styles.collectioview}>
            <View
              style={{
                width: width * 0.34,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                source={ImagePath.APP_ICON}
                style={{ height: 12, width: 12 }}
              />
              <Text style={[Styles.ethTxt, { marginLeft: height * 0.006 }]}>
                {item?.amount ? item?.amount : "0.00"} SHARE
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate("exportnft", { _id: item?._id })

              }}
            >

              <AntDesign
                name="export"
                color={COLOR.BUTTON_PINK}
                size={20}

              />
            </TouchableOpacity>

          </View>
        </View>

      </TouchableOpacity>
    );
  };

  // ************ 2-Bought Post Api ************
  const renderItemBoughtPostList = ({ item }) => {
    return (
      <TouchableOpacity
        style={[Styles.flatlistcontainer, { height: height * 0.255 }]}
        onPress={() =>
          props.navigation.navigate("OwnAndBuyPost", { item: item })
        }
      >
        <View>
          <View style={Styles.profileimageview}>
            {item?.mediaUrl ? (
              <Image source={{ uri: item?.mediaUrl }} style={Styles.Nftimg} />
            ) : (
              <Image
                style={Styles.Nftimg}
                source={ImagePath.COLLECTIONS_PICTURES}
              />
            )}
          </View>

          <View style={Styles.flatlistmidcontainer}>
            <View style={Styles.profilenameview}>
              {item?.buyerId[0]?.profilePic ? (
                <Image
                  style={{
                    height: 25,
                    width: 25,
                    borderRadius: 25 / 2,
                  }}
                  source={{ uri: item?.buyerId[0]?.profilePic }}
                />
              ) : (
                <Image
                  style={{ height: 25, width: 25, resizeMode: "contain" }}
                  source={ImagePath.PROFILE_PIC}
                />
              )}
              <View style={{ height: height * 0.04, width: width * 0.34 }}>
                <Text numberOfLines={2} style={Styles.usernameTxt}>{item?.postTitle}</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  // ************ 3-Transation History Render Item Api ************
  const renderItemTransactionList = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={[
          Styles.flatlistcontainer,
          { width: width * 0.92, marginVertical: 10, justifyContent: 'center' },
        ]}
      // onPress={() =>
      //   props.navigation.navigate("TransactionsDetails", {
      //     TransactionsId: item?._id,
      //   })
      // }
      >
        <View style={Styles.profileimageview}>
          <View style={Styles.KeyvalueContainer}>
            <View style={Styles.ValueContainer}>
              <Text
                style={[Styles.KeyTxtView, { marginLeft: moderateScale(10) }]}
              >
                {"Type :"}
              </Text>
            </View>
            <View style={[Styles.ValueContainer, { width: width * 0.58 }]}>
              {item?.transactionType === "BUY_AUCTION" && (
                <Text style={Styles.KeyTxtView}>
                  {"Post purchased successfully"}
                </Text>
              )}

              {item?.transactionType === "SOLD_AUCTION" && (
                <Text style={Styles.KeyTxtView}>
                  {"Auction sold successfully"}
                </Text>
              )}
              {item?.transactionType === "Sold auction" && (
                <Text style={Styles.KeyTxtView}>
                  {"Auction sold successfully"}
                </Text>
              )}

              {item?.transactionType === "BUY_POST" && (
                <Text style={Styles.KeyTxtView}>
                  {"Post purchased successfully"}
                </Text>
              )}
              {item?.transactionType === "Buy Post" && (
                <Text style={Styles.KeyTxtView}>
                  {"Post purchased successfully"}
                </Text>
              )}

              {item?.transactionType === "SOLD_POST" && (
                <Text style={Styles.KeyTxtView}>
                  {"Post sold successfully"}
                </Text>
              )}

              {item?.transactionType === "Sold Post" && (
                <Text style={Styles.KeyTxtView}>
                  {"Post sold successfully"}
                </Text>
              )}

              {item?.transactionType === "COLLECTION_SHARE_AMOUNT" && (
                <Text style={Styles.KeyTxtView}>
                  {"COLLECTION_SHARE_AMOUNT"}
                </Text>
              )}

              {item?.transactionType ===
                "COLLECTION_SUBSCRIBE_RECEIVE_COMMISSION" && (
                  <Text style={Styles.KeyTxtView}>
                    {"You have received commission of subscription"}
                  </Text>
                )}

              {item?.transactionType === "COLLECTION_SUBSCRIBE_SHARE" && (
                <Text style={Styles.KeyTxtView}>
                  {"COLLECTION_SUBSCRIBE_SHARE"}
                </Text>
              )}

              {item?.transactionType === "COLLECTION_SUBSCRIBE_RECEIVE" && (
                <Text style={Styles.KeyTxtView}>
                  {"You have subscribed a collection"}
                </Text>
              )}

              {item?.transactionType === "DEPOSIT_FOR_ADMIN" && (
                <Text style={Styles.KeyTxtView}>
                  {"Amount deposit to admin successfully"}
                </Text>
              )}

              {item?.transactionType === "DEPOSIT_FOR_USER" && (
                <Text style={Styles.KeyTxtView}>
                  {"You have successfully deposited"}
                </Text>
              )}

              {item?.transactionType === "WITHDRAW_FOR_ADMIN" && (
                <Text style={Styles.KeyTxtView}>
                  {"Amount withdraw to admin"}
                </Text>
              )}

              {item?.transactionType === "WITHDRAW_FOR_USER" && (
                <Text style={Styles.KeyTxtView}>
                  {"Amount withdraw successfully"}
                </Text>
              )}

              {item?.transactionType === "POST_PROMOTION_RECEIVE" && (
                <Text style={Styles.KeyTxtView}>
                  {"Post promotion received"}
                </Text>
              )}

              {item?.transactionType === "POST_PROMOTION_SHARE" && (
                <Text style={Styles.KeyTxtView}>
                  {"Promotion posted successfully"}
                </Text>
              )}

              {item?.transactionType === "AMOUNT_RECEIVED" && (
                <Text style={Styles.KeyTxtView}>{"Amount received"}</Text>
              )}
            </View>
          </View>

          <View style={Styles.KeyvalueContainer}>
            <View style={Styles.ValueContainer}>
              <Text
                style={[Styles.KeyTxtView, { marginLeft: moderateScale(10) }]}
              >
                {"Amount :"}
              </Text>
            </View>
            <View style={[Styles.ValueContainer, { width: width * 0.58 }]}>
              <Text style={Styles.KeyTxtView}>{item?.amount ? item?.amount : 'SHARE'}</Text>
            </View>
          </View>

          <View style={Styles.KeyvalueContainer}>
            <View style={Styles.ValueContainer}>
              <Text
                style={[Styles.KeyTxtView, { marginLeft: moderateScale(10) }]}
              >
                {"Status :"}
              </Text>
            </View>
            <View style={[Styles.ValueContainer, { width: width * 0.58 }]}>
              <Text
                style={[
                  Styles.KeyTxtView,
                  {
                    color:
                      item?.transactionStatus === "SUCCESS" ? "green" : "red",
                    fontFamily: "Montserrat-SemiBold",
                  },
                ]}
              >
                {item?.transactionStatus}
              </Text>
            </View>
          </View>

          <View style={Styles.KeyvalueContainer}>
            <View style={Styles.ValueContainer}>
              <Text
                style={[Styles.KeyTxtView, { marginLeft: moderateScale(10) }]}
              >
                {"Date :"}
              </Text>
            </View>
            <View style={[Styles.ValueContainer, { width: width * 0.58 }]}>
              <Text style={Styles.KeyTxtView}>
                {/* {item?.createdAt} */}
                {moment(item?.createdAt).format("DD-MM-YYYY, hh:mm a")}
              </Text>
            </View>
          </View>

          <View style={Styles.KeyvalueContainer}>
            <View style={Styles.ValueContainer}>
              <Text
                style={[Styles.KeyTxtView, { marginLeft: moderateScale(10) }]}
              >
                {"Coin Name :"}
              </Text>
            </View>
            <View style={[Styles.ValueContainer, { width: width * 0.58 }]}>
              <Text style={Styles.KeyTxtView}>
                {item?.coinName ? item?.coinName : "SHARE"}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      AsyncStorage.setItem("activetab", "profile")
      setOwnPostData([])
      GetProfileApi();
      getreferellist()
    })
    // UserPostApi();
    MyPurchasePostApi();
    getreferellist()

    TransactionHistoryListApi();
    MyBid();
    SubscriberApi();
    return unsubscribe;
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
          setOwnPostData([])

          setUserProfileDetails(response?.data?.result);
          CreateCollectionsApi(response?.data?.result._id); // Users unique id
          UserPostApi(response?.data?.result._id, value)  // Users unique ID
          setLoader(false);
        } else {
          alert("Something went wrong.");
          setLoader(false);
        }
      })
      .catch((err) => {
        setLoader(false);
        if (err.response.data.responseCode === 440) {
          Logout_(props)

        }
      });
    setLoader(false);
  };

  // ************ 1-My Post Api ************
  const UserPostApi = async (identifier, token) => {
    // const value = await AsyncStorage.getItem("token" || "socaltoken");
    setshowLoaderOnMyPost(true);
    // setLoader(true);
    setOwnPostData([])
    axios({
      method: "get",
      url: OwnPostList,
      headers: {
        token: token,
      },
    })
      .then(async (response) => {
        setshowLoaderOnMyPost(false)
        if (response.status === 200) {

          setOwnPostData(response?.data?.result?.docs);
          const data = [...likeDislikePost];
          response?.data?.result?.docs.filter((item, index) => {
            if (item.likesUsers.includes(identifier)) {
              data[index] = true;
            }
            else {
              data[index] = false;
            }
          })
          setlikeDislikePost(data)
          // setLoader(false);
        } else {
          // alert("Something went wrong.");
          // setLoader(false);
        }
      })
      .catch((err) => {
        setshowLoaderOnMyPost(false);
        setLoader(false);
      });
  };

  const likeDislikePostFunction = async (postIdentifier, index) => {
    // console.log('postIdentifier',postIdentifier);
    // console.log('index',index);
    const likeDislikePost_ = [...likeDislikePost];
    likeDislikePost_[index] = !likeDislikePost_[index];
    setlikeDislikePost(likeDislikePost_);
    const value = await AsyncStorage.getItem("token" || "socaltoken");
    axios({
      method: 'get',
      url: UserLikeDislikePostUrl + postIdentifier,
      headers: {
        token: value,
      },
    }).then(function (response) {
      // console.log('postLiked', response.data)
      if (response.responseCode == 200) {

      }
    }).catch(function (error) {
      // console.log('post like error: ', error);
    })
  }

  // ************ 2- My Bought Api ************
  const MyPurchasePostApi = async () => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");

    // setLoader(true);
    axios({
      method: "get",
      url: MyPostListUrl,
      headers: {
        token: value,
      },
    })
      .then(async (response) => {
        setshowLoaderOnSubscribtion(false);
        if (response.status === 200) {

          setBoughtPostData(response?.data?.result?.docs);
          // setLoader(false);
        } else {
          alert("Something went wrong.");
          // setLoader(false);
        }
      })
      .catch((err) => {
        setshowLoaderOnSubscribtion(false)
        console.log("===== Bought Collection Catch Error ======", err)
      }
      );
  };

  // ************** FlatList Refreshing Functions **************    
  function _handleRefreshPost() {
    setIsFetching2(false);
    UserPostApi();
    GetProfileApi();
  }

  function _handleRefreshBought() {
    setIsFetching(false);
    MyPurchasePostApi();
    GetProfileApi();
  }

  function _handleRefreshMyCollection() {
    setIsFetching3(false);
    // CreateCollectionsApi();
    GetProfileApi();
  }

  function _handleRefreshTransactionHistory() {
    setIsFetching4(false);
    TransactionHistoryListApi();
    GetProfileApi();
  }

  // ************ 3-My Collection Api ************
  const CreateCollectionsApi = async (identifier) => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");
    // setLoader(true);
    axios({
      method: "get",
      url: OwnCollectionsUrl,
      headers: {
        token: value,
      },
    })
      .then(async (response) => {
        setshowLoaderOnMyCollection(false);
        if (response.data.responseCode === 200) {
          setCollectionList(response?.data?.result?.docs);
          const data = [...likeDislike]
          response?.data?.result?.docs.filter((item, index) => {
            if (item.likesUsers.includes(identifier)) {
              data[index] = true;
            }
            else {
              data[index] = false;
            }
          })
          setlikeDislike(data)

          // setLoader(false);
        } else {
          setshowLoaderOnMyCollection(false)
          alert("Something went wrong.");
          // setLoader(false);
        }
      })
      .catch((err) => console.log("==== Collection List Catch Err ====", err));
  };

  const userLikedDisliked = async (collection_id, index) => {
    const likeDislike_ = [...likeDislike]
    likeDislike_[index] = !likeDislike_[index];
    setlikeDislike([...likeDislike_])
    // console.log(collection_id)
    const value = await AsyncStorage.getItem("token" || "socaltoken");
    axios({
      method: 'get',
      url: likeDislikeCollection + collection_id,
      headers: {
        token: value,
      },
    }).then(function (response) {
      if (response.data.responseCode == 200) {
        // CreateCollectionsApi()
      }
    }).catch(function (error) {
    })
  }

  // ************ 4-Transaction History Api ************
  const TransactionHistoryListApi = async () => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");

    // setLoader(true);
    axios({
      method: "get",
      url: TransactionHistoryUrl,
      headers: {
        token: value,
      },
    })
      .then(async (response) => {
        setshowLoaderOnMyTransaction(false)
        if (response.data.responseCode === 200) {
          setTransactionHistoryList(response?.data?.result?.docs);
          // setLoader(false);
        } else {
          // setLoader(false);
        }
      })
      .catch((err) => {
        setshowLoaderOnMyTransaction(false);
      });
  };


  const getreferellist = async () => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");

    // setLoader(true);
    axios({
      method: "get",
      url: `${ServerUrl}user/userDashboard`,
      headers: {
        token: value,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          setReferraldata(response.data.result)
          // setLoader(false);
        } else {
          // setLoader(false);
        }
      })
      .catch((err) => {
        console.log("==== Transaction History List Catch Err2222 ====", err.response)
      });
  };
  // ************ My Own Bid Api ************
  const MyBid = async () => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");

    setLoader(true);
    axios({
      method: "get",
      url: MyOwnBidUrl,
      headers: {
        token: value,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          setMyOwnBid(response?.data?.result?.docs);
          // props.navigation.navigate("Collections");
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

  // ************ Subscriber List Api ************
  const SubscriberApi = async () => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");

    setLoader(true);
    axios({
      method: "get",
      url: SubscriberListUrl,
      headers: {
        token: value,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          setSubscriberCount(response?.data?.result?.length);
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

  return (
    <SafeAreaView
    style={{
      flex:1
    }}
    >
      <ScrollView>


        {/* ************ Header Container ************ */}
        <ProfileHeader
          Title={true}
          HeaderTitle={userProfileDetails?.userName || userProfileDetails?.name}
          // profileUpdate={() => GetProfileApi()}
          HeaderTxtStyling={{ fontSize: height / 45 }}
          titleStyling={{ width: width * 0.85 }} // 0.8
          PostIcon={false}
          PostClick={() => setModalVisiblePost(true)}
          Menu={true}
          OpenBottomSheet={() => setModalVisible(true)}
        />

        {!loader ? (
          <View style={Styles.MainContainer}>

            {/* ************ Header Container ************ */}

            <View style={Styles.profileHeader}>
              <View style={Styles.ImageDetailsContainer}>
                {/* ************* Image and Name Container ************** */}
                <View style={[Styles.ImagesContainers]}>
                  <View style={Styles.ProfilesImgContainer}>
                    <ImageBackground
                      source={ImagePath.PROFILE_BACK_IMAGE}
                      style={{
                        height: 85,
                        width: 85,
                        justifyContent: "center",
                        alignItems: "center",
                        marginLeft: moderateScale(10),
                      }}
                    >
                      {userProfileDetails?.profilePic ? (
                        <Image
                          source={{ uri: userProfileDetails?.profilePic }}
                          style={{ height: 80, width: 80, borderRadius: 40 }}
                        />
                      ) : (
                        <Image
                          source={ImagePath.PROFILE_PIC}
                          style={{ height: 80, width: 80, borderRadius: 40 }}
                        />
                      )}
                    </ImageBackground>
                    <View style={Styles.OnlineContainer}>
                      <Image
                        source={ImagePath.STATUS}
                        resizeMode="contain"
                        style={{ position: "absolute", left: 78 }}
                      />
                    </View>
                  </View>

                  <View style={{ alignItems: "center" }}>
                    <Text style={[Styles.ProfNameTxt, { fontSize: normalize(12) }]}>
                      {userProfileDetails?.userName || userProfileDetails?.name}
                    </Text>
                  </View>
                  <View style={{}}>
                    <Text numberOfLines={2} style={[Styles.DjNameTxt, { fontSize: normalize(12) }]}>
                      {userProfileDetails?.bio}
                    </Text>
                  </View>

                </View>

                {/* ************* Post, Address Button Container ************ */}
                <View style={[Styles.PostAddBtnContainer]}>
                  <View style={[Styles.PostFollowSubscribeContainer]}>
                    <View style={[Styles.PostCountContainer]}>
                      <View style={[Styles.PostContainer]}>
                        <TouchableOpacity
                          onPress={() =>
                            props.navigation.navigate("FolloerFollowing", {
                              isFollowers: "true",
                            })
                          }
                        >
                          <Text
                            style={[Styles.TwoFourTxt, { textAlign: "center" }]}
                          >
                            {userProfileDetails?.followersCount}
                          </Text>
                          <Text style={[Styles.PostTxtView, { fontSize: normalize(12) }]}>Followers</Text>
                        </TouchableOpacity>
                      </View>

                      <View style={[Styles.FollowSubsView]}>
                        <TouchableOpacity
                          onPress={() =>
                            props.navigation.navigate("FolloerFollowing", {
                              isFollowing: "true",
                            })
                          }
                        >
                          <Text
                            style={[Styles.TwoFourTxt, { textAlign: "center", fontSize: normalize(12) }]}
                          >
                            {userProfileDetails?.following?.length}
                          </Text>
                          <Text style={[Styles.PostTxtView, { fontSize: normalize(12) }]}>Following</Text>
                        </TouchableOpacity>
                      </View>

                      <View style={[Styles.PostContainer]}>
                        <TouchableOpacity
                          onPress={() => props.navigation.navigate("Subscriber")}
                        >
                          <Text
                            style={[Styles.TwoFourTxt, { textAlign: "center" }]}
                          >
                            {subscriberCount ? subscriberCount : "0"}
                          </Text>
                          <Text style={[Styles.PostTxtView, { fontSize: normalize(12) }]}>Subscriber</Text>
                        </TouchableOpacity>
                      </View>
                    </View>

                    <View style={Styles.AddressIconContainer}>
                      <Text numberOfLines={1} style={[Styles.AddressTxt, { fontSize: normalize(12) }]}>
                        {userProfileDetails?.bnbAccount?.address.slice(0, 5)}...{userProfileDetails?.bnbAccount?.address.substr(userProfileDetails?.bnbAccount?.address.length - 15)}
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          copyToClipboard(),
                            setCopiedText(
                              userProfileDetails?.bnbAccount?.address
                            );
                        }}
                      >
                        <Image source={ImagePath.COPY_ICON} style={{}} />
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        width: width * 0.6,
                        // backgroundColor:'red',
                        alignSelf: 'center',
                        marginTop: 10,
                        marginLeft: "10%"

                      }}
                    >

                      <Text
                        style={{
                          fontSize: normalize(15),
                          color: 'white',
                          fontFamily: 'Montserrat-Medium',
                          marginTop: 5
                        }}
                      >Refferal Details</Text>
                      <Text
                        style={{
                          fontSize: normalize(10),
                          color: 'white',
                          fontFamily: 'Montserrat-Regular',
                          marginTop: 8
                        }}
                      >Sing Up Bonus : {Referraldata?.tatalSignupBonus || 0} SHARE</Text>
                      <Text
                        style={{
                          fontSize: normalize(10),
                          color: 'white',
                          fontFamily: 'Montserrat-Regular',
                          marginTop: 4
                        }}
                      >Refferral Earning : {Referraldata?.totalrefferralBonus || 0} SHARE</Text>
                      <Text
                        style={{
                          fontSize: normalize(10),
                          color: 'white',
                          fontFamily: 'Montserrat-Regular',
                          marginTop: 4
                        }}
                      >Total Refferral : {Referraldata?.totalReferralUser || 0}</Text>
                    </View>
                  </View>

                  {/* ************ Edit Profile Button Container ************ */}

                </View>

              </View>

              <View
                style={{
                  width: '90%',
                  alignSelf: 'center',
                  marginTop: 7
                }}
              >
                <View style={Styles.btnView}>
                  <View style={{ marginTop: 10 }} />
                  <TouchableOpacity
                    onPress={() => props.navigation.navigate("EditProfile")}
                    style={Styles.chatView}
                  >
                    <Text style={[Styles.donateTxt, { fontSize: normalize(12) }]}>Edit Profile</Text>
                  </TouchableOpacity>
                </View>

                {<Text
                  style={{
                    color: "#fff",
                    fontSize: 14,
                    marginTop: 24,
                    fontFamily: 'Montserrat-Regular'

                  }}
                >My refferal link : </Text>}
                {<View
                  style={{
                    backgroundColor: 'rgba(217, 217, 217, 0.1)',
                    padding: 8,
                    borderRadius: 8,
                    marginTop: 10,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: '80%',
                    // alignSelf:'center'
                  }}
                >
                  <Text
                    style={{
                      color: "rgba(255, 255, 255, 0.4)",
                      fontSize: normalize(10),
                      width: '70%'

                    }}
                    numberOfLines={1}
                  >https://social-platform.mobiloitte.org/{userProfileDetails?.referralCode || ""} </Text>
                  <TouchableOpacity
                    style={{
                      // CLip

                    }}
                    onPress={() => {
                      Clipboard.setString(`https://social-platform.mobiloitte.org/${userProfileDetails?.referralCode || ""}`)
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
                    }}
                  >
                    <Text
                      style={{
                        color: "#E31A89CC",
                        fontSize: normalize(12),
                        fontFamily: 'Montserrat-Regular'

                      }}
                    >Copy</Text>
                  </TouchableOpacity>

                </View>}
                <View
                  style={{
                    flexDirection: "row",
                    // justifyContent:"space-between",
                    marginTop: 10,
                    alignItems: 'center'

                  }}
                >
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: normalize(12),
                      fontFamily: 'Montserrat-Regular'

                    }}
                  >Referral code:</Text>
                  <Text
                    style={{
                      color: "rgba(255, 255, 255, 0.6)",
                      fontSize: normalize(10),
                      fontFamily: 'Montserrat-Regular',
                      marginLeft: 5

                    }}
                  >{userProfileDetails?.referralCode || ""} </Text>
                  <TouchableOpacity
                    onPress={() => {
                      Clipboard.setString(userProfileDetails?.referralCode)
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
                    }}
                  >
                    <Image source={ImagePath.COPY_ICON} style={{}} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* ************ Tab Container ************ */}
            <View style={Styles.DetailsAndItemActivityContainer}>
              <TouchableOpacity
                onPress={() => {
                  setSelectedString("Bought"), UserPostApi(), GetProfileApi();
                }}
              >
                <View
                  style={[
                    Styles.DetailsTabContainer,
                    {
                      borderBottomWidth: selectedString === "Bought" ? 3 : 0,

                      borderBottomColor:
                        selectedString === "Bought" ? COLOR.BUTTON_PINK : null,
                    },
                  ]}
                >
                  {selectedString === "Bought" ? (
                    <Image
                      source={ImagePath.MY_PURCHASE_COLLECTIONS_FILL}
                      style={{ height: 20, width: 26 }}
                      resizeMode="contain"
                    />
                  ) : (
                    <Image
                      source={ImagePath.GALLARY_ICON}
                      style={{ height: 20, width: 26 }}
                      resizeMode="contain"
                    />
                  )}
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setSelectedString("Bought2"), MyPurchasePostApi();
                }}
              >
                <View
                  style={[
                    Styles.DetailsTabContainer,
                    {
                      borderBottomWidth: selectedString === "Bought2" ? 3 : 0,

                      borderBottomColor:
                        selectedString === "Bought2" ? COLOR.BUTTON_PINK : null,
                    },
                  ]}
                >
                  {selectedString === "Bought2" ? (
                    <Image
                      source={ImagePath.TAG_PINK}
                      style={{ height: 22, width: 22 }}
                      resizeMode="contain"
                    />
                  ) : (
                    <Image
                      source={ImagePath.TAG_ICON}
                      style={{ height: 26, width: 26 }}
                      resizeMode="contain"
                    />
                  )}
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setSelectedString("Owned");
                }}
              >
                <View
                  style={[
                    Styles.DetailsTabContainer,
                    {
                      borderBottomWidth: selectedString === "Owned" ? 3 : 0,

                      borderBottomColor:
                        selectedString === "Owned" ? COLOR.BUTTON_PINK : null,
                    },
                  ]}
                >
                  <Image source={require("../../assets/Collection.png")}

                    style={{
                      tintColor: selectedString === "Owned" ? '#EC167F' : '#fff'
                    }}
                  />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setSelectedString("History"), TransactionHistoryListApi();
                }}
              >
                <View
                  style={[
                    Styles.DetailsTabContainer,
                    {
                      borderBottomWidth: selectedString === "History" ? 3 : 0,

                      borderBottomColor:
                        selectedString === "History" ? COLOR.BUTTON_PINK : null,
                    },
                  ]}
                >
                  {selectedString === "History" ? (
                    <Image
                      source={ImagePath.COLLECTIONS_PINK}
                      style={{ height: 22, width: 22 }}
                      resizeMode="contain"
                    />
                  ) : (
                    <Image
                      source={ImagePath.COLLECTIONS_WHITE}
                      style={{ height: 22, width: 22 }}
                      resizeMode="contain"
                    />
                  )}
                </View>
              </TouchableOpacity>
            </View>
            {/* ************ My Bundles Container ************ */}
            {selectedString === "Bought" ? (
              <View style={[Styles.MyBundleListContainer]}>
                <View style={[Styles.HeadingTxtContainer, { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginBottom: 10 }]}>
                  <Text style={Styles.HeadingView}>My Posts</Text>
                  {showLoaderOnMyPost ? <ActivityIndicator color={COLOR.BUTTON_PINK} size={20} /> :
                    <Text></Text>
                  }
                </View>
                {OwnPostData.length > 0 ? (
                  <FlatList
                    style={{ paddingBottom: 10 }}
                    data={OwnPostData}
                    renderItem={({ item, index }) => {
                      return (
                        <RenderMyPost
                          item={item}
                          index={index}
                          navigation={props.navigation}
                          likeDislikePostFunction={likeDislikePostFunction}
                          likeDislikePost={likeDislikePost}
                          props={props}
                        />
                      )
                    }}
                    numColumns={2}
                    refreshing={isFetching2}
                    onRefresh={_handleRefreshPost}
                    nestedScrollEnabled

                  />
                ) : (
                  <View style={Styles.NoDataTxtContainer}>
                    <Text style={Styles.NoDataTxt}>No Data Found...</Text>
                  </View>
                )}
              </View>
            ) : selectedString === "Bought2" ? (
              <View
                style={[
                  Styles.MyBundleListContainer,
                  // { alignItems: "flex-start" },
                ]}
              >
                <View style={[Styles.HeadingTxtContainer, { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginBottom: 10 }]}>
                  {/* <Text style={Styles.HeadingView}>My Purchased Post</Text> */}
                  <Text style={Styles.HeadingView}>
                    Subscriber's Exclusive Content
                  </Text>
                  {showLoaderOnSubscribtion && <ActivityIndicator color={COLOR.BUTTON_PINK} size={20} />}
                </View>

                {BoughtPostData.length > 0 ? (
                  <FlatList
                    style={{ width: width * 1, marginLeft: height * 0.03, paddingBottom: 10 }}
                    data={BoughtPostData}
                    renderItem={renderItemBoughtPostList}
                    numColumns={2}
                    refreshing={isFetching}
                    onRefresh={_handleRefreshBought}
                    nestedScrollEnabled
                  />
                ) : (
                  <View style={Styles.NoDataTxtContainer}>
                    <Text style={Styles.NoDataTxt}>No Data Found...</Text>
                  </View>
                )}
              </View>
            ) : selectedString === "Owned" ? (
              <View
                style={[
                  Styles.MyBundleListContainer,
                  // { alignItems: "flex-start" },
                ]}
              >
                <View style={[Styles.HeadingTxtContainer, { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginBottom: 10 }]}>
                  <Text style={Styles.HeadingView}>My Collection</Text>
                  {showLoaderOnMyCollection && <ActivityIndicator color={COLOR.BUTTON_PINK} size={20} />}
                </View>
                {CollectionList.length > 0 ? (
                  <FlatList
                    refreshing={isFetching3}
                    style={{ paddingBottom: 10 }}
                    onRefresh={_handleRefreshMyCollection}
                    data={CollectionList}
                    nestedScrollEnabled

                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    // contentContainerStyle={{ paddingBottom: height * 0.05 }}
                    renderItem={({ item, index }) => {
                      return (
                        // userProfileDetails
                        <View
                          style={[
                            Styles.flatlistcontainer,
                            { height: height * 0.285 },
                          ]}
                        >
                          <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={() =>
                              props.navigation.navigate("MyCollectionDetails", {
                                _id: item?._id,
                              })
                            }
                            style={Styles.profileimageview}
                          >
                            {CollectionList ? (
                              <Image
                                style={Styles.Nftimg}
                                source={{ uri: item?.image }}
                              />
                            ) : (
                              <Image
                                style={Styles.Nftimg}
                                source={ImagePath.COLLECTIONS_PICTURES}
                              />
                            )}
                          </TouchableOpacity>

                          <View style={Styles.flatlistmidcontainer}>
                            <View style={[Styles.profilenameview, { paddingRight: 15 }]}>
                              {item?.userId?.profilePic ? (
                                <Image
                                  style={{
                                    height: 25,
                                    width: 25,
                                    borderRadius: 25 / 2,
                                  }}
                                  source={{ uri: item?.userId?.profilePic }}
                                />
                              ) : (
                                <Image
                                  style={{
                                    height: 25,
                                    width: 25,
                                    resizeMode: "contain",
                                  }}
                                  source={ImagePath.PROFILE_PIC}
                                />
                              )}
                              <Text numberOfLines={1} style={Styles.usernameTxt}>
                                {userProfileDetails.userName}
                              </Text>
                            </View>
                            <TouchableOpacity onPress={() => userLikedDisliked(item._id, index)}>
                              {
                                likeDislike[index] ?
                                  //user liked
                                  <FontAwesome name="heart" color={COLOR.BUTTON_PINK} size={15} /> :
                                  //user not yet liked
                                  <FontAwesome name="heart-o" color={'white'} size={15} />
                              }
                            </TouchableOpacity>
                          </View>

                          <View style={Styles.flatlistmiddleview}>
                            <View style={Styles.collectioview}>
                              <View
                                style={{
                                  width: width * 0.4, // 0.23
                                  flexDirection: "row",
                                  alignItems: "center",
                                }}
                              >
                                <Image
                                  source={ImagePath.APP_ICON}
                                  style={{ height: 12, width: 12 }}
                                />
                                <Text
                                  // numberOfLines={1}
                                  style={[
                                    Styles.ethTxt,
                                    {
                                      fontSize: height / 62,
                                      marginLeft: height * 0.006,
                                    },
                                  ]}
                                >
                                  {Number(item?.amount).toFixed(2)} SHARE
                                </Text>
                              </View>

                              {/* <View
                              style={{
                                width: width * 0.18, // 0.2
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "center",
                                marginLeft: height * 0.008,
                              }}
                            >
                              <Image source={ImagePath.DURATION} />
                              <Text numberOfLines={1} style={Styles.ethTxt}>
                                {item?.duration} Days
                              </Text>
                            </View> */}
                            </View>
                          </View>
                        </View>
                      );
                    }}
                  />
                ) : (
                  <View style={Styles.NoDataTxtContainer}>
                    <Text style={Styles.NoDataTxt}>No Data Found...</Text>
                  </View>
                )}
              </View>
            ) : (
              <View style={[Styles.MyBundleListContainer, {     marginBottom:Platform.OS === "android"?height * 0.72:height * 0.64
            }]}>
                {/* {showLoaderOnMyTransaction && <ActivityIndicator style={{marginTop:20}} color={COLOR.BUTTON_PINK} size={25} />} */}
                {TransactionHistoryList.length > 0 ? (
                  <FlatList
                    data={TransactionHistoryList}
                    style={{ paddingBottom: 10 }}
                    renderItem={renderItemTransactionList}
                    refreshing={isFetching4}
                    onRefresh={_handleRefreshTransactionHistory}
                    nestedScrollEnabled

                  />
                ) : (
                  <View
                    style={[Styles.NoDataTxtContainer, { height: height * 0.4 }]}
                  >
                    <Text style={Styles.NoDataTxt}>No Data Found...</Text>
                  </View>
                )}
              </View>
            )}
          </View>
        ) : (
          <CustomLoader
            loaderStyling={{ height: height * 0.85, width: width * 1 }}
          />
        )}

        {/* ******************** Menu Bottom Sheet ******************** */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={{
              height: height * 1,
              width: width * 1,
              backgroundColor: "rgba(0,0,0,0.6)",
            }}
          >
            <View style={Styles.ModalMainContainer}>
              {/* ************ Modal Line ************ */}
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Image
                  source={ImagePath.MODAL_LINE}
                // style={{ marginTop: -verticalScale(25) }}
                />
              </TouchableOpacity>

              {/* ************ Blocking Button Container ************ */}
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate("Blocking"), setModalVisible(false);
                }}
                style={[Styles.BtnContainer, { marginTop: verticalScale(5) }]}
              >
                <View style={Styles.IconContainer}>
                  <Image
                    source={ImagePath.BLOCKING_DICON}
                    style={{ height: 22, width: 22 }}
                    resizeMode="contain"
                  />
                </View>
                <View style={Styles.BtnNameContainer}>
                  <Text style={Styles.BtnNameTxt}>Blocking</Text>
                </View>
              </TouchableOpacity>

              {/* ************ PasswordAndSecurity Button Container ************ */}
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate("PasswordAndSecurity"),
                    setModalVisible(false);
                }}
                style={[Styles.BtnContainer]}
              >
                <View style={Styles.IconContainer}>
                  <Image
                    source={ImagePath.PASSWORD_SECURITY_DICON}
                    style={{
                      marginLeft: -verticalScale(5),
                      height: 22,
                      width: 22,
                    }}
                    resizeMode="contain"
                  />
                </View>
                <View style={Styles.BtnNameContainer}>
                  <Text style={Styles.BtnNameTxt}>Password & Security</Text>
                </View>
              </TouchableOpacity>

              {/* ************ Add Interest Button Container ************ */}
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                  props.navigation.navigate("GetToKnow", { Interests: userProfileDetails.interest })
                }}
                style={[Styles.BtnContainer]}
              >
                <View style={Styles.IconContainer}>
                  <Image
                    source={ImagePath.TAG_ICON}
                    style={{
                      marginLeft: -verticalScale(5),
                      height: 22,
                      width: 22,
                      tintColor: COLOR.WHITE,
                    }}
                    resizeMode="contain"
                  />
                </View>
                <View style={Styles.BtnNameContainer}>
                  <Text style={Styles.BtnNameTxt}>Add Interest</Text>
                </View>
              </TouchableOpacity>

              {/* ************ Activity Log Button Container ************ */}
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate("ActivityLog"),
                    setModalVisible(false);
                }}
                style={[Styles.BtnContainer]}
              >
                <View style={Styles.IconContainer}>
                  <Image
                    source={ImagePath.ACTIVITY_LOG_DICON}
                    style={{ height: 22, width: 22 }}
                    resizeMode="contain"
                  />
                </View>
                <View style={Styles.BtnNameContainer}>
                  <Text style={Styles.BtnNameTxt}>Activity Log</Text>
                </View>
              </TouchableOpacity>

              {/* ************ Promotions Button Container ************ */}
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate("Promotions"), setModalVisible(false);
                }}
                style={[Styles.BtnContainer]}
              >
                <View style={Styles.IconContainer}>
                  <Image
                    source={ImagePath.ACTIVITY_LOG_DICON}
                    style={{ height: 22, width: 22 }}
                    resizeMode="contain"
                  />
                </View>
                <View style={Styles.BtnNameContainer}>
                  <Text style={Styles.BtnNameTxt}>Promotions</Text>
                </View>
              </TouchableOpacity>

              {/* ************ SAve Button Container ************ */}
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate("SaveToWishlist"),
                    setModalVisible(false);
                }}
                style={[Styles.BtnContainer]}
              >
                <View style={Styles.IconContainer}>
                  <Image
                    source={ImagePath.ATTACH_ICON}
                    style={{ height: 22, width: 22 }}
                    resizeMode="contain"
                  />
                </View>
                <View style={Styles.BtnNameContainer}>
                  <Text style={Styles.BtnNameTxt}>Saved</Text>
                </View>
              </TouchableOpacity>

              {/* ************ Logout Button Container ************ */}
              <TouchableOpacity
                // onPress={() => setModalVisibleLogout(true)}
                onPress={() => {
                  setModalVisibleLogout(true), setModalVisible(false);
                }}
                style={[Styles.BtnContainer]}
              >
                <View style={Styles.IconContainer}>
                  <Image
                    source={ImagePath.LOGOUT_DICON}
                    style={{ height: 23, width: 23 }}
                    resizeMode="contain"
                  />
                </View>
                <View style={Styles.BtnNameContainer}>
                  <Text style={Styles.BtnNameTxt}>Logout</Text>
                </View>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>

        {/* ************ Logout Confirmation Modal ************ */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisibleLogout}
          onRequestClose={() => {
            setModalVisibleLogout(false);
          }}
        >
          <View style={Styles.LogoutmainContainer}>
            <View style={Styles.LogoutModalSubContainer}>
              <View style={Styles.LogoutHeadingContainer}>
                <View style={{ height: height * 0.07, justifyContent: "center" }}>
                  <Text
                    style={[
                      Styles.LogoutHeadingTxtContainer,
                      { fontFamily: "Montserrat-Medium", fontSize: height / 30 },
                    ]}
                  >
                    Logout
                  </Text>
                </View>
                <View style={{ height: height * 0.08, justifyContent: "center" }}>
                  <Text
                    style={[
                      Styles.LogoutHeadingTxtContainer,
                      { fontFamily: "Montserrat-Regular" },
                    ]}
                  >
                    Are you sure, you want to Logout ?
                  </Text>
                </View>

                <View style={Styles.LogoutButtonMainContainer}>

                  <View style={Styles.LogoutbtnContainer}>
                    <AppButton
                      title="No"
                      type="small"
                      textStyle={{
                        fontFamily: "Montserrat-SemiBold",
                        fontSize: height / 52,
                        //
                      }}
                      btnStyling={{
                        backgroundColor: "#626262",
                      }}
                      ButtonPress={() =>
                        setModalVisibleLogout(!modalVisibleLogout)
                      }
                    />
                  </View>
                  <View style={Styles.LogoutbtnContainer}>
                    <AppButton
                      title="Yes"
                      type="small"
                      textStyle={{
                        fontFamily: "Montserrat-SemiBold",
                        fontSize: height / 52,
                      }}
                      ButtonPress={() => logOut()}
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

export default Profile;
