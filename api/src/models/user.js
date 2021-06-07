module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('Users', {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      category: DataTypes.CHAR(1)
    });
  
    return User;
  }