import React, { useContext, useEffect, useState,useRef,useReducer } from "react";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const { height, width } = Dimensions.get("window");

import { ImagePath } from "../constants/ImagePath";

import Home from "../screens/Home/Home";
import Auctions from "../screens/Auctions/Auctions";
import Collections from "../screens/Collections/Collections";
import Profile from "../screens/Profile/Profile";

import { COLOR } from "../Utils/Colors";
import { scale } from "react-native-size-matters";
import { CollectionsStackScreen } from "./CollectionStack";
import DrawerRoutes from "./DrawerRoutes";
import Wallet from "../screens/Wallet/Wallet";
import Search from "../screens/Search/Search";
import VideoReels from "../screens/VideoReels/VideoReels";
import { AuthContext } from "../context/AuthContext";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Tab = createBottomTabNavigator();
const initialTodos = {
  hometype:'Threads'
}
const reducer = (state, action) => {
  switch (action.type) {
    case "CHNAGE":
      return {
        ...state,
        hometype:action.value
      }
    default:
      return state;
  }
};

const TabRoutes = (props) => {
  const [hometype, sethometype] = useReducer(reducer, initialTodos);
  const [active,setactive]=useState("Home")
  const prevValue = useRef('')
  const data = {
    "Threads": "Photos",
    "Photos": "Videos",
    "Videos": "Threads",
  }
  const icon = {
    "Threads": <View style={styles.TabImageContainer}>
      <Image
        source={ImagePath.EXPLORE_PINK}
        resizeMode="contain"
        style={styles.img}
      />
    </View>,
    "Photos": <FontAwesome name="photo" size={25} color="#E31A89" />,
    "Videos": <FontAwesome name="video-camera" size={25} color="#E31A89" />,
  }
  const deicon = {
    "Threads": <View style={styles.TabImageContainer}>
      <Image
        source={ImagePath.EXPLORE_WHITE}
        resizeMode="contain"
        style={styles.img}
      />
    </View>,
    "Photos": <FontAwesome name="photo" size={25} color="#fff" />,
    "Videos": <FontAwesome name="video-camera" size={25} color="#fff" />,
  }
  const getactivecollectiontype=async()=>{
    const tab=await AsyncStorage.getItem("activecollectiontype")
    if(tab){
      setTimeout(() => {
        sethometype({ type: "CHNAGE", value: tab })
      }, 1000);
    } 
  }
  useEffect(()=>{

    getactivecollectiontype()

  },[])
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        position: "absolute",
        tabBarStyle: {
          position: "absolute",
          height: height / 10,
          height: height * 0.09,
          backgroundColor: COLOR.TXT_INPT_COLOR,
          width: width,
          alignItems: "center",
          // borderTopLeftRadius: height / 30,
          // borderTopRightRadius: height / 30,
          borderColor: "red",
          borderTopWidth: 0,
          bottom: -height * 0.0,
        },
        tabBarHideOnKeyboard: true
      }}
    >
      {/* ************ Explore Tab ************ */}
      <Tab.Screen
        name="Explore"
        component={Home}
        // component={DrawerRoutes}
        options={{

          tabBarIcon: ({ focused, color, size }) =>
            focused ? (
              icon[hometype?.hometype]
            ) : (
              <View style={styles.TabImageContainer}>
                <Image
                  source={ImagePath.EXPLORE_WHITE}
                  resizeMode="contain"
                  style={styles.image}
                // style={{ height}}
                />
              </View>
            ),

        }}

        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            
            if(active=="Home"){
            // sethometype(data[hometype])
            sethometype({ type: "CHNAGE", value: data[hometype?.hometype] })
          }
          setactive("Home")
         
            
          }
        })}


      />
      {/* ************ Auctions Tab ************ */}
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ focused, color, size }) =>
            focused ? (
              <View style={styles.TabImageContainer}>
                <Image
                  source={ImagePath.TAB_SEARCH_PINK}
                  resizeMode="contain"
                  style={styles.img}
                />
              </View>
            ) : (
              <View style={styles.TabImageContainer}>
                <Image
                  source={ImagePath.TAB_SEARCH_WHITE}
                  resizeMode="contain"
                  style={styles.image}
                />
              </View>
            ),
        }}
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            setactive("search")
          }
        })}

      />


      {/* ************ Collections Tab ************ */}
      {/* <Tab.Screen
        name="VideoReels"
        // component={CollectionsStackScreen}
        component={VideoReels}
        options={{
          tabBarIcon: ({ focused, color, size }) =>
            focused ? (
              <View style={styles.TabImageContainer}>
                <Image
                  source={ImagePath.TAB_VIDEO_PINK}
                  resizeMode="contain"
                  style={styles.img}
                />
              </View>
            ) : (
              <View style={styles.TabImageContainer}>
                <Image
                  source={ImagePath.TAB_VIDEO_WHITE}
                  resizeMode="contain"
                  style={[styles.image]}
                />
              </View>
            ),
        }}
      /> */}

      {/* ************ Wallet Tab ************ */}
      <Tab.Screen
        name="Auctions"
        component={Auctions}
        options={{
          tabBarIcon: ({ focused, color, size }) =>
            focused ? (
              <View style={styles.TabImageContainer}>
                <Image
                  source={ImagePath.AUCTIONS_PINK}
                  resizeMode="contain"
                  style={[styles.img]}
                />
              </View>
            ) : (
              <View style={styles.TabImageContainer}>
                <Image
                  source={ImagePath.NEW_AUCTION_WHITE}
                  resizeMode="contain"
                  style={[styles.image]}
                />
              </View>
            ),
        }}
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            setactive("auction")
          }
        })}

      />

      {/* ************ Profile Tab ************ */}
      <Tab.Screen
        name="Profile"
        component={Profile}
        // component={EditProfile}
        options={{
          tabBarIcon: ({ focused, color, size }) =>
            focused ? (
              <View style={styles.TabImageContainer}>
                <Image
                  source={ImagePath.PROFILE_PINK}
                  resizeMode="contain"
                  style={[styles.img]}
                />
              </View>
            ) : (
              <View style={styles.TabImageContainer}>
                <Image
                  source={ImagePath.PROFILE_WHITE}
                  resizeMode="contain"
                  style={styles.image}
                />
              </View>
            ),
        }}
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            console.log(route)
            setactive("profile")
          }
        })}

      />
    </Tab.Navigator>
  );
};

export default TabRoutes;

const styles = StyleSheet.create({
  img: {
    height: height * 0.06,
    width: width * 0.06,
  },
  image: {
    height: height * 0.06,
    width: width * 0.06,
  },
  TabImageContainer: {
    height: height * 0.08,
    width: width * 0.2,
    justifyContent: "center",
    alignItems: "center",
  },
});
