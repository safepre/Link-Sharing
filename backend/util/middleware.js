const jwt = require('jsonwebtoken')
const { SECRET } = require('./config')
const { User, Session } = require('../models')
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
    if (req.user.disabled) {
      req.user = null
      return res.status(401).json({ error: 'User is disabled' })
    }
  }
  next()
}

const sessionExtractor = async (req, res, next) => {
  const activeSession = await Session.findOne({
    where: {
      userId: req.user.id,
    },
  })

  if (!activeSession) {
    return res
      .status(401)
      .json({ error: 'No active sessions found. Please log in again.' })
  } else {
    req.session = activeSession
  }

  next()
}
module.exports = {
  tokenExtractor,
  userExtractor,
  sessionExtractor,
}
