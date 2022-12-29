import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Dimensions,
  FlatList,
  Platform,
  TouchableOpacity,
} from "react-native";
import { COLOR } from "../../Utils/Colors";
import { ImagePath } from "../../constants/ImagePath";
import AuthHeader from "../../components/CustomHeader/AuthHeader";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomLoader from "../../components/CustomLoader/CustomLoader";
import { UserActivityLogUrl } from "../../restAPI/ApiConfig";
import ProfileHeader from "../../components/CustomHeader/ProfileHeader";
import { verticalScale } from "react-native-size-matters";
import { Logout_ } from "../../../Logout";
const { height, width } = Dimensions.get("window");

const ActivityLog = (props) => {
  const [loader, setLoader] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [activityLog, setActivityLog] = useState(false);

  useEffect(() => {
    UserActivityLogApi();
  }, [props.route]);

  // ************ Block List Api ************
  const UserActivityLogApi = async () => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");

    setLoader(true);
    axios({
      method: "get",
      url: UserActivityLogUrl,
      headers: {
        token: value,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          console.log("====== Activity Log Response ======", response);
          setActivityLog(response?.data?.result?.docs);
          setLoader(false);
        } else {
          alert("Something went wrong.");
          setLoader(false);
        }
      })
      .catch((err) => {
        console.log("===== Activity Log Catch Error ======", err);
        setLoader(false);
        if(err.response.data.responseCode===440){
          Logout_(props)

        }
      });
  };

  // ************** FlatList Refreshing Functions **************
  function _handleRefresh() {
    setIsFetching(false);
    UserActivityLogApi();
  }

  return (
    <SafeAreaView>
      <View style={styles.Maincontainer}>
        <ProfileHeader
          Title={true}
          HeaderTitle="Activity"
          titleStyling={{ width: width * 0.7 }}
          HeaderTxtStyling={{ marginLeft: height * 0.04 }}
          BackIcon={true}
          onBackPress={() => props.navigation.goBack()}
          BackIconStyling={{ marginLeft: verticalScale(10) }}
          PostIcon={false}
          Menu={false}
          ShareIcon={false}
          // ShareClick={() => ShareMessage()}
        />
        {/* <View style={styles.headerView}>
          <AuthHeader
            backIcon={true}
            onBackPress={() => props.navigation.goBack()}
            Title={true}
            HeaderTitle="Activity"
            // ImgNewStyle={{ width: width * 0.62 }}
            headerTitle={{ marginLeft: height * 0.02 }}
            titleStyling={{ width: width * 0.6, alignItems: "flex-start" }}
          />
        </View> */}
        <View style={styles.activityview}></View>

        <View style={styles.flatlistuppercontainer}>
          {!loader ? (
            activityLog?.length > 0 ? (
              <FlatList
                data={activityLog}
                refreshing={isFetching}
                onRefresh={_handleRefresh}
                renderItem={({ item, index }) => {
                  return (
                    <View style={styles.flatlistcontainer}>
                      <View style={styles.profilepiview}>
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
                                borderRadius: 45 / 2,
                                height: 45,
                                width: 45,
                              }}
                              source={{ uri: item?.userId?.profilePic }}
                            />
                          ) : (
                            <Image
                              style={{
                                resizeMode: "contain",
                                borderRadius: 80,
                                height: 45,
                                width: 45,
                              }}
                              source={ImagePath.PROFILE_PIC}
                            />
                          )}
                        </TouchableOpacity>
                      </View>

                      <View style={styles.flatlistsidecontainer}>
                        <View style={styles.searchview}>
                          <Text
                            numberOfLines={2}
                            style={{
                              color: COLOR.WHITE,
                              fontSize: height / 53,
                              fontFamily: "Montserrat-Medium",
                            }}
                          >
                            {item?.title}
                          </Text>
                        </View>
                        <View style={styles.searchview}>
                          <Text
                            numberOfLines={2}
                            style={{
                              color: COLOR.WHITE,
                              fontSize: height / 60,
                              fontFamily: "Montserrat-Regular",
                            }}
                          >
                            {item?.desctiption}
                          </Text>
                        </View>
                      </View>
                    </View>
                  );
                }}
              />
            ) : (
              <View style={styles.NoDataTxtContainer}>
                <Text style={styles.NoDataTxt}>No Activity Found...</Text>
              </View>
            )
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                marginTop: -height / 10,
              }}
            >
              <CustomLoader />
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ActivityLog;

const styles = StyleSheet.create({
  Maincontainer: {
    height: height * 1,
    width: width * 1,
  },
  headercontainer: {
    height: height * 0.1,
    width: width * 0.9,
    alignSelf: "center",
  },
  activityview: {
    height: height * 0.01,
    width: width * 0.9,
    alignSelf: "center",
    justifyContent: "center",
  },
  activityTxt: {
    fontFamily: "Montserrat-SemiBold",
    fontSize: height / 47,
    color: COLOR.WHITE,
    fontWeight: "600",
  },
  midcontainer: {
    height: height * 0.07,
    width: width * 0.9,
    alignSelf: "center",
    flexDirection: "row",
  },
  datefullview: {
    height: height * 0.07,
    width: width * 0.35,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  datepickerview: {
    height: height * 0.07,
    width: width * 0.2,
    justifyContent: "center",
  },
  activitymidview: {
    height: height * 0.07,
    width: width * 0.35,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  flatlistuppercontainer: {
    alignSelf: "center",
    paddingBottom:20
    // flex: 1,
  },
  flatlistcontainer: {
    paddingVertical:7,
    width: width * 0.9,
    flexDirection: "row",
    alignItems: "center",
  },
  profilepiview: {
    height: height * 0.08,
    width: width * 0.15,
    justifyContent: "center",
  },
  flatlistsidecontainer: {
    height: height * 0.08,
    width: width * 0.8,
    justifyContent: "center",
  },
  searchview: {
    width: width * 0.7,
  },
  headerView: {
    marginTop: height * 0.02,
    flexDirection: "row",
    // height: height * 0.08,
    width: width * 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  NoDataTxtContainer: {
    height: height * 0.75,
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
