const express = require('express')
const User = require('../../model/User')
const request = require('request')
const config = require('config')
const Profile = require('../../model/Profile')
const Post = require('../../model/Post')
const auth = require('../../middleware/auth')
const {check, validationResult} = require('express-validator')
const router = express.Router()

router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne(
            {user: req.user.id}).populate('user', ['name', 'avatar'])
        if (!profile)
            return await res.status(400).json({msg: 'there is no profiles for this user'})
        else
            return await res.status(200).json(profile)
    } catch (e) {
        console.error(e)
        await res.status(500).json({msg: "server error"})
    }
})

router.post('/', [auth, [
        check('status', 'Status is required').not().isEmpty(),
        check('skills', 'Skills is required').not().isEmpty()]],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty())
            return res.status(400).json({msg: {errors: errors.array()}})
        const {
            status,
            company, website, bio,
            githubusername, skills, youtube,
            facebook, twitter, instagram,
            linkedin, location
        } = req.body

        const profileFields = {}
        profileFields.user = req.user.id;
        if (company) profileFields.company = company
        if (website) profileFields.website = website
        if (location) profileFields.location = location
        if (bio) profileFields.bio = bio
        if (status) profileFields.status = status
        if (githubusername) profileFields.githubusername = githubusername
        if (skills) profileFields.skills = skills.split(",").map(skill => skill.trim())
        profileFields.social = {}
        if (facebook) profileFields.social.facebook = facebook
        if (twitter) profileFields.social.twitter = twitter
        if (linkedin) profileFields.social.linkedin = linkedin
        if (instagram) profileFields.social.instagram = instagram
        if (youtube) profileFields.social.youtube = youtube

        try {
            let profile = await Profile.findOne({user: req.user.id})
            if (profile) {
                console.log("found profiles")
                profile = await Profile.findOneAndUpdate(
                    {user: req.user.id},
                    {$set: profileFields}, {new: true})

                return await res.status(200).json(profile)
            }
            profile = Profile(profileFields)
            await profile.save()
            await res.json(profile)
        } catch (e) {
            console.error(e)
            await res.status(500).json({msg: "server error"})
        }
    })

router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar'])
        await res.status(200).json(profiles)
    } catch (e) {
        console.error(e)
        await res.status(500).json({msg: "server error"})
    }
})

router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne(
            {user: req.params.user_id}).populate('user', ['name', 'avatar'])
        if (!profile) return await res.status(400).json({msg: 'there is no profiles for this user'})

        await res.status(200).json(profile)
    } catch (e) {
        console.error(e)
        if (e.kind === 'ObjectId') return await res.status(400).json({msg: 'there is no profiles for this user'})

        await res.status(500).json({msg: "server error"})
    }
})

router.delete('/', auth, async (req, res) => {
    try {

        await Post.deleteMany({user:req.user.id})
        await Profile.findOneAndDelete({user: req.user.id})
        await User.findOneAndDelete({_id: req.user.id})

        await res.status(200).json({msg: "profiles deleted"})
    } catch (e) {
        console.error(e)
        await res.status(500).json({msg: "server error"})
    }
})

router.put('/experience', [auth,
    [
        check('title', 'Title is required').not().isEmpty(),
        check('company', 'Company is required').not().isEmpty(),
        check('from', 'From date is required').not().isEmpty(),
    ]
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty())
        return res.status(400).json({msg: {errors: errors.array()}})
    const {
        title, company,
        from, to, current,
        location, description
    } = req.body
    const newExperience = {
        title, company,
        from, to, current,
        location, description
    }
    try {
        const profile = await Profile.findOne({user: req.user.id})
        await profile.experience.unshift(newExperience)
        await profile.save()
        await res.json(profile)
    } catch (e) {
        console.error(e)
        await res.status(500).json({msg: "server error"})
    }
})

router.delete('/experience/:exp_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({user: req.user.id})
        const removeIndex =
            profile.experience.map(item => item.id).indexOf(req.params.exp_id)

        profile.experience.splice(removeIndex, 1)
        await profile.save()
        await res.status(200).json(profile)
    } catch (e) {
        console.error(e)
        await res.status(500).json({msg: "server error"})
    }
})

router.put('/education', [auth,
    [
        check('school', 'School is required').not().isEmpty(),
        check('fieldofstudy', 'Field is required').not().isEmpty(),
        check('degree', 'Degree is required').not().isEmpty(),
        check('from', 'From is required').not().isEmpty(),
    ]
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty())
        return res.status(400).json({msg: {errors: errors.array()}})
    const {
        school, degree, fieldofstudy,
        from, to, current,
        description
    } = req.body
    const newEdu = {
        school, degree, fieldofstudy,
        from, to, current,
        description
    }
    try {
        const profile = await Profile.findOne({user: req.user.id})
        await profile.education.unshift(newEdu)
        await profile.save()
        await res.json(profile)
    } catch (e) {
        console.error(e)
        await res.status(500).json({msg: "server error"})
    }
})

router. delete('/education/:edu_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({user: req.user.id})
        const removeIndex =
            profile.education.map(item => item.id).indexOf(req.params.edu_id)
        profile.education.splice(removeIndex, 1)
        await profile.save()
        await res.status(200).json(profile)
    } catch (e) {
        console.error(e)
        await res.status(500).json({msg: "server error"})
    }
})

router.get('/github/:username', (req, res) => {
        try {
            const option = {
                uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.get('githubClientId')}&client_secret=${config.get('githubClientSecret')}`,
                method: 'GET',
                headers: {'user-agent': 'node.js'}
            }

            request(option, (error, response, body) => {
                if (error) console.log(error)

                if (response.statusCode !== 200) {
                    res.status(404).json({msg: 'No github profiles found'})
                    return
                }

                res.json(JSON.parse(body))
            })
        } catch (e) {
            console.error(e)
            res.status(500).json({msg: "server error"})
        }
    }
)

module.exports = router;