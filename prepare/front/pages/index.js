import React from 'react';
import { useSelector } from "react-redux";

import AppLayout from "../components/AppLayout";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";
const Home = () =>{
    const { isLoggedIn } = useSelector((state) => state.user);
    const { mainPosts } = useSelector((state) => state.post);
   //const mainPosts = userSelector((state) => state.post.mainPosts); ^same^

    return(
        <AppLayout>
            {isLoggedIn && <PostForm />}
            {mainPosts.map((post) => <PostCard key={post.id} post={post} />)}
        </AppLayout>

    );
}

export default Home;