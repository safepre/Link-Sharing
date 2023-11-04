const Link = require('./link')
const User = require('./user')
const Image = require('./image')

User.hasMany(Link)
Link.belongsTo(User)

User.hasOne(Image)
Image.belongsTo(User)

module.exports = {
  Link,
  User,
  Image,
}
