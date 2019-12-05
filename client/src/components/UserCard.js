import React from 'react';
import PostCard from "./PostCard";

const UserCard = ({user, deleteUser, detailsUser}) => {

    return (
        <div>
            <p>ID: {user.id}</p>
            <h2>Name: {user.name}</h2>
            <br/>
            <button onClick={() => detailsUser(user.id)}>Details</button>
            <button onClick={() => deleteUser(user.id)}>Delete</button>
            <PostCard/>
            <br/><br/>
        </div>
    )
};

export default UserCard;
