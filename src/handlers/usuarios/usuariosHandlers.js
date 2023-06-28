const { getAllUsuarios,createUsuario, deleteUsuario, updateUsuario, searchUsuario } = require("../../controllers/usuarios/usuarioControllers");

const getUsuariosHandler = async (req,res)=>{
    const results = await getAllUsuarios();
    res.status(201).json(results);
};
const createUsuarioHandler = async (req,res)=>{
    let registroUsuario = req.body;
    try {
        const results = await createUsuario(registroUsuario);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

const deleteUsuarioHandler = async (req,res)=>{
    const id = req.params.id;
    try {
        const results = await deleteUsuario(id);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

const updateUsuarioHandler = async (req,res)=>{
    const id = req.params.id;
    let registroUsuario = req.body;
    try {
        const results = await updateUsuario(id,registroUsuario);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

const searchUsuarioHandler = async (req,res)=>{
    let registroUsuario = req.body;
    try {
        const results = await searchUsuario(registroUsuario);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

module.exports ={getUsuariosHandler,createUsuarioHandler,deleteUsuarioHandler, updateUsuarioHandler, searchUsuarioHandler}