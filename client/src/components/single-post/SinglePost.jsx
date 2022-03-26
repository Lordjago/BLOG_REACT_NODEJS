import axios from 'axios'
import React, {useContext, useEffect, useState} from 'react'
import { Link, useLocation } from 'react-router-dom'
import { axiosInstance } from '../../config'
import {Context} from '../../context/Context'

export default function SinglePost() {
  const {user, accessToken} = useContext(Context)
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [updateMode, setUpdateMode] = useState(false)

  const path = useLocation()
  const postId = path.pathname.split('/')[2]
  const [post, setPost] = useState({})
  const [category, setCategory] = useState([])
  useEffect(() => {
    const fetchPost = async () => {
      const res = await axiosInstance.get(`/posts/${postId}`)
      setPost(res.data.data)
      const cat = await axiosInstance.get('/category/')
      await setCategory(cat.data.data)
   }
    fetchPost()
  },[postId])
  const handleDelete = async()  => {
    await axiosInstance({
      method: 'delete',
      url: `/posts/${postId}`,
      headers: {
        Authorization: "Bearer " + accessToken
      }
    })
    window.location.replace('/')
  }
  const handleSubmit = async() => {
    await axiosInstance({
      method: 'put',
      url: `/posts/${postId}`,
      data: {
        title,
        desc,
        username: user.username
      },
      headers: {
        Authorization: "Bearer " + accessToken
      }
    })
    window.location.replace('/')
  }

  return (
    <div>
    <div className="container-fluid py-4">
      <div className="row">
        <div className="col-md-8 mt-4">
          <div className="card">
            <div className="card-header pb-0 px-3">
              <h6 className="mb-0">Post</h6>
            </div>
            <div className="card-body pt-4 p-3">
              <div className="col-xl-12 col-md-12 mb-xl-0 mb-4">
                <div className="card card-blog card-plain">
                  <div className="position-relative">
                    <a className="d-block shadow-xl border-radius-xl" href='/'>
                      <img src={`https://cyberdevblog.herokuapp.com/images/${post.imageUrl}`} alt="img-blur-shadow" className="img-fluid shadow border-radius-lg imgs"/>
                    </a>
                  </div>
                  <div className="card-body px-1 pb-0">
                    <Link to ={`/?user=${post.username}`}className="text-gradient text-dark mb-2 text-sm link">
                      Author: {post.username}
                    </Link>
                    {/* <span className="ms-auto text-end">
                      <a className="btn btn-link text-danger text-gradient px-3 mb-0" href="#"  onClick={handleDelete}><i className="far fa-trash-alt me-2"></i>Delete</a>
                      <a className="btn btn-link text-dark px-3 mb-0" href="#"><i className="fas fa-pencil-alt text-dark me-2" aria-hidden="true" onClick={() => setUpdateMode(true)}></i>Edit</a>
                    </span> */}
                    {updateMode ? (<div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        // placeholder="Title"
                        // value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>) : (<a href="/" className='a'>
                      <h5>
                        {post.title}
                          <span className='span'><i className="far fa-calendar-alt me-2 "></i>
                          <small>{new Date(post.createdAt).toDateString()}</small>
                          </span>
                      </h5>
                    </a>)}
                    {updateMode ? (<div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        // value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                      />
                    </div>
                    ): (<p className="mb-4 text-sm">
                      {post.desc}
                    </p>)}
                    {updateMode && <div className="text-center">
                      <button
                        type="submit"
                        className="btn bg-gradient-dark w-100 my-4 mb-2"
                        onClick={handleSubmit}
                       >
                        Update
                      </button>
                      </div>}
                  </div>
                </div>
              </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 mt-4">
            <div className="card h-100 mb-4">
              <div className="card-header pb-0 px-3">
                <div className="row">
                  <div className="col-md-6">
                  </div>
                  <div className="col-md-6 d-flex justify-content-end align-items-center">
                    <i className="far fa-calendar-alt me-2"></i>
                    <small>{new Date().toDateString()}</small>
                  </div>
                </div>
              </div>
              <div className="card-body pt-4 p-3">
                <h6 className="text-uppercase text-body text-xs font-weight-bolder mb-3">Categories</h6>
                <ul className="list-group">
                  {category.map(c=> (<li className="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg">
                    <div className="d-flex align-items-center">
                      <button className="btn btn-icon-only btn-rounded btn-outline-success mb-0 me-3 btn-sm d-flex align-items-center justify-content-center"><i className="fas fa-arrow-down"></i></button>
                      <div className="d-flex flex-column">
                      <Link to={`/post?cat=${c.name}`} className="mb-1 text-dark text-sm">{c.name}</Link>
                        <span className="text-xs">{c.createdAt && new Date(c.createdAt).toDateString()}</span>
                      </div>
                    </div>
                  </li>))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
