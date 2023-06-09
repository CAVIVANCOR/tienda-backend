const { getAllDistrito, createDistrito } = require("../../controllers/clientesProveedores/distritosControllers");

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

module.exports ={getDistritoHandler, createDistritoHandler};
