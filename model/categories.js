const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        allowNull: false
    }
}, {timestamps: true})

module.exports = mongoose.model('categories', categorySchema)