module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define('Users', 
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: true
        // defaultValue: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING,
      },
      password:{
        type: DataTypes.STRING
      },
      create_time: DataTypes.DATE,
    },
    {  
      id:false,
      createdAt:false,
      updatedAt:false,
      timestamps: true, 
      create_time: 'create_time', 
      // schema: 'db_quikdev', 
      tableName: 'user'
    })

    return Users;
  };