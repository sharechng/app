import { StyleSheet, Dimensions } from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";
import { COLOR } from "../../Utils/Colors";
const { height, width } = Dimensions.get("window");

const Styles = StyleSheet.create({
  MainContainer: {
    height: height * 1,
    // flex: 1,
    alignItems: "center",
    backgroundColor: COLOR.BLACK,
  },
  SearchContainer: {
    height: height * 0.075,
    width: width * 0.92,
    justifyContent: "space-between",
    backgroundColor: COLOR.TXT_INPT_COLOR,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#1E1E1E",
    borderRadius: 8,
    marginTop: verticalScale(5),
  },
  TrendingTxtContainer: {
    height: height * 0.08,
    width: width * 0.92,
    justifyContent: "center",
  },
  TrendingTxt: {
    fontSize: height / 38,
    color: COLOR.WHITE,
    fontFamily: "Montserrat-SemiBold",
  },
  TrendingNFTsContainer: {
    // height: height * 0.5,
    flex: 1,
    width: width * 0.94,
    justifyContent: "center",
    alignItems: "center",
  },
  // Flatlist Styling
  flatlistcontainer: {
    height: height * 0.3,
    width: width * 0.44,
    backgroundColor: COLOR.HEADER_THEME, // New 23 May
    borderRadius: 10,
    margin: 6,
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
    width: width * 0.4, // 0.27
    // justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  usernameTxt: {
    fontSize: height / 65,
    color: "#FFFF",
    fontFamily: "Montserrat-SemiBold",
    marginLeft: moderateScale(5),
  },
  TimeTxt: {
    fontSize: height / 85,
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
  noDataView: {
    height: height * 0.3,
    width: width * 1,
    // justifyContent: "center",
    alignItems: "center",
  },
  nodataTxt: {
    color: "white",
    fontSize: height / 45,
    fontFamily: "Montserrat-SemiBold",
  },
});

export default Styles;

// import { StyleSheet, Dimensions } from "react-native";
// import { moderateScale, verticalScale } from "react-native-size-matters";
// import { COLOR } from "../../Utils/Colors";
// const { height, width } = Dimensions.get("window");

// const Styles = StyleSheet.create({
//   MainContainer: {
//     height: height * 1,
//     // flex: 1,
//     alignItems: "center",
//     backgroundColor: COLOR.BLACK,
//   },
//   SearchContainer: {
//     height: height * 0.075,
//     width: width * 0.92,
//     justifyContent: "space-between",
//     backgroundColor: COLOR.TXT_INPT_COLOR,
//     flexDirection: "row",
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "#1E1E1E",
//     borderRadius: 8,
//     marginTop: verticalScale(5),
//   },
//   TrendingTxtContainer: {
//     height: height * 0.08,
//     width: width * 0.92,
//     justifyContent: "center",
//   },
//   TrendingTxt: {
//     fontSize: height / 38,
//     color: COLOR.WHITE,
//     fontFamily: "Montserrat-SemiBold",
//   },
//   TrendingNFTsContainer: {
//     // height: height * 0.5,
//     // flex: 1, // 25 june
//     width: width * 0.94,
//     // justifyContent: "center", // 25 june
//     // alignItems: "center", // 25 june
//   },
//   // Flatlist Styling
//   flatlistcontainer: {
//     height: height * 0.3,
//     width: width * 0.44,
//     backgroundColor: COLOR.HEADER_THEME, // New 23 May
//     borderRadius: 10,
//     margin: 6,
//   },
//   profileimageview: {
//     height: height * 0.19,
//     width: width * 0.4,
//     alignSelf: "center",
//     borderRadius: 5,
//   },
//   Nftimg: {
//     height: height * 0.18,
//     width: width * 0.4,
//     marginTop: height * 0.01,
//     borderRadius: 5,
//   },
//   flatlistmidcontainer: {
//     height: height * 0.055, //0.055
//     width: width * 0.4,
//     alignSelf: "center",
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   profilenameview: {
//     height: height * 0.04,
//     width: width * 0.4, // 0.27
//     // justifyContent: "space-between",
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   usernameTxt: {
//     fontSize: height / 65,
//     color: "#FFFF",
//     fontFamily: "Montserrat-SemiBold",
//     marginLeft: moderateScale(5),
//   },
//   TimeTxt: {
//     fontSize: height / 85,
//     color: "#BFBFBF",
//     fontFamily: "Montserrat-Medium",
//     marginLeft: moderateScale(5),
//   },
//   flatlistmiddleview: {
//     height: height * 0.04, // 0.025
//     width: width * 0.4,
//     alignSelf: "center",
//     justifyContent: "space-evenly",
//   },
//   noDataView: {
//     height: height * 0.3,
//     width: width * 1,
//     // justifyContent: "center",
//     alignItems: "center",
//   },
//   nodataTxt: {
//     color: "white",
//     fontSize: height / 45,
//     fontFamily: "Montserrat-SemiBold",
//   },

//   // ******** Search-Collection *********
//   CollectionHeadContainer: {
//     backgroundColor: "rgba(26, 26, 26, 1)",
//     width: width * 0.92,
//     height: height * 0.5,
//     top: 0,
//     position: "absolute",
//     borderRadius: 4,
//   },
//   TxtHeading: {
//     color: COLOR.GREY,
//     fontFamily: "Montserrat-Medium",
//     fontSize: height / 45,
//     padding: 8,
//   },
//   CollectionSearchTouch: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginVertical: 1.5,
//     marginBottom: height * 0.01,
//   },
//   titleTxtView: {
//     color: COLOR.GREY,
//     fontFamily: "Montserrat-Medium",
//     marginTop: -height * 0.01,
//   },
// });

// export default Styles;
