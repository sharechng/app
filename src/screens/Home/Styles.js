import { StyleSheet, Dimensions, Platform } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
const { height, width } = Dimensions.get("window");

import { COLOR } from "../../Utils/Colors";

const Styles = StyleSheet.create({
  MainContainer: {
    // flex: 1,
    height: height * 0.92, // 0.875
    alignItems: "center",
    // backgroundColor: COLOR.BACKGROUND_THEME,
    backgroundColor: COLOR.BLACK,
  },
  CreateBundleContainer: {
    height: height * 0.04,
    width: width * 1,
    marginLeft: moderateScale(24),
  },
  ListMainContainer: {
    flexDirection: "column",
    paddingHorizontal: 8,
    // backgroundColor: "red",
    position: "relative",
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
  CreateBundleTxt: {
    color: COLOR.WHITE,
    fontFamily: "Montserrat-SemiBold",
    fontSize: height / 50,
  },
  TxtInptContainer: {
    height: height * 0.06,
    width: width * 0.94,
  },
  PostBtnContainer: {
    height: height * 0.07,
    width: width * 0.94,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: verticalScale(3),
  },
  SharingButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: width * 0.28,
    alignItems: "center",
  },
  SharingButtonContainerTwo: {
    justifyContent: "center",
    width: width * 0.28,
    alignItems: "center",
  },
  BtnTxtView: {
    color: COLOR.POST_TXT,
    fontFamily: "Montserrat-Medium",
    fontSize: height / 57,
  },

  StoryBoardContainer: {
    flex: 1,
    width: width * 1,
  },
  StoryContainer: {
    height: 70,
    width: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  ProfileNameContainer: {
    height: height * 0.15,
    width: width * 0.3,
    alignItems: "center",
  },
  ProfileTxt: {
    color: COLOR.WHITE,
    fontSize: height / 66,
    fontFamily: "Montserrat-Medium",
    marginTop: verticalScale(3),
  },
  FeedBoardContainer: {
    flex: 1, // New Styling 10 May 2022
    width: width * 1,
    alignItems: "center",
  },
  ProfileNameMoreContainer: {
    height: height * 0.09,
    width: width * 0.94, //0.94
    flexDirection: "row",
    alignItems: "center",
  },

  ProfileImgView: {
    height: height * 0.075,
    width: width * 0.16, // 0.14
    justifyContent: "center",
  },
  ProfilenameView: {
    height: height * 0.075,
    width: width * 0.63,
    justifyContent: "center",
  },
  ProfileNameTxt: {
    color: COLOR.WHITE,
    fontFamily: "Montserrat-SemiBold",
    fontSize: height / 48, // 15
  },
  ProfileNameTxtDetails: {
    color: COLOR.WHITE,
    fontFamily: "Montserrat-SemiBold",
    fontSize: height / 75,
  },
  DescriptionContainer: {
    // height: height * 0.06,
    width: width * 0.9, // 0.94,
    marginVertical: 4,
  },
  DescriptionTxt: {
    color: COLOR.WHITE,
    fontFamily: "Montserrat-Medium",
    fontSize: height / 75,
  },
  PriceContainer: {
    height: height * 0.069,
    width: width * 0.94,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  PriceTxt: {
    color: COLOR.WHITE,
    fontFamily: "Montserrat-Bold",
    fontSize: height / 57,
  },
  imgContainer: {
    height: height * 0.315,
    width: width * 1,
    alignItems: "center",
    marginTop: verticalScale(4),
  },
  BtnSubscribeMain: {
    height: height * 0.32,
    width: width * 1,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
  },
  BtnSubscribeMainTwo: {
    height: height * 0.1,
    width: width * 1,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
  },
  BtnTxt: {
    color: COLOR.WHITE,
    fontSize: height / 55,
    fontFamily: "Montserrat-SemiBold",
    marginVertical: 1,
  },
  BtnTxtTouch: {
    // height: height * 0.065,
    width: width * 0.46,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8, // 8
    backgroundColor: COLOR.BUTTON_PINK,
    borderRadius: 5,
  },
  BtnTxtTouchTwo: {
    height: height * 0.055,
    width: width * 0.38,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
    backgroundColor: COLOR.BUTTON_PINK,
    borderRadius: 5,
  },
  LikeCommentShareContainer: {
    height: height * 0.055, // 0.065
    width: width * 1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  LikesView: {
    height: height * 0.045,
    width: width * 0.44,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  CommentsView: {
    height: height * 0.045,
    width: width * 0.47, // 0.58
    alignItems: "center",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  CommentsViewTwo: {
    alignItems: "center",
    justifyContent: "center",
    alignItems: "flex-start",
    width: width * 0.9,
    height: height * 0.021, // 0.025
  },
  ViewAllCommentsTxt: {
    fontSize: height / 57,
    fontFamily: "Montserrat-Medium",
    color: "#9B9B9B",
  },
  CommentsViewThree: {
    alignItems: "center",
    justifyContent: "center",
    alignItems: "flex-start",
    width: width * 0.9,
    height: height * 0.036, // 0.045
  },
  txtComentsShare: {
    fontSize: height / 60, // 15
    fontFamily: "Montserrat-SemiBold",
    color: COLOR.WHITE,
  },
  LikesCountView: {
    height: 20,
    width: 20,
    borderRadius: 20,
    backgroundColor: COLOR.GREY,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: -moderateScale(8),
  },
  ShareViewTwo: {
    height: 5,
    width: width * 0.94,
    borderBottomWidth: 1,
    borderBottomColor: COLOR.GREY,
    opacity: 0.5,
  },
  LikeCommShareImg: {
    height: height * 0.045,
    width: width * 1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  LikeTouch: {
    height: height * 0.045,
    width: width * 0.315,
    alignItems: "center",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  CommentSendContainer: {
    height: height * 0.06, // 0.09
    width: width * 0.94,
    flexDirection: "row",
    alignItems: "center",
  },

  LikeSubscribeContainer: {
    height: height * 0.345,
    width: width * 1,
    backgroundColor: COLOR.HEADER_THEME,
    alignItems: "center",
    marginTop: verticalScale(10),
  },
  SubscribeContainer: {
    height: height * 0.29,
    width: width * 0.475,
    justifyContent: "center",
  },
  PackageYouLikeTxt: {
    height: height * 0.045,
    width: width * 1,
    justifyContent: "center",
    marginLeft: verticalScale(24),
  },
  CardView: {
    height: height * 0.28,
    width: width * 0.45,
    backgroundColor: COLOR.TXT_INPT_COLOR,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  IconNameContainer: {
    height: height * 0.035,
    width: width * 0.4,
    alignItems: "center",
    flexDirection: "row",
  },
  ProfileTxtTwo: {
    color: COLOR.WHITE,
    fontSize: height / 60,
    fontFamily: "Montserrat-SemiBold",
    marginLeft: moderateScale(3),
  },
  AmountTxtView: {
    color: COLOR.WHITE,
    fontSize: height / 65,
    fontFamily: "Montserrat-Regular",
  },
  AmountView: {
    color: COLOR.WHITE,
    fontSize: height / 65,
    fontFamily: "Montserrat-Bold",
  },
  PostButtonTxtContainer: {},
  PostButtonTxt: {
    // color: "#1e90ff",
    color: COLOR.BUTTON_PINK,
    fontSize: height / 60,
    fontFamily: "Montserrat-Medium",
  },

  // ************ Short Modal Styling ************
  inputCardModal: {
    width: width * 0.45,
    borderRadius: 3,
    backgroundColor: COLOR.BOTTOM_SHEET_BG_CLR,
    shadowOpacity: 0.8,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "grey",
    marginVertical: Platform.OS == "ios" ? 250 : 180,
    marginHorizontal: 20,
    elevation: 2,
    alignSelf: "flex-end",
  },
  inputCardModalTwo: {
    width: width * 0.42,
    borderRadius: 3,
    backgroundColor: COLOR.BOTTOM_SHEET_BG_CLR,
    shadowOpacity: 0.8,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "grey",
    marginVertical: Platform.OS == "ios" ? 70 : 60,
    elevation: 2,
    alignSelf: "flex-end",
  },
  ShareTxtContainer: {
    width: width * 0.4,
    borderBottomWidth: 1,
    borderBottomColor: "#272626",
    flexDirection: "row",
    paddingBottom: 1,
    height: 44,
    justifyContent: "space-around",
    alignItems: "center",
  },
  ShareImgContainer: {
    marginHorizontal: 15,
    height: 15,
    width: 15,
    justifyContent: "center",
    top: 3,
  },
  ReportTxtContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#272626",
    flexDirection: "row",
    paddingBottom: 5,
    height: 44,
  },
  ReportImgContainer: {
    marginHorizontal: 15,
    height: 20,
    width: 15,
    justifyContent: "center",
  },
  BlockImgContainer: {
    marginHorizontal: 15,
    height: 20,
    width: 20,
    alignSelf: "center",
  },
  // ********** Report Modal Styling *********
  ReportModalOne: {
    flex: 1,
    justifyContent: "center",
  },
  ReportModalMainContainer: {
    justifyContent: "center",
    width: Platform.OS == "ios" ? width - 75 : width - 80,
    height: Platform.OS == "ios" ? height / 4 : height / 4.5,
    backgroundColor: COLOR.TXT_INPT_COLOR,
    borderRadius: 6,
    alignSelf: "center",
  },
  ReportModalAlertTxt: {
    color: COLOR.WHITE,
    fontSize: 18,
    textAlign: "center",
    fontFamily: "Montserrat-SemiBold",
  },
  ReportModalConfirm: {
    color: COLOR.WHITE,
    fontSize: 16,
    textAlign: "center",
    lineHeight: 25,
    fontFamily: "Montserrat-Regular",
  },
  ReportModalContainerTwo: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopColor: "#969696",
    borderTopWidth: 0.7,
    height: 50,
    marginHorizontal: 5,
  },
  ReportModalCancelTxt: {
    fontSize: 15,
    fontFamily: "Montserrat-SemiBold",
    color: COLOR.WHITE,
    borderRadius: 0,
    overflow: "hidden",
    textAlign: "center",
  },
  ReportModalReportTxt: {
    fontSize: 15,
    fontFamily: "Montserrat-SemiBold",
    color: COLOR.WHITE,
    overflow: "hidden",
    width: 100,
    textAlign: "center",
  },
  ShareReportBlockTxt: {
    fontSize: 15,
    textAlign: "center",
    color: COLOR.WHITE,
    fontFamily: "Montserrat-Medium",
  },

  // ------
  PostContainers: {
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#272626",
    flexDirection: "row",
    height: height * 0.065,
  },
  PostTxtView: {
    height: height * 0.06,
    width: width * 0.28,
    justifyContent: "center",
  },
  PostTxts: {
    fontSize: 15,
    color: COLOR.WHITE,
    marginLeft: verticalScale(15),
  },
  ImgsView: {
    height: height * 0.06,
    width: width * 0.1, // 0.12
    justifyContent: "center",
  },
  ModalOneTxtView: {
    width: width * 0.28, // 0.28
    height: height * 0.05,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  ModalOneTxt: {
    fontSize: height / 55,
    color: COLOR.WHITE,
    fontFamily: "Montserrat-Regular",
    marginLeft: moderateScale(10),
  },
  ModalOneImgView: {
    width: width * 0.12,
    height: height * 0.05,
    justifyContent: "center",
    alignItems: "center",
  },
  CreatorContainer: {
    height: height * 0.2,
    width: width * 1,
    justifyContent: "center",
    alignItems: "center",
  },
  CreatorSeeAllContainer: {
    height: height * 0.06,
    // width: width * 0.94,
    width: width * 1,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1A1A1A",
    marginTop: height * 0.015,
  },
  TrendCreatorContainer: {
    height: height * 0.04,
    width: width * 0.6,
    justifyContent: "center",
  },
  TrendCreatorTxt: {
    color: COLOR.WHITE,
    fontFamily: "Montserrat-SemiBold",
    fontSize: height / 50,
  },
  SeeAllTxt: {
    color: COLOR.BUTTON_PINK,
    fontFamily: "Montserrat-Medium",
    fontSize: height / 60,
  },
  CreatorListingContainer: {
    height: height * 0.1,
    width: width * 0.48, // 0.45 6 June
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: height * 0.025,
  },
  CreatorNameTxtview: {
    height: height * 0.09,
    width: width * 0.48, // 0.45 14 June
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  CreatorPicsView: {
    height: height * 0.09,
    width: width * 0.17, // 0.12
    justifyContent: "center",
  },
  CreatorNameTxt: {
    color: "#DCDCDC",
    fontFamily: "Montserrat-SemiBold",
    fontSize: height / 50,
  },
  creatorBalanceTxt: {
    color: "#B6B6B6",
    fontFamily: "Montserrat-Medium",
    fontSize: height / 62,
  },
  EmojiContainer: {
    height: 35,
    width: 30,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: verticalScale(10),
    marginHorizontal: moderateScale(10),
  },

  // ----- Remark Modal Styling -----
  RemarkModalContainer: {
    justifyContent: "center",
    width: Platform.OS == "ios" ? width * 0.75 : width * 0.75,
    height: Platform.OS == "ios" ? height * 0.32 : height * 0.32,
    backgroundColor: "#272626",
    borderRadius: 6,
    alignSelf: "center",
  },
  RemarkTxt: {
    color: COLOR.WHITE,
    fontSize: height / 40,
    textAlign: "center",
    fontFamily: "Montserrat-SemiBold",
  },
  RemarkInputModalContainer: {
    alignSelf: "center",
    marginVertical: 10,
    borderWidth: 0.5,
    borderColor: "lightgrey",
    height: 60,
    width: 200,
    borderRadius: 5,
    shadowOpacity: 0.3,
    elevation: 0.7,
    marginHorizontal: 10,
  },
  SubmitBtnCotainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopColor: "#969696",
    borderTopWidth: 0.7,
    height: 50,
    marginHorizontal: 5,
  },
  SubmitBtnTxt: {
    fontSize: 15,
    fontWeight: "bold",
    color: COLOR.BUTTON_PINK,
    overflow: "hidden",
    width: 100,
    textAlign: "center",
  },
  MightLikeContainer: {
    height: height * 0.37,
    width: width * 1,
    alignItems: "center",
  },
  MightLikeTxtContainer: {
    height: height * 0.04,
    width: width * 0.94,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  MightLikeTxt: {
    fontSize: height / 60,
    fontFamily: "Montserrat-Medium",
    color: COLOR.WHITE,
  },
  BtnContainer: {
    height: height * 0.1,
    width: width * 0.9,
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
  },
  // ---=-=-=-=-=-=
  BlurModalClose: {
    height: height * 1,
    width: width * 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  BlurModalContainer: {
    height: height * 0.6,
    width: width * 0.9,
    backgroundColor: COLOR.TXT_INPT_COLOR,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
  },
  BlurModalImgContainer: {
    height: height * 0.35,
    width: width * 0.9,
    backgroundColor: COLOR.TXT_INPT_COLOR,
    alignItems: "center",
    justifyContent: "center",
  },
  BlurModalTitleContainer: {
    height: height * 0.06,
    width: width * 0.9,
    backgroundColor: COLOR.TXT_INPT_COLOR,
    alignItems: "center",
    justifyContent: "center",
  },
  TitleTxt: {
    color: COLOR.WHITE,
    fontSize: height / 55,
    fontFamily: "Montserrat-Medium",
  },
  // -=-=-=-= Bottom sheet -=-=-=-=-=
  header: {
    backgroundColor: "white",
    shadowColor: "#333333",
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00000040",
    marginBottom: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: COLOR.BOTTOM_SHEET_BG_CLR,
    paddingTop: 20,
  },
  panelTitle: {
    fontSize: height / 32,
    height: 35,
    color: COLOR.TXT_COLOR,
    fontFamily: "Montserrat-SemiBold",
  },
  panelSubtitle: {
    fontSize: height / 50,
    color: COLOR.TXT_COLOR,
    height: 30,
    marginBottom: 10,
    fontFamily: "Montserrat-Medium",
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: COLOR.BUTTON_PINK,
    alignItems: "center",
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: height / 45,
    fontFamily: "Montserrat-SemiBold",
    color: COLOR.WHITE,
  },
  MainContainerSheet: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  // ********** Report Modal Styling *********
  ReportPostModalOne: {
    flex: 1,
    justifyContent: "center",
  },
  ReportPostModalMainContainer: {
    justifyContent: "center",
    width: Platform.OS == "ios" ? width - 50 : width - 40,
    // height: Platform.OS == "ios" ? height / 2.5 : height / 2.4,
    height: height * 0.38,
    // backgroundColor: COLOR.TXT_INPT_COLOR,
    backgroundColor: "rgba(26, 26, 26, 1)",
    borderRadius: 6,
    alignSelf: "center",
  },
  ReportPostModalAlertTxt: {
    color: COLOR.WHITE,
    fontSize: 18,
    textAlign: "center",
    fontFamily: "Montserrat-SemiBold",
  },
  ReportPostModalConfirm: {
    color: COLOR.WHITE,
    fontSize: 16,
    textAlign: "center",
    lineHeight: 25,
    fontFamily: "Montserrat-Regular",
  },
  ReportPostModalContainerTwo: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 50,
    width: width * 0.85,
    marginHorizontal: 6,
    marginTop:5
  },
  ReportPostModalCancelTxt: {
    fontSize: 15,
    fontFamily: "Montserrat-SemiBold",
    color: COLOR.WHITE,
    borderRadius: 0,
    overflow: "hidden",
    textAlign: "center",
  },
  ReportPostModalReportTxt: {
    fontSize: 15,
    fontFamily: "Montserrat-SemiBold",
    color: COLOR.WHITE,
    overflow: "hidden",
    width: 100,
    textAlign: "center",
  },
  ShareReportBlockTxt: {
    fontSize: 15,
    textAlign: "center",
    color: COLOR.WHITE,
    fontFamily: "Montserrat-Medium",
  },
  RemarkPostInputModalContainer: {
    // alignSelf: "center",
    height:  100, // 60
    width: width * 0.7, // 200
    borderWidth: 0.5,
    borderColor: "lightgrey",
    borderRadius: 5,
    marginHorizontal: 10,
    marginVertical: 10,
    justifyContent:'flex-start',
    padding: 10,
    // shadowOpacity: 0.3,
    // elevation: 0.7,
  },
  // ----- report modal style ends------
  ErrorTxt: {
    color: COLOR.WHITE,
    fontSize: height / 45,
    fontFamily: "Montserrat-Medium",
  },
  ErrorTxtContainer: {
    height: height * 0.52,
    justifyContent: "center",
    alignItems: "center",
  },
  height: height,
  width: width,
});

export default Styles;
