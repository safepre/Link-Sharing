const router = require('express').Router()
const { Link } = require('../models')
const { User } = require('../models')
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

const linkFinder = async (req, res, next) => {
  req.link = await Link.findByPk(req.params.id)
  next()
}

router.get('/:id', linkFinder, async (req, res) => {
  if (req.link) {
    res.json(req.link)
  } else {
    res.status(404).end()
  }
})

module.exports = router
