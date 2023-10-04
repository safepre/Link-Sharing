const Link = require('./link')
const User = require('./user')

User.hasMany(Link)
Link.belongsTo(User)
Link.sync({ alter: true })
User.sync({ alter: true })

module.exports = {
  Link,
  User,
}
