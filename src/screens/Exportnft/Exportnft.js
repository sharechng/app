import { View, Text, TextInput, TouchableOpacity, Dimensions, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import AuthHeader from '../../components/CustomHeader/AuthHeader'
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';
import { showMessage } from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import qs from "querystring"
const width = Dimensions.get('window').width;


const Exportnft = (props) => {
    const [WalletAddress, setWalletAddress] = useState('')
    const [spinner, setspinner] = useState(false)
    const onPressExport = async () => {
        const token = await AsyncStorage.getItem('token')
        if (WalletAddress === '') {
            alert('Please enter wallet address')
        } else {
            setspinner(true)
            axios({
                method:"post",
                url: 'https://node.bitfuxi.co.uk/api/v1/nft/exportOnMarketPlace',
                headers:{
                    token:token,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data:qs.stringify( {
                    postId:props?.route?.params?._id,
                    walletAddress:WalletAddress
                })
            }).then((res) => {
                if(res.data.responseCode === 200){
                    showMessage({
                        message: res.data.responseMessage,
                        type: "success",
                    });
                    setspinner(false)
                    props.navigation.goBack()
                }else{
                    showMessage({
                        message: res.data.responseMessage,
                        type: "danger",
                    });
                    setspinner(false)
                }

            }).catch((err)=>{
                console.log(err.response)
                setspinner(false)
            
                const message=err?.response?.data?.responseMessage?err?.response?.data?.responseMessage:'Server is not available,Please try again later'
            showMessage({
                message: message,
                type: 'danger',
                icon: 'danger',
            })
            })

        }
    }
    return (
        <SafeAreaView
            style={{
                flex: 1,
                alignItems: 'center',
                backgroundColor: '#242526',
                // marginTo
            }}
        >
            <Spinner
                visible={spinner}
                textContent={'Please wait...'}
                textStyle={{ color: '#FFF' }}
            />
            <View style={{

            }}>
                <AuthHeader
                    backIcon={true}
                    onBackPress={() => props.navigation.goBack()}
                    Title={true}
                    HeaderTitle="Export NFT"
                    titleStyling={{ width: width * 0.65 }}
                />
            </View>
            <Text
                style={{
                    color: '#fff',
                    fontWeight: '500',
                    fontSize: 16,
                    textAlign: 'left',
                    width: '80%',
                    marginTop: '15%'




                }}
            >Wallet Address
            </Text>
            <TextInput
                value={WalletAddress}
                placeholder="Enter Wallet Address"
                placeholderTextColor="#ccc"
                onChangeText={(text) => setWalletAddress(text)}
                style={{
                    width: '80%',
                    height: 40,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: "#ccc",
                    marginTop: 10,
                    paddingLeft: '3%',
                    color: '#fff'

                }}

            />
            <TouchableOpacity
                style={{
                    width: '80%',
                    borderRadius: 10,
                    marginTop: "10%",
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#E31A89',
                    padding: 12
                }}
                onPress={onPressExport}
            >
                <Text
                    style={{
                        color: '#fff',
                        fontWeight: '700',
                        fontSize: 16,
                    }}
                >
                    Export
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default Exportnft