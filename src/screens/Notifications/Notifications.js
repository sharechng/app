import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  FlatList,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  Platform,
} from "react-native";

import Styles from "./Styles";
import { ImagePath } from "../../constants/ImagePath";
import { scale, verticalScale } from "react-native-size-matters";
import { COLOR } from "../../Utils/Colors";
import AppButton from "../../components/CustomButton/CustomButton";
import ProfileHeader from "../../components/CustomHeader/ProfileHeader";
import axios from "axios";
import {
  DeleteNotificationUrl,
  NotificationUrl,
} from "../../restAPI/ApiConfig";
import CustomLoader from "../../components/CustomLoader/CustomLoader";
import AsyncStorage from "@react-native-async-storage/async-storage";
const { height, width } = Dimensions.get("window");
import moment from "moment";
import { showMessage } from "react-native-flash-message";

const Notifications = (props) => {
  const [loader, setLoader] = useState(false);
  const [loaderDelete, setLoaderDelete] = useState(false);
  const [notificationList, setNotificationList] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const renderItemNotificationList = ({ item }) => {
    return (
      <View style={Styles.ListContainer}>
        <View style={Styles.ImgContainer}>
          <TouchableOpacity
            onPress={() =>{
              console.log("eds",item)
              if(item.notificationType=="FOLLOW"){

                props.navigation.navigate("AboutCreator", {
                  nftId: item?.likeBy._id,
                })
              }else if(item.notificationType=="BUY_POST"||item.notificationType=="POST_LIKE"||item.notificationType=="POST_COMMENT"){
                props.navigation.navigate("CollectionDetails", {
                  _id: item?.postId._id,
                })
              }else if(item.notificationType=="BUY_AUCTION"){
                props.navigation.navigate("AuctionsDetails", {
                  _id: item?.auctionId._id,
                })
              }
            }
            }
          >
          {item?.otherUserId?.profilePic ? (
            <Image
              source={{ uri: item?.otherUserId?.profilePic }}
              resizeMode="contain"
              style={{ height: 40, width: 40, borderRadius: 20 }}
            />
          ) : (
            <Image
              source={ImagePath.PROFILE_PIC}
              resizeMode="contain"
              style={{ height: 37, width: 37 }}
            />
          )}
          </TouchableOpacity>
        </View>

        <View style={Styles.DetailsContainer}>
          <View style={Styles.TitleContainer}>
            <Text style={Styles.DescriptionTxt}>{item?.description}</Text>
          </View>
          <View style={Styles.TimeContainer}>
            <Text style={Styles.TimeTxt}>
              {moment(item?.createdAt).local().fromNow()}
            </Text>
          </View>
        </View>

        {item?.index === 1 ? (
          <View style={Styles.BtnContainers}>
            <AppButton
              title="Follow Back"
              type="small"
              textStyle={{
                fontFamily: "Montserrat-SemiBold",
                fontSize: height / 63,
              }}
              btnStyling={{
                height: height * 0.045,
                width: width * 0.22,
              }}
              ButtonPress={() => {}}
            />
          </View>
        ) : null}

        {item.id === 5 ? (
          <View style={Styles.BtnContainers}>
            <AppButton
              title="Followed"
              type="small"
              textStyle={{
                fontFamily: "Montserrat-SemiBold",
                // fontSize: scale(10),
                fontSize: height / 63,
              }}
              btnStyling={{
                height: height * 0.045,
                width: width * 0.22,
                borderColor: COLOR.WHITE,
                borderWidth: 0.6,
                backgroundColor: COLOR.BACKGROUND_THEME,
              }}
              ButtonPress={() => {}}
            />
          </View>
        ) : null}
      </View>
    );
  };

  useEffect(() => {
    NotificationApi();
  }, [props.route]);

  // ************ Notification Api Integration ************
  const NotificationApi = async () => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");

    setLoader(true);
    axios({
      method: "get",
      url: NotificationUrl,
      headers: { token: value },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          console.log("==== Notification Api Response ====", response.data.result);
          setNotificationList(response?.data?.result.reverse());
          setLoader(false);
        } else {
          alert("Something went wrong.");
          setLoader(false);
        }
      })
      .catch((err) => {
        console.log("err", err);
        setLoader(false);
      });
  };

  // ************ Notification Api Integration ************
  const DeleteNotificationApi = async () => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");
    console.log(value);

    setLoaderDelete(true);
    axios({
      method: "delete",
      url: DeleteNotificationUrl,
      headers: { token: value },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          NotificationApi();
          console.log("==== Delete Notification Response ====", response);
          showMessage({
            // message: response?.data?.responseMessage,
            message: "Notifications cleared successfully",
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
          setLoaderDelete(false);
        } else {
          alert("Something went wrong.");
          setLoaderDelete(false);
        }
      })
      .catch((err) => {
        console.log("==== Delete Notification err ====", err);
        setLoaderDelete(false);
      });
  };

  // ************** FlatList Refreshing Functions **************
  function _handleRefresh() {
    setIsFetching(false);
    NotificationApi();
  }

  return (
    <SafeAreaView>
      <View style={Styles.MainContainer}>
        {/* ************ Header Container ************ */}
        <ProfileHeader
          BackIcon={true}
          Title={true}
          HeaderTitle="Notifications"
          onBackPress={() => props.navigation.goBack()}
          BackIconStyling={{ marginLeft: verticalScale(10) }}
          PostIcon={false}
          Menu={false}
          ShareIcon={false}
          DeleteIcon={notificationList.length>0 ? true : false}
          NotificationDelete={() => setModalVisible(!modalVisible)}
          // titleStyling={{ width: width * 0.75, alignItems: "center" }}
          titleStyling={{ width: width * 0.7 }}
          HeaderTxtStyling={{ marginLeft: height * 0.04 }}
        />
        {!loader ? (
          // {/* ************ Notification List Container ************ */}
          <>
            {notificationList?.length > 0 ? (
              <View style={[Styles.StoryBoardContainer]}>
                <FlatList
                  // inverted
                  data={notificationList}
                  refreshing={isFetching}
                  onRefresh={_handleRefresh}
                  renderItem={renderItemNotificationList}
                  keyExtractor={(item) => item.id}
                />
              </View>
            ) : (
              <View style={Styles.NoDataTxtContainer}>
                <Text style={Styles.NoDataTxt}>No Data Found...</Text>
              </View>
            )}
          </>
        ) : (
          <CustomLoader
            loaderStyling={{ height: height * 0.85, width: width * 1 }}
          />
        )}
      </View>

      {/* ************ Notification Delete Confirmation Modal ************ */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={Styles.ModalMainContainer}>
          <View style={Styles.ModalSubContainer}>
            <View style={Styles.HeadingContainer}>
              <View style={{ height: height * 0.07, justifyContent: "center" }}>
                <Text
                  style={[
                    Styles.HeadingTxtContainer,
                    {
                      fontFamily: "Montserrat-Bold",
                      fontSize: height / 50,
                    },
                  ]}
                >
                  Delete All Notifications
                </Text>
              </View>
              <View style={{ height: height * 0.08, justifyContent: "center" }}>
                <Text
                  style={[
                    Styles.HeadingTxtContainer,
                    {
                      fontFamily: "Montserrat-Regular",
                      textAlign: "center",
                      fontSize: height / 50,
                    },
                  ]}
                >
                  Are you sure, you want to delete all notifications ?
                </Text>
              </View>

              <View style={Styles.ButtonMainContainer}>
                <View style={Styles.btnContainer}>
                  <AppButton
                    title="Yes"
                    type="small"
                    textStyle={{
                      fontFamily: "Montserrat-SemiBold",
                      fontSize: height / 58,
                    }}
                    ButtonPress={() => {
                      DeleteNotificationApi(), setModalVisible(!modalVisible);
                    }}
                  />
                </View>
                <View style={Styles.btnContainer}>
                  <AppButton
                    title="No"
                    type="small"
                    textStyle={{
                      fontFamily: "Montserrat-SemiBold",
                      fontSize: height / 58,
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

export default Notifications;
