import React, { useCallback} from "react";
import Link from "next/link";
import { Form, Input, Button } from "antd";
import styled from "styled-components";

import useInput from "../hooks/useinput";
import {useDispatch} from "react-redux";

import {loginAction} from "../reducers/user";

const ButtonWrapper = styled.div`
	margin-top: 10px;
`;

const FormWrapper = styled(Form)`
	padding: 20px;
`;

const LoginForm = () => {
	const dispatch = useDispatch();
	const [id, onChangeId] = useInput("aaa");
	const [password, onChangePassword] = useInput("aaa");

	const onSubmitForm = useCallback(
		(e) => {
			console.log(id, password);
			// setIsLoggedIn(true);
			dispatch(loginAction({id, password}));
		},
		[id, password]
	);

	return (
		<FormWrapper onFinish={onSubmitForm}>
			<div>
				<label htmlFor="uesr-id"> ID </label>
				<br />
				<Input name="user-id" value={id} onChange={onChangeId} required />
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
				<Button type="primary" htmlType="submit" loading={false}>
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
