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
} from "react-native";
import React, { useState } from "react";

import Styles from "./Styles";
import AuthHeader from "../../components/CustomHeader/AuthHeader";
import { ImagePath } from "../../constants/ImagePath";
import { scale, verticalScale } from "react-native-size-matters";
import AppButton from "../../components/CustomButton/CustomButton";
import { COLOR } from "../../Utils/Colors";
import ProfileHeader from "../../components/CustomHeader/ProfileHeader";
const { height, width } = Dimensions.get("window");

const ITEM_ACTIVITY_LIST = [
  {
    transfer: "Transfer",
    amount: "0.10 ETH",
    from: "eight8eight",
    to: "888THEVAULT",
    date: "5 days ago",
  },
  {
    transfer: "Transfer",
    amount: "0.10 ETH",
    from: "eight8eight",
    to: "888THEVAULT",
    date: "5 days ago",
  },
  {
    transfer: "Transfer",
    amount: "0.10 ETH",
    from: "eight8eight",
    to: "888THEVAULT",
    date: "5 days ago",
  },
  {
    transfer: "Transfer",
    amount: "0.10 ETH",
    from: "eight8eight",
    to: "888THEVAULT",
    date: "5 days ago",
  },
];

const NFTProfile = (props) => {
  const [tab, setTab] = useState(true);
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
      <View style={Styles.TableDataContainer}>
        <View style={Styles.ContainerView}>
          <Text
            style={[
              Styles.TxtContainerView,
              {
                marginLeft: verticalScale(8),
                // fontSize: scale(10),
                fontSize: height / 62,
              },
            ]}
          >
            {item.transfer}
          </Text>
        </View>

        <View style={Styles.ContainerView}>
          <Text
            style={[
              Styles.TxtContainerView,
              {
                marginLeft: verticalScale(8),
                // fontSize: scale(10),
                fontSize: height / 62,
              },
            ]}
          >
            {item.amount}
          </Text>
        </View>

        <View style={Styles.ContainerView}>
          <Text
            style={[
              Styles.TxtContainerView,
              {
                marginLeft: verticalScale(8),
                color: "#138BE2",
                // fontSize: scale(10),
                fontSize: height / 62,
              },
            ]}
          >
            {item.from}
          </Text>
        </View>

        <View style={Styles.ContainerView}>
          <Text
            style={[
              Styles.TxtContainerView,
              {
                marginLeft: verticalScale(8),
                color: "#138BE2",
                // fontSize: scale(10),
                fontSize: height / 62,
              },
            ]}
          >
            {item.to}
          </Text>
        </View>

        <View style={Styles.ContainerView}>
          <Text
            style={[
              Styles.TxtContainerView,
              {
                marginLeft: verticalScale(8),
                color: "#138BE2",
                // fontSize: scale(10),
                fontSize: height / 62,
              },
            ]}
          >
            {item.date}
            {/* 5 days ago */}
          </Text>
        </View>
      </View>
    );
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
        ShareIcon={true}
        ShareClick={() => ShareMessage()}
      />
      <ScrollView>
        <View style={Styles.MainContainer}>
          {/* ************ Image Container ************ */}
          <View style={Styles.ImageContainer}>
            <Image
              source={ImagePath.COLLECTION_VIEW_IMG}
              resizeMode="contain"
            />
          </View>

          {/* ************ Profile Container ************ */}
          <View style={Styles.ProfileView}>
            <View style={Styles.PicNameContainer}>
              <View style={Styles.ProfilePicContainer}>
                <Image
                  source={ImagePath.COLLECTION_PROFILE}
                  resizeMode="contain"
                  style={{ height: 50, width: 50 }}
                />
              </View>

              <View style={Styles.ProfileNameContainer}>
                <Text style={Styles.ProfileNameTxt}>Zunda mochi</Text>
                <Text style={Styles.ProfileDataTxt}>WoWG #6428</Text>
              </View>

              <View style={Styles.LikesCountContainer}>
                <TouchableOpacity>
                  <Image
                    source={ImagePath.LIKE}
                    style={{ height: 18, width: 18 }}
                  />
                </TouchableOpacity>
                <Text style={Styles.LikesAmountTxt}>249</Text>
              </View>
            </View>

            <View style={Styles.DurationPrice}>
              <View style={[Styles.DurationContainer]}>
                <Text style={Styles.DurationTxt}>Price: </Text>
                <Text style={Styles.DaysTxt}> 0.004 ETH</Text>
              </View>
            </View>

            {/* ************ Details and Item Activity Container ************ */}
            <View style={Styles.DetailsAndItemActivityContainer}>
              <TouchableOpacity onPress={() => setTab(true)}>
                <View style={Styles.DetailsTabContainer}>
                  <Text
                    style={{
                      color: "rgba(255, 255, 255, 1)",
                      fontSize: height / 45,
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
                      fontSize: height / 45,
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
                      style={[Styles.LeftDataTitle, { alignItems: "flex-end" }]}
                    >
                      <Text style={[Styles.LeftDataTxt, { color: "#438CE1" }]}>
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
                      style={[Styles.LeftDataTitle, { alignItems: "flex-end" }]}
                    >
                      <Text style={[Styles.LeftDataTxt, { color: "#438CE1" }]}>
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
                      style={[Styles.LeftDataTitle, { alignItems: "flex-end" }]}
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
                      style={[Styles.LeftDataTitle, { alignItems: "flex-end" }]}
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

                  {/* ************* Item Heading Container ************* */}
                  <View style={Styles.HeadingTableContainer}>
                    <View style={Styles.ContainerView}>
                      <Text
                        style={[
                          Styles.TxtContainerView,
                          { marginLeft: verticalScale(8) },
                        ]}
                      >
                        Event
                      </Text>
                    </View>
                    <View
                      style={[Styles.ContainerView, { alignItems: "center" }]}
                    >
                      <Text style={Styles.TxtContainerView}>Price</Text>
                    </View>
                    <View
                      style={[Styles.ContainerView, { alignItems: "center" }]}
                    >
                      <Text style={Styles.TxtContainerView}>From</Text>
                    </View>
                    <View
                      style={[Styles.ContainerView, { alignItems: "center" }]}
                    >
                      <Text style={Styles.TxtContainerView}>To</Text>
                    </View>
                    <View
                      style={[Styles.ContainerView, { alignItems: "center" }]}
                    >
                      <Text style={Styles.TxtContainerView}>Date</Text>
                    </View>
                  </View>

                  {/* ************* Table Data List Container ************* */}

                  <View style={{ height: height * 0.25 }}>
                    <FlatList
                      data={ITEM_ACTIVITY_LIST}
                      renderItem={ItemActivityListRistenderItem}
                      keyExtractor={(item) => item.id}
                      nestedScrollEnabled
                    />
                  </View>
                </View>
              </>
            )}

            {/* ************ Button Container ************ */}
            <View style={Styles.BtnContainer}>
              <AppButton
                title="Buy Now"
                type="large"
                textStyle={{ fontFamily: "Montserrat-Bold" }}
                ButtonPress={() => {}}
                btnStyling={{}}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NFTProfile;
