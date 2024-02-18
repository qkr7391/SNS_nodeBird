import React, { useCallback } from 'react';
import { Card, Avatar, Button } from 'antd';
import styled from 'styled-components';
import { useDispatch, useSelector } from "react-redux";

import { logoutRequestAction } from '../reducers/user'

const ButtonWrapper = styled.div`
 margin-top: 20px;
`

const CardWrapper = styled(Card)`
  margin-top: 50px;
  margin-left: 40px;
`

const UserProfile = () => {
    const dispatch = useDispatch();

    const { self, isLoggingOut } = useSelector((state) => state.user)

    const onLogOut = useCallback(()=>{
        // setIsLoggedIn(false);
        dispatch(logoutRequestAction());
    },[]);

    return (

       <CardWrapper
            actions={[
                <div key="twit">Twit<br/>0</div>,
                <div key="followings">Followings<br/>0</div>,
                <div key="followers">Followers<br/>0</div>
            ]}>

           <Card.Meta
               avatar={<Avatar>{self.nickname[0]}</Avatar>}
               title={self.nickname}/>

           <ButtonWrapper>
               <Button onClick={onLogOut} loading={isLoggingOut}>Log out</Button>
           </ButtonWrapper>
       </CardWrapper>
    );
}

export default UserProfile;