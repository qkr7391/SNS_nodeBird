import { useState, useCallback } from "react";

export default (initialValue = null) => {
	// console.log(initialValue);
	const [value, setValue] = useState(initialValue);
	const handler = useCallback((e) => {
		setValue(e.target.value);
	}, []);
	// console.log(value)
	return [value, handler, setValue];
};
