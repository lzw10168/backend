'use strict';

const fs = require('fs');
const axios = require('axios')
const qrDecode = require('../utils/getqrcode')
const { sendEmail } = require('../utils/mailer')

const Controller = require('egg').Controller;

class MiniController extends Controller {
  async whimsyResult() {
    const { ctx, app } = this;
    const { id } = ctx.request.body
    try {
      const url = `https://z.wxysbd.com/api/Result/index/id/${id}`
      const result = await axios({
        url: url,
        method: 'POST',
        data: ctx.request.body,
        headers: { 'Referer': 'https://servicewechat.com/wxac12saaddddaf361/devtools/page-frame.html' },
      })
      const data = result?.data?.data
      const qrResult = await qrDecode(data)
      console.log('qrResult: ', qrResult);
      if (qrResult) {
        sendEmail()
        ctx.body = {
          code: 500,
          msg: '抱歉,服务器出现了错误, 等会再试试吧!',
          data: null
        };

      } else {
        ctx.body = {
          code: 10000,
          data: data,
        }
      }


    } catch (error) {
      ctx.body = {
        code: 500,
        msg: error,
        data: null
      };
    } finally {

    }
  }

}

module.exports = MiniController;
