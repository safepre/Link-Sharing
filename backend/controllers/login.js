const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const router = require('express').Router()
const { SECRET } = require('../util/config')
const { User } = require('../models')

router.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findOne({
    where: {
      email_address: body.email_address,
    },
  })

  const passwordCorrect =
    user === null
      ? false
      : await bcrypt.compare(body.password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid email or password',
    })
  }

  const userForToken = {
    emailaddress: user.email_address,
    id: user.id,
  }

  const token = jwt.sign(userForToken, SECRET)

  response.status(200).send({ token, email_address: user.email_address })
})

module.exports = router
