const { getAllAccesos, createAccesos, deleteAcceso } = require("../../controllers/usuarios/accesoControllers");

const getAccesosHandler = async (req,res)=>{
    const results = await getAllAccesos();
    res.status(201).json(results);
};

const createAccesosHandler = async (req,res)=>{
    let registroAcceso = req.body;
    try {
        let newAcceso = await createAccesos(registroAcceso);
        res.status(201).json(newAcceso);
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

const deleteAccesoHandler = async (req,res)=>{
    const id = req.params.id;
    try {
        const results = await deleteAcceso(id);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

module.exports ={getAccesosHandler,createAccesosHandler, deleteAccesoHandler }