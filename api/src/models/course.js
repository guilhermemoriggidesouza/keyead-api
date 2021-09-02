module.exports = (sequelize, DataTypes) => {
    const Course = sequelize.define('Course', {
        courseId: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        photo: {
            allowNull: true,
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
        active: {
            allowNull: false,
            type: DataTypes.BOOLEAN,
        },
        certificated: {
            allowNull: true,
            type: DataTypes.BOOLEAN,
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE,
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE,
        },
        companyId: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
    }, { freezeTableName: true});
    
    Course.associate = (models)=>{
        Course.belongsTo(models.Company, { foreignKey: 'companyId' })
        Course.belongsToMany(models.Category, { through: "CategoryCourse", foreignKey: "courseId" })
        Course.belongsToMany(models.User, { through: 'UserCourse', foreignKey: "courseId" })
        Course.hasMany(models.Module, { foreignKey: "courseId" })
    }

    return Course;
}