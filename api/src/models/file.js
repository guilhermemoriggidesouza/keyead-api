module.exports = (sequelize, DataTypes) => {
    const File_ = sequelize.define('File', {
        fileId: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.STRING,
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        description: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        size: {
            allowNull: true,
            type: DataTypes.STRING,
        },
        type:{
            allowNull: false,
            type: DataTypes.STRING,
        },
        createdAt: {
          allowNull: false,
          type: DataTypes.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: DataTypes.DATE,
        },
        userId: {
            allowNull: true,
            type: DataTypes.INTEGER,
        },
        companyId: {
          allowNull: false,
          type: DataTypes.INTEGER,
        },
    }, { freezeTableName: true});
    
    File_.associate = (models)=>{
        File_.belongsTo(models.Company, { foreignKey: 'companyId' })
        File_.belongsTo(models.User, { foreignKey: "userId" })
        File_.belongsTo(models.Course, { foreignKey: "fileId" })
    }

    return File_;
  }