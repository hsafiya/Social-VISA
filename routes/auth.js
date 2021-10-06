const router = require('express').Router()
const User = require('../models/User')

// signup
router.get('/signup', async (req, res) => {
  const user = await new User({
    username: 'user',
    email: 'test@test.com',
    password: '123456',
  })

  await user.save()
  res.json('ok')
})

module.exports = router
