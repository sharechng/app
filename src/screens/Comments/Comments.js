import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  TextInput,
  ScrollView,
  Modal,
  RefreshControl,
  FlatList,
  ActivityIndicator,
  ImageBackground,
  Platform,
} from "react-native";
import Styles from "./Styles";

import AuthHeader from "../../components/CustomHeader/AuthHeader";
import CustomInput from "../../components/CustomInput/CustomInput";
import { moderateScale, verticalScale } from "react-native-size-matters";
import { ImagePath } from "../../constants/ImagePath";
import { COLOR } from "../../Utils/Colors";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  CommentsOnPostUrl,
  DeleteParticularComment,
  DeleteReplyCommentUrl,
  GetUserProfileUrl,
  LikeCommentsUrl,
  ReplyOnComment,
  ReportCommentsUrl,
  ViewPostProfileUrl,
} from "../../restAPI/ApiConfig";
import moment from "moment";
import CustomLoader from "../../components/CustomLoader/CustomLoader";
import { showMessage } from "react-native-flash-message";
import Accordion from "react-native-collapsible/Accordion";
import AntDesign from 'react-native-vector-icons/AntDesign'
const { height, width } = Dimensions.get("window");
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Logout_ } from "../../../Logout";

const Comments = (props) => {
  const inputref = useRef(null);

  const [commentListId, setCommentListId] = useState(
    props?.route?.params?.nftId || props?.route?.params?._id
  );
  const [modalVisible1, setModalVisible1] = useState(false);
  const [loader, setLoader] = useState(false);
  const [loaderList, setLoaderList] = useState(false);

  const [loaderComments, setLoaderComments] = useState(false);
  const [loaderReply, setLoaderReply] = useState(false);

  const [comments, setComments] = useState("");
  const [commentsList, setCommentsList] = useState([]);
  // const [isClicked, setIsClicked] = useState(false);
  const [UserProfileDetails, setUserProfileDetails] = useState({});
  const [MsgReply, setMsgReply] = useState("");
  const [ReplyId, setReplyId] = useState("");

  const [activeSections, setactiveSections] = useState([]);
  const [commentsData, setCommentsData] = useState({});
  const [GetRemark, setGetRemark] = useState("");
  const [ParticularId, setParticularId] = useState("");
  const [isFetching, setIsFetching] = useState(true);

  const [Like, setLike] = useState(true);
  const toggleLike = (id) => {
    setLike(!Like);
    LikeDislikeBidApi(id);
  };

  const _toggleLike = (id) => {
    setLike(!Like);
    LikeDislikeBidApi(id);
  };
  // ******************** Like-Dislike Comments ********************
  const LikeDislikeBidApi = async (id) => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");
    console.log(commentListId, id, value);

    setLoader(true);
    axios({
      method: "get",
      url: LikeCommentsUrl,
      params: {
        postId: commentListId,
        commentId: id,
      },
      headers: {
        token: value,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          CommentListApi();
          console.log("==== Like Dislike Comment Response ====", response);
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
          CommentListApi();
          setLoader(false);
        } else {
          alert("Something went wrong.");
          setLoader(false);
        }
      })
      .catch((err) => {
        console.log("===== Like Dislike Comment err ======", err);

        setLoader(false);
        if(err.response.data.responseCode===440){
          Logout_(props)

        }
        if (
          err?.response?.data?.responseCode === 400 ||
          401 ||
          404 ||
          409 ||
          500
        ) {
          showMessage({
            message: err?.response?.data?.responseMessage,
            type: "warning",
            icon: "warning",
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
        }
        setLoader(false);
      });
  };

  useEffect(() => {
    GetProfileApi();
    CommentListApi();
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
          console.log("====== Get User Profile Response ======", response);
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
        if(err.response.data.responseCode===440){
          Logout_(props)

        }
      });
    setLoader(false);
  };

  // ************ Comments on Post Api Call ************
  const CommentListApi = async () => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");

    // setLoaderList(true);
    setIsFetching(true);
    axios({
      method: "get",
      url: ViewPostProfileUrl,
      params: {
        postId: commentListId,
      },
      headers: {
        token: value,
      },
    })
      .then(async (response) => {
        setIsFetching(false);
        if (response.data.responseCode === 200) {
          setCommentsList(response?.data?.result?.comment); // New State
          setCommentsData(response?.data?.result);
          setLoaderList(false);
          console.log("====== Comments List Response ======", response?.data?.result?.comment);
        } else {
          alert("Something went wrong.");
          setLoaderList(false);
        }
      })
      .catch((err) => {

        setLoader(false);
        if(err.response.data.responseCode===440){
          Logout_(props)

        }
        console.log("===== Comments List Catch Error ======", err);
        setIsFetching(false);
        console.log("===== Comments List Api err ======", err);
        setLoaderList(false);
      });
  };

  const ClearState = () => {
    setComments(null);
  };

  // ************ Comments on Post Api Call ************
  const CommentOnPostApi = async () => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");
    console.log(value)

    const formData = new FormData();
    formData.append("postId", {
      postId: commentListId,
      message: comments,
    });
    console.log("commentListId", props?.route?.params);

    setLoaderComments(true);
    axios({
      method: "post",
      url: CommentsOnPostUrl,
      data: formData?._parts[0][1],
      headers: {
        token: value,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          console.log("====== Comments on Post Api Response ======", response);
          ClearState();
          CommentListApi();
          setLoaderComments(false);
          setComments("")
        } else {
          alert("Something went wrong.");
          setLoaderComments(false);
        }
      })
      .catch((err) => {
        console.log("===== Comments on Post Api err ======", err.response.data);
        setLoader(false);
        if(err.response.data.responseCode===440){
          Logout_(props)

        }

        setLoaderComments(false);
      });
  };

  // ************ Delete Comments Api ************
  const DeleteCommentApi = async (id) => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");

    const formData = new FormData();
    formData.append({
      postId: commentListId,
      commentId: id,
    });

    setLoader(true);
    axios({
      method: "delete",
      url: DeleteParticularComment,
      data: formData?._parts[0][0],
      headers: {
        token: value,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          CommentListApi();
          console.log("====== Delete Particular Comment ======", response);
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
      .catch((err) =>{
        console.log("=====  Delete Particular Comment err ======", err)
        setLoader(false);
        if(err.response.data.responseCode===440){
          Logout_(props)

        }

      }
        
      );
  };

  // ************ Reply on Comments Api ************
  const ReplyOnCommentApi = async (id) => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");
    console.log(value);

    const formData = new FormData();
    formData.append({
      postId: commentListId,
      commentId: id,
      message: MsgReply,
    });
    console.log("----- Form data -----", formData?._parts[0][0]);

    setLoaderReply(true);
    axios({
      method: "post",
      url: ReplyOnComment,
      data: formData?._parts[0][0],
      headers: {
        token: value,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          setMsgReply("");
          CommentListApi();
          console.log("==== Reply on Comment ====", response);
          setReplyId(response?.data?.result);
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
          setMsgReply(null);
          setLoaderReply(false);
        } else {
          alert("Something went wrong.");
          setLoaderReply(false);
        }
      })
      .catch((err) => {
        console.log("=====  Reply on Comment err ======", err);
        setLoader(false);
        if(err.response.data.responseCode===440){
          Logout_(props)

        }
        if (
          err.response.data.responseCode === 401 ||
          402 ||
          404 ||
          409 ||
          500
        ) {
          showMessage({
            message: err?.response?.data?.responseMessage,
            type: "warning",
            icon: "warning",
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
          setLoaderReply(false);
        } else {
          alert("Something went wrong");
          setLoaderReply(false);
        }
        setLoaderReply(false);
      });
  };

  const CallToOpen = async (item) => {
    setModalVisible1(true);
    await setParticularId(item);
  };

  // ************ Delete Reply Api ************
  const DeleteReplyApi = async (id, _id) => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");
    console.log(value);

    const formData = new FormData();
    formData.append({
      postId: commentListId,
      commentId: id,
      commentReplyId: _id,
    });
    console.log("----- Form data -----", formData?._parts[0][0]);

    setLoader(true);
    axios({
      method: "post",
      url: DeleteReplyCommentUrl,
      data: formData?._parts[0][0],
      headers: {
        token: value,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          console.log("==== Delete Reply on Comment ====", response);
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
      .catch((err) => {
        console.log("===== Delete Reply on Comment err ======", err);
        setLoader(false);
        if(err.response.data.responseCode===440){
          Logout_(props)

        }
        if (err.response.data.responseCode === 401 || 402 || 404 || 409) {
          showMessage({
            message: err?.response?.data?.responseMessage,
            type: "warning",
            icon: "warning",
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
          setLoaderReply(false);
        } else {
          alert("Something went wrong");
          setLoaderReply(false);
        }
        setLoaderReply(false);
      });
  };

  // const CommentsRenderItem = ({ item, index }) => {
  //   return (
  //     <View style={[Styles.CommentsBodyContainer]}>
  //       <View style={[Styles.CommentsBodyTwoContainer]}>
  //         <View style={Styles.SubContainer}>
  //           <View style={Styles.ProfilePicsContainer}>
  //             <TouchableOpacity
  //               onPress={() => props.navigation.navigate("Profile")}
  //               style={{ justifyContent: "center" }}
  //             >
  //               {item?.userId?.profilePic ? (
  //                 <Image
  //                   source={{ uri: item?.userId?.profilePic }}
  //                   style={{
  //                     height: 35,
  //                     width: 35,
  //                     borderRadius: 35 / 2,
  //                   }}
  //                 />
  //               ) : (
  //                 <Image
  //                   source={ImagePath.LIKED_BY_ONE}
  //                   style={{ height: 35, width: 35 }}
  //                 />
  //               )}
  //             </TouchableOpacity>
  //           </View>

  //           <View style={Styles.ProfileNameAndDescriptionContainer}>
  //             <View style={Styles.ProfileNameContainer}>
  //               <TouchableOpacity
  //                 onPress={() => props.navigation.navigate("Profile")}
  //               >
  //                 <Text style={Styles.ProfileNameTxt}>
  //                   {item?.userId?.userName}
  //                 </Text>
  //               </TouchableOpacity>
  //             </View>

  //             <View
  //               style={[
  //                 Styles.ProfileNameContainer,
  //               ]}
  //             >
  //               <Text style={[Styles.DescriptionTxt, { marginRight: 5 }]}>
  //                 {item?.message}
  //               </Text>
  //             </View>
  //           </View>
  //         </View>

  //         <View style={Styles.HashTagContainer}>
  //           <View style={Styles.HashTagSubContainer}>
  //             <View
  //               style={[Styles.HashTagSubContainer, { flexDirection: "row" }]}
  //             >
  //               <Text style={Styles.HashTagTxt}>
  //                 <Text style={Styles.HashTagTxt}>
  //                   {moment(item?.userId?.createdAt).format("HH:MM")}
  //                 </Text>
  //               </Text>
  //               <TouchableOpacity
  //               // onPress={() => {
  //               //   isClicked
  //               //     ? toggleIAgree(item?._id, index)
  //               //     : _toggleIAgree(item?._id, index);
  //               // }}
  //               >
  //                 <Text
  //                   style={[
  //                     Styles.HashTagTxt,
  //                     { marginLeft: verticalScale(13) },
  //                   ]}
  //                 >
  //                   {"Reply"}
  //                 </Text>
  //               </TouchableOpacity>

  //               <TouchableOpacity onPress={() => DeleteCommentApi(item?._id)}>
  //                 <Text
  //                   style={[
  //                     Styles.HashTagTxt,
  //                     { marginLeft: verticalScale(13) },
  //                   ]}
  //                 >
  //                   {"Delete"}
  //                 </Text>
  //               </TouchableOpacity>
  //             </View>
  //           </View>
  //         </View>
  //       </View>
  //     </View>
  //   );
  // };

  // ************ Message Box Container ************
  const _renderHeader = (section) => {
    return (
      <View style={[Styles.CommentsBodyContainer]}>
        <View style={[Styles.CommentsBodyTwoContainer]}>
          <View style={[Styles.SubContainer, { marginVertical: 5 }]}>
            {/* ********** Profile Image Container ********** */}
            <View style={Styles.ProfilePicsContainer}>
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate("AboutCreator", {
                    nftId: section?.userId?._id,
                  })
                }
                style={{ justifyContent: "center" }}
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
                  {section?.userId?.profilePic ? (
                    <Image
                      source={{ uri: section?.userId?.profilePic }}
                      style={{
                        height: 38,
                        width: 38,
                        borderRadius: 38 / 2,
                      }}
                    />
                  ) : (
                    <Image
                      source={ImagePath.PROFILE_PIC}
                      style={{ height: 35, width: 35 }}
                    />
                  )}
                </ImageBackground>
              </TouchableOpacity>
            </View>

            {/* ********** UserName and Time Container ********** */}
            <View style={Styles.ProfileNameAndDescriptionContainer}>
              <View style={[Styles.ProfileNameContainer]}>
                <Text style={[Styles.ProfileNameTxt]}>
                  {section?.userId?.userName || section?.userId?.name}
                </Text>
                <Text
                  style={[Styles.DescriptionTxt, { fontSize: height / 60 }]}
                >
                  {section?.message}
                </Text>
              </View>
            </View>

            {/* ********** More Options Container ********** */}
            <TouchableOpacity
              onPress={() => LikeDislikeBidApi(section?._id)}
              style={[Styles.ProfileImgView, { alignItems: "flex-end" }]}
            >
              <Image
                source={
                  section?.likesCount > 0
                    ? ImagePath.HEART_LIKE
                    : ImagePath.LIKE
                }
                style={{
                  height: 18,
                  width: 18,
                  marginRight: height * 0.015,
                }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          {/* ********** Likes, Reply and Delete Container ********** */}
          <View style={[Styles.HashTagContainer, { marginVertical: 5 }]}>
            <View style={Styles.HashTagSubContainer}>
              <View
                style={[Styles.HashTagSubContainer, { flexDirection: "row" }]}
              >
                <View>
                  <Text style={Styles.HashTagTxt}>
                    {moment(section?.time).local().fromNow()}
                  </Text>
                </View>

                <View
                // onPress={() => inputref.current.focus()}
                >
                  <Text
                    style={[
                      Styles.HashTagTxt,
                      { marginHorizontal: height * 0.04 },
                    ]}
                  >
                    {section?.reply?.length} Reply
                  </Text>
                </View>

                {UserProfileDetails?._id === section?.userId?._id ? (
                  <TouchableOpacity
                    onPress={() => DeleteCommentApi(section?._id)}
                  >
                    <Text style={[Styles.HashTagTxt]}>{"Delete"}</Text>
                  </TouchableOpacity>
                ) : null}
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  // ************ Reply Box Container ************ReportCommentsUrl
  const _renderContent = (section) => {
    // setMsgReply("")
    return (
      <View
        style={[
          Styles.CommentsBodyTwoContainer,
          {
            marginVertical: 8,
            width: width * 0.8,
            marginLeft: height * 0.079,
          },
        ]}
      >
        {section?.reply?.map((reply) => {
          return (
            <View
              style={{
                width: width * 0.8,
                marginVertical: 5,
              }}
            >
              <View
                style={{
                  width: width * 0.8,
                  height: height * 0.06,
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    width: width * 0.12,
                    height: height * 0.06,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {reply?.userId?.profilePic ? (
                    <Image
                      source={{ uri: reply?.userId?.profilePic }}
                      style={{
                        height: 34,
                        width: 34,
                        borderRadius: 34 / 2,
                      }}
                    />
                  ) : (
                    <Image
                      source={ImagePath.PROFILE_PIC}
                      style={{
                        height: 34,
                        width: 34,
                        borderRadius: 34 / 2,
                      }}
                    />
                  )}
                </View>
                <View>
                  <TouchableOpacity
                    onPress={() =>
                      props.navigation.navigate("AboutCreator", {
                        nftId: section?.userId?._id,
                      })
                    }
                  >
                    <Text style={[Styles.ProfileNameTxt]}>
                      {reply?.userId?.userName || reply?.userId?.name}
                    </Text>
                  </TouchableOpacity>
                  <Text
                    style={{
                      color: COLOR.WHITE,
                      fontFamily: "Montserrat-Regular",
                      fontSize: height / 60,
                      marginVertical: 2,
                    }}
                  >
                    {reply?.message}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  width: width * 0.8,
                  // justifyContent: "center",
                  // flexDirection: "row",
                  // alignItems: "center",
                }}
              >
                <View style={{ width: width * 0.5 }}>
                  <Text
                    style={[Styles.HashTagTxt, { marginLeft: height * 0.064 }]}
                  >
                    {moment(reply?.time).local().fromNow()}
                  </Text>
                </View>

                {/* <View style={{ width: width * 0.3 }}>
                  {UserProfileDetails?._id !== ReplyId?.userId ? null : (
                    <TouchableOpacity
                      onPress={() => DeleteReplyApi(reply?._id)}
                    >
                      <Text style={[Styles.HashTagTxt]}>{"Delete"}</Text>
                    </TouchableOpacity>
                  )}
                </View> */}
              </View>
            </View>
          );
        })}
        {/* *************** Button Container *************** */}
        <View style={Styles.InputContainer}>
          <View onPress={() => {}} style={Styles.SendBtnTouch}>
            {UserProfileDetails?.profilePic ? (
              <Image
                // source={{ uri: section?.userId?.profilePic }}
                source={{ uri: UserProfileDetails?.profilePic }}
                style={{
                  height: 38,
                  width: 38,
                  borderRadius: 38 / 2,
                }}
              />
            ) : (
              <Image
                source={ImagePath.PROFILE_PIC}
                style={{ height: 35, width: 35 }}
              />
            )}
          </View>

          <View>
            <TextInput
              // ref={inputref}
              placeholder="Type something here..."
              placeholderTextColor={"#C3BEBE"}
              onChangeText={(txt) => setMsgReply(txt)}
              value={MsgReply}
              style={{
                backgroundColor: COLOR.TXT_INPT_COLOR,
                height: height * 0.062,
                width: width * 0.5, // 0.75
                borderRadius: 8,
                padding: 8,
                color: COLOR.WHITE,
                // borderWidth: 0.5,
                borderColor: COLOR.GREY,
              }}
              // onSubmitEditing={() => setChatMessage(null)}
            />
          </View>

          <View
            style={[
              Styles.ProfileImgView,
              { alignItems: "center", marginLeft: 1 },
            ]}
          >
            {MsgReply === "" ? (
              <TouchableOpacity
                onPress={() => {}}
                disabled
                style={[
                  Styles.SendBtnTouch,
                  { backgroundColor: COLOR.TXT_INPT_COLOR },
                ]}
              >
                <Image
                  source={ImagePath.MESSENGER}
                  style={{ height: 28, width: 28 }}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => ReplyOnCommentApi(section?._id)}
                style={[
                  Styles.SendBtnTouch,
                  { backgroundColor: COLOR.TXT_INPT_COLOR },
                ]}
              >
                {!loaderReply ? (
                  <Image
                    source={ImagePath.MESSENGER}
                    style={{ height: 28, width: 28 }}
                  />
                ) : (
                  <ActivityIndicator size="small" color="white" />
                )}
              </TouchableOpacity>
            )}
          </View>

          {/* <TouchableOpacity >
              <AntDesign name="close" color={COLOR.BUTTON_PINK} size={15} />
          </TouchableOpacity> */}
        </View>
      </View>
    );
  };

  const _updateSections = (activeSections) => {
    setMsgReply("")
    setactiveSections(activeSections);
  };

  const ReportOnCommentApi = async (ParticularId) => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");
    console.log(commentListId, ParticularId, GetRemark);

    setLoader(true);
    axios({
      method: "post",
      url: ReportCommentsUrl,
      data: {
        postId: commentListId,
        commentId: ParticularId,
        message: GetRemark,
      },
      headers: {
        token: value,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          setGetRemark("");
          setModalVisible1(false);
          CommentListApi();
          console.log("==== Reply Comment ====", response);
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
          setGetRemark("");
          setModalVisible1(false);
          CommentListApi();
          setLoader(false);
        } else {
          alert("Something went wrong.");
          setLoader(false);
        }
      })
      .catch((err) => {
        console.log("=====  Report Comment err ======", err);
        if (
          err.response.data.responseCode === 401 ||
          402 ||
          404 ||
          409 ||
          500
        ) {
          showMessage({
            message: err?.response?.data?.responseMessage,
            type: "warning",
            icon: "warning",
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
          alert("Something went wrong");
          setLoader(false);
        }
        setLoader(false);
      });

    // alert("api");
    console.log("--------ParticularId-------", ParticularId);
  };

  const [refreshing, setRefreshing] = React.useState(false);
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => {
      CommentListApi(), setRefreshing(false);
    });
  }, []);

  return (
    <View
    style={{
     flex:1,
     paddingBottom:'4%',
     backgroundColor:'#101010'

    }}
    >
        {
         isFetching&& <View style={Styles.NoDataTxtContainer}>
          {/* <Text style={Styles.NoDataTxt}>No Comments Found...</Text> */}
          <Text style={Styles.NoDataTxt}>Loading...</Text>
        </View>
        }
        {/* ************ Header Container ************ */}
        <View style={Styles.headerView}>
          <AuthHeader
            backIcon={true}
            onBackPress={() => props.navigation.goBack()}
            Title={true}
            HeaderTitle="Comments"
            titleStyling={{ width: width * 0.3 }}
          />
        </View>
      <KeyboardAwareScrollView  keyboardShouldPersistTaps={'always'}
        
        // pagingEnabled
        bounces={false}
        bouncesZoom={false}
        enableResetScrollToCoords={true}
        alwaysBounceVertical={false}
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
        onContentSizeChange={()=>{
          console.log("changes")
        }}
        // onPres
        >
    <SafeAreaView
   style={{
    height: height *0.9,
  }}
    >
      <View style={Styles.MainContainer}>
        {/* ************ Comments Body Container ************ */}
        {loaderList ? (
          <CustomLoader
            loaderStyling={{ height: height * 0.85, width: width * 1 }}
          />
        ) : (
          <View
            style={{
              marginTop: verticalScale(15),
              height: "85%",
              // backgroundColor:"red"
            }}
          >
            {commentsList && commentsList.length > 0 ? (
              <ScrollView
                style={{ 
                  height: "100%",
                width:width*1,
                }}
                contentContainerStyle={{
                  height: "100%",
                width:width*1,
                }}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
              >
                <Accordion
                  sections={commentsList}
                  activeSections={activeSections}
                  renderHeader={_renderHeader}
                  renderContent={_renderContent}
                  onChange={_updateSections}
                  
                  containerStyle={{
                    // height: 50,
                    width:width*1,
                    // 
                    // backgroundColor:"red",
                    height: "100%",
                    
                    // flexGrow: 0,
                    // flexWrap:'wrap'


                  }}
                  renderAsFlatList={true}

                
                  style={{
                    flexGrow: 0,
                    // backgroundColor:"red",
                  }}
                  
                  
                />
              </ScrollView>
            ) : (
              null
            )}
          </View>
        )}

        {/* ************ Profile Icon, Comments and Post Button Container ************ */}
        <View style={Styles.CommentSendContainer}>
          <View
            style={[
              Styles.ProfileImgView,
              { 
                height: height * 0.06, width: width * 0.09,
                
               },
            ]}
          >
            {UserProfileDetails?.profilePic ? (
              <Image
                source={{ uri: UserProfileDetails?.profilePic }}
                style={{ height: 30, width: 30, borderRadius: 30 / 2 }}
              />
            ) : (
              <Image
                source={ImagePath.PROFILE_PIC}
                style={{ height: 30, width: 30 }}
              />
            )}
          </View>
          <View
            style={[
              Styles.ProfilenameView,
              ,
              { height: height * 0.06, width: width * 0.73, backgroundColor:'#1A1A1A', borderRadius:5 },
            ]}
          >
            <CustomInput
              // ref={inputref}
              placeholder="Write a comment..."
              placeholderTextColor={COLOR.GREY}
              onChangeText={(txt) => setComments(txt)}
              value={comments}
              styles={{
                height: verticalScale(43),
                width: width * 0.6,
                borderRadius: 5,
                padding: moderateScale(8),
                fontSize: height / 60,
                color: COLOR.GREY,
              }}
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
                style={[Styles.PostButtonTxtContainer,{backgroundColor:'#1A1A1A', height:height * 0.06, width:30, alignItems:'center', justifyContent:'center'}]}
                onPress={() => CommentOnPostApi()}
              >
                  {loaderComments ? (
                    <ActivityIndicator size="small" color={COLOR.BUTTON_PINK} />
                  ) : (
                    <Image
                      source={ImagePath.MESSENGER}
                      style={{ height: 25, width: 25, resizeMode:'contain' }}
                    />
                  )}
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      </View>
     
    </SafeAreaView>
    </KeyboardAwareScrollView>
    </View>

  );
};

export default Comments;
