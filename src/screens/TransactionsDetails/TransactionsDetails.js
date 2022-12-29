import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import Styles from "./Styles";
import ProfileHeader from "../../components/CustomHeader/ProfileHeader";
import { verticalScale } from "react-native-size-matters";
import axios from "axios";
import moment from "moment";
import { ViewTransactionDetailsUrl } from "../../restAPI/ApiConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLOR } from "../../Utils/Colors";
import CustomLoader from "../../components/CustomLoader/CustomLoader";
const { height, width } = Dimensions.get("window");

const TransactionsDetails = (props) => {
  const [loader, setLoader] = useState(false);
  const [TransactionId, setTransactionId] = useState(
    props?.route?.params?.TransactionsId
  );
  const [TransactionDetails, setTransactionDetails] = useState({});

  useEffect(() => {
    TransactionDetailsViewApi();
  }, [props.route]);

  // ************ Transaction Details Api ************
  const TransactionDetailsViewApi = async () => {
    const value = await AsyncStorage.getItem("token" || "socaltoken");

    setLoader(true);
    axios({
      method: "get",
      url: ViewTransactionDetailsUrl,
      params: {
        transactionId: TransactionId,
      },
      headers: {
        token: value,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          console.log("====== Transaction Details Response ======", response);
          setTransactionDetails(response?.data?.result);
          setLoader(false);
        } else {
          alert("Something went wrong.");
          setLoader(false);
        }
      })
      .catch((err) =>
        console.log("==== Transaction Details Catch Error ====", err)
      );
  };

  return (
    <SafeAreaView>
      <ProfileHeader
        BackIcon={true}
        Title={true}
        HeaderTitle="Transaction Details"
        titleStyling={{ width: width * 0.7 }}
        onBackPress={() => props.navigation.goBack()}
        HeaderTxtStyling={{ marginLeft: height * 0.04 }}
        BackIconStyling={{ marginLeft: verticalScale(10) }}
        PostIcon={false}
        Menu={false}
        ShareIcon={false}
      />
      {!loader ? (
        <View style={Styles.MainContainer}>
          {/* ************ Amount Text ************ */}
          <View style={Styles.AmountTxtContainer}>
            <Text style={Styles.AmountTxt}>Amount</Text>
          </View>

          {/* ************ Amount ************ */}
          <View style={Styles.AmountInptContainer}>
            <Text style={Styles.AmountInptTxt}>
              Rs {TransactionDetails?.amount}
            </Text>
          </View>

          {/* ************ Status ************ */}
          <View style={[Styles.StatusTxtContainer]}>
            <Image
              source={require("../../assets/check.png")}
              style={{ height: 20, width: 20 }}
            />
            <Text style={Styles.StatusTxt}>
              {TransactionDetails?.transactionStatus}
            </Text>
          </View>

          {/* ************ Description ************ */}

          {/* ************ Details ************ */}
          <View style={{ height: height * 0.05 }} />
          <View style={Styles.DetailsContainer}>
            <View style={Styles.DetailsSubContainer}>
              <View style={Styles.KeyView}>
                <Text style={Styles.KeyTxtView}>Transaction Status :</Text>
              </View>
              <View style={[Styles.KeyView]}>
                <Text
                  style={{
                    marginLeft: height * 0.01,
                    color:
                      TransactionDetails?.transactionStatus === "SUCCESS"
                        ? "green"
                        : "red",
                    fontFamily: "Montserrat-Medium",
                  }}
                >
                  {TransactionDetails?.transactionStatus}
                </Text>
              </View>
            </View>

            <View style={Styles.DetailsSubContainer}>
              <View style={Styles.KeyView}>
                <Text style={Styles.KeyTxtView}>Amount :</Text>
              </View>
              <View style={[Styles.KeyView]}>
                <Text
                  style={{
                    marginLeft: height * 0.01,
                    fontFamily: "Montserrat-Medium",
                    color: COLOR.WHITE,
                  }}
                >
                  {TransactionDetails?.amount}
                </Text>
              </View>
            </View>

            <View style={Styles.DetailsSubContainer}>
              <View style={Styles.KeyView}>
                <Text style={Styles.KeyTxtView}>Transaction Type :</Text>
              </View>
              <View style={[Styles.KeyView]}>
                <Text
                  style={{
                    marginLeft: height * 0.01,
                    fontFamily: "Montserrat-Medium",
                    color: COLOR.WHITE,
                  }}
                >
                  {TransactionDetails?.transactionType}
                </Text>
              </View>
            </View>

            <View style={Styles.DetailsSubContainer}>
              <View style={Styles.KeyView}>
                <Text style={Styles.KeyTxtView}>Date :</Text>
              </View>
              <View style={[Styles.KeyView]}>
                <Text
                  style={{
                    marginLeft: height * 0.01,
                    fontFamily: "Montserrat-Medium",
                    color: COLOR.WHITE,
                  }}
                >
                  {moment(TransactionDetails?.createdAt).format(
                    "DD-MM-YYYY, HH:MM"
                  )}
                </Text>
              </View>
            </View>

            <View style={Styles.DetailsSubContainer}>
              <View style={Styles.KeyView}>
                <Text style={Styles.KeyTxtView}>Coin Name :</Text>
              </View>
              <View style={[Styles.KeyView]}>
                <Text
                  style={{
                    marginLeft: height * 0.01,
                    fontFamily: "Montserrat-Medium",
                    color: COLOR.WHITE,
                  }}
                >
                  {TransactionDetails?.coinName
                    ? TransactionDetails?.coinName
                    : "SHARE"}
                </Text>
              </View>
            </View>
          </View>
        </View>
      ) : (
        <CustomLoader
          loaderStyling={{ height: height * 0.85, width: width * 1 }}
        />
      )}
    </SafeAreaView>
  );
};

export default TransactionsDetails;
