'use strict';

const fs = require('fs');
const moment = require('moment');
const mkdirp = require('mkdirp');
const path = require('path');
const xlsx = require('node-xlsx');

const Controller = require('egg').Controller;

class UploadController extends Controller {
  async upload() {
    const { ctx } = this;

    console.log('ctx.request.files', ctx.request.files);
    let file = ctx.request.files[0];

    let uploadDir = '';

    try {
      // files[0]表示获取第一个文件，若前端上传多个文件则可以遍历这个数组对象
      let f = fs.readFileSync(file.filepath);
      // 1.获取当前日期
      let day = moment(new Date()).format('YYYYMMDD');
      // 2.创建图片保存的路径
      let dir = path.join(this.config.uploadDir, day);
      let date = Date.now(); // 毫秒数
      await mkdirp(dir); // 不存在就创建目录
      // 返回图片保存的路径
      uploadDir = path.join(dir, date + path.extname(file.filename));
      // 写入文件夹
      fs.writeFileSync(uploadDir, f);
    } finally {
      // 清除临时文件
      ctx.cleanupRequestFiles();
    }

    console.log('uploadDir', uploadDir);

    ctx.body = {
      code: 200,
      msg: '上传成功',
      data: uploadDir.replace(/app/g, '')
    };
  }

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
      const result = await this.ctx.service.excel.addRows(data);
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
}

module.exports = UploadController;
