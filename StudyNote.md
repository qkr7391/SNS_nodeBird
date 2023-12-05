# SNS

making SNS by using React, Next.js, node.js

-------------------

## Day 1

* Basic setting (node/npm/next)
* pages 
    - index.js: Home page
    - profile.js: Profile page
    - signup.js: Sign up page
* components [Next.js do not use React Router]
    - AppLayout.js: layout form
* eslint
  - Eslint is EcmaScript(JavaScript) + Lint (Mark for error code)
  - A tool that shows you when errors occur in your JavaScript syntax
* React Router
  - Routing is the ability to load different pages from different paths in a URL.
  - One of the oldest and most used routing-related libraries in React. 
  - Set up a component-based routing system.
* Next.js
  - Framework for React projects (features to set up your React project)
  - Routing system, optimization, multilingual system support, server-side rendering, etc. 
  - Routing system works based on file paths (React router alternative)

-------------------

## Day 2

* Bundling: the process of following imported files and merging them into a single file, or "bundle".
  -> This bundle can be embedded in a web page to load the entire app at once.
  -> As the app grows, so does the bundle.
  (Especially if you include large third-party libraries, you want to avoid the problem of a large app causing long load times)
  ->To avoid getting stuck in a large bundle, it's a good idea to "code-split" your bundle.

* Code splitting: a feature supported by bundlers like Webpack and Browerify (factor-bundle) that allows you to create multiple bundles that can be dynamically loaded at runtime.
  -> Users can 'lazy-load' only what they need at the moment.
  -> Improve the performance of your app.
  -> Doesn't reduce the overall amount of code in the app, but avoids loading code that the user doesn't need.
  -> Users only get the code they need on the initial page load.

* import(): Dynamic Syntax
  -> The best way to introduce code splitting into your application

* Rendering: The process by which documents written by developers, such as HTML, CSS, and JavaScript, are output by the browser.

* Server-side rendering: how the server renders the page after pre-configuring everything that will be shown to the user.

-> The initial page that the user sees is rendered quickly
-> Stronger for search engine optimization (SEO) because it shows a screen rather than a blank page

* Client-side rendering: how to initially render the entire page (blank page) on the server and render it in the client (browser) whenever the user requests it.

-> Relatively fast to navigate from page to page since it is done within the browser
-> Fast because it only replaces the necessary content and data.
-> There is no difference between when the user sees it and when it is served to the user (TTV and TTI have a short gap)


------------------

## Day 3

- antd & style-component
- _app.js & Head

Next has a webpack by default.

* Webpack: Webpack is a module bundler that merges and compresses many resources used by a web application into a single file.

* CSS files can't be imported, only JavaScript.
* When the webpack sees the CSS, it replaces the style tags and embeds them in the HTML, and it also processes and embeds images.

```JavaScript
import 'antd/dist/antd.css'
```

--> Webpack does the work for you because you imported it
But you need to do it to a common file for all your fetters. -> _app.js

------------------
## Day 4

* _app.js vs AppLayout.js
> The parts that are common to all pages go into _app.js, and the parts that are common to specific components go into AppLayout.js, which wraps around the individual components.
---
* Next provides a 'HEAD' component. 
```JavaScript
import Head from 'next/head';
    <Head>
      <meta charSet="utf-8" />
      <title> NodeBird </title>
    </Head>
```

-------------------
## Day 5

* CSS frameworks make heavy use of grid systems.

- Responsive: This is when a page is initially a mobile page, but as the screen increases in width, things like components are rearranged and changed to fit a tablet size, and when the screen increases further, it changes to fit a desktop size.

- Adaptive: Adaptive refers to developing separately for mobile, desktop, tablet, etc. 

---

* 'antd' supports two components to make it responsive: horizontal and vertical lines.
```JavaScript
import { Menu, Input, Row, Col } from 'antd' 
```
----

* Mobile Design: xs
* Tablet PC Design: sm
* Desktop Design: md(mini Desktop)
* lg/xl ...

```JavaScript
<Row>
    <Col xs={24} md={6} />
    <Col xs={24} md={12} />
    <Col xs={24} md={6} />
</Row>
```
ex ) When I thought I was dividing a line into 24 parts,
1.1 xs={24} -> On a mobile screen, one column takes up the whole thing.
1.2 xs={12} -> on mobile screens,
one column takes up 12/24 of the line. 

* gutter: 
