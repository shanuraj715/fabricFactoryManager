require('dotenv').config()
const mongoose = require('mongoose')

function dbConnect() {
    const dbUrl = `mongodb+srv://shanuraj715:${process.env.DB_PASSWORD}@myalbum.iqhru.mongodb.net/rajfabrics?retryWrites=true&w=majority`
    console.log(dbUrl)
    mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log("Connected to database.")
        })
        .catch(err => {
            // console.log(err)
            process.exit(1)
        })
}

module.exports = dbConnect