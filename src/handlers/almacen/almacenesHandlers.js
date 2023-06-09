const { getAllAlmacen, createAlmacen, deleteAlmacen } = require("../../controllers/almacen/almacenesControllers");

const getAlmacenHandler = async (req,res)=>{
    const results = await getAllAlmacen();
    res.status(201).json(results);
};

const createAlmacenHandler = async (req,res)=>{
    let registroAlmacen = req.body;
    try {
        const results = await createAlmacen(registroAlmacen);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

const deleteAlmacenHandler = async (req,res)=>{
    let {id} = req.params;
    try {
        const results = await deleteAlmacen(id);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

module.exports ={getAlmacenHandler, createAlmacenHandler, deleteAlmacenHandler};
