import { StyleSheet, Dimensions } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
const { height, width } = Dimensions.get("window");
import { COLOR } from "../../Utils/Colors";

const Styles = StyleSheet.create({
  Maincontainer: {
    width: width * 1,
  },
  headercontainer: {
    width: width * 0.9,
    alignSelf: "center",
  },
  passwordfullview: {
    marginTop: '10%',
    width: width * 0.9,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  passwrdview: {
    // height: height * 0.08,
    marginVertical:10,
    width: width * 0.8,
    justifyContent: "center",
    alignItems: "center",
  },
  pleaseview: {
    // height: height * 0.06,
    width: width * 0.9,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  passwrdTxt: {
    fontSize: height / 40,
    color: COLOR.TXT_COLOR,
    fontFamily: "Montserrat-Medium",
  },
  shareTxt: {
    fontSize: height / 53,
    color: COLOR.TXT_COLOR,
    fontFamily: "Montserrat-Medium",
  },
  Passwordfullcontainer: {
    // height: height * 0.3,
    marginTop:'15%',
    width: width * 0.9,
    justifyContent: "flex-start",
    alignSelf: "center",
    alignItems: "center",
  },
  InputFieldContainer: {
    backgroundColor: COLOR.TXT_INPT_COLOR,
    color: COLOR.WHITE,
    borderRadius: scale(10),
    justifyContent: "center",
  },
  SaveBtnContainer: {
    // height: height * 0.16,
    marginVertical:'15%',
    width: width * 0.9,
    justifyContent: "flex-end",
  },
  headerView: {
    marginTop: height * 0.02,
    flexDirection: "row",
    height: height * 0.08,
    width: width * 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  ErrorContainer: {
    // height: height * 0.02,
    width: width * 0.9,
    justifyContent: "center",
    marginBottom: -verticalScale(10),
  },
  CurrentPasswordStyling: {
    height: height * 0.08,
    width: width * 0.7,
    backgroundColor: COLOR.TXT_INPT_COLOR,
    color: COLOR.GREY,
    borderRadius: scale(10),
    padding: moderateScale(8),
    fontFamily: "Montserrat-Regular",
    fontSize: height / 55,
  },
});

export default Styles;
