const { getAllChofer, createChofer, deleteChofer, updateChofer } = require("../../controllers/clientesProveedores/choferesControllers");

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

const deleteChoferHandler = async (req,res)=>{
    const id = req.params.id;
    try {
        const results = await deleteChofer(id);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

const updateChoferHandler = async (req,res)=>{
    const id = req.params.id;
    let registroChofer = req.body;
    try {
        const results = await updateChofer(id,registroChofer);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
}

module.exports ={getChoferHandler, createChoferHandler, deleteChoferHandler, updateChoferHandler};
