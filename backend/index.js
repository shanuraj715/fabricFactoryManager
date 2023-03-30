require('express-async-errors')
console.clear()
// GLOBAL METHODS
require('./Controllers/Globals')
const express = require('express')
const cookieParser = require('cookie-parser')
const server = express()
server.use(cookieParser());

const bodyParser = require('body-parser')
const cors = require('cors')
const fileUpload = require('express-fileupload')

const useRoutes = require('./Routes/Routes')

// FINAL ERROR HANDLING MODULE
// this will be the last middleware to handle the error
const error = require('./middlewares/error')

// CONNECT TO THE DATABASE
require('./Controllers/Database')();

require('./Controllers/Prototypes')

/**
 * solving cross Origin problem
 */
server.use(cors(require('./Controllers/Cors')))
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))
// server.use(express.json())
// server.use(express.urlencoded({ extended: true }))
server.use(fileUpload())
server.use('/static', express.static('./public'))

server.use('/profile', (req, res, next) => {
    res.json({ a: 5 })
    // next()
})


useRoutes(server)


server.use('*', (req, res, next) => {
    res.status(404).json({ errors: ["Request path not found." ] })
    return
})

server.use(error)

server.listen(5000, () => {
    console.log("Server is running on port " + 5000)
})