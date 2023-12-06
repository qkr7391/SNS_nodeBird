import React, { useCallback } from 'react';
import { Card, Avatar, Button } from 'antd';
import styled from 'styled-components';

const ButtonWrapper = styled.div`
 margin-top: 20px;
`

const CardWrapper = styled(Card)`
  margin-top: 50px;
  margin-left: 40px;
`

const UserProfile = ({ setIsLoggedIn }) => {

    const onLogOut = useCallback(()=>{
        setIsLoggedIn(false);
    },[]);

    return (

       <CardWrapper
            actions={[
                <div key="twit">Twit<br/>0</div>,
                <div key="followings">Followings<br/>0</div>,
                <div key="followers">Followers<br/>0</div>
            ]}>

           <Card.Meta
               avatar={<Avatar>SMP</Avatar>}
               title="SaemiPark" />

           <ButtonWrapper>
               <Button onClick={onLogOut}>Log out</Button>
           </ButtonWrapper>
       </CardWrapper>
    );
}

export default UserProfile;