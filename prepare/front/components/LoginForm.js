import React, {useCallback, useState} from 'react';
import Link from 'next/link';
import {Form, Input, Button} from 'antd';
import styled from 'styled-components';


const ButtonWrapper = styled.div`
margin-top: 10px;
`


const LoginForm = () => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');

    const onChangeId = useCallback((e) => {
        setId(e.target.value);
    },[]);

    const onChangePassword = useCallback((e) => {
        setPassword(e.target.value);
    },[]);

    const onChangePasswordCheck = useCallback((e) => {
        setPasswordCheck(e.target.value);
    },[]);


    return (
        <Form>
            <div>
                <label htmlFor="uesr-id"> ID </label>
                <br />
                <Input name="user-id"
                       value={id}
                       onChange={onChangeId}
                       required/>
            </div>
            <div>
                <label htmlFor="uesr-password"> PASSWORD </label>
                <br />
                <Input name="user-password"
                       type="password"
                       value={password}
                       onChange={onChangePassword}
                       required/>

            </div>

            {/*<div>*/}
            {/*    <label htmlFor="uesr-passwordCheck"> PASSWORD CHECK </label>*/}
            {/*    <br />*/}
            {/*    <Input name="user-passwordCheck"*/}
            {/*           type="passwordCheck"*/}
            {/*           value={passwordCheck}*/}
            {/*           onChange={onChangePasswordCheck}*/}
            {/*           required/>*/}
            {/*</div>*/}
            <ButtonWrapper>
                <Button type="primary"
                        htmlType="submit"
                        loading={false}> Login </Button>
                <Link legacyBehavior href="/signup"><a><Button>Signup</Button></a></Link>
            </ButtonWrapper>
        </Form>
    );
}

export default LoginForm;