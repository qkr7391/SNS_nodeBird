import React, {useCallback, useEffect, useRef} from "react";
import { Form, Input, Button } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { UPLOAD_IMAGES_REQUEST, REMOVE_IMAGE, ADD_POST_REQUEST } from "../reducers/post"
import useInput from '../hooks/useinput';


const PostForm = (callback, deps) => {
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
        if(!text || !text.trim()) {
            return alert('Please post anything!');
        }
        // Dispatching an action (addPost) with the current text state
       const formData = new FormData();
       imagePaths.forEach((p) => {
           formData.append('image',p);
       });
       formData.append('content', text);
        return dispatch({
            type: ADD_POST_REQUEST,
            data : formData,
        });
    }, [text, imagePaths]);

    // Image upload button click handler
    const onClickImageUpload = useCallback(()=>{
        // Programmatically clicking the hidden file input to trigger file selection
        imageInput.current.click();
    }, [imageInput.current])

    const onChangeImages = useCallback((e) => {
        console.log('images', e.target.files);
        const imageFormData = new FormData();
        [...e.target.files].forEach((f) => {
            imageFormData.append('image', f);
        });
        // [].forEach.call(e.target.files, (f) => {
        //     imageFormData.append('image', f);
        // });
        dispatch({
            type: UPLOAD_IMAGES_REQUEST,
            data: imageFormData,
        })
    }, []);

    const onRemoveImage = useCallback((index) => () => {
        dispatch({
            type: REMOVE_IMAGE,
            data: index,
        });
    }, []);

    return(
        <Form style={{margin: '10px 0 20px'}} encType={"multipart/form-data"} onFinish={onSubmit}>
            <Input.TextArea
                value={text}
                onChange={onChangeText}
                maxLength={140}
                placeholder="What's New Today?"
            />

            <div>
                <input type="file" name="image" multiple style={{ display: 'none' }} ref={imageInput} onChange={onChangeImages}/>
                <Button onClick={onClickImageUpload}>Image Upload</Button>
                <Button type="primary" style={{float:'right'}} htmlType="submit">Upload</Button>
            </div>

            <div>
                {imagePaths.map((v, i) => (
                    <div key={v} style={{display:'inline-block'}}>
                        <img src={`http://localhost:3065/${v}`} style={{width:'200px'}} alt={v} />
                        <div>
                            <Button onClick={onRemoveImage(i)}> Remove </Button>
                        </div>
                    </div>
                ))}
            </div>


        </Form>


    )
};
    export default PostForm;