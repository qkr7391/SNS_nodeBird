import React, { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';

import AppLayout from "../components/AppLayout";
import NicknameEditForm from "../components/NicknameEditForm";
import FollowList from "../components/FollowList";
import { LOAD_MY_INFO_REQUEST } from "../reducers/user";
import wrapper from "../store/configureStore";
import axios from "axios";
import { LOAD_POSTS_REQUEST } from "../reducers/post";
import { END } from "redux-saga";
import useSWR from "swr";

const fetcher = (url) => axios.get(url, { withCredentials: true }).then((result) => result.data);

const Profile = () => {
	const dispatch = useDispatch();
	const { self } = useSelector((state) => state.user)
	const router = useRouter();

	const [followersLimit, setFollowersLimit] = useState(3);
	const [followingsLimit, setFollowingsLimit] = useState(3);

	const { data: followersData, error: followerError } = useSWR(`http://localhost:3065/user/followers?limit=${followersLimit}`, fetcher);
	const { data: followingsData, error: followingError } = useSWR(`http://localhost:3065/user/followings?limit=${followingsLimit}`, fetcher);

	useEffect(() => {
		if (!(self && self.id)) {
			router.push('/');
		}
	}, [self, router]);

	const loadMoreFollowings = useCallback(() => {
		setFollowingsLimit((prev) => prev + 3);
	}, []);

	const loadMoreFollowers = useCallback(() => {
		setFollowersLimit((prev) => prev + 3);
	}, []);

	if (!self) {
		return 'Loading profile...';
	}

	if (followerError || followingError) {
		console.error(followerError || followingError);
		return 'Error loading following/followers.';
	}

	return (
		<>
			<Head>
				<meta charSet="utf-8" />
				<title>My Profile | NodeBird</title>
			</Head>
			<AppLayout>
				<NicknameEditForm />
				<FollowList
					header="following"
					data={followingsData}
					onClickMore={loadMoreFollowings}
					loading={!followingsData && !followingError}
				/>
				<FollowList
					header="follower"
					data={followersData}
					onClickMore={loadMoreFollowers}
					loading={!followersData && !followerError}
				/>
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

	await store.sagaTask.toPromise();

	return {
		props: {},
	};
});

export default Profile;
