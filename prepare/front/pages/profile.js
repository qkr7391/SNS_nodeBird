import React, {useEffect} from "react";
import Head from "next/head";
import { useSelector } from "react-redux";
import { useRouter } from 'next/router';

import AppLayout from "../components/AppLayout";
import NicknameEditForm from "../components/NicknameEditForm";
import FollowList from "../components/FollowList";
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

	const { self } = useSelector((state) => state.user);
	const router = useRouter();

	useEffect(() => {
		if (!(self && self.id)) {
			router.push('/');
		}
	}, [self, router]);

	if(!self){
		return null;
	}
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

export default Profile;
