import { StyleSheet, Dimensions } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
const { height, width } = Dimensions.get("window");

import { COLOR } from "../../Utils/Colors";

const Styles = StyleSheet.create({
  MainContainer: {
    height: height * 1,
    alignItems: "center",
    // backgroundColor: COLOR.BACKGROUND_THEME,
    backgroundColor: COLOR.BLACK,
  },
  // ******** Tab Styling ********
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
    width: width * 0.5,
    alignItems: "center",
    justifyContent: "center",
  },
  StoryBoardContainer: {
    height: height * 0.85,
    width: width * 1,
    alignItems: "center",
  },
  // ******** FlatList Styling *********
  ListContainers: {
    height: height * 0.085,
    width: width * 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 2,
    // borderBottomColor: COLOR.BOTTOM_SHEET_BG_CLR,
    backgroundColor: COLOR.BACKGROUND_THEME,
  },
  ProfileImgContainers: {
    height: height * 0.085,
    width: width * 0.1,
    justifyContent: "center",
  },
  ProfileNameContainers: {
    height: height * 0.085,
    width: width * 0.35,
    justifyContent: "center",
  },
  ProfileNameTxt: {
    color: COLOR.WHITE,
    fontFamily: "Montserrat-SemiBold",
    fontSize: height / 55,
    marginLeft: moderateScale(10),
  },
  ProfileNickNameTxt: {
    color: "#888888",
    fontFamily: "Montserrat-Regular",
    fontSize: height / 55,

    marginLeft: moderateScale(8),
  },
  FollowBtnContainers: {
    height: height * 0.085,
    width: width * 0.25,
    justifyContent: "center",
  },
  FollowBtnTxt: {
    color: "#438CE1",
    fontFamily: "Montserrat-SemiBold",
    fontSize: height / 55,
  },
  RemoveBtnContainers: {},
  NoDataTxtContainer: {
    height: height * 0.75,
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
