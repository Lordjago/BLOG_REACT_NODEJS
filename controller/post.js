const Post = require('../model/post')
//Get all post
const getPosts = async(req, res, next) => {
    const category = req.query.cat
    const username = req.query.user
    try {
        let posts; 
        if(username) {
            posts = await Post.find({username}).sort({createdAt: -1})
        } else if (category) {
            posts = await Post.find({categories: { $in: [category]}}).sort({createdAt: -1})
        } else {
            posts = await Post.find().sort({createdAt: -1})
        }
        if (posts.length <=0) {
            return res.status(400).json({message:"No post found"})
        }
        return res.status(200).json({data: posts})
    } catch (error) {
        error.status = 500
        next(error)
    }
}
//Get post with ID
const singlePost =  async(req, res, next) => {
    const post = await Post.findOne({_id: req.params.postId})
    try {
            if (post === null) {
                return res.status(400).json({message:"No post found"})
            }
            return res.status(200).json({data: post})
    } catch (error) {
        error.status = 500
        next(error)
    }
}

//Create post
const createPost =  async(req, res, next) => {
    const imageUrl = req.file
    const post = new Post({
        title: req.body.title,
        desc: req.body.desc,
        imageUrl: imageUrl.filename,
        username: req.body.username
    }) 
    try {
        await post.save()
        return res.status(201).json({
            message: "Post created",
            data: post
        })
    } catch (error) {
        error.status = 500
        next(error)
    }
}

//Update post 
const updatePost =  async(req, res, next) => {
    const post = await Post.findOne({_id: req.params.postId})
    try {
            if (post === null) {
                return res.status(400).json({message:"No post found"})
            }
            post.title =  req.body.title
            post.desc = req.body.desc
            // post.image ="image"
            post.username = req.body.username
            await post.save()
            return res.status(200).json({
                meesage: "Post Updated",
                data: post
            })
    } catch (error) {
        error.status = 500
        next(error)
    }
}
//Delete post

const deletePost = async(req, res, next) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.postId)
        if (post === null) {
            return res.status(400).json({
            message: "Post with this Id not found"
            })
        }
        return res.status(200).json({
            message: "Deleted"
        })
    } catch (error) {
        error.status = 500
        next(error)
    }
    
}

module.exports = {
    getPosts,
    singlePost,
    createPost,
    updatePost,
    deletePost
}
