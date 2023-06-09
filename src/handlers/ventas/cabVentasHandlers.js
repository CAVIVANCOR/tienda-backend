const { getAllCabVentas, createCabVentas } = require("../../controllers/ventas/cabVentasControllers");

const getCabVentasHandler = async (req,res)=>{
    const results = await getAllCabVentas();
    res.status(201).json(results);
};

const createCabVentasHandler = async (req,res)=>{
    let registroCabVentas = req.body;
    try {
        const results = await createCabVentas(registroCabVentas);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

module.exports ={getCabVentasHandler, createCabVentasHandler};
