import shortId from 'shortid';


export const initialState = {
    mainPosts: [{
        id: 1,
        User: {
            id:1,
            nickname: 'sammy'
        },
        content: 'first post #hashtag #yeah',
        Images:[{
            src:'https://images.unsplash.com/photo-1705002455875-29da8631d626?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        },{
            src:'https://images.unsplash.com/photo-1704869881379-4e88e66c0248?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8'
        },{
            src:'https://images.unsplash.com/photo-1704917560617-ccc4e10e5139?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNXx8fGVufDB8fHx8fA%3D%3D'
        },
        ],
        Comments: [{
            User:{
                nickname: 'a1',
            },
            content: 'wow',
        },
            {
            User:{
                nickname: 'a2',
            },
            content: 'cool',
            }]
    }],
    imagePaths:[],
    addPostLoading: false,
    addPostDone: false,
    addPostError: null,
    addCommentLoading: false,
    addCommentDone: false,
    addCommentError: null,
}

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

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
    id: shortId.generate(),
    content: data,
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
    switch (action.type){
        case ADD_POST_REQUEST:
            return{
                ...state,
                addPostLoading: true,
                addPostDone: false,
                addPostError: null,
            };

        case ADD_POST_SUCCESS:
            return {
                ...state,
                mainPosts: [dummyPost(action.data), ...state.mainPosts],
                addPostLoading: false,
                addPostDone: true,
            };

        case ADD_POST_FAILURE:
            return{
                ...state,
                addPostLoading: false,
                addPostError: action.error
            };
        case ADD_COMMENT_REQUEST:
        return{
            ...state,
            addCommentLoading: true,
            addCommentDone: false,
            addCommentError: null,
        };

        case ADD_COMMENT_SUCCESS:{
            //receive action.data.content, postId, userId
            const postIndex = state.mainPosts.findIndex((v)=>v.id === action.data.postId);
            const post ={ ...state.mainPosts[postIndex] } ;
            post.Comments = [dummyComment(action.data.content), ...post.Comments];
            const mainPosts = [...state.mainPosts];
            mainPosts[postIndex] = post;
            return {
                ...state,
                mainPosts,
                addCommentLoading: false,
                addCommentDone: true,
            };
        }

        case ADD_COMMENT_FAILURE:
            return{
                ...state,
                addCommentLoading: false,
                addCommentError: action.error
            };

        default :
            return state;
    }
};

export default reducer;