import React from "react";
import {
  Dimensions,
  SafeAreaView,
  Text,
  View,
  Image,
  ScrollView,
} from "react-native";
import Styles from "./Styles";
import AppButton from "../../components/CustomButton/CustomButton";
import { ImagePath } from "../../constants/ImagePath";
const { height, width } = Dimensions.get("window");

const Promotions = (props) => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={Styles.MainContainer}>
          {/* ************ Logo Container ************ */}
          <View style={Styles.LogoContainer}>
            <Image
              source={ImagePath.PROMOTIONS_BANNER}
              style={{ height: 378, width: 410 }}
              resizeMode="contain"
            />
          </View>

          {/* ************ Logo Description Container ************ */}
          <View style={Styles.TitleContainer}>
            <Text style={Styles.TitleTxt}>Okey Creator</Text>
            <Text style={Styles.TitleTxt}>Ready to get</Text>
            <Text style={Styles.TitleTxt}>attendees hyped?</Text>
          </View>

          {/* ************ SubHeader Container ************ */}
          <View style={Styles.SubHeaderContainer}>
            <Text
              style={[
                Styles.TitleTxt,
                { fontSize: height / 49, fontFamily: "Montserrat-SemiBold" },
              ]}
            >
              Anticipation builders
            </Text>
          </View>

          {/* ************ Points Container ************ */}
          <View style={Styles.PointsContainer}>
            <View style={Styles.PointAndTxtContaier}>
              <View style={Styles.CirclePointsContainer} />
              <Text style={Styles.CirclePointsTxt}>Event Updates</Text>
            </View>

            <View style={Styles.PointAndTxtContaier}>
              <View style={Styles.CirclePointsContainer}></View>
              <Text style={Styles.CirclePointsTxt}>Promotions of deals</Text>
            </View>

            <View style={Styles.PointAndTxtContaier}>
              <View style={Styles.CirclePointsContainer} />
              <Text style={Styles.CirclePointsTxt}>Behind-the scenes</Text>
            </View>
          </View>

          {/* ************ Button Container ************ */}
          <View style={Styles.BtnContainer}>
            <AppButton
              title="Yes, I'm ready"
              type="large"
              textStyle={{ fontFamily: "Montserrat-SemiBold" }}
              btnStyling={{ width: width * 0.91 }}
              ButtonPress={() => props.navigation.navigate("CreatePromotions")}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Promotions;
