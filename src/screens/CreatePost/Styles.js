import { StyleSheet, Dimensions } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
const { height, width } = Dimensions.get("window");

import { COLOR } from "../../Utils/Colors";

const Styles = StyleSheet.create({
  MainContainer: {
    // height: height * 1,
    // height: height * 1.45,
    alignItems: "center",
    // backgroundColor: COLOR.BACKGROUND_THEME,
    backgroundColor: COLOR.BLACK,
    paddingBottom:'25%'
  },
  lisHaedView: {
    height: height * 0.06,
    width: width * 0.9,
    // backgroundColor: "pink",
    alignSelf: "center",
    justifyContent: "center"
  },
  itemView: {
    height: height * 0.21,
    width: width * 0.35,


    justifyContent: "center",
    // alignItems: "center"
  },
  titleView: {
    height: height * 0.05,
    width: width * 0.29,
    // backgroundColor: "yellow",
    justifyContent: "center",
    alignItems: "center"
  },
  mainItemView: {
    height: height * 0.2,
    width: width * 0.32,
    backgroundColor: COLOR.TXT_INPT_COLOR,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  imageView: {
    height: height * 0.13,
    width: width * 0.29,
    // backgroundColor: "grey",
    justifyContent: "center",
    alignItems: "center"
  },
  listParent: {
    height: height * 0.22,
    width: width * 0.9,
    // backgroundColor: "pink",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center"
  },
  headingTxt: {
    fontSize: height / 55,
    fontFamily: "Montserrat-SemiBold",
    color: COLOR.WHITE
  },
  titleTxt: {
    fontSize: height / 65,
    fontFamily: "Montserrat-SemiBold",
    color: COLOR.WHITE
  },
  listContaner: {
    marginTop:20,
    // backgroundColor: "red",
    width: width * 0.9,
    alignSelf: "center"
  },
  ProfileImgNameContainer: {
    height: height * 0.1,
    width: width * 0.9,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    marginTop: verticalScale(8),
  },
  ImgContainer: {
    height: height * 0.1,
    width: width * 0.15,
    justifyContent: "center",
  },
  NameContainer: {
    height: height * 0.1,
    width: width * 0.75,
  },
  NameTxt: {
    fontFamily: "Montserrat-SemiBold",
    color: COLOR.WHITE,
    fontSize: height / 50,
    marginTop: verticalScale(12),
  },
  WriteContainer: {
    height: height * 0.06,
    width: width * 0.9,
  },
  PostAreaContainer: {
    height: height * 0.3,
    width: width * 0.9,
    justifyContent: "center",
    alignItems: "center",
  },
  BackImgContainer: {
    height: height * 0.15,
    width: width * 0.3,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#373636",
  },
  InputContainer: {
    marginTop:20,
    width: width * 0.9,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  BalanceTypeView: {
    backgroundColor: COLOR.TXT_INPT_COLOR,
    justifyContent: "center",
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    alignItems: "center",
  },
  BalanceTxt: {
    fontSize: height / 65,
    fontFamily: "Montserrat-Regular",
    color: "#9E9E9E",
  },
  DurationDropContainer: {
    marginTop:20,
    width: width * 0.9,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  BtnContainer: {
    height: height * 0.12, // 0.19 23 June
    width: width * 0.9,
    justifyContent: "flex-end",
  },
  imageBackGroundText: {
    justifyContent: "center",
    alignItems: "center",
    height: height * 0.15,
    width: width * 0.9,
  },
  HashTagContainer: {
    height: height * 0.08,
    width: width * 0.9,
    marginVertical: 10,
  },
  HashTxtList: {
    height: 40,
    width: width * 0.9,
    justifyContent: "center",
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
  ImgUploadView: {
    height: height * 0.3,
    width: width * 0.9,
    borderWidth: 0.5,
    borderColor: COLOR.WHITE,
    borderStyle: "dashed",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  ErrorContainer: {
    marginLeft:25,
    justifyContent: "center",
    alignSelf:'flex-start',
    marginBottom: -verticalScale(10),
  },
  ImgEffectName: {
    color: COLOR.GREY,
    fontSize: height / 55,
    fontFamily: "Montserrat-Medium",
    marginVertical: 4,
  },
});

export default Styles;
