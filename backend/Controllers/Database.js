const mongoose = require('mongoose')

function dbConnect() {
    const dbUrl = 'mongodb+srv://shanuraj715:07426807250@myalbum.iqhru.mongodb.net/rajfabrics?retryWrites=true&w=majority'
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