//ye file humne bnayi error ko handles karne kai liye 
class ErrorHander extends Error{
    constructor(message,statusCode){
        super(message);
        this.statusCode=statusCode
        Error.captureStackTrace(this,this.constructor);
    }
}
//Error ek class hai ,use hove error ko handles karne kai liye

module.exports=ErrorHander