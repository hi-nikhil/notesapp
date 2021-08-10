import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import todosRoutes from './routes/todos.js'

const app=express()
dotenv.config()

app.use(express.json({extended:true}))
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use('/todos',todosRoutes)


app.get('/',(req,res) =>{
    res.send('Welcome to sever')
})

const PORT=process.env.PORT || 3000
mongoose.connect(process.env.
    mongodb,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology: true,
    useFindAndModify: false 
 }).then(() =>{
     app.listen(PORT,() =>{
         console.log(`server is running on port ${PORT}`)
     })
 }
 ).catch(err =>console.log(err))

