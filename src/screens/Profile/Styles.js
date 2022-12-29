import { StyleSheet, Dimensions, Platform } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
const { height, width } = Dimensions.get("window");

import { COLOR } from "../../Utils/Colors";

const Styles = StyleSheet.create({
  MainContainer: {
    // height: height * 1.78,
    height: height * 1.1,
    alignItems: "center",
    // backgroundColor: COLOR.BACKGROUND_THEME,
    backgroundColor: COLOR.BLACK,
  },
  headerView: {
    flexDirection: "row",
    height: height * 0.08,
    width: width * 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  BackImageContainer: {
    height: height * 0.35,
    width: width * 1,
    alignItems: "center",
  },
  ProfileBackImgs: {
    height: height * 0.33,
    width: width * 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  PicsProfileContainer: {
    height: height * 0.09,
    width: width * 1,
    alignItems: "center",
  },
  DetailsContainer: {
    height: height * 0.04,
    width: width * 1,
    alignItems: "center",
  },
  AddressContainer: {
    height: height * 0.03,
    width: width * 1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  DepositWithdrawBtnContainer: {
    height: height * 0.1,
    width: width * 1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  WalletAndButton: {
    height: height * 0.1,
    width: width * 1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  YourWalletTxtContainer: {
    height: height * 0.1,
    width: width * 0.5,
    alignItems: "center",
    justifyContent: "center",
  },
  // YourWalletTxt: {
  //   color: COLOR.WHITE,
  //   fontFamily: "Montserrat-SemiBold",
  //   fontSize: scale(13),
  // },
  StoryContainer: {
    height: height * 0.125,
    width: width * 0.46,
    marginTop: verticalScale(10),
    alignItems: "center",
  },
  StoryContainerImg: {
    height: height * 0.2,
    width: width * 0.45,
    resizeMode: "contain",
  },
  CoinsContainer: {
    height: height * 0.05,
    width: width * 0.445,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: verticalScale(10),
  },
  CoinsContainerTwo: {
    height: height * 0.065,
    width: width * 0.445,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  StoryBoardContainer: {
    height: height * 0.32,
    width: width * 1,
    alignItems: "center",
  },
  MyBundlesTxtContainer: {
    height: height * 0.065,
    width: width * 1,
    justifyContent: "center",
    marginTop: verticalScale(10),
  },
  MyBundlesTxt: {
    color: COLOR.WHITE,
    fontSize: height / 55,
    fontFamily: "Montserrat-Bold",
    marginLeft: moderateScale(20),
  },
  MyBundleListContainer: {
    // height: Platform.OS === "android" ? height * 0.468 : height * 0.42, //0.476
    width: width * 1,
    alignItems: "center",
    marginBottom:Platform.OS === "android"?height * 0.72:height * 0.64
  },
  HeadingTxtContainer: {
    // height: height * 0.05,
    width: width * 1,
    justifyContent: "center",
    marginTop:10
  },
  HeadingView: {
    fontSize: height / 50,
    fontFamily: "Montserrat-SemiBold",
    color: COLOR.WHITE,
    marginHorizontal: 16,
  },
  //   ********
  flatlistcontainer: {
    height: height * 0.25, // 0.29
    width: width * 0.44,
    backgroundColor: COLOR.HEADER_THEME,
    margin: 6,
    borderRadius: 10, // margin : 5
  },
  KeyvalueContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  ValueContainer: {
    height: height * 0.04,
    width: width * 0.32,
    justifyContent: "center",
  },
  KeyTxtView: {
    fontSize: height / 65,
    fontFamily: "Montserrat-Medium",
    color: COLOR.BOTTOM_SHEET_TXT,
  },
  profileimageview: {
    height: height * 0.19, // 0.15
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
    height: height * 0.04,
    width: width * 0.4,
    paddingLeft:10,
    // backgroundColor:'red',
    // alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems:'center',
    marginTop: verticalScale(5),
  },
  profilenameview: {
    height: height * 0.04,
    width: width * 0.3, // 0.27
    flexDirection: "row",
    // backgroundColor: "red",
    alignItems: "center",
  },
  heartview: {
    height: height * 0.04,
    width: width * 0.08,
    justifyContent: "center",
    alignItems: "center",
  },
  usernameTxt: {
    fontSize: height / 65,
    color: "#FFFF",
    fontFamily: "Montserrat-SemiBold",
    marginLeft: moderateScale(5),
  },
  flatlistmiddleview: {
    height: height * 0.05, //
    width: width * 0.4,
    alignSelf: "center",
    justifyContent: "space-evenly",
  },
  collectioview: {
    height: height * 0.024,
    width: width * 0.4,
    flexDirection: "row",
    // justifyContent: "space-between",
    justifyContent: "center",
    // alignItems: "center",
  },
  collectionTxt: {
    fontSize: height / 65,
    color: "#FFFF",
    fontFamily: "Montserrat-Regular",
  },
  ethTxt: {
    color: "#FFFF",
    fontSize: height / 62,
    fontFamily: "Montserrat-Regular",
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
  BalanceAirDropContainer: {
    height: height * 0.16,
    width: width * 1,
    justifyContent: "center",
    alignItems: "center",
  },
  BalDropView: {
    height: height * 0.13,
    marginHorizontal: 5,
    width: width * 0.92,
    justifyContent: "center",
    backgroundColor: COLOR.TXT_INPT_COLOR,
    borderRadius: 8,
  },
  BalanceContainer: {
    height: height * 0.05,
    width: width * 0.92,
    alignItems: "center",
    backgroundColor: COLOR.TXT_INPT_COLOR,
    flexDirection: "row",
  },
  BalanceView: {
    height: height * 0.05,
    marginHorizontal: 5,
    width: width * 0.24,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  TxtContainer: {
    fontSize: height / 50,
    fontFamily: "Montserrat-Medium",
    color: COLOR.WHITE,
  },
  // ********** Bottom Sheet Styling **********
  ModalMainContainer: {
    height: height * 0.63,
    width: width * 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLOR.BOTTOM_SHEET_BG_CLR,
    bottom: 0,
    position: "absolute",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  BtnContainer: {
    height: height * 0.082,
    width: width * 1,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  IconContainer: {
    height: height * 0.07,
    width: width * 0.12,
    justifyContent: "center",
  },
  BtnNameContainer: {
    height: height * 0.07,
    width: width * 0.75,
    justifyContent: "center",
  },
  BtnNameTxt: {
    color: COLOR.BOTTOM_SHEET_TXT,
    fontFamily: "Montserrat-Medium",
    fontSize: height / 50,
  },

  // ********** Logout Modal Styling **********
  LogoutmainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  LogoutModalMainContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: height * 1,
    backgroundColor: "rgba(0, 0, 0, 0.67)",
  },
  LogoutModalSubContainer: {
    height: height * 0.2,
    width: width * 0.9,
    justifyContent: "center",
    alignItems: "center",
  },
  LogoutHeadingContainer: {
    height: height * 0.28,
    width: width * 0.9,
    backgroundColor: COLOR.TXT_INPT_COLOR,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  LogoutHeadingTxtContainer: {
    color: COLOR.WHITE,
    fontSize: height / 45,
    fontFamily: "Montserrat-SemiBold",
    // marginTop: height * 0.03,
  },
  LogoutButtonMainContainer: {
    height: height * 0.09,
    width: width * 0.88,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  LogoutbtnContainer: {
    height: height * 0.1,
    alignItems: "center",
    justifyContent: "center",
    width: width * 0.45,
  },
  LogoutbuttonPressableView: {
    height: height * 0.055,
    width: width * 0.31,
    borderColor: "#000",
    borderRadius: height * 0.05,
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: COLOR.BUTTON_PINK,
  },
  LogoutConfirmTxt: {
    color: "#fff",
    textAlign: "center",
    fontSize: height / 45,
    fontFamily: "Montserrat-Medium",
  },
  profileHeader: {
    // height: height * 0.27,
    width: width * 1,
    // paddingHorizontal:20,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#222222",
    paddingBottom:20
  },
  nameInside: {
    alignItems: "center",
    height: height * 0.3,
    width: width * 0.4,
    justifyContent: "center",
  },
  statusImg: {
    height: height * 0.02,
    width: width * 0.05,
    position: "absolute",
    bottom: height * 0.12,
    left: width * 0.26,
  },
  statusTxt: {
    fontSize: height / 53,
    color: COLOR.GREY,
    fontFamily: "Montserrat-Regular",
  },
  secondInsideVIew: {
    height: height * 0.18,
    width: width * 0.6,
  },
  detailView: {
    flexDirection: "row",
    alignItems: "center",
    height: height * 0.18,
    width: width * 0.7,
    alignItems: "flex-end",
  },
  postTxt: {
    fontSize: height / 62,
    color: COLOR.GREY,
    fontFamily: "Montserrat-Regular",
  },
  numTxt: {
    fontSize: height / 50,
    color: COLOR.WHITE,
    fontFamily: "Montserrat-SemiBold",
  },
  postView: {
    justifyContent: "center",
    alignItems: "center",
    height: height * 0.1,
    width: width * 0.2,
  },
  folowerView: {
    justifyContent: "center",
    alignItems: "center",
    height: height * 0.1,
    width: width * 0.2,
  },
  subscriberView: {
    justifyContent: "center",
    alignItems: "center",
    height: height * 0.1,
    width: width * 0.2,
  },
  copyView: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: width * 0.09,
    height: height * 0.05,
    width: width * 0.7,
  },
  copyTxt: {
    fontSize: height / 68,
    color: COLOR.GREY,
    fontFamily: "Montserrat-Regular",
  },
  copyImg: {
    marginLeft: width * 0.03,
    height: height * 0.05,
    width: width * 0.05,
  },
  btnView: {
    // justifyContent: "center",
    // alignItems: "center",
    // paddingHorizontal: width * 0.05,
    // height: height * 0.07,
    width: width * 0.32,
    alignSelf:'flex-start'
    // backgroundColor: COLOR.BACKGROUND_THEME,
  },
  chatView: {
    justifyContent: "center",
    alignItems: "center",
    borderColor: COLOR.BUTTON_PINK,
    borderWidth: height * 0.002,
    borderRadius: height * 0.01,
    backgroundColor: COLOR.BACKGROUND_THEME,
    padding:10
  },
  donateTxt: {
    color: COLOR.WHITE,
    fontSize: height / 55,
    fontFamily: "Montserrat-SemiBold",
  },
  flatlistuppercontainer: {
    alignSelf: "center",
    marginTop: height * 0.03,
    width: width * 1,
    alignItems: "center",
    height: height * 0.5,
  },
  ImageDetailsContainer: {
    // height: height * 0.27,
    width: width * 1,
    flexDirection: "row",
    // justifyContent: "center",
    justifyContent: "flex-start",
    // backgroundColor:'red'
  },
  ImagesContainers: {
    // height: height * 0.37,
    // width: width * 0.31,
    width: width * 0.27,
    // backgroundColor: "red",
  },
  ProfilesImgContainer: {
    height: height * 0.16,
    width: width * 0.27, // 0.31
    justifyContent: "center",
    // backgroundColor:"red"
  },
  OnlineContainer: {
    width: width * 0.25,
    // alignItems: "flex-end",
    marginTop: -verticalScale(20),
  },
  ProfNameTxt: {
    fontFamily: "Montserrat-SemiBold",
    fontSize: height / 55,
    color: COLOR.WHITE,
    textAlign: "center",
    // position: "absolute",
    // left: 25,
  },
  DjNameTxt: {
    fontFamily: "Montserrat-Regular",
    fontSize: height / 65,
    color: "#989595",
    alignSelf: "center",
    position: "absolute",
    // left: 38,
    // top: 4, //16
    textAlign: "center",
  },
  PostAddBtnContainer: {
    // height: height * 0.27,
    width: width * 0.58,
    // backgroundColor:'red'
  },
  PostFollowSubscribeContainer: {
    // height: height * 0.16,
    // width: width * 0.58,
    width: width * 0.73,
  },
  PostCountContainer: {
    // flex: 1,
    // height: height * 0.1,
    // width: width * 0.58,
    width: width * 0.73,
    flexDirection: "row",
    justifyContent: "space-around",
    // backgroundColor:'red'
  },
  PostContainer: {
    height: height * 0.1,
    // width: width * 0.16, // Commented on 21 May
    justifyContent: "flex-end",
    alignItems: "flex-start",
  },
  TwoFourTxt: {
    fontFamily: "Montserrat-SemiBold",
    fontSize: height / 57, // 15
    color: COLOR.WHITE,
  },
  PostTxtView: {
    fontFamily: "Montserrat-Regular",
    fontSize: height / 60,
    color: "#989595",
  },
  FollowSubsView: {
    height: height * 0.1,
    // width: width * 0.21, // Commented on 21 May
    justifyContent: "flex-end",
    alignItems: "center",
  },
  AddressIconContainer: {
    // height: height * 0.04,
    width: width * 0.6,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: verticalScale(9),
    marginLeft:"10%"
    // backgroundColor:'red'
  },
  AddressTxt: {
    fontSize: height / 62,
    fontFamily: "Montserrat-Regular",
    color: "#989595",
  },
  // **** Tab Styling ****
  DetailsAndItemActivityContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: height * 0.07,
    width: width * 1,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#1A1A1A",
  },
  DetailsTabContainer: {
    height: height * 0.07,
    width: width * 0.25, // 0.25
    alignItems: "center",
    justifyContent: "center",
  },
  NoDataTxtContainer: {
    height: height * 0.3,
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

export default Styles;
