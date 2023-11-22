const Link = require('./link')
const User = require('./user')
const Image = require('./image')
const Session = require('./session')

User.hasMany(Link)
Link.belongsTo(User)

User.hasOne(Image)
Image.belongsTo(User)

User.hasOne(Session)
Session.belongsTo(User)

module.exports = {
  Link,
  User,
  Image,
  Session,
}
