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
import { CollectionsListUrl } from "../../restAPI/ApiConfig";
import axios from "axios";
import CustomLoader from "../../components/CustomLoader/CustomLoader";
import AsyncStorage from "@react-native-async-storage/async-storage";
const { height, width } = Dimensions.get("window");

const Collections = (props) => {
  const [loader, setLoader] = useState(false);
  const [iAgree, setIAgree] = useState(true);
  const [CollectionList, setCollectionList] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const toggleIAgree = () => {
    setIAgree(false);
  };

  const _toggleIAgree = () => {
    setIAgree(true);
  };

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      CreateCollectionsApi();
    })
    return unsubscribe;
  }, [props.route]);

  // ************ Collection List Api ************
  const CreateCollectionsApi = async () => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");
    console.log("@@@ Token ====>", value)
    setLoader(true);
    axios({
      method: "get",
      url: CollectionsListUrl,
      headers: {
        token: value
      }
    })
      .then(async (response) => {
        console.log("====== Collection List Response ======", response.data);
        if (response.data.responseCode === 200) {
          setCollectionList(response?.data?.result?.docs);
          setLoader(false);
        } else {
          alert("Something went wrong.");
          setLoader(false);
        }
      })
      .catch((err) => {
        console.log("==== Collection List Catch error=====", err.response);
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
    CreateCollectionsApi();
  }

  return (
    <SafeAreaView>
      {/* ************ Header Container ************ */}
      <ProfileHeader
        Title={true}
        HeaderTitle="Trending Collections"
        HeaderTxtStyling={{ fontSize: height / 45 }}
        titleStyling={{ width: width * 0.82 }} // New Style 21 May
        PostIcon={true}
        PostClick={() => props.navigation.navigate("CreateCollection")}
        Menu={false}
      />

      <View style={styles.Maincontainer}>
        <View style={styles.flatlistuppercontainer}>
          {CollectionList?.length > 0 ? (
            <FlatList
              data={CollectionList}
              keyExtractor={(item) => item.id}
              numColumns={2}
              contentContainerStyle={{ paddingBottom: height * 0.2 }}
              refreshing={isFetching}
              onRefresh={_handleRefreshBought}
              renderItem={({ item }) => {
                return (
                  <View style={styles.flatlistcontainer}>
                    {/* ************ Collections Image ************ */}
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() =>
                        props.navigation.navigate("CollectionDataDetails", {
                          collectionId: item?._id,
                          name: item?.title
                        })
                      }
                      style={styles.profileimageview}
                    >
                      {CollectionList ? (
                        <Image
                          style={styles.Nftimg}
                          source={{ uri: item?.image }}
                        />
                      ) : (
                        <Image
                          style={styles.Nftimg}
                          source={ImagePath.COLLECTIONS_PICTURES}
                        />
                      )}
                    </TouchableOpacity>

                    {/* ************ Profile Pics and Collection Name ************ */}
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
                                height: 20,
                                width: 20,
                                resizeMode: "contain",
                              }}
                              source={ImagePath.PROFILE_PIC}
                              profilePic
                            />
                          )}
                        </TouchableOpacity>

                        <Text numberOfLines={1} style={styles.usernameTxt}>
                          {item?.title}
                        </Text >
                      </View >
                    </View >

                    {/* ************ Balance and Days ************ */}
                    < View style={styles.flatlistmiddleview} >
                      <View style={styles.collectioview}>
                        <View
                          style={{
                            width: width * 0.23, // 0.23
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <Text numberOfLines={1} style={styles.ethTxt}>
                            {Number(item?.amount)?.toFixed(4)}{" "}
                          </Text>
                          <Text
                            style={[
                              styles.ethTxt,
                              { fontFamily: "Montserrat-SemiBold" },
                            ]}
                          >
                            SHARE
                          </Text>
                        </View>

                        <View
                          style={{
                            width: width * 0.18, // 0.2
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Image source={ImagePath.DURATION} />
                          <Text numberOfLines={1} style={styles.ethTxt}>
                            {item?.duration} Days
                          </Text>
                        </View>
                      </View>
                    </View >
                  </View >
                );
              }}
            />
          ) : (
            // <View style={styles.NoDataTxtContainer}>
            //   <Text style={styles.NoDataTxt}>{No Comments Found...}</Text>
            // </View>
            <CustomLoader
              loaderStyling={{ height: height * 0.85, width: width * 1 }}
            />
          )}
        </View >
      </View >
    </SafeAreaView >
  );
};

export default Collections;

const styles = StyleSheet.create({
  Maincontainer: {
    height: height * 1.1,
    width: width * 1,
    // alignItems: "center",
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

  flatlistuppercontainer: {
    alignSelf: "center",
    width: width * 1,
    alignItems: "center",
    marginTop: verticalScale(5),
  },
  flatlistcontainer: {
    height: height * 0.283, // 0.3
    width: width * 0.44,
    // backgroundColor: COLOR.HEADER_THEME, // New 21- May
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
    height: height * 0.055,
    width: width * 0.4,
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profilenameview: {
    height: height * 0.04,
    width: width * 0.4, // 0.4
    flexDirection: "row",
    alignItems: "center",
  },
  heartview: {
    height: height * 0.04,
    width: width * 0.08,
    justifyContent: "center",
    alignItems: "center",
  },
  usernameTxt: {
    fontSize: height / 65,
    color: "#FFFF",
    fontFamily: "Montserrat-SemiBold",
    marginLeft: moderateScale(5),
  },
  flatlistmiddleview: {
    height: height * 0.025,
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

  ethTxt: {
    color: "#BFBFBF",
    fontSize: height / 83,
    fontFamily: "Montserrat-Medium",
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
    // height: height * 0.35,
    // width: width,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  NoDataTxt: {
    color: COLOR.WHITE,
    fontFamily: "Montserrat-SemiBold",
    fontSize: height / 45,
  },
});
