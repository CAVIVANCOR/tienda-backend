const { getAllModulos, createModulo } = require("../../controllers/usuarios/moduloControllers");

const getModulosHandler = async (req,res)=>{
    const results = await getAllModulos();
    res.status(201).json(results);
};

const createModuloHandler = async (req,res)=>{
    let registroModulo = req.body;
    try {
        let results = await createModulo(registroModulo);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}


module.exports ={getModulosHandler, createModuloHandler}