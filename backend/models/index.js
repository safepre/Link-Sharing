const Link = require('./link')
const User = require('./user')
const Profile = require('./profile')
const Image = require('./image')

User.hasOne(Link)
Link.belongsTo(User)

User.hasOne(Profile)
Profile.belongsTo(User)

Profile.hasMany(Link)
Link.belongsTo(Profile)

Profile.hasOne(Image)
Image.belongsTo(Profile)

User.sync({ alter: true })
Link.sync({ alter: true })
Profile.sync({ alter: true })
Image.sync({ alter: true })

module.exports = {
  Link,
  User,
  Profile,
  Image,
}
