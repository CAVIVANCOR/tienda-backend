const { getAllusuarios } = require("../controllers/usuarioControllers");

const getUsuariosHandler = async (req,res)=>{
    const results = await getAllusuarios();
    res.status(201).json(results);
};

module.exports ={getUsuariosHandler}