const { getAllDetMovCuentas, createDetMovCuentas, deleteDetMovCuenta, updateDetMovCuentas, searchDetMovCuentas } = require("../../controllers/cajaybancos/detMovCuentasControllers");

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

const deleteDetMovCuentasHandler = async (req,res)=>{
    const id = req.params.id;
    try {
        const results = await deleteDetMovCuenta(id);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

const updateDetMovCuentasHandler = async (req,res)=>{
    const id = req.params.id;
    let registroDetMovCuentas = req.body;
    try {
        const results = await updateDetMovCuentas(id,registroDetMovCuentas);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

const searchDetMovCuentasHandler = async (req,res)=>{
    let search = req.body;
    try {
        const results = await searchDetMovCuentas(search);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

module.exports ={getDetMovCuentasHandler, createDetMovCuentasHandler, deleteDetMovCuentasHandler, updateDetMovCuentasHandler, searchDetMovCuentasHandler};
