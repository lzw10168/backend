'use strict';

module.exports = (sequelize, DataTypes) => {
  const { INTEGER, STRING, DATE } = DataTypes;

  const DriverLocation = sequelize.define(
    'driver_location',
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      driver_id: {
        type: INTEGER,
        allowNull: false,
      },
      longitude: {
        type: STRING(100),
        allowNull: false,
        comment: '经度',
      },
      latitude: {
        type: STRING(100),
        allowNull: false,
        comment: '纬度',
      },
      created_at: {
        type: DATE,
        allowNull: false,
        comment: '创建时间',
      },
      updated_at: {
        type: DATE,
        allowNull: false,
        comment: '更新时间',
      },
    },
    {
      timestamps: true,
      underscored: true,
      freezeTableName: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      tableName: 'driver_location',
    }
  );

  return DriverLocation;
};
