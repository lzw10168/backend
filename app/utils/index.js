function genErrorBody(msg) {
  return {
    code: 0,
    data: {},
    msg,
  };
}

function genSuccessBody(data) {
  return {
    code: 1,
    msg: 'success',
    data,
  };
}


module.exports = {
  genErrorBody,
  genSuccessBody,
};
