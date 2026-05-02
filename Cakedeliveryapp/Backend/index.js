import express from "express"
import Sendmailroute from "./routes/Sendmailroute.js"
import Loginroute from "./routes/Loginroute.js"
import dotenv from "dotenv"
import cors from "cors"
dotenv.config()

const app = express()
const port = 5000

app.use(cors())
app.use(express.json())
app.use("/Sendmail",Sendmailroute)
app.use("/googleAuth",Loginroute)

app.get("/",(req,res) => {
  res.send("hello i am a guy")
})

app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`)
})