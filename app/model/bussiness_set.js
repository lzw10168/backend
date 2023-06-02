'use strict';

module.exports = (sequelize, DataTypes) => {
  const { INTEGER, STRING, DATE, DECIMAL } = app.Sequelize;

  const BussinessSet = sequelize.define(
    'bussiness_set',
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      open_time: {
        type: STRING,
        allowNull: false,
        comment: '开门时间',
      },
      end_time: {
        type: STRING,
        allowNull: false,
        comment: '关门时间',
      },
      normal_start_km: {
        type: INTEGER,
        allowNull: false,
        comment: '正常多少公里内',
      },
      normal_start_price: {
        type: INTEGER,
        allowNull: false,
        comment: '正常起步价',
      },
      special_start_km: {
        type: INTEGER,
        allowNull: false,
        comment: '特殊多少公里内',
      },
      special_start_price: {
        type: INTEGER,
        allowNull: false,
        comment: '特殊起步价',
      },
      exceed_km: {
        type: INTEGER,
        allowNull: false,
        comment: '超出多少公里',
      },
      exceed_per_price: {
        type: INTEGER,
        allowNull: false,
        comment: '超出每公里价格',
      },
      wait_time: {
        type: INTEGER,
        allowNull: false,
        comment: '等待多少分钟',
      },
      wait_per_price: {
        type: INTEGER,
        allowNull: false,
        comment: '等待每分钟价格',
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
      tableName: 'bussiness_set',
    }
  );

  return BussinessSet;
};
