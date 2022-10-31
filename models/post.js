module.exports = (sequelize, DataTypes) => {
    const Posts = sequelize.define('Posts', 
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      user_id: {
        type: DataTypes.INTEGER
      },
      title: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING,
      },
      create_time: DataTypes.DATE,
    },
    {  
      createdAt:false,
      updatedAt:false,
      timestamps: true, 
      create_time: 'create_time', 
      // schema: 'db_quikdev', 
      tableName: 'post'
    })

    return Posts;
  };