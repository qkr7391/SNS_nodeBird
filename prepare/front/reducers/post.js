// import shortId from 'shortid';
import { produce }from 'immer';
// import { faker} from '@faker-js/faker';
// faker.seed(123)

export const initialState = {
    mainPosts: [],
    imagePaths:[],
    hasMorePosts : true,
    uploadImagesLoading: false,
    uploadImagesDone: false,
    uploadImagesError: null,
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
    likePostLoading: false,
    likePostDone: false,
    likePostError: null,
    unlikePostLoading: false,
    unlikePostDone: false,
    unlikePostError: null,

}

// export const generateDummyPost = (number) => Array(number).fill().map((_, index) => ({
//         id: shortId.generate(),
//         User: {
//             id: shortId.generate(),
//             nickname: faker.internet.userName()
//         },
//         content: faker.lorem.paragraph(),
//         Images: [],
//         Comments: [{
//             id: shortId.generate(),
//             User: {
//                 id: shortId.generate(),
//                 nickname: faker.internet.userName()
//             },
//             content: faker.lorem.sentence(),
//         }],
//     }))

//initialState.mainPosts = initialState.mainPosts.concat(generateDummyPost(10));

export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST';
export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS';
export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE';
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


export const LIKE_POST_REQUEST = 'LIKE_POST_REQUEST';
export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS';
export const LIKE_POST_FAILURE = 'LIKE_POST_FAILURE';

export const UNLIKE_POST_REQUEST = 'UNLIKE_POST_REQUEST';
export const UNLIKE_POST_SUCCESS = 'UNLIKE_POST_SUCCESS';
export const UNLIKE_POST_FAILURE = 'UNLIKE_POST_FAILURE';

export const REMOVE_IMAGE = 'REMOVE_IMAGE';

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
            case UPLOAD_IMAGES_REQUEST:
                draft.uploadImagesLoading = true;
                draft.uploadImagesDone = false;
                draft.uploadImagesError = null;
                break;
            case UPLOAD_IMAGES_SUCCESS:
                draft.uploadImagesLoading = false;
                draft.uploadImagesDone = true;
                // draft.imagePaths = draft.imagePaths.concat(action.data);
                draft.imagePaths = action.data;
                break;
            case UPLOAD_IMAGES_FAILURE:
                draft.uploadImagesLoading = false;
                draft.uploadImagesError = action.error;
                break;
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
                draft.imagePaths = [];
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
                draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.data.PostId);
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
            case ADD_COMMENT_SUCCESS: {
                const postIndex = draft.mainPosts.findIndex((v) => v.id === action.data.PostId);
                if (postIndex !== -1) {
                    const post = draft.mainPosts[postIndex];
                    post.Comments.unshift(action.data); // action.data에는 댓글 객체가 전달되어야 함
                }
                draft.addCommentLoading = false;
                draft.addCommentDone = true;
                break;
            }
            case ADD_COMMENT_FAILURE:
                draft.addCommentLoading = false;
                draft.addCommentError = action.error;
                break;
            case LIKE_POST_REQUEST:
                draft.likePostLoading = true;
                draft.likePostDone = false;
                draft.likePostError = null;
                break;
            case LIKE_POST_SUCCESS:{
               // action.data <- has Post ID, User ID
                const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
                post.Likers.push({ id: action.data.UserId });
                draft.likePostLoading = false;
                draft.likePostDone = true;
                break;
            }
            case LIKE_POST_FAILURE:
                draft.likePostLoading = false;
                draft.likePostError = action.error;
                break;
            case UNLIKE_POST_REQUEST:
                draft.unlikePostLoading = true;
                draft.unlikePostDone = false;
                draft.unlikePostError = null;
                break;
            case UNLIKE_POST_SUCCESS: {
                const postIndex = draft.mainPosts.findIndex((v) => v.id === action.data.PostId);
                if (postIndex !== -1) {
                    const post = draft.mainPosts[postIndex];
                    post.Likers = post.Likers.filter((liker) => liker.id !== action.data.UserId);
                }
                draft.unlikePostLoading = false;
                draft.unlikePostDone = true;
                break;
            }
            case UNLIKE_POST_FAILURE:
                draft.unlikePostLoading = false;
                draft.unlikePostError = action.error;
                break;
            case REMOVE_IMAGE:
                draft.imagePaths = draft.imagePaths.filter((v, i) => i !== action.data);
                break;

            default :
                break;
        }
    })
};

export default reducer;