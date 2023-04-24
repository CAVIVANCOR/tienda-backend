const { getAllModulos } = require("../../controllers/usuarios/moduloControllers");

const getModulosHandler = async (req,res)=>{
    const results = await getAllModulos();
    res.status(201).json(results);
};

module.exports ={getModulosHandler}