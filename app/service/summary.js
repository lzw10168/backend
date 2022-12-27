'use strict';

const Service = require('egg').Service;

class SummaryService extends Service {
  // 获取标签列表
  async addRows(list) {
    // list 结构 [[user_id,name,age, sex, text],[user_id,name,age, sex, text]]
    const { ctx, app } = this;
    try {
      const result = await this.app.mysql.query(
        'INSERT INTO excel (user_id,name,age,sex,text) values ?',
        [list]
      );
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getDetailById(id) {
    const { ctx, app } = this;
    try {
      const result = await this.app.mysql.get('excel', { user_id: id });
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

module.exports = SummaryService;
