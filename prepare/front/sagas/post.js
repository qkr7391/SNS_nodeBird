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
    LOAD_POSTS_REQUEST,
    LIKE_POST_REQUEST,
    UNLIKE_POST_REQUEST,
    LIKE_POST_SUCCESS,
    LIKE_POST_FAILURE,
    UNLIKE_POST_SUCCESS,
    UNLIKE_POST_FAILURE,
    UPLOAD_IMAGES_REQUEST, UPLOAD_IMAGES_SUCCESS, UPLOAD_IMAGES_FAILURE,
} from "../reducers/post";
import { ADD_POST_TO_ME, DELETE_POST_OF_ME } from "../reducers/user";

function addPostAPI(data){
    return axios.post('/post', data)
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
    return axios.get('/posts', data)
}
function* loadPosts(action){
    try{
        const result =  yield call(loadPostsAPI, action.data)
        yield put({
            type: LOAD_POSTS_SUCCESS,
            data: result.data,
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
    return axios.delete(`/post/${data}`) // ${data} --> post.id (from PostCard.js)
}
function* deletePost(action){
    try{
        const result =  yield call(deletePostAPI, action.data)
        yield put({
            type: DELETE_POST_SUCCESS,
            data: result.data,
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

function uploadImagesAPI(data){
    return axios.post('/post/images', data); //data -> form data
}
function* uploadImages(action){
    try{
        const result =  yield call(uploadImagesAPI, action.data)
        yield put({
            type: UPLOAD_IMAGES_SUCCESS,
            data: result.data,
        });
    } catch(err) {
        yield put({
            type: UPLOAD_IMAGES_FAILURE,
            data: err.response.data,
        });
    }
}
function* watchUploadImages(){
    yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages);
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
        console.error(err);
        yield put({
            type: ADD_COMMENT_FAILURE,
            data: err.response.data,
        });
    }
}

function* watchAddComment(){
    yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

function likePostAPI(data){
   //${data} --> post.id
    return axios.patch(`/post/${data}/like`)
}

function* likePost(action){
    try{
        const result =  yield call(likePostAPI, action.data);
        yield put({
            type: LIKE_POST_SUCCESS,
            data: result.data,
        });
    } catch(err) {
        yield put({
            type: LIKE_POST_FAILURE,
            data: err.response.data,
        });
    }
}

function* watchLikePost(){
    yield takeLatest(LIKE_POST_REQUEST, likePost);
}

function unlikePostAPI(data){
    //${data} --> post.id
   //return axios.patch(`/post/${data}/unlike`)
    return axios.delete(`/post/${data}/like`)
}

function* unlikePost(action){
    try{
        const result =  yield call(unlikePostAPI, action.data);
        yield put({
            type: UNLIKE_POST_SUCCESS,
            data: result.data,
        });
    } catch(err) {
        yield put({
            type: UNLIKE_POST_FAILURE,
            data: err.response.data,
        });
    }
}

function* watchUnLikePost(){
    yield takeLatest(UNLIKE_POST_REQUEST, unlikePost);
}


export default function* postSaga(){
    yield all([
        fork(watchAddPost),
        fork(watchLoadPosts),
        fork(watchUploadImages),
        fork(watchDeletePost),
        fork(watchAddComment),
        fork(watchLikePost),
        fork(watchUnLikePost),
    ])
}