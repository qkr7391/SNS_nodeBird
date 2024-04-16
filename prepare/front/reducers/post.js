import shortId from 'shortid';
import {produce }from 'immer';
import {faker} from '@faker-js/faker';
faker.seed(123)

export const initialState = {
    mainPosts: [],
    imagePaths:[],
    hasMorePosts : true,
    loadPostsLoading: false,
    loadPostsDone: false,
    loadPostsError: null,
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

export const generateDummyPost = (number) => Array(number).fill().map((_, index) => ({
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
    }))

//initialState.mainPosts = initialState.mainPosts.concat(generateDummyPost(10));

export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST';
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE';

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
// const dummyPost =(data) => ({
//     id: data.id,
//     content: data.content,
//     User: {
//         id:1,
//         nickname: 'dummyPost',
//     },
//     Images:[],
//     Comments: []
// })

// const dummyComment = (data) => ( {
//     id: shortId.generate(),
//     content: data,
//     User: {
//         id: 1,
//         nickname: 'dummyComment',
//     },
// })

const reducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type){
            case LOAD_POSTS_REQUEST:
                draft.loadPostsLoading = true;
                draft.loadPostsDone = false;
                draft.loadPostsError = null;
                break;
            case LOAD_POSTS_SUCCESS:
                draft.mainPosts = action.data.concat(draft.mainPosts);
                draft.loadPostsLoading = false;
                draft.loadPostsDone = true;
                draft.hasMorePosts = draft.mainPosts.length < 50;
                break;
            case LOAD_POSTS_FAILURE:
                draft.loadPostsLoading = false;
                draft.loadPostsError = action.error;
                break;
            case ADD_POST_REQUEST:
                draft.addPostLoading = true;
                draft.addPostDone = false;
                draft.addPostError = null;
                break;
            case ADD_POST_SUCCESS:
                draft.mainPosts.unshift(action.data);
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
                const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
                post.Comments.unshift(action.data.content);
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