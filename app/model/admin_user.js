// app/model/admin_user.js
module.exports = app => {
  const { INTEGER, STRING, DATE } = app.Sequelize;

  const AdminUser = app.model.define('admin_user', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: STRING(30),
      allowNull: false,
      unique: true,
    },
    password: {
      type: STRING(128),
      allowNull: false,
    },
    super: {
      type: INTEGER,
      allowNull: false,
    },
    status: {
      type: INTEGER,
      allowNull: false,
    },
    remark: {
      type: STRING(1000),
      allowNull: true,
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
    createdAt: 'created_at', // 自定义创建时间字段名
    updatedAt: 'updated_at', // 自定义更新时间字段名
    tableName: 'admin_users',
  });

  return AdminUser;
};
