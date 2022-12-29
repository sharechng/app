import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Image,
  FlatList,
  Platform,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";

import { ImagePath } from "../../constants/ImagePath";
import { COLOR } from "../../Utils/Colors";
import ProfileHeader from "../../components/CustomHeader/ProfileHeader";
import { verticalScale, scale, moderateScale } from "react-native-size-matters";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
const { height, width } = Dimensions.get("window");
import { CreatorsList, GetUserProfileUrl } from "../../restAPI/ApiConfig";
import moment from "moment";
import CustomLoader from "../../components/CustomLoader/CustomLoader";
import CryptoJS from "crypto-js";
import { Logout_ } from "../../../Logout";

const ChatList = (props) => {
  const [loader, setLoader] = useState(false);
  const [CreatorListing, setCreatorListing] = useState([]);
  const [UserProfileDetails, setUserProfileDetails] = useState({});
  const [Search, setSearch] = useState("");
  const [TrenAuctions, setTrenAuctions] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [showChatHistory, setShowChatHistory] = useState([]);
  const[searchdata,setSearchdata]=useState([]);

  useEffect(() => {
    GetProfileApi();
    setSearchdata([]);
  }, [props.route]);

  // *********** Country Code Search Functions ***********
  const SeacrFunct = (value) => {
    setCreatorListing(TrenAuctions);
    setIsSearch(true);
    if (value !== "") {
      let mydata = CreatorListing.filter((item, index) => {
        if (item.userName.toLowerCase().includes(value.toLowerCase())) {
          return item?.userName || item?.name;
        }
      });
      setCreatorListing(mydata);
    } else {
      setIsSearch(false);
    }
  };

  // ******************** Profile Details Api ********************
  const GetProfileApi = async () => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");
    // console.log("====== my token======>>>>", value);

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
          // console.log("====== Get User Profile Response ======", response);
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
        // console.log("===== Get Profile Catch Error ======", err);
        setLoader(false);
      });
    setLoader(false);
  };

  useEffect(() => {
    const web = new WebSocket(`wss://node.bitfuxi.co.uk`);

    if (UserProfileDetails && UserProfileDetails._id) {
      try {
        web.onopen = () => {
          const dataToSend = {
            type: "ChatHistory",
            senderId: UserProfileDetails._id,
          };

          web.send(JSON.stringify(dataToSend));
          web.onmessage = async (event) => {
            if (event.data !== "[object Promise]" && event.data !== "null") {
              let obj = JSON.parse(event.data);
              // console.log("---- 242 event ----", obj);

              // setChatHistoryMessage(obj.result);
              setShowChatHistory(obj.result);
            }
          };
        };
        return () => {
          web.close();
          // setChatMessageData();
        };
      } catch (err) {
        // setChatMessageData();
      }
    }
  }, [UserProfileDetails]);

  // ******************** Creator List Api Call ********************
  const CreatorListApi = async (search) => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");
    if(String(search).trim("")){

      axios({
        method: "get",
        url: "https://node.bitfuxi.co.uk/api/v1/user/searchUserNameForsignUpTime",
        params: {
          search: search,
        },
        headers: {
          token: value,
        },
      })
        .then(async (response) => {
          if (response.data.responseCode === 200) {
            // console.log("====== Online User List Response ======", response?.data?.result?.docs);
            setSearchdata(response?.data?.result?.docs);
           
          } else {
          }
        })
        .catch((err) => {
          setLoader(false);
          if(err.response.data.responseCode===440){
            Logout_(props)
  
          }
          // console.log("===== Online User List Api err ======", err.response.data)
        });
    }else{
      setSearchdata([]);
    }

  };
  const getlastmessage = (chat) => {
    let date = ""
    try {
      date = moment(chat?.messages[chat.messages.length - 1].createdAt).format("hh:mm A");

    } catch (error) {

    }
    return date

  }
  const getlastchat = (chat) => {
    let date = ""
    try {
      date = decryptMessage(
        chat?.messages[chat.messages.length - 1].message,
        chat?.senderId._id,
        chat?.receiverId._id,
        chat?.messages[chat.messages.length - 1].mediaType,
        chat?.messages[chat.messages.length - 1].receiverId,
      );

    } catch (error) {

    }
    return date
  }
  const decryptMessage = (message, senderid, receiverId, mediaType, mssgreceiverId1) => {
    if (mediaType == "text") {
      const chatObj = message;
      const userIddd = mssgreceiverId1 == senderid ? receiverId : senderid;
      var mssg = ""
      try {
        const bytes = CryptoJS.AES.decrypt(chatObj, userIddd);

        mssg = bytes.toString(CryptoJS.enc.Utf8);
      } catch (error) {

      }

    } else {
      mssg = "file"
    }

    return mssg;
  }

  return (
    <SafeAreaView>
      <View style={styles.Maincontainer}>
        {/* ************ Header Container ************ */}
        <ProfileHeader
          BackIcon={true}
          Title={true}
          HeaderTitle="Chats"
          onBackPress={() => props.navigation.goBack()}
          // titleStyling={{ width: width * 0.7 }}
          titleStyling={{ width: width * 0.7 }}
          HeaderTxtStyling={{ marginLeft: height * 0.04 }}
          BackIconStyling={{ marginLeft: verticalScale(10) }}
          PostIcon={false}
          Menu={false}
          ShareIcon={false}
          SearchIcon={false}
        />

        {/* ************ Search Box ************ */}
        <View style={styles.SearchContainer}>
          <View>
            <TextInput
              placeholder="Search here..."
              placeholderTextColor={COLOR.CHAT_LIST_SEARCH}
              style={{
                height: height * 0.075,
                width: width * 0.4,
                fontSize: height / 52,
                fontFamily: "Montserrat-Medium",
                color: COLOR.WHITE,
                padding: 8,
              }}
              onChangeText={(txt) => {
                setSearch(txt), CreatorListApi(txt);
              }}
            />
          </View>
          <TouchableOpacity onPress={() => { }} style={{}}>
            <Image
              source={ImagePath.TAB_SEARCH_WHITE}
              style={{ height: 20, width: 20, marginRight: moderateScale(10) }}
            />
          </TouchableOpacity>
        </View>

        {/* chat?.receiverId?._i ---->> user id */}
        {/* ************ Search Data List ************ */}
        {searchdata.length==0&&<View style={styles.flatlistuppercontainer}>
          {!loader ? (
            <>
              {showChatHistory &&
                showChatHistory.map((chat, i) => {
                  return (
                    <>
                      {chat?.receiverId &&
                        chat?.receiverId?._id != UserProfileDetails?._id ? (
                        <TouchableOpacity
                          key={i}
                          // onPress={() => {
                          //   changeChat(chat);
                          // }}
                          onPress={() => {

                            // console.log(chat.receiverId?.name)
                            props.navigation.navigate("Chat", {
                              // receiverId: item?._id,
                              // completeDetails: item,
                              receiverId: chat?.receiverId?._id,
                              completeDetails: chat,
                            })
                          }
                          }
                        >
                          <View style={styles.SecondSectionContainer}>
                            {/* ---- Profile Pics Container ---- */}
                            <View style={styles.ProfileImgContainers}>
                              {chat?.receiverId &&
                                chat?.receiverId?.profilePic ? (
                                <Image
                                  source={{ uri: chat?.receiverId?.profilePic }}
                                  style={{
                                    height: 35,
                                    width: 35,
                                    borderRadius: 35 / 2,
                                  }}
                                />
                              ) : (
                                <Image
                                  source={ImagePath.PROFILE_PIC}
                                  style={{ height: 30, width: 30 }}
                                />
                              )}
                            </View>

                            {/* ---- Profile Name Container ---- */}
                            <View style={styles.ProfileNameContainer}>
                              <Text style={{
                                color: "white",

                              }}>{" "}{chat?.receiverId?.userName ? chat?.receiverId?.userName : chat.receiverId?.name ? chat.receiverId?.name : chat?.receiverId?.bnbAccount?.address}
                              </Text>
                              <Text
                              numberOfLines={1}
                                style={styles.txtchat}
                              >{" "}{getlastchat(chat)}</Text>
                            </View>
                            <View
                              style={{
                              }}
                            >
                              <Text
                                style={{
                                  color: "#BBB6B6",
                                  fontWeight: "400",
                                  fontSize: 9
                                }}

                              >{getlastmessage(chat)} </Text>
                              <View
                                style={[styles.viewdot, {
                                  backgroundColor: chat?.receiverId?.isOnline ? "green" : "#ccc"
                                }]}
                              />


                            </View>



                          </View>
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          onPress={() =>
                            props.navigation.navigate("Chat", {
                              receiverId: chat?.senderId?._id,
                              completeDetails: chat,
                            })
                          }
                          key={i}
                        // onClick={() => {changeChat(chat)}}
                        >
                          <View style={styles.SecondSectionContainer}>
                            {/* ---- Profile Pics Container ---- */}
                            <View style={styles.ProfileImgContainers}>
                              {/* <Image
                                source={
                                  chat.senderId && chat.senderId.profilePic
                                    ? chat.senderId.profilePic
                                    : "images/Activity.png"
                                }
                                style={{}}
                              /> */}
                              {chat?.senderId && chat?.senderId?.profilePic ? (
                                <Image
                                  source={{ uri: chat?.senderId?.profilePic }}
                                  style={{
                                    height: 35,
                                    width: 35,
                                    borderRadius: 35 / 2,
                                  }}
                                />
                              ) : (
                                <Image
                                  source={ImagePath.PROFILE_PIC}
                                  style={{ height: 35, width: 35 }}
                                />
                              )}
                            </View>

                            {/* ---- Profile Name Container ---- */}
                            <View style={styles.ProfileNameContainer}>
                              <Text
                                numberOfLines={1}
                                style={{
                                  color: "white",
                                }}
                              >{" "} {chat?.senderId?.userName
                                ? chat?.senderId?.userName
                                : chat?.senderId?.bnbAccount?.address}
                              </Text>
                              <Text
                                style={styles.txtchat}
                                numberOfLines={1}

                              >{" "} {getlastchat(chat)}</Text>
                            </View>
                            <View
                              style={{
                              }}
                            >
                              <Text
                                style={{
                                  color: "#BBB6B6",
                                  fontWeight: "400",
                                  fontSize: 9
                                }}
                              >{getlastmessage(chat)} </Text>
                              <View
                                style={[styles.viewdot, {
                                  backgroundColor: chat?.receiverId?.isOnline ? "green" : "#ccc"
                                }]}
                              />


                            </View>

                            {/* ---- 3rd Container ---- */}
                            {/* <View style={styles.UnreadMsgContainer}>
                              {chat?.unReadCount > 0 && (
                                <View>
                                  <Text style={{ color: "white" }}>
                                    {chat?.unReadCount}
                                  </Text>
                                </View>
                              )}
                            </View> */}
                          </View>
                        </TouchableOpacity>
                      )}
                    </>
                  );
                })}
            </>
          ) : (
            <CustomLoader
              loaderStyling={{ height: height * 0.85, width: width * 1 }}
            />
          )}
        </View>}
        {
          searchdata.length>0&&<View style={styles.flatlistuppercontainer}>
            {
              searchdata.map((item, i) => {
                return(
                  <TouchableOpacity
                  onPress={() =>{
                    console.log(item)
                    // props.navigation.navigate("AboutCreator", {
                    //   nftId: item?._id,
                    // })
                    props.navigation.navigate("Chat", {
                      receiverId: item?._id,
                      completeDetails: item,
                    })
                  }
                  }
                >
                  <View
                    style={{
                      flexDirection: "row",
                      height: 30,
                      alignItems: "center",
                      marginVertical: 2,
                      width: width * 0.9,
                      alignSelf: "center",
                    }}
                  >
                    {item.profilePic ? (
                      <Image
                        source={{ uri: item.profilePic }}
                        style={{
                          height: 30,
                          width: 30,
                          borderRadius: 30 / 2,
                          marginHorizontal: 5,
                        }}
                      />
                    ) : (
                      <Image
                        source={ImagePath.PROFILE_PIC}
                        style={{
                          height: 30,
                          width: 30,
                          borderRadius: 30 / 2,
                          marginHorizontal: 5,
                        }}
                      />
                    )}
                    <Text
                      numberOfLines={2}
                      style={{
                        color: COLOR.WHITE,
                        fontSize: height / 80,
                        fontFamily: "Montserrat-Regular",
                      }}
                    >
                      {item?.userName || item?.name
                        ? item?.userName || item?.name
                        : "."}
                    </Text>
                  </View>
                </TouchableOpacity>
                )
              })
            }

            </View>
        }
      </View>
    </SafeAreaView>
  );
};

export default ChatList;

const styles = StyleSheet.create({
  txtchat: {
    color: "#BBB6B6",
    fontWeight: "400",
    fontSize: 10,
    marginTop: 2,
    width:'80%'
  },
  viewdot: {
    width: 10,
    height: 10,
    borderRadius: 10 / 2,
    alignSelf: 'flex-end',
    marginTop: 5
  }
  ,
  Maincontainer: {
    height: height * 1,
    width: width * 1,
    alignItems: "center",
    backgroundColor: COLOR.BACKGROUND_THEME,
  },
  searchview: {
    height: height * 0.11,
    width: width * 0.9,
    alignSelf: "center",
    justifyContent: "center",
  },
  searchtxtinputview: {
    height: height * 0.06,
    width: width * 0.9,
    backgroundColor: COLOR.TXT_INPT_COLOR,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: COLOR.RIGHT_BORDER_WIDTH,
    flexDirection: "row",
    alignItems: "center",
  },
  searchTxtinput: {
    height: height * 0.06,
    width: width * 0.75,
    justifyContent: "center",
  },
  searchImg: {
    height: height * 0.06,
    width: width * 0.13,
    justifyContent: "center",
    alignItems: "center",
  },
  flatlistuppercontainer: {
    alignSelf: "center",
    marginBottom: verticalScale(5),
    height: Platform.OS === "android" ? height * 0.9 : height * 0.94, // 0.85
  },
  flatlistcontainer: {
    height: height * 0.08,
    width: width * 0.94, // 0.9
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  profilepicview: {
    height: height * 0.06,
    width: width * 0.12,
    borderRadius: 100,
    justifyContent: "center",
    // alignItems: "center",
  },
  flatlistmidcontainer: {
    height: height * 0.06,
    width: width * 0.63, // 0.6
    justifyContent: "center",
  },
  usernameTxt: {
    color: COLOR.WHITE,
    fontFamily: "Montserrat-SemiBold",
    fontSize: height / 55,
  },
  flatlistendcontainer: {
    height: height * 0.06,
    width: width * 0.14,
    justifyContent: "space-evenly",
    alignItems: "flex-end",
  },
  timeTxt: {
    color: "#BBB6B6",
    fontFamily: "Montserrat-Regular",
    fontSize: height / 75,
  },
  intrestedTxt: {
    color: "#BBB6B6",
    fontFamily: "Montserrat-Regular",
    fontSize: height / 72,
  },
  SearchContainer: {
    height: height * 0.075,
    width: width * 0.92,
    justifyContent: "space-between",
    backgroundColor: COLOR.ACTIVITY_CARD,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#1E1E1E",
    borderRadius: 8,
    marginTop: verticalScale(5),
  },
  noDataView: {
    height: height * 0.3,
    width: width * 1,
    // justifyContent: "center",
    alignItems: "center",
  },
  nodataTxt: {
    color: "white",
    fontSize: height / 45,
    fontFamily: "Montserrat-SemiBold",
  },
  // ----- New Styles Starts -----
  SecondSectionContainer: {
    flexDirection: "row",
    height: height * 0.09,
    alignItems: "center",
  },
  ProfileImgContainers: {
    height: height * 0.08,
    width: width * 0.13,
    justifyContent: "center",
    alignItems: "center",
  },
  ProfileNameContainer: {
    height: height * 0.08,
    width: width * 0.70, // 0.67
    justifyContent: "center",
  },
  UnreadMsgContainer: {
    height: height * 0.08,
    width: width * 0.1,
    justifyContent: "center",
    alignItems: "center",
  },
  // ----- New Styles Ends -----
});
