import React, {useCallback, useEffect, useRef} from "react";
import { Form, Input, Button } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../reducers/post"
import useInput from '../hooks/useinput';


const PostForm = () => {
    // Redux state and dispatch setup
    const { imagePaths, addPostDone }= useSelector((state) => state.post);
    const dispatch = useDispatch();

    // State and ref setup
    const imageInput = useRef();
    const [text, onChangeText, setText] = useInput('');

    useEffect(()=>{
        // Resetting the text state
        if (addPostDone) {
            setText('');
        }
    }, [addPostDone])

    // Form submission handler
    const onSubmit = useCallback(()=> {
        // Dispatching an action (addPost) with the current text state
        dispatch(addPost(text));
    }, [text]);

    // Image upload button click handler
    const onClickImageUpload = useCallback(()=>{
        // Programmatically clicking the hidden file input to trigger file selection
        imageInput.current.click();
    }, [imageInput.current])
    return(
        <Form style={{margin: '10px 0 20px'}} encType={"multipart.form-data"} onFinish={onSubmit}>
            <Input.TextArea
                value={text}
                onChange={onChangeText}
                maxLength={140}
                placeholder="What's New Today?"
            />

            <div>
                <input type="file" multiple style={{ display: 'none' }} ref={imageInput}/>
                <Button onClick={onClickImageUpload}>Image Upload</Button>
                <Button type="primary" style={{float:'right'}} htmlType="submit">Upload</Button>
            </div>

            <div>
                {imagePaths.map((v) => {
                    <div key={v} style={{display:'inline-block'}}>
                        <img src={v} style={{width:'200px'}} alt={v} />
                        <div>
                            <Button>Remove</Button>
                        </div>
                    </div>
                })}
            </div>

        </Form>


    )
};
    export default PostForm;