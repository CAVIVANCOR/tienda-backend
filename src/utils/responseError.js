const responseError=(res,statusCode,message,nameTable)=>{
    res.status(statusCode).json({
        error:true,
        message,
        nameTable,
        statusCode
    });
};
module.exports=responseError;