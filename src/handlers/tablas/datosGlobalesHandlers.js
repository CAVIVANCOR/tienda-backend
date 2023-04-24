const { getAllDatosGlobales } = require("../../controllers/tablas/datosGlobalesControllers");

const getDatosGlobalesHandler = async (req,res)=>{
    const results = await getAllDatosGlobales();
    res.status(201).json(results);
};

module.exports ={getDatosGlobalesHandler}