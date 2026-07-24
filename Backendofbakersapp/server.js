import express from "express"
import pool from "./config/db.js"
import main from "./routes/main.js"


const app = express()
const PORT = 3000


app.use(express.json())
app.use(main)
app.use(express.static("./uploads"))

app.get("/", async (req, res) => {
    const result = await pool.query("SELECT * FROM USER_TABLE")
    console.log(result)
    res.send("database connection established ")
})

app.listen(PORT, () => {
    console.log(`app is listen port${PORT}`)
})