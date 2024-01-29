export const initialState = {
    mainPosts: [{
        id: 1,
        User: {
            id:1,
            nickname: 'aaa'
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
    postAdded: false,
}

//action
const ADD_POST = 'ADD_POST';
export const addPost = {
    type: ADD_POST,
}

const dummyPost = {
    id:2,
    content: 'dummy data',
    User: {
        id:1,
        nickname: 'dummydummy',
    },
    Images:[],
    Comments: []
}

const reducer = (state = initialState, action) => {
    switch (action.type){
        case ADD_POST:
            return {
                ...state,
                mainPosts: [dummyPost, ...state.mainPosts],
                postAdded: true
            };
        default :
            return state;
    }
};

export default reducer;