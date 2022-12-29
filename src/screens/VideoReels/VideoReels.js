import React, { useState, useRef, useEffect, useMemo } from "react";
import {
  Dimensions,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  Alert,
  Share,
  FlatList,
  PermissionsAndroid,
  Platform,
} from "react-native";
const { height, width } = Dimensions.get("window");
import styles from "./Styles";
import { normalize } from "../../../ResponsiveFontSize";
import Video from "react-native-video";
import { COLOR } from "../../Utils/Colors";
import { ImagePath } from "../../constants/ImagePath";

import RBSheet from "react-native-raw-bottom-sheet";
import {
  AddNewReelsUrl,
  FollowUnFollowUserUrl,
  LikeUnLikeReelsUrl,
  ReelsListUrl,
  ReportOnReelsUrl,
  ReelsShareUrl,
  UploadFileUrl,
  SaveReelsUrl,
  GetUserProfileUrl,
  GetFollowingListUrl
} from "../../restAPI/ApiConfig";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { showMessage } from "react-native-flash-message";

const VideoReels = (props) => {
  const [followingids, setFollowingids] = useState([]);

  const refRBSheet = useRef();
  const refRBSheet2 = useRef();
  const [loader, setLoader] = useState(false);
  const [reelsUrl, setReelsUrl] = useState([]);

  const [modalVisible2, setModalVisible2] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRef = useRef(null);
  const [reelsListing, setReelsListing] = useState([]);

  const [reelsId, setReelsId] = useState();
  const [ParticularReelsId, setParticularReelsId] = useState("");

  const [uploadFile, setUploadFile] = useState("");
  const [data, setData] = useState("");
  const [imageResponse, setImageResponse] = useState("");
  const [uploadImage, setUploadImage] = useState("");
  const [likesReels, setLikesReels] = useState({});
  const [userProfileDetails, setUserProfileDetails] = useState({});
  // const [currentIndex, setCurrentIndex] = useState(0);

  const [iAgree, setIAgree] = useState(true);
  const toggleIAgree = (item_id) => {
    setIAgree(false);
    LikeReelsApi(item_id);
  };
  const _toggleIAgree = (item_id) => {
    setIAgree(true);
    LikeReelsApi(item_id);
  };

  // ************ New 20 June Permission ************

  const requestCameraPermission = async () => {
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: "Camera Permission",
            message: "App needs camera permission",
          }
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: "External Storage Write Permission",
            message: "App needs write permission",
          }
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert("Write permission err", err);
      }
      return false;
    } else return true;
  };

  // ************ Step-1 Formdat Function ************
  const createFormData = (photo, body = {}) => {
    const data = new FormData();

    data.append("uploaded_file", {
      name: photo?.assets == undefined ? "myvideo.mp4" : photo?.assets[0]?.fileName,
      type: photo?.assets == undefined ? "video/mp4" : photo?.assets[0]?.type,
      uri:
        Platform.OS === "ios"
          ? photo?.assets[0]?.uri.replace("file://", "")
          : photo?.assets == undefined ? photo.uri : photo?.assets[0]?.uri,
    });

    Object.keys(body).forEach((key) => {
      data.append(key, body[key]);
    });
    return data;
  };

  // ************* Step-2 State and Open Video Camera Function *************
  const [photo, setPhoto] = React.useState(null);

  const handleRecordVideo = async () => {
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    try {
      if (isCameraPermitted && isStoragePermitted) {
        launchCamera({ noData: true, mediaType: "video" }, (response) => {
          if (response) {
            if (response) {
  
              setPhoto(response);
              handleUploadPhoto(response);
            }
            refRBSheet.current.close();
          }
        }, (error) => {
  
        }
        
        );
      }
    } catch (error) {
      
    }
    
  };

  // ************ Step-3 Choose Video File Function ************
  const handleChooseVideo = () => {
    try {
      launchImageLibrary({ noData: true, mediaType: "video" }, (response) => {
        if (response) {
          setPhoto(response);
          handleUploadPhoto(response);
          refRBSheet.current.close();
        }
      },(error)=>{
  
      }
      
      )
      ;
    } catch (error) {
      
    }
    
  };

  // ************ Step-4 Upload File Api Function ************
  const handleUploadPhoto = (response) => {


    setLoader(true);
    showMessage({
      message: "Uploading...",
      type: "info",
      duration: 3000,
    })
    axios({
      method: "post",
      url: UploadFileUrl,
      data: createFormData(response),
    })
      .then((response) => {
        UploadReels(response?.data.result?.secure_url);
        setLoader(false);
        showMessage({
          message: "Video Uploaded Successfully",
          type: "success",
          duration: 3000,
        })
      })
      .catch((error) => {
        console.log(error.response)
        setLoader(false);
      });
  };

  // ************* Share Message Functionality *************
  const ShareMessage = async () => {
    reelsUrl?.map(async (data) => {
      try {
        const result = await Share.share({
          message: data,
        });
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            data;
          } else {
          }
        } else if (result.action === Share.dismissedAction) {
        }
      } catch (error) {
        alert(error.message);
        Alert.alert("Social link is required to share");
      }
    });
  };

  const onBuffer = (e) => {
  };
  const onError = (e) => {
  };

  useEffect(() => {
    if (!!videoRef.current) {
      videoRef.current.seek(0);
    }
  }, [currentIndex]);

  const renderItem = ({ item, index }) => {
    return (
      <View
        style={{
          flex: 1,
          height: height * 0.9,
        }}
      >
        <Video

          source={{ uri: (item?.reelsurl[0]) }}
          poster={item.thumb}
          posterResizeMode="cover"
          ref={videoRef}
          onBuffer={onBuffer}


          onError={onError}
          style={styles.backgroundVideo}
          keyExtractor={(item) => item.id}
          resizeMode="contain"
          repeat={true}

          // paused={pause}

          paused={pause|| currentIndex !== index}
          tapAnywhereToPause={true}
        />
        <View
          style={{
            alignItems: "flex-end",
            top: 430,
            right: 16,
            position: "absolute",
          }}
        >
          <TouchableOpacity
            style={styles.ImgViewContainer}
            onPress={() => {
              // console.log(item?.likesUsers?.includes(userProfileDetails?._id) )
              LikeReelsApi(item?._id)
            }}
          >
            <Image
              source={
                !item?.likesUsers?.includes(userProfileDetails?._id) ? ImagePath.REEL_LIKE : ImagePath.HEART_LIKE
              }
              style={{}}
            />
          </TouchableOpacity>
          <Text style={styles.DataTxt}>{item?.likesCount}</Text>

          <TouchableOpacity
            style={styles.ImgViewContainer}
            onPress={() =>
              props.navigation.navigate("CommentsReels", { _id: item?._id })
            }
          >
            <Image source={ImagePath.REEL_COMMENT} />
          </TouchableOpacity>
          <Text style={styles.DataTxt}>{item?.totalComment}</Text>

          <TouchableOpacity
            style={styles.ImgViewContainer}
            onPress={() => {
              refRBSheet2.current.open(item), sendDataToModal(item);
            }}
          >
            <Image
              source={ImagePath.VERTICAL_MORE}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        {/* ************ Bottom View Container ************ */}
        <View style={styles.BottomViewContainer}>
          {/* ************ Profile Container ************ */}
          <View
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            {item?.userId?.profilePic ? (
              <Image
                source={{ uri: item?.userId?.profilePic }}
                style={{
                  height: 50,
                  width: 50,
                  borderRadius: 50 / 2,
                }}
              />
            ) : (
              <Image
                source={ImagePath.PROFILE_PIC}
                style={{
                  height: 50,
                  width: 50,
                  borderRadius: 50 / 2,
                }}
              />
            )}
            <Text numberOfLines={1} style={styles.ProfileNameTxt}>
              {item?.userId?.userName || item?.userId?.name}
            </Text>
             {userProfileDetails._id!=item.userId._id&& <TouchableOpacity
              style={styles.FollowButtonContainer}
              onPress={() => FollowApi(item?.userId?._id, index)}
            >
              <Text style={styles.FollowTxt}>{followingids.includes(item?.userId?._id) ? "Unfollow" : "Follow"}</Text>
            </TouchableOpacity>}
          </View>

          {/* ************ Description Text Container ************ */}
          <View style={{ flexDirection: "row" }}>
            <Text
              numberOfLines={1}
              style={{
                flex: 1,
                color: COLOR.WHITE,
                fontFamily: "Montserrat-Regular",
                bottom: -5,
              }}
            >
              {item?.details}
            </Text>
          </View>
        </View>
      </View>
    );
  };



  // ****************************** Api's *****************************
  useEffect(() => {
    FollowingListApi()
    GetProfileApi()
    ReelsListApi();
  }, [props.route]);

  // ********** Upload Reels Api **********
  const UploadReels = async (secure_url) => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");

    setLoader(true);
    axios({
      method: "post",
      url: AddNewReelsUrl,
      data: {
        details: "Ashish",
        reelsurl: [secure_url],
        hashTagName: ["#first#android#reels"],
      },
      headers: { token: value },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          FollowingListApi()
          ReelsListApi();
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
          setLoader(false);
        } else {
          alert("Something went wrong.");
          setLoader(false);
        }
      })
      .catch((err) => {
        console.log(err.response)
        setLoader(false);
      });
  };

  // ********** Reels List Api **********
  const ReelsListApi = async () => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");

    setLoader(true);
    axios({
      method: "get",
      url: ReelsListUrl,
      params: {
        limit: 100,
      },
      headers: {
        token: value,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          setReelsListing(response?.data?.result?.docs);
          setReelsId(response?.data?.result?.docs);
          setLoader(false);
        } else {
          alert("Something went wrong.");
          setLoader(false);
        }
      })
      .catch((err) => {
        console.log(err.response.data);
        setLoader(false);
      });
  };

  // ********** Like Reels Api **********
  const LikeReelsApi = async (id) => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");

    setLoader(true);
    axios({
      method: "get",
      url: LikeUnLikeReelsUrl + `${id}`,
      headers: {
        token: value,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          setLikesReels(response?.data?.result);
          // setReelsListing(response?.data?.result);
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
          setLoader(false);
        } else {
          alert("Something went wrong.");
          setLoader(false);
        }
      })
      .catch((err) => {
        setLoader(false);
      });
  };

  useMemo(() => {
    if (Object.keys(likesReels).length > 0) {
      //find and update the reels
      const datas = reelsListing
      datas.map((item, index) => {
        //replace all object with new object
        if (item._id === likesReels._id) {
          //replace item with likesReels
          datas[index] = likesReels
        }
      })
      setReelsListing(datas)

    }

  }, [likesReels])
  const FollowingListApi = async () => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");

    axios({
      method: "get",
      url: GetFollowingListUrl,
      headers: {
        token: value,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          const temp = []
          response.data.result.following.map((item) => {
            temp.push(item._id);

          })
          console.log(temp)
          setFollowingids(temp);
          setLoader(false);
        } else {
          alert("Something went wrong.");
          setLoader(false);
        }
      })
      .catch((err) => {
        console.log("===== Get Following List Catch Error ======", err)
      }
      );
  };


  // ********** Follow Reels Api **********
  const FollowApi = async (userId) => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");

    setLoader(true);
    axios({
      method: "get",
      url: FollowUnFollowUserUrl + `${userId}`,
      headers: {
        token: value,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          if (followingids.includes(userId)) {
            setFollowingids(followingids.filter(item => item !== userId));
          }
          FollowingListApi()
          ReelsListApi();

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
          setLoader(false);
        } else {
          alert("Something went wrong.");
          setLoader(false);
        }
      })
      .catch((err) => {
        setLoader(false);
      });
  };

  // ********** Report Reels Api **********
  const ReportApi = async () => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");

    setLoader(true);
    axios({
      method: "post",
      url: ReportOnReelsUrl,
      data: {
        reelsId: ParticularReelsId?._id,
        message: "dgdkhjdkhjdkdh",
      },
      headers: {
        token: value,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          ReelsListApi();
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
          setLoader(false);
        } else {
          alert("Something went wrong.");
          setLoader(false);
        }
      })
      .catch((err) => {
        setLoader(false);
      });
  };

  const sendDataToModal = async (item) => {
    await setParticularReelsId(item);
    const SavedReels = await AsyncStorage.setItem("Reels", item?.reelsurl[0]);
  };

  // ********** Share Reels Api **********
  const ShareReelsApi = async () => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");

    setLoader(true);
    axios({
      method: "get",
      url: ReelsShareUrl + `${ParticularReelsId?._id}`,
      headers: {
        token: value,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          setReelsUrl(response?.data?.result?.reelsurl);
          ShareMessage();
          setLoader(false);
        } else {
          alert("Something went wrong.");
          setLoader(false);
        }
      })
      .catch((err) => {
        setLoader(false);
      });
  };

  // ********** Saved Reels Api **********
  const SaveReelsApi = async () => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");

    const formData = new FormData();
    formData.append({
      reelsId: ParticularReelsId?._id,
    });

    setLoader(true);
    axios({
      method: "post",
      url: SaveReelsUrl,
      data: formData?._parts[0][0],
      headers: {
        token: value,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          refRBSheet2.current?.close();
          props.navigation.navigate("SavedReels");
          setLoader(false);
        } else {
          alert("Something went wrong.");
          setLoader(false);
        }
      })
      .catch((err) => {
        setLoader(false);
      });
  };

  const [pause, setPause] = useState(false);

  useEffect(() => {
    const blur = props.navigation.addListener("blur", () => {
      try {

        setPause(true);
      } catch (error) {

      }

    });

    const focus = props.navigation.addListener("focus", () => {
      try {
        //screnn name is Reels
        setPause(false);
       
      } catch (error) {

      }



    });

    return blur, focus;
  }, [props.navigation]);

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
          setUserProfileDetails(response?.data?.result);
          setLoader(false);
        } else {
          alert("Something went wrong.");
          setLoader(false);
        }
      })
      .catch((err) => {
        setLoader(false);
      });
    setLoader(false);
  };
  const onViewRef = React.useRef((viewableItems) => {
    setCurrentIndex(viewableItems.changed[0].index)
    // Use viewable items in state or as intended
  })
  const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 })

  return (
    <SafeAreaView>
      <View style={{ flex: 1, height: height * 0.9 }}>
        <View
          style={{
            height: height * 0.9,
            justifyContent: "center",
          }}
        >
          <FlatList
            data={reelsListing}
            pagingEnabled

            // horizontal
            initialNumToRender={1}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            viewabilityConfig={viewConfigRef.current}
            onViewableItemsChanged={onViewRef.current}
          />

        </View>

        

        <View style={{ top: 15, right: 16, position: "absolute" }}>
          <TouchableOpacity onPress={() => refRBSheet.current.open()}>
            <Image
              source={ImagePath.CAMERA_ICON}
              style={{ height: 36, width: 36, tintColor: COLOR.WHITE }}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* *************** Report Modal *************** */}
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
                    {"Are you sure you want to report?"}
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
                    onPress={() => {
                      setModalVisible2(false),
                        Alert.alert("You have report profile successfully");
                    }}
                  >
                    <Text style={styles.ReportModalReportTxt}>{"Report"}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
      </View>

      {/* *************** Upload Video Bottom Sheet *************** */}
      <View style={styles.MainContainerSheet}>
        <RBSheet
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={true}
          height={350}
          customStyles={{
            wrapper: {
              backgroundColor: "rgba(0,0,0,0.6)",
            },
            draggableIcon: {
              backgroundColor: COLOR.TXT_COLOR,
            },
            container: {
              backgroundColor: COLOR.BOTTOM_SHEET_BG_CLR,
              borderTopLeftRadius: 25,
              borderTopRightRadius: 25,
              borderTopWidth: 0.5,
              borderColor: COLOR.TXT_INPT_COLOR,
            },
          }}
        >
          <View style={styles.panel}>
            <View style={{ alignItems: "center" }}>
              <Text style={[styles.panelTitle, {fontSize:normalize(20)}]}>Upload Videos</Text>
              <Text style={styles.panelSubtitle}>Choose your videos here</Text>
            </View>

            <TouchableOpacity
              style={styles.panelButton}
              onPress={handleRecordVideo}
            >
              <Text style={styles.panelButtonTitle}>Take Video</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.panelButton}
              onPress={handleChooseVideo}
            >
              <Text style={styles.panelButtonTitle}>Choose from Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.panelButton}
              onPress={() => refRBSheet.current.close()}
            >
              <Text style={styles.panelButtonTitle}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </RBSheet>
      </View>

      {/* *************** Select Bottom Sheet *************** */}
      <View style={styles.MainContainerSheet}>
        <RBSheet
          ref={refRBSheet2}
          closeOnDragDown={true}
          closeOnPressMask={true}
          height={220}
          customStyles={{
            wrapper: {
              backgroundColor: "rgba(0,0,0,0.6)",
            },
            draggableIcon: {
              backgroundColor: COLOR.TXT_COLOR,
            },
            container: {
              backgroundColor: COLOR.BOTTOM_SHEET_BG_CLR,
              borderTopLeftRadius: 25,
              borderTopRightRadius: 25,
              borderTopWidth: 0.5,
              borderColor: COLOR.TXT_INPT_COLOR,
            },
          }}
        >
          <View style={styles.panel}>
            <View style={styles.BtnMainContainer}>
              <TouchableOpacity
                onPress={() => ReportApi()}
                style={{ width: 80 }}
              >
                <Text style={styles.BtnTxt}>Report</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.BtnMainContainer}>
              <TouchableOpacity
                onPress={() => ShareReelsApi()}
                style={{ width: 80 }}
              >
                <Text style={styles.BtnTxt}>Share</Text>
              </TouchableOpacity>
            </View>

            {/* <View style={styles.BtnMainContainer}>
              <TouchableOpacity
        
                style={{ width: 80 }}
              >
                <Text style={styles.BtnTxt}>Save</Text>
              </TouchableOpacity>
            </View> */}
          </View>
        </RBSheet>
      </View>
    </SafeAreaView>
  );
};

export default VideoReels;
