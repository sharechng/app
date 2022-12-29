import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Platform,
  Modal,
  ActivityIndicator,
} from "react-native";

import Styles from "./Styles";
import { ImagePath } from "../../constants/ImagePath";
import { verticalScale, scale } from "react-native-size-matters";
import AppButton from "../../components/CustomButton/CustomButton";
import { COLOR } from "../../Utils/Colors";
import ProfileHeader from "../../components/CustomHeader/ProfileHeader";
import {
  BuyPostUrl,
  CollectionActivity,
  UserLikeDislikePostUrl,
  ViewAuctionDetailsUrl,
  GetUserProfileUrl
} from "../../restAPI/ApiConfig";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomLoader from "../../components/CustomLoader/CustomLoader";
import { showMessage } from "react-native-flash-message";
const { height, width } = Dimensions.get("window");
import moment from "moment";

const TrendingAuctionsView = (props) => {
  const [NftId, setNftId] = useState(props?.route?.params?._id);
  const [collectionId, setCollectionId] = useState(
    props?.route?.params?.collectionId
  );
  const [loader, setLoader] = useState(false);
  const [loaderDetails, setLoaderDetails] = useState(false);

  const [tab, setTab] = useState(true);
  const [ProfileDetails, setProfileDetails] = useState([]);
  const [iAgree, setIAgree] = useState(true);
  const [collectionActivity, setCollectionActivity] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [userID, setuserID] = useState('')

  const ItemActivityListRistenderItem = ({ item }) => {
    return (
      <View style={Styles.CardContainer}>
        {/* ********** Title Container ********** */}
        <View style={Styles.titleContainer}>
          <View style={Styles.TitleTxtView}>
            <Text style={[Styles.TxtStyling, { padding: 8 }]}>
              Title{"              "} :
            </Text>
          </View>
          <View style={Styles.ValueContainer}>
            <Text style={Styles.TxtStyling}>{item?.title}</Text>
          </View>
        </View>

        <View style={Styles.titleContainer}>
          <View style={Styles.TitleTxtView}>
            <Text style={[Styles.TxtStyling, { padding: 8 }]}>
              Description :
            </Text>
          </View>
          <View style={Styles.ValueContainer}>
            <Text style={Styles.TxtStyling}>{item?.desctiption}</Text>
          </View>
        </View>

        <View style={Styles.titleContainer}>
          <View style={Styles.TitleTxtView}>
            <Text style={[Styles.TxtStyling, { padding: 8 }]}>Type :</Text>
          </View>
          <View style={Styles.ValueContainer}>
            <Text style={Styles.TxtStyling}>{item?.type}</Text>
          </View>
        </View>
      </View>
    );
  };

  useEffect(() => {
    GetProfileApi();
    ViewProfileDetailsApi();
    CollectionActivityApi();
  }, [props.route]);

  const toggleIAgree = () => {
    setIAgree(false);
    LikeAndDislikeApi();
  };

  const _toggleIAgree = () => {
    setIAgree(true);
    LikeAndDislikeApi();
  };

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
        if (response.status === 200) {
          console.log(response?.data?.result._id,'get profile');
          setuserID(response?.data?.result._id)
        } else {
          alert("Something went wrong.");
        }
      })
      .catch((err) => {
        console.log(err.response.data.responseMessage)

      });
  };

  // ************ List Post With Collections Api ************
  const ViewProfileDetailsApi = async () => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");

    setLoaderDetails(true);
    axios({
      method: "get",
      url: ViewAuctionDetailsUrl,
      params: {
        auctionId: NftId,
      },
      headers: {
        token: value,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          console.log("====== Nft Profile Response ======", response.data?.result?.userId?._id);
          setProfileDetails(response?.data?.result);
          setLoaderDetails(false);
        } else {
          alert("Something went wrong.");
          setLoaderDetails(false);
        }
      })
      .catch((err) => {
        console.log("==== Nft Profile Catch Err ====", err);
        setLoaderDetails(false);
      });
  };

  // ******************** Like-Dislike Api Call ********************
  const LikeAndDislikeApi = async () => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");
    console.log("======PostId========", NftId);

    setLoader(true);
    axios({
      method: "get",
      url: UserLikeDislikePostUrl + `${NftId}`,
      headers: {
        token: value,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          ViewProfileDetailsApi();
          console.log("==== Like Dislike Nft Response ====", response);
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
          ViewProfileDetailsApi();
          setLoader(false);
        } else {
          alert("Something went wrong.");
          setLoader(false);
        }
      })
      .catch((err) => {
        console.log("===== Like Dislike Nft err ======", err);
        setLoader(false);
      });
    setLoader(false);
  };

  // ******************** Buy Post Api Call ********************
  const PurchasePostApi = async () => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");
    console.log("---- purchase ----", NftId, value);

    setLoader(true);
    axios({
      method: "post",
      url: BuyPostUrl,
      data: {
        postId: NftId,
        description: "Dummy",
      },
      headers: {
        token: value,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          console.log("==== Buy Nft Post Response ====", response);
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
          props.navigation.goBack();
          setLoader(false);
        } else {
          alert("Something went wrong.");
          setLoader(false);
        }
      })
      .catch((err) => {
        console.log("==== Buy Nft Post Catch error=====", err);
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
    setLoader(false);
  };

  // ******************** Collection Activity Api Call ********************
  const CollectionActivityApi = async () => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");

    setLoader(true);
    axios({
      method: "get",
      url: CollectionActivity,
      params: {
        collectionId: collectionId,
      },
      headers: {
        token: value,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          console.log("==== Collection Activity Response ====", response);
          setCollectionActivity(response?.data?.result);
          setLoader(false);
        } else {
          alert("Something went wrong.");
          setLoader(false);
        }
      })
      .catch((err) => {
        console.log("===== Collection Activity err ======", err);
        setLoader(false);
      });
    setLoader(false);
  };

  return (
    <SafeAreaView>
      {/* ************ Header Container ************ */}
      <ProfileHeader
        BackIcon={true}
        onBackPress={() => props.navigation.goBack()}
        BackIconStyling={{ marginLeft: verticalScale(10) }}
        Title={true}
        HeaderTitle="Auction Details"
        // titleStyling={{ width: width * 0.75, alignItems: "center" }}
        titleStyling={{ width: width * 0.7 }}
        HeaderTxtStyling={{ marginLeft: height * 0.04 }}
        PostIcon={false}
        Menu={false}
        ShareIcon={false}
        ShareClick={() => ShareMessage()}
      />
      <ScrollView style={{ height: height * 1 }}>
        {!loaderDetails ? (
          <View style={Styles.MainContainer}>
            {/* ************ Image Container ************ */}
            <View style={Styles.ImageContainer}>
              {ProfileDetails ? (
                <Image
                  source={{ uri: ProfileDetails?.mediaUrl }}
                  style={{ height: height * 0.413, width: width * 1 }} // New
                  // resizeMode="contain"
                />
              ) : (
                <Image
                  source={ImagePath.COLLECTION_VIEW_IMG}
                  style={{ height: height * 0.413, width: width * 1 }} // New
                />
              )}
            </View>

            {/* ************ Profile Container ************ */}
            <View style={Styles.ProfileView}>
              <View style={Styles.PicNameContainer}>
                <View style={Styles.ProfilePicContainer}>
                  <TouchableOpacity
                    onPress={() =>
                      props.navigation.navigate("AboutCreator", {
                        nftId: ProfileDetails?.userId?._id,
                      })
                    }
                  >
                    {ProfileDetails?.userId?.profilePic ? (
                      <Image
                        source={{ uri: ProfileDetails?.userId?.profilePic }}
                        style={{ height: 45, width: 45, borderRadius: 45 / 2 }}
                      />
                    ) : (
                      <Image
                        source={ImagePath.PROFILE_PIC}
                        style={{ height: 45, width: 45, borderRadius: 45 / 2 }}
                      />
                    )}
                  </TouchableOpacity>
                </View>

                <View style={Styles.ProfileNameContainer}>
                  <Text style={Styles.ProfileNameTxt}>
                    {ProfileDetails?.userId?.userName ||
                      ProfileDetails?.userId?.name}
                  </Text>
                  <Text style={Styles.ProfileDataTxtTwo}>
                    {moment(ProfileDetails?.updatedAt).local().fromNow()}
                  </Text>
                </View>

                <View style={Styles.LikesCountContainer}>
                  <TouchableOpacity
                    onPress={() => (iAgree ? toggleIAgree() : _toggleIAgree())}
                  >
                    <Image
                      source={iAgree ? ImagePath.LIKE : ImagePath.HEART_LIKE}
                      style={{ height: 18, width: 18 }}
                    />
                  </TouchableOpacity>
                  <Text style={Styles.LikesAmountTxt}>
                    {ProfileDetails?.likesCount}
                  </Text>
                </View>
              </View>

              <View style={Styles.DurationPrice}>
                <View style={[Styles.DurationContainer]}>
                  <Text style={Styles.DurationTxt}>Price: </Text>
                  <Text style={Styles.DaysTxt}>
                    {" "}
                    {ProfileDetails?.amount} SHARE
                  </Text>
                </View>
              </View>

              <View style={[Styles.DetailsContainer]}>
                <Text
                  style={[
                    Styles.DaysTxt,
                    { fontFamily: "Montserrat-Bold", fontSize: height / 50 },
                  ]}
                >
                  Descriptions :
                </Text>
                <Text
                  numberOfLines={4}
                  style={[
                    Styles.DaysTxt,
                    { fontFamily: "Montserrat-Medium", marginVertical: 8 },
                  ]}
                >
                  {ProfileDetails?.details}
                </Text>
              </View>

              {/* ************ Details and Item Activity Container ************ */}
              <View style={Styles.DetailsAndItemActivityContainer}>
                <TouchableOpacity onPress={() => setTab(true)}>
                  <View style={Styles.DetailsTabContainer}>
                    <Text
                      style={{
                        color: "rgba(255, 255, 255, 1)",
                        fontSize: height / 48,
                        fontFamily: "Montserrat-SemiBold",
                      }}
                    >
                      Details
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setTab(false), CollectionActivityApi();
                  }}
                >
                  <View style={Styles.ItemActivityTabContainer}>
                    <Text
                      style={{
                        color: "rgba(255, 255, 255, 1)",
                        fontSize: height / 48,
                        fontFamily: "Montserrat-SemiBold",
                      }}
                    >
                      Item Activity
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

              {/* ************* Tab Details Container ************ */}
              {tab ? (
                <>
                  <View
                    style={{
                      height: height * 0.03,
                      width: width * 1, // 0.5
                    }}
                  >
                    <View style={Styles.SelectedTabContainer}></View>
                  </View>

                  {/* ************ Details Tab Data Container ************ */}
                  <View style={{ height: height * 0.2 }}>
                    <View style={Styles.DetailsTabDataContainer}>
                      <View style={Styles.LeftDataTitle}>
                        <Text
                          style={[Styles.LeftDataTxt, { color: COLOR.WHITE }]}
                        >
                          Contract Address
                        </Text>
                      </View>

                      <View
                        style={[
                          Styles.LeftDataTitle,
                          { alignItems: "flex-end" },
                        ]}
                      >
                        <Text
                          numberOfLines={1}
                          style={[Styles.LeftDataTxt, { color: "#438CE1" }]}
                        >
                          {ProfileDetails?.userId?.bnbAccount?.address}
                        </Text>
                      </View>
                    </View>

                    <View style={Styles.DetailsTabDataContainer}>
                      <View style={Styles.LeftDataTitle}>
                        <Text
                          style={[Styles.LeftDataTxt, { color: COLOR.WHITE }]}
                        >
                          Token ID
                        </Text>
                      </View>

                      <View
                        style={[
                          Styles.LeftDataTitle,
                          { alignItems: "flex-end" },
                        ]}
                      >
                        <Text
                          style={[Styles.LeftDataTxt, { color: "#438CE1" }]}
                        >
                          23
                        </Text>
                      </View>
                    </View>

                    <View style={Styles.DetailsTabDataContainer}>
                      <View style={Styles.LeftDataTitle}>
                        <Text
                          style={[Styles.LeftDataTxt, { color: COLOR.WHITE }]}
                        >
                          Token Standard
                        </Text>
                      </View>

                      <View
                        style={[
                          Styles.LeftDataTitle,
                          { alignItems: "flex-end" },
                        ]}
                      >
                        <Text style={[Styles.LeftDataTxt]}>ERC-721</Text>
                      </View>
                    </View>

                    <View style={Styles.DetailsTabDataContainer}>
                      <View style={Styles.LeftDataTitle}>
                        <Text
                          style={[Styles.LeftDataTxt, { color: COLOR.WHITE }]}
                        >
                          Blockchain
                        </Text>
                      </View>

                      <View
                        style={[
                          Styles.LeftDataTitle,
                          { alignItems: "flex-end" },
                        ]}
                      >
                        <Text style={[Styles.LeftDataTxt]}>Binance</Text>
                      </View>
                    </View>
                  </View>

                  {/* ************ ************ */}
                </>
              ) : (
                <>
                  {/* ************ Item Activity Tab Data Container ************ */}
                  <View
                    style={{
                      height: height * 0.3,
                      width: width * 1,
                      justifyContent: "flex-start",
                      alignItems: "flex-end",
                    }}
                  >
                    <View style={Styles.SelectedTabContainer}></View>

                    {/* ************* Table Data List Container ************* */}

                    <View
                      style={{
                        height:
                          Platform.OS === "android" ? height * 0.33 : null,
                        width: width * 1,
                        alignItems: "center",
                      }}
                    >
                      {collectionActivity?.length > 0 ? (
                        <FlatList
                          data={collectionActivity}
                          renderItem={ItemActivityListRistenderItem}
                          nestedScrollEnabled
                          // keyExtractor={(item) => item.id}
                        />
                      ) : (
                        <View style={Styles.NoDataTxtContainer}>
                          <Text style={Styles.NoDataTxt}>
                            No Activity Found...
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>
                </>
              )}

              {/* ************ Button Container ************ */}
              {ProfileDetails&&!ProfileDetails?.isSold&& ProfileDetails.postType=="PRIVATE"&&<View style={Styles.BtnContainer}>
                {loader ? (
                  <CustomLoader />
                ) : ProfileDetails?.userId?._id != userID && (
                  <AppButton
                    title="Buy Now"
                    type="large"
                    textStyle={{ fontFamily: "Montserrat-SemiBold" }}
                    // ButtonPress={() => PurchasePostApi()}
                    ButtonPress={() => setModalVisible(true)}
                    btnStyling={{}}
                  />
                )}
              </View>}
            </View>
          </View>
        ) : (
          <CustomLoader
            loaderStyling={{ height: height * 0.85, width: width * 1 }}
          />
        )}
      </ScrollView>

      {/* ************ Buy Confirmation Modal ************ */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={Styles.mainContainer}>
          <View style={Styles.ModalSubContainer}>
            <View style={Styles.HeadingContainer}>
              <View style={{ height: height * 0.07, justifyContent: "center" }}>
                <Text
                  style={[
                    Styles.HeadingTxtContainer,
                    { fontFamily: "Montserrat-Bold", fontSize: scale(18) },
                  ]}
                >
                  Buy Auction
                </Text>
              </View>
              <View style={{ height: height * 0.08, justifyContent: "center" }}>
                <Text
                  style={[
                    Styles.HeadingTxtContainer,
                    { fontFamily: "Montserrat-Regular", textAlign: "center" },
                  ]}
                >
                  Are you sure, you want to buy this
                </Text>
                <Text
                  style={[
                    Styles.HeadingTxtContainer,
                    { fontFamily: "Montserrat-Regular", textAlign: "center" },
                  ]}
                >
                  auction ?
                </Text>
              </View>

              <View style={Styles.ButtonMainContainer}>
                <View style={Styles.btnContainer}>
                  {/* {loader ? (
                    <CustomLoader />
                  ) : ( */}
                  <AppButton
                    title="Yes"
                    type="small"
                    textStyle={{
                      fontFamily: "Montserrat-SemiBold",
                      fontSize: height / 60,
                    }}
                    ButtonPress={() => {
                      PurchasePostApi(), setModalVisible(!modalVisible);
                    }}
                  />
                  {/* )} */}
                </View>
                <View style={Styles.btnContainer}>
                  <AppButton
                    title="No"
                    type="small"
                    textStyle={{
                      fontFamily: "Montserrat-SemiBold",
                      fontSize: height / 60,
                    }}
                    ButtonPress={() => setModalVisible(!modalVisible)}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default TrendingAuctionsView;
