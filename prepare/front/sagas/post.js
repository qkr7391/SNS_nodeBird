import { all, fork, take, call, put, takeLatest, throttle, delay } from 'redux-saga/effects';
import axios from 'axios';
import shortId from "shortid";


import {
    ADD_POST_REQUEST,
    ADD_POST_SUCCESS,
    ADD_POST_FAILURE,
    ADD_COMMENT_REQUEST,
    ADD_COMMENT_SUCCESS,
    ADD_COMMENT_FAILURE,
    DELETE_POST_REQUEST,
    DELETE_POST_SUCCESS,
    DELETE_POST_FAILURE,
    LOAD_POSTS_SUCCESS,
    LOAD_POSTS_FAILURE,
    generateDummyPost,
    LOAD_POSTS_REQUEST,
} from "../reducers/post";
import { ADD_POST_TO_ME, DELETE_POST_OF_ME } from "../reducers/user";

function addPostAPI(data){
    return axios.post('/post', { content : data })
}

function* addPost(action){
    try{
        const result =  yield call(addPostAPI, action.data);
        yield put({
            type: ADD_POST_SUCCESS,
            // content: result.data,
            data: result.data,
        });
        yield put({
            type: ADD_POST_TO_ME,
            data: result.data.id,
        })
    } catch(err) {
        yield put({
            type: ADD_POST_FAILURE,
            data: err.response.data,
        });
    }
}

function* watchAddPost(){
    yield takeLatest(ADD_POST_REQUEST, addPost);
}

function loadPostsAPI(data){
    return axios.get('/api/posts', data)
}
function* loadPosts(action){
    try{
        // const result =  yield call(addPostAPI, action.data)
        yield delay(1000);
      //  const id = shortId.generate();
        yield put({
            type: LOAD_POSTS_SUCCESS,
            data: generateDummyPost(10),
        });
    } catch(err) {
        yield put({
            type: LOAD_POSTS_FAILURE,
            data: err.response.data,
        });
    }
}
function* watchLoadPosts(){
    yield throttle(5000, LOAD_POSTS_REQUEST, loadPosts);
    // yield takeLatest(LOAD_POSTS_REQUEST, loadPosts);
}

function deletePostAPI(data){
    return axios.delete('/api/post', data)
}
function* deletePost(action){
    try{
        // const result =  yield call(addPostAPI, action.data)
        yield delay(1000);
        const id = shortId.generate();
        yield put({
            type: DELETE_POST_SUCCESS,
            data: action.data,
        });
        yield put({
            type: DELETE_POST_OF_ME,
            data: action.data,
        })
    } catch(err) {
        console.error(err);
        yield put({
            type: DELETE_POST_FAILURE,
            data: err.response.data,
        });
    }
}
function* watchDeletePost(){
    yield takeLatest(DELETE_POST_REQUEST, deletePost);
}


function addCommentAPI(data){
    return axios.post(`/post/${data.postId}/comment`, data) //POST /comment or /post/1/comment <<meaningful
}

function* addComment(action){
    try{
        const result =  yield call(addCommentAPI, action.data)
        yield put({
            type: ADD_COMMENT_SUCCESS,
            data: result.data,
        });
    } catch(err) {
        yield put({
            type: ADD_COMMENT_FAILURE,
            data: err.response.data,
        });
    }
}

function* watchAddComment(){
    yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}



export default function* postSaga(){
    yield all([
        fork(watchAddPost),
        fork(watchLoadPosts),
        fork(watchDeletePost),
        fork(watchAddComment)
    ])
}