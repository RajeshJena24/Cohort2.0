const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number
})

const noteModel = mongoose.model("notes", noteSchema)

module.exports = noteModel