const response = (res,statusCode,data, nameTable)=>{
    res.status(statusCode).json({
        error:false,
        data,
        statusCode,
        nameTable
    });
};
module.exports = response;