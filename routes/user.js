const { getUser, updateUser, deleteUser } = require('../controller/user')
const { authentication } = require('../middleware/authJwt')

const router = require('express').Router()


//Get User
router.get('/', getUser)
//Update User
router.put('/update', authentication, updateUser)
//Delete User
router.delete('/:userId', authentication, deleteUser)
module.exports = router