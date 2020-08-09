const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyparser = require("body-parser");
const cors = require("cors");
app.use(bodyparser());
app.use(cors());

mongoose.connect(process.env.DB_URL,{useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log("conectado no banco de dados")
})

app.get('/', (req,res)=>{
    res.send({message: "teste"})
})


app.listen(process.env.PORT);