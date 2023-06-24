const { getAllTransportistaCliProv, createTransportistaCliProv, deleteTransportistaCliProv } = require("../../controllers/clientesProveedores/transportistaCliProvControllers");

const getTransportistaCliProvHandler = async (req,res)=>{
    const results = await getAllTransportistaCliProv();
    res.status(201).json(results);
};

const createTransportistaCliProvHandler = async (req,res)=>{
    let registroTransportistaCliProv = req.body;
    try {
        const results = await createTransportistaCliProv(registroTransportistaCliProv);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

const deleteTransportistaCliProvHandler = async (req,res)=>{
    const id = req.params.id;
    try {
        const results = await deleteTransportistaCliProv(id);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
}

module.exports ={getTransportistaCliProvHandler, createTransportistaCliProvHandler, deleteTransportistaCliProvHandler};
