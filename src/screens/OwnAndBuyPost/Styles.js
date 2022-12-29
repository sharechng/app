import { StyleSheet, Dimensions } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
const { height, width } = Dimensions.get("window");

import { COLOR } from "../../Utils/Colors";

const Styles = StyleSheet.create({
  MainContainer: {
    // flex: 1,
    height: height * 1,
    alignItems: "center",
    backgroundColor: COLOR.BACKGROUND_THEME,
  },
  headerView: {
    marginTop: height * 0.02,
    flexDirection: "row",
    height: height * 0.08,
    width: width * 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  ImageContainer: {
    height: height * 0.413,
    width: width * 1,
  },
  ProfileView: {
    height: height * 0.1,
    width: width * 1,
    marginTop: verticalScale(26),
    alignItems: "center",
  },
  PicNameContainer: {
    height: height * 0.08,
    width: width * 0.94,
    flexDirection: "row",
    alignItems: "center",
  },
  ProfilePicContainer: {
    height: height * 0.08,
    width: width * 0.16,
  },
  ProfileNameContainer: {
    width: width * 0.65, // 0.78
    // backgroundColor: "red",
  },
  ProfileNameTxt: {
    color: COLOR.WHITE,
    fontSize: height / 45,
    fontFamily: "Montserrat-SemiBold",
  },
  ProfileDataTxtTwo: {
    color: COLOR.WHITE,
    fontSize: height / 65,
    fontFamily: "Montserrat-Medium",
    marginTop: verticalScale(4),
  },
  LikesCountContainer: {
    width: width * 0.13,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  LikesAmountTxt: {
    color: COLOR.WHITE,
    fontSize: height / 70,
    fontFamily: "Montserrat-Regular",
    marginTop: verticalScale(3),
  },
  DurationPrice: {
    height: height * 0.05,
    width: width * 1,
    justifyContent: "center",
    alignItems: "center",
  },
  DurationContainer: {
    height: height * 0.02,
    width: width * 0.92,
    flexDirection: "row",
  },
  DurationTxt: {
    color: "#979797",
    fontSize: height / 70,
    fontFamily: "Montserrat-Regular",
  },
  DaysTxt: {
    color: COLOR.WHITE,
    fontSize: height / 70,
    fontFamily: "Montserrat-Medium",
  },
  DescriptionContainer: {
    height: height * 0.25,
    width: width * 1,
    alignItems: "center",
  },
  DetailsTxtView: {
    height: height * 0.045,
    width: width * 1,
    justifyContent: "flex-end",
  },
  DescriptionTxtView: {
    height: height * 0.3,
    width: width * 1,
    marginTop: verticalScale(8),
  },
  BtnContainer: {
    height: height * 0.13, // 0.16
    width: width * 0.9,
    justifyContent: "flex-end",
  },
  DetailsAndItemActivityContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: height * 0.05,
    width: width,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#1A1A1A",
  },
  DetailsTabContainer: {
    height: height * 0.05,
    width: width * 0.45,
    alignItems: "center",
    justifyContent: "center",
  },
  ItemActivityTabContainer: {
    height: height * 0.1,
    width: width * 0.45,
    alignItems: "center",
    justifyContent: "center",
  },
  DetailsTabDataContainer: {
    height: height * 0.045,
    width: width * 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  LeftDataTitle: {
    height: height * 0.045,
    width: width * 0.47,
    justifyContent: "center",
  },
  LeftDataTxt: {
    fontSize: height / 65,
    fontFamily: "Montserrat-Regular",
    color: COLOR.TRANSACT_HIST_TXT,
  },
  SelectedTabContainer: {
    height: height * 0.005,
    width: width * 0.5, // 0.35
    backgroundColor: COLOR.BUTTON_PINK,
    borderRadius: 5,
  },
  ContainerView: {
    height: height * 0.075,
    width: width * 0.2,
    justifyContent: "center",
  },
  TxtContainerView: {
    color: COLOR.WHITE,
    fontFamily: "Montserrat-Regular",
    // fontSize: scale(12),
    fontSize: height / 60,
  },
  HeadingTableContainer: {
    height: height * 0.07,
    width: width * 1,
    backgroundColor: "#1A1A1A",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  TableDataContainer: {
    height: height * 0.056,
    width: width * 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#1A1A1A",
  },
  // ********** Confirmation Modal Styling Starts **********
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  ModalSubContainer: {
    height: height * 0.2,
    width: width * 0.88,
    justifyContent: "center",
    alignItems: "center",
  },
  HeadingContainer: {
    height: height * 0.28,
    width: width * 0.88,
    backgroundColor: COLOR.TXT_INPT_COLOR,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  HeadingTxtContainer: {
    color: COLOR.WHITE,
    // fontSize: scale(16),
    fontSize: height / 55,
    fontFamily: "Montserrat-SemiBold",
  },
  ButtonMainContainer: {
    height: height * 0.09,
    width: width * 0.88,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  btnContainer: {
    height: height * 0.1,
    alignItems: "center",
    justifyContent: "center",
    width: width * 0.45,
  },
  // ********** Confirmation Modal Styling Ends **********
  PriceContainer: {
    width: width * 0.92,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginBottom:15
  },
  PriceTxt: {
    fontSize: height / 50,
    fontFamily: "Montserrat-Medium",
    // color: COLOR.TXT_INPT_COLOR,
    color: "#979797",
  },
  InptStyling: {
    height: height * 0.05,
    width: width * 0.5,
    color: "white",
    borderWidth: 1,
    borderColor: COLOR.TXT_INPT_COLOR,
    borderRadius: 8,
    padding: 8,
  },
  datainputd: {
    height: height / 17,
    // width: width / 1.13,
    width: width / 2,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: COLOR.BACKGROUND_THEME,
    borderRadius: 8,
    flexDirection: "row",
    borderColor: "#00000010",
    borderWidth: 0.5,

    flexDirection: "row",
  },
  datainputd1: {
    height: height / 17,
    width: width * 0.5, // 0.5
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: COLOR.TXT_INPT_COLOR,
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
  //--------
});

export default Styles;
