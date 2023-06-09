const { getAllTDI, createTDI } = require("../../controllers/clientesProveedores/tipoDocIdentidadControllers");

const getTDIHandler = async (req,res)=>{
    const results = await getAllTDI();
    res.status(201).json(results);
};

const createTDIHandler = async (req,res)=>{
    let registroTDI = req.body;
    try {
        const results = await createTDI(registroTDI);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

module.exports ={getTDIHandler, createTDIHandler};
