
module.exports = function(sequelize, DataTypes) {
    
  var Burgers = sequelize.define("Burgers", {

    // id: an auto incrementing int that serves as the primary key.
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },

    // burger_name: a string.
    burger_name: {
      type: DataTypes.STRING,
      allowNull: false
    }, 

    // devoured: a boolean.
    devoured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });
  
  return Burgers;
};
