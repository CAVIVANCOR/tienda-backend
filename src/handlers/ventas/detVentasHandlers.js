const { getAllDetVentas, createDetVentas, deleteDetVentas } = require("../../controllers/ventas/detVentasControllers");

const getDetVentasHandler = async (req,res)=>{
    const results = await getAllDetVentas();
    res.status(201).json(results);
};

const createDetVentasHandler = async (req,res)=>{
    let registroDetVentas = req.body;
    try {
        const results = await createDetVentas(registroDetVentas);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

const deleteDetVentasHandler = async (req,res)=>{
    const id = req.params.id;
    try {
        const results = await deleteDetVentas(id);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
}

module.exports ={getDetVentasHandler, createDetVentasHandler, deleteDetVentasHandler};
