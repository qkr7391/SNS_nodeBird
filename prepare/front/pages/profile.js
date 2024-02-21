import React from "react";
import Head from "next/head";
import { useSelector } from "react-redux";

import AppLayout from "../components/AppLayout";
import NicknameEditForm from "../components/NicknameEditForm";
import FollowList from "../components/FollowList";

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
