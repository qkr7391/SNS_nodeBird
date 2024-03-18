export const initialState = {
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

export const ADD_POST_TO_ME = 'ADD_POST_TO_ME';
export const DELETE_POST_OF_ME= 'DELETE_POST_OF_ME'



const dummyUser = (data) => ({
    ...data,
    nickname: 'Sammy',
    id: 1,
    Posts:[{id:1}],
    Followings: [{nickname: 'ssm'}, {nickname: 'erasdr'}, {nickname: 'qwer12'}],
    Followers: [{nickname: 'ssm'}, {nickname: 'erasdr'}, {nickname: 'qwer12'}],
})

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
   switch (action.type){
       case LOG_IN_REQUEST:
           return {
               ...state,
               logInLoading: true,
               logInDone: false,
               logInError: null,

           };
       case LOG_IN_SUCCESS:
           return {
               ...state,
               logInLoading: false,
               logInDone: true,
               // self: { ...action.data, nickname: 'sammy'},
               self: dummyUser(action.data),
           };
       case LOG_IN_FAILURE:
           return {
               ...state,
               logInLoading: false,
               logInError: action.error,

           };
       case LOG_OUT_REQUEST:
           return {
               ...state,
               logOutLoading: true, // trying logout
               logOutDone: false,
               logOutError: null,
           };
       case LOG_OUT_SUCCESS:
           return {
               ...state,
               logOutLoading: false,
               logOutDone: true,
               self:null,
           };
       case LOG_OUT_FAILURE:
           return {
               ...state,
               logOutLoading: false,
               logOutError: action.error,
               self:null,
           };

       case SIGN_UP_REQUEST:
           return {
               ...state,
               signUpLoading: true,
               signUpDone: false,
               signUpError:null,
           };
       case SIGN_UP_SUCCESS:
           return {
               ...state,
               signUpLoading: false,
               signUpDone: true,
           };
       case SIGN_UP_FAILURE:
           return {
               ...state,
               signUpLoading: false,
               signUpError: action.error,
           };
       case CHANGE_NICKNAME_REQUEST:
           return {
               ...state,
               changeNicknameLoading: true,
               changeNicknameDone: false,
               changeNicknameError:null,
           };
       case CHANGE_NICKNAME_SUCCESS:
           return {
               ...state,
               changeNicknameLoading: false,
               changeNicknameDone: true,
           };
       case CHANGE_NICKNAME_FAILURE:
           return {
               ...state,
               changeNicknameLoading: false,
               changeNicknameError: action.error,
           };
       case ADD_POST_TO_ME:
           return{
               ...state,
               self:{
                   ...state.self,
                   Posts: [{id: action.data}, ...state.self.Posts],
               }
           };
       case DELETE_POST_OF_ME:
           return{
               ...state,
               self:{
                   ...state.self,
                   Posts: state.self.Posts.filter((v) => v.id !== action.data ),
               }
           };
       default :
           return state;

   }
};

export default reducer;