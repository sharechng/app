import { StyleSheet, Dimensions, Platform } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
const { height, width } = Dimensions.get("window");

import { COLOR } from "../../Utils/Colors";

const Styles = StyleSheet.create({
  MainContainer: {
    height: height * 0.9,
    alignItems: "center",
    backgroundColor:'#101010'

  },
  headerView: {
    marginTop: height * 0.02,
    flexDirection: "row",
    height: height * 0.08,
    width: width * 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  CommentsBodyContainer: {
    width: width * 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: verticalScale(3),
  },
  CommentsBodyTwoContainer: {
    // height: height * 0.15,
    width: width * 0.94,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  SubContainer: {
    // height: height * 0.065, // 0.098
    width: width * 0.9,
    justifyContent: "center",
    flexDirection: "row",
  },
  ProfilePicsContainer: {
    height: height * 0.065,
    width: width * 0.15,
    justifyContent: "center",
  },
  ProfileNameAndDescriptionContainer: {
    // height: height * 0.065, // 16 June
    width: width * 0.59, // 0.56
  },
  ProfileNameContainer: {
    // height: height * 0.03,
    width: width * 0.59, // 0.56
  },
  ProfileNameTxt: {
    color: COLOR.WHITE,
    fontFamily: "Montserrat-SemiBold",
    fontSize: height / 54,
  },
  DescriptionTxt: {
    color: COLOR.WHITE,
    fontFamily: "Montserrat-Regular",
    fontSize: height / 65,
    marginTop: verticalScale(3),
  },
  HashTagContainer: {
    height: height * 0.03,
    width: width * 1,
    alignItems: "flex-end",
  },
  HashTagSubContainer: {
    height: height * 0.035, // 0.05
    width: width * 0.78,
  },
  HashTagTxt: {
    color: COLOR.WHITE,
    fontSize: height / 65,
    fontFamily: "Montserrat-Medium",
  },
  CommentSendContainer: {
    height: "11%", // 0.09
    width: width * 1,
    flexDirection: "row",
    paddingLeft:15,
    alignItems: "center",
    // bottom: 15,
    // position: "absolute",
    borderTopWidth: 1,
    borderTopColor: COLOR.TXT_INPT_COLOR,
    backgroundColor:'#101010'
  },
  ProfileImgView: {
    height: height * 0.075,
    width: width * 0.14,
    justifyContent: "center",
  },
  ProfilenameView: {
    height: height * 0.075,
    width: width * 0.63,
    justifyContent: "center",
  },
  PostButtonTxtContainer: {},
  PostButtonTxt: {
    // color: "#1e90ff",
    color: COLOR.BUTTON_PINK,
    fontSize: height / 65,
    fontFamily: "Montserrat-Medium",
  },
  InputContainer: {
    // height: height * 0.11,
    width: width * 1,
    marginTop: verticalScale(1),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    // marginBottom:verticalScale(2)
    // backgroundColor:'red'
  },
  LeftImgContainer: {
    height: height * 0.09,
    width: width * 0.11,
    justifyContent: "center",
  },
  SendBtnTouch: {
    height: 44,
    width: 48,
    // backgroundColor: COLOR.TXT_INPT_COLOR,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  NoDataTxtContainer: {
    // height: height * 0.35,
    // width: width,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  NoDataTxt: {
    color: COLOR.WHITE,
    fontFamily: "Montserrat-SemiBold",
    fontSize: height / 45,
  },
  ProfileImgView: {
    // height: height * 0.075,
    width: width * 0.16, // 0.14
    justifyContent: "center",
    // backgroundColor: COLOR.TXT_INPT_COLOR,
  },

  // ********** Report Modal Styling *********
  ReportModalOne: {
    flex: 1,
    justifyContent: "center",
  },
  ReportModalMainContainer: {
    justifyContent: "center",
    width: Platform.OS == "ios" ? width - 75 : width - 80,
    height: Platform.OS == "ios" ? height / 2.5 : height / 3,
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
  // ----- report modal style ends------
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
});

export default Styles;
