module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define('User', {
    // The email cannot be null, and must be a proper email before creation
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true
    },
    emergencyPersonName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    emergencyContact: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    // The password cannot be null
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    longtitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isFloat: true
      }
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isFloat: true
      }
    }
  })
  return User
}
