const { getAllDetMovCuentas, createDetMovCuentas } = require("../../controllers/cajaybancos/detMovCuentasControllers");

const getDetMovCuentasHandler = async (req,res)=>{
    const results = await getAllDetMovCuentas();
    res.status(201).json(results);
};

const createDetMovCuentasHandler = async (req,res)=>{
    let registroDetMovCuentas = req.body;
    try {
        const results = await createDetMovCuentas(registroDetMovCuentas);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

module.exports ={getDetMovCuentasHandler, createDetMovCuentasHandler};
