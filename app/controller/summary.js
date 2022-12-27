'use strict';

const fs = require('fs');

const xlsx = require('node-xlsx');

const Controller = require('egg').Controller;

class SummaryController extends Controller {
  async uploadExcel() {
    const { ctx } = this;

    console.log('ctx.request.files', ctx.request.files);
    let file = ctx.request.files[0];

    try {
      // files[0]表示获取第一个文件，若前端上传多个文件则可以遍历这个数组对象
      let f = fs.readFileSync(file.filepath);
      const workSheetsFromBuffer = xlsx.parse(f);
      const data = workSheetsFromBuffer[0].data;
      // 删除第一行
      data.shift();
      // 写入数据库
      const result = await this.ctx.service.summary.addRows(data);
      ctx.body = {
        code: 200,
        msg: '上传成功'
      };
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: error,
        data: null
      };
    } finally {
      // 清除临时文件
      ctx.cleanupRequestFiles();
    }
  }

  async detail() {
    const { ctx, app } = this;
    const id = ctx.query.id || '';
    const detail = await ctx.service.summary.getDetailById(id);
    console.log('detail: ', detail);
    ctx.body = {
      code: 200,
      msg: '请求成功',
      data: {
        ...detail
      }
    };
  }
}

module.exports = SummaryController;
