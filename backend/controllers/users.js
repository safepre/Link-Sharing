const router = require('express').Router()
const { User } = require('../models')

router.get('/', async (req, res) => {
  const users = await User.findAll({
    attributes: { exclude: ['passwordHash'] },
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

router.put('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id)
  if (user) {
    user.email_address = req.body.email_address
    await user.save()
    res.json(user)
  } else {
    res.status(404).end()
  }
})

module.exports = router
