//For handling user Registration , login , logout , etc.
const cookie = require('cookie');
const User = require('../models/user.js');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if all fields are provided
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists with this email' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully!' });

  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

const loginUser = async (req,res) => {
    try{
      const {email , password} = req.body;
      if(!email || !password){
        return res.status(400).json({message : 'All fields are required'})
      }
      const userExists = await User.findOne({email})
      if(!userExists){
        return res.status(409).json({ message: 'No user with this email'})
      }
      const isMatch = await bcrypt.compare(password , userExists.password)
      if(!isMatch){
        return res.status(409).json({message : 'Invalid Credentials'})
      }
      var token = jwt.sign({userid : userExists._id , emailid : userExists.email }, JWT_SECRET_KEY)
      
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("logintoken", String(token), {
            maxAge: 60 * 60 * 24 * 7,
            httpOnly: true,
            path: '/'
        }),
    );

    res.status(200).json({
      success: true,
      message: "Welcome to app"
    })
    } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Server error during Login' });
  }
}
const logoutUser = async (req,res) =>{
    // console.log('Logout endpoint hit');

    try{
      res.setHeader(
        'Set-Cookie',
        cookie.serialize('logintoken','',{
          maxAge: 0,
          httpOnly: true ,
          path: '/'
        })
      )
      res.status(200).json({ message: 'Logged out successfully' });

    } catch(error) {
      console.log('Logout Error', error)
      res.status(500).json({ message: 'server error during logout'})
    }
}
module.exports = { registerUser , loginUser , logoutUser};

