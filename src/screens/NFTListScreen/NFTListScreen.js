import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { ImagePath } from "../../constants/ImagePath";

import { COLOR } from "../../Utils/Colors";
import CustomHeader from "../../components/CustomHeader/CustomHeader";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileHeader from "../../components/CustomHeader/ProfileHeader";
const { height, width } = Dimensions.get("window");

const DATA = [
  {
    id: 0,
    NftImg: ImagePath.COLLECTIONS_PICTURES,
    // HeartImg: ImagePath.LIKE,
    profileUnLikeIcon: ImagePath.LIKE,
    profileLikeIcon: ImagePath.HEART_LIKE,
    ProfileImg: ImagePath.PROFILE_PIC,
    username: "Tohoku Zunko",
    key1: "Collections Price:",
    key2: "0.004 ETH",
    key3: "Duration:",
    key4: "60 Days",
    key5: "Subscriber",
    key6: "73",
    button: "Subscribe",
    shareImg: ImagePath.SHARE,
  },
  {
    id: 1,
    NftImg: ImagePath.MY_COLLECTION_TWO,
    // HeartImg: ImagePath.LIKE,
    profileUnLikeIcon: ImagePath.LIKE,
    profileLikeIcon: ImagePath.HEART_LIKE,
    ProfileImg: ImagePath.PROFILE_PIC,
    username: "Tohoku Zunko",
    key1: "Collections Price:",
    key2: "0.004 ETH",
    key3: "Duration:",
    key4: "60 Days",
    key5: "Subscriber",
    key6: "73",
    button: "Subscribe",
    shareImg: ImagePath.SHARE,
  },
  {
    id: 2,
    NftImg: ImagePath.MY_COLLECTION_THREE,
    // HeartImg: ImagePath.LIKE,
    profileUnLikeIcon: ImagePath.LIKE,
    profileLikeIcon: ImagePath.HEART_LIKE,
    ProfileImg: ImagePath.PROFILE_PIC,
    username: "Tohoku Zunko",
    key1: "Collections Price:",
    key2: "0.004 ETH",
    key3: "Duration:",
    key4: "60 Days",
    key5: "Subscriber",
    key6: "73",
    button: "Subscribe",
    shareImg: ImagePath.SHARE,
  },
  {
    id: 3,
    NftImg: ImagePath.MY_COLLECTION_FOUR,
    // HeartImg: ImagePath.LIKE,
    profileUnLikeIcon: ImagePath.LIKE,
    profileLikeIcon: ImagePath.HEART_LIKE,
    ProfileImg: ImagePath.PROFILE_PIC,
    username: "Tohoku Zunko",
    key1: "Collections Price:",
    key2: "0.004 ETH",
    key3: "Duration:",
    key4: "60 Days",
    key5: "Subscriber",
    key6: "73",
    button: "Subscribe",
    shareImg: ImagePath.SHARE,
  },
  {
    id: 4,
    NftImg: ImagePath.MY_COLLECTION_FIVE,
    // HeartImg: ImagePath.LIKE,
    profileUnLikeIcon: ImagePath.LIKE,
    profileLikeIcon: ImagePath.HEART_LIKE,
    ProfileImg: ImagePath.PROFILE_PIC,
    username: "Tohoku Zunko",
    key1: "Collections Price:",
    key2: "0.004 ETH",
    key3: "Duration:",
    key4: "60 Days",
    key5: "Subscriber",
    key6: "73",
    button: "Subscribe",
    shareImg: ImagePath.SHARE,
  },
  {
    id: 5,
    NftImg: ImagePath.MY_COLLECTION_SIX,
    // HeartImg: ImagePath.LIKE,
    profileUnLikeIcon: ImagePath.LIKE,
    profileLikeIcon: ImagePath.HEART_LIKE,
    ProfileImg: ImagePath.PROFILE_PIC,
    username: "Tohoku Zunko",
    key1: "Collections Price:",
    key2: "0.004 ETH",
    key3: "Duration:",
    key4: "60 Days",
    key5: "Subscriber",
    key6: "73",
    button: "Subscribe",
    shareImg: ImagePath.SHARE,
  },
  {
    id: 6,
    NftImg: ImagePath.MY_COLLECTION_THREE,
    // HeartImg: ImagePath.LIKE,
    profileUnLikeIcon: ImagePath.LIKE,
    profileLikeIcon: ImagePath.HEART_LIKE,
    ProfileImg: ImagePath.PROFILE_PIC,
    username: "Tohoku Zunko",
    key1: "Collections Price:",
    key2: "0.004 ETH",
    key3: "Duration:",
    key4: "60 Days",
    key5: "Subscriber",
    key6: "73",
    button: "Subscribe",
    shareImg: ImagePath.SHARE,
  },
  {
    id: 7,
    NftImg: ImagePath.MY_COLLECTION_FOUR,
    // HeartImg: ImagePath.LIKE,
    profileUnLikeIcon: ImagePath.LIKE,
    profileLikeIcon: ImagePath.HEART_LIKE,
    ProfileImg: ImagePath.PROFILE_PIC,
    username: "Tohoku Zunko",
    key1: "Collections Price:",
    key2: "0.004 ETH",
    key3: "Duration:",
    key4: "60 Days",
    key5: "Subscriber",
    key6: "73",
    button: "Subscribe",
    shareImg: ImagePath.SHARE,
  },
];

const NFTListScreen = (props) => {
  const [iAgree, setIAgree] = useState(true);
  const toggleIAgree = () => {
    setIAgree(false);
  };

  const _toggleIAgree = () => {
    setIAgree(true);
  };
  return (
    <SafeAreaView>
      {/* ************ Header Container ************ */}
      <ProfileHeader
        Title={true}
        HeaderTitle="My Collections"
        PostIcon={true}
        PostClick={() => props.navigation.navigate("CreateCollection")}
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
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() =>
                      //   props.navigation.navigate("CollectionDataDetails")
                      props.navigation.navigate("NFTProfile")
                    }
                    style={styles.profileimageview}
                  >
                    <Image style={styles.Nftimg} source={item.NftImg} />
                  </TouchableOpacity>

                  <View style={styles.flatlistmidcontainer}>
                    <View style={styles.profilenameview}>
                      <Image
                        style={{ height: 25, width: 25, resizeMode: "contain" }}
                        source={item.ProfileImg}
                      />
                      <Text style={styles.usernameTxt}>{item.username}</Text>
                    </View>
                    <View style={styles.heartview}>
                      <TouchableOpacity
                        onPress={
                          () => {}
                          // iAgree ? toggleIAgree() : _toggleIAgree()
                        }
                      >
                        <Image
                          style={{
                            height: 15,
                            width: 15,
                            resizeMode: "contain",
                          }}
                          source={item.HeartImg}
                          // source={
                          //   iAgree
                          //     ? item.profileUnLikeIcon
                          //     : item.profileLikeIcon
                          // }
                        />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={styles.flatlistmiddleview}>
                    <View style={styles.collectioview}>
                      <View
                        style={{
                          width: width * 0.23,
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <Image
                          source={ImagePath.APP_ICON}
                          style={{ height: 12, width: 12 }}
                        />
                        <Text style={styles.ethTxt}> {item.key2}</Text>
                      </View>

                      <View
                        style={{
                          width: width * 0.2,
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <Image source={ImagePath.DURATION} />
                        <Text style={styles.ethTxt}> {item.key4}</Text>
                      </View>
                    </View>
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

export default NFTListScreen;

const styles = StyleSheet.create({
  Maincontainer: {
    height: height * 1.1,
    width: width * 1,
    // alignItems: "center",
    backgroundColor: COLOR.BACKGROUND_THEME,
  },
  addcollectionview: {
    height: height * 0.07,
    width: width * 0.4,
    // backgroundColor: "pink",
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
    //   justifyContent: "center"
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  addcolectTxt: {
    color: "#FFFF",
    fontFamily: "Montserrat-Medium",
    // fontSize: scale(10),
    fontSize: height / 63,
  },
  flatlistuppercontainer: {
    alignSelf: "center",
    // backgroundColor: "red",
    width: width * 1,
    alignItems: "center",
    marginTop: verticalScale(5),
  },
  flatlistcontainer: {
    height: height * 0.283, // 0.3
    width: width * 0.44,
    backgroundColor: COLOR.PROFILE_CARD,
    borderRadius: 10, //
    margin: 7,
  },
  profileimageview: {
    height: height * 0.19,
    width: width * 0.4,
    // backgroundColor: "red",
    alignSelf: "center",
    borderRadius: 5,
  },
  Nftimg: {
    // height: 200,
    // width: 100,
    //    resizeMode: "contain",
    height: height * 0.18,
    width: width * 0.4,
    marginTop: height * 0.01,
    borderRadius: 5,
  },
  flatlistmidcontainer: {
    height: height * 0.055,
    width: width * 0.4,
    // backgroundColor: "pink",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profilenameview: {
    height: height * 0.04,
    width: width * 0.27,
    // backgroundColor: "blue",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  heartview: {
    height: height * 0.04,
    width: width * 0.08,
    // backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
  },
  usernameTxt: {
    // fontSize: scale(10),
    fontSize: height / 63,
    color: "#FFFF",
    fontFamily: "Montserrat-Bold",
    marginLeft: moderateScale(5),
  },
  flatlistmiddleview: {
    height: height * 0.025,
    width: width * 0.4,
    // backgroundColor: "skyblue",
    alignSelf: "center",
    justifyContent: "space-evenly",
  },
  collectioview: {
    height: height * 0.024,
    width: width * 0.4,
    // backgroundColor: "yellow",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  collectionTxt: {
    // fontSize: scale(8),
    fontSize: height / 65,
    color: "#FFFF",
    fontFamily: "Montserrat-Regular",
  },
  ethTxt: {
    color: "#BFBFBF",
    // fontSize: scale(10),
    fontSize: height / 62,
    fontFamily: "Montserrat-Regular",
  },
  subscribeview: {
    height: height * 0.04,
    width: width * 0.4,
    // backgroundColor: "green",
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
    //   backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 7,
    borderWidth: 1,
    borderColor: COLOR.BUTTON_PINK,
  },
});
