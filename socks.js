/* Management of socket connections happens here */

var socks = {}
  , conns = {} // id => {Sockjs Connection}
  ;

socks.connect = function (msg) {
  console.log('connect called with msg: ', msg);
  var json = JSON.parse(msg);
  console.log('connect called with json: ', json);
  console.log('connect with ', this);
};

socks.disconnect = function (msg) {

};

module.exports = socks;