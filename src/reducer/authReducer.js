import { initialState } from './initialState';
export default (state = initialState.auth, action) => {
    switch (action.type) {
        case 'ERR_MESSAGE':
            return {
                ...state,
                err_Message: action.payload,
                status: action.type,
            }
        case 'LOADER':
            return {
                ...state,
                loader: action.payload
            }
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                status: action.type,
                loader: false,
                err_Message: action.payload

            }
        case 'LOGIN_FAILURE':
            return {
                ...state,
                status: action.type,
                loader: false,
                err_Message: action.payload
            }
        case 'LOGIN_TOKEN':
            return {
                ...state,
                status: action.type,
                loader: false,
                err_Message: action.payload
            }
        case 'LOGIN_TOKEN_FAILURE':
            return {
                ...state,
                status: action.type,
                loader: false,
                err_Message: action.payload
            }
        case 'SIGNUP_SUCCESS':
            return {
                ...state,
                status: action.type,
                loader: false,
                err_Message: action.payload,
            }
        case 'SIGNUP_FAILURE':
            return {
                ...state,
                status: action.type,
                err_Message: action.payload,
                loader: false
            }
        case 'FORGOT_PASS_SUCCESS':
            return {
                ...state,
                status: action.type,
                loader: false,
                err_Message: action.payload
            }
        case 'FORGOT_PASS_FAILURE':
            return {
                ...state,
                status: action.type,
                err_Message: action.payload,
                loader: false
            }
        case 'USERDATA':
            return {
                ...state,
                status: action.type,
                userData: action.payload,
                loader: false,
            }
        case 'USERDATA_FAILURE':
            return {
                ...state,
                status: action.type,
                err_Message: action.payload,
                loader: false
            }
        case 'CHANGE_PASSWORD_SUCCESS':
            return {
                ...state,
                status: action.type,
                err_Message: action.payload,
                loader: false,
            }
        case 'CHANGE_PASSWORD_FAILURE':
            return {
                ...state,
                status: action.type,
                err_Message: action.payload,
                loader: false
            }
        case 'LOGOUT_SUCCESS':
            return {
                ...state,
                status: action.type,
                err_Message: action.payload,
                loader: false,
            }
        case 'LOGOUT_SUCCESS_FAILURE':
            return {
                ...state,
                status: action.type,
                err_Message: action.payload,
                loader: false
            }
        case 'NOTIFICATION_DATA':
            return {
                ...state,
                status: action.type,
                notificationData: action.payload,
                loader: false,
            }

        case 'NOTIFICATION_DATA_FAILURE':
            return {
                ...state,
                status: action.type,
                err_Message: action.payload,
                loader: false
            }
        case 'SEARCH_RECRUIT':
            return {
                ...state,
                status: action.type,
                searchRecruit: action.payload,
                loader: false,
            }

        case 'SEARCH_RECRUIT_FAILURE':
            return {
                ...state,
                status: action.type,
                err_Message: action.payload,
                searchRecruit: [],
                loader: false
            }
        case 'OTHER_USER_DETAILS':
            return {
                ...state,
                status: action.type,
                otherUserDetails: action.payload,
                loader: false,
            }
        case 'OTHER_USER_DETAILS_FALIURE':
            return {
                ...state,
                status: action.type,
                err_Message: action.payload,
                otherUserDetails: [],
                loader: false
            }
        case 'FOLLOW':
            return {
                ...state,
                status: action.type,
                err_Message: action.payload,
                loader: false,
            }
        case 'FOLLOW_FALIURE':
            return {
                ...state,
                status: action.type,
                err_Message: action.payload,
                loader: false
            }
        case 'BLOCK_SUCCESS':
            return {
                ...state,
                status: action.type,
                err_Message: action.payload,
                loader: false,
                searchRecruit: [],
            }
        case 'BLOCK_FALIURE':
            return {
                ...state,
                status: action.type,
                err_Message: action.payload,
                loader: false
            }
        case 'REPORT_SUCCESS':
            return {
                ...state,
                status: action.type,
                err_Message: action.payload,
                loader: false,
            }
        case 'REPORT_FALIURE':
            return {
                ...state,
                status: action.type,
                err_Message: action.payload,
                loader: false
            }

        case 'EVENT_DEL_SUCCESS':
            return {
                ...state,
                status: action.type,
                err_Message: action.payload,
                loader: false,
            }
        case 'EVENT_DEL_FALIURE':
            return {
                ...state,
                status: action.type,
                err_Message: action.payload,
                loader: false
            }
        case 'CONTACT_SUCCESS':
            return {
                ...state,
                status: action.type,
                err_Message: action.payload,
                loader: false,
            }
        case 'CONTACT_SUCCESS_FALIURE':
            return {
                ...state,
                status: action.type,
                err_Message: action.payload,
                loader: false
            }
        case 'MY_DISCUSSION_DATA':
            return {
                ...state,
                status: action.type,
                DiscussionData: action.payload,
                loader: false,
            }
        case 'MY_DISCUSSION_DATA_FALIURE':
            return {
                ...state,
                status: action.type,
                err_Message: action.payload,
                loader: false
            }

        case 'MY_EVENT_DATA':
            return {
                ...state,
                status: action.type,
                myEventData: action.payload,
                loader: false,
            }
        case 'MY_EVENT_DATA_FALIURE':
            return {
                ...state,
                status: action.type,
                err_Message: action.payload,
                loader: false
            }
        case 'EVENT_DETAILS':
            return {
                ...state,
                status: action.type,
                eventDetails: action.payload,
                loader: false,
            }
        case 'EVENT_DETAILS_FALIURE':
            return {
                ...state,
                status: action.type,
                err_Message: action.payload,
                loader: false
            }
        case 'POST_COMMENT':
            return {
                ...state,
                status: action.type,
                postCommnet: action.payload,
                loader: false,
            }
        case 'POST_COMMENT_FALIURE':
            return {
                ...state,
                status: action.type,
                err_Message: action.payload,
                loader: false
            }
        case 'DELETE_EVENT_COMMENT':
            return {
                ...state,
                status: action.type,
                libDetails: action.payload,
                loader: false,
            }
        case 'DELETE_EVENT_COMMENT_FALIURE':
            return {
                ...state,
                status: action.type,
                err_Message: action.payload,
                loader: false
            }
        case 'CREATE_EVENT':
            return {
                ...state,
                status: action.type,
                err_Message: action.payload,
                loader: false,
            }
        case 'CREATE_EVENT_FALIURE':
            return {
                ...state,
                status: action.type,
                err_Message: action.payload,
                loader: false
            }
        case 'CREATE_DISCUSSION':
            return {
                ...state,
                status: action.type,
                err_Message: action.payload,
                loader: false,
            }
        case 'CREATE_DISCUSSION_FALIURE':
            return {
                ...state,
                status: action.type,
                err_Message: action.payload,
                loader: false
            }
        case 'UPLOAD_IMAGE':
            return {
                ...state,
                status: action.type,
                uploadImageData: action.payload,
                loader: false,
            }
        case 'UPLOAD_IMAGE_FALIURE':
            return {
                ...state,
                status: action.type,
                err_Message: action.payload,
                loader: false
            }

        case 'EDIT_PROFILE':
            return {
                ...state,
                status: action.type,
                userData: action.payload,
                err_Message: action.payloadmsg,
                loader: false,
            }
        case 'EDIT_PROFILE_FALIURE':
            return {
                ...state,
                status: action.type,
                err_Message: action.payload,
                loader: false
            }

        case 'CATEGORY_LIST':
            return {
                ...state,
                status: action.type,
                discussionCat: action.payload,
                loader: false,
            }
        case 'CATEGORY_LIST_FALIURE':
            return {
                ...state,
                status: action.type,
                err_Message: action.payload,
                loader: false
            }


        case 'DISCUSSION_DETAILS':
            return {
                ...state,
                status: action.type,
                discussionDetails: action.payload,
                loader: false,
            }
        case 'DISCUSSION_FALIURE':
            return {
                ...state,
                status: action.type,
                err_Message: action.payload,
                loader: false
            }
        case 'HOME_DATA':
            return {
                ...state,
                status: action.type,
                homeData: action.payload,
                loader: false,
            }
        case 'HOME_DATA_FALIURE':
            return {
                ...state,
                status: action.type,
                err_Message: action.payload,
                loader: false
            }
        case 'CREATE_ITEMS':
            return {
                ...state,
                status: action.type,
                err_Message: action.payload,
                loader: false,
            }
        case 'CREATE_ITEMS_FALIURE':
            return {
                ...state,
                status: action.type,
                err_Message: action.payload,
                loader: false
            }

        case 'CONDITIONS_LIST':
            return {
                ...state,
                status: action.type,
                conditionCat: action.payload,
                loader: false,
            }
        case 'CONDITIONS_LIST_FALIURE':
            return {
                ...state,
                status: action.type,
                err_Message: action.payload,
                loader: false
            }

        case 'MY_ITEM_DATA':
            return {
                ...state,
                status: action.type,
                myItemsData: action.payload,
                loader: false,
            }
        case 'MY_ITEM_DATA_FALIURE':
            return {
                ...state,
                status: action.type,
                err_Message: action.payload,
                loader: false
            }

        case 'ITEMS_DETAILS':
            return {
                ...state,
                status: action.type,
                itemsDetails: action.payload,
                loader: false,
            }
        case 'ITEMS_DETAILS_FALIURE':
            return {
                ...state,
                status: action.type,
                err_Message: action.payload,
                loader: false
            }

        case 'SETTING_SUCCESS':
            return {
                ...state,
                status: action.type,
                settingData: action.payload,
                loader: false,
            }
        case 'SETTING_FAILURE':
            return {
                ...state,
                status: action.type,
                err_Message: action.payload,
                loader: false
            }

        case 'SETTING_UPDATE_SUCCESS':
            return {
                ...state,
                status: action.type,
                err_Message: action.payload,
                loader: false,
            }
        case 'SETTING_UPDATE_FALIURE':
            return {
                ...state,
                status: action.type,
                err_Message: action.payload,
                loader: false
            }

        case 'VOLUNTEER_REQ_SUCCESS':
            return {
                ...state,
                status: action.type,
                volunteerData: action.payload,
                loader: false,
            }
        case 'VOLUNTEER_REQ_FAILURE':
            return {
                ...state,
                status: action.type,
                err_Message: action.payload,
                loader: false
            }
        case 'EVENT_REQUEST_LIST':
            return {
                ...state,
                status: action.type,
                eventRequestList: action.payload,
                loader: false,
            }
        case 'EVENT_REQUEST_LIST_FALIURE':
            return {
                ...state,
                status: action.type,
                err_Message: action.payload,
                loader: false
            }
        case 'VOLUNEET_POST_REQUEST':
            return {
                ...state,
                status: action.type,
                err_Message: action.payload,
                loader: true,
            }
        case 'VOLUNEET_POST_REQUEST_FALIURE':
            return {
                ...state,
                status: action.type,
                err_Message: action.payload,
                loader: false
            }
        case 'ACCEPT_REQUEST':
            return {
                ...state,
                status: action.type,
                err_Message: action.payload,
                loader: false,
            }
        case 'ACCEPT_REQUEST_FALIURE':
            return {
                ...state,
                status: action.type,
                err_Message: action.payload,
                loader: false
            }
        case 'LIKES_EVENT':
            return {
                ...state,
                status: action.type,
                err_Message: action.payload,
                loader: true,
            }
        case 'LIKES_EVENT_FALIURE':
            return {
                ...state,
                status: action.type,
                err_Message: action.payload,
                loader: false
            }
        case 'DISCUSSION_REQUEST_LIST':
            return {
                ...state,
                status: action.type,
                discussionRequestList: action.payload,
                loader: false,
            }
        case 'DISCUSSION_REQUEST_LIST_FALIURE':
            return {
                ...state,
                status: action.type,
                err_Message: action.payload,
                loader: false
            }
        case 'RECRUIT_REQUEST':
            return {
                ...state,
                status: action.type,
                err_Message: action.payload,
                loader: false,
            }
        case 'RECRUIT_REQUEST_FALIURE':
            return {
                ...state,
                status: action.type,
                err_Message: action.payload,
                loader: false
            }
        case 'ACCEPT_REQUEST_RECRUITE':
            return {
                ...state,
                status: action.type,
                err_Message: action.payload,
                loader: false,
            }
        case 'ACCEPT_REQUEST_RECRUITE_FALIURE':
            return {
                ...state,
                status: action.type,
                err_Message: action.payload,
                loader: false
            }
        case 'COMMENT_POST_REQUEST':
            return {
                ...state,
                status: action.type,
                err_Message: action.payload,
                loader: true,
            }
        case 'COMMENT_POST_REQUEST_FALIURE':
            return {
                ...state,
                status: action.type,
                err_Message: action.payload,
                loader: false
            }
        case 'ACCEPT_DISCUSSION_REQUEST':
            return {
                ...state,
                status: action.type,
                err_Message: action.payload,
                loader: true,
            }
        case 'ACCEPT_DISCUSSION_FALIURE':
            return {
                ...state,
                status: action.type,
                err_Message: action.payload,
                loader: false
            }

        case 'FOLLOW_REQUEST':
            return {
                ...state,
                status: action.type,
                followRequestList: action.payload,
                loader: false,
            }
        case 'FOLLOW_REQUEST_FALIURE':
            return {
                ...state,
                status: action.type,
                err_Message: action.payload,
                loader: false
            }
        case 'FOLLOW_ACCEPT':
            return {
                ...state,
                status: action.type,
                err_Message: action.payload,
                loader: false,
            }
        case 'FOLLOW_FAILURE':
            return {
                ...state,
                status: action.type,
                err_Message: action.payload,
                loader: false
            }
        case 'FOLLOW_LIST':
            return {
                ...state,
                status: action.type,
                followList: action.payload,
                loader: false,
            }
        case 'FOLLOW_LIST_FALIURE':
            return {
                ...state,
                status: action.type,
                err_Message: action.payload,
                loader: false
            }
        case 'NOTIFICATION_CLEAR':
            return {
                ...state,
                status: action.type,
                err_Message: action.payload,
                loader: false,
            }
        case 'NOTIFICATION_CLEAR_FAILURE':
            return {
                ...state,
                status: action.type,
                err_Message: action.payload,
                loader: false
            }

        case 'CHAT_DATA':
            return {
                ...state,
                status: action.type,
                chatData: action.payload,
                loader: false,
            }
        case 'CHAT_DATA_FAILURE':
            return {
                ...state,
                status: action.type,
                err_Message: action.payload,
                loader: false
            }
        case 'CHAT_LIST':
            return {
                ...state,
                status: action.type,
                chatList: action.payload,
                loader: false,
            }
        case 'CHAT_LIST_FAILURE':
            return {
                ...state,
                status: action.type,
                err_Message: action.payload,
                loader: false
            }

        case 'EVENT_IMAGES':
            return {
                ...state,
                status: action.type,
                eventImgages: action.payload,
                loader: false,
            }
        case 'EVENT_IMAGES_FAILURE':
            return {
                ...state,
                status: action.type,
                err_Message: action.payload,
                loader: false
            }


        case 'INVITE_USER':
            return {
                ...state,
                status: action.type,
                err_Message: action.payload,
                loader: false,
            }
        case 'INVITE_USER_FAILURE':
            return {
                ...state,
                status: action.type,
                err_Message: action.payload,
                loader: false
            }

        case 'TERMS_DATA':
            return {
                ...state,
                status: action.type,
                termsData: action.payload,
                loader: false,
            }
        case 'TERMS_DATA_FAILURE':
            return {
                ...state,
                status: action.type,
                err_Message: action.payload,
                loader: false
            }

        case 'NOTIFICATION_SINGLE_CLEAR':
            return {
                ...state,
                status: action.type,
                err_Message: action.payload,
                loader: false,
            }
        case 'NOTIFICATION_SINGLE_CLEAR_FAILURE':
            return {
                ...state,
                status: action.type,
                err_Message: action.payload,
                loader: false
            }

        case 'CLEAR_STATE':
            return {
                ...state,
                status: '',
                err_Message: '',
            }
    }
    return state;
}