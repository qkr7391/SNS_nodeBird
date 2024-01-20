import React, {useCallback, useState} from 'react';
import {Form, Input, Button} from 'antd';
import useInput from '../hooks/useinput';
import PropTypes from "prop-types";
import PostCard from "./PostCard";
import {useSelector} from "react-redux";
const CommentForm =({post})=>{
    const id = useSelector((state) => state.user.self?.id);
    const [commentText, onChangeCommentText] = useInput('');
   // const onChangeCommentText = useState();
    const onSubmitComment = useCallback(()=>{
        console.log(post.id, commentText)
    }, [post.id, commentText]);
    return(
        <Form onFinish={onSubmitComment}>
            <Form.Item style={{position: 'relative', margin:0}}>
                <Input.TextArea value={commentText} onChange={onChangeCommentText} rows={4}/>
                <Button style={{position:'absolute', right:0, bottom: -40}}
                    type="primary" htmlType="submit"> Twit </Button>
            </Form.Item>
        </Form>
    )
}

CommentForm.propTypes = {
    post : PropTypes.shape({
    }).isRequired,
}
export default CommentForm;
