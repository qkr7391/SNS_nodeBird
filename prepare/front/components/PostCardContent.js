import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";

const PostCardContent = ({ postData }) => (
    <div>
        {postData.split(/(#[^\s#]+)/g).map ((v, index) => {
            if(v.match(/(#[^\s#]+)/)) {
                return <Link href={`/hashtag/${v.slice(1)}`}
                key={index}>{v}</Link>
            }

            return v;
        })}
    </div>
);

PostCardContent.propTypes = { postData: PropTypes.string.isRequired};

export default PostCardContent;