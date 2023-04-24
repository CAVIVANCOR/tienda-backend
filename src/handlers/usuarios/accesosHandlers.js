const { getAllAccesos } = require("../../controllers/usuarios/accesoControllers");

const getAccesosHandler = async (req,res)=>{
    const results = await getAllAccesos();
    res.status(201).json(results);
};

module.exports ={getAccesosHandler}