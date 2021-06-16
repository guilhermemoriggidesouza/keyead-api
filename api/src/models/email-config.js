module.exports = (sequelize, DataTypes) => {
    const EmailConfig = sequelize.define('EmailConfig', {
        emailConfigId: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER,
        },
        email: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        password: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        service: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        port: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        secure: {
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
          references: {
            key: "companyId",
            model: "Company",
          },
        },
    }, { freezeTableName: true});
    
    EmailConfig.associate = (models)=>{
        EmailConfig.belongsTo(models.Company, { foreignKey: 'companyId' })
    }

    return EmailConfig;
}
