function genErrorBody(msg) {

  return {
    code: 0,
    data: {},
    msg: msg,
  };
}

function genSuccessBody(data) {
  return {
    code: 1,
    msg: '操作成功',
    data,
  };
}


module.exports = {
  genErrorBody,
  genSuccessBody,
};
