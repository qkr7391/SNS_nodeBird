import { createWrapper } from 'next-redux-wrapper';
import {applyMiddleware, createStore, compose} from 'redux';
import reducer from '../reducers'
import {composeWithDevTools} from "redux-devtools-extension";

const configureStore = () => {
	const middlewares = [];
	const enhancer = process.env.NODE_ENV === 'production'
	? compose(applyMiddleware(...middlewares)) // deploy version
	:composeWithDevTools(applyMiddleware(...middlewares)) //develop version
	const store = createStore(reducer, enhancer);

	return store;
};

const wrapper = createWrapper(configureStore, {
	debug: process.env.NODE_ENV === "develpoment",
});

export default wrapper;
