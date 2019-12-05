import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';

import UserList from "./components/UserList";
import PostList from "./components/PostList";

function App() {
  return (
    <div className="App">
        <Route path="/" exact component={UserList} />
        <Route path="/posts" exact component={PostList} />
    </div>
  );
}

export default App;
