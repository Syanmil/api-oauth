'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    token: DataTypes.STRING,
    username: DataTypes.STRING,
    displayName: DataTypes.STRING,
    twitterid: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return User;
};
