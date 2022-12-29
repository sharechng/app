import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { GetBalanceUrl, ListLogoUrl, ViewLogoUrl } from "../restAPI/ApiConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

// ************ Session Management ************

// const setSession = (accessToken, userType, agencyTeam) => {
//   if (accessToken) {
//     AsyncStorage.setItem("creatturAccessToken", accessToken);
//     AsyncStorage.setItem("userType", userType);
// AsyncStorage.setItem("agencyTeam", agencyTeam);
//     axios.defaults.headers.common.Authorization = `Creattur ${accessToken}`;
//     // AsyncStorage.setItem("Profile", profilePic)
//   } else {
//     AsyncStorage.removeItem("creatturAccessToken");
//     AsyncStorage.removeItem("userType");
//     AsyncStorage.removeItem("agencyTeam");
//     AsyncStorage.removeItem("Profile");

//     delete axios.defaults.headers.common.Authorization;
//   }
// };

// function checkLogin() {
//   const accessToken = AsyncStorage.getItem("creatturAccessToken");
//   return accessToken ? true : false;
// }

export default function AuthProvider(props) {
  // const [isLogin, setIsLogin] = useState(checkLogin());
  const [isLogin, setIsLogin] = useState();
  const [userData, setUserData] = useState({});
  const [idLogo, setIdLogo] = useState();

  // const accessToken = AsyncStorage.getItem("creatturAccessToken");
  const getProfile = () => {
    //    call when I get token
    // loader in my profile
  };
  const [listLogo, setListLogo] = useState({
    profilePic: "",
  });

  useEffect(() => {
    axios
      .get(ListLogoUrl, {})
      .then((response) => {
        if (response.data.response_code === 401) {
          alert("401");
        } else {
          console.log(response);
          // AsyncStorage.setItem("Profile", response.data.result.profilePic);
          ViewLogo(response.data.result[1]._id);
        }
      })
      .catch((response) => {
        console.log("response", response);
      });
  }, []);

  // //CHAT ChatHistory
  // useEffect(() => {
  //   const web = new WebSocket(socketURL);
  //   const accessToken = localStorage.getItem("token");

  //   if (accessToken && userData && userData._id) {
  //     try {
  //       web.onopen = () => {
  //         const dataToSend = {
  //           type: "ChatHistory",
  //           senderId: userData._id,
  //         };

  //         web.send(JSON.stringify(dataToSend));
  //         web.onmessage = async (event) => {
  //           if (event.data !== "[object Promise]" && event.data !== "null") {
  //             let obj = JSON.parse(event.data);

  //             setChatMessageData(obj.result);
  //           }
  //         };
  //       };
  //       return () => {
  //         web.close();
  //         setChatMessageData();
  //       };
  //     } catch (err) {
  //       setChatMessageData();
  //     }
  //   }
  // }, [userData]);

  // ************ View Logo Api Integration ************
  const ViewLogo = (id) => {
    axios({
      method: "get",
      url: ViewLogoUrl,
      params: {
        _id: id,
      },
      headers: { "content-type": "application/json" },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          setListLogo({
            profilePic: response.data.result.logoImage,
          });
        } else {
          alert("Something went wrong.");
        }
      })
      .catch((err) => console.log("==== View Logo err ====", err));
  };

  let data = {
    hometype:"Threads",
    userLoggedIn: isLogin,
    userData,
    listLogo,
    userLogIn: (type, data, userType, agencyTeam) => {
      setSession(data, userType, agencyTeam);
      setIsLogin(type);
    },
    filterimage:null
  
  };

  return (
    <AuthContext.Provider value={data}>{props.children}</AuthContext.Provider>
  );
}
