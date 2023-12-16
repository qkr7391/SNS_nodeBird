import React, { useCallback, useState } from "react";
import Link from "next/link";
import { Form, Input, Button } from "antd";
import styled from "styled-components";
import PropTypes from "prop-types";

import useInput from "../hooks/useinput";

const ButtonWrapper = styled.div`
	margin-top: 10px;
`;

const FormWrapper = styled(Form)`
	padding: 20px;
`;

const LoginForm = ({ setIsLoggedIn }) => {
	const [id, onChangeId] = useInput("aaa");
	const [password, onChangePassword] = useInput("aaa");

	const onSubmitForm = useCallback(
		(e) => {
			// console.log(id + "***" + password);
			setIsLoggedIn(true);
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

LoginForm.propTypes = {
	setIsLoggedIn: PropTypes.func.isRequired,
};

export default LoginForm;
