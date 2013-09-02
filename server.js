var express = require('express')
	, jade = require('jade')
	, path = require('path')
	;

var app = express()
	, PORT = 80
	;

app.configure(function () {
	app.engine('jade', jade.__express);

	app.set('port', process.env.PORT || PORT);
	app.set('views', './templates');
	app.set('view engine', 'jade');
	
	app.use(express.static(path.join(__dirname, 'static')));
	app.use(express.cookieParser());
	app.use(express.bodyParser());

}); 


// Routes

app.get('/', function (req, res) {
	res.send("Hello World!");
});

app.post('/githook', function (req, res) {
	console.log('Git hook received');
	res.send("Githooked!");
	// XX pull.sh
	var exec = require('child_process').exec;
	exec("sh pull.sh", function () {});
});

app.listen(app.get('port'));
console.log('Listening on ' + app.get('port') + ' ...');
