const jwt = require('jsonwebtoken')
const { SECRET } = require('./config')
const { User, Profile } = require('../models')

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.token = authorization.replace('bearer ', '')
    } catch {
      return res.status(401).json({ error: 'token invalid' })
    }
  } else {
    return res.status(401).json({ error: 'token missing' })
  }
  next()
}
const userExtractor = async (req, res, next) => {
  const decodedToken = jwt.verify(req.token, SECRET)

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  } else {
    req.user = await User.findByPk(decodedToken.id)
    req.profile = await Profile.findByPk(decodedToken.id) //D ecided to add this for our ../controllers/links
  }
  next()
}

module.exports = {
  tokenExtractor,
  userExtractor,
}
