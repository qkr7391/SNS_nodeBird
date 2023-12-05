import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Menu } from 'antd'
const AppLayout = ({children}) =>{
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
                <Link legacyBehavior href="/signup"><a>Sign up</a></Link>
            </Menu.Item>
            </Menu>
            {children}
        </div>
    );
}

AppLayout.propTypes = {
children: PropTypes.node.isRequired,
};

export default AppLayout;