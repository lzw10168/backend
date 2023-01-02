const read = require('jimp').read;
const qrcodeReader = require('qrcode-reader');

function qrDecode(data, callback) {
  var buffer
  if (data.indexOf("base")) {
    let base64 = data.replace(/^data:image\/\w+;base64,/, '')
    buffer = new Buffer(base64, 'base64') //把base64码转成buffer对象，
  } else {
    buffer = new Buffer(data)
  }
  return new Promise((resolve, reject) => {
    read(buffer, (err, image) => {
      if (err) {
        resolve(false);
      }
      let decodeQR = new qrcodeReader();
      decodeQR.callback = (errorWhenDecodeQR, result) => {
        if (errorWhenDecodeQR) {
          resolve(false);
        }
        if (!result) {
          resolve(false);
        } else {
          resolve(result.result);
        }
      };
      decodeQR.decode(image.bitmap);
    })
  });
}


module.exports = qrDecode
