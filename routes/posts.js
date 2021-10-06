const router = require('express').Router()
const Post = require('../models/Post')

// create a post
router.post('/', async (req, res) => {
  const newPost = new Post(req.body)
  try {
    const savedPost = await newPost.save()
    res.status(200).json(savedPost)
  } catch (err) {
    res.status(500).json(err)
  }
})
// update a post
// delete a post
// like a post
// get a post
// get timeline posts

module.exports = router
