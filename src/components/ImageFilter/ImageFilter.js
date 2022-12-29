import {
  View,
  Text,
  Image,
  Modal,
  TouchableOpacity,
  FlatList,
  Dimensions,
  StyleSheet,
  SafeAreaView
} from "react-native";
import React, { useState, useContext,useRef} from "react";
import { normalize } from "../../../ResponsiveFontSize";
import { ImagePath } from "../../constants/ImagePath";
import { COLOR } from "../../Utils/Colors";
import { AuthContext } from "../../context/AuthContext";
import { showMessage } from "react-native-flash-message";
import { FILTERS } from "./Allfilters";

const { height, width } = Dimensions.get("window");
import RNFS from "react-native-fs";

export default function ImageFilter(props) {
  const extractedUri = useRef(`data:image/png;base64,${props.route.params.Path}`);
  const onExtractImage = ({nativeEvent}) => {
    extractedUri.current = nativeEvent.uri;
  };
  const auth = useContext(AuthContext);
  const [selectedFilterIndex, setIndex] = useState(0);

  const [filterimagedata, setfilterimagedata] = useState(
    new Array(22).fill(null)
  );
  const [switchFilter, setswitchFilter] = useState(0);
  React.useEffect(() => {
    // ApplyFilters();
  }, []);
  const ApplyFilters = async () => {
    console.log(props.route?.params?.Path);
    const data_ = [];
    for (let i = 0; i < 5; i++) {
      // const data = await render(props.route?.params?.Path, i);
      // data_.push(data);
      // console.log("len1", data_.length);
    }
    setfilterimagedata(data_);
  };
  const renderFilterComponent = ({item, index}) => {
    const FilterComponent = item?.filterComponent;
    const image = (
      <Image
        style={styles.filterSelector}
        source={{uri:`data:image/png;base64,${props.route.params.Path}`}}
        resizeMode={'contain'}
     ></Image>
    );
    return (
      <TouchableOpacity onPress={() => {
        onSelectFilter(index)

      }}>
        <Text style={styles.filterTitle}>{item?.title}</Text>
        <FilterComponent image={image}/>
      </TouchableOpacity>
    );
  };
  const SelectedFilterComponent = FILTERS[selectedFilterIndex].filterComponent;

  // const render = (imageSrc, index) => {
  //   return new Promise((resolve) => {
  //     RNImageFilter.getSourceImage(
  //       {
  //         imageSource: imageSrc,
  //         dataType: "Base64",
  //         filterType: index,
  //       },
  //       (source) => {
  //         resolve(source?.base64 ? source?.base64 : null);
  //       },
  //       (eror) => {
  //         console.log("err");
  //       }
  //     );
  //   });
  // };

  const onSelectFilter = selectedIndex => {
    setIndex(selectedIndex);
  };
  const ViewAppliedFilter = () => {
    return (
      <View>
       <SelectedFilterComponent
          onExtractImage={onExtractImage}
          extractImageEnabled={true}
          image={
            <Image
              style={styles.image}
              source={{uri:`data:image/png;base64,${props.route.params.Path}`}}
              resizeMode={'cover'}
            />
          }
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={{}}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 20,
          backgroundColor: "#1A1A1A",
          borderRadius: 8,
        }}
      >
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center" }}
          onPress={() => {
            if(props.route?.params?.PrevScreen == "Home"){
              auth.filterimage = props?.route?.params?.Path;
            }
            props.navigation.goBack();
          }}
        >
          <Image source={ImagePath.BACK_ICON} style={{ marginRight: 10 }} />
          <Text
            style={{
              fontFamily: "Montserrat-Regular",
              color: "white",
              fontSize: normalize(14),
            }}
          >
            Skip
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center" }}
          onPress={() => {
            console.log(props.route?.params?.PrevScreen, "Previous Screen");
            RNFS.readFile(extractedUri.current , "base64")
            .then((res) => {
              if (props.route?.params?.PrevScreen == "EditProfile") {
                props.navigation.navigate("EditProfile", {
                  FilteredProfileImage:
                    props.route?.params?.Type == "Profile"
                      ? `data:image/png;base64,${res}`
                      : null,
                  FilteredCoverImage:
                    props.route?.params?.Type == "Cover"
                      ? `data:image/png;base64,${res}`
                      : null,
                  Type: props.route?.params?.Type,
                  item:props.route?.params?.item
                });
              } else if (props.route?.params?.PrevScreen == "CreatePost") {
                props.navigation.navigate("CreatePost", {
                  FilteredPost: `data:image/png;base64,${res}`,
                  item:props.route?.params?.item
                });
              } else if (props.route?.params?.PrevScreen == "CreateCollection") {
                props.navigation.navigate("CreateCollection", {
                  FilteredPost: `data:image/png;base64,${res}`,
                  item:props.route?.params?.item
                });
              } else {
                // //Story Filters
                auth.filterimage = res
                console.log( res )   
                props.navigation.navigate("Home", {
                  FilteredPost: res,
                });
              }
            })
            .catch((err) => {});
            
          }}
        >
          <Text
            style={{
              fontFamily: "Montserrat-Regular",
              color: "white",
              fontSize: normalize(14),
            }}
          >
            Select Filter
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ alignItems: "center", marginVertical: 25 }}>
        <ViewAppliedFilter />
      </View>

      {/* <FlatList
        style={{ backgroundColor: "#1A1A1A", paddingVertical: 10, height: 150 }}
        data={filterimagedata}
        horizontal
        renderItem={({ item, index }) => {
          return (
            item != null && (
              <TouchableOpacity
                onPress={() => {
                  setswitchFilter(index);
                }}
                style={{
                  borderColor: COLOR.BUTTON_PINK,
                  borderBottomWidth: switchFilter == index ? 5 : 0,
                  borderRadius: 8,
                }}
              >
                <Image
                  source={{
                    uri: item ? `data:image/png;base64,${item}` : null,
                  }}
                  style={{
                    height: 120,
                    width: 100,
                    resizeMode: "contain",
                    borderRadius: 8,
                  }}
                />
              </TouchableOpacity>
            )
          );
        }}
      /> */}
      
      <FlatList
        data={FILTERS}
        keyExtractor={item => item.title}
        horizontal={true}
        renderItem={renderFilterComponent}
        style={{

        }}
        />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  image: {
    width: width*0.8,
    height: width*0.8,
    marginVertical: 10,
    alignSelf: 'center',
  },
  filterSelector: {
    width: 100,
    height: 100,
    margin: 5,
  },
  filterTitle: {
    fontSize: 12,
    textAlign: 'center',
    color:"#fff"
  },
});