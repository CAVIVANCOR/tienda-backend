const { getAllModulos, createModulo, deleteModulo, updateModulo } = require("../../controllers/usuarios/moduloControllers");

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

const deleteModuloHandler = async (req,res)=>{
    const id = req.params.id;
    try {
        const results = await deleteModulo(id);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    }
};

const updateModuloHandler = async (req,res)=>{
    const id = req.params.id;
    let registroModulo = req.body;
    try {
        const results = await updateModulo(id,registroModulo);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

module.exports ={getModulosHandler, createModuloHandler, deleteModuloHandler, updateModuloHandler}