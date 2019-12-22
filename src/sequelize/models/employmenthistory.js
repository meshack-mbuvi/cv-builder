'use strict';
module.exports = (sequelize, DataTypes) => {
  const EmploymentHistory = sequelize.define(
    'EmploymentHistory',
    {
      title: DataTypes.STRING,
      employer: DataTypes.STRING,
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
      city: DataTypes.STRING,
      description: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
    },
    {},
  );

  EmploymentHistory.associate = function(models) {
    EmploymentHistory.belongsTo(models.User, {
      foreignKey: 'id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };

  return EmploymentHistory;
};
