const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')

// update user
router.put('/:id', async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    //   if changing password
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10)
        req.body.password = await bcrypt.hash(req.body.password, salt)
      } catch (err) {
        return res.status(500).json(err)
      }
    }

    // update anything else
    try {
      const user = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true },
      )
      res.status(200).json('Acc has been updated')
    } catch (err) {
      return res.status(500).json(err)
    }
  } else {
    return res.status(403).json('You can update only your acc!')
  }
})

// delete user
router.delete('/:id', async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    // update anything else
    try {
      const user = await User.deleteOne({ _id: req.params.id })
      res.status(200).json('Acc has been deleted')
    } catch (err) {
      return res.status(500).json(err)
    }
  } else {
    return res.status(403).json('You can delete only your acc!')
  }
})

// get a user
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    const { password, updatedAt, ...other } = user._doc
    res.status(200).json(other)
  } catch (err) {
    return res.status(500).json(err)
  }
})

// follow a user
router.put('/:id/follow', async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id)
      const currentUser = await User.findById(req.body.userId)
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } })
        await currentUser.updateOne({ $push: { following: req.params.id } })
        res.status(200).json('Success!')
      } else {
        res.status(403).json('You already following this person')
      }
    } catch (err) {
      return res.status(500).json(err)
    }
  } else {
    res.status(403).json('You cannot follow yourself')
  }
})

// unfollow a user
router.put('/:id/unfollow', async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id)
      const currentUser = await User.findById(req.body.userId)
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } })
        await currentUser.updateOne({ $pull: { following: req.params.id } })
        res.status(200).json('Success!')
      } else {
        res.status(403).json('You already unfollowed this person')
      }
    } catch (err) {
      return res.status(500).json(err)
    }
  } else {
    res.status(403).json('You cannot unfollow yourself')
  }
})
module.exports = router
