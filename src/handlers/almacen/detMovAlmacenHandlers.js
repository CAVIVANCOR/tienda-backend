const { getAllDetMovAlmacen, createDetMovAlmacen, deleteDetMovAlmacen } = require("../../controllers/almacen/detMovAlmacenControllers");

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
}

module.exports ={getDetMovAlmacenHandler, createDetMovAlmacenHandler, deleteDetMovAlmacenHandler};
