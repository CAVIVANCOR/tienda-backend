const { getAllCuentas, createCuentas, deleteCuentas, updateCuentas } = require("../../controllers/cajaybancos/cuentasControllers");

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

const deleteCuentasHandler = async (req,res)=>{
    const id = req.params.id;
    try {
        const results = await deleteCuentas(id);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

const updateCuentasHandler = async (req,res)=>{
    const id = req.params.id;
    let registroCuentas = req.body;
    try {
        const results = await updateCuentas(id,registroCuentas);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
}

module.exports ={getCuentasHandler, createCuentasHandler, deleteCuentasHandler, updateCuentasHandler};
