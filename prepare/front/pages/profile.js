import React, { useEffect } from "react";
import Head from "next/head";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';

import AppLayout from "../components/AppLayout";
import NicknameEditForm from "../components/NicknameEditForm";
import FollowList from "../components/FollowList";
import {LOAD_FOLLOWERS_REQUEST, LOAD_FOLLOWINGS_REQUEST, LOAD_MY_INFO_REQUEST} from "../reducers/user";
import wrapper from "../store/configureStore";
import axios from "axios";
import {LOAD_POSTS_REQUEST} from "../reducers/post";
import {END} from "redux-saga";
// import {Router} from "next/router";

const Profile = () => {
	// const followerList = [
	// 	{ nickname: "Sammy" },
	// 	{ nickname: "Sarah" },
	// 	{ nickname: "Ruby" },
	// ];
	// const followingList = [
	// 	{ nickname: "Sammy" },
	// 	{ nickname: "Sarah" },
	// 	{ nickname: "Ruby" },
	// ];

	const dispatch = useDispatch();
	const { self } = useSelector((state) => state.user)
	const router = useRouter();

	useEffect(() => {
		dispatch({
			type: LOAD_FOLLOWERS_REQUEST,
		});
		dispatch({
			type: LOAD_FOLLOWINGS_REQUEST,
		});
	}, []);

	useEffect(() => {
		if (!(self && self.id)) {
			router.push('/');
		}
	}, [self, router]);


	if(!self){
		return null;
	}

	console.log('self.Followings:', self.Followings);
	console.log('self.Followers:', self.Followers);

	return (
		<>
			<Head>
				<meta charSet="utf-8" />
				<title> My Profile | NodeBird </title>
			</Head>
			<AppLayout>
				<NicknameEditForm />
				<FollowList header="following" data={self.Followings} />
				<FollowList header="follower" data={self.Followers} />
			</AppLayout>
		</>
	);
};


export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
	const cookie = context.req ? context.req.headers.cookie : '';
	axios.defaults.headers.Cookie = '';

	if (context.req && cookie) {
		axios.defaults.headers.Cookie = cookie;
	}


	store.dispatch({
		type: LOAD_MY_INFO_REQUEST,
	});
	store.dispatch({
		type: LOAD_POSTS_REQUEST,
	});

	store.dispatch(END);

	// Wait for all the actions to be executed
	await store.sagaTask.toPromise();

});


export default Profile;
