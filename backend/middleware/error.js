const ErrorHandler=require("../utils/errorhandler");

module.exports=(err,req,res,next)=>{
    err.statusCode=err.statusCode || 500;
    err.message=err.message || "Internal Server Error";

    //Wrong MongoDB Id error 
    //matlab jaise kisine product id galat lik di to errror ayegi cast error use bhi handle karna tha isliye yaha use bhin hum handle karenge
   if(err.name==="CastError"){
    const message=`Resource not found.Invalid: ${err.path}`;
    err=new ErrorHandler(message,400);
   }

   //MONGOOSE DUPLICATE KEY ERROR
   if(err.code===11000){
    const message=`Duplicate ${Object.keys(err.keyValue)} Entered`;
    err=new ErrorHandler(message,400);
   }

   //WRONG JWT ERROR
   if(err.name==='JsonWebTokenError'){
    const message=`Json Web Token is invalid ,try again`;
    err=new ErrorHandler(message,400);
   }

   //JWT EXPIRE ERROR
   if(err.name==="TokenExpireError"){
    const message=`Json Web Token is Expired ,try again`;
    err=new ErrorHandler(message,400);
   }
     
    res.status(err.statusCode).json({
        success:false,
        // error:err.stack,  //stack likne se ye faydad hoga puri location bhi ajagi jaha bhi error hogi
        message:err.message,
    })
}

//agr kuch gadbad kuch data sahi se na mile to message:err.message kar diyo uprvali line mai jaha stack use kar rai usline mai