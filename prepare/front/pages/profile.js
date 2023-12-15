import React from "react";
import Head from "next/head";

import AppLayout from "../components/AppLayout";
import NicknameEditForm from "../components/NicknameEditForm";
import FollowList from "../components/FollowList";

const Profile = () => {
	const followerList = [
		{ nickname: "Sammy" },
		{ nickname: "Sarah" },
		{ nickname: "Ruby" },
	];
	const followingList = [
		{ nickname: "Sammy" },
		{ nickname: "Sarah" },
		{ nickname: "Ruby" },
	];
	return (
		<>
			<Head>
				<meta charSet="utf-8" />
				<title> My Profile | NodeBird </title>
			</Head>
			<AppLayout>
				<NicknameEditForm />
				<FollowList header="following" data={followingList} />
				<FollowList header="follower" data={followerList} />
			</AppLayout>
		</>
	);
};

export default Profile;
