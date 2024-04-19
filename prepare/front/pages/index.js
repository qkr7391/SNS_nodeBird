import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { LOAD_POSTS_REQUEST } from "../reducers/post";
import { LOAD_USER_REQUEST } from "../reducers/user";

import AppLayout from "../components/AppLayout";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";

const Home = () =>{
    const dispatch = useDispatch();
    // const { isLoggedIn } = useSelector((state) => state.user);
    const { self } = useSelector((state) => state.user);
    const { hasMorePosts, mainPosts, loadPostsLoading } = useSelector((state) => state.post);
    //const mainPosts = userSelector((state) => state.post.mainPosts); ^same^


    useEffect(() => {
        dispatch({
            type: LOAD_USER_REQUEST,
        });

        dispatch({
            type: LOAD_POSTS_REQUEST,
        });
    }, []);

    useEffect(()=> {
        function onScroll(){
            console.log(window.scrollY, document.documentElement.clientHeight, document.documentElement.scrollHeight);
            if(window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300){
                if (hasMorePosts && !loadPostsLoading) {
                    dispatch({
                        type: LOAD_POSTS_REQUEST,
                    });
                }
        }}
        window.addEventListener('scroll', onScroll);

        return()=>{
            //If you don't return and clear it, it will continue to accumulate in memory.
            window.removeEventListener('scroll', onScroll);
        };
    }, [hasMorePosts, loadPostsLoading])


    return(
        <AppLayout>
            {self && <PostForm />}
            {mainPosts.map((post) => <PostCard key={post.id} post={post} />)}
        </AppLayout>

    );
}

export default Home;