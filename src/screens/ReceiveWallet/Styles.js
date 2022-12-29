import { StyleSheet, Dimensions } from "react-native";
import { rgba } from "react-native-color-matrix-image-filters";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
const { height, width } = Dimensions.get("window");

import { COLOR } from "../../Utils/Colors";

const Styles = StyleSheet.create({
  MainContainer: {
    // height: height * 1.78,
    height: height * 1,
    width: width * 1,
    alignItems: "center",
    backgroundColor: COLOR.BLACK,
  },
  headerView: {
    marginTop: height * 0.02,
    flexDirection: "row",
    height: height * 0.08,
    width: width * 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  BlankContainer: {
    height: height * 0.02,
    width: width * 1,
  },
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  title: {
    height: height / 10,
    width: width / 1,
    justifyContent: "center",
    alignItems: "center",
  },
  code: {
    height: height / 3,
    width: width / 1.3,
    // backgroundColor: "green",
  },
  receiveTxt: {
    fontWeight: "400",
    fontSize: height / 18,
    color: "#FFFFFF",
    fontFamily: "Poppins-Regular",
  },
  backImageContainer: {
    height: height / 2.9,
    width: width / 1,
    alignItems: "center",
    // justifyContent: "center",
    // marginTop: 30,
    // backgroundColor: "red",
  },
  userImageContainer: {
    height: height / 12,
    width: width / 5,
    alignItems: "center",
    justifyContent: "center",
  },
  profileDetailsContainer: {
    height: height / 12,
    width: width * 0.6,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    //
  },
  profileContainer: {
    height: height / 10,
    width: width * 0.73,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#191919",
  },
  copyImgContainer: {
    height: height / 12,
    width: width * 0.13,
    alignItems: "center",
    justifyContent: "center",
  },
  imageRowContainer: {
    height: height / 15,
    width: width / 1.1,
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
  },
  btnTxt: {
    fontSize: height / 60,
    fontWeight: "500",
    color: "#FFFFFF",
    fontFamily: "Poppins-Regular",
  },
  threeBtnContainer: {
    height: height / 20,
    width: width / 1.2,
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    right: 5,
  },
  buyTxt: {
    width: width / 6,
    justifyContent: "center",
    alignItems: "center",
  },
  setAmountTxt: {
    width: width / 4,
    justifyContent: "center",
    alignItems: "center",
    left: height / 100,
  },
  shareTxt: {
    width: width / 6,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  ImageAndTxtContainer: {
    height: height / 5,
    width: width / 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imageTwo: { height: height / 15, width: width / 7 },
  QRCodeContainer: {
    height: height * 0.3,
    width: width * 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: height * 0.01,
    // marginLeft: -height * 0.056,
  },
  ProfileContainer: {
    height: height * 0.1,
    width: width * 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  ProfileSubContainer: {
    height: height * 0.08,
    width: width * 0.9,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    // backgroundColor: COLOR.TXT_INPT_COLOR,
    backgroundColor: "rgba(36, 37, 38, 1)",
    borderRadius: 5,
  },
  ProfileImgContainer: {
    height: height * 0.08,
    width: width * 0.15,
    justifyContent: "center",
    alignItems: "center",
  },
  ProfileNameAddressContainer: {
    height: height * 0.08,
    width: width * 0.75,
    justifyContent: "center",
    alignItems: "center",
  },
  CopyIconContainer: {
    height: height * 0.08,
    width: width * 0.15,
    justifyContent: "center",
    alignItems: "center",
  },
  ProfileNameTxtContainer: {
    fontFamily: "Montserrat-Bold",
    color: COLOR.WHITE,
    // fontSize: scale(16),
    fontSize: height / 55,
  },
  ProfileAddressContainer: {
    fontFamily: "Montserrat-Regular",
    color: COLOR.WHITE,
    // fontSize: scale(11),
    fontSize: height / 62,
    marginLeft: height * 0.01,
  },
  NetworkContainer: {
    // height: height * 0.12,
    width: width * 0.9,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop:15
  },
  NetworkTxt: {
    color: COLOR.TXT_COLOR,
    fontFamily: "Montserrat-Medium",
    fontSize: height / 55,
  },
});
export default Styles;
