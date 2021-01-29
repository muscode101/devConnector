const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const User = require('../../model/User')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')

router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        await res.json(user)
    } catch (e) {
        console.error(e)
        await res.status(500).json({msg: "server error"})
    }
})

router.post('/',
    [
        check('email', 'Please include valid email').isEmail(),
        check('password', 'Enter valid password').exists(),
    ]
    , async (req, res) => {

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            await res.status(400).json({errors: errors.array()})
        } else {
            const {email, password} = req.body

            try {
                let user = await User.findOne({email})
                if (!user)
                    return await res.status(400).json({errors: [{msg: `Invalid Credentials`}]})

                const isMatch = bcrypt.compare(password, user.password)

                if (!isMatch)
                     return await res.status(400).json({errors: [{msg: `Invalid Credentials`}]})


                const payload = {user: {id: user.id}}

                jwt.sign(
                    payload,
                    config.get('jwtSecret'),
                    {expiresIn: 360000},
                    (errors, token) => {
                        if (errors) throw errors
                        res.json({token})
                    }
                )

            } catch (e) {
                await res.status(500).json(e.message)
            }

        }

    })

module.exports = router;