// import React, { useState, useEffect } from "react";
// import {
//   Dimensions,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
//   Image,
//   Alert,
// } from "react-native";
// import { ImagePath } from "../../constants/ImagePath";
// import { useNavigation } from "@react-navigation/native";
// import { COLOR } from "../../Utils/Colors";
// import axios from "axios";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { AddStoryUrl, GetFollowingListUrl } from "../../restAPI/ApiConfig";
// import ImagePicker from "react-native-image-crop-picker";
// import { showMessage } from "react-native-flash-message";
// const { height, width } = Dimensions.get("window");

// const StoriesList = (props) => {
//   const [loader, setLoader] = useState(false);
//   const [StoryListing, setStoryListing] = useState([]);
//   const [FollowingList, setFollowingList] = useState([]);
//   const [StoryId, setStoryId] = useState("");
//   const [imageUrlPath, setImageUrlPath] = useState("");
//   const [imageUrlData, setImageUrlData] = useState();
//   const navigation = useNavigation();

//   useEffect(() => {
//     if (FollowingList) {
//       FollowingUserListApi();
//     }
//   }, [props.route]);

//   // ************ Following User List Api ************ AddStoryUrl
//   const FollowingUserListApi = async () => {
//     const value = await AsyncStorage.getItem("token" || "socaltoken");

//     setLoader(true);
//     axios({
//       method: "get",
//       url: GetFollowingListUrl,
//       headers: {
//         token: value,
//       },
//     })
//       .then(async (response) => {
//         if (response?.data?.responseCode === 200) {
//           console.log("==== Following List Response ====", response);
//           setFollowingList(
//             response?.data?.result?.following.filter((data) => data.isStory)
//           );
//           // StoryListingApi(response?.data?.result?.following);
//           setLoader(false);
//         } else {
//           alert("Something went wrong.");
//           setLoader(false);
//         }
//       })
//       .catch((err) => console.log("===== Following List err ======", err));
//   };

//   return (
//     <ScrollView
//       horizontal={true}
//       showsHorizontalScrollIndicator={false}
//       style={Styles.MainScrollContainer}
//     >
//       <View style={{ flexDirection: "row" }}>
//         {FollowingList &&
//           FollowingList?.map((data, index) => {
//             return (
//               <>
//                 <TouchableOpacity
//                   key={index}
//                   onPress={() =>
//                     navigation.push("Status", {
//                       name: data?._id,
//                       StoryListing: StoryListing,
//                       userName: data?.userName,
//                       profilePic: data?.profilePic,
//                     })
//                   }
//                 >
//                   <View style={Styles.ListMainContainer}>
//                     <View style={Styles.StoryImgContainer}>
//                       {data?.profilePic ? (
//                         imageUrlPath ? (
//                           <Image
//                             // source={{ uri: data?.story[0] }}
//                             source={imageUrlPath}
//                             style={{
//                               resizeMode: "cover",
//                               height: "92%",
//                               width: "92%",
//                               borderRadius: 100,
//                             }}
//                           />
//                         ) : (
//                           <Image
//                             // source={{ uri: data?.story[0] }}
//                             source={{
//                               uri: data?.profilePic,
//                             }}
//                             style={{
//                               resizeMode: "cover",
//                               height: "92%",
//                               width: "92%",
//                               borderRadius: 100,
//                             }}
//                           />
//                         )
//                       ) : (
//                         <Image
//                           source={ImagePath.PROFILE_PIC}
//                           style={{
//                             resizeMode: "cover",
//                             height: "92%",
//                             width: "92%",
//                             borderRadius: 100,
//                           }}
//                         />
//                       )}
//                     </View>

//                     <Text
//                       style={{
//                         textAlign: "center",
//                         fontSize: height / 70,
//                         opacity: data?.index ? 1 : 0.5,
//                         color: COLOR.WHITE,
//                       }}
//                     >
//                       {data?.userName}
//                     </Text>
//                   </View>
//                 </TouchableOpacity>
//               </>
//             );
//           })}
//       </View>
//     </ScrollView>
//   );
// };

// export default StoriesList;

// const Styles = StyleSheet.create({
//   MainScrollContainer: {
//     paddingVertical: 20,
//   },
//   ListMainContainer: {
//     flexDirection: "column",
//     paddingHorizontal: 8,
//     position: "relative",
//   },
//   PlusIconContainer: {
//     position: "absolute",
//     bottom: 13,
//     right: 12,
//     zIndex: 1,
//   },
//   StoryImgContainer: {
//     width: 68,
//     height: 68,
//     backgroundColor: "white",
//     borderWidth: 1.8,
//     borderRadius: 100,
//     justifyContent: "center",
//     alignItems: "center",
//     borderColor: "#c13584",
//   },
// });
import React, { useState, useEffect } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  RefreshControl,
  Alert,
} from "react-native";
import { ImagePath } from "../../constants/ImagePath";
import { useNavigation } from "@react-navigation/native";
import { COLOR } from "../../Utils/Colors";
import axios from "axios";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  AddStoryUrl,
  GetFollowingListUrl,
  ExpiredStoryUrl,
  StoryListUrl,
} from "../../restAPI/ApiConfig";
import ImagePicker from "react-native-image-crop-picker";
import { showMessage } from "react-native-flash-message";
const { height, width } = Dimensions.get("window");

const StoriesList = (props) => {
  const [loader, setLoader] = useState(false);
  const [StoryListing, setStoryListing] = useState([]);
  const [FollowingList, setFollowingList] = useState([]);
  const [StoryId, setStoryId] = useState("");
  const [imageUrlPath, setImageUrlPath] = useState("");
  const [refreshing, setRefreshing] = React.useState(false);
  const [imageUrlData, setImageUrlData] = useState();
  const [currentDate, setCurrentDate] = useState();
  const [expireDate, setExpireDate] = useState();
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      myDate();
      FollowingUserListApi();
      ExpiredStoryListApi();
      StoryListApi()
    });
    if (FollowingList) {
      FollowingUserListApi();
    }
    return unsubscribe;
  }, [props.route]);

  const myDate = () => {
    var today = new Date();
    var datetime =
      today.getDate() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getFullYear() +
      " " +
      today.getHours() +
      ":" +
      today.getMinutes() +
      ":" +
      today.getSeconds();
    // console.log("@@@ todays time ===>", moment(datetime).format("YYYY-MM-DD HH:mm:ss"));
    setCurrentDate(moment(datetime).format("YYYY-MM-DD HH:mm:ss"));
    return datetime;
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    FollowingUserListApi(), setRefreshing(false);
  }, []);

  // ************ Following User List Api ************ AddStoryUrl
  const FollowingUserListApi = async () => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");
    setLoader(true);
    axios({
      method: "get",
      url: GetFollowingListUrl,
      headers: {
        token: value,
      },
    })
      .then(async (response) => {
        if (response?.data?.responseCode === 200) {
          // FollowingUserListApi();

          setFollowingList(
            response?.data?.result?.following.filter((data) => data.isStory)
          );
          myDate();
          // StoryListingApi(response?.data?.result?.following);
          // FollowingUserListApi();
          setLoader(false);
        } else {
          alert("Something went wrong.");
          setLoader(false);
        }
      })
      .catch((err) => console.log("===== Following List err ======", err));
  };

  // ************ Expired Story List Api ************ AddStoryUrl
  const ExpiredStoryListApi = async () => {
    axios({
      method: "get",
      url: ExpiredStoryUrl,
    })
      .then(async (response) => {

        if (response?.data?.responseCode === 200) {
          StoryListApi();
        } else {
          // console.log("@@@ Else ====>")
        }
      })
      .catch((err) => console.log("===== Expired List err ======", err));
  };

  // ************ Story List Api ************ AddStoryUrl
  const StoryListApi = async () => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");
    axios({
      method: "get",
      url: StoryListUrl,
      headers: {
        token: value,
      },
    })
      .then(async (response) => {

        if (response?.data?.responseCode === 200) {
        } else {
          // console.log("@@@ Else ====>")
        }
      })
      .catch((err) => console.log("===== Story List err ======", err));
  };

  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={Styles.MainScrollContainer}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={{ flexDirection: "row" }}>
        {FollowingList &&
          FollowingList?.map((data, index) => {
            return (
              <>
                <TouchableOpacity
                  key={index}
                  onPress={() =>
                    navigation.push("Status", {
                      name: data?._id,
                      StoryListing: StoryListing,
                      userName: data?.userName || data?.name,
                      profilePic: data?.profilePic,
                    })
                  }
                >
                  <View style={Styles.ListMainContainer}>
                    <View style={Styles.StoryImgContainer}>
                      {data?.profilePic ? (
                        imageUrlPath ? (
                          <Image
                            // source={{ uri: data?.story[0] }}
                            source={imageUrlPath}
                            style={{
                              resizeMode: "cover",
                              height: "92%",
                              width: "92%",
                              borderRadius: 100,
                            }}
                          />
                        ) : (
                          <Image
                            // source={{ uri: data?.story[0] }}
                            source={{
                              uri: data?.profilePic,
                            }}
                            style={{
                              resizeMode: "cover",
                              height: "92%",
                              width: "92%",
                              borderRadius: 100,
                            }}
                          />
                        )
                      ) : (
                        <Image
                          source={ImagePath.LIKED_BY_ONE}
                          style={{
                            resizeMode: "cover",
                            height: "92%",
                            width: "92%",
                            borderRadius: 100,
                          }}
                        />
                      )}
                    </View>

                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: height / 70,
                        opacity: data?.index ? 1 : 0.5,
                        color: COLOR.WHITE,
                      }}
                    >
                      {data?.userName || data?.name}
                    </Text>
                  </View>
                </TouchableOpacity>
              </>
            );
          })}
      </View>
    </ScrollView>
  );
};

export default StoriesList;

const Styles = StyleSheet.create({
  MainScrollContainer: {
    paddingVertical: 20,
  },
  ListMainContainer: {
    flexDirection: "column",
    paddingHorizontal: 8,
    position: "relative",
  },
  PlusIconContainer: {
    position: "absolute",
    bottom: 13,
    right: 12,
    zIndex: 1,
  },
  StoryImgContainer: {
    width: 68,
    height: 68,
    backgroundColor: "white",
    borderWidth: 1.8,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#c13584",
  },
});
