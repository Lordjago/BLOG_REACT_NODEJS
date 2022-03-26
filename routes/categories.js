const router = require("express").Router();

const { createCategory, getCategories } = require("../controller/categories");

router.post("/create", createCategory);

router.get("/", getCategories);

module.exports = router;
