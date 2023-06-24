const { getAllDatosGlobales, createDatosGlobales, deleteDatosGlobales} = require("../../controllers/tablas/datosGlobalesControllers");

const getDatosGlobalesHandler = async (req,res)=>{
    const results = await getAllDatosGlobales();
    res.status(201).json(results);
};

const createDatosGlobalesHandler = async (req,res)=>{
    let registroDatosGlobales = req.body;
    try {
        const results = await createDatosGlobales(registroDatosGlobales);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

const deleteDatosGlobalesHandler = async (req,res)=>{
    const id = req.params.id;
    try {
        const results = await deleteDatosGlobales(id);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
}

module.exports ={getDatosGlobalesHandler,createDatosGlobalesHandler, deleteDatosGlobalesHandler};