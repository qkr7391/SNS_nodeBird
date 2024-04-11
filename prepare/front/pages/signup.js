import React, {useState, useCallback, useEffect} from "react";
import Head from "next/head";
import Router from 'next/router';
import { Checkbox, Form, Input, Button } from "antd";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import AppLayout from "../components/AppLayout";
import useInput from "../hooks/useinput";
import { SIGN_UP_REQUEST } from "../reducers/user";

const ErrorMessage = styled.div`
	color: red;
`;

const Signup = () => {
	const dispatch = useDispatch();
	const { signUpLoading, signUpDone, signUpError } = useSelector((state)=> state.user);
	const { self } = useSelector((state) => state.user);

	useEffect(() => {
		if(self && self.id){
			Router.replace('/');
		}
	}, [self && self.id]);

	useEffect(() => {
		if(signUpDone) {
			Router.push('/');
		}
	}, [signUpDone]);

	useEffect(() => {
		if(signUpError){
			alert(signUpError);
		}
	}, [signUpError]);

	const [email, onChangeEmail] = useInput("");
	console.log(email);
	const [nickname, onChangeNickname] = useInput("");
	const [password, onChangePassword] = useInput("");

	const [passwordCheck, setPasswordCheck] = useState("");
	const [passwordError, setPasswordError] = useState(false);
	const onChangePasswordCheck = useCallback(
		(e) => {
			setPasswordCheck(e.target.value);
			setPasswordError(e.target.value !== password);
		},
		[password]
	);

	const [term, setTerm] = useState("");
	const [termError, setTermError] = useState(false);
	const onChangeTerm = useCallback((e) => {
		setTerm(e.target.checked);
		setTermError(false);
	}, []);

	const onSubmit = useCallback(() => {
		if (password !== passwordCheck) {
			return setPasswordError(true);
		}
		if (!term) {
			return setTermError(true);
		}
		console.log(email, nickname, password);
		dispatch({
			type: SIGN_UP_REQUEST,
			data: {email, password, nickname},
		});
	}, [password, passwordCheck, term]);

	return (
		<>
			<AppLayout>
				<Head>
					<meta charSet="utf-8" />
					<title> Sign Up | NodeBird </title>
				</Head>
				<Form onFinish={onSubmit}>
					<div>
						<label htmlFor="user-email">Email</label>
						<br />
						<Input name="user-email" type="email" value={email} required onChange={onChangeEmail} />
					</div>
					<div>
						<label htmlFor="user-nickname">Nickname</label>
						<br />
						<Input
							name="user-nickname"
							value={nickname}
							required
							onChange={onChangeNickname}
						/>
					</div>
					<div>
						<label htmlFor="user-password">Password</label>
						<br />
						<Input
							name="user-password"
							type="password"
							value={password}
							required
							onChange={onChangePassword}
						/>
					</div>
					<div>
						<label htmlFor="user-password-check">Password Check</label>
						<br />
						<Input
							name="user-password-check"
							type="password"
							value={passwordCheck}
							required
							onChange={onChangePasswordCheck}
						/>
						{passwordError && (
							<ErrorMessage>Password do not match.</ErrorMessage>
						)}
					</div>
					<div>
						<Checkbox name="user-term" checked={term} onChange={onChangeTerm}>
							Agree
						</Checkbox>
						{termError && (
							<ErrorMessage>Agree to Terms and Conditions</ErrorMessage>
						)}
					</div>
					<div style={{ marginTop: 10 }}>
						<Button type="primary" htmlType="submit" loading={signUpLoading}>
							Sign up
						</Button>
					</div>
				</Form>
			</AppLayout>
		</>
	);
};

export default Signup;
