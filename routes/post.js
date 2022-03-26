const { getPosts, singlePost, createPost, updatePost, deletePost } = require('../controller/post')
const { authentication } = require("../middleware/authJwt");
const router = require('express').Router()


// GET ALL POST
router.get('/', getPosts)
//GET SINGLE POST
router.get('/:postId', singlePost)
//CREATE POST
router.post('/create', authentication, createPost)
//UPDATE POST
router.put('/:postId', authentication, updatePost)
//DELETE POST
router.delete('/:postId', authentication, deletePost)

module.exports = router