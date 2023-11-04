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
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    description: {
      type: DataTypes.TEXT,
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
