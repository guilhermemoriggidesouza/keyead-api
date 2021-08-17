module.exports = (sequelize, DataTypes) => {
    const UserCourse = sequelize.define('UserCourse', {
        userCourseId: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        registrationDate: {
            allowNull: false,
            type: DataTypes.DATE,
        },
        companyId: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        courseId: {
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
        userId: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
    }, { freezeTableName: true});
    
    UserCourse.associate = (models)=>{
        UserCourse.belongsTo(models.Company, { foreignKey: 'companyId' })
    }

    return UserCourse;
}