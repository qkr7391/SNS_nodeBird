import React, { useState, useCallback } from "react";
import Head from "next/head";
import { Checkbox, Form, Input, Button } from "antd";
import styled from "styled-components";

import AppLayout from "../components/AppLayout";
import useInput from "../hooks/useinput";

const ErrorMessage = styled.div`
	color: red;
`;

const Signup = () => {
	const [id, onChangeId] = useInput("");
	console.log(id);
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
		console.log(id, nickname, password);
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
						<label htmlFor="user-id">ID</label>
						<br />
						<Input name="user-id" value={id} required onChange={onChangeId} />
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
						<Button type="primary" htmlType="submit">
							Sign up
						</Button>
					</div>
				</Form>
			</AppLayout>
		</>
	);
};

export default Signup;
