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
    UPLOAD_IMAGES_REQUEST,
    UPLOAD_IMAGES_SUCCESS,
    UPLOAD_IMAGES_FAILURE,
    RETWEET_FAILURE,
    RETWEET_SUCCESS,
    RETWEET_REQUEST,
    LOAD_POST_SUCCESS,
    LOAD_POST_REQUEST,
    LOAD_POST_FAILURE,
    LOAD_USER_POSTS_SUCCESS,
    LOAD_USER_POSTS_FAILURE,
    LOAD_HASHTAG_POSTS_REQUEST,
    LOAD_HASHTAG_POSTS_SUCCESS,
    LOAD_HASHTAG_POSTS_FAILURE,
    LOAD_USER_POSTS_REQUEST,
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
            error: err.response.data,
        });
    }
}

function* watchAddPost(){
    yield takeLatest(ADD_POST_REQUEST, addPost);
}

function loadPostAPI(data) {
    return axios.get(`/post/${data}`);
}

function* loadPost(action) {
    try {
        const result = yield call(loadPostAPI, action.data);
        yield put({
            type: LOAD_POST_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        yield put({
            type: LOAD_POST_FAILURE,
            error: err.response.data,
        });
    }
}

function* watchLoadPost() {
    yield takeLatest(LOAD_POST_REQUEST, loadPost);
}


function loadPostsAPI(lastId){
    return axios.get(`/posts?lastId=${lastId || 0}`)
    // return axios.get(`/posts?lastId=${lastId}&limit=10&offset=10`, data)
}
function* loadPosts(action){
    try{
        const result =  yield call(loadPostsAPI, action.lastId)
        yield put({
            type: LOAD_POSTS_SUCCESS,
            data: result.data,
        });
    } catch(err) {
        yield put({
            type: LOAD_POSTS_FAILURE,
            error: err.response.data,
        });
    }
}

function* watchLoadPosts(){
    yield throttle(5000, LOAD_POSTS_REQUEST, loadPosts);
    // yield takeLatest(LOAD_POSTS_REQUEST, loadPosts);
}


function loadUserPostsAPI(data, lastId) {
    return axios.get(`/user/${data}/posts?lastId=${lastId || 0}`);
}

function* loadUserPosts(action) {
    try {
        const result = yield call(loadUserPostsAPI, action.data, action.lastId);
        yield put({
            type: LOAD_USER_POSTS_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        console.error(err);
        yield put({
            type: LOAD_USER_POSTS_FAILURE,
            error: err.response.data,
        });
    }
}

function* watchLoadHashtagPosts() {
    yield throttle(5000, LOAD_HASHTAG_POSTS_REQUEST, loadHashtagPosts);
}


function loadHashtagPostsAPI(data, lastId) {
    return axios.get(`/hashtag/${encodeURIComponent(data)}?lastId=${lastId || 0}`);
    //return axios.get(`/hashtag/${data}?lastId=${lastId || 0}`);
}

function* loadHashtagPosts(action) {
    try {
        console.log('loadHashtag console');
        const result = yield call(loadHashtagPostsAPI, action.data, action.lastId);
        yield put({
            type: LOAD_HASHTAG_POSTS_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        console.error(err);
        yield put({
            type: LOAD_HASHTAG_POSTS_FAILURE,
            error: err.response.data,
        });
    }
}
function* watchLoadUserPosts() {
    yield throttle(5000, LOAD_USER_POSTS_REQUEST, loadUserPosts);
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
            error: err.response.data,
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
            error: err.response.data,
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
            error: err.response.data,
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
            error: err.response.data,
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
            error: err.response.data,
        });
    }
}

function* watchUnLikePost(){
    yield takeLatest(UNLIKE_POST_REQUEST, unlikePost);
}

function retweetAPI(data){
    return axios.post(`/post/${data}/retweet`)
}

function* retweet(action){
    try{
        const result =  yield call(retweetAPI, action.data);
        yield put({
            type: RETWEET_SUCCESS,
            data: result.data,
        });
    } catch(err) {
        yield put({
            type: RETWEET_FAILURE,
            error: err.response.data,
        });
    }
}

function* watchRetweet(){
    yield takeLatest(RETWEET_REQUEST, retweet);
}


export default function* postSaga(){
    yield all([
        fork(watchAddPost),
        fork(watchLoadPosts),
        fork(watchLoadPost),
        fork(watchLoadUserPosts),
        fork(watchLoadHashtagPosts),
        fork(watchUploadImages),
        fork(watchDeletePost),
        fork(watchAddComment),
        fork(watchLikePost),
        fork(watchUnLikePost),
        fork(watchRetweet),
    ])
}