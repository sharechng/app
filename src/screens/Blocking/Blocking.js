import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  Image,
  FlatList,
  TextInput,
  Platform,
} from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";
import AuthHeader from "../../components/CustomHeader/AuthHeader";
import { ImagePath } from "../../constants/ImagePath";
import { COLOR } from "../../Utils/Colors";
import AppButton from "../../components/CustomButton/CustomButton";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomLoader from "../../components/CustomLoader/CustomLoader";
import { BlockedUserListUrl, BlockUnBlockUrl } from "../../restAPI/ApiConfig";
import moment from "moment";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { showMessage } from "react-native-flash-message";
import ProfileHeader from "../../components/CustomHeader/ProfileHeader";
import { Logout_ } from "../../../Logout";
const { height, width } = Dimensions.get("window");

const Blocking = (props) => {
  const [loader, setLoader] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [blockedUserList, setBlockedUserList] = useState([]);
  const [blockListId, setBlockListId] = useState();
  const [unBlockUserList, setUnBlockUserList] = useState();
  const [GlobalSearchData, setGlobalSearchData] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [searchTxt, setSearchTxt] = useState("");

  useEffect(() => {
    BlockListingApi();
  }, [props.route]);

  // ************ Country Code States Starts Here ************
  const [filterdata, setFilterdata] = useState("");
  const [isText, setIsText] = React.useState("");

  // ************ Country Code Search Functions ************
  const SeacrFunct = (value) => {
    setGlobalSearchData(blockedUserList);
    setIsSearch(true);
    if (value !== "") {
      let mydata = GlobalSearchData.filter((item, index) => {
        if (item?.userName.includes(value)) {
          return item;
        }
      });
      setGlobalSearchData(mydata);
    } else {
      setIsSearch(false);
    }
  };
  // ************************** Ends Here **************************

  // ************ Block List Api ************
  const BlockListingApi = async () => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");

    setLoader(true);
    axios({
      method: "get",
      url: BlockedUserListUrl,
      headers: {
        token: value,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          console.log("==== Blocked List Response ====", response);
          setBlockedUserList(response?.data?.result?.blockedUser);
          setGlobalSearchData(response?.data?.result?.blockedUser);
          setLoader(false);
        } else {
          alert("Something went wrong.");
          setLoader(false);
        }
      })
      .catch((err) =>{
        setLoader(false);
        if(err.response.data.responseCode===440){
          Logout_(props)

        }
      }
      );
  };

  // ************ Block List Api ************
  const BlockAndUnBlockApi = async (id) => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");

    const formData = new FormData();
    formData.append("_id", {
      _id: id,
    });

    setLoader(true);
    axios({
      method: "post",
      url: BlockUnBlockUrl,
      data: formData?._parts[0][1],
      headers: {
        token: value,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          BlockListingApi();
          console.log("====== Blocked List Response ======", response);
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
          BlockListingApi();
          setUnBlockUserList(response?.data?.result?.blockStatus);
          setLoader(false);
        } else {
          alert("Something went wrong.");
          setLoader(false);
        }
      })
      .catch((err) =>
        console.log("===== Blocked List Catch Error ======", err)
      );
  };

  // *************** FlatList Refreshing Functions ***************
  const _handleRefresh = () => {
    setIsFetching(false);
    BlockListingApi();
    BlockAndUnBlockApi();
  };

  return (
    <SafeAreaView>
      <KeyboardAwareScrollView>
        <View style={styles.Maincontainer}>
          <View style={styles.headerView}>
            <AuthHeader
              backIcon={true}
              onBackPress={() => props.navigation.goBack()}
              Title={true}
              HeaderTitle="Blocking"
              headerTitle={{ marginLeft: height * 0.02 }}
              titleStyling={{ width: width * 0.6, alignItems: "flex-start" }}
            />
          </View>

          {/* ************ Description Container ************ */}
          <View style={styles.blockingcontainer}>
            <View style={styles.notificationview}>
              <Text style={styles.blockTxt}>Blocking-</Text>
            </View>
            <View style={styles.notierecieve}>
              <Text style={styles.notirecieveTxt}>
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout...
              </Text>
            </View>
          </View>

          {/* ************ Search Input Field Container ************ */}
          <View style={styles.searchview}>
            <View style={styles.searchtxtinputview}>
              <View style={styles.searchTxtinput}>
                <TextInput
                  style={{
                    paddingHorizontal: 10,
                    fontSize: height / 56,
                    color: COLOR.WHITE,
                    fontFamily: "Montserrat-Regular",
                  }}
                  placeholder="Type a name"
                  placeholderTextColor={COLOR.WHITE}
                  maxLength={50}
                  keyboardType="default"
                  onChangeText={(txt) => {
                    setSearchTxt(txt),
                      // SearchApi(txt);
                      SeacrFunct(txt);
                  }}
                />
              </View>
              <View style={styles.searchImg}>
                <Image
                  style={{ resizeMode: "contain" }}
                  source={ImagePath.SEARCH_ICON}
                />
              </View>
            </View>
          </View>

          {/* ************ Blocked List Container ************ */}
          {loader ? (
            <CustomLoader loaderStyling={{ flex: 1 }} />
          ) : isSearch ? (
            GlobalSearchData.length > 0 ? (
              <View style={styles.flatlistuppercontainer}>
                <FlatList
                  nestedScrollEnabled={true}
                  data={GlobalSearchData}
                  renderItem={({ item }) => {
                    console.log("--- item -----", item);
                    return (
                      <View style={styles.flatlistcontainer}>
                        <View style={styles.profilepicview}>
                          {item?.profilePic ? (
                            <Image
                              style={{
                                borderRadius: 43 / 2,
                                height: 43,
                                width: 43,
                              }}
                              source={{ uri: item?.profilePic }}
                            />
                          ) : (
                            <Image
                              style={{
                                resizeMode: "contain",
                                borderRadius: 100,
                                height: 43,
                                width: 43,
                              }}
                              source={ImagePath.PROFILE_PIC}
                            />
                          )}
                        </View>
                        <View style={styles.flatlistmidcontainer}>
                          <Text
                            numberOfLines={1}
                            style={{
                              color: COLOR.WHITE,
                              fontSize: height / 50,
                              fontFamily: "Montserrat-Medium",
                            }}
                          >
                            {item?.userName || item?.name}
                          </Text>
                          <Text
                            numberOfLines={2}
                            style={{
                              color: "#989595",
                              fontSize: height / 60,
                              fontFamily: "Montserrat-Regular",
                            }}
                          >
                            Blocked -{" "}
                            {moment(item?.createdAt).local().fromNow()}
                          </Text>
                        </View>
                        <View style={styles.unblockview}>
                          <AppButton
                            title="Unblock"
                            type="small"
                            textStyle={{
                              fontFamily: "Montserrat-SemiBold",
                              fontSize: height / 60,
                            }}
                            ButtonPress={() => {
                              setBlockListId(item?._id),
                                BlockAndUnBlockApi(item?._id);
                            }}
                          />
                        </View>
                      </View>
                    );
                  }}
                />
              </View>
            ) : (
              <View style={styles.noDataView}>
                <Text style={styles.nodataTxt}>No Data Found...</Text>
              </View>
            )
          ) : blockedUserList.length > 0 ? (
            <View style={styles.flatlistuppercontainer}>
              <FlatList
                nestedScrollEnabled={true}
                data={blockedUserList}
                refreshing={isFetching}
                onRefresh={_handleRefresh}
                renderItem={({ item }) => {
                  return (
                    <View style={styles.flatlistcontainer}>
                      <View style={styles.profilepicview}>
                        {item?.profilePic ? (
                          <Image
                            style={{
                              borderRadius: 43 / 2,
                              height: 43,
                              width: 43,
                            }}
                            source={{ uri: item?.profilePic }}
                          />
                        ) : (
                          <Image
                            style={{
                              resizeMode: "contain",
                              borderRadius: 100,
                              height: 43,
                              width: 43,
                            }}
                            source={ImagePath.PROFILE_PIC}
                          />
                        )}
                      </View>

                      <View style={styles.flatlistmidcontainer}>
                        <Text
                          numberOfLines={1}
                          style={{
                            color: COLOR.WHITE,
                            fontSize: height / 50,
                            fontFamily: "Montserrat-Medium",
                          }}
                        >
                          {item?.userName || item?.name}
                        </Text>
                        <Text
                          numberOfLines={2}
                          style={{
                            color: "#989595",
                            fontSize: height / 60,
                            fontFamily: "Montserrat-Regular",
                          }}
                        >
                          Blocked - {moment(item?.createdAt).local().fromNow()}
                        </Text>
                      </View>

                      <View style={styles.unblockview}>
                        <AppButton
                          title="Unblock"
                          type="small"
                          textStyle={{
                            fontFamily: "Montserrat-SemiBold",
                            fontSize: height / 60,
                          }}
                          ButtonPress={() => {
                            setBlockListId(item?._id),
                              BlockAndUnBlockApi(item?._id);
                          }}
                        />
                        {/* )} */}
                      </View>
                    </View>
                  );
                }}
              />
            </View>
          ) : (
            <View style={styles.noDataView}>
              <Text style={styles.nodataTxt}>No Data Found...</Text>
            </View>
          )}
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Blocking;

const styles = StyleSheet.create({
  Maincontainer: {
    height: height * 1,
    width: width * 1,
  },
  headerView: {
    marginTop: height * 0.02,
    flexDirection: "row",
    height: height * 0.08,
    width: width * 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  headercontainer: {
    height: height * 0.1,
    width: width * 0.9,
    backgroundColor: "pink",
    alignSelf: "center",
  },
  blockingcontainer: {
    height: height * 0.2,
    width: width * 0.9,
    alignSelf: "center",
    justifyContent: "center",
  },
  notificationview: {
    height: height * 0.06,
    width: width * 0.7,
    justifyContent: "flex-end",
  },
  notierecieve: {
    height: height * 0.1,
    width: width * 0.94,
    justifyContent: "flex-start",
  },
  blockTxt: {
    fontSize: height / 37,
    color: COLOR.TXT_COLOR,
    fontWeight: "600",
    fontFamily: "Montserrat-Medium",
  },
  notirecieveTxt: {
    fontSize: height / 55,
    color: COLOR.TXT_COLOR,
    fontFamily: "Montserrat-Regular",
    marginTop: verticalScale(7),
  },
  searchview: {
    height: height * 0.1,
    width: width * 0.9,
    alignSelf: "center",
    justifyContent: "center",
  },
  noDataView: {
    // height: height * 0.1
    flex: 1,
    width: width * 1,
    // backgroundColor:"red",
    justifyContent: "center",
    alignItems: "center",
  },
  nodataTxt: {
    color: "white",
    fontSize: height / 45,
    fontFamily: "Montserrat-SemiBold",
  },
  searchtxtinputview: {
    height: height * 0.07,
    width: width * 0.9,
    backgroundColor: COLOR.TXT_INPT_COLOR,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: COLOR.RIGHT_BORDER_WIDTH,
    flexDirection: "row",
    alignItems: "center",
  },
  searchTxtinput: {
    height: height * 0.06,
    width: width * 0.75,
    justifyContent: "center",
  },
  searchImg: {
    height: height * 0.06,
    width: width * 0.13,
    justifyContent: "center",
    alignItems: "center",
  },
  flatlistuppercontainer: {
    alignSelf: "center",
    height: height * 0.6,
    width: width * 0.9,
  },
  flatlistcontainer: {
    height: height * 0.1,
    width: width * 0.9,
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "space-between",
  },
  profilepicview: {
    height: height * 0.07,
    width: width * 0.13,
    justifyContent: "center",
  },
  flatlistmidcontainer: {
    height: height * 0.07,
    width: width * 0.4,
    justifyContent: "center",
    marginHorizontal: 10,
  },
  unblockview: {
    height: height * 0.07,
    width: width * 0.32,
    justifyContent: "center",
    alignItems: "center",
  },
  NoDataTxtContainer: {
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
