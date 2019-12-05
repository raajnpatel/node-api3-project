import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserCard from "./UserCard";

const UserList = () => {
    const [userList, setUserList] = useState([]);
    const [postList, setPostList] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:4444/api/users`)
            .then(res => {
                console.log(res.data);
                setUserList(res.data);
            })
            .catch(error => console.log(error.response));
    }, []);


    const deletePerson = id => {
        window.location.reload(true);
        axios
            .delete(`http://localhost:4444/api/users/${id}`)
            .then(res => console.log(res) || setUserList(res.data))
            .catch(err => console.log(err.response));
    };

    const detailsUser = id => {
        axios
            .get(`http://localhost:4444/api/users/${id}/posts`)
            .then(res => {
                console.log(res);
                setPostList(res.data)
                })
            .catch(err => console.log(err.response));
    };


    return(
        <div>

            <h1>The List</h1>
            {userList.map(user => {
                return(
                    <div>
                        <UserCard
                            key={user.id}
                            user={user}
                            deleteUser={deletePerson}
                            detailsUser={detailsUser}
                        />
                    </div>
                )
            })
            }
        </div>
    )
};

export default UserList;
