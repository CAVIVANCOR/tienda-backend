const express = require("express")
const morgan = require("morgan");
const mainRouter = require("./routes/index");
const app = express();

app.use(morgan("dev"));
app.use(express.json());

// Middleware para configurar CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5173");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  // Configurar carpeta estática
app.use("/images/productos", express.static("images/productos"));
app.use("/images/logo", express.static("images/logo"));


app.use(mainRouter);

module.exports = app;
