const express = require('express')
const noteModel = require('./models/notes.model')
const cors = require('cors')

const path = require('path')

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static(path.join(__dirname, "public")))
// app.use(express.static("src/public"))

app.post("/api/notes", async(req, res) => {
    const {title, description, price} = req.body

    const note = await noteModel.create({
        title, description, price
    })

    res.status(201).json({
        message: "Note created successfully",
        note
    })
})

app.get("/api/notes", async (req, res) => {
    const notes = await noteModel.find()

    res.status(200).json({
        message: "all notes fetched successfully",
        notes
    })
})

app.delete("/api/notes/:noteId", async(req, res) => {
    const id = req.params.noteId
    await noteModel.findByIdAndDelete(id)

    res.status(200).json({
        message: "Note deleted successfully"
    })
})

app.patch("/api/notes/:id", async(req, res) => {
    const id = req.params.id

    const {description, price} = req.body

    // const note = await noteModel.findByIdAndUpdate(id, {description, price}, {new: true})
    const note = await noteModel.findByIdAndUpdate(id, {description, price},  { returnDocument: 'after' })

    res.status(200).json({
        message: "note updated successfully",
        note
    })
})

app.use("*name", (req, res) => {
    // console.log(__dirname)
    res.sendFile(path.join(__dirname, "public", "index.html"))
})

module.exports = app