const express = require("express")
const morgan = require("morgan");
const mainRouter = require("./routes/index");
const app = express();

app.use(morgan("dev"));
app.use(express.json());

// Middleware para configurar CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5173");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5173");
    res.header("Access-Control-Allow-Headers", "Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next();
  });

  // Configurar carpeta estática
app.use("/images/productos", express.static("images/productos"));
app.use("/images/logo", express.static("images/logo"));
app.use("/images/personal", express.static("images/personal"));


app.use(mainRouter);

module.exports = app;
