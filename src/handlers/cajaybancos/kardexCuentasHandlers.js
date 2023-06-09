const { getAllKardexCuentas, createKardexCuentas } = require("../../controllers/cajaybancos/kardexCuentasControllers");

const getKardexCuentasHandler = async (req,res)=>{
    const results = await getAllKardexCuentas();
    res.status(201).json(results);
};

const createKardexCuentasHandler = async (req,res)=>{
    let registroKardexCuentas = req.body;
    try {
        const results = await createKardexCuentas(registroKardexCuentas);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

module.exports ={getKardexCuentasHandler, createKardexCuentasHandler};
