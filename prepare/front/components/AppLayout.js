import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Menu, Input, Row, Col } from 'antd';
import { useSelector } from 'react-redux';
import { createGlobalStyle } from "styled-components";
import Router from "next/router";
const { Search } = Input; // Import the Search component from Ant Design


// import styled from 'styled-components';

import UserProfile from '../components/UserProfile';
import LoginForm from '../components/LoginForm';
import useInput from "../hooks/useinput";

import { LOG_IN_SUCCESS } from "../reducers/user";

// const SearchInput = styled(Input.Search)`
//   vertical-align: middle;
// `

const Global = createGlobalStyle`
  .ant-row {
    margin-right: 0 !important;
    margin-left: 0 !important;
  }
  
  .ant-col:first-child {
    padding-left: 0 !important;
  }
  
  .ant-col:last-child {
    padding-right: 0 !important;
  }
`
const AppLayout = ({children}) =>{
    // const [isLoggedIn, setIsLoggedIn] = useState(false); //dummy data
    const [searchInput, onChangeSearchInput] = useInput('');
    const { self } = useSelector((state) => state.user)

    const onSearch = useCallback(() => {
        Router.push(`/hashtag/${searchInput}`);
    }, [searchInput]);

    return(
        <div>
            <Global />
            <Menu mode="horizontal">
                <Menu.Item>
                    <Link legacyBehavior href="/"><a>Home</a></Link>
                </Menu.Item>
                <Menu.Item>
                    <Link legacyBehavior href="/profile"><a>Profile</a></Link>
                </Menu.Item>
                <Menu.Item>
                    <Search
                        enterButton
                        value={searchInput}
                        onChange={onChangeSearchInput}
                        onSearch={onSearch}
                    />
                </Menu.Item>
                <Menu.Item>
                    <Link legacyBehavior href="/signup"><a>Sign up</a></Link>
                </Menu.Item>
            </Menu>

            <Row gutter={8}>
                <Col xs={24} md={6}>
                    { self ? <UserProfile/> : <LoginForm/>}
                    {/*{ {LOG_IN_SUCCESS} ? <UserProfile/> : <LoginForm/>}*/}
                </Col>
                <Col xs={24} md={12}>
                    {children}
                </Col>
                <Col xs={24} md={6}>
                    <a href="https://github.com/qkr7391" target="blank" rel="noreferrer noopener">Made By Sammy Park</a>
                </Col>
            </Row>
        </div>
    );
}

AppLayout.propTypes = {
children: PropTypes.node.isRequired,
};

export default AppLayout;