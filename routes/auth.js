const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')

// SIGNUP
router.post('/signup', async (req, res) => {
  try {
    //   hashing password
    const salt = await bcrypt.genSalt(10)
    const hashedPsw = await bcrypt.hash(req.body.password, salt)

    // create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPsw,
    })

    // return new user
    const user = await newUser.save()
    res.status(200).json(user)
  } catch (err) {
    res.status(500).json(err)
  }
})

// LOGIN
router.post('/login', async (req, res) => {
  try {
    //   find user by email
    const user = await User.findOne({
      email: req.body.email,
    })
    !user && res.status(404).json('user not found')

    // compare the passwords
    const validPsw = await bcrypt.compare(req.body.password, user.password)
    !validPsw && res.status(400).json('wrong password')

    // return user
    res.status(200).json(user)
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
