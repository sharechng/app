import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
  Modal,
  Share,
  Platform,
  SafeAreaView,
} from "react-native";
import { verticalScale, moderateScale } from "react-native-size-matters";
import { COLOR } from "../../Utils/Colors";
import { ImagePath } from "../../constants/ImagePath";
import { AuctionListUrl, MyOwnAuctionListUrl } from "../../restAPI/ApiConfig";
import ProfileHeader from "../../components/CustomHeader/ProfileHeader";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import CustomLoader from "../../components/CustomLoader/CustomLoader";
import { showMessage } from "react-native-flash-message";
import { Logout_ } from "../../../Logout";
const { height, width } = Dimensions.get("window");

const Auctions = (props) => {
  const [loader, setLoader] = useState(false);
  const [AuctionsList, setAuctionsList] = useState([]);

  const [isFetching, setIsFetching] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);
  const [modalVisible5, setModalVisible5] = useState(false);

  useEffect(() => {
    
    const subscribe = props.navigation.addListener("focus", () => {
      AsyncStorage.setItem("activetab","auction")

      AuctionListApi();
      // SearchApi();
    });

    return subscribe;
  }, [props.route]);

  // ******************** Auction List ********************
  const AuctionListApi = async () => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");
    console.log(value);

    setLoader(true);
    axios({
      method: "get",
      url: AuctionListUrl,
      // url: MyOwnAuctionListUrl, // New
      // params: {
      //   limit: 50,
      // },
      headers: {
        token: value,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          console.log("==== Auctions Listing Response ====", response);
          setAuctionsList(response?.data?.result?.docs);
          setLoader(false);
        } else {
          alert("Something went wrong.");
          setLoader(false);
        }
      })
      .catch((err) => {
        console.log("==== Auctions List Catch error=====", err.response);
        setLoader(false);
        if(err.response.data.responseCode===440){
          Logout_(props)

        }
        if (err.response.data.responseCode === 404) {
          showMessage({
            message: "No Auctions found",
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
      
      });
    setLoader(false);
  };

  // ************** FlatList Refreshing Functions **************
  function _handleRefresh() {
    setIsFetching(false);
    AuctionListApi();
  }

  const renderItem = (item, index) => {
    return (
      <View style={styles.flatlistContainer}>
        <View style={styles.hederBar}>
          <View style={styles.elipseView}>
            {item?.item?.userId?.profilePic ? (
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate("AboutCreator", {
                    nftId: item?.item?.userId?._id,
                  })
                }
              >
                <Image
                  source={{ uri: item?.item?.userId?.profilePic }}
                  style={{ height: 25, width: 25, borderRadius: 25 / 2 }}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate("AboutCreator", {
                    nftId: item?.item?.userId?._id,
                  })
                }
              >
                <Image
                  source={ImagePath.PROFILE_PIC}
                  style={{ height: 25, width: 25, borderRadius: 25 / 2 }}
                />
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity
          // onPress={() => setModalVisible(true)}
          >
            <Image
              source={ImagePath.OPTION}
              resizeMode="contain"
              style={styles.optionImg}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate("AuctionsDetails", {
              _id: item?.item?._id,
            })
          }
          activeOpacity={0.7}
        >
          {item?.item?.mediaUrl ? (
            <Image
              source={{ uri: item?.item?.mediaUrl }}
              style={styles.itemImg}
            />
          ) : (
            <Image source={ImagePath.PICTURE} style={styles.itemImg} />
          )}
        </TouchableOpacity>

        <View style={styles.titleView}>
          <View style={{ width: width * 0.3 }}>
            <Text numberOfLines={1} style={styles.titleTxt}>
              {item?.item?.title}
            </Text>
          </View>
          <View style={styles.likeView}>
            <Image
              source={ImagePath.HEART_LIKE}
              style={styles.likeImg}
              resizeMode="contain"
            />
            <Text style={styles.likeTxt}>{item?.item?.likesCount}</Text>
          </View>
        </View>

        <View style={styles.bidView}>
          <Text style={styles.bidnumTxt}>{item?.item?.amount} SHARE</Text>
          <Text style={styles.timeTxt}>
            {moment(item?.item?.updatedAt).local().fromNow()}
          </Text>
        </View>
      </View>
    );
  };

  // ******************** Share Message Functionality ********************
  const ShareMessage = async () => {
    try {
      const result = await Share.share({
        // message: myReferralCode?.referralCode, // Dynamic Message
        message: "Social App", // Static Message
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // myReferralCode?.referralCode; // Dynamic Message
          ("Social App");
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
      Alert.alert("Social link is required to share");
    }
  };

  return (
    <SafeAreaView>
      {/* ************ Header Container ************ */}

      <ProfileHeader
        Title={true}
        HeaderTitle="Auctions"
        HeaderTxtStyling={{ fontSize: height / 55 }}
        titleStyling={{
          width: width * 0.5,
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
        }}
        PostIcon={false}
        Menu={false}
        RightTxt={true}
        HeaderRightTitle="Trending Collections"
        HeaderRightTxtStyling={{ fontSize: height / 55 }}
        RightClick={() => props.navigation.navigate("Collections")}
      />
      {!loader ? (
        <View style={styles.MainContainer}>
          {AuctionsList?.length > 0 ? (
            <FlatList
              data={AuctionsList}
              nestedScrollEnabled
              renderItem={renderItem}
              numColumns={2}
              refreshing={isFetching}
              onRefresh={_handleRefresh}
              keyExtractor={(item) => item.id}
              contentContainerStyle={{
                paddingBottom:
                  Platform.OS === "android" ? height * 0.3 : height * 0.35,
              }}
            />
          ) : (
            <View style={[styles.NoDataTxtContainer]}>
              <Text style={styles.NoDataTxt}>No Data Found...</Text>
            </View>
          )}
        </View>
      ) : (
        <CustomLoader
          loaderStyling={{ height: height * 0.85, width: width * 1 }}
        />
      )}

      {/* *************** Options to Report and Block Modal *************** */}
      <View style={{}}>
        <Modal animationType="none" transparent={true} visible={modalVisible}>
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={{
              height: height * 1,
              width: width * 1,
              backgroundColor: "rgba(0,0,0,0.4)",
            }}
          >
            <View style={[styles.inputCardModal]}>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false), ShareMessage();
                }}
              >
                <View style={styles.ShareTxtContainer}>
                  <View style={styles.ModalOneTxtView}>
                    <Text style={styles.ModalOneTxt}>{"Share"}</Text>
                  </View>
                  <View style={styles.ModalOneImgView}>
                    <Image
                      style={[
                        styles.ShareImgContainer,
                        {
                          height: 18,
                          width: 20,
                        },
                      ]}
                      source={ImagePath.HEADER_SHARE} // Share
                      resizeMode="contain"
                    />
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setModalVisible1(true), setModalVisible(false);
                }}
              >
                <View style={styles.ReportTxtContainer}>
                  <View style={styles.ModalOneTxtView}>
                    <Text style={styles.ModalOneTxt}>{"Report"}</Text>
                  </View>
                  <View style={styles.ModalOneImgView}>
                    <Image
                      style={[
                        styles.ShareImgContainer,
                        {
                          height: 18,
                          width: 20,
                        },
                      ]}
                      source={ImagePath.REPORT} // Share
                      resizeMode="contain"
                    />
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setModalVisible2(true), setModalVisible(false);
                }}
              >
                <View style={styles.ReportTxtContainer}>
                  <View style={styles.ModalOneTxtView}>
                    <Text style={styles.ModalOneTxt}>{"Block"}</Text>
                  </View>
                  <View style={styles.ModalOneImgView}>
                    <Image
                      style={[
                        styles.ShareImgContainer,
                        {
                          height: 18,
                          width: 18,
                        },
                      ]}
                      source={ImagePath.BLOCK} // Share
                      resizeMode="contain"
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
      </View>

      {/* *************** Report Modal *************** */}
      <View>
        <Modal visible={modalVisible1} transparent={true}>
          <TouchableOpacity
            onPress={() => setModalVisible1(false)}
            style={{
              height: height * 1,
              width: width * 1,
              backgroundColor: "rgba(0,0,0,0.4)",
            }}
          >
            <View style={styles.ReportModalOne}>
              <View style={styles.ReportModalMainContainer}>
                <View style={{ marginTop: 20 }}>
                  <Text style={styles.ReportModalAlertTxt}>{"Alert"}</Text>
                </View>
                <View style={{ alignSelf: "center", marginVertical: 10 }}>
                  <Text style={styles.ReportModalConfirm}>
                    {"Are you sure you want to report?"}
                  </Text>
                </View>

                <View style={styles.ReportModalContainerTwo}>
                  <View style={{ justifyContent: "center", width: 100 }}>
                    <TouchableOpacity onPress={() => setModalVisible1(false)}>
                      <Text style={styles.ReportModalCancelTxt}>
                        {"Cancel"}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View
                    style={{
                      borderRightColor: "#969696",
                      borderRightWidth: 0.5,
                      height: 40,
                    }}
                  ></View>
                  <TouchableOpacity
                    style={{ width: 100 }}
                    // onPress={() =>
                    //   this.setState({
                    //     modalVisible1: false,
                    //     modalVisible6: true,
                    //   })
                    // }
                    onPress={() => setModalVisible1(false)}
                  >
                    <Text style={styles.ReportModalReportTxt}>{"Report"}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
      </View>

      {/* *************** Block Modal *************** */}
      <View>
        <Modal visible={modalVisible2} transparent={true}>
          <TouchableOpacity
            onPress={() => setModalVisible2(false)}
            style={{
              height: height * 1,
              width: width * 1,
              backgroundColor: "rgba(0,0,0,0.4)",
            }}
          >
            <View style={styles.ReportModalOne}>
              <View style={styles.ReportModalMainContainer}>
                <View style={{ marginTop: 20 }}>
                  <Text style={styles.ReportModalAlertTxt}>{"Alert"}</Text>
                </View>
                <View style={{ alignSelf: "center", marginVertical: 10 }}>
                  <Text style={styles.ReportModalConfirm}>
                    {"Are you sure you want to block?"}
                  </Text>
                </View>

                <View style={styles.ReportModalContainerTwo}>
                  <View style={{ justifyContent: "center", width: 100 }}>
                    <TouchableOpacity onPress={() => setModalVisible2(false)}>
                      <Text style={styles.ReportModalCancelTxt}>
                        {"Cancel"}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View
                    style={{
                      borderRightColor: "#969696",
                      borderRightWidth: 0.5,
                      height: 40,
                    }}
                  ></View>
                  <TouchableOpacity
                    style={{ width: 100 }}
                    // onPress={() =>
                    //   this.setState({
                    //     modalVisible1: false,
                    //     modalVisible6: true,
                    //   })
                    // }
                    onPress={() => setModalVisible2(false)}
                  >
                    <Text style={styles.ReportModalReportTxt}>{"Block"}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default Auctions;

const styles = StyleSheet.create({
  MainContainer: {
    height: height * 1.1,
    width: width * 1,
    backgroundColor: COLOR.BLACK,
    justifyContent: "center",
    // alignItems: "center",
  },

  bidView: {
    height: height * 0.02,
    width: width * 0.42,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  bidTxt: {
    fontSize: height / 80,
    color: COLOR.TXT_COLOR,
    fontFamily: "Montserrat-Regular",
  },

  likeView: {
    height: height * 0.02,
    width: width * 0.12,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },

  viewTxt: {
    fontSize: height / 60,
    fontWeight: "600",
    fontFamily: "Montserrat-Regular",
    color: COLOR.WHITE,
  },
  timeTxt: {
    fontSize: height / 100,
    color: COLOR.WHITE,
    fontFamily: "Montserrat-Regular",
  },
  viewBtn: {
    backgroundColor: COLOR.BUTTON_PINK,
    borderRadius: height * 0.005,
    height: height * 0.035,
    width: width * 0.33,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    marginTop: height * 0.01,
  },
  auctionView: {
    marginTop: height * 0.002,
    height: height * 0.02,
    width: width * 0.42,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bidnumTxt: {
    fontSize: height / 76,
    color: COLOR.WHITE,
    fontFamily: "Montserrat-Medium",
  },

  auctionTxt: {
    fontSize: height / 90,
    color: COLOR.TXT_COLOR,
    fontFamily: "Montserrat-Regular",
  },
  flatlistContainer: {
    // backgroundColor: COLOR.HEADER_THEME, // New 21 May
    backgroundColor: "rgba(26, 26, 26, 1)", // New 25 June
    height: height * 0.3, //0.3
    width: width * 0.45,
    margin: height * 0.01,
    alignItems: "center",
    borderRadius: height * 0.01,
  },
  likeImg: {
    height: height * 0.022,
    width: width * 0.043,
  },
  likeTxt: {
    fontSize: height / 72,
    color: COLOR.TXT_COLOR,
    fontFamily: "Montserrat-Medium",
  },
  hederBar: {
    height: height * 0.03,
    width: width * 0.42,
    marginTop: height * 0.01,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  elipseView: {
    height: height * 0.035,
    width: width * 0.06,
    flexDirection: "row",
  },
  elipseTwoImg: {
    // height: height * 0.02,
    // width: width * 0.04,
    height: 25,
    width: 25,
    borderRadius: 25 / 2,
  },
  elipseImg: {
    height: height * 0.02,
    width: width * 0.04,
    position: "absolute",
    left: width * 0.02,
  },
  optionImg: {
    height: height * 0.015,
    width: width * 0.04,
  },
  itemImg: {
    borderRadius: 8,
    height: height * 0.16,
    width: width * 0.42,
    marginTop: height * 0.01,
  },
  titleView: {
    marginTop: height * 0.006,
    height: height * 0.04,
    // width: width * 0.42,
    width: width * 0.42,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleTxt: {
    fontSize: height / 62,
    color: COLOR.WHITE,
    fontFamily: "Montserrat-SemiBold",
  },

  // ************ Short Modal Styling ************
  inputCardModal: {
    width: width * 0.4,
    borderRadius: 3,
    backgroundColor: COLOR.BOTTOM_SHEET_BG_CLR,
    shadowOpacity: 0.8,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "grey",
    marginVertical: Platform.OS == "ios" ? 250 : 224,
    marginHorizontal: 20,
    elevation: 2,
    alignSelf: "flex-end",
  },
  inputCardModalTwo: {
    width: width * 0.4,
    borderRadius: 3,
    backgroundColor: COLOR.BOTTOM_SHEET_BG_CLR,
    shadowOpacity: 0.8,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "grey",
    marginVertical: Platform.OS == "ios" ? 70 : 60,
    // marginHorizontal: 20,
    elevation: 2,
    alignSelf: "flex-end",
  },
  ShareTxtContainer: {
    width: width * 0.4,
    // marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#272626",
    flexDirection: "row",
    // marginVertical: 10,
    paddingBottom: 1,
    // backgroundColor: "red",
    height: 44,
    justifyContent: "space-around",
    alignItems: "center",
  },
  ShareImgContainer: {
    marginHorizontal: 15,
    height: 15,
    width: 15,
    justifyContent: "center",
    top: 3,
  },
  ReportTxtContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#272626",
    flexDirection: "row",
    paddingBottom: 5,
    height: 44,
  },
  ReportImgContainer: {
    marginHorizontal: 15,
    height: 20,
    width: 15,
    justifyContent: "center",
  },
  BlockImgContainer: {
    marginHorizontal: 15,
    height: 20,
    width: 20,
    alignSelf: "center",
  }, // ********** Report Modal Styling *********
  ReportModalOne: {
    flex: 1,
    justifyContent: "center",
    // backgroundColor: "rgba(35, 54, 18, 0.8)",
    // backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  ReportModalMainContainer: {
    justifyContent: "center",
    width: Platform.OS == "ios" ? width - 90 : width - 105,
    height: Platform.OS == "ios" ? height / 4 : height / 4.5,
    backgroundColor: COLOR.TXT_INPT_COLOR,
    borderRadius: 6,
    // top: (200),
    alignSelf: "center",
    // justifyContent: 'space-between'
  },
  ReportModalAlertTxt: {
    color: COLOR.WHITE,
    fontSize: 18,
    textAlign: "center",
    fontFamily: "Montserrat-SemiBold",
  },
  ReportModalConfirm: {
    // color: "#525252",
    color: COLOR.WHITE,
    fontSize: 16,
    textAlign: "center",
    lineHeight: 25,
    fontFamily: "Montserrat-Regular",
  },
  ReportModalContainerTwo: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopColor: "#969696",
    borderTopWidth: 0.7,
    height: 50,
    marginHorizontal: 5,
  },
  ReportModalCancelTxt: {
    fontSize: 15,
    fontFamily: "Montserrat-SemiBold",
    // color: "#548726",
    color: COLOR.WHITE,
    borderRadius: 0,
    overflow: "hidden",
    textAlign: "center",
  },
  ReportModalReportTxt: {
    fontSize: 15,
    fontFamily: "Montserrat-SemiBold",
    // color: "#548726",
    color: COLOR.WHITE,
    overflow: "hidden",
    width: 100,
    textAlign: "center",
  },
  ShareReportBlockTxt: {
    fontSize: 15,
    textAlign: "center",
    color: COLOR.WHITE,
    fontFamily: "Montserrat-Medium",
  },

  // ------
  PostContainers: {
    justifyContent: "space-between",
    borderBottomWidth: 1,
    // borderBottomColor: "#ccd3e8",
    borderBottomColor: "#272626",
    flexDirection: "row",
    // paddingBottom: 10,
    height: height * 0.065,
  },
  PostTxtView: {
    height: height * 0.06,
    width: width * 0.28,
    justifyContent: "center",
  },
  PostTxts: {
    fontSize: 15,
    color: COLOR.WHITE,
    marginLeft: verticalScale(15),
  },
  ImgsView: {
    height: height * 0.06,
    width: width * 0.12,
    justifyContent: "center",
    alignItems: "center",
  },
  ModalOneTxtView: {
    width: width * 0.28,
    // backgroundColor: "green",
    height: height * 0.05,
    justifyContent: "center",
  },
  ModalOneTxt: {
    fontSize: height / 55,
    color: COLOR.WHITE,
    fontFamily: "Montserrat-Regular",
    marginLeft: moderateScale(10),
  },
  ModalOneImgView: {
    width: width * 0.12,
    // backgroundColor: "red",
    height: height * 0.05,
    justifyContent: "center",
    alignItems: "center",
  },
  CreatorContainer: {
    height: height * 0.2,
    width: width * 1,
    justifyContent: "center",
    alignItems: "center",
  },
  CreatorSeeAllContainer: {
    height: height * 0.06,
    width: width * 0.94,
    // backgroundColor: "green",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  TrendCreatorContainer: {
    height: height * 0.06,
    width: width * 0.6,
    // backgroundColor: "green",
    justifyContent: "center",
  },
  TrendCreatorTxt: {
    color: COLOR.WHITE,
    fontFamily: "Montserrat-SemiBold",
    fontSize: height / 55,
  },
  SeeAllTxt: {
    color: COLOR.BUTTON_PINK,
    fontFamily: "Montserrat-Medium",
    fontSize: height / 60,
  },
  CreatorListingContainer: {
    height: height * 0.1,
    width: width * 0.94,
    // backgroundColor: "orange",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  CreatorNameTxtview: {
    height: height * 0.09,
    width: width * 0.45,
    justifyContent: "center",
    // backgroundColor: "blue",
    flexDirection: "row",
    alignItems: "center",
  },
  CreatorPicsView: {
    height: height * 0.09,
    width: width * 0.12,
    justifyContent: "center",
  },
  CreatorNameTxt: {
    color: "#DCDCDC",
    fontFamily: "Montserrat-SemiBold",
    fontSize: height / 60,
  },
  creatorBalanceTxt: {
    color: "#B6B6B6",
    fontFamily: "Montserrat-Medium",
    fontSize: height / 62,
  },
  NoDataTxtContainer: {
    height: height * 0.3,
    width: width,
    // justifyContent: "center",
    alignItems: "center",
  },
  NoDataTxt: {
    color: COLOR.WHITE,
    fontFamily: "Montserrat-SemiBold",
    fontSize: height / 45,
  },
});
