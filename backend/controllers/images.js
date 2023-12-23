const router = require('express').Router()
const { Image } = require('../models')
const { tokenExtractor, userExtractor } = require('../util/middleware')
const upload = require('../util/multer')

router.post(
  '/upload/:profileId',
  tokenExtractor,
  userExtractor,
  upload.single('image'),
  async (req, res) => {
    try {
      const profileId = req.params.profileId

      const image_payload = {
        image_data: req.file.buffer.toString('base64'),
        profileId: profileId, // Use the retrieved profileId as the foreign key
      }

      // Create the image entry in the database
      const createdImage = await Image.create(image_payload)

      const imageId = createdImage.id

      res.status(201).json({ imageId })
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Error uploading the image' })
    }
  }
)

router.put(
  '/upload/:profileId',
  tokenExtractor,
  userExtractor,
  upload.single('image'),
  async (req, res) => {
    try {
      const profileId = req.params.profileId

      const existingImage = await Image.findOne({ where: { profileId } })

      if (existingImage) {
        // If an image exists, update the existing image
        const image_payload = {
          image_data: req.file.buffer.toString('base64'),
        }

        await Image.update(image_payload, { where: { profileId } })

        res.status(200).json(image_payload)
      } else {
        // If no image exists, create a new image
        const image_payload = {
          image_data: req.file.buffer.toString('base64'),
          profileId: profileId,
        }

        // Create the image entry in the database
        const createdImage = await Image.create(image_payload)

        res.status(201).json(createdImage)
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Error updating the image' })
    }
  }
)

module.exports = router
