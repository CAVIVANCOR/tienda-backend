const { getAllPreciosCliProv } = require("../../controllers/clientesProveedores/preciosCliProvControllers");

const getPreciosCliProvHandler = async (req,res)=>{
    const results = await getAllPreciosCliProv();
    res.status(201).json(results);
};

module.exports ={getPreciosCliProvHandler}
