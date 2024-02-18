export const initialState = {
    isLoggingIn: false, // trying login
    isLoggedIn: false,
    isLoggingOut: false, // trying logout
    self: null,
    signUpData: {},
    loginData:{},
}
//action creator
export const loginRequestAction = (data) => {
    return{
        type: 'LOG_IN_REQUEST',
        data,
    }
}

//action creator
export const logoutRequestAction = () => {
    return{
        type: 'LOG_OUT_REQUEST',
    }
}

const reducer = (state = initialState, action) => {
   switch (action.type){
       case 'LOG_IN_REQUEST':
           console.log('reducer logIn')
           return {
               ...state,
               isLoggingIn: true,
               // self:action.data,
           };
       case 'LOG_IN_SUCCESS':
           return {
               ...state,
               isLoggingIn: false,
               isLoggedIn: true,
               self: { ...action.data, nickname: 'sammy'},
               // self:action.data,
           };
       case 'LOG_IN_FAILURE':
           return {
               ...state,
               isLoggingIn: false,
               isLoggedIn: false,
           };
       case 'LOG_OUT_REQUEST':
           return {
               ...state,
               isLoggingOut: true,
           };
       case 'LOG_OUT_SUCCESS':
           return {
               ...state,
               isLoggingOut: false,
               isLoggedIn: false,
               self:null,
           };
       case 'LOG_OUT_FAILURE':
           return {
               ...state,
               isLoggingOut: false,
               self:null,
           };
       default :
           return state;

   }
};

export default reducer;