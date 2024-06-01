import React from 'react';
import { useSelector } from 'react-redux';
import Head from 'next/head';
import { END } from 'redux-saga';

import { Avatar, Card } from 'antd';
import AppLayout from "../components/AppLayout";
import wrapper from "../store/configureStore";
import { LOAD_USER_REQUEST } from "../reducers/user";

const About = () => {
    const { userInfo } = useSelector((state) => state.user);
    // console.log('userInfo:', userInfo);
    return (
        <AppLayout>
            <Head>
                <title>Sammy Park | NodeBird</title>
            </Head>
            {userInfo ? (
                <Card
                    actions={[
                        <div key="twit">
                            Twit
                            <br />
                            {userInfo.Posts}
                        </div>,
                        <div key="following">
                            Following
                            <br />
                            {userInfo.Followings}
                        </div>,
                        <div key="follower">
                            Follower
                            <br />
                            {userInfo.Followers}
                        </div>,
                    ]}
                >
                    <Card.Meta
                        avatar={<Avatar>{userInfo.nickname}</Avatar>}
                        title={userInfo.nickname}
                        description="NodeBird User"
                    />
                </Card>
            ) : null}
        </AppLayout>
    );
};

export const getStaticProps = wrapper.getStaticProps((store) => async (context) => {
    store.dispatch({
        type: LOAD_USER_REQUEST,
        data: 1,
    });
    store.dispatch(END);
    await store.sagaTask.toPromise();

    return { props: {} }; // Return an empty props object to satisfy Next.js requirements
});

export default About;
