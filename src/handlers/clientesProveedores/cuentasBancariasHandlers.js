const { getAllCuentasBancariasCliProv, createCuentasBancariasCliProv } = require("../../controllers/clientesProveedores/cuentasBancariasControllers");

const getCuentasBancariasCliProvHandler = async (req,res)=>{
    const results = await getAllCuentasBancariasCliProv();
    res.status(201).json(results);
};

const createCuentasBancariasCliProvHandler = async (req,res)=>{
    let registroCuentasBancariasCliProv = req.body;
    try {
        const results = await createCuentasBancariasCliProv(registroCuentasBancariasCliProv);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

module.exports ={getCuentasBancariasCliProvHandler, createCuentasBancariasCliProvHandler};
