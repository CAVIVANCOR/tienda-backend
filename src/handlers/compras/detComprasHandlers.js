const { getAllDetCompras, createDetCompras, deleteDetCompras, updateDetCompras, searchDetCompras } = require("../../controllers/compras/detComprasControllers");

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
};

const updateDetComprasHandler = async (req,res)=>{
    const id = req.params.id;
    let registroDetCompras = req.body;
    try {
        const results = await updateDetCompras(id,registroDetCompras);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

const searchDetComprasHandler = async (req,res)=>{
    let search = req.body;
    try {
        const results = await searchDetCompras(search);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
}

module.exports ={getDetComprasHandler, createDetComprasHandler, deleteDetComprasHandler, updateDetComprasHandler, searchDetComprasHandler};
