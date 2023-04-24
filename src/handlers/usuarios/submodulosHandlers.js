const { getAllSubModulos } = require("../../controllers/usuarios/submoduloControllers");

const getSubModulosHandler = async (req,res)=>{
    const results = await getAllSubModulos();
    res.status(201).json(results);
};

module.exports ={getSubModulosHandler}