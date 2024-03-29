import React, {useCallback, useEffect} from 'react';
import { Form, Input, Button } from 'antd';
import useInput from '../hooks/useinput';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { ADD_COMMENT_REQUEST } from "../reducers/post";

const CommentForm =({ post })=>{
    const dispatch = useDispatch();

    const id = useSelector((state) => state.user.self?.id);
    const { addCommentDone } = useSelector((state) => state.post);
    const [commentText, onChangeCommentText, setCommentText] = useInput("");

    useEffect(() => {
        if(addCommentDone){
            setCommentText('');
        }
    }, [addCommentDone]);

    const onSubmitComment = useCallback(()=>{
        dispatch({
            type: ADD_COMMENT_REQUEST,
            data: { content: commentText, postId: post.id, userId: id},
        });
    }, [commentText, id])

    return(
        <Form onFinish={onSubmitComment}>
            <Form.Item style={{ position: 'relative'}}>
                <Input.TextArea value={commentText} onChange={onChangeCommentText} rows={4} />
                <Button style={{ position:'absolute', right: 0, bottom: -40 }}
                    type="primary" htmlType="submit"> Twit </Button>
            </Form.Item>
        </Form>
    )
}

CommentForm.propTypes = {
    post: PropTypes.object.isRequired,
}
export default CommentForm;
