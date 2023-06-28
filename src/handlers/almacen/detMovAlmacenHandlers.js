const { getAllDetMovAlmacen, createDetMovAlmacen, deleteDetMovAlmacen, updateDetMovAlmacen, searchDetMovAlmacen } = require("../../controllers/almacen/detMovAlmacenControllers");

const getDetMovAlmacenHandler = async (req,res)=>{
    const results = await getAllDetMovAlmacen();
    res.status(201).json(results);
};

const createDetMovAlmacenHandler = async (req,res)=>{
    let registroDetMovAlmacen = req.body;
    try {
        const results = await createDetMovAlmacen(registroDetMovAlmacen);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

const deleteDetMovAlmacenHandler = async (req,res)=>{
    const {id} = req.params;
    try {
        const results = await deleteDetMovAlmacen(id);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

const updateDetMovAlmacenHandler = async (req,res)=>{
    const {id} = req.params;
    let registroDetMovAlmacen = req.body;
    try {
        const results = await updateDetMovAlmacen(id,registroDetMovAlmacen);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

const searchDetMovAlmacenHandler = async (req,res)=>{
    let search = req.body;
    try {
        const results = await searchDetMovAlmacen(search);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
}

module.exports ={getDetMovAlmacenHandler, createDetMovAlmacenHandler, deleteDetMovAlmacenHandler, updateDetMovAlmacenHandler, searchDetMovAlmacenHandler};
