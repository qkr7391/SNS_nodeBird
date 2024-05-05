import { all, fork, takeLatest, delay, put, call } from 'redux-saga/effects';
import axios from "axios";
import {
    LOG_IN_SUCCESS,
    LOG_IN_REQUEST,
    LOG_IN_FAILURE,
    LOG_OUT_SUCCESS,
    LOG_OUT_REQUEST,
    LOG_OUT_FAILURE,
    SIGN_UP_FAILURE,
    SIGN_UP_REQUEST,
    SIGN_UP_SUCCESS,
    FOLLOW_REQUEST,
    FOLLOW_SUCCESS,
    FOLLOW_FAILURE,
    UNFOLLOW_REQUEST,
    UNFOLLOW_SUCCESS,
    UNFOLLOW_FAILURE,
    REMOVE_FOLLOWER_REQUEST,
    REMOVE_FOLLOWER_SUCCESS,
    REMOVE_FOLLOWER_FAILURE,
    LOAD_USER_SUCCESS,
    LOAD_USER_REQUEST,
    LOAD_USER_FAILURE,
    CHANGE_NICKNAME_REQUEST,
    CHANGE_NICKNAME_SUCCESS,
    CHANGE_NICKNAME_FAILURE,
    LOAD_FOLLOWERS_REQUEST,
    LOAD_FOLLOWINGS_REQUEST,
    LOAD_FOLLOWERS_SUCCESS,
    LOAD_FOLLOWERS_FAILURE,
    LOAD_FOLLOWINGS_FAILURE,
    LOAD_FOLLOWINGS_SUCCESS,
} from "../reducers/user";

function logInAPI(data){
    return axios.post('/user/login', data)
}
function* logIn(action){
    try{
        // console.log('saga action data', action.data);
        const result =  yield call(logInAPI, action.data);
        // console.log('saga result', result);
        yield put({
            type: LOG_IN_SUCCESS,
           // data: result,
             data: result.data,
        });
    }
    catch(err) {
            console.error(err);
        yield put({
            type: LOG_IN_FAILURE,
            error: err.response.data,
        });
    }
}

function logOutAPI(){
    return axios.post('/user/logout')
}

function* logOut(){
    try{
        yield call(logOutAPI)
        yield put({
            type: LOG_OUT_SUCCESS,
            // data: result.data
        });
    } catch(err) {
        console.log(err, "**********");
        yield put({
            type: LOG_OUT_FAILURE,
            error: err.response.data,
        });
    }
}

function signUpAPI(data){
    return axios.post('/user', data)
}
function* signUp(action){
    try{
        const result =  yield call(signUpAPI, action.data)
        console.log(result);
        yield put({
            type: SIGN_UP_SUCCESS,
            //data: action.data,
            data: result.data
        });
    } catch(err) {
        yield put({
            type: SIGN_UP_FAILURE,
            error: err.response.data,
        });
    }
}

function followAPI(data){
    return axios.patch(`/user/${data}/follow`, data)
}
function* follow(action){
    try{
        const result =  yield call(followAPI, action.data)
        yield put({
            type: FOLLOW_SUCCESS,
            // data: action.data,
            data: result.data
        });
    } catch(err) {
        yield put({
            type: FOLLOW_FAILURE,
            error: err.response.data,
        });
    }
}

function unfollowAPI(data){
    return axios.delete(`/user/${data}/follow`)
}
function* unfollow(action){
    try{
        const result =  yield call(unfollowAPI, action.data)
        yield put({
            type: UNFOLLOW_SUCCESS,
            // data: action.data,
            data: result.data
        });
    } catch(err) {
        yield put({
            type: UNFOLLOW_FAILURE,
            error: err.response.data,
        });
    }
}

function removefollowerAPI(data){
    return axios.delete(`/user/followers/${data}`)
}
function* removeFollower(action){
    try{
        const result =  yield call(removefollowerAPI, action.data)
        yield put({
            type: REMOVE_FOLLOWER_SUCCESS,
            data: result.data
        });
    } catch(err) {
        yield put({
            type: REMOVE_FOLLOWER_FAILURE,
            error: err.response.data,
        });
    }
}

function loadFollowersAPI(){
    return axios.get('/user/followers');
}

function* loadFollowers(action){
    try{
        console.log("Fetching followers...");
        const result = yield call(loadFollowersAPI);
        console.log("Followers data:", result.data);
        yield put({
            type: LOAD_FOLLOWERS_SUCCESS,
            data: result.data,
        });
    } catch(err) {
        yield put({
            type: LOAD_FOLLOWERS_FAILURE,
            error: err.response.data,
        });
    }
}

function loadFollowingsAPI(){
    return axios.get('/user/followings');
}

function* loadFollowings(action){
    try{
        console.log("Fetching followings...");
        const result = yield call(loadFollowingsAPI);
        console.log("Followings data:", result.data);
        yield put({
            type: LOAD_FOLLOWINGS_SUCCESS,
            data: result.data,
        });
    } catch(err) {
        yield put({
            type: LOAD_FOLLOWINGS_FAILURE,
            error: err.response.data,
        });
    }
}



function loadUserAPI(data){
    return axios.get('/user');
}
function* loadUser(action){
    try{
        const result =  yield call(loadUserAPI, action.data);
        yield put({
            type: LOAD_USER_SUCCESS,
            data: result.data,
        });
    }
    catch(err) {
        console.error(err);
        yield put({
            type: LOAD_USER_FAILURE,
            error: err.response.data,
        });
    }
}

function changeNicknameAPI(data){
    return axios.patch('/user/nickname', { nickname: data });
}
function* changeNickname(action){
    try{
        const result =  yield call(changeNicknameAPI, action.data);
        yield put({
            type: CHANGE_NICKNAME_SUCCESS,
            data: result.data,
        });
    }
    catch(err) {
        console.error(err);
        yield put({
            type: CHANGE_NICKNAME_FAILURE,
            error: err.response.data,
        });
    }
}

function* watchLogIn(){
    yield takeLatest(LOG_IN_REQUEST, logIn);
}

function* watchLogOut(){
    yield takeLatest(LOG_OUT_REQUEST, logOut);
}

function* watchSignUp(){
    yield takeLatest(SIGN_UP_REQUEST, signUp);
}

function* watchFollow(){
    yield takeLatest(FOLLOW_REQUEST, follow);
}

function* watchUnfollow(){
    yield takeLatest(UNFOLLOW_REQUEST, unfollow);
}

function* watchRemoveFollower(){
    yield takeLatest(REMOVE_FOLLOWER_REQUEST, removeFollower);
}

function* watchLoadFollowers(){
    yield takeLatest(LOAD_FOLLOWERS_REQUEST, loadFollowers);
}

function* watchLoadFollowings(){
    yield takeLatest(LOAD_FOLLOWINGS_REQUEST, loadFollowings);
}


function* watchLoadUser(){
    yield takeLatest(LOAD_USER_REQUEST, loadUser);
}

function* watchChangeNickname(){
    yield takeLatest(CHANGE_NICKNAME_REQUEST, changeNickname);
}


export default function* userSaga () {
    yield all([
        fork(watchLogIn),
        fork(watchLogOut),
        fork(watchSignUp),
        fork(watchFollow),
        fork(watchUnfollow),
        fork(watchRemoveFollower),
        fork(watchLoadFollowers),
        fork(watchLoadFollowings),
        fork(watchLoadUser),
        fork(watchChangeNickname),

    ])
}