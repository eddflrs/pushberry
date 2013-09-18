/* Management of socket connections happens here */

var socks = {}
  , conns = {} // id => {Sockjs Connection}

socks.onConnection = function (conn) {
  console.log('connection established.');
  conn.on('data', socks.onData);
};

socks.onData = function (msg) {
  console.log("got that data", msg);
};

socks.disconnect = function (msg) {

};

module.exports = socks;