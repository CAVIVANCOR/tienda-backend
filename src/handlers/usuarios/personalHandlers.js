const { getAllPersonal, createPersona, deletePersona } = require("../../controllers/usuarios/personalControllers");

const getPersonalHandler = async (req,res)=>{
    const results = await getAllPersonal();
    res.status(201).json(results);
};

const createPersonalHandler = async (req,res)=>{
    let registroPersona = req.body;
    try {
        const results = await createPersona(registroPersona);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    }
};

const deletePersonalHandler = async (req,res)=>{
    const id = req.params.id;
    try {
        const results = await deletePersona(id);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

module.exports ={getPersonalHandler,createPersonalHandler, deletePersonalHandler}