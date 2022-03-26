const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        allowNull: false
    },
    desc: {
        type: String,
        required: true,
        allowNull: false
    },
    imageUrl: {
        type: String,
        required: true,
        default: ""
    },
    username: {
        type: String,
        required: true,
        allowNull: false
    },
    categories: {
        type: Array,
        required: false
    }
    // userId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     unique: true,
    //     allowNull: false
    // }
}, {timestamps: true})

module.exports = mongoose.model('Post', postSchema)