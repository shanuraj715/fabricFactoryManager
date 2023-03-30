const express = require('express')
const _validator = require('validator')
const mongoose = require('mongoose')

const router = express.Router()

const sendOTP = function (req, res, next) {
    const { email } = req.body
    if (!email) {
        next()
    }

}

const verifyOTP = function (req, res, next) {
    const { otp } = req.body
    if(!otp){
        response(res, 400, 'Invalid Request')
    }
}

router.post('/', (req, res) => {

})


module.exports = router