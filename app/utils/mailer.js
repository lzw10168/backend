'use strict';
const nodemailer = require('nodemailer');

// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
const sendEmail = () => {
  nodemailer.createTestAccount((err, account) => {

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: 'smtp.163.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: 'lzw10169@163.com', // generated ethereal user
        pass: 'WQDQTQETUTHTHNSO' // generated ethereal password
      }
    });

    // setup email data with unicode symbols
    let mailOptions = {
      from: '<lzw10169@163.com>', // sender address
      to: 'lzw10168@163.com, 619772694@qq.com', // list of receivers
      subject: '搞怪小程序出问题了,!!!', // Subject line
      text: 'Hello world?', // plain text body
      html: '<b>搞怪小程序被拦截了, 快去看看</b>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
      // Preview only available when sending through an Ethereal account
      // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
  })
}


module.exports = { sendEmail }
