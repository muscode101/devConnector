const express = require('express')
const User = require('../../model/User')
const Post = require('../../model/Post')
const auth = require('../../middleware/auth')
const {check, validationResult} = require('express-validator')
const router = express.Router()

router.post('/',
    [auth, check('text', 'Text is required').not().isEmpty()]
    , async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) return res.status(400).json({errors: errors.array()})
        try {

            const user = await User.findById(req.user.id).select('-password')
            const newPost = new Post({
                text: req.body.text,
                name: user.name,
                avatar: user.avatar,
                user: req.user.id,
            })

            const post = await newPost.save()
            await res.json(post)
        } catch (e) {
            console.error(e)
            await res.status(500).json({msg: "server error"})
        }
    })

router.get('/', auth, async (req, res) => {
    try {
        const posts = await Post.find().sort({date: -1})
        await res.json(posts)
    } catch (e) {
        console.error(e)
        await res.status(500).json({msg: "server error"})
    }
})

router.get('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) return res.status(404).json({msg: 'Post not found'})
        await res.json(post)
    } catch (e) {
        console.error(e)
        if (e.kind === 'ObjectId') return res.status(404).json({msg: 'Post not found'})
        await res.status(500).json({msg: "server error"})
    }
})

router.delete('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)

        if (!post) return res.status(404).json({msg: 'Post not found'})

        if (post.user.toString() !== req.user.id)
            return res.status(401).json({msg: 'User not authorised'})

        await post.remove()
        await res.json({msg: 'Post removed'})
    } catch (e) {
        console.error(e)
        if (e.kind === 'ObjectId') return res.status(404).json({msg: 'Post not found'})
        await res.status(500).json({msg: "server error"})
    }
})


router.put('/like/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)

        if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0)
            return res.status(400).json({msg: 'Post already liked'})

        post.likes.unshift({user: req.user.id})
        await post.save()
        await res.json(post.likes)
    } catch (e) {
        console.error(e)
        if (e.kind === 'ObjectId') return res.status(404).json({msg: 'Post not found'})
        await res.status(500).json({msg: "server error"})
    }
})

router.put('/unlike/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)

        if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0)
            return res.status(400).json({msg: 'Post not yet liked'})

        const removeIndex = post.likes.map(like => like.user).indexOf(req.user.id)
        post.likes.splice(removeIndex, 1)
        await post.save()
        await res.json(post.likes)
    } catch (e) {
        console.error(e)
        if (e.kind === 'ObjectId') return res.status(404).json({msg: 'Post not found'})
        await res.status(500).json({msg: "server error"})
    }
})

router.post('/comment/:id',
    [auth, check('text', 'Text is required').not().isEmpty()]
    , async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) return res.status(400).json({errors: errors.array()})

        try {

            const user = await User.findById(req.user.id).select('-password')
            const post = await Post.findById(req.params.id)

            const newComment = {
                text: req.body.text,
                name: user.name,
                avatar: user.avatar,
                user: req.user.id,
            }
            post.comments.unshift(newComment)
            post.save()

            // const post = await newPost.save()
            await res.json(post.comments)
        } catch (e) {
            console.error(e)
            await res.status(500).json({msg: "server error"})
        }
    })

router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        const comment = post.comments
            .find(comment => comment.id === req.params.comment_id)

        if (!comment)
            return res.status(404).json({msg: "Comment does not exist"})
        if (comment.user.toString() !== req.user.id)
            return res.status(401).json({msg: "User not authorised"})

        const removeIndex = post.comments.map(comment => comment.user).indexOf(req.user.id)
        post.comments.splice(removeIndex, 1)
        await post.save()
        await res.json(post.comments)
    } catch (e) {
        console.error(e)
        await res.status(500).json({msg: "server error"})
    }
})


module.exports = router;