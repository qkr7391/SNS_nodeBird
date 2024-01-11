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

- Making singup Page
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

