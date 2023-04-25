const { getAllCuentasBancariasCliProv } = require("../../controllers/clientesProveedores/cuentasBancariasControllers");

const getCuentasBancariasCliProvHandler = async (req,res)=>{
    const results = await getAllCuentasBancariasCliProv();
    res.status(201).json(results);
};

module.exports ={getCuentasBancariasCliProvHandler}
