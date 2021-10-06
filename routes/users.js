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

// follow a user

// unfollow a user

module.exports = router
