import React from 'react';
import PropTypes from "prop-types";
import {useSelector} from 'react-redux';
import {Card, Popover} from 'antd'
import {EllipsisOutlined, HeartOutlined, MessageOutlined, RetweetOutlined} from "@ant-design/icons";
const PostCard = ({post}) => {
    const {self} = useSelector((state) => state.user.self?.id);
    // const id = user?.id; //optional chaining
    return(
     <div>
         <Card
         cover={post.Images[0] && <PostImages images={post.Images} />}
         actions={[
             <RetweetOutlined key='retweet'/>,
             <HeartOutlined key='heart'/>,
             <MessageOutlined key='comment' />,
             <Popover key='more'
                      content ={(<Button.Group>
                                  {id && post.User.id === id ?
                                  (
                                      <>
                                      <Button>Edit</Button>
                                      <Button type='danger'>Delete</Button>
                                      </>
                                  ) :
                                       <Button>Report</Button>}
                              </Button.Group>
                              )}>
                 <EllipsisOutlined />
             </Popover>
         ]}
             >
            <Card.Meta
                avartat={<Avartar>{post.User.nickname[0]} </Avartar>}
                title={post.User.nickname}
                description={post.content}
            />
         </Card>
         {/*<CommentForm />*/}
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

    })
}

export default PostCard;