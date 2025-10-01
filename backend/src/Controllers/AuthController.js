import User from "../Models/User.js";
import bcrypt from "bcrypt";


// export const signUp = async (req, res) => {
//     const { fullName, email, password,loginType } = req.body;
  
//     if (!fullName && !email && !password && !loginType) {
//       res.status(401).json({
//         message: "All fields required",
//       });
//     }
  
//     const user = await User.findOne({ 
//       $and: [
//         { loginType },
//         { $or: [ { email }, { fullName } ] }
//       ]
//     });
//     if (user) {
//       res.status(401).json({
//         message: "User Already exists..",
//       });
//     }
  
//     const salt = await bcrypt.genSalt(10);
//     const hasedPassword = await bcrypt.hash(password, salt);
  
//     const newUser = new User({
//       fullName,
//       email,
//       password: hasedPassword,
//       loginType,

//     });
//     await newUser.save();
  
//     if (newUser) {
//       generateToken(newUser, res);
  
//       res.status(201).json({
//         success: true,
//         message: "User created..",
//         data: newUser,
//       });
//     }
  
    
//   };

export const login= async(req,res)=>{
    const {email,password}=req.body;
    const user=await User.findOne({email});
    if(!user){
        return res.status(401).json({message:"Invalid credentials"});
    }
    const isPasswordCorrect=await bcrypt.compare(password,user.password);
    if(!isPasswordCorrect){
        return res.status(401).json({message:"Invalid credentials"});
    }
} 