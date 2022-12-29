import React, { useRef, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput,
  ScrollView,
  FlatList,
  ActivityIndicator,
  Platform
} from "react-native";

import Styles from "./Styles";
import ProfileHeader from "../../components/CustomHeader/ProfileHeader";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { ImagePath } from "../../constants/ImagePath";
import { COLOR } from "../../Utils/Colors";
import { Dropdown } from "react-native-element-dropdown";
const { height, width } = Dimensions.get("window");
import AppButton from "../../components/CustomButton/CustomButton";
import ImagePicker from "react-native-image-crop-picker";
import {
  CreatePostUrl,
  GetCollectionDetailsUrl,
  GetUserProfileUrl,
  OwnCollectionsUrl,
  HashTagSearchUrl,
  updatedPostUrl
} from "../../restAPI/ApiConfig";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomLoader from "../../components/CustomLoader/CustomLoader";
import TwitterTextView from "react-native-twitter-textview";
import CustomInput from "../../components/CustomInput/CustomInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import RBSheet from "react-native-raw-bottom-sheet";
import { showMessage } from "react-native-flash-message";
import { normalize } from "../../../ResponsiveFontSize";
import Canvas from 'react-native-canvas';
import Progressdialog from "../../../Progressdialog";


const DATA = [
  {
    value: "Public",
    label: 'Public'
  },
  {
    value: "Private",
    label: 'Private(for subscribers)'
  },
];
import RNFS from "react-native-fs";

const CreatePost = (props) => {
  const refRBSheet = useRef();
  const canvasRef = useRef()

  // const [isGetImage, setIsGetImage] = useState(props?.route?.params);
  const [value, onChangeText] = useState("");
  const [itemList, setItem] = useState(-1);
  const [loader, setLoader] = useState(false);
  const [Details, setDetails] = useState("");
  const [PostType, setPostType] = useState({
    value: "Public",
  },);
  const [imageUrlPath, setImageUrlPath] = useState("");
  const [imageUrlData, setImageUrlData] = useState("");
  const [CollectionDetails, setCollectionDetails] = useState([]);
  const [CollectionList, setCollectionList] = useState([]);
  const [userProfileDetails, setUserProfileDetails] = useState("");
  const [collectionId, setCollectionId] = useState("");
  const [hashTagListing, setHashTagListing] = useState("");
  const [hashList, setHashList] = useState([]);
  const [postType, setpostType] = useState('Text')
  const [CollectionsLoader, setCollectionsLoader] = useState(false)
  const [royalty, setroyalty] = useState('');
  const [royaltyError, setroyaltyError] = useState(null);
  const [showLoader, setshowLoader] = useState(false)
  const [dropdownwidth, setdropdownwidth] = useState(width * 0.25)

  // ************ Post Title Validations ************
  const [PostTitle, setPostTitle] = useState("");
  const [errorPostTitle, setErrorPostTitle] = useState(null);
  const [titlebase64, settitlebase64] = useState("")
  const _validatePostTitle = (posttitle) => {
    var posttitleRegex = /^[a-zA-Z0-9@_]{3,60}$/i;
    if (posttitle == "" || posttitle == undefined || posttitle == null) {
      setErrorPostTitle("*Please enter title.");
    } else if (!posttitleRegex.test(posttitle)) {
      setErrorPostTitle("*Please enter valid title.");
    } else {
      setErrorPostTitle(null);
    }
  };

  // ************ Phone Validations ************
  const [Amount, setAmount] = useState('');
  const [errorAmount, setErrorAmount] = useState(null);
  const _validateAmount = (bal) => {
    var balRegex = /^([0-9.])$/;
    if (bal === "") {
      setErrorAmount("*Please enter amount.");
    }
    // else if (!balRegex.test(bal)) {
    //   setErrorAmount("*Please enter valid amount.");
    // }
    else {
      setErrorAmount(null);
    }
  };

  const isRoyaltyValid = (royalty) => {
    const re_ = /[0-9]/g;
    if (royalty != "") {
      if (re_.test(royalty) && Number(royalty) <= 10) {
        setroyaltyError(null)
      }
      else {
        setroyaltyError('*Please enter royalty (between 0% to 10%).')
      }
    }
    else {
      setroyaltyError('*Please enter royalty (between 0% to 10%).')
    }
  }

  // ************* On Camera Picker *************
  const onCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      includeBase64: true,
      quality: "low",
      mediaType: "any",
      cropping: true,
    }).then((image) => {
      setImageUrlPath(image.path);
      setImageUrlData(image.data);
      setpostType('Image');
      refRBSheet.current.close();
      props.navigation.navigate('ImageFilter', { Path: image.data, Type: 'Post', PrevScreen: 'CreatePost',item:props.route?.params?.item });
    }).catch((err) => {
      console.log(err);
    });
  };

  // ************* On Gallary Picker *************
  const onGallary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      // cropping: true,
      quality: "low",
      includeBase64: true,
      mediaType: "any",

    }).then((image) => {
      if (
        image.mime == "image/jpeg" ||
        image.mime == "image/png" ||
        image.mime == "image/jpg"
      ) {
        //when user uploads picture (.jpg, .png etc)
        setImageUrlPath(image.path);
        setImageUrlData(image.data);
        setpostType('Image')
        props.navigation.navigate('ImageFilter', { Path: image.data, Type: 'Post', PrevScreen: 'CreatePost',item:props.route?.params?.item });
      } else {

        setshowLoader(true)
        if (image?.duration <= 3 * 60 * 1000) {
          RNFS.readFile(image.path, "base64")
            .then((res) => {
              setshowLoader(false)
              setImageUrlPath(image.path);
              setImageUrlData(res);
              setpostType('Video')
              refRBSheet.current.close();
            })
            .catch((err) => {
              setshowLoader(false)
              console.log(err)
            });

        } else {
          setshowLoader(false)
          showMessage({
            message: 'Video length cannot be more than 3 min.',
            type: 'success',
            icon: 'success',
            duration: 3000
          })
        }
        // when user uploads video (.mp4)
      }
      // setImageUrlPath(image.path);
      // setImageUrlData(image.data);

      refRBSheet.current.close();
    });

  };

  // ***** Render Post Type: Public/Private ***** //
  const RenderLabel = (item, selected) => {
    return (
      <View style={{ padding: 5, backgroundColor: 'white' }}>
        <Text style={{ fontFamily: 'Montserrat-Regular', color: 'black', }}>{item.label}</Text>
      </View>
    )
  }

  useEffect(() => {
    CollectionDetailsApi();
    GetProfileApi();
    GetOwnCollectionListApi();
    CreateCollectionsApi()
  }, [props.route]);

  // ************ Create Collection Api ************
  const CollectionDetailsApi = async () => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");

    // setLoader(true);
    axios({
      method: "get",
      url: GetCollectionDetailsUrl,
      headers: { token: value },
    })
      .then(async (response) => {
        if (response.status === 200) {
          // console.log("====== Collections Api Response ======", response);
          setCollectionDetails(response?.data?.result?.docs);
          // GeneratePost(CollectionDetails);
          // setLoader(false);
        } else {
          alert("Something went wrong.");
          // setLoader(false);
        }
      })
      .catch((err) => {
        console.log("==== Collections Catch Err ====", err);
        // setLoader(false);
      });
    // setLoader(false);
  };
  useEffect(() => {
    try {
      

      let postType=props.route?.params?.item?.postType?.toLowerCase()
      //make first letter capital
      postType=postType.charAt(0).toUpperCase() + postType.slice(1)
      setPostType(postType)
      if(props.route?.params?.item?.mediaType?.toLowerCase()!='text'){
        setImageUrlPath(props.route?.params?.item?.mediaUrl)
      }
    
      setHashTagListing(props.route?.params?.item?.details)
      setDetails(props.route?.params?.item?.details)
      setPostTitle(props.route?.params?.item?.postTitle)
      setAmount(props.route?.params?.item?.amount)
      setroyalty(props.route?.params?.item?.royality)
      let mediaType=props.route?.params?.item?.mediaType
      if(mediaType=="TEXT"){
        setpostType('Text')

      }else{
        if(props.route?.params?.item?.mediaUrl.includes('mp4')){
          setpostType('Video')
        }else{
          setpostType('Image')
        }
      }
      
    } catch (error) {
      console.log(error)
      
    }

  }, [props.route])
  const GetOwnCollectionListApi = async () => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");

    // setLoader(true);
    axios({
      method: "get",
      url: OwnCollectionsUrl,
      headers: {
        token: value,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          // console.log("====== Get Own Collection Response ======", response);
          // setCollectionId(response?.data?.result?.docs[0]?._id);
          // setLoader(false);
        } else {
          alert("Something went wrong.");
          // setLoader(false);
        }
      })
      .catch((err) => {
        console.log("===== Get  Own Collection Catch Error ======", err);
        // setLoader(false);
      });
    // setLoader(false);
  };

  // ************ Create Post Api ************
  const CreatePostApi = async () => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");
    let base64 = ""
    // let type=""
    if (postType == 'Image') {
      if((props?.route?.params?.FilteredPost==null||props?.route?.params?.FilteredPost==undefined)&&imageUrlData==""){
        base64 = imageUrlPath

      }else{

        base64 = props?.route?.params?.FilteredPost ? props?.route?.params?.FilteredPost : `data:image/jpeg;base64,${imageUrlData}`
      }

    } else if (postType == "Text") {
      base64 = titlebase64
      // base64=`data:Text/text;base64,${new Buffer(Details).toString("base64")}`

      // const image = new Image(Canvas, height, width);

      // console.log( "tes",textToImage.render().toFile(path.join(__dirname, "image2.png")))
    }
    console.log(Details ,postType);
    try {
      const formdata = new FormData();

      formdata.append({
        collectionId: collectionId,
        postTitle: PostTitle,
        mediaUrl: base64,
        details: Details ? Details : hashTagListing,
        amount: PostType?.value == 'Private' ? Amount : Amount ? Amount : '0',
        postType: PostType?.value?.toUpperCase()?PostType?.value?.toUpperCase():PostType.toUpperCase(),
        royality: PostType?.value == 'Private' ? royalty : royalty ? royalty : '0',
        hashTagName: [hashTagListing ? hashTagListing : null],
        mediaType: postType == "Text" ? "TEXT" : "MEDIA",
        postId: props?.route?.params?.item?._id,

      });

      setLoader(true);
      axios({
        method: props?.route?.params?.item?"put":"post",
        url: props?.route?.params?.item?updatedPostUrl :CreatePostUrl,
        data: formdata?._parts[0][0],
        headers: { token: value },
        
      })
        .then(async (response) => {
          if (response.data.responseCode === 200) {
            console.log("==== Create Post Response ====", response);
            showMessage({
              message: response?.data?.responseMessage,
              type: "success",
              icon: "success",
              duration: 3000,
              textStyle: {
                fontFamily: "Montserrat-Medium",
                fontSize: height / 55,
              },

            });
            props.navigation.replace("Home");
            setLoader(false);
          } else {
            alert("Something went wrong.");
            setLoader(false);
          }
        })
        .catch((err) => {
          setLoader(false);

          console.log('error submit api', err.response);
          if (err.response.data.responseCode === 402 || 404 || 409) {
            showMessage({
              message: err?.response?.data?.responseMessage,
              type: "warning",
              icon: "warning",
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
            alert("Something went wrong");
            setLoader(false);
          }
          setLoader(false);
        });
    } catch (error) {
      console.log(error)

    }


  };

  const CreatePostApiVideo = async (base64) => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");

    const formdata = new FormData();
    formdata.append({
      collectionId: collectionId,
      postTitle: PostTitle,
      mediaUrl: `data:video/mp4;base64,${base64}`,
      // mediaUrl:  base64,
      details: Details ? Details : hashTagListing,
      amount: PostType?.value == 'Private' ? Amount : Amount ? Amount : '0',
      postType: PostType?.value?.toUpperCase(),
      royality: PostType?.value == 'Private' ? royalty : royalty ? royalty : '0',
      hashTagName: [hashTagListing ? hashTagListing : null],
      mediaType: postType == "Text" ? "TEXT" : "MEDIA"
    });
    console.log(postType)

    setLoader(true);
    axios({
      method: "post",
      url: CreatePostUrl,
      data: formdata?._parts[0][0],
      headers: { token: value },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          console.log("==== Create Post Response ====", response);
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
          props.navigation.navigate("Home");
          setLoader(false);
        } else {
          alert("Something went wrong.");
          setLoader(false);
        }
      })
      .catch((err) => {
        console.log('error submit api', err);
        if (err.response.data.responseCode === 402 || 404 || 409) {
          showMessage({
            message: err?.response?.data?.responseMessage,
            type: "warning",
            icon: "warning",
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
          alert("Something went wrong");
          setLoader(false);
        }
        setLoader(false);
      });
  };

  // ************ User Profile Api ************
  const GetProfileApi = async () => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");
    console.log("====== my token======>>>>", value);

    axios({
      method: "get",
      url: GetUserProfileUrl,
      headers: {
        token: value,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          // console.log("====== Get User Profile Response ======", response);
          setUserProfileDetails(response?.data?.result);
        } else {
          alert("Something went wrong.");
        }
      })
      .catch((err) => {
        console.log("===== Get Profile Catch Error ======", err);
      });
  };

  useEffect(() => {
    if (hashTagListing) {
      HashTagApi();
    }
  }, [hashTagListing]);

  const validate = () => {
    let flag = true;
    if (PostTitle === "") {
      setErrorPostTitle("*Please enter title.");
      flag = false;
    }
    if (Amount === "") {
      setErrorAmount("*Please enter amount.");
      flag = false;
    }else if (Amount < 0) {
      setErrorAmount("*Please enter valid amount.");
      flag = false;
    }


    if (royalty == "") {
      setroyaltyError("*Please enter royalty.");
      flag = false;
    }
    if (Details == "") {
      showMessage({
        message: "Please enter details.",
        type: "warning",
        icon: "warning",
      })

      flag = false;
    }

    return flag;
  };

  const validatePublic = () => {
    let flag = true;
    if (PostTitle === "") {
      setErrorPostTitle("*Please enter title.");
      flag = false;
    }
    if (Amount === "") {
      setErrorAmount("*Please enter amount.");
      flag = false;
    }

    if (royalty == "") {
      setroyaltyError("*Please enter royalty.");
      flag = false;
    }
    if (Details == "") {
      console.log("details", Details)
      showMessage({
        message: 'Please enter details',

        type: "warning",
        icon: "warning",
        textStyle: {
          fontFamily: "Montserrat-Medium",
          fontSize: height / 55,
        },
      })
      flag = false
    }

    return flag;
  };

  // ************ Collection List Api ************
  const CreateCollectionsApi = async () => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");
    // setLoader(true);
    setCollectionsLoader(true)
    axios({
      method: "get",
      url: OwnCollectionsUrl,
      headers: {
        token: value
      }
    })
      .then(async (response) => {
        setCollectionsLoader(false)
        if (response.data.responseCode === 200) {
          // console.log("====== Collection List Response ======", response.data.result.docs[0]._id, response.data.result.docs[0].title, response.data.result.docs[1]._id, response.data.result.docs[1].title );
          setCollectionList(response?.data?.result?.docs);
          if(props.route?.params?.item){
            response?.data?.result?.docs?.map((item, index) => {
              if(item._id === props.route?.params?.item?.collectionId){
                setCollectionId(item._id)
                setItem(index)
              }

            })
          }
          // setLoader(false);
        } else {
          alert("Something went wrong.");
          // setLoader(false);
        }
      })
      .catch((err) => {
        setCollectionsLoader(false)
        // console.log("==== Collection List Catch error=====", err.response);
        if (err.response.data.responseCode === 404) {
         
          setLoader(false);
        } else {
          alert("Something went wrong.");
          setLoader(false);
        }
        setLoader(false);
      });
  };

  const onSubmit = () => {
    console.log(collectionId, postType, '????');
    if (PostType.value == 'Private') {
      if (validate() && collectionId !== "") {
        if (collectionId !== "") {

          if (postType == 'Image' || postType == "Text") {
            CreatePostApi();
          }
          else {
            CreatePostApiVideo(imageUrlData)
          }
        } else {
          showMessage({
            message:
              "You don't have any collection now. Please create and try again.",
            type: "warning",
            icon: "warning",
            textStyle: {
              fontFamily: "Montserrat-Medium",
              fontSize: height / 55,
            },

          });
        }
      }

    }
    else {
      if (validatePublic()) {
        if (collectionId !== "") {

          if (postType == 'Image' || postType == "Text") {
            CreatePostApi();
          }
          else {
            console.log('here goes vdo');
            CreatePostApiVideo(imageUrlData)
          }
        } else {
          showMessage({
            message:
              "You don't have any collection now. Please create and try again.",
            type: "warning",
            icon: "warning",
            textStyle: {
              fontFamily: "Montserrat-Medium",
              fontSize: height / 55,
            },

          });
        }
      }

    }
  };
  // ************ HashTag List Api ************
  const HashTagApi = async () => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");

    // setLoader(true);
    axios({
      method: "get",
      url: HashTagSearchUrl,
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          console.log(
            "====== Hash Tag Response ======",
            response?.data?.result
          );
          setHashList(response?.data?.result?.docs);
          // setLoader(false);
        } else {
          alert("Something went wrong.");
          // setLoader(false);
        }
      })
      .catch((err) => console.log("===== Hash Tag Catch Error ======", err));
  };

  const showErrorLog = () => {
    return showMessage({
      message: "Please select post type",
      type: "warning",
      icon: "warning",
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
  };

  const renderList = ({ item, index }) => {
    // console.log("@@@ Item =====", item)
    return (
      <View style={Styles.itemView}>
        <TouchableOpacity onPress={() => { setItem(index), setCollectionId(item._id) }} style={[Styles.mainItemView, { backgroundColor: CollectionList[itemList]?._id ? CollectionList[itemList]?._id === item._id ? COLOR.BUTTON_PINK : COLOR.TXT_INPT_COLOR : COLOR.TXT_INPT_COLOR }]}>
          <View style={Styles.imageView}>
            <Image source={{ uri: item.image }} resizeMode="contain" style={{ height: 100, width: 110 }} />
          </View>
          <View style={Styles.titleView}>
            <Text numberOfLines={2} style={Styles.titleTxt}>{item.title}</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  const handleCanvas = async (canvas) => {
    const ctx = canvas?.getContext('2d');
    try {
      if (canvas) {

        canvas.width = 400;
        canvas.height = 300;

        ctx.fillStyle = '#E31A89';
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.fill();
        ctx.font = "500 14px Montserrat, sans-serif";
        ctx.fillStyle = "#fff";
        ctx.textAlign = "center";
        var x = canvas.width / 2;
        var y = 60;
        var line = '';
        var words = PostTitle.split(' ');

        for (var n = 0; n < words.length; n++) {
          var testLine = line + words[n] + ' ';
          var metrics = await ctx?.measureText(testLine);
          var testWidth = metrics.width;
          if (testWidth > 370 && n > 0) {
            ctx.fillText(line, x, y);
            line = words[n] + ' ';
            y += 23;
          }
          else {
            line = testLine;
          }
        }

        ctx.textAlign = "center";
        ctx.fillText(line, x, y);


        // ctx.fillText(PostTitle, canvas.width/2, canvas.height/2);

        canvas.toDataURL('image/jpeg', 1.0)
          .then((data) => {
            data = data.substring(1);
            data = data.slice(0, -1);

            if (data.indexOf('data:image/jpeg;base64,') > -1) {
              settitlebase64(data)
              // Removing "data:image/jpeg;base64," for saving into file as base64 data
              data = data.substring(23);
            }


          })
      }
    } catch (error) {
      console.log(error)


    }
    // console.log(canvas)
  }

  return (
    <SafeAreaView>
      {/* ************ Header Container ************ */}
      <ProfileHeader
        BackIcon={true}
        onBackPress={() => props.navigation.goBack()}
        Title={true}
        HeaderTitle={props?.route?.params?.item?"Update Post": "Create Post"}
        // titleStyling={{ width: width * 0.73, alignItems: "center" }}
        // titleStyling={{ width: width * 0.7 }}
        HeaderTxtStyling={{ fontSize: normalize(16), marginLeft: 25 }}
        BackView={{
          width: width * 0.16,
          alignItems: "flex-end",
        }}
        PostIcon={false}
        Menu={false}
      />
      <ScrollView>
        <KeyboardAwareScrollView>
          <View style={Styles.MainContainer}>
            {/* ************ Profile and DropDown Container ************ */}
            <View style={Styles.ProfileImgNameContainer}>
              <View style={Styles.ImgContainer}>
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate("AboutCreator", {
                      nftId: userProfileDetails?._id,
                      item:props.route?.params?.item
                    })
                  }
                >
                  {userProfileDetails?.profilePic ? (
                    <Image
                      source={{ uri: userProfileDetails?.profilePic }}
                      style={{
                        height: 45,
                        width: 45,
                        borderRadius: 45 / 2,
                        marginTop: height * 0.015,
                      }}
                    />
                  ) : (
                    <Image
                      source={ImagePath.PROFILE_PIC}
                      style={{
                        height: 45,
                        width: 45,
                        marginTop: height * 0.015,
                      }}
                    />
                  )}
                </TouchableOpacity>
              </View>

              {/* ************ Public-Private DropDown ************ */}
              <View style={Styles.NameContainer}>
                <Text style={Styles.NameTxt}>
                  {userProfileDetails?.userName || userProfileDetails?.name}
                </Text>
                <Dropdown
                  data={DATA}
                  value={PostType}
                  valueField={'value'}
                  labelField={'label'}
                  onChange={(text) => {
                    if (text.value == "Private") {
                      setdropdownwidth(width * 0.6)
                    } else {
                      setdropdownwidth(width * 0.25)
                    }
                    setPostType(text), setErrorAmount(null), setroyaltyError(null), setErrorPostTitle(null)
                  }}
                  selectedTextStyle={{ color: 'white', fontSize: normalize(12), fontFamily: 'Montserrat-Regular' }}
                  style={{ backgroundColor: '#1A1A1A', borderRadius: 8, paddingLeft: 5, width: dropdownwidth, marginTop: 7 }}
                  containerStyle={{ width: width * 0.6 }}
                  renderItem={RenderLabel}
                />
              </View>
            </View>

            {/* ************ Hash Tag Container ************ */}
            <View style={Styles.HashTagContainer}>
              <View style={StyleSheet.absoluteFill}>
                <CustomInput
                  LeftIcon={false}
                  placeholder="Type some #hashtags"
                  keyboardType="email-address" // Newly Added
                  placeholderTextColor={COLOR.GREY}
                  maxLength={280}
                  value={hashTagListing}
                  styles={{
                    height: height * 0.08,
                    width: width * 0.9,
                    backgroundColor: COLOR.TXT_INPT_COLOR,
                    color: COLOR.GREY,
                    borderRadius: scale(10),
                    padding: moderateScale(8), // Newly Added
                    fontFamily: "Montserrat-Regular",
                  }}
                  onChangeText={(txt) => setHashTagListing(txt)}
                />

                <TwitterTextView
                  style={styles.twitterTextView}
                  hashtagStyle={styles.hashtagStyle}
                  mentionStyle={styles.mentionStyle}
                  linkStyle={styles.linkStyle}
                  emailStyle={styles.emailStyle}
                >
                  {value}
                </TwitterTextView>
              </View>
            </View>
            {/* {hashList.map((data) => {
              console.log("===== map list -----", data);
              return (
                <>
                  {hashTagListing !== "" ? (
                    <View style={Styles.HashTxtList}>
                      <Text
                        numberOfLines={1}
                        style={{
                          fontSize: height / 50,
                          fontFamily: "Montserrat-Medium",
                        }}
                        // onPress={(txt) => {
                        //   hashTagListing(txt), alert(txt);
                        // }}
                      >
                        {data?.hashTagName}
                      </Text>
                    </View>
                  ) : null}
                </>
              );
            })} */}

            {/* ************ Write Here Container ************ */}
            <View style={Styles.WriteContainer}>

              <TextInput
                placeholder="Write here..."
                placeholderTextColor={"#BFBFBF"}
                style={{
                  height: height * 0.05,
                  width: width * 0.9,
                  padding: 8,
                  color: "#BFBFBF",
                  fontSize: height / 70,
                  fontFamily: "Montserrat-Regular",
                  // backgroundColor:'red',
                }}
                value={Details}
                onChangeText={(txt) => setDetails(txt)}
              />

            </View>

            {/* ************ Post Container ************ */}
            <View style={Styles.PostAreaContainer}>
              {props?.route?.params?.FilteredPost ?

                <Image
                  source={{ uri: props?.route?.params?.FilteredPost }}
                  style={{
                    height: height * 0.3,
                    width: width * 0.9, resizeMode: 'contain'
                  }}
                /> :
                imageUrlPath ? (
                  <Image
                    source={{ uri: imageUrlPath }}
                    style={{
                      height: height * 0.3,
                      width: width * 0.9, resizeMode: 'contain'
                    }}
                  />
                ) : (
                  <View style={Styles.ImgUploadView}>
                    <TouchableOpacity
                      onPress={() => refRBSheet.current.open()}
                      style={{ justifyContent: "center", alignItems: "center" }}
                    >
                      <Image
                        source={ImagePath.PLUS_UPLOAD}
                        style={{
                          height: 22,
                          width: 22,
                          tintColor: COLOR.WHITE,
                        }}
                      />
                    </TouchableOpacity>
                    <Text
                      style={{
                        color: "#9E9E9E",
                        fontFamily: "Montserrat-Medium",
                        fontSize: height / 55,
                      }}
                    >
                      Add photos/short videos here
                    </Text>
                  </View>
                )}
            </View>

            {/* *********** Filter Image Container *********** */}

            {/* ************ Post Title Container ************ */}
            <View style={[Styles.DurationDropContainer]}>
              <CustomInput
                LeftIcon={false}
                placeholder="Title"
                keyboardType="default"
                value={PostTitle}
                placeholderTextColor={COLOR.GREY}
                maxLength={280}
                styles={{
                  height: height * 0.08,
                  width: width * 0.9,
                  backgroundColor: COLOR.TXT_INPT_COLOR,
                  color: COLOR.GREY,
                  borderRadius: scale(10),
                  padding: moderateScale(8), // Newly Added
                  fontFamily: "Montserrat-Regular",
                  fontSize: normalize(12)
                }}
                onChangeText={(txt) => {
                  setPostTitle(txt)
                  setErrorPostTitle(null)
                }}
              />
            </View>
            {errorPostTitle != null ? (
              <View style={Styles.ErrorContainer}>
                <Text style={{ color: "red", fontSize: normalize(12) }}>
                  {errorPostTitle}
                </Text>
              </View>
            ) : null}

            {/* ************ Input Balance Container ************ */}
            <View style={[Styles.InputContainer, { backgroundColor: COLOR.TXT_INPT_COLOR, borderRadius: 8, paddingRight: 8 }]}>
              <TextInput
                placeholder={PostType.value == 'Private' ? "Enter amount *" : "Enter amount"}
                placeholderTextColor={"#9E9E9E"}
                value={Amount}
                keyboardType="number-pad"
                style={{
                  height: height * 0.075,
                  width: width * 0.7,
                  padding: 8,
                  color: "#9E9E9E",
                  fontSize: normalize(12),
                  fontFamily: "Montserrat-Regular",
                }}
                onChangeText={(txt) => {
                  setAmount(txt), PostType.value == 'Private' ? _validateAmount(txt) : null
                }}
              />

              <View style={Styles.BalanceTypeView}>
                <Text style={[Styles.BalanceTxt, { fontSize: normalize(12) }]}>SHARE</Text>
              </View>
            </View>
            {errorAmount != null ? (
              <View style={Styles.ErrorContainer}>
                <Text style={{ color: "red", fontSize: normalize(12) }}>
                  {errorAmount}
                </Text>
              </View>
            ) : null}

            {/* ************ Input Royalty Container ************ */}
            <View style={{ marginTop: 20, alignItems: 'center' }}>
              <TextInput
                placeholder={PostType.value == 'Private' ? "Royalty (0% - 10%) *" : "Royalty (0% - 10%)"}
                placeholderTextColor={"#9E9E9E"}
                maxLength={2}
                keyboardType="number-pad"
                style={{
                  height: height * 0.075,
                  width: width * 0.9,
                  padding: 8,
                  color: "#9E9E9E",
                  fontSize: normalize(12),
                  fontFamily: "Montserrat-Regular",
                  backgroundColor: COLOR.TXT_INPT_COLOR,
                  borderRadius: 8,
                }}
                value={royalty}
                onChangeText={(txt) => {
                  isRoyaltyValid(txt), setroyalty(txt)
                }}
              />
              {
                <View style={[Styles.ErrorContainer, { marginLeft: 0 }]}>
                  <Text style={{ color: "red", fontSize: normalize(12) }}>
                    {royaltyError}
                  </Text>
                </View>
              }
            </View>

            {/* ************ Select Collection Container ************ */}
            <View style={Styles.listContaner}>
              <View style={Styles.lisHaedView}>
                <Text style={Styles.headingTxt}>Select a collection to share with</Text>
              </View>
              <View style={Styles.listParent}>
                {!CollectionsLoader ? CollectionList?.length > 0 ? <FlatList
                  data={CollectionList}
                  horizontal={true}
                  renderItem={renderList}
                /> :
                  <TouchableOpacity style={{ alignItems: 'center', backgroundColor: COLOR.TXT_INPT_COLOR, padding: 5, borderRadius: 5 }} onPress={() => { props.navigation.replace('CreateCollection') }}>
                    <Image
                      source={ImagePath.PLUS_UPLOAD}
                      style={{
                        height: 15,
                        width: 15,
                        tintColor: COLOR.WHITE,
                        marginVertical: 5
                      }}
                    />
                    <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: normalize(15), color: 'white' }}>Create Collection</Text>
                  </TouchableOpacity> :
                  <ActivityIndicator color={COLOR.BUTTON_PINK} size={25} />
                }
              </View>
            </View>
            {/* ************ Button Container ************ */}
            <View style={[Styles.BtnContainer]}>
              {loader ? (
                <CustomLoader loadingDesign={{ marginTop: height * 0.1 }} />
              ) : (
                <View style={{ alignSelf: 'flex-start' }}>
                  <AppButton
                    title= {props?.route?.params?.item?"Update Post": "Create Post"}
                    type="large"
                    textStyle={{ fontFamily: "Montserrat-Bold", fontSize: normalize(16) }}
                    // ButtonPress={() => CreatePostApi()}
                    ButtonPress={() => { onSubmit() }}
                  />
                  <Text style={{ color: 'white', fontSize: normalize(12), margin: 5, fontFamily: "Montserrat-Regular" }}>* You will get profit only for private post.</Text>
                </View>
              )}
            </View>
          </View>
        </KeyboardAwareScrollView>
      </ScrollView>

      {/* *************** Bottom Sheet *************** */}
      <View style={Styles.MainContainerSheet}>
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
              backgroundColor: "#000",
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
          <View style={Styles.panel}>
            <View style={{ alignItems: "center" }}>
              <Text style={Styles.panelTitle}>Upload Post</Text>
              <Text style={Styles.panelSubtitle}>Choose your images here</Text>
            </View>

            <TouchableOpacity
              style={Styles.panelButton}
              onPress={() => onCamera()}
            >
              <Text style={Styles.panelButtonTitle}>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={Styles.panelButton}
              onPress={() => onGallary()}
            >
              <Text style={Styles.panelButtonTitle}>Choose from Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={Styles.panelButton}
              onPress={() => refRBSheet.current.close()}
            >
              <Text style={Styles.panelButtonTitle}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </RBSheet>
      </View>
      <Canvas ref={handleCanvas} />
      {showLoader && <Progressdialog />}
    </SafeAreaView>
  );
};

export default CreatePost;

const styles = StyleSheet.create({});
