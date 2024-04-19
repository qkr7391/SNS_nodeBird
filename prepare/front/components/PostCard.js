import React, { useCallback, useState } from 'react';
import PropTypes from "prop-types";
import { useDispatch, useSelector } from 'react-redux';
import { Card, Popover, Button, Avatar, List} from 'antd';
// import { Card, Popover, Button, Avatar, List, Comment } from 'antd';
import { EllipsisOutlined, HeartOutlined, MessageOutlined, RetweetOutlined, HeartTwoTone } from "@ant-design/icons";

import PostImages from "./PostImages";
import CommentForm from "./CommentForm";
import PostCardContent from "./PostCardContent";
import { DELETE_POST_REQUEST } from "../reducers/post";
import FollowButton from "./FollowButton";


// ... rest of the code


const PostCard = ({post}) => {
    const dispatch = useDispatch();
    const { deletePostLoading } = useSelector((state) => state.post);

    // State for managing like and comment form visibility
    const [liked, setLiked] = useState(false);
    const [commentFormOpened, setCommentFormOpened] = useState(false);

    // Toggle like function
    const onToggleLike = useCallback(()=>{
        setLiked((prev)=> !prev);
    },[]);

    // Toggle comment form visibility function
    const onToggleComment = useCallback(()=>{
        setCommentFormOpened((prev) => !prev);
    }, []);

    const onDeletePost = useCallback(() => {
        dispatch({
            type: DELETE_POST_REQUEST,
            data: post.id,
        })
    });

    // Get user ID from Redux state
    //way1// const { self } = useSelector((state) => state.user.self?.id);
    //way2// const id = self?.id; //optional chaining
    const id = useSelector((state) => state.user.self?.id);
    //way4// const id = useSelector((state) => sate.user.self && state.user.self.id);

    return(
     <div style={{ marginBottom: 20 }}>
         <Card
         cover={ post.Images[0] && <PostImages images={ post.Images } /> } // Displaying post images if available
         actions={[
             <RetweetOutlined key='retweet'/>,
             liked
                 ? <HeartTwoTone twoToneColor="#eb2f96" key='heart' onClick={ onToggleLike }/>
                 : <HeartOutlined key='heart' onClick={ onToggleLike }/>,
             <MessageOutlined key='comment' onClick={ onToggleComment }/>,
             // Popover with more options (Edit, Delete, Report)
             <Popover key='more'
                      content ={(<Button.Group>
                                  { id && post.User.id === id ?
                                  (
                                      <>
                                      <Button>Edit</Button>
                                      <Button loading={deletePostLoading} onClick={onDeletePost}>Delete</Button>
                                      </>
                                  ) :
                                       <Button>Report</Button>}
                              </Button.Group>
                              )}>
                 <EllipsisOutlined />
             </Popover>
         ]}
         extra={id && <FollowButton post={post} />}
             >
             {/* Meta information for the post card */}
            <Card.Meta
                avatar={<Avatar>{post.User.nickname[0]}</Avatar>} // Displaying user avatar
                title={post.User.nickname} // Displaying user nickname
                description={<PostCardContent postData={post.content}/> } // Displaying post content
            />
         </Card>
         {/* Displaying comment form if it's opened */}
         {commentFormOpened &&
             (<div>
                <CommentForm post={post}/>
                 <List
                 header={`${post.Comments.length} comments`}
                 itemLayout="horizontal"
                 dataSource={post.Comments}
                 // Comment is for version 4.*
                 renderItem={(item) => (
                     <List.Item>
                         {/*<li></li> -> <List.Item></List.Item>*/}
                         <List.Item.Meta //< Comment />-> <List.Item.Meta />
                             title={item.User.nickname} //author->title
                             avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                             description={item.content} //content->description
                         />
                     </List.Item>
                 )}
                 />
             </div>)}
         {/* CommentForm component (commented out) */}
         {/*<CommentForm />*/}
         {/* Comments component (commented out) */}
         {/*<Comments />*/}
     </div>
    )
};

PostCard.propTypes = {
    post : PropTypes.shape({
        id: PropTypes.number,
        User: PropTypes.object,
        content: PropTypes.string,
        createdAt: PropTypes.object,
        Comments: PropTypes.arrayOf(PropTypes.object),
        Images: PropTypes.arrayOf(PropTypes.object),

    }).isRequired,
}

export default PostCard;