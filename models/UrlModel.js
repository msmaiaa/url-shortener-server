const mongoose = require("mongoose");

const UrlModel = new mongoose.Schema({
    url: String,
    slug: String,
})

module.exports = mongoose.model('Url', UrlModel);