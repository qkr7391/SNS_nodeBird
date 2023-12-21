// import { HYDRATE } from 'next-redux-wrapper';

const initialState = {
    user:{
    isLoggedIn: false,
        user: null,
        signUpData: {},
        loginData:{},
    },
    post:{
    mainPost: [],
    }
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
// Reducer => it receives the previous state and action, returning a new state based on them
const rootReducer = (state = initialState, action) => { // Corrected the syntax
    switch (action.type) {
        // case HYDRATE:
        //     return { ...state, ...action.payload};
        case 'LOG_IN':
            return {
                ...state,
                user:{
                    ...state.user,
                    isLoggedIn: true,
                    user:action.data,
                }
            };
        case 'LOG_OUT':
            return {
                ...state,
                user:{
                    ...state.user,
                    isLoggedIn: false,
                    user:null,
                }
            };
        default:
            return state; // Return the default state if the action type doesn't match
    }
};

export default rootReducer;