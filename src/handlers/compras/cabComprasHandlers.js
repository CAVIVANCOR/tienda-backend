const { getAllCabCompras, createCabCompras } = require("../../controllers/compras/cabComprasControllers");

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

module.exports ={getCabComprasHandler, createCabComprasHandler};
