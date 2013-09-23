var express = require('express')
  , passport = require('passport')
  , GithubStrategy = require('passport-github').Strategy
  , mongoose = require('mongoose')
  , sockjs = require('sockjs')
  , http = require('http')
  , jade = require('jade')
  , path = require('path')
  , routes = require('./routes.js')
  , socks = require('./socks.js')
  , config = require('./config.js')
  , models = require('./models.js')

var GITHUB_CLIENT_ID = config.GITHUB_CLIENT_ID
  , GITHUB_CLIENT_SECRET = config.GITHUB_CLIENT_SECRET

var app = express()
  , PORT = 8888
  , socket = sockjs.createServer()
  , sockServer = http.createServer(app)
  // , db = mongoose.createConnection(config.mongodb.uri)
  , db = mongoose.createConnection()
  , models = models(db, mongoose)

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
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'keyboard secret' }));
  app.use(passport.initialize());
  app.use(passport.session());
});

db.on('error', console.error.bind(console, 'mongoose conn error: '));
db.once('open', function () {
  console.log("Data store open");
});

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

passport.use(new GithubStrategy({
  clientID: GITHUB_CLIENT_ID,
  clientSecret: GITHUB_CLIENT_SECRET,
  // callbackUrl: "http://" + process.env.IP + ":" + process.env.PORT + "/auth/github/cb"
}, function (accessToken, refreshToken, profile, done) {
    console.log("access token? ", accessToken);
    process.nextTick(function () {

      // To keep the example simple, the user's GitHub profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the GitHub account with a user record in your database,
      // and return that user instead.
      /*
      User.findOrCreate({ githubId: profile.id }, function (err, user) {
        return done(err, user);
      });
      */

      var userData = { profile: profile, accessToken: accessToken }
      return done(null, userData);
    });
  }
));



socket.on('connection', socks.onConnection);

app.get('/', routes.home);
app.get('/dash', ensureAuthenticated, routes.dashboard);
app.get('/login/success', routes.loginSuccess);
app.get('/login/failure', routes.loginFailure);
app.get('/auth/github', passport.authenticate('github', { scope: ['repo'] }), routes.loginWithGithub);
app.get('/auth/github/cb', passport.authenticate('github', { failureRedirect: '/login/failure' }), routes.loginWithGithubCb);
app.get('/logout', routes.logout);
app.post('/githook', routes.githook);

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/#/login');
}

socket.installHandlers(sockServer, { prefix: '/connect' });
sockServer.listen(app.get('port'));
console.log('Listening on ' + app.get('port') + ' ...');