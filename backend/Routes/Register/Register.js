const express = require('express');
const router = express.Router();
const _validator = require('validator');

const UserModel = require('../../Models/User')

const validateData = (req, res, next) => {
    const errors = [];
    const { username, password, email } = req.body
    if (!username || username.length < 6 || username.length > 20)
        errors.push('Invalid username');
    if (!password || password.length < 8 || password.length > 30)
        errors.push('Password must be at least 8 characters and more than 30 characters');
    if (!email || !_validator.isEmail(email))
        errors.push('Invalid email address');
    if (errors.length) {
        res.status(400).json({
            errors: errors
        })
        return
    }
    next();
}

router.post('/', validateData, async function (req, res) {
    const { username, password, email } = req.body
    const hash = await encPassword(password)
    const user = new UserModel({
        username,
        password: hash,
        email
    });
    try {
        const saveStatus = await user.save();
        if (!!saveStatus._id) {
            response(res, 200, "Account created successfully")
            return;
        }
    }
    catch (err) {
        response(res, 400, [mongooseError(err).errorMessage], false)
        return
    }
})

module.exports = router;