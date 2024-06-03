// pages/post/[id].js
import { useRouter } from "next/router";
import wrapper from "../../store/configureStore";
import axios from "axios";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import { LOAD_POST_REQUEST } from "../../reducers/post";
import { END } from "redux-saga";
import AppLayout from "../../components/AppLayout";
import PostCard from "../../components/PostCard";
import { useSelector } from "react-redux";
import Head from "next/head";

const Post = () => {
    const router = useRouter();
    const { id } = router.query;
    const { singlePost } = useSelector((state) => state.post);

    if (!singlePost) {
        return null; // 또는 로딩 스피너를 표시
    }

    const coverImage = singlePost.Images && singlePost.Images.length > 0
        ? singlePost.Images[0].src
        : 'http://localhost:3060/favicon.png';

    return (
        <AppLayout>
            <Head>
                <title>{singlePost.User.nickname}'s post</title>
                <meta name="description" content={singlePost.content} />
                <meta name="og:title" content={`${singlePost.User.nickname}'s post`} />
                <meta name="og:description" content={singlePost.content} />
                <meta name="og:image" content={coverImage} />
                <meta name="og:url" content={`http://localhost:3060/post/${id}`} />
                <link rel="icon" type="image/png" href="/favicon.png" />

                {/*<link rel="icon" href="http://localhost:3060/favicon.ico" />*/}
            </Head>
            <PostCard post={singlePost} />
        </AppLayout>
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
        type: LOAD_POST_REQUEST,
        data: context.params.id,
    });

    store.dispatch(END);

    // Wait for all the actions to be executed
    await store.sagaTask.toPromise();

    return {
        props: {},
    };
});

export default Post;
