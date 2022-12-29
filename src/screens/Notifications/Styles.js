import { StyleSheet, Dimensions, Platform } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
const { height, width } = Dimensions.get("window");

import { COLOR } from "../../Utils/Colors";

const Styles = StyleSheet.create({
  MainContainer: {
    height: height * 1,
    width: width * 1,
    alignItems: "center",
  },
  NoticicationTxtContainer: {
    height: height * 0.05,
    width: width * 0.94,
    justifyContent: "center",
    marginTop: verticalScale(3.5),
  },
  NotificationTxt: {
    color: COLOR.WHITE,
    fontSize: height / 55,
    fontFamily: "Montserrat-Bold",
  },
  ListContainer: {
    height: height * 0.08,
    width: width * 0.94,
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLOR.LINE_COLOR,
  },
  StoryBoardContainer: {
    height: Platform.OS === "android" ? height * 0.88 : height * 0.84, // 0.785
    width: width * 1,
    // marginTop: verticalScale(10),
    justifyContent: "center",
    alignItems: "center",
  },
  ImgContainer: {
    height: height * 0.08,
    width: width * 0.11,
    justifyContent: "center",
  },
  DetailsContainer: {
    height: height * 0.08,
    width: width * 0.6,
    justifyContent: "center",
  },
  DescriptionTxt: {
    color: COLOR.WHITE,
    fontSize: height / 63,
    fontFamily: "Montserrat-Medium",
    marginLeft: moderateScale(8),
  },
  TimeTxt: {
    color: "#838282",
    fontSize: height / 80,
    fontFamily: "Montserrat-Regular",
    marginLeft: moderateScale(8),
  },
  BtnContainers: {
    height: height * 0.08,
    width: width * 0.23,
    justifyContent: "center",
  },
  NoDataTxtContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  NoDataTxt: {
    color: COLOR.WHITE,
    fontFamily: "Montserrat-SemiBold",
    fontSize: height / 45,
  },
  // ********** Confirmation Modal Styling Starts **********
  ModalMainContainer: {
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
    fontSize: height / 50,
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
  datainputd1: {
    height: height / 15,
    width: width * 0.55,
    borderRadius: 5,
    alignItems: "center",
    // justifyContent: "space-around",
    justifyContent: "space-between",
    flexDirection: "row",
    borderWidth: 0.5,
    borderColor: COLOR.WHITE,
  },
  dateTxt: {
    color: COLOR.GREY,
    fontFamily: "Montserrat-Regular",
    fontSize: height / 55,
    marginLeft: height * 0.01,
  },
  // ********** Confirmation Modal Styling Ends **********
});

export default Styles;
