import React from 'react';
import AppLayout from "../components/AppLayout";
import Head from "next/head";

const Profile = () =>{
    return(
        <>
            <Head>
                <meta charSet="utf-8" />
                <title> My Profile | NodeBird </title>
            </Head>
            <AppLayout>
                <div> Profile page </div>
            </AppLayout>
        </>
    );
}

export default Profile;