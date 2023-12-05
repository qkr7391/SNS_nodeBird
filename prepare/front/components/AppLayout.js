import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Menu, Input, Row, Col } from 'antd';

import UserProfile from '../components/UserProfile';
import LoginForm from '../components/LoginForm';

const AppLayout = ({children}) =>{
    const [isLoggedIn, setIsLoggedIn] = useState(false); //dummy data
    return(
        <div>
            <Menu mode="horizontal">
                <Menu.Item>
                    <Link legacyBehavior href="/"><a>Home</a></Link>
                </Menu.Item>
                <Menu.Item>
                    <Link legacyBehavior href="/profile"><a>Profile</a></Link>
                </Menu.Item>
                    <Menu.Item>
                        <Input.Search/>
                    </Menu.Item>
                <Menu.Item>
                    <Link legacyBehavior href="/signup"><a>Sign up</a></Link>
                </Menu.Item>
            </Menu>

            <Row gutter={8}>
                <Col xs={24} md={6}>
                    {isLoggedIn ? <UserProfile /> : <LoginForm/>}
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