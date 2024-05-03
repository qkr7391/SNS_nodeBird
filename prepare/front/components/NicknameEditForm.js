import React, { useCallback, useMemo } from "react";
import { Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { CHANGE_NICKNAME_REQUEST } from "../reducers/user";

import useInput from '../hooks/useinput';


const NicknameEditForm = () => {
	const { self } = useSelector((state) => state.user);
	const [nickname, onChangeNickname] = useInput(self?.nickname || '');
	const dispatch = useDispatch();

	const onSubmit = useCallback(() => {
		dispatch({
			type: CHANGE_NICKNAME_REQUEST,
			data: nickname,
		});
	}, [nickname]);

	const style = useMemo(() => ({
		marginBottom: "20px",
		border: "1px solid #d9d9d9",
		padding: "20px",
	}));

	return (
		<Form
			style={style}
			//onFinish={onSubmit}
		>
			<Input.Search
				value={nickname}
				onChange={onChangeNickname}
				onSearch={onSubmit}
				addonBefore="Nickname"
				enterButton="edit" />
		</Form>
	);
};

export default NicknameEditForm;
