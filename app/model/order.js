// app/model/order.js
module.exports = app => {
  const { INTEGER, STRING, DATE } = app.Sequelize;

  const Order = app.model.define('order', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    order_number: {
      type: STRING(30),
      allowNull: false,
      unique: true,
    },
    order_type: {
      type: INTEGER,
      allowNull: false,
    },
    order_status: {
      type: INTEGER,
      allowNull: false,
    },
    appointment_time: {
      type: DATE,
      allowNull: true,
    },
    appointment_address: {
      type: STRING(30),
      allowNull: true,
    },
    appointment_longitude: {
      type: STRING(30),
      allowNull: true,
    },
    appointment_latitude: {
      type: STRING(30),
      allowNull: true,
    },
    destination: {
      type: STRING(30),
      allowNull: true,
    },
    destination_longitude: {
      type: STRING(30),
      allowNull: true,
    },
    destination_latitude: {
      type: STRING(30),
      allowNull: true,
    },
    appointment_user_id: {
      type: INTEGER,
      allowNull: true,
    },
    appointment_user: {
      type: STRING(30),
      allowNull: true,
    },
    appointment_phone: {
      type: STRING(30),
      allowNull: true,
    },
    use_phone: {
      type: STRING(30),
      allowNull: true,
    },
    assign_driver_id: {
      type: INTEGER,
      allowNull: true,
    },
    assign_driver_name: {
      type: STRING(30),
      allowNull: true,
    },
  }, {
    timestamps: true,
    createdAt: 'created_at', // 自定义创建时间字段名
      updatedAt: 'updated_at', // 自定义更新时间字段名
    underscored: true,
    freezeTableName: true,
    tableName: 'orders',
  });

  return Order;
};
