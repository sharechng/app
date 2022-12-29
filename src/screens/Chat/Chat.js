import React, { useRef, useState, useEffect, useMemo, } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput,
  SafeAreaView,
  StyleSheet,
  BackHandler,
  Keyboard, ActivityIndicator,
  Animated,
  Platform



} from "react-native";
import Styles from "./Styles";
import { ImagePath } from "../../constants/ImagePath";
import { COLOR } from "../../Utils/Colors";
import { moderateScale, verticalScale } from "react-native-size-matters";
import ImagePicker from "react-native-image-crop-picker";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import {
  ChatHistoryUrl,
  GetUserProfileUrl,
  OneToOneChatUrl,
  UploadFileUrl,
} from "../../restAPI/ApiConfig";
import CryptoJS from "crypto-js";
import RBSheet from "react-native-raw-bottom-sheet";
import { GiftedChat, InputToolbar, } from 'react-native-gifted-chat'
import Ionicons from "react-native-vector-icons/Ionicons";
import EmojiSelector,{Categories} from 'react-native-emoji-selector'
import { useFocusEffect } from "@react-navigation/native";
import { Logout_ } from "../../../Logout";
// import EmojiBoard from 'react-native-emoji-board'

const { height, width } = Dimensions.get("window");

const Chat = (props) => {


  const refRBSheet = useRef();
  const [msgReceiverId, setMsgReceiverId] = useState(
    props?.route?.params?.receiverId
  );
  const [completeDetails, setCompleteDetails] = useState(
    props?.route?.params?.completeDetails
  );
  const [newReceiverId, setNewReceiverId] = useState(
    props?.route?.params?.completeDetails?.senderId?._id == props?.route?.params?.receiverId ? props?.route?.params?.completeDetails?.senderId : props?.route?.params?.completeDetails?.receiverId
  );
  const scrollOffsetY = useRef(new Animated.Value(0)).current;
  const [loader, setLoader] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [chatMessage, setChatMessage] = useState("");

  const [ChatHistoryMessage, setChatHistoryMessage] = useState([]);
  const [UserProfileDetails, setUserProfileDetails] = useState({});
  const giftchatref = useRef(90);
  const [emojivisible, setEmojivisible] = useState(false)

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();
  today = mm + "-" + dd + "-" + yyyy;

  // ************ Get Profile Api ************
  useEffect(() => {
    GetProfileApi();
    if (newReceiverId == undefined) {
      setNewReceiverId(props?.route?.params?.completeDetails)
    }
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (emojivisible) {
          setEmojivisible(false)
          return true;
        } else {
          return false;
        }
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [emojivisible])
  )

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
        setLoader(false);
      });
    setLoader(false);
  };

  // ************* On Camera Picker *************
  const onCamera = () => {
    setTimeout(() => {
      
      ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
        includeBase64: true,
        mediaType: "photo",
      }).then((image) => {
        SendChatMessage(image.data,"image")
        // console.log(image.data)
        setLoader(true);
  
        refRBSheet.current.close();
      });
    }, 500);
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
        mediaType: "photo",
      }).then((image) => {
        setLoader(true);
  
        SendChatMessage(image.data,"image")
  
        refRBSheet.current.close();
      });
    }, 500);
   
  };




  // *************** OnSend Message Function ***************
  const SendChatMessage = async (messages, type) => {
    // Function to Encrypt Message
    try {
      
      if (String(messages).trim().length > 0) {
  
  
        const encryptedMessage = await CryptoJS.AES.encrypt(
          messages,
          UserProfileDetails?._id
        );
  
        const formData = new FormData();
        if (type === "image") {
          formData.append("data", {
            senderId: UserProfileDetails?._id,
            receiverId: msgReceiverId,
            message: `data:image/png;base64,${messages}`,
            mediaType: "image",
            disappear: false,
          });
        }
  
        if (type === "text") {
          formData.append("data", {
            senderId: UserProfileDetails?._id,
            receiverId: msgReceiverId,
            message: encryptedMessage.toString(),
            mediaType: "text",
            disappear: false,
          });
        }
  
        setLoader(true);
        axios({
          method: "post",
          url: OneToOneChatUrl,
          data: formData?._parts[0][1],
          headers: { "content-type": "application/json" },
        })
          .then(async (response) => {
  
            if (response?.data?.response_code === 200) {
              // chatHistory();
              setChatMessage("");
              // chatHistory();
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
            console.log(err)
          });
      } else {
        setChatMessage("");
  
      }
    } catch (error) {
      
    }
  };

  // *************** Chat History Api Integration ***************
  // const chatHistory = async () => {
  //   const value = await AsyncStorage.getItem("token" || "socaltoken");

  //   const formdata = new FormData();
  //   formdata.append("files", {
  //     senderId: UserProfileDetails?._id,
  //   });

  //   axios({
  //     method: "post",
  //     url: ChatHistoryUrl,
  //     data: formdata._parts[0][1],
  //     headers: {
  //       token: value,
  //     },
  //   })
  //     .then(async (resp) => {
  //       if (resp.status === 200) {
  //         console.log("==== Chat History Response ====", resp);
  //         setChatHistoryMessage(resp?.data?.result);
  //         encryptMessageHandler(resp?.data?.result);
  //         setMessage([]);
  //         setChatMessage(chatMessage.concat(resp?.data));
  //       } else {
  //         alert("Something went wrong");
  //         return false;
  //       }
  //     })
  //     .catch((err) => {
  //       console.log("==== Chat History Catch error ====upload error", err);
  //     });
  // };

  //CHAT ChatHistory Socket New
  // console.log("---- chat log ----", UserProfileDetails);
  const chatsuser = useMemo(() => {
    
    const result = ChatHistoryMessage?.filter((chat, index) => {
      // console.log( "rece", chat.receiverId,msgReceiverId)


      if (chat.senderId?._id == undefined || chat.senderId?._id == null) {
        return false
      }
      if (chat.receiverId?._id == undefined || chat.receiverId?._id == null) {
        return false
      }
      if ((chat.senderId?._id == UserProfileDetails?._id && chat.receiverId?._id == msgReceiverId) || (chat.receiverId?._id == UserProfileDetails?._id && chat.senderId?._id == msgReceiverId)) {
        return true
      } else {
        return false
      }

    })
    return result


  }, [ChatHistoryMessage])


  const chats = useMemo(() => {

    const data = []
    chatsuser[0]?.messages.map((item) => {
      let obj = null
      const img = item.receiverId != UserProfileDetails?._id ? newReceiverId?.profilePic : UserProfileDetails?.profilePic
      if (item.mediaType === "text") {

        obj = {
          text: item.message,
          user: {
            _id: item.receiverId,
            avatar: img

          },
          ...item
        }
      } else if (item.mediaType === "image") {

        obj = {
          image: item.message,
          user: {
            _id: item.receiverId,
            avatar: img

          },
          ...item,

        }
      }
      data.push(obj)


    })

    return data.reverse()


  }, [chatsuser])
  useEffect(() => {
    const web = new WebSocket(`wss://node.bitfuxi.co.uk`);

    if (UserProfileDetails && UserProfileDetails._id) {
      var fetchedfirsttime = false;
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
              // console.log("chat", obj.result)


              setChatHistoryMessage(obj.result);
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

  const userstatus = useMemo(() => {
    // console.log(ChatHistoryMessage)
    return ChatHistoryMessage[0]?.senderId?.isOnline


  }, [ChatHistoryMessage])



  const decryptMessage = (message, senderid, receiverId, mediaType, mssgreceiverId1) => {
    try {
      
      if (mediaType == "text") {
        const chatObj = message;
        // console.log("ids ", mssgreceiverId1 == senderid ? receiverId : senderid)
        const userIddd = mssgreceiverId1 == senderid ? receiverId : senderid;
        var mssg = ""
        try {
          const bytes = CryptoJS.AES.decrypt(chatObj, userIddd);
  
          mssg = bytes.toString(CryptoJS.enc.Utf8);
          // console.log("mssg", mssg)
        } catch (error) {
  
        }
  
      }
    } catch (error) {
      
    }


    // const bytes = CryptoJS.AES.decrypt(chatObj, userIddd);
    // const plaintext = bytes.toString(CryptoJS.enc.Utf8);
    return mssg;
  }



  // ************** FlatList Refreshing Functions **************
  function _handleRefresh() {
    setIsFetching(false);
    // chatHistory();
  }
  const RenderTextMessage = (item) => {
    // console.log(item.currentMessage.user.avatar)

    return (
      <View
        style={{
          width: width * 1,
          alignItems: item.currentMessage.receiverId != UserProfileDetails?._id ? "flex-end" : "flex-start",
          marginTop: 10
        }}
      >
        {item.currentMessage.receiverId == UserProfileDetails?._id && <View style={Styles.SenderContainer}>
          <View style={Styles.SenderMsgImgContainer}>
            {newReceiverId?.profilePic ? (
              <Image
                source={{
                  // uri: item?.item?.receiverId?.profilePic,
                  uri: newReceiverId?.profilePic,
                }}
                style={{
                  height: 30,
                  width: 30,
                  borderRadius: 30 / 2,
                }}
              />
            ) : (
              <Image
                source={ImagePath.PROFILE_PIC}
                style={{ height: 35, width: 35 }}
              />
            )}
          </View>
          <View style={{}}>
            {
              item?.currentMessage?.image ? <Image
                source={{ uri: item?.currentMessage?.image }}
                style={{
                  width: 150,
                  height: 150,
                  // resizeMode: "contain",
                  borderRadius: 5,
                  overflow: 'hidden'
                }}
              /> : null
            }
            {item?.currentMessage?.image ? null : <View style={[Styles.SenderMsgTxtContainer, {
              backgroundColor: COLOR.BUTTON_PINK
            }]}>
              <Text style={Styles.SenderMsgTxt}>
                {decryptMessage(item?.currentMessage?.message, ChatHistoryMessage[0]?.senderId?._id, ChatHistoryMessage[0]?.receiverId?._id, item?.currentMessage.mediaType, item?.currentMessage?.receiverId)}
              </Text>
            </View>}

            <View
              style={{
                width: width * 0.6,
                height: 20,
                alignItems: "flex-start",
              }}
            >
              <Text
                numberOfLines={2}
                style={Styles.SenderMsgTxtTime}
              >
                {moment(item?.currentMessage?.createdAt).local().fromNow()}
              </Text>
            </View>
          </View>
        </View>}
        {item.currentMessage.receiverId != UserProfileDetails?._id && <View style={Styles.SenderContainer}>

          <View style={{
            // alignItems:'flex-end',

          }}>
            {
              item?.currentMessage?.image ? <Image
                source={{ uri: item?.currentMessage?.image }}
                style={{
                  width: 150,
                  height: 150,
                  // resizeMode: "contain",
                  borderRadius: 5,
                  overflow: 'hidden',
                  alignSelf: 'flex-end'
                }}
              /> : null
            }
            {item?.currentMessage?.image ? null : <View style={[Styles.RecieverMsgTxtContainer, {
              backgroundColor: "#242526"
            }]}>
              <Text style={Styles.SenderMsgTxt}>
                {decryptMessage(item?.currentMessage?.message, ChatHistoryMessage[0]?.senderId?._id, ChatHistoryMessage[0]?.receiverId?._id, item?.currentMessage.mediaType, item?.currentMessage?.receiverId)}
              </Text>
            </View>}

            <View
              style={{
                // width: width * 0.6,
                height: 20,
                alignItems: "flex-start",
              }}
            >
              <Text
                numberOfLines={2}
                style={Styles.SenderMsgTxtTime}
              >
                {moment(item?.currentMessage?.createdAt).local().fromNow()}
              </Text>
            </View>
          </View>
          <View style={Styles.SenderMsgImgContainer}>
            {/* {item?.item?.senderId?.profilePic ? ( */}
            {UserProfileDetails?.profilePic ? (
              <Image
                source={{
                  // uri: item?.item?.senderId?.profilePic, // Old
                  uri: UserProfileDetails?.profilePic,
                }}
                style={{
                  height: 30,
                  width: 30,
                  borderRadius: 30 / 2,
                  marginLeft: verticalScale(6),
                }}
              />
            ) : (
              <Image
                source={ImagePath.PROFILE_PIC}
                style={{
                  height: 30,
                  width: 30,
                  marginLeft: verticalScale(6),
                  borderRadius: 30 / 2,
                }}
              />
            )}
          </View>
        </View>}
      </View>
    )
  }
  const RenderCustominput = (props) => {
    return (


      <InputToolbar


        containerStyle={{
          backgroundColor: '#000',
          borderTopWidth: 1,
          borderColor: "#3F4041",
          paddingTop: '10%',
          paddingBottom: '2%',


        }}

        {...props}
      >

      </InputToolbar>



    )

  }

  const RenderCompser = (props) => {
    // console.log(props)
    return (
      <View
        style={styles.container}
      >
        {/* <Image
              source={ImagePath.CHAT_LEFT_ICON}
              style={{ height: 35, width: 35 }}
            /> */}
        {loader && <ActivityIndicator size="large" color="#E31A89" />}
        <View
          style={[styles.row, {
            width: !loader ? "82%" : "80%"
          }]}
        >

          <TextInput
            placeholder="Type something here..."
            placeholderTextColor={"#C3BEBE"}
            onChangeText={(txt) => setChatMessage(txt)}
            value={chatMessage}
            style={{
              borderRadius: 8,
              padding: 8,
              color: COLOR.WHITE,
              backgroundColor: '#1A1A1A',
              width: '79%'

            }}

            multiline={true}
            onSubmitEditing={() => setChatMessage("")}
            onFocus={() => {
              setEmojivisible(false)
            }}
          />
          <TouchableOpacity
            style={{
              marginTop: "5%"
            }}
            onPress={() => {
              refRBSheet?.current.open()
            }}
          >
            <Image
              source={require("../../assets/images/DocPicker.png")}
              style={{
                width: 17,
                height: 17,
                resizeMode: 'contain'
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginLeft: '3%',
              marginTop: "5%"
            }}
            onPress={() => {
              Keyboard.dismiss()
              setEmojivisible(prev => !prev)

            }}
          >
            <Image
              source={require("../../assets/images/HomeEmoji/HomeEmoji2.png")}
              style={{
                width: 17,
                height: 17,
                resizeMode: 'contain'

              }}
            />
          </TouchableOpacity>

        </View>
        {!loader && <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            setChatMessage("")
            SendChatMessage(chatMessage, "text")
            setEmojivisible(false)
          }}
        >
          <Ionicons
            name="send-sharp"
            size={18}
            color='#EC167F'

          />

        </TouchableOpacity>}

      </View>

    )
  }

  const header = () => {

    return (
      <Animated.View style={[Styles.ChatHeadingContainer,]}>
        <View style={Styles.BackContainer}>
          <TouchableOpacity
            onPress={() => props.navigation.goBack()}
            style={[Styles.ImgTouchContainer, props.BackIconStyling]}
          >
            <Image source={ImagePath.BACK_ICON} />
          </TouchableOpacity>
        </View>

        <View style={{ justifyContent: "center", width: width * 0.15 }}>
          {/* {chatHistory?.senderId?.profilePic ? ( */}
          {/* {completeDetails?.profilePic ? ( */}
          {newReceiverId?.profilePic ? (
            <Image
              source={{ uri: newReceiverId?.profilePic }}
              style={{
                height: 40,
                width: 40,
                borderRadius: 40 / 2,
                marginLeft: verticalScale(6),
              }}
            />
          ) : (
            <Image
              source={ImagePath.PROFILE_PIC}
              style={{
                height: 40,
                width: 40,
                marginLeft: verticalScale(6),
                borderRadius: 20,
              }}
            />
          )}
          {userstatus && <View style={styles.viewdot} />}
        </View>

        <View
          style={[
            Styles.ProfileImgContainer,
            {
              width: width * 0.55,
              alignItems: "center",
              justifyContent: "center",
              alignItems: "flex-start",
              marginLeft: 10
            },
          ]}
        >
          <Text style={Styles.ProfileeTxt}>
            {completeDetails?.userName ||
              completeDetails?.name ||
              newReceiverId?.userName || newReceiverId.name}
          </Text>
          {userstatus && <Text style={Styles.ActiveNowTxt}>{userstatus ? "Active now" : 'offline'}</Text>}
          <View style={Styles.Online}></View>
        </View>
      </Animated.View>

    )
  }


  return (
    <SafeAreaView

      style={{

        backgroundColor: "#000",
        flex: 1,
        // paddingTop:keyboardHeight-height*0.01
        // height:height ,
      }}

    >




      {
        header()
      }

      {ChatHistoryMessage && <GiftedChat

        messages={chats}
        user={{
          _id: ChatHistoryMessage[0]?.senderId?._id == undefined ? 1 : ChatHistoryMessage[0]?.senderId?._id,

        }}
        renderInputToolbar={RenderCustominput}
        minInputToolbarHeight={Platform.OS=="ios"?44: giftchatref?.current}
        renderComposer={RenderCompser}
      


        renderMessage={RenderTextMessage}

      />}




      {
        emojivisible && <EmojiSelector onEmojiSelected={(emoji) => {
          setChatMessage(prev => prev + emoji)

        }}
        columns={8}
        category={Categories.all}
        showSearchBar={false}

        />
      }
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
            <Text style={Styles.panelTitle}>Share pictures</Text>
            <Text style={Styles.panelSubtitle}>Choose your images</Text>
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
            <Text style={Styles.panelButtonTitle}>Choose from Gallary</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={Styles.panelButton}
            onPress={() => refRBSheet.current.close()}
          >
            <Text style={Styles.panelButtonTitle}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </RBSheet>
    </SafeAreaView>
  );
};

export default Chat;

const styles = StyleSheet.create({
  viewdot: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'green',
    bottom: 15,
    right: 5

  },
  btn: {
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    width: '15%',
    borderRadius: 5,
    justifyContent: 'center',
    padding: 11,
    paddingLeft: 11,
    maxHeight: 50





  },
  container: {
    flexDirection: 'row',
    justifyContent: "space-around",
    // alignItems: 'center'
  },
  row: {
    flexDirection: 'row',
    // justifyContent: "space-between",
    // alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: 5,
  }

})
