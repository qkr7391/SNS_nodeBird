import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { LOAD_POSTS_REQUEST } from "../reducers/post";
import { LOAD_USER_REQUEST } from "../reducers/user";

import AppLayout from "../components/AppLayout";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard"

import wrapper from '../store/configureStore';

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
        function onScroll() {
            if (
                window.scrollY + document.documentElement.clientHeight >
                document.documentElement.scrollHeight - 300 &&
                hasMorePosts &&
                !loadPostsLoading &&
                mainPosts.length > 0 // Ensure mainPosts is not empty before accessing its last element
            ) {
                const lastId = mainPosts[mainPosts.length - 1]?.id;
                dispatch({
                    type: LOAD_POSTS_REQUEST,
                    lastId,
                });
            }
        }

        window.addEventListener('scroll', onScroll);

        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, [hasMorePosts, loadPostsLoading, mainPosts, dispatch]);


    return (
        <AppLayout>
            {self && <PostForm />}
            {mainPosts.map((post) => <PostCard key={post.id} post={post} />)}
        </AppLayout>
    );
};

export default Home;