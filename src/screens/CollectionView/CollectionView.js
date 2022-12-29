import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React, { useState, useEffect } from "react";

import Styles from "./Styles";
import AuthHeader from "../../components/CustomHeader/AuthHeader";
import { ImagePath } from "../../constants/ImagePath";
import { verticalScale } from "react-native-size-matters";
const { height, width } = Dimensions.get("window");
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CollectionView = (props) => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={Styles.MainContainer}>
          {/* ************ Header Container ************ */}
          <View style={Styles.headerView}>
            <AuthHeader
              backIcon={true}
              onBackPress={() => props.navigation.goBack()}
              AuthLogo={false}
            />
          </View>

          {/* ************ Image Container ************ */}
          <View style={Styles.ImageContainer}>
            <Image
              source={ImagePath.COLLECTION_VIEW_IMG}
              style={{ height: height * 0.42, width: width }}
              // resizeMode="contain"
            />
          </View>

          {/* ************ Profile Container ************ */}
          <View style={Styles.ProfileView}>
            <View style={Styles.PicNameContainer}>
              <View style={Styles.ProfilePicContainer}>
                <Image
                  source={ImagePath.COLLECTION_PROFILE}
                  resizeMode="contain"
                  style={{ height: 50, width: 50 }}
                />
              </View>
              <View style={Styles.ProfileNameContainer}>
                <Text style={Styles.ProfileNameTxt}>Zunda mochi</Text>
              </View>
            </View>

            <View style={Styles.DurationPrice}>
              <View
                style={[
                  Styles.DurationContainer,
                  { marginLeft: verticalScale(59) },
                ]}
              >
                <Text style={Styles.DurationTxt}>Duration: </Text>
                <Text style={Styles.DaysTxt}>60 Days</Text>
              </View>
              <View style={[Styles.DurationContainer, { width: width * 0.42 }]}>
                <Text style={Styles.DurationTxt}>Bundles Price: </Text>
                <Text style={Styles.DaysTxt}>0.004 SHARE</Text>
              </View>
            </View>

            {/* ************ Description Container ************ */}
            <View style={Styles.DescriptionContainer}>
              <View style={Styles.DetailsTxtView}>
                <Text style={Styles.DetailsTxt}>Details:</Text>
              </View>
              <View style={Styles.DescriptionTxtView}>
                <Text style={Styles.DesciptionTxt}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Tortor donec in dictumst luctus ipsum tempor. Id duis quisque
                  dolor vestibulum elit hendrerit ut lobortis. In tempus sapien
                  volutpat enim ac. Et sit quisque accumsan amet eget in
                  in.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Tortor donec in dictumst luctus ipsum tempor. Id duis quisque
                  dolor vestibulum elit hendrerit ut lobortis. In tempus sapien
                  volutpat enim ac. Et sit quisque accumsan amet eget in in.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CollectionView;
