module.exports = (sequelize, DataTypes) => {
    const Class = sequelize.define('Class', {
        classId: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        video: {
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
        moduleId: {
            allowNull: false,
            type: DataTypes.INTEGER,
            references: {
                key: "moduleId",
                model: "Class",
            },
        },
        companyId: {
            allowNull: false,
            type: DataTypes.INTEGER,
            references: {
                key: "companyId",
                model: "Company",
            },
        },
    }, { freezeTableName: true });

    Class.associate = (models) => {
        Class.belongsTo(models.Company, { foreignKey: 'companyId' })
        Class.belongsTo(models.Course, { foreignKey: 'courseId' })
    }

    return Class;
}