const router = require('express').Router()
const { Image } = require('../models')
const { tokenExtractor, userExtractor } = require('../util/middleware')
const upload = require('../util/multer')

router.get('/:id', tokenExtractor, userExtractor, async (req, res) => {
  try {
    const userId = req.params.id
    const images = await Image.findAll({
      exclude: { userId },
      where: { userId },
    })
    res.status(200).json(images)
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving images' })
  }
})

router.post(
  '/upload',
  tokenExtractor,
  userExtractor,
  upload.single('image'),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' })
      }
      const image = await Image.create({
        ...req.body,
        userId: req.user.id,
        file_name: req.file.originalname,
        content_type: req.file.mimetype,
        image_data: req.file.buffer,
        file_size: req.file.size,
        created_at: new Date(),
        updated_at: new Date(),
      })
      res.status(201).json(image)
    } catch (error) {
      res.status(500).json({ error: 'Error uploading the image' })
    }
  }
)

router.put(
  '/:id',
  tokenExtractor,
  userExtractor,
  upload.single('image'),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' })
      }

      const imageId = req.params.id // Assuming you're getting the image ID from the URL
      const existingImage = await Image.findByPk(imageId) // Fetch the existing image by ID

      if (!existingImage) {
        return res.status(404).json({ error: 'Image not found' })
      }

      existingImage.file_name = req.file.originalname
      existingImage.content_type = req.file.mimetype
      existingImage.image_data = req.file.buffer // Corrected 'image_data' property
      existingImage.file_size = req.file.size
      existingImage.updated_at = new Date()

      await existingImage.save()
      res.status(200).json(existingImage)
    } catch (error) {
      res.status(500).json({ error: 'Error updating the image' })
    }
  }
)
module.exports = router
