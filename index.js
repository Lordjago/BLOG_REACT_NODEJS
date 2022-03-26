const express = require ('express')
const Mongoose = require('mongoose')
const multer = require('multer')
const path = require('path')
const app = express()
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const postRoutes = require('./routes/post')
const categoryRoutes = require('./routes/categories')
const cors = require('cors')
require('dotenv').config()

app.use(express.json())
app.use('/images', express.static(path.join(__dirname, '/images')))
app.use(cors())
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images")
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname)
    }
})
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null, true)
    } else {
        cb(null, false)
    }
} 

app.use(multer({storage: storage, fileFilter: fileFilter}).single('image'))

app.use('/api/auth', authRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/users', userRoutes)
app.use('/api/category', categoryRoutes)
app.use((error, req, res, next) => {
    //  res.status(500).redirect('http://localhost:3000')
    // console.log("Hello")
    return res.send("Internal Server Error")
}
)
//Add this line of code for production and also the line of code after "start" in package.json
app.use(express.static(path.join(__dirname, '/client/build')))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build', 'index.html'))
})
const port = process.env.PORT || 8080
Mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    app.listen(port, () => (console.log(`App listening on port ${port}`)))
}).catch(err => console.log(err))
