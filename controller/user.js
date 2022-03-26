const User = require('../model/user')

const Post = require('../model/post')

const bcrypt = require('bcryptjs')

//Get user
const getUser = async (req, res, next) => {
    const username = "john"
    const user = await User.findOne({username})
    try {
        user === null && res.status(400).json({
            message: "No User Found"
        })
        return res.status(200).json({data: user})
    } catch (error) {
        error.status = 500
        next(error)
    }
}

//Update user

const updateUser = async (req, res, next) => {
    const userId = req.body.userId
    const user = await User.findById({_id: userId})
    try {
        user === null && res.status(400).json({
            message: "No User Found"
        })
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        // user.username = req.body.username
        // user.email = req.body.email
        user.password = hashedPassword

        await user.save()
        return res.status(200).json({data: user})
    } catch (error) {
        error.status = 500
        next(error)
    }
}

const deleteUser = async (req, res, next) => {
    const user = await User.findByIdAndDelete({_id: req.params.userId})
    
    try {
        if(user === null) {
            return res.status(400).json({
            message: "No User Found"
        })
        } else {
            await Post.deleteMany({username: user.username})
        }
        
        return res.status(200).json({
            message: "User Deleted"
        })
    } catch (error) {
        error.status = 500
        next(error)
    }
}

module.exports = {
    getUser,
    updateUser,
    deleteUser
}