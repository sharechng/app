import React, { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { COLOR } from "../../Utils/Colors";
const { height, width } = Dimensions.get("window");

const DropDown = ({ data = [], value = {}, onSelectDuration = () => {} }) => {
  const [showOption, setShowOption] = useState(false);

  const onSelectedItemTwo = (val) => {
    setShowOption(false);
    onSelectDuration(val);
  };

  return (
    <View style={{ width: width * 0.94 }}>
      <TouchableOpacity
        style={styles.TouchOneContainer}
        onPress={() => setShowOption(!showOption)}
      >
        <View style={{ width: width * 0.8 }}>
          <Text style={[styles.TxtDesign, { paddingRight: 8 }]}>
            {/* {!!value ? value?.amount : "Select Duration"} */}
            {!!value ? (
              <>
                <Text>{value?.duration} Days</Text> {"  "}
                <Text>{value?.amount} SHARE</Text>
              </>
            ) : (
              "Select Duration"
            )}
          </Text>
        </View>
        <View style={{ width: width * 0.15 }}>
          <Image
            source={require("./download.png")}
            style={{
              height: 30,
              width: 30,
              transform: [{ rotate: showOption ? "180deg" : "0deg" }],
              tintColor: COLOR.GREY,
            }}
          />
        </View>
      </TouchableOpacity>

      {showOption && (
        <View>
          <ScrollView>
            {data?.map((val, i) => {
              return (
                <TouchableOpacity
                  key={String(i)}
                  onPress={() => onSelectedItemTwo(val)}
                >
                  <View style={styles.DropTxtView}>
                    <Text
                      multiselect={true}
                      style={[
                        styles.TxtDesign,
                        { paddingLeft: 8, fontFamily: "Montserrat-Medium" },
                      ]}
                    >
                      {val?.duration} Days{"  "} {val?.amount} SHARE
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default DropDown;

const styles = StyleSheet.create({
  TouchOneContainer: {
    backgroundColor: COLOR.TXT_INPT_COLOR,
    padding: 8,
    borderRadius: 10,
    minHeight: 55,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  TxtDesign: {
    color: COLOR.GREY,
    fontSize: height / 55,
    fontFamily: "Montserrat-Regular",
  },
  DropTxtView: {
    height: 20,
    justifyContent: "center",
    marginVertical: 4,
  },
});
