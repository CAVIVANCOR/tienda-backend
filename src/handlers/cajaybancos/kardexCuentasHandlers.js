const { getAllKardexCuentas, createKardexCuentas, deleteKardexCuentas, regeneraKardexCuentas, searchKardexCuentas } = require("../../controllers/cajaybancos/kardexCuentasControllers");

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

const deleteKardexCuentasHandler = async (req,res)=>{
    const id = req.params.id;
    try {
        const results = await deleteKardexCuentas(id);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

const updateKardexAlmacenHandler = async (req,res)=>{
    const id = req.params.id;
    try {
        const results = await regeneraKardexCuentas(id);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

const searchKardexCuentasHandler = async (req,res)=>{
    let search = req.body;
    try {
        const results = await searchKardexCuentas(search);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

module.exports ={getKardexCuentasHandler, createKardexCuentasHandler, deleteKardexCuentasHandler, updateKardexAlmacenHandler, searchKardexCuentasHandler};
