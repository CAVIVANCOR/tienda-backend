const { getAllCabVentas, createCabVentas, deleteCabVentas, updateCabVentas, searchByCabVentas } = require("../../controllers/ventas/cabVentasControllers");

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

const deleteCabVentasHandler = async (req,res)=>{
    const id = req.params.id;
    try {
        const results = await deleteCabVentas(id);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

const updateCabVentasHandler = async (req,res)=>{
    const id = req.params.id;
    let registroCabVentas = req.body;
    try {
        const results = await updateCabVentas(id,registroCabVentas);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

const searchByCabVentasHandler = async (req,res)=>{
    let registroCabVentas = req.body;
    try {
        const results = await searchByCabVentas(registroCabVentas);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

module.exports ={getCabVentasHandler, createCabVentasHandler, deleteCabVentasHandler, updateCabVentasHandler, searchByCabVentasHandler};
