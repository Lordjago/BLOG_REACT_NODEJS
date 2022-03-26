const User = require("../model/user");
const jwt = require('jsonwebtoken')
const bcrypt = require("bcryptjs");


//Registration
const register = async (req, res, next) => {
  const username = req.body.username;
  const user = await User.find({ username });
  try {
    if (user.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const createdUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    await createdUser.save();
    const { password, ...others } = createdUser._doc;
    return res.status(200).json({
      message: "User created",
      data: others,
    });
  } catch (error) {
    error.status = 500;
    next(error)
  }
};
//Login 
const login = async (req, res, next) => {
  const username = req.body.username;
  const user = await User.findOne({ username });
  try {
    if (!user) {
      return res
        .status(400)
        .json({ message: "No User found with this credential" });
    }
    const validate = await bcrypt.compare(req.body.password, user.password)
    !validate && ( res.status(403).json({message: "Invalid password"}))
    
    const accessToken = jwt.sign({userId: user._id, email: user.email}, process.env.ACCESS_TOKEN, {expiresIn: '1h'} )
    const { password, ...others } = user._doc;
    return res.status(200).json({
      message: "Found",
      data: {
        ...others,
        accessToken: accessToken
      }
    });
  } catch (error) {
    error.status = 500;
    next(error)
  }
};

module.exports = {
  register,
  login,
};
