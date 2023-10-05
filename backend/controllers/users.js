const router = require('express').Router()
const { Link, User } = require('../models')

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Link,
    },
  })
  res.json(users)
})

router.post('/', async (req, res) => {
  try {
    const user = await User.findOne()
    const link = await Link.create({ ...req.body, userId: user.id })
    res.json(link)
  } catch (error) {
    return res.status(400).json({ error })
  }
})

router.get('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id)
  if (user) {
    res.json(user)
  } else {
    res.status(404).end()
  }
})

module.exports = router
