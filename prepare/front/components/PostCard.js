import React, {useCallback, useEffect, useState} from 'react';
import PropTypes from "prop-types";
import { useDispatch, useSelector } from 'react-redux';
import { Card, Popover, Button, Avatar, List} from 'antd';
// import { Card, Popover, Button, Avatar, List, Comment } from 'antd';
import { EllipsisOutlined, HeartOutlined, MessageOutlined, RetweetOutlined, HeartTwoTone } from "@ant-design/icons";

import PostImages from "./PostImages";
import CommentForm from "./CommentForm";
import PostCardContent from "./PostCardContent";
import { DELETE_POST_REQUEST, LIKE_POST_REQUEST, UNLIKE_POST_REQUEST, RETWEET_REQUEST } from "../reducers/post";
import FollowButton from "./FollowButton";

const PostCard = ({ post }) => {
    const dispatch = useDispatch();
    const { deletePostLoading } = useSelector((state) => state.post);

    // State for managing like and comment form visibility
    //const [liked, setLiked] = useState(false);
    const [commentFormOpened, setCommentFormOpened] = useState(false);

    // Get user ID from Redux state
    //way1// const { self } = useSelector((state) => state.user.self?.id);
    //way2// const id = self?.id; //optional chaining
    const id = useSelector((state) => state.user.self?.id);
    //way4// const id = useSelector((state) => sate.user.self && state.user.self.id);


    // Toggle like function
    const onLike = useCallback(()=>{
        if (!id){
            return alert('You need to login');
        }
        // setLiked((prev)=> !prev);
       return dispatch({
            type: LIKE_POST_REQUEST,
            data: post.id,
        })
    },[id]);

    // Toggle Unlike function
    const onUnLike = useCallback(()=>{
        if (!id){
            return alert('You need to login');
        }
        // setLiked((prev)=> !prev);
       return dispatch({
            type: UNLIKE_POST_REQUEST,
            data: post.id,
        })
    },[id]);

    // Toggle comment form visibility function
    const onToggleComment = useCallback(()=>{
        setCommentFormOpened((prev) => !prev);
    }, []);

    const onDeletePost = useCallback(() => {
        if (!id){
            return alert('You need to login');
        }
        return dispatch({
            type: DELETE_POST_REQUEST,
            data: post.id,
        })
    }, [id]);

    const onRetweeet = useCallback(()=>{
        if (!id){
            return alert('You need to login');
        }
        return dispatch({
            type: RETWEET_REQUEST,
            data: post.id,
        })
    },[id])

    const liked = post.Likers.find((v) => v.id === id);

    return(
     <div style={{ marginBottom: 20 }}>
         <Card
             cover={post.Images && post.Images.length > 0 && <PostImages images={post.Images} />}

            // cover={ post.Images[0] && <PostImages images={ post.Images } /> } // Displaying post images if available
         actions={[
             <RetweetOutlined key='retweet' onClick={onRetweeet}/>,
             liked
                 ? <HeartTwoTone twoToneColor="#eb2f96" key='heart' onClick={ onUnLike }/>
                 : <HeartOutlined key='heart' onClick={ onLike }/>,
             <MessageOutlined key='comment' onClick={ onToggleComment }/>,
             // Popover with more options (Edit, Delete, Report)
             <Popover key='more'
                      content ={(<Button.Group>
                                  { id && post.User &&  post.User.id === id ?
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
         title={post.RetweetId ? `'${post.User.nickname}' Retweeted.` : null}
         extra={id && <FollowButton post={post} />}
             >
             {post.RetweetId && post.Retweet
             ? (
                 <Card  cover={ post.Retweet.Images[0] && <PostImages images={ post.Retweet.Images } /> } // Displaying post images if available
                 >
                     <Card.Meta
                     avatar={post.Retweet.User && <Avatar>{post.Retweet.User.nickname[0]}</Avatar>} // Displaying user avatar
                     title={post.Retweet.User && post.Retweet.User.nickname} // Displaying user nickname
                     description={<PostCardContent postData={post.Retweet.content}/> } // Displaying post content
                 />

                 </Card>
                 )
             : (
                 <Card.Meta
                     avatar={post.User && <Avatar>{post.User.nickname[0]}</Avatar>} // Displaying user avatar
                     title={post.User && post.User.nickname} // Displaying user nickname
                     description={<PostCardContent postData={post.content}/> } // Displaying post content
                 />
             )}
         </Card>
         {/* Displaying comment form if it's opened */}
         {commentFormOpened &&
             (<div>
                <CommentForm post={ post }/>
                 <List
                 header={`${post.Comments.length} comments`}
                 itemLayout="horizontal"
                 dataSource={post.Comments}
                 // Comment is for version 4.*
                 renderItem={(item) => (
                     <List.Item>
                         {/*<li></li> -> <List.Item></List.Item>*/}
                         <List.Item.Meta //< Comment />-> <List.Item.Meta />
                             title={item.User?.nickname} //author->title
                             avatar={<Avatar>{item.User?.nickname[0]}</Avatar>}
                             description={item.content} //content->description
                         />
                         {/*<List.Item.Meta*/}
                         {/*    title={item.User && item.User.nickname ? item.User.nickname : 'Unknown User'}*/}
                         {/*    avatar={item.User && item.User.nickname ? <Avatar>{item.User.nickname[0]}</Avatar> : null}*/}
                         {/*    description={item.content}*/}
                         {/*/>*/}
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
    post: PropTypes.shape({
        id: PropTypes.number,
        User: PropTypes.object,
        content: PropTypes.string,
        createdAt: PropTypes.string,
        Comments: PropTypes.arrayOf(
            PropTypes.oneOfType([
                PropTypes.object, // Allow objects representing comments
                PropTypes.string, // Allow strings (if needed)
            ])
        ),
        Images: PropTypes.arrayOf(PropTypes.object),
        Likers: PropTypes.arrayOf(PropTypes.object),
        RetweetId: PropTypes.number,
        Retweet: PropTypes.objectOf(PropTypes.any),
    }).isRequired,
};

export default PostCard;