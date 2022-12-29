import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Dimensions,
  TouchableOpacity,
  Switch,
} from "react-native";
import React, { useState } from "react";
import { ImagePath } from "../../../constants/ImagePath";
import { COLOR } from "../../Utils/Colors";
import AuthHeader from "../../components/CustomHeader/AuthHeader";
import { moderateScale } from "react-native-size-matters";
const { height, width } = Dimensions.get("window");

const NotificationsSettings = (props) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const [isEnabled1, setIsEnabled1] = useState(false);
  const toggleSwitch1 = () => setIsEnabled1((previousState) => !previousState);

  const [isEnabled2, setIsEnabled2] = useState(false);
  const toggleSwitch2 = () => setIsEnabled2((previousState) => !previousState);

  const [isEnabled3, setIsEnabled3] = useState(false);
  const toggleSwitch3 = () => setIsEnabled3((previousState) => !previousState);

  const [isEnabled4, setIsEnabled4] = useState(false);
  const toggleSwitch4 = () => setIsEnabled4((previousState) => !previousState);

  const [isEnabled5, setIsEnabled5] = useState(false);
  const toggleSwitch5 = () => setIsEnabled5((previousState) => !previousState);

  const [isEnabled6, setIsEnabled6] = useState(false);
  const toggleSwitch6 = () => setIsEnabled6((previousState) => !previousState);

  return (
    <SafeAreaView>
      <View style={styles.Maincontainer}>
        <View style={styles.headerView}>
          <AuthHeader
            backIcon={true}
            onBackPress={() => props.navigation.goBack()}
            Title={true}
            HeaderTitle="Notification Setting"
            titleStyling={{ width: width * 0.6, marginLeft: -moderateScale(3) }}
          />
        </View>
        <View style={styles.notificationcontainer}>
          <View style={styles.notificationview}>
            <Text style={styles.notiTxt}>Notification</Text>
          </View>
          <View style={styles.notierecieve}>
            <Text style={styles.notirecieveTxt}>
              what notification you recieve
            </Text>
          </View>
        </View>
        <View style={styles.ToggleView}>
          <View style={styles.likeview}>
            <Text style={styles.likeText}>Like</Text>
          </View>
          <View>
            <Switch
              onValueChange={toggleSwitch}
              value={isEnabled}
              trackColor={{ false: COLOR.GREY, true: COLOR.BUTTON_PINK }}
              thumbColor={isEnabled ? "#FFFF" : "#FFFF"}
            />
          </View>
        </View>
        <View style={styles.ToggleView}>
          <View style={styles.likeview}>
            <Text style={styles.likeText}>Comment</Text>
          </View>
          <View>
            <Switch
              onValueChange={toggleSwitch1}
              value={isEnabled1}
              trackColor={{ false: COLOR.GREY, true: COLOR.BUTTON_PINK }}
              thumbColor={isEnabled1 ? "#FFFF" : "#FFFF"}
            />
          </View>
        </View>
        <View style={styles.ToggleView}>
          <View style={styles.likeview}>
            <Text style={styles.likeText}>Mention</Text>
          </View>
          <View>
            <Switch
              onValueChange={toggleSwitch2}
              value={isEnabled2}
              trackColor={{ false: COLOR.GREY, true: COLOR.BUTTON_PINK }}
              thumbColor={isEnabled2 ? "#FFFF" : "#FFFF"}
            />
          </View>
        </View>
        <View style={styles.ToggleView}>
          <View style={styles.likeview}>
            <Text style={styles.likeText}>Post</Text>
          </View>
          <View>
            <Switch
              onValueChange={toggleSwitch3}
              value={isEnabled3}
              trackColor={{ false: COLOR.GREY, true: COLOR.BUTTON_PINK }}
              thumbColor={isEnabled3 ? "#FFFF" : "#FFFF"}
            />
          </View>
        </View>
        <View style={styles.ToggleView}>
          <View style={styles.likeview}>
            <Text style={styles.likeText}>Share</Text>
          </View>
          <View>
            <Switch
              onValueChange={toggleSwitch4}
              value={isEnabled4}
              trackColor={{ false: COLOR.GREY, true: COLOR.BUTTON_PINK }}
              thumbColor={isEnabled4 ? "#FFFF" : "#FFFF"}
            />
          </View>
        </View>
        <View style={styles.ToggleView}>
          <View style={styles.likeview}>
            <Text style={styles.likeText}>Follow</Text>
          </View>
          <View>
            <Switch
              onValueChange={toggleSwitch5}
              value={isEnabled5}
              trackColor={{ false: COLOR.GREY, true: COLOR.BUTTON_PINK }}
              thumbColor={isEnabled5 ? "#FFFF" : "#FFFF"}
            />
          </View>
        </View>
        <View style={styles.ToggleView}>
          <View style={styles.likeview}>
            <Text style={styles.likeText}>Event</Text>
          </View>
          <View>
            <Switch
              onValueChange={toggleSwitch6}
              value={isEnabled6}
              trackColor={{ false: COLOR.GREY, true: COLOR.BUTTON_PINK }}
              thumbColor={isEnabled6 ? "#FFFF" : "#FFFF"}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NotificationsSettings;

const styles = StyleSheet.create({
  Maincontainer: {
    height: height * 1,
    width: width * 1,
    // alignItems: "center",
    // backgroundColor: "red"
    backgroundColor: COLOR.BACKGROUND_THEME,
  },
  headerView: {
    marginTop: height * 0.02,
    flexDirection: "row",
    height: height * 0.08,
    width: width * 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  headercontainer: {
    height: height * 0.1,
    width: width * 0.9,
    // backgroundColor: "green",
    alignSelf: "center",
  },
  notificationcontainer: {
    height: height * 0.1,
    width: width * 0.9,
    // backgroundColor: "pink",
    alignSelf: "center",
  },
  notificationview: {
    height: height * 0.06,
    width: width * 0.7,
    // backgroundColor: "skyblue",
    justifyContent: "center",
    justifyContent: "center",
  },
  notierecieve: {
    height: height * 0.04,
    width: width * 0.7,
    // backgroundColor: "blue",
    justifyContent: "center",
  },
  notiTxt: {
    fontSize: height / 35,
    color: COLOR.TXT_COLOR,
    fontWeight: "600",
    // fontFamily: "Poppins"
  },
  notirecieveTxt: {
    fontSize: height / 45,
    color: COLOR.TXT_COLOR,
    // fontFamily: "Poppins"
  },
  ToggleView: {
    height: height * 0.08,
    width: width * 0.9,
    // backgroundColor: 'red',
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
  },
  likeText: {
    fontSize: height / 41,
    color: "#FFFFFF",
    // fontFamily: "Poppins",
  },
  likeview: {
    height: height * 0.05,
    width: width * 0.3,
    // backgroundColor: "green",
    justifyContent: "center",
  },
});
