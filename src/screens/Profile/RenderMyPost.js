import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native'
import React, { useState } from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'

import Styles from "./Styles";
import { ImagePath } from "../../constants/ImagePath";
import { COLOR } from "../../Utils/Colors";
const { width, height } = Dimensions.get("window");
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import { useEffect } from 'react'
import CountDown from "react-native-countdown-component";
import moment from 'moment'


const RenderMyPost = ({ item, navigation, likeDislikePostFunction, likeDislikePost, index, props }) => {
    const [visible, setVisible] = useState(false);
    const [Editoptionvisible, setEditoptionvisible] = useState(false);
    const [timervalues, settimervalues] = useState(0)
    useEffect(() => {


        settimervalues(0)
        setEditoptionvisible(false)
        const date = moment(item.createdAt);
        const now = moment();
        const diff = now.diff(date, "seconds");
        //minutes is >15

        if (diff > 900) {

            setEditoptionvisible(true);
        } else {

            const time_ = (900 - diff) 
            settimervalues(time_)
            setEditoptionvisible(false);
        }

    }, [item, props.navigation])

    return (
        <>

            <TouchableOpacity
                style={[Styles.flatlistcontainer, { height: Editoptionvisible ? height * 0.3 : height * 0.34 }]}
                onPress={() => navigation.navigate("Resale", { _id: item?._id })}
            >

                <View style={Styles.profileimageview}>
                    {item?.mediaUrl ? (
                        <Image source={{ uri: item?.mediaUrl }} style={Styles.Nftimg} />
                    ) : (
                        <Image
                            style={Styles.Nftimg}
                            source={ImagePath.COLLECTIONS_PICTURES}
                        />
                    )}
                </View>

                <View style={Styles.flatlistmidcontainer}>
                    <View style={Styles.profilenameview}>
                        {item?.userId?.profilePic ? (
                            <Image
                                style={{
                                    height: 25,
                                    width: 25,
                                    borderRadius: 25 / 2,
                                }}
                                source={{ uri: item?.userId?.profilePic }}
                            />
                        ) : (
                            <Image
                                style={{ height: 25, width: 25, resizeMode: "contain" }}
                                source={ImagePath.PROFILE_PIC}
                            />
                        )}

                        <Text style={Styles.usernameTxt}>
                            {item?.userId?.userName || item?.userId?.userName}
                        </Text>
                        {/* <Text style={Styles.usernameTxt}>{item?.postTitle}</Text> */}
                    </View>
                    <TouchableOpacity onPress={() => likeDislikePostFunction(item._id, index)}>
                        {
                            likeDislikePost[index] ?
                                //user liked
                                <FontAwesome name="heart" color={COLOR.BUTTON_PINK} size={15} /> :
                                //user not yet liked
                                <FontAwesome name="heart-o" color={'white'} size={15} />
                        }
                    </TouchableOpacity>
                </View>

                <View style={Styles.flatlistmiddleview}>
                    <View style={Styles.collectioview}>
                        <View
                            style={{
                                width: width * 0.34,
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                        >
                            <Image
                                source={ImagePath.APP_ICON}
                                style={{ height: 12, width: 12 }}
                            />
                            <Text style={[Styles.ethTxt, { marginLeft: height * 0.006 }]}>
                                {item?.amount ? item?.amount : "0.00"} SHARE
                            </Text>
                        </View>
                        <View
                            style={{
                                alignSelf: 'flex-end',
                                marginRight: '3%',
                            }}
                        >

                            <Menu
                                visible={visible}
                                style={{
                                    alignSelf: 'flex-end',
                                }}
                                anchor={<TouchableOpacity
                                    onPress={() => {
                                        //   showMenu()
                                        setVisible(true)
                                    }}
                                    style={{
                                        alignSelf: 'flex-end',
                                    }}
                                >
                                    <Entypo name="dots-three-vertical" size={12} color="#fff" style={{ marginLeft: '5%' }} />
                                </TouchableOpacity>}
                                onRequestClose={() => {
                                    setVisible(false)
                                }}
                            >
                                {!Editoptionvisible && <MenuItem onPress={() => {
                                    setVisible(false)
                                    navigation.navigate("CreatePost", {
                                        item: item,
                                        type: 'edit'

                                    })

                                }}>Edit</MenuItem>}
                                {<MenuDivider />}
                                <MenuItem onPress={() => {
                                    setVisible(false)
                                    navigation.navigate("exportnft", { _id: item?._id })
                                }}>Export NFT</MenuItem>
                            </Menu>
                        </View>
                        {/* <TouchableOpacity
                            onPress={() => {
                                navigation.navigate("exportnft", { _id: item?._id })

                            }}
                        >

                            <AntDesign
                                name="export"
                                color={COLOR.BUTTON_PINK}
                                size={20}

                            />
                        </TouchableOpacity> */}

                    </View>
                </View>
                {!Editoptionvisible && <View
                    style={{
                        flexDirection: "row",
                        width: "90%",
                        alignSelf: 'center',
                        alignItems: 'center'

                    }}
                >

                    <Text style={{
                        color: 'white',
                        fontSize: 14,

                    }}>Edit in</Text>
                    {timervalues > 0 && <CountDown
                        until={timervalues}
                        size={10}
                        onFinish={() => {
                            setEditoptionvisible(true)
                            settimervalues(0)


                        }}
                        digitStyle={{ backgroundColor: COLOR.BACKGROUND_THEME }}
                        digitTxtStyle={{ color: COLOR.GREY, fontSize: height / 60 }}
                        separatorStyle={{ color: COLOR.GREY, fontSize: height / 60 }}
                        timeToShow={["M", "S"]}
                        timeLabels={{ m: "", s: "" }}
                        showSeparator
                        style={{
                            // marginTop: height * 0.03,
                            marginLeft: 5
                        }}
                    />}

                </View>
                }

            </TouchableOpacity>
        </>
    )
}

export default RenderMyPost