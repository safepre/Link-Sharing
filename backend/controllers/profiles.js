const router = require('express').Router()
const { Profile, User } = require('../models')
const { tokenExtractor, userExtractor } = require('../util/middleware')

router.get('/:id', async (req, res) => {
  try {
    const profiles = await Profile.findAll({
      attributes: { exclude: ['userId', 'imageId'] },
      include: {
        model: User,
        attributes: ['email_address'],
      },
    })
    res.status(200).json(profiles)
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving images' })
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
        (profile.email = req.body.email),
        (profile.updated_at = new Date()),
        await profile.save()
      res.status(200).json(profile)
    } else {
      res.status(404).end()
    }
  } catch (error) {
    res.status(500).json({ error: 'Invalid' })
  }
})

module.exports = router
