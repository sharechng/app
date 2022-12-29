import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  SafeAreaView,
  Share,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";

import Styles from "./Styles";
import { ImagePath } from "../../constants/ImagePath";
import { verticalScale } from "react-native-size-matters";
import { COLOR } from "../../Utils/Colors";
import ProfileHeader from "../../components/CustomHeader/ProfileHeader";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  ActivityOnPostUrl,
  MyPostDetailsViewUrl,
} from "../../restAPI/ApiConfig";
import moment from "moment";
const { height, width } = Dimensions.get("window");
import CustomLoader from "../../components/CustomLoader/CustomLoader";

const Resale = (props) => {
  const [loader, setLoader] = useState(false);
  const [loaderDetails, setLoaderDetails] = useState(false);

  const [id, setId] = useState(props?.route?.params?._id);
  const [tab, setTab] = useState(true);
  const [myPostDetails, setMyPostDetails] = useState({});
  const [postActivity, setPostActivity] = useState([]);

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

  const ItemActivityListRistenderItem = ({ item }) => {
    return (
      <View style={Styles.CardViewContainer}>
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

        {/* ********** Type Container ********** */}
        <View style={Styles.titleContainer}>
          <View style={Styles.TitleTxtView}>
            <Text style={[Styles.TxtStyling, { padding: 8 }]}>
              Type{"            "} :
            </Text>
          </View>
          <View style={Styles.ValueContainer}>
            <Text style={Styles.TxtStyling}>{item?.type}</Text>
          </View>
        </View>

        {/* ********** Date Container ********** */}
        <View style={Styles.titleContainer}>
          <View style={Styles.TitleTxtView}>
            <Text style={[Styles.TxtStyling, { padding: 8 }]}>
              Date{"             "} :
            </Text>
          </View>
          <View style={Styles.ValueContainer}>
            <Text style={Styles.TxtStyling}>
              {moment(item?.createdAt).format("YYYY-MM-DD")}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  useEffect(() => {
    MyPostDetails();
    ActivityPostApi();
  }, [props.route]);

  // ************ My Post Details Api ************
  const MyPostDetails = async () => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");

    setLoaderDetails(true);
    axios({
      method: "get",
      url: MyPostDetailsViewUrl,
      params: {
        postId: id,
      },
      headers: {
        token: value,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          console.log("====== Get Own Post Response ======", response);
          setMyPostDetails(response?.data?.result);
          setLoaderDetails(false);
        } else {
          alert("Something went wrong.");
          setLoaderDetails(false);
        }
      })
      .catch((err) => {
        console.log("===== Get Own Post Catch Error ======", err);
        setLoaderDetails(false);
      });
  };

  // ************ My Post Details Api ************
  const ActivityPostApi = async () => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");

    setLoader(true);
    axios({
      method: "get",
      url: ActivityOnPostUrl,
      params: {
        postId: id,
      },
      headers: {
        token: value,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          console.log("====== Activity on Post Response ======", response);
          setPostActivity(response?.data?.result);
          setLoader(false);
        } else {
          alert("Something went wrong.");
          setLoader(false);
        }
      })
      .catch((err) => {
        console.log("===== Activity on Post Catch Error ======", err);
        setLoader(false);
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
      <ScrollView>
        {!loaderDetails ? (
          <View style={Styles.MainContainer}>
            {/* ************ Image Container ************ */}
            <View style={Styles.ImageContainer}>
              {myPostDetails?.mediaUrl ? (
                <Image
                  source={{ uri: myPostDetails?.mediaUrl }}
                  style={{ height: height * 0.413, width: width * 1 }} // New
                  resizeMode="contain"
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
                  {myPostDetails?.userId?.profilePic ? (
                    <Image
                      source={{ uri: myPostDetails?.userId?.profilePic }}
                      style={{ height: 45, width: 45, borderRadius: 45 / 2 }}
                    />
                  ) : (
                    <Image
                      source={ImagePath.PROFILE_PIC}
                      resizeMode="contain"
                      style={{ height: 45, width: 45 }}
                    />
                  )}
                </View>

                <View style={Styles.ProfileNameContainer}>
                  <Text style={Styles.ProfileNameTxt}>
                    {myPostDetails?.postTitle?.split(' ').slice(0,3).join(' ') + '...'}
                  </Text>
                  <Text style={Styles.ProfileDataTxt}>
                    {myPostDetails?.userId?.userName ||
                      myPostDetails?.userId?.name}
                  </Text>
                </View>

                <View style={Styles.LikesCountContainer}>
                  <View>
                    {myPostDetails?.likesCount > 0 ? (
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
                  </View>
                  <Text style={Styles.LikesAmountTxt}>
                    {myPostDetails?.likesCount}
                  </Text>
                </View>
              </View>

              <View style={Styles.DurationPrice}>
                <View style={[Styles.DurationContainer]}>
                  <Text style={Styles.DurationTxt}>Price: </Text>
                  <Text style={Styles.DaysTxt}>
                    {" "}
                    {myPostDetails?.amount} SHARE
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
                  {myPostDetails?.details}
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

                <TouchableOpacity onPress={() => setTab(false)}>
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
                          style={[Styles.LeftDataTxt, { color: "#438CE1" }]}
                        >
                          0xa350...b735
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
                        height: height * 0.33, // 0.25
                        alignSelf: "center",
                      }}
                    >
                      {postActivity?.length > 0 ? (
                        <FlatList
                          style={{ marginBottom: 5 }}
                          data={postActivity}
                          renderItem={ItemActivityListRistenderItem}
                          keyExtractor={(item) => item.id}
                          nestedScrollEnabled
                        />
                      ) : (
                        <View style={Styles.NoDataTxtContainer}>
                          <Text style={Styles.NoDataTxt}>
                            No Activity Found on this Post...
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>
                </>
              )}

              {/* ************ Button Container ************ */}
              {/* <View style={Styles.BtnContainer}>
              <AppButton
                title="Resale"
                type="large"
                textStyle={{ fontFamily: "Montserrat-Bold" }}
                ButtonPress={() => props.navigation.navigate("Wallet")}
                btnStyling={{}}
              />
            </View> */}
            </View>
          </View>
        ) : (
          <CustomLoader
            loaderStyling={{ height: height * 0.85, width: width * 1 }}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Resale;
