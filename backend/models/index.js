const Link = require('./link')
const User = require('./user')

User.hasMany(Link)
Link.belongsTo(User)
module.exports = {
  Link,
  User,
}
