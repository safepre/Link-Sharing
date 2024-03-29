const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../util/db')

class Profile extends Model {}
Profile.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^[A-Z][a-z]+$/,
        min: 3,
        max: 23,
      },
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^[A-Z][a-z]+$/,
        min: 3,
        max: 23,
      },
    },
    preview_link: {
      type: DataTypes.STRING,
      validate: {
        min: 8,
        max: 15,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    created_at: {
      type: DataTypes.DATE,
    },
    updated_at: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'profile',
  }
)

module.exports = Profile
