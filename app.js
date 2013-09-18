var express = require('express')
  , passport = require('passport')
  , mongoose = require('mongoose')
  , sockjs = require('sockjs')
  , http = require('http')
  , jade = require('jade')
  , path = require('path')
  , routes = require('./routes.js')
  , socks = require('./socks.js')
  , config = require('./config.js')
  , models = require('./models.js')
var app = express()
  , PORT = 8888
  , socket = sockjs.createServer()
  , sockServer = http.createServer(app)
  // , db = mongoose.createConnection(config.mongodb.uri)
  , db = mongoose.createConnection()
  , models = models(db, mongoose)

db.on('error', console.error.bind(console, 'mongoose conn error: '));
db.once('open', function () {
  console.log("Data store open");
});

app.configure(function () {
  app.engine('jade', jade.__express);

  app.set('port', process.env.PORT || PORT);
  app.set('views', './templates');
  app.set('view engine', 'jade');
  app.set('strict routing', true);

  app.use(express.static(path.join(__dirname, 'static')));
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.bodyParser());

  app.use(passport.initialize());
  app.use(passport.session());
});

socket.on('connection', socks.onConnection);

app.get('/', routes.home);
app.post('/githook', routes.githook);

socket.installHandlers(sockServer, { prefix: '/connect' });
sockServer.listen(app.get('port'));
console.log('Listening on ' + app.get('port') + ' ...');