const mongoose = require('mongoose')

if(process.env.NODE_ENV === 'production')
    require('dotenv').config()
else
    require('dotenv').config({
        path: '.env.local'
    })

function dbConnect() {
    const dbUrl = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@myalbum.iqhru.mongodb.net/rajfabrics?retryWrites=true&w=majority`
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