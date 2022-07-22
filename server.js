import express from 'express'
import mongoose from 'mongoose'
import Cards from './dbCards.js'
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()

const port = process.env.PORT || 8001

// App config
const app = express()
const corsOptions ={
    origin:'http://localhost:3000',
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
const connection_url = process.env.CONNECTION_URL

// Middleware
app.use(express.json())

// DB config
mongoose.connect(connection_url, {

})

// API Endpoints
app.get("/", (err, res, req) => res.status(200).send("Hello TheWebDev"))

app.post('/dating/cards', (req, res) => {
    const dbCard = req.body
    Cards.create(dbCard, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
})
app.get('/dating/cards', (req, res) => {
    Cards.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})


// Listener
app.listen(port, () => console.log(`Listening on localhost: ${port}`))
