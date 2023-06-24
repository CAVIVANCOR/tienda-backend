const { getAllDetCompras, createDetCompras, deleteDetCompras } = require("../../controllers/compras/detComprasControllers");

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

const deleteDetComprasHandler = async (req,res)=>{
    const id = req.params.id;
    try {
        const results = await deleteDetCompras(id);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
}

module.exports ={getDetComprasHandler, createDetComprasHandler, deleteDetComprasHandler};
