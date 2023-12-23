const Link = require('./link')
const User = require('./user')
const Profile = require('./profile')
const Image = require('./image')
User.hasOne(Profile)
Profile.belongsTo(User)

Profile.hasMany(Link)
Link.belongsTo(Profile)

Profile.hasOne(Image)
Image.belongsTo(Profile)

module.exports = {
  Link,
  User,
  Profile,
  Image,
}
