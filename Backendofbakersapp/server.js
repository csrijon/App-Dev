import express from "express"
import mongoose from "mongoose"

const app = express()
const PORT = 3000

mongoose.connect("mongodb://127.0.0.1:27017/test").then(() => {
    console.log("Mongodb is connected")
}).catch((error) => {
    console.log(error)
})


app.get("/", (req, res) => {
    res.send("hello this is my initial backend server")
})

app.listen(PORT, () => {
    console.log(`app is listen port${PORT}`)
})