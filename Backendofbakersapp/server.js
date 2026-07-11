import express from "express"
import db from "./config/db.js"
import main from "./routes/main.js"


const app = express()
const PORT = 3000


app.use(express.json())
app.use(main)
app.use(express.static("./uploads"))

app.get("/", async (req, res) => {
    const result = await db.query("SELECT current_database()")
    res.json({
        mess: "database connected successfully",
        name: result
    })
})

app.listen(PORT, () => {
    console.log(`app is listen port${PORT}`)
})