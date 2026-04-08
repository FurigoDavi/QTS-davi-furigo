const express = require('express')
const mongoose = require('mongoose')
const app = express()


app.use(
  express.urlencoded({
    extended: true,
  }),
)

app.use(express.json())

app.get('/', (req, res) => {

    res.json({ message: 'oi'})

})

// D@vi190808

//mongodb+srv://davifurigo:D@vi190808@apicluster.ghsw2sg.mongodb.net/?appName=APICluster

const DB_USER = 'davifurigo'
const DB_PASSWORD = encodeURIComponent('D@vi190808')

mongoose.connect `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.ghsw2sg.mongodb.net/?appName=APICluster`
.then(() => {
    console.log('conectou')
    app.listen(3000)
})
.catch((err) => console.log(err))


app.listen(3000)