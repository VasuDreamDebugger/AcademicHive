
export const protectedMiddleware =async(req,res,next)=>{
   try{
     const token =req.cookies.jwt;
     console.log("middleware token",token);
     res.status(200).json({
        message:"success",
        token
     })
   }catch(error){
    console.error(error.stack);
   }
}