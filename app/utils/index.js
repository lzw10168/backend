function errorB(msg) {

  return {
    code: 0,
    data: {},
    msg: msg,
  };
}

function successB(data) {
  return {
    code: 1,
    msg: '操作成功',
    data,
  };
}


module.exports = {
  errorB,
  successB,
};
