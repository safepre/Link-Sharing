const router = require('express').Router()
const { Profile, User, Link, Image } = require('../models')
const { tokenExtractor, userExtractor } = require('../util/middleware')

router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.findAll({
      include: [
        {
          model: User,
          attributes: ['email_address'],
        },
        {
          model: Link,
          attributes: { exclude: ['id', 'profileId'] }, // Exclude 'id' and 'profileId' fields
        },
        {
          model: Image,
          attributes: { exclude: ['id', 'profileId'] }, // Exclude 'id' and 'profileId' fields
        },
      ],
    })
    res.status(200).json(profiles)
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving profiles' })
  }
})

const profileFinder = async (req, res, next) => {
  try {
    req.profile = await Profile.findOne({
      where: { id: req.params.userId },
      include: [
        {
          model: User,
          attributes: ['email_address'],
        },
        {
          model: Link,
          attributes: { exclude: ['id', 'profileId'] }, // Exclude 'id' and 'profileId' fields
        },
        {
          model: Image,
          attributes: { exclude: ['id', 'profileId'] }, // Exclude 'id' and 'profileId' fields
        },
      ],
    })
    next()
  } catch (error) {
    res.status(500).json({ error: 'Error finding profile' })
  }
}

router.get('/:userId', profileFinder, async (req, res) => {
  if (req.profile) {
    res.json(req.profile)
  } else {
    res.status(404).end()
  }
})
router.post('/', tokenExtractor, userExtractor, async (req, res) => {
  try {
    const profile_payload = await Profile.create({
      ...req.body,
      userId: req.user.id,
      created_at: new Date(),
      updated_at: new Date(),
    })
    res.status(201).json(profile_payload)
  } catch (error) {
    res.status(500).json({ error: 'Invalid input' })
  }
})

router.put('/:id', tokenExtractor, userExtractor, async (req, res) => {
  try {
    const profile = await Profile.findByPk(req.params.id)
    if (profile) {
      ;(profile.first_name = req.body.first_name),
        (profile.last_name = req.body.last_name),
        (profile.preview_link = req.body.preview_link),
        (profile.email = req.body.email),
        (profile.updated_at = new Date()),
        await profile.save()
      res.status(200).json(profile)
    } else {
      res.status(404).end()
    }
  } catch (error) {
    res.status(500).json({ error: 'Invalid Input' })
  }
})

module.exports = router
