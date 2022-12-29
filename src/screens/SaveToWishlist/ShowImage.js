// import React, { useState } from "react";
// import {
//   Dimensions,
//   ImageBackground,
//   StyleSheet,
//   Text,
//   View,
// } from "react-native";
// import { verticalScale } from "react-native-size-matters";
// import ProfileHeader from "../../components/CustomHeader/ProfileHeader";
// const { height, width } = Dimensions.get("window");

// const ShowImage = (props) => {
//   const [url, setUrl] = useState("");
//   return (
//     <View>
//       {/* ************ Header Container ************ */}

//       <ImageBackground
//         source={{ uri: props?.route?.params?.url }}
//         style={{ height: height * 1, width: width * 1 }}
//         resizeMode="contain"
//       >
//         <ProfileHeader
//           BackIcon={true}
//           Title={true}
//           titleStyling={{
//             width: width * 0.75,
//             alignItems: "center",
//           }}
//           onBackPress={() => props.navigation.goBack()}
//           BackIconStyling={{ marginLeft: verticalScale(10) }}
//           PostIcon={false}
//           Menu={false}
//           ShareIcon={false}
//         />
//       </ImageBackground>
//     </View>
//   );
// };

// export default ShowImage;

// const styles = StyleSheet.create({});
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
  Share,
  ScrollView,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import ProfileHeader from "../../components/CustomHeader/ProfileHeader";
import { verticalScale } from "react-native-size-matters";
import { ImagePath } from "../../constants/ImagePath";
import { COLOR } from "../../Utils/Colors";
import moment from "moment";
import {
  AddRemoveFromWishList,
  GetUserProfileUrl,
  PostShareUrl,
  UserLikeDislikePostUrl,
} from "../../restAPI/ApiConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { showMessage } from "react-native-flash-message";
const { height, width } = Dimensions.get("window");

const ShowImage = (props) => {
  const [allPost, setAllPost] = useState({});
  const [loader, setLoader] = useState(false);
  const [PostShare, setPostShare] = useState("");
  const [userid,setUserID]=useState("")

  // ******************** Share Message Functionality ********************
  const ShareMessage = async (PostShare) => {
    console.log("==== PostShare ====", PostShare);
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

  // ************ Post Share Api ************
  const SharePostApi = async (id) => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");

    setLoader(true);
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
          console.log("====== Post Share Response ======", response);
          setPostShare(response?.data?.result);
          ShareMessage(response?.data?.result);
          setLoader(false);
        } else {
          alert("Something went wrong.");
          setLoader(false);
        }
      })
      .catch((err) => console.log("=====Post Share Catch Error ======", err));
  };
   
  // ************ Post Share Api ************
  const getpostdetails = async (id,userid) => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");
    setLoader(true);
    axios({
      method: "get",
      url:  "https://node.bitfuxi.co.uk/api/v1/user/postView",
      params: {
        postId: id,
      },
      headers: {
        token: value,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          setIAgree(!response.data.result.likesUsers.includes(userid))
          setAllPost(response?.data?.result);
          setLoader(false);
        } else {
          alert("Something went wrong.");
          setLoader(false);
        }
      })
      .catch((err) => console.log("=====Post Share Catch Error ======", err.response));
  };
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
          setUserID(response?.data?.result._id)
          getpostdetails(props?.route?.params?.allPost._id,response?.data?.result._id)
          
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
  const [iAgree, setIAgree] = useState(null);
  const toggleIAgree = () => {
    setIAgree(false);
    LikePostApi();
  };

  const _toggleIAgree = () => {
    setIAgree(true);
    LikePostApi();
  };
useEffect(()=>{
  GetProfileApi()
},[])
  // ************ Like Post Api ************
  const LikePostApi = async () => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");

    setLoader(true);
    axios({
      method: "get",
      url: UserLikeDislikePostUrl + `${allPost?._id}`,
      headers: {
        token: value,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          console.log("====== Post Share Response ======", response);
          getpostdetails(props?.route?.params?.allPost._id,userid)
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
      .catch((err) => console.log("=====Post Share Catch Error ======", err));
  };

  // ************ Add To Wish List Api Call ************
  const AddRemoveToWishListApi = async (id) => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");
    console.log("==== Log Id Check =====", id);

    const formData = new FormData();
    formData.append({
      postId: allPost?._id,
    });

    setLoader(true);
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
          getpostdetails(props?.route?.params?.allPost?._id,userid)
          console.log("==== Add to Wishlist Response ====", response);
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
      .catch((err) => console.log("===== Add to Wishlist Api err ======", err));
  };

  return (
    <SafeAreaView>
      <View style={Styles.MainContainer}>
        <ProfileHeader
          BackIcon={true}
          Title={true}
          HeaderTitle="Post Details"
          // titleStyling={{ width: width * 0.75, alignItems: "center" }}
          titleStyling={{ width: width * 0.7 }}
          HeaderTxtStyling={{ marginLeft: height * 0.04 }}
          onBackPress={() => props.navigation.goBack()}
          BackIconStyling={{ marginLeft: verticalScale(10) }}
          PostIcon={false}
          Menu={false}
          ShareIcon={false}
        />

        {/* ************ Post Container ************ */}

        <View style={Styles.PostMainContainer}>
          {/* ************ Image, name & More Container ************ */}
          <View style={Styles.ImgNameMoreContainer}>
            <View style={{ width: width * 0.15 }}>
              {allPost?.userId?.profilePic ? (
                <Image
                  source={{ uri: allPost?.userId?.profilePic }}
                  style={{ height: 42, width: 42, borderRadius: 42 / 2 }}
                />
              ) : (
                <Image
                  source={ImagePath.PROFILE_PIC}
                  style={{ height: 42, width: 42 }}
                />
              )}
            </View>
            <View style={{ width: width * 0.64 }}>
              <Text
                numberOfLines={1}
                style={{
                  fontSize: height / 50,
                  color: COLOR.WHITE,
                  fontFamily: "Montserrat-SemiBold",
                }}
              >
                {allPost?.userId?.userName || allPost?.userId?.name}
              </Text>
            </View>
            <View style={{ width: width * 0.15, alignItems: "flex-end" }}>
              <Image
                source={ImagePath.VERTICAL_MORE}
                style={{ height: 15, width: 15, resizeMode: "contain" }}
              />
            </View>
          </View>

          {/* ************ Post Image Container ************ */}
          <View style={Styles.PostMediaContainer}>
            {allPost?.mediaUrl ? (
              <Image
                source={{ uri: allPost?.mediaUrl }}
                style={{ height: 250, width: "100%" }}
                resizeMode="contain"
              />
            ) : (
              <Image
                source={ImagePath.COLLECTION_DETAILS_ONE}
                style={{ height: 250, width: "100%" }}
              />
            )}
          </View>

          {/* ************ Comments, Like, Share, Remove Wish List Container ************ */}
          <View style={Styles.ThirdPartContainer}>
            <View style={Styles.LikeCommentContainer}>
              {iAgree!=null&&<TouchableOpacity
                style={Styles.SectionThreeContainer}
                onPress={() => (iAgree ? toggleIAgree() : _toggleIAgree())}
              >
                <Image
                  source={iAgree ? ImagePath.LIKE : ImagePath.HEART_LIKE}
                  // style={{ height: 18, width: 18 }}
                  resizeMode="contain"
                />
              </TouchableOpacity>}

              <TouchableOpacity
                style={Styles.SectionThreeContainer}
                onPress={() =>
                  props.navigation.navigate("Comments", {
                    _id: allPost?._id,
                    nftId: allPost?._id,
                  })
                }
              >
                <Image
                  source={ImagePath.HOME_COMMENTS}
                  style={{ height: 22, width: 22, resizeMode: "contain" }}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={Styles.SectionThreeContainer}
                onPress={() => SharePostApi(props?.route?.params?.allPost?._id)}
              >
                <Image
                  source={ImagePath.HEADER_SHARE}
                  style={{ height: 20, width: 20, resizeMode: "contain" }}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={Styles.WishListContainer}
              onPress={() => AddRemoveToWishListApi()}
            >
              <Image
                source={ImagePath.ADDED_TO_WISHLIST}
                style={{ marginRight: 5 }}
              />
            </TouchableOpacity>
          </View>

          {/* ************ Likes Container ************ */}
          <View style={Styles.LikesCountContainer}>
            <Text style={Styles.LikesCountTxt}>
              {allPost?.likesCount} Likes
            </Text>
          </View>

          {/* ************ Date Container ************ */}
          <TouchableOpacity
            style={Styles.LikesCountContainer}
            onPress={() =>
              props.navigation.navigate("Comments", {
                _id: allPost?._id,
                nftId: allPost?._id,
              })
            }
          >
            <Text style={Styles.LikesCountTxt}>
              View all {allPost?.comment?.length} comments
            </Text>
          </TouchableOpacity>

          {/* ************ Date Container ************ */}
          <View style={Styles.LikesCountContainer}>
            <Text style={Styles.DateTxt}>
              {moment(allPost?.createdAt).local().fromNow()}
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ShowImage;

const Styles = StyleSheet.create({
  MainContainer: {
    height: height * 1,
    width: width * 1,
    alignItems: "center",
    backgroundColor: COLOR.BLACK,
  },
  PostMainContainer: {
    height: height * 0.58,
    width: width * 1,
    alignItems: "center",
  },
  ImgNameMoreContainer: {
    height: height * 0.09,
    width: width * 0.94,
    alignItems: "center",
    flexDirection: "row",
  },
  PostMediaContainer: {
    height: height * 0.35,
    width: width * 1,
    justifyContent: "center",
  },
  SectionThreeContainer: {
    height: height * 0.06,
    justifyContent: "center",
    alignItems: "center",
  },
  ThirdPartContainer: {
    height: height * 0.06,
    width: width * 0.944,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  LikeCommentContainer: {
    height: height * 0.06,
    width: width * 0.4,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  WishListContainer: {
    height: height * 0.06,
    width: width * 0.54,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  LikesCountContainer: {
    height: height * 0.03,
    width: width * 0.94,
  },
  LikesCountTxt: {
    fontSize: height / 50,
    fontFamily: "Montserrat-Medium",
    color: COLOR.WHITE,
  },
  DateTxt: {
    fontSize: height / 55,
    fontFamily: "Montserrat-Regular",
    color: COLOR.GREY,
  },
});
