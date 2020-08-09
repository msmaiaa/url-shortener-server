const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const UrlModel = require("./models/UrlModel");
const app = express();
const bodyparser = require("body-parser");
const cors = require("cors");
app.use(bodyparser());
app.use(cors());

mongoose.connect(process.env.DB_URL,{useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log("conectado no banco de dados")
})

app.get('/url/:slug', async(req,res)=>{
    try{
        if(!req.params.slug){
            res.status(500).send({message: 'Error: missing params'})
        }
        await UrlModel.findOne({slug: req.params.slug})
        .then((doc)=>{
            return res.status(200).send(doc);
            console.log(doc);
        })
        .catch((err)=>{
            return res.status(500).send(err);
        })

    }catch(err){
        res.status(500).send({message: 'Error while trying to get shortened url'})
    }
})

app.post('/url/new', async (req,res)=>{
    try{
        if(!req.body.slug || !req.body.url){
            return res.status(500).send({message: 'Error: missing params'})
        }
        let sUrl = new UrlModel({url: req.body.url, slug: req.body.slug})
        await sUrl.save()
        .then((url)=>{
            res.status(200).send(url);
            console.log(url)
        })
        .catch((err)=>{
            return res.status(500).send(err);
        })
    }catch(err){
        return res.status(500).send({message: 'error while trying to create shortened url'})
    }
})


app.listen(process.env.PORT);