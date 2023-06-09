const { getAllCabMovAlmacen, createCabMovAlmacen, deleteCabMovAlmacen } = require("../../controllers/almacen/cabMovAlmacenControllers");

const getCabMovAlmacenHandler = async (req,res)=>{
    const results = await getAllCabMovAlmacen();
    res.status(201).json(results);
};

const createCabMovAlmacenHandler = async (req,res)=>{
    let registroCabMovAlmacen = req.body;
    try {
        const results = await createCabMovAlmacen(registroCabMovAlmacen);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

const deleteCabMovAlmacenHandler = async (req,res)=>{
    const {id} = req.params;
    try {
        const results = await deleteCabMovAlmacen(id);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
}

module.exports ={getCabMovAlmacenHandler, createCabMovAlmacenHandler, deleteCabMovAlmacenHandler};
