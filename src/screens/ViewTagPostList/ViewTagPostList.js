import {
  StyleSheet,
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
} from "react-native";
import React, { useState, useEffect } from "react";

import Styles from "./Styles";
import AuthHeader from "../../components/CustomHeader/AuthHeader";
import { ImagePath } from "../../constants/ImagePath";
import { scale, verticalScale } from "react-native-size-matters";
import AppButton from "../../components/CustomButton/CustomButton";
import { COLOR } from "../../Utils/Colors";
import ProfileHeader from "../../components/CustomHeader/ProfileHeader";
const { height, width } = Dimensions.get("window");
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  BuyPostUrl,
  UserLikeDislikePostUrl,
  ViewPostProfileUrl,
} from "../../restAPI/ApiConfig";
import CustomLoader from "../../components/CustomLoader/CustomLoader";

const ViewTagPostList = (props) => {
  console.log("==== params =====", props.route.params.id);
  const [Id, setId] = useState(props?.route?.params?.id);
  const [tab, setTab] = useState(true);
  const [loader, setLoader] = useState(false);
  const [PostId, setPostId] = useState("");
  const [ViewPost, setViewPost] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

  const [iAgree, setIAgree] = useState(true);
  const toggleIAgree = () => {
    setIAgree(false);
    LikeAndDislikeApi();
  };

  const _toggleIAgree = () => {
    setIAgree(true);
    LikeAndDislikeApi();
  };
  useEffect(() => {
    ViewPostApi();
  }, [props.route]);

  // ******************** Creator View Post List Api Call ********************
  const ViewPostApi = async () => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");
    console.log(value);

    setLoader(true);
    axios({
      method: "get",
      url: ViewPostProfileUrl,
      params: {
        postId: Id,
      },
      headers: {
        token: value,
      },
    })
      .then(async (response) => {
        if (response.status === 200) {
          console.log("====== Creator Post View Api Response ======", response);
          setViewPost(response?.data?.result);
          setLoader(false);
        } else {
          alert("Something went wrong.");
          setLoader(false);
        }
      })
      .catch((err) =>
        console.log("===== Creator Post View Api err ======", err)
      );
  };

  // ******************** Like-Dislike Api Call ********************
  const LikeAndDislikeApi = async () => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");
    console.log("======PostId========", Id);

    setLoader(true);
    axios({
      method: "get",
      // url: `https://node.bitfuxi.co.uk/api/v1/user/likeDislikePost/${Id}`,
      url: UserLikeDislikePostUrl + `${Id}`,
      headers: {
        token: value,
      },
    })
      .then(async (response) => {
        if (response.status === 200) {
          console.log(
            "====== Like Dislike Response ======",
            response?.data?.result
          );
          alert(response?.data?.responseMessage);
          setLoader(false);
        } else {
          alert("Something went wrong.");
          setLoader(false);
        }
      })
      .catch((err) => console.log("===== Like Dislike err ======", err));
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
        if (response.data.responseCode === 200) {
          console.log(
            "====== Buy Post Response ======",
            response?.data?.result
          );
          alert(response?.data?.responseMessage);
          props.navigation.navigate("Profile");
          setLoader(false);
        } else {
          alert("Something went wrong.");
          setLoader(false);
        }
      })
      .catch((err) => console.log("=====Buy Post err ======", err));
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
        ShareIcon={true}
        ShareClick={() => ShareMessage()}
      />
      <ScrollView>
        <View style={Styles.MainContainer}>
          {/* ************ Image Container ************ */}
          <View style={Styles.ImageContainer}>
            {ViewPost?.mediaUrl === ViewPost?.mediaUrl ? (
              <Image
                source={{ uri: ViewPost?.mediaUrl }}
                style={{ height: height * 0.413, width: width * 1 }} // New
              />
            ) : (
              <Image
                source={ImagePath.COLLECTION_VIEW_IMG}
                style={{ height: height * 0.413, width: width * 1 }} // New
              />
            )}
          </View>

          {/* ************ Profile Container ************ */}
          <View style={Styles.ProfileView}>
            <View style={Styles.PicNameContainer}>
              <View style={Styles.ProfilePicContainer}>
                {ViewPost?.userId?.profilePic ? (
                  <Image
                    source={{ uri: ViewPost?.userId?.profilePic }}
                    style={{ height: 45, width: 45, borderRadius: 45 / 2 }}
                  />
                ) : (
                  <Image
                    source={ImagePath.COLLECTION_PROFILE}
                    resizeMode="contain"
                    style={{ height: 45, width: 45 }}
                  />
                )}
              </View>

              <View style={Styles.ProfileNameContainer}>
                <Text style={Styles.ProfileNameTxt}>
                  {ViewPost?.userId?.userName || ViewPost?.userId?.name}
                </Text>
                <Text style={Styles.ProfileDataTxtTwo}>
                  {ViewPost?.postType}
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
                  {ViewPost?.likesCount}
                </Text>
              </View>
            </View>

            <View style={Styles.DurationPrice}>
              <View style={[Styles.DurationContainer]}>
                <Text style={Styles.DurationTxt}>Price: </Text>
                <Text style={Styles.DaysTxt}> {ViewPost?.amount} SHARE</Text>
              </View>
            </View>

            {/* ************ Button Container ************ */}
            <View style={Styles.BtnContainer}>
              <AppButton
                title="Buy Now"
                type="large"
                textStyle={{ fontFamily: "Montserrat-SemiBold" }}
                ButtonPress={() => setModalVisible(true)}
                btnStyling={{}}
              />
            </View>
          </View>
        </View>
      </ScrollView>

      {/* ************ Buy Confirmation Modal ************ */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
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
                    {
                      fontFamily: "Montserrat-Bold",
                      // fontSize: scale(18)
                      fontSize: height / 50,
                    },
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
                      // fontSize: scale(14),
                      fontSize: height / 58,
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
                      // fontSize: scale(14),
                      fontSize: height / 58,
                    }}
                    ButtonPress={() => setModalVisible(!modalVisible)}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
        {/* </TouchableOpacity> */}
      </Modal>
    </SafeAreaView>
  );
};

export default ViewTagPostList;

const styles = StyleSheet.create({});
