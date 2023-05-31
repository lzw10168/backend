'use strict';

module.exports = app => {
  const { INTEGER, STRING, DATE, DECIMAL } = app.Sequelize;

  const OrderBill = app.model.define('order_bill', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    order_number: {
      type: STRING(30),
      allowNull: false,
    },
    serial_number: {
      type: STRING(30),
      allowNull: false,
    },
    finance_type: {
      type: INTEGER,
      allowNull: false,
    },
    serial_amount: {
      type: DECIMAL(10, 2),
      allowNull: false,
    },
    driver_name: {
      type: STRING(30),
      allowNull: false,
    },
    finish_time: {
      type: DATE,
      allowNull: true,
    },
    remark: {
      type: STRING(1000),
      allowNull: true,
    },
    order_company: {
      type: INTEGER,
      allowNull: false,
    },
    driver_company: {
      type: INTEGER,
      allowNull: false,
    },
    business_type: {
      type: INTEGER,
      allowNull: false,
    },
    created_at: {
      type: DATE,
      allowNull: false,
    },
    updated_at: {
      type: DATE,
      allowNull: false,
    },
  }, {
    timestamps: true,
    underscored: true,
    freezeTableName: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'order_bill',
  });

  return OrderBill;
};
