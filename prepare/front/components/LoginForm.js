import React, { useCallback } from "react";
import Link from "next/link";
import { Form, Input, Button } from "antd";
import styled from "styled-components";

import useInput from "../hooks/useinput";
import { useDispatch, useSelector } from "react-redux";
import {LOG_IN_REQUEST, loginRequestAction} from "../reducers/user";

// import { loginRequestAction } from "../reducers/user";

const ButtonWrapper = styled.div`
	margin-top: 10px;
`;

const FormWrapper = styled(Form)`
	padding: 20px;
`;

const LoginForm = () => {
	const dispatch = useDispatch();

	const { logInLoading } = useSelector((state) => state.user)

	const [email, onChangeEmail] = useInput("aaa@a.a");
	const [password, onChangePassword] = useInput("aaa");

	const onSubmitForm = useCallback(
		(e) => {
			console.log(email, password);
			// setIsLoggedIn(true);
			dispatch(loginRequestAction({email, password}));
			// dispatch({
			// 	type: LOG_IN_REQUEST,
			// 	data: {
			// 		id: email,
			// 		password,
			// 	}
			// })
		},[email, password]
	);

	return (
		<FormWrapper onFinish={onSubmitForm}>
			<div>
				<label htmlFor="uesr-email"> Email </label>
				<br />
				<Input name="user-email" type="email" value={email} onChange={onChangeEmail} required />
			</div>
			<div>
				<label htmlFor="uesr-password"> PASSWORD </label>
				<br />
				<Input
					name="user-password"
					type="password"
					value={password}
					onChange={onChangePassword}
					required
				/>
			</div>

			<ButtonWrapper>
				<Button type="primary" htmlType="submit" loading={logInLoading}>
					{" "}
					Login{" "}
				</Button>
				<Link legacyBehavior href="/signup">
					<a>
						<Button>Signup</Button>
					</a>
				</Link>
			</ButtonWrapper>
		</FormWrapper>
	);
};


export default LoginForm;
