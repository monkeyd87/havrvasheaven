const express = require('express')
const cors = require('cors')

const port  = 3030
const app = express()
app.use(cors())


app.get('/',(req,res)=>{
    res.json({message:'hello world'})
})

app.listen(port,()=>{
    console.log(`http://localhost:${port}`)
})