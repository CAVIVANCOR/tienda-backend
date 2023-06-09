const { getAllDetCompras, createDetCompras } = require("../../controllers/compras/detComprasControllers");

const getDetComprasHandler = async (req,res)=>{
    const results = await getAllDetCompras();
    res.status(201).json(results);
};

const createDetComprasHandler = async (req,res)=>{
    let registroDetCompras = req.body;
    try {
        const results = await createDetCompras(registroDetCompras);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

module.exports ={getDetComprasHandler, createDetComprasHandler};
