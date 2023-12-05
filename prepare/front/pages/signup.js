import React from 'react';
import AppLayout from "../components/AppLayout";
import Head from "next/head";

const Signup = () =>{
    return(
        <>
            <Head>
                <meta charSet="utf-8" />
                <title> Sign Up | NodeBird </title>
            </Head>
            <AppLayout>
                <div> Sign up Page</div>
            </AppLayout>
        </>
    );
}

export default Signup;