module.exports = (sequelize, DataTypes) => {
    const CategoryCourse = sequelize.define('CategoryCourse', {
        categoryCourseID: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        courseId: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        categoryId: {
            allowNull: false,
            type: DataTypes.INTEGER,
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
    
    CategoryCourse.associate = (models)=>{
        CategoryCourse.belongsTo(models.Company, { foreignKey: 'companyId' })
    }

    return CategoryCourse;
}