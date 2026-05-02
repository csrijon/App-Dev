import express from "express"
import Sendmailroute from "./routes/Sendmailroute.js"
import dotenv from "dotenv"
dotenv.config()

const app = express()
const port = 5000

app.use(express.json())
app.use("/Sendmail",Sendmailroute)

app.get("/",(req,res) => {
  res.send("hello i am a guy")
})

app.listen(port,()=>{
    console.log(`the app is listen port number ${port}`)
})