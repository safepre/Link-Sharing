const router = require('express').Router()
const { Link } = require('../models')

router.get('/', async (req, res) => {
  const links = await Link.findAll()
  res.json(links)
})

router.post('/', async (req, res) => {
  try {
    const link = await Link.create(req.body)
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

router.delete('/:id', linkFinder, async (req, res) => {
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
})

module.exports = router
