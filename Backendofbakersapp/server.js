import express from "express"


const app = express()
const PORT = 3000



app.get("/", (req, res) => {
    res.send("hello this is my initial backend server")
})

app.listen(PORT, () => {
    console.log(`app is listen port${PORT}`)
})