const { getAllChofer, createChofer } = require("../../controllers/clientesProveedores/choferesControllers");

const getChoferHandler = async (req,res)=>{
    const results = await getAllChofer();
    res.status(201).json(results);
};

const createChoferHandler = async (req,res)=>{
    let registroChofer = req.body;
    try {
        const results = await createChofer(registroChofer);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

module.exports ={getChoferHandler, createChoferHandler};
