import React, {useState, useRef, useEffect} from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  View,
  TouchableOpacity,
  TextInput,
  Text,
  Platform,
} from 'react-native';

import Styles from './Styles';
import {ImagePath} from '../../constants/ImagePath';
import {verticalScale} from 'react-native-size-matters';
import QRCodeScanner from 'react-native-qrcode-scanner';
import ProfileHeader from '../../components/CustomHeader/ProfileHeader';
import {COLOR} from '../../Utils/Colors';
import AppButton from '../../components/CustomButton/CustomButton';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  AdminFeeListUrl,
  GetBalanceUrl,
  WithdrawBalanceUrl,
} from '../../restAPI/ApiConfig';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CustomLoader from '../../components/CustomLoader/CustomLoader';
import {showMessage} from 'react-native-flash-message';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Clipboard from '@react-native-community/clipboard';
const {height, width} = Dimensions.get('window');

const SendWallet = props => {
  const [loader, setLoader] = useState(false);
  const [amount, setAmount] = useState('');
  const [amountError, setAmountError] = useState(null);
  const [UserBalance, setUserBalance] = useState({});
  const [FeeListFromAdmin, setFeeListFromAdmin] = useState(0);
  const [walletAdd, setwalletAdd] = useState('')
  const [walletAddError, setwalletAddError] = useState(null)

  // ****** Scanner Functions ******
  // const scanner = useRef();
  // const onSuccess = (add) => {
  //   setWalletAddress(add);
  // };

  // ****** Paste Functions ******
  // const PasteAdd = async () => {
  //   const text = await Clipboard.getString();
  //   setWalletAddress(text);
  //   showMessage({
  //     message: "Paste",
  //     type: "success",
  //     icon: "success",
  //     textStyle: {
  //       fontFamily: "Montserrat-Medium",
  //       fontSize: height / 55,
  //     },
  //     style: {
  //       width: Platform.OS === "android" ? width * 0.92 : null,
  //       borderRadius: Platform.OS === "android" ? 5 : null,
  //       margin: Platform.OS === "android" ? 15 : null,
  //       alignItems: Platform.OS === "android" ? "center" : null,
  //     },
  //   });
  // };

  // const copyAddress = () => {
  //   Clipboard.setString(UserBalance.address);
  //   showMessage({
  //     message: 'Address copied successfully',
  //     type: 'success',
  //     icon: 'success',
  //     duration: 3000,
  //   });
  // };

  // useEffect(() => {
  //   return () => {
  //     scanner.current.reactivate();
  //   };
  // }, []);

  useEffect(() => {
    GetBalanceApi();
    FeeListApi();
  }, []);

  // ************ Get Balance Api Integration ************
  const GetBalanceApi = async () => {
    const value = await AsyncStorage.getItem('token' || 'socaltoken');

    axios({
      method: 'get',
      url: GetBalanceUrl,
      headers: {token: value},
    })
      .then(async response => {
        if (response.data.responseCode === 200) {
          console.log(response?.data?.result.address, '>>>');
          setUserBalance(response?.data?.result);
        } else {
          alert('Something went wrong.');
        }
      })
      .catch(err => {
        console.log('==== Get Balance Catch err ====', err);
      });
  };

  const isAmountEntered = txt => {
    if (txt) {
      if (txt < UserBalance.bnbBalace) {
        if(txt>Number(FeeListFromAdmin)){
          setAmountError(null);
          return true;
        }
        else{
          setAmountError(`Cannot withdraw less than ${Number(FeeListFromAdmin)+1}!`);
          return false;
        }
      } else {
        setAmountError('Not sufficient balance!');
        return false;
      }
    } else {
      setAmountError('Please enter amount!');
      return false;
    }
  };

  const isAddressEntered = (txt) => {
    console.log(txt == UserBalance.address, 'txt');
    if(txt!=''){
      if(txt != UserBalance.address) {
        setwalletAddError(null);
        return true;
      }
      else{
        setwalletAddError("Wallet address must be someone else's");
        return false;
      }
    }
    else{
      setwalletAddError('Please enter wallet address');
      return false;
    }
  }

  // ************ Get Balance Api Integration ************
  const FeeListApi = async () => {
    setLoader(true);
    axios({
      method: 'get',
      url: AdminFeeListUrl,
    })
      .then(async response => {
        setLoader(false);
        if (response.data.responseCode === 200) {
          
          setFeeListFromAdmin(response?.data?.result.filter((item, index) => item.type === 'WITHDRAW_TOKEN')[0].amount);
        } else {
          alert('Something went wrong.');
        }
      })
      .catch(err => {
        console.log('==== Get FeeList Catch err ====', err);
        setLoader(false);
      });
  };

  // ************ Withdraw Balance Api ************
  const WithdrawApi = async () => {
    const value = await AsyncStorage.getItem('token' || 'socaltoken');

    const DATA = new FormData();
    DATA.append({
      walletAddress: walletAdd,
      amount: amount,
    });

    setLoader(true);
    axios({
      method: 'post',
      url: WithdrawBalanceUrl,
      data: DATA?._parts[0][0],
      headers: {
        token: value,
      },
    })
      .then(async response => {
        if (response.data.responseCode === 200) {
          showMessage({
            message: response.data.responseMessage,
            type: 'success',
            icon: 'success',
            textStyle: {
              fontFamily: 'Montserrat-Medium',
              fontSize: height / 55,
            },
            style: {
              width: Platform.OS === 'android' ? width * 0.92 : null,
              borderRadius: Platform.OS === 'android' ? 5 : null,
              margin: Platform.OS === 'android' ? 15 : null,
              alignItems: Platform.OS === 'android' ? 'center' : null,
            },
          });
          props.navigation.navigate('Wallet');
          setLoader(false);
        } else {
          alert('Something went wrong.');
          setLoader(false);
        }
      })

      .catch(err => {
        if (err.response.data.responseCode === 401 || 404 || 409) {
          showMessage({
            message: err.response.data.responseMessage,
            type: 'danger',
            icon: 'danger',
            textStyle: {
              fontFamily: 'Montserrat-Medium',
              fontSize: height / 55,
            },
            style: {
              width: Platform.OS === 'android' ? width * 0.92 : null,
              borderRadius: Platform.OS === 'android' ? 5 : null,
              margin: Platform.OS === 'android' ? 15 : null,
              alignItems: Platform.OS === 'android' ? 'center' : null,
            },
          });
          setLoader(false);
        } else {
          alert('Something went wrong.');
          setLoader(false);
        }
        setLoader(false);
      });
  };

  return (
    <SafeAreaView>
      {/* ************ Header Container ************ */}
      <ProfileHeader
        Title={true}
        HeaderTitle="Withdraw"
        // titleStyling={{ alignItems: "center", width: width * 0.7 }}
        titleStyling={{width: width * 0.7}}
        HeaderTxtStyling={{marginLeft: height * 0.04}}
        BackIcon={true}
        onBackPress={() => props.navigation.goBack()}
        BackIconStyling={{marginLeft: verticalScale(10)}}
        PostIcon={false}
        Menu={false}
        ShareIcon={false}
        ShareClick={() => ShareMessage()}
      />

      <KeyboardAwareScrollView style={{height: height * 0.9}}>
        <View style={Styles.MainContainer}>
          {/* ************ QR  Scanner Container ************ */}
          <View style={Styles.QRMainContainer}>
            {/* <QRCodeScanner
              onRead={(e) => onSuccess(e.data)}
              ref={scanner}
              // flashMode={RNCamera.Constants.FlashMode.torch}
              cameraStyle={{
                width: width * 0.76, // 0.72
                paddingLeft: height * 0.07,
                // height: height * 0.25,
                marginLeft: verticalScale(40),
              }}
              bottomContent={
                <View style={Styles.BottomSheetContainer}>
                  <View style={Styles.BottomSubContainer}>
                    ************ Address Input Field ************
                    <View style={Styles.TxtInptCopyContainer}>
                      <TextInput
                        style={[Styles.InputAddressStyling]}
                        placeholder="Enter the Wallet Address"
                        placeholderTextColor="rgba(158, 158, 158, 1)"
                        // multiline={true}
                        searchIcon={false}
                        returnType={"done"}
                        value={walletAddress}
                        onChangeText={(text) => setWalletAddress(text)}
                      />

                      {!walletAddress ? (
                        <TouchableOpacity style={[Styles.copyIconContainer]} onPress={() => PasteAdd()}>
                            <Image
                              source={ImagePath.COPY_ICON}
                              style={{
                                height: 18,
                                width: 18,
                                tintColor: COLOR.WHITE,
                              }}
                            />
                        </TouchableOpacity>
                      ) : null}
                    </View>
                  </View>

                  ************ Heading Container ************
                  <View style={Styles.COnfirmationTxtContainer}>
                    <Text style={Styles.Confirmationtxt}>
                      Balance : {UserBalance?.bnbBalace} SHARE
                    </Text>
                  </View>

                  ************ Amount Input Field ************
                  <View style={Styles.AmountMainView}>
                    <View style={Styles.AmountInputFieldContainer}>
                      <TextInput
                        style={Styles.InputAmountStyling}
                        placeholder="Enter The Amount"
                        placeholderTextColor="rgba(158, 158, 158, 1)"
                        keyboardType="numeric"
                        searchIcon={false}
                        returnType={"done"}
                        onChangeText={(text) => setAmount(text)}
                      />
                    </View>
                  </View>
                  {amount > UserBalance?.bnbBalace ? (
                    <View style={Styles.AlertAmount}>
                      <Text numberOfLines={2} style={Styles.AlertAmountTxt}>
                        *You don’t have the sufficient amount in your wallet
                      </Text>
                    </View>
                  ) : null}

                  <View style={Styles.COnfirmationTxtContainer}>
                    <Text style={Styles.Confirmationtxt}>
                      Transaction Fees :{" "}
                      {amount
                        ? FeeListFromAdmin[0]?.fee * amount ? FeeListFromAdmin[0]?.fee * amount : "0"
                        : FeeListFromAdmin[0]?.fee ? FeeListFromAdmin[0]?.fee : "0"}{" "}
                      {FeeListFromAdmin[0]?.coinName}
                    </Text>
                  </View>

                  *************** Submit Button ***************
                  <View style={Styles.BtnContainer}>
                    {loader ? (
                      <CustomLoader />
                    ) : (
                      <>
                        {amount &&
                          amount < UserBalance?.bnbBalace &&
                          walletAddress ? (
                          <AppButton
                            title="Withdraw"
                            type="large"
                            ButtonPress={() => WithdrawApi()}
                            textStyle={{
                              fontFamily: "Montserrat-SemiBold",
                            }}
                          />
                        ) : (
                          <AppButton
                            title="Withdraw"
                            type="large"
                            disabled
                            ButtonPress={() => WithdrawApi()}
                            textStyle={{
                              fontFamily: "Montserrat-SemiBold",
                            }}
                          />
                        )}
                      </>
                    )}
                  </View>
                </View>
              }
            /> */}
            <Text
              style={{
                color: 'white',
                fontFamily: 'Montserrat-Regular',
                fontSize: 16,
              }}>
              Choose amount to withdraw
            </Text>
            <Text
              style={{
                color: 'white',
                marginTop: '10%',
                fontFamily: 'Montserrat-Regular',
                fontSize: 16,
                alignSelf: 'flex-end',
                marginRight: '7%',
              }}>
              Wallet Balance: {UserBalance.bnbBalace}
            </Text>
            <TextInput
              placeholder="0"
              placeholderTextColor={'grey'}
              keyboardType={'number-pad'}
              value={amount}
              style={{
                backgroundColor: '#242526',
                width: width * 0.9,
                borderRadius: 8,
                padding: 15,
                fontFamily: 'Montserrat-Regular',
                color: 'white',
                fontSize: 16,
              }}
              onChangeText={txt => {
                setAmount(txt), isAmountEntered(txt);
              }}
            />
            {amountError && (
              <Text
                style={{
                  color: 'red',
                  fontFamily: 'Montserrat-Regular',
                  fontSize: 14,
                  alignSelf: 'flex-start',
                  marginLeft: '7%',
                }}>
                *{amountError}
              </Text>
            )}
            <View
              style={{
                backgroundColor: '#242526',
                width: width * 0.9,
                marginTop: '5%',
                borderRadius: 8,
                padding: 15,
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 10,
                justifyContent: 'space-between',
              }}>
              <TextInput
                placeholder="Wallet address"
                placeholderTextColor={'grey'}
                value={walletAdd}
                style={{
                  fontFamily: 'Montserrat-Regular',
                  color: 'white',
                  fontSize: 16,
                  width: width * 0.75,
                }}
                onChangeText={(txt)=>{
                  setwalletAdd(txt), isAddressEntered(txt)
                }}
              />
              {/* <TouchableOpacity
                onPress={() => {
                  copyAddress();
                }}>
                <MaterialCommunityIcons
                name="content-copy"
                color={'white'}
                size={20}
                />
              </TouchableOpacity> */}
            </View>
            {walletAddError && <Text style={{color: 'red',
                fontFamily: 'Montserrat-Regular',
                fontSize: 14,
                alignSelf: 'flex-start',
                marginLeft: '7%'}}>*{walletAddError}</Text>}
              <Text
              style={{
                color: 'white',
                fontSize: 14,
                alignSelf: 'flex-start',
                marginLeft: '6%',
                marginTop: '5%',

              }}
              >Min withdraw amount: {Number(FeeListFromAdmin)+1||0} </Text>
            <View style={{marginTop:'5%'}}>
              <AppButton
                title="Withdraw"
                type="large"
                ButtonPress={() => {console.log(walletAddError),((isAmountEntered(amount) && isAddressEntered(walletAdd)) ? WithdrawApi() : isAddressEntered(walletAdd))}}
                textStyle={{
                  fontFamily: 'Montserrat-SemiBold',
                }}
              />
            </View>
          </View>
        </View>
        <View style={Styles.BlankContainer} />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default SendWallet;
