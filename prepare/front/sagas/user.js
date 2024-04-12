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
    } catch(err) {
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
            data: action.data,
            // data: result.data
        });
    } catch(err) {
        yield put({
            type: SIGN_UP_FAILURE,
            error: err.response.data,
        });
    }
}

function followAPI(data){
    return axios.post('/follow', data)
}
function* follow(action){
    try{
        // const result =  yield call(signUpAPI, action.data)
        yield delay(1000);
        yield put({
            type: FOLLOW_SUCCESS,
            data: action.data,
            // data: result.data
        });
    } catch(err) {
        yield put({
            type: FOLLOW_FAILURE,
            error: err.response.data,
        });
    }
}

function unfollowAPI(data){
    return axios.post('/unfollow', data)
}
function* unfollow(action){
    try{
        // const result =  yield call(signUpAPI, action.data)
        yield delay(1000);
        yield put({
            type: UNFOLLOW_SUCCESS,
            data: action.data,
            // data: result.data
        });
    } catch(err) {
        yield put({
            type: UNFOLLOW_FAILURE,
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



export default function* userSaga () {
    yield all([
        fork(watchLogIn),
        fork(watchLogOut),
        fork(watchSignUp),
        fork(watchFollow),
        fork(watchUnfollow),

    ])
}