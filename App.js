const express = require('express')
const connectDB = require('./backend/config/db')
const { errorHandler } = require('./backend/middleware/errorMiddleware')
const dotenv = require('dotenv').config()

const port = process.env.port || 5000

connectDB()

const app= express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use((req,res,next)=>{
    console.log("Middleware")
    next()
})

app.use('/api/goals',require('./backend/routes/goalRoutes'))
app.use('/api/users',require('./backend/routes/userRoutes'))

app.get('/', (req,res)=>{
    res.status(200).send("Hello from the server side")
})

app.get('/hell', (req,res)=>{
    res.status(200).send("Welcome to hell")
})

app.use(errorHandler)


app.listen(port,()=>{
console.log('App is running');
})