import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
  Dimensions,
  TextInput,
  Keyboard,
  Text,
  ScrollView,
  Platform
} from "react-native";
import {
  CommentOnStoryUrl,
  ExpiredStoryUrl,
  StoryLikeUrl,
  StoryListWithFollowingApiUrl,
} from "../../restAPI/ApiConfig";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StoryContainer } from "react-native-stories-view";
import { ImagePath } from "../../constants/ImagePath";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { showMessage } from "react-native-flash-message";
import Ionicons from 'react-native-vector-icons/Ionicons'
import { COLOR } from "../../Utils/Colors";
import { normalize } from "../../../ResponsiveFontSize";

const { height, width } = Dimensions.get("window");

const Status = (props, { navigation }) => {
  const [router, setRouter] = useState(props?.route?.params);
  const profilePictures = { uri: props?.route?.params?.profilePic };

  const [loader, setLoader] = useState(false);
  const [id, setId] = useState(props?.route?.params?.name);
  const [storyListing, setStoryListing] = useState([]);
  const [newStory, setNewStory] = useState([]);
  const [myStoryListId, setMyStoryListId] = useState([]);
  const [newPushStory, setNewPushStory] = useState([]);

  const [storyId, setStoryId] = useState([]);
  const [commentsMsg, setCommentsMsg] = useState("");

  useEffect(() => {
    ExpireStory();
    // if (storyListing) {
    // StoryListingApi();
    // }
  }, [props]);

  // ********** Like Story State & Functions **********
  const [iAgree, setIAgree] = useState(true);
  const toggleIAgree = () => {
    setIAgree(false);
    LikeStory();
  };
  const _toggleIAgree = () => {
    setIAgree(true);
    LikeStory();
  };

  // ************ Story Expires Api ************
  const ExpireStory = async () => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");

    setLoader(true);
    axios({
      method: "get",
      url: ExpiredStoryUrl,
      headers: {
        token: value,
      },
    })
      .then(async (response) => {
        console.log(response.data)
        if (response.data.responseCode === 200) {
          StoryListingApi();

          setLoader(false);
        } else {
          alert("Something went wrong.");
          setLoader(false);
        }
      })
      .catch((err) => console.log("===== Expired Story err ======", err));
  };

  const ImageExtension = {
    png: "image",
    jpg: "image",
    jpeg: "image",
  };

  const filetype = (url) => {
    newurl = decodeURIComponent(url);
    if (newurl) {
      var matches = newurl.match(/\/([^\/?#]+)[^\/]*$/);
      if (matches.length > 1) {
        const filename = matches[1];
        return ImageExtension[filename.split(".")[1]]
          ? ImageExtension[filename.split(".")[1]]
          : "video";
      }
    }
    return "";
  };
  // ************ Story List Api ************
  const StoryListingApi = async () => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");

    setLoader(true);
    console.log(id,"id")
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
        console.log(response.data)
        if (response.data.responseCode === 200) {
          if(response.data.responseCode === 200&&response.data.result!="Data not found."){

            setMyStoryListId(response?.data?.result.story);
            let arr = [];
            let arrId = [];
            setStoryListing(
              response?.data?.result.map((item) => {
                return (
                  setNewStory(item?.story[0]),
                  arrId.push(item?._id),
                  arr.push(item.story[0])
                  // console.log("====== Push in array ====", item?._id)
                );
              })
            );
            setNewPushStory(arr);
            setStoryId(arrId);
          }

          setLoader(false);
        } else {
          alert("Something went wrong.");
          setLoader(false);
        }
      })
      .catch((err) => console.log("===== Story List Post err ======", err));
    setLoader(false);
  };

  // ************ Story List Api ************
  const CommentsOnStory = async (index) => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");

    const DATA = new FormData();
    DATA.append({
      storyId: storyId[0],
      message: commentsMsg,
    });

    setLoader(true);
    axios({
      method: "post",
      url: CommentOnStoryUrl,
      data: DATA?._parts[0][0],
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
          setLoader(false);
        } else {
          alert("Something went wrong.");
          setLoader(false);
        }
      })
      .catch((err) =>
        console.log("===== Comments on Story Catch Error ======", err)
      );
  };

  // ************ Story Like Api ************
  const LikeStory = async () => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");

    const DATA = new FormData();
    DATA.append({
      storyId: storyId[0],
    });

    setLoader(true);
    axios({
      method: "post",
      url: StoryLikeUrl,
      data: DATA?._parts[0][0],
      headers: {
        token: value,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          alert(response?.data?.responseMessage);
          setLoader(false);
        } else {
          alert("Something went wrong.");
          setLoader(false);
        }
      })
      .catch((err) => console.log("===== Story Like Catch Error ======", err));
  };

  return (
    <SafeAreaView>
      <StatusBar backgroundColor={"black"} barStyle="light-content" />
      <ScrollView>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          enableAutomaticScroll
          style={{ width: width * 1, height: height * 1 }}
        >
          <View style={Styles.MainCcontainer}>
            <View style={{ width: width * 1, height: height * 1 }}>
              {props?.route?.params?.User == "Self" ? (
                <StoryContainer
                  visible={true}
                  enableProgress={true}
                  progressIndex={0}
                  images={newPushStory}
                  duration={30}
                  onComplete={() => props.navigation.goBack()}
                  barStyle={{ barHeight: 2 }}
                  containerStyle={{ height: "100%", width: "100%" }}
                  userProfile={{
                    userImage: profilePictures
                      ? profilePictures
                      : ImagePath.PROFILE_PIC,
                    userName: router?.userName,
                    onImageClick: () => console.log("lskndclksnc"),
                  }}
                  style={{ height: 54 }}
                  footerComponent={
                    <View style={Styles.BottomContainer}>
                    </View>
                  }
                  
                />
              ) : (
                <StoryContainer
                  visible={true}
                  enableProgress={true}
                  progressIndex={0}
                  images={newPushStory}
                  duration={30}
                  onComplete={() => props.navigation.goBack()}
                  barStyle={{ barHeight: 2 }}
                  containerStyle={{ height: "100%", width: "100%" }}
                  userProfile={{
                    userImage: profilePictures
                      ? profilePictures
                      : ImagePath.PROFILE_PIC,
                    userName: router?.userName || router?.name,
                    onImageClick: () => console.log("lskndclksnc"),
                  }}
                  style={{ height: 54 }}
                  footerComponent={
                    <View style={Styles.BottomContainer}>
                      <TextInput
                        placeholder="Send message"
                        placeholderTextColor="white"
                        style={Styles.SendMsgContainer}
                        onChangeText={(txt) => setCommentsMsg(txt)}
                        
                      />

                      <TouchableOpacity onPress={() => CommentsOnStory()}>
                        <Image
                          source={ImagePath.MESSENGER}
                          style={{ height: 36, width: 36 }}
                        />
                      </TouchableOpacity>
                    </View>
                  }
                />
              )}
            </View>
            <TouchableOpacity
              onPress={() => props.navigation.goBack()}
              style={{
                alignSelf: "flex-end",
                height: 10,
                position: "absolute",
                top: 30,
              }}
            >
              <Image
                source={require("../../assets/Cross.png")}
                style={{
                  height: 20,
                  width: 20,
                  tintColor: "white",
                  marginRight: height * 0.015,
                }}
              />
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Status;

const Styles = StyleSheet.create({
  MainCcontainer: {
    backgroundColor: "black",
    height: "100%",
    position: "relative",
    alignItems: "center",
  },
  AnimateMainContainer: {
    height: 3,
    width: "95%",
    borderWidth: 1,
    backgroundColor: "grey",
    position: "absolute",
    top: 18,
  },
  AnimateContainer: {
    height: "100%",
    backgroundColor: "white",
  },
  SubHeadingContainer: {
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    top: 14,
    left: 0,
    width: "90%",
  },
  ProfileImgContainer: {
    borderRadius: 100,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  BottomContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginBottom: '8%',
    // width: "100%",
  },
  SendMsgContainer: {
    borderRadius: 25,
    borderColor: "white",
    width: "85%", // "75%"
    height: 50,
    padding: 10,
    borderWidth: 1,
    fontSize: height / 50,
    color: "white",
  },
  NameCrossContainer: {
    // justifyContent: "space-between",
    justifyContent: "flex-end",
    // alignItems: "center",
    flexDirection: "row",
    // width: "100%",
    width: width * 0.93,
  },
});
