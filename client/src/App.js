import React, { useContext } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from './pages/home/Home'
import SinglePost from './pages/single-post/SinglePost'
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import CreatePost from './pages/create-post/CreatePost'
import Profile from './pages/profile/Profile'
import TopNav from './components/navbar/Navbar'
import { Context } from './context/Context';


export default function App() {
 const {isAuth} = useContext(Context)
  return (
  <Router>
  <TopNav isAuth={isAuth}/>
      <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login"> 
            {isAuth ?  <Home /> : <Login />}
          </Route>
          <Route path="/register">
          {isAuth ?  <Home /> :<Register />}
          </Route>
          <Route path="/profile">
          {isAuth ? <Profile /> : <Register />}
          </Route>
          <Route path="/create">
          {isAuth ? <CreatePost /> : <Register />}
          </Route>
          <Route path="/post/:postId">
            <SinglePost />
          </Route>
        </Switch>
        </Router>
  )
}
