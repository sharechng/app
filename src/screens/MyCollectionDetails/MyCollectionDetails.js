import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import { ImagePath } from "../../constants/ImagePath";

import { COLOR } from "../../Utils/Colors";
import { verticalScale } from "react-native-size-matters";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileHeader from "../../components/CustomHeader/ProfileHeader";
import {
  ListPostWithCollectionListUrl,
  NFTCollectionListUrl,
} from "../../restAPI/ApiConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { showMessage } from "react-native-flash-message";
import moment from "moment";
import CustomLoader from "../../components/CustomLoader/CustomLoader";
const { height, width } = Dimensions.get("window");

const MyCollectionDetails = (props) => {
  const [loader, setLoader] = useState(false);
  const [loaderCollection, setLoaderCollection] = useState(false);
  const [CollectionId, setCollectionId] = useState(
    // props?.route?.params?.collectionId
    props?.route?.params?._id
  );
  const [CollectionList, setCollectionList] = useState({});

  useEffect(() => {
    ListPostWithCollectionApi();
  }, [props.route]);

  // ************ List Post With Collections Api ************
  const ListPostWithCollectionApi = async () => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");

    setLoaderCollection(true);
    axios({
      method: "get",
      url: NFTCollectionListUrl + `${CollectionId}`,
      headers: {
        token: value,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          console.log("==== List Post With Collection Response ====", response);
          setCollectionList(response?.data?.result);
          setLoaderCollection(false);
        } else {
          alert("Something went wrong.");
          setLoaderCollection(false);
        }
      })
      .catch((err) => {
        console.log("==== List Post With Collection Catch error=====", err);
        if (err.response.data.responseCode === 404) {
          showMessage({
            message: err?.response?.data?.responseMessage,
            type: "danger",
            icon: "danger",
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
          setLoaderCollection(false);
        } else {
          alert("Something went wrong.");
          setLoaderCollection(false);
        }
      });
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
        ShareIcon={false}
        ShareClick={() => ShareMessage()}
      />
      {!loaderCollection ? (
        <ScrollView>
          <View style={styles.MainContainer}>
            {/* ************ Image Container ************ */}
            <View style={styles.ImageContainer}>
              {CollectionList?.image ? (
                <Image
                  source={{ uri: CollectionList?.image }}
                  style={{ height: height * 0.4, width: width * 1 }} // New
                  resizeMode="contain"
                />
              ) : (
                <Image
                  source={ImagePath.SUBSCRIBED_PIC}
                  style={{ height: height * 0.413, width: width * 1 }} // New
                  resizeMode="contain"
                />
              )}
            </View>

            {/* ************ Profile Container ************ */}
            <View style={[styles.ProfileView]}>
              <View style={styles.PicNameContainer}>
                <View style={styles.ProfileNameContainer}>
                  <Text style={styles.ProfileNameTxt}>
                    {CollectionList?.name}
                  </Text>
                  <View style={{ flexDirection: "row" }}>
                    {CollectionList?.likesCount > 0 ? (
                      <Image
                        source={ImagePath.HEART_LIKE}
                        style={{ height: 18, width: 18 }}
                      />
                    ) : (
                      <Image
                        source={ImagePath.LIKE}
                        style={{ height: 18, width: 18 }}
                      />
                    )}
                    <Text
                      style={[
                        styles.DurationTxt,
                        { marginLeft: height * 0.01, fontSize: height / 50 },
                      ]}
                    >
                      {CollectionList?.likesCount}
                    </Text>
                  </View>
                </View>
                <View
                  style={[styles.DurationContainer, { height: height * 0.02 }]}
                >
                  <Text style={styles.DurationTxt}>Current Price : </Text>
                  <Text
                    style={[
                      styles.DaysTxt,
                      { fontFamily: "Montserrat-SemiBold" },
                    ]}
                  >
                    {CollectionList?.amount} SHARE
                  </Text>
                </View>
              </View>

              <View
                style={{
                  height: height * 0.01,
                  width: width * 1,
                  borderBottomWidth: 1,
                  borderColor: COLOR.TXT_COLOR,
                  marginVertical: height * 0.015,
                }}
              ></View>

              <View style={styles.DurationPrice}>
                <View style={[styles.DurationContainer]}>
                  <Text style={styles.DescriptionTxt}>Descriptions :</Text>
                </View>
              </View>

              <View style={[styles.DurationPriceTwo]}>
                <Text numberOfLines={7} style={styles.DurationTxt}>
                  {CollectionList?.description}
                </Text>
              </View>

              <View
                style={{
                  height: height * 0.09,
                  width: width * 0.9,
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  borderRadius: 20,
                  flexDirection: "row",
                  marginTop: height * 0.02,
                }}
              >
                <View style={styles.ProfilePicContainer}>
                  {CollectionList?.userId?.profilePic ? (
                    <Image
                      source={{ uri: CollectionList?.userId?.profilePic }}
                      style={{ height: 40, width: 40, borderRadius: 40 / 2 }}
                    />
                  ) : (
                    <Image
                      source={ImagePath.PROFILE_PIC}
                      style={{ height: 40, width: 40, borderRadius: 40 / 2 }}
                    />
                  )}
                </View>

                <View
                  style={{
                    height: height * 0.09,
                    width: width * 0.74,
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={[styles.ProfileNameTxt, { marginLeft: height * 0.01 }]}
                  >
                    {CollectionList?.userId?.userName ||
                      CollectionList?.userId?.name}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      ) : (
        <CustomLoader
          loaderStyling={{ height: height * 0.85, width: width * 1 }}
        />
      )}
    </SafeAreaView>
  );
};

export default MyCollectionDetails;

const styles = StyleSheet.create({
  MainContainer: {
    height: height * 1.2,
    alignItems: "center",
    // backgroundColor: COLOR.BACKGROUND_THEME,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  ImageContainer: {
    height: height * 0.413,
    width: width * 1,
    backgroundColor: COLOR.BACKGROUND_THEME,
  },
  ProfileView: {
    height: height * 0.1,
    width: width * 1,
    marginTop: verticalScale(26),
    alignItems: "center",
  },
  PicNameContainer: {
    height: height * 0.08,
    width: width * 1,
    alignItems: "center",
    justifyContent: "center",
  },
  ProfilePicContainer: {
    height: height * 0.09,
    width: width * 0.16,
    justifyContent: "center",
    alignItems: "center",
  },
  ProfileNameContainer: {
    height: height * 0.05,
    width: width * 0.9, // 0.78
    flexDirection: "row",
    justifyContent: "space-between",
  },
  ProfileNameTxt: {
    color: COLOR.WHITE,
    fontSize: height / 42,
    fontFamily: "Montserrat-SemiBold",
  },
  ProfileDataTxtTwo: {
    color: COLOR.WHITE,
    fontSize: height / 65,
    fontFamily: "Montserrat-Medium",
    marginTop: verticalScale(4),
  },
  DurationPrice: {
    height: height * 0.04,
    width: width * 1,
    justifyContent: "center",
    alignItems: "center",
  },
  DurationPriceTwo: {
    height: height * 0.15,
    width: width * 0.9,
    marginVertical: 6,
  },
  DurationContainer: {
    // height: height * 0.02,
    width: width * 0.9,
    flexDirection: "row",
  },
  DurationTxt: {
    color: "#979797",
    fontSize: height / 60,
    fontFamily: "Montserrat-Regular",
  },
  DescriptionTxt: {
    color: COLOR.WHITE,
    fontSize: height / 50,
    fontFamily: "Montserrat-SemiBold",
  },
  DaysTxt: {
    color: COLOR.WHITE,
    fontSize: height / 60,
    fontFamily: "Montserrat-Medium",
  },
  BtnContainer: {
    height: height * 0.13, // 0.16
    width: width * 0.9,
    justifyContent: "flex-end",
  },
  // ********** Confirmation Modal Styling Starts **********
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  btnContainer: {
    height: height * 0.1,
    alignItems: "center",
    justifyContent: "center",
    width: width * 0.45,
  },

  NoDataTxt: {
    color: COLOR.WHITE,
    fontFamily: "Montserrat-SemiBold",
    fontSize: height / 45,
  },
});
