const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../util/db')

class Link extends Model {}
Link.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        isUrl: true,
        notEmpty: true,
      },
    },
    platform: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        isIn: [
          [
            'Github',
            'Frontend Mentor',
            'X',
            'Linkedin',
            'Youtube',
            'Facebook',
            'Twitch',
            'Dev.to',
            'Codewars',
            'Codepen',
            'freeCodeCamp',
            'LeetCode',
            'GitLab',
            'Hashnode',
            'Stack Overflow',
            'Khan Academy',
            'Replit',
          ],
        ],
        notEmpty: true,
      },
    },
    date: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'link',
  }
)

module.exports = Link
