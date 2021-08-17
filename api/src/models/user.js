module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        userId: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        name: {
            allowNull: true,
            type: DataTypes.STRING,
        },
        socialReason: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        cnpj: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        telefone: {
            allowNull: true,
            type: DataTypes.STRING,
        },
        email: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: true
        },
        password: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        category: {
            allowNull: false,
            type: DataTypes.CHAR(1),
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
    
    User.associate = (models)=>{
        User.belongsTo(models.Company, { foreignKey: 'companyId' })
        User.belongsToMany(models.Course, { through: 'UserCourse', foreignKey: "userId" })
    }

    return User;
  }