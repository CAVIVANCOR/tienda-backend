const { getAllUsuarios,createUsuario } = require("../../controllers/usuarios/usuarioControllers");

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
    }
}
module.exports ={getUsuariosHandler,createUsuarioHandler}