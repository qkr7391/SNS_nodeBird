import { produce } from 'immer';


export const initialState = {
    followLoading: false, //trying follow
    followDone: false,
    followError: null,
    unfollowLoading: false, //trying unfollow
    unfollowDone: false,
    unfollowError: null,
    loadFollowersLoading: false, //trying follow
    loadFollowersDone: false,
    loadFollowersError: null,
    loadFollowingsLoading: false, //trying follow
    loadFollowingsDone: false,
    loadFollowingsError: null,
    logInLoading: false, //trying login
    logInDone: false,
    logInError: null,
    logOutLoading: false, // trying logout
    logOutDone: false,
    logOutError: null,
    signUpLoading: false, // trying sing up
    signUpDone: false,
    signUpError: null,
    changeNicknameLoading: false, // trying to change nickname
    changeNicknameDone: false,
    changeNicknameError: null,
    loadUserLoading: false, //trying load user infor
    loadUserDone: false,
    loadUserError: null,
    self: null,
    signUpData: {},
    loginData: {},
}

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const CHANGE_NICKNAME_REQUEST = 'CHANGE_NICKNAME_REQUEST';
export const CHANGE_NICKNAME_SUCCESS = 'CHANGE_NICKNAME_SUCCESS';
export const CHANGE_NICKNAME_FAILURE = 'CHANGE_NICKNAME_FAILURE';

export const FOLLOW_REQUEST = 'FOLLOW_REQUEST';
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS';
export const FOLLOW_FAILURE = 'FOLLOW_FAILURE';

export const UNFOLLOW_REQUEST = 'UNFOLLOW_REQUEST';
export const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS';
export const UNFOLLOW_FAILURE = 'UNFOLLOW_FAILURE';

export const LOAD_FOLLOWERS_REQUEST = 'LOAD_FOLLOWERS_REQUEST';
export const LOAD_FOLLOWERS_SUCCESS = 'LOAD_FOLLOWERS_SUCCESS';
export const LOAD_FOLLOWERS_FAILURE = 'LOAD_FOLLOWERS_FAILURE';

export const LOAD_FOLLOWINGS_REQUEST = 'LOAD_FOLLOWINGS_REQUEST';
export const LOAD_FOLLOWINGS_SUCCESS = 'LOAD_FOLLOWINGS_SUCCESS';
export const LOAD_FOLLOWINGS_FAILURE = 'LOAD_FOLLOWINGS_FAILURE';


export const ADD_POST_TO_ME = 'ADD_POST_TO_ME';
export const DELETE_POST_OF_ME= 'DELETE_POST_OF_ME'


export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST';
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE';


// const dummyUser = (data) => ({
//     ...data,
//     nickname: 'Sammy',
//     id: 1,
//     Posts:[{ id:1 }],
//     Followings: [{nickname: 'ssm'}, {nickname: 'erasdr'}, {nickname: 'qwer12'}],
//     Followers: [{nickname: 'ssm'}, {nickname: 'erasdr'}, {nickname: 'qwer12'}],
// })

//action creator
export const loginRequestAction = (data) => {
    return{
        type: LOG_IN_REQUEST,
        data,
    }
}

//action creator
export const logoutRequestAction = () => {
    return{
        type: LOG_OUT_REQUEST,
    }
}

const reducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
            case FOLLOW_REQUEST:
                draft.followLoading = true;
                draft.followDone = false;
                draft.followError = null;
                break;
            case FOLLOW_SUCCESS:
                draft.followLoading = false;
                draft.followDone = true;
                draft.self.Followings.push({ id: action.data.UserId }) ;
                break;
            case FOLLOW_FAILURE:
                draft.followLoading = false;
                draft.followError = action.error;
                break;
            case UNFOLLOW_REQUEST:
                draft.unfollowLoading = true;
                draft.unfollowDone = false;
                draft.unfollowError = null;
                break;
            case UNFOLLOW_SUCCESS:
                draft.unfollowLoading = false;
                draft.unfollowDone = true;
                draft.self.Followings = draft.self.Followings.filter((v) => v.id !== action.data.UserId) ;
                break;
            case UNFOLLOW_FAILURE:
                draft.unfollowLoading = false;
                draft.unfollowError = action.error;
                break;
            case LOAD_FOLLOWERS_REQUEST:
                return {
                    ...state,
                    loadFollowersLoading: true,
                    loadFollowersDone: false,
                    loadFollowersError: null
                };
            case LOAD_FOLLOWERS_SUCCESS:
                console.log("Followers data:", action.data);
                return {
                    ...state,
                    loadFollowersLoading: false,
                    loadFollowersDone: true,
                    Followers: action.data
                };
            case LOAD_FOLLOWERS_FAILURE:
                return {
                    ...state,
                    loadFollowersLoading: false,
                    loadFollowersError: action.error
                };
            case LOAD_FOLLOWINGS_REQUEST:
                return {
                    ...state,
                    loadFollowingsLoading: true,
                    loadFollowingsDone: false,
                    loadFollowingsError: null
                };
            case LOAD_FOLLOWINGS_SUCCESS:
                console.log("Followers data:", action.data);
                return {
                    ...state,
                    loadFollowingsLoading: false,
                    loadFollowingsDone: true,
                    Followings: action.data
                };
            case LOAD_FOLLOWINGS_FAILURE:
                return {
                    ...state,
                    loadFollowingsLoading: false,
                    loadFollowingsError: action.error
                };
            case LOG_IN_REQUEST:
                draft.logInLoading = true;
                draft.logInDone = false;
                draft.logInError = null;
                break;
            case LOG_IN_SUCCESS:
                draft.logInLoading = false;
                draft.logInDone = true;
                draft.self = action.data;
                break;
            case LOG_IN_FAILURE:
                draft.logInLoading = false;
                draft.logInError = action.error;
                break;
            case LOG_OUT_REQUEST:
                draft.logOutLoading = true;
                draft.logOutDone = false;
                draft.logOutError = null;
                break;
            case LOG_OUT_SUCCESS:
                draft.logOutLoading = false;
                draft.logOutDone = true;
                draft.self = null;
                break;
            case LOG_OUT_FAILURE:
                draft.logOutLoading = false;
                draft.logOutError = action.error;
                draft.self = null;
                break;
            case SIGN_UP_REQUEST:
                draft.signUpLoading = true;
                draft.signUpDone = false;
                draft.signUpError = null;
                break;
            case SIGN_UP_SUCCESS:
                draft.signUpLoading = false;
                draft.signUpDone = true;
                break;
            case SIGN_UP_FAILURE:
                draft.signUpLoading = false;
                draft.signUpError = action.error;
                break;
            case CHANGE_NICKNAME_REQUEST:
                draft.changeNicknameLoading = true;
                draft.changeNicknameDone = false;
                draft.changeNicknameError = null;
                break;
            case CHANGE_NICKNAME_SUCCESS:
                //Reflecting a changed nickname
                draft.self.nickname = action.data.nickname;
                draft.changeNicknameLoading = false;
                draft.changeNicknameDone = true;
                break;
            case CHANGE_NICKNAME_FAILURE:
                draft.self.nickname = action.data.nickname;
                draft.changeNicknameLoading = false;
                draft.changeNicknameError = action.error;
                break;
            case LOAD_USER_REQUEST:
                draft.loadUserLoading = true;
                draft.loadUserDone = false;
                draft.loadUserError = null;
                break;
            case LOAD_USER_SUCCESS:
                draft.loadUserLoading = false;
                draft.loadUserDone = true;
                draft.self = action.data;
                break;
            case LOAD_USER_FAILURE:
                draft.loadUserLoading = false;
                draft.loadUserError = action.error;
                break;
            case ADD_POST_TO_ME:
                draft.self.Posts.unshift({id: action.data});
                break;
            case DELETE_POST_OF_ME:
                draft.self.Posts = draft.self.Posts.filter(v => v.id !== action.data);
                break;
            default:
                break;
        }
    })
};



export default reducer;
