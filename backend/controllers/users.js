const router = require('express').Router()
const { Link, User } = require('../models')
const bcrypt = require('bcrypt')

router.get('/', async (req, res) => {
  const users = await User.findAll({
    attributes: { exclude: ['passwordHash', 'userId'] },
    include: {
      model: Link,
    },
  })
  res.json(users)
})

router.post('/', async (req, res) => {
  const { name, username, password } = req.body
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)
  const user = await User.create({ name, username, passwordHash })
  res.json(user)
})

router.get('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id, {
    attributes: {
      exclude: ['passwordHash'],
    },
  })

  if (user) {
    res.json(user)
  } else {
    res.status(404).end()
  }
})

router.put('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id)
  if (user) {
    user.username = req.body.username
    await user.save()
    res.json(user)
  } else {
    res.status(404).end()
  }
})

module.exports = router
