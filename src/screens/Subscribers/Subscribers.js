import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from "react-native";

import Styles from "./Styles";
import { ImagePath } from "../../constants/ImagePath";
import { verticalScale } from "react-native-size-matters";
import ProfileHeader from "../../components/CustomHeader/ProfileHeader";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SubscriberListUrl } from "../../restAPI/ApiConfig";
import CustomLoader from "../../components/CustomLoader/CustomLoader";
const { height, width } = Dimensions.get("window");

const Subscriber = (props) => {
  const [loader, setLoader] = useState(false);
  const [selectedString, setSelectedString] = useState("Followers");
  const [subscriberUser, setSubscriberUser] = useState([]);

  useEffect(() => {
    SubscriberApi();
  }, [props.route]);

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
          console.log("====== Subscriber Response ======", response);
          setSubscriberUser(response?.data?.result);
          setLoader(false);
        } else {
          alert("Something went wrong.");
          setLoader(false);
        }
      })
      .catch((err) => {
        console.log("===== Subscriber Catch Error ======", err);
        setLoader(false);
      });
  };

  const FollowingListRenderItem = ({ item }) => {
    return (
      <View style={Styles.ListContainers}>
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate("AboutCreator", { nftId: item?._id })
          }
          style={Styles.ProfileImgContainers}
        >
          {item?.profilePic ? (
            <Image
              source={{ uri: item?.profilePic }}
              style={{ height: 40, width: 40, borderRadius: 40 / 2 }}
            />
          ) : (
            <Image
              source={ImagePath.PROFILE_PIC}
              style={{ height: 40, width: 40, borderRadius: 40 / 2 }}
            />
          )}
        </TouchableOpacity>

        <View style={[Styles.ProfileNameContainers, { width: width * 0.82 }]}>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate("AboutCreator", { nftId: item?._id })
            }
          >
            <Text style={Styles.ProfileNameTxt}>
              {item?.userName || item?.name
                ? item?.userName || item?.name
                : "."}
            </Text>
          </TouchableOpacity>
          <Text style={Styles.ProfileNickNameTxt}>
            {item?.userName || item?.name}
          </Text>
        </View>

        {/* <View style={Styles.RemoveBtnContainers}>
          <AppButton
            title="Subscribe"
            type="small"
            ButtonPress={() => {}}
            textStyle={{
              color: "#888888",
              fontSize: height / 70,
              fontFamily: "Montserrat-SemiBold",
            }}
            btnStyling={{
              backgroundColor: "#101010",
              borderWidth: 1,
              borderColor: COLOR.WHITE,
            }}
          />
        </View> */}
      </View>
    );
  };

  return (
    <SafeAreaView>
      <ProfileHeader
        BackIcon={true}
        Title={true}
        HeaderTitle="Subscribers"
        onBackPress={() => props.navigation.goBack()}
        BackIconStyling={{ marginLeft: verticalScale(10) }}
        titleStyling={{ width: width * 0.7 }}
        HeaderTxtStyling={{ marginLeft: height * 0.04 }}
        // titleStyling={{ width: width * 0.75, alignItems: "center" }} // New Style 21 May
        PostIcon={false}
        Menu={false}
        ShareIcon={false}
      />
      <View style={Styles.MainContainer}>
        {/* ************* Tab Details Container ************ */}
        <View style={Styles.StoryBoardContainer}>
          {!loader ? (
            subscriberUser.length > 0 ? (
              <FlatList
                style={{ marginBottom: verticalScale(5) }}
                data={subscriberUser}
                renderItem={FollowingListRenderItem}
              />
            ) : (
              <View style={Styles.NoDataTxtContainer}>
                <Text style={Styles.NoDataTxt}>No Subscribers Found...</Text>
              </View>
            )
          ) : (
            <CustomLoader />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Subscriber;
