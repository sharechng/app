import React from "react";
import { StyleSheet, View } from "react-native";

import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "../screens/Auth/Login/Login";
import VerifyOtp from "../screens/Auth/VerifyOtp/VerifyOtp";
import Forgot from "../screens/Auth/Forgot/Forgot";
import Auctions from "../screens/Auctions/Auctions";
import Collections from "../screens/Collections/Collections";
import Profile from "../screens/Profile/Profile";
import TabRoutes from "./TabRoutes";
import SignUp from "../screens/Auth/SignUp/SignUp";
import SetPassword from "../screens/Auth/SetPassword/SetPassword";
import CollectionView from "../screens/CollectionView/CollectionView";
import AddStory from "../screens/AddStory/AddStory";
import DrawerRoutes from "./DrawerRoutes";
import Notifications from "../screens/Notifications/Notifications";
import EditProfile from "../screens/EditProfile/EditProfile";
import Creators from "../screens/Creators/Creators";
import Blocking from "../screens/Blocking/Blocking";
import PasswordAndSecurity from "../screens/PasswordAndSecurity/PasswordAndSecurity";
import ActivityLog from "../screens/ActivityLog/ActivityLog";
import NotificationsSettings from "../screens/NotificationsSettings/NotificationsSettings";
import Chat from "../screens/Chat/Chat";
import ChatList from "../screens/ChatList/ChatList";
import AboutCreator from "../screens/AboutCreater/AboutCreater";
import Wallet from "../screens/Wallet/Wallet";
import CollectionDetails from "../screens/CollectionDetails/CollectionDetails";
import AuctionsDetails from "../screens/AuctionsDetails/AuctionsDetails";
import SendWallet from "../screens/SendWallet/SendWallet";
import ReceiveWallet from "../screens/ReceiveWallet/ReceiveWallet";
import DepositWallet from "../screens/DepositWallet/DepositWallet";
import TransactionHistory from "../screens/TransactionHistory/TransactionHistory";
import Comments from "../screens/Comments/Comments";
import CollectionDataDetails from "../screens/CollectionDataDetails/CollectionDataDetails";
import CreateCollection from "../screens/CreateCollection/CreateCollection";
import CreatePost from "../screens/CreatePost/CreatePost";
import AuctionDataDetails from "../screens/AuctionDataDetails/AuctionDataDetails";
import LoginWithMobile from "../screens/Auth/LoginWithMobile/LoginWithMobile";
import FolloerFollowing from "../screens/FolloerFollowing/FolloerFollowing";
import Subscribers from "../screens/Subscribers/Subscribers";
import Resale from "../screens/Resale/Resale";
import Search from "../screens/Search/Search";
import GetToKnow from "../screens/Auth/GetToKnow/GetToKnow";
import VideoReels from "../screens/VideoReels/VideoReels";
import SignUpVerify from "../screens/Auth/SignUpVerify/SignUpVerify";
import Splash from "../screens/Splash/Splash";
import SubscriptionList from "../screens/Profile/SubscriptionList";
import TransactionsDetails from "../screens/TransactionsDetails/TransactionsDetails";
import CollectionNftDetails from "../screens/CollectionDetails/CollectionNftDetails";
import OwnAndBuyPost from "../screens/OwnAndBuyPost/OwnAndBuyPost";
import ViewTagPostList from "../screens/ViewTagPostList/ViewTagPostList";
import MightLike from "../screens/MightLike/MightLike";
import Status from "../screens/Home/Status";
import Promotions from "../screens/Promotions/Promotions";
import CreatePromotions from "../screens/Promotions/CreatePromotions/CreatePromotions";
import SaveToWishlist from "../screens/SaveToWishlist/SaveToWishlist";
import Subscriber from "../screens/Subscribers/Subscribers";
import SavedReels from "../screens/VideoReels/SavedReels";
import MyCollectionDetails from "../screens/MyCollectionDetails/MyCollectionDetails";
import ViewSubscription from "../screens/ViewSubscription/ViewSubscription";
import TrendingAuctionsView from "../screens/TrendingAuctionsView/TrendingAuctionsView";
import { COLOR } from "../Utils/Colors";
import Test from "../../Test";
import SignUpWithPhone from "../screens/Auth/SignUpWithPhone/SignUpWithPhone";
import ShowImage from "../screens/SaveToWishlist/ShowImage";
import ForgotMobile from "../screens/Auth/Forgot/ForgotMobile";
import CommentsonReels from "../screens/VideoReels/CommentsonReels";
import ImageFilter from "../components/ImageFilter/ImageFilter";
import Exportnft from "../screens/Exportnft/Exportnft";

const Stack = createNativeStackNavigator();

const Routes = ({ authFlow }) => {
  return (
    <NavigationContainer theme={{ colors: { background: COLOR.BLACK } }}>
      {!authFlow ? (
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{ headerShown: false }}
        >
                    {/* <Stack.Screen name="test" component={Test}/> */}

          {/* <Stack.Screen name="Splash" component={Splash} /> */}
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="SignUpVerify" component={SignUpVerify} />
          <Stack.Screen name="Forgot" component={Forgot} />
          <Stack.Screen name="VerifyOtp" component={VerifyOtp} />
          <Stack.Screen name="SetPassword" component={SetPassword} />
          <Stack.Screen name="Home" component={TabRoutes} />
          <Stack.Screen name="Status" component={Status} />
          <Stack.Screen name="DrawerRoutes" component={DrawerRoutes} />
          <Stack.Screen name="Auctions" component={Auctions} />
          <Stack.Screen name="Collections" component={Collections} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="CollectionView" component={CollectionView} />
          <Stack.Screen name="AddStory" component={AddStory} />
          <Stack.Screen name="Creators" component={Creators} />
          <Stack.Screen name="EditProfile" component={EditProfile} />
          <Stack.Screen name="ImageFilter" component={ImageFilter} />
          <Stack.Screen name="Blocking" component={Blocking} />
          <Stack.Screen name="Notifications" component={Notifications} />
          <Stack.Screen
            name="PasswordAndSecurity"
            component={PasswordAndSecurity}
          />
          <Stack.Screen name="ActivityLog" component={ActivityLog} />
          <Stack.Screen
            name="NotificationsSettings"
            component={NotificationsSettings}
          />
          <Stack.Screen name="Chat" component={Chat} />
          <Stack.Screen name="ChatList" component={ChatList} />
          <Stack.Screen name="AboutCreator" component={AboutCreator} />
          <Stack.Screen name="Wallet" component={Wallet} />
          <Stack.Screen
            name="CollectionDetails"
            component={CollectionDetails}
          />
          <Stack.Screen name="AuctionsDetails" component={AuctionsDetails} />
          <Stack.Screen name="SendWallet" component={SendWallet} />
          <Stack.Screen name="ReceiveWallet" component={ReceiveWallet} />
          <Stack.Screen name="DepositWallet" component={DepositWallet} />
          <Stack.Screen
            name="TransactionHistory"
            component={TransactionHistory}
          />
          <Stack.Screen name="Comments" component={Comments} />
          <Stack.Screen
            name="CollectionDataDetails"
            component={CollectionDataDetails}
          />
          <Stack.Screen name="CreateCollection" component={CreateCollection} />
          <Stack.Screen name="CreatePost" component={CreatePost} />
          <Stack.Screen
            name="AuctionDataDetails"
            component={AuctionDataDetails}
          />
          <Stack.Screen name="LoginWithMobile" component={LoginWithMobile} />
          <Stack.Screen name="FolloerFollowing" component={FolloerFollowing} />
          <Stack.Screen name="Subscribers" component={Subscribers} />
          <Stack.Screen name="Resale" component={Resale} />
          <Stack.Screen name="Search" component={Search} />
          <Stack.Screen name="GetToKnow" component={GetToKnow} />
          <Stack.Screen name="VideoReels" component={VideoReels} />
          <Stack.Screen name="SubscriptionList" component={SubscriptionList} />
          <Stack.Screen
            name="TransactionsDetails"
            component={TransactionsDetails}
          />
          <Stack.Screen
            name="CollectionNftDetails"
            component={CollectionNftDetails}
          />
          <Stack.Screen name="OwnAndBuyPost" component={OwnAndBuyPost} />
          <Stack.Screen name="ViewTagPostList" component={ViewTagPostList} />
          <Stack.Screen name="MightLike" component={MightLike} />
          <Stack.Screen name="Promotions" component={Promotions} />
          <Stack.Screen name="CreatePromotions" component={CreatePromotions} />
          <Stack.Screen name="SaveToWishlist" component={SaveToWishlist} />
          <Stack.Screen name="Subscriber" component={Subscriber} />
          <Stack.Screen name="SavedReels" component={SavedReels} />
          <Stack.Screen
            name="MyCollectionDetails"
            component={MyCollectionDetails}
          />
          <Stack.Screen name="ViewSubscription" component={ViewSubscription} />
          <Stack.Screen
            name="TrendingAuctionsView"
            component={TrendingAuctionsView}
          />
          <Stack.Screen name="SignUpWithPhone" component={SignUpWithPhone} />
          <Stack.Screen name="ShowImage" component={ShowImage} />
          <Stack.Screen name="forgetmobile" component={ForgotMobile} />
          <Stack.Screen name="CommentsReels" component={CommentsonReels} />


        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{ headerShown: false }}
          headerMode="none"
        >
          <Stack.Screen name="exportnft" component={Exportnft}/>
          <Stack.Screen name="Home" component={TabRoutes} />
          <Stack.Screen name="Status" component={Status} />
          <Stack.Screen name="MightLike" component={MightLike} />
          <Stack.Screen name="Auctions" component={Auctions} />
          <Stack.Screen name="Collections" component={Collections} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="CollectionView" component={CollectionView} />
          <Stack.Screen name="AddStory" component={AddStory} />

          <Stack.Screen name="Creators" component={Creators} />
          <Stack.Screen name="EditProfile" component={EditProfile} />
          <Stack.Screen name="ImageFilter" component={ImageFilter} />
          <Stack.Screen name="Blocking" component={Blocking} />
          <Stack.Screen name="Notifications" component={Notifications} />
          <Stack.Screen
            name="PasswordAndSecurity"
            component={PasswordAndSecurity}
          />
          <Stack.Screen name="ActivityLog" component={ActivityLog} />
          <Stack.Screen
            name="NotificationsSettings"
            component={NotificationsSettings}
          />
          <Stack.Screen name="Chat" component={Chat}
            options={{
              headerShown: false,
             

            }}

          />
          <Stack.Screen name="ChatList" component={ChatList} />
          <Stack.Screen name="AboutCreator" component={AboutCreator} />
          <Stack.Screen name="Wallet" component={Wallet} />
          <Stack.Screen
            name="CollectionDetails"
            component={CollectionDetails}
          />
          <Stack.Screen name="AuctionsDetails" component={AuctionsDetails} />
          <Stack.Screen name="SendWallet" component={SendWallet} />
          <Stack.Screen name="ReceiveWallet" component={ReceiveWallet} />
          <Stack.Screen name="DepositWallet" component={DepositWallet} />
          <Stack.Screen
            name="TransactionHistory"
            component={TransactionHistory}
          />
          <Stack.Screen name="Comments" component={Comments} />
          <Stack.Screen
            name="CollectionDataDetails"
            component={CollectionDataDetails}
          />
          <Stack.Screen name="CreateCollection" component={CreateCollection} />
          <Stack.Screen name="CreatePost" component={CreatePost} />
          <Stack.Screen
            name="AuctionDataDetails"
            component={AuctionDataDetails}
          />
          <Stack.Screen name="LoginWithMobile" component={LoginWithMobile} />
          <Stack.Screen name="FolloerFollowing" component={FolloerFollowing} />
          <Stack.Screen name="Subscribers" component={Subscribers} />
          <Stack.Screen name="Resale" component={Resale} />
          <Stack.Screen name="Search" component={Search} />
          <Stack.Screen name="GetToKnow" component={GetToKnow} />
          <Stack.Screen name="VideoReels" component={VideoReels} />
          <Stack.Screen name="SubscriptionList" component={SubscriptionList} />
          <Stack.Screen name="OwnAndBuyPost" component={OwnAndBuyPost} />
          <Stack.Screen
            name="TransactionsDetails"
            component={TransactionsDetails}
          />
          <Stack.Screen
            name="CollectionNftDetails"
            component={CollectionNftDetails}
          />
          <Stack.Screen name="Promotions" component={Promotions} />
          <Stack.Screen name="CreatePromotions" component={CreatePromotions} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="SignUpVerify" component={SignUpVerify} /> 
          <Stack.Screen name="Forgot" component={Forgot} />
          <Stack.Screen name="VerifyOtp" component={VerifyOtp} /> 
          <Stack.Screen name="SetPassword" component={SetPassword} />
          <Stack.Screen name="ViewTagPostList" component={ViewTagPostList} />
          <Stack.Screen name="SaveToWishlist" component={SaveToWishlist} />
          <Stack.Screen name="Subscriber" component={Subscriber} />
          <Stack.Screen name="SavedReels" component={SavedReels} />
          <Stack.Screen name="ViewSubscription" component={ViewSubscription} />
          <Stack.Screen
            name="MyCollectionDetails"
            component={MyCollectionDetails}
          />
          <Stack.Screen
            name="TrendingAuctionsView"
            component={TrendingAuctionsView}
          />
          <Stack.Screen name="SignUpWithPhone" component={SignUpWithPhone} />
          <Stack.Screen name="ShowImage" component={ShowImage} />
          <Stack.Screen name="forgetmobile" component={ForgotMobile} />
          <Stack.Screen name="CommentsReels" component={CommentsonReels} />

        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default Routes;

