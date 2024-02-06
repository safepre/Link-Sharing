const router = require('express').Router()
const { Link, Profile, User } = require('../models')
const { tokenExtractor, userExtractor } = require('../util/middleware')

router.get('/', async (req, res) => {
  const links = await Link.findAll({
    attributes: { exclude: ['profileId'] },
    include: [
      {
        model: Profile,
        attributes: ['first_name', 'last_name'],
      },
      {
        model: User,
        attributes: ['email_address'],
      },
    ],
  })
  res.json(links)
})

router.post('/', tokenExtractor, userExtractor, async (req, res) => {
  try {
    // Check if the link already exists for the user
    const existingLink = await Link.findOne({
      where: {
        userId: req.user.id,
        url: req.body.url,
        platform: req.body.platform,
      },
    })

    if (existingLink) {
      // Link already exists, handle accordingly (e.g., return an error response)
      return res.status(400).json({ error: 'Duplicate link' })
    }

    // Link doesn't exist, proceed with creating
    const link = await Link.create({
      ...req.body,
      profileId: req.profile.id,
      userId: req.user.id,
      date: new Date(),
    })

    res.json(link)
  } catch (error) {
    return res.status(400).json({ error: error.errors })
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

router.put(
  '/:id',
  tokenExtractor,
  userExtractor,
  linkFinder,
  async (req, res) => {
    try {
      if (req.link) {
        req.link.platform = req.body.platform
        req.link.url = req.body.url
        date: new Date()
        await req.link.save()
        res.status(200).json(req.link)
      } else {
        res.status(404).end()
      }
    } catch (error) {
      return res.status(400).json({ error })
    }
  }
)

router.delete(
  '/:id',
  tokenExtractor,
  userExtractor,
  linkFinder,
  async (req, res) => {
    if (!req.link) {
      res.status(404).json({ message: 'Already has been deleted' })
    }
    if (req.link.profileId === req.profile.id) {
      await req.link.destroy()
      res.status(200).json({ message: 'Deleted link successfully' })
    } else {
      // User Profile is not authorized
      res.status(401).json({ message: 'Unauthorized' })
    }
  }
)

module.exports = router
