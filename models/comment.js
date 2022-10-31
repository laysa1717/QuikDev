module.exports = (sequelize, DataTypes) => {
    const Comments = sequelize.define('Comments', 
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: true
      },
      id_user: {
        type: DataTypes.INTEGER
      },
      post_id: {
        type: DataTypes.INTEGER,
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
      tableName: 'comment'
    })

    return Comments;
  };