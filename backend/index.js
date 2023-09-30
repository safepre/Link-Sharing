const express = require('express')
const { PORT } = require('./util/config')
const app = express()
const { connectToDatabase } = require('./util/db')
const linksRouter = require('./controllers/links')

app.use(express.json())

app.use('/api/links', linksRouter)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()
