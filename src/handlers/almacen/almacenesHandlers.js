const { getAllAlmacen, createAlmacen, deleteAlmacen, updateAlmacen, searchByAlmacen } = require("../../controllers/almacen/almacenesControllers");
const { catchedAsync, response } = require("../../utils");
const getAlmacenHandler = async (req,res)=>{
    const results = await getAllAlmacen();
    response(res,201,results,"Almacen");
    res.status(201).json(results);
};
const createAlmacenHandler = async (req,res)=>{
    let registroAlmacen = req.body;
    const results = await createAlmacen(registroAlmacen);
    response(res,201,results,"Almacen");
};
const deleteAlmacenHandler = async (req,res)=>{
    let {id} = req.params;
    const results = await deleteAlmacen(id,true);
    response(res,201,results,"Almacen");
};
const updateAlmacenHandler = async (req,res)=>{
    let {id} = req.params;
    let registroAlmacen = req.body;
    const results = await updateAlmacen(id,registroAlmacen);
    response(res,201,results,"Almacen");
};
const searchByAlmacenHandler = async (req,res)=>{
    let search = req.body;
    const results = await searchByAlmacen(search);
    response(res,201,results,"Almacen");
};
module.exports = {  getAlmacenHandler:catchedAsync(getAlmacenHandler),
                    createAlmacenHandler:catchedAsync(createAlmacenHandler), 
                    deleteAlmacenHandler:catchedAsync(deleteAlmacenHandler), 
                    updateAlmacenHandler:catchedAsync(updateAlmacenHandler), 
                    searchByAlmacenHandler:catchedAsync(searchByAlmacenHandler)};