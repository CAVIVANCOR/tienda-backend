const { getAllKardexAlmacen, createKardexAlmacen, deleteKardexAlmacen, regeneraKardexAlmacen, searchKardexAlmacen, consultaStocks } = require("../../controllers/almacen/kardexAlmacenControllers");

const getKardexAlmacenHandler = async (req,res)=>{
    const results = await getAllKardexAlmacen();
    res.status(201).json(results);
};

const createKardexAlmacenHandler = async (req,res)=>{
    let registroKardexAlmacen = req.body;
    try {
        const results = await createKardexAlmacen(registroKardexAlmacen);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

const deleteKardexAlmacenHandler = async (req,res)=>{
    const {idDetMovAlmacen} = req.params;
    try {
        const results = await deleteKardexAlmacen(idDetMovAlmacen);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

const updateKardexAlmacenHandler = async (req,res)=>{
    const {idDetMovAlmacen, idConceptoAlmacen, idClienteProveedor} = req.params;
    let registroKardexAlmacen = req.body;
    try {
        const results = await regeneraKardexAlmacen(idDetMovAlmacen, idConceptoAlmacen, idClienteProveedor,registroKardexAlmacen);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

const searchKardexAlmacenHandler = async (req,res)=>{
    let search = req.body;
    try {
        const results = await searchKardexAlmacen(search);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
}

const consultaStocksHandler = async (req,res)=>{
    let search = req.body;
    try {
        const results = await consultaStocks(search);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};



module.exports ={getKardexAlmacenHandler, createKardexAlmacenHandler , deleteKardexAlmacenHandler, updateKardexAlmacenHandler, searchKardexAlmacenHandler, consultaStocksHandler};