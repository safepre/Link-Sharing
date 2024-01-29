const router = require('express').Router()
const { User } = require('../models')
const bcrypt = require('bcrypt')

router.post('/', async (req, res) => {
  try {
    const { email_address, password, confirmPassword } = req.body

    // Check if password and confirmPassword match
    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' })
    }

    // Check if password meets the minimum length requirement
    if (password.length < 8) {
      return res
        .status(400)
        .json({ error: 'Password must be at least 8 characters long' })
    }

    // Hash the password
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    // Create the user
    const user = await User.create({ email_address, passwordHash })

    res.json(user)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

module.exports = router
