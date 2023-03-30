const register = require('./Register/Register')
const login = require('./Login/Login')
const forgotPassword = require('./ForgotPassword/ForgotPassword')   

const routes = server => {
    server.use('/register', register)
    server.use('/login', login)
    server.use('/forgotPassword', forgotPassword)

}

module.exports = routes