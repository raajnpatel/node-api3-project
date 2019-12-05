import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostCard from "./PostCard";

const PostList = () => {
    const [postList, setPostList] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:4444/api/users/1/posts`)
            .then(res => {
                console.log(res.data);
                setPostList(res.data);
            })
            .catch(error => console.log(error.response));
    }, []);


    const deletePost = id => {
        window.location.reload(true);
        axios
            .delete(`http://localhost:4444/api/posts/${id}`)
            .then(res => console.log(res) || setPostList(res.data))
            .catch(err => console.log(err.response));
    };


    return(
        <div>

            <h1>The List</h1>
            {postList.map(post => {
                return(
                    <div>
                        <PostCard
                            key={post.id}
                            post={post}
                            deletePost={deletePost}
                            // detailsUser={detailsUser}
                        />
                    </div>
                )
            })
            }
        </div>
    )
};

export default PostList;
