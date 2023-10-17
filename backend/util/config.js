require('dotenv').config()
const POSTGRES_URL = process.env.NODE_ENV === 'test' ? process.env.TEST_DATABASE_URL : process.env.DATABASE_URL
module.exports = {
  POSTGRES_URL,
  PORT: process.env.PORT || 3001,
  SECRET: 'secret',
}
