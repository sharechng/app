// import {
//   Text,
//   View,
//   Image,
//   Dimensions,
//   SafeAreaView,
//   TouchableOpacity,
//   FlatList,
//   TextInput,
// } from "react-native";
// import React, { useState, useEffect } from "react";

// import Styles from "./Styles";
// import { ImagePath } from "../../constants/ImagePath";
// import { moderateScale, verticalScale } from "react-native-size-matters";
// import { COLOR } from "../../Utils/Colors";
// import ProfileHeader from "../../components/CustomHeader/ProfileHeader";
// import axios from "axios";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { SearchApiUrl, TrendingAuctionsApiUrl } from "../../restAPI/ApiConfig";
// import moment from "moment";
// import CustomLoader from "../../components/CustomLoader/CustomLoader";
// const { height, width } = Dimensions.get("window");

// const Search = (props) => {
//   const [loader, setLoader] = useState(false);
//   const [IsFetching, setIsFetching] = useState(false);
//   const [isSearch, setIsSearch] = useState(false);
//   const [TrendingAuctions, setTrendingAuctions] = useState([]);
//   const [Search, setSearch] = useState("");
//   const [SearchedData, setSearchedData] = useState([]);
//   const [auctions, setAuctions] = useState([]);
//   const [TrenAuctions, setTrenAuctions] = useState([]);

//   useEffect(() => {
//     const subscribe = props.navigation.addListener("focus", () => {
//       TrendingAuctionsApi();
//       SearchApi();
//     });

//     return subscribe;
//   }, [props.route]);

//   useEffect(() => {
//     if (Search) {
//       SearchApi();
//     }
//   }, [Search]);

//   // ******************* Creator List Api Call *******************
//   const TrendingAuctionsApi = async () => {
//     const value = await AsyncStorage.getItem("token" || "socaltoken");
//     console.log(value);

//     setLoader(true);
//     axios({
//       method: "get",
//       url: TrendingAuctionsApiUrl,
//       params: {
//         limit: 50,
//       },
//       headers: {
//         token: value,
//       },
//     })
//       .then(async (response) => {
//         if (response.status === 200) {
//           console.log("====== Trending Auctions Api Response ======", response);
//           setTrendingAuctions(response?.data?.result?.docs);
//           setTrenAuctions(response?.data?.result?.docs);
//           setLoader(false);
//         } else {
//           alert("Something went wrong.");
//           setLoader(false);
//         }
//       })
//       .catch((err) =>
//         console.log("===== Trending Auctions Api err ======", err)
//       );
//   };
//   function TrendingAuctionApiRefresh() {
//     setIsFetching(false);
//     TrendingAuctionsApi();
//   }

//   // ******************* Creator List Api Call *******************
//   const SearchApi = async (txt) => {
//     setLoader(true);
//     axios({
//       method: "get",
//       url: SearchApiUrl,
//       params: {
//         search: txt,
//       },
//     })
//       .then(async (response) => {
//         if (response.data.responseCode === 200) {
//           console.log("==== Global Search Response ====", response);
//           setSearchedData(response?.data?.result?.auctions);
//           setSearchedData(response?.data?.result?.collection);
//           setSearchedData(response?.data?.result?.hashTagWithPost?.docs);
//           setSearchedData(response?.data?.result?.post);
//           setSearchedData(response?.data?.result?.user);
//           // setAuctions(response?.data?.result?.auctions);
//           setLoader(false);
//         } else {
//           alert("Something went wrong.");
//           setLoader(false);
//         }
//       })
//       .catch((err) => console.log("===== Global Search Api err ======", err));
//     setLoader(false);
//   };

//   // *********** Country Code Search Functions ***********
//   const SeacrFunct = (value) => {
//     setTrendingAuctions(TrenAuctions);
//     setIsSearch(true);
//     if (value !== "") {
//       let mydata = TrendingAuctions.filter((item, index) => {
//         if (item?.title.toLowerCase().includes(value.toLowerCase())) {
//           return item;
//         }
//       });
//       setTrendingAuctions(mydata);
//     } else {
//       setIsSearch(false);
//     }
//   };

//   return (
//     <SafeAreaView>
//       {/* *********** Header Container *********** */}
//       <ProfileHeader
//         Title={false}
//         BackIcon={true}
//         onBackPress={() => props.navigation.goBack()}
//         BackIconStyling={{ marginLeft: verticalScale(10) }}
//         PostIcon={false}
//         Menu={false}
//         ShareIcon={false}
//         ShareClick={() => ShareMessage()}
//       />
//       <View style={Styles.MainContainer}>
//         {/* *********** Search Container *********** */}
//         <View style={Styles.SearchContainer}>
//           <View>
//             <TextInput
//               placeholder="Search here"
//               placeholderTextColor={COLOR.TXT_COLOR}
//               style={{
//                 height: height * 0.075,
//                 width: width * 0.8,
//                 fontSize: height / 52,
//                 fontFamily: "Montserrat-Medium",
//                 color: COLOR.WHITE,
//                 padding: 8,
//               }}
//               onChangeText={(txt) => {
//                 setSearch(txt),
//                   // SearchApi(txt),
//                   SeacrFunct(txt);
//               }}
//             />
//           </View>
//           <TouchableOpacity onPress={() => {}} style={{}}>
//             <Image
//               source={ImagePath.TAB_SEARCH_WHITE}
//               style={{ height: 20, width: 20, marginRight: moderateScale(10) }}
//             />
//           </TouchableOpacity>
//         </View>

//         {/* *********** Trending Header Container *********** */}
//         <View style={[Styles.TrendingTxtContainer]}>
//           <Text style={[Styles.TrendingTxt]}>Trending Auctions</Text>
//         </View>

//         {/* *********** Trending NFTs Container *********** */}
//         {loader ? (
//           <CustomLoader
//             loaderStyling={{ height: height * 0.65, width: width * 1 }}
//           />
//         ) : (
//           <View style={[Styles.TrendingNFTsContainer]}>
//             {isSearch ? (
//               TrendingAuctions.length > 0 ? (
//                 <FlatList
//                   data={TrendingAuctions}
//                   numColumns={2}
//                   extraData={TrendingAuctions}
//                   contentContainerStyle={{ paddingBottom: height * 0.3 }}
//                   renderItem={({ item }) => {
//                     return (
//                       <TouchableOpacity
//                         onPress={() =>
//                           props.navigation.navigate("TrendingAuctionsView", {
//                             _id: item?._id,
//                           })
//                         }
//                         style={Styles.flatlistcontainer}
//                       >
//                         {/* *********** Image Container *********** */}
//                         <View
//                           activeOpacity={0.7}
//                           style={Styles.profileimageview}
//                         >
//                           {item?.mediaUrl ? (
//                             <Image
//                               source={{ uri: item.mediaUrl }}
//                               style={Styles.Nftimg}
//                             />
//                           ) : (
//                             <Image
//                               style={Styles.Nftimg}
//                               source={ImagePath.COLLECTION_DETAILS_ONE}
//                             />
//                           )}
//                         </View>

//                         {/* *********** Profile Pic and Name Container *********** */}
//                         <View style={Styles.flatlistmidcontainer}>
//                           <View style={Styles.profilenameview}>
//                             {item?.userId?.profilePic ? (
//                               <Image
//                                 style={{
//                                   height: 26,
//                                   width: 26,
//                                   borderRadius: 26 / 2,
//                                 }}
//                                 source={{ uri: item?.userId?.profilePic }}
//                               />
//                             ) : (
//                               <Image
//                                 style={{
//                                   height: 25,
//                                   width: 25,
//                                   resizeMode: "contain",
//                                 }}
//                                 source={ImagePath.PROFILE_PIC}
//                               />
//                             )}
//                             <View
//                               style={{
//                                 justifyContent: "flex-end",
//                                 height: height * 0.055,
//                                 marginBottom: verticalScale(8),
//                               }}
//                             >
//                               <Text style={Styles.usernameTxt}>
//                                 {/* {item?.userId?.userName || item?.title} */}
//                                 {item?.title}
//                               </Text>
//                               <Text style={[Styles.TimeTxt]}>
//                                 {moment(item?.time).local().fromNow()}
//                               </Text>
//                             </View>
//                           </View>
//                         </View>

//                         {/* *********** Description Container *********** */}
//                         <View style={Styles.flatlistmiddleview}>
//                           <Text
//                             numberOfLines={2}
//                             style={{
//                               color: COLOR.WHITE,
//                               fontSize: height / 80,
//                               fontFamily: "Montserrat-Regular",
//                             }}
//                           >
//                             {item?.details}
//                           </Text>
//                         </View>
//                       </TouchableOpacity>
//                     );
//                   }}
//                 />
//               ) : (
//                 <View style={Styles.noDataView}>
//                   <Text style={Styles.nodataTxt}>No Data Found...</Text>
//                 </View>
//               )
//             ) : TrenAuctions.length > 0 ? (
//               <FlatList
//                 data={TrenAuctions}
//                 numColumns={2}
//                 extraData={TrenAuctions}
//                 refreshing={IsFetching}
//                 onRefresh={TrendingAuctionApiRefresh}
//                 contentContainerStyle={{ paddingBottom: height * 0.3 }}
//                 renderItem={({ item }) => {
//                   return (
//                     <TouchableOpacity
//                       onPress={() =>
//                         props.navigation.navigate("TrendingAuctionsView", {
//                           _id: item?._id,
//                         })
//                       }
//                       style={Styles.flatlistcontainer}
//                     >
//                       {/* *********** Image Container *********** */}
//                       <View activeOpacity={0.7} style={Styles.profileimageview}>
//                         {item?.mediaUrl ? (
//                           <Image
//                             source={{ uri: item.mediaUrl }}
//                             style={Styles.Nftimg}
//                           />
//                         ) : (
//                           <Image
//                             style={Styles.Nftimg}
//                             source={ImagePath.COLLECTION_DETAILS_ONE}
//                           />
//                         )}
//                       </View>

//                       {/* *********** Profile Pic and Name Container *********** */}
//                       <View style={Styles.flatlistmidcontainer}>
//                         <View style={Styles.profilenameview}>
//                           {item?.userId?.profilePic ? (
//                             <Image
//                               style={{
//                                 height: 26,
//                                 width: 26,
//                                 borderRadius: 26 / 2,
//                               }}
//                               source={{ uri: item?.userId?.profilePic }}
//                             />
//                           ) : (
//                             <Image
//                               style={{
//                                 height: 25,
//                                 width: 25,
//                                 resizeMode: "contain",
//                               }}
//                               source={ImagePath.PROFILE_PIC}
//                             />
//                           )}
//                           <View
//                             style={{
//                               justifyContent: "flex-end",
//                               height: height * 0.055,
//                               marginBottom: verticalScale(8),
//                               width: width * 0.33,
//                             }}
//                           >
//                             <Text numberOfLines={1} style={Styles.usernameTxt}>
//                               {item?.title}
//                             </Text>
//                             <Text style={[Styles.TimeTxt]}>
//                               {/* {moment(item.time).format("DD-MM-YYYY")} */}
//                               {moment(item?.time).local().fromNow()}
//                             </Text>
//                           </View>
//                         </View>
//                       </View>

//                       {/* *********** Description Container *********** */}
//                       <View style={Styles.flatlistmiddleview}>
//                         <Text
//                           numberOfLines={2}
//                           style={{
//                             color: COLOR.WHITE,
//                             fontSize: height / 80,
//                             fontFamily: "Montserrat-Regular",
//                           }}
//                         >
//                           {item?.details}
//                         </Text>
//                       </View>
//                     </TouchableOpacity>
//                   );
//                 }}
//               />
//             ) : (
//               <View style={Styles.noDataView}>
//                 <Text style={Styles.nodataTxt}>No Data Found</Text>
//               </View>
//             )}
//           </View>
//         )}
//       </View>
//     </SafeAreaView>
//   );
// };

// export default Search;

import {
  Text,
  View,
  Image,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";

import Styles from "./Styles";
import { ImagePath } from "../../constants/ImagePath";
import { moderateScale, verticalScale } from "react-native-size-matters";
import { COLOR } from "../../Utils/Colors";
import ProfileHeader from "../../components/CustomHeader/ProfileHeader";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SearchApiUrl, TrendingAuctionsApiUrl } from "../../restAPI/ApiConfig";
import moment from "moment";
import CustomLoader from "../../components/CustomLoader/CustomLoader";
import { Logout_ } from "../../../Logout";
const { height, width } = Dimensions.get("window");

const Search = (props) => {
  const [loader, setLoader] = useState(false);
  const [IsFetching, setIsFetching] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [TrendingAuctions, setTrendingAuctions] = useState([]);
  const [Search, setSearch] = useState("");
  console.log("Search", Search);
  const [SearchedData, setSearchedData] = useState([]);
  const [auctions, setAuctions] = useState([]);
  const [TrenAuctions, setTrenAuctions] = useState([]);

  console.log("---- is typing ------", isSearch);

  useEffect(() => {
    const subscribe = props.navigation.addListener("focus", () => {
      AsyncStorage.setItem("activetab","search")

      TrendingAuctionsApi();
      // SearchApi();
    });

    return subscribe;
  }, [props.route]);

  useEffect(() => {
    if (Search !== "") {
      SearchApi();
    }
    // SearchApi();
  }, [Search]);

  // ******************* Creator List Api Call *******************
  const TrendingAuctionsApi = async () => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");
    console.log(value);

    setLoader(true);
    axios({
      method: "get",
      url: TrendingAuctionsApiUrl,
      params: {
        limit: 50,
      },
      headers: {
        token: value,
      },
    })
      .then(async (response) => {
        if (response.status === 200) {
          console.log("====== Trending Auctions Api Response ======", response);
          setTrendingAuctions(response?.data?.result?.docs);
          setTrenAuctions(response?.data?.result?.docs);
          setLoader(false);
        } else {
          alert("Something went wrong.");
          setLoader(false);
        }
      })
      .catch((err) => {
        console.log("===== Trending Auctions Api err ======", err.response)
        setLoader(false);
        setLoader(false);
        if(err.response.data.responseCode===440){
          Logout_(props)

        }
      });
  };
  function TrendingAuctionApiRefresh() {
    setIsFetching(false);
    TrendingAuctionsApi();
  }

  // ******************* Creator List Api Call *******************
  const SearchApi = async () => {
    setLoader(true);

    axios({
      method: "get",
      url: SearchApiUrl,
      params: {
        search: Search ? Search : null,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          console.log("==== Global Search Response ====", response.data.result);
          setIsSearch(true);
          setSearchedData(response?.data?.result?.auctions);
          setAuctions(response?.data?.result);
          setLoader(false);
        } else {
          alert("Something went wrong.");
          setLoader(false);
          setIsSearch(false);
        }
      })
      .catch((err) => console.log("===== Global Search Api err ======", err));
    setLoader(false);
  };

  // *********** Country Code Search Functions ***********
  const SeacrFunct = (value) => {
    setTrendingAuctions(TrenAuctions);
    setIsSearch(true);
    if (value !== "") {
      let mydata = TrendingAuctions.filter((item, index) => {
        if (item?.title.toLowerCase().includes(value.toLowerCase())) {
          return item;
        }
      });
      setTrendingAuctions(mydata);
    } else {
      setIsSearch(false);
    }
  };

  return (
    <SafeAreaView>
      {/* *********** Header Container *********** */}
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
      <View style={Styles.MainContainer}>
        {/* *********** Search Container *********** */}
        <View style={Styles.SearchContainer}>
          <View>
            <TextInput
              placeholder="Search here"
              placeholderTextColor={COLOR.TXT_COLOR}
              style={{
                height: height * 0.075,
                width: width * 0.8,
                fontSize: height / 52,
                fontFamily: "Montserrat-Medium",
                color: COLOR.WHITE,
                padding: 8,
              }}
              onChangeText={(txt) => {
                setSearch(txt);
                // SeacrFunct(txt);
              }}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              SeacrFunct();
            }}
            style={{}}
          >
            <Image
              source={ImagePath.TAB_SEARCH_WHITE}
              style={{ height: 20, width: 20, marginRight: moderateScale(10) }}
            />
          </TouchableOpacity>
        </View>

        {/* *********** Trending Header Container *********** */}
        <View style={[Styles.TrendingTxtContainer]}>
          <Text style={[Styles.TrendingTxt]}>Trending Auctions</Text>
        </View>

        {/* *********** Trending NFTs Container *********** */}
        {loader ? (
          <CustomLoader
            loaderStyling={{ height: height * 0.65, width: width * 1 }}
          />
        ) : (
          <View style={[Styles.TrendingNFTsContainer]}>
            {!isSearch ? (
              TrendingAuctions.length > 0 ? (
                <FlatList
                  data={TrendingAuctions}
                  numColumns={2}
                  extraData={TrendingAuctions}
                  contentContainerStyle={{ paddingBottom: height * 0.37 }}
                  renderItem={({ item }) => {
                    return (
                      <TouchableOpacity
                        onPress={() =>
                          props.navigation.navigate("TrendingAuctionsView", {
                            _id: item?._id,
                          })
                        }
                        style={Styles.flatlistcontainer}
                      >
                        {/* *********** Image Container *********** */}
                        <View
                          activeOpacity={0.7}
                          style={Styles.profileimageview}
                        >
                          {item?.mediaUrl ? (
                            <Image
                              source={{ uri: item.mediaUrl }}
                              style={Styles.Nftimg}
                            />
                          ) : (
                            <Image
                              style={Styles.Nftimg}
                              source={ImagePath.COLLECTION_DETAILS_ONE}
                            />
                          )}
                        </View>

                        {/* *********** Profile Pic and Name Container *********** */}
                        <View style={Styles.flatlistmidcontainer}>
                          <View style={Styles.profilenameview}>
                            {item?.userId?.profilePic ? (
                              <Image
                                style={{
                                  height: 26,
                                  width: 26,
                                  borderRadius: 26 / 2,
                                }}
                                source={{ uri: item?.userId?.profilePic }}
                              />
                            ) : (
                              <Image
                                style={{
                                  height: 25,
                                  width: 25,
                                  resizeMode: "contain",
                                }}
                                source={ImagePath.PROFILE_PIC}
                              />
                            )}
                            <View
                              style={{
                                justifyContent: "flex-end",
                                height: height * 0.055,
                                width: width * 0.33,
                                // backgroundColor: "red",
                                marginBottom: verticalScale(8),
                              }}
                            >
                              <Text numberOfLines={1} style={Styles.usernameTxt}>
                                {/* {item?.userId?.userName || item?.title} */}
                                {item?.title}
                              </Text>
                              <Text style={[Styles.TimeTxt]}>
                                {moment(item?.time).local().fromNow()}
                              </Text>
                            </View>
                          </View>
                        </View>

                        {/* *********** Description Container *********** */}
                        <View style={Styles.flatlistmiddleview}>
                          <Text
                            numberOfLines={2}
                            style={{
                              color: COLOR.WHITE,
                              fontSize: height / 80,
                              fontFamily: "Montserrat-Regular",
                            }}
                          >
                            {item?.details}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  }}
                />
              ) : (
                <View style={Styles.noDataView}>
                  <Text style={Styles.nodataTxt}>No Data Found...</Text>
                </View>
              )
            ) : (
              <ScrollView style={{}}>
                {auctions?.collection?.length > 0 ||
                  auctions?.user?.length > 0 ||
                  auctions?.post?.length > 0 ||
                  auctions?.auctions?.length > 0 ? (
                  <View
                    style={{
                      marginBottom: height * 0.2,
                    }}
                  >
                    {/* ******** Collections Container ******** */}
                    <View style={{ marginVertical: 2 }}>
                      {!auctions ? (
                        <></>
                      ) : (
                        <>
                          {auctions?.collection?.length > 0 &&
                            auctions?.collection?.map((item) => {
                              <Text style={{ color: COLOR.GREY }}>
                                Collection
                              </Text>;

                              return (
                                <ScrollView>
                                  <TouchableOpacity
                                    onPress={() =>
                                      props.navigation.navigate(
                                        "CollectionNftDetails",
                                        {
                                          _id: item?._id,
                                        }
                                      )
                                    }
                                  >
                                    <View
                                      style={{
                                        flexDirection: "row",
                                        height: 30,
                                        alignItems: "center",
                                        marginVertical: 2,
                                      }}
                                    >
                                      {item.image ? (
                                        <Image
                                          source={{ uri: item.image }}
                                          style={{
                                            height: 30,
                                            width: 30,
                                            borderRadius: 30 / 2,
                                            marginHorizontal: 5,
                                          }}
                                        />
                                      ) : (
                                        <Image
                                          source={ImagePath.PROFILE_PIC}
                                          style={{
                                            height: 30,
                                            width: 30,
                                            borderRadius: 30 / 2,
                                            marginHorizontal: 5,
                                          }}
                                        />
                                      )}
                                      <Text
                                        numberOfLines={2}
                                        style={{
                                          color: COLOR.WHITE,
                                          fontSize: height / 80,
                                          fontFamily: "Montserrat-Regular",
                                        }}
                                      >
                                        {item?.name}
                                      </Text>
                                    </View>
                                  </TouchableOpacity>
                                </ScrollView>
                              );
                            })}
                        </>
                      )}
                    </View>

                    {/* ******** Auctions Container ******** */}
                    <View style={{ marginVertical: 2 }}>
                      {!auctions ? (
                        <></>
                      ) : (
                        <>
                          {auctions?.auctions?.length > 0 &&
                            auctions?.auctions?.map((item) => {
                              <Text style={{ color: COLOR.GREY }}>
                                Auctions
                              </Text>;

                              // console.log("------ auctions map ------", item);
                              return (
                                <TouchableOpacity
                                  onPress={() =>
                                    props.navigation.navigate(
                                      "AuctionsDetails",
                                      {
                                        _id: item?._id,
                                      }
                                    )
                                  }
                                >
                                  <View
                                    style={{
                                      flexDirection: "row",
                                      height: 30,
                                      alignItems: "center",
                                      marginVertical: 2,
                                    }}
                                  >
                                    {item?.mediaUrl ? (
                                      <Image
                                        source={{ uri: item?.mediaUrl }}
                                        style={{
                                          height: 30,
                                          width: 30,
                                          borderRadius: 30 / 2,
                                          marginHorizontal: 5,
                                        }}
                                      />
                                    ) : (
                                      <Image
                                        source={ImagePath.PROFILE_PIC}
                                        style={{
                                          height: 30,
                                          width: 30,
                                          borderRadius: 30 / 2,
                                          marginHorizontal: 5,
                                        }}
                                      />
                                    )}
                                    <Text
                                      numberOfLines={2}
                                      style={{
                                        color: COLOR.WHITE,
                                        fontSize: height / 80,
                                        fontFamily: "Montserrat-Regular",
                                      }}
                                    >
                                      {item?.title}
                                    </Text>
                                  </View>
                                </TouchableOpacity>
                              );
                            })}
                        </>
                      )}
                    </View>

                    {/* ******** Post Container ******** */}
                    <View style={{ marginVertical: 2 }}>
                      {!auctions?.post ? (
                        <></>
                      ) : (
                        <>
                          {auctions?.post?.length > 0 &&
                            auctions?.post?.map((item) => {
                              <Text style={{ color: COLOR.GREY }}>Post</Text>;

                              // console.log("------ post map ------", item);
                              return (
                                <TouchableOpacity
                                  onPress={() =>
                                    props.navigation.navigate(
                                      "CollectionDetails",
                                      {
                                        _id: item?._id,
                                      }
                                    )
                                  }
                                >
                                  <View
                                    style={{
                                      flexDirection: "row",
                                      height: 30,
                                      alignItems: "center",
                                      marginVertical: 2,
                                    }}
                                  >
                                    {item?.mediaUrl ? (
                                      <Image
                                        source={{ uri: item?.mediaUrl }}
                                        style={{
                                          height: 30,
                                          width: 30,
                                          borderRadius: 30 / 2,
                                          marginHorizontal: 5,
                                        }}
                                      />
                                    ) : (
                                      <Image
                                        source={ImagePath.PROFILE_PIC}
                                        style={{
                                          height: 30,
                                          width: 30,
                                          borderRadius: 30 / 2,
                                          marginHorizontal: 5,
                                        }}
                                      />
                                    )}
                                    <Text
                                      numberOfLines={2}
                                      style={{
                                        color: COLOR.WHITE,
                                        fontSize: height / 80,
                                        fontFamily: "Montserrat-Regular",
                                      }}
                                    >
                                      {item?.postTitle}
                                    </Text>
                                  </View>
                                </TouchableOpacity>
                              );
                            })}
                        </>
                      )}
                    </View>

                    {/* ******** User Container ******** */}
                    <View
                      style={{
                        marginVertical: 2,
                        marginBottom: height * 0.02,
                      }}
                    >
                      {!auctions ? (
                        <></>
                      ) : (
                        <>
                          <Text style={{ color: COLOR.GREY }}>User</Text>
                          {auctions?.user?.length > 0 &&
                            auctions?.user?.map((item) => {
                              // console.log("------ user map ------", item);
                              return (
                                <TouchableOpacity
                                  onPress={() =>
                                    props.navigation.navigate("AboutCreator", {
                                      nftId: item?._id,
                                    })
                                  }
                                >
                                  <View
                                    style={{
                                      flexDirection: "row",
                                      height: 30,
                                      alignItems: "center",
                                      marginVertical: 2,
                                      width: width * 0.9,
                                      alignSelf: "center",
                                    }}
                                  >
                                    {item.profilePic ? (
                                      <Image
                                        source={{ uri: item.profilePic }}
                                        style={{
                                          height: 30,
                                          width: 30,
                                          borderRadius: 30 / 2,
                                          marginHorizontal: 5,
                                        }}
                                      />
                                    ) : (
                                      <Image
                                        source={ImagePath.PROFILE_PIC}
                                        style={{
                                          height: 30,
                                          width: 30,
                                          borderRadius: 30 / 2,
                                          marginHorizontal: 5,
                                        }}
                                      />
                                    )}
                                    <Text
                                      numberOfLines={2}
                                      style={{
                                        color: COLOR.WHITE,
                                        fontSize: height / 80,
                                        fontFamily: "Montserrat-Regular",
                                      }}
                                    >
                                      {item?.userName || item?.name
                                        ? item?.userName || item?.name
                                        : "."}
                                    </Text>
                                  </View>
                                </TouchableOpacity>
                              );
                            })}
                        </>
                      )}
                    </View>
                  </View>
                ) : (
                  <View>
                    <Text style={{ color: COLOR.GREY }}>
                      Search result not found
                    </Text>
                  </View>
                )}
              </ScrollView>
            )}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Search;
