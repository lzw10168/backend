
module.exports = app => {
  return {
    async insertDefaultData() {
      const { AdminUser } = app.model;
      // 检查是否已经存在默认数据
      const existingData = await AdminUser.findOne();
      if (existingData) {
        console.log('Default data already exists.');
        return;
      }

      // 创建默认数据
      const defaultUser = [
        { username: 'admin', password: '25d55ad283aa400af464c76d713c07ad', super: 1, status: 1, remark: '超级管理员' },
      ];

      // 将默认数据插入到数据库
      await AdminUser.create(defaultUser);

      console.log('AdminUser Default data inserted successfully.');
    },
  };
};
