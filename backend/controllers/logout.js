const router = require('express').Router()
const {
  tokenExtractor,
  userExtractor,
  sessionExtractor,
} = require('../util/middleware')

router.post(
  '/',
  tokenExtractor,
  userExtractor,
  sessionExtractor,
  async (req, res) => {
    await req.session.destroy()

    res.status(204).end()
  }
)

module.exports = router
