import User from "../Models/User.js";
import Developer from '../Models/Developer.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config"

const generateToken =async(userId,res)=>{

    const token =jwt.sign({userId},process.env.MY_SECRET_TOKEN,{expiresIn:"3d"});
    
    res.cookie("jwt",token,{
        secure:process.env.NODE_ENV =="production" ? true:false,
    }) 
    console.log("token :",token);
   
}


export const login= async(req,res)=>{
    const {email,password,loginType}=req.body;
    const user=await User.findOne({email,loginType}).populate("refId");

    if(!user){
        return res.status(401).json({message:"Invalid credentials"});
    }
    const isPasswordCorrect=await bcrypt.compare(password,user.password);
    if(!isPasswordCorrect){
        return res.status(401).json({message:"Invalid credentials"});
    }
    const token = generateToken(user._id,res);
    const { password: _,refId, ...safeUser } = user.toObject();

    res.status(200).json({
        message:"login success",
        token,
        data:safeUser,
        profile:refId
    })
} 

export const devSignUp =async(req,res)=>{
    try{
        const {name,email,password}=req.body;
        const devExist= await Developer.findOne({email});
        if(devExist){
            res.status(400).json({
                message:"Developer already exists.."
            });
        }

    const newDeveloper = new Developer({
        name,
        email,
        password
    });

    await newDeveloper.save();
    res.status(201).json({
        message:"developer created successfully",
        data:newDeveloper
    })
    }catch(error){
        console.log(error.stack);
    }

}

export const devLogin =async(req,res)=>{
    const {email,password}=req.body;
    console.log("email",email); 
    const dev=await Developer.findOne({email,password});

    if(!dev){
       return res.status(400).json({
        
        message:"Developer not found"
       })
       
    }

    generateToken(dev._id,res);
    res.status(200).json({
             message:"Hello Developer..!",
            data:dev
        })
}

export const getUser =async(req,res)=>{
    // const token =req.cookies.jwt;
    // const verified =jwt.verify(token,process.env.MY_SECRET_TOKEN);
    const developer = req.developer;
    console.log("dev",developer);
    if(!developer){
        res.status(400).json({
            message:"Not logged In",
            isLogged:false,
           
        })
    }

    res.status(200).json({
        message:"Logged In",
        isLogged:true,
        dev:developer
    })
}