const router = require('express').Router()
const { Link, User } = require('../models')

router.get('/', async (req, res) => {
  const users = await User.findAll({
    attributes: { exclude: ['passwordHash', 'userId'] },
    include: {
      model: Link,
    },
  })
  res.json(users)
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

module.exports = router
