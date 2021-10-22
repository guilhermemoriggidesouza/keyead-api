module.exports = (sequelize, DataTypes) => {
    const UserClass = sequelize.define('UserClass', {
        userClassId: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        companyId: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        classId: {
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
        isFinished: {
            allowNull: false,
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, { freezeTableName: true});
    
    UserClass.associate = (models)=>{
        UserClass.belongsTo(models.Company, { foreignKey: 'companyId' })
    }

    return UserClass;
}