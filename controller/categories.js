const Category = require('../model/categories')

//CREATE CATEGORY
const createCategory = async (req, res, next) => {
    const category = new Category({name: req.body.name})
    try {
        category && await category.save()
        return res.status(201).json({
            message: "Category Created",
            data: category
        })
    } catch (error) {
        error.status = 500
        next(error)
    }
}
//GET ALL CATEGORIES
const getCategories = async (req, res, next) => {
    const category = await Category.find()
    try {
        if (category.length <= 0) {
            return res.status(404).json({message: "No Category Found"})
        }
        return res.status(200).json({
            message: "Category",
            data: category
        })
    } catch (error) {
        error.status = 500
        throw(error)
    }
} 

module.exports = {
    createCategory,
    getCategories
}