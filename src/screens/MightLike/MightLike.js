import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  View,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Styles from "./Styles";
const { height, width } = Dimensions.get("window");

import { ImagePath } from "../../constants/ImagePath";
import AppButton from "../../components/CustomButton/CustomButton";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  GetMightLikeUserListApiUrl,
  IgnoreApiUrl,
  FollowUnFollowUserUrl,
} from "../../restAPI/ApiConfig";

const MightLike = (props, navigation) => {
  const [loader, setLoader] = useState(false);
  const [MightLikeList, setMightLikeList] = useState([]);

  useEffect(() => {
    YouMightLikeApi();
  }, [props.route]);

  // ************ Get Might Like List Api ************
  const YouMightLikeApi = async () => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");

    setLoader(true);
    axios({
      method: "get",
      url: GetMightLikeUserListApiUrl,
      headers: {
        token: value,
      },
    })
      .then(async (response) => {
        if (response.status === 200) {
          console.log("====== Might Like Api Response ======", response);
          setMightLikeList(response?.data?.result);
          setLoader(false);
        } else {
          alert("Something went wrong.");
          setLoader(false);
        }
      })
      .catch((err) =>
        console.log("===== Might Like Api Catch err ======", err)
      );
  };

  // ******************** Follow-Unfollow Api Call ********************
  const FollowUserApi = async (id) => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");

    setLoader(true);
    axios({
      method: "get",
      url: FollowUnFollowUserUrl + `${id}`,
      headers: {
        token: value,
      },
    })
      .then(async (response) => {
        if (response?.data?.responseCode === 200) {
          console.log("====== Follow UnFollow Response ======", response);
          alert(response?.data?.responseMessage);
          setFollowUnFollow(response?.data?.result);
          setLoader(false);
        } else {
          alert("Something went wrong.");
          setLoader(false);
        }
      })
      .catch((err) => console.log("===== Follow UnFollow err ======", err));
  };

  // ******************** Ignore Api Call ********************
  const IgnoreApi = async (id) => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");

    const DATA = new FormData();
    DATA.append({
      _id: id,
    });
    console.log("==== ignore form data =====", DATA?._parts[0][0]?._id);

    setLoader(true);
    axios({
      method: "post",
      url: IgnoreApiUrl,
      data: DATA?._parts[0][0],
      headers: {
        token: value,
      },
    })
      .then(async (response) => {
        if (response?.data?.responseCode === 200) {
          console.log("====== Ignore Api Response ======", response);
          alert(response?.data?.responseMessage);
          setLoader(false);
        } else {
          alert("Something went wrong.");
          setLoader(false);
        }
      })
      .catch((err) => console.log("===== Ignore Api err ======", err));
  };

  const renderItem = ({ item }) => {
    // console.log(item?._id);
    return (
      <View style={[Styles.CardListContainer, { marginLeft: height * 0.01 }]}>
        <TouchableOpacity
          style={Styles.ImgContainer}
          activeOpacity={0.7}
          onPress={() =>
            props.navigation.navigate("AboutCreator", { CreatorId: item?._id })
          }
        >
          {item?.profilePic ? (
            <Image
              source={{ uri: item?.profilePic }}
              style={{ height: 130, width: 130, borderRadius: 130 / 2 }}
            />
          ) : (
            <Image
              source={ImagePath.PROFILE_PICS}
              style={{ height: 130, width: 130, borderRadius: 130 / 2 }}
            />
          )}
        </TouchableOpacity>

        <View style={Styles.ProfileNameContainer}>
          <Text style={Styles.ProfileNameTxt}>
            {item?.userName || item?.name}
          </Text>
        </View>

        <View style={Styles.BtnContainer}>
          <AppButton
            title="Ignore"
            type="large"
            textStyle={{
              fontFamily: "Montserrat-Medium",
              fontSize: height / 60,
            }}
            ButtonPress={() => IgnoreApi(item?._id)}
            btnStyling={{ height: 30, width: width * 0.18 }}
          />

          <AppButton
            title="Follow"
            type="large"
            textStyle={{
              fontFamily: "Montserrat-Medium",
              fontSize: height / 60,
            }}
            ButtonPress={() => FollowUserApi(item?._id)}
            btnStyling={{ height: 30, width: width * 0.18 }}
          />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView>
      {/* ************ Card Container ************ */}
      <View>
        {MightLikeList === null ? (
          <View style={Styles.MightLikeTxtContainer}>
            <Text style={Styles.MightLikeTxt}>You might Like</Text>
          </View>
        ) : null}
        {MightLikeList === null ? (
          <View style={Styles.MainContainer}>
            <FlatList
              data={MightLikeList}
              horizontal
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
            />
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  );
};

export default MightLike;
