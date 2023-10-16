const Link = require('./link')
const User = require('./user')
const Image = require('./image')

User.hasMany(Link)
Link.belongsTo(User)

User.hasOne(Image)
Image.belongsTo(User)
Link.sync({ alter: true })
User.sync({ alter: true })
Image.sync({ alter: true })
module.exports = {
  Link,
  User,
  Image,
}
