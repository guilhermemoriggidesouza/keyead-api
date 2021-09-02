module.exports = (sequelize, DataTypes) => {
    const Module = sequelize.define('Module', {
        moduleId: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        description: {
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
        duration: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        courseId: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        companyId: {
          allowNull: false,
          type: DataTypes.INTEGER,
        },
    }, { freezeTableName: true});
    
    Module.associate = (models)=>{
        Module.belongsTo(models.Company, { foreignKey: 'companyId' })
        Module.belongsTo(models.Course, { foreignKey: 'courseId' })
    }

    return Module;
}