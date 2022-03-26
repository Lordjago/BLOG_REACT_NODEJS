import React, { useEffect, useState } from "react";
import Post from "../../components/post/Post";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { axiosInstance } from "../../config";

export default function Home() {
  const path = useLocation()
  const pathName = path.search
  let [posts, setPosts] = useState([]);
  let [category, setCategory] = useState([])
  useEffect(() => {
    try {
      const fetchPosts = async() => {
      if(pathName) {
        const fetchedPosts = await axiosInstance.get(`/posts${pathName}`)
        await setPosts(fetchedPosts.data.data)
      }else {
        const fetchedPosts = await axiosInstance.get('/posts/')
        await setPosts(fetchedPosts.data.data)
      }
        const cat = await axiosInstance.get('/category/')
        await setCategory(cat.data.data)
      }
      fetchPosts()
    } catch (error) {
      console.log(error)
    }
    
  }, [pathName])
  return (
    <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
      <Post  key={"key"} posts={posts} cat={category}/>
    </main>
  );
}
