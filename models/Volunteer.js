module.exports = function (sequelize, DataTypes) {
  const Volunteer = sequelize.define('Volunteer', {
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
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING
    },
    // The password cannot be null
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    longitude: {
      type: DataTypes.FLOAT,
      defaultValue: null

    },
    latitude: {
      type: DataTypes.FLOAT,
      defaultValue: null
    }
  })
  return Volunteer
}
