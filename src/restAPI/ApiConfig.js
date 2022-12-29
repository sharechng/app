// ************* BaseURL *************
// export const ServerUrl = "https://node.bitfuxi.co.uk/api/v1/"; // Main Staging Server URL

export const ServerUrl = 'https://node.bitfuxi.co.uk/api/v1/'

// export const ServerUrl = "http://172.16.1.132:1909/api/v1/"; // Vishnu
// export const ServerUrl = "http://172.16.1.176:1909/api/v1/"; // Vipin

// Admin Fee list
export const AdminFeeListUrl = ServerUrl + "admin/feeList";

// Auth Api's
export const ListLogoUrl = ServerUrl + "admin/listLogo";
export const ViewLogoUrl = ServerUrl + "admin/viewLogo?";
export const LoginUrl = ServerUrl + "user/login";
export const ForgetUrl = ServerUrl + "user/forgotPassword";
export const ResetUrl = ServerUrl + "user/resetPassword";
export const SignUpUrl = ServerUrl + "user/register";
export const SignUpVerifyUrl = ServerUrl + "user/verifyOtp";
export const ResendOtpUrl = ServerUrl + "user/resendOtp";
export const EmailCheckUrl = ServerUrl + "user/searchUserNameForsignUpTime";

export const showUserOffline = ServerUrl + "user/offLineUser"

export const likeDislikeCollection = ServerUrl + "user/likeDislikeCollection/"

// Add Story Api's
export const AddStoryUrl = ServerUrl + "user/addStory";
export const ViewStoryUrl = ServerUrl + "user/ViewStory";
export const EditStoryUrl = ServerUrl + "user/editStory";
export const DeleteStoryUrl = ServerUrl + "user/deleteStory";
export const StoryListUrl = ServerUrl + "user/storyList";
export const ExpiredStoryUrl = ServerUrl + "user/expiredStory";
export const StoryLikeUrl = ServerUrl + "user/storyLike";
export const CommentOnStoryUrl = ServerUrl + "user/commentOnstory";
export const StoryViewerListUrl = ServerUrl + "user/storyViewerlist";
export const ReplyOnStoryCommentUrl = ServerUrl + "user/replyOnstorycomment";

// Home Api
export const UploadFileUrl = ServerUrl + "user/uploadFile";
export const UploadFileFormDataUrl = ServerUrl + "user/uploadFileFormData"; // New Api 13 june

export const ReportApiUrl = ServerUrl + "user/createReport";
export const AddToWishListUrl = ServerUrl + "nft/addRemoveToWatchList";
export const CommentsOnPostUrl = ServerUrl + "user/commentOnPost";
export const ExclusivePublicPostListUrl = ServerUrl + "user/allPostList"; // New Post Feed(22 April)
export const DeleteParticularComment = ServerUrl + "user/deleteCommentOnPost";
export const ReplyOnComment = ServerUrl + "user/commentReplyOnPost";
export const SendEmojiApiUrl = ServerUrl + "user/reactOnPost";
export const LikeCommentsUrl = ServerUrl + "user/likeDislikeCommentOnPost";
export const ReportCommentsUrl = ServerUrl + "user/commentReport";
export const DeleteReplyCommentUrl = ServerUrl + "user/deleteCommentOnPost";

// Profile and Edit Profile
export const EditProfileUrl = ServerUrl + "user/updateProfile";
export const GetUserProfileUrl = ServerUrl + "user/userprofile";
export const GetFollowerListUrl = ServerUrl + "user/listFollowerUser";
export const GetFollowingListUrl = ServerUrl + "user/listFollowingUserStory";

export const BlockedUserListUrl = ServerUrl + "user/listBlockedUser";

export const MyPostListUrl = ServerUrl + "user/buypostList";

export const MyOwnAuctionListUrl = ServerUrl + "user/buyAuctionList";

export const BlockUnBlockUrl = ServerUrl + "user/userBlockUnblock";
export const UserBlockUnBlockUrl = ServerUrl + "user/hide_unhidePost";

export const UserActivityLogUrl = ServerUrl + "user/userActivity";

export const OwnPostList = ServerUrl + "user/postList";

export const BoughtPostList = ServerUrl + "user/collectionSubscriptionList";

export const ViewBoughtPostList =
  ServerUrl + "user/collectionSubscriptionView?";

export const TransactionHistoryUrl = ServerUrl + "user/transactionList";

// Collection
export const CreateCollectionsUrl = ServerUrl + "nft/collection";
export const CollectionsListUrl = ServerUrl + "nft/listCollection";
export const OwnCollectionsUrl = ServerUrl + "nft/myCollectionList";
export const NFTsListUrl = ServerUrl + "nft/listCollectionNft";
export const NFTsProfileDetailsUrl = ServerUrl + "nft/viewCollectionNft/";
export const CreateNFTsUrl = ServerUrl + "nft/createCollectionNft";
export const ListOfInterestUrl = ServerUrl + "user/listInterest";

// Notification
export const NotificationUrl = ServerUrl + "notification/listNotification";
export const DeleteNotificationUrl =
  ServerUrl + "notification/deleteAllNotification";

// Social Login
export const SocialLoginUrl = ServerUrl + "user/socialLogin";

// Creator
export const CreatorsList = ServerUrl + "user/listAllcreator";

// Get Balance
export const GetBalanceUrl = ServerUrl + "user/getBalance";
export const ViewTransactionDetailsUrl = ServerUrl + "user/transactionView?";

export const GetCollectionDetailsUrl = ServerUrl + "nft/myCollectionList";

export const CommentsListUrl = ServerUrl + "user/postList"; // old
// export const CommentsListUrl = ServerUrl + "user/postView?"; // New

export const CreatePostUrl = ServerUrl + "user/createPost";
export const updatedPostUrl = ServerUrl + "user/updatePost";
export const ListPostWithCollectionListUrl =
  ServerUrl + "user/listPostWithCollection?";
export const ViewPostProfileUrl = ServerUrl + "user/postView?";
export const BuyPostUrl = ServerUrl + "user/buyPost";

// Auctions Api
export const AuctionListUrl = ServerUrl + "user/listAuction/?limit=50";
export const MyAuctionListUrl = ServerUrl + "user/mylistAuction/?limit=50";
export const ViewAuctionDetailsUrl = ServerUrl + "user/viewAuction";
export const CreateBidonAuctionsUrl = ServerUrl + "bid/createBid";
export const BuyAuctionApiUrl = ServerUrl + "user/buyAuction";
export const CreateAuctionApiUrl = ServerUrl + "user/addAuction";
export const TrendingCreatorApiUrl = ServerUrl + "user/trendingUserlist";
// https://node.bitfuxi.co.uk/api/v1/user/trendingUserlist

export const SearchApiUrl = ServerUrl + "user/globalSearch?";
export const TrendingAuctionsApiUrl = ServerUrl + "user/trendingAuction";

//  --- Sukriti ---
export const CreatorTagPostApiUrl = ServerUrl + "user/tagPostlist?";
export const acceptBidApiUrl = ServerUrl + "bid/acceptBid?_id=";
export const rejectBidApiUrl = ServerUrl + "bid/rejectBid?_id=";
export const deleteBidApiUrl = ServerUrl + "bid/deleteBid?_id=";
export const createBidApiUrl = ServerUrl + "bid/createBid";
export const buyAuctionApiUrl = ServerUrl + "user/buyAuction";
export const cancelAuctionApiUrl = ServerUrl + "user/deleteAuction?auctionId=";
export const editBidApiUrl = ServerUrl + "user/updateAuction";

export const CreatorCollectionApiUrl =
  ServerUrl + "user/getOtheruserCollection"; // New Api 3 May
export const CreatorPostApiUrl = ServerUrl + "user/listUserWithpost?"; // New Api 3 May
export const AddInterestApiUrl = ServerUrl + "user/addInterest";
export const GetMightLikeUserListApiUrl = ServerUrl + "user/migthtList";
export const StoryListWithFollowingApiUrlNew =
  ServerUrl + "user/storyListWithFollowingReactNative?";
export const StoryListWithFollowingApiUrl =
  ServerUrl + "user/storyListWithFollowing?";
export const IgnoreApiUrl = ServerUrl + "user/userIgnore_Unignore";
export const CollectionActivity = ServerUrl + "user/activityByCollection?";
export const ActivityByPostUrl = ServerUrl + "user/activityByPost?";

// Promotions
export const CreateInterest = ServerUrl + "user/createInterest";
export const ListInterest = ServerUrl + "user/listInterest";
export const CreatePostPromotions = ServerUrl + "user/createPostPromotion";
export const AdminDurationList = ServerUrl + "admin/listDuration";

// Wallet
export const DepositBalanceUrl = ServerUrl + "user/deposit";
export const WithdrawBalanceUrl = ServerUrl + "user/withdraw";
export const ActivityOnPostUrl = ServerUrl + "user/activityByPost";

export const CollectionSubscriptionUrl =
  ServerUrl + "user/collectionSubscription";
export const MyOwnBidUrl = ServerUrl + "bid/myBid";
export const HashTagSearchUrl = ServerUrl + "user/HashTagSearchWithList";
export const GetOtherUserProfile = ServerUrl + "user/getOtheruserprofile/";
export const FollowUnFollowUserUrl = ServerUrl + "user/followUnfollowUser/";
export const LikeDislikeAuctionsUrl = ServerUrl + "user/likeDislikeAuction/";
export const ViewPostByIdUrl = ServerUrl + "user/postView?postId=";
export const MyPostDetailsViewUrl = ServerUrl + "user/postView?";
export const UserLikeDislikePostUrl = ServerUrl + "user/likeDislikePost/";
export const RemoveFollowerUrl = ServerUrl + "user/removefollowerUser/";
export const NFTCollectionListUrl = ServerUrl + "nft/viewCollection/";
export const LikeDislikeSubscriptionUrl =
  ServerUrl + "user/likeDislikeSubscription/";

// Chat
export const ChatHistoryUrl = ServerUrl + "socket/chatHistory";
export const OneToOneChatUrl = ServerUrl + "socket/oneToOneChatApi";

// Reels
export const AddNewReelsUrl = ServerUrl + "user/addReels";
export const ReelsListUrl = ServerUrl + "user/reelsList";
export const LikeUnLikeReelsUrl = ServerUrl + "user/likeDislikeReels/";
export const CommentOnReelsUrl = ServerUrl + "user/commentOnReels";
export const ReportOnReelsUrl = ServerUrl + "user/createReportOnReels";
export const ReelsShareUrl = ServerUrl + "user/getShareReels/";
export const SaveReelsUrl = ServerUrl + "user/saveReels";

// Add-Remove WishList and Listing
export const AddRemoveFromWishList = ServerUrl + "user/addRemoveToWatchList";
export const GetWishList = ServerUrl + "user/migthtList";

// Post Share
export const PostShareUrl = ServerUrl + "user/postShare";

// Subscriber List
export const SubscriberListUrl =
  ServerUrl + "user/userCollectionSubscriberLists";


  export const ADMIN_FEELIST=ServerUrl+"admin/feeList";


