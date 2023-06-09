const { getAllCuentas, createCuentas } = require("../../controllers/cajaybancos/cuentasControllers");

const getCuentasHandler = async (req,res)=>{
    const results = await getAllCuentas();
    res.status(201).json(results);
};

const createCuentasHandler = async (req,res)=>{
    let registroCuentas = req.body;
    try {
        const results = await createCuentas(registroCuentas);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

module.exports ={getCuentasHandler, createCuentasHandler};
