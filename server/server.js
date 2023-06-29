const express = require('express')
const User = require('./modles/User')
const db = require('./connection/')
const cors = require('cors')

const port  = 3030
const app = express()
app.use(cors())
app.use(express.json())

app.use('/api',require('./routes/api/index'))

app.get('/',(req,res)=>{
    res.json({message:'hello world'})

})




app.listen(port,()=>{
    console.log(`http://localhost:${port}`)
})
