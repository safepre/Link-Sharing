const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../util/db')

class Image extends Model {}
Image.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    image_data: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'image',
  }
)

module.exports = Image
