'use strict'

module.exports = app => {
  const { INTEGER, DATE, STRING } = app.Sequelize;

  const DriverUser = app.model.define('driver_user', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    job_number: STRING(30),
    name: STRING(30),
    age: INTEGER,
    receive_status: INTEGER,
    account_status: INTEGER,
    location: STRING(30),
    phone: STRING(30),
    id_card: STRING(30),
    driver_license: STRING(30),
    id_card_front: STRING(30),
    id_card_back: STRING(30),
    driver_license_img: STRING(30),
    balance: INTEGER,
    avatar: STRING(30),
    created_at: DATE,
    updated_at: DATE,
  });

  return DriverUser;
};
