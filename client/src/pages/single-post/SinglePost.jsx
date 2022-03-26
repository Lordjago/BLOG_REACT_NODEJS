import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useLocation } from 'react-router-dom'
import Single from '../../components/single-post/SinglePost'
import { axiosInstance } from "../../config";

export default function SinglePost() {
  // const location = useLocation()
  // const postId = location.pathname.split('/')[2]
  // const [post, setPost] = useState({})
  // const [category, setCategory] = useState([])
  // useEffect(() => {
  //   const fetchPost = async () => {
  //     const res = await axiosInstance.get(`/posts/${postId}`)
  //     await setPost(res.data.data)
  //     // const cat = await axiosInstance.get('/category/')
  //     // await setCategory(cat.data.data)
  //   }
  //   fetchPost()
  // },[])
  // console.log(post)
  // console.log(category)
  return (
    <>
    
        <Single />
    </>
  )
}
