const express = require('express')
const cors = require('cors')

const app = express()

const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db')

const linksRouter = require('./controllers/links')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const profileRouter = require('./controllers/profiles')
const signupRouter = require('./controllers/signup')
const imageRouter = require('./controllers/images')
const documentation = require('./controllers/documentation')
app.use(cors())
app.use(express.static('dist'))
app.use(express.json())

app.use('/documentation', documentation)
app.use('/api/links', linksRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/signup', signupRouter)
app.use('/api/profiles', profileRouter)
app.use('/api/images', imageRouter)
const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()
