import React, { useState } from "react";
import { View, Dimensions, StyleSheet, ActivityIndicator } from "react-native";
import { COLOR } from "../../Utils/Colors";
const { height, width } = Dimensions.get("screen");

const CustomLoader = (props) => {
  return (
    <View
      style={[styles.containerLoader, styles.horizontal, props.loaderStyling]}
    >
      <ActivityIndicator
        size="large"
        color={COLOR.WHITE}
        style={[props.loadingDesign]}
      />
    </View>
  );
};
export default CustomLoader;

const styles = StyleSheet.create({
  containerLoader: {
    // flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    // backgroundColor: "#000000",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    //  backgroundColor: "#000000",
  },
});
