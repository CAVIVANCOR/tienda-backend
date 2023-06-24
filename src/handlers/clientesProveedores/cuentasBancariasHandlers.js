const { getAllCuentasBancariasCliProv, createCuentasBancariasCliProv, deleteCuentasBancariasCliProv, updateCuentasBancariasCliProv } = require("../../controllers/clientesProveedores/cuentasBancariasControllers");

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

const deleteCuentasBancariasCliProvHandler = async (req,res)=>{
    const id = req.params.id;
    try {
        const results = await deleteCuentasBancariasCliProv(id);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

const updateCuentasBancariasCliProvHandler = async (req,res)=>{
    const id = req.params.id;
    let registroCuentasBancariasCliProv = req.body;
    try {
        const results = await updateCuentasBancariasCliProv(id,registroCuentasBancariasCliProv);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
}

module.exports ={getCuentasBancariasCliProvHandler, createCuentasBancariasCliProvHandler, deleteCuentasBancariasCliProvHandler, updateCuentasBancariasCliProvHandler};
