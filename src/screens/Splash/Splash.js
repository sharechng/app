import React, { useState, useEffect } from "react";
import { Dimensions, View, Image } from "react-native";
import { ImagePath } from "../../constants/ImagePath";
const { height, width } = Dimensions.get("window");

import Styles from "./Styles";

const Splash = (props) => {
  const [isVisible, setisVisible] = useState(true);

  useEffect(() => {
    setTimeout(function () {
      props.navigation.navigate("Login");
      setisVisible(false);
    }, 3000);
  }, []);

  return (
    <View style={Styles.MainContainer}>
      <Image
        source={ImagePath.APP_LOGO}
        resizeMode="contain"
        style={Styles.ImgStyling}
      />
    </View>
  );
};

export default Splash;
