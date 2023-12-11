const Link = require('./link')
const User = require('./user')
const Profile = require('./profile')

User.hasOne(Profile)
Profile.belongsTo(User)

Profile.hasMany(Link)
Link.belongsTo(Profile)

User.sync({ alter: true })
Link.sync({ alter: true })
Profile.sync({ alter: true })

module.exports = {
  Link,
  User,
  Profile,
}
