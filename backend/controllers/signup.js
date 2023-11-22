const router = require('express').Router()
const { User } = require('../models')
const bcrypt = require('bcrypt')

router.post('/', async (req, res) => {
  const { name, username, password } = req.body
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)
  const user = await User.create({ name, username, passwordHash })
  res.json(user)
})


module.exports = router
