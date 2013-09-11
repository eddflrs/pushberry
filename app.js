var express = require('express')
  , http = require('http')
  , jade = require('jade')
  , path = require('path')
  , sockjs = require('sockjs')
  , routes = require('./routes.js')
  , socks = require('./socks.js')
  ;

var app = express()
  , PORT = 8000
  , sockServer = sockjs.createServer()
  , socket = http.createServer(app)
  ;

sockServer.installHandlers(socket, {
  prefix: '/connect'
});

app.configure(function () {
  app.engine('jade', jade.__express);

  app.set('port', process.env.PORT || PORT);
  app.set('views', './templates');
  app.set('view engine', 'jade');
  
  app.use(express.static(path.join(__dirname, 'static')));
  app.use(express.cookieParser());
  app.use(express.bodyParser());
});

socket.on('connection', function (conn) {
  console.log('connection established.');

  conn.on('data', socks.connect);
  app.get('/', routes.home);
  app.post('/githook', routes.githook);
});

socket.listen(app.get('port'));
console.log('Listening on ' + app.get('port') + ' ...');