import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from "react-native";
import React from "react";

import Styles from "./Styles";
import { ImagePath } from "../../constants/ImagePath";
import AuthHeader from "../../components/CustomHeader/AuthHeader";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
const { height, width } = Dimensions.get("window");

const TRANSACTION_HISTORY_LIST = [
  {
    transactionTypeImage: ImagePath.SEND_ICON,
    transactionTypeName: "Send",
    transactionAmountInETH: "$ 1,320 ETH",
    transactionAddress: "0x4200c90",
    transactionAmountInUSD: "$ 15,950.26 USD",
  },
  {
    transactionTypeImage: ImagePath.DEPOSIT_ICON,
    transactionTypeName: "Send",
    transactionAmountInETH: "$ 1,320 ETH",
    transactionAddress: "0x4200c90",
    transactionAmountInUSD: "$ 15,950.26 USD",
  },
  {
    transactionTypeImage: ImagePath.SEND_ICON,
    transactionTypeName: "Send",
    transactionAmountInETH: "$ 1,320 ETH",
    transactionAddress: "0x4200c90",
    transactionAmountInUSD: "$ 15,950.26 USD",
  },
  {
    transactionTypeImage: ImagePath.DEPOSIT_ICON,
    transactionTypeName: "Send",
    transactionAmountInETH: "$ 1,320 ETH",
    transactionAddress: "0x4200c90",
    transactionAmountInUSD: "$ 15,950.26 USD",
  },
  {
    transactionTypeImage: ImagePath.SEND_ICON,
    transactionTypeName: "Send",
    transactionAmountInETH: "$ 1,320 ETH",
    transactionAddress: "0x4200c90",
    transactionAmountInUSD: "$ 15,950.26 USD",
  },
  {
    transactionTypeImage: ImagePath.DEPOSIT_ICON,
    transactionTypeName: "Send",
    transactionAmountInETH: "$ 1,320 ETH",
    transactionAddress: "0x4200c90",
    transactionAmountInUSD: "$ 15,950.26 USD",
  },
  {
    transactionTypeImage: ImagePath.SEND_ICON,
    transactionTypeName: "Send",
    transactionAmountInETH: "$ 1,320 ETH",
    transactionAddress: "0x4200c90",
    transactionAmountInUSD: "$ 15,950.26 USD",
  },
  {
    transactionTypeImage: ImagePath.DEPOSIT_ICON,
    transactionTypeName: "Send",
    transactionAmountInETH: "$ 1,320 ETH",
    transactionAddress: "0x4200c90",
    transactionAmountInUSD: "$ 15,950.26 USD",
  },
];

const TransactionHistory = (props) => {
  const TransactionHistoryRenderItem = ({ item }) => {
    return (
      <View style={Styles.ListContainer}>
        <View style={Styles.ListContainerTwo}>
          <View style={Styles.TransactionImgContainer}>
            <Image
              source={item.transactionTypeImage}
              style={{ height: 45, width: 45 }}
            />
          </View>
          <View style={Styles.TransactionTypeContainer}>
            <Text style={Styles.TransactionTypeTxt}>
              {item.transactionTypeName}
            </Text>
            <Text style={Styles.TransactionAddUSDTxt}>
              {item.transactionAddress}
            </Text>
          </View>
          <View style={Styles.TransactionAmountContainer}>
            <Text
              style={[
                Styles.TransactionTypeTxt,
                { marginRight: moderateScale(10) },
              ]}
            >
              {item.transactionAmountInETH}
            </Text>
            <Text
              style={[
                Styles.TransactionAddUSDTxt,
                { marginRight: moderateScale(10) },
              ]}
            >
              {item.transactionAmountInUSD}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView>
      <View style={Styles.MainContainer}>
        <View style={Styles.headerView}>
          <AuthHeader
            backIcon={true}
            onBackPress={() => props.navigation.goBack()}
            Title={true}
            HeaderTitle="Transaction History"
            titleStyling={{ width: width * 0.6, marginLeft: -moderateScale(3) }}
          />
        </View>

        <View style={Styles.BlankContainer} />

        <View style={Styles.ListContainer}>
          <FlatList
            data={TRANSACTION_HISTORY_LIST}
            renderItem={TransactionHistoryRenderItem}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TransactionHistory;
