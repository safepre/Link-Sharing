const express = require('express')
const cors = require('cors')

const app = express()

const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db')

const linksRouter = require('./controllers/links')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const imageRouter = require('./controllers/images')

app.use(cors())
app.use(express.json())

app.use('/api/links', linksRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use('/api/images', imageRouter)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()
