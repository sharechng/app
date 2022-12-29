import React, { useState } from "react";
import {
  TextInput,
  Dimensions,
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Appearance
} from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { COLOR } from "../../Utils/Colors";
const { height, width } = Dimensions.get("window");
import { Dropdown } from 'react-native-element-dropdown';
import { countryCode as Cnt } from "../../Utils/countryCode"

export default React.forwardRef((props, ref) => {
  const [dropdownwidth, setdropdownwidthwidth] = useState(80);
  const [countryCode_code, setcountryCode_code] = useState("+91");
  const [countryCode_image, setcountryCode_Image] = useState(require("../../assets/countryImages/in.png"));
  const [contrydata, setcontrydata] = useState(Cnt)

  const {
    keyboardType,
    maxLength,
    placeholderColor,
    value,
    multiline,
    onChangeText,
    placeholderTextColor,
    RightIcon,
    placeholder,
    containerStyle,
    editable,
    rightImg,
    LeftIcon,
    LeftIconTwo,
    leftImg,
    LeftCode,
    countryCode,
    CountryCode,
    CountryFlag,
    autoFocus,
  } = props;

  const renderItem_dropdown = (item) => {
    console.log('names',item.name);
    return (
      <View style={styles.item2}>
        <Image source={item.icon} style={styles.flag} />

        <Text style={styles.textItem}>{item.name}</Text>

      </View>
    );
  };
  return (
    <View style={containerStyle}>
      <View style={styles.MainContainer}>
        <View>
          {LeftIcon ? (
            <View style={styles.LeftIconContainer}>
              <Image
                source={leftImg}
                style={[styles.LeftImgView, props?.EmailIconStyle]}
              />
            </View>
          ) : null}

          {/* *************** Country Code *************** */}
          {countryCode ? (
            <View style={[styles.CountryCodeContainer, props?.CountryTheme]}>
              <Image
                source={CountryFlag}
                style={{ height: 25, width: 25, borderRadius: 25 / 2 }}
              />
              <Text
                style={styles.CountryNameTxt}
                onPress={props.showCountryCode}
              >
                {CountryCode}
              </Text>
            </View>
          ) : null}
          {props.iscountryCode &&
          
            <View style={styles.LeftIconContainer2}>
              <Dropdown
                style={{
                  width: dropdownwidth,
                  // backgroundColor:"red"
                }}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                data={contrydata}
                maxHeight={300}
                labelField="dialCode"
                valueField={"dialCode"}
                autoScroll={false}

                value={countryCode_code}
                placeholderStyle={styles.selectedTextStyle}
                search
                searchname="name"
                searchPlaceholder="Search with country name"
                // searchQuery ={(key,item) => (key == item.name)}
                onChange={item => {
                  setcountryCode_code(item.dialCode);
                  setcountryCode_Image(item.icon);
                  props.onChangeCountryCode(item.dialCode)
                  if (item.dialCode.length * 22 < 80) {
                    setdropdownwidthwidth(80)

                  } else {

                    setdropdownwidthwidth(item.dialCode.length * 21)
                  }

                }}
                containerStyle={{
                  width: width * 0.88,
                  marginTop:15
                }}
                renderLeftIcon={() => (
                  <Image
                    source={countryCode_image}
                    style={styles.flag}
                  />
                )}


                renderItem={renderItem_dropdown}


              />
            </View>
          }
        </View>
        <TextInput
          maxLength={maxLength}
          style={[styles.TxtInpt, props?.styles]}
          placeholder={placeholder}
          onChangeText={onChangeText}
          multiline={multiline}
          keyboardType={keyboardType ? keyboardType : "default"}
          placeholderTextColor={
            placeholderTextColor ? placeholderTextColor : placeholderColor
          }
          // showSoftInputOnFocus={true}
          value={value}
          returnKeyType={"done"}
          autoCapitalize="none"
          autoFocus={autoFocus}
          editable={editable}
          ref={ref}
          {...props}
        />

        {RightIcon ? (
          <TouchableOpacity
            onPress={props.RightIconPress}
            style={[styles.RightIconContainer]}
          >
            <Image
              source={rightImg}
              style={[styles.imgView, props?.ImgStyling]}
            />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  LeftIconContainer2: {
    height: verticalScale(30),
    // height: height * 0.08,
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 0.6,
    borderColor: COLOR.GREY,
    paddingLeft: 5
  },
  flag: {
    height: 25,
    width: 25,
    borderRadius: 25 / 2,
    resizeMode: "contain",
    alignSelf: 'center',
    // backgroundColor:'red'


  },
  textItem: {
    flex: 1,
    fontSize: 15,
    color: "#212121",
    marginLeft: 15
  },
  item2: {
    padding: 17,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 8,

    // height:height

  },
  selectedTextStyle: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "400",
    fontFamily: "Montserrat-Regular",
    marginLeft: 5

  },
  imgView: {
    height: 20,
    width: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: moderateScale(15),
  },
  TxtInpt: {
    height: height * 0.08,
    width: width * 0.7,
    paddingLeft:10
  },
  MainContainer: {
    height: height * 0.08,
    width: width * 0.9,
    flexDirection: "row",
    alignItems: "center",
  },
  LeftIconContainer: {
    height: verticalScale(30),
    // height: height * 0.08,
    width: width * 0.1,
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 0.6,
    borderColor: COLOR.GREY,
  },
  LeftImgView: {
    height: 20,
    width: 20,
    justifyContent: "center",
    alignItems: "center",
    tintColor: COLOR.GREY,
  },
  CountryCodeContainer: {
    height: verticalScale(30),
    width: width * 0.2,
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 0.6,
    borderColor: COLOR.GREY,
    flexDirection: "row",
  },
  CountryNameTxt: {
    color: COLOR.GREY,
    fontSize: height / 62,
    fontFamily: "Montserrat-Regular",
    marginLeft: 10,
  },
  RightIconContainer: {
    width: width * 0.1,
    justifyContent: "center",
    alignItems: "center",
  },
});
