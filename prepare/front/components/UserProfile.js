import React, { useCallback } from 'react';
import { Card, Avatar, Button } from 'antd';
import styled from 'styled-components';
import { useDispatch, useSelector } from "react-redux";

import { LOG_OUT_REQUEST } from '../reducers/user'

const ButtonWrapper = styled.div`
 margin-top: 20px;
`

const CardWrapper = styled(Card)`
  margin-top: 50px;
  margin-left: 40px;
`

const UserProfile = () => {
    const dispatch = useDispatch();

    const { self, logOutLoading } = useSelector((state) => state.user)

    const onLogOut = useCallback(()=>{
        // setIsLoggedIn(false);
        dispatch({
            type: LOG_OUT_REQUEST,
        });
    },[]);

    return (

        <CardWrapper
            actions={[
                self.Posts && <div key="twit">Twit<br/>{self.Posts.length}</div>,
                self.Followings && <div key="followings">Followings<br/>{self.Followings.length}</div>,
                self.Followers && <div key="followers">Followers<br/>{self.Followers.length}</div>
            ]}
        >

           <Card.Meta
               avatar={<Avatar>{self.nickname}</Avatar>}
               title={self.nickname}
               />


           <ButtonWrapper>
               <Button onClick={onLogOut}>Log out</Button>
           </ButtonWrapper>
       </CardWrapper>
    );
}

export default UserProfile;