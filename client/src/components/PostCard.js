import React from 'react';

const PostCard = ({post, deletePost}) => {
    return (
        <div>
            <p>ID: {post.id}</p>
            <h2>Text: {post.text}</h2>
            <h4>Posted By: {post.postedBy}</h4>
            <br/>
            <button onClick={() => deletePost(post.id)}>Delete</button>
            <br/><br/>
        </div>
    )
};

export default PostCard;
