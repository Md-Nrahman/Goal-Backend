const jwt= require('jsonwebtoken')
const bcrypt= require('bcryptjs')
const asyncHandler= require('express-async-handler')
const User = require('../models/userModel')

//@desc Register New User
//@route POST /api/users
//@access Public

const registerUser=asyncHandler(async(req,res)=>{
    const {name, email, password}= req.body

    if(!name || !email || !password){
        res.status(400).json({message:'Please fill all fields'})
    }

    const userExists= await User.findOne({email:email})

    if(userExists){
        res.status(400).json({message:'User already exists'})
    }

    //Hash password
    const salt= await bcrypt.genSalt(10)
    const hashedPassword= await bcrypt.hash(password, salt)

    const user= await User.create({
        name,
        email,
        password:hashedPassword
    })

    if(user){
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id)
        })
    }else{
        res.status(400).json({message:'Invalid user data'})
    }

   

}
)
//@desc Login a User
//@route POST /api/users
//@access Public

const loginUser=asyncHandler(async(req,res)=>{
    
    const {email, password}= req.body

    const user= await User.findOne({email:email})

    if(user && (await bcrypt.compare(password, user.password))){
        res.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id)
        })
    }else{
        res.status(401).json({message:'Invalid email or password'})
    }
}
)


//generate JWT
const generateToken=(id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn:'30d'
    })
}

module.exports={
    registerUser,
    loginUser,
}