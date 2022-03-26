import React, { useContext } from 'react'
import {
  Link
} from "react-router-dom";
import { Context } from '../../context/Context';
export default function Navbar({isAuth}) {
  const {dispatch} = useContext(Context)
  const handleLogout = () => {
    dispatch({type: "LOGOUT"})
  }
  return (
    <>
      <nav className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl" id="navbarBlur" navbar-scroll="true">
      <div className="container-fluid py-1 px-3">
        <nav aria-label="breadcrumb">
          <h6 className="font-weight-bolder mb-0">Blog Posts</h6>
        </nav>
        <div className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
          <div className="ms-md-auto pe-md-3 d-flex align-items-center">
          </div>
          <ul className="navbar-nav  justify-content-end">
            
            <li className="nav-item d-flex align-items-center" style={{marginRight:20}}>
              <Link to="/" className="nav-link text-body font-weight-bold px-0 link">
                <span className="d-sm-inline d-none">Home</span>
              </Link>
            </li>
            <li className="nav-item d-flex align-items-center">
            <Link to="/create" className="btn btn-outline-primary btn-sm mb-0 me-3 link">
               Create Post
            </Link>
            </li>
              {!isAuth ? (<>
              <li className="nav-item d-flex align-items-center">
                <Link to="/login" className="nav-link text-body font-weight-bold px-0 link">
                <i className="fa fa-user me-sm-1"></i>
                <span className="d-sm-inline d-none">Login</span>
              </Link></li>
              <li className="nav-item d-flex align-items-center" style={{marginLeft:20}}>
              <Link to="/register" className="nav-link text-body font-weight-bold px-0 link">
              <span className="d-sm-inline d-none">Register</span>
            </Link></li></>
              ) : 
              (<>
                <li className="nav-item d-flex align-items-center">
                  <Link to="/login" className="nav-link text-body font-weight-bold px-0 link" onClick={handleLogout}>
                    <i className="fa fa-user me-sm-1"></i>
                    <span className="d-sm-inline d-none">Logout</span>
                  </Link>
              </li>
              <li className="nav-item px-3 d-flex align-items-center">
              <Link to="/profile" className="nav-link text-body font-weight-bold px-0 link">
              <img src="https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmlld3xlbnwwfHwwfHw%3D&w=1000&q=80"className='profileImg' alt="user5"/>
              </Link>
            </li></>)
              }
            
          </ul>
        </div>
      </div>
    </nav>
    </>
  )
}
