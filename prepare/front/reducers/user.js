export const initialState = {
    isLoggedIn: false,
    self: null,
    signUpData: {},
    loginData:{},
}
//action creator
export const loginAction = (data) => {
    return{
        type: 'LOG_IN',
        data,
    }
}

//action creator
export const logoutAction = () => {
    return{
        type: 'LOG_OUT',
    }
}
const reducer = (state = initialState, action) => {
   switch (action.type){
       case 'LOG_IN':
           return {
               ...state,
               isLoggedIn: true,
               self:action.data,
           };
       case 'LOG_OUT':
           return {
               ...state,
               isLoggedIn: false,
               self:null,
           };
       default :
           return state;

   }
};

export default reducer;