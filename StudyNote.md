# SNS

making SNS by using React, Next.js, node.js

---

## Day 1

- Basic setting (node/npm/next)
- pages
  - index.js: Home page
  - profile.js: Profile page
  - signup.js: Sign up page
- components [Next.js do not use React Router]
  - AppLayout.js: layout form
- eslint
  - Eslint is EcmaScript(JavaScript) + Lint (Mark for error code)
  - A tool that shows you when errors occur in your JavaScript syntax
- React Router
  - Routing is the ability to load different pages from different paths in a URL.
  - One of the oldest and most used routing-related libraries in React.
  - Set up a component-based routing system.
- Next.js
  - Framework for React projects (features to set up your React project)
  - Routing system, optimization, multilingual system support, server-side rendering, etc.
  - Routing system works based on file paths (React router alternative)

---

## Day 2

- Bundling: the process of following imported files and merging them into a single file, or "bundle".
  -> This bundle can be embedded in a web page to load the entire app at once.
  -> As the app grows, so does the bundle.
  (Especially if you include large third-party libraries, you want to avoid the problem of a large app causing long load times)
  ->To avoid getting stuck in a large bundle, it's a good idea to "code-split" your bundle.

- Code splitting: a feature supported by bundlers like Webpack and Browerify (factor-bundle) that allows you to create multiple bundles that can be dynamically loaded at runtime.
  -> Users can 'lazy-load' only what they need at the moment.
  -> Improve the performance of your app.
  -> Doesn't reduce the overall amount of code in the app, but avoids loading code that the user doesn't need.
  -> Users only get the code they need on the initial page load.

- import(): Dynamic Syntax
  -> The best way to introduce code splitting into your application

- Rendering: The process by which documents written by developers, such as HTML, CSS, and JavaScript, are output by the browser.

- Server-side rendering: how the server renders the page after pre-configuring everything that will be shown to the user.

-> The initial page that the user sees is rendered quickly
-> Stronger for search engine optimization (SEO) because it shows a screen rather than a blank page

- Client-side rendering: how to initially render the entire page (blank page) on the server and render it in the client (browser) whenever the user requests it.

-> Relatively fast to navigate from page to page since it is done within the browser
-> Fast because it only replaces the necessary content and data.
-> There is no difference between when the user sees it and when it is served to the user (TTV and TTI have a short gap)

---

## Day 3

- antd & style-component
- \_app.js & Head

Next has a webpack by default.

- Webpack: Webpack is a module bundler that merges and compresses many resources used by a web application into a single file.

- CSS files can't be imported, only JavaScript.
- When the webpack sees the CSS, it replaces the style tags and embeds them in the HTML, and it also processes and embeds images.

```JavaScript
import 'antd/dist/antd.css'
```

--> Webpack does the work for you because you imported it
But you need to do it to a common file for all your fetters. -> \_app.js

---

## Day 4

- \_app.js vs AppLayout.js
  > The parts that are common to all pages go into \_app.js, and the parts that are common to specific components go into AppLayout.js, which wraps around the individual components.

---

- Next provides a 'HEAD' component.

```JavaScript
import Head from 'next/head';
    <Head>
      <meta charSet="utf-8" />
      <title> NodeBird </title>
    </Head>
```

---

## Day 5

- CSS frameworks make heavy use of grid systems.

* Responsive: This is when a page is initially a mobile page, but as the screen increases in width, things like components are rearranged and changed to fit a tablet size, and when the screen increases further, it changes to fit a desktop size.

* Adaptive: Adaptive refers to developing separately for mobile, desktop, tablet, etc.

---

- 'antd' supports two components to make it responsive: horizontal and vertical lines.

```JavaScript
import { Menu, Input, Row, Col } from 'antd'
```

---

- Mobile Design: xs
- Tablet PC Design: sm
- Desktop Design: md(mini Desktop)
- lg/xl ...

```JavaScript
<Row>
    <Col xs={24} md={6} />
    <Col xs={24} md={12} />
    <Col xs={24} md={6} />
</Row>
```

ex. When I thought I was dividing a line into 24 parts,
1.1 xs={24} -> On a mobile screen, one column takes up the whole thing.
1.2 xs={12} -> on mobile screens,
one column takes up 12/24 of the line.

- gutter: In web design and layout systems, especially when using grid-based layouts or frameworks like Bootstrap or CSS Grid, the gutter refers to the space between columns or grid items. It's the horizontal and/or vertical spacing between elements within a layout grid. The gutter helps maintain consistent spacing, alignment, and readability between content elements.

---

## Day 6

- Login Form
  --> Using dummy data [state]

* useState: useState is a React Hook that allows functional components in React to manage state within themselves. It's a fundamental Hook used for maintaining and updating state in React functional components.

* When to Use useState: State Management: Use useState when you need to introduce state into a functional component. It helps keep track of values that might change over time.
  Component Re-rendering: It triggers re-renders of the component whenever the state value changes, updating the UI accordingly.
  Local State: useState is perfect for managing local component state, separate from global state managed by tools like Redux.

```JavaScript
import React, { useState } from 'react';

const [isLoggedIn, setIsLoggedIn] = useState(false); //dummy data

{isLoggedIn ? <UserProfile /> : <LoginForm/>}
```

\*\*\* Assignment --> Change login form using library

---

## Day 7

1. Rerendering: Rerendering in React refers to the process of updating the DOM to reflect changes in your application's state or props. It's a fundamental part of React's component lifecycle. When state or props change, React will automatically trigger a rerender, updating the UI to reflect those changes.
2. Caching: Caching is the process of storing frequently accessed or computationally expensive data in a temporary storage area, known as a cache, to speed up subsequent access and retrieval.
3. Object Caching: Object caching refers to the process of storing frequently accessed or expensive-to-create objects in a cache, which allows faster retrieval and reuse of these objects rather than recreating them from scratch.
4. Functional Component:
   - Simple Functions Composing UI: React components that are written as functions instead of classes.
   - Stateless: Typically, they don’t hold state and simply return UI based on the provided props.
   - Readability and Testability: They offer simplicity, high readability, and easier testing for components.
5. Hooks:
   - Functionalities for State and React Features in Functional Components: They enable state management and the use of React features in functional components, which was previously limited to class components.
   - useState, useEffect, etc.: Hooks like useState, useEffect, useContext, useReducer, and others provide functionalities for managing state, handling side effects, using context, managing reducers, and more.

[DO NOT SET OBJECT IN STYLE]

```JavaScript
<div style={{marginTop: 10}}>
```

> WHY? Each time the login form is re-rendered, a whole bunch of functions are executed, each time creating a new object, and since the objects are all unique, any comparison between them will result in a false positive, so it keeps re-rendering even though nothing has changed.

> WHAT SHOULD DO? Using 'styled-components' or 'useMemo'

- styled-components:

```JavaScript
import styled from 'styled-components';
const ButtonWrapper = styled.div`margin-top: 10px;`
        ...
<ButtonWrapper>
       ...
</ButtonWrapper>

```

- useMemo:

```JavaScript
import React, {useMemo} from 'react';
const style = useMemo (() => ({marginTop : 10}), []);
...
<ButtonWrapper style={style}>
  ...
</ButtonWrapper>
```

---

## Day 8

- Login with dummy data

```JavaScript
const LoginForm = ({setIsLoggedIn}) => {

const onSubmitForm = useCallback((e) => {
    console.log(id, password);
    setIsLoggedIn(true);
    },[id, password]);
}
return (
        <Form onFinish={onSubmitForm}>
        ...
```

- antd -> onFinish already has preventDefault() applied.

```JavaScript
const AppLayout = ({children}) =>{
  const [isLoggedIn, setIsLoggedIn] = useState(false); //dummy data
...
  <Row gutter={8}>
    <Col xs={24} md={6}>
      {isLoggedIn ? <UserProfile /> : <LoginForm setIsLoggedIn={setIsLoggedIn()}/>}
    </Col>
...
```

```JavaScript
const onSubmitForm = useCallback((e) => {
  console.log(id, password);
  setIsLoggedIn(true);
},[id, password]);
```

- AppLayout.js [setIsLoggedIn] pass to LoginForm as 'true'.
- Determine the value of isLoggedIn, and if logged in, go to the user profile, otherwise go to the login form.
- onSubmitForm gets the value of setIsLoggedIn from the login form and changes setLoggedIn to true when the login button is pressed.
- The new setLoggedIn value will be used to log in.

```JavaScript
 const onLogOut = useCallback(()=>{
  setIsLoggedIn(false);
},[]);
```

- Write onLogOut to work when the logout button is pressed in the user profile, replacing seInLoggedIn with false.

---

## Day 9

- Making Profile page: Building and optimizing a basic form [profile.js, NicknameEditForm.js, FollowList.js]

* Form Style

```JavaScript
const NicknameEditForm = () => {
	const style = useMemo(() => ({
		marginBottom: "20px",
		border: "1px solid #d9d9d9",
		padding: "20px",
	}));
	return (
		<Form style={style}>
			<Input.Search addonBefore="Nickname" enterButton="edit" />
		</Form>
	);
};
```

- List Style

```JavaScript
const FollowList = ({ header, data }) => {
	return (
		<List
			style={{ marginBotton: 20 }}
			grid={{ gutter: 4, xs: 2, md: 3 }}
			size="small"
			header={<div>{header}</div>}
			loadMore={
				<div style={{ textAlign: "center", margin: "10px 0" }}>
					<Button>more</Button>
				</div>
			}
			bordered
			dataSource={data}
			renderItem={(item) => (
				<List.Item style={{ marginTop: 20 }}>
					<Card actions={[<StopOutlined key="stop" />]}>
						<Card.Meta description={item.nickname} />
					</Card>
				</List.Item>
			)}
		/>
	);
};

FollowList.propsTypes = {
	header: PropTypes.string.isRequired,
	data: PropTypes.array.isRequired,
};
```

---

## Day 10

- Making sing-up Page
- Using form

\*\* 'onFinish' event is often used in forms within React, particularly when working with form submissions or validations.

\*\* When use 'onFinish' event, don't need to use event.preventDefault() explicitly when handling form submissions because React handles form submissions differently by default, using its synthetic events

- Forms seen a lot in <Form>

```JavaScript
const [id, setId] = useState('');
const onChangeId = useCallback((e) => {
  setId(e.target.value);
},[]);
```

- Hooks can't be used inside loops, conditionals, or functions.
- They can be used inside components.
- Exception - Custom Hooks
  --> It's possible to create custom hooks to avoid getting stuck with code that repeats itself over and over again.
  [front - hooks - 'userinput.js']

```JavaScript
import { useState, useCallback } from "react";

export default (initialValue = null) => {
	const [value, setvalue] = useState(initialValue);
	const handler = useCallback((e) => {
		setValue(e.target.value);
	}, []);
	retur[value, handler];
};

```

- Using customized hooks can reduce duplicate code

```JavaScript
const [id, setId] = useState("");
const onChangeId = useCallback((e) => {
  setId(e.target.value);
}, []);
```

--->

```JavaScript
const [id, onChangeId] = useInput("");
```

- PasswordCheck, term is not follow same format, so need to make separate form for them.

```JavaScript
const [passwordCheck, setPasswordCheck] = useState("");
const [passwordError, setPasswordError] = useState(false);
const onChangePasswordCheck = useCallback(
  (e) => {
    setPasswordCheck(e.target.value);
    setPasswordError(e.target.value !== password);
  },
  [password]
);

const [term, setTerm] = useState("");
const [termError, setTermError] = useState(false);
const onChangeTerm = useCallback((e) => {
  setTerm(e.target.checked);
  setTermError(false);
}, []);
```

- onSubmit need to check the password and term

```JavaScript
const onSubmit = useCallback(() => {
  if (password !== passwordCheck) {
    return setPasswordError(true);
  }
  if (!term) {
    return setTermError(true);
  }
  console.log(id, nickname, password);
}, [password, passwordCheck, term]);
```

---

## Day 11

- Redux install

* store / configureStroe.js
* npm i next-redux-wrapper --> a library that integrates Redux with Next.js, simplifying the process of using Redux in Next.js applications

* const configureStore = () => {};: This line initializes a configureStore function. This function would typically hold your Redux store configuration logic, including creating the Redux store, applying middleware, combining reducers, and setting up the initial state.

* const wrapper = createWrapper(configureStore, { debug: process.env.NODE_ENV === "development" });: Here, createWrapper is invoked with two arguments:

--> The first argument is configureStore, which is a function that will be responsible for creating the Redux store. Inside this function, you would configure your Redux store using libraries like redux, redux-thunk, etc.

--> The second argument is an options object. In this case, it includes a debug property that is set to true (process.env.NODE_ENV === "development"). This enables debugging features in development mode, allowing for better inspection of the Redux store state, actions, and changes.

- The next-redux-wrapper simplifies the setup of Redux in a Next.js application by providing a mechanism to configure the Redux store and integrate it with the Next.js app. This configured wrapper can then be used within Next.js pages or components to access the Redux store using the provided context or server-side rendering features.


---
## Day 12

- Implementing redux in practice

Redux is one of the most effective libraries for state management in JavaScript apps.

Store:
A store is where you store the state of your application.
In Redux, an application must have one store.
Stores are created using the createStore function, which takes a reducer as an argument.

Action:
An action is an object that indicates what change in state is required.
Actions must have a type attribute, and other attributes contain additional information about the action.

Dispatch:
Dispatching means delivering the action to the store.
When you pass an action using the store's dispatch method, the reducer is called to update the state.

Reducer:
A reducer is a pure function that takes the current state and the passed action and returns a new state.
The reducer determines how to update the state based on the type of action.
Multiple reducers can be combined to create a root reducer.

State:
State represents the current state of your application.
In Redux, state is managed immutably and is updated by reducers.

The basic behavior flow in Redux is as follows

1. A user fires an action.
2. The action is passed to the reducer via the store's dispatch.
3. The reducer generates and returns a new state based on the current state and the action.
4. The store is updated with the new state, and the UI is updated accordingly.


[reducers/index.js]

```javascript
// initialState setup
const initialState = {
    user:{
    isLoggedIn: false,
    user: null,
    signUpData: {},
    loginData:{},
    },
    post:{
        mainPost: [],
    }
}
```

```javascript
//action creator
export const loginAction = (data) => {
    return{
        type: 'LOG_IN',
        data,
    }
}

//action creator
export const logoutAction = () => {
    return{
        type: 'LOG_OUT',
    }
}
```
```javascript
// Reducer => it receives the previous state and action, returning a new state based on them
const rootReducer = (state = initialState, action) => { // Corrected the syntax
    switch (action.type) {
        case 'LOG_IN':
            return {
                ...state,
                user:{
                    ...state.user,
                    isLoggedIn: true,
                    user:action.data,
                }
            };
        case 'LOG_OUT':
            return {
                ...state,
                user:{
                    ...state.user,
                    isLoggedIn: false,
                    user:null,
                }
            };
        default:
            return state; // Return the default state if the action type doesn't match
    }
};
```

[LoginForm.js]
```javascript
const UserProfile = () => {
  const dispatch = useDispatch();

  const onLogOut = useCallback(()=>{
    // setIsLoggedIn(false);
    dispatch(logoutAction());
  },[]);
...
```

---
## Day 13

- Middleware and redux dev tools

'HYDRATE'

In the context of Redux, the term 'HYDRATE' is commonly associated with the Next.js framework and its integration with Redux. The 'HYDRATE' action is a convention used in Next.js to hydrate the client-side state with the server-side state during server-side rendering (SSR).

Here's how it typically works:

Server-Side Rendering (SSR):

During server-side rendering, the server fetches the initial data for a page and renders the HTML with that data. Next.js allows you to dispatch a special action called 'HYDRATE' as part of your Redux store state during server-side rendering.
Client-Side Hydration:

When the client receives the HTML from the server, including the 'HYDRATE' action in the Redux store state, Next.js on the client side uses this information to hydrate the client-side Redux store. This means it initializes the client-side state with the server-rendered state to avoid unnecessary data fetching and to maintain consistency between the server-rendered and client-rendered content.

Server-side rendering (SSR) is a way for web applications to generate the HTML for a page on the server and send it to the client during the initial load of the page. Traditional web applications use JavaScript on the client side to render pages dynamically, but SSR helps optimize performance by constructing pages on the server on initial load.

* Client-Side Rendering (CSR) works in the following flow:
When a user accesses a web page, a blank HTML page is loaded.
A JavaScript file is then downloaded and executed, which dynamically renders the page on the client side and displays it on the screen.

* SSR has the following flow: 
When a user accesses a web page, initial data is fetched from the server, and an HTML page is constructed and sent.
The HTML that reaches the client is rendered and displayed by the browser.
Later, when the client-side JavaScript is loaded, the page performs any additional required behavior.


* In Redux, we record history and can do a lot with it, so it's important to keep things "immutable".

---

## Day 14 

- Split reducer

```javascript
// Reducer => it receives the previous state and action, returning a new state based on them
const rootReducer = (state = initialState, action) => { // Corrected the syntax
    switch (action.type) {
        case 'LOG_IN':
            return {
                ...state,
                user:{
                    ...state.user,
                    isLoggedIn: true,
                    user:action.data,
                }
            };
        case 'LOG_OUT':
            return {
                ...state,
                user:{
                    ...state.user,
                    isLoggedIn: false,
                    user:null,
                }
            };
        default:
            return state; // Return the default state if the action type doesn't match
    }
};
```

* We're going to have a lot of different types, and we're going to have a lot of cases for each type, which is going to make the code in the reducer bigger and longer, so we need to break it up properly.

1. Create a user.js and post.js file inside your reducer folder. [each file is for the values in the state I currently have].

2. Split the code for each in index.js.

3. combine the split code using combineReducers.
```javascript
const rootReducer = combineReducers({ // Corrected the syntax
  user,
  post,
})
```
* Add Index Reducer for HYDRATE (for SSR)
```javascript
  index: (state = {}, action) => {
    switch (action.type) {
      case HYDRATE:
        return { ...state, ...action.payload};

            // Return the default state if the action type doesn't match
      default:
        return state;
    }
  }
```

** It's easy to keep code simple by distributing and breaking up longer pieces of code into roles, and it's easy to combine them using combineReducers.

--- 

## Day 15

- Posting form with dummy data

[reducers/post.js]
1. Make an initialState and some dummy data for post
```javascript
[initialState]
mainPosts: [
    id:1,
    User:{
        id:1,
        nickname:'dummy',
    },
    content: 'first post',
    Images: [{src:'image adress1'},{src:'image adress2'}],
    Comments: [{ User :{ nickname:'a1'}, content:'wow'},
                {User :{ nickname:'a2'}, content:'cool'},],
imagePaths: [],
postAdded: false,
```
```javascript
[dummyData]
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
```

2. make action creator
```javascript
//action creator
const ADD_POST = 'ADD_POST';
export const addPost = {
  type: ADD_POST,
}
```

3. Add new case for reducer
```javascript
[reducer]
case ADD_POST:
    return {
      ...state,
      mainPosts: [dummyPost, ...state.mainPosts],
      postAdded: true
    };
```

[pages/index.js]
Place components <PostForm> and <PostCard>
```javascript
const Home = () =>{
  const { isLoggedIn } = useSelector((state) => state.user);
  const { mainPosts } = useSelector((state) => state.post);
  //const mainPosts = userSelector((state) => state.post.mainPosts); ^same^

  return(
          <AppLayout>
            {isLoggedIn && <PostForm />}
            {mainPosts.map((post) => <PostCard key={post.id} post={post} />)}
          </AppLayout>

  );
}
```

[components/PostForm.js]
1. Create Basic <Form> with style what you designed
2. Add functions for each buttons and input box
```javascript
// Redux state and dispatch setup
const { imagePaths }= useSelector((state) => state.post);
const dispatch = useDispatch();

// State and ref setup
const imageInput = useRef();
const [text, setText] = useState('');
const onChangeText = useCallback((e) => {
  setText(e.target.value);
}, []);

// Form submission handler
const onSubmit = useCallback(()=> {
  // Dispatching an action (addPost) with the current text state
  dispatch(addPost);
  // Resetting the text state
  setText('');
}, []);

// Image upload button click handler
const onClickImageUpload = useCallback(()=>{
  // Programmatically clicking the hidden file input to trigger file selection
  imageInput.current.click();
}, [imageInput.current])
```

## Day 16

* Redux Setup:
- **useSelector** is a hook from the react-redux library that allows you to extract data from the Redux store. In this case, it extracts imagePaths from the post slice of the Redux store.
- **useDispatch** is a hook from react-redux used to get access to the dispatch function.

* State and Ref Setup:
- **useState** is used to manage the state of the text input field.
- **useRef** is used to create a reference to the hidden file input.

* Form Submission Handler (onSubmit):
- **Dispatches** the addPost action with the current text state and resets the text state.

* Text Area for Post Text:
- An **input** area for entering the text of the post.

* Image Upload Section:
- Hidden file input (<input type="file" multiple style={{ display: 'none' }} ref={imageInput} />) for uploading images.
- **Image Upload** button (<Button onClick={onClickImageUpload}>Image Upload</Button>) that programmatically clicks the hidden file input when clicked.
- **Upload** button (<Button type="primary" style={{ float: 'right' }} htmlType="submit">Upload</Button>) to submit the form.

* Displaying Uploaded Images:
- **Maps** over the imagePaths array (images uploaded) and displays each image along with a "Remove" button (not yet implemented in your code).

---

## Day 17

### Post - Post Card

State Setup:
liked and commentFormOpened are state variables managed by the useState hook. They track whether the post is liked and whether the comment form is opened, respectively.

Toggle Functions:
onToggleLike and onToggleComment are callback functions that toggle the state of liked and commentFormOpened when the corresponding actions (like button click, comment button click) occur.

User ID Retrieval:
id is obtained from the Redux state using the useSelector hook. It represents the user's ID.

Card Component:
The Card component from the antd library is used to display the post. It includes post images, user avatar, nickname, and content.
The actions prop provides a set of action buttons (Retweet, Like, Comment, More).

Popover for More Options:
The Popover component from antd provides a menu with more options (Edit, Delete, Report) when the ellipsis icon is clicked.

Comment Form Visibility:
The comment form is displayed (<div>comment</div>) if commentFormOpened is true. This part can be replaced with the actual CommentForm component when implemented.

PropTypes:
PropTypes is used to define the expected shape of the post prop. It ensures that the prop is of the correct type and structure.

---
## Day 18

### Comments

[PostCard.js]
```JavaScript
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
```

This code is a conditional rendering block written in JSX, and it renders a CommentForm and a list of comments only if commentFormOpened is true.

* breakdown:

1. {commentFormOpened && ...}: This is a conditional rendering statement. If commentFormOpened is true, the content inside the curly braces will be rendered; otherwise, nothing will be rendered.

2. <div>: Wraps the content to be conditionally rendered. It's a common practice to use a container element when you want to conditionally render multiple components.

3. <CommentForm post={post} />: Renders the CommentForm component and passes the post prop to it.

4. <List ...>: Renders an Ant Design List component to display comments.

  4.1. header={${post.Comments.length} comments}: Displays a header with the number of comments.
  4.2. itemLayout="horizontal": Specifies the layout of the list items.
  4.3. dataSource={post.Comments}: Sets the data source for the list to the Comments property of the post object.
  4.4. renderItem={(item) => ...}: Specifies how each item in the list should be rendered. In this case, it uses the List.Item and List.Item.Meta components to display information about each comment.
        4.4.1. title={item.User.nickname}: Displays the user's nickname as the title.
        4.4.2. avatar={<Avatar>{item.User.nickname[0]}</Avatar>}: Displays the user's nickname's first character as an avatar.
        4.4.3. description={item.content}: Displays the content of the comment.

5. </div>: Closes the container element.

So, the entire block of code conditionally renders a CommentForm and a list of comments when commentFormOpened is true

[CommentForm.js]
```javascript
import React, { useCallback } from 'react';
import { Form, Input, Button } from 'antd';
import useInput from '../hooks/useinput';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
const CommentForm =({ post })=>{
    const id = useSelector((state) => state.user.self?.id);
    const [commentText, onChangeCommentText] = useInput("");
    const onSubmitComment = useCallback(()=>{
        console.log(post.id, commentText);
    }, [commentText])

    return(
        <Form onFinish={onSubmitComment}>
            <Form.Item style={{ position: 'relative'}}>
                <Input.TextArea value={commentText} onChange={onChangeCommentText} rows={4} />
                <Button style={{ position:'absolute', right: 0, bottom: -40 }}
                    type="primary" htmlType="submit"> Twit </Button>
            </Form.Item>
        </Form>
    )
}

CommentForm.propTypes = {
    post: PropTypes.object.isRequired,
}
export default CommentForm;

```

* breakdown :

1. Functional Component Definition:
[ const CommentForm = ({ post }) => { ]
- CommentForm: Declares a functional React component named CommentForm.
- ({ post }): Destructures the post prop from the component's props.

2. Redux Selector:
[ const id = useSelector((state) => state.user.self?.id); ]
- Uses the useSelector hook to get the user's ID from the Redux store. The ?. is the optional chaining operator, ensuring that accessing self.id won't throw an error if self is undefined.

3. State Management with Custom Hook:
[ const [commentText, onChangeCommentText] = useInput(""); ]
- Uses the custom useInput hook to manage the state of the comment text. commentText holds the current value of the input, and onChangeCommentText is a memoized callback function to update that value.

4. Callback Function for Form Submission:
[ const onSubmitComment = useCallback(() => {
console.log(post.id, commentText);
}, [commentText]); ]
- Uses useCallback to memoize the onSubmitComment function. This function logs the post.id and commentText to the console when the form is submitted.

5. Form Component:
[ return (
<Form onFinish={onSubmitComment}>
{/* ... */}
</Form>
); ]
- Renders an Ant Design Form component. The onFinish prop is set to the onSubmitComment callback.

6. Form Item with TextArea and Button:
[ <Form.Item style={{ position: 'relative' }}>
<Input.TextArea value={commentText} onChange={onChangeCommentText} rows={4} />
<Button style={{ position: 'absolute', right: 0, bottom: -40 }} type="primary" htmlType="submit"> Twit </Button>
</Form.Item> ]
- Wraps the Input.TextArea and Button components within an Ant Design Form.Item.
Input.TextArea is a multi-line input field. Its value is controlled by commentText, and changes trigger the onChangeCommentText callback.
Button is a submit button with the label "Twit." It triggers the form submission.

7. PropTypes Validation:
[ CommentForm.propTypes = {
post: PropTypes.object.isRequired,
}; ]
- Uses PropTypes to specify that the post prop must be an object and is required.

---
## Day 19

### Implementing Images

- Add the ability to show a single image, give the image a description via alt, and enlarge the image when clicked via the onClick event.
- The role of role="presentation" can be used to let screen readers know if they don't need to click on the image. (Since it's an event that enlarges the image, it can help screen readers filter out blind people because they have no reason to click on it).

``` javascript
if (images.length === 1) {
        return(
            <>
            <img role="presentation" src={images[0].src} alt={images[0].src} onClick={onZoom} />
            </>
        )
    }
```

```javascript
 if (images.length === 2) {
    return(
        <>
            <img role="presentation" style={{width: '50%', display: 'inline-block'}} src={images[0].src} alt={images[0].src} onClick={onZoom} />
            <img role="presentation" style={{width: '50%', display: 'inline-block'}} src={images[1].src} alt={images[1].src} onClick={onZoom} />
        </>
    )
}
return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
        <img
            role="presentation"
            style={{ width: '50%', display: 'inline-block' }}
            src={images[0].src}
            alt={images[0].src}
            onClick={onZoom}
        />
        <div
            role="presentation"
            style={{ display: 'inline-block', width: '50%', textAlign: 'center' }}
            onClick={onZoom}
        >
            <PlusOutlined />
            {/*<br />*/}
            {images.length - 1} more images
        </div>
    </div>
);

```

---

## Day 20 - Implementing an image carousel(react-slick)

1. make the image fullscreen when tapping more
image click -> execute onZoom() -> execute showImageZoom() 

[PostImages.js]
```javascript
const PostImages =({images})=>{
    const [showImagesZoom, setShowImagesZoom] = useState(false);
    const onZoom = useCallback(() => {
        setShowImagesZoom(true);
    },[]);

    const onCloce = useCallback(()=>{
        setShowImagesZoom(false);
    },[])

    if (images.length === 1) {
...
            {showImagesZoom && <ImagesZoom image={images} onClose={onClose} />}
...
    if (images.length === 2) {
...
        {showImagesZoom && <ImagesZoom image={images} onClose={onClose} />}
...
    return (
...
        {showImagesZoom && <ImagesZoom image={images} onClose={onClose} />}
...
```

2. components/imagesZoom/index.js 
WHY?
 Using directories and creating an index.js within them to organize components offers several advantages and disadvantages:
>> **Advantages:**
**Structure**: Grouping components into directories enhances the organization of files. This clarity in structure simplifies navigation and maintenance, especially as the project scales.
**Readability**: The directory structure improves code readability for developers. Each directory encapsulates related files, making it easier to understand the codebase's overall architecture.
**Maintainability**: Organizing components into directories facilitates maintenance tasks. With related files grouped together, modifications become more straightforward, enhancing the codebase's maintainability.
**Modularity**: Grouping components into directories promotes modularity. This enhances code reuse and allows for a more modular approach to managing the codebase.

>> **Disadvantages**:
**Additional Files and Folders**: Implementing directories introduces additional files and folders, potentially increasing the complexity of the project structure.
**Relative Path Usage**: Grouping components into directories necessitates using relative paths when importing components. This requires careful management of path configurations.
**Indirection**: Utilizing index.js to export components introduces indirection. While this aids organization, it can slightly reduce code readability due to the additional layer of abstraction.

>>> In summary, organizing components into directories and using index.js offers benefits in terms of structure, readability, maintainability, and modularity. However, it also introduces additional files, requires careful path management, and adds a layer of indirection to component imports. The suitability of this approach depends on the project's size, complexity, and the preferences of the development team.



3. npm i react-slick
>> react-slick is a popular React component library for building carousel/slider components. It provides a flexible and customizable way to create carousels or sliders with various features such as infinite looping, autoplay, lazy loading, responsive design, and more.
Here are some key features of react-slick:
**Responsive Design**: Carousels built with react-slick can adapt to different screen sizes and devices, making them suitable for use in responsive web design.
**Customization**: It offers a wide range of customization options for styling, navigation controls, animations, and behavior, allowing developers to tailor the carousel to fit their specific requirements.
**Accessibility**: react-slick aims to maintain accessibility standards by providing keyboard navigation support and ensuring that screen readers can interpret the carousel content correctly.
**Performance Optimization**: The library is designed to be efficient and performant, with features like lazy loading of images and optimized rendering for smooth user experience, even with large datasets.
**Rich Feature Set**: It supports various features commonly found in carousels, such as autoplay, infinite looping, draggable slides, multiple transition effects, and more.
Overall, react-slick simplifies the process of implementing a carousel/slider component in React applications, offering a robust and feature-rich solution for showcasing content in a visually engaging manner.

```javascript
<Slick
    initialSlide={0}
    afterChange={(slide) => setCurrentSlide(slide)}
    infinite
    arrows ={false}
    slidesToShow={1}
    slidesToScroll={1}
>
    {images.map((v)=> (
        <ImgWrapper key={v.src}>
            <img src={v.src} alt={v.src} />
        </ImgWrapper>
    ))}
</Slick>

```

4. CSS - styled component


** Slick problem occur

---

## Day 21 - Global styles and component directory structure

** Slick problem -> can not see the zoom images properly.
Slicks have a pre-determined class and styling. So you have to analyze the classes and styles and fix them one by one, but there is a way around that.


* Global styles : The style component is local scope. Also, Slick has its own CSS that declares a name for the class and gives it its own name, which makes it hard to make it work the way I want it to. With global scopes, I can just grab the parts I need without having to disassemble and analyze the structure piece by piece.
```javascript
import styled, {createGlobalStyle} from 'styled-components';

export const Global = createGlobalStyle`
 .slick-slide {
   display: inline-block;
 }
`
```

>> components/imagesZoom/index.js -> Structure
 components/imagesZoom/styles.js -> CSS

By keeping related files in a single directory, it's easier to manage longer code, and it's easier to modify because it's categorized by purpose.

