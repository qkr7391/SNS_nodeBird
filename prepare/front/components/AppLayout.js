import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
const AppLayout = ({children}) =>{
    return(
        <div>
            <div>
                <Link legacyBehavior href="/"><a>Home</a></Link>
                <Link legacyBehavior href="/profile"><a>Profile</a></Link>
                <Link legacyBehavior href="/signup"><a>Sign up</a></Link>

            </div>
            {children}
        </div>

    );
}

AppLayout.propTypes = {
children: PropTypes.node.isRequired,
};

export default AppLayout;