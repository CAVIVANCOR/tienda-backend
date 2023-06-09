const { getAllFormaPago, createFormaPago } = require("../../controllers/compras/formaPagoControllers");

const getFormaPagoHandler = async (req,res)=>{
    const results = await getAllFormaPago();
    res.status(201).json(results);
};

const createFormaPagoHandler = async (req,res)=>{
    let registroFormaPago = req.body;
    try {
        const results = await createFormaPago(registroFormaPago);
        res.status(201).json(results);
    } catch (error) {
        res.status(400).json({error:error.message})
    };
};

module.exports ={getFormaPagoHandler, createFormaPagoHandler};
