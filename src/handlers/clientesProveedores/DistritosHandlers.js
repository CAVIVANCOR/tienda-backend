const { getAllDistrito, createDistrito, deleteDistrito, updateDistrito } = require("../../controllers/clientesProveedores/distritosControllers");

const getDistritoHandler = async (req,res)=>{
    const results = await getAllDistrito();
    res.status(201).json(results);
};

const createDistritoHandler = async (req,res)=>{
    let registroDistrito = req.body;
    try {
        const results = await createDistrito(registroDistrito);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

const deleteDistritoHandler = async (req,res)=>{
    const id = req.params.id;
    try {
        const results = await deleteDistrito(id);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

const updateDistritoHandler = async (req,res)=>{
    const id = req.params.id;
    let registroDistrito = req.body;
    try {
        const results = await updateDistrito(id,registroDistrito);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
}

module.exports ={getDistritoHandler, createDistritoHandler, deleteDistritoHandler, updateDistritoHandler};
