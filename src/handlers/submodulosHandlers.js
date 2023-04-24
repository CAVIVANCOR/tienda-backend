const { getAllSubModulos } = require("../controllers/submoduloControllers");

const getSubModulosHandler = async (req,res)=>{
    const results = await getAllSubModulos();
    res.status(201).json(results);
};

module.exports ={getSubModulosHandler}