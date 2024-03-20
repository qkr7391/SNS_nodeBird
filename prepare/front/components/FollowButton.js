import React, { useCallback } from 'react';
import { Button } from 'antd';
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { UNFOLLOW_REQUEST, FOLLOW_REQUEST } from "../reducers/user";

const FollowButton = ({ post }) => {
    const dispatch = useDispatch();
    const { self, followLoading, unfollowLoading } = useSelector((state) => state.user);
    const isFollowing = self?.Followings.find((v) => v.id === post.User.id)

    const onClickButton = useCallback(() => {
        if(isFollowing){
            dispatch({
                type : UNFOLLOW_REQUEST,
                data: post.User.id,
            })
        } else{
            dispatch({
                type : FOLLOW_REQUEST,
                data: post.User.id,
            })
        }
    },[isFollowing]);

    return (
        <Button loading={followLoading || unfollowLoading} onClick={onClickButton}>
            { isFollowing ? 'Unfollow' : 'Follow' }</Button>
    );
}

FollowButton.propTypes ={
    post: PropTypes.object.isRequired,
}

export default FollowButton;