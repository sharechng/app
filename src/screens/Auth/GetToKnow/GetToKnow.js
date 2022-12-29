import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Modal,
  FlatList,
  Platform,
} from "react-native";
import AppButton from "../../../components/CustomButton/CustomButton";
import AuthHeader from "../../../components/CustomHeader/AuthHeader";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  AddInterestApiUrl,
  ListOfInterestUrl,
} from "../../../restAPI/ApiConfig";
import { COLOR } from "../../../Utils/Colors";
import { ImagePath } from "../../../constants/ImagePath";
import { showMessage } from "react-native-flash-message";
import AntDesign from 'react-native-vector-icons/AntDesign'
import { scale } from "react-native-size-matters";
import Progressdialog from "../../../../Progressdialog";
import { normalize } from "../../../../ResponsiveFontSize";
const { height, width } = Dimensions.get("window");


const GetToKnow = (props) => {
  const [loader, setLoader] = useState(false);
  const [InterestListData, setInterestListData] = useState([]);
  const [renderedData, setRenderData] = useState(InterestListData);
  const [newServiceArray, setNewService] = useState([]);
  const [modalVisibleLogout, setModalVisibleLogout] = useState(false);
  const [Interest, setInterest] = useState("");

  const onSelectService = (id, selected, index, item) => {
    if (selected) {
      if (!newServiceArray.includes(item.name)) {
        newServiceArray.push(item.name);
      }
    } else {
      newServiceArray.splice(newServiceArray.indexOf(item.name), 1);

    }
  };

  const onPressHandler = (id) => {
    let renderDa = [...renderedData];
    for (let data of renderDa) {
      if (data._id == id) {
        data.selected = data.selected == null ? true : !data.selected;
        break;
      }
    }
    setRenderData(renderDa);
  };

  useEffect(() => {
    ListInterestApi();
    const unsubscribe = props.navigation.addListener("focus", () => {
      ListInterestApi();
    });
    return unsubscribe;
  }, [props]);

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          onPressHandler(item._id),
            onSelectService(item._id, item.selected, index, item);
        }}
        style={
          item.selected == true
            ? {
              padding: 10,
              borderRadius: 5,
              backgroundColor: "#EC167F",
              margin: 4,
            }
            : {
              padding: 10,
              borderRadius: 5,
              // backgroundColor: "#a1a1a1",
            }
        }
      >
        <Text style={{ color: COLOR.GREY }}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  const renderSelected = ({ item,index }) => {
    return (
      <View
        style={{
          padding: 10,
          borderRadius: 5,
          backgroundColor: "#EC167F",
          margin: 4,
          flexDirection:'row',
          alignItems:'center'
        }}
        key={index}
      >
        <Text
          style={{
            color: "#fff",
            marginRight:10
          }}
        >{item}</Text>
      </View>
    );
  };

  // ********** Interest List Api **********
  const ListInterestApi = async () => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");

    setLoader(true);
    console.log(ListOfInterestUrl)
    axios({
      method: "get",
      url: ListOfInterestUrl,
      params: {
        limit: 50,
        page: 1,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          console.log("==== Interest List Response ====", response);
          setInterestListData(response?.data?.result?.docs);
          setRenderData(response?.data?.result?.docs);
          setLoader(false);
        } else {
          alert("Something went wrong.");
          setLoader(false);
        }
      })
      .catch((err) => {
        console.log("==== Interest List Catch err ====", err);
        setLoader(false);
      });
    setLoader(false);
  };

  // *********** Add Interest Api ***********
  const AddInterestApi = async () => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");

    setLoader(true);
    axios({
      method: "put",
      url: AddInterestApiUrl,
      data: {
        interest: newServiceArray,
      },
      headers: {
        token: value,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          setInterest(null);
          console.log("======Add Interest Api Response ======", response);
          showMessage({
            message: response?.data?.responseMessage,
            type: "success",
            icon: "success",
            textStyle: {
              fontFamily: "Montserrat-Medium",
              fontSize: height / 55,
            },
            style: {
              width: Platform.OS === "android" ? width * 0.92 : null,
              borderRadius: Platform.OS === "android" ? 5 : null,
              margin: Platform.OS === "android" ? 15 : null,
              alignItems: Platform.OS === "android" ? "center" : null,
            },
          });
          props.navigation.goBack();
          setLoader(false);
        } else {
          alert("Something went wrong.");
          setLoader(false);
        }
      })
      .catch((err) => {
        const message = err.response?.data?.responseMessage || "Something went wrong.";
        showMessage({
          message: message,
          type: "danger",
          icon: "danger",
        })

        setLoader(false);
      });
  };

  return (
    <SafeAreaView>
      {
        loader ? <Progressdialog /> : null
      }
      <View style={styles.headerView}>
        <AuthHeader
          backIcon={true}
          onBackPress={() => props.navigation.goBack()}
          Title={true}
          HeaderTitle="Interest"
          headerTitle={{ marginLeft: height * 0.02 }}
          titleStyling={{ width: width * 0.6, alignItems: "flex-start" }}
        />
      </View>

      <View style={styles.MainContainer}>
        {/* *********** Header Description *********** */}
        <View style={styles.middleView}>
          <Text style={styles.startedTxt}>Get to know you better Started</Text>
          <Text style={styles.createTxt}>
            Select at least 3 and based on that we
          </Text>
          <Text style={styles.createTxt}>
            will be shown relevant content creators
          </Text>
        </View>

        {/* *********** Text Description *********** */}
        <View style={styles.BtnContainer}>
          <TouchableOpacity
            onPress={() => setModalVisibleLogout(true)}
            style={styles.AddInterestTxtTouch}
          >
            <View style={styles.DropAndTextContainer}>
              <Text
                style={[
                  styles.startedTxt,
                  {
                    fontSize: height / 55,
                    marginLeft: height * 0.014,
                    color: COLOR.GREY,
                  },
                ]}
              >
                Add your interest
              </Text>
              <Image
                source={ImagePath.DROPING}
                resizeMode="contain"
                style={{
                  height: height * 0.05,
                  width: width * 0.1,
                  tintColor: COLOR.GREY,
                }}
              />
            </View>
          </TouchableOpacity>


          {newServiceArray.length > 0 ? (
            <View style={styles.ListContainer}>
              {/* <FlatList data={newServiceArray}
                renderItem={renderSelected}
                showsVerticalScrollIndicator={false}
                // numColumns={3}
              /> */}
              {
                newServiceArray.length>0 && newServiceArray.map((item,index)=>{
                  return(renderSelected({item,index}))
                })
              }
            </View>
          ) : (
            <View></View>
          )}
        </View>
        
        <View style={{marginLeft:25, }} >
          <Text style={{fontFamily:'Montserrat-Medium', fontSize: normalize(16), color:'white', }}>Your Interests:</Text>
          <View style={{flexDirection:'row', flexWrap:'wrap'}}>
            {props?.route?.params?.Interests.map((item)=>{
              return (
                  <Text style={{fontFamily:'Montserrat-Medium', fontSize: normalize(14), color:'white', backgroundColor:COLOR.BUTTON_PINK, padding:5, borderRadius:8, width:'20%', textAlign:'center', margin:5 }}>{item}</Text>
              )
            })}
          </View>
        </View> 

        {/* *********** Get Start Button Description *********** */}
        <View style={styles.SignUpBtnContainer}>
          {newServiceArray.length === 0 ? (
            <AppButton
              title="Add Interest"
              type="large"
              disabled
              textStyle={{
                fontFamily: "Montserrat-SemiBold",
              }}
              ButtonPress={() => AddInterestApi()}
            />
          ) : (
            <AppButton
              title="Add Interest"
              type="large"
              textStyle={{
                fontFamily: "Montserrat-SemiBold",
              }}
              ButtonPress={() => AddInterestApi()}
            />
          )}
        </View>
      </View>

      {/* ************ Interest List Modal ************ */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleLogout}
        onRequestClose={() => {
          setModalVisibleLogout(!modalVisibleLogout);
        }}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setModalVisibleLogout(!modalVisibleLogout)}
          style={styles.LogoutmainContainer}
        >
          <View style={styles.LogoutModalSubContainer}>
            <View style={styles.LogoutHeadingContainer}>
              <FlatList
                data={renderedData}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
              // extraData={renderedData}
              />
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

export default GetToKnow;

const styles = StyleSheet.create({
  headerView: {
    marginTop: height * 0.02,
    flexDirection: "row",
    height: height * 0.08,
    width: width * 0.7,
    alignItems: "center",
    justifyContent: "space-between",
  },
  MainContainer: {
    height: height * 1.14,
    width: width * 1,
    backgroundColor: COLOR.BLACK,
  },
  middleView: {
    height: height * 0.23,
    width: width * 1,
    justifyContent: "center",
    alignItems: "center",
  },
  startedTxt: {
    fontSize: height / 42,
    color: "#696969",
    fontFamily: "Montserrat-Medium",
  },
  createTxt: {
    fontSize: height / 56,
    marginTop: height * 0.01,
    color: "#696969",
    fontFamily: "Montserrat-Medium",
  },
  DetailsTabContainer: {
    height: 50,
    width: width * 0.29,
    alignItems: "center",
    justifyContent: "center",
  },
  BtnContainer: {
    alignItems: "center",
    // height: height * 0.08,
    height: height * 0.35,
    width: width * 1,
  },
  SignUpBtnContainer: {
    height: height * 0.14,
    width: width * 0.9,
    justifyContent: "flex-end",
    alignSelf: "center",
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3ca897",
  },
  textInput: {
    height: 40,
    borderColor: "white",
    borderWidth: 1,
    marginTop: 8,
    borderRadius: 5,
    padding: 3,
  },
  tag: {
    backgroundColor: COLOR.WHITE,
  },
  tagText: {
    color: COLOR.BLACK,
    fontFamily: "Montserrat-Regular",
    fontSize: height / 50,
  },
  InputFieldContainer: {
    backgroundColor: COLOR.TXT_INPT_COLOR,
    color: COLOR.WHITE,
    borderRadius: scale(10),
    justifyContent: "center",
    width: width * 0.9,
    height: height * 0.1,
  },

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
    marginTop: height * 0.12,
  },
  LogoutHeadingContainer: {
    height: height * 0.28,
    width: width * 0.9,
    backgroundColor: COLOR.TXT_INPT_COLOR,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
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
  AddInterestTxtTouch: {
    backgroundColor: COLOR.TXT_INPT_COLOR,
    color: COLOR.WHITE,
    borderRadius: scale(10),
    justifyContent: "center",
    width: width * 0.9,
    height: height * 0.081,
  },
  DropAndTextContainer: {
    borderRadius: scale(10),
    justifyContent: "space-between",
    alignItems: "center",
    height: height * 0.08,
    width: width * 0.9,
    backgroundColor: COLOR.TXT_INPT_COLOR,
    flexDirection: "row",
  },
  ListContainer: {
    borderRadius: scale(10),
    width: width * 0.9,
    alignItems: "center",
    // height: height * 0.25,
    marginTop: height * 0.02,
    padding: 5,
    backgroundColor: COLOR.TXT_INPT_COLOR,
    flexDirection: "row",
    flexWrap:"wrap",

  },
});
