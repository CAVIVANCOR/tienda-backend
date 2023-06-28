const { getAllCabCompras, createCabCompras, deleteCabCompras, updateCabCompras, searchByCabCompras } = require("../../controllers/compras/cabComprasControllers");

const getCabComprasHandler = async (req,res)=>{
    const results = await getAllCabCompras();
    res.status(201).json(results);
};

const createCabComprasHandler = async (req,res)=>{
    let registroCabCompras = req.body;
    try {
        const results = await createCabCompras(registroCabCompras);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

const deleteCabComprasHandler = async (req,res)=>{
    const id = req.params.id;
    try {
        const results = await deleteCabCompras(id);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

const updateCabComprasHandler = async (req,res)=>{
    const id = req.params.id;
    let registroCabCompras = req.body;
    try {
        const results = await updateCabCompras(id,registroCabCompras);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

const searchByCabComprasHandler = async (req,res)=>{
    let search = req.body;
    try {
        const results = await searchByCabCompras(search);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

module.exports ={getCabComprasHandler, createCabComprasHandler, deleteCabComprasHandler, updateCabComprasHandler, searchByCabComprasHandler};
