import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from "redux";
import user from './user';
import post from './post';

const initialState = {
    user:{

    },
    post:{

    }
}



// Reducer => it receives the previous state and action, returning a new state based on them
const rootReducer = combineReducers({ // Corrected the syntax
 index: (state = {}, action) => {
     switch (action.type) {
         case HYDRATE:
             return { ...state, ...action.payload};

         // Return the default state if the action type doesn't match
         default:
             return {
                 ...state
             };
     }
 },
    user,
    post,
 })


export default rootReducer;