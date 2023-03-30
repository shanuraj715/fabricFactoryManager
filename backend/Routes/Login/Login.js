const express = require('express');
const router = express.Router();
const _validator = require('validator');
const auth = require('../../Controllers/Auth')

const UserModel = require('../../Models/User')

const validator = (req, res, next) => {
    const errors = [];
    const { username, password } = req.body
    if (!username || username.length < 6 || username.length > 20)
        errors.push('Invalid username');
    if (!password || password.length < 8 || password.length > 30)
        errors.push('Password must be at least 8 characters and more than 30 characters');
    if (errors.length) {
        response(res, 400, errors)
        return
    }
    next();
}

const checkForAccountDataComplete = data => {
    const {
        firstName,
        lastName,
        gstin,
        company,
        mobile,
    } = data

    if (firstName && lastName && gstin && company && mobile) {
        return false
    }
    return true
}

router.post('/', validator, async (req, res, next) => {
    const { username, password } = req.body
    // const userModel = new UserModel()

    const result = await UserModel.findOne({ username })
    if (!result) {
        response(res, 400, ['Incorrect username or password'])
        return
    }
    if (await verifyPassword(password, result.password)) {
        const token = auth.sign({
            username, password, uid: result._id
        })

        res
            .set({ "x-auth-token": token, "Access-Control-Expose-Headers": "x-auth-token" })
            .cookie("authToken", token)
            .cookie('uid', result._id)
            .status(200)
            .json({
                success: true,
                data: {
                    loginStatus: true,
                    requireAction: checkForAccountDataComplete(result),
                    token,
                    userInfo: {
                        firstName: result.firstName ?? '',
                        lastName: result.lastName ?? '',
                        username: result.username,
                        email: result.email,
                        gstin: result.gstin ?? '',
                        uid: result._id
                    }
                }
            })
        return
    }
    response(res, 400, ['Incorrect username or password.'])
    return
})


module.exports = router