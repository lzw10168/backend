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
    // 生成随机wxid
    let wxid = 'wxac8b5749504' + (Math.random() * 100000)
    wxid = wxid.slice(0, 18)
    console.log('wxid: ', wxid);
    try {
      const url = `https://z.wxysbd.com/api/Result/index/id/${id}`
      const result = await axios({
        url: url,
        method: 'POST',
        data: ctx.request.body,
        headers: {
          'Referer': `https://servicewechat.com/${wxid}/devtools/page-frame.html`,
          'Accept': '*/*',
          'Accept-Encoding': 'gzip, deflate, br',
          Connection: 'keep-alive',
          'Content-Length': 45,
          'content-type': 'application/x-www-form-urlencoded',
          Host: 'z.wxysbd.com',
          'Sec-Fetch-Dest': 'empty',
          'Sec-Fetch-Mode': 'cors',
          'Sec-Fetch-Site': 'cross-site',
          'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1 wechatdevtools/1.06.2209190 MicroMessenger/8.0.5 webview/'
        }
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
