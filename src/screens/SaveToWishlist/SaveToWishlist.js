import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import ProfileHeader from "../../components/CustomHeader/ProfileHeader";
import Styles from "./Styles";
import { verticalScale } from "react-native-size-matters";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GetWishList } from "../../restAPI/ApiConfig";
import CustomLoader from "../../components/CustomLoader/CustomLoader";
import Video from "react-native-video";
const { height, width } = Dimensions.get("window");


const SaveToWishlist = (props) => {
  const [loader, setLoader] = useState(false);
  const [wishListing, setWishListing] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRef = useRef(null);
  const onBuffer = (e) => {};
  const onError = (e) => {};

  useEffect(() => {
    if (!!videoRef.current) {
      videoRef.current.seek(0);
    }
  }, [currentIndex]);

  useEffect(() => {
    WishList();
  }, []);

  // ************ WishList List Api ************
  const WishList = async () => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");

    setLoader(true);
    axios({
      method: "get",
      url: GetWishList,
      headers: {
        token: value,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          console.log("====== Wishlist Response ======", response?.data?.result?.myWatchlist);
          setWishListing(response?.data?.result?.myWatchlist);
          setLoader(false);
        } else {
          alert("Something went wrong.");
          setLoader(false);
        }
      })
      .catch((err) => console.log("===== Wishlist Catch Error ======", err));
  };

  const [refreshing, setRefreshing] = React.useState(false);
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    WishList();
    wait(1000).then(() => {
      WishList(), setRefreshing(false);
    });
  }, []);

  return (
    <SafeAreaView>
      <View style={Styles.MainContainer}>
        {/* ************ Header Container ************ */}
        <ProfileHeader
          BackIcon={true}
          Title={true}
          HeaderTitle="Saved"
          // titleStyling={{ width: width * 0.75, alignItems: "center" }}
          titleStyling={{ width: width * 0.7 }}
          HeaderTxtStyling={{ marginLeft: height * 0.04 }}
          onBackPress={() => props.navigation.goBack()}
          BackIconStyling={{ marginLeft: verticalScale(10) }}
          PostIcon={false}
          Menu={false}
          ShareIcon={false}
        />
        {/* ************ Saved Images Container ************ */}
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View
            style={{
              flexDirection: "row",
              width:width*1,
              flexWrap:'wrap',
              justifyContent:'space-between',
            }}
          >
            {!loader ? (
              wishListing?.length > 0 ? (
                wishListing?.map((item, index) => (
                  <View>
                    {(item?.mediaUrl?.includes(".png") || item?.mediaUrl?.includes(".jpg")) ? 
                    <TouchableOpacity
                      onPress={() =>
                        props.navigation.navigate("ShowImage", {
                          allPost: item,
                        })
                      }
                      key={index}
                      style={{marginTop:20}}
                    >
                      <Image
                        source={{ uri: item?.mediaUrl }}
                        style={{ height: 200, width: width*0.45, margin: 5}}
                      />
                    </TouchableOpacity> : 
                    <TouchableOpacity
                    onPress={() =>
                      props.navigation.navigate("ShowImage", {
                        allPost: item,
                      })
                      }
                      key={index}
                      style={{marginTop:20}}
                      >
                      {/* <Image
                        source={{ uri: item?.mediaUrl }}
                        style={{ height: 200, width: width*0.45, margin: 5, resizeMode:'contain' }}
                      /> */}
                      <Video
                        source={{ uri: item?.mediaUrl }}
                        ref={videoRef}
                        onBuffer={onBuffer}
                        onError={onError}
                        style={{
                          height: 200,
                          width: width * 0.45,
                        }}
                        keyExtractor={(item) => item.id}
                        index={0}
                        repeat
                        // paused={false}
                        resizeMode="cover"
                        posterResizeMode="contain"
                        paused={currentIndex !== index}
                        controls={true}
                        disableSeekbar
                        disableBack
                      />
                    </TouchableOpacity> 
                    }
                  </View>
                ))
              ) : (
                <View style={Styles.NoDataTxtContainer}>
                  <Text style={Styles.NoDataTxt}>No Saved Data Found...</Text>
                </View>
              )
            ) : (
              <CustomLoader />
            )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default SaveToWishlist;
