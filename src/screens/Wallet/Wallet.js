import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Platform,
} from "react-native";
import { COLOR } from "../../Utils/Colors";
import { moderateScale, verticalScale } from "react-native-size-matters";
import { ImagePath } from "../../constants/ImagePath";
import ProfileHeader from "../../components/CustomHeader/ProfileHeader";
import {
  GetBalanceUrl,
  MyPostListUrl,
  OwnPostList,
  TransactionHistoryUrl,
} from "../../restAPI/ApiConfig";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import { showMessage } from "react-native-flash-message";
import Progressdialog from "../../../Progressdialog";
const { height, width } = Dimensions.get("window");

const Wallet = (props) => {
  const [loader, setLoader] = useState(false);
  const [selectedString, setSelectedString] = useState("History");
  const [UserBalance, setUserBalance] = useState({});
  const [TransactionHistoryList, setTransactionHistoryList] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isFetching2, setIsFetching2] = useState(false);
  const [isFetching3, setIsFetching3] = useState(false);
  const [BoughtPostData, setBoughtPostData] = useState([]);
  const [OwnPostData, setOwnPostData] = useState([]);

  const TransactionHistoryRenderItem = ({ item }) => {
    return (
      <View style={{}}>
        <View style={Styles.ListContainer}>
          <View style={Styles.ListContainerTwo}>
            <View style={Styles.TransactionImgContainer}>
              {item?.transactionStatus === "SUCCESS" ? (
                <Image
                  source={ImagePath.SUCCESS_ICON}
                  resizeMode="contain"
                  style={{
                    alignSelf: "flex-start",
                    marginLeft: -height * 0.01,
                  }}
                />
              ) : (
                <Image
                  source={ImagePath.FAILED_ICON}
                  resizeMode="contain"
                  style={{ alignSelf: "flex-start" }}
                />
              )}
            </View>

            <View style={Styles.TransactionTypeContainer}>
              {item?.transactionType === "DEPOSIT_FOR_ADMIN" && (
                <Text numberOfLines={1} style={Styles.TransactionTypeTxt}>
                  {"Amount deposited to admin"}
                </Text>
              )}

              {item?.transactionType === "SOLD_AUCTION" && (
                <Text numberOfLines={1} style={Styles.TransactionTypeTxt}>
                  {"Auction sold successfully"}
                </Text>
              )}
              {item?.transactionType === "POST_PROMOTION_SHARE" && (
                <Text numberOfLines={1} style={Styles.TransactionTypeTxt}>
                  {"Promotions posted successfullt"}
                </Text>
              )}
              {item?.transactionType === "BUY_AUCTION" && (
                <Text numberOfLines={1} style={Styles.TransactionTypeTxt}>
                  {"Auction purchased successfully"}
                </Text>
              )}
              {item?.transactionType === "SOLD_POST" && (
                <Text numberOfLines={1} style={Styles.TransactionTypeTxt}>
                  {"Post sold successfully"}
                </Text>
              )}
              {item?.transactionType === "BUY_POST" && (
                <Text numberOfLines={1} style={Styles.TransactionTypeTxt}>
                  {"Post purchased successfully"}
                </Text>
              )}
              {item?.transactionType === "COLLECTION_SHARE_AMOUNT" && (
                <Text numberOfLines={1} style={Styles.TransactionTypeTxt}>
                  {"COLLECTION_SHARE_AMOUNT"}
                </Text>
              )}
              {item?.transactionType === "COLLECTION_RECEIVE_AMOUNT" && (
                <Text numberOfLines={1} style={Styles.TransactionTypeTxt}>
                  {"COLLECTION_RECEIVE_AMOUNT"}
                </Text>
              )}
              {item?.transactionType ===
                "COLLECTION_SUBSCRIBE_RECEIVE_COMMISSION" && (
                  <Text numberOfLines={1} style={Styles.TransactionTypeTxt}>
                    {"Commission received for collection"}
                  </Text>
                )}
              {item?.transactionType === "COLLECTION_SUBSCRIBE_SHARE" && (
                <Text numberOfLines={1} style={Styles.TransactionTypeTxt}>
                  {"COLLECTION_SUBSCRIBE_SHARE"}
                </Text>
              )}
              {item?.transactionType === "COLLECTION_SUBSCRIBE_RECEIVE" && (
                <Text numberOfLines={1} style={Styles.TransactionTypeTxt}>
                  {"COLLECTION_SUBSCRIBE_RECEIVE"}
                </Text>
              )}
              {item?.transactionType === "DEPOSIT_FOR_USER" && (
                <Text numberOfLines={1} style={Styles.TransactionTypeTxt}>
                  {"You have successfully deposited"}
                </Text>
              )}
              {item?.transactionType === "WITHDRAW_FOR_ADMIN" && (
                <Text numberOfLines={1} style={Styles.TransactionTypeTxt}>
                  {"Amount successfully withdraw to Admin"}
                </Text>
              )}
              {item?.transactionType === "WITHDRAW_FOR_USER" && (
                <Text numberOfLines={1} style={Styles.TransactionTypeTxt}>
                  {"You have successfully withdraw your amount"}
                </Text>
              )}
              {item?.transactionType === "POST_PROMOTION_RECEIVE" && (
                <Text numberOfLines={1} style={Styles.TransactionTypeTxt}>
                  {"Post promoted successfully"}
                </Text>
              )}
              {item?.transactionType === "AMOUNT_RECEIVED" && (
                <Text numberOfLines={1} style={Styles.TransactionTypeTxt}>
                  {"Amount received successfully"}
                </Text>
              )}

              <Text
                style={[
                  Styles.TransactionAddUSDTxt,
                  {
                    color:
                      item?.transactionStatus === "SUCCESS" ? "green" : "red",
                    fontFamily: "Montserrat-SemiBold",
                  },
                ]}
              >
                {item?.transactionStatus}
              </Text>
            </View>

            <View style={Styles.TransactionAmountContainer}>
              <Text
                style={[
                  Styles.TransactionTypeTxt,
                  { marginRight: moderateScale(10) },
                ]}
              >
                {item?.amount} SHARE
              </Text>
              <Text
                style={[
                  Styles.TransactionAddUSDTxt,
                  { marginRight: moderateScale(10) },
                ]}
              >
                {moment(item?.createdAt).local().fromNow()}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            width: width * 0.79,
            alignSelf: "flex-end",
            borderBottomWidth: 1.5,
            borderBottomColor: "#1E1E1E",
            marginRight: height * 0.035,
            borderStyle: "dotted",
          }}
        />
      </View>
    );
  };

  useEffect(() => {
    GetBalanceApi();
    MyPurchasePostApi();
    UserPostApi();
    TransactionHistoryListApi();
  }, [props.route]);

  // ************ Get Balance Api Integration ************
  const GetBalanceApi = async () => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");

    axios({
      method: "get",
      url: GetBalanceUrl,
      headers: { token: value },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          setUserBalance(response?.data?.result);
        } else {
          alert("Something went wrong.");
        }
      })
      .catch((err) => console.log("==== Get Balance Catch err ====", err));
  };

  // ************ Transaction History Api ************
  const TransactionHistoryListApi = async () => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");

    setLoader(true);
    axios({
      method: "get",
      url: TransactionHistoryUrl,
      headers: {
        token: value,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          setTransactionHistoryList(response?.data?.result?.docs);
          setLoader(false);
        } else {
          alert("Something went wrong.");
          setLoader(false);
        }
      })
      .catch((err) => {
        console.log("==== Transaction History Catch error=====", err);

        setLoader(false);
      });
  };
  function _handleRefreshTransactionHistory() {
    setIsFetching3(false);
    TransactionHistoryListApi();
  }

  // ************ Owned Post Api ************
  const UserPostApi = async () => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");

    setLoader(true);
    axios({
      method: "get",
      url: OwnPostList,
      headers: {
        token: value,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          setOwnPostData(response?.data?.result?.docs);
          setLoader(false);
        } else {
          alert("Something went wrong.");
          setLoader(false);
        }
      })
      .catch((err) => {
        console.log("==== Get Own Post Catch error=====", err);

        setLoader(false);
      });
  };
  function _handleRefreshPost() {
    setIsFetching2(false);
    UserPostApi();
  }

  // ************ Bought Post Api ************
  const MyPurchasePostApi = async () => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");

    setLoader(true);
    axios({
      method: "get",
      url: MyPostListUrl,
      headers: {
        token: value,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          setBoughtPostData(response?.data?.result?.docs);
          setLoader(false);
        } else {
          alert("Something went wrong.");
          setLoader(false);
        }
      })
      .catch((err) => {
        console.log("==== Bought Collection Catch error=====", err);

        setLoader(false);
      });
  };
  function _handleRefreshBought() {
    setIsFetching(false);
    MyPurchasePostApi();
  }

  // ---- Bought Post Render Item ----
  const renderItemBoughtPostList = ({ item }) => {
    return (
      <TouchableOpacity
        style={[Styles.flatlistcontainer, { height: height * 0.25 }]}
        onPress={() =>
          props.navigation.navigate("OwnAndBuyPost", {
            item: item,
            // subscriptionId: item?._id,
          })
        }
      >
        <View style={Styles.profileimageview}>
          {item?.mediaUrl ? (
            <Image source={{ uri: item?.mediaUrl }} style={Styles.Nftimg} />
          ) : (
            <Image
              style={Styles.Nftimg}
              source={ImagePath.COLLECTIONS_PICTURES}
            />
          )}
        </View>

        <View style={Styles.flatlistmidcontainer}>
          <View style={Styles.profilenameview}>
            {item?.buyerId[0]?.profilePic ? (
              <Image
                style={{
                  height: 25,
                  width: 25,
                  borderRadius: 25 / 2,
                }}
                source={{ uri: item?.buyerId[0]?.profilePic }}
              />
            ) : (
              <Image
                style={{ height: 25, width: 25, resizeMode: "contain" }}
                source={ImagePath.PROFILE_PIC}
              />
            )}
            <Text numberOfLines={1} style={Styles.usernameTxt}>
              {item?.postTitle}
            </Text>
          </View>
        </View>

        {/* <View style={Styles.flatlistmiddleview}>
          <View style={Styles.collectioview}>
            <AppButton
              title="Resale"
              type="large"
              textStyle={{
                fontFamily: "Montserrat-SemiBold",
                fontSize: height / 60,
              }}
              ButtonPress={
                (index) => {
                  ResalePopUp(item), setResaleData(item[index]);
                }

                // setModalVisibleResale(true),
              }
              btnStyling={{ width: width * 0.22, height: 32 }}
            />
          </View>
        </View> */}
      </TouchableOpacity>
    );
  };

  // ---- Owned Post Render Item ----
  const renderItemOwnPostList = ({ item }) => {
    return (
      <View
        style={[Styles.flatlistcontainer, { height: height * 0.285 }]}
      //  onPress={() => props.navigation.navigate("Resale", { _id: item })}
      >
        <View style={Styles.profileimageview}>
          {item?.mediaUrl ? (
            <Image source={{ uri: item?.mediaUrl }} style={Styles.Nftimg} />
          ) : (
            <Image
              style={Styles.Nftimg}
              source={ImagePath.COLLECTIONS_PICTURES}
            />
          )}
        </View>

        <View style={Styles.flatlistmidcontainer}>
          <View style={Styles.profilenameview}>
            {item?.userId?.profilePic ? (
              <Image
                style={{ height: 25, width: 25, borderRadius: 25 / 2 }}
                source={{ uri: item?.userId?.profilePic }}
              />
            ) : (
              <Image
                style={{ height: 25, width: 25, resizeMode: "contain" }}
                source={ImagePath.PROFILE_PIC}
              />
            )}

            <Text style={Styles.usernameTxt}>
              {item?.userId?.userName || item?.userId?.name}
            </Text>
          </View>
        </View>

        <View style={Styles.flatlistmiddleview}>
          <View style={Styles.collectioview}>
            <View
              style={{
                width: width * 0.4,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                source={ImagePath.APP_ICON}
                style={{ height: 12, width: 12 }}
              />
              <Text style={Styles.ethTxt}>
                {" "}
                {OwnPostData === item?.amount ? item?.amount : "0.00"} SHARE
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView>
      <View style={Styles.headerView}>
        {/* ************ Header Container ************ */}
        {
          loader&&<Progressdialog/>
        }
        <ProfileHeader
          BackIcon={true}
          onBackPress={() => props.navigation.goBack()}
          titleStyling={{ width: width * 0.72 }}
          HeaderTxtStyling={{ marginLeft: height * 0.04 }}
          Title={true}
          HeaderTitle="Wallet"
          PostIcon={false}
          PostClick={() => setModalVisiblePost(true)}
          Menu={false}
          OpenBottomSheet={() => setModalVisible(true)}
          BackIconStyling={{ marginLeft: verticalScale(10) }}
        />
      </View>
      <View style={Styles.MainContainer}>
        {/* ************ Blank Container ************ */}
        <View style={{ height: height * 0.02 }} />

        {/* ************ Card Container ************ */}
        <View style={Styles.BtnMainContainer}>
          <View style={Styles.BalanceBNBContainer}>
            <Text numberOfLines={1} style={[Styles.TxtContainer]}>
              {Number(UserBalance?.bnbBalace?UserBalance?.bnbBalace:"0").toFixed(4)} SHARE
            </Text>
          </View>
          <View style={Styles.AirdropContainer}>
            <View style={Styles.AirdropSubContainer}>
              <View style={Styles.AirdropAmountTxtContainer}>
                <Text
                  style={[
                    Styles.AirdropAmountTxt,
                    { fontFamily: "Montserrat-Bold" },
                  ]}
                >
                  Airdrop :
                </Text>
              </View>
              <View style={Styles.AirdropAmountTxtContainer}>
                <Text style={Styles.AirdropAmountTxt}>3 SHARE</Text>
              </View>
            </View>
          </View>
        </View>

        {/* ************ Deposit and Send Wallet Container ************ */}
        <View style={Styles.TransactionNavContainer}>
          <View
            style={[Styles.DepositContainer, { alignItems: "flex-start" }]}
            activeOpacity={0.7}
          >
            <TouchableOpacity
              // onPress={() => props.navigation.navigate("DepositWallet")}
              onPress={() => props.navigation.navigate("ReceiveWallet")}
            >
              <Image
                source={ImagePath.DEPOSIT_NAV}
                style={{ height: 55, width: 55 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              // onPress={() => props.navigation.navigate("DepositWallet")}
              onPress={() => props.navigation.navigate("ReceiveWallet")}
            >
              <Text
                style={[Styles.DepositTxt, { color: "rgba(74, 184, 57, 1)" }]}
              >
                Deposit
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={[Styles.DepositContainer, { alignItems: "flex-end" }]}
            activeOpacity={0.7}
          >
            <TouchableOpacity
              onPress={() => props.navigation.navigate("SendWallet")}
            >
              <Image
                source={ImagePath.SEND_NAV}
                style={{ height: 55, width: 55 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.navigation.navigate("SendWallet")}
            >
              <Text
                style={[Styles.DepositTxt, { color: "rgba(205, 17, 51, 1)" }]}
              >
                Withdraw
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ************ Bought, Owned and History Container ************ */}
        <View style={Styles.DetailsAndItemActivityContainer}>
        <TouchableOpacity
            onPress={() => {
              setSelectedString("History"), TransactionHistoryListApi();
            }}
          >
            <View
              style={[
                Styles.DetailsTabContainer,
                {
                  borderBottomWidth: selectedString === "History" ? 3 : 0,

                  borderBottomColor:
                    selectedString === "History" ? COLOR.BUTTON_PINK : null,
                },
              ]}
            >
              <Text
                style={{
                  color:
                    selectedString === "History"
                      ? COLOR.BUTTON_PINK
                      : COLOR.WHITE,
                  fontSize: height / 68,
                  fontFamily: "Montserrat-Bold",
                }}
              >
                History
              </Text>
            </View>
          </TouchableOpacity>
          

          <TouchableOpacity
            onPress={() => {
              setSelectedString("Owned"), UserPostApi();
            }}
          >
            <View
              style={[
                Styles.DetailsTabContainer,
                {
                  borderBottomWidth: selectedString === "Owned" ? 3 : 0,

                  borderBottomColor:
                    selectedString === "Owned" ? COLOR.BUTTON_PINK : null,
                },
              ]}
            >
              <Text
                style={{
                  color:
                    selectedString === "Owned"
                      ? COLOR.BUTTON_PINK
                      : COLOR.WHITE,
                  fontSize: height / 68,
                  fontFamily: "Montserrat-Bold",
                }}
              >
                Owned
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setSelectedString("Bought"), MyPurchasePostApi();
            }}
          >
            <View
              style={[
                Styles.DetailsTabContainer,
                {
                  borderBottomWidth: selectedString === "Bought" ? 3 : 0,

                  borderBottomColor:
                    selectedString === "Bought" ? COLOR.BUTTON_PINK : null,
                },
              ]}
            >
              <Text
                style={{
                  color:
                    selectedString === "Bought"
                      ? COLOR.BUTTON_PINK
                      : COLOR.WHITE,
                  fontSize: height / 68,
                  fontFamily: "Montserrat-Bold",
                }}
              >
                Bought
              </Text>
            </View>
          </TouchableOpacity>

      
        </View>

        {/* ************* Tab Details Container ************ */}
        {selectedString === "Bought" ? (
          <View style={Styles.MyBundleListContainer}>
            {BoughtPostData.length > 0 ? (
              <FlatList
                // keyExtractor={(item) => item.id}
                // key={2}
                data={BoughtPostData}
                renderItem={renderItemBoughtPostList}
                numColumns={2}
                key={""}
                refreshing={isFetching}
                onRefresh={_handleRefreshBought}
              />
            ) : (
              <View style={Styles.NoDataTxtContainer}>
                <Text style={Styles.NoDataTxt}>No Data Found...</Text>
              </View>
            )}
          </View>
        ) : selectedString === "Owned" ? (
          <View style={Styles.MyBundleListContainer}>
            {OwnPostData.length > 0 ? (
              <FlatList
                data={OwnPostData}
                renderItem={renderItemOwnPostList}
                keyExtractor={(item) => item.id}
                numColumns={2}
                key={2}
                refreshing={isFetching2}
                onRefresh={_handleRefreshPost}
              />
            ) : (
              <View style={Styles.NoDataTxtContainer}>
                <Text style={Styles.NoDataTxt}>No Data Found...</Text>
              </View>
            )}
          </View>
        ) : (
          <View style={[Styles.MyBundleListContainer]}>
            {TransactionHistoryList.length > 0 ? (
              <FlatList
                data={TransactionHistoryList}
                renderItem={TransactionHistoryRenderItem}
                refreshing={isFetching3}
                onRefresh={_handleRefreshTransactionHistory}
              />
            ) : (
              <View style={Styles.NoDataTxtContainer}>
                <Text style={Styles.NoDataTxt}>No Transactions Found</Text>
              </View>
            )}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Wallet;

const Styles = StyleSheet.create({
  MainContainer: {
    height: height * 1.1,
    width: width * 1,
  },
  headerView: {
    // flexDirection: "row",
    // height: height * 0.08,
    // width: width * 0.9,
    // alignItems: "center",
    // justifyContent: "space-between",
    // borderBottomWidth: 1.5,
    // borderBottomColor: "#222222",
  },
  StoryBoardContainer: {
    height: height * 0.43, //0.336
    width: width * 1,
    alignItems: "center",
  },
  StoryContainer: {
    height: height * 0.125,
    width: width * 0.46,
    marginTop: verticalScale(10),
    alignItems: "center",
  },
  StoryContainerImg: {
    height: height * 0.2,
    width: width * 0.45,
    resizeMode: "contain",
  },
  CoinsContainer: {
    height: height * 0.05,
    width: width * 0.445,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: verticalScale(10),
  },
  CoinsContainerTwo: {
    height: height * 0.065,
    width: width * 0.445,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  BtnMainContainer: {
    marginTop: verticalScale(5),
    height: height * 0.17,
    width: width * 1,
    alignItems: "center",
    justifyContent: "center",
  },
  BalanceBNBContainer: {
    height: height * 0.06,
    width: width * 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  AirdropContainer: {
    height: height * 0.1,
    width: width * 1,
  },
  AirdropSubContainer: {
    height: height * 0.07,
    width: width * 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    borderBottomWidth: 1.5,
    borderColor: "#1A1A1A",
  },
  AirdropAmountTxtContainer: {
    alignItems: "flex-end",
    marginBottom: height * 0.01,
  },
  AirdropAmountTxt: {
    fontSize: height / 48,
    fontFamily: "Montserrat-SemiBold",
    color: COLOR.WHITE,
  },
  DepositContainer: {
    height: height * 0.11,
    width: width * 0.25,
    alignItems: "center",
    justifyContent: "center",
  },
  DepositTxt: {
    color: COLOR.WHITE,
    fontSize: height / 60,
    fontFamily: "Montserrat-SemiBold",
    marginTop: verticalScale(6),
  },
  BalanceAirDropContainer: {
    height: height * 0.16,
    width: width * 1,
    justifyContent: "center",
    alignItems: "center",
  },
  // BalDropView: {
  //   height: height * 0.2, // 0.17
  //   marginHorizontal: 5,
  //   width: width * 0.9,
  //   justifyContent: "center",
  //   borderRadius: 8,
  // },
  // BalanceContainer: {
  //   // height: height * 0.065,
  //   height: height * 0.06,
  //   width: width * 0.9,
  //   alignItems: "center",
  //   flexDirection: "row",
  //   justifyContent: "center",
  // },
  // BalanceView: {
  //   height: height * 0.05,
  //   marginHorizontal: 5,
  //   width: width * 0.23, // 0.28
  //   justifyContent: "center",
  //   alignItems: "flex-end",
  //   marginHorizontal: moderateScale(18),
  // },
  TxtContainer: {
    fontSize: height / 40,
    fontFamily: "Montserrat-Bold",
    color: "rgba(91, 178, 89, 1)",
    padding: 5,
  },
  // *******
  ListContainer: {
    width: width * 0.96,
    alignItems: "center",
    // backgroundColor: "red",
  },
  ListContainerTwo: {
    height: height * 0.08,
    width: width * 0.91,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 5,
    marginVertical: verticalScale(4),
  },
  TransactionImgContainer: {
    height: height * 0.09,
    width: width * 0.13, // 0.13
    justifyContent: "center",
    // backgroundColor: "red",
  },
  TransactionTypeContainer: {
    height: height * 0.09,
    width: width * 0.44, // 0.42
    justifyContent: "center",
    alignItems: "flex-start",
  },
  TransactionAmountContainer: {
    height: height * 0.09,
    width: width * 0.38,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  TransactionTypeTxt: {
    color: COLOR.WHITE,
    fontFamily: "Montserrat-Medium",
    fontSize: height / 55,
  },
  TransactionAddUSDTxt: {
    color: COLOR.TRANSACT_HIST_TXT,
    fontFamily: "Montserrat-Regular",
    fontSize: height / 65,
    marginTop: verticalScale(4),
  },
  TransactionNavContainer: {
    height: height * 0.14,
    width: width * 1,
    // justifyContent: "center",
    justifyContent: "space-around",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#222222",
  },
  DetailsAndItemActivityContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: height * 0.07,
    width: width * 1,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#1A1A1A",
  },
  DetailsTabContainer: {
    height: height * 0.07,
    width: width * 0.33,
    alignItems: "center",
    justifyContent: "center",
  },
  ItemActivityTabContainer: {
    height: height * 0.07,
    width: width * 0.33,
    alignItems: "center",
    justifyContent: "center",
  },
  flatlistcontainer: {
    height: height * 0.3, // 0.3
    width: width * 0.44,
    backgroundColor: COLOR.PROFILE_CARD,
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
    // justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  usernameTxt: {
    fontSize: height / 70,
    color: "#FFFF",
    fontFamily: "Montserrat-Bold",
    marginLeft: moderateScale(5),
  },
  TimeTxt: {
    fontSize: height / 85,
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
  flatlistuppercontainer: {
    height: height * 0.33, //0.385
    width: width * 1,
    alignSelf: "center",
    alignItems: "center",
    marginTop: verticalScale(5),
  },
  MyBundleListContainer: {
    height: Platform.OS === "android" ? height * 0.48 : height * 0.42, //0.468 & 0.42
    width: width * 1,
    marginHorizontal: 9,
  },
  ethTxt: {
    color: "#FFFFFF",
    // fontSize: scale(10),
    fontSize: height / 62,
    fontFamily: "Montserrat-Medium",
  },
  NoDataTxtContainer: {
    height: height * 0.3,
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
