import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  FlatList,
  Platform,
} from "react-native";
import React, { useState, useEffect } from "react";
import { ImagePath } from "../../constants/ImagePath";

import { COLOR } from "../../Utils/Colors";
import { moderateScale, verticalScale } from "react-native-size-matters";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileHeader from "../../components/CustomHeader/ProfileHeader";
import { ListPostWithCollectionListUrl } from "../../restAPI/ApiConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import CustomLoader from "../../components/CustomLoader/CustomLoader";
import { showMessage } from "react-native-flash-message";
import { Logout_ } from "../../../Logout";
const { height, width } = Dimensions.get("window");

const CollectionDataDetails = (props) => {
  const [loader, setLoader] = useState(false);
  const [CollectionList, setCollectionList] = useState([]);
  const [CollectionId, setCollectionId] = useState(
    props?.route?.params?.collectionId
  );
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      ListPostWithCollectionApi();
    })
    return unsubscribe
  }, [props.route]);

  // ************ List Post With Collections Api ************
  const ListPostWithCollectionApi = async () => {
    setCollectionList([])
    const value = await AsyncStorage.getItem("token" || "socaltoken");
    setLoader(true);
    axios({
      method: "get",
      url: ListPostWithCollectionListUrl,
      params: {
        collectionId: props?.route?.params?.collectionId,
      },
      headers: {
        token: value,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          console.log("==== List Post With Collection Response ====", response);
          setCollectionList(response?.data?.result?.docs);
          setLoader(false);
        } else {
          alert("Something went wrong.");
          setLoader(false);
        }
      })
      .catch((err) => {
        console.log("==== List Post With Collection Catch error=====", err.response);
        setLoader(false);
        if(err.response.data.responseCode===440){
          Logout_(props)

        }
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
          setLoader(false);
        } else {
          alert("Something went wrong.");
          setLoader(false);
        }
        setLoader(false);
      });
  };

  function _handleRefreshBought() {
    setIsFetching(false);
    ListPostWithCollectionApi();
  }

  return (
    <SafeAreaView>
      {/* ************ Header Container ************ */}
      <ProfileHeader
        BackIcon={true}
        onBackPress={() => props.navigation.goBack()}
        Title={true}
        HeaderTitle={props?.route?.params?.name + "'s" + " " + "Posts"}
        // titleStyling={{ width: width * 0.75, alignItems: "center" }}
        titleStyling={{ width: width * 0.8, }}
        HeaderTxtStyling={{ marginLeft: height * 0.04 }}
        BackIconStyling={{ marginLeft: verticalScale(10) }}
        PostIcon={false}
        Menu={false}
      />

      <View style={styles.Maincontainer}>
        <View style={styles.flatlistuppercontainer}>
          {!loader ? (
            CollectionList.length > 0 ? (
              <FlatList
                data={CollectionList}
                numColumns={2}
                refreshing={isFetching}
                onRefresh={_handleRefreshBought}
                contentContainerStyle={{ paddingBottom: height * 0.3 }}
                renderItem={({ item }) => {
                  return (
                    <View style={styles.flatlistcontainer}>
                      {/* ************ Image Container ************ */}
                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() =>
                          props.navigation.navigate("CollectionNftDetails", {
                            _id: item?._id,
                            collectionId: item?.collectionId,
                          })
                        }
                        style={styles.profileimageview}
                      >
                        {CollectionList ? (
                          <Image
                            style={styles.Nftimg}
                            source={{ uri: item?.mediaUrl }}
                          />
                        ) : (
                          <Image
                            style={styles.Nftimg}
                            source={ImagePath.COLLECTION_DETAILS_ONE}
                          />
                        )}
                      </TouchableOpacity>

                      {/* ************ Profile Pic and Name Container ************ */}
                      <View style={styles.flatlistmidcontainer}>
                        <View style={styles.profilenameview}>
                          <TouchableOpacity
                            onPress={() =>
                              props.navigation.navigate("AboutCreator", {
                                nftId: item?.userId?._id,
                              })
                            }
                          >
                            {item?.userId?.profilePic ? (
                              <Image
                                style={{
                                  height: 25,
                                  width: 25,
                                  borderRadius: 25 / 2,
                                }}
                                source={{ uri: item?.userId?.profilePic }}
                              />
                            ) : (
                              <Image
                                style={{
                                  height: 25,
                                  width: 25,
                                  resizeMode: "contain",
                                }}
                                source={ImagePath.PROFILE_PIC}
                              />
                            )}
                          </TouchableOpacity>
                          <View
                            style={{
                              justifyContent: "center",
                              height: height * 0.055,
                              width: width / 3,
                            }}
                          >
                            <Text numberOfLines={1} style={styles.usernameTxt}>
                              {item?.userId?.userName || item?.userId?.name}
                            </Text>
                            <Text style={[styles.TimeTxt]}>
                              {item?.postType}
                            </Text>
                          </View>
                        </View>
                      </View>

                      {/* ************ Description Container ************ */}
                      <View style={styles.flatlistmiddleview}>
                        <Text
                          numberOfLines={2}
                          style={{
                            color: COLOR.WHITE,
                            fontSize: height / 82,
                            fontFamily: "Montserrat-Regular",
                          }}
                        >
                          {item?.details}
                        </Text>
                      </View>
                    </View>
                  );
                }}
              />
            ) : (
              <View style={[styles.NoDataTxtContainer]}>
                <Text style={styles.NoDataTxt}>No Data Found...</Text>
              </View>
            )
          ) : (
            <CustomLoader
              loaderStyling={{ height: height * 0.85, width: width * 1 }}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CollectionDataDetails;

const styles = StyleSheet.create({
  Maincontainer: {
    height: height * 1.18,
    width: width * 1,
    backgroundColor: COLOR.BLACK,
  },
  addcollectionview: {
    height: height * 0.07,
    width: width * 0.4,
    marginHorizontal: 15,
    justifyContent: "center",
  },
  addcollectiontouchable: {
    height: height * 0.05,
    width: width * 0.37,
    borderWidth: 1,
    flexDirection: "row",
    borderColor: COLOR.BUTTON_PINK,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  addcolectTxt: {
    color: "#FFFF",
    fontFamily: "Montserrat-Medium",
    // fontSize: scale(10),
    fontSize: height / 64,
  },
  flatlistuppercontainer: {
    alignSelf: "center",
    width: width * 1,
    // alignItems: "center", // 27 April 2022
    marginTop: verticalScale(5),
    // alignItems: "center",
  },
  flatlistcontainer: {
    height: height * 0.3,
    width: width * 0.44,
    // backgroundColor: COLOR.HEADER_THEME, // New 21-May
    backgroundColor: "rgba(26, 26, 26, 1)", // New 25 June
    borderRadius: 10, //
    margin: 7,
  },
  profileimageview: {
    height: height * 0.19,
    width: width * 0.4,
    alignSelf: "center",
    borderRadius: 5,
  },
  Nftimg: {
    height: height * 0.18,
    width: width * 0.4,
    marginTop: height * 0.01,
    borderRadius: 5,
  },
  flatlistmidcontainer: {
    height: height * 0.055, //0.055
    width: width * 0.4,
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profilenameview: {
    height: height * 0.04,
    width: width * 0.27,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  heartview: {
    height: height * 0.04,
    width: width * 0.08,
    justifyContent: "center",
    alignItems: "center",
  },
  usernameTxt: {
    fontSize: height / 63,
    color: "#FFFF",
    fontFamily: "Montserrat-SemiBold",
    marginLeft: moderateScale(5),
  },
  TimeTxt: {
    fontSize: height / 89,
    color: "#BFBFBF",
    fontFamily: "Montserrat-Medium",
    marginLeft: moderateScale(5),
  },
  flatlistmiddleview: {
    height: height * 0.04, // 0.025
    width: width * 0.4,
    alignSelf: "center",
    justifyContent: "space-evenly",
  },
  collectioview: {
    height: height * 0.024,
    width: width * 0.4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  collectionTxt: {
    // fontSize: scale(8),
    fontSize: height / 67,
    color: "#FFFF",
    fontFamily: "Montserrat-Regular",
  },
  ethTxt: {
    color: "#FFFF",
    // fontSize: scale(10),
    fontSize: height / 62,
    fontFamily: "Montserrat-Bold",
  },
  subscribeview: {
    height: height * 0.04,
    width: width * 0.4,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  subscribetouchable: {
    height: height * 0.036,
    width: width * 0.28,
    borderRadius: 7,
    backgroundColor: COLOR.BUTTON_PINK,
    justifyContent: "center",
    alignItems: "center",
  },
  sharetouchable: {
    height: height * 0.03,
    width: width * 0.1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 7,
    borderWidth: 1,
    borderColor: COLOR.BUTTON_PINK,
  },
  NoDataTxtContainer: {
    height: height * 0.9,
    width: width,
    justifyContent: "center",
    alignItems: "center",
  },
  NoDataTxt: {
    color: COLOR.WHITE,
    fontFamily: "Montserrat-SemiBold",
    fontSize: height / 45,
  },
});
