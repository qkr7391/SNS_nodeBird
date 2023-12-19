import { createWrapper } from "next-redux-wrapper";
import { createStroe } from "redux";

const configureStore = () => {
	const store = createStroe(reducer, enhancer);
	return store;
};

const wrapper = createWrapper(configureStore, {
	debug: process.env.NODE_ENV === "develpoment",
});

export default wrapper;
