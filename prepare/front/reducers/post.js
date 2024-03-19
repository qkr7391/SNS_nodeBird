import shortId from 'shortid';
import {produce }from 'immer';
import {faker} from '@faker-js/faker';
faker.seed(123)

export const initialState = {
    mainPosts: [{
        id: 1,
        User: {
            id:1,
            nickname: 'sammy'
        },
        content: 'first post #hashtag #yeah',
        Images:[{
            id: shortId.generate(),
            src:'https://images.unsplash.com/photo-1705002455875-29da8631d626?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        },{
            id: shortId.generate(),
            src:'https://images.unsplash.com/photo-1704869881379-4e88e66c0248?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8'
        },{
            id: shortId.generate(),
            src:'https://images.unsplash.com/photo-1704917560617-ccc4e10e5139?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNXx8fGVufDB8fHx8fA%3D%3D'
        },
        ],
        Comments: [{
            id: shortId.generate(),
            User:{
                id: shortId.generate(),
                nickname: 'a1',
            },
            content: 'wow',
        },
            {
            id: shortId.generate(),
            User:{
                id: shortId.generate(),
                nickname: 'a2',
            },
            content: 'cool',
            }]
    }],
    imagePaths:[],
    addPostLoading: false,
    addPostDone: false,
    addPostError: null,
    deletePostLoading: false,
    deletePostDone: false,
    deletePostError: null,
    addCommentLoading: false,
    addCommentDone: false,
    addCommentError: null,
}

initialState.mainPosts = initialState.mainPosts.concat(
    Array(20).fill().map((_, index) => ({
        id: shortId.generate(),
        User: {
            id: shortId.generate(),
            nickname: faker.internet.userName()
        },
        content: faker.lorem.paragraph(),
        Images: [],
        Comments: [{
            id: shortId.generate(),
            User: {
                id: shortId.generate(),
                nickname: faker.internet.userName()
            },
            content: faker.lorem.sentence(),
        }],
    })),
);

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const DELETE_POST_REQUEST = 'DELETE_POST_REQUEST';
export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS';
export const DELETE_POST_FAILURE = 'DELETE_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const addPost = (data) => ({
    type: ADD_POST_REQUEST,
    data,
});

export const addComment = (data) => ({
    type: ADD_COMMENT_REQUEST,
    data,
});

// //action
// const ADD_POST = 'ADD_POST';
// export const addPost = {
//     type: ADD_POST,
// }

// const dummyPost = {
//     id:2,
//     content: 'dummy data',
//     User: {
//         id:1,
//         nickname: 'dummydummy',
//     },
//     Images:[],
//     Comments: []
// }
//function version of dummyPost
const dummyPost =(data) => ({
    id: data.id,
    content: data.content,
    User: {
        id:1,
        nickname: 'dummyPost',
    },
    Images:[],
    Comments: []
})

const dummyComment = (data) => ( {
    id: shortId.generate(),
    content: data,
    User: {
        id: 1,
        nickname: 'dummyComment',
    },
})

const reducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type){
            case ADD_POST_REQUEST:
                draft.addPostLoading = true;
                draft.addPostDone = false;
                draft.addPostError = null;
                break;
            case ADD_POST_SUCCESS:
                draft.mainPosts.unshift(dummyPost(action.data));
                draft.addPostLoading = false;
                draft.addPostDone = true;
                break;
            case ADD_POST_FAILURE:
                draft.addPostLoading = false;
                draft.addPostError = action.error;
                break;
            case DELETE_POST_REQUEST:
                draft.deletePostLoading = true;
                draft.deletePostDone = false;
                draft.deletePostError = null;
                break;
            case DELETE_POST_SUCCESS:
                draft.deletePostLoading = false;
                draft.deletePostDone = true;
                draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.data);
                break;
            case DELETE_POST_FAILURE:
                draft.deletePostLoading = false;
                draft.deletePostError = action.error;
                break;
            case ADD_COMMENT_REQUEST:
                draft.addCommentLoading = true;
                draft.addCommentDone = false;
                draft.addCommentError = null;
                break;

            case ADD_COMMENT_SUCCESS:{
                const post = draft.mainPosts.find((v) => v.id === action.data.postId);
                post.Comments.unshift(dummyComment(action.data.content));
                draft.addCommentLoading = false;
                draft.addCommentDone = true;
                break;
                // //receive action.data.content, postId, userId
                // const postIndex = state.mainPosts.findIndex((v)=>v.id === action.data.postId);
                // const post ={ ...state.mainPosts[postIndex] } ;
                // post.Comments = [dummyComment(action.data.content), ...post.Comments];
                // const mainPosts = [...state.mainPosts];
                // mainPosts[postIndex] = post;
                // return {
                //     ...state,
                //     mainPosts,
                //     addCommentLoading: false,
                //     addCommentDone: true,
                // };
            }

            case ADD_COMMENT_FAILURE:
                draft.addCommentLoading = false;
                draft.addCommentError = action.error;
                break;

            default :
                break;
        }
    })
};

export default reducer;