const { getAllSubModulos,createSubModulo } = require("../../controllers/usuarios/submoduloControllers");

const getSubModulosHandler = async (req,res)=>{
    const results = await getAllSubModulos();
    res.status(201).json(results);
};

const createSubModuloHandler = async (req,res)=>{
    let registroSubModulo = req.body;
    try {
        const results = await createSubModulo(registroSubModulo);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}
module.exports ={getSubModulosHandler, createSubModuloHandler}