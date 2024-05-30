import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';

import user from './user';
import post from './post';

// Combine all reducers
const combinedReducer = combineReducers({
    user,
    post,
});

// Reducer => it receives the previous state and action, returning a new state based on them
const rootReducer = (state, action) => {
    switch (action.type) {
        case HYDRATE:
            console.log('HYDRATE', action);
            return { ...state, ...action.payload }; // Merging the payload with the current state
        default:
            return combinedReducer(state, action);
    }
};

export default rootReducer;
