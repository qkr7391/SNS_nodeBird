//post.[id].js -> post/1 ...
import { useRouter } from "next/router";
import wrapper from "../../store/configureStore";
import axios from "axios";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import { LOAD_POST_REQUEST } from "../../reducers/post";
import { END } from "redux-saga";
import AppLayout from "../../components/AppLayout";
import PostCard from "../../components/PostCard";
import { useSelector } from "react-redux";


const Post = () => {
    const router = useRouter();
    const { id } = router.query;
    const { singlePost } = useSelector((state) => state.post);

    return (
        <AppLayout>
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

});

export default Post;