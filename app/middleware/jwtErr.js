'use strict';

module.exports = (options) => {
  return async function jwtErr(ctx, next) {
    const token = ctx.request.header.authorization; // 若是没有 token，返回的是 null 字符串
    let decode
    if(token != 'null' && token) {
      try {
        decode = ctx.app.jwt.verify(token, options.secret); // 验证token
        console.log('decode: ', decode);
        await next();
      } catch (error) {
        console.log('error', error)
        ctx.status = 200;
        ctx.body = {
          msg: 'token已过期，请重新登录',
          code: 402,
        }
        return;
      }
    } else {
      ctx.status = 200;
      ctx.body = {
        code: 402,
        msg: 'token不存在',
      };
      return;
    }
  }
}
