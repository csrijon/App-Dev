import express from "express"

const app = express()
const port = 5000

app.get("/",(req,res) => {
  res.send("hello i am a guy")
})

app.listen(port,()=>{
    console.log(`the app is listen port number ${port}`)
})