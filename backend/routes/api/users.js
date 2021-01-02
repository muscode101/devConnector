const User = require('../../model/User')
const bcrypt = require('bcryptjs')
const gravatar = require('gravatar')
const express = require('express')
const config = require('config')
const jwt = require('jsonwebtoken')
const router = express.Router()
const {check, validationResult} = require('express-validator')

router.post('/',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Please include valid email').isEmail(),
        check('password', 'Password must have at least 6 characters').isLength({min: 6}),
    ]
    , async (req, res) => {

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            await res.status(400).json({errors: errors.array()})
        } else {
            const {name, email, password} = req.body

            try {
                let user = await User.findOne({email})
                if (user) return await res.status(400).json({errors: [{msg: `User already exists \n ${user}`}]})

                const avatar = gravatar.url(email, {s: '200', r: 'pg', d: 'mm'})
                user = User({name, email, password, avatar})
                const salt = await bcrypt.genSalt(10)
                user.password = await bcrypt.hash(password, salt)
                await user.save()

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

module.exports = router