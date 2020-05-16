module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define('User', {
    // The email cannot be null, and must be a proper email before creation
    email: {
      type: DataTypes.STRING
    },
    // The password cannot be null
    password: {
      type: DataTypes.STRING
    }
  })
  return User
}
