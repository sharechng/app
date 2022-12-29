import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import React from "react";
import { ImagePath } from "../../constants/ImagePath";

import { COLOR } from "../../Utils/Colors";
import CustomHeader from "../../components/CustomHeader/CustomHeader";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileHeader from "../../components/CustomHeader/ProfileHeader";
const { height, width } = Dimensions.get("window");

const DATA = [
  {
    NftImg: ImagePath.COLLECTION_DETAILS_ONE,
    HeartImg: ImagePath.LIKE,
    ProfileImg: ImagePath.PROFILE_PIC,
    username: "Tohoku Zunko",
    time: "2h. Public",
    description: "Lorem ipsum dolor sit amet, ctetur adipiscing egestas....",
  },
  {
    NftImg: ImagePath.COLLECTION_DETAILS_TWO,
    HeartImg: ImagePath.LIKE,
    ProfileImg: ImagePath.PROFILE_PIC,
    username: "Tohoku Zunko",
    time: "2h. Public",
    description: "Lorem ipsum dolor sit amet, ctetur adipiscing egestas....",
  },
  {
    NftImg: ImagePath.COLLECTION_DETAILS_THREE,
    HeartImg: ImagePath.LIKE,
    ProfileImg: ImagePath.PROFILE_PIC,
    username: "Tohoku Zunko",
    time: "2h. Public",
    description: "Lorem ipsum dolor sit amet, ctetur adipiscing egestas....",
  },
  {
    NftImg: ImagePath.COLLECTION_DETAILS_FOUR,
    HeartImg: ImagePath.LIKE,
    ProfileImg: ImagePath.PROFILE_PIC,
    username: "Tohoku Zunko",
    time: "2h. Public",
    description: "Lorem ipsum dolor sit amet, ctetur adipiscing egestas....",
  },
  {
    NftImg: ImagePath.COLLECTION_DETAILS_FIVE,
    HeartImg: ImagePath.LIKE,
    ProfileImg: ImagePath.PROFILE_PIC,
    username: "Tohoku Zunko",
    time: "2h. Public",
    description: "Lorem ipsum dolor sit amet, ctetur adipiscing egestas....",
  },
  {
    NftImg: ImagePath.COLLECTION_DETAILS_SIX,
    HeartImg: ImagePath.LIKE,
    ProfileImg: ImagePath.PROFILE_PIC,
    username: "Tohoku Zunko",
    time: "2h. Public",
    description: "Lorem ipsum dolor sit amet, ctetur adipiscing egestas....",
  },
  {
    NftImg: ImagePath.COLLECTION_DETAILS_FOUR,
    HeartImg: ImagePath.LIKE,
    ProfileImg: ImagePath.PROFILE_PIC,
    username: "Tohoku Zunko",
    time: "2h. Public",
    description: "Lorem ipsum dolor sit amet, ctetur adipiscing egestas....",
  },
  {
    NftImg: ImagePath.COLLECTION_DETAILS_ONE,
    HeartImg: ImagePath.LIKE,
    ProfileImg: ImagePath.PROFILE_PIC,
    username: "Tohoku Zunko",
    time: "2h. Public",
    description: "Lorem ipsum dolor sit amet, ctetur adipiscing egestas....",
  },
];

const AuctionDataDetails = (props) => {
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
      />

      <View style={styles.Maincontainer}>
        <View style={styles.flatlistuppercontainer}>
          <FlatList
            data={DATA}
            keyExtractor={(item) => item.id}
            numColumns={2}
            contentContainerStyle={{ paddingBottom: height * 0.3 }}
            renderItem={({ item }) => {
              return (
                <View style={styles.flatlistcontainer}>
                  {/* ************ Image Container ************ */}
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => props.navigation.navigate("AuctionsDetails")}
                    style={styles.profileimageview}
                  >
                    <Image style={styles.Nftimg} source={item.NftImg} />
                  </TouchableOpacity>

                  {/* ************ Profile Pic and Name Container ************ */}
                  <View style={styles.flatlistmidcontainer}>
                    <View style={styles.profilenameview}>
                      <Image
                        style={{ height: 25, width: 25, resizeMode: "contain" }}
                        source={item.ProfileImg}
                      />
                      <View
                        style={{
                          justifyContent: "center",
                          height: height * 0.055,
                          width: width / 3,
                        }}
                      >
                        <Text style={styles.usernameTxt}>{item.username}</Text>
                        <Text style={[styles.TimeTxt]}>{item.time}</Text>
                      </View>
                    </View>
                  </View>

                  {/* ************ Description Container ************ */}
                  <View style={styles.flatlistmiddleview}>
                    <Text
                      style={{
                        color: COLOR.WHITE,
                        fontSize: height / 82,
                        fontFamily: "Montserrat-Regular",
                      }}
                    >
                      Lorem ipsum dolor sit amet, ctetur adipiscing egestas....
                    </Text>
                  </View>
                </View>
              );
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AuctionDataDetails;

const styles = StyleSheet.create({
  Maincontainer: {
    height: height * 1.18,
    width: width * 1,
    backgroundColor: COLOR.BACKGROUND_THEME,
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
    marginBottom: height / 18,
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
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },

  usernameTxt: {
    fontSize: height / 62,
    color: "#FFFF",
    fontFamily: "Montserrat-Bold",
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
});
