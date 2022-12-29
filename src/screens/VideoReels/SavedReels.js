import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, { useRef, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Video from "react-native-video";
import { GetUserProfileUrl } from "../../restAPI/ApiConfig";
import { COLOR } from "../../Utils/Colors";
import axios from "axios";
const { height, width } = Dimensions.get("window");
import { SwiperFlatList } from "react-native-swiper-flatlist";

const SavedReels = (props) => {
  const [loader, setLoader] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userProfileDetails, setUserProfileDetails] = useState([]);

  const videoRef = useRef(null);
  const onBuffer = (e) => {};
  const onError = (e) => {};
  useEffect(() => {
    if (!!videoRef.current) {
      videoRef.current.seek(0);
    }
  }, [currentIndex]);

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
          console.log("====== Get User Profile Response ======", response?.data?.result.saveReels);
          setUserProfileDetails(response?.data?.result?.saveReels);
          setLoader(false);
        } else {
          alert("Something went wrong.");
          setLoader(false);
        }
      })
      .catch((err) => {
        console.log("===== Get Profile Catch Error ======", err);
        setLoader(false);
      });
    setLoader(false);
  };

  useEffect(() => {
    GetProfileApi();
  }, [props.route]);

  const onChangeIndex = ({ index }) => {
    setCurrentIndex(index);
  };

  return (
    <View style={styles.MainContainer}>
      {/* <SwiperFlatList
        index={0}
        style={{}}
        data={userProfileDetails}
        onChangeIndex={onChangeIndex}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
          console.log("==== item -----", item);
          return (
            <View>
              <Video
                source={{ uri: item?.reelsurl[0]===undefined?'':item?.reelsurl[0] }}
                posterResizeMode="cover"
                ref={videoRef}
                onBuffer={onBuffer()}
                onError={onError()}
                style={styles.backgroundVideo}
                resizeMode="cover"
                repeat
                // paused={currentIndex !== index}
              />
            </View>
          );
        }}
      /> */}
      {/* <Video
        source={{ uri: userProfileDetails?.reelsurl[0] }}
        posterResizeMode="cover"
        ref={videoRef}
        onBuffer={onBuffer()}
        onError={onError()}
        style={styles.backgroundVideo}
        resizeMode="cover"
        repeat
        // paused={currentIndex !== index}
      /> */}
    </View>
  );
};

export default SavedReels;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLOR.BLACK,
  },
  backgroundVideo: {
    height: height,
    width: width,
  },
});
