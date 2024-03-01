const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('links', {
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
              'GitHub',
              'FrontendMentor',
              'X',
              'LinkedIn',
              'YouTube',
              'Facebook',
              'Twitch',
              'Devto',
              'Codewars',
              'CodePen',
              'freeCodeCamp',
              'LeetCode',
              'GitLab',
              'Hashnode',
              'StackOverflow',
              'KhanAcademy',
              'Replit',
            ],
          ],
          notEmpty: true,
        },
      },
      date: {
        type: DataTypes.DATE,
      },
    })
    await queryInterface.createTable('profiles', {
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
        unique: true,
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
    })
    await queryInterface.createTable('users', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      email_address: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      password_hash: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      disabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    })
    await queryInterface.createTable('images', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      image_data: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    })
    await queryInterface.addColumn('links', 'profile_id', {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'profiles', key: 'id' },
    })
    await queryInterface.addColumn('profiles', 'user_id', {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' },
    })
    await queryInterface.addColumn('images', 'profile_id', {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'profiles', key: 'id' },
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('links')
    await queryInterface.dropTable('users')
    await queryInterface.dropTable('profiles')
    await queryInterface.dropTable('images')
  },
}
