const router = require('express').Router()
const { tokenExtractor, userExtractor } = require('../util/middleware')
const upload = require('../util/multer')

router.post(
  '/upload/',
  tokenExtractor,
  userExtractor,
  upload.single('image'),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' })
      }

      const profile_payload = {
        file_name: req.file.originalname,
        content_type: req.file.mimetype,
        image_data: req.file.buffer,
        file_size: req.file.size,
        created_at: new Date(),
        updated_at: new Date(),
      }

      res.status(201).json(profile_payload)
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Error uploading the profile' })
    }
  }
)

router.put(
  '/upload/',
  tokenExtractor,
  userExtractor,
  upload.single('image'),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' })
      }

      const profile_payload = {
        file_name: req.file.originalname,
        content_type: req.file.mimetype,
        image_data: req.file.buffer,
        file_size: req.file.size,
        updated_at: new Date(),
      }

      res.status(200).json(profile_payload)
    } catch (error) {
      res.status(500).json({ error: 'Error updating the image' })
    }
  }
)

module.exports = router
