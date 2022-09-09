export const initialState = {
    auth: {
        status: '',
        authentication: '',
        err_Message: '',
        loader: false,
        userId: '',
        userDetail: [],
        userToken: '',
        fetchChat:'',
        searchRecruit:[],
        homeData:[],
        libraryData:[],
        DiscussionData:[],
        myEventData:[],
        eventDetails:[],
        discussionCat:[],
        homeData:[],
        volunteerData:[],
        eventRequestList:[],
        discussionRequestList:[],
        myItemsData:[],
        notificationData:[],
        followRequestList:[],
        followList:[],
        chatList:[],
        eventImgages:[]

    },
    booking: {
        bookingActionStatus: '',
        bookingErrMsg: '',
        bookingloader: false,
    },
    profile: {
        profileloader: false,
        profileActionStatus: ''
    },
    contestState: {
        brandSeleList: [],
        categorySeleList: [],
        brandList: [],
        categoryList: [],
    },


}