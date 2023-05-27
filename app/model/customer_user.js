// app/model/customer.js
module.exports = app => {
  const { INTEGER, STRING, DATE } = app.Sequelize;

  const CustomerUser = app.model.define('customer_user', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    job_number: STRING(30),
    name: STRING(30),
    phone: STRING(30),
    level: INTEGER,
    integral: INTEGER,
    channel: INTEGER,
    company: STRING(30),
    order_count: INTEGER,
    created_at: DATE,
    updated_at: DATE,
  });

  return CustomerUser;
};
