const { getAllRoles,createRol, deleteRol, updateRol } = require("../../controllers/usuarios/rolControllers");

const getRolesHandler = async (req,res)=>{
    const results = await getAllRoles();
    res.status(201).json(results);
};
const createRolHandler = async (req,res)=>{
    let registroRol = req.body;
    try {
        const results = await createRol(registroRol);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    }
};

const deleteRolHandler = async (req,res)=>{
    const id = req.params.id;
    try {
        const results = await deleteRol(id);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    }
};

const updateRolHandler = async (req,res)=>{
    const id = req.params.id;
    let registroRol = req.body;
    try {
        const results = await updateRol(id,registroRol);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

module.exports ={getRolesHandler,createRolHandler, deleteRolHandler, updateRolHandler}