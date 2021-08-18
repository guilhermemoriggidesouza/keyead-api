module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
        categoryId: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        description: {
            allowNull: true,
            type: DataTypes.STRING,
        },
        active: {
            allowNull: false,
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
    
    Category.associate = (models)=>{
        Category.belongsTo(models.Company, { foreignKey: 'companyId' })
        Category.belongsToMany(models.Course, { through: 'CategoryCourse', foreignKey: "categoryId" })
    }

    return Category;
}