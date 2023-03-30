// const config = require('config');
const bcrypt = require("bcrypt")

const saltRounds = 6; // rounds for password hashing

global.log = function (data) {
    if (process.env.NODE_ENV !== 'production') {
        console.log(data);
    }
}

global.encPassword = async (password) => {
    const salt = await bcrypt.genSalt(saltRounds)
    const hash = await bcrypt.hash(password, salt)
    return hash
}

global.verifyPassword = async (password, hash) => {
    const compared = await bcrypt.compare(password, hash)
    return compared
}

global.mongooseError = (err) => {
    if (err.code === 11000) { // for duplicate key
        const field = Object.keys(err.keyValue)[0];
        const value = err.keyValue[Object.keys(err.keyValue)[0]]
        return {
            type: 'duplicate',
            field,
            value,
            errorMessage: `${field.firstCharUpper()} already exists`
        }
    }
}




// RESPONSES (SUCCESS and FAILURE)
global.response = (res, code, data) => {
    const success = (code >= 200 && code <= 299)
    res.status(code).json({
        success: success,
        ...(!success && { errors: data }),
        ...(success && { data })
    })
}