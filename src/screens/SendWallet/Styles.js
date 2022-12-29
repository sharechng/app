import { StyleSheet, Dimensions } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
const { height, width } = Dimensions.get("window");

import { COLOR } from "../../Utils/Colors";

const Styles = StyleSheet.create({
  MainContainer: {
    height: height * 1,
    width: width * 1,
    alignItems: "center",
    // backgroundColor: COLOR.BACKGROUND_THEME,
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
  QRMainContainer: {
    height: height * 0.54,
    width: width * 1,
    // backgroundColor: COLOR.BACKGROUND_THEME,
    backgroundColor: COLOR.BLACK,
    paddingTop:'10%',
    alignItems: "center",
  },
  TxtInptCopyContainer: {
    flexDirection: "row",
    // height: height * 0.085,
    width: width * 0.9,
    backgroundColor: "rgba(33, 33, 33, 1)",
    borderRadius: 6,
    // justifyContent: "space-between",
    padding:7
  },
  BottomSheetContainer: {
    height: height * 0.35,
    width: width * 1,
    justifyContent: "center",
    marginTop: height * 0.38,
  },
  BottomSubContainer: {
    // height: height * 0.1,
    width: width * 1,
    justifyContent: "center",
    flexDirection: "row",
    marginTop: height * 0.05,
    // backgroundColor:'red'
    // borderWidth: 3,
  },
  copyIconContainer: {
    // height: height * 0.085,
    width: width * 0.1,
    justifyContent: "center",
    // marginRight: moderateScale(14),
    alignItems: "center",
    // backgroundColor:"red"
  },
  BtnContainer: {
    height: height * 0.1,
    width: width,
    // justifyContent: "center",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: height * 0.03,
  },
  AmountInputFieldContainer: {
    flexDirection: "row",
    height: height * 0.085,
    width: width * 0.9,
    backgroundColor: "rgba(33, 33, 33, 1)",
    borderRadius: 6,
  },
  AmountField: {
    width: width * 0.9,
    alignSelf: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 6,
    borderWidth: 0.3,
    borderColor: COLOR.WHITE,
  },
  InputAmountStyling: {
    color: COLOR.WHITE,
    padding: 8,
    fontSize: height / 55,
    fontFamily: "Montserrat-Regular",
    width: width * 0.85,
    // backgroundColor:'red'
  },
  AmountMainView: {
    height: height * 0.1,
    width: width * 1,
    justifyContent: "center",
    marginTop: height * 0.005,
    flexDirection: "row",
  },
  InputAddressStyling: {
    color: "white",
    fontSize: height / 55,
    width: width * 0.75,
    alignSelf: "center",
    fontFamily: "Montserrat-Regular",
    // padding: 1,
    // backgroundColor:'red'
  },

  COnfirmationTxtContainer: {
    height: height * 0.037,
    width: width * 0.92,
    marginTop:7
    // justifyContent: "center",
  },
  Confirmationtxt: {
    fontFamily: "Montserrat-Regular",
    color: "rgba(158, 158, 158, 1)",
    fontSize: height / 50,
    marginLeft: height * 0.025,
  },
  AlertAmount: {
    width: width * 0.92,
    justifyContent: "center",
  },
  AlertAmountTxt: {
    fontFamily: "Montserrat-Regular",
    color: "red",
    fontSize: height / 65,
    marginLeft: height * 0.025,
    marginTop: -5,
  },
});
export default Styles;
