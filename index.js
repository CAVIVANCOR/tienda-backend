const server = require("./src/app");
const {sequelize, SERVER_PORT}=require("./src/db.js");

sequelize.sync({force:true})
.then(()=>{
    server.listen(Number(SERVER_PORT),()=>{
        console.log("Listening on http://localhost:"+SERVER_PORT);
    });
})
.catch((err)=>console.log(err.message));
