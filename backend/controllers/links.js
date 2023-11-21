const router = require('express').Router()
const { Link, User } = require('../models')
const {
  tokenExtractor,
  userExtractor,
  sessionExtractor,
} = require('../util/middleware')

router.get('/', async (req, res) => {
  const links = await Link.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name'],
    },
  })
  res.json(links)
})

router.post(
  '/',
  tokenExtractor,
  userExtractor,
  sessionExtractor,
  async (req, res) => {
    try {
      const link = await Link.create({
        ...req.body,
        userId: req.user.id,
        date: new Date(),
      })
      res.json(link)
    } catch (error) {
      return res.status(400).json({ error })
    }
  }
)
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

router.delete(
  '/:id',
  tokenExtractor,
  userExtractor,
  linkFinder,
  sessionExtractor,
  async (req, res) => {
    if (!req.link) {
      res.status(404).json({ message: 'Already has been deleted' })
    }
    if (req.link.userId === req.user.id) {
      await req.link.destroy()
      res.status(200).json({ message: 'Deleted link successfully' })
    } else {
      // User is not authorized
      res.status(401).json({ message: 'Unauthorized' })
    }
  }
)

module.exports = router
